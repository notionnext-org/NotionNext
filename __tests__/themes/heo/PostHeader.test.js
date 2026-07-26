import { renderToStaticMarkup } from 'react-dom/server.node'
import PostHeader from '@/themes/heo/components/PostHeader'

jest.mock('@/components/LazyImage', () => ({
  __esModule: true,
  default: () => <span data-testid='lazy-image' />
}))

jest.mock('@/components/NotionIcon', () => ({
  __esModule: true,
  default: () => <span data-testid='notion-icon' />
}))

jest.mock('@/components/SmartLink', () => ({
  __esModule: true,
  default: ({ children, href, passHref, legacyBehavior, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
}))

jest.mock('@/components/WordCount', () => ({
  __esModule: true,
  default: ({ wordCount, readTime }) => (
    <span data-testid='word-count'>
      {wordCount}/{readTime}
    </span>
  )
}))

jest.mock('@/lib/config', () => ({
  siteConfig: jest.fn(() => false)
}))

jest.mock('@/themes/heo/components/WavesArea', () => ({
  __esModule: true,
  default: () => null
}))

const post = {
  title: '受保护文章',
  type: 'Post',
  wordCount: 0,
  readTime: 1,
  publishDay: '2026-07-25',
  lastEditedDay: '2026-07-25'
}

describe('heo PostHeader password metadata', () => {
  it('hides word count and read time while the article is locked', () => {
    const html = renderToStaticMarkup(
      <PostHeader post={post} siteInfo={{}} lock />
    )

    expect(html).not.toContain('data-testid="word-count"')
  })

  it('shows word count and read time after the article is unlocked', () => {
    const html = renderToStaticMarkup(
      <PostHeader post={post} siteInfo={{}} lock={false} />
    )

    expect(html).toContain('data-testid="word-count"')
    expect(html).toContain('0/1')
  })
})
