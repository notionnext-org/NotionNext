import SmartLink from '@/components/SmartLink'

/**
 * 归档：按月（或站点约定）分组的文章列表
 */
export default function BlogListArchive({ archiveTitle, archivePosts }) {
  const posts = archivePosts[archiveTitle] || []
  const sectionId = `archive-${String(archiveTitle).replace(/\s+/g, '-')}`
  return (
    <section className='tl-archive-section' aria-labelledby={sectionId}>
      <h2 id={sectionId} className='tl-timeline-day-label mb-3 mt-10 first:mt-0'>
        {archiveTitle}
      </h2>
      <ul className='tl-archive-rail m-0 list-none border-l border-[var(--tl-border)] pl-0'>
        {posts.map(post => (
          <li key={post.id} className='tl-archive-item relative pl-5 py-1.5'>
            <span className='mb-0.5 block text-xs text-[var(--tl-faint)]'>
              {post?.publishDay}
            </span>
            <SmartLink
              href={post?.href}
              className='text-[var(--tl-text)] no-underline hover:text-[var(--tl-accent)]'>
              {post.title}
            </SmartLink>
          </li>
        ))}
      </ul>
    </section>
  )
}
