# 双语库翻译 CLI（可选）

NotionNext 站点多语言通过 `NOTION_PAGE_ID=id1,en:id2` 等形式切换**整站语言**，但中英两个 Notion **数据库之间的文章同步**默认仍需人工搬运。仓库提供可选 CLI：`scripts/translate/`（`yarn translate` 系列命令），在**两个语言数据库**之间用 LLM 自动翻译并建立配对关系。

> 官方文档站说明：本功能为**维护者工具**，非开箱即用；不使用时不影响博客构建与访问。

## 适用场景

- 你已维护**两个** Notion 数据库（如英文库 + 中文库），且与 `NOTION_PAGE_ID` 多语言配置对应。
- 希望减少重复翻译、手工复制正文的工作，并能接受 LLM 翻译质量与 API 费用。

## 风险与限制（使用前必读）

| 风险 | 说明 |
| --- | --- |
| **覆盖目标页正文** | 更新已配对页面时会删除目标页全部子块后重写；人工改过的译文请勾选 `translation_locked`。 |
| **块类型不完整** | `column_list`、`table`、`synced_block` 等不会写入目标页，版式可能与源页不一致。 |
| **API 费用** | 默认 DeepSeek，亦可选智谱；请设置 `TRANSLATOR_BUDGET_TOKENS_PER_RUN` 上限。 |
| **Schema 要求** | 两个库均需新增 `paired_with`（Text）、`translation_locked`（Checkbox）、`source_hash`（Text）。 |
| **与站点构建无关** | 脚本仅 `devDependency`，**不会**随 `yarn build` 部署；密钥放在 `.env.local`，勿提交仓库。 |

## 推荐流程

1. 在 [Notion 集成](https://www.notion.so/my-integrations) 创建集成，并对**两个数据库**都添加 Connections。
2. 在 `.env.local` 配置 `NOTION_TOKEN`、`NOTION_DB_EN_ID`、`NOTION_DB_ZH_ID` 及翻译 API Key（见根目录 `.env.example` 中 `notion-i18n-translator` 段落）。
3. `yarn install`（安装 `@notionhq/client` 等 dev 依赖）。
4. `yarn translate:diagnose` — 确认集成能访问两个库。
5. `yarn translate:all --dry-run` — 仅打印将创建/更新的页面，**不写入 Notion、不调用 LLM**。
6. 先对单页试跑：`yarn translate <页面URL或ID>`，确认无误后再 `yarn translate:all`。

## 命令速查

| 命令 | 作用 |
| --- | --- |
| `yarn translate <id\|URL>` | 翻译单页 |
| `yarn translate:all` | 批量（默认仅未配对且 Published） |
| `yarn translate:all --dry-run` | 干跑，不写库 |
| `yarn translate:check` | 列出源内容已漂移的配对页 |
| `yarn translate:backfill` | 交互式配对已有译文（不调 LLM） |
| `yarn translate:diagnose` | 检查 token 与数据库权限 |

完整参数、块处理规则与目录结构见仓库内 [scripts/translate/README.md](https://github.com/notionnext-org/NotionNext/blob/main/scripts/translate/README.md)。

## 与站点「多语言」的关系

- **站内 UI 与路由多语言**：由 `LANG`、`NOTION_PAGE_ID` 逗号分隔、`REDIRECT_LANG` 等控制，见 [站点基础配置 · 多语言](../config/site-basics.md)。
- **跨库正文同步**：仅由本 CLI 完成；运行脚本不会修改 Next.js 线上代码。

## 贡献与问题

功能由社区 PR 引入；使用问题可在 [GitHub Discussions](https://github.com/notionnext-org/NotionNext/discussions) 反馈，并附上 `--dry-run` 输出（勿贴 API Key）。
