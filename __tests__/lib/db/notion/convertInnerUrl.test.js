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

  it('keeps published Page slugs ahead of parent-path fallback', () => {
    document.body.innerHTML = `
      <div id="notion-article">
        <a class="notion-page-link" href="https://www.notion.so/4aea95fb3fd5fcf81846aaaaaaaaaaaa" target="_blank">Links</a>
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
      lang: undefined,
      innerPageUrlParentPath: true
    })

    expect(document.querySelector('a.notion-page-link')).toHaveAttribute(
      'href',
      '/links'
    )
  })

  it('can append unresolved Notion child pages to the current article path', () => {
    window.history.replaceState({}, '', 'http://localhost/article/parent-post')
    document.body.innerHTML = `
      <div id="notion-article">
        <a class="notion-page-link" href="https://www.notion.so/4aea95fb3fd5fcf81846aaaaaaaaaaaa" target="_blank">Child page</a>
      </div>
    `

    convertInnerUrl({
      allPages: [],
      lang: undefined,
      innerPageUrlParentPath: true
    })

    expect(document.querySelector('a.notion-page-link')).toHaveAttribute(
      'href',
      '/article/parent-post/4aea95fb3fd5fcf81846aaaaaaaaaaaa'
    )
  })

  it('strips query params before extracting Notion ID', () => {
    // Notion URLs often include ?pvs=4 which must not break ID extraction
    document.body.innerHTML = `
      <div id="notion-article">
        <a class="notion-link" href="https://www.notion.so/4aea95fb3fd5fcf81846aaaaaaaaaaaa?pvs=4" target="_blank">Links</a>
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

  it('strips hash fragment before extracting Notion ID', () => {
    document.body.innerHTML = `
      <div id="notion-article">
        <a class="notion-link" href="https://www.notion.so/4aea95fb3fd5fcf81846aaaaaaaaaaaa#section" target="_blank">Links</a>
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
})
