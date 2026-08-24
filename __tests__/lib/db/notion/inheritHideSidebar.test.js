jest.mock('@/lib/db/notion/getPostBlocks', () => ({
  fetchNotionPageBlocks: jest.fn()
}))

import { fetchNotionPageBlocks } from '@/lib/db/notion/getPostBlocks'
import {
  __clearCollectionHostCacheForTests,
  inheritHideSidebarFromAncestors
} from '@/lib/db/notion/inheritHideSidebar'

describe('inheritHideSidebarFromAncestors', () => {
  beforeEach(() => {
    fetchNotionPageBlocks.mockReset()
    __clearCollectionHostCacheForTests()
  })

  it('leaves pages that already hide the sidebar unchanged', async () => {
    const post = { id: 'child', HIDE_SIDEBAR: true, blockMap: { block: {} } }

    const result = await inheritHideSidebarFromAncestors(post, { allPages: [] })

    expect(result.HIDE_SIDEBAR).toBe(true)
    expect(fetchNotionPageBlocks).not.toHaveBeenCalled()
  })

  it('inherits HIDE_SIDEBAR from a database parent via parent_id', async () => {
    const post = {
      id: 'child-id',
      blockMap: {
        block: {
          'child-id': {
            value: {
              id: 'child-id',
              type: 'page',
              parent_id: 'parent-id'
            }
          }
        }
      }
    }
    const allPages = [{ id: 'parent-id', HIDE_SIDEBAR: true, slug: 'music' }]

    const result = await inheritHideSidebarFromAncestors(post, { allPages })

    expect(result.HIDE_SIDEBAR).toBe(true)
    expect(fetchNotionPageBlocks).not.toHaveBeenCalled()
  })

  it('inherits from nested sub-page ancestors fetched from Notion', async () => {
    const post = {
      id: 'child-id',
      blockMap: {
        block: {
          'child-id': {
            value: {
              id: 'child-id',
              type: 'page',
              parent_id: 'middle-id'
            }
          },
          'middle-id': {
            value: {
              id: 'middle-id',
              type: 'page',
              parent_id: 'parent-id'
            }
          }
        }
      }
    }
    const allPages = [{ id: 'parent-id', HIDE_SIDEBAR: true, slug: 'music' }]

    const result = await inheritHideSidebarFromAncestors(post, { allPages })

    expect(result.HIDE_SIDEBAR).toBe(true)
    expect(fetchNotionPageBlocks).not.toHaveBeenCalled()
  })

  it('inherits from URL parent segments when parent slug is in allPages', async () => {
    const post = {
      id: '3c66adc3ddf580b58e3afb5d3f66ef4b',
      blockMap: { block: {} }
    }
    const allPages = [{ id: 'hub-id', slug: 'music', HIDE_SIDEBAR: true }]

    const result = await inheritHideSidebarFromAncestors(post, {
      allPages,
      slugSegments: ['music', '3c66adc3ddf580b58e3afb5d3f66ef4b']
    })

    expect(result.HIDE_SIDEBAR).toBe(true)
    expect(fetchNotionPageBlocks).not.toHaveBeenCalled()
  })

  it('does not inherit when no ancestor hides the sidebar', async () => {
    const post = {
      id: 'child-id',
      blockMap: {
        block: {
          'child-id': {
            value: {
              id: 'child-id',
              type: 'page',
              parent_id: 'parent-id'
            }
          }
        }
      }
    }
    const allPages = [{ id: 'parent-id', slug: 'music', HIDE_SIDEBAR: false }]

    const result = await inheritHideSidebarFromAncestors(post, { allPages })

    expect(result.HIDE_SIDEBAR).toBeUndefined()
  })

  it('inherits through an inline database hosted inside a parent page', async () => {
    const post = {
      id: 'leaf-id',
      blockMap: {
        block: {
          'leaf-id': {
            value: {
              id: 'leaf-id',
              type: 'page',
              parent_table: 'collection',
              parent_id: 'nested-collection-id'
            }
          }
        }
      }
    }
    const allPages = [
      { id: 'hub-id', slug: 'suibi', title: '随笔', HIDE_SIDEBAR: true }
    ]

    fetchNotionPageBlocks.mockImplementation(async pageId => {
      if (pageId === 'hub-id') {
        return {
          block: {
            'db-block-id': {
              value: {
                id: 'db-block-id',
                type: 'collection_view',
                collection_id: 'nested-collection-id',
                parent_id: 'hub-id'
              }
            }
          }
        }
      }
      return { block: {} }
    })

    const result = await inheritHideSidebarFromAncestors(post, { allPages })

    expect(result.HIDE_SIDEBAR).toBe(true)
    expect(fetchNotionPageBlocks).toHaveBeenCalledWith(
      'hub-id',
      'inherit-hide-sidebar:inherit-sidebar'
    )
  })

  it('does not scan pages without HIDE_SIDEBAR when resolving inline databases', async () => {
    const post = {
      id: 'leaf-id',
      blockMap: {
        block: {
          'leaf-id': {
            value: {
              id: 'leaf-id',
              type: 'page',
              parent_table: 'collection',
              parent_id: 'nested-collection-id'
            }
          }
        }
      }
    }
    const allPages = [
      { id: 'hub-id', slug: 'suibi', HIDE_SIDEBAR: true },
      { id: 'other-id', slug: 'other-post', HIDE_SIDEBAR: false },
      { id: 'another-id', slug: 'another', type: 'Post' }
    ]

    fetchNotionPageBlocks.mockResolvedValue({ block: {} })

    await inheritHideSidebarFromAncestors(post, { allPages })

    expect(fetchNotionPageBlocks).toHaveBeenCalledTimes(1)
    expect(fetchNotionPageBlocks).toHaveBeenCalledWith(
      'hub-id',
      'inherit-hide-sidebar:inherit-sidebar'
    )
  })
})
