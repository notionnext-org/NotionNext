import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'

/**
 * 博客列表的单个卡片
 * @param {{ post: object, variant?: 'default' | 'timeline' }} props
 */
const BlogItem = ({ post, variant = 'default' }) => {
  const showPageCover =
    variant === 'default' &&
    siteConfig('THOUGHTLITE_POST_LIST_COVER', null, CONFIG) &&
    post?.pageCoverThumbnail

  if (variant === 'timeline') {
    return (
      <article className='tl-timeline-post py-2'>
        <div className='flex flex-wrap items-baseline gap-x-2 gap-y-0.5'>
          <SmartLink
            href={post?.href}
            className='group font-medium leading-snug text-[var(--tl-text)] no-underline hover:text-[var(--tl-accent)]'>
            {siteConfig('POST_TITLE_ICON') && (
              <span className='mr-1 inline-flex align-middle'>
                <NotionIcon icon={post.pageIcon} />
              </span>
            )}
            {post?.title}
          </SmartLink>
          {post?.type !== 'Page' && post?.category && (
            <SmartLink
              href={`/category/${post.category}`}
              className='text-xs text-[var(--tl-faint)] no-underline hover:text-[var(--tl-accent)]'>
              #{post.category}
            </SmartLink>
          )}
        </div>
        {post.summary && !post.results ? (
          <p className='mt-1 mb-0 text-sm text-[var(--tl-muted)] line-clamp-2 leading-relaxed'>
            {post.summary}
          </p>
        ) : null}
        {post.results ? (
          <p className='mt-1 mb-0 text-sm text-[var(--tl-muted)] line-clamp-2'>
            {post.results.map((r, index) => (
              <span key={index}>{r}</span>
            ))}
          </p>
        ) : null}
        <div className='mt-1 text-xs text-[var(--tl-faint)]'>
          <TwikooCommentCount post={post} className='mr-2' />
        </div>
      </article>
    )
  }

  return (
    <article
      className={`${showPageCover ? 'flex md:flex-row flex-col-reverse' : ''} replace mb-12 `}>
      <div className={`${showPageCover ? 'md:w-7/12' : ''}`}>
        <h2 className='mb-4'>
          <SmartLink
            href={post?.href}
            className='text-[var(--tl-text)] text-xl md:text-2xl no-underline hover:underline'>
            {siteConfig('POST_TITLE_ICON') && (
              <NotionIcon icon={post.pageIcon} />
            )}
            {post?.title}
          </SmartLink>
        </h2>

        <div className='mb-4 text-sm text-[var(--tl-muted)]'>
          by{' '}
          <span className='text-[var(--tl-muted)]'>{siteConfig('AUTHOR')}</span>
          {' '}
          on {post.date?.start_date || post.createdTime}
          <TwikooCommentCount post={post} className='pl-1' />
          {post.category && (
            <>
              <span className='font-bold mx-1'> | </span>
              <SmartLink
                href={`/category/${post.category}`}
                className='text-[var(--tl-muted)] hover:underline'>
                {post.category}
              </SmartLink>
            </>
          )}
        </div>

        {!post.results && (
          <p className='line-clamp-3 text-[var(--tl-muted)] leading-normal'>
            {post.summary}
          </p>
        )}
        {post.results && (
          <p className='line-clamp-3 mt-4 text-[var(--tl-muted)] text-sm font-light leading-7'>
            {post.results.map((r, index) => (
              <span key={index}>{r}</span>
            ))}
          </p>
        )}
      </div>
      {showPageCover && (
        <div className='md:w-5/12 w-full h-44 overflow-hidden p-1'>
          <SmartLink href={post?.href} passHref legacyBehavior>
            <LazyImage
              src={post?.pageCoverThumbnail}
              className='w-full bg-cover hover:scale-110 duration-200'
            />
          </SmartLink>
        </div>
      )}
    </article>
  )
}

export default BlogItem
