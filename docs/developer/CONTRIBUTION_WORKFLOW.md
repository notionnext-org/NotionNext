# 提交与 PR 协作规范

[English](./CONTRIBUTION_WORKFLOW.en.md)

## 1. 分支策略

- 永远从最新 `main` 拉新分支
- 一个分支只做一类改动（一个主题/一个功能/一个修复）
- 分支命名建议：
  - `fix/...`
  - `feat/...`
  - `chore/...`
  - `docs/...`

## 2. 提交前检查

```bash
yarn lint
yarn type-check
yarn test
```

如果改动涉及构建链路，建议额外执行：

```bash
yarn build
```

## 3. 提交规范

推荐 Conventional Commits：

- `feat(scope): ...`
- `fix(scope): ...`
- `docs(scope): ...`
- `chore(scope): ...`

## 4. 小 Bug 修复流程

小 Bug 最重要的是先把问题描述清楚，再进入修复：

- 实际现象：现在发生了什么。
- 期望现象：正常应该是什么。
- 复现步骤：从哪个页面或配置开始，按什么步骤能稳定复现。

如果复现步骤清楚，可以优先让 AI Agent 辅助处理，例如 Codex、Cursor、Claude Code、WorkBuddy 等支持自动读代码、改代码、提交 PR 的工具。NotionNext 已经内置开发文档、维护手册和文档站 AI 助手指令，适合先让 AI 阅读这些上下文，再执行最小修复。

推荐 AI Agent 工作流：

1. 读取 Issue，确认实际现象、期望现象和复现步骤是否完整。
2. 阅读相关项目文档，例如 `docs/developer/README.md`、`docs/developer/PROJECT_STRUCTURE.md`、`docs/developer/CONTRIBUTION_WORKFLOW.md`、`docs/developer/MAINTAINER_RUNBOOK.zh-CN.md`，以及对应主题文档。
3. 从最新 `main` 创建独立分支，保持工作区只包含本次修复。
4. 先定位共享根因，再做最小代码改动，避免只修单一路径或顺手重构。
5. 运行最小必要检查，例如目标文件语法检查、相关 lint/test、`git diff --check`。
6. 提交 PR，描述改动范围、风险、验证步骤，并回到原 Issue 附上 PR 链接。

建议给 AI Agent 的约束：

```text
根据我的 Bug 描述，创建一个新分支修复这个问题，然后提交 PR 到云端仓库。
要求：
1. 只修复这个 Bug，不要混入我自己站点的个性化配置或无关改动。
2. 在能修复相同问题的前提下，尽量改动最少的代码，降低对其他用户的影响。
3. 修复前先阅读项目内置的开发文档、维护手册和相关主题文档。
4. 保留必要的本地检查结果，并在 PR 描述中说明改动范围、风险和验证步骤。
```

## 5. PR 内容建议模板

- 背景/问题
- 方案说明（为什么这么做）
- 改动范围（文件列表）
- 风险与兼容性评估
- 验证步骤（本地命令 + 结果）

## 6. 明确禁止项（减少冲突）

- 不要把个人 `.env.local` 提交到仓库
- 不要提交与你任务无关的个性化 `config.js` 改动
- 不要把多个无关功能塞进同一个 PR
- 不要在主分支直接提交开发改动

## 7. 对评审者友好的做法

- 尽量做“最小补丁”
- 大改动拆分为多个小 PR
- 在 PR 描述中标注“是否包含破坏性变更”

## 8. 用户文档（user-guide）

修改或新增 `docs/user-guide/` 时，请遵循 [文档维护工作流](../user-guide/MAINTENANCE_WORKFLOW.md)：同步更新 `README.md`、`ARTICLE_INDEX.md`，并与 `conf/*.config.js` 中的配置键保持一致。

