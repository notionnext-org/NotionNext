import {
  getEndspaceActiveMenuName,
  getEndspaceMenuItems
} from '@/themes/endspace/components/menu'
import { siteConfig } from '@/lib/config'

jest.mock('@/lib/config', () => ({
  siteConfig: jest.fn()
}))

describe('endspace menu helpers', () => {
  beforeEach(() => {
    siteConfig.mockImplementation(key => key === 'CUSTOM_MENU')
  })

  it('keeps custom submenu items and activates their parent', () => {
    const items = getEndspaceMenuItems({
      customMenu: [
        {
          name: 'Docs',
          show: true,
          subMenus: [{ title: 'Guide', href: '/guide', show: true }]
        }
      ]
    })

    expect(items).toHaveLength(1)
    expect(items[0].subMenus).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Guide', path: '/guide' })
      ])
    )
    expect(getEndspaceActiveMenuName(items, '/guide/install')).toBe('Docs')
  })
})
