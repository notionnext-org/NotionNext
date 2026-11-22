import { getThemeColorDefault, getThemeColorCssVar } from '@/conf/themeColorPalette'
import { siteConfig } from '@/lib/config'

const TOKENS = ['PRIMARY', 'BG', 'CARD', 'TEXT', 'TEXT_SECONDARY', 'BORDER']

function readColor(themeId, token, config) {
  const key = `${String(themeId).toUpperCase()}_COLOR_${token}`
  return siteConfig(key, getThemeColorDefault(themeId, token), config)
}

export function themeConsoleStyle(themeId, config, options = {}) {
  const rootId = options.rootId || `theme-${themeId}`
  const vars = TOKENS
    .flatMap(token => [
      `${getThemeColorCssVar(themeId, token)}: ${readColor(themeId, token, config)};`,
      `${getThemeColorCssVar(themeId, `${token}_DARK`)}: ${readColor(themeId, `${token}_DARK`, config)};`
    ])
    .join('\n')

  return `
    #${rootId} {
      ${vars}
      --${themeId}-console-primary: var(${getThemeColorCssVar(themeId, 'PRIMARY')});
      --${themeId}-console-primary-hover: var(${getThemeColorCssVar(themeId, 'PRIMARY_HOVER')}, var(--${themeId}-console-primary));
      --${themeId}-console-bg: var(${getThemeColorCssVar(themeId, 'BG')});
      --${themeId}-console-card: var(${getThemeColorCssVar(themeId, 'CARD')});
      --${themeId}-console-text: var(${getThemeColorCssVar(themeId, 'TEXT')});
      --${themeId}-console-text-secondary: var(${getThemeColorCssVar(themeId, 'TEXT_SECONDARY')});
      --${themeId}-console-border: var(${getThemeColorCssVar(themeId, 'BORDER')});
      --${themeId}-console-dark: var(${getThemeColorCssVar(themeId, 'BG_DARK')});
    }

    .dark #${rootId} {
      --${themeId}-console-primary: var(${getThemeColorCssVar(themeId, 'PRIMARY_DARK')});
      --${themeId}-console-primary-hover: var(${getThemeColorCssVar(themeId, 'PRIMARY_HOVER_DARK')}, var(--${themeId}-console-primary));
      --${themeId}-console-bg: var(${getThemeColorCssVar(themeId, 'BG_DARK')});
      --${themeId}-console-card: var(${getThemeColorCssVar(themeId, 'CARD_DARK')});
      --${themeId}-console-text: var(${getThemeColorCssVar(themeId, 'TEXT_DARK')});
      --${themeId}-console-text-secondary: var(${getThemeColorCssVar(themeId, 'TEXT_SECONDARY_DARK')});
      --${themeId}-console-border: var(${getThemeColorCssVar(themeId, 'BORDER_DARK')});
      --${themeId}-console-dark: var(${getThemeColorCssVar(themeId, 'BG_DARK')});
    }

    #${rootId} {
      background-color: var(--${themeId}-console-bg);
      color: var(--${themeId}-console-text);
    }

    #${rootId} [class~="bg-primary"],
    #${rootId} [class~="bg-blue-500"],
    #${rootId} [class~="bg-blue-600"],
    #${rootId} [class~="bg-indigo-500"],
    #${rootId} [class~="bg-indigo-600"],
    #${rootId} [class~="bg-red-500"],
    #${rootId} [class~="bg-red-600"],
    #${rootId} [class~="bg-green-500"],
    #${rootId} [class~="bg-green-600"] {
      background-color: var(--${themeId}-console-primary) !important;
    }

    #${rootId} [class~="hover:bg-primary"]:hover,
    #${rootId} [class~="hover:bg-blue-dark"]:hover,
    #${rootId} [class*="hover:bg-blue-"]:hover,
    #${rootId} [class*="hover:bg-indigo-"]:hover,
    #${rootId} [class*="hover:bg-red-"]:hover,
    #${rootId} [class*="hover:bg-green-"]:hover {
      background-color: var(--${themeId}-console-primary-hover) !important;
    }

    #${rootId} [class~="text-primary"],
    #${rootId} [class~="text-blue-500"],
    #${rootId} [class~="text-blue-600"],
    #${rootId} [class~="text-indigo-500"],
    #${rootId} [class~="text-indigo-600"],
    #${rootId} [class~="text-red-500"],
    #${rootId} [class~="text-red-600"],
    #${rootId} [class~="text-green-500"],
    #${rootId} [class~="text-green-600"],
    #${rootId} [class~="hover:text-primary"]:hover,
    #${rootId} [class*="hover:text-blue-"]:hover,
    #${rootId} [class*="hover:text-indigo-"]:hover,
    #${rootId} [class*="hover:text-red-"]:hover,
    #${rootId} [class*="hover:text-green-"]:hover,
    #${rootId} .group:hover [class~="group-hover:text-primary"] {
      color: var(--${themeId}-console-primary) !important;
    }

    #${rootId} [class~="text-body-color"],
    #${rootId} [class~="text-body-secondary"],
    #${rootId} [class~="text-gray-500"],
    #${rootId} [class~="text-gray-600"],
    #${rootId} [class~="text-gray-400"] {
      color: var(--${themeId}-console-text-secondary) !important;
    }

    #${rootId} [class~="bg-white"],
    #${rootId} [class~="bg-gray-50"],
    #${rootId} [class~="bg-gray-1"],
    #${rootId} [class~="dark:bg-dark-2"]:is(.dark *) {
      background-color: var(--${themeId}-console-card) !important;
    }

    #${rootId} [class~="bg-dark"],
    #${rootId} [class~="dark:bg-dark"]:is(.dark *) {
      background-color: var(--${themeId}-console-dark) !important;
    }

    #${rootId} [class~="border-primary"],
    #${rootId} [class*="border-blue-"],
    #${rootId} [class*="border-indigo-"],
    #${rootId} [class*="border-red-"],
    #${rootId} [class*="border-green-"],
    #${rootId} [class~="focus:border-primary"]:focus {
      border-color: var(--${themeId}-console-primary) !important;
    }

    #${rootId} [class~="border"],
    #${rootId} [class*="border-gray-"] {
      border-color: var(--${themeId}-console-border);
    }

    #${rootId} input:focus,
    #${rootId} textarea:focus,
    #${rootId} select:focus,
    #${rootId} [class~="ring-primary"],
    #${rootId} [class~="focus:ring-primary"]:focus {
      --tw-ring-color: var(--${themeId}-console-primary) !important;
      border-color: var(--${themeId}-console-primary) !important;
    }
  `
}
