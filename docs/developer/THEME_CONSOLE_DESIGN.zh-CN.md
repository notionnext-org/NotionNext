# 主题控制台设计与接入约定

主题控制台是在原“主题切换 / 调色板”能力上的升级。它只在当前浏览器页面实时预览，不直接写入远端 Notion 数据库；用户确认效果后，再复制配置片段写入 `notion_config` 或主题配置文件。

## 背景

早期主题大量使用 Tailwind CSS 工具类，是为了快速开发、快速验证布局和交互。随着框架和内置主题逐渐成熟，主题需要更丰富、更稳定的定制能力。后续颜色迁移应从 `bg-indigo-600`、`text-blue-500` 这类固定色名过渡到主题自己的语义色变量，例如 `HEO_COLOR_PRIMARY`、`HEO_COLOR_TEXT_DARK`。

这样做的目标不是替换 Tailwind，而是避免颜色语义混乱：代码中出现“indigo”时不再需要猜它到底是主色、强调色、hover 色，还是深色模式下的文字色。

## 用户体验目标

- 浮动工具只保留四个明确入口：拖拽手柄、主题切换、主题控制台、深浅模式。
- 主题控制台标题必须展示当前主题名，例如 `主题控制台 · Heo`。
- 控制台默认折叠“信息配置”和“配色”两个区块，用户按需展开。
- 配色只分两组：浅色模式、深色模式。不要为同一模式重复出现多个“深色模式”分组。
- 每个配置项都能分别复制配置名和配置值，也能导出当前主题的全部可写配置。
- 导入、导出、复制、重置都要给出明确提示，例如“配置已复制到剪贴板”。
- 控制台必须兼容移动端，两列布局在窄屏下退化为单列。

## 最小配色标准

所有内置主题至少暴露以下基础色，并分别提供浅色和深色两套配置：

| 语义 | 浅色键名示例 | 深色键名示例 |
| --- | --- | --- |
| 主色 | `THEME_COLOR_PRIMARY` | `THEME_COLOR_PRIMARY_DARK` |
| 页面背景 | `THEME_COLOR_BG` | `THEME_COLOR_BG_DARK` |
| 卡片背景 | `THEME_COLOR_CARD` | `THEME_COLOR_CARD_DARK` |
| 主文字 | `THEME_COLOR_TEXT` | `THEME_COLOR_TEXT_DARK` |
| 边框 | `THEME_COLOR_BORDER` | `THEME_COLOR_BORDER_DARK` |

如果主题实际使用了次级文字、弱背景、强调色、hover 色、导航背景、滚动条、标签等颜色，也应继续暴露到配色区。不要声明没有被真实 CSS 消费的“空配置”。

深色模式默认值必须遵守“深底、浅字、浅主色调”的原则。迁移默认值时优先复用原主题视觉，不允许因为接入控制台改变原版观感。

## 开发者接入流程

1. 在主题 `config.js` 或默认配置来源中保留原有默认值。
2. 在 `themes/<theme>/style.js` 中把配置键映射为主题根节点上的 CSS 变量。
3. 在组件样式中消费语义变量，而不是直接消费 Tailwind 固定色号。
4. 在 `conf/themeSwitch.manifest.js` 声明控制台元数据。
5. 在真实页面验证：修改控制台值后，页面上对应颜色或配置必须立即可见。

示例：

```js
// themes/heo/style.js
#theme-heo {
  --heo-color-primary: ${siteConfig('HEO_COLOR_PRIMARY', '#4f65f0', CONFIG)};
  --heo-color-text: ${siteConfig('HEO_COLOR_TEXT', '#111827', CONFIG)};
}
```

```jsx
className='text-[var(--heo-color-text)] bg-[var(--heo-color-primary)]'
```

## Manifest 约定

`conf/themeSwitch.manifest.js` 负责声明控制台如何展示配置，不负责实现样式。manifest 中声明的每个 `palette` 项都必须有真实 CSS 消费路径。

```js
{
  key: 'HEO_COLOR_PRIMARY',
  cssVar: '--heo-color-primary',
  label: '主色',
  defaultValue: '#4f65f0',
  group: 'light'
}
```

推荐字段：

| 字段 | 说明 |
| --- | --- |
| `key` | 写入 `notion_config` 的配置名 |
| `cssVar` | 实时预览时写入的 CSS 变量 |
| `label` | 控制台中文名称 |
| `defaultValue` | 主题原版默认值 |
| `group` | `light` 或 `dark` |
| `description` | 可选中文说明 |

信息配置使用 `settings` 声明。主题级配置不涉及密钥时可以进入控制台；全局配置必须使用白名单，不能扫描并暴露所有 `blog.config.js` 键。

```js
settings: [
  {
    key: 'HEO_HOME_BANNER_ENABLE',
    label: '首页 Banner',
    description: '控制首页 Banner 是否显示。',
    type: 'boolean',
    defaultValue: true
  }
]
```

支持类型：

- `boolean`：开关。
- `text`：短文本。
- `number`：数字输入。
- `select`：固定范围，用下拉框展示。
- `color`：颜色配置优先放入 `palette`。

## 兼容旧主题

很多站长基于旧版 NotionNext 开发主题。新框架必须保证旧主题即使没有 manifest，也能正常运行，不应因为缺少控制台声明而崩溃。

兼容原则：

- `getThemeSwitchMeta()` 必须提供兜底元数据。
- `themeConsoleStyle()` 只能注入 CSS 变量和必要别名，不能用全局选择器批量重写 `a`、`p`、`article` 等元素颜色。
- 旧配置键可以继续保留，例如 `FUWARI_THEME_COLOR_HUE`，但调色板应映射到同一套实时变量，避免两个入口互相冲突。
- 新增变量不应改变旧主题默认视觉；默认色号要从旧代码或线上版本校对。

## 验收清单

- 每个内置主题都显示“配色”模块。
- 每个内置主题至少有浅色、深色两套基础色：主色、文字、背景、卡片、边框。
- 默认视觉与迁移前一致，尤其是导航栏、卡片背景、文章正文、深色模式文字。
- 修改浅色配置不会串到深色模式，修改深色配置也不会影响浅色模式。
- 控制台修改会实时反映到页面。
- 复制配置名、复制配置值、导出、导入、区块重置都有反馈。
- 未接入 manifest 的旧主题不会报错。
