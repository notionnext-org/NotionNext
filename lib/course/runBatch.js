import crypto from 'crypto'

import { executeCourseTask } from '@/lib/course/onlineRunner'
import { generateCourseBrief } from '@/lib/course/courseBrief'
import {
  getCourseLlmWindowDecision,
  isCourseModelTask
} from '@/lib/course/llmSchedule'
import {
  applyCourseWorkflowActionsForWorker,
  claimCourseWorkerTasks,
  getCourseJobById,
  persistCourseBriefArtifact,
  workflowFromJob
} from '@/lib/courseRepository'
import { getWorkspaceProfileById } from '@/lib/server/workspaceProfiles'
import { resolveUserAiConfig } from '@/lib/server/userIntegrations'

function failureAction(task, error, requestId) {
  const message = error instanceof Error ? error.message : String(error)
  if (['write-node', 'review-node', 'revise-node'].includes(task.type)) {
    return {
      type: 'fail-node-task', lessonKey: task.lessonKey, nodeId: task.node?.id,
      taskType: task.type, error: message, retryable: true, taskKey: task.taskKey
    }
  }
  return {
    type: 'fail-step', step: task.type, error: message, retryable: true,
    taskKey: `${task.taskKey || task.type}:failed:${requestId}`
  }
}


export async function ensureCourseBriefForJob(
  jobId,
  modelConfig,
  { ownerId = '', lessonKey = '', force = false } = {}
) {
  if (modelConfig?.automation?.briefEnabled === false) {
    return { created: false, reason: '课程简报已在设置中关闭' }
  }
  const job = await getCourseJobById(jobId, ownerId)
  if (!job) throw new Error('Course job not found')
  const workflow = workflowFromJob(job)
  const candidates = (workflow.lessons || []).filter(lesson =>
    lesson.status === 'completed' &&
    lesson.finalNote?.markdown &&
    !lesson.brief?.markdown &&
    (!lessonKey || lesson.key === lessonKey)
  )
  const lesson = candidates[0]
  if (!lesson) return { created: false, reason: '课程简报已存在或课次尚未完成', workflow }

  if (!force) {
    const decision = getCourseLlmWindowDecision({
      now: new Date(),
      schedule: modelConfig?.costControl || {}
    })
    if (!decision.allowed) {
      return {
        created: false,
        reason: 'waiting-llm-window',
        retryAfterMs: decision.retryAfterMs,
        nextAllowedAt: decision.nextAllowedAt,
        workflow
      }
    }
  }

  const generated = await generateCourseBrief({
    workflow,
    lesson,
    modelConfig
  })
  const stored = await persistCourseBriefArtifact({
    jobId,
    ownerId: job.owner_id,
    workflow,
    lessonKey: lesson.key,
    brief: generated.brief,
    trace: generated.trace
  })
  return {
    created: true,
    lessonKey: lesson.key,
    brief: generated.brief,
    workflow: stored.workflow,
    readingItem: stored.readingItem,
    delivery: stored.delivery
  }
}

export async function runCourseWorkerBatch(jobId, options = {}) {
  const batchStartedAt = Date.now()
  const requestId = options.requestId || crypto.randomUUID()
  let modelConfig = options.modelConfig || null
  if (!modelConfig) {
    const job = await getCourseJobById(jobId)
    if (!job?.owner_id) throw new Error('Course job owner is unavailable')
    const profile = await getWorkspaceProfileById(job.owner_id)
    if (!profile || profile.status !== 'active') throw new Error('Course workspace member is unavailable')
    modelConfig = await resolveUserAiConfig(profile)
    if (!modelConfig?.apiKey || modelConfig.source !== 'user') {
      const error = new Error(
        '当前成员尚未配置个人课程 AI；课程工作流不会使用环境模型兜底'
      )
      error.code = 'course_ai_user_config_required'
      throw error
    }
  }

  if (modelConfig?.automation?.enabled === false) {
    return {
      requestId,
      idle: true,
      reason: 'automation-disabled',
      workflow: null,
      tasks: [],
      failures: []
    }
  }

  const requestedLease = Number(options.leaseSeconds || 240)
  const leaseSeconds = Number.isFinite(requestedLease) && requestedLease > 0
    ? requestedLease : 240
  // Leave 30s inside the existing lease for state persistence. Do not renew the
  // budget for JSON retries, outline coverage repair, parallel nodes or briefs.
  const modelBudgetMs = Math.max(0, Math.min(240_000, leaseSeconds * 1000 - 30_000))
  const suppliedDeadline = Number(modelConfig.deadlineAt)
  modelConfig = {
    ...modelConfig,
    deadlineAt: Math.min(
      batchStartedAt + modelBudgetMs,
      Number.isFinite(suppliedDeadline) && suppliedDeadline > 0 ? suppliedDeadline : Infinity
    )
  }
  const claimed = await claimCourseWorkerTasks(jobId, leaseSeconds)
  const tasks = claimed.tasks || []
  if (!tasks.length || tasks[0]?.type === 'idle') {
    let artifact = null
    if (
      claimed.workflow?.status === 'completed' &&
      modelConfig?.automation?.briefEnabled !== false
    ) {
      try {
        artifact = await ensureCourseBriefForJob(jobId, modelConfig)
      } catch (error) {
        artifact = {
          created: false,
          reason: error instanceof Error ? error.message : String(error)
        }
      }
    }
    return {
      requestId,
      idle: true,
      reason: tasks[0]?.reason || 'no-pending-step',
      workflow: artifact?.workflow || claimed.workflow,
      tasks: [],
      failures: [],
      artifact
    }
  }

  const modelTasks = tasks.filter(isCourseModelTask)
  if (modelTasks.length) {
    const costWindow = getCourseLlmWindowDecision({
      now: options.now || new Date(),
      schedule: modelConfig.costControl || {},
      overrideMode: options.costMode || ''
    })
    if (!costWindow.allowed) {
      return {
        requestId,
        idle: true,
        reason: 'waiting-llm-window',
        retryAfterMs: costWindow.retryAfterMs,
        nextAllowedAt: costWindow.nextAllowedAt,
        costWindow,
        workflow: claimed.workflow,
        tasks: [],
        deferredTasks: modelTasks.map(task => ({
          type: task.type,
          lessonKey: task.lessonKey || '',
          nodeId: task.node?.id || ''
        })),
        failures: []
      }
    }
  }

  const settled = await Promise.allSettled(
    tasks.map(task => executeCourseTask(task, { modelConfig }))
  )
  const actions = settled.flatMap((result, index) => {
    const action = result.status === 'fulfilled'
      ? result.value
      : failureAction(tasks[index], result.reason, requestId)
    if (!action) return []
    if (
      result.status === 'fulfilled' &&
      action.type === 'save-outline' &&
      modelConfig?.automation?.autoApproveOutline !== false
    ) {
      return [
        action,
        {
          type: 'approve-outline-worker',
          lessonKey: action.lessonKey
        }
      ]
    }
    return [action]
  })
  let result = await applyCourseWorkflowActionsForWorker(jobId, actions)
  let artifact = null
  if (
    result.workflow?.status === 'completed' &&
    modelConfig?.automation?.briefEnabled !== false
  ) {
    try {
      artifact = await ensureCourseBriefForJob(jobId, modelConfig)
      if (artifact?.workflow) result = { ...result, workflow: artifact.workflow }
    } catch (error) {
      artifact = {
        created: false,
        reason: error instanceof Error ? error.message : String(error)
      }
    }
  }
  const failures = settled.flatMap((item, index) =>
    item.status === 'rejected'
      ? [{
          task: tasks[index].type,
          nodeId: tasks[index].node?.id || null,
          error: item.reason instanceof Error
            ? item.reason.message
            : String(item.reason)
        }]
      : []
  )

  return {
    requestId,
    idle: false,
    reason: '',
    workflow: result.workflow,
    tasks,
    failures,
    artifact,
    completedSteps: tasks
      .filter((_, index) => settled[index].status === 'fulfilled')
      .map(task => task.type)
  }
}

export function courseBatchDirective(result = {}) {
  const reason = result.reason || ''
  const workflow = result.workflow || {}
  const status = workflow.status || ''

  if (
    ['completed', 'cancelled'].includes(status) ||
    ['completed', 'cancelled'].includes(reason)
  ) {
    return {
      nextAction: 'done',
      reason: reason || status,
      retryAfterMs: 0
    }
  }

  if (reason === 'waiting-llm-window') {
    return {
      nextAction: 'busy',
      reason,
      retryAfterMs: Math.max(60_000, Number(result.retryAfterMs || 0)),
      nextAllowedAt: result.nextAllowedAt || null
    }
  }

  if (
    [
      'waiting-preflight',
      'waiting-outline-approval',
      'waiting-final-human-review',
      'waiting-node-human-review',
      'waiting-node-retry',
      'paused',
      'failed'
    ].includes(reason) ||
    [
      'preflight_required',
      'outline_review',
      'final_review_human',
      'node_human_review',
      'paused',
      'failed'
    ].includes(status)
  ) {
    return {
      nextAction: 'wait',
      reason: reason || status,
      retryAfterMs: 0
    }
  }

  if (reason === 'task-leased') {
    return { nextAction: 'busy', reason, retryAfterMs: 5000 }
  }

  if (result.idle) {
    return {
      nextAction: 'wait',
      reason: reason || 'no-pending-step',
      retryAfterMs: 0
    }
  }

  return { nextAction: 'run', reason: '', retryAfterMs: 0 }
}
