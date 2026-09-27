import { nextTick } from 'vue'

export type RecentUpdatedDoc = {
  link: string
  title: string
  updatedAt: number
}

const STORAGE_PREFIX = 'notionnext:docs-read:'
const SIDEBAR_ITEM_SELECTOR = '.VPSidebarItem'
const SIDEBAR_SELECTOR = '.VPSidebar, .VPSidebarNav, aside'
const SIDEBAR_LINK_SELECTOR = 'a[href]'
const RETRY_DELAYS = [0, 80, 240, 600]
let sidebarObserver: MutationObserver | null = null
let observerTimer: number | undefined
let isSyncingMarkers = false

function normalizePath(value: string) {
  try {
    const url = new URL(value, window.location.origin)
    let pathname = decodeURIComponent(url.pathname)

    if (pathname.length > 1) {
      pathname = pathname.replace(/\/$/, '')
    }

    return pathname
  } catch {
    return value.replace(/[?#].*$/, '').replace(/\/$/, '')
  }
}

function readKey(link: string) {
  return `${STORAGE_PREFIX}${normalizePath(link)}`
}

function getReadTime(link: string) {
  const value = window.localStorage.getItem(readKey(link))
  return value ? Number(value) : 0
}

function markCurrentPageRead(items: RecentUpdatedDoc[], currentPath: string) {
  const current = normalizePath(currentPath)
  const item = items.find((doc) => normalizePath(doc.link) === current)
  const now = String(Date.now())

  window.localStorage.setItem(readKey(current), now)

  if (!item) {
    return
  }

  window.localStorage.setItem(readKey(item.link), now)
}

function getUnreadItems(items: RecentUpdatedDoc[]) {
  return items.filter((item) => item.updatedAt > getReadTime(item.link))
}

function clearUnreadMarkers() {
  document.querySelectorAll('.nn-unread-dot').forEach((element) => {
    element.remove()
  })

  document
    .querySelectorAll('.nn-unread-leaf, .nn-has-unread, .nn-has-visible-unread')
    .forEach((element) => {
      element.classList.remove('nn-unread-leaf', 'nn-has-unread', 'nn-has-visible-unread')
    })
}

function appendUnreadDot(element: Element, isParentDot = false) {
  if (element.querySelector(':scope > .nn-unread-dot')) {
    return
  }

  const dot = document.createElement('span')
  dot.className = isParentDot ? 'nn-unread-dot nn-parent-unread-dot' : 'nn-unread-dot'
  dot.setAttribute('aria-hidden', 'true')
  element.appendChild(dot)
}

function getParentDotTarget(sidebarItem: Element) {
  return (
    sidebarItem.querySelector(':scope > .item > .text') ||
    sidebarItem.querySelector(':scope > .item > .link') ||
    sidebarItem.querySelector(':scope > .item > button') ||
    sidebarItem.querySelector(':scope > .item') ||
    sidebarItem.querySelector(':scope > a')
  )
}

function markSidebarParents(anchor: Element) {
  let current = anchor.parentElement

  while (current) {
    if (current.matches(SIDEBAR_ITEM_SELECTOR)) {
      current.classList.add('nn-has-unread')

      if (current.classList.contains('collapsed')) {
        const dotTarget = getParentDotTarget(current)

        if (dotTarget) {
          current.classList.add('nn-has-visible-unread')
          appendUnreadDot(dotTarget, true)
        }
      }
    }

    current = current.parentElement
  }
}

function getSidebarLinks() {
  const sidebars = document.querySelectorAll(SIDEBAR_SELECTOR)
  return Array.from(sidebars).flatMap((sidebar) =>
    Array.from(sidebar.querySelectorAll<HTMLAnchorElement>(SIDEBAR_LINK_SELECTOR))
  )
}

function applyUnreadMarkers(items: RecentUpdatedDoc[]) {
  isSyncingMarkers = true
  clearUnreadMarkers()

  const unreadItems = getUnreadItems(items)
  const unreadLinks = new Set(unreadItems.map((item) => normalizePath(item.link)))

  getSidebarLinks().forEach((anchor) => {
    const href = normalizePath(anchor.getAttribute('href') || '')

    if (!unreadLinks.has(href)) {
      return
    }

    anchor.classList.add('nn-unread-leaf')
    appendUnreadDot(anchor)
    markSidebarParents(anchor)
  })

  window.setTimeout(() => {
    isSyncingMarkers = false
  })
}

function scheduleUnreadMarkers(items: RecentUpdatedDoc[]) {
  RETRY_DELAYS.forEach((delay) => {
    window.setTimeout(() => applyUnreadMarkers(items), delay)
  })
}

function observeSidebar(items: RecentUpdatedDoc[]) {
  sidebarObserver?.disconnect()
  window.clearTimeout(observerTimer)

  const sidebar = document.querySelector('.VPSidebar')

  if (!sidebar) {
    return
  }

  sidebarObserver = new MutationObserver(() => {
    if (isSyncingMarkers) {
      return
    }

    window.clearTimeout(observerTimer)
    observerTimer = window.setTimeout(() => applyUnreadMarkers(items), 50)
  })
  sidebarObserver.observe(sidebar, { childList: true, subtree: true, attributes: true })
}

export async function syncUnreadUpdates(
  updatedDocs: RecentUpdatedDoc[] | undefined,
  recentDocs: RecentUpdatedDoc[] | undefined,
  currentPath: string
) {
  if (typeof window === 'undefined') {
    return
  }

  const allDocs = Array.isArray(updatedDocs) ? updatedDocs : []
  const unreadTargetDocs = Array.isArray(recentDocs) ? recentDocs : []

  markCurrentPageRead(allDocs, currentPath)

  if (unreadTargetDocs.length === 0) {
    clearUnreadMarkers()
    return
  }

  await nextTick()
  scheduleUnreadMarkers(unreadTargetDocs)
  observeSidebar(unreadTargetDocs)
}
