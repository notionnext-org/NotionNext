type Env = {
  AI_CHAT_API_KEY?: string
  AI_CHAT_BASE_URL?: string
  AI_CHAT_MODEL?: string
  AI_CHAT_SYSTEM_PROMPT?: string
  AI_CHAT_CORS_ORIGINS?: string
  AI_CHAT_MAX_TOKENS?: string
  AI_CHAT_TEMPERATURE?: string
}

type PagesContext = {
  request: Request
  env: Env
}

type UIMessagePart = {
  type?: string
  text?: string
}

type UIMessage = {
  role?: string
  content?: string
  parts?: UIMessagePart[]
}

type OpenAIMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

type ChatRequestBody = {
  messages?: UIMessage[]
}

const DEFAULT_BASE_URL = 'https://api.deepseek.com'
const DEFAULT_MODEL = 'deepseek-v4-flash'
const DEFAULT_MAX_TOKENS = 1200
const DEFAULT_TEMPERATURE = 0.3
const MAX_REQUEST_BYTES = 20_000
const MAX_MESSAGES = 8
const MAX_USER_TEXT_CHARS = 1000
const DEFAULT_SYSTEM_PROMPT =
  '你是站点 AI 助手。请优先回答和本站内容、文章、主题、配置、部署、评论、插件相关的问题。回答要简洁、准确；不确定时说明限制，不要编造。'

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
  const allowed = env.AI_CHAT_CORS_ORIGINS?.split(',')
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

const numberOrDefault = (
  value: string | undefined,
  fallback: number,
  min = 0
) => {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed >= min ? parsed : fallback
}

const textFromMessage = (message?: UIMessage) => {
  if (typeof message?.content === 'string') {
    return message.content
  }

  return (
    message?.parts
      ?.map(part => (part.type === 'text' ? part.text || '' : ''))
      .join('') || ''
  )
}

const normalizeRole = (role: string | undefined): OpenAIMessage['role'] =>
  role === 'assistant' ? 'assistant' : 'user'

const toOpenAIMessages = (messages: UIMessage[], env: Env): OpenAIMessage[] => {
  const chatMessages = messages
    .slice(-MAX_MESSAGES)
    .map(message => ({
      role: normalizeRole(message.role),
      content: textFromMessage(message).slice(0, MAX_USER_TEXT_CHARS)
    }))
    .filter(message => message.content.trim())

  return [
    {
      role: 'system',
      content: env.AI_CHAT_SYSTEM_PROMPT || DEFAULT_SYSTEM_PROMPT
    },
    ...chatMessages
  ]
}

const lastUserText = (messages: UIMessage[]) =>
  textFromMessage(
    [...messages].reverse().find(message => message.role === 'user')
  )

const errorMessage = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error)

  if (/api key|permission|auth|credential|401|403/i.test(message)) {
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

const completionUrl = (baseUrl: string) =>
  `${baseUrl.replace(/\/$/, '')}/chat/completions`

export const onRequestOptions = ({ request, env }: PagesContext) =>
  new Response(null, {
    status: 204,
    headers: corsHeaders(request, env)
  })

export const onRequestPost = async ({ request, env }: PagesContext) => {
  const headers = corsHeaders(request, env)
  const contentLength = Number(request.headers.get('content-length') || 0)

  if (contentLength > MAX_REQUEST_BYTES) {
    return json({ error: 'Request is too large.' }, { status: 413, headers })
  }

  if (!env.AI_CHAT_API_KEY) {
    return json(
      { error: 'Missing AI_CHAT_API_KEY in server settings.' },
      { status: 500, headers }
    )
  }

  const body = (await request.json()) as ChatRequestBody
  const messages = Array.isArray(body.messages) ? body.messages : []

  if (lastUserText(messages).length > MAX_USER_TEXT_CHARS) {
    return json({ error: 'Question is too long.' }, { status: 413, headers })
  }

  try {
    const response = await fetch(
      completionUrl(env.AI_CHAT_BASE_URL || DEFAULT_BASE_URL),
      {
        method: 'POST',
        headers: {
          authorization: `Bearer ${env.AI_CHAT_API_KEY}`,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          model: env.AI_CHAT_MODEL || DEFAULT_MODEL,
          messages: toOpenAIMessages(messages, env),
          max_tokens: numberOrDefault(
            env.AI_CHAT_MAX_TOKENS,
            DEFAULT_MAX_TOKENS,
            1
          ),
          temperature: numberOrDefault(
            env.AI_CHAT_TEMPERATURE,
            DEFAULT_TEMPERATURE
          ),
          stream: false
        })
      }
    )
    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>
      error?: { message?: string }
    }

    if (!response.ok) {
      throw new Error(
        data.error?.message || `AI provider returned ${response.status}`
      )
    }

    return json(
      { text: data.choices?.[0]?.message?.content || '' },
      { headers }
    )
  } catch (error) {
    console.error(error)
    return json({ error: errorMessage(error) }, { status: 502, headers })
  }
}

export const onRequest = () =>
  json({ error: 'Method not allowed.' }, { status: 405 })
