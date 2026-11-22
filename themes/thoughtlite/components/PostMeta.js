import { useGlobal } from '@/lib/global'
import { formatDateFmt } from '@/lib/utils/formatDate'
import SmartLink from '@/components/SmartLink'

/**
 * 文章详情的元信息
 */
export const PostMeta = props => {
  const { post } = props
  const { locale } = useGlobal()

  return (
    <section className='mt-2 flex flex-wrap font-light leading-7 text-[var(--tl-muted)]'>
      <div>
        {post?.type !== 'Page' && (
          <>
            <SmartLink
              href={`/category/${post?.category}`}
              passHref
              className='cursor-pointer text-sm hover:text-[var(--tl-accent)]'>
              <i className='mr-1 fas fa-folder-open' />
              {post?.category}
            </SmartLink>
            <span className='mx-2 text-[var(--tl-faint)]'>|</span>
          </>
        )}

        {post?.type !== 'Page' && (
          <>
            <SmartLink
              href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
              passHref
              className='cursor-pointer text-sm hover:text-[var(--tl-accent)]'>
              {post?.publishDay}
            </SmartLink>
            <span className='mx-2 text-[var(--tl-faint)]'>|</span>
            <span className='text-sm text-[var(--tl-faint)]'>
              {locale.COMMON.LAST_EDITED_TIME}: {post?.lastEditedDay}
            </span>
            <span className='mx-2 text-[var(--tl-faint)]'>|</span>
            <span className='hidden busuanzi_container_page_pv text-sm'>
              <i className='mr-1 fas fa-eye' />
              <span className='busuanzi_value_page_pv' />
            </span>
          </>
        )}
      </div>
    </section>
  )
}
