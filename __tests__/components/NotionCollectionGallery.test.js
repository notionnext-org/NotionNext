import { execFileSync } from 'child_process'

const renderGalleryScript = `
  const React = (await import('react')).default
  const { renderToStaticMarkup } = await import('react-dom/server')
  const { NotionRenderer } = await import('react-notion-x')
  const { Collection } = await import('react-notion-x/build/third-party/collection')
  const createRecordMap = ({
    showPageIcon,
    titleVisible,
    legacyTitleVisible
  }) => ({
    block: {
      collection_view: {
        value: { id: 'collection_view', type: 'collection_view',
          collection_id: 'collection', view_ids: ['gallery_view'] }
      },
      page: {
        value: { id: 'page', type: 'page', parent_table: 'collection',
          properties: { title: [['Gallery item']] },
          format: { page_icon: '📄' } }
      }
    },
    collection: {
      collection: {
        value: { id: 'collection', name: [['Gallery']],
          schema: { title: { name: 'Name', type: 'title' } } }
      }
    },
    collection_view: {
      gallery_view: {
        value: { id: 'gallery_view', type: 'gallery',
          format: {
            collection_pointer: { id: 'collection' },
            ...(showPageIcon === undefined ? {} : { show_page_icon: showPageIcon }),
            ...(legacyTitleVisible === undefined
              ? {}
              : { gallery_title_visible: legacyTitleVisible }),
            gallery_cover: { type: 'none' },
            gallery_cover_size: 'medium',
            gallery_cover_aspect: 'cover',
            gallery_properties:
              titleVisible === undefined
                ? []
                : [{ property: 'title', visible: titleVisible }]
          } }
      }
    },
    collection_query: {
      collection: {
        gallery_view: { collection_group_results: { blockIds: ['page'] } }
      }
    },
    signed_urls: {}
  })
  const renderGallery = options =>
    renderToStaticMarkup(
      React.createElement(NotionRenderer, {
        recordMap: createRecordMap(options),
        components: { Collection }
      })
    )
  process.stdout.write(JSON.stringify({
    hidden: renderGallery({ titleVisible: false }),
    titleVisible: renderGallery({ titleVisible: true }),
    enabled: renderGallery({ showPageIcon: true, titleVisible: true }),
    legacy: renderGallery({ legacyTitleVisible: true })
  }))
`

describe('Notion Gallery visibility settings', () => {
  const result = JSON.parse(
    execFileSync(process.execPath, [
      '--input-type=module',
      '-e',
      renderGalleryScript
    ])
  )

  it('hides omitted page icons and an explicitly hidden title', () => {
    expect(result.hidden).toContain(
      'notion-gallery notion-gallery-hide-page-icons notion-gallery-hide-titles'
    )
  })

  it('keeps a visible title while the omitted page-icon setting stays hidden', () => {
    expect(result.titleVisible).toContain(
      'notion-gallery notion-gallery-hide-page-icons'
    )
    expect(result.titleVisible).not.toContain('notion-gallery-hide-titles')
  })

  it('keeps page icons visible when Notion explicitly enables them', () => {
    expect(result.enabled).toContain('class="notion-gallery"')
    expect(result.enabled).not.toContain('notion-gallery-hide-page-icons')
    expect(result.enabled).not.toContain('notion-gallery-hide-titles')
  })

  it('preserves legacy Gallery data without the page-icon setting', () => {
    expect(result.legacy).toContain('class="notion-gallery"')
    expect(result.legacy).not.toContain('notion-gallery-hide-page-icons')
  })
})
