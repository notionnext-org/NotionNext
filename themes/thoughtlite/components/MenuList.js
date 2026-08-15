import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { MenuItemDrop } from './MenuItemDrop'

/**
 * 导航菜单列表
 * @param {*} props
 * @param {'stack'|'header'} [props.variant] stack：旧版通栏导航；header：顶栏内横向滚动
 * @returns
 */
export const MenuList = props => {
  const { customNav, customMenu, variant = 'stack' } = props
  const { locale } = useGlobal()

  let links = [
    {
      id: 1,
      icon: 'fas fa-search',
      name: locale.NAV.SEARCH,
      href: '/search',
      show: siteConfig('THOUGHTLITE_MENU_SEARCH', null, CONFIG)
    },
    {
      id: 2,
      icon: 'fas fa-archive',
      name: locale.NAV.ARCHIVE,
      href: '/archive',
      show: siteConfig('THOUGHTLITE_MENU_ARCHIVE', null, CONFIG)
    },
    {
      id: 3,
      icon: 'fas fa-folder',
      name: locale.COMMON.CATEGORY,
      href: '/category',
      show: siteConfig('THOUGHTLITE_MENU_CATEGORY', null, CONFIG)
    },
    {
      id: 4,
      icon: 'fas fa-tag',
      name: locale.COMMON.TAGS,
      href: '/tag',
      show: siteConfig('THOUGHTLITE_MENU_TAG', null, CONFIG)
    }
  ]

  if (customNav) {
    links = links.concat(customNav)
  }

  // 如果 开启自定义菜单，则不再使用 Page生成菜单。
  if (siteConfig('CUSTOM_MENU')) {
    links = customMenu
  }

  if (!links || links.length === 0) {
    return null
  }

  if (variant === 'header') {
    return (
      <nav aria-label='Main' className='flex-1 min-w-0 flex justify-center overflow-visible'>
        <ul className='flex items-center gap-0.5 sm:gap-1 overflow-x-auto max-w-full py-1 no-scrollbar overflow-y-visible'>
          {links
            .filter(link => link?.show !== false)
            .map((link, index) => (
              <MenuItemDrop key={link.id ?? index} link={link} variant='inline' />
            ))}
        </ul>
      </nav>
    )
  }

  return (
    <nav className='w-full bg-white md:pt-0 px-6 relative z-20 border-t border-b border-gray-light dark:border-hexo-black-gray dark:bg-black'>
      <div className='mx-auto max-w-4xl md:flex justify-between items-center text-sm md:text-md md:justify-start'>
        <ul className='w-full text-center md:text-left flex flex-wrap justify-center items-stretch md:justify-start md:items-start'>
          {links.map((link, index) => (
            <MenuItemDrop key={index} link={link} />
          ))}
        </ul>
        {/* <div className="w-full md:w-1/3 text-center md:text-right"> */}
        {/* <!-- extra links --> */}
        {/* </div> */}
      </div>
    </nav>
  )
}
