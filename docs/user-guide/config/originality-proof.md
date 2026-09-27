# 原创存证

原创存证用于在文章页展示当前内容版本的 SHA-256 哈希、时间和可选外部凭证链接。它适合原创小说、个人理论、科普长文、学术记录等需要保留内容版本证据的站点。

这个功能默认关闭。它只提供“辅助存证 / 内容哈希证据”，不等同于法律公证、版权登记或防复制能力。

## 三分钟用法

1. 在 Notion 文章数据库新增 `proofUrl` 或 `proofHash` 字段。
2. 给需要存证的文章填入外部凭证链接或哈希。
3. 重新部署站点，文章末尾会出现紧凑的“原创存证”徽章。
4. 读者点击徽章可展开查看完整哈希、时间和凭证链接。
5. 站长可以点击“复制证据”，把文章标题、URL、算法、哈希和凭证链接复制出来。

## 选哪种方案

| 需求 | 推荐做法 |
| --- | --- |
| 只想轻量标记原创版本 | 单篇文章填写 `proof=yes`，让 NotionNext 自动生成本地哈希 |
| 已经有外部存证平台 | 只填写 `proofUrl`，页面会自动展示外部凭证 |
| 外部平台要求提交哈希 | 先用本地哈希或平台哈希填写 `proofHash` |
| 全站都是原创长文 | 配置 `NEXT_PUBLIC_ORIGINALITY_PROOF_ENABLE=true` |
| 想尽量全自动 | 开启 GitHub 自动公开清单模式 |
| 某篇不想显示 | 在该文章填写 `proof=false` |

## 开启方式

### 最省事：只给需要的文章填凭证

如果你已经有 GitHub、可信时间戳、版权平台或其他外部凭证，只需要在 Notion 文章数据库里填写下面任意一个字段，文章页就会自动显示原创存证块：

| 字段名 | 用途 |
| --- | --- |
| `proofHash` | 外部凭证记录的哈希 |
| `proofUrl` | 外部凭证链接 |

可选再填：

| 字段名 | 用途 |
| --- | --- |
| `proofTime` | 外部凭证或存证时间 |

也就是说，单篇文章最少只需要填一个 `proofUrl`，不必再额外填写 `proof=yes`。

### 全站开启

如果希望所有文章都生成并显示本地内容哈希，可以在部署环境变量中开启：

```bash
NEXT_PUBLIC_ORIGINALITY_PROOF_ENABLE=true
```

开启后，所有文章会在正文末尾显示原创存证徽章。

如果全站开启后有个别文章不想显示，在该文章的 `proof` 字段中填写 `false`。

### 全自动：GitHub 公开清单

如果希望文章发布后自动生成公开存证记录，可以开启 GitHub 自动公开清单模式。它会在构建时生成：

```txt
public/proofs/originality.json
```

这个文件只保存文章 URL、标题、页面 ID、算法、哈希和时间，不保存正文。提交到公开 GitHub 仓库后，GitHub commit 时间可以作为轻量公开时间线。

开启步骤：

1. 在 GitHub 仓库 `Settings -> Actions -> General` 中允许 workflow 写入仓库。
2. 在 GitHub 仓库 `Settings -> Secrets and variables -> Actions -> Variables` 中新增变量：

```txt
ORIGINALITY_PROOF_AUTO_MANIFEST=true
```

3. 手动运行 `Originality proofs` workflow，或等待每日定时任务。
4. workflow 会执行构建并自动提交 `public/proofs/originality.json`。
5. 之后文章页会自动显示 `原创存证 · 公开清单 · 短哈希`，不需要在 Notion 里逐篇填写 `proof` 字段。

生成后的清单大致如下：

```json
{
  "version": 1,
  "proofs": [
    {
      "pageId": "notion-page-id",
      "title": "我的原创文章",
      "url": "https://example.com/article/my-original-post",
      "algorithm": "SHA-256",
      "hash": "5d41402abc4b2a76b9719d911017c592",
      "proofTime": "2026-07-15T00:00:00.000Z",
      "proofUrl": "/proofs/originality.json",
      "provider": "manifest"
    }
  ]
}
```

字段含义：

| 字段 | 说明 |
| --- | --- |
| `pageId` | Notion 页面 ID，用于稳定匹配文章 |
| `url` | 文章公开访问地址 |
| `hash` | 当前文章内容版本的 SHA-256 |
| `proofTime` | 优先使用文章的存证时间、最后编辑时间或发布时间 |
| `proofUrl` | 默认指向公开清单本身 |
| `provider` | `manifest` 表示来自 GitHub 公开清单 |

本地也可以手动生成一次：

```bash
ORIGINALITY_PROOF_AUTO_MANIFEST=true yarn build
```

如果使用 Windows PowerShell：

```powershell
$env:ORIGINALITY_PROOF_AUTO_MANIFEST='true'; yarn build
```

常见问题：

| 现象 | 检查项 |
| --- | --- |
| workflow 直接跳过 | 确认 GitHub Actions 变量名是 `ORIGINALITY_PROOF_AUTO_MANIFEST`，值是 `true` |
| 没有生成清单 | 确认构建时至少有已发布文章，并且文章能正常生成内容哈希 |
| 清单生成但没有提交 | 确认 `Settings -> Actions -> General` 已允许 workflow 写入仓库 |
| 页面仍显示本地哈希 | 确认最新清单已进入当前部署分支，并重新部署站点 |
| 不想公开某篇文章 | 在该文章的 `proof` 字段中填写 `false` |

### 没有外部凭证时按单篇开启

如果没有外部凭证，只想让某篇文章显示 NotionNext 自动生成的本地内容哈希，可以保持全站关闭，并在 Notion 文章数据库中新增 `proof` 字段。需要显示原创存证的文章填写：

```txt
yes
```

支持的真值包括 `true`、`yes`、`1`、`on`、`是`、`启用`。

## 显示内容

NotionNext 会读取文章标题、页面 ID、作者、文章 URL 和正文纯文本，按固定结构生成 SHA-256 哈希。

文章页默认显示一行紧凑徽章，例如：

```txt
原创存证 · 外部凭证 · 5d41402abc4b...
```

如果来自自动公开清单，会显示：

```txt
原创存证 · 公开清单 · 5d41402abc4b...
```

点击徽章后会展开：

| 项目 | 说明 |
| --- | --- |
| 算法 | 当前为 `SHA-256` |
| 时间 | 优先使用 `proofTime`；没有时使用 Notion `lastEditedDate` 或 `publishDate` |
| 哈希 | 当前内容版本的哈希 |
| 凭证 | 可选的外部存证链接 |
| 复制证据 | 一键复制标题、URL、算法、哈希、时间和凭证链接 |

文章内容、标题、作者、页面 ID 或 URL 变化后，本地哈希也会变化。

## 验收方式

部署后打开任意已开启原创存证的文章，确认：

- 正文末尾只显示一行原创存证徽章，不会大面积打断阅读。
- 点击徽章后能看到完整哈希。
- 填写 `proofUrl` 时能打开外部凭证链接。
- 开启自动公开清单时，仓库中能看到 `public/proofs/originality.json`。
- 打开 `public/proofs/originality.json`，能看到对应文章的 `url`、`hash` 和 `provider: "manifest"`。
- 点击“复制证据”后按钮文案变为“已复制”；如果浏览器不支持剪贴板，按钮会提示“请手动复制”。

## 外部凭证字段

如果你已经在 GitHub、可信时间戳服务、版权平台或其他系统中生成了凭证，可以在 Notion 文章数据库中补充这些字段：

| 字段名 | 用途 |
| --- | --- |
| `proofTime` | 外部凭证或存证时间 |
| `proofHash` | 外部凭证记录的哈希；填写后页面优先展示它 |
| `proofUrl` | 外部凭证链接 |

这些字段也可以放在 `ext` JSON 中：

```json
{
  "proofTime": "2026-07-15T00:00:00.000Z",
  "proofHash": "你的外部哈希",
  "proofUrl": "https://example.com/proof"
}
```

## 使用限制

- 本功能不会阻止复制、截图、OCR 或转载。
- 本地哈希只能证明“当前页面内容可得到这个摘要”，不能替代第三方可信时间戳。
- GitHub 公开清单依赖公开仓库 commit 时间线，适合轻量证据，不等同于第三方可信时间戳。
- 如果需要更强证明力，建议把哈希提交到公开 GitHub 仓库、可信时间戳服务、版权存证平台或其他外部凭证来源。
- 不要把未公开草稿正文上传到第三方平台；只提交哈希通常更安全。

## 后续扩展

当前版本不内置 OpenTimestamps、RFC 3161 或版权平台客户端。等社区确认具体 provider 和凭据流程后，再新增外部存证接入更稳。
