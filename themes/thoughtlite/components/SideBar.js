import Live2D from '@/components/Live2D'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import Announcement from './Announcement'
import Catalog from './Catalog'
const ExampleRecentComments = dynamic(
  () => import('./RecentCommentListForExample')
)

/**
 * 侧边栏
 */
export const SideBar = props => {
  const { locale } = useGlobal()
  const { latestPosts, categoryOptions, notice, post } = props
  // 评论相关
  const COMMENT_WALINE_SERVER_URL = siteConfig(
    'COMMENT_WALINE_SERVER_URL',
    false
  )
  const COMMENT_WALINE_RECENT = siteConfig('COMMENT_WALINE_RECENT', false)

  // 文章详情页特殊布局
  const HIDDEN_NOTIFICATION =
    post && siteConfig('THOUGHTLITE_ARTICLE_HIDDEN_NOTIFICATION', false, CONFIG)

  // 文章详情页左右布局改为上下布局
  const LAYOUT_VERTICAL =
    post && siteConfig('THOUGHTLITE_ARTICLE_LAYOUT_VERTICAL', false, CONFIG)

  return (
    <>
      {/* 目录 */}
      {post?.toc && post?.toc.length > 2 && (
        <aside className='tl-card mb-6 w-full overflow-hidden pb-4'>
          <h3 className='border-b border-[var(--tl-border)] bg-[var(--tl-bg)] px-4 py-3 text-sm text-[var(--tl-text)]'>
            {locale.COMMON.TABLE_OF_CONTENTS}
          </h3>
          <Catalog toc={post?.toc} />
        </aside>
      )}

      {/* 分类 */}
      <aside className='tl-card mb-6 w-full overflow-hidden'>
        <h3 className='border-b border-[var(--tl-border)] bg-[var(--tl-bg)] px-4 py-3 text-sm text-[var(--tl-text)]'>
          {locale.COMMON.CATEGORY}
        </h3>

        <div className='p-4'>
          <ul className='list-reset leading-normal'>
            {categoryOptions?.map(category => {
              return (
                <SmartLink
                  key={category.name}
                  href={`/category/${category.name}`}
                  passHref
                  legacyBehavior>
                  <li>
                    {' '}
                    <a
                      href={`/category/${category.name}`}
                      className='text-sm text-[var(--tl-muted)] hover:text-[var(--tl-accent)]'>
                      {category.name}({category.count})
                    </a>
                  </li>
                </SmartLink>
              )
            })}
          </ul>
        </div>
      </aside>

      {/* 最新文章 */}
      <aside className='tl-card mb-6 w-full overflow-hidden'>
        <h3 className='border-b border-[var(--tl-border)] bg-[var(--tl-bg)] px-4 py-3 text-sm text-[var(--tl-text)]'>
          {locale.COMMON.LATEST_POSTS}
        </h3>

        <div className='p-4'>
          <ul className='list-reset leading-normal'>
            {latestPosts?.map(p => {
              return (
                <SmartLink key={p.id} href={`/${p.slug}`} passHref legacyBehavior>
                  <li>
                    {' '}
                    <a
                      href={`/${p.slug}`}
                      className='text-sm text-[var(--tl-muted)] hover:text-[var(--tl-accent)]'>
                      {p.title}
                    </a>
                  </li>
                </SmartLink>
              )
            })}
          </ul>
        </div>
      </aside>

      {/* 公告 */}
      {!HIDDEN_NOTIFICATION && <Announcement post={notice} />}

      {/* 最近评论 */}
      {COMMENT_WALINE_SERVER_URL && COMMENT_WALINE_RECENT && (
        <aside className='tl-card mb-6 w-full overflow-hidden'>
          <h3 className='border-b border-[var(--tl-border)] bg-[var(--tl-bg)] px-4 py-3 text-sm text-[var(--tl-text)]'>
            {locale.COMMON.RECENT_COMMENTS}
          </h3>

          <div className='p-4'>
            <ExampleRecentComments />
          </div>
        </aside>
      )}

      {/* 宠物挂件 */}
      <aside
        className={`rounded overflow-hidden mb-6 ${LAYOUT_VERTICAL ? 'hidden md:fixed right-4 bottom-20' : ''}`}>
        <Live2D />
      </aside>
    </>
  )
}
