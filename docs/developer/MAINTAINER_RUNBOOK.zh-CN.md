# 维护者运行手册（低负担）

[English summary](./MAINTAINER_RUNBOOK.en.md)

面向 **Maintainer / Triager / Founder**：用规则与自动化减少重复劳动，把 Founder 精力集中在高影响变更与发版。

## 1. 设计原则

| 原则 | 做法 |
| --- | --- |
| **公开优先** | 使用类问题 → Discussions；可跟踪缺陷 → Issue |
| **机器先行** | CI、Labeler、Dependabot、Stale 处理常规事务 |
| **域内自治** | `docs/user-guide/**`、单主题目录 PR 由文档/主题维护者合并 |
| **守门聚焦** | Founder 主要 Review `CODEOWNERS` 路径（`lib/db`、`next.config.js`、`package.json` 等） |

## 2. 每周约 15 分钟（Maintainer）

1. 浏览 [Discussions](https://github.com/notionnext-org/NotionNext/discussions)：`组织成员申请`、未回复的「使用问答」。  
2. 扫一眼 [Dependabot PR](https://github.com/notionnext-org/NotionNext/pulls?q=is%3Apr+author%3Aapp%2Fdependabot)（可批量合并 patch/dev 依赖）。  
3. 合并队列：优先 `documentation` / `good first issue` 且 **CI 全绿** 的 PR。  
4. 仅在发版窗口处理 `package.json` 版本与 [changelog](../user-guide/changelog/latest.md)。

Founder 可跳过第 3 步中纯文档 PR（若已授权文档维护者）。

## 3. Issue / Discussion 分流

| 用户诉求 | 动作 | 管理者耗时 |
| --- | --- | --- |
| 「怎么部署/配置」 | 转 Discussions，关 Issue 或贴链接 | 1 条评论 |
| 重复 Issue | 关为 duplicate，链到已有 | 1 条评论 |
| 缺版本/环境信息 | 贴 [bug 模板] 要求补全，标 `needs-info` | 1 条评论 |
| 长期无回复 | 交给 **Stale bot**（45+14 天） | 0 |
| 安全漏洞 | 转 Private Advisory，**勿**公开讨论 | 按 SECURITY.md |

## 4. PR 合并权限（建议）

| PR 类型 | 标签/路径 | 谁合并 | CI 要求 |
| --- | --- | --- | --- |
| 纯文档 | `documentation`、`docs/**` | 任一 Write 维护者 | `docs-site` job |
| 单主题 | `theme`、`themes/<name>/**` | 主题维护者或 Write | lint + test |
| 依赖机器人 | `dependencies` | 维护者批量 | CI 绿 |
| 核心 / 配置 | `core`、`config`、CODEOWNERS | Founder 或 2 人 Review | 全部 job |

**禁止**：未跑 CI 合并、Contributor 自合并自己的 PR（除非维护者明确授权）。

## 5. 自动化一览

| 工具 | 作用 |
| --- | --- |
| [ci.yml](../../.github/workflows/ci.yml) | PR：lint、type-check、test、lockfile、文档构建 |
| [labeler.yml](../../.github/workflows/labeler.yml) | 按路径打 `documentation` / `theme` / `core` 等标签 |
| [dependabot.yml](../../.github/dependabot.yml) | 每周依赖 PR（默认跳过 major） |
| [stale.yml](../../.github/workflows/stale.yml) | 45 天无活动标 stale，14 天后关闭 Issue |
| [deploy-docs-site.yml](../../.github/workflows/deploy-docs-site.yml) | `main` 文档自动发布 |
| CODEOWNERS | 仅高影响路径 @Founder |

## 6. Org Admin 一次性设置（合规 + 省力）

在 [GOVERNANCE.zh-CN.md](https://github.com/notionnext-org/NotionNext/blob/main/GOVERNANCE.zh-CN.md#github-设置清单org-admin) 基础上建议：

- [ ] **Require status checks**：`Lint & type-check`、`Unit tests`、`Lockfile consistency`（文档 PR 可加 `VitePress build`）  
- [ ] **Require PR** 进 `main`（Founder 亦走 PR，紧急 hotfix 例外并公告）  
- [ ] **Allow auto-merge**（可选）：仅对 CI 绿且仅改 `docs/**` 的 PR 启用  
- [ ] **Secret scanning** + **Dependabot alerts** 开启  
- [ ] 仓库标签与 [labeler.yml](../../.github/labeler.yml) 一致：`documentation`、`theme`、`core`、`config`、`dependencies`、`stale`、`needs-info`、`good first issue`、`help wanted`  
- [ ] Issue 模板**勿**默认 assign 给 Founder（已移除 `assignees`）

## 7. 发版（低频）

1. 确认 `main` CI 绿。  
2. 更新 `docs/user-guide/changelog/latest.md`。  
3. 由 Org Admin 打 tag / Release，或运行 `bump-version-on-main`（仅维护者）。  
4. Discussion **公告** 一条即可。

## 8. 相关文档

- [GOVERNANCE.zh-CN.md](https://github.com/notionnext-org/NotionNext/blob/main/GOVERNANCE.zh-CN.md)
- [MAINTENANCE_PHILOSOPHY.zh-CN.md](./MAINTENANCE_PHILOSOPHY.zh-CN.md)  
- [CONTRIBUTION_WORKFLOW.md](./CONTRIBUTION_WORKFLOW.md)

[bug 模板]: https://github.com/notionnext-org/NotionNext/issues/new?template=bug_report.md
