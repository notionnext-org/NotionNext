/**
 * @jest-environment node
 */

import { siteConfig } from '@/lib/config'
import { getTopPosts } from '@/themes/magzine/components/PostListRecommend'

jest.mock('@/lib/config', () => ({
  siteConfig: jest.fn()
}))

jest.mock('@/themes/magzine/components/PostItemCard', () => ({
  __esModule: true,
  default: () => null
}))

jest.mock('@/themes/magzine/components/PostListEmpty', () => ({
  __esModule: true,
  default: () => null
}))

jest.mock('@/themes/magzine/components/Swiper', () => ({
  __esModule: true,
  default: () => null
}))

const setupThemeConfig = overrides => {
  siteConfig.mockImplementation((key, defaultVal, extendConfig = {}) => {
    if (Object.prototype.hasOwnProperty.call(overrides, key)) {
      return overrides[key]
    }
    if (Object.prototype.hasOwnProperty.call(extendConfig, key)) {
      return extendConfig[key]
    }
    return defaultVal
  })
}

describe('magzine PostListRecommend', () => {
  beforeEach(() => {
    siteConfig.mockReset()
  })

  it('uses the theme default recommend tag instead of falling back to latest posts', () => {
    setupThemeConfig({})

    const latestPosts = [
      { id: 'latest', title: 'Latest post', tags: ['随笔'] }
    ]
    const allNavPages = [
      { id: 'latest', title: 'Latest post', tags: ['随笔'] },
      { id: 'recommended', title: 'Recommended post', tags: ['推荐'] }
    ]

    expect(getTopPosts({ latestPosts, allNavPages })).toEqual([
      allNavPages[1]
    ])
  })

  it('falls back to latest posts only when the recommend tag is intentionally blank', () => {
    setupThemeConfig({
      MAGZINE_RECOMMEND_POST_TAG: ''
    })

    const latestPosts = [
      { id: 'latest', title: 'Latest post', tags: ['随笔'] }
    ]

    expect(getTopPosts({ latestPosts, allNavPages: [] })).toBe(latestPosts)
  })
})
