import { useState, useEffect } from 'react'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

function calcElapsed(since) {
  const diff = Date.now() - new Date(since).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return { days, hours, minutes, seconds }
}

export default function Uptime() {
  const enabled = siteConfig('XUHOME_UPTIME_ENABLE', false, CONFIG)
  const since = siteConfig('XUHOME_UPTIME_SINCE', '', CONFIG)
  const title = siteConfig('XUHOME_UPTIME_TITLE', 'Running', CONFIG)

  const [time, setTime] = useState(() => (since ? calcElapsed(since) : null))

  useEffect(() => {
    if (!enabled || !since) return
    const timer = setInterval(() => setTime(calcElapsed(since)), 1000)
    return () => clearInterval(timer)
  }, [since, enabled])

  if (!enabled || !since || !time) return null

  return (
    <div className='border-2 border-[#0284c7] rounded-sm shadow-[3px_3px_0px_0px_#0284c7] bg-[#ffffff] dark:bg-slate-800 p-4'>
      <h3 className='font-black text-xs text-[#0284c7] uppercase tracking-wider mb-3 border-b-2 border-[#fde68a] pb-2'>
        {title}
      </h3>

      <div className='grid grid-cols-4 gap-2 text-center'>
        {[
          { value: time.days, label: 'D' },
          { value: time.hours, label: 'H' },
          { value: time.minutes, label: 'M' },
          { value: time.seconds, label: 'S' }
        ].map((item, i) => (
          <div
            key={i}
            className='border-2 border-[#0284c7] rounded-sm shadow-[1px_1px_0px_0px_#0284c7] bg-[#fde68a] py-2'
          >
            <div className='text-xl font-black text-[#0284c7] tabular-nums leading-none'>
              {String(item.value).padStart(2, '0')}
            </div>
            <div className='text-[10px] font-black text-[#0284c7]/60 uppercase mt-0.5'>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
