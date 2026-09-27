# ThoughtLite 主题迁移任务计划（NotionNext）

关联需求：[Issue #3987 · 新主题 ThoughtLite](https://github.com/notionnext-org/NotionNext/issues/3987)

| 项目 | 链接 |
|------|------|
| 上游源码（Astro + Svelte + Tailwind） | [tuyuritio/astro-theme-thought-lite](https://github.com/tuyuritio/astro-theme-thought-lite) |
| 在线预览 | [thought-lite.ttio.workers.dev](https://thought-lite.ttio.workers.dev/) |
| 本仓库工作分支 | `feat/theme-thoughtlite` |
| 当前骨架目录 | `themes/thoughtlite/`（由 `themes/example` 复制并重命名配置前缀，**可运行、非最终视觉**） |

---

## 0. 许可证与合规（必须先确认）

上游仓库为 **GPL-3.0**。NotionNext 主仓库为 **MIT**。

- **直接复制**上游 `.astro` / `.svelte` 等源码进本仓库，可能触发 **GPL 与 MIT 的兼容性**问题，需在合并前由维护者确认策略（例如：主题单独以 GPL 子目录说明、或仅「参考设计」用 React 重写而不复制 GPL 文本等）。  
- 请在 **PR 描述与 `docs/developer/themes/THOUGHTLITE.md`** 中写明许可证结论后再合入 `main`。

---

## 1. 与 Fuwari（Astro → Next）迁移的相同注意点

对照 [`docs/developer/themes/FUWARI.md`](./FUWARI.md) 与 [主题迁移指南（中文）](../THEME_MIGRATION_GUIDE.zh-CN.md)：

1. **技术栈**：上游为 **Astro + Svelte**，NotionNext 主题为 **Next.js Pages Router + React**；不能「直接挂载」Astro 工程，只能 **移植视觉与信息架构**。  
2. **数据契约**：仅使用 NotionNext 传入的 `props`（`siteInfo`、`posts`、`post`、`customNav`、`customMenu`、`notice`、`tagOptions` 等），见迁移指南 §3。  
3. **必接能力**：菜单（含 `CUSTOM_MENU`）、公告 `NotionPage`、深浅色 `useGlobal`、文章 TOC/评论/分享/版权/相邻篇、侧栏挂件与 `rightAreaSlot`、联系邮箱 `handleEmailClick` / `resolveContactEmail` 约定（迁移指南 §7）。  
4. **配置**：使用 `siteConfig('THOUGHTLITE_*', default, CONFIG)`，集中在 `themes/thoughtlite/config.js`，避免魔法常量。  
5. **目录隔离**：不引用其他主题目录组件；通用能力用 `@/components/*`。

---

## 2. 分阶段任务（建议顺序）

### Phase A — 骨架与联调（当前分支目标）

- [x] 新建分支 `feat/theme-thoughtlite`。  
- [x] 建立 `themes/thoughtlite`（example 骨架 + `THOUGHTLITE_*` 配置前缀 + `id='theme-thoughtlite'`）。  
- [x] 顶栏 / 页脚 / 首页时间线与 Latest 卡片 / 文章卡片化初版（React 自研样式，非复制上游 Astro 源码）。  
- [ ] 本地 `NEXT_PUBLIC_THEME=thoughtlite`（或 URL `?theme=thoughtlite`）跑通：首页、文章、归档、分类、标签、搜索、404。  
- [ ] `yarn lint` / `yarn type-check` 针对本主题目录无新增错误。

### Phase B — 版式对齐 ThoughtLite

- [ ] 阅读上游 `src/layouts`、`src/pages` 与首页「时间线 / Latest」结构，画出与 NotionNext 路由的映射表（`/`、`/[prefix]/[slug]` 等）。  
- [x] 替换顶栏导航：站点名 + 横向菜单 + 搜索入口 + 深浅色切换。  
- [x] 首页：按 `publishDay` 分组的时间线列表（滚动/分页均支持）。  
- [x] 归档页：按月分组列表与首页一致的时间线视觉。  
- [x] 分类 / 标签索引：`tl-chip` 导航块。  
- [x] 搜索页：`TlPageHero` + 搜索框卡片化；关键词高亮 `useEffect` 依赖补全。  
- [ ] `style.js`：继续对齐上游色板、间距与字体（当前为首版 token）。

### Phase C — 文章与侧栏

- [ ] 文章页：正文 `NotionPage`、封面、元信息密度对齐上游文章页。  
- [ ] 侧栏/页脚：按需保留或简化；接入统计、广告、插件位（与 Fuwari 侧栏模块对齐思路）。  
- [ ] 可选：上游 **Swup** 类全页过渡在 Next 中成本高，可用 `framer-motion` 或弱化动效替代。

### Phase D — 上架主仓库清单

- [x] `docs/developer/themes/THOUGHTLITE.md` 与 **`docs/developer/themes/THOUGHTLITE.en.md`**：功能、配置、上游致谢与许可证说明。  
- [x] `docs/developer/themes/README.md` / `README.en.md` 导航表更新。  
- [x] 按 [主题迁移指南 §8](../THEME_MIGRATION_GUIDE.zh-CN.md) 提交 `public/images/themes-preview/thoughtlite.png` / `.webp`（当前为占位图，可后续替换为真实截图）与 `conf/themeSwitch.manifest.js` 条目。
- [ ] 合并 PR 时由维护者决定是否 **`Closes #3987`**（若仍有多阶段需求可保留 Issue 子任务）。

---

## 3. 风险与依赖

| 风险 | 缓解 |
|------|------|
| GPL / MIT | 见 §0，PR 前书面结论。 |
| 上游用 **pnpm + Svelte**，与本仓库 **yarn + React** 不一致 | 仅借鉴 UI，不混用包管理器。 |
| i18n | 与全局 `next.config` `locales` 一致；上游多语言文案迁到 `lib/lang` 或主题内字典。 |
| 构建体积 | 勿引入过大依赖；图标优先已有 Iconify / Heroicons 体系。 |

---

## 4. 验证命令（开发自检）

```bash
yarn dev
# 浏览器访问: http://localhost:3000/?theme=thoughtlite

yarn build
yarn type-check
```

---

维护者可按 Phase 勾选推进；每阶段结束建议 squash 或清晰 commit message 便于审阅。

---

## 5. 维护文档索引

| 文档 | 用途 |
|------|------|
| [THOUGHTLITE.md](./THOUGHTLITE.md) | 加入原因、上游来源、原作者仓库、配置与维护清单（**主入口**） |
| [THOUGHTLITE.en.md](./THOUGHTLITE.en.md) | 上述内容的英文版，便于国际贡献者 |
| 本文（迁移计划） | 分阶段任务、风险、验证命令；与主文档交叉引用 |
