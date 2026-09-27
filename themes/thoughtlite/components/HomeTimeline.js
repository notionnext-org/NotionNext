import { useMemo } from 'react'
import BlogItem from './BlogItem'

/**
 * 按「发布日」分组的时间线列表（对齐 ThoughtLite 首页观感）。
 * @param {{ posts: object[] }} props
 */
export default function HomeTimeline({ posts }) {
  const groups = useMemo(() => {
    if (!posts?.length) return []
    const sorted = [...posts].sort(
      (a, b) => (b.publishDate || 0) - (a.publishDate || 0)
    )
    const dayOrder = []
    const seen = new Set()
    for (const p of sorted) {
      const day = p.publishDay || p.date?.start_date || ''
      if (!seen.has(day)) {
        seen.add(day)
        dayOrder.push(day)
      }
    }
    return dayOrder.map(day => ({
      day,
      posts: sorted.filter(
        p => (p.publishDay || p.date?.start_date || '') === day
      )
    }))
  }, [posts])

  if (!groups.length) return null

  return (
    <div id='posts-wrapper' className='tl-timeline'>
      {groups.map(({ day, posts: dayPosts }) => (
        <section key={day || 'unknown'} className='tl-timeline-day'>
          <h2 className='tl-timeline-day-label'>{day || '—'}</h2>
          <ul className='tl-timeline-rail'>
            {dayPosts.map(post => (
              <li key={post.id} className='tl-timeline-item'>
                <BlogItem post={post} variant='timeline' />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
