import { siteConfig } from '@/lib/config'
import { useState } from 'react'

const makeMessage = (role, text) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  role,
  parts: [{ type: 'text', text }]
})

export default function DocsChat() {
  const api = siteConfig('DOCS_CHAT_API')
  const title = siteConfig('DOCS_CHAT_TITLE', 'AI 助手')
  const welcome = siteConfig(
    'DOCS_CHAT_WELCOME',
    '你好，我是这个站点的 AI 助手。你可以问我站点内容相关问题。'
  )
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([makeMessage('assistant', welcome)])

  if (!api) return null

  const ask = async event => {
    event.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const nextMessages = [...messages, makeMessage('user', text)]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const separator = api.includes('?') ? '&' : '?'
      const response = await fetch(`${api}${separator}stream=false`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.slice(-6) })
      })
      const data = await response.json()
      const reply = response.ok ? data.text : data.error
      setMessages([
        ...nextMessages,
        makeMessage('assistant', reply || '请求失败，请稍后再试。')
      ])
    } catch {
      setMessages([
        ...nextMessages,
        makeMessage('assistant', '网络请求失败，请稍后再试。')
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='docs-chat'>
      {open && (
        <section className='docs-chat-panel' aria-label={title}>
          <header>
            <strong>{title}</strong>
            <button
              type='button'
              onClick={() => setOpen(false)}
              aria-label='关闭 AI 助手'
            >
              ×
            </button>
          </header>
          <div className='docs-chat-messages'>
            {messages.map(message => (
              <p
                key={message.id}
                className={`docs-chat-message ${message.role}`}
              >
                {message.parts?.[0]?.text}
              </p>
            ))}
            {loading && (
              <p className='docs-chat-message assistant'>正在思考...</p>
            )}
          </div>
          <form onSubmit={event => void ask(event)}>
            <textarea
              value={input}
              maxLength={1000}
              rows={2}
              placeholder='输入你的问题'
              onChange={event => setInput(event.target.value)}
            />
            <button
              type='submit'
              disabled={loading || !input.trim()}
              aria-label='发送'
            >
              ↑
            </button>
          </form>
        </section>
      )}
      <button
        className='docs-chat-fab'
        type='button'
        onClick={() => setOpen(true)}
      >
        {title}
      </button>
      <style jsx>{`
        .docs-chat {
          position: fixed;
          right: 18px;
          bottom: 18px;
          z-index: 50;
          font-size: 14px;
        }
        .docs-chat-fab {
          border: 0;
          border-radius: 999px;
          padding: 12px 18px;
          color: white;
          background: linear-gradient(135deg, #0f766e, #2563eb);
          box-shadow: 0 14px 35px rgba(15, 118, 110, 0.32);
          font-weight: 700;
        }
        .docs-chat-panel {
          display: flex;
          flex-direction: column;
          width: min(380px, calc(100vw - 28px));
          height: min(560px, calc(100vh - 92px));
          margin-bottom: 12px;
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, 0.24);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.96);
          box-shadow: 0 24px 70px rgba(15, 23, 42, 0.22);
          backdrop-filter: blur(16px);
        }
        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-bottom: 1px solid rgba(148, 163, 184, 0.18);
          color: #0f172a;
        }
        header button {
          display: grid;
          width: 32px;
          height: 32px;
          place-items: center;
          border: 0;
          border-radius: 999px;
          background: #f1f5f9;
          color: #475569;
          font-size: 22px;
          line-height: 1;
        }
        .docs-chat-messages {
          display: flex;
          flex: 1;
          flex-direction: column;
          gap: 10px;
          min-height: 0;
          padding: 14px;
          overflow-y: auto;
          background: linear-gradient(180deg, #f8fafc, #eef6f7);
        }
        .docs-chat-message {
          max-width: 86%;
          margin: 0;
          padding: 10px 12px;
          border-radius: 14px;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
          line-height: 1.65;
        }
        .docs-chat-message.user {
          align-self: flex-end;
          border-bottom-right-radius: 4px;
          color: white;
          background: #2563eb;
        }
        .docs-chat-message.assistant {
          align-self: flex-start;
          border: 1px solid rgba(148, 163, 184, 0.28);
          border-bottom-left-radius: 4px;
          color: #172033;
          background: white;
        }
        form {
          position: relative;
          padding: 12px;
          border-top: 1px solid rgba(148, 163, 184, 0.18);
          background: white;
        }
        textarea {
          width: 100%;
          min-height: 58px;
          resize: none;
          border: 1px solid #d8e0ea;
          border-radius: 12px;
          padding: 10px 48px 10px 12px;
          outline: none;
          color: #0f172a;
          background: #f8fafc;
          font: inherit;
        }
        textarea:focus {
          border-color: #0f766e;
          background: white;
        }
        form button {
          position: absolute;
          right: 22px;
          bottom: 22px;
          width: 34px;
          height: 34px;
          border: 0;
          border-radius: 999px;
          color: white;
          background: #0f766e;
          font-size: 20px;
          font-weight: 800;
        }
        button {
          cursor: pointer;
        }
        button:disabled {
          cursor: not-allowed;
          opacity: 0.45;
        }
        :global(.dark) .docs-chat-panel {
          border-color: rgba(148, 163, 184, 0.22);
          background: rgba(15, 23, 42, 0.96);
        }
        :global(.dark) header,
        :global(.dark) textarea {
          color: #e5edf7;
        }
        :global(.dark) header,
        :global(.dark) form {
          background: #0f172a;
        }
        :global(.dark) header button,
        :global(.dark) textarea {
          background: #1e293b;
        }
        :global(.dark) .docs-chat-messages {
          background: linear-gradient(180deg, #111827, #0f172a);
        }
        :global(.dark) .docs-chat-message.assistant {
          color: #e5edf7;
          background: #1e293b;
        }
      `}</style>
    </div>
  )
}
