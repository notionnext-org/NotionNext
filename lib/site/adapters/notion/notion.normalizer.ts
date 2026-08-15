import { idToUuid } from 'notion-utils'
import type { SiteData, SiteInfo } from '../../site.types'

interface NotionRecordMap {
  block?: unknown
}

export function normalizeNotionSite(
  recordMap: unknown,
  sitePageId: string,
  from?: string
): SiteData {
  sitePageId = idToUuid(sitePageId)
  const normalizedRecordMap = recordMap as NotionRecordMap

  // ⬇️ 原 convertNotionToSiteData 内容迁到这里
  // normalize metadata / collection / schema / pages
  // return SiteData（未清洗版）

  return {
    NOTION_CONFIG: {},
    siteInfo: {} as SiteInfo,
    notice: null,
    allPages: [],
    allNavPages: [],
    allLinkPages: [],
    latestPosts: [],
    categoryOptions: [],
    tagOptions: [],
    customNav: [],
    customMenu: [],
    postCount: 0,
    block: normalizedRecordMap.block,
    schema: {},
    rawMetadata: {}
  }
}
