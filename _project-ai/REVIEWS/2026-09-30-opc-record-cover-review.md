# Review: 2026-09-30-opc-record-cover

```yaml
task_id: 2026-09-30-opc-record-cover
status: accepted
deliverables:
  - themes/opc/index.js
checks:
  - rule: Covered records display a responsive cover beside their text on desktop and above it on narrow screens.
    result: pass; inspected local previews at desktop and 390px widths.
  - rule: The record heading divider does not collide with card borders.
    result: pass; inspected the updated records preview.
  - rule: The archive page uses the wider content shell without widening other PageShell pages.
    result: pass; inspected the archive preview and confirmed the prop is scoped to LayoutArchive.
  - rule: Formatting and whitespace checks pass.
    result: pass; Prettier and git diff --check.
failed_rules: []
retry_scope: []
notes:
  - No review findings.
```
