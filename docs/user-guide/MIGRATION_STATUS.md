# 官方文档迁移状态

源站：[https://docs.tangly1024.com](https://docs.tangly1024.com/about)

目标：`docs/user-guide/`

**状态：旧站导航中的 104 个页面已全部迁入本地 Markdown**；正文、图片链接、原文 URL 与基础元数据已从 `docs.tangly1024.com` 的 NotionNext 页面数据导入。对照表：[ARTICLE_INDEX.md](./ARTICLE_INDEX.md)。

## 已迁移（按栏目）

| 栏目 | 本地目录 |
| --- | --- |
| 入门 / 部署入门 | 根目录 `intro.md`、`deploy-vercel.md` 等 |
| 安装部署 | [deploy/](./deploy/) |
| 站点配置 | [config/](./config/)、`config-site.md` |
| Notion 教程 | [notion/](./notion/)、`notion-database.md` |
| 菜单 | `menu-secondary.md` |
| 更新日志 | [changelog/](./changelog/)、[UPDATE.md（GitHub）](https://github.com/notionnext-org/NotionNext/blob/main/docs/developer/UPDATE.md) |
| 主题 | [themes/](./themes/)（含 [THEMES_CATALOG.md](./themes/THEMES_CATALOG.md)）；开发长文 [docs/developer/themes（GitHub）](https://github.com/notionnext-org/NotionNext/tree/main/docs/developer/themes) |
| 网站统计 | [analytics/](./analytics/) |
| 评论插件 | [comments/](./comments/) |
| 外部扩展 | [plugins/](./plugins/) |
| 开发教程 | [development/](./development/) + `docs/developer/GETTING_STARTED.md` 等 |
| 运营 | [operations/](./operations/) |
| 获取帮助 / 支持 | [help/](./help/) |

## 内容刷新（4.9.x，仓库独有）

| 文档 | 作用 |
| --- | --- |
| [reference/features.md](./reference/features.md) | 与 `conf/*.config.js` 对齐的全站配置 |
| [reference/notion-4x.md](./reference/notion-4x.md) | 近年 Notion / 站点能力 |
| [themes/THEMES_CATALOG.md](./themes/THEMES_CATALOG.md) | 26 主题说明与配置前缀 |
| [changelog/latest.md](./changelog/latest.md) | 4.9.5.x 要点（非复制 v4.0 全文） |

维护时：改功能 → 先改 `conf/` → 再改 `reference/features.md` 与相关 user-guide 篇目。

## 特殊处理

| 原文 | 处理方式 |
| --- | --- |
| `v4.0` 超长 changelog | [changelog/v4-history.md](./changelog/v4-history.md) 索引 + GitHub Releases |
| `latest` | [changelog/latest.md](./changelog/latest.md) |
| `example-1` | [notion/example-article.md](./notion/example-article.md) + [旧站原文](/user-guide/notion/example-article) |
| `notion-tutorial` | 付费课程外链 |
| `vercel-accelerate`、`vercel-redploy` | [deploy/vercel-accelerate.md](./deploy/vercel-accelerate.md)、[deploy/vercel-redeploy.md](./deploy/vercel-redeploy.md) |

## 旧站入口与评论

- 用户向导航：[help/legacy-docs.md](./help/legacy-docs.md)（slug 对照 + 旧站直达）
- 文档站页底：[Giscus](https://giscus.app/zh-CN) → `notionnext-org/NotionNext` Discussions（见 [maintain-docs.md](./maintain-docs.md)）
- 维护者批量拉取：`node scripts/import-legacy-docs.mjs`

## 维护

- 修改教程 → 编辑 `docs/user-guide/**` 并更新 [ARTICLE_INDEX.md](./ARTICLE_INDEX.md)  
- 策略说明 → [../DOCUMENTATION_POLICY.md](../DOCUMENTATION_POLICY.md)  
- 步骤清单 → [MAINTENANCE_WORKFLOW.md](./MAINTENANCE_WORKFLOW.md)
