# Task: Rebuild OPC as an AI operating studio landing page

```yaml
id: 2026-09-19-opc-theme-rebuild
type: frontend
goal: Rebuild the OPC homepage into a distinctive one-person AI studio landing page while preserving NotionNext compatibility.
priority: high
inputs:
  - themes/opc/index.js
  - themes/opc/config.js
  - live homepage review on 2026-09-19
deliverables:
  - themes/opc/index.js
  - themes/opc/config.js
acceptance:
  - The homepage has a clear visual thesis and a strong first-screen hierarchy.
  - The workflow is shown as a live task pipeline rather than equal-weight explanatory cards.
  - Current directions have visual hierarchy, status, and purposeful interaction.
  - Existing OPC config keys and non-home layouts remain compatible.
  - Desktop and narrow viewport behavior are browser checked.
limits:
  max_turns: 6
  max_retries: 2
  max_duration_minutes: 90
  max_cost_yuan: 0
blocked_format:
  reason:
  required_input:
  retry_scope:
```

## Result

```yaml
status: done
task_id: 2026-09-19-opc-theme-rebuild
deliverables:
  - themes/opc/index.js
  - themes/opc/config.js
checks:
  - yarn eslint themes/opc/index.js themes/opc/config.js
  - yarn type-check
  - yarn build
  - browser desktop preview
  - browser 390x844 preview
  - browser dark-mode preview
blocked: none
```
