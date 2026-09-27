import { Client } from '@notionhq/client'
import { createHash } from 'node:crypto'
import {
  formatNotionComment,
  getPlainText,
  isPublicComment,
  PUBLIC_COMMENT_STATUS,
  validateCommentPayload
} from '@/lib/plugins/notionComments'

const databaseId = process.env.NOTION_COMMENT_DATABASE_ID
const token = process.env.NOTION_TOKEN
const requireApproval = process.env.NOTION_COMMENT_REQUIRE_APPROVAL === 'true'
const rateWindowMs = 60 * 1000
const rateLimit = Number(process.env.NOTION_COMMENT_RATE_LIMIT || 5)
const ipHits = new Map()

const getClient = () => {
  if (!databaseId || !token) {
    throw new Error('Missing NOTION_COMMENT_DATABASE_ID or NOTION_TOKEN')
  }
  return new Client({ auth: token })
}

const getClientIp = req => {
  const forwardedFor = req.headers['x-forwarded-for']
  return String(
    Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor || ''
  )
    .split(',')[0]
    .trim()
}

const isRateLimited = ip => {
  const now = Date.now()
  const hits = (ipHits.get(ip) || []).filter(time => now - time < rateWindowMs)
  if (hits.length >= rateLimit) {
    ipHits.set(ip, hits)
    return true
  }
  hits.push(now)
  ipHits.set(ip, hits)
  return false
}

const hasProperty = (properties, name, type) =>
  properties[name] && (!type || properties[name].type === type)

const getDatabaseProperties = async notion => {
  const database = await notion.databases.retrieve({ database_id: databaseId })
  return database.properties || {}
}

const hashEmail = email =>
  createHash('sha256').update(email).digest('hex').slice(0, 32)

const fetchComments = async postId => {
  const notion = getClient()
  const comments = []
  let startCursor

  do {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: startCursor,
      page_size: 100,
      filter: {
        property: 'PostId',
        title: { equals: postId }
      },
      sorts: [{ timestamp: 'created_time', direction: 'ascending' }]
    })
    comments.push(
      ...response.results
        .filter(page => 'properties' in page)
        .map(formatNotionComment)
        .filter(isPublicComment)
    )
    startCursor = response.has_more ? response.next_cursor : undefined
  } while (startCursor)

  return comments
}

const getParentLevel = async (notion, parentId, postId) => {
  if (!parentId) return 0
  const parent = await notion.pages.retrieve({ page_id: parentId })
  if (
    !('properties' in parent) ||
    getPlainText(parent.properties.PostId) !== postId
  ) {
    throw new Error('Invalid parent comment')
  }
  return parent.properties.Level?.type === 'number'
    ? parent.properties.Level.number || 1
    : 1
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const postId = String(req.query.postId || '').trim()
    if (!postId) {
      return res.status(400).json({ error: 'Missing postId' })
    }
    try {
      return res.status(200).json(await fetchComments(postId))
    } catch (error) {
      console.error('Failed to fetch Notion comments:', error)
      return res.status(500).json({ error: 'Failed to fetch comments' })
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const validation = validateCommentPayload(req.body)
  if (!validation.ok) {
    return res.status(400).json({ error: validation.error })
  }

  try {
    const notion = getClient()
    if (validation.spam) {
      return res.status(200).json({ ok: true })
    }

    const ip = getClientIp(req) || 'unknown'
    if (isRateLimited(ip)) {
      return res.status(429).json({ error: 'Too many comments' })
    }

    const properties = await getDatabaseProperties(notion)
    const { postId, content, author, nickname, parentId } = validation.value
    const level = (await getParentLevel(notion, parentId, postId)) + 1
    const status = requireApproval ? 'Pending' : PUBLIC_COMMENT_STATUS
    const pageProperties = {
      PostId: { title: [{ text: { content: postId } }] },
      ParentId: {
        rich_text: parentId ? [{ text: { content: parentId } }] : []
      },
      Content: { rich_text: [{ text: { content } }] },
      Author: { email: author },
      Level: { number: level },
      IpAddress: {
        rich_text: [{ text: { content: ip } }]
      }
    }

    if (nickname && hasProperty(properties, 'Nickname', 'rich_text')) {
      pageProperties.Nickname = { rich_text: [{ text: { content: nickname } }] }
    }
    if (hasProperty(properties, 'EmailHash', 'rich_text')) {
      pageProperties.EmailHash = {
        rich_text: [{ text: { content: hashEmail(author) } }]
      }
    }
    if (hasProperty(properties, 'Status', 'select')) {
      pageProperties.Status = { select: { name: status } }
    }
    if (hasProperty(properties, 'CreatedAt', 'date')) {
      pageProperties.CreatedAt = { date: { start: new Date().toISOString() } }
    }
    if (hasProperty(properties, 'UserAgent', 'rich_text')) {
      pageProperties.UserAgent = {
        rich_text: [
          { text: { content: String(req.headers['user-agent'] || '') } }
        ]
      }
    }

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: pageProperties
    })

    return res.status(200).json({
      comment: formatNotionComment(response),
      pending: requireApproval
    })
  } catch (error) {
    console.error('Failed to create Notion comment:', error)
    return res.status(500).json({ error: 'Failed to create comment' })
  }
}
