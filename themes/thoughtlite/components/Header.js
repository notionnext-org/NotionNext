import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { MenuList } from './MenuList'

/**
 * ThoughtLite 风格顶栏：站点名 + 横向菜单 + 搜索 / 深浅色
 */
export const Header = props => {
  const { isDarkMode, toggleDarkMode } = useGlobal()

  const openSearch = () => {
    window.location.href = '/search'
  }

  return (
    <header className='tl-header sticky top-0 z-40 w-full'>
      <div className='mx-auto flex max-w-3xl items-center gap-2 px-4 py-3 md:gap-4 overflow-visible'>
        <SmartLink
          href='/'
          className='tl-brand flex-shrink-0 text-lg font-semibold text-[var(--tl-text)] no-underline hover:opacity-80'>
          {siteConfig('TITLE')}
        </SmartLink>

        <MenuList {...props} variant='header' />

        <div className='flex flex-shrink-0 items-center gap-1'>
          {siteConfig('THOUGHTLITE_MENU_SEARCH', null, CONFIG) && (
            <button
              type='button'
              className='tl-icon-btn'
              onClick={openSearch}
              aria-label='Search'>
              <i className='fas fa-search text-sm' />
            </button>
          )}
          <button
            type='button'
            className='tl-icon-btn'
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'Light mode' : 'Dark mode'}>
            <span className='text-base leading-none'>{isDarkMode ? '☀' : '☾'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
