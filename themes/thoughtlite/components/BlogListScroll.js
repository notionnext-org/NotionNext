import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CONFIG from '../config'
import BlogItem from './BlogItem'
import HomeTimeline from './HomeTimeline'

/**
 * 使用滚动无限加载的博客列表
 * @param {*} props
 * @returns
 */
export const BlogListScroll = props => {
  const { posts, useTimeline: useTimelineProp } = props
  const router = useRouter()
  const { locale, NOTION_CONFIG } = useGlobal()
  const [page, updatePage] = useState(1)
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)

  const postsToShow = posts
    ? Object.assign([], posts).slice(0, POSTS_PER_PAGE * page)
    : []

  const hasMore = Boolean(posts?.length) && page * POSTS_PER_PAGE < posts.length

  const handleGetMore = useCallback(() => {
    updatePage(p => {
      const total = posts?.length ?? 0
      if (p * POSTS_PER_PAGE >= total) return p
      return p + 1
    })
  }, [posts, POSTS_PER_PAGE])

  const targetRef = useRef(null)

  const scrollTrigger = useMemo(
    () =>
      throttle(() => {
        const scrollS = window.scrollY + window.outerHeight
        const clientHeight = targetRef.current?.clientHeight ?? 0
        if (scrollS > clientHeight + 100) {
          handleGetMore()
        }
      }, 500),
    [handleGetMore]
  )

  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger, { passive: true })
    return () => {
      scrollTrigger.cancel()
      window.removeEventListener('scroll', scrollTrigger)
    }
  }, [scrollTrigger])

  const showPageCover = siteConfig('THOUGHTLITE_POST_LIST_COVER', null, CONFIG)

  const useTimeline =
    useTimelineProp ??
    (siteConfig('THOUGHTLITE_HOME_TIMELINE', true, CONFIG) &&
      !props.category &&
      !props.tag &&
      !props.keyword &&
      !router?.query?.s &&
      (router.pathname === '/' || router.pathname === '/page/[page]'))

  return (
    <div
      className={`w-full ${showPageCover ? 'md:pr-2' : ''} mb-12`}
      ref={targetRef}>
      {useTimeline ? (
        <HomeTimeline posts={postsToShow} />
      ) : (
        <div id='posts-wrapper'>
          {postsToShow?.map(post => (
            <BlogItem key={post.id} post={post} />
          ))}
        </div>
      )}

      <div
        onClick={handleGetMore}
        className='my-4 w-full cursor-pointer py-4 text-center text-sm text-[var(--tl-muted)]'>
        {' '}
        {hasMore ? locale.COMMON.MORE : `${locale.COMMON.NO_MORE} 😰`}{' '}
      </div>
    </div>
  )
}
