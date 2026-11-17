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

  it('uses built-in properly-sized icons for manifest by default', () => {
    // siteInfo.icon does NOT affect manifest icons because it typically
    // lacks guaranteed 192/512 dimensions. Built-in icons are used instead.
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
        { src: '/icon-192.png', sizes: '192x192', purpose: 'any' },
        { src: '/icon-512.png', sizes: '512x512', purpose: 'any' },
        { src: '/icon-192-maskable.png', sizes: '192x192', purpose: 'maskable' },
        { src: '/icon-512-maskable.png', sizes: '512x512', purpose: 'maskable' }
      ]
    })
  })

  it('uses dedicated PWA_ICON_192/512 when explicitly configured', () => {
    // Only explicit PWA_ICON_192/512 can override the built-in defaults
    expect(
      buildPwaManifest({
        siteInfo: { title: 'Blog', icon: '/avatar.png' },
        notionConfig: {
          PWA_ICON_192: '/custom-192.png',
          PWA_ICON_512: '/custom-512.png'
        }
      })
    ).toMatchObject({
      icons: [
        { src: '/custom-192.png', sizes: '192x192', purpose: 'any' },
        { src: '/custom-512.png', sizes: '512x512', purpose: 'any' },
        { src: '/icon-192-maskable.png', sizes: '192x192', purpose: 'maskable' },
        { src: '/icon-512-maskable.png', sizes: '512x512', purpose: 'maskable' }
      ]
    })
  })

  it('PWA_ICON and siteInfo.icon do not affect manifest icons', () => {
    // PWA_ICON/siteInfo.icon are for apple-touch-icon etc., not manifest
    const manifest = buildPwaManifest({
      siteInfo: { title: 'Blog', icon: '/my-favicon.svg' },
      notionConfig: { PWA_ICON: '/another-icon.png' }
    })
    const srcs = manifest.icons.map(i => i.src)
    expect(srcs).not.toContain('/my-favicon.svg')
    expect(srcs).not.toContain('/another-icon.png')
    // Should use built-in defaults
    expect(srcs).toEqual([
      '/icon-192.png',
      '/icon-512.png',
      '/icon-192-maskable.png',
      '/icon-512-maskable.png'
    ])
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
