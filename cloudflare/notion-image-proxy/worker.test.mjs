import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

import worker from './worker.mjs'

test('serves immutable images and returns an empty 304 on revalidation', async () => {
  const originalFetch = globalThis.fetch
  const originalCaches = globalThis.caches
  let stored

  globalThis.fetch = async () =>
    new Response('image-bytes', {
      status: 200,
      headers: {
        'Content-Type': 'image/webp',
        'Content-Length': '11',
        'Last-Modified': 'Thu, 06 Aug 2026 11:27:52 GMT'
      }
    })
  globalThis.caches = {
    default: {
      match: async () => stored?.clone(),
      put: async (_key, response) => {
        stored = response.clone()
      }
    }
  }

  try {
    const url = 'https://cdn.example.com/image/example.png?id=page-id'
    const first = await worker.fetch(new Request(url))
    const etag = first.headers.get('etag')

    assert.equal(first.status, 200)
    assert.equal(
      first.headers.get('cache-control'),
      'public, max-age=31536000, s-maxage=31536000, immutable'
    )
    assert.match(etag, /^W\/"[a-f0-9]+-11"$/)

    const byDate = await worker.fetch(
      new Request(url, {
        headers: {
          'If-Modified-Since': 'Thu, 06 Aug 2026 11:27:52 GMT'
        }
      })
    )
    const byEtag = await worker.fetch(
      new Request(url, { headers: { 'If-None-Match': etag } })
    )

    assert.equal(byDate.status, 304)
    assert.equal(byEtag.status, 304)
    assert.equal((await byDate.arrayBuffer()).byteLength, 0)
    assert.equal((await byEtag.arrayBuffer()).byteLength, 0)
  } finally {
    globalThis.fetch = originalFetch
    globalThis.caches = originalCaches
  }
})

test('keeps the VitePress copy-paste example in sync with worker.mjs', async () => {
  const workerSource = await readFile(
    new URL('./worker.mjs', import.meta.url),
    'utf8'
  )
  const tutorial = await readFile(
    new URL(
      '../../docs/user-guide/deploy/notion-image-proxy.md',
      import.meta.url
    ),
    'utf8'
  )
  const example = tutorial.match(
    /```js\r?\n(const NOTION_ORIGIN = [\s\S]*?)\r?\n```/
  )

  assert.ok(example, 'VitePress tutorial must include the Worker source')
  assert.equal(normalize(example[1]), normalize(workerSource))
})

function normalize(value) {
  return value.replace(/\r\n/g, '\n').trim()
}
