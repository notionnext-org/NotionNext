import { renderToStaticMarkup } from 'react-dom/server.node'
import { Features } from '@/themes/starter/components/Features'
import { starterConfig } from '@/themes/starter/config'

jest.mock('@/themes/starter/config', () => ({
  starterConfig: jest.fn()
}))

jest.mock('@/components/SmartLink', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
}))

describe('starter Features', () => {
  beforeEach(() => {
    const config = {
      STARTER_FEATURE_3_BUTTON_TEXT: 'Third action',
      STARTER_FEATURE_3_BUTTON_URL: '/third',
      STARTER_FEATURE_4_BUTTON_TEXT: 'Fourth action',
      STARTER_FEATURE_4_BUTTON_URL: '/fourth'
    }

    starterConfig.mockImplementation((key, defaultValue) => {
      return config[key] ?? defaultValue ?? ''
    })
  })

  it('renders independent text and links for the third and fourth features', () => {
    const html = renderToStaticMarkup(<Features />)

    expect(html).toContain('href="/third"')
    expect(html).toContain('>Third action</a>')
    expect(html).toContain('href="/fourth"')
    expect(html).toContain('>Fourth action</a>')
  })
})
