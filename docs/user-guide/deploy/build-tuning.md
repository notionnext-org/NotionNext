# 构建性能与 Notion API 限流（环境变量）

> 适用于 `yarn build`、`yarn export` 及 Cloudflare Pages、Netlify、VPS 等**在 CI 中拉取 Notion 数据**的场景。  
> 实现：`lib/build/buildEnv.js` · 构建日志关键字 `[BuildEnv]`

## 背景

静态导出（`EXPORT=true`）时，NotionNext 会：

1. **全量预热**（prefetch）：在生成路径前，为站点内**每一篇文章**拉取 block 并写入构建缓存（`lib/build/prefetch.js`）。
2. **逐页 SSG**：为每个路由生成 HTML；单页若拉取 Notion 过慢，可能触发 Next.js 默认 **300 秒**超时（`staticPageGenerationTimeout`）。

构建阶段访问 Notion 会经过 **RateLimiter**（`lib/db/notion/RateLimiter.ts`）：默认约 **50 次/分钟**、相邻请求至少间隔 **300ms**，与预热并发共同决定总耗时。

常见报错：

```text
Sending SIGTERM signal to Next.js build worker due to timeout of 300 seconds
[API<<--响应] 耗时:8336ms - from:prefetch
```

多语言 `NOTION_PAGE_ID` 用逗号拼接很多站点时，旧版构建缓存可能报 `ENAMETOOLONG: name too long`（锁文件/缓存文件名过长）。**4.9.5.3+** 已对缓存路径做 SHA-256 短名处理；升级后重新部署即可，无需缩短环境变量。

## 环境变量一览

在部署平台（Cloudflare Pages → **Settings → Environment variables**）或本地 `.env.local` 中配置（**构建时**生效，无需 `NEXT_PUBLIC_` 前缀）：

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `BUILD_PREFETCH_ENABLED` | `true`（未设置即开启） | 设为 `false`、`0`、`off`、`skip` 等可**关闭**全量 block 预热 |
| `BUILD_PREFETCH_CONCURRENCY` | `8` | 预热时的并发数（1–32）。Notion API 慢时可降到 `2`～`4` |
| `NOTION_BUILD_RATE_MAX_PER_MINUTE` | `50` | 构建期每分钟最多向 Notion 发起的请求数（1–600） |
| `NOTION_BUILD_RATE_MIN_INTERVAL_MS` | `300` | 构建期两次请求之间的最小间隔（毫秒，0–60000）。**数值越大越慢、越不易触发限流** |
| `STATIC_PAGE_GENERATION_TIMEOUT` | `300` | Next.js **单页**静态生成超时（秒，60–3600）。文章特别大或 API 慢时可设为 `600` 及以上 |

### 如何确认已生效

执行 `yarn build` 或 `yarn export` 时，日志开头会出现一行 JSON，例如：

```text
[BuildEnv] {"prefetchEnabled":false,"prefetchConcurrency":8,"notionRateMaxPerMinute":50,"notionRateMinIntervalMs":300,"staticPageGenerationTimeoutSec":600}
```

若与你在平台上配置的不一致，请检查变量是否打在 **Production** 环境、是否拼写错误、是否需重新部署。

## 推荐配置

### Cloudflare Pages / 文章多 / API 单次 >5s

优先**关闭全量预热**，并**拉长单页超时**：

```env
BUILD_PREFETCH_ENABLED=false
STATIC_PAGE_GENERATION_TIMEOUT=600
```

关闭预热后，各页面在 SSG 阶段按需拉取 Notion；总时间可能仍较长，但不易在「预热阶段」被单个 worker 的 300s 掐断。

### 仍希望预热，但整体放慢

```env
BUILD_PREFETCH_ENABLED=true
BUILD_PREFETCH_CONCURRENCY=2
NOTION_BUILD_RATE_MAX_PER_MINUTE=30
NOTION_BUILD_RATE_MIN_INTERVAL_MS=500
STATIC_PAGE_GENERATION_TIMEOUT=600
```

### Vercel / 本地机器较快

通常无需改动；若偶发超时，可先只调：

```env
STATIC_PAGE_GENERATION_TIMEOUT=600
```

## 与 `ENABLE_CACHE` 的关系

| 变量 | 阶段 |
| --- | --- |
| `ENABLE_CACHE` | 开发 / 生产运行时是否使用文件+内存缓存（见 [全站配置索引](../reference/features.md)） |
| `BUILD_PREFETCH_*` / `NOTION_BUILD_RATE_*` | 仅 **`BUILD_MODE=true` 或 `EXPORT=true`** 的构建、导出 |

构建缓存目录见 `lib/cache/build_session.js`、`.next/cache/notion`。

## 页面数据体积检查

4.10.0 起可以在生产构建后检查 Next.js 页面数据体积：

```bash
yarn build
yarn perf:page-data
```

脚本会扫描 `.next/server/pages/*.json`，并在 `.perf/page-data-budget.json` 写入报告。默认预算为 **128KB**；如果 `overBudgetPages` 为 `0`，说明当前构建没有页面超过默认预算。

可选环境变量：

```bash
PERF_PAGE_DATA_WARN_KB=160 yarn perf:page-data
PERF_PAGE_DATA_FAIL=true yarn perf:page-data
```

站点内容很多、文章列表很长或开启 `POST_LIST_PREVIEW` 时，页面数据可能变大。若报告中首页或列表页超出预算，请优先检查是否把完整 `blockMap`、全文内容或无用配置传给了客户端。

## 相关文档

- [Cloudflare Pages 静态部署](./cloudflare-pages.md)
- [Vercel 静态导出](./vercel-static.md)
- [部署索引](./index.md)
- 仓库根目录 [DEPLOYMENT.md](https://github.com/notionnext-org/NotionNext/blob/main/DEPLOYMENT.md)

## 原文 / 维护

行为变更请同步更新本文与 `.env.example`。代码入口：`lib/build/buildEnv.js`。
