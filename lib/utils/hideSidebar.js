export function parseTruthyFlag(raw) {
  const value = Array.isArray(raw) ? raw[0] : raw
  if (typeof value === 'string') {
    return !['false', '0', 'no', '否', 'off'].includes(value.trim().toLowerCase())
  }
  return Boolean(value)
}

/**
 * Whether a page/post should hide the sidebar from its own properties.
 */
export function shouldHideSidebar(post) {
  if (!post) return false
  if (post.fullWidth) return true

  const hideRaw =
    post.HIDE_SIDEBAR ??
    post.hide_sidebar ??
    post.hideSidebar ??
    post.ext?.HIDE_SIDEBAR ??
    post.ext?.hide_sidebar ??
    post.ext?.hideSidebar

  if (hideRaw !== undefined && hideRaw !== null && hideRaw !== '') {
    return parseTruthyFlag(hideRaw)
  }

  const sidebarRaw =
    post.SIDEBAR ?? post.sidebar ?? post.ext?.SIDEBAR ?? post.ext?.sidebar

  if (sidebarRaw !== undefined && sidebarRaw !== null && sidebarRaw !== '') {
    return !parseTruthyFlag(sidebarRaw)
  }

  return false
}
