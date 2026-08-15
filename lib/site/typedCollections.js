export function getTypedPages({ allPages, type, status } = {}) {
  if (!Array.isArray(allPages) || !type) return []

  return allPages.filter(page => {
    if (page?.type !== type) return false
    if (status === undefined) return true
    return page?.status === status
  })
}

export function getPublishedTypedPages({ allPages, type } = {}) {
  return getTypedPages({ allPages, type, status: 'Published' })
}

export function sortTypedPagesByPublishDate(items) {
  if (!Array.isArray(items)) return []

  return [...items].sort(
    (a, b) => (b?.publishDate ?? 0) - (a?.publishDate ?? 0)
  )
}
