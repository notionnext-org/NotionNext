# 部署指南索引

> 仓库根目录 [DEPLOYMENT.md](https://github.com/notionnext-org/NotionNext/blob/main/DEPLOYMENT.md) 含更完整的平台说明与排错。

## 推荐流程

1. [Vercel 部署](../deploy-vercel.md)（入门）
2. [绑定域名](./vercel-domain.md)
3. 流量增大时：[静态导出](./vercel-static.md) · [Netlify](./netlify.md) · [Cloudflare Pages](./cloudflare-pages.md)

## 全部部署文档

| 文档 | 场景 |
| --- | --- |
| [deploy-vercel.md](../deploy-vercel.md) | Vercel 默认 SSR/ISR |
| [vercel-domain.md](./vercel-domain.md) | 自定义域名 + Cloudflare |
| [vercel-accelerate.md](./vercel-accelerate.md) | 国内访问加速 |
| [vercel-static.md](./vercel-static.md) | `yarn export` 降额度 |
| [vercel-redeploy.md](./vercel-redeploy.md) | 重新部署 |
| [netlify.md](./netlify.md) | Netlify（4.0.9+） |
| [cloudflare-pages.md](./cloudflare-pages.md) | Cloudflare 静态 |
| [edgeone-pages.md](./edgeone-pages.md) | **腾讯云 EdgeOne**（Node 版本、ENOSPC、Next SSG 预设） |
| [build-tuning.md](./build-tuning.md) | **构建超时 / Notion 预热与限流**（环境变量） |
| [vps.md](./vps.md) | VPS / Docker（Node 22+） |

## 构建超时排错

若在 Cloudflare、Netlify 等平台出现 `timeout of 300 seconds` 或 prefetch 极慢，请参阅 **[构建性能调优](./build-tuning.md)**（`BUILD_PREFETCH_ENABLED`、`STATIC_PAGE_GENERATION_TIMEOUT` 等）。

## 环境要求（2026）

- **Node.js 22**（见 `.nvmrc` / `.node-version`）。Node 20 已无法安装当前依赖，Cloudflare、Netlify、VPS、Docker 等构建环境都应同步使用 Node 22。
- **Yarn**：`yarn` → `yarn build` / `yarn export`
- 必配：`NOTION_PAGE_ID`

## EdgeOne

Node 版本、磁盘 `ENOSPC`、框架预设 **Next SSG** 等见 **[edgeone-pages.md](./edgeone-pages.md)**。构建时若 `.next/cache` 不可写，项目会回退系统临时目录，见 `lib/cache/build_session.js`。
