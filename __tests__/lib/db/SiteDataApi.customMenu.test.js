/**
 * @jest-environment node
 */

import {
  getCustomMenu,
  getSourcePageSlugs
} from '@/lib/db/notion/getCustomMenu'

describe('getCustomMenu', () => {
  it('uses the generated page href when a menu targets the page source slug', () => {
    const collectionData = [
      {
        id: 'page-pending',
        type: 'Page',
        status: 'Published',
        slug: 'pending'
      },
      {
        id: 'page-contact',
        type: 'Page',
        status: 'Published',
        slug: 'contact'
      },
      {
        id: 'menu-pending',
        type: 'Menu',
        status: 'Published',
        title: 'Pending',
        slug: 'pending',
        href: '/pending'
      },
      {
        id: 'menu-more',
        type: 'Menu',
        status: 'Published',
        title: 'More',
        slug: '#',
        href: '#'
      },
      {
        id: 'submenu-contact',
        type: 'SubMenu',
        status: 'Published',
        title: 'Contact',
        slug: '/contact',
        href: '/contact'
      }
    ]
    const sourcePageSlugs = getSourcePageSlugs(collectionData)
    collectionData[0].slug = 'pending/2026/07/29/pending'
    collectionData[0].href = '/pending/2026/07/29/pending'
    collectionData[1].slug = 'contact/2026/07/29/contact'
    collectionData[1].href = '/contact/2026/07/29/contact.html'

    const menus = getCustomMenu({ collectionData, sourcePageSlugs })

    expect(menus[0].href).toBe('/pending/2026/07/29/pending')
    expect(menus[1].href).toBe('#')
    expect(menus[1].subMenus[0].href).toBe('/contact/2026/07/29/contact.html')
  })

  it('keeps unmatched and external menu links unchanged', () => {
    const collectionData = [
      {
        id: 'menu-archive',
        type: 'Menu',
        status: 'Published',
        title: 'Archive',
        slug: '/archive',
        href: '/archive'
      },
      {
        id: 'menu-external',
        type: 'Menu',
        status: 'Published',
        title: 'External',
        slug: 'https://example.com',
        href: 'https://example.com'
      }
    ]

    const menus = getCustomMenu({
      collectionData,
      sourcePageSlugs: new Map()
    })

    expect(menus.map(menu => menu.href)).toEqual([
      '/archive',
      'https://example.com'
    ])
  })

  it('does not guess when multiple pages shared the same source slug', () => {
    const collectionData = [
      {
        id: 'page-one',
        type: 'Page',
        status: 'Published',
        slug: 'guide'
      },
      {
        id: 'page-two',
        type: 'Page',
        status: 'Published',
        slug: 'guide'
      },
      {
        id: 'menu-guide',
        type: 'Menu',
        status: 'Published',
        title: 'Guide',
        slug: 'guide',
        href: '/guide'
      }
    ]
    const sourcePageSlugs = getSourcePageSlugs(collectionData)
    collectionData[0].href = '/manual/guide'
    collectionData[1].href = '/docs/guide'

    const menus = getCustomMenu({ collectionData, sourcePageSlugs })

    expect(menus[0].href).toBe('/guide')
  })

  it('uses the generated href when a menu explicitly targets an invisible page', () => {
    const collectionData = [
      {
        id: 'page-pending',
        type: 'Page',
        status: 'Invisible',
        slug: 'pending'
      },
      {
        id: 'menu-pending',
        type: 'Menu',
        status: 'Published',
        title: 'Pending',
        slug: 'pending',
        href: '/pending'
      }
    ]
    const sourcePageSlugs = getSourcePageSlugs(collectionData)
    collectionData[0].slug = 'pending/2026/07/29/pending'
    collectionData[0].href = '/pending/2026/07/29/pending'

    const menus = getCustomMenu({ collectionData, sourcePageSlugs })

    expect(menus[0].href).toBe('/pending/2026/07/29/pending')
  })

  it('does not expose an unpublished page through a matching menu slug', () => {
    const collectionData = [
      {
        id: 'page-draft',
        type: 'Page',
        status: 'Draft',
        slug: 'draft',
        href: '/manual/draft'
      },
      {
        id: 'menu-draft',
        type: 'Menu',
        status: 'Published',
        title: 'Draft',
        slug: 'draft',
        href: '/draft'
      }
    ]
    const sourcePageSlugs = getSourcePageSlugs(collectionData)

    const menus = getCustomMenu({ collectionData, sourcePageSlugs })

    expect(menus[0].href).toBe('/draft')
  })
})
