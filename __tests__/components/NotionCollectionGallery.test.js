import { execFileSync } from 'child_process'

const renderGalleryScript = `
  const React = (await import('react')).default
  const { renderToStaticMarkup } = await import('react-dom/server')
  const { NotionRenderer } = await import('react-notion-x')
  const { Collection } = await import('react-notion-x/build/third-party/collection')
  const createRecordMap = showPageIcon => ({
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
            show_page_icon: showPageIcon,
            gallery_cover: { type: 'none' },
            gallery_cover_size: 'medium',
            gallery_cover_aspect: 'cover',
            gallery_properties: []
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
  const renderGallery = showPageIcon =>
    renderToStaticMarkup(
      React.createElement(NotionRenderer, {
        recordMap: createRecordMap(showPageIcon),
        components: { Collection }
      })
    )
  process.stdout.write(JSON.stringify({
    hidden: renderGallery(false),
    visible: renderGallery(true)
  }))
`

describe('Notion Gallery page icon setting', () => {
  const result = JSON.parse(
    execFileSync(process.execPath, [
      '--input-type=module',
      '-e',
      renderGalleryScript
    ])
  )

  it('adds the page-icon hiding class when Notion disables icons', () => {
    expect(result.hidden).toContain(
      'notion-gallery notion-gallery-hide-page-icons'
    )
  })

  it('keeps page icons visible when Notion enables icons', () => {
    expect(result.visible).toContain('class="notion-gallery"')
    expect(result.visible).not.toContain('notion-gallery-hide-page-icons')
  })
})
