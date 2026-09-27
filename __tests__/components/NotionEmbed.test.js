import { act, fireEvent, render, screen } from '@testing-library/react'
import { Script } from 'node:vm'
import { useNotionContext } from 'react-notion-x'
import NotionEmbed, {
  HTML_ARTIFACT_MAX_HEIGHT,
  HTML_ARTIFACT_MEASURE_MESSAGE,
  HTML_ARTIFACT_MIN_HEIGHT,
  HTML_ARTIFACT_RESIZE_MESSAGE,
  normalizeHtmlArtifactHeight,
  withHtmlArtifactResizeBridge
} from '@/components/NotionEmbed'

jest.mock('react-notion-x', () => ({
  useNotionContext: jest.fn()
}))

jest.mock('@/components/NotionTabs', () => {
  const React = require('react')

  return {
    __esModule: true,
    default: ({ block }) =>
      React.createElement('div', { 'data-testid': 'notion-tabs' }, block.id)
  }
})

const createHtmlArtifactBlock = (overrides = {}) => ({
  id: 'html-artifact-1',
  type: 'embed',
  format: {
    embed_variant: 'html_artifact',
    html_artifact_content:
      '<!doctype html><html><body><p>Quote</p></body></html>',
    block_height: 160,
    ...overrides.format
  },
  properties: {
    source: [['attachment:quote.html']],
    ...overrides.properties
  },
  ...overrides
})

const dispatchFrameMessage = (frame, data, source = frame.contentWindow) => {
  act(() => {
    window.dispatchEvent(new MessageEvent('message', { data, source }))
  })
}

describe('NotionEmbed HTML artifact auto height', () => {
  beforeEach(() => {
    useNotionContext.mockReturnValue({ recordMap: { signed_urls: {} } })
  })

  it('injects the resize bridge and applies reported content height', () => {
    render(<NotionEmbed block={createHtmlArtifactBlock()} />)

    const frame = screen.getByTitle('Notion HTML block')
    const wrapper = frame.parentElement
    const srcDoc = frame.getAttribute('srcdoc')

    expect(wrapper).toHaveStyle('height: 160px')
    expect(frame).toHaveAttribute(
      'sandbox',
      'allow-scripts allow-forms allow-popups'
    )
    expect(srcDoc).toContain('<p>Quote</p>')
    expect(srcDoc).toContain('data-notion-next-auto-height')
    expect(srcDoc).toContain(HTML_ARTIFACT_RESIZE_MESSAGE)
    expect(srcDoc).toContain(HTML_ARTIFACT_MEASURE_MESSAGE)

    dispatchFrameMessage(frame, {
      type: HTML_ARTIFACT_RESIZE_MESSAGE,
      height: 83.2
    })

    expect(wrapper).toHaveStyle('height: 84px')
  })

  it('requests a fresh measurement when the iframe loads', () => {
    render(<NotionEmbed block={createHtmlArtifactBlock()} />)

    const frame = screen.getByTitle('Notion HTML block')
    const postMessage = jest.spyOn(frame.contentWindow, 'postMessage')

    fireEvent.load(frame)

    expect(postMessage).toHaveBeenCalledWith(
      { type: HTML_ARTIFACT_MEASURE_MESSAGE },
      '*'
    )
  })

  it('ignores resize messages from other windows or with the wrong type', () => {
    render(<NotionEmbed block={createHtmlArtifactBlock()} />)

    const frame = screen.getByTitle('Notion HTML block')
    const wrapper = frame.parentElement

    dispatchFrameMessage(
      frame,
      { type: HTML_ARTIFACT_RESIZE_MESSAGE, height: 240 },
      window
    )
    dispatchFrameMessage(frame, { type: 'unrelated-message', height: 240 })

    expect(wrapper).toHaveStyle('height: 160px')
  })

  it('keeps ordinary iframe embeds unchanged', () => {
    render(
      <NotionEmbed
        block={{
          id: 'external-embed-1',
          type: 'embed',
          format: {
            display_source: 'https://example.com/widget',
            block_height: 300
          }
        }}
      />
    )

    const frame = screen.getByTitle('iframe embed')

    expect(frame).toHaveAttribute('src', 'https://example.com/widget')
    expect(frame).not.toHaveAttribute('srcdoc')
    expect(frame).not.toHaveAttribute('sandbox')
    expect(frame.parentElement).toHaveStyle('height: 300px')
  })

  it('renders Notion tabs embeds without requiring an iframe source', () => {
    render(
      <NotionEmbed
        block={{
          id: 'tabs-block',
          type: 'embed',
          format: {
            embed_variant: 'notion_tabs'
          },
          content: ['tab-a']
        }}
      />
    )

    expect(screen.getByTestId('notion-tabs')).toHaveTextContent('tabs-block')
    expect(screen.queryByTitle('iframe embed')).not.toBeInTheDocument()
  })
})

describe('HTML artifact resize helpers', () => {
  it('normalizes and clamps reported heights', () => {
    expect(normalizeHtmlArtifactHeight(0)).toBeNull()
    expect(normalizeHtmlArtifactHeight('invalid')).toBeNull()
    expect(normalizeHtmlArtifactHeight(12)).toBe(HTML_ARTIFACT_MIN_HEIGHT)
    expect(normalizeHtmlArtifactHeight(83.2)).toBe(84)
    expect(normalizeHtmlArtifactHeight(99999)).toBe(HTML_ARTIFACT_MAX_HEIGHT)
  })

  it('injects a valid bridge before the closing body tag', () => {
    expect(withHtmlArtifactResizeBridge(undefined)).toBeUndefined()

    const srcDoc = withHtmlArtifactResizeBridge(
      '<!doctype html><html><body>Content</body></html>'
    )
    const script = srcDoc.match(
      /<script data-notion-next-auto-height>([\s\S]*?)<\/script>/
    )?.[1]

    expect(srcDoc).toMatch(
      /<script data-notion-next-auto-height>[\s\S]*<\/script>\n<\/body><\/html>$/
    )
    expect(script).toBeTruthy()
    expect(() => new Script(script)).not.toThrow()
  })

  it('falls back to the closing html tag or the end of a fragment', () => {
    const documentWithoutBody = withHtmlArtifactResizeBridge(
      '<html><main>Content</main></html>'
    )
    const fragment = withHtmlArtifactResizeBridge('<main>Content</main>')

    expect(documentWithoutBody).toMatch(
      /<script data-notion-next-auto-height>[\s\S]*<\/script>\n<\/html>$/
    )
    expect(fragment).toMatch(
      /^<main>Content<\/main>\n<script data-notion-next-auto-height>/
    )
  })
})
