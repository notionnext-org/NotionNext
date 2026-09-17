import { useCallback, useEffect, useState } from 'react'
import SmartLink from '@/components/SmartLink'

function MenuItem({ link, onClose }) {
  const [open, setOpen] = useState(false)
  const hasSub = link.subMenus?.length > 0

  if (!hasSub) {
    return (
      <SmartLink
        href={link.href || link.url}
        className='no-underline'
        onClick={onClose}
      >
        <div className='block w-full px-4 py-2.5 border-2 border-[#0284c7] rounded-sm shadow-[2px_2px_0px_0px_#0284c7] bg-[#ffffff] dark:bg-slate-700 font-black text-sm text-[#0284c7] uppercase tracking-wider hover:bg-[#fde68a] text-center transition-colors'>
          {link.name || link.title}
        </div>
      </SmartLink>
    )
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className='block w-full px-4 py-2.5 border-2 border-[#0284c7] rounded-sm shadow-[2px_2px_0px_0px_#0284c7] bg-[#ffffff] dark:bg-slate-700 font-black text-sm text-[#0284c7] uppercase tracking-wider hover:bg-[#fde68a] text-center transition-colors'
      >
        {link.name || link.title}
        <span
          className={`inline-block ml-2 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          {'\u25BC'}
        </span>
      </button>

      <div
        className={`mt-1.5 ml-4 flex flex-col gap-1.5 transition-all duration-200 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        {link.subMenus.map((sub, i) => (
          <SmartLink
            key={sub.id || i}
            href={sub.href || sub.url}
            className='no-underline'
            onClick={onClose}
          >
            <div className='block w-full px-3 py-2 border-2 border-[#0284c7] rounded-sm shadow-[1px_1px_0px_0px_#0284c7] bg-[#faf8f5] dark:bg-slate-600 font-bold text-xs text-[#0284c7] uppercase tracking-wider hover:bg-[#fde68a] text-center transition-colors'>
              {sub.name || sub.title}
            </div>
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

export default function MobileMenu({ links, onClose }) {
  const [show, setShow] = useState(false)

  const close = useCallback(() => {
    setShow(false)
    setTimeout(() => onClose(), 200)
  }, [onClose])

  useEffect(() => {
    requestAnimationFrame(() => setShow(true))
    const handleEsc = e => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [close])

  return (
    <div
      className={`absolute top-full left-0 right-0 z-50 border-t-2 border-[#0284c7] bg-white dark:bg-slate-800 shadow-[0px_4px_0px_0px_#0284c7] transition-all duration-200 origin-top ${show ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
    >
      <div className='max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1.5'>
        {links.map(link => (
          <MenuItem key={link.id || link.name} link={link} onClose={close} />
        ))}
      </div>
    </div>
  )
}
