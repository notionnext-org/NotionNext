# 旧版在线手册入口

NotionNext 曾使用 Notion 托管的 **[docs.tangly1024.com](https://docs.tangly1024.com)**。自 **4.9.x** 起，官方教程以本仓库 Markdown 与 **[notionnext.tangly1024.com](https://notionnext.tangly1024.com)** 为准。

本页保留**旧站文章 slug → 新文档路径**对照，便于书签、搜索引擎与社区链接平滑过渡。带截图的完整旧版排版可继续打开旧站原文。

## 快速跳转

| 用途 | 链接 |
| --- | --- |
| **新版在线站** | [notionnext.tangly1024.com](https://notionnext.tangly1024.com) |
| **旧版源站首页** | [docs.tangly1024.com/about](https://docs.tangly1024.com/about) |
| **完整迁移索引表** | [ARTICLE_INDEX.md](../ARTICLE_INDEX.md) |
| **迁移进度说明** | [MIGRATION_STATUS.md](../MIGRATION_STATUS.md) |
| **GitHub 浏览 docs** | [notionnext-org/NotionNext/tree/main/docs](https://github.com/notionnext-org/NotionNext/tree/main/docs) |
| **文档反馈（评论）** | 任意教程页底部「文档反馈」或 [提交 Issue](https://github.com/notionnext-org/NotionNext/issues/new/choose) |

## 旧站 URL 格式

```text
https://docs.tangly1024.com/article/<slug>
```

将 `<slug>` 在下表中查找对应的新路径；若无本地全文，请打开旧站链接（含历史截图）。

## 常用 slug 对照（节选）

| slug | 新文档 | 旧站原文 |
| --- | --- | --- |
| `about` | [介绍](../intro.md) | [打开](https://docs.tangly1024.com/article/about) |
| `vercel-deploy-notion-next` | [Vercel 部署](../deploy-vercel.md) | [打开](https://docs.tangly1024.com/article/vercel-deploy-notion-next) |
| `how-to-config-notion-next` | [配置站点](../config-site.md) | [打开](https://docs.tangly1024.com/article/how-to-config-notion-next) |
| `notion-next-themes` | [主题总览](../themes/overview.md) | [打开](https://docs.tangly1024.com/article/notion-next-themes) |
| `notionnext-twikoo` | [Twikoo](../comments/twikoo.md) | [打开](https://docs.tangly1024.com/article/notionnext-twikoo) |
| `example-1` | [Notion 文章示例](../notion/example-article.md) | [打开](https://docs.tangly1024.com/article/example-1) |
| `latest` | [最新版本](../changelog/latest.md) | [打开](https://docs.tangly1024.com/article/latest) |
| `v4.0` | [V4 历史](../changelog/v4-history.md) | [打开](https://docs.tangly1024.com/article/v4.0) |

**完整列表**（含评论、统计、部署、开发等全部 slug）见 **[ARTICLE_INDEX.md](../ARTICLE_INDEX.md)**。

## 仅保留旧站链接的内容

| slug | 说明 |
| --- | --- |
| `notion-tutorial` | 付费课程，见 [介绍](../intro.md) 中外链 |
| `v4.0` | 极长更新日志，本地为摘要 + [GitHub Releases](https://github.com/notionnext-org/NotionNext/releases) |

## 维护者：批量拉取旧文

可选脚本（需网络）：

```bash
node scripts/migrate-legacy-docs.mjs --slug notionnext-twikoo
node scripts/migrate-legacy-docs.mjs --all --dry-run
```

详见 [maintain-docs.md](../maintain-docs.md) 与 [MAINTENANCE_WORKFLOW.md](../MAINTENANCE_WORKFLOW.md)。
