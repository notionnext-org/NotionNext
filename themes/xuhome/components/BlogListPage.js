import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import BlogItem from './BlogItem'

export default function BlogListPage(props) {
  const { page = 1, posts, postCount } = props
  const { locale, NOTION_CONFIG } = useGlobal()
  const router = useRouter()
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE)
  const currentPage = +page
  const showPrev = currentPage > 1
  const showNext = page < totalPage
  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')

  return (
    <div>
      {posts?.map(post => (
        <BlogItem key={post.id} post={post} />
      ))}

      <div className='flex justify-between items-center pt-6 gap-4'>
        <SmartLink
          href={{
            pathname:
              currentPage - 1 === 1
                ? `${pagePrefix}/`
                : `${pagePrefix}/page/${currentPage - 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          className={`no-underline ${showPrev ? '' : 'pointer-events-none opacity-30'}`}
        >
          <span className='inline-block border-2 border-[#0284c7] rounded-sm shadow-[2px_2px_0px_0px_#0284c7] bg-[#ffffff] dark:bg-slate-800 px-4 py-2 font-black text-sm text-[#0284c7] uppercase tracking-wider hover:bg-[#0ea5e9] hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all'>
            {'\u2190'} Prev
          </span>
        </SmartLink>

        <span className='font-black text-sm text-[#0284c7] tabular-nums'>
          {currentPage} / {totalPage || 1}
        </span>

        <SmartLink
          href={{
            pathname: `${pagePrefix}/page/${currentPage + 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          className={`no-underline ${showNext ? '' : 'pointer-events-none opacity-30'}`}
        >
          <span className='inline-block border-2 border-[#0284c7] rounded-sm shadow-[2px_2px_0px_0px_#0284c7] bg-[#ffffff] dark:bg-slate-800 px-4 py-2 font-black text-sm text-[#0284c7] uppercase tracking-wider hover:bg-[#0ea5e9] hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all'>
            Next {'\u2192'}
          </span>
        </SmartLink>
      </div>
    </div>
  )
}
