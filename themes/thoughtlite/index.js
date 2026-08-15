'use client'

/**
 * ThoughtLite（进行中）
 *
 * 当前为基于 `themes/example` 的可运行骨架，便于在 `NEXT_PUBLIC_THEME=thoughtlite` 下联调数据契约。
 * 视觉与交互需按 `docs/themes/THOUGHTLITE_MIGRATION_PLAN.zh-CN.md` 对照上游 [ThoughtLite](https://github.com/tuyuritio/astro-theme-thought-lite) 逐步替换。
 *
 * 关联：[#3987](https://github.com/notionnext-org/NotionNext/issues/3987)
 */

import replaceSearchResult from '@/components/Mark'
import NotionIcon from '@/components/NotionIcon'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import SmartLink from '@/components/SmartLink'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import BlogListArchive from './components/BlogListArchive'
import { BlogListPage } from './components/BlogListPage'
import { BlogListScroll } from './components/BlogListScroll'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import LatestCard from './components/LatestCard'
import { PostLock } from './components/PostLock'
import { PostMeta } from './components/PostMeta'
import SearchInput from './components/SearchInput'
import { SideBar } from './components/SideBar'
import TitleBar from './components/TitleBar'
import TlPageHero from './components/TlPageHero'
import CONFIG from './config'
import { Style } from './style'

const Comment = dynamic(() => import('@/components/Comment'), { ssr: false })

/**
 * 基础布局框架
 * 1.其它页面都嵌入在LayoutBase中
 * 2.采用左右两侧布局，移动端使用顶部导航栏
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, post } = props
  const { onLoading, fullWidth, locale } = useGlobal()

  const LAYOUT_VERTICAL =
    post && siteConfig('THOUGHTLITE_ARTICLE_LAYOUT_VERTICAL', false, CONFIG)

  const LAYOUT_SIDEBAR_REVERSE = siteConfig('LAYOUT_SIDEBAR_REVERSE', false)

  const sidebarOnlyPost = siteConfig(
    'THOUGHTLITE_SIDEBAR_ONLY_ON_POST',
    true,
    CONFIG
  )
  const showSidebar =
    !fullWidth && (!sidebarOnlyPost || Boolean(post)) && !LAYOUT_VERTICAL

  return (
    <div
      id='theme-thoughtlite'
      className={`${siteConfig('FONT_STYLE')} flex min-h-screen flex-col scroll-smooth`}>
      <Style />

      <Header {...props} />
      <TitleBar {...props} />

      <div id='container-inner' className='relative z-10 w-full flex-1'>
        <div
          id='container-wrapper'
          className={`relative mx-auto flex justify-center px-4 py-8 md:px-6
          ${LAYOUT_SIDEBAR_REVERSE ? 'md:flex-row-reverse' : ''} 
          ${
            LAYOUT_VERTICAL
              ? 'max-w-5xl flex-col items-center'
              : showSidebar
                ? 'max-w-5xl flex-col items-start gap-8 md:flex-row md:gap-10'
                : 'max-w-3xl flex-col items-start'
          } 
          `}>
          <div
            className={`min-w-0 flex-1 ${
              fullWidth ? 'w-full' : LAYOUT_VERTICAL ? 'w-full max-w-5xl' : 'w-full max-w-3xl'
            }`}>
            <Transition
              show={!onLoading}
              appear={true}
              enter='transition ease-in-out duration-700 transform order-first'
              enterFrom='opacity-0 translate-y-16'
              enterTo='opacity-100'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 -translate-y-16'
              unmount={false}>
              {props.slotTop}
              {children}
            </Transition>
          </div>

          {showSidebar && (
            <div className='w-full flex-shrink-0 md:w-64 md:sticky md:top-24'>
              <SideBar {...props} />
            </div>
          )}

          {LAYOUT_VERTICAL && !fullWidth && (
            <div className='flex w-full max-w-5xl flex-col justify-center space-y-0 px-0 md:flex-row md:space-x-2 md:space-y-0'>
              <SideBar {...props} />
            </div>
          )}
        </div>
      </div>

      <Footer />

      <div className='fixed bottom-4 right-4 z-10'>
        <button
          type='button'
          title={locale.POST.TOP}
          className='tl-icon-btn bg-[var(--tl-surface)] shadow-sm'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <i className='fas fa-angle-up text-lg' />
        </button>
      </div>
    </div>
  )
}

/**
 * 首页
 * @param {*} props
 * @returns 此主题首页就是列表
 */
const LayoutIndex = props => {
  return <LayoutPostList {...props} />
}

/**
 * 文章列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  const { category, tag, keyword, latestPosts, posts } = props
  const router = useRouter()
  const useTimeline =
    siteConfig('THOUGHTLITE_HOME_TIMELINE', true, CONFIG) &&
    !category &&
    !tag &&
    !keyword &&
    !router?.query?.s &&
    (router.pathname === '/' || router.pathname === '/page/[page]')

  const latestCardPost = latestPosts?.[0] || posts?.[0]

  return (
    <>
      {category && (
        <div className='tl-timeline-day-label mb-4 border-0 pb-2'>
          <i className='mr-1 fas fa-folder-open' />
          {category}
        </div>
      )}
      {tag && (
        <div className='tl-timeline-day-label mb-4 border-0 pb-2'>#{tag}</div>
      )}

      {useTimeline &&
        siteConfig('THOUGHTLITE_HOME_LATEST_CARD', true, CONFIG) && (
          <LatestCard post={latestCardPost} />
        )}

      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogListPage {...props} useTimeline={useTimeline} />
      ) : (
        <BlogListScroll {...props} useTimeline={useTimeline} />
      )}
    </>
  )
}

/**
 * 文章详情页
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const router = useRouter()
  const { locale } = useGlobal()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(
        () => {
          if (isBrowser) {
            const article = document.querySelector('#article-wrapper #notion-article')
            if (!article) {
              router.push('/404').then(() => {
                console.warn('找不到页面', router.asPath)
              })
            }
          }
        },
        waiting404
      )
    }
  }, [post])
  return (
    <>
      {lock ? (
        <PostLock validPassword={validPassword} />
      ) : (
        post && (
          <article className='tl-card overflow-hidden p-5 md:p-8'>
            <header className='tl-article-hero mb-6 border-b border-[var(--tl-border)] pb-6'>
              <h1 className='tl-article-title'>
                {siteConfig('POST_TITLE_ICON') && (
                  <NotionIcon icon={post.pageIcon} />
                )}
                {post.title}
              </h1>
              <PostMeta post={post} />
            </header>
            <div id='article-wrapper' className='tl-prose-wrap'>
              <NotionPage post={post} />
              <ShareBar post={post} />
            </div>
            <section
              className='mt-8 border-t border-[var(--tl-border)] pt-6'
              aria-label={locale?.COMMON?.COMMENTS || 'Comments'}>
              <h2 className='mb-4 flex items-center gap-2 text-base font-semibold text-[var(--tl-text)]'>
                <i
                  className='far fa-comments text-[var(--tl-muted)]'
                  aria-hidden='true'
                />
                {locale?.COMMON?.COMMENTS || 'Comments'}
              </h2>
              <Comment frontMatter={post} />
            </section>
          </article>
        )
      )}
    </>
  )
}

/**
 * 404页
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  const router = useRouter()
  useEffect(() => {
    // 延时3秒如果加载失败就返回首页
    setTimeout(() => {
      const article = isBrowser && document.getElementById('article-wrapper')
      if (!article) {
        router.push('/').then(() => {
          // console.log('找不到页面', router.asPath)
        })
      }
    }, 3000)
  }, [])

  return <>
        <div className='tl-card mx-auto mt-24 max-w-md px-8 py-12 text-center'>
            <div className='text-[var(--tl-text)]'>
                <h2 className='inline-block border-r-2 border-[var(--tl-border)] mr-2 px-3 py-2 align-top text-2xl font-semibold'><i className='mr-2 fas fa-spinner animate-spin' />404</h2>
                <div className='inline-block text-left h-32 leading-10 items-center text-[var(--tl-muted)]'>
                    <h2 className='m-0 p-0 text-base'>页面无法加载，即将返回首页</h2>
                </div>
            </div>
        </div>
    </>
}

/**
 * 搜索页
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const { locale } = useGlobal()
  useEffect(() => {
    if (isBrowser) {
      const container = document.getElementById('posts-wrapper')
      if (keyword && container) {
        replaceSearchResult({
          doms: container,
          search: keyword,
          target: {
            element: 'span',
            className: 'text-red-500 border-b border-dashed'
          }
        })
      }
    }
  }, [router, keyword])

  return (
    <>
      <TlPageHero
        title={locale?.NAV?.SEARCH || 'Search'}
        description={keyword ? `「${keyword}」` : undefined}
      />
      <div className='mb-8'>
        <SearchInput {...props} />
      </div>
      <LayoutPostList {...props} />
    </>
  )
}

/**
 * 归档列表
 * @param {*} props
 * @returns 按照日期将文章分组排序
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  const { locale } = useGlobal()
  const keys = Object.keys(archivePosts || {}).sort((a, b) =>
    String(b).localeCompare(String(a), undefined, {
      sensitivity: 'base',
      numeric: true
    })
  )
  return (
    <>
      <TlPageHero title={locale?.NAV?.ARCHIVE || 'Archive'} />
      <div className='w-full pb-16'>
        {keys.map(archiveTitle => (
          <BlogListArchive
            key={archiveTitle}
            archiveTitle={archiveTitle}
            archivePosts={archivePosts}
          />
        ))}
      </div>
    </>
  )
}

/**
 * 分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const { locale } = useGlobal()
  return (
    <>
      <TlPageHero title={locale?.COMMON?.CATEGORY || 'Categories'} />
      <div id='category-list' className='flex flex-wrap'>
        {categoryOptions?.map(category => (
          <SmartLink
            key={category.name}
            href={`/category/${category.name}`}
            className='tl-chip'>
            <i className='fas fa-folder opacity-70' aria-hidden='true' />
            {category.name}
            <span className='text-[var(--tl-faint)]'>({category.count})</span>
          </SmartLink>
        ))}
      </div>
    </>
  )
}

/**
 * 标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()
  return (
    <>
      <TlPageHero title={locale?.COMMON?.TAGS || 'Tags'} />
      <div id='tags-list' className='flex flex-wrap'>
        {tagOptions.map(tag => (
          <SmartLink
            key={tag.name}
            href={`/tag/${encodeURIComponent(tag.name)}`}
            className={`tl-chip notion-${tag.color}_background`}>
            <i className='fas fa-tag opacity-70' aria-hidden='true' />
            {tag.name}
            {tag.count ? (
              <span className='text-[var(--tl-faint)]'>({tag.count})</span>
            ) : null}
          </SmartLink>
        ))}
      </div>
    </>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
