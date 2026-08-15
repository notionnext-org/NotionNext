# Themes Documentation

[中文](./README.md)

This directory centralizes documentation for all themes, including design intent, configuration, and migration notes.

## Theme Index

| Theme | English Docs | 中文文档 |
| --- | --- | --- |
| Claude | [CLAUDE.en.md](./CLAUDE.en.md) | [CLAUDE.md](./CLAUDE.md) |
| Endspace | [ENDSPACE.en.md](./ENDSPACE.en.md) | [ENDSPACE.md](./ENDSPACE.md) |
| Fuwari | [FUWARI.md](./FUWARI.md) | [FUWARI.md](./FUWARI.md) |
| ThoughtLite (WIP) | [THOUGHTLITE.en.md](./THOUGHTLITE.en.md) | [THOUGHTLITE.md](./THOUGHTLITE.md) · [plan (zh)](./THOUGHTLITE_MIGRATION_PLAN.zh-CN.md) |

## Maintenance Rules

- **For theme authors**: building and maintaining themes is substantial work. Today the primary path is contributing **free, redistributable** themes via the **main GitHub repo**. If paid themes, a private author repo, or paid private deployment are introduced later, follow the roadmap in [THEME_MIGRATION_GUIDE §8.4](../THEME_MIGRATION_GUIDE.md) and official announcements.
- Every new theme should add docs in this directory (at least features, configuration, and enablement steps).
- If a theme changes global files, document the global impact explicitly in its theme doc.
- Keep `docs/README.md` and `docs/README.en.md` as navigators; place theme details here.
- **When merging into the upstream repo**: besides `themes/<id>/`, commit **`<id>.png`** and **`<id>.webp`** under **`public/images/themes-preview/`**, and add **`name` / `summary`** (and optional **`cover` / `coverWebp`**, **`tier`**) to **`THEME_SWITCH_MANIFEST`** in **`conf/themeSwitch.manifest.js`**; see [THEME_MIGRATION_GUIDE §8](../THEME_MIGRATION_GUIDE.md) ([中文 §8](../THEME_MIGRATION_GUIDE.zh-CN.md)). Local-only themes do not require this.
