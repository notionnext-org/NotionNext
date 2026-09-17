import {
  fetchMembersFromOfficialAPI,
  mapOfficialMemberPage
} from '@/lib/db/notion/memberDataSource'

const originalEnv = process.env
const originalFetch = global.fetch

function memberPage({ id, title, slug, status = 'Published' }) {
  return {
    id,
    created_time: '2026-01-01T00:00:00.000Z',
    last_edited_time: '2026-01-02T00:00:00.000Z',
    properties: {
      title: { type: 'title', title: [{ plain_text: title }] },
      slug: { type: 'rich_text', rich_text: [{ plain_text: slug }] },
      status: { type: 'select', select: { name: status } },
      featured: { type: 'checkbox', checkbox: true }
    }
  }
}

describe('memberDataSource', () => {
  beforeEach(() => {
    process.env = { ...originalEnv }
    global.fetch = jest.fn()
  })

  afterEach(() => {
    process.env = originalEnv
    global.fetch = originalFetch
  })

  it('maps an official Notion member page to site data', () => {
    const mapped = mapOfficialMemberPage(
      memberPage({ id: 'member-1', title: 'Ada', slug: 'ada' })
    )

    expect(mapped).toMatchObject({
      id: 'member-1',
      title: 'Ada',
      slug: 'members/ada',
      href: '/members/ada',
      type: 'Member',
      status: 'Published',
      featured: true
    })
  })

  it('paginates official API results and filters unpublished members', async () => {
    process.env.NOTION_API_TOKEN = 'secret'
    process.env.NOTION_MEMBERS_DATA_SOURCE_ID = 'source-id'

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          has_more: true,
          next_cursor: 'cursor-2',
          results: [
            memberPage({ id: 'member-1', title: 'Ada', slug: 'ada' })
          ]
        })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          has_more: false,
          next_cursor: null,
          results: [
            memberPage({
              id: 'member-2',
              title: 'Draft',
              slug: 'draft',
              status: 'Invisible'
            })
          ]
        })
      })

    const members = await fetchMembersFromOfficialAPI()

    expect(global.fetch).toHaveBeenCalledTimes(2)
    expect(JSON.parse(global.fetch.mock.calls[1][1].body)).toMatchObject({
      start_cursor: 'cursor-2'
    })
    expect(members.map(member => member.id)).toEqual(['member-1'])
  })
})
