# 最新版本与更新日志

> 当前主线：**4.10.7**（见根目录 `package.json`）

## 4.10.7 发布要点

本版本将主题颜色定制从 Tailwind 类名覆盖，过渡到主题语义色变量与调色板方案。早期使用 TailwindCSS 是为了快速开发；现在主题框架已经成熟，后续更适合通过 `*_COLOR_*` 配置项表达主色、背景、文字、边框等语义色，便于用户在 Notion Config 中快速调色，也避免 `.bg-indigo-600` 这类工具类被覆盖后产生语义混淆。

### 主题调色板

- 全局主题工具新增当前主题调色板，展示每个主题可覆盖的色号变量、CSS 变量名、默认色值和复制入口。
- 25 个内置主题均已在 `conf/themeSwitch.manifest.js` 声明 palette；切换主题后即可查看该主题的可配置色号。
- Fuwari 保留原有色相模型，调色板显示 `FUWARI_THEME_COLOR_HUE`，复制值为数字色相，避免破坏现有配置。
- Endspace、Heo、Claude 等多色主题提供更完整的背景、文字、强调色、边框等变量；Fuwari、Hexo、Medium 等单主色主题保持轻量色板。

### 配置与兼容

- 新增或整理各主题的 `*_COLOR_*` 配置项，用户可在 Notion Config 表、环境变量或主题 `config.js` 中覆盖。
- 保留既有 TailwindCSS 与旧配置的渲染路径，不要求用户立即迁移；推荐新调色优先使用主题色变量。
- 补充主题迁移指南与主题色 token roadmap，后续新增主题必须首版声明 `*_COLOR_*` 与 manifest 调色板。
- 各主题文档补充调色说明，说明如何从全局主题工具复制配置项并在 Notion Config 中覆盖。

### 验证

- Babel parser 定向解析：通过。
- `npx eslint` 定向检查主题色相关文件：通过。
- manifest smoke check：25 个内置主题 palette 覆盖率 100%。
- `git diff --check`：通过，仅保留 Windows 工作区 LF/CRLF 提示。

## 4.10.5 发布要点

本版本新增基于 Notion 数据库的 NotionComments 评论插件，并合入 `v4.10.4` 之后主线上的主题修复、Notion 渲染增强、复制权限配置、SEO 和依赖更新。

### NotionComments 评论插件

- 新增 `NEXT_PUBLIC_COMMENT_NOTION_ENABLE` 评论开关，可与 Waline、Giscus、Valine、GitTalk、Utterance、Cusdis、Twikoo 等评论插件并存，通过文章底部评论区 Tab 切换体验。
- 新增 `/api/notion-comments` 动态接口，评论数据写入用户自己的 Notion 数据库，支持文章维度查询、发表评论、回复评论、分页加载和失败重试。
- 新增评论区交互界面：加载中、空状态、错误重试、回复输入、收起回复、加载更多等基础状态都已覆盖。
- 新增 NotionComments 使用教程，包含 Notion Integration 创建、数据库字段配置、环境变量、部署方式、常见问题、使用效果截图，以及“独立评论数据库”和“Notion 页面原生评论”两种方案的取舍说明。
- 新增会员评论路线图文档，记录未来会员体系和评论能力继续结合 Notion 数据的可选方向。

### 主线功能与修复

- 支持文章级自定义版权模式，并补充 `CAN_COPY` 复制权限配置文档和侧边栏入口。
- 改进 SEO canonical metadata，减少错误 canonical 地址对搜索收录的影响。
- 支持 Notion Heading 4 渲染。
- 支持应用 Notion Collection View 的排序规则。
- 修复分类和标签静态路径生成的保护逻辑。
- 同步 Endspace 主题更新。
- 修复 Claude 主题侧栏在 Adsense 场景下的高度问题。
- 修复 Fuwari 固定主题色不生效问题。
- 修复 Magzine 主题文章标签换行问题。
- 为分享按钮和右侧浮动区域补充鼠标悬停提示。

### 依赖与工作流更新

- `form-data` 从 `4.0.5` 升级到 `4.0.6`。
- `@babel/core` 从 `7.28.3` 升级到 `7.29.7`。
- `axios` 从 `1.17.0` 升级到 `1.18.1`。
- `@vercel/functions` 从 `3.6.2` 升级到 `3.7.5`。
- `actions/checkout` 从 `4` 升级到 `7`。
- `docker/metadata-action` 从 `5` 升级到 `6`。

### 升级说明

- 如需启用 NotionComments，需要新增：
  - `NEXT_PUBLIC_COMMENT_NOTION_ENABLE=true`
  - `NOTION_COMMENT_DATABASE_ID=你的评论数据库 ID`
  - `NOTION_TOKEN=你的 Notion Integration Token`
- NotionComments 依赖服务端 API Route，只支持 Vercel、Netlify、Node.js Server、Docker 等动态部署方式；使用 `yarn export` / 纯静态导出的站点不支持该插件。
- `NOTION_TOKEN` 是敏感凭据，只应保存在服务端环境变量中，不要提交到仓库，也不要暴露在公开截图或前端配置里。

### 自 v4.10.4 以来的提交

- `feat: add Notion database comments plugin`
- `docs: add optional membership comments roadmap`
- `fix(endspace): sync upstream theme updates`
- `fix: improve SEO canonical metadata (#4248)`
- `feat: support custom article copyright mode`
- `fix(claude): keep sidebar height with adsense (#4247)`
- `fix: guard category/tag static paths`
- `docs: explain adding CAN_COPY in Notion`
- `docs: expose copy permission guide in sidebar`
- `docs: add copy permission guide to config index`
- `feat: support per-post copy permissions`
- `fix(fuwari): honor fixed theme hue (#4243)`
- `fix(magzine): keep post tags on one line`
- `docs: fix post list style config comment (#4242)`
- `fix: support Notion heading 4 (#4241)`
- `fix: apply Notion collection view sorts (#4240)`
- `chore(share buttons): add tips for mouse hover (#4212)`
- `chore(right float area): add tips (#4213)`
- `chore: bump form-data from 4.0.5 to 4.0.6 (#4204)`
- `chore: bump @babel/core from 7.28.3 to 7.29.7 (#4211)`
- `chore: bump axios from 1.17.0 to 1.18.1 (#4222)`
- `chore: bump docker/metadata-action from 5 to 6 (#4228)`
- `chore: bump actions/checkout from 4 to 7 (#4229)`
- `chore: bump @vercel/functions from 3.6.2 to 3.7.5 (#4238)`

### 验证

- `jest __tests__/lib/plugins/notionComments.test.js --runInBand`：通过。
- `next lint --file components/NotionComments.js --file lib/plugins/notionComments.js --file __tests__/lib/plugins/notionComments.test.js`：通过。
- `git diff --check`：通过。
- `yarn docs:site:build`：通过。

## 4.10.3 发布要点

本版本重点优化 Magzine 主题、字体资源、构建缓存和 Notion 数据过滤，并合入社区站数据库、视图筛选、Heo / Fuwari / Hexo / Matery 主题体验与依赖安全更新。

### 性能与资源加载

- 优化 Magzine 首页首屏图片加载策略，减少 LCP 图片延迟。
- 调整 Magzine 首页图片、广告位与文章卡片布局，降低图片、广告和卡片内容加载时的布局抖动。
- Font Awesome 样式改为延后加载，并在用户有交互意图后再加载，减少首屏阻塞。
- 预留 Font Awesome 图标布局空间，修复延迟加载期间图标可见性和页面跳动问题。
- 将 Font Awesome 字体文件改为本地自托管，减少第三方字体 CDN 依赖。
- Web Font 仅在配置启用时加载，未配置自定义字体的站点不再请求额外字体资源。

### Notion 数据与构建稳定性

- 稳定本地构建缓存文件锁，降低并发构建或重复读取缓存时的异常风险。
- 优化 filtered collection 数据处理，减少无关 Notion collection 数据进入页面数据。
- 保留空的 selected view 结果，避免空集合视图被误判为缺失数据。
- 增加 typed collection helper，统一集合数据读取路径。

### 主题与配置

- Fuwari 主题首次渲染时正确应用主题色相，并补充主题切换稳定性调整。
- Heo 信息卡 greeting 逻辑归一化，避免不同配置路径显示不一致。
- Hexo / Matery 主题新增 greeting words speed 配置，可控制首页问候语切换速度。
- 新增社区站数据库模板文档，补充 Notion 社区站点搭建入口。

### 文档与部署

- 文档站首页和导航加入最近更新提示能力，方便维护者发现新 changelog 与重要文档更新。
- 更新 Cloudflare Pages V3 build image 迁移说明。
- 更新开发者首页、愿景路线图与性能优化计划，记录本轮性能优化和后续维护方向。

### 依赖更新

- `axios` 升级到 `1.17.0`。
- `@vercel/functions` 升级到 `3.6.2`。
- `ioredis` 升级到 `5.11.1`。
- `@supabase/supabase-js` 升级到 `2.107.0`。

### 参与者

- [@tangly1024](https://github.com/tangly1024)：33 个提交。
- [@qianzhu](https://github.com/qianzhu) / Lucien：6 个提交。
- [@dependabot](https://github.com/dependabot)：4 个提交。
- [@88lin](https://github.com/88lin)：1 个提交。
- [@expoli](https://github.com/expoli)：1 个提交。
- [@githubdudu](https://github.com/githubdudu)：1 个提交。

### 提交范围

从 `v4.10.2` 到 `v4.10.3`：

- `5a1017a7` fix: filter embedded Notion collection views
- `6ec30f99` chore(release): bump package.json to 4.10.1
- `9c793e3c` fix: handle sync_block with content ID array
- `782a35bf` fix: render quote blocks without properties.title
- `6b24adc9` fix: respect view-level filters in database page resolution
- `f837e3d9` fix: apply Fuwari theme hue on initial render
- `1a6b2263` fix: preserve giscus oauth callback token
- `8f685096` docs: surface changelog unread updates
- `1aeac547` merge: release v4.10.2 hotfix
- `ee1043ee` fix: limit docs unread dots to sidebar
- `a0c9970c` fix: mark latest docs unread in sidebar
- `2eee510d` fix: record docs reads for every route
- `07ccff5b` fix: render sidebar unread dots as nodes
- `3815bda6` fix: keep sidebar unread leaf dots visible
- `302feebb` fix: normalize Heo infocard greetings
- `5252770e` refactor: add typed collection helpers
- `61b8c774` docs: add community site database template
- `4fb658be` fix: preserve empty selected view results
- `88e03cc1` chore: bump @supabase/supabase-js to 2.107.0
- `e747d117` chore: bump ioredis to 5.11.1
- `8e11d730` chore: bump @vercel/functions to 3.6.2
- `186b3e3a` chore: bump axios to 1.17.0
- `9922643f` Optimize Font Awesome stylesheet loading
- `3abb4a83` Merge Font Awesome loading optimization
- `35f332d5` Improve magzine homepage performance
- `6ccd2b86` Merge magzine homepage performance improvements
- `560d04e2` Optimize magzine LCP image loading
- `c9373041` Merge magzine LCP image optimization
- `1e34875b` Stabilize build cache locks and filtered collection data
- `7d431f12` Merge build cache stability updates
- `cb4c065d` docs: add Cloudflare Pages V3 build image migration
- `941cf310` Improve magzine image and ad layout stability
- `e3d91b9e` Merge magzine image layout stability
- `a9525fff` Defer Font Awesome from critical path
- `f96fecd5` Merge Font Awesome critical path deferral
- `2362c9c2` Load web fonts only when configured
- `8d783e33` Merge deferred web font loading
- `ff2c5073` Load Font Awesome after user intent
- `8da1cf29` Merge Font Awesome intent loader
- `1e4e2de4` Reserve Font Awesome icon layout
- `33ad83bf` Merge Font Awesome layout reservation
- `2a1dda67` Fix delayed Font Awesome visibility
- `ad5e32b2` Merge Font Awesome visibility fix
- `df71ae22` Self-host Font Awesome for menu icons
- `256a2363` Merge self-hosted Font Awesome performance fix
- `512524a7` feat: add configurable greeting words speed

### 适用场景

- 使用 Magzine、Fuwari、Heo、Hexo 或 Matery 主题的站点。
- 希望减少 Font Awesome / Web Font 对首屏渲染影响的站点。
- 使用 Notion collection view、Cloudflare Pages 或依赖构建缓存的站点。

### 升级说明

- 正常升级无需新增环境变量。
- 如果站点依赖 Font Awesome 图标，请升级后确认图标显示正常。
- 如果使用自定义 Web Font，请确认相关字体配置仍按预期启用。
- 如果使用 Hexo / Matery 主题，可按需配置 greeting words speed。

### 验证

- `git diff --check`：通过。
- `node -e "const p=require('./package.json'); if (p.version !== '4.10.3') process.exit(1)"`：通过。
- `yarn docs:site:build`：通过。

## 如何升级

- 站长升级：见 [版本升级指引](../update.md)。
- 构建性能与 Notion API 限流：见 [构建性能与 Notion API 限流](../deploy/build-tuning.md)。
- GitHub Release：[NotionNext Releases](https://github.com/notionnext-org/NotionNext/releases)。

## 历史版本全文

- [V4 历史](./v4-history.md)
- 源站：https://docs.tangly1024.com/article/latest
