import { act, fireEvent, render, screen } from '@testing-library/react'
import { siteConfig } from '@/lib/config'
import { NoticeBar } from '@/themes/heo/components/NoticeBar'
import { Swipe } from '@/themes/heo/components/Swipe'

// Layout and scoped CSS are covered by the browser checks.
// The repository's global teardown clears <head> before styled-jsx unmounts.
jest.mock('styled-jsx/style', () => () => null)

jest.mock('@/lib/config', () => ({ siteConfig: jest.fn() }))
jest.mock('@/lib/global', () => ({
  useGlobal: () => ({ locale: { COMMON: { NOW: '最新' } } })
}))

const notices = [
  { title: '第一条通知完整内容', url: '/first' },
  { title: '第二条通知完整内容', url: '/second' }
]

beforeEach(() => {
  jest.useFakeTimers()
  siteConfig.mockImplementation((key, fallback, config) =>
    key === 'HEO_NOTICE_BAR' ? notices : (config[key] ?? fallback)
  )
})

afterEach(() => {
  jest.clearAllTimers()
  jest.useRealTimers()
})

it('preserves the default 3000 ms interval and link destination', () => {
  render(<NoticeBar />)
  expect(screen.getByRole('link')).toHaveAttribute('href', '/first')
  expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer')
  act(() => jest.advanceTimersByTime(2999))
  expect(screen.getByRole('link')).toHaveTextContent(notices[0].title)
  act(() => jest.advanceTimersByTime(1))
  expect(screen.getByRole('link')).toHaveTextContent(notices[1].title)
})

it('accepts a Notion JSON notice list and string interval', () => {
  siteConfig.mockImplementation(key =>
    key === 'HEO_NOTICE_BAR' ? JSON.stringify(notices) : '5000'
  )
  render(<NoticeBar />)
  act(() => jest.advanceTimersByTime(4999))
  expect(screen.getByRole('link')).toHaveAttribute('href', '/first')
  act(() => jest.advanceTimersByTime(1))
  expect(screen.getByRole('link')).toHaveAttribute('href', '/second')
})

it.each([0, -100, '', 'invalid', Infinity, NaN, 2147483648, true, {}])(
  'falls back to 3000 ms for invalid interval %p',
  value => {
    siteConfig.mockImplementation(key =>
      key === 'HEO_NOTICE_BAR' ? notices : value
    )
    render(<NoticeBar />)
    act(() => jest.advanceTimersByTime(2999))
    expect(screen.getByRole('link')).toHaveAttribute('href', '/first')
    act(() => jest.advanceTimersByTime(1))
    expect(screen.getByRole('link')).toHaveAttribute('href', '/second')
  }
)

it('uses a changed interval and cleans up the previous timer', () => {
  const { rerender, unmount } = render(
    <Swipe items={notices} interval={5000} />
  )
  act(() => jest.advanceTimersByTime(2000))
  rerender(<Swipe items={notices} interval={1000} />)
  act(() => jest.advanceTimersByTime(1000))
  expect(screen.getByRole('link')).toHaveAttribute('href', '/second')
  expect(jest.getTimerCount()).toBe(1)
  unmount()
  expect(jest.getTimerCount()).toBe(0)
})

it('keeps a remaining notice visible when the list shrinks', () => {
  const { rerender } = render(<Swipe items={notices} />)
  act(() => jest.advanceTimersByTime(3000))
  rerender(<Swipe items={[notices[0]]} />)
  expect(screen.getByRole('link')).toHaveAttribute('href', '/first')
  expect(jest.getTimerCount()).toBe(0)
})

it('hides an empty notice bar', () => {
  siteConfig.mockImplementation(key => (key === 'HEO_NOTICE_BAR' ? [] : 3000))
  const { container } = render(<NoticeBar />)
  expect(container).toBeEmptyDOMElement()
  expect(jest.getTimerCount()).toBe(0)
})

it('exposes only the active slide to keyboard navigation', () => {
  const { container } = render(<Swipe items={notices} />)
  expect(screen.getAllByRole('link')).toHaveLength(1)
  expect(container.querySelector('a[aria-hidden="true"]')).toHaveAttribute(
    'tabindex',
    '-1'
  )
})

it('opens full text without a URL and pauses until the dialog closes', () => {
  // jsdom does not implement native dialogs; browser validation covers focus/Escape.
  const originalShowModal = Object.getOwnPropertyDescriptor(
    HTMLDialogElement.prototype,
    'showModal'
  )
  const showModal = jest.fn(function () {
    this.setAttribute('open', '')
  })
  HTMLDialogElement.prototype.showModal = showModal
  const title = '没有链接的长通知：点击后应能阅读全部内容，阅读时不能自动切换。'
  const { container } = render(<Swipe items={[{ title }, notices[1]]} />)
  fireEvent.click(screen.getByRole('button', { name: title }))
  expect(showModal).toHaveBeenCalledTimes(1)
  expect(screen.getByRole('dialog')).toHaveTextContent(title)
  expect(jest.getTimerCount()).toBe(0)
  act(() => jest.advanceTimersByTime(10000))
  expect(
    container.querySelector('button[aria-haspopup="dialog"]')
  ).toHaveAttribute('aria-hidden', 'false')
  const dialog = screen.getByRole('dialog')
  dialog.removeAttribute('open')
  fireEvent(dialog, new Event('close'))
  act(() => jest.advanceTimersByTime(3000))
  expect(screen.getByRole('link')).toHaveAttribute('href', '/second')
  if (originalShowModal) {
    Object.defineProperty(
      HTMLDialogElement.prototype,
      'showModal',
      originalShowModal
    )
  } else {
    delete HTMLDialogElement.prototype.showModal
  }
})
