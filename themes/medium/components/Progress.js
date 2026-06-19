import { useCallback, useEffect, useRef, useState } from 'react'
import { isBrowser } from '@/lib/utils'

/**
 * 顶部页面阅读进度条
 * @returns {JSX.Element}
 * @constructor
 */
const Progress = ({ targetRef, showPercent = true }) => {
  const currentRef = targetRef?.current || targetRef
  const [percent, changePercent] = useState(0)
  const percentRef = useRef(percent)
  const rafRef = useRef(null)

  useEffect(() => {
    percentRef.current = percent
  }, [percent])

  const updateProgress = useCallback(() => {
    rafRef.current = null
    const target = currentRef || (isBrowser && document.getElementById('article-wrapper'))
    if (target) {
      const clientHeight = target.clientHeight
      const scrollY = window.pageYOffset
      const fullHeight = clientHeight - window.innerHeight
      if (!fullHeight || fullHeight <= 0) {
        return
      }
      let per = parseFloat(((scrollY / fullHeight) * 100).toFixed(0))
      if (per > 100) per = 100
      if (per < 0) per = 0
      if (per !== percentRef.current) {
        percentRef.current = per
        changePercent(per)
      }
    }
  }, [currentRef])

  const scrollListener = useCallback(() => {
    if (rafRef.current) {
      return
    }
    rafRef.current = requestAnimationFrame(updateProgress)
  }, [updateProgress])

  useEffect(() => {
    document.addEventListener('scroll', scrollListener, { passive: true })
    return () => {
      document.removeEventListener('scroll', scrollListener)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [scrollListener])

  return (
    <div className="h-4 w-full shadow-2xl bg-hexo-light-gray dark:bg-black">
      <div
        className="h-4 bg-gray-600 duration-200"
        style={{ width: `${percent}%` }}
      >
        {showPercent && (
          <div className="text-right text-white text-xs">{percent}%</div>
        )}
      </div>
    </div>
  )
}

export default Progress
