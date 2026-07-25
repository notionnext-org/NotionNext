import Comment from '@/components/Comment'
import LazyImage from '@/components/LazyImage'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { themeConsoleStyle } from '@/lib/themeConsoleStyle'
import { useRouter } from 'next/router'
import { Moon, Sun } from '@/components/HeroIcons'
import CONFIG from './config'

const c = key => siteConfig(key, CONFIG[key], CONFIG)
const list = key => String(c(key) || '').split(',').map(item => item.trim()).filter(Boolean)

const ActionLink = ({ href, children, primary }) => (
  <SmartLink
    href={href}
    aria-label={children}
    target={href?.startsWith('http') ? '_blank' : undefined}
    rel={href?.startsWith('http') ? 'noreferrer' : undefined}
    className={`inline-flex min-h-[46px] items-center justify-center rounded-md px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-300 ${
      primary ? 'opc-primary-action' : 'opc-secondary-action border'
    }`}>
    {children}
  </SmartLink>
)

const WorkStep = ({ step, name, detail }) => (
  <div className='opc-portal-card rounded-md border p-4'>
    <div className='opc-status inline-flex rounded-md px-2 py-1 text-xs font-medium'>{step}</div>
    <div className='mt-3 text-sm font-semibold'>{name}</div>
    <div className='opc-muted mt-2 text-sm leading-6'>{detail}</div>
  </div>
)

const WorkflowNote = () => (
  <div className='opc-method rounded-md border p-4 md:p-5'>
    <div className='text-sm font-semibold'>协作方法</div>
    <p className='opc-muted mt-2 text-sm leading-6'>
      每个 AI 项目都按一间小公司启动：总监定方向，助理管交接，策划、市场、美术、技术分别推进，最后由总监验收和派发下一步。
    </p>
    <div className='mt-3 flex flex-wrap gap-2 text-xs'>
      {['一轮一任务', '文档先交接', '人只做监督修正'].map(item => (
        <span key={item} className='opc-status rounded-md px-2.5 py-1'>{item}</span>
      ))}
    </div>
  </div>
)

const OpcFooter = () => (
  <footer className='opc-footer px-5 pb-8 text-xs md:px-10'>
    <div className='mx-auto flex max-w-6xl flex-col gap-2 border-t pt-5 sm:flex-row sm:items-center sm:justify-between'>
      <div className='opc-muted'>
        由 <SmartLink href='https://notionnext.tangly1024.com/'>NotionNext</SmartLink> 开发 · 主题 OPC
      </div>
      <div className='flex flex-wrap gap-3'>
        <SmartLink href='https://notionnext.tangly1024.com/user-guide/start-here'>NotionNext 帮助</SmartLink>
        <SmartLink href='https://notionnext.tangly1024.com/user-guide/themes/opc'>OPC 主题文档</SmartLink>
      </div>
    </div>
  </footer>
)

const SERVICE_DETAILS = {
  游戏: '玩法原型 · 实验中',
  小说: '世界观与连载 · 持续记录',
  短剧: '脚本与分镜 · 原型中',
  工具产品: '独立产品 · 打磨中',
  流量媒体: '获客渠道 · 自动搭建',
  AI企业工作流: '组织协作 · 自动运行',
  量化交易: '策略观察 · 长期研究'
}

const ServiceCard = ({ name }) => (
  <div className='opc-portal-card rounded-md border p-4'>
    <div className='text-sm font-semibold'>{name}</div>
    <div className='opc-muted mt-2 text-xs leading-5'>
      {SERVICE_DETAILS[name] || '持续实验和迭代'}
    </div>
  </div>
)

const getPostHref = post => post?.href || (post?.slug ? `/${post.slug}` : '#')

const SectionTitle = ({ title, description }) => (
  <div className='mb-8'>
    <div className='opc-kicker inline-flex rounded-md border px-3 py-2 text-xs font-medium'>
      {c('OPC_NAME')}
    </div>
    <h1 className='mt-5 text-3xl font-semibold sm:text-4xl'>{title}</h1>
    {description && <p className='opc-muted mt-3 max-w-2xl text-sm leading-6'>{description}</p>}
  </div>
)

const PostCard = ({ post }) => (
  <SmartLink href={getPostHref(post)} className='opc-portal-card block rounded-md border p-5 transition'>
    <div className='opc-muted text-xs'>{post?.publishDay || post?.lastEditedDay || '长期记录'}</div>
    <h2 className='mt-3 text-lg font-semibold'>{post?.title}</h2>
    {post?.summary && <p className='opc-muted mt-3 line-clamp-2 text-sm leading-6'>{post.summary}</p>}
  </SmartLink>
)

const Pager = ({ page = 1, postCount = 0, posts = [] }) => {
  const router = useRouter()
  const perPage = Number(siteConfig('POSTS_PER_PAGE')) || posts.length || postCount || 1
  const currentPage = Number(page) || 1
  const totalPage = Math.ceil(postCount / perPage)
  const basePath = router.asPath.split('?')[0].replace(/\/page\/[1-9]\d*/, '').replace(/\/$/, '')

  if (totalPage <= 1) return null

  return (
    <div className='mt-8 flex items-center justify-between text-sm'>
      <SmartLink
        href={currentPage <= 2 ? `${basePath || '/'}` : `${basePath}/page/${currentPage - 1}`}
        className={currentPage > 1 ? 'opc-secondary-action rounded-md border px-4 py-2' : 'invisible'}>
        上一页
      </SmartLink>
      <span className='opc-muted'>{currentPage} / {totalPage}</span>
      <SmartLink
        href={`${basePath}/page/${currentPage + 1}`}
        className={currentPage < totalPage ? 'opc-secondary-action rounded-md border px-4 py-2' : 'invisible'}>
        下一页
      </SmartLink>
    </div>
  )
}

const PageShell = ({ title, description, children }) => (
  <main className='min-h-screen px-5 py-10 md:px-10'>
    <div className='mx-auto max-w-4xl'>
      <SectionTitle title={title} description={description} />
      {children}
    </div>
  </main>
)

const getIconSrc = icon =>
  typeof icon === 'string' && icon.startsWith('/icons/')
    ? `https://www.notion.so${icon}`
    : icon

const SiteIcon = ({ icon, title }) => {
  const iconSrc = getIconSrc(icon)

  if (typeof iconSrc === 'string' && (iconSrc.startsWith('http') || iconSrc.startsWith('data:') || iconSrc.startsWith('/'))) {
    return (
      <LazyImage
        priority
        src={iconSrc}
        fallbackSrc='/avatar.svg'
        alt={title}
        className='h-16 w-16 rounded-md object-cover'
      />
    )
  }

  return (
    <div className='flex h-16 w-16 items-center justify-center rounded-md text-3xl'>
      {iconSrc || 'T'}
    </div>
  )
}

const SiteCover = ({ src, title }) => {
  if (!src) return null

  return (
    <div className='opc-cover my-5 overflow-hidden rounded-md border'>
      <LazyImage
        priority
        src={src}
        fallbackSrc='/bg_image.jpg'
        alt={`${title} 封面`}
        className='h-full w-full object-cover'
      />
    </div>
  )
}

const NowPanel = () => (
  <section className='opc-panel mx-auto max-w-6xl rounded-lg border p-5 md:p-6'>
    <div>
      <div className='opc-muted text-sm'>近期方向</div>
      <h2 className='mt-1 text-xl font-semibold'>{c('OPC_NOW_TITLE')}</h2>
    </div>
    <p className='opc-muted mt-4 text-sm leading-6'>{c('OPC_NOW_DESCRIPTION')}</p>
    <div className='mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
      {list('OPC_NOW_ITEMS').map(item => (
        <ServiceCard key={item} name={item} />
      ))}
    </div>
  </section>
)

const OpcDarkModeButton = () => {
  const { isDarkMode, toggleDarkMode } = useGlobal()

  return (
    <button
      type='button'
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Light mode' : 'Dark mode'}
      className='opc-dark-mode-button fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-md border transition focus:outline-none focus:ring-2 focus:ring-offset-2 md:bottom-8 md:right-8'>
      <span className='h-5 w-5'>{isDarkMode ? <Sun /> : <Moon />}</span>
    </button>
  )
}

const Style = () => (
  <style jsx global>{`
    ${themeConsoleStyle('opc', CONFIG)}

    #theme-opc {
      background:
        linear-gradient(90deg, color-mix(in srgb, var(--opc-console-border) 46%, transparent) 1px, transparent 1px),
        linear-gradient(color-mix(in srgb, var(--opc-console-border) 40%, transparent) 1px, transparent 1px),
        linear-gradient(135deg, var(--opc-console-bg) 0%, color-mix(in srgb, var(--opc-console-bg) 80%, var(--opc-console-card)) 55%, color-mix(in srgb, var(--opc-console-primary) 5%, var(--opc-console-bg)) 100%);
      background-size: 72px 72px, 72px 72px, auto;
      color: var(--opc-console-text);
    }

    #theme-opc .opc-muted {
      color: var(--opc-console-text-secondary);
    }

    #theme-opc .opc-kicker,
    #theme-opc .opc-secondary-action,
    #theme-opc .opc-method,
    #theme-opc .opc-portal-card {
      border-color: color-mix(in srgb, var(--opc-console-border) 88%, transparent);
      background-color: color-mix(in srgb, var(--opc-console-card) 82%, transparent);
      color: var(--opc-console-text);
    }

    #theme-opc .opc-kicker {
      color: var(--opc-console-primary);
    }

    #theme-opc .opc-primary-action {
      background-color: var(--opc-console-primary);
      color: var(--opc-console-bg);
      box-shadow: 0 18px 46px color-mix(in srgb, var(--opc-console-primary) 20%, transparent);
    }

    #theme-opc .opc-primary-action:hover {
      background-color: color-mix(in srgb, var(--opc-console-primary) 86%, var(--opc-console-text));
    }

    #theme-opc .opc-secondary-action:hover,
    #theme-opc .opc-portal-card:hover {
      border-color: var(--opc-console-primary);
      background-color: color-mix(in srgb, var(--opc-console-primary) 7%, var(--opc-console-card));
    }

    #theme-opc .opc-panel {
      border-color: color-mix(in srgb, var(--opc-console-border) 92%, transparent);
      background-color: color-mix(in srgb, var(--opc-console-card) 92%, transparent);
      box-shadow: 0 24px 70px color-mix(in srgb, var(--opc-console-text) 9%, transparent);
    }

    #theme-opc .opc-divider {
      border-color: color-mix(in srgb, var(--opc-console-border) 90%, transparent);
    }

    #theme-opc .opc-footer > div {
      border-color: color-mix(in srgb, var(--opc-console-border) 90%, transparent);
    }

    #theme-opc .opc-footer a {
      color: var(--opc-console-primary);
    }

    #theme-opc .opc-footer a:hover {
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    #theme-opc .opc-cover {
      aspect-ratio: 16 / 9;
      border-color: color-mix(in srgb, var(--opc-console-border) 90%, transparent);
      background-color: color-mix(in srgb, var(--opc-console-border) 24%, transparent);
    }

    #theme-opc .opc-status {
      background-color: color-mix(in srgb, var(--opc-console-primary) 12%, transparent);
      color: var(--opc-console-primary);
    }

    #theme-opc .opc-dark-mode-button {
      border-color: color-mix(in srgb, var(--opc-console-border) 88%, transparent);
      background-color: color-mix(in srgb, var(--opc-console-card) 92%, transparent);
      color: var(--opc-console-text);
      box-shadow: 0 14px 40px color-mix(in srgb, var(--opc-console-text) 12%, transparent);
    }

    #theme-opc .opc-dark-mode-button:hover {
      border-color: var(--opc-console-primary);
      color: var(--opc-console-primary);
      transform: translateY(-1px);
    }

    #theme-opc .notion {
      color: #111827;
    }

    .dark #theme-opc {
      background:
        radial-gradient(circle at 18% 18%, color-mix(in srgb, var(--opc-console-primary) 18%, transparent) 0, transparent 28%),
        linear-gradient(90deg, color-mix(in srgb, var(--opc-console-border) 44%, transparent) 1px, transparent 1px),
        linear-gradient(color-mix(in srgb, var(--opc-console-border) 34%, transparent) 1px, transparent 1px),
        linear-gradient(135deg, var(--opc-console-bg) 0%, #07111f 56%, #030712 100%);
      background-size: auto, 72px 72px, 72px 72px, auto;
    }

    .dark #theme-opc .opc-panel {
      background-color: color-mix(in srgb, var(--opc-console-card) 90%, transparent);
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.34);
    }

    .dark #theme-opc .opc-kicker,
    .dark #theme-opc .opc-secondary-action,
    .dark #theme-opc .opc-method,
    .dark #theme-opc .opc-portal-card {
      background-color: color-mix(in srgb, var(--opc-console-card) 72%, transparent);
    }

    .dark #theme-opc .opc-primary-action {
      color: #020617;
    }

    .dark #theme-opc .notion {
      color: var(--opc-console-text);
    }
  `}</style>
)

const LayoutBase = ({ children }) => (
  <div id='theme-opc' className={`${siteConfig('FONT_STYLE')} min-h-screen`}>
    <Style />
    <OpcDarkModeButton />
    {children}
    <OpcFooter />
  </div>
)

const LayoutIndex = props => {
  const siteIcon = props?.siteInfo?.icon || siteConfig('AVATAR', '/avatar.svg', props?.NOTION_CONFIG) || '/avatar.svg'
  const siteCover = props?.siteInfo?.pageCover || siteConfig('HOME_BANNER_IMAGE', '', props?.NOTION_CONFIG)

  return (
    <main className='min-h-screen overflow-hidden px-5 py-6 md:px-10'>
      <nav className='mx-auto flex max-w-6xl items-center justify-between'>
        <SmartLink href='/' className='text-sm font-semibold tracking-[0.12em]'>
          {c('OPC_NAME')}
        </SmartLink>
        <span className='opc-status rounded-md px-2.5 py-1 text-xs font-medium'>{c('OPC_STATUS_TEXT')}</span>
      </nav>

      <section className='mx-auto grid min-h-[calc(100vh-72px)] max-w-6xl items-center gap-8 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-12'>
        <div>
          <div className='opc-kicker mb-6 inline-flex rounded-md border px-3 py-2 text-xs font-medium tracking-[0.12em]'>
            {c('OPC_KICKER')}
          </div>
          <h1 className='max-w-3xl text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl'>
            {c('OPC_TITLE')}
          </h1>
          <div className='mt-5 text-xl font-semibold sm:text-2xl'>{c('OPC_SUBTITLE')}</div>
          <p className='opc-muted mt-6 max-w-2xl text-base leading-7 sm:mt-7 sm:text-lg sm:leading-8'>
            {c('OPC_DESCRIPTION')}
          </p>
          <div className='mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row'>
            <ActionLink href={c('OPC_PRIMARY_URL')} primary>
              {c('OPC_PRIMARY_TEXT')}
            </ActionLink>
            <ActionLink href={c('OPC_SECONDARY_URL')}>{c('OPC_SECONDARY_TEXT')}</ActionLink>
          </div>
          <div className='mt-6 flex flex-wrap gap-2 text-xs sm:mt-8'>
            {['独立开发', '开源维护', '长期写作'].map(item => (
              <span key={item} className='opc-secondary-action rounded-md border px-3 py-2'>
                {item}
              </span>
            ))}
          </div>
        </div>

        <aside className='opc-panel rounded-lg border p-5 backdrop-blur'>
          <div className='opc-divider flex items-center gap-4 border-b pb-5'>
            <SiteIcon icon={siteIcon} title={c('OPC_TITLE')} />
            <div>
              <div className='opc-muted text-sm'>自动工作台</div>
              <div className='mt-1 text-xl font-semibold'>{c('OPC_CARD_TITLE')}</div>
            </div>
          </div>

          <SiteCover src={siteCover} title={c('OPC_TITLE')} />

          <div className='opc-divider border-t pt-5'>
            <div className='mb-2 text-sm font-semibold'>我的角色</div>
            <p className='opc-muted text-sm leading-6'>{c('OPC_CARD_DESCRIPTION')}</p>
          </div>
        </aside>
      </section>
      <div className='pb-10 md:pb-14'>
        <section className='opc-panel mx-auto mb-6 max-w-6xl rounded-lg border p-5 md:p-6'>
          <div className='grid gap-5 lg:grid-cols-[0.9fr_1.1fr]'>
            <WorkflowNote />
            <div className='grid gap-3 sm:grid-cols-3'>
              <WorkStep step='01' name='判断方向' detail='筛选值得投入的方向，定义目标和边界。' />
              <WorkStep step='02' name='分配任务' detail='让多个 AI 组织彼此交接任务，自动产内容、做原型和跑策略。' />
              <WorkStep step='03' name='监督修正' detail='人只监督结果，在关键时刻修正方向，不再做流程卡点。' />
            </div>
          </div>
        </section>
        <NowPanel />
      </div>
    </main>
  )
}

const LayoutSlug = props => (
  <main className='min-h-screen px-5 py-10 md:px-10'>
    <article id='article-wrapper' className='opc-panel mx-auto max-w-3xl rounded-lg border p-6 md:p-10'>
      {props.post ? (
        <>
          <NotionPage {...props} />
          <ShareBar post={props.post} />
          <Comment frontMatter={props.post} />
        </>
      ) : (
        <EmptyState title='没有找到内容' />
      )}
    </article>
  </main>
)

const EmptyPage = () => <LayoutIndex />
const EmptyState = ({ title = '暂无内容' }) => <div className='opc-muted rounded-md border border-dashed p-8 text-center text-sm'>{title}</div>

const LayoutPostList = props => {
  const posts = props.posts || []

  return (
    <PageShell title='长期记录' description='AI、产品、写作和一人公司实验的公开记录。'>
      <div id='posts-wrapper' className='grid gap-4'>
        {posts.length > 0 ? posts.map(post => <PostCard key={post.id || post.slug || post.title} post={post} />) : <EmptyState />}
      </div>
      <Pager {...props} posts={posts} />
    </PageShell>
  )
}

const LayoutSearch = props => (
  <PageShell title='搜索结果' description={props.keyword ? `关键词：${props.keyword}` : '站内搜索结果。'}>
    <div id='posts-wrapper' className='grid gap-4'>
      {(props.posts || []).length > 0
        ? props.posts.map(post => <PostCard key={post.id || post.slug || post.title} post={post} />)
        : <EmptyState title='没有找到匹配内容' />}
    </div>
  </PageShell>
)

const LayoutArchive = props => (
  <PageShell title='归档' description='按时间整理的长期记录。'>
    <div className='grid gap-6'>
      {Object.keys(props.archivePosts || {}).length > 0
        ? Object.keys(props.archivePosts).map(year => (
          <section key={year}>
            <h2 className='mb-3 text-xl font-semibold'>{year}</h2>
            <div className='grid gap-3'>
              {(props.archivePosts[year] || []).map(post => <PostCard key={post.id || post.slug || post.title} post={post} />)}
            </div>
          </section>
        ))
        : <EmptyState />}
    </div>
  </PageShell>
)

const LayoutCategoryIndex = props => (
  <PageShell title='分类' description='按主题浏览文章。'>
    <div className='flex flex-wrap gap-3'>
      {(props.categoryOptions || []).map(category => (
        <SmartLink key={category.name} href={`/category/${category.name}`} className='opc-secondary-action rounded-md border px-4 py-2 text-sm'>
          {category.name}{category.count ? ` (${category.count})` : ''}
        </SmartLink>
      ))}
    </div>
  </PageShell>
)

const LayoutTagIndex = props => (
  <PageShell title='标签' description='按标签浏览文章。'>
    <div className='flex flex-wrap gap-3'>
      {(props.tagOptions || []).map(tag => (
        <SmartLink key={tag.name} href={`/tag/${encodeURIComponent(tag.name)}`} className='opc-secondary-action rounded-md border px-4 py-2 text-sm'>
          {tag.name}{tag.count ? ` (${tag.count})` : ''}
        </SmartLink>
      ))}
    </div>
  </PageShell>
)

const Layout404 = () => (
  <PageShell title='页面不存在' description='这个地址没有找到对应内容。'>
    <ActionLink href='/' primary>返回首页</ActionLink>
  </PageShell>
)

export {
  Layout404,
  LayoutBase,
  LayoutArchive,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
