const ROLE_MODEL_ENV = {
  grouping: 'COURSE_GROUPING_MODEL',
  brief: 'COURSE_BRIEF_MODEL',
  outline: 'COURSE_OUTLINE_MODEL',
  outlineRepair: 'COURSE_OUTLINE_MODEL',
  writer: 'COURSE_WRITER_MODEL',
  reviewer: 'COURSE_REVIEWER_MODEL',
  revision: 'COURSE_REVISION_MODEL',
  finalRevision: 'COURSE_REVISION_MODEL',
  splicer: 'COURSE_SPLICE_MODEL',
  finalReview: 'COURSE_FINAL_REVIEW_MODEL'
}

const COMMON_RULES = `
你正在参与一个法律课程笔记工作流。只能完成本次指定阶段，不得越过大纲确认、节点写作、独立审查或最终检查。
所有结论必须以提供的课堂转录、课件和补充材料为依据。材料没有说明的内容不得补写为课堂事实、法条原文、案例事实或教师观点；存在不确定性时应明确标注。
输出必须是符合 RequiredOutputSchema 的单个 JSON 对象，不得添加 Markdown 代码围栏、解释性前言或额外字段。
`.trim()

const ROLE_SYSTEM = {
  brief: `你是课程简报撰写者 [brief]。根据已经完成并通过审查的课程笔记，生成一份五至十分钟可读完的课程简报。必须保留本课主线、三至五个核心问题、教师明确赞成或反对或反复强调的内容、重要案例与法条材料、与前后课程或既有知识的关系。简报不是截取开头，也不是只列提纲；不得新增来源中没有的事实。消息正文只保留主线和三项重点，完整 Markdown 进入站内阅读资料库。`,
  grouping: `你是课程资料归档助手 [grouping]。根据材料索引提出课次候选和材料分配建议。课次与材料是多对多关系：一节课可包含多份材料，一份课件或长文档也可按页码、行号或段落范围分配给多节课。课堂转录、明确日期和内容主线是主要依据；文件名只作辅助。无法可靠判断时必须保留为未归档，不能强行创建课次。已有课次和 locked 分配不得覆盖。只输出建议，不撰写课程笔记。`,
  outline: `你是课程大纲规划者 [outline]。阅读全文后提炼本课主线，并把材料划分为连续、无遗漏、尽量不重叠的可写节点。TranscriptSource 中的 [Lx] 是唯一有效的转录行号；lineRange 必须引用这些绝对行号，不得自行估算或使用原始 SRT 序号。第一节点必须从 L1 开始，最后节点必须覆盖 LessonBlueprint.transcriptLineCount，相邻节点之间不得留下缺口。每个节点还应给出对应课件页码，并识别概念、法条、案例、教师强调信号与节点写作目标。不要撰写正文。`,
  outlineRepair: `你是课程大纲覆盖修复者 [outlineRepair]。只处理 LessonBlueprint.coverageGaps 指定的缺口，并使用 TranscriptSource 中的绝对 [Lx] 行号生成补充节点。每个缺口必须从其起始行连续覆盖到结束行，不得改写已有大纲，不得扩展到缺口之外，不得撰写正文。`,
  writer: `你是课程节点撰写者 [writer]。只撰写当前 WriterBrief 指定的一个节点，保持与完整 LessonBlueprint 的主线和相邻节点分工一致。内容应充分展开课堂论证，不得压缩成提纲式摘要，也不得重复其他节点。案例至少交代背景或案名、事实、争点、结论与规则适用、教师评价、论证意义；材料缺少其中某项时应如实标注。输出 Markdown 正文，但必须放在 JSON 的 markdown 字段中。`,
  reviewer: `你是独立课程审查者 [reviewer]。审查目标是拦截会实质影响学习与准确性的错误，而不是追求逐字复刻课堂原话。重点检查：编造或无来源扩写、教师观点或法律结论的实质曲解、核心论证或重要材料遗漏、案例与法条的关键错误、明显异常压缩及跨节点严重重复。人名出现顺序、无损于含义的背景省略、措辞与原话不完全一致、可以更顺滑的表达，均只能列为 suggestion，不能据此要求重写。coverage、grounding、logic、detail、sourceCoverage 必须使用 0—100 的整数评分，禁止使用 0—10 分制；summary、issues.message 等说明文字使用中文（专名和必要原文除外）。issues 的 severity 只使用 blocking / important / suggestion；只有 blocking 问题才能 decision=revise。仅在来源冲突或无法可靠判断教师立场时，设置 requiresHuman=true 并 decision=human_review。每项问题应具体、可执行，并尽量给出 nodeId 与 sourceRange；同时标记 impact=local 或 downstream。`,
  revision: `你是课程节点修订者 [revision]。只修订当前节点，逐项回应 blocking Reviewer issues 和用户补充要求；suggestion 仅在自然且不增加无来源内容时酌情吸收。保留已经正确且有来源的内容，不得重写整课，不得跨节点补写。输出完整的新版本 Markdown，放在 JSON 的 markdown 字段中。`,
  finalRevision: `你是课程最终笔记修订者 [finalRevision]。用户已经通读机械拼装后的完整笔记，并给出明确修改要求。只根据该要求对现有 Markdown 做必要且尽量局部的修改；未被要求调整的内容、标题层级、节点正文、来源标记和元数据应保持不变。不得凭空新增课堂事实、法条、案例或教师观点。输出完整的新版本 Markdown，放在 JSON 的 markdown 字段中。`,
  splicer: `你是单课笔记的接缝段生成器 [splicer]。节点正文已经逐一审查通过，绝对不得改写、压缩或重述节点正文。你只根据已批准大纲、节点索引与占位符上下文，生成结构化接缝数据：课程概览、各大纲章节的总结段和自测题、知识连接、可选附录。核心问题应是 Why / How / 区别类问题，共 3—5 个；学习目标必须以可验证动词开头，共 3—5 个；课程脉络不少于 60 字。每个章节总结写 2—3 句且不少于 45 字，说明该章节在全课论证中的功能；每章自测 2—4 题，以理解、辨析和应用为主。知识连接必须说明对后续学习的铺垫。附录只收纳课堂发散、术语或补充话题，不得凭空创造。只输出 RequiredOutputSchema 指定的 JSON。`,
  finalReview: `你是单课最终审查者 [finalReview]。检查机械拼装后的笔记是否完整包含已批准节点，并确认课程概览、章节总结、自测、知识连接、附录和元数据结构正常；同时检查跨节点的实质矛盾、严重重复、核心术语或教师观点不一致。程序已经机械确认全部已批准节点正文均进入最终稿，不要重新逐句核验原始转录，也不要因措辞、例子顺序或次要背景省略退回。coverage、grounding、logic、detail、sourceCoverage 必须使用 0—100 的整数评分；summary、issues.message 使用中文（专名和必要原文除外）。只有实质问题使用 blocking 并返回 revise；来源冲突或无法判断时使用 requiresHuman=true 并返回 human_review。发现问题必须尽量定位到具体 nodeId。`
}

function jsonBlock(label, value) {
  return [`## ${label}`, '```json', JSON.stringify(value || {}, null, 2), '```'].join('\n')
}

function textBlock(label, value) {
  return [`## ${label}`, String(value || '').trim() || '(empty)'].join('\n')
}

function overrideModelForRole(role, models = {}) {
  if (role === 'brief') return models.brief || models.writer || models.default
  if (role === 'grouping' || role === 'outline' || role === 'outlineRepair') return models.outline || models.default
  if (role === 'writer' || role === 'splicer') return models.writer || models.default
  if (role === 'reviewer') return models.reviewer || models.default
  if (role === 'revision' || role === 'finalRevision') return models.revision || models.writer || models.default
  if (role === 'finalReview') return models.finalReview || models.reviewer || models.default
  return models.default
}

export function requireCourseModelConfig(role, overrideConfig = null) {
  if (overrideConfig?.apiKey) {
    const model = overrideModelForRole(role, overrideConfig.models || {})
    if (!model) throw new Error(`当前账号尚未配置 ${role} 使用的模型`)
    return {
      provider: overrideConfig.provider || 'openai-compatible',
      source: overrideConfig.source || 'override',
      baseUrl: String(overrideConfig.baseUrl || 'https://api.openai.com/v1').replace(/\/$/, ''),
      apiKey: overrideConfig.apiKey,
      model
    }
  }

  const apiKey = process.env.COURSE_AI_API_KEY || process.env.SCHEDULE_AI_API_KEY || process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('COURSE_AI_API_KEY is required for course worker model calls')

  const baseUrl = process.env.COURSE_AI_BASE_URL || process.env.SCHEDULE_AI_BASE_URL || 'https://api.openai.com/v1'
  const model = process.env[ROLE_MODEL_ENV[role]] ||
    (role === 'grouping' ? process.env.COURSE_OUTLINE_MODEL : '') ||
    (role === 'splicer' ? (process.env.COURSE_FINAL_REVIEW_MODEL || process.env.COURSE_WRITER_MODEL) : '') ||
    process.env.COURSE_AI_MODEL || process.env.SCHEDULE_AI_MODEL
  if (!model) throw new Error(`${ROLE_MODEL_ENV[role] || 'COURSE_AI_MODEL'} is required`)

  return { provider: process.env.COURSE_AI_PROVIDER || 'openai-compatible', source: 'environment', baseUrl: baseUrl.replace(/\/$/, ''), apiKey, model }
}

export function buildPrompt({
  role,
  promptVersion = 'course-workflow-v3',
  courseSpec,
  lessonBlueprint,
  writerBrief,
  sourceText,
  pptText,
  previousNodeSummary,
  nextNodeTarget,
  schema
}) {
  const system = `${ROLE_SYSTEM[role] || ROLE_SYSTEM.writer}\n\n${COMMON_RULES}\n\nPrompt version: ${promptVersion}`
  const user = [
    textBlock('PromptVersion', promptVersion),
    jsonBlock('CourseSpec', courseSpec),
    jsonBlock('LessonBlueprint', lessonBlueprint),
    jsonBlock('WriterBrief', writerBrief),
    textBlock('PreviousNodeSummary', previousNodeSummary),
    textBlock('NextNodeTarget', nextNodeTarget),
    textBlock('TranscriptSource', sourceText),
    textBlock('PptAndSupplementSource', pptText),
    jsonBlock('RequiredOutputSchema', schema),
    '请只返回一个有效 JSON 对象。不得编造来源中不存在的内容。'
  ].join('\n\n')

  return { system, user, version: promptVersion, role }
}

function contentPartText(part) {
  if (typeof part === 'string') return part
  if (!part || typeof part !== 'object') return ''
  if (typeof part.text === 'string') return part.text
  if (typeof part.text?.value === 'string') return part.text.value
  if (typeof part.content === 'string') return part.content
  return ''
}

export function extractCourseModelContent(data) {
  const message = data?.choices?.[0]?.message
  const content = message?.content
  if (content && typeof content === 'object' && !Array.isArray(content)) return content
  if (typeof content === 'string') return content
  if (Array.isArray(content)) {
    const joined = content.map(contentPartText).filter(Boolean).join('')
    if (joined) return joined
  }
  const toolArguments = message?.tool_calls?.[0]?.function?.arguments
  if (typeof toolArguments === 'string') return toolArguments
  if (typeof data?.output_text === 'string') return data.output_text
  if (typeof data?.choices?.[0]?.text === 'string') return data.choices[0].text
  if (typeof message?.reasoning_content === 'string') return message.reasoning_content
  return ''
}

function providerErrorDetail(body) {
  try {
    const parsed = body ? JSON.parse(body) : null
    const providerError = parsed?.error
    if (!providerError || typeof providerError !== 'object') return ''
    const type = String(
      providerError.type || providerError.code || ''
    ).replace(/[\r\n\t]+/g, ' ').trim().slice(0, 120)
    const message = String(providerError.message || '')
      .replace(/[\r\n\t]+/g, ' ')
      .trim()
      .slice(0, 500)
    return [type, message].filter(Boolean).join(': ')
  } catch {
    return ''
  }
}

function modelTarget(config = {}) {
  let host = ''
  try {
    host = new URL(String(config.baseUrl || '')).host
  } catch {}
  const target = [host, String(config.model || '').trim()]
    .filter(Boolean)
    .join('/')
  return [String(config.source || '').trim(), target]
    .filter(Boolean)
    .join('@')
    .slice(0, 240)
}

function stripReasoning(text) {
  return String(text || '')
    .replace(/^\uFEFF/, '')
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .trim()
}

function fencedCandidates(text) {
  const values = []
  const pattern = /```(?:json|javascript|js)?\s*([\s\S]*?)```/gi
  let match
  while ((match = pattern.exec(text))) values.push(match[1].trim())
  return values.reverse()
}

function balancedObjectCandidates(text) {
  const values = []
  let start = -1
  let depth = 0
  let inString = false
  let escaped = false

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]
    if (inString) {
      if (escaped) escaped = false
      else if (char === '\\') escaped = true
      else if (char === '"') inString = false
      continue
    }
    if (char === '"') {
      inString = true
      continue
    }
    if (char === '{') {
      if (depth === 0) start = index
      depth += 1
    } else if (char === '}' && depth > 0) {
      depth -= 1
      if (depth === 0 && start >= 0) {
        values.push(text.slice(start, index + 1))
        start = -1
      }
    }
  }
  return values.reverse()
}

function escapeRawControlsInsideStrings(text) {
  let result = ''
  let inString = false
  let escaped = false
  for (const char of text) {
    if (inString) {
      if (escaped) {
        result += char
        escaped = false
        continue
      }
      if (char === '\\') {
        result += char
        escaped = true
        continue
      }
      if (char === '"') {
        result += char
        inString = false
        continue
      }
      if (char === '\n') { result += '\\n'; continue }
      if (char === '\r') { result += '\\r'; continue }
      if (char === '\t') { result += '\\t'; continue }
      result += char
      continue
    }
    result += char
    if (char === '"') inString = true
  }
  return result
}

function removeTrailingCommas(text) {
  let result = ''
  let inString = false
  let escaped = false
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]
    if (inString) {
      result += char
      if (escaped) escaped = false
      else if (char === '\\') escaped = true
      else if (char === '"') inString = false
      continue
    }
    if (char === '"') {
      inString = true
      result += char
      continue
    }
    if (char === ',') {
      let cursor = index + 1
      while (/\s/.test(text[cursor] || '')) cursor += 1
      if (text[cursor] === '}' || text[cursor] === ']') continue
    }
    result += char
  }
  return result
}

function parseCandidate(candidate) {
  const variants = []
  const raw = String(candidate || '').trim()
  if (!raw) return null
  variants.push(raw)
  const escaped = escapeRawControlsInsideStrings(raw)
  if (escaped !== raw) variants.push(escaped)
  const noTrailingCommas = removeTrailingCommas(escaped)
  if (noTrailingCommas !== escaped) variants.push(noTrailingCommas)

  for (const value of variants) {
    try {
      let parsed = JSON.parse(value)
      if (typeof parsed === 'string') parsed = JSON.parse(parsed)
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed
    } catch {}
  }
  return null
}

export function parseJsonResponse(text) {
  if (text && typeof text === 'object' && !Array.isArray(text)) return text
  const raw = stripReasoning(text)
  if (!raw) throw new Error('Model response is empty')

  const candidates = [...fencedCandidates(raw), raw, ...balancedObjectCandidates(raw)]
  const seen = new Set()
  for (const candidate of candidates) {
    if (!candidate || seen.has(candidate)) continue
    seen.add(candidate)
    const parsed = parseCandidate(candidate)
    if (parsed) return parsed
  }
  throw new Error('Model response must be valid JSON')
}

export async function callCourseModel({ role, prompt, signal, config: overrideConfig }) {
  const config = requireCourseModelConfig(role, overrideConfig)
  const startedAt = new Date().toISOString()
  const configuredTimeout = Number(process.env.COURSE_AI_TIMEOUT_MS || 240_000)
  const timeoutMs = Number.isFinite(configuredTimeout) && configuredTimeout > 0
    ? Math.min(240_000, Math.max(10_000, Math.floor(configuredTimeout)))
    : 240_000
  const configuredRetries = Number(process.env.COURSE_AI_JSON_RETRIES ?? 1)
  const jsonRetries = Number.isFinite(configuredRetries)
    ? Math.min(2, Math.max(0, Math.floor(configuredRetries)))
    : 1
  // JSON retries and any outline-repair call share the enclosing batch deadline.
  const batchDeadline = Number(overrideConfig?.deadlineAt)
  const deadlineAt = Math.min(
    Date.now() + timeoutMs,
    Number.isFinite(batchDeadline) && batchDeadline > 0 ? batchDeadline : Infinity
  )
  let lastParseError = null

  function transportError(error, phase, attempt, elapsedBudget, timedOut, cancelled) {
    const message = timedOut
      ? `Course model call timed out after ${elapsedBudget}ms (${phase})`
      : cancelled ? 'Course model call cancelled' : 'Course model network request failed'
    const wrapped = new Error(message, { cause: error })
    wrapped.code = timedOut ? 'course_model_timeout'
      : cancelled ? 'course_model_cancelled' : 'course_model_request_failed'
    wrapped.retryable = !cancelled
    wrapped.meta = {
      provider: config.provider, model: config.model, role, phase, timeoutMs: elapsedBudget,
      startedAt, endedAt: new Date().toISOString(), attempt: attempt + 1
    }
    return wrapped
  }

  for (let attempt = 0; attempt <= jsonRetries; attempt += 1) {
    if (signal?.aborted) {
      throw transportError(signal.reason, 'before-request', attempt, 0, false, true)
    }
    const remainingMs = Math.ceil(deadlineAt - Date.now())
    if (remainingMs <= 0) {
      throw transportError(null, 'before-request', attempt, timeoutMs, true, false)
    }
    const timeout = new AbortController()
    const timer = setTimeout(() => timeout.abort(
      new DOMException('Course model time budget expired', 'TimeoutError')
    ), remainingMs)
    timer.unref?.()
    const requestSignal = signal
      ? AbortSignal.any([signal, timeout.signal])
      : timeout.signal
    const messages = [
      { role: 'system', content: prompt.system },
      { role: 'user', content: prompt.user }
    ]
    if (attempt > 0) messages.push({
      role: 'user',
      content: '上一次响应未能解析为合法 JSON。请重新完成同一任务，只返回一个严格合法、可由 JSON.parse 直接解析的 JSON 对象；字符串中的换行必须正确转义，不要输出思考过程、代码围栏、注释或前后说明。'
    })

    let response
    let body
    let phase = 'request'
    try {
      response = await fetch(`${config.baseUrl}/chat/completions`, {
        method: 'POST',
        signal: requestSignal,
        headers: {
          authorization: `Bearer ${config.apiKey}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          model: config.model,
          messages,
          temperature: attempt > 0 ? 0 : Number(process.env.COURSE_AI_TEMPERATURE || 0.2),
          response_format: { type: 'json_object' }
        })
      })
      phase = 'response-body'
      body = await response.text()
    } catch (error) {
      const timedOut = timeout.signal.aborted || error?.name === 'TimeoutError'
      const cancelled = !timedOut && Boolean(signal?.aborted)
      throw transportError(error, phase, attempt, remainingMs, timedOut, cancelled)
    } finally {
      clearTimeout(timer)
    }

    const endedAt = new Date().toISOString()
    if (!response.ok) {
      const detail = providerErrorDetail(body)
      const error = new Error([
        `Course model call failed: ${response.status}`,
        modelTarget(config),
        detail
      ].filter(Boolean).join(' · '))
      error.meta = { provider: config.provider, model: config.model, role, startedAt, endedAt, status: response.status, attempt: attempt + 1 }
      throw error
    }

    let data
    try {
      data = body ? JSON.parse(body) : {}
    } catch {
      throw new Error('Course model endpoint returned invalid JSON')
    }
    const content = extractCourseModelContent(data)
    try {
      const parsed = parseJsonResponse(content)
      return {
        parsed,
        trace: {
          provider: config.provider,
          model: config.model,
          role,
          promptVersion: prompt.version || 'course-workflow-v3',
          startedAt,
          endedAt,
          promptChars: prompt.user.length + prompt.system.length,
          completionChars: typeof content === 'string' ? content.length : JSON.stringify(content || {}).length,
          attempts: attempt + 1,
          usage: data.usage || null
        }
      }
    } catch (error) {
      lastParseError = error
    }
  }

  const error = new Error('模型返回格式异常，自动修复后仍无法读取')
  error.cause = lastParseError
  error.meta = { provider: config.provider, model: config.model, role, startedAt, endedAt: new Date().toISOString(), attempts: jsonRetries + 1 }
  throw error
}
