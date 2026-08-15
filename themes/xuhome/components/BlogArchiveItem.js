import SmartLink from '@/components/SmartLink'

export default function BlogArchiveItem({ archiveTitle, archivePosts }) {
  return (
    <div className='mb-8'>
      <h2 className='font-black text-2xl text-[#0284c7] uppercase tracking-wider mb-4 border-b-[3px] border-[#fde68a] pb-2 inline-block'>
        {archiveTitle}
      </h2>
      <div className='space-y-3 mt-4'>
        {archivePosts?.map(post => (
          <SmartLink
            key={post.id}
            href={post.href}
            className='no-underline group block'
          >
            <div className='border-2 border-[#0284c7] rounded-sm shadow-[3px_3px_0px_0px_#0284c7] bg-[#ffffff] dark:bg-slate-800 p-3 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#0284c7] active:shadow-[1px_1px_0px_0px_#0284c7] transition-all flex items-baseline gap-4'>
              <span className='text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono shrink-0 w-[5rem] tabular-nums'>
                {post.date?.start_date?.slice(0, 10) || ''}
              </span>
              <span className='text-base font-extrabold text-slate-800 dark:text-slate-200 group-hover:text-[#0284c7] transition-colors truncate'>
                {post.title}
              </span>
            </div>
          </SmartLink>
        ))}
      </div>
    </div>
  )
}
