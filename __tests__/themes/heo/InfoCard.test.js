import { normalizeInfoCardGreetings } from '@/themes/heo/components/InfoCard'

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
