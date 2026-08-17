import { siteConfig } from '@/lib/config'
import { useEffect } from 'react'

const PWAInstaller = ({ NOTION_CONFIG }) => {
  const enabled = siteConfig('PWA_ENABLE', false, NOTION_CONFIG)

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return
    }

    let cancelled = false
    let loadHandler

    if (!enabled) {
      navigator.serviceWorker
        .getRegistration('/sw.js')
        .then(registration => {
          if (!cancelled) return registration?.unregister()
        })
        .catch(() => {})

      return () => {
        cancelled = true
      }
    }

    const register = () => {
      if (cancelled) return
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {})
    }

    if (document.readyState === 'complete') {
      register()
    } else {
      loadHandler = register
      window.addEventListener('load', loadHandler, { once: true })
    }

    return () => {
      cancelled = true
      if (loadHandler) window.removeEventListener('load', loadHandler)
    }
  }, [enabled])

  return null
}

export default PWAInstaller
