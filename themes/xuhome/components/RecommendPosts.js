import SmartLink from '@/components/SmartLink'

export default function RecommendPosts({ recommendPosts }) {
  if (!recommendPosts?.length) return null

  return (
    <div className='mt-6'>
      <h3 className='font-black text-xs text-[#0284c7] uppercase tracking-wider mb-4 border-b-[3px] border-[#fde68a] pb-2 inline-block'>
        You might also like
      </h3>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-3'>
        {recommendPosts.map(post => (
          <SmartLink
            key={post.id}
            href={`/${post.slug}`}
            className='no-underline group'
          >
            <div className='border-2 border-[#0284c7] rounded-sm shadow-[3px_3px_0px_0px_#0284c7] bg-[#ffffff] dark:bg-slate-800 p-3 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#0284c7] active:translate-y-0 active:shadow-[1px_1px_0px_0px_#0284c7] transition-all'>
              <span className='text-sm font-extrabold text-slate-700 dark:text-slate-300 group-hover:text-[#0284c7] transition-colors line-clamp-2'>
                {post.title}
              </span>
            </div>
          </SmartLink>
        ))}
      </div>
    </div>
  )
}
