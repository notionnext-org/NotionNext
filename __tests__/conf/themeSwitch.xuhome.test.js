/**
 * @jest-environment node
 */
import { getThemeSwitchMeta } from '@/conf/themeSwitch.manifest'
import CONFIG from '@/themes/xuhome/config'

describe('XuHome theme console colors', () => {
  it('exposes every color config in the palette instead of text settings', () => {
    const meta = getThemeSwitchMeta('xuhome')
    const colorKeys = Object.keys(CONFIG).filter(key =>
      /_COLOR(?:_|$)|_THEME_COLOR(?:_|$)/.test(key)
    )
    const paletteKeys = meta.palette.map(item => item.key)
    const settingKeys = meta.settings.map(item => item.key)

    expect(paletteKeys).toEqual(expect.arrayContaining(colorKeys))
    expect(settingKeys).not.toEqual(expect.arrayContaining(colorKeys))
    expect(new Set(paletteKeys).size).toBe(paletteKeys.length)
  })

  it('uses dedicated live CSS variables for the Hero colors', () => {
    const paletteByKey = Object.fromEntries(
      getThemeSwitchMeta('xuhome').palette.map(item => [item.key, item])
    )

    expect(paletteByKey.XUHOME_HERO_TITLE_COLOR.cssVar).toBe(
      '--xuhome-hero-title-color'
    )
    expect(paletteByKey.XUHOME_HERO_BIO_COLOR.cssVar).toBe(
      '--xuhome-hero-bio-color'
    )
  })
})
