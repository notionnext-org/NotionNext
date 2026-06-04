jest.mock('@/lib/db/notion/getNotionAPI', () => ({}))
jest.mock('p-limit', () => () => fn => fn())

import { formatNotionBlock } from '@/lib/db/notion/getPostBlocks'
import {
  isAppleMusicEmbedUrl,
  normalizeExternalMediaBlock
} from '@/lib/db/notion/normalizeExternalMediaBlock'

describe('formatNotionBlock', () => {
  it('detects Apple Music single-track embed URLs', () => {
    expect(
      isAppleMusicEmbedUrl(
        'https://embed.music.apple.com/us/song/neon-blue/324357768'
      )
    ).toBe(true)

    expect(
      isAppleMusicEmbedUrl(
        'https://embed.music.apple.com/us/album/girls-come-too/324357208'
      )
    ).toBe(false)
  })

  it('rewrites Apple Music song video blocks to embeds directly', () => {
    const blockValue = {
      type: 'video',
      properties: {
        source: [
          ['https://embed.music.apple.com/us/song/neon-blue/324357768']
        ]
      }
    }

    normalizeExternalMediaBlock(blockValue)

    expect(blockValue.type).toBe('embed')
  })

  it('leaves non-matching video blocks unchanged during direct normalization', () => {
    const blockValue = {
      type: 'video',
      properties: {
        source: [['https://www.youtube.com/watch?v=dQw4w9WgXcQ']]
      }
    }

    normalizeExternalMediaBlock(blockValue)

    expect(blockValue.type).toBe('video')
  })

  it('normalizes Apple Music song embeds from video blocks to embed blocks', () => {
    const formatted = formatNotionBlock({
      'apple-music-song': {
        value: {
          id: 'apple-music-song',
          type: 'video',
          properties: {
            source: [[
              'https://embed.music.apple.com/us/song/never-gonna-give-you-up/1559523357?i=1559523359'
            ]]
          }
        }
      }
    })

    expect(formatted['apple-music-song'].value.type).toBe('embed')
  })

  it('keeps regular hosted videos as video blocks', () => {
    const formatted = formatNotionBlock({
      'hosted-video': {
        value: {
          id: 'hosted-video',
          type: 'video',
          properties: {
            source: [['https://cdn.example.com/videos/demo.mp4']]
          }
        }
      }
    })

    expect(formatted['hosted-video'].value.type).toBe('video')
  })

  it('keeps child blocks renderable for quote containers without title properties', () => {
    const formatted = formatNotionBlock({
      quote_container: {
        value: {
          id: 'quote_container',
          type: 'quote',
          content: ['quote_child']
        }
      },
      quote_child: {
        value: {
          id: 'quote_child',
          type: 'text',
          parent_id: 'quote_container',
          properties: {
            title: [['Nested quote text']]
          }
        }
      }
    })

    expect(formatted.quote_container.value).toMatchObject({
      type: 'quote',
      content: ['quote_child'],
      properties: { title: [] }
    })
    expect(formatted.quote_child.value.parent_id).toBe('quote_container')
  })
})
