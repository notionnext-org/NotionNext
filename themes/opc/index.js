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
const list = key =>
  String(c(key) || '')
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)

const ActionLink = ({ href, children, primary }) => (
  <SmartLink
    href={href}
    aria-label={typeof children === 'string' ? children : undefined}
    target={href?.startsWith('http') ? '_blank' : undefined}
    rel={href?.startsWith('http') ? 'noreferrer' : undefined}
    className={`inline-flex min-h-[46px] items-center justify-center rounded-md px-5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-300 ${
      primary ? 'opc-primary-action' : 'opc-secondary-action border'
    }`}
  >
    {children}
  </SmartLink>
)

const PIPELINE_STEPS = [
  { step: '01', name: '定义', detail: '明确目标与边界' },
  { step: '02', name: '执行', detail: '只领取一张任务单' },
  { step: '03', name: '产物', detail: '留下可检查的结果' },
  { step: '04', name: '验收', detail: '人工判断是否继续' }
]

const PipelineRail = () => (
  <section className='opc-pipeline' aria-labelledby='opc-pipeline-title'>
    <div className='opc-section-index'>02 / 工作系统</div>
    <div className='mt-6 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16'>
      <div>
        <h2
          id='opc-pipeline-title'
          className='opc-display text-4xl leading-none sm:text-5xl'
        >
          一轮，
          <br />
          只推进一件事。
        </h2>
        <p className='opc-muted mt-6 max-w-md text-sm leading-7 sm:text-base'>
          任务先有边界，再进入执行。每一轮都必须留下可打开、可检查、可继续迭代的真实产物。
        </p>
      </div>
      <div className='opc-pipeline-rail'>
        {PIPELINE_STEPS.map((item, index) => (
          <div key={item.name} className='opc-pipeline-step'>
            <div className='opc-pipeline-node' aria-hidden='true'>
              {index === 1 ? <span /> : null}
            </div>
            <div className='opc-mono text-xs'>{item.step}</div>
            <div>
              <div className='opc-mono text-sm font-semibold tracking-[0.12em]'>
                {item.name}
              </div>
              <div className='opc-muted mt-1 text-sm'>{item.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const OpcFooter = () => (
  <footer className='opc-footer px-5 pb-8 text-xs md:px-10'>
    <div className='mx-auto flex max-w-6xl flex-col gap-2 border-t pt-5 sm:flex-row sm:items-center sm:justify-between'>
      <div className='opc-muted'>
        由{' '}
        <SmartLink href='https://notionnext.tangly1024.com/'>
          NotionNext
        </SmartLink>{' '}
        开发 · 主题 OPC
      </div>
      <div className='flex flex-wrap gap-3'>
        <SmartLink href='https://notionnext.tangly1024.com/user-guide/start-here'>
          NotionNext 帮助
        </SmartLink>
        <SmartLink href='https://notionnext.tangly1024.com/user-guide/themes/opc'>
          OPC 主题文档
        </SmartLink>
      </div>
    </div>
  </footer>
)

const SERVICE_DETAILS = {
  游戏: { detail: '验证核心玩法循环', status: '原型中', code: 'PLAY' },
  小说: { detail: '世界观与长篇连载', status: '写作中', code: 'STORY' },
  短剧: { detail: '脚本、分镜与成片实验', status: '测试中', code: 'FILM' },
  工具产品: {
    detail: '独立产品与效率工具',
    status: '构建中',
    code: 'PRODUCT'
  },
  流量媒体: { detail: '内容与获客渠道实验', status: '运行中', code: 'MEDIA' },
  AI企业工作流: {
    detail: '可验收的任务流水线',
    status: '运行中',
    code: 'SYSTEM'
  },
  量化交易: { detail: '策略观察与长期研究', status: '研究中', code: 'QUANT' }
}

const ServiceCard = ({ name, index, media }) => {
  const meta = SERVICE_DETAILS[name] || {
    detail: '持续实验和迭代',
    status: '探索中',
    code: 'LAB'
  }
  const featured = index === 0

  return (
    <div
      className={`opc-project-card group ${featured ? 'opc-project-featured' : ''}`}
    >
      {featured && media && (
        <div className='opc-project-media' aria-hidden='true'>
          <LazyImage
            src={media}
            fallbackSrc='/bg_image.jpg'
            alt=''
            className='h-full w-full object-cover'
          />
        </div>
      )}
      {featured && <div className='opc-project-scrim' aria-hidden='true' />}
      <div className='flex items-center justify-between gap-3'>
        <span className='opc-mono text-[10px] tracking-[0.18em]'>
          {String(index + 1).padStart(2, '0')} / {meta.code}
        </span>
        <span className='opc-live-label'>
          <i />
          {meta.status}
        </span>
      </div>
      <div className='mt-auto pt-12'>
        <h3
          className={`${featured ? 'text-3xl sm:text-4xl' : 'text-xl'} font-semibold tracking-[-0.03em]`}
        >
          {name}
        </h3>
        <p className='opc-muted mt-3 text-sm leading-6'>{meta.detail}</p>
      </div>
      <div className='opc-project-arrow' aria-hidden='true'>
        ↗
      </div>
    </div>
  )
}

const getPostHref = post => post?.href || (post?.slug ? `/${post.slug}` : '#')

const SectionTitle = ({ title, description }) => (
  <div className='mb-8'>
    <div className='opc-kicker inline-flex rounded-md border px-3 py-2 text-xs font-medium'>
      {c('OPC_NAME')}
    </div>
    <h1 className='mt-5 text-3xl font-semibold sm:text-4xl'>{title}</h1>
    {description && (
      <p className='opc-muted mt-3 max-w-2xl text-sm leading-6'>
        {description}
      </p>
    )}
  </div>
)

const PostCard = ({ post }) => (
  <SmartLink
    href={getPostHref(post)}
    className='opc-portal-card block rounded-md border p-5 transition'
  >
    <div className='opc-muted text-xs'>
      {post?.publishDay || post?.lastEditedDay || '长期记录'}
    </div>
    <h2 className='mt-3 text-lg font-semibold'>{post?.title}</h2>
    {post?.summary && (
      <p className='opc-muted mt-3 line-clamp-2 text-sm leading-6'>
        {post.summary}
      </p>
    )}
  </SmartLink>
)

const Pager = ({ page = 1, postCount = 0, posts = [] }) => {
  const router = useRouter()
  const perPage =
    Number(siteConfig('POSTS_PER_PAGE')) || posts.length || postCount || 1
  const currentPage = Number(page) || 1
  const totalPage = Math.ceil(postCount / perPage)
  const basePath = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')

  if (totalPage <= 1) return null

  return (
    <div className='mt-8 flex items-center justify-between text-sm'>
      <SmartLink
        href={
          currentPage <= 2
            ? `${basePath || '/'}`
            : `${basePath}/page/${currentPage - 1}`
        }
        className={
          currentPage > 1
            ? 'opc-secondary-action rounded-md border px-4 py-2'
            : 'invisible'
        }
      >
        上一页
      </SmartLink>
      <span className='opc-muted'>
        {currentPage} / {totalPage}
      </span>
      <SmartLink
        href={`${basePath}/page/${currentPage + 1}`}
        className={
          currentPage < totalPage
            ? 'opc-secondary-action rounded-md border px-4 py-2'
            : 'invisible'
        }
      >
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

  if (
    typeof iconSrc === 'string' &&
    (iconSrc.startsWith('http') ||
      iconSrc.startsWith('data:') ||
      iconSrc.startsWith('/'))
  ) {
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

const TaskConsole = ({ siteIcon, siteCover }) => (
  <aside className='opc-console' aria-label='实时任务流水线'>
    <div className='opc-console-topbar'>
      <div className='flex items-center gap-2'>
        <span className='opc-console-dot bg-red-400' />
        <span className='opc-console-dot bg-amber-300' />
        <span className='opc-console-dot bg-emerald-400' />
      </div>
      <span className='opc-mono text-[10px] tracking-[0.16em]'>
        TANGLY / OPS
      </span>
      <span className='opc-signal' aria-hidden='true'>
        <i />
        <i />
        <i />
      </span>
    </div>

    <div className='opc-console-identity'>
      <SiteIcon icon={siteIcon} title={c('OPC_TITLE')} />
      <div>
        <div className='opc-mono text-[10px] tracking-[0.18em]'>
          ACTIVE WORKSPACE
        </div>
        <div className='mt-2 text-lg font-semibold'>{c('OPC_CARD_TITLE')}</div>
      </div>
    </div>

    {siteCover && (
      <div className='opc-console-cover'>
        <SiteCover src={siteCover} title={c('OPC_TITLE')} />
      </div>
    )}

    <div className='opc-task-list'>
      {[
        ['07:42', 'INGEST', '任务进入队列', 'done'],
        ['07:45', 'EXECUTE', '拆分最小验证目标', 'done'],
        ['08:12', 'ARTIFACT', '输出可检查产物', 'active'],
        ['NEXT', 'REVIEW', '等待人工验收', 'queued']
      ].map(([time, stage, detail, state]) => (
        <div key={stage} className={`opc-task-row opc-task-${state}`}>
          <span className='opc-mono opc-muted text-[10px]'>{time}</span>
          <span className='opc-mono text-xs font-semibold'>{stage}</span>
          <span className='opc-muted text-xs'>{detail}</span>
          <span className='opc-task-state' aria-hidden='true' />
        </div>
      ))}
    </div>

    <div className='opc-console-footer'>
      <span className='opc-mono'>OUTPUT / DELIVERABLE</span>
      <span className='opc-console-path'>/artifacts/latest</span>
    </div>
  </aside>
)

const NowPanel = ({ siteCover }) => (
  <section className='opc-projects' aria-labelledby='opc-now-title'>
    <div className='opc-section-index'>03 / 当前实验</div>
    <div className='mt-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end'>
      <h2
        id='opc-now-title'
        className='opc-display max-w-2xl text-4xl leading-[0.95] sm:text-6xl'
      >
        {c('OPC_NOW_TITLE')}
      </h2>
      <p className='opc-muted max-w-lg text-sm leading-7'>
        {c('OPC_NOW_DESCRIPTION')}
      </p>
    </div>
    <div className='mt-10 grid gap-px overflow-hidden border opc-project-grid sm:grid-cols-2 lg:grid-cols-4'>
      {list('OPC_NOW_ITEMS').map((item, index) => (
        <ServiceCard
          key={item}
          name={item}
          index={index}
          media={index === 0 ? siteCover : null}
        />
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
      className='opc-dark-mode-button fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-md border transition focus:outline-none focus:ring-2 focus:ring-offset-2 md:bottom-8 md:right-8'
    >
      <span className='h-5 w-5'>{isDarkMode ? <Sun /> : <Moon />}</span>
    </button>
  )
}

const Style = () => (
  <style jsx global>{`
    ${themeConsoleStyle('opc', CONFIG)}

    #theme-opc {
      background:
        linear-gradient(
          90deg,
          color-mix(in srgb, var(--opc-console-border) 46%, transparent) 1px,
          transparent 1px
        ),
        linear-gradient(
          color-mix(in srgb, var(--opc-console-border) 40%, transparent) 1px,
          transparent 1px
        ),
        linear-gradient(
          135deg,
          var(--opc-console-bg) 0%,
          color-mix(in srgb, var(--opc-console-bg) 80%, var(--opc-console-card))
            55%,
          color-mix(
              in srgb,
              var(--opc-console-primary) 5%,
              var(--opc-console-bg)
            )
            100%
        );
      background-size:
        72px 72px,
        72px 72px,
        auto;
      color: var(--opc-console-text);
    }

    #theme-opc .opc-muted {
      color: var(--opc-console-text-secondary);
    }

    #theme-opc .opc-kicker,
    #theme-opc .opc-secondary-action,
    #theme-opc .opc-method,
    #theme-opc .opc-portal-card {
      border-color: color-mix(
        in srgb,
        var(--opc-console-border) 88%,
        transparent
      );
      background-color: color-mix(
        in srgb,
        var(--opc-console-card) 82%,
        transparent
      );
      color: var(--opc-console-text);
    }

    #theme-opc .opc-kicker {
      color: var(--opc-console-primary);
    }

    #theme-opc .opc-primary-action {
      background-color: var(--opc-console-primary);
      color: var(--opc-console-bg);
      box-shadow: 0 18px 46px
        color-mix(in srgb, var(--opc-console-primary) 20%, transparent);
    }

    #theme-opc .opc-primary-action:hover {
      background-color: color-mix(
        in srgb,
        var(--opc-console-primary) 86%,
        var(--opc-console-text)
      );
    }

    #theme-opc .opc-secondary-action:hover,
    #theme-opc .opc-portal-card:hover {
      border-color: var(--opc-console-primary);
      background-color: color-mix(
        in srgb,
        var(--opc-console-primary) 7%,
        var(--opc-console-card)
      );
    }

    #theme-opc .opc-panel {
      border-color: color-mix(
        in srgb,
        var(--opc-console-border) 92%,
        transparent
      );
      background-color: color-mix(
        in srgb,
        var(--opc-console-card) 92%,
        transparent
      );
      box-shadow: 0 24px 70px
        color-mix(in srgb, var(--opc-console-text) 9%, transparent);
    }

    #theme-opc .opc-divider {
      border-color: color-mix(
        in srgb,
        var(--opc-console-border) 90%,
        transparent
      );
    }

    #theme-opc .opc-footer > div {
      border-color: color-mix(
        in srgb,
        var(--opc-console-border) 90%,
        transparent
      );
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
      border-color: color-mix(
        in srgb,
        var(--opc-console-border) 90%,
        transparent
      );
      background-color: color-mix(
        in srgb,
        var(--opc-console-border) 24%,
        transparent
      );
    }

    #theme-opc .opc-status {
      background-color: color-mix(
        in srgb,
        var(--opc-console-primary) 12%,
        transparent
      );
      color: var(--opc-console-primary);
    }

    #theme-opc .opc-dark-mode-button {
      border-color: color-mix(
        in srgb,
        var(--opc-console-border) 88%,
        transparent
      );
      background-color: color-mix(
        in srgb,
        var(--opc-console-card) 92%,
        transparent
      );
      color: var(--opc-console-text);
      box-shadow: 0 14px 40px
        color-mix(in srgb, var(--opc-console-text) 12%, transparent);
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
        radial-gradient(
          circle at 18% 18%,
          color-mix(in srgb, var(--opc-console-primary) 18%, transparent) 0,
          transparent 28%
        ),
        linear-gradient(
          90deg,
          color-mix(in srgb, var(--opc-console-border) 44%, transparent) 1px,
          transparent 1px
        ),
        linear-gradient(
          color-mix(in srgb, var(--opc-console-border) 34%, transparent) 1px,
          transparent 1px
        ),
        linear-gradient(
          135deg,
          var(--opc-console-bg) 0%,
          #07111f 56%,
          #030712 100%
        );
      background-size:
        auto,
        72px 72px,
        72px 72px,
        auto;
    }

    .dark #theme-opc .opc-panel {
      background-color: color-mix(
        in srgb,
        var(--opc-console-card) 90%,
        transparent
      );
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.34);
    }

    .dark #theme-opc .opc-kicker,
    .dark #theme-opc .opc-secondary-action,
    .dark #theme-opc .opc-method,
    .dark #theme-opc .opc-portal-card {
      background-color: color-mix(
        in srgb,
        var(--opc-console-card) 72%,
        transparent
      );
    }

    .dark #theme-opc .opc-primary-action {
      color: #020617;
    }

    .dark #theme-opc .notion {
      color: var(--opc-console-text);
    }

    #theme-opc {
      --opc-line: color-mix(
        in srgb,
        var(--opc-console-border) 76%,
        transparent
      );
      --opc-soft: color-mix(in srgb, var(--opc-console-card) 62%, transparent);
      background:
        radial-gradient(
          circle at 72% 12%,
          color-mix(in srgb, var(--opc-console-primary) 10%, transparent),
          transparent 28rem
        ),
        linear-gradient(
          90deg,
          color-mix(in srgb, var(--opc-console-border) 24%, transparent) 1px,
          transparent 1px
        ),
        var(--opc-console-bg);
      background-size:
        auto,
        min(8vw, 96px) 100%,
        auto;
      letter-spacing: -0.01em;
    }

    #theme-opc .opc-display {
      font-family: 'Arial Black', 'PingFang SC', 'Microsoft YaHei', sans-serif;
      font-weight: 900;
      letter-spacing: -0.065em;
    }

    #theme-opc .opc-mono,
    #theme-opc .opc-section-index {
      font-family: 'IBM Plex Mono', 'JetBrains Mono', Consolas, monospace;
    }

    #theme-opc .opc-section-index {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--opc-console-primary);
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.18em;
    }

    #theme-opc .opc-section-index::before {
      width: 1.75rem;
      height: 1px;
      content: '';
      background: currentColor;
    }

    #theme-opc .opc-nav {
      border-bottom: 1px solid var(--opc-line);
    }

    #theme-opc .opc-wordmark::before {
      display: inline-block;
      width: 0.52rem;
      height: 0.52rem;
      margin-right: 0.7rem;
      content: '';
      background: var(--opc-console-primary);
      box-shadow: 0 0 20px
        color-mix(in srgb, var(--opc-console-primary) 65%, transparent);
    }

    #theme-opc .opc-live-label {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-family: 'IBM Plex Mono', 'JetBrains Mono', Consolas, monospace;
      color: var(--opc-console-text-secondary);
      font-size: 0.62rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      white-space: nowrap;
    }

    #theme-opc .opc-live-label i {
      width: 0.42rem;
      height: 0.42rem;
      border-radius: 999px;
      background: #55d98b;
      box-shadow: 0 0 0 4px rgba(85, 217, 139, 0.12);
      animation: opc-pulse 2s ease-in-out infinite;
    }

    #theme-opc .opc-hero-title {
      font-size: clamp(3.15rem, 7.1vw, 7.35rem);
      line-height: 0.88;
    }

    #theme-opc .opc-hero-title span {
      display: block;
    }

    #theme-opc .opc-outline-line {
      color: transparent;
      -webkit-text-stroke: 1.5px var(--opc-console-text);
      text-wrap: balance;
    }

    #theme-opc .opc-hero-meta,
    #theme-opc .opc-hero-meta > div {
      border-color: var(--opc-line);
    }

    #theme-opc .opc-console {
      position: relative;
      overflow: hidden;
      border: 1px solid
        color-mix(
          in srgb,
          var(--opc-console-primary) 34%,
          var(--opc-console-border)
        );
      background: color-mix(in srgb, var(--opc-console-card) 88%, transparent);
      box-shadow: 0 2rem 6rem
        color-mix(in srgb, var(--opc-console-text) 13%, transparent);
      transform: rotate(1.25deg);
      backdrop-filter: blur(18px);
    }

    #theme-opc .opc-console::before {
      position: absolute;
      z-index: 0;
      inset: 0;
      content: '';
      pointer-events: none;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 4px,
        color-mix(in srgb, var(--opc-console-primary) 3%, transparent) 5px
      );
    }

    #theme-opc .opc-console > * {
      position: relative;
      z-index: 1;
    }

    #theme-opc .opc-console-topbar,
    #theme-opc .opc-console-identity,
    #theme-opc .opc-console-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      border-color: var(--opc-line);
    }

    #theme-opc .opc-console-topbar {
      padding: 0.85rem 1rem;
      border-bottom: 1px solid var(--opc-line);
    }

    #theme-opc .opc-console-dot {
      width: 0.45rem;
      height: 0.45rem;
      border-radius: 999px;
    }

    #theme-opc .opc-signal {
      display: flex;
      align-items: flex-end;
      gap: 2px;
      height: 0.75rem;
    }

    #theme-opc .opc-signal i {
      width: 2px;
      background: var(--opc-console-primary);
    }

    #theme-opc .opc-signal i:nth-child(1) {
      height: 35%;
    }
    #theme-opc .opc-signal i:nth-child(2) {
      height: 65%;
    }
    #theme-opc .opc-signal i:nth-child(3) {
      height: 100%;
    }

    #theme-opc .opc-console-identity {
      justify-content: flex-start;
      padding: 1.25rem;
      border-bottom: 1px solid var(--opc-line);
    }

    #theme-opc .opc-console-identity img,
    #theme-opc .opc-console-identity > div:first-child {
      width: 3rem;
      height: 3rem;
      border-radius: 0;
    }

    #theme-opc .opc-console-cover {
      padding: 1.25rem 1.25rem 0;
    }

    #theme-opc .opc-console-cover .opc-cover {
      height: 10rem;
      margin: 0;
      border-radius: 0;
      filter: saturate(0.75) contrast(1.08);
    }

    #theme-opc .opc-task-list {
      padding: 1rem 1.25rem;
    }

    #theme-opc .opc-task-row {
      display: grid;
      grid-template-columns: 3rem 4.9rem 1fr 0.6rem;
      align-items: center;
      gap: 0.7rem;
      padding: 0.8rem 0;
      border-bottom: 1px solid var(--opc-line);
    }

    #theme-opc .opc-task-row:last-child {
      border-bottom: 0;
    }

    #theme-opc .opc-task-state {
      width: 0.45rem;
      height: 0.45rem;
      border: 1px solid var(--opc-console-border);
      border-radius: 999px;
    }

    #theme-opc .opc-task-done .opc-task-state {
      background: #55d98b;
      border-color: #55d98b;
    }
    #theme-opc .opc-task-active {
      color: var(--opc-console-primary);
    }
    #theme-opc .opc-task-active .opc-task-state {
      border-color: var(--opc-console-primary);
      background: var(--opc-console-primary);
      box-shadow: 0 0 0 5px
        color-mix(in srgb, var(--opc-console-primary) 16%, transparent);
      animation: opc-pulse 1.5s ease-in-out infinite;
    }
    #theme-opc .opc-task-queued {
      opacity: 0.52;
    }

    #theme-opc .opc-console-footer {
      padding: 0.85rem 1.25rem;
      border-top: 1px solid var(--opc-line);
      font-size: 0.58rem;
      letter-spacing: 0.1em;
    }

    #theme-opc .opc-console-path {
      color: var(--opc-console-primary);
    }

    #theme-opc .opc-marquee {
      overflow: hidden;
      border-top: 1px solid var(--opc-line);
      border-bottom: 1px solid var(--opc-line);
      background: color-mix(in srgb, var(--opc-console-card) 52%, transparent);
      color: var(--opc-console-text-secondary);
      font-family: 'IBM Plex Mono', 'JetBrains Mono', Consolas, monospace;
      font-size: clamp(0.72rem, 1.1vw, 0.9rem);
      font-weight: 600;
      letter-spacing: 0.08em;
      white-space: nowrap;
    }

    #theme-opc .opc-marquee > div {
      width: max-content;
      padding: 0.95rem 0;
      animation: opc-marquee 38s linear infinite;
    }

    #theme-opc .opc-pipeline,
    #theme-opc .opc-projects {
      padding: 7rem 0;
      border-bottom: 1px solid var(--opc-line);
    }

    #theme-opc .opc-pipeline-rail {
      position: relative;
    }

    #theme-opc .opc-pipeline-rail::before {
      position: absolute;
      left: 0.55rem;
      top: 1rem;
      bottom: 1rem;
      width: 1px;
      content: '';
      background: linear-gradient(var(--opc-console-primary), var(--opc-line));
    }

    #theme-opc .opc-pipeline-step {
      position: relative;
      display: grid;
      grid-template-columns: 1.2rem 2.5rem 1fr;
      gap: 1rem;
      padding: 0 0 2.35rem;
    }

    #theme-opc .opc-pipeline-step:last-child {
      padding-bottom: 0;
    }

    #theme-opc .opc-pipeline-node {
      position: relative;
      z-index: 1;
      width: 1.1rem;
      height: 1.1rem;
      margin-top: 0.1rem;
      border: 1px solid var(--opc-console-primary);
      background: var(--opc-console-bg);
      transform: rotate(45deg);
    }

    #theme-opc .opc-pipeline-node span {
      position: absolute;
      inset: 3px;
      background: var(--opc-console-primary);
      animation: opc-pulse 1.5s ease-in-out infinite;
    }

    #theme-opc .opc-project-grid {
      border-color: var(--opc-line);
      background: var(--opc-line);
    }

    #theme-opc .opc-project-card {
      position: relative;
      display: flex;
      min-height: 18rem;
      flex-direction: column;
      padding: 1.4rem;
      overflow: hidden;
      background: var(--opc-console-bg);
      transition:
        background-color 220ms ease,
        color 220ms ease;
    }

    #theme-opc .opc-project-card::before {
      position: absolute;
      right: -2.2rem;
      top: -2.2rem;
      width: 7rem;
      height: 7rem;
      border: 1px solid var(--opc-line);
      border-radius: 999px;
      content: '';
      transition: transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    #theme-opc .opc-project-card:hover {
      background: color-mix(
        in srgb,
        var(--opc-console-primary) 11%,
        var(--opc-console-bg)
      );
    }

    #theme-opc .opc-project-card:hover::before {
      transform: scale(2.4);
    }

    #theme-opc .opc-project-featured {
      min-height: 24rem;
      color: #fff;
      background: color-mix(
        in srgb,
        var(--opc-console-text) 92%,
        var(--opc-console-bg)
      );
    }

    #theme-opc
      .opc-project-featured
      > *:not(.opc-project-media):not(.opc-project-scrim) {
      position: relative;
      z-index: 2;
    }

    #theme-opc .opc-project-media,
    #theme-opc .opc-project-scrim {
      position: absolute;
      z-index: 0;
      inset: 0;
    }

    #theme-opc .opc-project-media img {
      filter: saturate(0.76) contrast(1.06);
      transition:
        transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1),
        filter 300ms ease;
    }

    #theme-opc .opc-project-scrim {
      z-index: 1;
      background: linear-gradient(
        180deg,
        rgba(6, 9, 14, 0.14) 12%,
        rgba(6, 9, 14, 0.22) 40%,
        rgba(6, 9, 14, 0.88) 100%
      );
    }

    #theme-opc .opc-project-featured:hover .opc-project-media img {
      filter: saturate(0.95) contrast(1.08);
      transform: scale(1.035);
    }

    #theme-opc .opc-project-featured .opc-muted,
    #theme-opc .opc-project-featured .opc-live-label {
      color: rgba(255, 255, 255, 0.78);
    }
    #theme-opc .opc-project-featured .opc-live-label i {
      background: var(--opc-console-bg);
      box-shadow: none;
    }
    #theme-opc .opc-project-featured:hover {
      background: color-mix(
        in srgb,
        var(--opc-console-text) 88%,
        var(--opc-console-bg)
      );
    }

    #theme-opc .opc-project-arrow {
      position: absolute;
      right: 1.4rem;
      bottom: 1.4rem;
      font-size: 1.3rem;
      transition: transform 220ms ease;
    }

    #theme-opc .opc-project-card:hover .opc-project-arrow {
      transform: translate(0.2rem, -0.2rem);
    }

    #theme-opc .opc-accent-text {
      color: var(--opc-console-primary);
    }

    @media (min-width: 1024px) {
      #theme-opc .opc-project-featured {
        grid-column: span 2;
        grid-row: span 2;
      }
    }

    @media (max-width: 767px) {
      #theme-opc .opc-console {
        transform: none;
      }
      #theme-opc .opc-outline-line {
        -webkit-text-stroke-width: 1px;
      }
      #theme-opc .opc-task-row {
        grid-template-columns: 2.5rem 4.3rem 1fr 0.5rem;
        gap: 0.4rem;
      }
      #theme-opc .opc-task-row > :nth-child(3) {
        font-size: 0.68rem;
      }
      #theme-opc .opc-pipeline,
      #theme-opc .opc-projects {
        padding: 5rem 0;
      }
      #theme-opc .opc-project-card {
        min-height: 14rem;
      }
      #theme-opc .opc-project-featured {
        min-height: 19rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #theme-opc *,
      #theme-opc *::before,
      #theme-opc *::after {
        scroll-behavior: auto !important;
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
      }
    }

    @keyframes opc-pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.35;
      }
    }

    @keyframes opc-marquee {
      to {
        transform: translateX(-50%);
      }
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
  const siteIcon =
    props?.siteInfo?.icon ||
    siteConfig('AVATAR', '/avatar.svg', props?.NOTION_CONFIG) ||
    '/avatar.svg'
  const siteCover =
    props?.siteInfo?.pageCover ||
    siteConfig('HOME_BANNER_IMAGE', '', props?.NOTION_CONFIG)

  return (
    <main className='opc-home min-h-screen overflow-hidden'>
      <nav className='opc-nav mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10 lg:px-14'>
        <SmartLink
          href='/'
          className='opc-wordmark text-sm font-semibold tracking-[0.16em]'
        >
          {c('OPC_NAME')}
        </SmartLink>
        <div className='flex items-center gap-3'>
          <span className='opc-live-label'>
            <i />
            {c('OPC_STATUS_TEXT')}
          </span>
          <span className='opc-mono opc-muted hidden text-[10px] tracking-[0.14em] sm:inline'>
            SGT / UTC+8
          </span>
        </div>
      </nav>

      <section className='opc-hero mx-auto grid min-h-[calc(100svh-68px)] max-w-[1440px] items-center gap-12 px-5 pb-16 pt-10 md:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-14 lg:pb-24'>
        <div className='relative z-10'>
          <div className='opc-section-index'>01 / {c('OPC_KICKER')}</div>
          <h1 className='opc-display opc-hero-title mt-8 max-w-4xl'>
            <span>一个人，</span>
            <span className='opc-outline-line'>运行一家公司。</span>
          </h1>
          <div className='mt-8 max-w-xl text-lg font-semibold leading-snug sm:text-2xl'>
            {c('OPC_SUBTITLE')}
          </div>
          <p className='opc-muted mt-5 max-w-xl text-sm leading-7 sm:text-base sm:leading-8'>
            {c('OPC_DESCRIPTION')}
          </p>

          <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
            <ActionLink href={c('OPC_PRIMARY_URL')} primary>
              {c('OPC_PRIMARY_TEXT')}{' '}
              <span aria-hidden='true' className='ml-3'>
                ↗
              </span>
            </ActionLink>
            <ActionLink href={c('OPC_SECONDARY_URL')}>
              {c('OPC_SECONDARY_TEXT')}
            </ActionLink>
          </div>

          <div className='opc-hero-meta mt-10 grid max-w-xl grid-cols-3 border-y py-4'>
            {[
              ['07', '实验方向'],
              ['01', '每轮任务'],
              ['∞', '持续迭代']
            ].map(([value, label]) => (
              <div
                key={label}
                className='border-r px-3 first:pl-0 last:border-0 sm:px-5'
              >
                <div className='opc-display text-2xl'>{value}</div>
                <div className='opc-mono opc-muted mt-1 text-[9px] tracking-[0.12em]'>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <TaskConsole siteIcon={siteIcon} siteCover={siteCover} />
      </section>

      <div className='opc-marquee' aria-hidden='true'>
        <div>
          定义方向　→　拆解任务　→　交付产物　→　人工验收　→　继续迭代　　
          定义方向　→　拆解任务　→　交付产物　→　人工验收　→　继续迭代　　
        </div>
      </div>

      <div className='opc-home-section mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14'>
        <PipelineRail />
        <NowPanel siteCover={siteCover} />
      </div>

      <section className='opc-statement mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36 lg:px-14'>
        <div className='opc-section-index'>04 / 构建原则</div>
        <p className='opc-display mt-8 max-w-6xl text-4xl leading-[1.02] sm:text-6xl lg:text-7xl'>
          AI 不是用来模拟开会，
          <br />
          而是把想法变成<span className='opc-accent-text'>可验收的产物。</span>
        </p>
        <p className='opc-muted mt-8 max-w-xl text-sm leading-7'>
          {c('OPC_CARD_DESCRIPTION')}
        </p>
      </section>
    </main>
  )
}

const LayoutSlug = props => (
  <main className='min-h-screen px-5 py-10 md:px-10'>
    <article
      id='article-wrapper'
      className='opc-panel mx-auto max-w-3xl rounded-lg border p-6 md:p-10'
    >
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
const EmptyState = ({ title = '暂无内容' }) => (
  <div className='opc-muted rounded-md border border-dashed p-8 text-center text-sm'>
    {title}
  </div>
)

const LayoutPostList = props => {
  const posts = props.posts || []

  return (
    <PageShell
      title='长期记录'
      description='AI、产品、写作和一人公司实验的公开记录。'
    >
      <div id='posts-wrapper' className='grid gap-4'>
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard key={post.id || post.slug || post.title} post={post} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
      <Pager {...props} posts={posts} />
    </PageShell>
  )
}

const LayoutSearch = props => (
  <PageShell
    title='搜索结果'
    description={props.keyword ? `关键词：${props.keyword}` : '站内搜索结果。'}
  >
    <div id='posts-wrapper' className='grid gap-4'>
      {(props.posts || []).length > 0 ? (
        props.posts.map(post => (
          <PostCard key={post.id || post.slug || post.title} post={post} />
        ))
      ) : (
        <EmptyState title='没有找到匹配内容' />
      )}
    </div>
  </PageShell>
)

const LayoutArchive = props => (
  <PageShell title='归档' description='按时间整理的长期记录。'>
    <div className='grid gap-6'>
      {Object.keys(props.archivePosts || {}).length > 0 ? (
        Object.keys(props.archivePosts).map(year => (
          <section key={year}>
            <h2 className='mb-3 text-xl font-semibold'>{year}</h2>
            <div className='grid gap-3'>
              {(props.archivePosts[year] || []).map(post => (
                <PostCard
                  key={post.id || post.slug || post.title}
                  post={post}
                />
              ))}
            </div>
          </section>
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  </PageShell>
)

const LayoutCategoryIndex = props => (
  <PageShell title='分类' description='按主题浏览文章。'>
    <div className='flex flex-wrap gap-3'>
      {(props.categoryOptions || []).map(category => (
        <SmartLink
          key={category.name}
          href={`/category/${category.name}`}
          className='opc-secondary-action rounded-md border px-4 py-2 text-sm'
        >
          {category.name}
          {category.count ? ` (${category.count})` : ''}
        </SmartLink>
      ))}
    </div>
  </PageShell>
)

const LayoutTagIndex = props => (
  <PageShell title='标签' description='按标签浏览文章。'>
    <div className='flex flex-wrap gap-3'>
      {(props.tagOptions || []).map(tag => (
        <SmartLink
          key={tag.name}
          href={`/tag/${encodeURIComponent(tag.name)}`}
          className='opc-secondary-action rounded-md border px-4 py-2 text-sm'
        >
          {tag.name}
          {tag.count ? ` (${tag.count})` : ''}
        </SmartLink>
      ))}
    </div>
  </PageShell>
)

const Layout404 = () => (
  <PageShell title='页面不存在' description='这个地址没有找到对应内容。'>
    <ActionLink href='/' primary>
      返回首页
    </ActionLink>
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
