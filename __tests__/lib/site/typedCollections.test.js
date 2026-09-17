import {
  getPublishedTypedPages,
  getTypedPages,
  sortTypedPagesByPublishDate
} from '@/lib/site/typedCollections'

const pages = [
  { id: 'post-1', type: 'Post', status: 'Published', publishDate: 10 },
  { id: 'member-1', type: 'Member', status: 'Published', publishDate: 20 },
  { id: 'member-2', type: 'Member', status: 'Invisible', publishDate: 30 },
  { id: 'event-1', type: 'Event', status: 'Published', publishDate: 40 }
]

describe('typedCollections', () => {
  it('filters pages by content type', () => {
    expect(getTypedPages({ allPages: pages, type: 'Member' })).toEqual([
      pages[1],
      pages[2]
    ])
  })

  it('filters published pages by content type', () => {
    expect(getPublishedTypedPages({ allPages: pages, type: 'Member' })).toEqual(
      [pages[1]]
    )
  })

  it('sorts typed pages by publish date without mutating input', () => {
    const input = [pages[1], pages[3], pages[0]]

    expect(sortTypedPagesByPublishDate(input).map(page => page.id)).toEqual([
      'event-1',
      'member-1',
      'post-1'
    ])
    expect(input.map(page => page.id)).toEqual(['member-1', 'event-1', 'post-1'])
  })
})
