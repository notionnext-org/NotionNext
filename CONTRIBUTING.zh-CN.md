# 贡献指南（中文）

- [仓库与组织](#仓库与组织)
- [第一次贡献（推荐路径）](#第一次贡献推荐路径)
- [环境准备](#环境准备)
- [新建主题](#新建主题)
- [新增语言](#新增语言)
- [环境变量](#环境变量)
- [社区与治理](#社区与治理)

感谢你愿意为 NotionNext 做贡献！

## 仓库与组织

本仓库已由**个人账号**托管转为 **[GitHub 组织 notionnext-org](https://github.com/notionnext-org)** 管理，canonical 地址为：

**https://github.com/notionnext-org/NotionNext**

若你希望参与长期维护、CI 或组织内协作，可先按 [参与社区](./docs/user-guide/community-participate.md) 贡献 PR 并自荐。**欢迎加入组织**，与维护者一起推进项目。

**已符合加入条件但未被邀请？** 请在 [GitHub Discussions](https://github.com/notionnext-org/NotionNext/discussions/new/choose) 留言（标题：**组织成员申请**），附上用户名与已合并 PR 链接；勿重复私信。详见 [GOVERNANCE.zh-CN.md](./GOVERNANCE.zh-CN.md#申请组织协作权限)。

若你仍在使用转让前克隆的本地仓库，建议将默认远端改为组织地址，避免长期依赖旧 URL 重定向：

```bash
git remote set-url origin https://github.com/notionnext-org/NotionNext.git
git remote -v
```

Fork 开发与向 `main` 提 PR 的流程不变；PR 的目标仓库请选择 **notionnext-org/NotionNext**。

## 第一次贡献（推荐路径）

1. 在 [Issues](https://github.com/notionnext-org/NotionNext/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22) 挑选带 **`good first issue`** 的任务，或修正你正在阅读的文档页。  
2. 文档改动：编辑 `docs/user-guide/**/*.md`，`yarn docs:site:dev` 预览，提 PR。详见 [参与维护在线文档](./docs/user-guide/maintain-docs.md)。  
3. 代码改动：独立分支 → `yarn lint` / `yarn type-check` / 必要测试 → PR。  
4. 大功能或公共 API：先读 [RFC 指南](./docs/developer/rfc/README.md) 或在 [Discussions](https://github.com/notionnext-org/NotionNext/discussions) 对齐。  
5. 长期维护：见 [参与社区](./docs/user-guide/community-participate.md) 与 [MAINTAINERS.md](./MAINTAINERS.md)。

## 环境准备

请按以下流程参与开发：

1. 在 GitHub 上 Fork 仓库。
2. 克隆到本地（或使用 Codespaces）。
3. 为本次任务创建独立分支。
4. 完成功能或修复并本地验证。
5. 提交并推送分支。
6. 发起 PR 到 NotionNext 的 `main` 分支。

常用命令：

- `yarn`：安装依赖
- `yarn dev`：本地开发
- `yarn build`：生产构建
- `yarn start`：生产模式运行

## 必须遵守的协作规则

1. 每个任务使用独立分支，禁止直接提交到 `main`。
2. PR 保持聚焦，避免把无关重构混在一起。
3. 不要提交个人本地文件（如 `.env.local`）。
4. 不要提交会影响他人的个性化默认配置。
5. 提交前至少执行 lint / type-check / 必要测试（合并前 [CI](.github/workflows/ci.yml) 会自动跑同样检查）。

维护者与高频贡献者请阅读 [维护与变更尺度（共识）](./docs/developer/MAINTENANCE_PHILOSOPHY.zh-CN.md)，避免大范围、难回滚的改动影响主线稳定。

更多文档导航：

- [文档导航入口（中文）](./docs/README.md)
- [Docs Navigation (English)](./docs/README.en.md)
- [主题迁移指南（中文）](./docs/THEME_MIGRATION_GUIDE.zh-CN.md)
- [Theme Migration Guide (English)](./docs/THEME_MIGRATION_GUIDE.md)

## 新建主题

如果要贡献新主题，请以 `themes/example` 为基础复制一个新目录，目录名即主题 key。

## 新增语言

如需新增本地化语言：

1. 复制 `lib/lang/en-US.js` 并按语言代码重命名（如 `zh-CN.js`）。
2. 完成文本翻译。
3. 在 `lib/lang.js` 注册该语言。
4. 提交 PR。

## 环境变量

1. 复制 `.env.example` 为 `.env.local`。
2. 按需填写配置。
3. 不要提交 `.env.local`。

## 社区与治理

- [参与社区](./docs/user-guide/community-participate.md)  
- [项目治理](./GOVERNANCE.zh-CN.md) · [维护者名单](./MAINTAINERS.md)  
- [行为准则](./CODE_OF_CONDUCT.md)  
- [Discussions](https://github.com/notionnext-org/NotionNext/discussions)

配置优先级：

1. Notion 配置表（最高）
2. 环境变量
3. `blog.config.js`（最低）
