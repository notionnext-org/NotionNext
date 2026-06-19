import { uuidToId } from 'notion-utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import { IconListTree, IconChevronRight } from '@tabler/icons-react'

/**
 * FloatingToc Component - Endspace Theme Industrial Style
 */
const FloatingToc = ({ toc }) => {
  const [activeSection, setActiveSection] = useState(null)
  const [progress, setProgress] = useState(0)
  const [isExpanded, setIsExpanded] = useState(true)
  const tRef = useRef(null)
  const tocIds = useRef([])
  const rafRef = useRef(null)
  const progressRef = useRef(0)
  const activeSectionRef = useRef(null)

  const updateScrollState = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const nextProgress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0
    if (nextProgress !== progressRef.current) {
      progressRef.current = nextProgress
      setProgress(nextProgress)
    }

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
    if (tRef.current && ids.length > 0) {
      const index = ids.indexOf(currentSectionId) || 0
      tRef.current.scrollTo({ top: 32 * index - 60, behavior: 'smooth' })
    }
  }, [])

  const onScroll = useCallback(() => {
    if (rafRef.current) {
      return
    }
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      updateScrollState()
    })
  }, [updateScrollState])

  // Listen to scroll events
  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  // Return null if no TOC
  if (!toc || toc.length < 1) {
    return null
  }

  // Build tocIds
  const ids = toc.map(item => uuidToId(item.id))
  tocIds.current = ids

  return (
    <div 
      className="fixed z-50 hidden lg:block"
      style={{
        right: '1rem',
        top: 'auto',
        bottom: '100px'
      }}
    >
      <div 
        className={`transition-all duration-300 ease-out ${
          isExpanded 
            ? 'w-64 bg-[#f7f9fe] border border-[var(--endspace-border-base)] shadow-lg rounded-xl' 
            : 'w-10'
        }`}
        style={{
          maxHeight: '70vh'
        }}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer border hover:-translate-y-1 hover:shadow-lg relative group rounded-full ${
            isExpanded 
              ? 'w-10 h-10 bg-[#FBFB46] text-black border-[#FBFB46] absolute -left-10 top-0' 
              : 'w-10 h-10 bg-white text-gray-400 border-gray-200 hover:bg-[#FBFB46] hover:text-black hover:border-[#FBFB46]'
          }`}
          title={isExpanded ? 'Collapse TOC' : 'Expand TOC'}
        >
          {isExpanded ? (
            <IconChevronRight size={20} stroke={2} className="transform rotate-180" />
          ) : (
            <IconListTree size={20} stroke={2} />
          )}
        </button>

        {isExpanded && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[var(--endspace-text-primary)] flex items-center">
                <IconListTree size={16} stroke={2} className="mr-2" />
                TABLE OF CONTENTS
              </h3>
              <div className="w-16 h-1 bg-[#FBFB46] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--endspace-text-primary)] transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div 
              ref={tRef}
              className="overflow-y-auto overflow-x-hidden max-h-[50vh] scroll-smooth border-l border-[var(--endspace-border-base)] pl-4"
              style={{ scrollbarWidth: 'thin' }}
            >
              <nav className="space-y-2">
                {toc.map((tocItem) => {
                  const id = uuidToId(tocItem.id)
                  const isActive = activeSection === id
                  
                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      className={`block py-1 text-xs transition-all duration-200 hover:translate-x-1 ${
                        isActive 
                          ? 'text-black font-bold' 
                          : 'text-[var(--endspace-text-secondary)] hover:text-[var(--endspace-text-primary)]'
                      }`}
                      style={{ 
                        paddingLeft: `${tocItem.indentLevel * 12}px`
                      }}
                    >
                      <span className="line-clamp-2 leading-relaxed break-words">
                        {tocItem.text}
                      </span>
                    </a>
                  )
                })}
              </nav>
            </div>

            <div className="mt-4 pt-2 border-t border-[var(--endspace-border-base)]">
              <div className="text-[10px] font-mono text-[var(--endspace-text-muted)]">
                {toc.length} SECTIONS
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FloatingToc
