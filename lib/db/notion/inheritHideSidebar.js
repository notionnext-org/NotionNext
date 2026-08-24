import { fetchNotionPageBlocks } from '@/lib/db/notion/getPostBlocks'
import { shouldHideSidebar } from '@/lib/utils/hideSidebar'

const MAX_ANCESTOR_DEPTH = 24
const COLLECTION_VIEW_TYPES = new Set(['collection_view', 'collection_view_page'])
const collectionHostCache = new Map()

function getPageBlock(blockMap, pageId) {
  if (!blockMap?.block || !pageId) return null
  const entry = blockMap.block[pageId]
  return entry?.value || entry || null
}

function getCollectionRecord(blockMap, collectionId) {
  if (!blockMap?.collection || !collectionId) return null
  const entry = blockMap.collection[collectionId]
  return entry?.value || entry || null
}

function findPageInAllPages(allPages, key) {
  if (!key || !Array.isArray(allPages)) return null

  const normalizedKey = String(key).replace(/-/g, '')
  return (
    allPages.find(page => page?.slug === key) ||
    allPages.find(page => page?.id === key) ||
    allPages.find(
      page =>
        page?.short_id &&
        normalizedKey.includes(String(page.short_id).replace(/-/g, ''))
    ) ||
    null
  )
}

function findParentFromSlugSegments(allPages, slugSegments) {
  if (!Array.isArray(slugSegments) || slugSegments.length < 2) return null

  const parentSlug = slugSegments.slice(0, -1).join('/')
  const parentKey = slugSegments[slugSegments.length - 2]

  return (
    findPageInAllPages(allPages, parentSlug) ||
    findPageInAllPages(allPages, parentKey)
  )
}

function findCollectionHostPageId(blockMap, collectionId) {
  if (!blockMap?.block || !collectionId) return null

  for (const entry of Object.values(blockMap.block)) {
    const block = entry?.value || entry
    if (!block || block.collection_id !== collectionId) continue
    if (!COLLECTION_VIEW_TYPES.has(block.type)) continue
    return block.parent_id || null
  }

  return null
}

function resolveCollectionHostFromRecordMap(blockMap, collectionId) {
  const directHost = findCollectionHostPageId(blockMap, collectionId)
  if (directHost) return directHost

  const collection = getCollectionRecord(blockMap, collectionId)
  if (collection?.parent_id && collection.parent_table === 'block') {
    const viewBlock = getPageBlock(blockMap, collection.parent_id)
    if (viewBlock?.parent_id) return viewBlock.parent_id
  }

  return null
}

function getSidebarHostCandidates(allPages) {
  if (!Array.isArray(allPages)) return []

  const seen = new Set()
  return allPages.filter(page => {
    if (!page?.id || seen.has(page.id) || !shouldHideSidebar(page)) return false
    seen.add(page.id)
    return true
  })
}

async function resolveCollectionHostPageId(
  collectionId,
  allPages,
  from,
  seedBlockMap
) {
  if (!collectionId) return null
  if (collectionHostCache.has(collectionId)) {
    return collectionHostCache.get(collectionId)
  }

  const hostFromSeed = resolveCollectionHostFromRecordMap(seedBlockMap, collectionId)
  if (hostFromSeed) {
    collectionHostCache.set(collectionId, hostFromSeed)
    return hostFromSeed
  }

  const candidates = getSidebarHostCandidates(allPages)
  for (const page of candidates) {
    const blockMap = await fetchNotionPageBlocks(page.id, `${from}:inherit-sidebar`)
    const hostPageId = findCollectionHostPageId(blockMap, collectionId)
    if (hostPageId) {
      collectionHostCache.set(collectionId, hostPageId)
      return hostPageId
    }
  }

  collectionHostCache.set(collectionId, null)
  return null
}

async function resolveNextAncestorPageId(
  pageId,
  blockMap,
  allPages,
  from,
  fallbackBlockMap
) {
  let pageBlock =
    getPageBlock(blockMap, pageId) || getPageBlock(fallbackBlockMap, pageId)
  let resolvedBlockMap = blockMap || fallbackBlockMap

  if (!pageBlock) {
    resolvedBlockMap = await fetchNotionPageBlocks(pageId, from)
    pageBlock = getPageBlock(resolvedBlockMap, pageId)
  }

  if (!pageBlock?.parent_id) return null

  if (pageBlock.parent_table === 'collection') {
    return resolveCollectionHostPageId(
      pageBlock.parent_id,
      allPages,
      from,
      resolvedBlockMap || fallbackBlockMap
    )
  }

  return pageBlock.parent_id
}

function applyInheritedSidebar(post, ancestor) {
  if (!shouldHideSidebar(ancestor)) return

  post.HIDE_SIDEBAR = true
  if (!post.fullWidth && ancestor.fullWidth) {
    post.fullWidth = true
  }
}

/**
 * Notion 子页面 / 内嵌数据库页面继承父级 HIDE_SIDEBAR / fullWidth 设置。
 * 支持：子页面嵌套、Page 内 inline 数据库中的页面（如 随笔 → 新数据库 → 出现又离开）。
 */
export async function inheritHideSidebarFromAncestors(
  post,
  { allPages, slugSegments, from = 'inherit-hide-sidebar' } = {}
) {
  if (!post || shouldHideSidebar(post)) return post

  const parentFromUrl = findParentFromSlugSegments(allPages, slugSegments)
  if (parentFromUrl) {
    applyInheritedSidebar(post, parentFromUrl)
    if (shouldHideSidebar(post)) return post
  }

  const visited = new Set([post.id])
  let currentPageId = post.id
  let currentBlockMap = post.blockMap

  for (let depth = 0; depth < MAX_ANCESTOR_DEPTH; depth += 1) {
    const ancestorPageId = await resolveNextAncestorPageId(
      currentPageId,
      currentBlockMap,
      allPages,
      from,
      post.blockMap
    )

    if (!ancestorPageId || visited.has(ancestorPageId)) break
    visited.add(ancestorPageId)

    const ancestorPage = findPageInAllPages(allPages, ancestorPageId)
    if (ancestorPage) {
      applyInheritedSidebar(post, ancestorPage)
      break
    }

    currentPageId = ancestorPageId
    currentBlockMap = null
  }

  return post
}

/** @internal test helper */
export function __clearCollectionHostCacheForTests() {
  collectionHostCache.clear()
}
