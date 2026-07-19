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
      --${themeId}-console-bg: var(${getThemeColorCssVar(themeId, 'BG')});
      --${themeId}-console-card: var(${getThemeColorCssVar(themeId, 'CARD')});
      --${themeId}-console-text: var(${getThemeColorCssVar(themeId, 'TEXT')});
      --${themeId}-console-text-secondary: var(${getThemeColorCssVar(themeId, 'TEXT_SECONDARY')});
      --${themeId}-console-border: var(${getThemeColorCssVar(themeId, 'BORDER')});
    }

    .dark #${rootId} {
      --${themeId}-console-primary: var(${getThemeColorCssVar(themeId, 'PRIMARY_DARK')});
      --${themeId}-console-bg: var(${getThemeColorCssVar(themeId, 'BG_DARK')});
      --${themeId}-console-card: var(${getThemeColorCssVar(themeId, 'CARD_DARK')});
      --${themeId}-console-text: var(${getThemeColorCssVar(themeId, 'TEXT_DARK')});
      --${themeId}-console-text-secondary: var(${getThemeColorCssVar(themeId, 'TEXT_SECONDARY_DARK')});
      --${themeId}-console-border: var(${getThemeColorCssVar(themeId, 'BORDER_DARK')});
    }
  `
}
