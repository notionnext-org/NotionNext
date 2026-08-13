const DEFAULT_ICON = '/favicon.png'

export const getPwaConfig = ({ siteInfo = {}, notionConfig = {} } = {}) => {
  const title = notionConfig.PWA_NAME || siteInfo.title || notionConfig.TITLE || 'NotionNext'
  const description =
    notionConfig.PWA_DESCRIPTION ||
    siteInfo.description ||
    notionConfig.DESCRIPTION ||
    title
  const icon = notionConfig.PWA_ICON || siteInfo.icon || DEFAULT_ICON
  const backgroundColor = notionConfig.PWA_BACKGROUND_COLOR || '#ffffff'
  const themeColor = notionConfig.PWA_THEME_COLOR || backgroundColor

  return {
    name: title,
    shortName: notionConfig.PWA_SHORT_NAME || title,
    description,
    icon,
    backgroundColor,
    themeColor,
    startUrl: '/',
    scope: '/',
    display: 'standalone'
  }
}

export const buildPwaManifest = ({ siteInfo = {}, notionConfig = {} } = {}) => {
  const pwa = getPwaConfig({ siteInfo, notionConfig })

  return {
    name: pwa.name,
    short_name: pwa.shortName,
    description: pwa.description,
    start_url: pwa.startUrl,
    scope: pwa.scope,
    display: pwa.display,
    background_color: pwa.backgroundColor,
    theme_color: pwa.themeColor,
    icons: [
      {
        src: pwa.icon,
        sizes: '192x192',
        type: getIconMimeType(pwa.icon),
        purpose: 'any maskable'
      },
      {
        src: pwa.icon,
        sizes: '512x512',
        type: getIconMimeType(pwa.icon),
        purpose: 'any maskable'
      }
    ]
  }
}

const getIconMimeType = icon => {
  if (typeof icon !== 'string') return 'image/png'
  const normalized = icon.split('?')[0].toLowerCase()
  if (normalized.endsWith('.svg')) return 'image/svg+xml'
  if (normalized.endsWith('.ico')) return 'image/x-icon'
  if (normalized.endsWith('.webp')) return 'image/webp'
  return 'image/png'
}
