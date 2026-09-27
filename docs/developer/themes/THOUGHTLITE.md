# ThoughtLite 主题（NotionNext）

[English](./THOUGHTLITE.en.md) | 任务计划：[THOUGHTLITE_MIGRATION_PLAN.zh-CN.md](./THOUGHTLITE_MIGRATION_PLAN.zh-CN.md)

本文面向**后续维护本主题的开发者**，说明主题加入原因、上游来源、原作者仓库、合规注意与日常维护要点。

---

## 1. 加入背景与原因

- **社区提议**：用户在 [Issue #3987](https://github.com/notionnext-org/NotionNext/issues/3987) 中建议新增主题，参考对象为开源 Astro 主题 **ThoughtLite**，认为其阅读向、时间线式首页与轻量导航适合作为 NotionNext 的可选皮肤之一。
- **产品目标**：在 **不破坏 NotionNext 既有数据契约**（`posts` / `post` / `customNav` / 评论与插件等）的前提下，提供一套**视觉与信息架构上贴近 ThoughtLite** 的 React 主题，便于站点一键切换试用。

---

## 2. 来源、原作者与仓库

| 说明 | 链接 |
|------|------|
| **上游主题名** | ThoughtLite（Astro 生态） |
| **原作者 GitHub** | [tuyuritio](https://github.com/tuyuritio) |
| **上游源码仓库** | [tuyuritio/astro-theme-thought-lite](https://github.com/tuyuritio/astro-theme-thought-lite) |
| **上游在线演示** | [thought-lite.ttio.workers.dev](https://thought-lite.ttio.workers.dev/) |
| **上游技术栈** | Astro、Svelte、Tailwind CSS 等（见上游 README） |
| **上游许可证** | **GPL-3.0** |

NotionNext 本仓库主体为 **MIT**。本主题目录下的实现为 **基于上游「设计参考」在 Next.js + React 中重写**，**不直接复制**上游 `.astro` / `.svelte` 等 GPL 源码文本；若未来有人希望合入上游组件源码，须由维护者单独评估 **GPL 与 MIT 的兼容性**（详见 [迁移计划 §0](./THOUGHTLITE_MIGRATION_PLAN.zh-CN.md)）。

---

## 3. 与本仓库的对应关系

| 维度 | 说明 |
|------|------|
| **主题目录** | `themes/thoughtlite/` |
| **根节点** | `#theme-thoughtlite`（样式与全局隔离） |
| **配置前缀** | `THOUGHTLITE_*`，集中在 `themes/thoughtlite/config.js`，通过 `siteConfig('KEY', default, CONFIG)` 读取 |
| **起点** | 初期由 `themes/example` 骨架复制并改名，再逐步替换为 ThoughtLite 取向的 UI |
| **通用逻辑** | 评论、Notion 正文、搜索等复用 `@/components/*`，与其它主题一致 |

---

## 4. 功能概览（维护时对照）

- **顶栏**：站点标题、横向导航（含自定义菜单）、搜索入口、深浅色切换（`components/Header.js`、`MenuList.js`、`MenuItemDrop.js`）。
- **首页**：可选 **Latest** 卡片、按 **`publishDay`** 分组的时间线列表（`HomeTimeline.js`、`BlogItem` 的 `timeline` 变体）；支持分页 / 滚动列表两种全局 `POST_LIST_STYLE`。
- **文章页**：卡片式标题区、`PostMeta`、`NotionPage`、`ShareBar`、评论区（`dynamic` 关闭 SSR）、侧栏目录等（`index.js` 中 `LayoutSlug`）。
- **归档 / 分类 / 标签 / 搜索**：统一 `TlPageHero` 页头；归档为时间线侧轨；分类与标签为 `tl-chip`（`style.js`）。
- **页脚**：版权、备案、`PoweredBy`，以及 **ThoughtLite 主题名 + 上游仓库与原作者链接**（`components/Footer.js`）。
- **主题切换**：`conf/themeSwitch.manifest.js` 中 `thoughtlite` 条目；预览图 `public/images/themes-preview/thoughtlite.{png,webp}`（当前可为占位图，发布前建议替换真实截图并执行 `yarn perf:compress-theme-previews`）。

---

## 5. 配置项一览（`themes/thoughtlite/config.js`）

| 键 | 含义 |
|----|------|
| `THOUGHTLITE_MENU_CATEGORY` / `TAG` / `ARCHIVE` / `SEARCH` | 顶栏是否展示对应菜单项 |
| `THOUGHTLITE_HOME_TIMELINE` | 纯首页是否使用按日时间线 |
| `THOUGHTLITE_HOME_LATEST_CARD` | 首页是否展示 Latest 摘要块 |
| `THOUGHTLITE_SIDEBAR_ONLY_ON_POST` | 是否仅在文章详情页显示侧栏 |
| `THOUGHTLITE_POST_LIST_COVER` | 列表是否显示封面（时间线场景建议 `false`） |
| `THOUGHTLITE_TITLE_IMAGE` | 非文章页的 TitleBar 是否使用背景大图 |
| `THOUGHTLITE_HOME_MINIMAL_HEADER` | 首页是否隐藏大块 TitleBar |
| `THOUGHTLITE_ARTICLE_LAYOUT_VERTICAL` | 文章页主区与侧栏是否改为上下堆叠 |
| `THOUGHTLITE_ARTICLE_HIDDEN_NOTIFICATION` | 文章页是否隐藏公告 |

全局项 **`LAYOUT_SIDEBAR_REVERSE`** 仍由站点级配置控制，与本主题 `LayoutBase` 共同作用。

---

## 6. 启用方式

```bash
# .env.local 或部署环境
NEXT_PUBLIC_THEME=thoughtlite
```

本地开发：`yarn dev` 后访问站点；也可用 URL 参数 `?theme=thoughtlite` 在支持主题切换的场景下试用（以实际路由与配置为准）。

---

## 7. 迁移与维护事项（给后续开发者）

1. **改样式优先** `themes/thoughtlite/style.js` 中的 **`#theme-thoughtlite`** 下 CSS 变量与类名，避免污染其它主题。
2. **改布局与路由** 以 `themes/thoughtlite/index.js` 中各 `Layout*` 为入口；列表子组件在 `themes/thoughtlite/components/`。
3. **对齐上游视觉** 时建议只对照 [上游演示站](https://thought-lite.ttio.workers.dev/) 与公开 UI 行为，**避免整文件拷贝**上游 GPL 源码；大段引用需在 PR 中说明合规路径。
4. **数据字段**：时间线依赖 `post.publishDay`、`post.publishDate`（由 Notion 属性映射，见 `lib/db/notion/getPageProperties.js`）；勿写死 Notion 内部 ID。
5. **与其它主题对齐行为** 时，可参考 [FUWARI.md](./FUWARI.md) 与 [主题迁移指南（中文）](../THEME_MIGRATION_GUIDE.zh-CN.md) 中的菜单、评论、TOC、插件位等约定。
6. **更新主题切换预览** 时替换 `public/images/themes-preview/thoughtlite.png`，并运行 `yarn perf:compress-theme-previews` 更新 webp（若仓库保留该脚本）。
7. **合并前自检**：`yarn lint --dir themes/thoughtlite`、`NEXT_PUBLIC_THEME=thoughtlite` 下手动点一遍主要路由（首页、文章、归档、分类、标签、搜索、404、加密文）。

更细的分阶段清单见 [THOUGHTLITE_MIGRATION_PLAN.zh-CN.md](./THOUGHTLITE_MIGRATION_PLAN.zh-CN.md)。

---

## 8. 相关链接汇总

- 需求：[notionnext-org/NotionNext#3987](https://github.com/notionnext-org/NotionNext/issues/3987)
- 上游仓库：[tuyuritio/astro-theme-thought-lite](https://github.com/tuyuritio/astro-theme-thought-lite)
- 上游演示：[thought-lite.ttio.workers.dev](https://thought-lite.ttio.workers.dev/)

---

## 9. 当前阶段说明（给审阅者与贡献者）

本主题为 **初步合并可用的实现**：核心列表与文章流已接通，视觉与交互仍会**按迭代优化**（色板、间距、动效、无障碍、与其它插件的边角兼容等）。合并 PR 不代表 Issue 中所有「像素级对齐上游」诉求已全部完成；后续可在同一主题目录内持续提交小 PR 演进。
