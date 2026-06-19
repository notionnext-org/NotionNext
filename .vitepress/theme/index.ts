import DefaultTheme from 'vitepress/theme'
import { useData, useRoute } from 'vitepress'
import { onMounted, watch } from 'vue'
import type { DefaultTheme as DefaultThemeConfig, EnhanceAppContext } from 'vitepress'
import Layout from './Layout.vue'
import { cjkTokenize } from '../search-tokenize'
import { syncUnreadUpdates, type RecentUpdatedDoc } from './unread-updates'
import './style.css'

/** 勿把 tokenize 放进 themeConfig（会序列化进 HTML 导致 JSON 解析失败、全站白屏） */
function patchSearchTokenize(siteData: EnhanceAppContext['siteData']) {
  const mini = siteData.themeConfig?.search?.options?.miniSearch
  if (mini?.options) {
    mini.options.tokenize = cjkTokenize
  }
}

export default {
  extends: DefaultTheme,
  Layout,
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
