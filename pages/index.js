import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import {
  cleanPostSummaries,
  fetchGlobalAllData,
  getPostBlocks
} from '@/lib/db/SiteDataApi'
import { formatNotionBlock } from '@/lib/db/notion/getPostBlocks'
import { generateRobotsTxt } from '@/lib/utils/robots.txt'
import { generateRss, shouldGenerateRssForLocale } from '@/lib/utils/rss'
import { generateSitemapXml } from '@/lib/utils/sitemap.xml'
import { DynamicLayout } from '@/themes/theme'
import { generateRedirectJson } from '@/lib/utils/redirect'
import { checkDataFromAlgolia } from '@/lib/plugins/algolia'
import pLimit from 'p-limit'
import { adapterNotionBlockMap } from '@/lib/utils/notion.util'

const normalizeBlockId = value => String(value || '').replace(/-/g, '').toLowerCase()

const escapeHtml = value =>
  String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const renderRichText = richText => {
  if (!Array.isArray(richText)) return ''

  return richText
    .map(segment => {
      if (!Array.isArray(segment)) return escapeHtml(segment)

      let text = escapeHtml(segment[0])
      const decorations = Array.isArray(segment[1]) ? segment[1] : []

      decorations.forEach(decoration => {
        if (!Array.isArray(decoration)) return
        const [type, value] = decoration
        if (type === 'b') text = `<strong>${text}</strong>`
        if (type === 'i') text = `<em>${text}</em>`
        if (type === 's') text = `<del>${text}</del>`
        if (type === '_') text = `<u>${text}</u>`
        if (type === 'c') text = `<code>${text}</code>`
        if (type === 'a' && value) {
          text = `<a href="${escapeHtml(value)}" target="_blank" rel="noopener noreferrer">${text}</a>`
        }
      })

      return text
    })
    .join('')
}

const getBlockValue = entry => entry?.value || entry || null

const findBlockValue = (blocks, id) => {
  if (!blocks || !id) return null
  if (blocks[id]) return getBlockValue(blocks[id])

  const targetId = normalizeBlockId(id)
  const matchedKey = Object.keys(blocks).find(key => normalizeBlockId(key) === targetId)
  return matchedKey ? getBlockValue(blocks[matchedKey]) : null
}

const renderNotionBlocksToHtml = (blockMap, rootId) => {
  const blocks = blockMap?.block
  if (!blocks) return ''

  const root = findBlockValue(blocks, rootId)
  const rootContent = Array.isArray(root?.content)
    ? root.content
    : Object.values(blocks)
        .map(getBlockValue)
        .find(block => block?.type === 'page' && Array.isArray(block.content))
        ?.content

  if (!Array.isArray(rootContent)) return ''

  const renderChildren = content => {
    if (!Array.isArray(content)) return ''

    let html = ''
    let listType = null
    let listItems = []

    const flushList = () => {
      if (!listType || listItems.length === 0) return
      const tag = listType === 'numbered_list' ? 'ol' : 'ul'
      html += `<${tag}>${listItems.join('')}</${tag}>`
      listType = null
      listItems = []
    }

    content.forEach(blockId => {
      const block = findBlockValue(blocks, blockId)
      if (!block) return

      const type = block.type
      const title = renderRichText(block.properties?.title)
      const childrenHtml = renderChildren(block.content)

      if (type === 'bulleted_list' || type === 'numbered_list') {
        if (listType && listType !== type) flushList()
        listType = type
        listItems.push(`<li>${title}${childrenHtml}</li>`)
        return
      }

      flushList()

      if (type === 'header') html += `<h1>${title}</h1>${childrenHtml}`
      else if (type === 'sub_header') html += `<h2>${title}</h2>${childrenHtml}`
      else if (type === 'sub_sub_header') html += `<h3>${title}</h3>${childrenHtml}`
      else if (type === 'quote') html += `<blockquote>${title}${childrenHtml}</blockquote>`
      else if (type === 'callout') html += `<blockquote>${title}${childrenHtml}</blockquote>`
      else if (type === 'divider') html += '<hr />'
      else if (type === 'code') html += `<pre><code>${escapeHtml(block.properties?.title?.map(item => item?.[0] || '').join('') || '')}</code></pre>`
      else if (type === 'image') {
        const source = block.properties?.source?.[0]?.[0]
        const caption = renderRichText(block.properties?.caption)
        if (source) {
          html += `<figure><img src="${escapeHtml(source)}" alt="${caption.replace(/<[^>]*>/g, '')}" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`
        }
        html += childrenHtml
      } else if (type === 'text' || type === 'toggle') {
        if (title) html += `<p>${title}</p>`
        html += childrenHtml
      } else {
        if (title) html += `<p>${title}</p>`
        html += childrenHtml
      }
    })

    flushList()
    return html
  }

  return renderChildren(rootContent)
}

async function getClaudeReadmePage(allPages) {
  const readmePage = allPages?.find(page => {
    const slug = String(page?.slug || '').replace(/^\/+|\/+$/g, '').toLowerCase()
    return page?.status === 'Published' && slug === 'readme.md'
  })

  if (!readmePage) return null

  try {
    const rawBlockMap = await getPostBlocks(readmePage.id, 'claude-readme', {
      cacheVersion: readmePage.lastEditedDate
    })
    const adaptedBlockMap = adapterNotionBlockMap(rawBlockMap)
    const blockMap = {
      ...adaptedBlockMap,
      block: formatNotionBlock(adaptedBlockMap.block)
    }

    return {
      ...readmePage,
      readmeHtml: renderNotionBlocksToHtml(blockMap, readmePage.id),
      excerpt: readmePage.summary || readmePage.description || ''
    }
  } catch (error) {
    console.warn('[Claude README] Failed to load README page:', error)
    return {
      ...readmePage,
      readmeHtml: '',
      excerpt: readmePage.summary || readmePage.description || ''
    }
  }
}

/**
 * 首页布局
 * @param {*} props
 * @returns
 */
const Index = props => {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return <DynamicLayout theme={theme} layoutName='LayoutIndex' {...props} />
}

/**
 * SSG 获取数据
 * @returns
 */
export async function getStaticProps(req) {
  const { locale } = req
  const from = 'index'
  const props = await fetchGlobalAllData({ from, locale })
  if (process.env.NODE_ENV === 'development') {
    const configTheme = BLOG.THEME
    const notionTheme = props?.NOTION_CONFIG?.THEME || null
    const finalTheme = siteConfig('THEME', BLOG.THEME, props?.NOTION_CONFIG)
    const source = notionTheme ? 'notion:config' : 'blog/env:config'
    console.log(
      '[ThemeResolver][server-static-props]',
      JSON.stringify({
        route: '/',
        configTheme,
        notionTheme,
        finalTheme,
        source
      })
    )
  }

  const theme = siteConfig('THEME', BLOG.THEME, props?.NOTION_CONFIG)
  if (theme === 'claude') {
    props.readmePage = await getClaudeReadmePage(props.allPages)
  }

  const POST_PREVIEW_LINES = siteConfig(
    'POST_PREVIEW_LINES',
    8,
    props?.NOTION_CONFIG
  )
  const POST_PREVIEW_MAX_COUNT = siteConfig(
    'POST_PREVIEW_MAX_COUNT',
    4,
    props?.NOTION_CONFIG
  )
  const POST_LIST_PREVIEW = siteConfig(
    'POST_LIST_PREVIEW',
    false,
    props?.NOTION_CONFIG
  )
  props.posts = props.allPages?.filter(
    page => page.type === 'Post' && page.status === 'Published'
  )

  // 处理分页
  const POST_LIST_STYLE = siteConfig(
    'POST_LIST_STYLE',
    'page',
    props?.NOTION_CONFIG
  )
  if (POST_LIST_STYLE === 'scroll') {
    // 滚动列表默认给前端返回所有数据
  } else if (POST_LIST_STYLE === 'page') {
    props.posts = props.posts?.slice(
      0,
      siteConfig('POSTS_PER_PAGE', 12, props?.NOTION_CONFIG)
    )
  }

  // 预览文章内容
  if (POST_LIST_PREVIEW) {
    const previewLimit = pLimit(
      siteConfig('POST_PREVIEW_CONCURRENCY', 5, props?.NOTION_CONFIG)
    )
    const previewTargets = props.posts.filter(
      post => !post.password || post.password === ''
    ).slice(0, POST_PREVIEW_MAX_COUNT)
    await Promise.all(
      previewTargets.map(post =>
        previewLimit(async () => {
          const rawBlockMap = await getPostBlocks(post.id, 'slug', POST_PREVIEW_LINES)
          post.blockMap = adapterNotionBlockMap(rawBlockMap)
          if (post.blockMap?.block) {
            post.blockMap.block = formatNotionBlock(post.blockMap.block)
          }
        })
      )
    )
  }
  const isBuildLifecycle = ['build', 'export'].includes(
    process.env.npm_lifecycle_event
  )
  if (isBuildLifecycle) {
    // 生成robotTxt
    generateRobotsTxt(props)
    // 生成Feed订阅
    if (shouldGenerateRssForLocale({ locale })) {
      await generateRss(props)
    }
    // 生成
    generateSitemapXml(props)
    // 检查数据是否需要从algolia删除
    await checkDataFromAlgolia(props)
    if (siteConfig('UUID_REDIRECT', false, props?.NOTION_CONFIG)) {
      // 生成重定向 JSON
      generateRedirectJson(props)
    }
  }

  // 生成全文索引 - 仅在 yarn build 时执行 && process.env.npm_lifecycle_event === 'build'

  if (!POST_LIST_PREVIEW) {
    props.posts = cleanPostSummaries(props.posts)
  }
  props.latestPosts = cleanPostSummaries(props.latestPosts)
  delete props.allPages

  return {
    props,
    revalidate: process.env.EXPORT
      ? undefined
      : siteConfig(
          'NEXT_REVALIDATE_SECOND',
          BLOG.NEXT_REVALIDATE_SECOND,
          props.NOTION_CONFIG
        )
  }
}

export default Index
