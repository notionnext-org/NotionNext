# 原创存证自动公开清单任务

状态：已实现，本地验收通过

## 背景

手动填写 `proof`、`proofHash` 或 `proofUrl` 已经足够低风险，但对全站原创长文用户仍然偏手动。NotionNext 更适合先提供开源友好的自动化方案，而不是直接绑定商业版权平台或区块链服务。

## 目标

- 构建期自动生成 `public/proofs/originality.json`。
- 清单只保存哈希、URL、标题、页面 ID、算法和时间，不保存正文。
- GitHub Actions 可选自动提交清单，借助公开 commit 时间线形成轻量证据。
- 已有清单记录能自动触发文章页原创存证展示。

## 非目标

- 不上传正文到第三方服务。
- 不接入 OpenTimestamps、RFC 3161、OriginStamp 或版权平台 API。
- 不默认运行官方仓库 workflow；必须由仓库变量显式开启。

## 实现

- `ORIGINALITY_PROOF_AUTO_MANIFEST=true` 时，`processPostData` 会复用现有 SHA-256 生成逻辑并写入清单。
- 如果仓库已有 `public/proofs/originality.json`，文章页会识别对应记录并显示为“公开清单”。
- `.github/workflows/originality-proofs.yml` 默认跳过，只有设置 GitHub Actions 变量 `ORIGINALITY_PROOF_AUTO_MANIFEST=true` 才会运行。

## 验收记录

- [x] manifest helper 有单测覆盖。
- [x] 原创存证 helper 能应用公开清单记录。
- [x] VitePress 教程包含全自动开启步骤和限制。
- [x] VitePress 教程包含 manifest JSON 示例和常见问题排查。
- [x] workflow 默认不会在未设置变量时运行。

## 本地验证

- `yarn test __tests__/lib/utils/originalityProof.test.js __tests__/lib/utils/originalityProofManifest.test.js --runInBand`：通过。
- `yarn lint --file components/OriginalityProof.js --file lib/utils/originalityProof.js --file lib/utils/originalityProofManifest.js --file lib/utils/post.js --file __tests__/lib/utils/originalityProof.test.js --file __tests__/lib/utils/originalityProofManifest.test.js`：通过。
- `yarn docs:site:build`：通过，仅有既有语法高亮和 chunk size 警告。
- `git diff --check`：通过，仅有 Windows LF/CRLF 提示。
