import NotionIcon from '@/components/NotionIcon'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'

export default function ArticleInfo({ post }) {
  return (
    <div>
      <h1 className='text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 mb-4 leading-tight'>
        {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post.pageIcon} />}
        {post.title}
      </h1>

      <div className='flex flex-wrap items-center gap-2 pb-4 mb-6 border-b-[3px] border-[#0284c7]'>
        <span className='text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono'>
          {post.date?.start_date || post.createdTime}
        </span>
        {post.category && (
          <SmartLink href={`/category/${post.category}`}>
            <span className='inline-block border-2 border-[#0284c7] rounded-sm shadow-[1px_1px_0px_0px_#0284c7] px-2 py-0.5 text-xs font-black uppercase tracking-wider text-[#0284c7] bg-[#fde68a] hover:bg-[#0284c7] hover:text-white transition-colors'>
              {post.category}
            </span>
          </SmartLink>
        )}
        <TwikooCommentCount
          post={post}
          className='text-xs font-black text-slate-400 dark:text-slate-500 uppercase'
        />
        {post?.tags?.map(t => (
          <SmartLink key={t} href={`/tag/${encodeURIComponent(t)}`}>
            <span className='text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider hover:text-[#0284c7] transition-colors'>
              #{t}
            </span>
          </SmartLink>
        ))}
      </div>
    </div>
  )
}
