/**
 * Build the destination for a missing-page redirect.
 * The configured link is treated as the new site's origin, while the old
 * pathname, query string, and hash are preserved.
 */
export function buildNotFoundRedirectUrl({ redirectLink, currentUrl }) {
  if (!redirectLink || !currentUrl) return null

  try {
    const source = new URL(currentUrl)
    const target = new URL(redirectLink)

    if (!['http:', 'https:'].includes(target.protocol)) return null
    if (source.origin === target.origin) return null

    target.pathname = source.pathname
    target.search = source.search
    target.hash = source.hash
    return target.toString()
  } catch {
    return null
  }
}
