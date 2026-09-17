/**
 * @jest-environment node
 */
import {
  getReadableForeground,
  writeThemePreviewColor
} from '@/lib/themeColorUtils'

describe('theme color utilities', () => {
  it('selects a contrasting foreground for bright and dark colors', () => {
    expect(getReadableForeground('#c0f500')).toBe('#000000')
    expect(getReadableForeground('#111827')).toBe('#ffffff')
    expect(getReadableForeground('#ff0000')).toBe('#000000')
  })

  it('updates source colors without pinning the active light/dark alias', () => {
    const values = new Map()
    const root = {
      style: {
        setProperty: (key, value) => values.set(key, value)
      }
    }

    writeThemePreviewColor(
      root,
      'xuhome',
      {
        key: 'XUHOME_COLOR_PRIMARY_HOVER_DARK',
        cssVar: '--xuhome-color-primary-hover-dark'
      },
      '#c0f500'
    )

    expect(values.get('--xuhome-color-primary-hover-dark')).toBe('#c0f500')
    expect(values.get('--xuhome-on-primary-hover-dark')).toBe('#000000')
    expect(values.has('--xuhome-console-primary-hover')).toBe(false)
  })
})
