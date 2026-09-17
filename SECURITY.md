# 安全策略

## 受支持版本

| 版本 | 支持 |
| --- | --- |
| `4.9.x`（当前主线，见 `package.json`） | ✅ 安全修复 |
| `4.8.x` 及更早 | ❌ 请升级至最新 `main` / 最新 Release |
| 自行 fork 的长期分支 | ❌ 由 fork 维护者自行负责 |

## 报告漏洞

**请勿在公开 Issue 或 Discussion 中披露可利用的细节。**

请使用 GitHub **[Private vulnerability reporting](https://github.com/notionnext-org/NotionNext/security/advisories/new)**（仓库 **Security → Advisories → Report a vulnerability**），或发邮件至 **mail@tangly1024.com**（可 PGP，如需要请在邮件中说明）。

报告中请尽量包含：

- 影响版本与部署方式  
- 复现步骤或 PoC（可私密附件）  
- 影响评估（数据泄露、RCE、权限提升等）

## 处理时效（目标）

| 阶段 | 目标 |
| --- | --- |
| 确认收到 | 3 个工作日内 |
| 严重程度评估 | 7 个工作日内 |
| 修复或缓解方案 | 视严重程度，关键问题优先发 patch Release |

## 贡献者须知

- 勿在 PR、文档示例、Issue 中提交真实 Token、Cookie、`.env`、私有 Notion ID。  
- 建议在组织仓库启用 **Secret scanning** 与 **Dependabot alerts**（Org Admin → Settings → Security）。

## 许可证

本项目以 [MIT](./LICENSE) 发布；安全修复合入后按同一许可证分发。
