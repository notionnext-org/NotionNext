import { buildNotFoundRedirectUrl } from '@/lib/utils/notFoundRedirect'

describe('buildNotFoundRedirectUrl', () => {
  it('preserves the missing path, query, and hash', () => {
    expect(
      buildNotFoundRedirectUrl({
        redirectLink: 'https://blog.example.com',
        currentUrl: 'https://example.com/article/test?from=feed#comments'
      })
    ).toBe('https://blog.example.com/article/test?from=feed#comments')
  })

  it('returns null when disabled by an empty link or when the origin is unchanged', () => {
    expect(
      buildNotFoundRedirectUrl({
        redirectLink: '',
        currentUrl: 'https://example.com/missing'
      })
    ).toBeNull()
    expect(
      buildNotFoundRedirectUrl({
        redirectLink: 'https://example.com',
        currentUrl: 'https://example.com/missing'
      })
    ).toBeNull()
  })

  it('rejects invalid protocols', () => {
    expect(
      buildNotFoundRedirectUrl({
        redirectLink: 'javascript:alert(1)',
        currentUrl: 'https://example.com/missing'
      })
    ).toBeNull()
  })
})
