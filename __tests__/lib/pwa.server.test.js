import fs from 'node:fs'
import path from 'node:path'

jest.mock('node:fs', () => ({
  __esModule: true,
  default: {
    writeFileSync: jest.fn(),
    existsSync: jest.fn(),
    readFileSync: jest.fn()
  },
  writeFileSync: jest.fn(),
  existsSync: jest.fn(),
  readFileSync: jest.fn()
}))

describe('PWA manifest error handling', () => {
  let writePwaManifest

  beforeEach(() => {
    jest.resetModules()
    // Set BUILD_MODE so writePwaManifest actually runs
    process.env.BUILD_MODE = 'true'
    writePwaManifest = require('@/lib/pwa.server').writePwaManifest
  })

  afterEach(() => {
    delete process.env.BUILD_MODE
    jest.restoreAllMocks()
  })

  it('does not throw when filesystem is read-only', () => {
    const fsMock = require('node:fs').default || require('node:fs')
    fsMock.writeFileSync.mockImplementation(() => {
      throw new Error('read-only filesystem')
    })

    // Capture console.warn
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    // Should not throw
    expect(() =>
      writePwaManifest({ siteInfo: { title: 'Test' }, notionConfig: {} })
    ).not.toThrow()

    // Warning should contain failure reason
    expect(warnSpy).toHaveBeenCalled()
    const warnArg = warnSpy.mock.calls[0].join(' ')
    expect(warnArg).toContain('read-only filesystem')

    warnSpy.mockRestore()
  })

  it('sets manifestWritten=true on successful write', () => {
    const fsMock = require('node:fs').default || require('node:fs')
    fsMock.writeFileSync.mockImplementation(() => {})

    // First call should write successfully
    expect(() =>
      writePwaManifest({ siteInfo: { title: 'Test' }, notionConfig: {} })
    ).not.toThrow()

    // writeFileSync should have been called
    expect(fsMock.writeFileSync).toHaveBeenCalled()
  })

  it('skips write when BUILD_MODE is not true', () => {
    delete process.env.BUILD_MODE

    const fsMock = require('node:fs').default || require('node:fs')
    fsMock.writeFileSync.mockClear()

    writePwaManifest({ siteInfo: { title: 'Test' }, notionConfig: {} })

    // writeFileSync should not be called when BUILD_MODE !== 'true'
    expect(fsMock.writeFileSync).not.toHaveBeenCalled()
  })
})
