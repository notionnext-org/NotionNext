import fs from 'fs'
import os from 'os'
import path from 'path'

/** 惰性解析：构建/本地可写 `.next/cache/notion`；Serverless（如 Netlify）只读盘则落到 `os.tmpdir()` */
let cachedNotionCacheRoot = null

function resolveNotionCacheRoot() {
  if (cachedNotionCacheRoot) {
    return cachedNotionCacheRoot
  }

  const fromEnv = process.env.NOTION_NEXT_NOTION_CACHE_DIR
  if (fromEnv) {
    const dir = path.resolve(fromEnv)
    fs.mkdirSync(dir, { recursive: true })
    cachedNotionCacheRoot = dir
    return cachedNotionCacheRoot
  }

  const primary = path.join(process.cwd(), '.next', 'cache', 'notion')
  try {
    fs.mkdirSync(primary, { recursive: true })
    cachedNotionCacheRoot = primary
    return cachedNotionCacheRoot
  } catch (err) {
    const code = err && err.code
    if (
      code === 'ENOENT' ||
      code === 'EROFS' ||
      code === 'EACCES' ||
      code === 'EPERM'
    ) {
      const fallback = path.join(os.tmpdir(), 'notionnext-notion-cache')
      fs.mkdirSync(fallback, { recursive: true })
      cachedNotionCacheRoot = fallback
      if (process.env.NODE_ENV !== 'test') {
        console.warn(
          '[NotionNext] Notion file cache root (read-only deploy, using tmpdir):',
          fallback
        )
      }
      return cachedNotionCacheRoot
    }
    throw err
  }
}

function sanitizeSessionId(sessionId) {
  return String(sessionId || 'default').replace(/[^a-z0-9_-]/gi, '_')
}

export function getNotionCacheRoot() {
  return resolveNotionCacheRoot()
}

export function getBuildSessionId() {
  const buildSessionFile = path.join(
    getNotionCacheRoot(),
    'build-session.json'
  )
  try {
    const raw = fs.readFileSync(buildSessionFile, 'utf8')
    const parsed = JSON.parse(raw)
    if (parsed?.sessionId) {
      return sanitizeSessionId(parsed.sessionId)
    }
  } catch {}

  return sanitizeSessionId(process.env.npm_lifecycle_event || 'runtime')
}

export function getBuildSessionPath(...parts) {
  return path.join(
    getNotionCacheRoot(),
    'sessions',
    getBuildSessionId(),
    ...parts
  )
}
