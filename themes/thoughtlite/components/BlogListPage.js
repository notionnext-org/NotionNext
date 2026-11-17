import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import CONFIG from '../config'
import BlogItem from './BlogItem'
import HomeTimeline from './HomeTimeline'

/**
 * 使用分页插件的博客列表
 * @param {*} props
 * @returns
 */
export const BlogListPage = props => {
  const {
    page = 1,
    posts,
    postCount,
    useTimeline: useTimelineProp
  } = props
  const { locale, NOTION_CONFIG } = useGlobal()
  const router = useRouter()
  const totalPage = Math.ceil(
    postCount / siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  )
  const currentPage = +page

  const showPrev = currentPage > 1
  const showNext = page < totalPage
  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')
    .replace('.html', '')

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
    <div className={`w-full ${showPageCover ? 'md:pr-2' : 'md:pr-12'} mb-12`}>
      {useTimeline ? (
        <HomeTimeline posts={posts} />
      ) : (
        <div id='posts-wrapper'>
          {posts?.map(post => (
            <BlogItem key={post.id} post={post} />
          ))}
        </div>
      )}

      <div className='mt-6 flex justify-between gap-4 text-sm'>
        <SmartLink
          href={{
            pathname:
              currentPage - 1 === 1
                ? `${pagePrefix}/`
                : `${pagePrefix}/page/${currentPage - 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          className={`tl-pager ${showPrev ? '' : 'tl-pager--disabled'}`}>
          {locale.PAGINATION.PREV}
        </SmartLink>
        <SmartLink
          href={{
            pathname: `${pagePrefix}/page/${currentPage + 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          className={`tl-pager ${showNext ? '' : 'tl-pager--disabled'}`}>
          {locale.PAGINATION.NEXT}
        </SmartLink>
      </div>
    </div>
  )
}
