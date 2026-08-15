import NotionIcon from '@/components/NotionIcon'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import CONFIG from '../config'

/**
 * 列表/归档等页顶栏下的弱标题区；文章页标题在 LayoutSlug 内展示。
 */
export default function TitleBar(props) {
  const { post } = props
  const { fullWidth, siteInfo } = useGlobal()
  const router = useRouter()

  if (post) {
    return null
  }

  const skipOnHome =
    siteConfig('THOUGHTLITE_HOME_MINIMAL_HEADER', true, CONFIG) &&
    (router.pathname === '/' || router.pathname === '/page/[page]')

  if (skipOnHome) {
    return null
  }

  const title = siteConfig('TITLE')
  const description = siteConfig('AUTHOR')
  const headerImage = siteInfo?.pageCover

  const TITLE_BG = siteConfig('THOUGHTLITE_TITLE_IMAGE', false, CONFIG)

  if (fullWidth) {
    return null
  }

  return (
    <div className='relative overflow-hidden border-b border-[var(--tl-border)] bg-[var(--tl-bg)] px-4 py-8 text-center'>
      <div className='relative z-10 mx-auto max-w-3xl'>
        <h1 className='tl-article-title mb-2'>
          {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={siteInfo?.pageIcon} />}
          {title}
        </h1>
        <p className='m-0 text-sm text-[var(--tl-muted)] leading-relaxed'>{description}</p>
      </div>
      {TITLE_BG && headerImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={headerImage}
            alt=''
            className='pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-25'
          />
        </>
      ) : null}
    </div>
  )
}
