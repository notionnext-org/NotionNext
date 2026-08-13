import { siteConfig } from '@/lib/config'
import { useEffect } from 'react'

const PWAInstaller = ({ NOTION_CONFIG }) => {
  const enabled = siteConfig('PWA_ENABLE', false, NOTION_CONFIG)

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return
    }

    if (!enabled) {
      navigator.serviceWorker
        .getRegistration('/sw.js')
        .then(registration => registration?.unregister())
        .catch(() => {})
      return
    }

    window.addEventListener(
      'load',
      () => {
        navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {})
      },
      { once: true }
    )
  }, [enabled])

  return null
}

export default PWAInstaller
