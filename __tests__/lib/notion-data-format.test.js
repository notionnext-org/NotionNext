import getAllPageIds from '@/lib/db/notion/getAllPageIds'
import {
  adapterNotionBlockMap,
  normalizeNotionBlockType
} from '@/lib/utils/notion.util'

jest.mock('p-limit', () => ({
  __esModule: true,
  default: jest.fn(() => fn => fn())
}))

jest.mock('notion-utils', () => ({
  getTextContent: jest.fn(value => {
    if (!Array.isArray(value)) return ''
    return value.map(item => item?.[0] || '').join('')
  })
}))

jest.mock('@/lib/cache/cache_manager', () => ({
  getDataFromCache: jest.fn(),
  getOrSetDataWithCache: jest.fn(),
  setDataToCache: jest.fn()
}))

jest.mock('@/lib/db/notion/getNotionAPI', () => ({
  __esModule: true,
  default: {
    getPage: jest.fn(),
    getBlocks: jest.fn()
  }
}))

const { formatNotionBlock } = require('@/lib/db/notion/getPostBlocks')
const { getPageTableOfContents } = require('@/lib/db/notion/getPageTableOfContents')

describe('Notion data format compatibility', () => {
  it('unwraps nested block values returned by newer Notion payloads', () => {
    const blockMap = {
      block: {
        page_1: {
          spaceId: 'space_1',
          value: {
            role: 'editor',
            value: {
              id: 'page_1',
              type: 'page',
              properties: { title: [['Hello']] }
            }
          }
        }
      },
      collection: {}
    }

    const adapted = adapterNotionBlockMap(blockMap)

    expect(adapted.block.page_1.value).toMatchObject({
      id: 'page_1',
      type: 'page',
      properties: { title: [['Hello']] }
    })
  })

  it('extracts page ids from collection view page_sort in newer payloads', () => {
    const pageIds = getAllPageIds(
      {},
      'collection_1',
      {
        view_1: {
          value: {
            value: {
              page_sort: ['page_1', 'page_2']
            }
          }
        }
      },
      ['view_1'],
      {}
    )

    expect(pageIds).toEqual(['page_1', 'page_2'])
  })

  it('supplements truncated page_sort from the selected view query only', () => {
    const pageIds = getAllPageIds(
      {
        collection_1: {
          view_1: {
            collection_group_results: {
              blockIds: ['page_1', 'page_2']
            }
          },
          view_2: {
            blockIds: ['hidden_page']
          }
        }
      },
      'collection_1',
      {
        view_1: {
          value: {
            value: {
              page_sort: ['page_1']
            }
          }
        }
      },
      ['view_1'],
      {}
    )

    expect(pageIds).toEqual(['page_1', 'page_2'])
    expect(pageIds).not.toContain('hidden_page')
  })

  it('falls back to all query blocks when no selected view is available', () => {
    const pageIds = getAllPageIds(
      {
        collection_1: {
          view_1: { blockIds: ['page_1'] },
          view_2: { blockIds: ['page_2'] }
        }
      },
      'collection_1',
      {},
      [],
      {}
    )

    expect(pageIds).toEqual(['page_1', 'page_2'])
  })

  it('normalizes nested blocks and strips crdt fields before rendering', () => {
    const formatted = formatNotionBlock({
      page_1: {
        value: {
          value: {
            id: 'page_1',
            type: 'image',
            crdt_data: { noisy: true },
            crdt_format_version: 1,
            properties: {
              source: [['https:example.com/image.png']]
            }
          },
          role: 'editor'
        }
      }
    })

    expect(formatted.page_1.value).toMatchObject({
      id: 'page_1',
      type: 'image'
    })
    expect(formatted.page_1.value.crdt_data).toBeUndefined()
    expect(formatted.page_1.value.crdt_format_version).toBeUndefined()
    expect(formatted.page_1.value.properties.source[0][0]).toBe(
      'https://example.com/image.png'
    )
  })

  it('downgrades newer heading block types for older renderers', () => {
    expect(normalizeNotionBlockType('heading_1')).toBe('header')
    expect(normalizeNotionBlockType('heading_2')).toBe('sub_header')
    expect(normalizeNotionBlockType('heading_3')).toBe('sub_sub_header')
    expect(normalizeNotionBlockType('heading_4')).toBe('sub_sub_header')
    expect(normalizeNotionBlockType('header_4')).toBe('sub_sub_header')
  })

  it('formats header_4 blocks into a renderable fallback heading type', () => {
    const formatted = formatNotionBlock({
      page_1: {
        value: {
          id: 'page_1',
          type: 'header_4',
          properties: {
            title: [['Section 4']]
          }
        }
      }
    })

    expect(formatted.page_1.value.type).toBe('sub_sub_header')
  })

  it('builds a stable toc for newer heading block types', () => {
    const page = {
      id: 'page_root',
      content: ['h1', 'h4']
    }
    const recordMap = {
      block: {
        h1: {
          value: {
            id: 'h1',
            type: 'header',
            properties: { title: [['Top']] }
          }
        },
        h4: {
          value: {
            id: 'h4',
            type: 'header_4',
            properties: { title: [['Deep']] }
          }
        }
      }
    }

    expect(getPageTableOfContents(page, recordMap)).toEqual([
      expect.objectContaining({ id: 'h1', indentLevel: 0 }),
      expect.objectContaining({ id: 'h4', indentLevel: 1 })
    ])
  })
})
