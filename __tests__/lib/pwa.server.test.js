jest.mock('node:fs', () => ({
  writeFileSync: jest.fn(),
}))
jest.mock('node:path', () => ({
  join: jest.fn((...args) => args.join('/')),
}))

// Helper: get fresh module references with reset state
function getFreshModule() {
  jest.resetModules()
  const fs = require('node:fs')
  const { writePwaManifest } = require('@/lib/pwa.server')
  return { fs, writePwaManifest }
}

describe('writePwaManifest', () => {
  beforeEach(() => {
    process.env.BUILD_MODE = 'true'
  })

  afterEach(() => {
    delete process.env.BUILD_MODE
  })

  it('does not write when BUILD_MODE is not true', () => {
    process.env.BUILD_MODE = 'false'
    const { fs, writePwaManifest } = getFreshModule()
    writePwaManifest({ siteInfo: {}, notionConfig: { PWA_ENABLE: true } })
    expect(fs.writeFileSync).not.toHaveBeenCalled()
  })

  it('does not write when PWA is disabled', () => {
    const { fs, writePwaManifest } = getFreshModule()
    writePwaManifest({ siteInfo: {}, notionConfig: { PWA_ENABLE: false } })
    expect(fs.writeFileSync).not.toHaveBeenCalled()
  })

  it('writes when PWA is enabled via boolean true', () => {
    const { fs, writePwaManifest } = getFreshModule()
    writePwaManifest({
      siteInfo: { title: 'Test' },
      notionConfig: { PWA_ENABLE: true },
    })
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
  })

  it('writes when PWA is enabled via string "true"', () => {
    const { fs, writePwaManifest } = getFreshModule()
    writePwaManifest({
      siteInfo: { title: 'Test' },
      notionConfig: { PWA_ENABLE: 'true' },
    })
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
  })

  it('writes when PWA is enabled via string "yes"', () => {
    const { fs, writePwaManifest } = getFreshModule()
    writePwaManifest({
      siteInfo: { title: 'Test' },
      notionConfig: { PWA_ENABLE: 'yes' },
    })
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
  })

  it('writes when PWA is enabled via string "on"', () => {
    const { fs, writePwaManifest } = getFreshModule()
    writePwaManifest({
      siteInfo: { title: 'Test' },
      notionConfig: { PWA_ENABLE: 'on' },
    })
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
  })

  it('writes when PWA is enabled via number 1', () => {
    const { fs, writePwaManifest } = getFreshModule()
    writePwaManifest({
      siteInfo: { title: 'Test' },
      notionConfig: { PWA_ENABLE: 1 },
    })
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
  })

  it('does not write when PWA_ENABLE is "false" string', () => {
    const { fs, writePwaManifest } = getFreshModule()
    writePwaManifest({
      siteInfo: { title: 'Test' },
      notionConfig: { PWA_ENABLE: 'false' },
    })
    expect(fs.writeFileSync).not.toHaveBeenCalled()
  })

  it('falls back to BLOG.PWA_ENABLE when notionConfig has no PWA_ENABLE', () => {
    // BLOG.PWA_ENABLE is false by default in blog.config.js
    const { fs, writePwaManifest } = getFreshModule()
    writePwaManifest({
      siteInfo: { title: 'Test' },
      notionConfig: {},
    })
    expect(fs.writeFileSync).not.toHaveBeenCalled()
  })

  it('respects explicit false in notionConfig over BLOG fallback', () => {
    // Even if BLOG.PWA_ENABLE were true, explicit false in notionConfig wins
    jest.resetModules()
    jest.doMock('@/blog.config', () => ({ PWA_ENABLE: true }))
    const fs = require('node:fs')
    const { writePwaManifest } = require('@/lib/pwa.server')
    writePwaManifest({
      siteInfo: { title: 'Test' },
      notionConfig: { PWA_ENABLE: false },
    })
    expect(fs.writeFileSync).not.toHaveBeenCalled()
    jest.dontMock('@/blog.config')
  })
})
