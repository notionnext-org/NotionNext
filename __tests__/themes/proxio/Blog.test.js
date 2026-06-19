import { render, screen } from '@testing-library/react'
import { Blog } from '@/themes/proxio/components/Blog'
import { siteConfig } from '@/lib/config'

jest.mock('@/lib/config', () => ({
  siteConfig: jest.fn()
}))

jest.mock('@/components/LazyImage', () => ({
  __esModule: true,
  default: ({ alt = '', className = '', src = '' }) => (
    <img alt={alt} className={className} src={src} />
  )
}))

jest.mock('@/components/SmartLink', () => ({
  __esModule: true,
  default: ({ children, className = '', href = '' }) => (
    <a className={className} href={href}>
      {children}
    </a>
  )
}))

const post = {
  href: '/article/demo',
  pageCoverThumbnail: '/cover.png',
  publishDay: '2026-05-30',
  summary: 'Demo summary',
  title: 'Demo post'
}

const setupSiteConfig = ({ autoShowCover }) => {
  siteConfig.mockImplementation((key, defaultVal) => {
    if (key === 'PROXIO_BLOG_ENABLE') return true
    if (key === 'PROXIO_BLOG_AUTO_SHOW_COVER') return autoShowCover
    if (key.startsWith('PROXIO_BLOG_PLACEHOLDER_IMG_URL_')) return ''
    return defaultVal
  })
}

describe('proxio Blog', () => {
  beforeEach(() => {
    siteConfig.mockReset()
  })

  it('keeps the cover hidden behind the summary by default', () => {
    setupSiteConfig({ autoShowCover: false })

    render(<Blog posts={[post]} />)

    expect(screen.getByText('Demo summary').parentElement).not.toHaveClass(
      'opacity-0'
    )
  })

  it('shows the post cover by default when PROXIO_BLOG_AUTO_SHOW_COVER is enabled', () => {
    setupSiteConfig({ autoShowCover: true })

    render(<Blog posts={[post]} />)

    expect(screen.getByText('Demo summary').parentElement).toHaveClass(
      'opacity-0',
      'group-hover:opacity-100'
    )
  })
})
