import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import { siteConfig } from '@/lib/config'

/**
 * 文章背景图
 */
export default function PostHero({ post, siteInfo }) {
  const headerImage = post?.pageCoverThumbnail
    ? post?.pageCoverThumbnail
    : siteInfo?.pageCover
  const title = post?.title
  return (
    <div
      id='header'
      className='flex h-96 justify-center align-middle items-center w-full relative bg-black'
    >
      <h1
        data-wow-delay='.1s'
        className='wow fadeInUp z-10 flex w-full max-w-5xl items-center justify-center break-words px-6 text-center text-3xl font-bold leading-tight text-white shadow-text-md sm:px-10 sm:text-4xl sm:leading-snug md:px-12 md:text-5xl'
      >
        {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post?.pageIcon} />}
        {title}
      </h1>
      <LazyImage
        alt={title}
        src={headerImage}
        className='pointer-events-none select-none w-full h-full object-cover opacity-30 absolute'
        placeholder='blur'
        blurDataURL={siteConfig('IMG_LAZY_LOAD_PLACEHOLDER')}
      />
    </div>
  )
}
