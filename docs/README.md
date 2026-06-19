# NotionNext 文档（`docs/`）

| | |
| --- | --- |
| **在线阅读** | [https://notionnext.tangly1024.com](https://notionnext.tangly1024.com) |
| **参与社区** | [user-guide/community-participate.md](./user-guide/community-participate.md) · [GOVERNANCE.zh-CN.md](../GOVERNANCE.zh-CN.md) |
| **参与维护** | 在线页底「在 GitHub 上维护此页」· [user-guide/maintain-docs.md](./user-guide/maintain-docs.md) |
| **致谢贡献者** | [user-guide/acknowledgements.md](./user-guide/acknowledgements.md) · [Contributors](https://github.com/notionnext-org/NotionNext/graphs/contributors) |
| **旧版手册** | [user-guide/help/legacy-docs.md](./user-guide/help/legacy-docs.md) · 源站 [docs.tangly1024.com](https://docs.tangly1024.com) |

## 本目录结构

```text
docs/
├── index.md                 # 在线站首页
├── DOCUMENTATION_POLICY.md  # 在线：文档维护策略
├── user-guide/              # 在线：部署、配置、主题、运营与维护教程
├── developer/               # 在线：架构、贡献、主题迁移与维护文档
└── community/               # 在线/仓库共用：社区活动与讨论材料
```

### 在线站包含什么

`user-guide/`、`developer/`、`community/`，以及根目录 `index.md`、`DOCUMENTATION_POLICY.md`。
构建命令：`yarn docs:site:build` → 发布到 [notionnext.tangly1024.com](https://notionnext.tangly1024.com)。

### 文档方向

文档站不再把使用者和开发者分开。新用户可以从 `user-guide/` 完成部署和配置，随后继续阅读 `developer/` 理解运行原理、修改主题、用 AI 辅助开发并提交贡献。

---

## 如何改教程并上线

1. 编辑 [`user-guide/`](./user-guide/) 或 [`developer/`](./developer/) 下对应 `.md`
2. 本地预览：`yarn docs:site:dev`  
3. 合并 `main` → GitHub Actions 自动部署  

详见 [user-guide/maintain-docs.md](./user-guide/maintain-docs.md) · [user-guide/MAINTENANCE_WORKFLOW.md](./user-guide/MAINTENANCE_WORKFLOW.md)

## 社区与治理（仓库根目录）

- [参与社区](./user-guide/community-participate.md)（在线站可见）  
- [GOVERNANCE.zh-CN.md](../GOVERNANCE.zh-CN.md) · [MAINTAINERS.md](../MAINTAINERS.md) · [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md)  
- [Discussions](https://github.com/notionnext-org/NotionNext/discussions) · [CONTRIBUTING.zh-CN.md](../CONTRIBUTING.zh-CN.md)

Org 管理员还需在 GitHub 启用 Discussions、Giscus App、分支保护等，见治理文档末尾清单。

## 开发文档

→ **[developer/](./developer/)**
