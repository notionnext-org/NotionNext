import { createGoogle } from '@ai-sdk/google'
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateText,
  streamText,
  toUIMessageStream,
  type UIMessage
} from 'ai'

type Env = {
  GOOGLE_GENERATIVE_AI_API_KEY?: string
  DOCS_CHAT_MODEL?: string
  DOCS_CHAT_CORS_ORIGINS?: string
  DOCS_CHAT_MAX_TOKENS?: string
}

type PagesContext = {
  request: Request
  env: Env
}

type ChatRequestBody = {
  messages?: UIMessage[]
}

const DEFAULT_MODEL = 'gemini-flash-lite-latest'
const DEFAULT_MAX_TOKENS = 1200
const MAX_REQUEST_BYTES = 20_000
const MAX_MESSAGES = 6
const MAX_USER_TEXT_CHARS = 1000
const SYSTEM_PROMPT = `你是 NotionNext 文档助手。

必须使用简体中文回答，除非用户明确要求其他语言。

只回答 NotionNext 相关问题，包括部署、主题、Notion 数据库、站点配置、评论、插件和常见排错。

如果用户询问无关内容，简短拒绝，并请用户改问 NotionNext 相关问题。

回答必须面向技术小白：直接给步骤，优先给准确配置名。不要编造配置项、环境变量名、文件名或链接；不确定时说明去哪个文档页检查。

已确认的高频事实：
- 默认主题在 blog.config.js 中配置：THEME: process.env.NEXT_PUBLIC_THEME || 'simple'
- 部署平台可用环境变量 NEXT_PUBLIC_THEME=simple 固定主题。
- 主题切换按钮由 conf/widget.config.js 中的 THEME_SWITCH 控制，也可用环境变量 NEXT_PUBLIC_THEME_SWITCH=false 隐藏。
- 如果部署后不是 simple，优先检查部署平台环境变量、Notion Config 数据库中的 THEME 配置、以及是否开启了 THEME_SWITCH。

推荐回答“如何隐藏主题切换并固定 simple”时使用：
1. 在 Vercel / Cloudflare Pages 的环境变量里设置 NEXT_PUBLIC_THEME=simple。
2. 设置 NEXT_PUBLIC_THEME_SWITCH=false。
3. 重新部署一次。
4. 如果仍不是 simple，检查 Notion 配置表里是否有 THEME 字段覆盖了默认值。

常用文档入口：
- /user-guide/start-here
- /user-guide/deploy-vercel
- /user-guide/config-site
- /user-guide/themes/THEMES_CATALOG
- /user-guide/reference/features
- /user-guide/comments/overview
- /user-guide/deploy/cloudflare-pages`

const json = (body: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...init.headers
    }
  })

const corsHeaders = (request: Request, env: Env) => {
  const origin = request.headers.get('origin')
  const allowed = env.DOCS_CHAT_CORS_ORIGINS?.split(',')
    .map(item => item.trim())
    .filter(Boolean)

  if (!origin || !allowed?.length) {
    return {}
  }

  if (!allowed.includes('*') && !allowed.includes(origin)) {
    return {}
  }

  return {
    'access-control-allow-origin': allowed.includes('*') ? '*' : origin,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type'
  }
}

const maxOutputTokens = (value: string | undefined) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_MAX_TOKENS
}

const textFromMessage = (message?: UIMessage) =>
  message?.parts
    ?.map(part => (part.type === 'text' ? part.text : ''))
    .join('') || ''

const lastUserText = (messages: UIMessage[]) =>
  textFromMessage([...messages].reverse().find(message => message.role === 'user'))

const errorMessage = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error)

  if (/api key|permission|auth|credential/i.test(message)) {
    return 'AI model authentication failed.'
  }

  if (/quota|rate limit|429/i.test(message)) {
    return 'AI model quota or rate limit reached.'
  }

  if (/timeout|abort|network|fetch/i.test(message)) {
    return 'AI model network request failed.'
  }

  return 'AI assistant request failed.'
}

export const onRequestOptions = ({ request, env }: PagesContext) =>
  new Response(null, {
    status: 204,
    headers: corsHeaders(request, env)
  })

export const onRequestPost = async ({ request, env }: PagesContext) => {
  const headers = corsHeaders(request, env)
  const contentLength = Number(request.headers.get('content-length') || 0)
  const shouldStream = new URL(request.url).searchParams.get('stream') !== 'false'

  if (contentLength > MAX_REQUEST_BYTES) {
    return json({ error: 'Request is too large.' }, { status: 413, headers })
  }

  if (!env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return json(
      { error: 'Missing GOOGLE_GENERATIVE_AI_API_KEY in Cloudflare Pages settings.' },
      { status: 500, headers }
    )
  }

  const body = (await request.json()) as ChatRequestBody
  const messages = Array.isArray(body.messages) ? body.messages.slice(-MAX_MESSAGES) : []

  if (lastUserText(messages).length > MAX_USER_TEXT_CHARS) {
    return json({ error: 'Question is too long.' }, { status: 413, headers })
  }

  const google = createGoogle({ apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY })

  if (!shouldStream) {
    try {
      const result = await generateText({
        model: google(env.DOCS_CHAT_MODEL || DEFAULT_MODEL),
        messages: await convertToModelMessages(messages),
        system: SYSTEM_PROMPT,
        temperature: 0,
        maxOutputTokens: maxOutputTokens(env.DOCS_CHAT_MAX_TOKENS)
      })

      return json({ text: result.text }, { headers })
    } catch (error) {
      console.error(error)
      return json({ error: errorMessage(error) }, { status: 502, headers })
    }
  }

  const result = streamText({
    model: google(env.DOCS_CHAT_MODEL || DEFAULT_MODEL),
    messages: await convertToModelMessages(messages),
    system: SYSTEM_PROMPT,
    temperature: 0,
    maxOutputTokens: maxOutputTokens(env.DOCS_CHAT_MAX_TOKENS)
  })

  const stream = createUIMessageStream<UIMessage>({
    execute: ({ writer }) => {
      writer.merge(toUIMessageStream({ stream: result.stream }))
    },
    onError: error => {
      console.error(error)
      return errorMessage(error)
    }
  })

  return createUIMessageStreamResponse({
    headers,
    stream
  })
}

export const onRequest = () =>
  json({ error: 'Method not allowed.' }, { status: 405 })
