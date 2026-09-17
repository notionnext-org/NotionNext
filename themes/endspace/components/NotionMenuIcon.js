import { useEffect, useState } from 'react'
import {
  IconArchive,
  IconBriefcase,
  IconFolderOpen,
  IconHome,
  IconSearch,
  IconTags,
  IconUsers
} from '@tabler/icons-react'

const EMOJI_PATTERN =
  /[\u{1F300}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}]/u

const isUrlIcon = icon =>
  typeof icon === 'string' &&
  (icon.startsWith('http') || icon.startsWith('data:') || icon.startsWith('/'))

const isEmojiIcon = icon => typeof icon === 'string' && EMOJI_PATTERN.test(icon)
const isClassIcon = icon =>
  typeof icon === 'string' &&
  /(^|\s)(fa[srldb]?|fa-|iconfont|icon-|ri-|remixicon)/.test(icon.trim())

const BUILTIN_ICONS = {
  archive: IconArchive,
  category: IconFolderOpen,
  friends: IconUsers,
  home: IconHome,
  portfolio: IconBriefcase,
  search: IconSearch,
  tag: IconTags
}

const getBuiltinIcon = icon => {
  if (typeof icon !== 'string' || !icon.startsWith('endspace:')) return null
  return BUILTIN_ICONS[icon.slice('endspace:'.length)] || null
}

const getIconSrc = icon =>
  typeof icon === 'string' && icon.startsWith('/icons/')
    ? `https://www.notion.so${icon}`
    : icon

const resolveIcon = icon => {
  if (!icon || typeof icon !== 'object') return icon
  if (icon.type === 'emoji') return icon.emoji
  if (icon.type === 'external') return icon.external?.url || ''
  if (icon.type === 'file') return icon.file?.url || ''
  return icon.url || icon.src || icon.emoji || ''
}

const isNotionBuiltinIcon = icon => {
  if (typeof icon !== 'string') return false
  return (
    icon.includes('/icons/') ||
    icon.includes('notion.so/icons/') ||
    icon.includes('notion.site/icons/')
  )
}

export default function NotionMenuIcon({ icon, active = false, className = '' }) {
  const resolvedIcon = resolveIcon(icon)
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    setImageFailed(false)
  }, [resolvedIcon])

  const fallback = (
    <span
      className={`endspace-notion-menu-dot inline-block h-2.5 w-2.5 rounded-full ${active ? 'is-active' : ''} ${className}`}
      aria-hidden="true"
    />
  )

  if (!resolvedIcon) return fallback

  const BuiltinIcon = getBuiltinIcon(resolvedIcon)
  if (BuiltinIcon) {
    return (
      <BuiltinIcon
        size={20}
        stroke={1.8}
        className={`endspace-notion-menu-svg-icon ${active ? 'is-active' : ''} ${className}`}
        aria-hidden="true"
      />
    )
  }

  if (isClassIcon(resolvedIcon)) {
    return (
      <i
        className={`endspace-notion-menu-class-icon ${active ? 'is-active' : ''} ${resolvedIcon} ${className}`}
        aria-hidden="true"
      />
    )
  }

  if (isUrlIcon(resolvedIcon) && !isEmojiIcon(resolvedIcon)) {
    if (imageFailed) return fallback

    const iconSrc = getIconSrc(resolvedIcon)
    return (
      <img
        src={iconSrc}
        alt=""
        className={`endspace-notion-menu-image ${active ? 'is-active' : ''} ${
          isNotionBuiltinIcon(resolvedIcon) ? 'endspace-notion-menu-image-monochrome' : ''
        } ${className}`}
        aria-hidden="true"
        onError={() => setImageFailed(true)}
      />
    )
  }

  return (
    <span className={`endspace-notion-menu-emoji ${active ? 'is-active' : ''} ${className}`}>
      {resolvedIcon}
    </span>
  )
}
