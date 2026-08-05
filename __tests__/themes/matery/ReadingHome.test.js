import ReadingHome from '@/themes/matery/components/ReadingHome'
import { render, screen } from '@testing-library/react'

let mockLang = 'en-US'

jest.mock('@/lib/global', () => ({
  useGlobal: () => ({ lang: mockLang })
}))

jest.mock('@/lib/config', () => ({
  siteConfig: key => key === 'ENABLE_RSS'
}))

jest.mock('@/components/SmartLink', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
}))

jest.mock('@/themes/matery/components/BlogPostCard', () => ({
  __esModule: true,
  default: ({ post }) => <article>{post.title}</article>
}))

describe('Matery reading home', () => {
  beforeEach(() => {
    mockLang = 'en-US'
  })

  test('uses recommended posts as the starting path and removes duplicates', () => {
    const recommended = post('recommended', 'Recommended article', [
      { name: 'Recommend' }
    ])
    const latest = post('latest', 'Latest article')

    render(
      <ReadingHome
        posts={[recommended, latest, post('third', 'Third article')]}
        latestPosts={[recommended, latest, post('fourth', 'Fourth article')]}
        categoryOptions={[{ name: 'AI Safety', count: 3 }]}
      />
    )

    expect(screen.getByText('Start here')).toBeInTheDocument()
    expect(screen.getAllByText('Recommended article')).toHaveLength(1)
    expect(screen.getByText('Latest articles')).toBeInTheDocument()
    expect(screen.getAllByText('Latest article')).toHaveLength(1)
    expect(screen.getByRole('link', { name: /AI Safety/ })).toHaveAttribute(
      'href',
      '/category/AI%20Safety'
    )
    expect(
      screen.getByRole('link', { name: 'Subscribe via RSS' })
    ).toHaveAttribute('href', '/rss/feed.xml')
  })

  test('falls back to the first posts and localizes headings in Chinese', () => {
    mockLang = 'zh-CN'

    render(
      <ReadingHome
        posts={[
          post('one', '第一篇'),
          post('two', '第二篇'),
          post('three', '第三篇'),
          post('four', '第四篇')
        ]}
      />
    )

    expect(screen.getByText('从这里开始')).toBeInTheDocument()
    expect(screen.getByText('最新文章')).toBeInTheDocument()
    expect(screen.getByText('订阅更新')).toBeInTheDocument()
    expect(screen.getByText('第四篇')).toBeInTheDocument()
  })
})

const post = (id, title, tagItems = []) => ({
  id,
  href: `/article/${id}`,
  title,
  tagItems
})
