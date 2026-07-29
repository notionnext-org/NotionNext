/** @jest-environment node */

import { galleryVisibilityClassName } from '@/lib/notion/galleryVisibilityClassName'

const galleryView = format => ({ type: 'gallery', format })

describe('Notion Gallery visibility settings', () => {
  it('hides omitted page icons and an explicitly hidden title', () => {
    expect(
      galleryVisibilityClassName(
        galleryView({
          gallery_properties: [{ property: 'title', visible: false }]
        })
      )
    ).toBe('notion-gallery-hide-page-icons notion-gallery-hide-titles')
  })

  it('keeps a visible title while the omitted page-icon setting stays hidden', () => {
    expect(
      galleryVisibilityClassName(
        galleryView({
          gallery_properties: [{ property: 'title', visible: true }]
        })
      )
    ).toBe('notion-gallery-hide-page-icons')
  })

  it('keeps page icons visible when Notion explicitly enables them', () => {
    expect(
      galleryVisibilityClassName(
        galleryView({
          show_page_icon: true,
          gallery_properties: [{ property: 'title', visible: true }]
        })
      )
    ).toBe('')
  })

  it('preserves legacy Gallery data without the page-icon setting', () => {
    expect(
      galleryVisibilityClassName(galleryView({ gallery_title_visible: true }))
    ).toBe('')
  })
})
