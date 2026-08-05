# RFC（Request for Comments）

较大或跨模块的改动，建议先在本目录提交 **RFC**（Markdown），在 [Discussions](https://github.com/notionnext-org/NotionNext/discussions) 或 Issue 中链接并收集反馈，**再开实现 PR**。

适用场景（参见 [GOVERNANCE.zh-CN.md](../../GOVERNANCE.zh-CN.md)）：

- 新公共 API、全局配置默认值变更  
- 跨多个内置主题的共享层改动  
- 破坏性变更、Next.js / 依赖大版本升级  
- 安全或数据模型相关设计  

## 如何提交

1. 复制 [TEMPLATE.md](./TEMPLATE.md) 为 `docs/developer/rfc/NNNN-short-title.md`（`NNNN` 为四位序号或日期）。  
2. 填写后提 PR，标题形如 `RFC: 简短标题`。  
3. 在 PR 描述中 @ 相关维护者（见 [MAINTAINERS.md](../../MAINTAINERS.md)）。  
4. 共识达成后，再开实现 PR，并在 RFC 文末记录 **状态：已接受 / 已拒绝 / 已 superseded**。

## 已有 RFC

| RFC | 状态 | 说明 |
| --- | --- | --- |
| [2026-originality-proof-auto-manifest.md](./2026-originality-proof-auto-manifest.md) | 已实现，本地验收通过 | 原创存证自动生成 GitHub 公开清单 |
| [2026-originality-proof-ux.md](./2026-originality-proof-ux.md) | 已落地，本地验收通过 | 原创存证从大块信息卡优化为徽章、展开详情和复制证据 |
