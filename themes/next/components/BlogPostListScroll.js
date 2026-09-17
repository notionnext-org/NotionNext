import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useCallback, useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'

/**
 * 文章列表滚动加载
 * @param posts 列表数据
 * @param tags 分类
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListScroll = ({
  posts = [],
  currentSearch,
  showSummary = siteConfig('NEXT_POST_LIST_SUMMARY', null, CONFIG)
}) => {
  const { NOTION_CONFIG } = useGlobal()
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const [page, updatePage] = useState(1)
  const postsToShow = getPostByPage(page, posts, POSTS_PER_PAGE)
  const targetRef = useRef(null)
  const rafRef = useRef(null)

  let hasMore = false
  if (posts) {
    const totalCount = posts.length
    hasMore = page * POSTS_PER_PAGE < totalCount
  }

  const handleGetMore = useCallback(() => {
    if (!hasMore) return
    updatePage(page + 1)
  }, [hasMore, page])

  // 监听滚动自动加载
  const scrollTrigger = useCallback(() => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      const scrollS = window.scrollY + window.outerHeight
      const clientHeight = targetRef.current ? targetRef.current.clientHeight : 0
      if (scrollS > clientHeight + 100) {
        handleGetMore()
      }
    })
  }, [handleGetMore])

  // 监听滚动
  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger, { passive: true })
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      window.removeEventListener('scroll', scrollTrigger)
    }
  }, [scrollTrigger])

  const { locale } = useGlobal()

  if (!postsToShow || postsToShow.length === 0) {
    return <BlogPostListEmpty currentSearch={currentSearch} />
  } else {
    return (
      <div ref={targetRef}>
        {/* 文章列表 */}
        <div
          id='posts-wrapper'
          className='flex flex-wrap space-y-1 lg:space-y-4'>
          {postsToShow.map(post => (
            <BlogPostCard key={post.id} post={post} showSummary={showSummary} />
          ))}
        </div>

        <div>
          <div
            onClick={() => {
              handleGetMore()
            }}
            className='w-full my-4 py-4 text-center cursor-pointer glassmorphism shadow hover:shadow-xl duration-200 dark:text-gray-200'>
            {' '}
            {hasMore ? locale.COMMON.MORE : locale.COMMON.NO_MORE}{' '}
          </div>
        </div>
      </div>
    )
  }
}

/**
 * 获取前page页数据
 * @param page 下页
 * @param totalPosts 总文章
 * @param POSTS_PER_PAGE 每页条目
 * @returns {*}
 */
const getPostByPage = function (page, totalPosts, POSTS_PER_PAGE) {
  return totalPosts.slice(0, POSTS_PER_PAGE * page)
}
export default BlogPostListScroll
