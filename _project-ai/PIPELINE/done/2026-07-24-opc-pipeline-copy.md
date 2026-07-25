# Task: Update OPC theme copy for pipeline workflow

```yaml
id: 2026-07-24-opc-pipeline-copy
type: documentation
goal: Update the OPC theme introduction to describe the new task-pipeline AI operating model.
priority: high
inputs:
  - _project-ai/WORKFLOW.md
  - themes/opc/config.js
  - conf/themeSwitch.manifest.js
  - docs/user-guide/themes/opc.md
deliverables:
  - themes/opc/config.js
  - conf/themeSwitch.manifest.js
  - docs/user-guide/themes/opc.md
  - docs/user-guide/themes/THEMES_CATALOG.md
acceptance:
  - OPC copy no longer presents AI work as simulated company departments.
  - OPC copy explains task files, deliverables, acceptance, and retryable pipeline work.
  - No runtime theme code is changed.
limits:
  max_turns: 4
  max_retries: 1
  max_duration_minutes: 20
  max_cost_yuan: 0
blocked_format:
  reason:
  required_input:
  retry_scope:
```

## Result

```yaml
status: done
task_id: 2026-07-24-opc-pipeline-copy
deliverables:
  - themes/opc/config.js
  - conf/themeSwitch.manifest.js
  - docs/user-guide/themes/opc.md
  - docs/user-guide/themes/THEMES_CATALOG.md
checks:
  - diff inspection
blocked: none
```
