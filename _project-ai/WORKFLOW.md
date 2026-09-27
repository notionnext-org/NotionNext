# NotionNext AI Pipeline Workflow

This project does not use multi-agent "company meeting" collaboration.

Use a pipeline:

```text
goal -> task file -> one temporary executor -> deliverable -> review -> done or partial retry
```

## Core Rules

1. Buy or integrate mature solutions first. If that is not available, copy proven competitor patterns. Build custom only last.
2. Agents do not freely chat, escalate through role chains, or relay each other's words.
3. Each agent is a capability entry, not a permanent department.
4. One executor takes one task, delivers files, and exits.
5. The director only breaks down work, sets priority, validates, decides, and asks the user for key resources.
6. Before business work starts, there must be a task file, deliverable path, and acceptance rules.
7. Do not build large features, platforms, or complex systems before data validates the need.

## Local Structure

```text
_project-ai/
  PIPELINE/
    ready/
    running/
    review/
    blocked/
    done/
  DELIVERABLES/
  REVIEWS/
  METRICS/
  templates/
    TASK_TEMPLATE.md
    REVIEW_TEMPLATE.md
  WORKFLOW.md
  TASK_BOARD.md
  REPORTS.md
```

## Capability Entries

- Director: task breakdown, priority, validation, decisions, user approvals.
- QA: review only; output review files.
- Visual Assets: output prompts, screenshots, or asset packs only.
- Publishing Ops: output release, GitHub, deployment, or community action plans only.
- Development: edit only task-specified code paths.
- Market Research: output research files only.

Do not create assistant layers for pure forwarding.

## Task Flow

1. User gives a goal.
2. Director creates a standard task file in `PIPELINE/ready/`.
3. Executor moves exactly one task to `PIPELINE/running/`.
4. Executor writes deliverables under `DELIVERABLES/` or the task-specified repo paths.
5. Executor fills the task result and moves it to `PIPELINE/review/`.
6. QA or Director writes a review under `REVIEWS/`.
7. Accepted tasks move to `PIPELINE/done/`.
8. Rejected tasks create a retry task only for the failed scope.
9. Blocked tasks move to `PIPELINE/blocked/` with the structured blocker.

## Required Task Fields

- `id`
- `type`
- `goal`
- `priority`
- `inputs`
- `deliverables`
- `acceptance`
- `limits`
- `blocked_format`

Use `templates/TASK_TEMPLATE.md`.

## Human Approval Required

Stop and ask the user before:

- spending money
- publishing
- using real accounts
- connecting payment
- taking copyright or compliance risk
- changing production environment
- merging or closing non-obvious public PRs
- broad refactors

## NotionNext Defaults

- Inspect live repo and GitHub state before issue, PR, release, or support work.
- Keep dirty worktrees clean by changing only task-owned files.
- For publishable fixes on a dirty checkout, use a clean worktree from `origin/main`.
- For Chinese or other non-ASCII GitHub comments, write a UTF-8 body file and use `gh ... --body-file`.
- Prefer the smallest root-cause fix over caller-local or theme-local workarounds.
- Public community replies should be friendly, concrete, and contributor-retaining.

## Validation

Use the cheapest proof that catches the failure:

- docs navigation or VitePress pages: `yarn docs:site:build`
- shared code behavior: targeted Jest first
- UI behavior: screenshot or browser check
- GitHub triage: inspect live issue/PR state first

Do not measure AI activity. Measure accepted deliverables, retry count, cost, cycle time, and business outcome.

## Director Command

When the user says:

```text
按流水线模式推进。先检查 PIPELINE/ready，有任务就派发；没有任务就创建任务文件。不要直接做业务，等我批准关键节点。
```

The director must inspect `PIPELINE/ready/`, create or dispatch one smallest verifiable task, and stop at the configured approval point.
