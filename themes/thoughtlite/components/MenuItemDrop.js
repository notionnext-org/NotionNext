import SmartLink from '@/components/SmartLink'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const HOVER_CLOSE_MS = 120

/**
 * 支持下拉二级的菜单
 * header 顶栏（inline）子菜单通过 portal + fixed 定位，避免被 overflow-x 裁剪
 */
export const MenuItemDrop = ({ link, variant = 'default' }) => {
  const [show, changeShow] = useState(false)
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 })
  const triggerRef = useRef(null)
  const closeTimerRef = useRef(null)
  const hasSubMenu = link?.subMenus?.length > 0
  const isInline = variant === 'inline'

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }, [])

  const openMenu = useCallback(() => {
    clearCloseTimer()
    changeShow(true)
  }, [clearCloseTimer])

  const scheduleClose = useCallback(() => {
    clearCloseTimer()
    closeTimerRef.current = setTimeout(() => changeShow(false), HOVER_CLOSE_MS)
  }, [clearCloseTimer])

  useEffect(() => {
    return () => clearCloseTimer()
  }, [clearCloseTimer])

  useEffect(() => {
    if (!show || !isInline || !hasSubMenu || !triggerRef.current) return

    const updatePosition = () => {
      const rect = triggerRef.current.getBoundingClientRect()
      setMenuPos({
        top: rect.bottom + 4,
        left: rect.left
      })
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition, { passive: true })
    window.addEventListener('resize', updatePosition)
    return () => {
      window.removeEventListener('scroll', updatePosition, { passive: true })
      window.removeEventListener('resize', updatePosition)
    }
  }, [show, isInline, hasSubMenu])

  if (link?.show === false) {
    return null
  }

  const itemShell = isInline
    ? 'relative flex-shrink-0'
    : 'cursor-pointer'

  const linkBox = isInline
    ? 'rounded-md px-2 py-1.5 tl-nav-link no-underline flex items-center gap-1.5 whitespace-nowrap'
    : 'rounded px-2 md:pl-0 md:mr-3 my-4 md:pr-3 text-gray-700 dark:text-gray-200 no-underline md:border-r border-gray-light'

  const subMenuList = hasSubMenu ? (
    <ul
      className={
        isInline
          ? `tl-card min-w-[10rem] py-1 shadow-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 transition-all duration-200 ${
              show ? 'visible opacity-100' : 'hidden pointer-events-none opacity-0'
            }`
          : `${
              show ? 'visible opacity-100' : 'hidden pointer-events-none opacity-0'
            } absolute z-30 transition-all duration-200 left-0 top-12 block border border-gray-100 bg-white drop-shadow-lg dark:border-gray-800 dark:bg-black`
      }
      style={
        isInline && show
          ? {
              position: 'fixed',
              top: menuPos.top,
              left: menuPos.left,
              zIndex: 50
            }
          : undefined
      }
      onMouseEnter={isInline ? openMenu : undefined}
      onMouseLeave={isInline ? scheduleClose : undefined}>
      {link.subMenus.map((sLink, index) => (
        <li
          key={index}
          className={`not:last-child:border-b-0 border-b text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 tracking-widest transition-all duration-200 dark:border-gray-800 py-3 pr-6 pl-3 ${
            isInline ? 'border-0 hover:bg-[var(--tl-accent-soft)]' : ''
          }`}>
          <SmartLink href={sLink.href} target={link?.target}>
            <span className='text-sm text-nowrap font-extralight'>
              {sLink?.icon && <i className={sLink.icon}> &nbsp; </i>}
              {sLink.title}
            </span>
          </SmartLink>
        </li>
      ))}
    </ul>
  ) : null

  return (
    <li
      ref={isInline ? triggerRef : undefined}
      className={itemShell}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}>
      {!hasSubMenu && (
        <div className={linkBox}>
          <SmartLink href={link?.href} target={link?.target}>
            {link?.icon && <i className={link?.icon} />} {link?.name}
          </SmartLink>
        </div>
      )}

      {hasSubMenu && (
        <div className={linkBox}>
          {link?.icon && <i className={link?.icon} />} {link?.name}
          <i
            className={`ml-2 fas fa-chevron-down duration-500 transition-all ${show ? ' rotate-180' : ''}`}></i>
        </div>
      )}

      {subMenuList &&
        (isInline && typeof document !== 'undefined'
          ? createPortal(subMenuList, document.body)
          : subMenuList)}
    </li>
  )
}
