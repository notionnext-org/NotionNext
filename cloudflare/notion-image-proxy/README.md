# Notion image proxy

Cloudflare Worker proxy for NotionNext images.

It keeps Notion attachment URLs in the browser and at Cloudflare's edge for one
year. Fresh browser cache entries need no network request; explicit
revalidation is answered with `304 Not Modified` when the validator matches.

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
Cache-Control: public, max-age=31536000, s-maxage=31536000, immutable
ETag: W/"..."
```

Verify conditional requests with the `Last-Modified` value returned above:

```bash
curl -I -H "If-Modified-Since: <Last-Modified value>" "https://cdn.example.com/image/..."
```

The expected status is `304 Not Modified` with no image body.

## Test

```bash
node --test worker.test.mjs
```

The test also checks that the copy-paste code in the VitePress tutorial stays
identical to `worker.mjs`.
