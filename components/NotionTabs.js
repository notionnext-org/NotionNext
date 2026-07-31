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

const getRendererProps = ctx => ({
  components: ctx.components,
  mapPageUrl: ctx.mapPageUrl,
  mapImageUrl: ctx.mapImageUrl,
  searchNotion: ctx.searchNotion,
  rootPageId: ctx.rootPageId,
  rootDomain: ctx.rootDomain,
  darkMode: ctx.darkMode,
  previewImages: ctx.previewImages,
  forceCustomImages: ctx.forceCustomImages,
  showCollectionViewDropdown: ctx.showCollectionViewDropdown,
  linkTableTitleProperties: ctx.linkTableTitleProperties,
  isLinkCollectionToUrlProperty: ctx.isLinkCollectionToUrlProperty,
  defaultPageIcon: ctx.defaultPageIcon ?? undefined,
  defaultPageCover: ctx.defaultPageCover ?? undefined,
  defaultPageCoverPosition: ctx.defaultPageCoverPosition
})

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

  useEffect(() => {
    if (!tabs.length) return
    if (!tabs.some(tab => tab.id === activeTabId)) {
      setActiveTabId(tabs[0].id)
    }
  }, [activeTabId, tabs])

  if (!tabs.length) return null

  const activeTab = tabs.find(tab => tab.id === activeTabId) || tabs[0]
  const activeContentIds = activeTab.block?.content || []
  const rootId = getDomId('notion-tabs', block?.id)
  const rendererProps = getRendererProps(ctx)

  const focusTab = index => {
    const nextTab = tabs[index]
    if (!nextTab) return

    setActiveTabId(nextTab.id)
    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        document.getElementById(getDomId(rootId, nextTab.id, 'tab'))?.focus()
      })
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
              onClick={() => setActiveTabId(tab.id)}
              onKeyDown={event => handleKeyDown(event, index)}
            >
              {tab.title}
            </button>
          )
        })}
      </div>

      <div
        id={getDomId(rootId, activeTab.id, 'panel')}
        className='notion-tabs-panel'
        role='tabpanel'
        aria-labelledby={getDomId(rootId, activeTab.id, 'tab')}
      >
        {activeContentIds.map(childId => {
          if (!getBlockValue(recordMap, childId)) return null

          return (
            <NotionRenderer
              key={childId}
              recordMap={recordMap}
              blockId={childId}
              fullPage={false}
              {...rendererProps}
            />
          )
        })}
      </div>
    </div>
  )
}

export default NotionTabs
