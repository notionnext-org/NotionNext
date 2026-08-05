function normalizeSourceSlug(slug) {
  if (typeof slug !== 'string') {
    return ''
  }

  const normalized = slug.trim()
  if (
    !normalized ||
    normalized === '#' ||
    /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(normalized)
  ) {
    return ''
  }

  return normalized.replace(/^\/+|\/+$/g, '')
}

export function getSourcePageSlugs(collectionData) {
  return new Map(
    collectionData
      .filter(page => page?.type === 'Page' && page?.slug)
      .map(page => [page.id, page.slug])
  )
}

function getPageHrefBySourceSlug(collectionData, sourcePageSlugs) {
  const pageHrefBySourceSlug = new Map()
  const ambiguousSlugs = new Set()

  collectionData.forEach(page => {
    if (page?.type !== 'Page' || page?.status !== 'Published' || !page?.href) {
      return
    }

    const sourceSlug = normalizeSourceSlug(sourcePageSlugs?.get(page.id))
    if (!sourceSlug || ambiguousSlugs.has(sourceSlug)) {
      return
    }

    const existingHref = pageHrefBySourceSlug.get(sourceSlug)
    if (existingHref && existingHref !== page.href) {
      pageHrefBySourceSlug.delete(sourceSlug)
      ambiguousSlugs.add(sourceSlug)
      return
    }

    pageHrefBySourceSlug.set(sourceSlug, page.href)
  })

  return pageHrefBySourceSlug
}

export function getCustomMenu({ collectionData, sourcePageSlugs }) {
  const pageHrefBySourceSlug = getPageHrefBySourceSlug(
    collectionData,
    sourcePageSlugs
  )
  const menuPages = collectionData.filter(
    post =>
      post.status === 'Published' &&
      (post?.type === 'Menu' || post?.type === 'SubMenu')
  )
  const menus = []
  if (menuPages && menuPages.length > 0) {
    menuPages.forEach(e => {
      e.show = true
      const sourceSlug = normalizeSourceSlug(e.slug)
      if (sourceSlug && pageHrefBySourceSlug.has(sourceSlug)) {
        e.href = pageHrefBySourceSlug.get(sourceSlug)
      }
      if (e.type === 'Menu') {
        menus.push(e)
      } else if (e.type === 'SubMenu') {
        const parentMenu = menus[menus.length - 1]
        if (parentMenu) {
          if (parentMenu.subMenus) {
            parentMenu.subMenus.push(e)
          } else {
            parentMenu.subMenus = [e]
          }
        }
      }
    })
  }
  return menus
}
