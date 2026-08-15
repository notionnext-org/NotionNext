import {
  normalizeInfoCardGreetings,
  shouldUseInfoCardBlurAvatar
} from '@/themes/heo/components/InfoCard'

describe('heo InfoCard greetings', () => {
  it('keeps configured greeting arrays intact', () => {
    expect(normalizeInfoCardGreetings(['12', '23', '34'])).toEqual([
      '12',
      '23',
      '34'
    ])
  })

  it('parses Notion string arrays that use single quotes', () => {
    expect(normalizeInfoCardGreetings("['12', '23', '34']")).toEqual([
      '12',
      '23',
      '34'
    ])
  })

  it('treats a plain string as a single greeting', () => {
    expect(normalizeInfoCardGreetings('Hello')).toEqual(['Hello'])
  })
})

describe('heo InfoCard avatar blur', () => {
  it('uses the decorative blur avatar only on slug pages when enabled', () => {
    expect(shouldUseInfoCardBlurAvatar(true, true)).toBe(true)
  })

  it('keeps the normal avatar when the option is disabled', () => {
    expect(shouldUseInfoCardBlurAvatar(true, false)).toBe(false)
    expect(shouldUseInfoCardBlurAvatar(false, true)).toBe(false)
  })
})
