# 项目治理（社区自治）

[English summary](./GOVERNANCE.md)

NotionNext 由 **[notionnext-org](https://github.com/notionnext-org)** 托管，目标是从「个人主导」过渡到 **社区协作维护**：欢迎既是站长又是开发者的参与者，通过公开渠道讨论、通过 PR 交付、通过书面规则降低沟通成本。

## 低负担与合规原则

| 目标 | 做法 |
| --- | --- |
| **减少 Founder 被打扰** | Issue 不默认 assign；使用类问题进 Discussions；`docs/**` 由社区维护者合并 |
| **机器守门** | PR 必过 [CI](.github/workflows/ci.yml)；Dependabot 提依赖 PR；Stale 关长期无响应 Issue |
| **权责清晰** | [CODEOWNERS](.github/CODEOWNERS) 仅覆盖高影响路径；其余按 [维护者手册](./docs/developer/MAINTAINER_RUNBOOK.zh-CN.md) 域内自治 |
| **合规** | [MIT](./LICENSE) 贡献；[行为准则](./CODE_OF_CONDUCT.md)；安全见 [SECURITY.md](./SECURITY.md)；禁止提交密钥与真实 Token |
| **透明** | 决策、发版、组织成员申请均在 GitHub 公开留痕 |

维护者日常 checklist 见 **[维护者运行手册](./docs/developer/MAINTAINER_RUNBOOK.zh-CN.md)**（约每周 15 分钟）。

## 决策方式

| 类型 | 流程 |
| --- | --- |
| 文档修正、错别字、链接 | 直接 PR，维护者合并 |
| Bug 修复（范围清晰） | Issue 可选 → PR → Review → 合并 |
| 新功能、跨主题/公共 API 改动 | 先在 [Discussions](https://github.com/notionnext-org/NotionNext/discussions) 或 Issue 对齐范围；较大改动建议先写 [RFC](./docs/developer/rfc/README.md) |
| 破坏性变更、大版本依赖 | RFC + 维护者共识；需写迁移说明与 `docs/user-guide/` 同步 |
| 安全漏洞 | 见 [SECURITY.md](./SECURITY.md)，勿在公开 Issue 贴细节 |

**默认原则**：小步、可审、可回滚（详见 [维护与变更尺度](./docs/developer/MAINTENANCE_PHILOSOPHY.zh-CN.md)）。

## 角色与权限

| 角色 | 如何获得 | 典型权限 |
| --- | --- | --- |
| **使用者** | 部署站点即可 | 阅读文档、Discussions 提问 |
| **Contributor** | 任意被合并的 PR | 出现在贡献者列表 |
| **Triager** | 长期有效 Issue/Discussion 回复，由维护者邀请 | Triage、标签、关重复 Issue |
| **Maintainer** | 在 Issue 自荐 + 现有维护者认可（见 [MAINTAINERS.md](./MAINTAINERS.md)） | Review、合并 PR（按负责域） |
| **Org Admin** | 组织 Owner 指定 | 仓库设置、Secrets、发版、分支保护 |

### 申请组织协作权限

1. 先完成 **1～2 个合并 PR**（推荐从 `docs/user-guide/` 或 `good first issue` 开始）。  
2. 在 [Discussions · 维护者自荐](https://github.com/notionnext-org/NotionNext/discussions/categories/general) 或 Issue 说明：希望负责的域（文档 / 某主题 / CI 等）、可投入时间。  
3. 现有 **Maintainer** 在讨论中确认后，由 **Org Admin** 邀请加入组织或授予仓库 **Write / Maintain**。

**已符合条件但尚未收到邀请？** 请勿重复私信或仅在 Issue 追问。请到 [GitHub Discussions](https://github.com/notionnext-org/NotionNext/discussions/new/choose) 发帖（可选用「组织成员申请」模板），标题注明 **组织成员申请**，正文附上：GitHub 用户名、已合并 PR 链接、希望负责的域、可投入时间。维护者按队列处理，邀请可能有延迟。

不要求加入微信群；**GitHub 为官方协作主战场**。

## 合并与 `main` 分支

- 禁止直接向 `main` 推送（维护者亦应走 PR）。  
- **CI 必过**（见 `.github/workflows/ci.yml`）：lint、type-check、单元测试、lockfile 一致性；文档改动另过 VitePress 构建。  
- **建议**（由 Org Admin 在仓库设置中启用为 **Required checks**）：  
  - 至少 **1** 位 Review（纯 `docs/user-guide/**` 可由文档维护者 Review，无需 Founder）  
  - 高影响路径（[CODEOWNERS](.github/CODEOWNERS)）由 **Founder 或 2 位维护者** Review  
  - 可选：对仅文档 PR 启用 **auto-merge**（CI 绿 + 1 Review 后自动合并）  
- 紧急 hotfix：维护者可在 Discussion **公告** 说明后合并，事后补文档/Changelog。

## 发版与 Changelog

- 版本号以 `package.json` 为准；发版由 **Maintainer + Org Admin** 执行。  
- 用户可见变更写入 `docs/user-guide/changelog/latest.md`，并在 [Releases](https://github.com/notionnext-org/NotionNext/releases) 附说明。  
- 自动化 workflow（如 `bump-version-on-main`）仅维护者触发。

## 争议与行为

- 技术分歧：以 Issue/PR 中的**可验证事实**（复现、基准、兼容性）为准，避免人身攻击。  
- 行为问题：按 [行为准则](./CODE_OF_CONDUCT.md) 处理；可联系 [MAINTAINERS.md](./MAINTAINERS.md) 中的 Founder 或 GitHub Support。

## 创始人（Founder）角色

项目发起人保留对**项目方向、商标与组织资产、安全与法律风险**的最终责任，日常合并与文档迭代以社区维护者为主。Founder 应逐步将 `docs/**` 与小修复的合并权下放，自身聚焦架构守门与发版。

## 相关文档

| 文档 | 说明 |
| --- | --- |
| [参与社区（用户向）](./docs/user-guide/community-participate.md) | 四步入口：问 → 改文档 → 改代码 → 成为维护者 |
| [MAINTAINERS.md](./MAINTAINERS.md) | 维护者名单与负责域 |
| [CONTRIBUTING.zh-CN.md](./CONTRIBUTING.zh-CN.md) | 环境、分支、主题与语言贡献 |
| [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) | 社区行为准则 |
| [DOCUMENTATION_POLICY.md](./docs/DOCUMENTATION_POLICY.md) | 文档权威来源与迁移策略 |
| [维护者运行手册](./docs/developer/MAINTAINER_RUNBOOK.zh-CN.md) | 分流、合并、每周 checklist、自动化说明 |

## GitHub 设置清单（Org Admin）

在仓库 **Settings** 中建议完成（无法通过 PR 代劳）：

- [ ] 启用 **Discussions** 并创建分类：`公告`、`使用问答`、`想法`、`文档`、`开发`  
- [ ] 安装 **[Giscus](https://github.com/apps/giscus)** App（文档站评论）  
- [ ] **分支保护** `main`：Require PR + Required checks（`Lint & type-check`、`Unit tests`、`Lockfile consistency`）  
- [ ] 启用 **Secret scanning**、**Dependabot alerts**、合并 **[dependabot.yml](.github/dependabot.yml)** 产生的 PR  
- [ ] 确认 [stale workflow](.github/workflows/stale.yml) 已启用（每周一自动运行；需 `issues: write` 权限）  
- [ ] 标签与 [labeler.yml](.github/labeler.yml) 一致：`documentation`、`theme`、`core`、`config`、`dependencies`、`stale`、`needs-info`、`good first issue`、`help wanted`、`bug`、`enhancement`  
- [ ] 组织 Profile（`notionnext-org/.github`）指向本仓库与文档站  
