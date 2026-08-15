import { useEffect, useState } from 'react'

export default function ShareBar({ post }) {
  const [shareUrl, setShareUrl] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  const copyLink = () => {
    navigator.clipboard?.writeText(shareUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className='flex flex-wrap items-center gap-2 py-4 mt-4'>
      <button
        onClick={copyLink}
        className='border-2 border-[#0284c7] rounded-sm shadow-[2px_2px_0px_0px_#0284c7] bg-[#ffffff] dark:bg-slate-800 px-3 py-1.5 font-black text-xs text-[#0284c7] uppercase tracking-wider hover:bg-[#0ea5e9] hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all'
      >
        {copied ? 'Copied!' : 'Copy link'}
      </button>
      <button
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?url=${shareUrl}&text=${post?.title}`,
            '_blank',
            'noopener,noreferrer,width=760,height=640'
          )
        }
        className='border-2 border-[#0284c7] rounded-sm shadow-[2px_2px_0px_0px_#0284c7] bg-[#ffffff] dark:bg-slate-800 px-3 py-1.5 font-black text-xs text-[#0284c7] uppercase tracking-wider hover:bg-[#0ea5e9] hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all'
      >
        Share
      </button>
    </div>
  )
}
