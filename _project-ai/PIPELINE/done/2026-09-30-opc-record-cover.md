# Task: Show article covers in OPC record lists

```yaml
id: 2026-09-30-opc-record-cover
type: frontend-fix
goal: Display article covers in OPC record cards, with a compact side-by-side desktop layout.
priority: normal
inputs:
  - themes/opc/index.js
deliverables:
  - themes/opc/index.js
acceptance:
  - Record cards render pageCoverThumbnail or pageCover with the date, title, and summary.
  - On desktop, cover and text appear side by side with a compact cover width.
  - On narrow screens, cover stays above the record text.
  - Records without a cover keep the existing compact text layout.
  - Shared record cards update the home preview, archive, and search lists.
  - The archive page uses a wide desktop content container.
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

## Requirement history

- Current view: Use a lightly tinted, bordered record card. On desktop, show the cover on the left and the date, title, summary, and reading cue on the right; stack cover and text on narrow screens. Give the archive page a wide desktop content container.
- `REQ-2026-09-30-02` · Quote: “封面太大了，桌面端 左右排列把” · Interpretation: Reduce desktop cover size and arrange each covered record horizontally. · Status: accepted · Replaces: none.
- `REQ-2026-09-30-03` · Quote: “略显空旷，能否调整布局美化一下” · Interpretation: Tighten the record layout with clearer card boundaries and hierarchy while preserving the responsive side-by-side layout. · Status: accepted · Replaces: none.
- `REQ-2026-09-30-04` · Quote: “文章列表顶部和底部的边框和文章卡牌重叠了” · Interpretation: Remove the records heading divider that visually collides with the first card border. · Status: accepted · Replaces: none.
- `REQ-2026-09-30-05` · Quote: “归档页面太小气” · Interpretation: Widen the archive page so its content uses more of the available desktop width. · Status: accepted · Replaces: none.

## Result

```yaml
status: done
task_id: 2026-09-30-opc-record-cover
deliverables:
  - themes/opc/index.js
checks:
  - Local desktop preview confirms a compact horizontal card layout; 390px preview keeps covers stacked above text.
  - Records heading divider is removed so it no longer touches the first card border.
  - Archive page preview uses the wide content width while other PageShell pages keep their narrow width.
  - Browser console reported 0 errors at both viewport sizes.
  - Prettier check passed.
  - git diff --check
blocked: none
```
