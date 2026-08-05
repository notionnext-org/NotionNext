import { resolveArticleCopyrightText } from '@/lib/utils/articleCopyright'

const locale = {
  COMMON: {
    COPYRIGHT_NOTICE: 'default notice'
  }
}

describe('resolveArticleCopyrightText', () => {
  it('uses the default notice when the legacy copyright switch is enabled', () => {
    expect(
      resolveArticleCopyrightText({
        post: {},
        locale,
        mode: true
      })
    ).toBe('default notice')
  })

  it('uses post copyright when the legacy copyright switch is enabled', () => {
    expect(
      resolveArticleCopyrightText({
        post: { copyright: ' custom notice ' },
        locale,
        mode: true
      })
    ).toBe('custom notice')
  })

  it('hides copyright when both switches are disabled', () => {
    expect(
      resolveArticleCopyrightText({
        post: { copyright: 'custom notice' },
        locale,
        mode: false
      })
    ).toBe('')
  })

  it('hides copyright when the string false is configured', () => {
    expect(
      resolveArticleCopyrightText({
        post: { copyright: 'custom notice' },
        locale,
        mode: 'false'
      })
    ).toBe('')
  })

  it('shows only posts with custom copyright in custom mode', () => {
    expect(
      resolveArticleCopyrightText({
        post: { copyright: 'custom notice' },
        locale,
        mode: 'custom'
      })
    ).toBe('custom notice')

    expect(
      resolveArticleCopyrightText({
        post: {},
        locale,
        mode: 'custom'
      })
    ).toBe('')
  })
})
