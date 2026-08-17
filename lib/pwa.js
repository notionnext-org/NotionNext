import BLOG from '@/blog.config'

const DEFAULT_ICON = '/favicon.png'
const DEFAULT_ICON_192 = '/icon-192.png'
const DEFAULT_ICON_512 = '/icon-512.png'
const DEFAULT_ICON_192_MASKABLE = '/icon-192-maskable.png'
const DEFAULT_ICON_512_MASKABLE = '/icon-512-maskable.png'

export const getPwaConfig = ({ siteInfo, notionConfig } = {}) => {
  // Guard against null (default params only catch undefined, not null)
  siteInfo = siteInfo || {}
  notionConfig = notionConfig || {}

  const title = notionConfig.PWA_NAME || siteInfo.title || notionConfig.TITLE || 'NotionNext'
  const description =
    notionConfig.PWA_DESCRIPTION ||
    siteInfo.description ||
    notionConfig.DESCRIPTION ||
    title
  const icon = notionConfig.PWA_ICON || siteInfo.icon || DEFAULT_ICON
  // Manifest icons: use built-in properly-sized icons as default.
  // Override priority: Notion config → blog.config.js (env vars) → built-in default.
  // PWA_ICON and siteInfo.icon are NOT used for manifest icons because
  // they are typically favatars/avatars without guaranteed 192/512 dimensions.
  const icon192 = notionConfig.PWA_ICON_192 || BLOG.PWA_ICON_192 || DEFAULT_ICON_192
  const icon512 = notionConfig.PWA_ICON_512 || BLOG.PWA_ICON_512 || DEFAULT_ICON_512
  const icon192Maskable = notionConfig.PWA_ICON_192_MASKABLE || BLOG.PWA_ICON_192_MASKABLE || DEFAULT_ICON_192_MASKABLE
  const icon512Maskable = notionConfig.PWA_ICON_512_MASKABLE || BLOG.PWA_ICON_512_MASKABLE || DEFAULT_ICON_512_MASKABLE
  const backgroundColor = notionConfig.PWA_BACKGROUND_COLOR || '#ffffff'
  const themeColor = notionConfig.PWA_THEME_COLOR || backgroundColor

  return {
    name: title,
    shortName: notionConfig.PWA_SHORT_NAME || title,
    description,
    icon,
    icon192,
    icon512,
    icon192Maskable,
    icon512Maskable,
    backgroundColor,
    themeColor,
    startUrl: '/',
    scope: '/',
    display: 'standalone'
  }
}

export const buildPwaManifest = ({ siteInfo, notionConfig } = {}) => {
  // Guard against null (default params only catch undefined, not null)
  siteInfo = siteInfo || {}
  notionConfig = notionConfig || {}

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
        src: pwa.icon192,
        sizes: '192x192',
        type: getIconMimeType(pwa.icon192),
        purpose: 'any'
      },
      {
        src: pwa.icon512,
        sizes: '512x512',
        type: getIconMimeType(pwa.icon512),
        purpose: 'any'
      },
      {
        src: pwa.icon192Maskable,
        sizes: '192x192',
        type: getIconMimeType(pwa.icon192Maskable),
        purpose: 'maskable'
      },
      {
        src: pwa.icon512Maskable,
        sizes: '512x512',
        type: getIconMimeType(pwa.icon512Maskable),
        purpose: 'maskable'
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
