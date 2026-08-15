import { uuidToId } from 'notion-utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import Progress from './Progress'

/**
 * Table of Contents for Next theme.
 */
const Toc = ({ toc }) => {
  const tRef = useRef(null)
  const rafRef = useRef(null)
  const activeSectionRef = useRef(null)

  const [activeSection, setActiveSection] = useState(null)
  const tocIds = useRef([])

  const actionSectionScrollSpy = useCallback(() => {
    const sections = document.getElementsByClassName('notion-h')
    let prevBBox = null
    let currentSectionId = activeSectionRef.current
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
    if (currentSectionId !== activeSectionRef.current) {
      activeSectionRef.current = currentSectionId
      setActiveSection(currentSectionId)
    }
    const ids = tocIds.current
    const index = ids.indexOf(currentSectionId) || 0
    if (tRef.current && ids.length > 0) {
      tRef.current.scrollTo({ top: 28 * index, behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    const scrollSpy = () => {
      if (rafRef.current) {
        return
      }
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        actionSectionScrollSpy()
      })
    }
    window.addEventListener('scroll', scrollSpy, { passive: true })
    actionSectionScrollSpy()
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('scroll', scrollSpy)
    }
  }, [actionSectionScrollSpy])

  if (!toc || toc.length < 1) {
    return <></>
  }

  const ids = toc.map(tocItem => uuidToId(tocItem.id))
  tocIds.current = ids

  return (
    <div className='px-3'>
      <div className='w-full pb-1'>
        <Progress />
      </div>
      <div className='overflow-y-auto max-h-96 overscroll-none scroll-hidden' ref={tRef}>
        <nav className='h-full  text-black dark:text-gray-300'>
          {toc.map(tocItem => {
            const id = uuidToId(tocItem.id)
            const isActive = activeSection === id
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`notion-table-of-contents-item duration-300 transform font-light notion-table-of-contents-item-indent-level-${tocItem.indentLevel} catalog-item `}>
                <span
                  style={{
                    display: 'inline-block',
                    marginLeft: tocItem.indentLevel * 16
                  }}
                  className={`truncate ${isActive ? ' font-bold text-red-400 underline' : ''}`}>
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
