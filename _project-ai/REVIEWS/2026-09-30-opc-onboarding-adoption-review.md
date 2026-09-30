# Review: OPC onboarding and adoption

```yaml
review_type: theme-usability
task_id: 2026-09-30-opc-onboarding
status: accepted
scope:
  - themes/opc/config.js
  - themes/opc/index.js
  - conf/themeSwitch.manifest.js
  - docs/user-guide/themes/opc.md
requirements:
  - quote: '这个主题是开源共享的，所以最好所有人都可以轻松上手使用，并且已经在用的人可以快速适应'
    interpretation: First-use defaults, setup steps, and compatibility must support new and existing NotionNext users.
    status: accepted
resolved:
  - id: OPC-ONBOARD-01
    result: Empty identity settings now inherit the site's title/author, and default calls to action target local page sections.
    evidence:
      - themes/opc/config.js
      - themes/opc/index.js
      - conf/themeSwitch.manifest.js
  - id: OPC-ONBOARD-02
    result: Legacy comma-separated labels retain their known defaults; custom entries can declare stage and detail, and running counts use parsed stages.
    evidence:
      - themes/opc/index.js
      - docs/user-guide/themes/opc.md
  - id: OPC-ONBOARD-03
    result: Setup guide now explains query, Notion Config, and environment/config precedence.
    evidence:
      - docs/user-guide/themes/opc.md
      - pages/_app.js
  - id: OPC-ONBOARD-04
    result: Documentation no longer promises a fixed contrast ratio for user-defined colors.
    evidence:
      - docs/user-guide/themes/opc.md
      - lib/themeConsoleStyle.js
checks:
  - PR #4541 CI passed.
  - Deployed PR preview inspected at desktop and 390px mobile widths; no browser errors.
  - Prettier check passed for themes/opc/config.js and themes/opc/index.js; git diff --check passed.
failed_rules: []
retry_scope: []
notes:
  - Local preview in the managed worktree could not resolve dependencies through a Windows junction; the deployed PR preview was used for browser review.
```
