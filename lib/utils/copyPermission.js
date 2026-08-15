export function getPageCanCopy(siteCanCopy, post) {
  const pageCanCopy =
    post?.CAN_COPY ?? post?.canCopy ?? post?.ext?.CAN_COPY ?? post?.ext?.canCopy

  if (pageCanCopy === undefined || pageCanCopy === null || pageCanCopy === '') {
    return Boolean(siteCanCopy)
  }

  const value = Array.isArray(pageCanCopy) ? pageCanCopy[0] : pageCanCopy

  if (typeof value === 'string') {
    return !['false', '0', 'no', '否'].includes(value.trim().toLowerCase())
  }

  return Boolean(value)
}
