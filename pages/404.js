import { useEffect } from 'react'
import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'
import { buildNotFoundRedirectUrl } from '@/lib/utils/notFoundRedirect'
import { DynamicLayout } from '@/themes/theme'

/**
 * 404
 * @param {*} props
 * @returns
 */
const NoFound = props => {
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  const redirectEnabled = siteConfig(
    'REDIRECT_ENABLE',
    false,
    props.NOTION_CONFIG
  )
  const redirectLink = siteConfig('REDIRECT_LINK', '', props.NOTION_CONFIG)

  useEffect(() => {
    if (redirectEnabled !== true && redirectEnabled !== 'true') return

    const redirectUrl = buildNotFoundRedirectUrl({
      redirectLink,
      currentUrl: window.location.href
    })

    if (redirectUrl) window.location.replace(redirectUrl)
  }, [redirectEnabled, redirectLink])

  return <DynamicLayout theme={theme} layoutName='Layout404' {...props} />
}

export async function getStaticProps(req) {
  const { locale } = req

  const props = (await fetchGlobalAllData({ from: '404', locale })) || {}
  return { props }
}

export default NoFound
