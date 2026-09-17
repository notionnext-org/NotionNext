import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useEffect, useRef, useState } from 'react'
import PostList from './PostList'

const PostListScroll = ({ posts = [] }) => {
  const { locale, NOTION_CONFIG } = useGlobal()
  const [page, setPage] = useState(1)
  const loadingRef = useRef(null)
  const POSTS_PER_PAGE = parseInt(siteConfig('POSTS_PER_PAGE', 12, NOTION_CONFIG), 10)
  const hasMore = page * POSTS_PER_PAGE < posts.length
  const postsToShow = posts.slice(0, page * POSTS_PER_PAGE)

  useEffect(() => {
    if (!loadingRef.current || !hasMore) return
    const observer = new IntersectionObserver(entries => {
      if (entries[0]?.isIntersecting) setPage(current => current + 1)
    })
    observer.observe(loadingRef.current)
    return () => observer.disconnect()
  }, [hasMore])

  const loadMore = () => {
    if (hasMore) setPage(current => current + 1)
  }

  return (
    <>
      <PostList posts={postsToShow} />
      <button
        ref={loadingRef}
        type='button'
        onClick={loadMore}
        className='fuwari-card mt-4 w-full p-4 text-center text-sm text-[var(--fuwari-muted)] hover:text-[var(--fuwari-primary)]'>
        {hasMore ? locale?.COMMON?.MORE || 'More' : locale?.COMMON?.NO_MORE || 'No more'}
      </button>
    </>
  )
}

export default PostListScroll
