// import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const NotionPage = dynamic(() => import('@/components/NotionPage'), {
  ssr: false
})

/**
 * Magzine主题的公告
 */
const Announcement = ({ post, className }) => {
  const wrapperRef = useRef(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    if (!post?.blockMap || shouldRender) return

    const wrapper = wrapperRef.current
    if (!wrapper || !window.IntersectionObserver) {
      setShouldRender(true)
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px 0px' }
    )

    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [post?.blockMap, shouldRender])

  //   const { locale } = useGlobal()
  if (post?.blockMap) {
    return (
      <div className={className}>
        <section
          ref={wrapperRef}
          id='announcement-wrapper'
          className='rounded-xl px-2 min-h-40'>
          {/* <div><i className='mr-2 fas fa-bullhorn' />{locale.COMMON.ANNOUNCEMENT}</div> */}
          {post && shouldRender && (
            <div id='announcement-content'>
              <NotionPage post={post}/>
            </div>
          )}
        </section>
      </div>
    )
  } else {
    return <></>
  }
}
export default Announcement
