# Notion 图片反代加速

Notion 图片默认会先访问 `www.notion.so`，再跳到 Notion 临时生成的图片地址。这个过程能用，但速度和缓存都不太稳定。

更省事的办法是：给图片单独准备一个 Cloudflare 域名，例如：

```text
https://cdn.example.com
```

然后让 NotionNext 把 Notion 图片都改成这个域名：

```text
NEXT_PUBLIC_NOTION_HOST=https://cdn.example.com
```

改完以后，文章里的图片会从：

```text
https://www.notion.so/image/...
```

变成：

```text
https://cdn.example.com/image/...
```

这样图片会先经过你的 Cloudflare Worker，再由 Worker 去 Notion 拿图，并缓存到 Cloudflare。

## 不会代码怎么办

可以直接把本文交给 AI Agent 执行，例如 Codex、Cursor、Claude Code、GitHub Copilot Agent。

你可以这样说：

```text
请按这篇文档帮我完成 NotionNext 的 Notion 图片反代配置。
我的图片 CDN 域名是：cdn.example.com
请帮我创建或修改 Cloudflare Worker，并把 NotionNext 的 NEXT_PUBLIC_NOTION_HOST 配好。
```

如果你想自己手动操作，也可以按下面的步骤做。主流程不需要你会写代码，只需要会复制、粘贴、保存、重新部署。

## 适合谁

适合：

- 博客图片主要上传在 Notion。
- 不想压缩图片。
- 不想手动搬图片到 R2、OSS、七牛云。
- 想尽快让图片走自己的 Cloudflare 缓存。
- 同时使用 `yarn start` 和 `yarn export`。

不适合：

- 完全不使用 Cloudflare。
- 想把所有图片永久保存到自己的对象存储。
- 想做复杂的图片处理、缩略图、鉴权、防盗链。

## 小白手动流程

下面按 Cloudflare 网页后台操作，不要求你在电脑上安装命令行工具。

### 1. 准备图片域名

假设你的主域名是：

```text
example.com
```

建议图片域名用：

```text
cdn.example.com
```

也可以用：

```text
img.example.com
assets.example.com
```

注意：

- 主域名必须已经接入 Cloudflare。
- 不要提前在 DNS 里手动添加 `cdn.example.com`。
- 这个域名只给 Notion 图片用，不要再拿来放博客首页。

### 2. 打开 Cloudflare Worker

进入 Cloudflare 后：

```text
左侧菜单 -> Workers & Pages -> Create
```

选择：

```text
Create Worker
```

Worker 名称可以填：

```text
notion-image-proxy
```

创建后进入 Worker 编辑页面。

### 3. 粘贴 Worker 代码

在 Worker 页面点击：

```text
Edit code
```

删除默认代码，把下面代码完整粘贴进去：

```js
const NOTION_ORIGIN = 'https://www.notion.so'
const EDGE_TTL_SECONDS = 60 * 60 * 24 * 7
const BROWSER_TTL_SECONDS = 60 * 60 * 24
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36'

export default {
  async fetch(request) {
    const url = new URL(request.url)

    if (!isAllowedPath(url.pathname)) {
      return new Response('Not found', { status: 404 })
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405 })
    }

    const cache = caches.default
    const cacheKey = new Request(request.url, { method: 'GET' })
    const cached = await cache.match(cacheKey)
    if (cached) {
      const hitHeaders = new Headers(cached.headers)
      hitHeaders.set('X-Notion-Image-Proxy-Cache', 'HIT')
      return new Response(request.method === 'HEAD' ? null : cached.body, {
        status: cached.status,
        statusText: cached.statusText,
        headers: hitHeaders
      })
    }

    const upstreamUrl = new URL(url.pathname + url.search, NOTION_ORIGIN)
    const response = await fetch(upstreamUrl, {
      method: 'GET',
      redirect: 'follow',
      cf: {
        cacheEverything: true,
        cacheTtl: EDGE_TTL_SECONDS,
        cacheKey: request.url
      },
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    })

    const headers = new Headers(response.headers)
    headers.set(
      'Cache-Control',
      `public, max-age=${BROWSER_TTL_SECONDS}, s-maxage=${EDGE_TTL_SECONDS}`
    )
    headers.set('X-Notion-Image-Proxy', '1')
    headers.set('X-Notion-Image-Proxy-Cache', 'MISS')
    headers.delete('set-cookie')
    headers.delete('content-security-policy')
    headers.delete('content-security-policy-report-only')
    headers.delete('vary')

    const proxied = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    })
    if (response.ok) {
      await cache.put(cacheKey, proxied.clone())
    }

    return request.method === 'HEAD'
      ? new Response(null, proxied)
      : proxied
  }
}

function isAllowedPath(pathname) {
  return pathname.startsWith('/image/') || pathname.startsWith('/images/')
}
```

然后点击：

```text
Save and deploy
```

### 4. 绑定自己的图片域名

回到 Worker 页面，找到：

```text
Settings -> Domains & Routes
```

点击：

```text
Add -> Custom Domain
```

填写你的图片域名：

```text
cdn.example.com
```

保存。

这里最容易写错。

正确：

```text
cdn.example.com
```

错误：

```text
cdn.example.com/image/*
```

错误：

```text
*.example.com
```

Cloudflare 这里绑定的是完整域名，不是图片路径。

### 5. 配置 NotionNext

只需要给 NotionNext 增加一个环境变量：

```text
NEXT_PUBLIC_NOTION_HOST=https://cdn.example.com
```

不同平台的位置如下：

| 平台 | 在哪里填 |
| --- | --- |
| Vercel | Project Settings -> Environment Variables |
| Cloudflare Pages | Settings -> Variables and Secrets |
| Docker / VPS | `.env` 或容器环境变量 |
| 本地预览 | `.env.local` 或 PowerShell |

填的时候注意：

- 变量名必须是 `NEXT_PUBLIC_NOTION_HOST`。
- 值必须带 `https://`。
- 不要在结尾加 `/`。

正确：

```text
https://cdn.example.com
```

不推荐：

```text
https://cdn.example.com/
```

### 6. 重新部署博客

配置环境变量后，一定要重新部署博客。

如果你用的是 Vercel 或 Cloudflare Pages：

```text
重新触发一次 Deploy
```

如果你用的是服务器动态部署：

```text
重启 NotionNext 服务
```

如果你用的是静态导出：

```text
重新执行 yarn export，并重新上传导出的静态文件
```

只改环境变量但不重新部署，页面里的图片地址不会变。

## 命令行方式

如果你会使用命令行，也可以直接用仓库内置的 Worker 文件。

进入目录：

```powershell
cd cloudflare/notion-image-proxy
```

复制配置：

```powershell
Copy-Item wrangler.toml.example wrangler.toml
```

打开 `wrangler.toml`，把域名改成你的图片域名：

```toml
routes = [
  { pattern = "cdn.example.com", custom_domain = true }
]
```

部署：

```powershell
npx wrangler deploy
```

如果你不懂这些命令，跳过这一节，使用上面的 Cloudflare 网页后台方式即可。

## 怎么判断成功

打开博客文章页，找一张 Notion 图片。

成功时，图片地址应该长这样：

```text
https://cdn.example.com/image/...
```

不应该还是：

```text
https://www.notion.so/image/...
```

如果还是 `www.notion.so`，通常是：

| 现象 | 处理 |
| --- | --- |
| 变量名写错 | 必须是 `NEXT_PUBLIC_NOTION_HOST` |
| 少了 `https://` | 值必须是 `https://cdn.example.com` |
| 改完没重新部署 | 重新 Deploy 或重启服务 |
| 静态站没重新导出 | 重新执行 `yarn export` |
| 本地缓存影响 | 临时设置 `ENABLE_CACHE=false` |

## 怎么判断缓存命中

第一次打开一张新图片，Cloudflare 常见结果是：

```text
CF-Cache-Status: MISS
```

这不是失败。`MISS` 的意思是：Cloudflare 第一次还没有缓存，所以先去 Notion 拿图。

同一张图第二次请求，理想结果是：

```text
CF-Cache-Status: HIT
```

也可以看 Worker 自己加的响应头：

```text
X-Notion-Image-Proxy: 1
X-Notion-Image-Proxy-Cache: HIT
```

Chrome DevTools 里如果显示：

```text
200 OK（来自内存缓存）
```

说明这次图片没有重新请求 Cloudflare，而是浏览器直接用了本地缓存。此时你看到的 `CF-Cache-Status: MISS` 可能只是第一次请求留下来的旧响应头。

建议这样测：

1. 打开 Chrome DevTools。
2. 进入 Network。
3. 勾选 `Disable cache`。
4. 刷新页面两次。

如果你会用命令行，也可以连续请求同一个完整图片地址两次：

```powershell
curl.exe -I "你的完整图片URL"
curl.exe -I "你的完整图片URL"
```

第二次看到 `HIT` 就正常。

## 常见报错

### 访问 cdn 域名首页是 404

这是正常的。

这个 Worker 只处理：

```text
/image/...
/images/...
```

直接打开：

```text
https://cdn.example.com/
```

没有图片路径，所以会返回 `404`。

### 部署成功但图片还是 notion.so

先检查环境变量：

```text
NEXT_PUBLIC_NOTION_HOST=https://cdn.example.com
```

然后重新部署博客。

静态站尤其容易漏这一步。静态 HTML 是构建时生成的，所以必须重新 `yarn export`。

### Custom Domain 报错

如果看到：

```text
Wildcard operators (*) are not allowed in Custom Domains
Paths are not allowed in Custom Domains
```

说明域名写成了路径或通配符。

把：

```text
cdn.example.com/image/*
```

改成：

```text
cdn.example.com
```

### API Token 报错

如果你用命令行部署，并看到：

```text
missing User->Memberships->Read
Authentication error [code: 10000]
```

说明 token 缺少 Wrangler 需要读取的用户成员权限。

解决办法：重新创建 token，并加上：

```text
User -> Memberships -> Read
```

如果你使用 Cloudflare 网页后台手动创建 Worker，通常不会遇到这个 token 问题。

## 为什么不直接缓存 Notion 签名后的地址

Notion 图片大致是这个流程：

```text
www.notion.so/image/...
-> Notion 生成临时签名地址
-> prod-files-secure.s3... 带 exp 和 sig 的地址
-> 图片内容
```

`exp` 和 `sig` 是临时签名，会变化。它们适合临时访问，不适合当作博客长期缓存地址。

这个 Worker 缓存的是你自己的稳定入口：

```text
https://cdn.example.com/image/...
```

所以同一篇文章里的同一张图，可以更稳定地命中 Cloudflare 缓存。

## yarn start 和 yarn export 都支持吗

支持。

`yarn start` 是动态部署。只要运行环境里有：

```text
NEXT_PUBLIC_NOTION_HOST=https://cdn.example.com
```

页面生成时就会输出 CDN 图片地址。

`yarn export` 是静态导出。只要导出时已经配置这个变量，生成出来的 HTML 里也会是 CDN 图片地址。

区别只有一个：

| 部署方式 | 改完变量后要做什么 |
| --- | --- |
| `yarn start` | 重启服务 |
| `yarn export` | 重新导出并上传 |

## 访问量很大够用吗

每次图片请求都会先经过 Worker。

粗略估算：

```text
每天图片请求数 = 每天 PV x 每页平均图片数
```

例如：

```text
10,000 PV/day x 20 张图 = 200,000 requests/day
```

如果你的站点访问量很大，建议直接使用 Workers Paid。先用 Worker 反代是门槛最低、见效最快的方案；等图片请求量持续很高，再考虑把热门图片迁移到 R2 或其他对象存储。

## 最小维护建议

- CDN 域名只用于 Notion 图片。
- 不要把 Cloudflare API Token 放到前端代码。
- 不要把 token 提交到 GitHub。
- 改 Worker 代码后，重新点一次 `Save and deploy`，或重新执行 `npx wrangler deploy`。
- 改 CDN 域名后，同步修改 `NEXT_PUBLIC_NOTION_HOST`，并重新部署博客。
