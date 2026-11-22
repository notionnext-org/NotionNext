/**
 * @jest-environment node
 */
import BLOG from '@/blog.config'
import { siteConfig } from '@/lib/config'

describe('siteConfig', () => {
  const originalPostListStyle = BLOG.POST_LIST_STYLE

  afterEach(() => {
    BLOG.POST_LIST_STYLE = originalPostListStyle
  })

  it('uses BLOG/env config before caller default for server-only keys', () => {
    BLOG.POST_LIST_STYLE = 'scroll'

    expect(siteConfig('POST_LIST_STYLE', 'page', {})).toBe('scroll')
  })

  it('keeps extend config higher priority than BLOG/env config', () => {
    BLOG.POST_LIST_STYLE = 'scroll'

    expect(siteConfig('POST_LIST_STYLE', 'page', { POST_LIST_STYLE: 'page' })).toBe(
      'page'
    )
  })

  it('reads inner page parent path toggle from Notion Config', () => {
    expect(
      siteConfig('INNER_PAGE_URL_PARENT_PATH', false, {
        INNER_PAGE_URL_PARENT_PATH: 'true'
      })
    ).toBe(true)
  })
})
