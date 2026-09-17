import TwikooCommentCount from '@/components/TwikooCommentCount'
import SmartLink from '@/components/SmartLink'

export default function BlogItem({ post }) {
  const date = post.date?.start_date || post.createdTime

  return (
    <article className='mb-6'>
      <SmartLink href={post?.href} className='no-underline block group'>
        <div className='border-2 border-[#0284c7] rounded-sm shadow-[4px_4px_0px_0px_#0284c7] bg-[#ffffff] dark:bg-slate-800 p-5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#0284c7] active:translate-y-0 active:shadow-[2px_2px_0px_0px_#0284c7] transition-all'>
          <div className='text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 font-mono'>
            {date?.slice(0, 10)}
          </div>

          <h2 className='text-xl font-black text-slate-900 dark:text-slate-100 group-hover:text-[#0284c7] transition-colors mb-2'>
            {post.title}
          </h2>

          {post.summary && (
            <p className='text-sm text-slate-600 dark:text-slate-400 font-semibold leading-relaxed line-clamp-2 mb-3'>
              {post.summary}
            </p>
          )}

          <div className='flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-wider'>
            {post.category && (
              <SmartLink href={`/category/${post.category}`}>
                <span className='inline-block border-2 border-[#0284c7] rounded-sm shadow-[1px_1px_0px_0px_#0284c7] px-2 py-0.5 text-[#0284c7] bg-[#fde68a] hover:bg-[#0284c7] hover:text-white transition-colors'>
                  {post.category}
                </span>
              </SmartLink>
            )}
            <TwikooCommentCount
              post={post}
              className='text-slate-400 dark:text-slate-500'
            />
          </div>
        </div>
      </SmartLink>
    </article>
  )
}
