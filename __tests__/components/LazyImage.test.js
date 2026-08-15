import { render, screen, waitFor } from '@testing-library/react'
import LazyImage from '@/components/LazyImage'

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
})
window.IntersectionObserver = mockIntersectionObserver

describe('LazyImage Component', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test image'
  }

  beforeEach(() => {
    mockIntersectionObserver.mockClear()
  })

  it('renders with required props', () => {
    render(<LazyImage {...defaultProps} />)
    
    const image = screen.getByAltText('Test image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', 'Test image')
  })

  it('applies custom className', () => {
    const customClass = 'custom-image-class'
    render(<LazyImage {...defaultProps} className={customClass} />)
    
    const image = screen.getByAltText('Test image')
    expect(image).toHaveClass(customClass)
  })

  it('sets width and height attributes', () => {
    render(
      <LazyImage 
        {...defaultProps} 
        width={300} 
        height={200} 
      />
    )
    
    const image = screen.getByAltText('Test image')
    expect(image).toHaveAttribute('width', '300')
    expect(image).toHaveAttribute('height', '200')
  })

  it('handles priority loading', () => {
    render(<LazyImage {...defaultProps} priority />)
    
    const image = screen.getByAltText('Test image')
    expect(image).toHaveAttribute('loading', 'eager')
  })

  it('uses lazy loading by default', () => {
    render(<LazyImage {...defaultProps} />)
    
    const image = screen.getByAltText('Test image')
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<LazyImage {...defaultProps} onClick={handleClick} />)
    
    const image = screen.getByAltText('Test image')
    image.click()
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('sets up IntersectionObserver when not priority', () => {
    render(<LazyImage {...defaultProps} />)
    
    expect(mockIntersectionObserver).toHaveBeenCalled()
  })

  it('does not set up IntersectionObserver for priority images', () => {
    render(<LazyImage {...defaultProps} priority />)
    
    // Priority images should load immediately without IntersectionObserver
    expect(mockIntersectionObserver).not.toHaveBeenCalled()
  })

  it('handles load event', async () => {
    const handleLoad = jest.fn()
    const OriginalImage = global.Image
    // jsdom does not finish decoding remote URLs; defer onload until after handlers attach (matches browser ordering).
    global.Image = class MockImage {
      constructor() {
        this.onload = null
      }

      set src(_val) {
        queueMicrotask(() => {
          if (this.onload) this.onload()
        })
      }
    }

    try {
      render(<LazyImage {...defaultProps} priority onLoad={handleLoad} />)
      await waitFor(() => {
        expect(handleLoad).toHaveBeenCalled()
      })
    } finally {
      global.Image = OriginalImage
    }
  })

  it('handles error gracefully', () => {
    render(<LazyImage {...defaultProps} />)
    
    const image = screen.getByAltText('Test image')
    
    // Simulate image error
    image.dispatchEvent(new Event('error'))
    
    // Component should still be in the document
    expect(image).toBeInTheDocument()
  })

  it('applies correct decoding attribute', () => {
    render(<LazyImage {...defaultProps} />)
    
    const image = screen.getByAltText('Test image')
    expect(image).toHaveAttribute('decoding', 'async')
  })

  it('handles missing src gracefully', () => {
    const { container } = render(<LazyImage alt="Test image" />)

    expect(container.firstChild).toBeNull()
  })

  it('applies custom styles', () => {
    const customStyle = { border: '1px solid red' }
    render(<LazyImage {...defaultProps} style={customStyle} />)
    
    const image = screen.getByAltText('Test image')
    expect(image).toHaveStyle('border: 1px solid red')
  })
})
