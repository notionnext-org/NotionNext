/** OAuth / 评论回调等不应出现在永久链接、分享复制中的查询参数 */
const TRANSIENT_QUERY_KEYS = ['giscus', 'target']

/**
 * @param {string} fullUrl 完整 URL（须含协议）
 * @returns {string}
 */
export function stripTransientQueryParamsFromUrl(fullUrl) {
  if (!fullUrl || typeof fullUrl !== 'string') {
    return fullUrl
  }
  try {
    const u = new URL(fullUrl)
    let changed = false
    for (const k of TRANSIENT_QUERY_KEYS) {
      if (u.searchParams.has(k)) {
        u.searchParams.delete(k)
        changed = true
      }
    }
    if (!changed) {
      return fullUrl
    }
    const q = u.searchParams.toString()
    return `${u.origin}${u.pathname}${q ? `?${q}` : ''}${u.hash}`
  } catch {
    return fullUrl
  }
}

/**
 * Next `router.asPath` 形式：`/path` 或 `/path?a=1&giscus=...`
 * @param {string} asPath
 * @returns {string}
 */
export function stripTransientQueryParamsFromAsPath(asPath) {
  if (!asPath || typeof asPath !== 'string') {
    return asPath
  }
  const hashIdx = asPath.indexOf('#')
  const hash = hashIdx >= 0 ? asPath.slice(hashIdx) : ''
  const noHash = hashIdx >= 0 ? asPath.slice(0, hashIdx) : asPath
  const qm = noHash.indexOf('?')
  if (qm < 0) {
    return asPath
  }
  const path = noHash.slice(0, qm)
  const sp = new URLSearchParams(noHash.slice(qm + 1))
  let changed = false
  for (const k of TRANSIENT_QUERY_KEYS) {
    if (sp.has(k)) {
      sp.delete(k)
      changed = true
    }
  }
  if (!changed) {
    return asPath
  }
  const n = sp.toString()
  return n ? `${path}?${n}${hash}` : `${path}${hash}`
}
