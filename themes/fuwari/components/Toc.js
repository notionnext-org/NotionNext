import throttle from 'lodash.throttle'
import { isBrowser } from '@/lib/utils'
import { uuidToId } from 'notion-utils'
import { useEffect, useMemo, useState } from 'react'

/**
 * 与 gitbook/Catalog 对齐：currentSectionId 每次从 null 重算，勿用上一帧 activeSection 作初值，否则滚动判定错误；
 * tocIds 在节流回调内用稳定列表计算索引；-1 时需回落为 0；侧栏与移动端抽屉内各有一份目录时需同步滚动（class 选择所有容器）。
 */
const Toc = ({ toc }) => {
  const [activeSection, setActiveSection] = useState(null)

  const tocIds = useMemo(
    () => (toc || []).map(item => uuidToId(item.id)),
    [toc]
  )

  const actionSectionScrollSpy = useMemo(
    () =>
      throttle(() => {
        const sections = document.getElementsByClassName('notion-h')
        let prevBBox = null
        let currentSectionId = null

        for (let i = 0; i < sections.length; ++i) {
          const section = sections[i]
          if (!section || !(section instanceof Element)) continue
          if (!currentSectionId) {
            currentSectionId = section.getAttribute('data-id')
          }
          const bbox = section.getBoundingClientRect()
          const prevHeight = prevBBox ? bbox.top - prevBBox.bottom : 0
          const offset = Math.max(150, prevHeight / 4)
          if (bbox.top - offset < 0) {
            currentSectionId = section.getAttribute('data-id')
            prevBBox = bbox
            continue
          }
          break
        }

        setActiveSection(currentSectionId)
        const rawIndex = tocIds.indexOf(currentSectionId)
        const index = rawIndex >= 0 ? rawIndex : 0
        if (isBrowser && tocIds.length > 0) {
          for (const wrapper of document.getElementsByClassName(
            'fuwari-toc-wrapper'
          )) {
            wrapper?.scrollTo?.({ top: 28 * index, behavior: 'smooth' })
          }
        }
      }, 200),
    [tocIds]
  )

  useEffect(() => {
    window.addEventListener('scroll', actionSectionScrollSpy, { passive: true })
    actionSectionScrollSpy()
    return () => {
      window.removeEventListener('scroll', actionSectionScrollSpy)
      actionSectionScrollSpy.cancel?.()
    }
  }, [actionSectionScrollSpy])

  if (!toc || toc.length < 1) return null

  return (
    <div className='px-3'>
      <div className='fuwari-toc-wrapper overflow-y-auto max-h-96 overscroll-none scroll-hidden'>
        <nav className='h-full'>
          {toc.map(tocItem => {
            const id = uuidToId(tocItem.id)
            return (
              <a
                key={id}
                href={`#${id}`}
                className='catalog-item block duration-200 py-1'>
                <span
                  style={{ display: 'inline-block', marginLeft: tocItem.indentLevel * 16 }}
                  className={`truncate ${activeSection === id ? 'font-semibold text-[var(--fuwari-primary)]' : ''}`}>
                  {tocItem.text}
                </span>
              </a>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default Toc

