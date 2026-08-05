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
