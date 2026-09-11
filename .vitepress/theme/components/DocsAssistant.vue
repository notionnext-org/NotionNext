<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  parts: { type: 'text'; text: string }[]
}

const api = import.meta.env.VITE_DOCS_CHAT_API || ''
const title = 'NotionNext AI 助手 v2026.07.29'
const welcome =
  '你好，我是 NotionNext 文档助手。你可以问我部署、主题、Notion 配置、评论插件和常见排错问题。'

const open = ref(false)
const input = ref('')
const loading = ref(false)
const messagesEl = ref<HTMLElement | null>(null)
const messages = ref<ChatMessage[]>([makeMessage('assistant', welcome)])

const canSend = computed(() => input.value.trim().length > 0 && !loading.value)

function makeMessage(role: ChatMessage['role'], text: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    role,
    parts: [{ type: 'text', text }]
  }
}

function textOf(message: ChatMessage) {
  return message.parts.map(part => part.text).join('')
}

async function scrollToBottom() {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
}

async function ask() {
  const text = input.value.trim()
  if (!text || loading.value) return

  const nextMessages = [...messages.value, makeMessage('user', text)]
  messages.value = nextMessages
  input.value = ''
  loading.value = true
  await scrollToBottom()

  try {
    const separator = api.includes('?') ? '&' : '?'
    const response = await fetch(`${api}${separator}stream=false`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages: nextMessages.slice(-6) })
    })
    const data = await response.json().catch(() => ({}))
    const reply = response.ok ? data.text : data.error

    messages.value = [
      ...nextMessages,
      makeMessage('assistant', reply || '请求失败，请稍后再试。')
    ]
  } catch {
    messages.value = [...nextMessages, makeMessage('assistant', '网络请求失败，请稍后再试。')]
  } finally {
    loading.value = false
    await scrollToBottom()
  }
}
</script>

<template>
  <div v-if="api" class="docs-assistant">
    <section v-if="open" class="docs-assistant-panel" :aria-label="title">
      <header class="docs-assistant-header">
        <strong>{{ title }}</strong>
        <button type="button" aria-label="关闭 AI 助手" @click="open = false">×</button>
      </header>

      <div ref="messagesEl" class="docs-assistant-messages">
        <p
          v-for="message in messages"
          :key="message.id"
          class="docs-assistant-message"
          :class="message.role"
        >
          {{ textOf(message) }}
        </p>
        <p v-if="loading" class="docs-assistant-message assistant">正在思考...</p>
      </div>

      <form class="docs-assistant-form" @submit.prevent="ask">
        <textarea
          v-model="input"
          maxlength="1000"
          rows="2"
          placeholder="输入你的问题"
          @keydown.enter.exact.prevent="ask"
        />
        <button type="submit" :disabled="!canSend" aria-label="发送">↑</button>
      </form>
    </section>

    <button class="docs-assistant-fab" type="button" @click="open = true">AI 助手</button>
  </div>
</template>

<style scoped>
.docs-assistant {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 50;
  font-size: 14px;
}

.docs-assistant-fab {
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 34%, transparent);
  border-radius: 999px;
  padding: 11px 18px;
  color: #fff;
  background: linear-gradient(135deg, #0f766e, #2563eb);
  box-shadow: 0 16px 44px color-mix(in srgb, #0f766e 34%, transparent);
  font-weight: 700;
}

.docs-assistant-panel {
  display: flex;
  flex-direction: column;
  width: min(420px, calc(100vw - 28px));
  height: min(560px, calc(100vh - 92px));
  margin-bottom: 12px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 70%, transparent);
  border-radius: 16px;
  background: color-mix(in srgb, var(--vp-c-bg) 96%, transparent);
  box-shadow: 0 24px 70px color-mix(in srgb, var(--vp-c-text-1) 18%, transparent);
  backdrop-filter: blur(16px);
}

.docs-assistant-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid color-mix(in srgb, var(--vp-c-divider) 70%, transparent);
  color: var(--vp-c-text-1);
}

.docs-assistant-header button {
  display: grid;
  width: 32px;
  height: 32px;
  place-items: center;
  border: 0;
  border-radius: 999px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  font-size: 22px;
  line-height: 1;
}

.docs-assistant-messages {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
  padding: 14px;
  overflow-y: auto;
  background: linear-gradient(180deg, var(--vp-c-bg), var(--vp-c-bg-soft));
}

.docs-assistant-message {
  max-width: 88%;
  margin: 0;
  padding: 10px 12px;
  border-radius: 14px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  line-height: 1.7;
}

.docs-assistant-message.user {
  align-self: flex-end;
  border-bottom-right-radius: 4px;
  color: #fff;
  background: linear-gradient(135deg, #2563eb, #0f766e);
}

.docs-assistant-message.assistant {
  align-self: flex-start;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 70%, transparent);
  border-bottom-left-radius: 4px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
}

.docs-assistant-form {
  position: relative;
  padding: 12px;
  border-top: 1px solid color-mix(in srgb, var(--vp-c-divider) 70%, transparent);
  background: var(--vp-c-bg);
}

.docs-assistant-form textarea {
  width: 100%;
  min-height: 58px;
  resize: none;
  border: 1px solid color-mix(in srgb, var(--vp-c-divider) 80%, transparent);
  border-radius: 12px;
  padding: 10px 48px 10px 12px;
  outline: none;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-soft);
  font: inherit;
}

.docs-assistant-form textarea:focus {
  border-color: #0f766e;
  background: var(--vp-c-bg);
}

.docs-assistant-form button {
  position: absolute;
  right: 22px;
  bottom: 22px;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 999px;
  color: #fff;
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

@media (max-width: 640px) {
  .docs-assistant {
    right: 14px;
    bottom: 14px;
  }
}
</style>
