import { getAllTags } from '@/lib/db/notion/getAllTags'

describe('getAllTags', () => {
  const tagOptions = [
    { id: 'tag-a', value: '工具', color: 'blue' },
    { id: 'tag-b', value: '隐藏', color: 'gray' }
  ]

  it('counts only published posts for public tag options', () => {
    const tags = getAllTags({
      allPages: [
        { type: 'Post', status: 'Published', tags: ['工具'] },
        { type: 'Post', status: 'Invisible', tags: ['工具', '隐藏'] },
        { type: 'Page', status: 'Published', tags: ['工具'] }
      ],
      tagOptions,
      NOTION_CONFIG: { TAG_SORT_BY_COUNT: false }
    })

    expect(tags).toEqual([
      {
        id: 'tag-a',
        name: '工具',
        color: 'blue',
        count: 1,
        source: 'Published'
      }
    ])
  })
})
