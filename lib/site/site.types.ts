export interface FetchSiteParams {
  pageId: string
  from?: string
  locale?: string
}

export interface SiteInfo {
  title: string
  description: string
  pageCover: string
  icon: string
  link: string
}

export type PageStatus = 'Published' | 'Invisible'
export type PageType = 'Post' | 'Page' | 'Notice' | 'Menu' | 'SubMenu'

export interface PageDate {
  start_date?: string
  start_time?: string
  end_date?: string
  end_time?: string
  time_zone?: string
  lastEditedDay?: string
}

export interface TagItem {
  name: string
}

export interface BasePage {
  id?: string
  title: string
  slug: string
  type: PageType
  status: PageStatus
  summary?: string
  category?: string
  tags?: string[]
  tagItems?: TagItem[]
  date?: PageDate
  publishDate?: number
  lastEditedDate?: number
  pageCoverThumbnail?: string
  pageIcon?: string
  href?: string
  ext?: Record<string, unknown>
}

export interface NavPage {
  id?: string
  short_id?: string
  title: string
  type?: PageType
  slug: string
  summary?: string
  category?: string
  tags?: string[]
  pageCoverThumbnail?: string
  pageIcon?: string
  href?: string
  publishDate?: number
  lastEditedDate?: number
  ext?: Record<string, unknown>
}

export interface MenuItem {
  name: string
  icon?: string | null
  href?: string
  target?: string
  show: boolean
  subMenus?: MenuItem[]
}

export interface SiteData {
  NOTION_CONFIG: Record<string, unknown>

  siteInfo: SiteInfo
  notice: BasePage | null

  allPages: BasePage[]
  allNavPages: NavPage[]
  allLinkPages: NavPage[]
  latestPosts: BasePage[]

  categoryOptions: Array<Record<string, unknown>>
  tagOptions: Array<Record<string, unknown>>

  customNav: MenuItem[]
  customMenu: MenuItem[]

  postCount: number

  // 以下字段仅服务端使用
  block?: unknown
  schema?: unknown
  rawMetadata?: unknown
  pageIds?: string[]
}
