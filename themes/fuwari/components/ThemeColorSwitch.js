import { useCallback, useEffect, useMemo, useState } from 'react'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

const STORAGE_HUE_KEY = 'fuwari-theme-hue'

function hslToHex(h, s, l) {
  s /= 100
  l /= 100
  const a = (s * Math.min(l, 1 - l))
  const f = n => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function normalizeHue(value, fallback) {
  const hue = Number.parseInt(value, 10)
  if (!Number.isFinite(hue)) return fallback
  return Math.min(360, Math.max(0, hue))
}

export function getInitialHue(storedHue, defaultHue, fixed) {
  if (fixed || !storedHue) return defaultHue
  return normalizeHue(storedHue, defaultHue)
}

const ThemeColorSwitch = ({ panelRef, visible = true, onColorChange }) => {
  const enabled = siteConfig('FUWARI_WIDGET_THEME_COLOR_SWITCHER', true, CONFIG)
  const defaultHue = normalizeHue(siteConfig('FUWARI_THEME_COLOR_HUE', 250, CONFIG), 250)
  const fixed = siteConfig('FUWARI_THEME_COLOR_FIXED', false, CONFIG)
  const [hue, setHue] = useState(defaultHue)
  const color = useMemo(() => hslToHex(hue, 85, 62), [hue])

  const applyColor = useCallback((nextColor, nextHue) => {
    const root = document.getElementById('theme-fuwari')
    if (!root) return
    root.style.setProperty('--fuwari-primary', nextColor)
    root.style.setProperty('--fuwari-primary-soft', `hsla(${nextHue}, 85%, 62%, 0.14)`)
    root.style.setProperty('--fuwari-gradient', 'linear-gradient(135deg, var(--fuwari-primary) 0%, color-mix(in oklab, var(--fuwari-primary) 70%, #ffffff) 100%)')
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_HUE_KEY)
    const initialHue = getInitialHue(stored, defaultHue, fixed)
    setHue(initialHue)
    applyColor(hslToHex(initialHue, 85, 62), initialHue)
  }, [applyColor, defaultHue, fixed])

  const handleSelect = nextHue => {
    setHue(nextHue)
    localStorage.setItem(STORAGE_HUE_KEY, String(nextHue))
    const nextColor = hslToHex(nextHue, 85, 62)
    applyColor(nextColor, nextHue)
    onColorChange?.(nextColor)
  }

  if (!visible || !enabled) return null

  const copyHex = () => {
    void navigator.clipboard.writeText(color)
  }

  return (
    <div
      ref={panelRef}
      className='fuwari-card absolute right-3 md:right-4 top-12 p-0 w-[min(20rem,calc(100vw-2rem))] md:w-80 z-50'>
      <section className='fuwari-theme-panel p-4'>
      <div className='flex items-center justify-between mb-3'>
        <h3 className='fuwari-section-title text-xl font-bold'>Theme Color</h3>
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={() => handleSelect(defaultHue)}
            className='fuwari-tool-btn w-8 h-8'
            title='Reset default hue'>
            <i className='fas fa-rotate-left text-xs' />
          </button>
          <button
            type='button'
            onClick={copyHex}
            className='px-2 h-8 rounded-md bg-[var(--fuwari-bg-soft)] border border-[var(--fuwari-border)] text-[var(--fuwari-primary)] font-bold'>
            {hue}
          </button>
        </div>
      </div>
      <div className='fuwari-hue-wrap'>
        <input
          type='range'
          min='0'
          max='360'
          step='5'
          value={hue}
          onChange={e => handleSelect(parseInt(e.target.value, 10))}
          className='fuwari-hue-slider'
        />
      </div>
      <p className='text-xs text-[var(--fuwari-muted)] mt-2 break-all'>Current HEX: {color}</p>
      </section>
    </div>
  )
}

export default ThemeColorSwitch

