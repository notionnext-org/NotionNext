import { buildPwaManifest, getPwaConfig } from '@/lib/pwa'

describe('PWA helpers', () => {
  it('uses site info for install metadata', () => {
    expect(
      getPwaConfig({
        siteInfo: { title: 'Site title', icon: '/favicon.png' },
        notionConfig: {}
      })
    ).toMatchObject({
      name: 'Site title',
      shortName: 'Site title',
      description: 'Site title',
      icon: '/favicon.png'
    })
  })

  it('keeps explicit PWA fields as optional fallbacks', () => {
    expect(
      getPwaConfig({
        siteInfo: { title: 'Site title', icon: '/avatar.png' },
        notionConfig: {
          PWA_NAME: 'Install title',
          PWA_SHORT_NAME: 'Install',
          PWA_ICON: '/favicon.png'
        }
      })
    ).toMatchObject({
      name: 'Install title',
      shortName: 'Install',
      icon: '/favicon.png'
    })
  })

  it('falls back to fixed install defaults', () => {
    expect(
      getPwaConfig({
        siteInfo: { title: 'Example Blog', icon: '/favicon.png' }
      })
    ).toMatchObject({
      name: 'Example Blog',
      shortName: 'Example Blog',
      icon: '/favicon.png',
      themeColor: '#ffffff'
    })
  })

  it('builds a manifest with backward-compatible icon fallback', () => {
    // When only siteInfo.icon is provided (no dedicated PWA_ICON_192/512),
    // it should be used as the src for all manifest icons (backward compat)
    expect(
      buildPwaManifest({
        siteInfo: {
          title: 'Example Blog',
          description: 'Notes and tutorials',
          icon: '/avatar.png'
        }
      })
    ).toMatchObject({
      name: 'Example Blog',
      short_name: 'Example Blog',
      description: 'Notes and tutorials',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      icons: [
        { src: '/avatar.png', sizes: '192x192', purpose: 'any' },
        { src: '/avatar.png', sizes: '512x512', purpose: 'any' },
        { src: '/avatar.png', sizes: '192x192', purpose: 'maskable' },
        { src: '/avatar.png', sizes: '512x512', purpose: 'maskable' }
      ]
    })
  })

  it('uses dedicated PWA_ICON_192/512 when explicitly configured', () => {
    // When dedicated sized icons are set, they take priority over siteInfo.icon
    expect(
      buildPwaManifest({
        siteInfo: { title: 'Blog', icon: '/avatar.png' },
        notionConfig: {
          PWA_ICON_192: '/icon-192.png',
          PWA_ICON_512: '/icon-512.png'
        }
      })
    ).toMatchObject({
      icons: [
        { src: '/icon-192.png', sizes: '192x192', purpose: 'any' },
        { src: '/icon-512.png', sizes: '512x512', purpose: 'any' },
        { src: '/icon-192.png', sizes: '192x192', purpose: 'maskable' },
        { src: '/icon-512.png', sizes: '512x512', purpose: 'maskable' }
      ]
    })
  })

  it('uses built-in default icons when no icon config is provided', () => {
    expect(
      buildPwaManifest({
        siteInfo: { title: 'Blog' },
        notionConfig: {}
      })
    ).toMatchObject({
      icons: [
        { src: '/icon-192.png', sizes: '192x192', purpose: 'any' },
        { src: '/icon-512.png', sizes: '512x512', purpose: 'any' },
        { src: '/icon-192-maskable.png', sizes: '192x192', purpose: 'maskable' },
        { src: '/icon-512-maskable.png', sizes: '512x512', purpose: 'maskable' }
      ]
    })
  })

  // Regression: null inputs should not throw (default params only catch undefined, not null)
  it('getPwaConfig handles null siteInfo and notionConfig', () => {
    expect(() => getPwaConfig({ siteInfo: null, notionConfig: null })).not.toThrow()
    const result = getPwaConfig({ siteInfo: null, notionConfig: null })
    expect(result).toMatchObject({
      name: 'NotionNext',
      icon: '/favicon.png',
      themeColor: '#ffffff'
    })
  })

  it('buildPwaManifest handles null siteInfo and notionConfig', () => {
    expect(() => buildPwaManifest({ siteInfo: null, notionConfig: null })).not.toThrow()
    const result = buildPwaManifest({ siteInfo: null, notionConfig: null })
    expect(result).toMatchObject({
      name: 'NotionNext',
      start_url: '/',
      scope: '/',
      display: 'standalone'
    })
  })

  it('getPwaConfig handles undefined inputs', () => {
    expect(() => getPwaConfig()).not.toThrow()
    expect(getPwaConfig()).toMatchObject({ name: 'NotionNext' })
  })
})
