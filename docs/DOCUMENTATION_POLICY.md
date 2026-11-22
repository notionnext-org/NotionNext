# NotionNext 使用说明文档维护策略

[English summary below](#english-summary)

## 维护位置（权威来源）

自 **2026 年起**，NotionNext 文档以本仓库 **`docs/`** 目录为**主维护面**，并逐步替代仅依赖 Notion 托管的在线手册（[docs.tangly1024.com](https://docs.tangly1024.com/about)）。

文档站不再把“站长教程”和“开发者文档”做成访问边界。`user-guide/` 负责从部署、配置、主题使用开始，`developer/` 继续承接架构、贡献、主题迁移和维护决策。借助 AI 开发后，修改主题、排查问题、补文档和提交 PR 的门槛已经降低，文档应鼓励每个使用者逐步成为贡献者。

| 目录 | 用途 |
| --- | --- |
| [`docs/user-guide/`](./user-guide/) | 部署、配置、Notion 数据库、菜单、升级等**用户教程**（从官方站点迁移并持续更新） |
| [`docs/user-guide/reference/`](./user-guide/reference/) | **4.9.x 参考手册**：全站配置索引、Notion 新能力（与 `conf/` 同步维护） |
| [`docs/user-guide/themes/THEMES_CATALOG.md`](./user-guide/themes/THEMES_CATALOG.md) | **26 个内置主题**全表与选型 |
| [`docs/developer/`](./developer/) | 架构、贡献流程、维护手册、主题迁移、RFC 等进阶文档（在线站可见） |
| [`docs/developer/themes/`](./developer/themes/) | 主题实现长文、迁移计划、上游来源与许可证说明 |

## 为何迁到 GitHub

- **版本与代码同步**：文档与 `main` 分支、发行版号（如 4.9.5.x）同仓管理，避免「站点文档滞后于代码」。
- **PR 可审阅**：教程修正与功能改动可同一 PR 讨论。
- **可构建静态站**：Markdown 可经 VitePress / Nextra 等生成可浏览网站（规划见 [`user-guide/WEBSITE.md`](./user-guide/WEBSITE.md)）。
- **离线可读**：克隆仓库即可阅读，不依赖 Notion API 拉取文档库。

## 与线上一致性

- 已迁移文章文末保留 **「原文链接」**，指向 [docs.tangly1024.com](https://docs.tangly1024.com/about) 对应页面，便于对照与补图。
- 官方 Notion 文档库在过渡期仍可能更新；**以本仓库 `docs/user-guide/` 最新提交为准** 作为 notionnext-org 主线推荐说明（fork 可自行同步）。

## 贡献者如何改文档

**操作步骤、目录秩序、检查清单**见 **[用户文档维护工作流](./user-guide/MAINTENANCE_WORKFLOW.md)**（维护者必读）。

简要规则：

1. 使用教程 → 编辑 `docs/user-guide/**/*.md`，并同步 [`user-guide` 目录索引](./user-guide/)、[`ARTICLE_INDEX.md`](./user-guide/ARTICLE_INDEX.md)。
2. 主题使用说明 → `docs/user-guide/themes/<id>.md`；主题实现、迁移和维护细节 → `docs/developer/themes/`，两边互相链接。
3. 勿将个人 `.env`、私有 ID 写入示例。
4. PR 描述中注明：是否替代/补充线上某篇文档（附 slug 或 URL）。

## 迁移进度

官方帮助手册**核心栏目**已迁入 [`user-guide/`](./user-guide/)，对照表见 [`user-guide/ARTICLE_INDEX.md`](./user-guide/ARTICLE_INDEX.md)。状态见 [`user-guide/MIGRATION_STATUS.md`](./user-guide/MIGRATION_STATUS.md)。

---

## English summary

Documentation is **maintained in this repo** under `docs/`, as the long-term source of truth replacing Notion-only hosting at docs.tangly1024.com. User guides and developer docs are both published to the VitePress site so users can gradually become contributors. Migrated pages link back to the legacy site during transition.
