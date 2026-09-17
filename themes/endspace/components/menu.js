import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

const isClassIcon = icon =>
  typeof icon === 'string' &&
  /(^|\s)(fa[srldb]?|fa-|iconfont|icon-|ri-|remixicon)/.test(icon.trim())

const normalizeIcon = link => {
  const iconField = link?.icon || ''
  const rawIcon =
    iconField ||
    link?.pageIcon ||
    link?.rawPageIcon ||
    link?.raw_page_icon ||
    link?.page_icon ||
    link?.format?.page_icon ||
    link?.notionIcon ||
    link?.notion_icon ||
    link?.iconUrl ||
    link?.iconURL ||
    link?.icon_url ||
    link?.emoji ||
    ''
  return {
    pageIcon: isClassIcon(rawIcon) ? '' : rawIcon,
    customIcon: isClassIcon(rawIcon) ? rawIcon : link?.customIcon || null
  }
}

const normalizeHref = link => {
  const value = link?.href || link?.path || link?.url || link?.slug || ''
  if (!value) return ''
  if (value.startsWith('/') || value.startsWith('http') || value.startsWith('#')) {
    return value
  }
  return `/${value}`
}

const normalizeMenuItem = (link, index) => {
  if (!link || link.show === false) return null
  const name = link.name || link.title || link.label || ''
  const path = normalizeHref(link)
  const subMenus = normalizeMenu(link.subMenus || link.children)
  if (!name || (!path && subMenus.length === 0)) return null
  const icons = normalizeIcon(link)

  return {
    ...link,
    id: link.id || `endspace-menu-${index}`,
    name,
    path,
    href: path,
    pageIcon: icons.pageIcon,
    customIcon: icons.customIcon,
    subMenus
  }
}

const normalizeMenu = links =>
  (Array.isArray(links) ? links : [])
    .map(normalizeMenuItem)
    .filter(Boolean)

export const getEndspaceMenuItems = ({ customNav, customMenu } = {}) => {
  const defaultLinks = [
    { name: 'Home', path: '/', icon: 'endspace:home' },
    {
      name: 'Category',
      path: '/category',
      icon: 'endspace:category',
      show: siteConfig('ENDSPACE_MENU_CATEGORY', null, CONFIG)
    },
    {
      name: 'Tag',
      path: '/tag',
      icon: 'endspace:tag',
      show: siteConfig('ENDSPACE_MENU_TAG', null, CONFIG)
    },
    {
      name: 'Archive',
      path: '/archive',
      icon: 'endspace:archive',
      show: siteConfig('ENDSPACE_MENU_ARCHIVE', null, CONFIG)
    },
    { name: 'Portfolio', path: '/portfolio', icon: 'endspace:portfolio' },
    { name: 'Friends', path: '/friends', icon: 'endspace:friends' },
    {
      name: 'Search',
      path: '/search',
      icon: 'endspace:search',
      show: siteConfig('ENDSPACE_MENU_SEARCH', null, CONFIG)
    }
  ]

  let links = defaultLinks
  if (Array.isArray(customNav) && customNav.length > 0) {
    links = links.concat(customNav)
  }
  if (siteConfig('CUSTOM_MENU') && Array.isArray(customMenu)) {
    links = customMenu
  }

  return normalizeMenu(links)
}

export const getEndspaceActiveMenuName = (menuItems, asPath = '/') => {
  const cleanPath = asPath.split(/[?#]/)[0] || '/'
  const activeItem = menuItems
    .find(item => {
      const activeSubMenu = item.subMenus?.some(subItem => {
        if (!subItem.path || subItem.path.startsWith('http') || subItem.path.startsWith('#')) {
          return false
        }
        return cleanPath === subItem.path || cleanPath.startsWith(`${subItem.path}/`)
      })
      if (activeSubMenu) return true
      if (!item.path || item.path.startsWith('http') || item.path.startsWith('#')) return false
      if (item.path === '/') return cleanPath === '/'
      return cleanPath === item.path || cleanPath.startsWith(`${item.path}/`)
    })

  return activeItem?.name || menuItems[0]?.name || ''
}
