# Task: Improve OPC theme onboarding and adoption

```yaml
id: 2026-09-30-opc-onboarding
type: frontend-fix
goal: Resolve the onboarding and compatibility findings from the OPC theme review.
priority: normal
inputs:
  - _project-ai/REVIEWS/2026-09-30-opc-onboarding-adoption-review.md
deliverables:
  - themes/opc/config.js
  - themes/opc/index.js
  - conf/themeSwitch.manifest.js
  - docs/user-guide/themes/opc.md
acceptance:
  - First-use identity comes from the current site and default links stay on the site.
  - Existing comma-separated direction lists keep their current behavior.
  - Custom directions can define their own stage and detail, and counts match.
  - Theme precedence and custom color contrast behavior are documented accurately.
limits:
  max_turns: 4
blocked_format:
  reason:
  required_input:
  retry_scope:
```

## Requirement history

- Current view: Make OPC safe to activate on another person's site, easy to configure, compatible with existing NotionNext settings, and clear about its limits.
- `REQ-2026-09-30-06` · Quote: “这个主题是开源共享的，所以最好所有人都可以轻松上手使用，并且已经在用的人可以快速适应” · Interpretation: Review and improve first-use defaults, setup documentation, and compatibility for existing users. · Status: accepted · Replaces: none.
- `REQ-2026-09-30-07` · Quote: “想办法优化提交对饮补丁” · Interpretation: Apply the corresponding review fixes and update the existing pull request. · Status: accepted · Replaces: none.

## Result

```yaml
status: done
task_id: 2026-09-30-opc-onboarding
deliverables:
  - themes/opc/config.js
  - themes/opc/index.js
  - conf/themeSwitch.manifest.js
  - docs/user-guide/themes/opc.md
checks:
  - PR #4541 CI passed: lint/type-check, unit tests, VitePress build, build, and CodeQL.
  - PR preview inspected at desktop and 390px mobile widths; primary links navigate to their page sections.
  - Browser console reported 0 errors; one existing Next.js runtime-config deprecation warning remains.
  - Prettier check passed for themes/opc/config.js and themes/opc/index.js.
  - git diff --check passed.
blocked: none
```
