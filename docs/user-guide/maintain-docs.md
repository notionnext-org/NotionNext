# 参与维护在线文档

> 第一次参与？先看 **[参与社区](./community-participate.md)**（提问、PR、维护者路径）。

在线文档站：[https://notionnext.tangly1024.com](https://notionnext.tangly1024.com)

源码与 GitHub 上的 Markdown **一一对应**；改仓库 → 合并 `main` → 自动发布。

每一次文档修正都会帮助后来的站长少踩一次坑。参与维护文档的开发者会出现在 [文档提交记录](https://github.com/notionnext-org/NotionNext/commits/main/docs) 与 [致谢页](./acknowledgements.md) 中。

## 改当前这一页

任意教程页底部有 **「在 GitHub 上维护此页」**，直达该文件的编辑界面。

## 浏览文档目录

| 链接 | 说明 |
| --- | --- |
| [docs/](https://github.com/notionnext-org/NotionNext/tree/main/docs) | 目录说明（本 README 在 GitHub 可见） |
| [docs/user-guide/](https://github.com/notionnext-org/NotionNext/tree/main/docs/user-guide) | 使用教程、主题配置、运营与维护 |
| [docs/developer/](https://github.com/notionnext-org/NotionNext/tree/main/docs/developer) | 架构、贡献、主题迁移与维护文档（在线站可见） |

## 推荐流程（贡献者）

1. Fork [notionnext-org/NotionNext](https://github.com/notionnext-org/NotionNext) 或具备组织仓库写权限。  
2. 编辑 `docs/user-guide/**/*.md` 或 `docs/developer/**/*.md`（主题配置表可运行 `node scripts/generate-theme-user-docs.mjs`）。
3. 本地预览：`yarn docs:site:dev`。  
4. 提交 PR，合并 **`main`** 后由 GitHub Actions 部署。  

## 代码 PR 也要检查文档

代码改动只要影响站长使用方式，就应该同步更新文档。常见场景包括新增或修改主题配置、环境变量、Notion Config 键、插件开关、部署步骤、默认行为和可见 UI 交互。

PR 模板中的“用户文档不适用”只适合内部重构、测试、CI、依赖维护、拼写修正等不改变使用方式的改动。新增用户可配置项时，请至少补充对应主题或配置文档，并在 PR 描述里说明文档位置。

详细检查清单：[MAINTENANCE_WORKFLOW.md](./MAINTENANCE_WORKFLOW.md) · 策略：[DOCUMENTATION_POLICY.md](../DOCUMENTATION_POLICY.md)

## 部署原理（简述）

```text
push main（docs/user-guide/ 等变更）
    → GitHub Actions: yarn docs:site:build
    → .vitepress/dist → Cloudflare Pages
```

## 与旧版在线手册

[docs.tangly1024.com](/user-guide/intro) 为历史 Notion 托管；**以 `docs/user-guide/` 与 notionnext.tangly1024.com 为准**。

- slug 对照与旧站直达：[help/legacy-docs.md](./help/legacy-docs.md) · [ARTICLE_INDEX.md](./ARTICLE_INDEX.md)
- 可选批量拉取旧文：`node scripts/migrate-legacy-docs.mjs --slug <slug>`（加 `--images` 下载图片到 `docs/public/legacy/`）

## 文档站评论（Giscus）

每篇教程页底可显示 **文档反馈**（[Giscus](https://giscus.app/zh-CN) → 仓库 [`notionnext-org/NotionNext`](https://github.com/notionnext-org/NotionNext) 的 **GitHub Discussions**）。

当前复用仓库默认分类 **General**（可在 [Discussions](https://github.com/notionnext-org/NotionNext/discussions) 查看）：

| 变量 | 值（公开 ID，非密钥） |
| --- | --- |
| `VITE_GISCUS_REPO_ID` | `R_kgDOGHdxTw` |
| `VITE_GISCUS_CATEGORY_ID` | `DIC_kwDOGHdxT84CBR2I` |

**GitHub Actions**：已在组织仓库 Secrets 中配置上述两项（构建 workflow 会自动注入）。  
**本地预览**：复制根目录 [`.env.docs.example`](https://github.com/notionnext-org/NotionNext/blob/main/.env.docs.example) 为 `.env.local` 后执行 `yarn docs:site:dev`。  
**Cloudflare 直连构建**：若不用 Actions，在 Pages 环境变量中写入同上两项。

可选 `VITE_GISCUS_ENABLED=false` 关闭评论区。未配置 ID 时页底仅显示 Issue 链接。单页 frontmatter：`comments: false`。
