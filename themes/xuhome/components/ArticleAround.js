import SmartLink from '@/components/SmartLink'

export default function ArticleAround({ prev, next }) {
  return (
    <nav className='grid grid-cols-2 gap-4 py-6 mt-6'>
      {prev ? (
        <SmartLink href={`/${prev.slug}`} className='no-underline group'>
          <div className='border-2 border-[#0284c7] rounded-sm shadow-[4px_4px_0px_0px_#0284c7] bg-[#ffffff] dark:bg-slate-800 p-4 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#0284c7] active:translate-y-0 active:shadow-[2px_2px_0px_0px_#0284c7] transition-all h-full flex flex-col justify-center'>
            <div className='text-xs font-black text-[#0284c7] uppercase tracking-wider mb-1'>
              {'\u2190'} Previous
            </div>
            <div className='text-sm font-extrabold text-slate-700 dark:text-slate-300 group-hover:text-[#0284c7] truncate'>
              {prev.title}
            </div>
          </div>
        </SmartLink>
      ) : (
        <div />
      )}

      {next ? (
        <SmartLink href={`/${next.slug}`} className='no-underline group'>
          <div className='border-2 border-[#0284c7] rounded-sm shadow-[4px_4px_0px_0px_#0284c7] bg-[#ffffff] dark:bg-slate-800 p-4 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#0284c7] active:translate-y-0 active:shadow-[2px_2px_0px_0px_#0284c7] transition-all h-full flex flex-col justify-center text-right'>
            <div className='text-xs font-black text-[#0284c7] uppercase tracking-wider mb-1'>
              Next {'\u2192'}
            </div>
            <div className='text-sm font-extrabold text-slate-700 dark:text-slate-300 group-hover:text-[#0284c7] truncate'>
              {next.title}
            </div>
          </div>
        </SmartLink>
      ) : (
        <div />
      )}
    </nav>
  )
}
