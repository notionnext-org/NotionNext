/** @jest-environment node */

import { getInitialHue } from './ThemeColorSwitch'

describe('getInitialHue', () => {
  it('uses configured hue when the Fuwari theme color is fixed', () => {
    expect(getInitialHue('250', 52, true)).toBe(52)
  })

  it('keeps the stored hue when the palette is editable', () => {
    expect(getInitialHue('250', 52, false)).toBe(250)
  })
})
