import { useState, useEffect, useCallback } from 'react'

export default function Typewriter({
  texts,
  speed = 80,
  deleteSpeed = 40,
  pause = 2000,
  loop = true
}) {
  const [displayed, setDisplayed] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor(prev => !prev), 530)
    return () => clearInterval(cursorInterval)
  }, [])

  const tick = useCallback(() => {
    if (!texts?.length) return

    const currentText = texts[textIndex % texts.length]

    if (isWaiting) return

    if (!isDeleting) {
      if (charIndex < currentText.length) {
        setDisplayed(currentText.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      } else {
        if (loop) {
          setIsWaiting(true)
          setTimeout(() => {
            setIsWaiting(false)
            setIsDeleting(true)
          }, pause)
        }
      }
    } else {
      if (charIndex > 0) {
        setDisplayed(currentText.slice(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      } else {
        setIsDeleting(false)
        setTextIndex((textIndex + 1) % texts.length)
      }
    }
  }, [texts, textIndex, charIndex, isDeleting, isWaiting, loop, pause])

  useEffect(() => {
    const timer = setTimeout(tick, isDeleting ? deleteSpeed : speed)
    return () => clearTimeout(timer)
  }, [tick, isDeleting, deleteSpeed, speed])

  return (
    <span className='inline'>
      {displayed}
      <span
        className='inline-block w-[3px] h-[1em] bg-[#0284c7] ml-0.5 align-middle'
        style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 80ms' }}
      />
    </span>
  )
}
