import { useEffect } from 'react'

export default function DisableCopy() {
  useEffect(() => {
    const html = document.getElementsByTagName('html')[0]
    const handleCopy = event => {
      event.preventDefault()
      alert('抱歉，本网页内容不可复制！')
    }

    html.classList.add('forbid-copy')
    document.addEventListener('copy', handleCopy)

    return () => {
      html.classList.remove('forbid-copy')
      document.removeEventListener('copy', handleCopy)
    }
  }, [])

  return null
}
