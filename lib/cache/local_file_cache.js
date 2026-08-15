import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import { hashForCachePath } from './cache_key_path'
import { getNotionCacheRoot } from './build_session'

const CACHE_DIR = path.join(getNotionCacheRoot(), 'data')

function ensureCacheDir() {
  fs.mkdirSync(CACHE_DIR, { recursive: true })
}

function getCacheFilePath(key) {
  const fileName = `${hashForCachePath(key)}.json`
  return path.join(CACHE_DIR, fileName)
}

function readCacheEntry(cacheFile) {
  try {
    if (!fs.existsSync(cacheFile)) {
      return null
    }

    const raw = fs.readFileSync(cacheFile, 'utf8')
    if (!raw) {
      return null
    }

    return JSON.parse(raw)
  } catch (error) {
    console.error('[FileCache] Failed to read cache entry', cacheFile, error.message)
    return null
  }
}

export function getCache(key) {
  const cacheFile = getCacheFilePath(key)
  const entry = readCacheEntry(cacheFile)
  if (!entry) return null

  if (entry.expireTime && entry.expireTime <= Date.now()) {
    try {
      fs.rmSync(cacheFile, { force: true })
    } catch {}
    return null
  }

  return entry.value ?? null
}

/**
 * Persist one cache key per file so concurrent workers never overwrite
 * unrelated cache entries during a shared build.
 */
export function setCache(key, data, customCacheTime) {
  ensureCacheDir()
  const cacheFile = getCacheFilePath(key)
  const expireTime =
    Number.isFinite(customCacheTime) && customCacheTime > 0
      ? Date.now() + customCacheTime * 1000
      : null

  const payload = {
    key,
    expireTime,
    updatedAt: Date.now(),
    value: data
  }

  const tempFile = `${cacheFile}.${process.pid}.${randomUUID()}.tmp`

  try {
    fs.writeFileSync(tempFile, JSON.stringify(payload))
    fs.renameSync(tempFile, cacheFile)
  } catch (error) {
    fs.rmSync(tempFile, { force: true })
    throw error
  }
}

export function delCache(key) {
  const cacheFile = getCacheFilePath(key)
  fs.rmSync(cacheFile, { force: true })
}

export function cleanCache() {
  fs.rmSync(CACHE_DIR, { recursive: true, force: true })
  ensureCacheDir()
}

const LocalFileCache = { getCache, setCache, delCache, cleanCache }

export default LocalFileCache
