import { useEffect, useMemo, useState } from 'react'
import { NotionRenderer, useNotionContext } from 'react-notion-x'

const getBlockValue = (recordMap, blockId) => {
  const entry = recordMap?.block?.[blockId]
  return entry?.value?.value || entry?.value || entry
}

export const getNotionTabsPlainText = value => {
  if (!Array.isArray(value)) return ''

  return value
    .map(segment => {
      if (!Array.isArray(segment)) return ''
      return typeof segment[0] === 'string' ? segment[0] : ''
    })
    .join('')
    .trim()
}

const getTabTitle = (block, index) => {
  return getNotionTabsPlainText(block?.properties?.title) || `Tab ${index + 1}`
}

const getDomId = (...parts) => {
  return parts
    .filter(Boolean)
    .join('-')
    .replace(/[^a-zA-Z0-9_-]/g, '')
}

const getRendererProps = ctx => {
  const rendererProps = { ...ctx }

  // These values belong to the parent renderer and must not leak into a
  // nested block render. All other context options can follow library updates.
  delete rendererProps.recordMap
  delete rendererProps.fullPage
  delete rendererProps.zoom

  return rendererProps
}

const NotionTabs = ({ block }) => {
  const ctx = useNotionContext()
  const { recordMap } = ctx
  const tabs = useMemo(() => {
    return (block?.content || [])
      .map((tabId, index) => {
        const tabBlock = getBlockValue(recordMap, tabId)
        if (!tabBlock) return null

        return {
          id: tabId,
          block: tabBlock,
          title: getTabTitle(tabBlock, index)
        }
      })
      .filter(Boolean)
  }, [block?.content, recordMap])
  const [activeTabId, setActiveTabId] = useState(() => tabs[0]?.id)
  const [renderedTabIds, setRenderedTabIds] = useState(
    () => new Set(tabs[0]?.id ? [tabs[0].id] : [])
  )

  useEffect(() => {
    if (!tabs.length) return
    if (!tabs.some(tab => tab.id === activeTabId)) {
      const firstTabId = tabs[0].id
      setActiveTabId(firstTabId)
      setRenderedTabIds(current => new Set(current).add(firstTabId))
    }
  }, [activeTabId, tabs])

  if (!tabs.length) return null

  const activeTab = tabs.find(tab => tab.id === activeTabId) || tabs[0]
  const rootId = getDomId('notion-tabs', block?.id)
  const rendererProps = getRendererProps(ctx)

  const activateTab = tabId => {
    setActiveTabId(tabId)
    setRenderedTabIds(current => new Set(current).add(tabId))
  }

  const focusTab = index => {
    const nextTab = tabs[index]
    if (!nextTab) return

    activateTab(nextTab.id)
    if (typeof window !== 'undefined') {
      const focus = () => {
        document.getElementById(getDomId(rootId, nextTab.id, 'tab'))?.focus()
      }
      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(focus)
      } else {
        window.setTimeout(() => focus(), 0)
      }
    }
  }

  const handleKeyDown = (event, index) => {
    let nextIndex = null

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabs.length) % tabs.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1
    }

    if (nextIndex === null) return
    event.preventDefault()
    focusTab(nextIndex)
  }

  return (
    <div className='notion-tabs'>
      <div className='notion-tabs-list' role='tablist'>
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab.id
          const tabId = getDomId(rootId, tab.id, 'tab')
          const panelId = getDomId(rootId, tab.id, 'panel')

          return (
            <button
              key={tab.id}
              id={tabId}
              className='notion-tabs-tab'
              type='button'
              role='tab'
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              onClick={() => activateTab(tab.id)}
              onKeyDown={event => handleKeyDown(event, index)}
            >
              {tab.title}
            </button>
          )
        })}
      </div>

      {tabs.map(tab => {
        const isActive = tab.id === activeTab.id
        const hasBeenRendered = renderedTabIds.has(tab.id)
        const contentIds = tab.block?.content || []

        return (
          <div
            key={tab.id}
            id={getDomId(rootId, tab.id, 'panel')}
            className='notion-tabs-panel'
            role='tabpanel'
            aria-labelledby={getDomId(rootId, tab.id, 'tab')}
            hidden={!isActive}
          >
            {hasBeenRendered &&
              contentIds.map(childId => {
                if (!getBlockValue(recordMap, childId)) return null

                return (
                  <NotionRenderer
                    key={childId}
                    {...rendererProps}
                    recordMap={recordMap}
                    blockId={childId}
                    fullPage={false}
                  />
                )
              })}
          </div>
        )
      })}
    </div>
  )
}

export default NotionTabs
