import { useState } from 'react'
import SmartLink from '@/components/SmartLink'

export default function MenuItemDrop({ link }) {
  const [show, setShow] = useState(false)
  const hasSub = link?.subMenus?.length > 0

  const btnClass = `inline-block px-2.5 py-1 border-2 border-[#0284c7] rounded-sm font-black uppercase text-xs tracking-wider transition-all cursor-pointer select-none shadow-[2px_2px_0px_0px_#0284c7] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none bg-[#ffffff] dark:bg-slate-700 text-[#0284c7] hover:bg-[#0284c7] hover:text-white`

  if (!hasSub) {
    return (
      <SmartLink href={link?.href} className='no-underline'>
        <span className={btnClass}>
          {link?.icon && <i className={`${link.icon} mr-1`} />}
          {link.name || link.title}
        </span>
      </SmartLink>
    )
  }

  return (
    <div
      className='relative'
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span className={`${btnClass} ${show ? 'bg-[#fde68a]' : ''}`}>
        {link?.icon && <i className={`${link.icon} mr-1`} />}
        {link.name || link.title}
        <svg
          className={`inline-block w-3 h-3 ml-1 transition-transform ${show ? 'rotate-180' : ''}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={3}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </span>

      {hasSub && (
        <div
          className={`absolute top-full left-0 mt-1 min-w-[160px] z-50 transition-all duration-150 ${show ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'}`}
        >
          <div className='border-2 border-[#0284c7] rounded-sm shadow-[4px_4px_0px_0px_#0284c7] bg-[#ffffff] dark:bg-slate-800 p-1.5 flex flex-col gap-1'>
            {link.subMenus.map((sub, i) => (
              <SmartLink
                key={sub.id || i}
                href={sub.href || sub.url}
                className='no-underline'
              >
                <div className='block px-3 py-1.5 text-xs font-black uppercase tracking-wider text-[#0284c7] hover:bg-[#fde68a] rounded-sm transition-colors whitespace-nowrap'>
                  {sub.icon && <i className={`${sub.icon} mr-1`} />}
                  {sub.name || sub.title}
                </div>
              </SmartLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
