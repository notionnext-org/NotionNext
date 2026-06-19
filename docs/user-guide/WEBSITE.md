# 文档静态网站

教程与开发文档通过 **VitePress** 构建，发布到 [notionnext.tangly1024.com](https://notionnext.tangly1024.com)。

## 本地命令

| 命令 | 作用 |
| --- | --- |
| `yarn docs:site:dev` | 本地开发预览 |
| `yarn docs:site:build` | 构建 → `.vitepress/dist` |
| `yarn docs:site:preview` | 预览构建结果 |

## Cloudflare Pages

详见 **[cloudflare-pages-docs.md](./deploy/cloudflare-pages-docs.md)**（组织仓库推荐 GitHub Actions，无需 CF 连 Git）。

## 在线站包含的目录

```text
docs/
├── index.md
├── DOCUMENTATION_POLICY.md
├── user-guide/          ← 使用教程
├── developer/           ← 架构、贡献、主题迁移与维护文档
└── community/           ← 社区材料
```

除根目录 README 这类仓库目录说明外，文档内容尽量进入在线站。配置见 [`.vitepress/config.mts`](https://github.com/notionnext-org/NotionNext/blob/main/.vitepress/config.mts)。

## 配置位置

- `.vitepress/config.mts` — 导航、侧栏  
- `docs/index.md` — 站点首页  
