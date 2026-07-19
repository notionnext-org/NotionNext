import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress'
import { onMounted, watch } from 'vue'
import type { DefaultTheme as DefaultThemeConfig, EnhanceAppContext } from 'vitepress'
import chat from 'vitepress-chat'
import Layout from './Layout.vue'
import { cjkTokenize } from '../search-tokenize'
import { syncUnreadUpdates, type RecentUpdatedDoc } from './unread-updates'
import 'vitepress-chat/style.css'
import './style.css'

/** 勿把 tokenize 放进 themeConfig（会序列化进 HTML 导致 JSON 解析失败、全站白屏） */
function patchSearchTokenize(siteData: EnhanceAppContext['siteData']) {
  const mini = siteData.themeConfig?.search?.options?.miniSearch
  if (mini?.options) {
    mini.options.tokenize = cjkTokenize
  }
}

const chatApi = import.meta.env.VITE_DOCS_CHAT_API
const chatVersion = 'v2026.07.11.1'
const chatLayout = chatApi
  ? chat(Layout, {
      api: chatApi,
      buttonText: 'AI 助手',
      headerText: `NotionNext AI 助手 ${chatVersion}`,
      headerUrl: null,
      initialMessage:
        '你好，我是 NotionNext 文档助手。你可以直接问我部署、主题、Notion 配置、评论插件等问题。',
      filePath: 'ai-assistant-instructions.txt'
    })
  : { Layout }

export default {
  extends: DefaultTheme,
  ...chatLayout,
  setup() {
    const route = useRoute()
    const { theme } = useData()
    const getUpdatedDocs = () =>
      ((theme.value as DefaultThemeConfig.Config & { updatedDocs?: RecentUpdatedDoc[] })
        .updatedDocs || [])
    const getRecentDocs = () =>
      ((theme.value as DefaultThemeConfig.Config & { recentUpdatedDocs?: RecentUpdatedDoc[] })
        .recentUpdatedDocs || [])

    onMounted(() => {
      void syncUnreadUpdates(getUpdatedDocs(), getRecentDocs(), route.path)
    })

    watch(
      () => route.path,
      (path) => {
        void syncUnreadUpdates(getUpdatedDocs(), getRecentDocs(), path)
      }
    )
  },
  enhanceApp({ siteData }: EnhanceAppContext) {
    patchSearchTokenize(siteData)
  }
}
