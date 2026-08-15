import { useCallback, useEffect, useRef } from 'react'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

/**
 * 固定条横向样式优化
 * @param tags
 * @returns {JSX.Element}
 * @constructor
 */
const StickyBar = ({ children }) => {
  const rafRef = useRef(null)
  const barRef = useRef(null)
  const windowTopRef = useRef(0)

  // 滚动时进行滑动优化
  const scrollTrigger = useCallback(() => {
    if (siteConfig('NEXT_NAV_TYPE', null, CONFIG) === 'normal') {
      return
    }
    if (rafRef.current) {
      return
    }
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      const scrollS = window.scrollY
      if (!barRef.current) {
        barRef.current = document.querySelector('#sticky-bar')
      }
      if (scrollS >= windowTopRef.current && scrollS > 10) {
        barRef.current && barRef.current.classList.replace('top-14', 'top-0')
      } else {
        barRef.current && barRef.current.classList.replace('top-0', 'top-14')
      }
      windowTopRef.current = scrollS
    })
  }, [])

  // 监听滚动
  useEffect(() => {
    barRef.current = document.querySelector('#sticky-bar')
    window.addEventListener('scroll', scrollTrigger, { passive: true })
    scrollTrigger()
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('scroll', scrollTrigger)
    }
  }, [scrollTrigger])

  if (!children) return <></>

  return (
    <div id='sticky-bar' className='sticky flex-grow justify-center top-0 duration-500 z-10 pb-16'>
      <div className='bg-white dark:bg-hexo-black-gray px-5 absolute shadow-md w-full scroll-hidden'>
        <div id='tag-container' className="md:pl-3 overflow-x-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

export default StickyBar
