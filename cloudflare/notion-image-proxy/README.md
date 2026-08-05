# Notion image proxy

Cloudflare Worker proxy for NotionNext images.

## Deploy

1. Copy `wrangler.toml.example` to `wrangler.toml`.
2. Replace `cdn.example.com` with your CDN domain.
3. Deploy:

```bash
npx wrangler deploy
```

The API token needs Workers Scripts edit access for the account. Custom domain
binding also needs access to the domain zone.

4. Set NotionNext env:

```env
NEXT_PUBLIC_NOTION_HOST=https://cdn.example.com
```

## Verify

```bash
curl -I "https://cdn.example.com/images/page-cover/gradients_11.jpg"
```

Expected headers after repeat requests:

```text
X-Notion-Image-Proxy: 1
X-Notion-Image-Proxy-Cache: HIT
CF-Cache-Status: HIT
```
