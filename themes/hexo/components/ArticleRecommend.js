import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * 关联推荐文章
 * @param {prev,next} param0
 * @returns
 */
export default function ArticleRecommend({ recommendPosts, siteInfo }) {
  const { locale } = useGlobal()

  if (
    !siteConfig('HEXO_ARTICLE_RECOMMEND', null, CONFIG) ||
    !recommendPosts ||
    recommendPosts.length === 0
  ) {
    return <></>
  }

  return (
    <div className='pt-8'>
      <div className=' mb-2 px-1 flex flex-nowrap justify-between'>
        <div className='dark:text-gray-300'>
          <i className='mr-2 fas fa-thumbs-up' />
          {locale.COMMON.RELATE_POSTS}
        </div>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {recommendPosts.map(post => {
          const headerImage = post?.pageCoverThumbnail
            ? post.pageCoverThumbnail
            : siteInfo?.pageCover

          return (
            <SmartLink
              key={post.id}
              title={post.title}
              href={post?.href}
              passHref
              className='flex h-40 cursor-pointer overflow-hidden rounded-lg'>
              <div className='relative isolate h-full w-full min-w-0 overflow-hidden rounded-lg group'>
                {/* 背景图：略放大 + 轻模糊，弱化细节 */}
                <div className='absolute inset-0 z-0 overflow-hidden'>
                  <LazyImage
                    src={headerImage}
                    alt=''
                    title={post.title}
                    className='h-full w-full scale-105 object-cover object-center blur-[2px] transition-transform duration-300 ease-out group-hover:scale-110'
                  />
                </div>
                {/* 全幅降权 + 轻微 backdrop 模糊（支持时），与渐变叠加 */}
                <div
                  aria-hidden
                  className='pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/35 via-black/45 to-black/70 transition-opacity duration-300 supports-[backdrop-filter]:backdrop-blur-[2px] group-hover:from-black/40 group-hover:via-black/50 group-hover:to-black/75'
                />
                <div className='relative z-20 flex h-full w-full items-center justify-center px-3 py-2 duration-300'>
                  <span className='line-clamp-3 max-w-full select-none text-center text-base font-bold leading-snug text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)] md:text-lg'>
                    {post.title}
                  </span>
                </div>
              </div>
            </SmartLink>
          )
        })}
      </div>
    </div>
  )
}
