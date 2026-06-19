# 从这里开始

如果你第一次接触 NotionNext，不需要先读完整文档。按下面路线走，先把站点跑起来，再逐步配置主题、域名和运营功能。

## 你属于哪一类？

| 身份 | 你最关心的事 | 建议入口 |
| --- | --- | --- |
| 技术小白 | 能不能照着步骤搭好，不写代码 | [20 分钟部署路线](#_20-分钟部署路线) |
| 内容创作者 | 写作是否仍在 Notion，网站是否好看 | [选择内容型主题](./themes/THEMES_CATALOG.md#按场景选主题) |
| 潜在用户 | NotionNext 和普通博客、Notion 公共页有什么区别 | [首页介绍](../index.md) |
| 开发者 | 源码结构、配置项、主题扩展是否可控 | [开发者路线](#开发者路线) |
| 社区贡献者 | 如何反馈问题、补文档、贡献主题 | [参与社区](./community-participate.md) |

## 20 分钟部署路线

### 1. 先看效果

打开 [主题预览站](https://preview.tangly1024.com/) 看最终效果。左下角可以切换主题，先确认你想要的是博客、文档、作品集、官网还是导航站。

### 2. 复制 Notion 模板

NotionNext 以 Notion 数据库作为内容源。你需要先复制官方模板，然后在自己的 Notion 空间里维护文章、分类、标签、封面和菜单。

继续阅读：[Notion 数据库的使用](./notion-database.md)

### 3. Fork 项目代码

Fork GitHub 仓库后，你拥有自己的站点源码。后续配置、主题、插件和部署都在自己的仓库里完成。

### 4. 一键部署到 Vercel

新手优先使用 Vercel：流程简单、免费额度够用、文档案例最多。

继续阅读：[Vercel 部署 NotionNext](./deploy-vercel.md)

### 5. 选择主题

部署成功后，再根据站点目标选择主题。不要一开始就陷入所有配置项；先选对主题，后续配置会轻很多。

继续阅读：[按场景选主题](./themes/THEMES_CATALOG.md#按场景选主题)

### 6. 补齐运营能力

上线后再逐步配置：

- 独立域名：[Vercel 绑定自定义域名](./deploy/vercel-domain.md)
- 站点基础信息：[配置站点](./config-site.md)
- 评论系统：[评论插件说明](./comments/overview.md)
- 访问统计：[站点统计相关](./analytics/overview.md)
- 搜索引擎收录：[搜索引擎收录](./operations/search-engine-index.md)

## 开发者路线

如果你已经会前端或想深度定制，建议从这些页面开始：

1. [运行原理](./development/architecture.md)
2. [开发入门](./development/getting-started.md)
3. [开发自己的主题](./development/own-theme.md)
4. [全站功能与配置索引](./reference/features.md)
5. [如何提交 PR](./development/notionnext-how-to-pr.md)

## 常见疑虑

### 不会代码能不能用？

可以。最小路径是复制模板、Fork 仓库、Vercel 部署、填写环境变量。后续只在 Notion 中写文章，也能持续更新站点。

### 为什么不用 Notion 公共页面？

Notion 公共页面适合分享单页内容；NotionNext 更适合长期运营独立站。你可以使用自己的域名、主题、SEO、评论、统计、搜索和更多插件。

### 内容会不会被锁死？

Notion 是内容源，GitHub 仓库是站点源码，部署平台只是托管层。你可以备份 Notion、迁移 Markdown、切换主题或更换部署平台。

### 先看哪三篇就够？

1. [Vercel 部署](./deploy-vercel.md)
2. [Notion 数据库](./notion-database.md)
3. [主题全览](./themes/THEMES_CATALOG.md)
