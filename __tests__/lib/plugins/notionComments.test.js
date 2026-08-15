const {
  buildCommentTree,
  countReplies,
  formatNotionComment,
  isPublicComment,
  validateCommentPayload
} = require('@/lib/plugins/notionComments')

describe('notionComments helpers', () => {
  test('validates comment input', () => {
    expect(
      validateCommentPayload({
        postId: 'post-1',
        content: 'hello',
        author: 'Reader@Example.com',
        nickname: 'Reader'
      })
    ).toMatchObject({
      ok: true,
      value: {
        author: 'reader@example.com',
        nickname: 'Reader'
      }
    })

    expect(
      validateCommentPayload({
        postId: 'post-1',
        content: '',
        author: 'reader@example.com'
      })
    ).toEqual({ ok: false, error: 'Invalid content' })

    expect(
      validateCommentPayload({
        postId: 'post-1',
        content: 'hello',
        author: 'bad-email'
      })
    ).toEqual({ ok: false, error: 'Invalid author email' })

    expect(
      validateCommentPayload({
        website: 'https://spam.example'
      })
    ).toMatchObject({ ok: true, spam: true })
  })

  test('formats Notion database pages', () => {
    expect(
      formatNotionComment({
        id: 'comment-id',
        created_time: '2026-07-09T00:00:00.000Z',
        properties: {
          PostId: { type: 'title', title: [{ plain_text: 'post-1' }] },
          ParentId: { type: 'rich_text', rich_text: [] },
          Content: {
            type: 'rich_text',
            rich_text: [{ plain_text: 'hello' }]
          },
          Nickname: {
            type: 'rich_text',
            rich_text: [{ plain_text: 'Alice' }]
          },
          EmailHash: {
            type: 'rich_text',
            rich_text: [{ plain_text: 'abc123' }]
          },
          Status: {
            type: 'select',
            select: { name: 'Approved' }
          },
          Author: { type: 'email', email: 'reader@example.com' },
          Level: { type: 'number', number: 1 },
          CreatedAt: {
            type: 'date',
            date: { start: '2026-07-09T00:01:00.000Z' }
          }
        }
      })
    ).toEqual({
      id: 'comment-id',
      postId: 'post-1',
      parentId: null,
      content: 'hello',
      author: 'Alice',
      emailHash: 'abc123',
      level: 1,
      status: 'Approved',
      createdTime: '2026-07-09T00:01:00.000Z'
    })
  })

  test('filters non-public comments', () => {
    expect(isPublicComment({ status: '' })).toBe(true)
    expect(isPublicComment({ status: 'Approved' })).toBe(true)
    expect(isPublicComment({ status: 'Pending' })).toBe(false)
    expect(isPublicComment({ status: 'Spam' })).toBe(false)
  })

  test('builds nested comment trees', () => {
    const tree = buildCommentTree([
      { id: 'root', parentId: null },
      { id: 'child', parentId: 'root' },
      { id: 'grandchild', parentId: 'child' }
    ])

    expect(tree).toHaveLength(1)
    expect(tree[0].children[0].children[0].id).toBe('grandchild')
    expect(countReplies(tree[0])).toBe(2)
  })
})
