import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadExternalResource } from '@/lib/utils'
import { stripTransientQueryParamsFromAsPath } from '@/lib/utils/stripTransientUrlParams'
import Router from 'next/router'
import { useEffect } from 'react'
// import Giscus from '@giscus/react'

/**
 * Giscus评论 @see https://giscus.app/zh-CN
 * Contribute by @txs https://github.com/txs/NotionNext/commit/1bf7179d0af21fb433e4c7773504f244998678cb
 * @returns {JSX.Element}
 * @constructor
 */

const GiscusComponent = () => {
  const { isDarkMode } = useGlobal()
  const theme = isDarkMode ? 'dark' : 'light'
  useEffect(() => {
    const syncGiscusQueryOutOfUrl = () => {
      if (typeof window === 'undefined') {
        return
      }
      const full = `${window.location.pathname}${window.location.search}${window.location.hash}`
      const clean = stripTransientQueryParamsFromAsPath(full)
      if (clean === full) {
        return
      }
      window.history.replaceState(window.history.state, '', clean)
      Router.replace(clean, undefined, { scroll: false, shallow: true }).catch(() => {})
    }

    loadExternalResource('/js/giscus.js', 'js').then(() => {
      if (window?.Giscus?.init) {
        window?.Giscus?.init('#giscus')
      }
      syncGiscusQueryOutOfUrl()
    })

    const onRouteDone = () => syncGiscusQueryOutOfUrl()
    Router.events.on('routeChangeComplete', onRouteDone)
    return () => {
      Router.events.off('routeChangeComplete', onRouteDone)
      window?.Giscus?.destroy()
    }
  }, [isDarkMode])

  return (
    <div
      id='giscus'
      data-repo={siteConfig('COMMENT_GISCUS_REPO')}
      data-repo-id={siteConfig('COMMENT_GISCUS_REPO_ID')}
      data-category={siteConfig('COMMENT_GISCUS_CATEGORY')}
      data-category-id={siteConfig('COMMENT_GISCUS_CATEGORY_ID')}
      data-mapping={siteConfig('COMMENT_GISCUS_MAPPING')}
      data-strict={siteConfig('COMMENT_GISCUS_STRICT')}
      data-reactions-enabled={siteConfig('COMMENT_GISCUS_REACTIONS_ENABLED')}
      data-emit-metadata={siteConfig('COMMENT_GISCUS_EMIT_METADATA')}
      data-input-position={siteConfig('COMMENT_GISCUS_INPUT_POSITION')}
      data-theme={theme}
      data-lang={siteConfig('COMMENT_GISCUS_LANG')}
      data-loading={siteConfig('COMMENT_GISCUS_LOADING')}
      crossOrigin={siteConfig('COMMENT_GISCUS_CROSSORIGIN')}
    ></div>
  )
}

export default GiscusComponent
