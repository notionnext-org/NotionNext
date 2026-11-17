import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

/**
 * 侧边栏抽屉面板，可以从侧面拉出
 * @returns {JSX.Element}
 * @constructor
 */
const SideBarDrawer = ({
  children,
  isOpen,
  onOpen,
  onClose,
  className,
  showOnPC = false
}) => {
  const router = useRouter()

  /**
   * 移动端：打开抽屉后同一手势会触发「幽灵点击」落在全屏遮罩上导致立刻关闭。
   * 打开后短时间内遮罩 pointer-events: none，超时后再响应关闭。
   */
  const [backdropInteractive, setBackdropInteractive] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setBackdropInteractive(false)
      return
    }
    setBackdropInteractive(false)
    const id = window.setTimeout(() => setBackdropInteractive(true), 180)
    return () => window.clearTimeout(id)
  }, [isOpen])

  useEffect(() => {
    const sideBarDrawerRouteListener = () => {
      onClose && onClose()
    }
    router.events.on('routeChangeComplete', sideBarDrawerRouteListener)
    return () => {
      router.events.off('routeChangeComplete', sideBarDrawerRouteListener)
    }
  }, [onClose, router.events])

  // 点击按钮更改侧边抽屉状态
  const switchSideDrawerVisible = showStatus => {
    if (showStatus) {
      onOpen && onOpen()
    } else {
      onClose && onClose()
    }
  }

  return (
    <div
      id='sidebar-wrapper'
      className={`block ${showOnPC ? '' : 'lg:hidden'} top-0`}>
      <div
        id='sidebar-drawer'
        className={`z-[70] ${className} ${isOpen ? 'translate-x-0 opacity-100' : 'pointer-events-none translate-x-[-104%] opacity-0'} transform-gpu transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] bg-white dark:bg-gray-900 flex flex-col fixed h-full left-0 overflow-y-scroll top-0 will-change-transform`}>
        {children}
      </div>

      {/* 背景蒙版 */}
      <div
        id='sidebar-drawer-background'
        role='presentation'
        onClick={() => {
          if (!backdropInteractive) return
          switchSideDrawerVisible(false)
        }}
        className={`fixed top-0 left-0 z-[60] h-full w-full bg-black/70 transition-opacity duration-200 ease-out ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        } ${isOpen && !backdropInteractive ? 'pointer-events-none' : ''}`}
      />
    </div>
  )
}

export default SideBarDrawer
