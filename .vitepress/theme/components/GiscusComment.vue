<script setup lang="ts">
/**
 * 文档站评论：对接 GitHub Discussions（Giscus）
 * 配置见 .vitepress/config.mts → themeConfig.giscus
 * 在 giscus.app 选择仓库 notionnext-org/NotionNext 后填入 repoId / categoryId
 */
import { onMounted, onBeforeUnmount, watch, ref, computed } from 'vue'
import { useRoute, useData } from 'vitepress'

const route = useRoute()
const { theme, frontmatter, isDark } = useData()

const containerRef = ref<HTMLElement | null>(null)
const giscus = computed(() => theme.value.giscus)

const show = computed(() => {
  if (frontmatter.value.comments === false) return false
  const cfg = giscus.value
  if (!cfg?.enabled) return false
  if (!cfg.repoId || !cfg.categoryId) return false
  return true
})

let scriptEl: HTMLScriptElement | null = null

function currentGiscusTheme() {
  return isDark.value ? 'dark' : 'light'
}

function destroyGiscus() {
  const el = containerRef.value
  if (el) el.innerHTML = ''
}

function syncGiscusTheme() {
  if (typeof window === 'undefined') return
  const theme = currentGiscusTheme()
  scriptEl?.setAttribute('data-theme', theme)
  const iframe = containerRef.value?.querySelector<HTMLIFrameElement>(
    'iframe.giscus-frame'
  )
  iframe?.contentWindow?.postMessage(
    {
      giscus: {
        setConfig: {
          theme
        }
      }
    },
    'https://giscus.app'
  )
}

function loadGiscus() {
  if (!show.value || typeof window === 'undefined') return
  const cfg = giscus.value
  const host = containerRef.value
  if (!host) return

  destroyGiscus()

  scriptEl = document.createElement('script')
  scriptEl.src = 'https://giscus.app/client.js'
  scriptEl.setAttribute('data-repo', cfg.repo)
  scriptEl.setAttribute('data-repo-id', cfg.repoId)
  scriptEl.setAttribute('data-category', cfg.category)
  scriptEl.setAttribute('data-category-id', cfg.categoryId)
  scriptEl.setAttribute('data-mapping', cfg.mapping || 'pathname')
  scriptEl.setAttribute('data-strict', cfg.strict ?? '0')
  scriptEl.setAttribute('data-reactions-enabled', cfg.reactionsEnabled ?? '1')
  scriptEl.setAttribute('data-emit-metadata', cfg.emitMetadata ?? '0')
  scriptEl.setAttribute('data-input-position', cfg.inputPosition || 'top')
  scriptEl.setAttribute('data-theme', currentGiscusTheme())
  scriptEl.setAttribute('data-lang', cfg.lang || 'zh-CN')
  scriptEl.setAttribute('data-loading', 'lazy')
  scriptEl.crossOrigin = 'anonymous'
  scriptEl.async = true
  host.appendChild(scriptEl)
}

onMounted(() => {
  loadGiscus()
})

onBeforeUnmount(() => {
  destroyGiscus()
  scriptEl = null
})

watch(
  () => route.path,
  () => {
    loadGiscus()
  }
)

watch(
  () => isDark.value,
  () => {
    syncGiscusTheme()
  }
)
</script>

<template>
  <div v-if="show" class="doc-giscus">
    <h2 class="doc-giscus-title">文档反馈</h2>
    <p class="doc-giscus-hint">
      评论将同步到
      <a
        :href="`https://github.com/${giscus?.repo}/discussions`"
        target="_blank"
        rel="noreferrer"
        >GitHub Discussions</a
      >。也可直接
      <a
        href="https://github.com/notionnext-org/NotionNext/issues/new/choose"
        target="_blank"
        rel="noreferrer"
        >提交 Issue</a
      >。
    </p>
    <div ref="containerRef" class="giscus" />
  </div>

  <div
    v-else-if="giscus?.enabled && (!giscus.repoId || !giscus.categoryId)"
    class="doc-giscus doc-giscus--setup"
  >
    <h2 class="doc-giscus-title">文档反馈</h2>
    <p>
      站点管理员尚未配置 Giscus（<code>repoId</code> / <code>categoryId</code>）。请至
      <a href="https://giscus.app/zh-CN" target="_blank" rel="noreferrer">giscus.app</a>
      生成后写入构建环境变量，或
      <a
        href="https://github.com/notionnext-org/NotionNext/issues/new/choose"
        target="_blank"
        rel="noreferrer"
        >提交 Issue</a
      >。
    </p>
  </div>
</template>

<style scoped>
.doc-giscus {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}
.doc-giscus-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}
.doc-giscus-hint {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin: 0 0 1rem;
}
.doc-giscus--setup {
  margin-top: 2rem;
  padding: 1rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  font-size: 0.875rem;
}
</style>
