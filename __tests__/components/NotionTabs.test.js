import { fireEvent, render, screen } from '@testing-library/react'
import { NotionRenderer, useNotionContext } from 'react-notion-x'
import NotionTabs, { getNotionTabsPlainText } from '@/components/NotionTabs'

jest.mock('react-notion-x', () => {
  const React = require('react')

  return {
    useNotionContext: jest.fn(),
    NotionRenderer: jest.fn(({ recordMap, blockId }) => {
      const block = recordMap?.block?.[blockId]?.value
      const title = block?.properties?.title?.[0]?.[0] || blockId

      return React.createElement(
        'div',
        { 'data-testid': `rendered-${blockId}` },
        title
      )
    })
  }
})

const recordMap = {
  block: {
    tabs: {
      value: {
        id: 'tabs',
        type: 'embed',
        format: {
          embed_variant: 'notion_tabs'
        },
        content: ['first-tab', 'second-tab']
      }
    },
    'first-tab': {
      value: {
        id: 'first-tab',
        type: 'text',
        properties: {
          title: [['First']]
        },
        content: ['first-body']
      }
    },
    'second-tab': {
      value: {
        id: 'second-tab',
        type: 'text',
        properties: {
          title: []
        },
        content: ['second-body']
      }
    },
    'first-body': {
      value: {
        id: 'first-body',
        type: 'text',
        properties: {
          title: [['First body']]
        }
      }
    },
    'second-body': {
      value: {
        id: 'second-body',
        type: 'text',
        properties: {
          title: [['Second body']]
        }
      }
    }
  }
}

const createContext = () => ({
  recordMap,
  components: { Embed: 'EmbedComponent' },
  mapPageUrl: jest.fn(id => `/${id}`),
  mapImageUrl: jest.fn(url => url),
  darkMode: false,
  previewImages: true,
  forceCustomImages: false,
  showCollectionViewDropdown: false,
  linkTableTitleProperties: false,
  isLinkCollectionToUrlProperty: false
})

describe('NotionTabs', () => {
  beforeEach(() => {
    NotionRenderer.mockClear()
    useNotionContext.mockReturnValue(createContext())
  })

  it('renders tab labels and switches the active panel content', () => {
    render(<NotionTabs block={recordMap.block.tabs.value} />)

    const firstTab = screen.getByRole('tab', { name: 'First' })
    const secondTab = screen.getByRole('tab', { name: 'Tab 2' })

    expect(firstTab).toHaveAttribute('aria-selected', 'true')
    expect(secondTab).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByTestId('rendered-first-body')).toHaveTextContent(
      'First body'
    )
    expect(screen.queryByTestId('rendered-second-body')).not.toBeInTheDocument()
    expect(NotionRenderer.mock.calls.at(-1)[0]).toEqual(
      expect.objectContaining({
        recordMap,
        blockId: 'first-body',
        fullPage: false
      })
    )

    fireEvent.click(secondTab)

    expect(secondTab).toHaveAttribute('aria-selected', 'true')
    expect(firstTab).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByTestId('rendered-second-body')).toHaveTextContent(
      'Second body'
    )
    expect(screen.getByTestId('rendered-first-body')).toBeInTheDocument()
    expect(
      screen
        .getByTestId('rendered-first-body')
        .closest('[role="tabpanel"]')
    ).toHaveAttribute('hidden')
  })

  it('flattens rich text labels to plain text', () => {
    expect(getNotionTabsPlainText([['Hello'], [' '], ['World']])).toBe(
      'Hello World'
    )
    expect(getNotionTabsPlainText(null)).toBe('')
  })
})
