/**
 * @jest-environment node
 */

import fs from 'fs'
import os from 'os'
import path from 'path'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function loadFileLockWithTempCache() {
  const cacheDir = fs.mkdtempSync(path.join(os.tmpdir(), 'notionnext-lock-'))
  process.env.NOTION_NEXT_NOTION_CACHE_DIR = cacheDir
  jest.resetModules()

  const mod = await import('@/lib/cache/file_lock')

  return {
    cacheDir,
    withFileLock: mod.withFileLock
  }
}

describe('withFileLock', () => {
  afterEach(() => {
    delete process.env.NOTION_NEXT_NOTION_CACHE_DIR
  })

  it('waits for the lock holder cache result instead of bypassing in wait mode', async () => {
    const { cacheDir, withFileLock } = await loadFileLockWithTempCache()
    let cachedValue = null
    let calls = 0

    try {
      const holder = withFileLock(
        'shared-build-key',
        async () => {
          calls++
          await sleep(50)
          cachedValue = 'from-holder'
          return cachedValue
        },
        () => cachedValue,
        {
          timeout: 1000,
          staleLockMs: 5000,
          timeoutStrategy: 'wait',
          maxWaitMs: 1000
        }
      )

      await sleep(5)

      const waiter = withFileLock(
        'shared-build-key',
        () => {
          calls++
          return 'from-waiter'
        },
        () => cachedValue,
        {
          timeout: 10,
          staleLockMs: 5000,
          timeoutStrategy: 'wait',
          maxWaitMs: 1000
        }
      )

      await expect(Promise.all([holder, waiter])).resolves.toEqual([
        'from-holder',
        'from-holder'
      ])
      expect(calls).toBe(1)
    } finally {
      fs.rmSync(cacheDir, { recursive: true, force: true })
    }
  })

  it('keeps the default timeout bypass behavior for existing callers', async () => {
    const { cacheDir, withFileLock } = await loadFileLockWithTempCache()
    let cachedValue = null
    let calls = 0

    try {
      const holder = withFileLock(
        'compat-key',
        async () => {
          calls++
          await sleep(500)
          cachedValue = 'from-holder'
          return cachedValue
        },
        () => cachedValue,
        1000
      )

      await sleep(5)

      const waiter = withFileLock(
        'compat-key',
        () => {
          calls++
          return 'from-bypass'
        },
        () => cachedValue,
        10
      )

      await expect(Promise.all([holder, waiter])).resolves.toEqual([
        'from-holder',
        'from-bypass'
      ])
      expect(calls).toBe(2)
    } finally {
      fs.rmSync(cacheDir, { recursive: true, force: true })
    }
  })
})
