# ThoughtLite theme (NotionNext)

[中文](./THOUGHTLITE.md) | Task plan (Chinese): [THOUGHTLITE_MIGRATION_PLAN.zh-CN.md](./THOUGHTLITE_MIGRATION_PLAN.zh-CN.md)

This document is for **developers who maintain the ThoughtLite port** in NotionNext: why it exists, upstream provenance, original author repository, compliance notes, and day-to-day maintenance.

---

## 1. Why it was added

- **Community request**: [Issue #3987](https://github.com/notionnext-org/NotionNext/issues/3987) proposed a new theme inspired by the open-source Astro theme **ThoughtLite** (timeline-style home, reading-first layout).
- **Goal**: Provide an optional React skin that **stays compatible with NotionNext data contracts** (`posts`, `post`, `customNav`, comments, plugins, etc.) while **approximating ThoughtLite’s look and information architecture**.

---

## 2. Upstream, author, and repositories

| Item | Link |
|------|------|
| **Upstream theme** | ThoughtLite (Astro) |
| **Author** | [tuyuritio](https://github.com/tuyuritio) |
| **Upstream source** | [tuyuritio/astro-theme-thought-lite](https://github.com/tuyuritio/astro-theme-thought-lite) |
| **Live demo** | [thought-lite.ttio.workers.dev](https://thought-lite.ttio.workers.dev/) |
| **Upstream stack** | Astro, Svelte, Tailwind CSS (see upstream README) |
| **Upstream license** | **GPL-3.0** |

NotionNext is primarily **MIT**. This theme is implemented as a **design-informed React rewrite**, **without copying** upstream `.astro` / `.svelte` source wholesale. If someone later wants to vendor GPL code paths, maintainers must assess **GPL/MIT compatibility** (see [migration plan §0](./THOUGHTLITE_MIGRATION_PLAN.zh-CN.md)).

---

## 3. Mapping in this repo

| Item | Location |
|------|----------|
| **Theme folder** | `themes/thoughtlite/` |
| **Root scope** | `#theme-thoughtlite` |
| **Config keys** | `THOUGHTLITE_*` in `themes/thoughtlite/config.js` via `siteConfig(..., CONFIG)` |
| **Baseline** | Started from `themes/example`, then restyled toward ThoughtLite |
| **Shared features** | `@/components/*` (Notion body, comments, search, etc.) |

---

## 4. Features (maintenance map)

- **Header**: title, horizontal nav (incl. custom menu), search, theme toggle (`Header.js`, `MenuList.js`, `MenuItemDrop.js`).
- **Home**: optional **Latest** card; **timeline** grouped by `publishDay` (`HomeTimeline.js`, `BlogItem` `timeline` variant); respects global `POST_LIST_STYLE` (page vs scroll).
- **Post**: card header, `PostMeta`, `NotionPage`, `ShareBar`, comments (`dynamic` without SSR), sidebar TOC (`LayoutSlug` in `index.js`).
- **Archive / category / tag / search**: `TlPageHero`; archive uses the same rail style; taxonomy uses `tl-chip` (`style.js`).
- **Footer**: copyright, beian, `PoweredBy`, plus **ThoughtLite name + upstream repo and author links** (`Footer.js`).
- **Theme switcher**: `conf/themeSwitch.manifest.js` entry `thoughtlite`; previews under `public/images/themes-preview/thoughtlite.{png,webp}` (replace placeholders before release; optionally run `yarn perf:compress-theme-previews`).

---

## 5. Config keys (`themes/thoughtlite/config.js`)

| Key | Purpose |
|-----|---------|
| `THOUGHTLITE_MENU_*` | Show/hide nav entries (category, tag, archive, search) |
| `THOUGHTLITE_HOME_TIMELINE` | Timeline on bare home routes |
| `THOUGHTLITE_HOME_LATEST_CARD` | Latest summary card on home |
| `THOUGHTLITE_SIDEBAR_ONLY_ON_POST` | Sidebar only on post detail |
| `THOUGHTLITE_POST_LIST_COVER` | Cover thumbnails in list mode |
| `THOUGHTLITE_TITLE_IMAGE` | Hero background image on non-post title bar |
| `THOUGHTLITE_HOME_MINIMAL_HEADER` | Minimal home title area |
| `THOUGHTLITE_ARTICLE_LAYOUT_VERTICAL` | Stack main + sidebar on posts |
| `THOUGHTLITE_ARTICLE_HIDDEN_NOTIFICATION` | Hide announcement on post |

Global **`LAYOUT_SIDEBAR_REVERSE`** still applies at site level.

---

## 6. Enable

```bash
NEXT_PUBLIC_THEME=thoughtlite
```

Use `yarn dev` locally; `?theme=thoughtlite` may work where the app exposes theme switching.

---

## 7. Maintenance checklist

1. Prefer editing **`#theme-thoughtlite`** tokens and classes in `themes/thoughtlite/style.js`.
2. Layout entry points: `themes/thoughtlite/index.js` (`Layout*`); presentational pieces under `themes/thoughtlite/components/`.
3. When **matching upstream visuals**, reference the [public demo](https://thought-lite.ttio.workers.dev/)—avoid pasting **GPL source files**; document any exception in the PR.
4. Timeline relies on **`publishDay` / `publishDate`** from Notion mapping (`lib/db/notion/getPageProperties.js`).
5. Cross-theme conventions: see [FUWARI.md](./FUWARI.md) and [THEME_MIGRATION_GUIDE](../THEME_MIGRATION_GUIDE.md).
6. Refresh theme previews under `public/images/themes-preview/` when the UI changes materially.
7. Smoke test: `yarn lint --dir themes/thoughtlite` and click through main routes with `NEXT_PUBLIC_THEME=thoughtlite`.

---

## 8. Links

- Issue: [notionnext-org/NotionNext#3987](https://github.com/notionnext-org/NotionNext/issues/3987)
- Upstream: [tuyuritio/astro-theme-thought-lite](https://github.com/tuyuritio/astro-theme-thought-lite)
- Demo: [thought-lite.ttio.workers.dev](https://thought-lite.ttio.workers.dev/)

---

## 9. Status

This is an **initial, merge-ready port**: core flows work; **further polish** (tokens, spacing, motion, a11y, plugin edge cases) is expected in follow-up PRs.
