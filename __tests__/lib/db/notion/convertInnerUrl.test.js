jest.mock('notion-utils', () => ({
  idToUuid: id =>
    `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(
      16,
      20
    )}-${id.slice(20)}`
}))

import { convertInnerUrl } from '@/lib/db/notion/convertInnerUrl'

describe('convertInnerUrl', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    window.history.replaceState({}, '', 'http://localhost/notice')
  })

  it('maps notice links to published Page records from allLinkPages', () => {
    document.body.innerHTML = `
      <div id="notion-article">
        <a class="notion-link" href="https://www.notion.so/4aea95fb3fd5fcf81846aaaaaaaaaaaa" target="_blank">Links</a>
      </div>
    `

    convertInnerUrl({
      allPages: [
        {
          title: 'Links',
          type: 'Page',
          href: '/links',
          slug: 'links',
          short_id: 'fcf8-1846-aaaaaaaaaaaa'
        }
      ],
      lang: undefined
    })

    expect(document.querySelector('a.notion-link')).toHaveAttribute(
      'href',
      '/links'
    )
  })

  it('does not resolve Page links when only post navigation data is present', () => {
    const rawNotionUrl =
      'https://www.notion.so/4aea95fb3fd5fcf81846aaaaaaaaaaaa'
    document.body.innerHTML = `
      <div id="notion-article">
        <a class="notion-link" href="${rawNotionUrl}" target="_blank">Links</a>
      </div>
    `

    convertInnerUrl({
      allPages: [
        {
          title: 'Post only',
          type: 'Post',
          href: '/post-only',
          slug: 'post-only',
          short_id: '1111-2222-bbbbbbbbbbbb'
        }
      ],
      lang: undefined
    })

    expect(document.querySelector('a.notion-link')).toHaveAttribute(
      'href',
      rawNotionUrl
    )
  })
})
