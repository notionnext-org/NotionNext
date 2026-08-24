import { fireEvent, render, screen } from '@testing-library/react'
import DarkModeButton from '@/themes/heo/components/DarkModeButton'
import { useGlobal } from '@/lib/global'

jest.mock('@/lib/global', () => ({
  useGlobal: jest.fn()
}))

describe('HEO DarkModeButton', () => {
  const toggleDarkMode = jest.fn()

  beforeEach(() => {
    useGlobal.mockReturnValue({
      isDarkMode: false,
      toggleDarkMode
    })
  })

  it('exposes the next mode and toggles exactly once', () => {
    render(<DarkModeButton />)

    const button = screen.getByRole('button', {
      name: 'Switch to dark mode'
    })
    expect(button).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(button)

    expect(toggleDarkMode).toHaveBeenCalledTimes(1)
  })

  it('renders a localized drawer label without nesting controls', () => {
    useGlobal.mockReturnValue({
      isDarkMode: true,
      toggleDarkMode
    })

    const { container } = render(<DarkModeButton label='Light mode' />)

    expect(
      screen.getByRole('button', { name: 'Switch to light mode' })
    ).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Light mode')).toBeInTheDocument()
    expect(container.querySelectorAll('button')).toHaveLength(1)
  })
})
