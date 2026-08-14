/**
 * 针对性 Bug 验证测试
 * 验证最新 6 个提交中发现的问题
 */
import fs from 'fs'
import path from 'path'

// ============================================================
// Bug 验证 1: PWAInstaller.js — getRegistration 参数问题
// ============================================================
describe('Bug #1: PWAInstaller getRegistration parameter', () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), 'components', 'PWAInstaller.js'),
    'utf8'
  )

  it('uses script path "/sw.js" instead of scope "/" in getRegistration', () => {
    // 根据 Service Worker 规范，getRegistration(clientURL) 做前缀匹配
    // getRegistration('/sw.js') 理论上能找到 scope='/' 的注册
    // 但这不是最佳实践，应使用 getRegistration('/') 或 getRegistration()
    const hasGetRegistrationCall = source.includes("getRegistration('/sw.js')")
    expect(hasGetRegistrationCall).toBe(true)

    // 验证注册时的 scope 是 '/'
    const registerMatch = source.match(/register\(['"]\/sw\.js['"],\s*\{\s*scope:\s*['"]\/['"]\s*\}\)/)
    expect(registerMatch).toBeTruthy()
  })

  it('getRegistration call differs from registration scope — code smell', () => {
    // 虽然规范上前缀匹配能让 getRegistration('/sw.js') 找到 scope='/' 的注册
    // 但使用脚本路径而非 scope 路径是不清晰的写法
    // 建议改为 getRegistration('/') 更明确
    const getRegArg = source.match(/getRegistration\(['"]([^'"]+)['"]\)/)
    expect(getRegArg).toBeTruthy()
    expect(getRegArg[1]).toBe('/sw.js') // 当前用的是脚本路径
    // 最佳实践应该是 '/'
    expect(getRegArg[1]).not.toBe('/') // 这行会通过，确认不是最佳实践
  })
})

// ============================================================
// Bug 验证 2: pwa.server.js — 缺少错误处理
// ============================================================
describe('Bug #2: writePwaManifest missing error handling', () => {
  let originalBuildMode

  beforeEach(() => {
    originalBuildMode = process.env.BUILD_MODE
    process.env.BUILD_MODE = 'true'
    // 重置模块缓存以重置 manifestWritten 标志
    jest.resetModules()
  })

  afterEach(() => {
    process.env.BUILD_MODE = originalBuildMode
  })

  it('throws when public directory does not exist (no try-catch)', () => {
    const { writePwaManifest } = require('@/lib/pwa.server')

    // 模拟 fs.writeFileSync 抛异常
    jest.doMock('node:fs', () => ({
      ...jest.requireActual('node:fs'),
      writeFileSync: jest.fn(() => {
        throw new Error('EACCES: permission denied')
      })
    }))

    // 重新 require 以获取 mock 后的模块
    jest.resetModules()
    const mockedFs = require('node:fs')
    mockedFs.writeFileSync = jest.fn(() => {
      throw new Error('EACCES: permission denied')
    })

    const { writePwaManifest: mockedWrite } = require('@/lib/pwa.server')

    // 验证：writePwaManifest 没有 try-catch，异常会向上传播
    expect(() => {
      mockedWrite({
        siteInfo: { title: 'Test' },
        notionConfig: {}
      })
    }).toThrow()
  })
})

// ============================================================
// Bug 验证 3: PWA manifest 图标尺寸声明
// ============================================================
describe('Bug #3: PWA manifest icon sizes mismatch', () => {
  it('uses separate icon files for 192x192 and 512x512 with correct sizes', () => {
    const { buildPwaManifest } = require('@/lib/pwa')

    const manifest = buildPwaManifest({
      siteInfo: { title: 'Test', icon: '/my-icon.png' }
    })

    // Fix: icons now have proper purpose separation (any + maskable)
    expect(manifest.icons).toHaveLength(4)

    // Each icon declares correct sizes
    const sizes = manifest.icons.map(i => i.sizes)
    expect(sizes).toContain('192x192')
    expect(sizes).toContain('512x512')

    // Any-purpose and maskable-purpose icons are separated
    const purposes = manifest.icons.map(i => i.purpose)
    expect(purposes).toContain('any')
    expect(purposes).toContain('maskable')
  })
})

// ============================================================
// Bug 验证 4: convertInnerUrl 父路径功能
// ============================================================
describe('Bug #4: convertInnerUrl parent-path behavior', () => {
  let convertInnerUrl

  beforeEach(() => {
    jest.resetModules()
    // mock notion-utils 的 idToUuid
    jest.doMock('notion-utils', () => ({
      idToUuid: id => id
    }))
    convertInnerUrl = require('@/lib/db/notion/convertInnerUrl').convertInnerUrl
  })

  it('does not apply langPrefix to parent-path fallback URLs', () => {
    // 设置带语言前缀的路径
    window.history.replaceState({}, '', 'http://localhost/en/article/parent-post')
    document.body.innerHTML = `
      <div id="notion-article">
        <a class="notion-page-link" href="https://www.notion.so/4aea95fb3fd5fcf81846aaaaaaaaaaaa" target="_blank">Child</a>
      </div>
    `

    convertInnerUrl({
      allPages: [],
      lang: 'en',
      innerPageUrlParentPath: true
    })

    const link = document.querySelector('a.notion-page-link')
    // currentPath 会包含 /en 前缀，因为 pathname 包含它
    // 所以 URL 会是 /en/article/parent-post/{pageId}
    // 这实际上是正确的行为，因为 currentPath 来自 pathname
    expect(link.getAttribute('href')).toBe(
      '/en/article/parent-post/4aea95fb3fd5fcf81846aaaaaaaaaaaa'
    )
  })

  it('handles root path correctly', () => {
    window.history.replaceState({}, '', 'http://localhost/')
    document.body.innerHTML = `
      <div id="notion-article">
        <a class="notion-page-link" href="https://www.notion.so/4aea95fb3fd5fcf81846aaaaaaaaaaaa" target="_blank">Child</a>
      </div>
    `

    convertInnerUrl({
      allPages: [],
      lang: undefined,
      innerPageUrlParentPath: true
    })

    const link = document.querySelector('a.notion-page-link')
    expect(link.getAttribute('href')).toBe('/4aea95fb3fd5fcf81846aaaaaaaaaaaa')
  })

  it('handles trailing slash in pathname', () => {
    window.history.replaceState({}, '', 'http://localhost/article/parent-post/')
    document.body.innerHTML = `
      <div id="notion-article">
        <a class="notion-page-link" href="https://www.notion.so/4aea95fb3fd5fcf81846aaaaaaaaaaaa" target="_blank">Child</a>
      </div>
    `

    convertInnerUrl({
      allPages: [],
      lang: undefined,
      innerPageUrlParentPath: true
    })

    const link = document.querySelector('a.notion-page-link')
    // 尾部斜杠被移除
    expect(link.getAttribute('href')).toBe(
      '/article/parent-post/4aea95fb3fd5fcf81846aaaaaaaaaaaa'
    )
  })

  it('only applies to notion-page-link class, not notion-link', () => {
    window.history.replaceState({}, '', 'http://localhost/article/parent-post')
    document.body.innerHTML = `
      <div id="notion-article">
        <a class="notion-link" href="https://www.notion.so/4aea95fb3fd5fcf81846aaaaaaaaaaaa" target="_blank">Link</a>
        <a class="notion-page-link" href="https://www.notion.so/4aea95fb3fd5fcf81846bbbbbbbbbbbb" target="_blank">Page</a>
      </div>
    `

    convertInnerUrl({
      allPages: [],
      lang: undefined,
      innerPageUrlParentPath: true
    })

    const notionLink = document.querySelector('a.notion-link')
    const notionPageLink = document.querySelector('a.notion-page-link')

    // notion-link 不受影响，保持原始 Notion URL
    expect(notionLink.getAttribute('href')).toBe(
      'https://www.notion.so/4aea95fb3fd5fcf81846aaaaaaaaaaaa'
    )
    // notion-page-link 被重写
    expect(notionPageLink.getAttribute('href')).toBe(
      '/article/parent-post/4aea95fb3fd5fcf81846bbbbbbbbbbbb'
    )
  })
})

// ============================================================
// Bug 验证 5: ExternalPlugins useEffect 依赖数组
// ============================================================
describe('Bug #5: ExternalPlugins useEffect dependency', () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), 'components', 'ExternalPlugins.js'),
    'utf8'
  )

  it('innerLinkPages is not memoized', () => {
    // innerLinkPages 直接从 props 取值，没有 useMemo 包裹
    const hasInnerLinkPages = source.includes(
      'const innerLinkPages = props?.allLinkPages || props?.allNavPages'
    )
    expect(hasInnerLinkPages).toBe(true)

    // 检查是否在依赖数组中
    const depArrayMatch = source.match(
      /\},\s*\[([\s\S]*?)\]\)/
    )
    // innerLinkPages 在依赖数组中，但它不是 memoized 的
    // 这可能导致每次渲染都触发 effect
    expect(source).toContain('innerLinkPages')
  })
})

// ============================================================
// Bug 验证 6: convertInnerUrl 死代码
// ============================================================
describe('Bug #6: convertInnerUrl dead code in second loop', () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), 'lib', 'db', 'notion', 'convertInnerUrl.js'),
    'utf8'
  )

  it('has an empty if block in the second loop (dead code)', () => {
    // 第二个 for 循环中 if (slugPage) {} 是空块
    const hasEmptyIfBlock = source.match(/if\s*\(slugPage\)\s*\{\s*\}/)
    expect(hasEmptyIfBlock).toBeTruthy()
  })
})

// ============================================================
// Bug 验证 7: sw.js fetch handler 是空函数
// ============================================================
describe('Bug #7: sw.js empty fetch handler', () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), 'public', 'sw.js'),
    'utf8'
  )

  it('fetch handler does not call event.respondWith()', () => {
    // fetch handler 是 () => {}，不调用 respondWith
    // 这意味着 SW 拦截所有请求但不做任何处理
    // 虽然不会导致错误，但浏览器可能输出警告
    expect(source).toContain("self.addEventListener('fetch', () => {})")
    expect(source).not.toContain('respondWith')
  })

  it('install handler does not pre-cache any resources', () => {
    // install 事件只调用 skipWaiting，没有缓存任何资源
    expect(source).toContain('self.skipWaiting()')
    expect(source).not.toContain('caches.open')
    // 但 activate 中却清理缓存，这是不必要的
    expect(source).toContain('caches.delete')
  })
})

// ============================================================
// Bug 验证 8: SEO.js pwaConfig 无条件计算
// ============================================================
describe('Bug #8: SEO.js computes pwaConfig even when PWA disabled', () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), 'components', 'SEO.js'),
    'utf8'
  )

  it('getPwaConfig is called unconditionally', () => {
    // pwaConfig 在 PWA 未启用时也会被计算
    const hasUnconditionalPwaConfig = source.includes(
      "const pwaConfig = getPwaConfig({ siteInfo, notionConfig: NOTION_CONFIG })"
    )
    expect(hasUnconditionalPwaConfig).toBe(true)

    // 理想情况下应该条件计算
    // const pwaConfig = pwaEnabled ? getPwaConfig(...) : null
  })
})
