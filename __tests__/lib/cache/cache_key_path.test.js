import path from 'path'
import { hashForCachePath } from '@/lib/cache/cache_key_path'

describe('cache/hashForCachePath', () => {
  it('returns a short stable filename segment', () => {
    const longKey =
      'global_data_default_' +
      Array.from({ length: 6 }, (_, i) =>
        i === 0 ? 'a'.repeat(32) : `zh-CN:${'b'.repeat(32)}`
      ).join(',')

    const hash = hashForCachePath(longKey)
    expect(hash.length).toBeLessThanOrEqual(43)
    expect(hash).toMatch(/^[A-Za-z0-9_-]+$/)
    expect(hashForCachePath(longKey)).toBe(hash)
  })

  it('keeps full lock path under common OS limits for multi-site keys', () => {
    const longKey = `build_static_paths_all_pages_default_${'x'.repeat(400)}`
    const lockPath = path.join(
      process.cwd(),
      '.next',
      'cache',
      'notion',
      'sessions',
      'build',
      'locks',
      `${hashForCachePath(longKey)}.lock`
    )
    expect(path.basename(lockPath).length).toBeLessThanOrEqual(50)
    expect(lockPath.length).toBeLessThan(260)
  })
})
