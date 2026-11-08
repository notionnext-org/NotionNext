const mockCreate = jest.fn()
const mockRetrieve = jest.fn()

jest.mock('@notionhq/client', () => ({
  Client: jest.fn().mockImplementation(() => ({
    databases: { retrieve: mockRetrieve },
    pages: { create: mockCreate }
  }))
}))

const makeResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

describe('Notion comments anonymous mode', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = {
      ...originalEnv,
      NOTION_TOKEN: 'test-token',
      NOTION_COMMENT_DATABASE_ID: 'test-database',
      NEXT_PUBLIC_COMMENT_NOTION_ANONYMOUS: 'true'
    }
    delete process.env.NOTION_COMMENT_REQUIRE_APPROVAL
    mockRetrieve.mockResolvedValue({
      properties: {
        Status: { type: 'select' },
        EmailHash: { type: 'rich_text' },
        UserAgent: { type: 'rich_text' }
      }
    })
    mockCreate.mockResolvedValue({ id: 'comment-1', properties: {} })
  })

  afterAll(() => {
    process.env = originalEnv
  })

  test('ignores identifying fields and defaults to pending review', async () => {
    const handler = require('@/pages/api/notion-comments').default
    const res = makeResponse()
    await handler({
      method: 'POST',
      headers: { 'x-forwarded-for': '192.0.2.1', 'user-agent': 'test' },
      body: { postId: 'post-1', content: 'hello', author: 'reader@example.com' }
    }, res)

    const properties = mockCreate.mock.calls[0][0].properties
    expect(properties.Status).toEqual({ select: { name: 'Pending' } })
    expect(properties).not.toHaveProperty('Author')
    expect(properties).not.toHaveProperty('EmailHash')
    expect(properties).not.toHaveProperty('IpAddress')
    expect(properties).not.toHaveProperty('UserAgent')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ pending: true }))
  })

  test('refuses submission when the review field is missing', async () => {
    mockRetrieve.mockResolvedValue({ properties: {} })
    const handler = require('@/pages/api/notion-comments').default
    const res = makeResponse()
    const log = jest.spyOn(console, 'error').mockImplementation(() => {})
    await handler({
      method: 'POST',
      headers: {},
      body: { postId: 'post-1', content: 'hello' }
    }, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(mockCreate).not.toHaveBeenCalled()
    log.mockRestore()
  })
})
