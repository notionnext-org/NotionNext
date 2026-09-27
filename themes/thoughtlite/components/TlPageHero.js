/**
 * 列表类页面统一页头（归档 / 分类 / 标签 / 搜索等）
 */
export default function TlPageHero({ eyebrow, title, description }) {
  if (!title) return null
  return (
    <header className='tl-page-hero mb-8 border-b border-[var(--tl-border)] pb-6'>
      {eyebrow ? (
        <p className='mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--tl-muted)]'>
          {eyebrow}
        </p>
      ) : null}
      <h1 className='tl-article-title !mb-0'>{title}</h1>
      {description ? (
        <p className='mt-2 text-sm text-[var(--tl-muted)]'>{description}</p>
      ) : null}
    </header>
  )
}
