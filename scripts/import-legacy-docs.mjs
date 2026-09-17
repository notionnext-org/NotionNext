#!/usr/bin/env node
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'
import { NotionAPI } from 'notion-client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const USER_GUIDE = path.join(ROOT, 'docs', 'user-guide')
const BASE = 'https://docs.tangly1024.com'
const notion = new NotionAPI({ userAgent: 'Mozilla/5.0' })

const explicitPathMap = {
  about: 'intro.md',
  'how-to-update-notionnext': 'update.md',
  latest: 'changelog/latest.md',
  'v4.0': 'changelog/v4-history.md',
  'v3.0': 'changelog/v3-history.md',
  'V2.0': 'changelog/v2-history.md',
  'v1.0': 'changelog/v1-history.md',
  'vercel-deploy-notion-next': 'deploy-vercel.md',
  'vercel-domain': 'deploy/vercel-domain.md',
  'vercel-accelerate': 'deploy/vercel-accelerate.md',
  'vercel-notionnext-notion': 'development/architecture.md',
  'vercel-multi-sites': 'deploy/vercel-multi-sites.md',
  'vercel-deploy-notion-next-static': 'deploy/vercel-static.md',
  'vercel-redploy': 'deploy/vercel-redeploy.md',
  'notion-next-cloud-flare': 'deploy/cloudflare-pages.md',
  'deploy-notion-next-with-netlify': 'deploy/netlify.md',
  'deploy-notion-next-with-edge-one': 'deploy/edgeone-pages.md',
  'deploy-notion-next-on-vps': 'deploy/vps.md',
  'notionnext-deploy-web3.0-4everland': 'deploy/4everland.md',
  'deploy-notion-next-with-zeabur': 'deploy/zeabur.md',
  'example-1': 'notion/example-article.md',
  'start-to-write': 'notion-database.md',
  'notion-short-key': 'notion/short-keys.md',
  'notion-faster': 'notion/faster.md',
  'how-to-config-notion-next': 'config-site.md',
  'notion-next-guide': 'config/site-basics.md',
  'notion-next-url-customize': 'config/url-customize.md',
  'notion-next-secondary-menu': 'menu-secondary.md',
  'notion-next-themes': 'themes/overview.md',
  'notion-next-typography': 'themes/typography.md',
  'notion-next-magzine': 'themes/magzine.md',
  'notion-next-proxio': 'themes/proxio.md',
  'notionnext-simple': 'themes/simple.md',
  'notion-next-greetings': 'themes/hexo-matery.md',
  'notionnext-gitbook': 'themes/gitbook.md',
  'notionnext-heo': 'themes/heo.md',
  'notionnext-starter': 'themes/starter.md',
  'notionnext-movie': 'themes/movie.md',
  'notionnext-game': 'themes/game.md',
  'notionnext-commerce': 'themes/commerce.md',
  'notion-next-analytics': 'analytics/overview.md',
  'notion-next-umami': 'analytics/umami.md',
  'notion-next-search-engine-index': 'operations/search-engine-index.md',
  'notion-next-clarity': 'analytics/clarity.md',
  'notion-next-51-la': 'analytics/51la.md',
  'notion-next-ackee': 'analytics/ackee.md',
  'notion-next-comment-plugin': 'comments/overview.md',
  'notion-next-cusdis': 'comments/cusdis.md',
  'notion-next-utterance': 'comments/utterances.md',
  'notion-next-giscus': 'comments/giscus.md',
  'notionnext-twikoo': 'comments/twikoo.md',
  'notion-next-artalk': 'comments/artalk.md',
  'notion-next-gitalk': 'comments/gitalk.md',
  'notionnext-valine': 'comments/valine.md',
  'notion-next-waline': 'comments/waline.md',
  'notion-next-plugins': 'plugins/overview.md',
  'notion-next-plugin-music-player': 'plugins/music-player.md',
  'notion-next-algolia': 'config/algolia.md',
  'notion-next-mailchimp': 'plugins/mailchimp.md',
  'how-to-develop-with-notion-next': 'development/getting-started.md',
  'custom-your-style': 'development/custom-style.md',
  'your-own-theme': 'development/own-theme.md',
  'next-js': 'development/nextjs.md',
  'seo-course': 'operations/seo.md',
  'how-to-question': 'help/community-rules.md',
  'about-author': 'help/feedback.md',
  'chat-community': 'help/community.md',
  'my-service': 'help/support.md',
  'support-notion-next': 'help/support-notion-next.md'
}

const categoryDirs = [
  ['Notion教程', 'notion'],
  ['站点配置', 'config'],
  ['主题参数', 'themes'],
  ['网站统计', 'analytics'],
  ['评论插件', 'comments'],
  ['外部扩展', 'plugins'],
  ['开发教程', 'development'],
  ['运营教程', 'operations'],
  ['获取帮助', 'help'],
  ['支持我们', 'help']
]

function slugOf(page) {
  return (page.slug || page.href || '').replace(/^\/?article\//, '').replace(/^\//, '')
}

function stripEmoji(text = '') {
  return text.replace(/^[^\p{L}\p{N}]+/u, '').trim()
}

function targetFor(page) {
  const slug = slugOf(page)
  if (explicitPathMap[slug]) return explicitPathMap[slug]
  const category = stripEmoji(page.category)
  const dir = categoryDirs.find(([name]) => category.includes(name))?.[1] || 'legacy'
  return `${dir}/${slug.toLowerCase()}.md`
}

function textOf(richText) {
  if (!Array.isArray(richText)) return ''
  return richText
    .map(([text, decorators]) => {
      let out = escapeText(text || '')
      if (!out) return ''
      for (const decorator of decorators || []) {
        const [type, value] = decorator
        if (type === 'a' && value) out = `[${escapeLinkLabel(out)}](${normalizeUrl(value)})`
        if (type === 'b') out = `**${out}**`
        if (type === 'i') out = `_${out}_`
        if (type === 'c') out = `\`${out.replace(/`/g, '\\`')}\``
        if (type === 's') out = `~~${out}~~`
      }
      return out
    })
    .join('')
}

function escapeText(text) {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeLinkLabel(text) {
  return text.replace(/\[/g, '\\[').replace(/\]/g, '\\]')
}

function escapeImageAlt(text) {
  return escapeLinkLabel(text || 'image').replace(/\n/g, ' ')
}

function normalizeUrl(url) {
  if (!url) return ''
  if (/^\/[0-9a-f]{32}(\?.*)?$/i.test(url)) return `https://www.notion.so${url}`
  if (/^\/article\//.test(url)) return `${BASE}${url}`
  return url
}

function getBlock(blockMap, id) {
  const entry = blockMap.block?.[id]
  return entry?.value?.value || entry?.value || null
}

function imageUrl(blockMap, block) {
  return (
    blockMap.signed_urls?.[block.id] ||
    block.format?.display_source ||
    textOf(block.properties?.source) ||
    block.format?.bookmark_cover ||
    ''
  )
}

function renderChildren(blockMap, block, depth) {
  return (block.content || [])
    .map((id) => renderBlock(blockMap, getBlock(blockMap, id), depth + 1))
    .filter(Boolean)
    .join('\n')
}

function renderBlock(blockMap, block, depth = 0) {
  if (!block || block.alive === false) return ''
  const title = textOf(block.properties?.title).trim()
  const children = renderChildren(blockMap, block, depth)

  switch (block.type) {
    case 'text':
      return [title, children].filter(Boolean).join('\n\n')
    case 'header':
      return `## ${title}\n${children}`.trim()
    case 'sub_header':
      return `### ${title}\n${children}`.trim()
    case 'sub_sub_header':
      return `#### ${title}\n${children}`.trim()
    case 'bulleted_list':
      return `${'  '.repeat(depth)}- ${title}${children ? `\n${children}` : ''}`
    case 'numbered_list':
      return `${'  '.repeat(depth)}1. ${title}${children ? `\n${children}` : ''}`
    case 'quote':
      return `> ${title.replace(/\n/g, '\n> ')}${children ? `\n>\n${children}` : ''}`
    case 'callout': {
      const icon = block.format?.page_icon || '提示'
      return `> **${icon}** ${title}${children ? `\n>\n${children.replace(/\n/g, '\n> ')}` : ''}`
    }
    case 'toggle':
      return `<details>\n<summary>${title}</summary>\n\n${children}\n\n</details>`
    case 'code': {
      const lang = block.properties?.language?.[0]?.[0] || ''
      return `\`\`\`${lang}\n${title}\n\`\`\``
    }
    case 'image': {
      const url = imageUrl(blockMap, block)
      const caption = escapeImageAlt(textOf(block.properties?.caption) || title || 'image')
      return url ? `![${caption}](${url})` : ''
    }
    case 'video':
    case 'embed':
      return textOf(block.properties?.source)
    case 'bookmark': {
      const link = textOf(block.properties?.link)
      const label = textOf(block.properties?.title) || link
      const desc = textOf(block.properties?.description)
      return [`[${label}](${link})`, desc].filter(Boolean).join('\n\n')
    }
    case 'divider':
      return '---'
    case 'page':
      return title ? `- ${title}` : ''
    case 'column_list':
    case 'column':
    case 'transclusion_container':
      return children
    default:
      return [title, children].filter(Boolean).join('\n\n')
  }
}

function normalizeMarkdown(text) {
  return text
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\n(#{2,})/g, '\n\n$1')
    .trim()
}

async function fetchPage(slug) {
  const url = slug === 'about' ? `${BASE}/about` : `${BASE}/article/${slug}`
  const res = await fetch(url, { headers: { 'user-agent': 'NotionNext-docs-importer/1.0' } })
  if (!res.ok) throw new Error(`${url} HTTP ${res.status}`)
  const html = await res.text()
  const dom = new JSDOM(html)
  const script = dom.window.document.querySelector('#__NEXT_DATA__')?.textContent
  if (!script) throw new Error(`${url} missing __NEXT_DATA__`)
  const data = JSON.parse(script)
  const post = data.props.pageProps.post
  if (post?.id && post?.blockMap) {
    try {
      const freshRecordMap = await notion.getPage(post.id)
      post.blockMap.signed_urls = freshRecordMap.signed_urls || post.blockMap.signed_urls
    } catch (error) {
      process.stderr.write(`signed url refresh failed ${slug}: ${error.message}\n`)
    }
  }
  return data.props.pageProps
}

function collectPages(home) {
  const pages = [{ ...home.post, slug: 'about', href: '/about', category: '入门' }]
  for (const page of home.allNavPages || []) {
    const slug = slugOf(page)
    if (slug && !pages.some((item) => slugOf(item) === slug)) pages.push(page)
  }
  return pages
}

function pageToMarkdown(pageProps, sourcePage) {
  const post = pageProps.post
  const blockMap = post.blockMap
  const body = normalizeMarkdown(
    (post.content || [])
      .map((id) => renderBlock(blockMap, getBlock(blockMap, id)))
      .filter(Boolean)
      .join('\n\n')
  )
  const slug = slugOf(sourcePage)
  const sourceUrl = slug === 'about' ? `${BASE}/about` : `${BASE}/article/${slug}`
  const meta = [
    `# ${post.title || sourcePage.title || slug}`,
    '',
    `> 迁移自：[${post.title || sourcePage.title || slug}](${sourceUrl})`,
    post.publishDay ? `> 发布日期：${post.publishDay}` : '',
    post.lastEditedDay ? `> 最后编辑：${post.lastEditedDay}` : '',
    post.category ? `> 原栏目：${post.category}` : '',
    post.tags?.length ? `> 标签：${post.tags.join('、')}` : '',
    post.summary ? `> 摘要：${post.summary}` : ''
  ].filter(Boolean)

  const footer = ['## 原文链接', '', sourceUrl]
  return `${meta.join('\n')}\n\n${body}\n\n${footer.join('\n')}\n`
}

async function writeArticleIndex(rows) {
  const byDir = new Map()
  for (const row of rows) {
    const section = row.category || '其他'
    if (!byDir.has(section)) byDir.set(section, [])
    byDir.get(section).push(row)
  }
  const lines = [
    '# 官方文档迁移索引',
    '',
    '源站：https://docs.tangly1024.com',
    '',
    '本表由 `node scripts/import-legacy-docs.mjs` 从旧站导航和文章数据生成。正文已迁移到 `docs/user-guide/`，每篇文末保留旧站原文链接。',
    '',
    '| 原栏目 | 原文 slug | 本地文档 |',
    '| --- | --- | --- |'
  ]
  for (const row of rows) {
    lines.push(
      `| ${row.category || '入门'} | \`${row.slug}\` | [${row.target}](./${row.target.replace(/\\/g, '/')}) |`
    )
  }
  lines.push('')
  await fs.writeFile(path.join(USER_GUIDE, 'ARTICLE_INDEX.md'), lines.join('\n'), 'utf8')
}

async function main() {
  const home = await fetchPage('about')
  const pages = collectPages(home)
  const rows = []
  for (const page of pages) {
    const slug = slugOf(page)
    const target = targetFor(page)
    process.stdout.write(`import ${slug} -> ${target}\n`)
    try {
      const props = slug === 'about' ? home : await fetchPage(slug)
      const markdown = pageToMarkdown(props, page)
      const file = path.join(USER_GUIDE, target)
      await fs.mkdir(path.dirname(file), { recursive: true })
      await fs.writeFile(file, markdown, 'utf8')
      rows.push({ slug, category: props.post.category || page.category, target })
    } catch (error) {
      process.stderr.write(`skip ${slug}: ${error.message}\n`)
    }
  }
  await writeArticleIndex(rows)
  process.stdout.write(`done: ${rows.length}/${pages.length} pages\n`)
}

main()
