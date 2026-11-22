import { useEffect, useRef, useState } from 'react'

/**
 * 可拖拽组件
 * @param {children} 渲染的子元素
 * @param {stick} 是否要吸附
 * @returns
 */
export const Draggable = ({ children, stick, handleClassName }) => {
  const draggableRef = useRef(null)
  const rafRef = useRef(null)
  const currentObjRef = useRef(null)
  const offsetRef = useRef({ x: 0, y: 0 })
  const [moving, setMoving] = useState(false)

  useEffect(() => {
    function e(event) {
      if (!event) {
        event = window.event
        event.target = event.srcElement
        event.layerX = event.offsetX
        event.layerY = event.offsetY
      }
      if (event.type === 'touchstart' || event.type === 'touchmove') {
        event.clientX = event.touches[0].clientX
        event.clientY = event.touches[0].clientY
      }
      event.mx = event.pageX || event.clientX + document.body.scrollLeft
      event.my = event.pageY || event.clientY + document.body.scrollTop
      return event
    }

    document.addEventListener('mousedown', start)
    document.addEventListener('touchstart', start, { passive: false })

    function start(event) {
      const drag = draggableRef.current
      if (!drag) return
      event = e(event)
      if (event.target?.closest?.('button, a, input, select, textarea')) return

      if (inDragBox(event, drag)) {
        if (
          handleClassName &&
          !event.target?.closest?.(`.${handleClassName}`)
        ) {
          return
        }
        currentObjRef.current = drag.firstElementChild
      }
      if (currentObjRef.current) {
        if (event.type === 'touchstart') {
          event.preventDefault()
          document.documentElement.style.overflow = 'hidden'
        }

        setMoving(true)
        offsetRef.current = {
          x: event.mx - currentObjRef.current.offsetLeft,
          y: event.my - currentObjRef.current.offsetTop
        }

        document.addEventListener('mousemove', move)
        document.addEventListener('touchmove', move, { passive: false })
        document.addEventListener('mouseup', stop)
        document.addEventListener('touchend', stop)
      }
    }

    function move(event) {
      event = e(event)
      rafRef.current = requestAnimationFrame(() => updatePosition(event))
    }

    const stop = event => {
      event = e(event)
      document.documentElement.style.overflow = 'auto'
      cancelAnimationFrame(rafRef.current)
      setMoving(false)
      if (stick) {
        checkInWindow() // 吸附逻辑
      }
      currentObjRef.current = null
      document.removeEventListener('mousemove', move)
      document.removeEventListener('touchmove', move)
      document.removeEventListener('mouseup', stop)
      document.removeEventListener('touchend', stop)
    }

    const updatePosition = event => {
      if (currentObjRef.current) {
        const left = event.mx - offsetRef.current.x
        const top = event.my - offsetRef.current.y
        currentObjRef.current.style.left = left + 'px'
        currentObjRef.current.style.top = top + 'px'
      }
    }

    function inDragBox(event, drag) {
      const { clientX, clientY } = event
      const { offsetHeight, offsetWidth, offsetTop, offsetLeft } =
        drag.firstElementChild
      const horizontal =
        clientX > offsetLeft && clientX < offsetLeft + offsetWidth
      const vertical = clientY > offsetTop && clientY < offsetTop + offsetHeight

      return horizontal && vertical
    }

    function checkInWindow() {
      const drag = draggableRef.current
      if (!drag?.firstElementChild) return
      const { offsetHeight, offsetWidth, offsetTop, offsetLeft } =
        drag.firstElementChild
      const { clientHeight, clientWidth } = document.documentElement
      if (offsetTop < 0) {
        drag.firstElementChild.style.top = '0px'
      }
      if (offsetTop > clientHeight - offsetHeight) {
        drag.firstElementChild.style.top = clientHeight - offsetHeight + 'px'
      }
      if (offsetLeft < 0) {
        drag.firstElementChild.style.left = '0px'
      }
      if (offsetLeft > clientWidth - offsetWidth) {
        drag.firstElementChild.style.left = clientWidth - offsetWidth + 'px'
      }
      if (stick === 'left') {
        drag.firstElementChild.style.left = '0px'
      } else if (stick === 'right') {
        drag.firstElementChild.style.left = clientWidth - offsetWidth + 'px'
      }
    }

    window.addEventListener('resize', checkInWindow)

    return () => {
      window.removeEventListener('resize', checkInWindow)
      document.removeEventListener('mousedown', start)
      document.removeEventListener('touchstart', start)
      document.removeEventListener('mousemove', move)
      document.removeEventListener('touchmove', move)
      document.removeEventListener('mouseup', stop)
      document.removeEventListener('touchend', stop)
      cancelAnimationFrame(rafRef.current)
    }
  }, [stick, handleClassName])

  return (
    <div
      className={`draggable ${moving ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
      ref={draggableRef}>
      {children}
    </div>
  )
}
