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

  it('builds a fixed-path installable manifest from site defaults', () => {
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
        { src: '/avatar.png', sizes: '192x192' },
        { src: '/avatar.png', sizes: '512x512' }
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
