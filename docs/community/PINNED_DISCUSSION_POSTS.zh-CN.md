# Discussions 置顶帖草稿

在仓库 **Settings → Discussions → Pin discussion** 使用下列内容。建议发在 **「公告」** 分类（若无该分类，先用 **General** 并设为公告）。

---

## 帖一：欢迎参与 NotionNext 社区（建议置顶）

**标题：** `【公告】欢迎参与 NotionNext 社区维护`

**正文（复制以下内容）：**

---

大家好，

NotionNext 已由个人仓库移交至组织 **[notionnext-org](https://github.com/notionnext-org)**，正在向**社区协作维护**过渡。无论你是站长还是开发者，都欢迎参与。

### 你可以这样参与

| 我想… | 去哪里 |
| --- | --- |
| 学部署、改配置 | [使用说明文档站](https://notionnext.tangly1024.com) |
| 提问、交流经验 | 本区 **「使用问答」** 发 Discussion（比 Issue 更合适） |
| 改教程、纠错 | 文档页底 **「在 GitHub 上维护此页」** → 提 PR |
| 修 Bug、做功能 | [Contributing](https://github.com/notionnext-org/NotionNext/blob/main/CONTRIBUTING.zh-CN.md) → Fork → PR |
| 长期维护、加入组织 | 先合并 1～2 个 PR，再发 **「组织成员申请」** 讨论（见模板） |

完整路径见：**[参与社区指南](https://notionnext.tangly1024.com/user-guide/community-participate)**

### 当前最需要帮助

- 带 [`good first issue`](https://github.com/notionnext-org/NotionNext/issues?q=is%3Aopen+label%3A%22good+first+issue%22) 标签的任务（文档、小修复为主）
- 带 [`help wanted`](https://github.com/notionnext-org/NotionNext/issues?q=is%3Aopen+label%3A%22help+wanted%22) 的任务

### 请注意

- **Bug**（可复现）→ [Issue](https://github.com/notionnext-org/NotionNext/issues/new/choose)
- **功能想法** → 先在 **「想法」** 分类讨论，再开 Issue / PR
- **安全漏洞** → [私密报告](https://github.com/notionnext-org/NotionNext/security/advisories/new)，勿公开 PoC
- 维护者为志愿者，**无商业 SLA**；请保持友善，遵守 [行为准则](https://github.com/notionnext-org/NotionNext/blob/main/CODE_OF_CONDUCT.md)

旧版 Notion 托管教程仍在 [docs.tangly1024.com](/user-guide/intro)；新版以仓库 `docs/user-guide/` 为准。

感谢每一位 Contributor ❤️

---

## 帖二：维护者分工与合并约定（建议置顶或链在帖一）

**标题：** `【公告】维护者分工与 PR 合并约定`

**正文：**

---

本文说明**谁负责什么、如何减少重复劳动**，详细规则见 [维护者运行手册](https://github.com/notionnext-org/NotionNext/blob/main/docs/developer/MAINTAINER_RUNBOOK.zh-CN.md) 与 [项目治理](https://github.com/notionnext-org/NotionNext/blob/main/GOVERNANCE.zh-CN.md)。

### 负责域（招募中，欢迎认领）

| 域 | 范围 | 当前 |
| --- | --- | --- |
| 文档站 | `docs/user-guide/`、VitePress | 招募中 |
| 内置主题 | `themes/<name>/` | 招募中（可在主题文档注明 `@维护者`） |
| CI / 构建 | `.github/workflows/` | 招募中 |
| 数据层 / Notion API | `lib/db/` 等 | [@tangly1024](https://github.com/tangly1024) 守门 |
| 发版 / 组织 | tag、Secrets、成员邀请 | Org Admin |

认领方式：合并若干 PR 后，用 **「组织成员申请」** 模板发帖，或在本帖回复负责域。

### 合并约定（摘要）

- 所有改动走 **PR**，CI 须通过（lint、类型检查、测试、lockfile；文档另过 VitePress 构建）
- **仅文档**（`documentation` 标签 / `docs/**`）：具备 Write 的维护者 Review 后即可合并，**无需 Founder 必审**
- **高影响路径**（`lib/db`、`next.config.js`、`package.json` 等）：需 **CODEOWNERS** 过目（通常为 Founder）
- **Dependabot PR**：维护者每周批量 Review 合并（默认跳过 major 升级）

### 分流（请维护者转发，勿长篇私信 Founder）

- 使用类问题 → **使用问答** Discussion
- 重复 Issue → 关为 duplicate 并链到已有帖
- 缺环境信息 → 标 `needs-info`，请用户补版本/主题/部署方式
- 长期无活动 → 由 **Stale** 工作流自动处理

### 已符合组织加入条件但未收到邀请？

请勿重复私信。请使用 Discussion 模板 **「组织成员申请」** 发帖，附上 GitHub 用户名与已合并 PR 链接。

---

## 帖三：用户作品墙征集（建议置顶或定期顶帖）

**标题：** `【征集】提交你的 NotionNext 站点到用户作品墙`

**正文：**

---

如果你已经用 NotionNext 搭好了公开站点，欢迎把它提交到用户作品墙。

提交内容只需要一行：

```md
| [站点名](https://example.com) | 用途 | 主题 | @yourname |
```

建议字段：

| 字段 | 示例 |
| --- | --- |
| 站点名 | Tangly Blog |
| 站点链接 | https://blog.tangly1024.com |
| 用途 | 个人博客、知识库、作品集、产品官网、导航站 |
| 主题 | `simple`、`heo`、`starter`、`gitbook` |
| 提交人 | @yourname |

收录到 Showcase 后，可以帮助新用户参考真实案例，也让维护者知道哪些主题和场景需要优先补文档、截图和模板。

作品墙页面： https://notionnext.tangly1024.com/user-guide/showcase

---

## 已发布（2026-05-17）

| 帖 | 链接 |
| --- | --- |
| 欢迎参与社区 | https://github.com/notionnext-org/NotionNext/discussions/4069 |
| 维护者分工与合并约定 | https://github.com/notionnext-org/NotionNext/discussions/4070 |
| 用户作品墙征集 | https://github.com/notionnext-org/NotionNext/discussions/4319 |

分类：**Announcements**。请在 Discussions 列表对以上三帖各点一次 **Pin discussion** 置顶（API 暂不支持自动 Pin）。

## 发帖步骤（若需重发）

1. 打开 https://github.com/notionnext-org/NotionNext/discussions/new/choose  
2. 选择分类 **Announcements**  
3. 粘贴上面对应标题与正文  
4. 发布后 **Pin discussion**  
5. （可选）将帖一链接写入组织 Profile README

---

*修改正文后请同步编辑上述 Discussion 页面。*
