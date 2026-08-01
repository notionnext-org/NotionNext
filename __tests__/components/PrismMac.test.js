import { fireEvent } from '@testing-library/react'
import {
  closeCodeSidePanel,
  isCodeSidePanelSupported,
  openCodeSidePanel,
  renderCollapseCode
} from '@/components/PrismMac'
import { siteConfig } from '@/lib/config'

jest.mock('next/navigation', () => ({
  usePathname: jest.fn()
}))

jest.mock('@/lib/global', () => ({
  useGlobal: jest.fn()
}))

jest.mock('@/lib/utils', () => ({
  loadExternalResource: jest.fn()
}))

jest.mock('@/lib/config', () => ({
  siteConfig: jest.fn((key, fallback) => {
    if (key === 'CODE_COLLAPSE_MIN_LINES') return 3
    return fallback
  })
}))

const originalMatchMedia = window.matchMedia

const setDesktopViewport = matches => {
  window.matchMedia = jest.fn().mockReturnValue({
    matches,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
  })
}

const appendCodeToolbar = (text = 'const one = 1\nconst two = 2\nconst three = 3') => {
  const toolbar = document.createElement('div')
  toolbar.className = 'code-toolbar'

  const pre = document.createElement('pre')
  const code = document.createElement('code')
  code.className = 'language-javascript'
  code.textContent = text

  pre.appendChild(code)
  toolbar.appendChild(pre)
  document.body.appendChild(toolbar)

  return toolbar
}

describe('PrismMac code side panel', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    setDesktopViewport(true)
    siteConfig.mockImplementation((key, fallback) => {
      if (key === 'CODE_COLLAPSE_MIN_LINES') return 3
      return fallback
    })
  })

  afterEach(() => {
    closeCodeSidePanel()
    document.body.innerHTML = ''
    window.matchMedia = originalMatchMedia
  })

  it('only supports the side panel on desktop viewports', () => {
    setDesktopViewport(false)

    expect(isCodeSidePanelSupported()).toBe(false)
    expect(
      openCodeSidePanel({
        language: 'javascript',
        lineCount: 3,
        codeHtml: 'const value = 1',
        text: 'const value = 1'
      })
    ).toBe(false)
    expect(document.querySelector('#notion-code-side-panel')).not.toBeInTheDocument()
  })

  it('opens, replaces, and closes a single sidebar instance', () => {
    expect(
      openCodeSidePanel({
        language: 'javascript',
        lineCount: 3,
        codeClassName: 'language-javascript',
        codeHtml: '<span class="token keyword">const</span> value = 1',
        text: 'const value = 1'
      })
    ).toBe(true)

    expect(document.querySelectorAll('#notion-code-side-panel')).toHaveLength(1)
    expect(document.querySelector('.code-side-panel-title')).toHaveTextContent(
      'JAVASCRIPT'
    )
    expect(document.querySelector('.code-side-panel-code code')).toHaveClass(
      'language-javascript'
    )
    expect(document.querySelector('.code-side-panel-code').innerHTML).toContain(
      'token keyword'
    )
    expect(document.querySelector('.code-side-panel-backdrop')).toBeInTheDocument()

    openCodeSidePanel({
      language: 'typescript',
      lineCount: 5,
      codeClassName: 'language-typescript',
      codeHtml: 'type Value = string',
      text: 'type Value = string'
    })

    expect(document.querySelectorAll('#notion-code-side-panel')).toHaveLength(1)
    expect(document.querySelector('.code-side-panel-title')).toHaveTextContent(
      'TYPESCRIPT'
    )

    fireEvent.click(document.querySelector('.code-side-panel-backdrop'))
    expect(document.querySelector('#notion-code-side-panel')).not.toBeInTheDocument()

    openCodeSidePanel({
      language: 'typescript',
      lineCount: 5,
      codeClassName: 'language-typescript',
      codeHtml: 'type Value = string',
      text: 'type Value = string'
    })

    fireEvent.click(document.querySelector('.code-side-panel-close'))
    expect(document.querySelector('#notion-code-side-panel')).not.toBeInTheDocument()
  })

  it('closes the sidebar with Escape', () => {
    openCodeSidePanel({
      language: 'javascript',
      lineCount: 3,
      codeHtml: 'const value = 1',
      text: 'const value = 1'
    })

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))

    expect(document.querySelector('#notion-code-side-panel')).not.toBeInTheDocument()
  })

  it('adds the sidebar button for long desktop code blocks', () => {
    appendCodeToolbar()

    renderCollapseCode(true, false)

    const sidePanelButton = document.querySelector('.collapse-side-panel-button')
    expect(sidePanelButton).toHaveTextContent('在侧栏查看')

    fireEvent.click(sidePanelButton)

    expect(document.querySelector('.code-side-panel-code code')).toHaveTextContent(
      'const one = 1 const two = 2 const three = 3'
    )
  })

  it('keeps the existing collapse behavior without a sidebar button on mobile', () => {
    setDesktopViewport(false)
    appendCodeToolbar()

    renderCollapseCode(true, false)

    expect(document.querySelector('.collapse-wrapper')).toBeInTheDocument()
    expect(document.querySelector('.collapse-side-panel-button')).not.toBeInTheDocument()
  })
})