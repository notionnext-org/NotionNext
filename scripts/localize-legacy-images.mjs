#!/usr/bin/env node
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const USER_GUIDE = path.join(ROOT, 'docs', 'user-guide')
const PUBLIC_LEGACY = path.join(ROOT, 'docs', 'public', 'legacy')

const imageRe = /!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g

function hash(input) {
  return crypto.createHash('sha256').update(input).digest('hex').slice(0, 16)
}

function extFrom(url, contentType) {
  const ct = (contentType || '').split(';')[0].trim().toLowerCase()
  if (ct === 'image/jpeg') return '.jpg'
  if (ct === 'image/png') return '.png'
  if (ct === 'image/gif') return '.gif'
  if (ct === 'image/webp') return '.webp'
  if (ct === 'image/svg+xml') return '.svg'

  const parsed = new URL(url)
  const ext = path.extname(parsed.pathname).toLowerCase()
  if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'].includes(ext)) return ext
  return '.png'
}

async function findMarkdownFiles(dir) {
  const out = []
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await findMarkdownFiles(full)))
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(full)
  }
  return out
}

async function download(url) {
  const res = await fetch(url, {
    headers: {
      'user-agent': 'NotionNext-docs-image-localizer/1.0',
      accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      referer: 'https://docs.tangly1024.com/'
    }
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const contentType = res.headers.get('content-type') || ''
  if (!contentType.startsWith('image/') && !url.includes('source.unsplash.com')) {
    throw new Error(`not an image: ${contentType || 'unknown content-type'}`)
  }
  const bytes = Buffer.from(await res.arrayBuffer())
  const name = `${hash(url)}${extFrom(url, contentType)}`
  await fs.mkdir(PUBLIC_LEGACY, { recursive: true })
  await fs.writeFile(path.join(PUBLIC_LEGACY, name), bytes)
  return `/legacy/${name}`
}

async function main() {
  const cache = new Map()
  let changedFiles = 0
  let localized = 0
  let failed = 0

  for (const file of await findMarkdownFiles(USER_GUIDE)) {
    const markdown = await fs.readFile(file, 'utf8')
    const matches = [...markdown.matchAll(imageRe)]
    if (!matches.length) continue

    let next = markdown
    for (const match of matches) {
      const [raw, alt, url] = match
      try {
        if (!cache.has(url)) cache.set(url, await download(url))
        const local = cache.get(url)
        next = next.replace(raw, `![${alt}](${local})`)
        localized++
      } catch (error) {
        failed++
        process.stderr.write(`image failed ${url}: ${error.message}\n`)
      }
    }

    if (next !== markdown) {
      await fs.writeFile(file, next, 'utf8')
      changedFiles++
    }
  }

  process.stdout.write(
    `localized ${localized} image references in ${changedFiles} files; failed ${failed}\n`
  )
  if (failed) process.exitCode = 1
}

main()
