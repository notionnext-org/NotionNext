import { isBrowser } from '@/lib/utils'
import { useEffect, useState } from 'react'

/**
 * 一个swipe组件
 * 垂直方向，定时滚动
 * @param {*} param0
 * @returns
 */
export function Swipe({ items }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleClick = item => {
    if (isBrowser) {
      window.open(item?.url)
    }
  }

  useEffect(() => {
    if (!items?.length) return
    const interval = setInterval(() => {
      // 函数式 setState，避免把 activeIndex 放进依赖数组导致每秒重建 interval
      setActiveIndex(prev => (prev + 1) % items.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [items?.length])

  return (
    <div className='h-full relative w-full overflow-hidden'>
      {items.map((item, index) => (
        <div
          onClick={() => handleClick(item)}
          key={index}
          className={`whitespace-nowrap absolute top-0 bottom-0 w-full h-full flex justify-center items-center line-clamp-1 transform transition-transform duration-500 ${
            index === activeIndex
              ? 'translate-y-0 slide-in'
              : 'translate-y-full slide-out'
          }`}>
          {item.title}
        </div>
      ))}

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
