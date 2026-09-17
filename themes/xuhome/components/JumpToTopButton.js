import { useState, useEffect } from 'react'

export default function JumpToTopButton() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const listener = () => setShow(window.pageYOffset > 500)
    document.addEventListener('scroll', listener, { passive: true })
    return () => document.removeEventListener('scroll', listener)
  }, [])

  if (!show) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className='w-10 h-10 flex items-center justify-center border-2 border-[#0284c7] rounded-sm shadow-[3px_3px_0px_0px_#0284c7] bg-[#fde68a] font-black text-lg text-[#0284c7] hover:bg-[#0ea5e9] hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all'
      aria-label='Back to top'
    >
      {'\u2191'}
    </button>
  )
}
