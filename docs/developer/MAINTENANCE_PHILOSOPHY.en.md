# Maintenance and change-control philosophy

This document is for **core maintainers and frequent contributors**. Read it together with [Contributing](https://github.com/notionnext-org/NotionNext/blob/main/CONTRIBUTING.md) and [Contribution workflow](./CONTRIBUTION_WORKFLOW.en.md). The goal is to welcome contributions while **reducing large, hard-to-control changes** that destabilize `main` and fork ecosystems.

## Principles

1. **Small, reviewable, revertible steps**: Prefer several focused PRs over one huge, hard-to-review batch.
2. **Intent before code**: For behavior or data-contract changes, align scope in an Issue or Discussion before opening the PR.
3. **Protect core paths**: Data layer, routing, global config, and build/export pipelines affect the whole project—PRs should explain motivation, risk, and how they were verified.
4. **No unrelated refactors mixed in**: Do not bundle wide renames, mass formatting, or major dependency bumps with unrelated fixes or features; split PRs when needed.
5. **Dependencies and toolchain**: Major framework or lockfile-policy upgrades need rationale, breaking-change notes, and regression checks (build, critical-path tests).

## Suggested PR sizing

| Kind | Suggested approach |
| --- | --- |
| Bugfix | Minimal fix + tests or clear repro notes |
| Small feature / theme-local | Keep within theme or a single module boundary; avoid drive-by shared-layer edits |
| Cross-theme / shared API | Agree API and defaults in an Issue first; keep migrations documented |
| Breaking changes | Document version/config migration; split into phases if it helps reviewers |

## High-impact areas (extra clarity expected)

Changes here tend to affect all sites or many themes—**PR descriptions and verification notes should be stronger** (whether two-person review is required is up to owners and maintainers):

- `lib/db/` (including `SiteDataApi`, Notion fetch and caching)
- `pages/` SSG/ISR, i18n, and build-lifecycle logic
- `next.config.js` and export/build scripts
- Global config (`blog.config.js`, `lib/config.js`, and similar defaults)
- Security-sensitive areas: auth, secrets, third-party callbacks, CSP, etc.

## Keeping the project from drifting

- **Prefer opt-in or configurable behavior** for niche site assumptions; avoid baking them into global defaults.
- **Theme isolation**: Keep theme-specific logic under `themes/<name>/`; avoid encoding one theme’s UI or routing in shared layers.
- **Docs in lockstep**: When user-visible behavior or config keys change, update docs (EN/ZH as applicable) in the same or a follow-up PR.

## GitHub roles (for owners)

Repository **owners** (personal repo owner, or org owners) can invite trusted maintainers (for example [@qianzhu18](https://github.com/qianzhu18)) as collaborators with **Write**, **Maintain**, or **Admin**, depending on how much repo administration you want to delegate.

If **branch protection** or **third-party checks** (e.g. deploy authorization) often block merges, either add trusted actors under **bypass** in **Settings → Branches**, or agree explicitly when owners merge on behalf of maintainers.

Exact GitHub UI labels change over time; governance (who may merge, when bypass is acceptable) should be agreed in writing among maintainers, not only implied by defaults.

## Related docs

- [Contribution workflow](./CONTRIBUTION_WORKFLOW.en.md)
- [Architecture](./ARCHITECTURE.en.md), [Project structure](./PROJECT_STRUCTURE.en.md)

Revise this document as the project evolves; for major edits, leave a short note in an Issue or Discussion so future readers understand the rationale.
