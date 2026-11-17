/**
 * memberDataSource.js
 *
 * Member 数据的官方 API 补充管道。
 *
 * 背景：NotionNext 的非官方 API (notion-client) 读取数据库视图，
 * 可能会过滤掉某些 entry type（如 Member）。此模块通过 Notion 官方 API
 * 补充读取 Member 条目，确保成员数据完整。
 *
 * 用法：
 *   在 SiteDataApi.js 的 convertNotionToSiteData 中调用
 *   fetchMembersFromOfficialAPI()，将结果合并到 allPages。
 *
 * 环境变量：
 *   NOTION_API_TOKEN                 — Notion Integration Token（需要 read 权限）
 *   NOTION_MEMBERS_DATA_SOURCE_ID    — Member 数据源 ID
 */

/**
 * 读取 Notion 属性值，兼容多种类型
 */
function readPropertyValue(property) {
  if (!property) return null
  const type = property.type
  switch (type) {
    case 'title':
      return property.title?.map(t => t.plain_text).join('') || null
    case 'rich_text':
      return property.rich_text?.map(t => t.plain_text).join('') || null
    case 'url':
      return property.url || null
    case 'select':
      return property.select?.name || null
    case 'status':
      return property.status?.name || null
    case 'checkbox':
      return property.checkbox ?? null
    case 'number':
      return property.number ?? null
    case 'date':
      return property.date?.start || null
    case 'email':
      return property.email || null
    case 'phone_number':
      return property.phone_number || null
    default:
      return null
  }
}

/**
 * 查找属性名（大小写不敏感）
 * Notion 官方 API 的 data_source 端点使用内部 key（小写），
 * 而非界面显示名。此函数兼容两种情况。
 */
function findPropertyKey(properties, candidates) {
  if (!properties) return null
  for (const candidate of candidates) {
    if (properties[candidate]) return candidate
    // 大小写不敏感匹配
    const lower = candidate.toLowerCase()
    for (const key of Object.keys(properties)) {
      if (key.toLowerCase() === lower) return key
    }
  }
  return null
}

/**
 * 将 Notion 官方 API 返回的 page 映射为 Member 数据对象
 */
export function mapOfficialMemberPage(page, { statusProperty = 'status' } = {}) {
  const props = page.properties || {}
  const get = (candidates) => {
    const key = findPropertyKey(props, Array.isArray(candidates) ? candidates : [candidates])
    return key ? readPropertyValue(props[key]) : null
  }

  const title = get(['title', 'Title'])
  const slug = get(['slug', 'Slug'])
  if (!title || !slug) return null

  return {
    id: page.id,
    title,
    slug: slug.startsWith('members/') ? slug : `members/${slug}`,
    type: 'Member',
    status: get([statusProperty, 'status', 'Status']) || 'Published',
    summary: get(['summary', 'Summary']) || '',
    avatar: get(['avatar', 'Avatar']) || null,
    role: get(['role', 'Role']) || '',
    bio: get(['bio', 'Bio']) || '',
    quote: get(['quote', 'Quote']) || '',
    featured: get(['featured', 'Featured']) || false,
    verified: get(['verified', 'Verified']) || false,
    website: get(['website', 'Website']) || null,
    joinedAtText: get(['joinedAtText', 'joined_at_text', 'Joined At']) || '',
    sortOrder: get(['sortOrder', 'sort_order', 'Sort Order']) ?? null,
    author_slug: get(['author_slug', 'authorSlug', 'Author Slug']) || '',
    social_github: get(['social_github', 'github', 'GitHub']) || null,
    social_x: get(['social_x', 'twitter', 'x', 'Twitter', 'X']) || null,
    social_linkedin: get(['social_linkedin', 'linkedin', 'LinkedIn']) || null,
    publishDate: page.created_time ? new Date(page.created_time).getTime() : Date.now(),
    lastEditedDate: page.last_edited_time ? new Date(page.last_edited_time).getTime() : Date.now(),
    pageIcon: page.icon?.type === 'external' ? page.icon.external?.url : null,
    pageCover: page.cover?.type === 'external' ? page.cover.external?.url : null,
    pageCoverThumbnail: page.cover?.type === 'external' ? page.cover.external?.url : null,
    ext: {},
    href: `/members/${slug.replace(/^members\//, '')}`,
  }
}

/**
 * 通过 Notion 官方 API 获取 Member 数据
 * @returns {Promise<Array>} 已发布的 Member 列表
 */
export async function fetchMembersFromOfficialAPI({
  typeProperty = 'type',
  statusProperty = 'status',
  typeValue = 'Member',
  statusValue = 'Published'
} = {}) {
  const token = process.env.NOTION_API_TOKEN
  const dataSourceId = process.env.NOTION_MEMBERS_DATA_SOURCE_ID

  if (!token || !dataSourceId) return []

  try {
    const members = []
    let startCursor = undefined

    do {
      const response = await fetch(
        `https://api.notion.com/v1/data_sources/${dataSourceId}/query`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filter: { property: typeProperty, select: { equals: typeValue } },
            page_size: 100,
            ...(startCursor ? { start_cursor: startCursor } : {})
          }),
        }
      )

      if (!response.ok) {
        console.error('[memberDataSource] API request failed:', response.status)
        return members
      }

      const data = await response.json()
      members.push(
        ...(data.results || [])
          .map(page => mapOfficialMemberPage(page, { statusProperty }))
          .filter(member => member?.status === statusValue)
          .filter(Boolean)
      )
      startCursor = data.has_more ? data.next_cursor : undefined
    } while (startCursor)

    console.log(`[memberDataSource] Fetched ${members.length} members from official API`)
    return members
  } catch (error) {
    console.error('[memberDataSource] Error fetching members:', error)
    return []
  }
}
