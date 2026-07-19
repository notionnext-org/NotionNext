/* eslint-disable react/no-unknown-property */
import { themeConsoleStyle } from '@/lib/themeConsoleStyle'
import { siteConfig } from '@/lib/config'
import CONFIG from './config'

/**
 * 这里的css样式只对当前主题生效
 * 主题客制化css
 * @returns
 */
const Style = () => {
  // 从配置中获取主题色，如果没有配置则使用默认值 #928CEE
  const legacyThemeColor = siteConfig('HEXO_THEME_COLOR', '#928CEE', CONFIG)
  const primary = siteConfig('HEXO_COLOR_PRIMARY', legacyThemeColor, CONFIG)
  const primaryDark = siteConfig('HEXO_COLOR_PRIMARY_DARK', primary, CONFIG)
  const background = siteConfig('HEXO_COLOR_BG', '#f5f5f5', CONFIG)
  const backgroundDark = siteConfig('HEXO_COLOR_BG_DARK', '#000000', CONFIG)
  const surface = siteConfig('HEXO_COLOR_CARD', '#ffffff', CONFIG)
  const surfaceDark = siteConfig('HEXO_COLOR_CARD_DARK', '#101414', CONFIG)
  const title = siteConfig('HEXO_COLOR_TITLE', '#4b5563', CONFIG)
  const titleDark = siteConfig('HEXO_COLOR_TITLE_DARK', '#f3f4f6', CONFIG)
  const text = siteConfig('HEXO_COLOR_TEXT', '#374151', CONFIG)
  const textDark = siteConfig('HEXO_COLOR_TEXT_DARK', '#d1d5db', CONFIG)
  const textSecondary = siteConfig('HEXO_COLOR_TEXT_SECONDARY', '#9ca3af', CONFIG)
  const textSecondaryDark = siteConfig('HEXO_COLOR_TEXT_SECONDARY_DARK', '#6b7280', CONFIG)
  const border = siteConfig('HEXO_COLOR_BORDER', '#e5e7eb', CONFIG)
  const borderDark = siteConfig('HEXO_COLOR_BORDER_DARK', '#000000', CONFIG)

  return (
    <style jsx global>{`
      #theme-hexo {
        --hexo-color-primary-light: ${primary};
        --hexo-color-primary-dark: ${primaryDark};
        --hexo-color-bg-light: ${background};
        --hexo-color-bg-dark: ${backgroundDark};
        --hexo-color-card-light: ${surface};
        --hexo-color-card-dark: ${surfaceDark};
        --hexo-color-title-light: ${title};
        --hexo-color-title-dark: ${titleDark};
        --hexo-color-text-light: ${text};
        --hexo-color-text-dark: ${textDark};
        --hexo-color-text-secondary-light: ${textSecondary};
        --hexo-color-text-secondary-dark: ${textSecondaryDark};
        --hexo-color-border-light: ${border};
        --hexo-color-border-dark: ${borderDark};
        --theme-color: var(--hexo-color-primary-light);
        --hexo-color-bg: var(--hexo-color-bg-light);
        --hexo-color-card: var(--hexo-color-card-light);
        --hexo-color-title: var(--hexo-color-title-light);
        --hexo-color-text: var(--hexo-color-text-light);
        --hexo-color-text-secondary: var(--hexo-color-text-secondary-light);
        --hexo-color-border: var(--hexo-color-border-light);
      }

      .dark #theme-hexo {
        --theme-color: var(--hexo-color-primary-dark);
        --hexo-color-bg: var(--hexo-color-bg-dark);
        --hexo-color-card: var(--hexo-color-card-dark);
        --hexo-color-title: var(--hexo-color-title-dark);
        --hexo-color-text: var(--hexo-color-text-dark);
        --hexo-color-text-secondary: var(--hexo-color-text-secondary-dark);
        --hexo-color-border: var(--hexo-color-border-dark);
      }

      #theme-hexo,
      #theme-hexo .bg-hexo-background-gray {
        background-color: var(--hexo-color-bg);
      }

      #theme-hexo #blog-post-card,
      #theme-hexo .card,
      #theme-hexo #announcement-wrapper,
      #theme-hexo .article {
        background-color: var(--hexo-color-card);
        border-color: var(--hexo-color-border);
      }

      #theme-hexo #blog-post-card h2 .menu-link {
        color: var(--hexo-color-title);
      }

      #theme-hexo #blog-post-card main,
      #theme-hexo #blog-post-card p {
        color: var(--hexo-color-text);
      }

      #theme-hexo #blog-post-card .text-gray-400 {
        color: var(--hexo-color-text-secondary);
      }

      /*  菜单下划线动画 */
      #theme-hexo .menu-link {
        text-decoration: none;
        background-image: linear-gradient(
          var(--theme-color),
          var(--theme-color)
        );
        background-repeat: no-repeat;
        background-position: bottom center;
        background-size: 0 2px;
        transition: background-size 100ms ease-in-out;
      }

      #theme-hexo .menu-link:hover {
        background-size: 100% 2px;
        color: var(--theme-color);
      }

      /* 文章列表中标题行悬浮时的文字颜色 */
      #theme-hexo h2:hover .menu-link {
        color: var(--theme-color) !important;
      }
      .dark #theme-hexo h2:hover .menu-link {
        color: var(--theme-color) !important;
      }

      /* 下拉菜单悬浮背景色 */
      #theme-hexo li[class*='hover:bg-indigo-500']:hover {
        background-color: var(--theme-color) !important;
      }

      /* tag标签悬浮背景色 */
      #theme-hexo a[class*='hover:bg-indigo-400']:hover {
        background-color: var(--theme-color) !important;
      }

      /* 社交按钮悬浮颜色 */
      #theme-hexo i[class*='hover:text-indigo-600']:hover {
        color: var(--theme-color) !important;
      }
      .dark #theme-hexo i[class*='dark:hover:text-indigo-400']:hover {
        color: var(--theme-color) !important;
      }

      /* MenuGroup 悬浮颜色 */
      #theme-hexo #nav div[class*='hover:text-indigo-600']:hover {
        color: var(--theme-color) !important;
      }
      .dark #theme-hexo #nav div[class*='dark:hover:text-indigo-400']:hover {
        color: var(--theme-color) !important;
      }

      /* 最新发布文章悬浮颜色 */
      #theme-hexo div[class*='hover:text-indigo-600']:hover,
      #theme-hexo div[class*='hover:text-indigo-400']:hover {
        color: var(--theme-color) !important;
      }

      /* 分页组件颜色 */
      #theme-hexo .text-indigo-400 {
        color: var(--theme-color) !important;
      }
      #theme-hexo .border-indigo-400 {
        border-color: var(--theme-color) !important;
      }
      #theme-hexo a[class*='hover:bg-indigo-400']:hover {
        background-color: var(--theme-color) !important;
        color: white !important;
      }
      /* 移动设备下，搜索组件中选中分类的高亮背景色 */
      #theme-hexo div[class*='hover:bg-indigo-400']:hover {
        background-color: var(--theme-color) !important;
      }
      #theme-hexo .hover\:bg-indigo-400:hover {
        background-color: var(--theme-color) !important;
      }
      #theme-hexo .bg-indigo-400 {
        background-color: var(--theme-color) !important;
      }
      #theme-hexo a[class*='hover:bg-indigo-600']:hover {
        background-color: var(--theme-color) !important;
        color: white !important;
      }

      /* 右下角悬浮按钮背景色 */
      #theme-hexo .bg-indigo-500 {
        background-color: var(--theme-color) !important;
      }
      .dark #theme-hexo .dark\:bg-indigo-500 {
        background-color: var(--theme-color) !important;
      }

      // 移动设备菜单栏选中背景色
      #theme-hexo div[class*='hover:bg-indigo-500']:hover {
        background-color: var(--theme-color) !important;
      }

      /* 文章浏览进度条颜色 */
      #theme-hexo .bg-indigo-600 {
        background-color: var(--theme-color) !important;
      }
      /* 当前浏览位置标题高亮颜色 */
      #theme-hexo .border-indigo-800 {
        border-color: var(--theme-color) !important;
      }
      #theme-hexo .text-indigo-800 {
        color: var(--theme-color) !important;
      }
      .dark #theme-hexo .dark\:text-indigo-400 {
        color: var(--theme-color) !important;
      }
      .dark #theme-hexo .dark\:border-indigo-400 {
        border-color: var(--theme-color) !important;
      }
      .dark #theme-hexo .dark\:border-white {
        border-color: var(--theme-color) !important;
      }
      /* 目录项悬浮时的字体颜色 */
      #theme-hexo a[class*='hover:text-indigo-800']:hover {
        color: var(--theme-color) !important;
      }
      /* 深色模式下目录项的默认文字颜色和边框线颜色 */
      .dark #theme-hexo .catalog-item {
        color: white !important;
        border-color: white !important;
      }
      .dark #theme-hexo .catalog-item:hover {
        color: var(--theme-color) !important;
      }
      /* 深色模式下当前高亮标题的边框线颜色 */
      .dark #theme-hexo .catalog-item.font-bold {
        border-color: var(--theme-color) !important;
      }

      /* 文章底部版权声明组件左侧边框线颜色 */
      #theme-hexo .border-indigo-500 {
        border-color: var(--theme-color) !important;
      }

      /* 归档页面文章列表项悬浮时左侧边框线颜色 */
      #theme-hexo li[class*='hover:border-indigo-500']:hover {
        border-color: var(--theme-color) !important;
      }

      /* 自定义右键菜单悬浮高亮颜色 */
      #theme-hexo .hover\:bg-blue-600:hover {
        background-color: var(--theme-color) !important;
      }
      .dark #theme-hexo li[class*='dark:hover:border-indigo-300']:hover {
        border-color: var(--theme-color) !important;
      }
      /* 深色模式下，归档页面文章列表项默认状态左侧边框线颜色 */
      .dark #theme-hexo li[class*='dark:border-indigo-400'] {
        border-color: var(--theme-color) !important;
      }
      /* 深色模式下，归档页面文章标题悬浮时的文字颜色 */
      .dark #theme-hexo a[class*='dark:hover:text-indigo-300']:hover {
        color: var(--theme-color) !important;
      }

      /* 设置了从上到下的渐变黑色 */
      #theme-hexo .header-cover::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.5) 0%,
          rgba(0, 0, 0, 0.2) 10%,
          rgba(0, 0, 0, 0) 25%,
          rgba(0, 0, 0, 0.2) 75%,
          rgba(0, 0, 0, 0.5) 100%
        );
      }

      /* Custem */
      .tk-footer {
        opacity: 0;
      }

      // 选中字体颜色
      ::selection {
        background: color-mix(in srgb, var(--theme-color) 30%, transparent);
      }

      // 自定义滚动条
      ::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background-color: var(--theme-color);
      }

      * {
        scrollbar-width: thin;
        scrollbar-color: var(--theme-color) transparent;
      }

      ${themeConsoleStyle('hexo', CONFIG)}

      #theme-hexo #home-nav-button a {
        color: #fff !important;
      }

      #theme-hexo #home-nav-button a:hover {
        color: #000 !important;
      }
  `}</style>
  )
}

export { Style }
