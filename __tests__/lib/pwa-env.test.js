// Test that blog.config.js (env var) values are used as fallback for manifest icons
// This verifies the fix for the issue where NEXT_PUBLIC_PWA_ICON_192 etc. were
// declared in blog.config.js but never read by getPwaConfig.

// Mock blog.config with env-var-like values BEFORE importing pwa.js
jest.mock('@/blog.config', () => ({
  PWA_ICON_192: '/env-192.png',
  PWA_ICON_512: '/env-512.png',
  PWA_ICON_192_MASKABLE: '/env-192-mask.png',
  PWA_ICON_512_MASKABLE: '/env-512-mask.png',
  PWA_ICON: '/env-icon.png',
  PWA_ENABLE: false,
  PWA_NAME: '',
  PWA_SHORT_NAME: '',
  PWA_THEME_COLOR: '',
  PWA_BACKGROUND_COLOR: '',
}))

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { buildPwaManifest, getPwaConfig } = require('@/lib/pwa')

describe('PWA env var fallback', () => {
  it('uses BLOG.PWA_ICON_192 as fallback when notionConfig is empty', () => {
    const config = getPwaConfig({ siteInfo: {}, notionConfig: {} })
    expect(config.icon192).toBe('/env-192.png')
    expect(config.icon512).toBe('/env-512.png')
    expect(config.icon192Maskable).toBe('/env-192-mask.png')
    expect(config.icon512Maskable).toBe('/env-512-mask.png')
  })

  it('notionConfig takes priority over BLOG (env var) values', () => {
    const config = getPwaConfig({
      siteInfo: {},
      notionConfig: {
        PWA_ICON_192: '/notion-192.png',
      },
    })
    expect(config.icon192).toBe('/notion-192.png')
    // Others still fall back to BLOG
    expect(config.icon512).toBe('/env-512.png')
  })

  it('manifest icons reflect env var fallback', () => {
    const manifest = buildPwaManifest({ siteInfo: {}, notionConfig: {} })
    expect(manifest.icons).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ src: '/env-192.png', sizes: '192x192', purpose: 'any' }),
        expect.objectContaining({ src: '/env-512.png', sizes: '512x512', purpose: 'any' }),
        expect.objectContaining({ src: '/env-192-mask.png', sizes: '192x192', purpose: 'maskable' }),
        expect.objectContaining({ src: '/env-512-mask.png', sizes: '512x512', purpose: 'maskable' }),
      ])
    )
  })
})
