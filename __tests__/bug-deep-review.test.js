/**
 * 深入审查发现的额外 Bug
 */
import { getPwaConfig, buildPwaManifest } from '@/lib/pwa'

// ============================================================
// Bug #9: getPwaConfig / buildPwaManifest 在 notionConfig=null 时崩溃
// ============================================================
describe('Bug #9: getPwaConfig crashes when notionConfig is null', () => {
  it('getPwaConfig throws TypeError when notionConfig is null', () => {
    // 默认参数只对 undefined 生效，不对 null 生效
    // 如果 NOTION_CONFIG 是 null，getPwaConfig 会收到 notionConfig: null
    // 然后 null.PWA_NAME 会抛 TypeError
    expect(() => {
      getPwaConfig({ siteInfo: { title: 'Test' }, notionConfig: null })
    }).toThrow(TypeError)
  })

  it('buildPwaManifest throws TypeError when notionConfig is null', () => {
    expect(() => {
      buildPwaManifest({ siteInfo: { title: 'Test' }, notionConfig: null })
    }).toThrow(TypeError)
  })

  it('getPwaConfig throws TypeError when siteInfo is null', () => {
    expect(() => {
      getPwaConfig({ siteInfo: null, notionConfig: {} })
    }).toThrow(TypeError)
  })

  it('getPwaConfig works fine with undefined (default param kicks in)', () => {
    // undefined 时默认参数 {} 生效，不会崩溃
    expect(() => {
      getPwaConfig({ siteInfo: { title: 'Test' }, notionConfig: undefined })
    }).not.toThrow()

    expect(() => {
      getPwaConfig({ siteInfo: undefined, notionConfig: {} })
    }).not.toThrow()
  })
})

// ============================================================
// Bug #10: PWA theme-color 行为突变
// ============================================================
describe('Bug #10: PWA theme-color behavior change', () => {
  it('default themeColor is #ffffff which may conflict with dark themes', () => {
    // 当 PWA_ENABLE=true 但未配置 PWA_THEME_COLOR 时
    // themeColor 默认为 backgroundColor (#ffffff)
    // 这会覆盖原有的 BACKGROUND_DARK 设置
    const config = getPwaConfig({
      siteInfo: { title: 'Dark Blog' },
      notionConfig: { PWA_ENABLE: 'true' }
    })
    expect(config.themeColor).toBe('#ffffff')
    // 对于深色主题站点，这会导致浏览器 UI 变白
  })
})

// ============================================================
// Bug #11: sw.js 缺少 Service-Worker-Allowed header 配置
// ============================================================
describe('Bug #11: sw.js missing headers in next.config.js', () => {
  const fs = require('fs')
  const path = require('path')
  const configSource = fs.readFileSync(
    path.join(process.cwd(), 'next.config.js'),
    'utf8'
  )

  it('next.config.js does not configure Service-Worker-Allowed header for sw.js', () => {
    // 虽然 sw.js scope 是 '/'，通常不需要 Service-Worker-Allowed
    // 但缺少 Cache-Control: no-cache 可能导致 SW 更新延迟
    expect(configSource).not.toContain('Service-Worker-Allowed')
    expect(configSource).not.toContain('sw.js')
  })
})

// ============================================================
// Bug #12: convertInnerUrl — 非 notion-page-link 的 notion-collection-card
//         不会被父路径重写，可能导致不一致的 URL 行为
// ============================================================
describe('Bug #12: convertInnerUrl only rewrites notion-page-link', () => {
  let convertInnerUrl

  beforeEach(() => {
    jest.resetModules()
    jest.doMock('notion-utils', () => ({
      idToUuid: id => id
    }))
    convertInnerUrl = require('@/lib/db/notion/convertInnerUrl').convertInnerUrl
  })

  it('notion-collection-card with unresolved Notion ID is NOT rewritten', () => {
    window.history.replaceState({}, '', 'http://localhost/article/parent-post')
    document.body.innerHTML = `
      <div id="notion-article">
        <a class="notion-collection-card" href="https://www.notion.so/4aea95fb3fd5fcf81846aaaaaaaaaaaa" target="_blank">Card</a>
      </div>
    `

    convertInnerUrl({
      allPages: [],
      lang: undefined,
      innerPageUrlParentPath: true
    })

    const link = document.querySelector('a.notion-collection-card')
    // notion-collection-card 不被重写，保持原始 Notion URL
    // 这与 notion-page-link 的行为不一致
    expect(link.getAttribute('href')).toBe(
      'https://www.notion.so/4aea95fb3fd5fcf81846aaaaaaaaaaaa'
    )
  })
})

// ============================================================
// Bug #13: PWA manifest 缺少 maskable icon 的 sizes 声明问题
// ============================================================
describe('Bug #13: PWA manifest icon purpose includes any maskable', () => {
  it('uses separate any and maskable icons with proper purpose values', () => {
    const manifest = buildPwaManifest({
      siteInfo: { title: 'Test', icon: '/icon.png' }
    })

    // Fix: icons are now separated into "any" and "maskable" purpose
    // instead of using "any maskable" on the same icon
    const validPurposes = ['any', 'maskable']
    manifest.icons.forEach(icon => {
      expect(validPurposes).toContain(icon.purpose)
    })

    // Should have at least one "any" and one "maskable" icon
    const anyIcons = manifest.icons.filter(i => i.purpose === 'any')
    const maskableIcons = manifest.icons.filter(i => i.purpose === 'maskable')
    expect(anyIcons.length).toBeGreaterThanOrEqual(1)
    expect(maskableIcons.length).toBeGreaterThanOrEqual(1)
  })
})
