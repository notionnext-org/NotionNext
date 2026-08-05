import { getThemeSwitchMeta } from '@/conf/themeSwitch.manifest'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { getQueryParam } from '@/lib/utils'
import { THEMES } from '@/themes/theme'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Draggable } from './Draggable'
import { Moon, Sun } from './HeroIcons'
import LazyImage from './LazyImage'
import SideBarDrawer from './SideBarDrawer'

function ThemeTierBadge ({ tier, labels }) {
  const isPaid = tier === 'paid'
  const text = isPaid ? labels.paid : labels.free
  const cls = isPaid
    ? 'border-amber-200/90 bg-amber-50 text-amber-800 dark:border-amber-500/40 dark:bg-amber-950/45 dark:text-amber-200'
    : 'border-emerald-200/90 bg-emerald-50 text-emerald-800 dark:border-emerald-500/35 dark:bg-emerald-950/40 dark:text-emerald-200'
  return (
    <span
      className={`inline-flex max-w-full shrink-0 items-center truncate rounded-md border px-1.5 py-0.5 text-[10px] font-semibold tracking-wide ${cls}`}
      title={text}>
      {text}
    </span>
  )
}

const EMPTY_CONSOLE_ITEMS = []

function PaletteField ({ item, value, copyValue, isHexColor, updateItem, resetItem, copyText }) {
  return (
    <div
      className='min-w-0 rounded-xl border border-gray-100 bg-white p-2 dark:border-gray-800 dark:bg-gray-950/70 sm:p-3'>
      <div className='mb-2 flex items-start gap-2'>
        <input
          type='color'
          value={isHexColor(value) ? value : '#000000'}
          disabled={!isHexColor(value)}
          onChange={event => updateItem(item, event.target.value)}
          className='h-9 w-9 shrink-0 cursor-pointer rounded-lg border border-black/10 bg-transparent p-0 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10'
          title={isHexColor(value) ? item.label : 'Text value only'}
        />
        <div className='min-w-0 flex-1'>
          <p className='truncate text-xs font-semibold text-gray-900 dark:text-gray-100'>
            {item.label}
          </p>
          <div className='flex min-w-0 items-center gap-1'>
            <span className='truncate font-mono text-[9px] text-gray-500 dark:text-gray-400'>
              {item.key}
            </span>
            <button
              type='button'
              onClick={() => void copyText(item.key, '配置名已复制到剪贴板')}
              className='flex h-5 w-5 shrink-0 items-center justify-center rounded text-gray-400 transition hover:bg-gray-100 hover:text-indigo-600 dark:hover:bg-gray-800 dark:hover:text-indigo-300'
              title='复制配置名'
              aria-label={`复制配置名 ${item.key}`}>
              <i className='fa-regular fa-copy text-[10px]' aria-hidden />
            </button>
          </div>
        </div>
        <button
          type='button'
          onClick={() => resetItem(item)}
          className='flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white'
          title='Reset'>
          <i className='fa-solid fa-rotate-left text-xs' aria-hidden />
        </button>
      </div>
      <div className='flex items-center gap-1.5'>
        <input
          value={value}
          onChange={event => updateItem(item, event.target.value)}
          className='h-8 min-w-0 flex-1 rounded-md border border-gray-200 bg-white px-2 font-mono text-[11px] text-gray-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20'
        />
        <button
          type='button'
          onClick={() => void copyText(copyValue, '配置值已复制到剪贴板')}
          className='flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:hover:border-indigo-600 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300'
          title='复制配置值'
          aria-label={`复制配置值 ${item.key}`}>
          <i className='fa-regular fa-copy text-xs' aria-hidden />
        </button>
      </div>
    </div>
  )
}

function ThemeConsole ({ meta, onClose }) {
  const { updateRuntimeConfigOverride, THEME_CONFIG } = useGlobal()
  const noticeTimerRef = useRef(null)
  const [values, setValues] = useState({})
  const [palette, setPalette] = useState([])
  const [settingValues, setSettingValues] = useState({})
  const [openSections, setOpenSections] = useState({
    settings: false,
    palette: false
  })
  const [notice, setNotice] = useState('')
  const declaredPalette = meta.palette || EMPTY_CONSOLE_ITEMS
  const settings = meta.settings || EMPTY_CONSOLE_ITEMS
  const rootId = meta.rootId || `theme-${meta.id}`

  const formatConfigValue = value => {
    if (typeof value === 'boolean') return value ? 'true' : 'false'
    const text = String(value).trim()
    return /^-?\d+(\.\d+)?$/.test(text)
      ? text
      : `'${text.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
  }

  const readSettingValue = item => siteConfig(item.key, item.defaultValue, THEME_CONFIG || {})

  const hexToHue = value => {
    const hex = String(value || '').trim().replace('#', '')
    if (!/^[0-9a-f]{6}$/i.test(hex)) return value
    const r = parseInt(hex.slice(0, 2), 16) / 255
    const g = parseInt(hex.slice(2, 4), 16) / 255
    const b = parseInt(hex.slice(4, 6), 16) / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min
    if (delta === 0) return 0
    const hue = max === r
      ? ((g - b) / delta) % 6
      : max === g
        ? (b - r) / delta + 2
        : (r - g) / delta + 4
    return Math.round((hue * 60 + 360) % 360)
  }

  const hueToHex = value => {
    const hue = Number.parseInt(value, 10)
    if (!Number.isFinite(hue)) return value
    const h = Math.min(360, Math.max(0, hue))
    const s = 0.85
    const l = 0.62
    const a = s * Math.min(l, 1 - l)
    const f = n => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }

  const getPreviewValue = (item, value) => {
    if (item.key === 'FUWARI_THEME_COLOR_HUE') return hueToHex(value)
    return value
  }

  const getConsoleAlias = useCallback(item => {
    const prefix = `${String(meta.id).toUpperCase()}_COLOR_`
    if (item.key.startsWith(prefix)) {
      return item.key.slice(prefix.length).toLowerCase().replace(/_/g, '-')
    }
    return String(item.cssVar || '').replace(/^--/, '').replace(`${meta.id}-`, '')
  }, [meta.id])

  const writePreviewColor = useCallback((root, item, value) => {
    root.style.setProperty(item.cssVar, value)
    root.style.setProperty(`--${meta.id}-console-${getConsoleAlias(item)}`, value)
  }, [getConsoleAlias, meta.id])

  const getExportValue = item => {
    const value = values[item.key] ?? item.defaultValue
    if (item.key === 'FUWARI_THEME_COLOR_HUE') return hexToHue(value)
    return value
  }

  const getRoot = () =>
    document.getElementById(rootId) || document.documentElement

  useEffect(() => {
    if (!declaredPalette.length) {
      setPalette([])
      return
    }
    const root =
      document.getElementById(meta.rootId || `theme-${meta.id}`) ||
      document.documentElement
    const styles = getComputedStyle(root)
    const nextValues = {}
    declaredPalette.forEach(item => {
      nextValues[item.key] =
        styles.getPropertyValue(item.cssVar).trim() || item.defaultValue
      writePreviewColor(root, item, nextValues[item.key])
    })
    setPalette(declaredPalette)
    setValues(nextValues)
  }, [meta.id, meta.rootId, declaredPalette, writePreviewColor])

  useEffect(() => () => window.clearTimeout(noticeTimerRef.current), [])

  if (!declaredPalette.length && !settings.length) return null

  const isHexColor = value => /^#[0-9a-f]{6}$/i.test(String(value).trim())
  const isDarkPaletteItem = item =>
    /_DARK($|_)/.test(item.key) || String(item.label || '').includes('深色')
  const lightPalette = palette.filter(item => !isDarkPaletteItem(item))
  const darkPalette = palette.filter(isDarkPaletteItem)

  const updateItem = (item, value) => {
    const previewValue = getPreviewValue(item, value)
    setValues(prev => ({ ...prev, [item.key]: previewValue }))
    const root = getRoot()
    writePreviewColor(root, item, previewValue)
    if (meta.id === 'fuwari' && item.cssVar === '--fuwari-primary') {
      root.style.setProperty('--fuwari-primary-soft', `color-mix(in oklab, ${previewValue} 14%, transparent)`)
      root.style.setProperty('--fuwari-gradient', `linear-gradient(135deg, ${previewValue} 0%, color-mix(in oklab, ${previewValue} 70%, #ffffff) 100%)`)
    }
  }

  const resetItem = item => updateItem(item, item.defaultValue)

  const updateSetting = (item, value) => {
    setSettingValues(prev => ({ ...prev, [item.key]: value }))
    updateRuntimeConfigOverride?.(item.key, value)
  }

  const updateSelectSetting = (item, selectedValue) => {
    const option = (item.options || []).find(option => String(option.value) === selectedValue)
    updateSetting(item, option ? option.value : selectedValue)
  }

  const resetSetting = item => updateSetting(item, item.defaultValue)

  const resetAllSettings = () => {
    settings.forEach(resetSetting)
    showNotice('信息配置已恢复默认')
  }

  const resetAllPalette = () => {
    palette.forEach(resetItem)
    showNotice('配色已恢复默认')
  }

  const toggleSection = key => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const showNotice = text => {
    setNotice(text)
    window.clearTimeout(noticeTimerRef.current)
    noticeTimerRef.current = window.setTimeout(() => setNotice(''), 1800)
  }

  const copyText = async (text, message = '配置已复制到剪贴板') => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable')
      await navigator.clipboard.writeText(String(text))
      showNotice(message)
    } catch {
      showNotice('复制失败，请检查浏览器剪贴板权限')
    }
  }

  const copyAll = () => {
    const settingText = settings.map(item => {
      const value = settingValues[item.key] ?? readSettingValue(item)
      return `${item.key}: ${formatConfigValue(value)}`
    })
    const paletteText = palette
      .map(item => {
        const value = getExportValue(item)
        return `${item.key}: ${formatConfigValue(value)}`
      })
    const text = settingText.concat(paletteText).join(',\n')
    copyText(text, '全部配置已复制到剪贴板')
  }

  const parseConfigText = text => {
    const trimmed = String(text || '').trim()
    if (!trimmed) return {}
    try {
      return JSON.parse(trimmed)
    } catch {
      return trimmed.split(/\r?\n/).reduce((acc, line) => {
        const match = line.match(/^\s*([A-Z0-9_]+)\s*:\s*(.+?)\s*,?\s*$/)
        if (!match) return acc
        let value = match[2].trim()
        if ((value.startsWith("'") && value.endsWith("'")) || (value.startsWith('"') && value.endsWith('"'))) {
          value = value.slice(1, -1)
        } else if (value === 'true' || value === 'false') {
          value = value === 'true'
        } else if (/^-?\d+(\.\d+)?$/.test(value)) {
          value = Number(value)
        }
        acc[match[1]] = value
        return acc
      }, {})
    }
  }

  const importConfigFromClipboard = async () => {
    try {
      const text = await navigator.clipboard?.readText()
      if (!text) {
        showNotice('剪贴板为空，请先复制 Notion Config 配置片段')
        return
      }
      const data = parseConfigText(text)
      let count = 0
      settings.forEach(item => {
        if (!(item.key in data)) return
        const value = item.type === 'boolean' ? data[item.key] === true || data[item.key] === 'true' : data[item.key]
        updateSetting(item, value)
        count++
      })
      palette.forEach(item => {
        if (item.key in data) {
          updateItem(item, data[item.key])
          count++
        }
      })
      showNotice(count ? `已从剪贴板导入 ${count} 项配置` : '未识别到当前主题可用配置')
    } catch {
      showNotice('无法读取剪贴板，请检查浏览器剪贴板权限')
    }
  }

  return (
    <Draggable stick={true}>
      <section
        style={{ right: '1rem', top: '10vh' }}
        className='fixed z-50 w-[min(94vw,40rem)] overflow-hidden rounded-2xl border border-gray-200/80 bg-white/95 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl dark:border-gray-700/70 dark:bg-gray-950/95 dark:ring-white/10 sm:w-[min(92vw,42rem)]'>
        <div className='flex items-start justify-between gap-3 border-b border-gray-100 px-4 py-3 dark:border-gray-800'>
          <div className='min-w-0'>
            <p className='text-sm font-semibold text-gray-900 dark:text-white'>
              主题控制台 · {meta.name}
            </p>
            <p className='mt-0.5 text-xs text-gray-500 dark:text-gray-400'>
              实时预览当前主题配置，复制后写入 Notion Config。
            </p>
          </div>
          <div className='flex shrink-0 items-center gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1 shadow-sm dark:border-gray-700 dark:bg-gray-900'>
            <button
              type='button'
              onClick={copyAll}
              className='flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-gray-600 transition hover:border-indigo-200 hover:bg-white hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-gray-300 dark:hover:border-indigo-700 dark:hover:bg-gray-800 dark:hover:text-indigo-300'
              title='导出全部配置'>
              <i className='fa-solid fa-file-export text-sm' aria-hidden />
            </button>
            <button
              type='button'
              onClick={() => void importConfigFromClipboard()}
              className='flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-gray-600 transition hover:border-indigo-200 hover:bg-white hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-gray-300 dark:hover:border-indigo-700 dark:hover:bg-gray-800 dark:hover:text-indigo-300'
              title='导入配置'>
              <i className='fa-solid fa-file-import text-sm' aria-hidden />
            </button>
            <button
              type='button'
              onClick={onClose}
              className='flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 dark:text-gray-300 dark:hover:border-red-800 dark:hover:bg-red-950/50 dark:hover:text-red-300'
              title='Close'>
              <i className='fas fa-times text-sm' aria-hidden />
            </button>
          </div>
        </div>
        {notice ? (
          <div className='border-b border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/60 dark:text-emerald-200'>
            {notice}
          </div>
        ) : null}
        <div className='max-h-[72vh] space-y-3 overflow-y-auto p-3 sm:p-4'>
          <section className='overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-900/60'>
            <div className='flex items-center'>
              <button
                type='button'
                onClick={() => toggleSection('settings')}
                className='group flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 dark:hover:bg-gray-800 sm:pl-4'>
                <span>
                  <span className='block text-sm font-semibold text-gray-900 dark:text-white'>
                    信息配置
                  </span>
                  <span className='mt-0.5 block text-xs text-gray-500 dark:text-gray-400'>
                    当前主题安全白名单配置
                  </span>
                </span>
                <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition group-hover:border-indigo-300 group-hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:group-hover:border-indigo-600 dark:group-hover:text-indigo-300'>
                  <i
                    className={`fa-solid fa-chevron-down text-xs transition-transform ${openSections.settings ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </span>
              </button>
              <button
                type='button'
                onClick={resetAllSettings}
                className='mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:border-amber-700 dark:hover:bg-amber-950/50 dark:hover:text-amber-300'
                title='恢复默认信息配置'
                aria-label='恢复默认信息配置'>
                <i className='fa-solid fa-rotate-left text-xs' aria-hidden />
              </button>
            </div>
            {openSections.settings && (
              <div className='grid grid-cols-1 gap-2 border-t border-gray-100 p-3 dark:border-gray-800 sm:grid-cols-2'>
                {settings.length ? settings.map(item => {
                  const value = settingValues[item.key] ?? readSettingValue(item)
                  return (
                    <div
                      key={item.key}
                      className='min-w-0 rounded-xl border border-gray-100 bg-white p-3 dark:border-gray-800 dark:bg-gray-950/70'>
                      <div className='mb-2 flex items-start justify-between gap-2'>
                        <div className='min-w-0'>
                          <p className='truncate text-xs font-semibold text-gray-900 dark:text-gray-100'>
                            {item.label}
                          </p>
                          <div className='flex min-w-0 items-center gap-1'>
                            <span className='truncate font-mono text-[10px] text-gray-500 dark:text-gray-400'>
                              {item.key}
                            </span>
                            <button
                              type='button'
                              onClick={() => void copyText(item.key, '配置名已复制到剪贴板')}
                              className='flex h-5 w-5 shrink-0 items-center justify-center rounded text-gray-400 transition hover:bg-gray-100 hover:text-indigo-600 dark:hover:bg-gray-800 dark:hover:text-indigo-300'
                              title='复制配置名'
                              aria-label={`复制配置名 ${item.key}`}>
                              <i className='fa-regular fa-copy text-[10px]' aria-hidden />
                            </button>
                          </div>
                          {item.help ? (
                            <p className='mt-1 line-clamp-2 text-[11px] leading-snug text-gray-500 dark:text-gray-400'>
                              {item.help}
                            </p>
                          ) : null}
                        </div>
                        <button
                          type='button'
                          onClick={() => resetSetting(item)}
                          className='flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white'
                          title='Reset'>
                          <i className='fa-solid fa-rotate-left text-xs' aria-hidden />
                        </button>
                      </div>
                      <div className='flex items-center gap-1.5'>
                      {item.type === 'boolean' ? (
                        <button
                          type='button'
                          onClick={() => updateSetting(item, !value)}
                          className={`flex h-6 w-11 items-center rounded-full p-0.5 transition ${value ? 'justify-end bg-indigo-600' : 'justify-start bg-gray-300 dark:bg-gray-700'}`}
                          aria-pressed={Boolean(value)}>
                          <span
                            className='block h-5 w-5 rounded-full bg-white shadow transition-all'
                          />
                        </button>
                      ) : item.type === 'select' ? (
                        <select
                          value={String(value)}
                          onChange={event => updateSelectSetting(item, event.target.value)}
                          className='h-9 w-full rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-800 outline-none focus:border-indigo-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100'>
                          {(item.options || []).map(option => (
                            <option key={String(option.value)} value={String(option.value)}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={item.type === 'number' ? 'number' : 'text'}
                          value={value}
                          onChange={event => updateSetting(item, item.type === 'number' ? Number(event.target.value) : event.target.value)}
                          className='h-9 w-full rounded-md border border-gray-200 bg-white px-2 text-xs text-gray-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/20'
                        />
                      )}
                        <button
                          type='button'
                          onClick={() => void copyText(value, '配置值已复制到剪贴板')}
                          className='flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-gray-700 dark:hover:border-indigo-600 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300'
                          title='复制配置值'
                          aria-label={`复制配置值 ${item.key}`}>
                          <i className='fa-regular fa-copy text-xs' aria-hidden />
                        </button>
                      </div>
                    </div>
                  )
                }) : (
                  <p className='rounded-xl border border-dashed border-gray-200 p-3 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400 sm:col-span-2'>
                    当前主题暂未声明可在线调整的信息配置。
                  </p>
                )}
              </div>
            )}
          </section>

          {palette.length > 0 && (
          <section className='overflow-hidden rounded-2xl border border-gray-100 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-900/60'>
            <div className='flex items-center'>
              <button
                type='button'
                onClick={() => toggleSection('palette')}
                className='group flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500 dark:hover:bg-gray-800 sm:pl-4'>
                <span>
                  <span className='block text-sm font-semibold text-gray-900 dark:text-white'>
                    配色
                  </span>
                  <span className='mt-0.5 block text-xs text-gray-500 dark:text-gray-400'>
                    色值实时写入当前主题 CSS 变量
                  </span>
                </span>
                <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition group-hover:border-indigo-300 group-hover:text-indigo-600 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:group-hover:border-indigo-600 dark:group-hover:text-indigo-300'>
                  <i
                    className={`fa-solid fa-chevron-down text-xs transition-transform ${openSections.palette ? 'rotate-180' : ''}`}
                    aria-hidden
                  />
                </span>
              </button>
              <button
                type='button'
                onClick={resetAllPalette}
                className='mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 dark:hover:border-amber-700 dark:hover:bg-amber-950/50 dark:hover:text-amber-300'
                title='恢复默认配色'
                aria-label='恢复默认配色'>
                <i className='fa-solid fa-rotate-left text-xs' aria-hidden />
              </button>
            </div>
            {openSections.palette && (
              <div className='grid grid-cols-2 gap-2 border-t border-gray-100 p-3 dark:border-gray-800'>
                <div className='col-span-2 flex items-center gap-3 text-xs font-semibold text-gray-500 dark:text-gray-400'>
                  <span>浅色模式</span>
                  <span className='h-px flex-1 bg-gray-200 dark:bg-gray-700' />
                </div>
                {lightPalette.map(item => (
                  <PaletteField
                    key={item.key}
                    item={item}
                    value={values[item.key] || item.defaultValue}
                    copyValue={getExportValue(item)}
                    isHexColor={isHexColor}
                    updateItem={updateItem}
                    resetItem={resetItem}
                    copyText={copyText}
                  />
                ))}
                <div className='col-span-2 mt-2 flex items-center gap-3 border-t border-gray-200 pt-3 text-xs font-semibold text-gray-500 dark:border-gray-700 dark:text-gray-400'>
                  <span>深色模式</span>
                  <span className='h-px flex-1 bg-gray-200 dark:bg-gray-700' />
                </div>
                {darkPalette.map(item => (
                  <PaletteField
                    key={item.key}
                    item={item}
                    value={values[item.key] || item.defaultValue}
                    copyValue={getExportValue(item)}
                    isHexColor={isHexColor}
                    updateItem={updateItem}
                    resetItem={resetItem}
                    copyText={copyText}
                  />
                ))}
                {!darkPalette.length ? (
                  <div className='col-span-2 space-y-2'>
                    <p className='rounded-xl border border-dashed border-gray-200 p-3 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400'>
                      当前主题暂未声明深色模式色号。
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </section>
          )}
        </div>
      </section>
    </Draggable>
  )
}

/**
 *
 * @returns 主题切换
 */
const ThemeSwitch = () => {
  const { theme, locale, isDarkMode, toggleDarkMode } = useGlobal()
  const router = useRouter()
  const currentTheme = getQueryParam(router.asPath, 'theme') || theme
  const [sideBarVisible, setSideBarVisible] = useState(false)
  const [consoleVisible, setConsoleVisible] = useState(false)

  const currentMeta = getThemeSwitchMeta(currentTheme)
  const tierLabels = {
    free: locale.COMMON?.THEME_TIER_FREE ?? 'Free',
    paid: locale.COMMON?.THEME_TIER_PAID ?? 'Paid'
  }

  const changeTheme = newTheme => {
    const query = router.query
    query.theme = newTheme
    router.push({ pathname: router.pathname, query }).then(() => {})
  }

  return (
    <>
      {/* 悬浮的主题切换按钮 */}
      <Draggable stick={true}>
        <div
          id='draggableBox'
          style={{ left: '0px', top: '80vh' }}
          className={`group fixed z-50 flex max-w-[calc(100vw-1rem)] select-none items-center overflow-hidden rounded-xl border p-1 backdrop-blur-md transition ${
            isDarkMode
              ? 'border-gray-700/90 bg-gray-950/95 shadow-[0_8px_24px_rgba(0,0,0,0.4)] ring-1 ring-white/[0.06]'
              : 'border-gray-200/90 bg-white/95 shadow-[0_8px_24px_rgba(15,23,42,0.14)] ring-1 ring-black/[0.03]'
          }`}>
          {/* 悬浮入口：明暗随 isDarkMode，与 html.dark / 切换按钮一致 */}
          <div className='flex min-w-0 items-center gap-0.5'>
            <span
              data-drag-handle
              className={`flex h-9 w-7 shrink-0 cursor-grab items-center justify-center rounded-lg active:cursor-grabbing ${
                isDarkMode
                  ? 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
                  : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
              }`}
              title='拖拽移动'>
              <i className='fa-solid fa-grip-vertical text-xs' aria-hidden />
            </span>
            <button
              id='themeSelect'
              type='button'
              className={`flex h-9 min-w-0 max-w-[9.5rem] cursor-pointer items-center gap-2 rounded-lg px-2 text-left transition active:scale-[0.98] ${
                isDarkMode
                  ? 'text-gray-100 hover:bg-gray-800'
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
              onClick={() => {
                setSideBarVisible(true)
              }}
              title='切换主题'
              aria-label={`切换主题，当前为 ${currentMeta.name}`}>
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                  isDarkMode
                    ? 'bg-indigo-400/15 text-indigo-300'
                    : 'bg-indigo-50 text-indigo-600'
                }`}>
                <i className='fa-solid fa-layer-group text-xs leading-none' aria-hidden />
              </span>
              <span className='min-w-0 truncate text-sm font-semibold leading-none'>
                {currentMeta.name}
              </span>
            </button>
            <button
              type='button'
              className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg transition active:scale-95 ${
                isDarkMode
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-950'
              }`}
              onClick={() => {
                setConsoleVisible(visible => !visible)
              }}
              title='配置主题'
              aria-label='配置主题'
              aria-expanded={consoleVisible}>
              <i className='fa-solid fa-sliders translate-y-[-1px] text-sm leading-none' aria-hidden />
            </button>
            <button
              type='button'
              onClick={toggleDarkMode}
              className={`flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg transition active:scale-95 ${
                isDarkMode
                  ? 'text-amber-300 hover:bg-gray-800'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`}
              title={isDarkMode ? '切换浅色模式' : '切换深色模式'}
              aria-label={isDarkMode ? '切换浅色模式' : '切换深色模式'}>
              <span className='h-4 w-4 [&_svg]:h-4 [&_svg]:w-4'>
                {isDarkMode ? <Sun /> : <Moon />}
              </span>
            </button>
          </div>
        </div>
      </Draggable>

      {consoleVisible && (
        <ThemeConsole
          meta={currentMeta}
          onClose={() => {
            setConsoleVisible(false)
          }}
        />
      )}

      <SideBarDrawer
        className='flex max-h-screen w-[min(100vw-0.5rem,28rem)] flex-col overflow-hidden border-r border-gray-200/90 bg-white p-0 shadow-2xl dark:border-gray-800 dark:bg-gray-950 md:w-[min(100vw-2rem,48rem)] lg:w-[min(100vw-3rem,56rem)]'
        isOpen={sideBarVisible}
        showOnPC={true}
        onClose={() => {
          setSideBarVisible(false)
        }}>
        <div className='flex min-h-0 flex-1 flex-col overflow-y-auto'>
          <div className='sticky top-0 z-[1] border-b border-gray-100 bg-white/95 px-5 py-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/95'>
            <div className='flex items-start justify-between gap-3'>
              <div className='min-w-0'>
                <p className='text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500'>
                  {locale.MENU.THEME_SWITCH}
                </p>
                <p className='mt-0.5 truncate text-sm text-gray-600 dark:text-gray-300'>
                  {locale.COMMON.THEME_SWITCH}
                </p>
              </div>
              <button
                type='button'
                className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white'
                onClick={() => {
                  setSideBarVisible(false)
                }}>
                <i className='fas fa-times' />
              </button>
            </div>
          </div>

          <div className='space-y-6 px-5 pb-10 pt-6'>

            <div>
              <p className='text-sm font-medium text-gray-900 dark:text-gray-100'>
                点击下方主题进行切换.
              </p>
              <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
                Click below to switch the theme.
              </p>
            </div>

            {/* 陈列所有主题 — 仍为同一 map + changeTheme(t) */}
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
              {THEMES?.map(t => {
                const active = currentTheme === t
                const meta = getThemeSwitchMeta(t)
                return (
                  <div
                    className={`cursor-pointer rounded-2xl border bg-white p-1.5 shadow-sm transition dark:bg-gray-900/40 ${
                      active
                        ? 'border-indigo-500 ring-2 ring-indigo-500/30 dark:border-indigo-400'
                        : 'border-gray-100 hover:border-indigo-300 hover:shadow-md dark:border-gray-800 dark:hover:border-indigo-500/40'
                    }`}
                    key={t}
                    onClick={() => {
                      changeTheme(t)
                    }}>
                    <div className='mb-1 flex flex-wrap items-center justify-center gap-1.5 px-1 text-center'>
                      <span className='min-w-0 truncate text-xs font-semibold tracking-wide text-gray-800 dark:text-gray-100'>
                        {meta.name}
                      </span>
                      <ThemeTierBadge tier={meta.tier} labels={tierLabels} />
                    </div>
                    {meta.summary ? (
                      <p className='mb-2 line-clamp-2 px-1 text-center text-[11px] leading-snug text-gray-500 dark:text-gray-400'>
                        {meta.summary}
                      </p>
                    ) : null}
                    <div className='relative overflow-hidden rounded-xl'>
                      <LazyImage
                        src={meta.coverWebp || meta.coverPng}
                        fallbackSrc={meta.coverPng}
                        alt={`${meta.name} preview`}
                        width={320}
                        height={180}
                        className='w-full cursor-pointer rounded-xl object-cover shadow-inner transition duration-300 hover:scale-[1.02]'
                      />
                      {active && (
                        <span className='absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs text-white shadow-lg'>
                          <i className='fas fa-check' />
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </SideBarDrawer>
    </>
  )
}

export default ThemeSwitch
