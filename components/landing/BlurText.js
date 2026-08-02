import { motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'

const directions = {
  bottom: { startY: 50, middleY: -5 },
  top: { startY: -50, middleY: 5 }
}

export default function BlurText({
  text,
  className = '',
  as: Tag = 'h1',
  delay = 200,
  mode = 'words',
  direction = 'bottom'
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const pieces = useMemo(() => {
    if (!text) return []
    return mode === 'letters' ? text.split('') : text.split(' ')
  }, [mode, text])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const { startY, middleY } = directions[direction] || directions.bottom

  return (
    <Tag ref={ref} className={className}>
      {pieces.map((piece, index) => {
        const isWordMode = mode === 'words'
        const content = isWordMode ? `${piece} ` : piece

        return (
          <motion.span
            key={`${piece}-${index}`}
            className='inline-block will-change-transform'
            initial={{ filter: 'blur(10px)', opacity: 0, y: startY }}
            animate={
              isVisible
                ? {
                    filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'],
                    opacity: [0, 0.5, 1],
                    y: [startY, middleY, 0]
                  }
                : undefined
            }
            transition={{
              delay: index * (delay / 1000),
              duration: 1.05,
              times: [0, 0.5, 1],
              ease: 'easeOut'
            }}
          >
            {content === ' ' ? '\u00A0' : content}
          </motion.span>
        )
      })}
    </Tag>
  )
}
