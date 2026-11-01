import { useEffect, useId, useRef, useState } from 'react'

/**
 * 一个swipe组件
 * 垂直方向，定时滚动
 * @param {*} param0
 * @returns
 */
export function Swipe({ items, interval = 3000 }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedNotice, setExpandedNotice] = useState(null)
  const dialogRef = useRef(null)
  const dialogTitleId = useId()
  const currentIndex = activeIndex % items.length

  useEffect(() => {
    if (items.length < 2 || expandedNotice) return
    const timer = setInterval(() => {
      // 函数式 setState，避免把 activeIndex 放进依赖数组导致每秒重建 interval
      setActiveIndex(prev => (prev + 1) % items.length)
    }, interval)
    return () => clearInterval(timer)
  }, [items.length, interval, expandedNotice])

  return (
    <div className='h-full relative w-full overflow-hidden'>
      {items.map((item, index) => {
        const active = index === currentIndex
        const className = `whitespace-nowrap absolute top-0 bottom-0 w-full h-full flex justify-center items-center transform transition-transform duration-500 ${
          active
            ? 'translate-y-0 slide-in'
            : 'translate-y-full slide-out pointer-events-none'
        }`
        const title = (
          <span className='block w-full min-w-0 truncate text-center md:w-auto md:min-w-max md:overflow-visible'>
            {item.title}
          </span>
        )

        return item.url ? (
          <a
            key={index}
            href={item.url}
            target='_blank'
            rel='noopener noreferrer'
            tabIndex={active ? 0 : -1}
            aria-hidden={!active}
            className={className}
          >
            {title}
          </a>
        ) : (
          <button
            key={index}
            type='button'
            tabIndex={active ? 0 : -1}
            aria-hidden={!active}
            aria-haspopup='dialog'
            className={className}
            onClick={() => {
              setExpandedNotice(item)
              dialogRef.current?.showModal()
            }}
          >
            {title}
          </button>
        )
      })}

      <dialog
        ref={dialogRef}
        aria-labelledby={dialogTitleId}
        onClose={() => setExpandedNotice(null)}
        className='w-[calc(100%-2rem)] max-w-lg max-h-[80vh] overflow-y-auto rounded-xl p-5 bg-[var(--heo-color-card)] dark:bg-[var(--heo-color-card-dark)] text-[var(--heo-color-text)] dark:text-white backdrop:bg-black/50 cursor-auto'
      >
        <form method='dialog' className='flex justify-end'>
          <button
            type='submit'
            aria-label='Close notification'
            className='w-10 h-10 text-2xl'
          >
            ×
          </button>
        </form>
        <p id={dialogTitleId} className='whitespace-pre-wrap break-words'>
          {expandedNotice?.title}
        </p>
      </dialog>

      <style jsx>{`
        .slide-in {
          animation-name: slide-in;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }

        .slide-out {
          animation-name: slide-out;
          animation-duration: 0.5s;
          animation-fill-mode: forwards;
        }

        @keyframes slide-in {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes slide-out {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-100%);
          }
        }
      `}</style>
    </div>
  )
}

export default Swipe
