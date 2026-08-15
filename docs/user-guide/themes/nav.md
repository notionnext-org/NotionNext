# Nav 主题

> 主题 ID：`nav` · 预览：[preview.tangly1024.com/?theme=nav](https://preview.tangly1024.com/?theme=nav)

## 主题预览

![Nav 主题预览](/images/themes-preview/nav.webp)

## 简介

顶部导航主导航的现代布局。

## 主题特性

- **定位**：顶部导航主导航的现代布局。
- **适用场景**：导航站、链接聚合
- **配置前缀**：`NAV_*`（共 **13** 项，见下方配置表）
- **在线预览**：[preview.tangly1024.com/?theme=nav](https://preview.tangly1024.com/?theme=nav)

## 适用场景

导航站、链接聚合

## 启用方式

1. Notion Config 表：`THEME` = `nav`
2. 环境变量：`NEXT_PUBLIC_THEME=nav`
3. `blog.config.js` 的 `THEME`

## 配置说明

配置文件：[`themes/nav/config.js`](https://github.com/notionnext-org/NotionNext/blob/main/themes/nav/config.js)  
也可在 **Notion Config** 表中填写同名键（对象/数组用 JSON）。

### Nav 主题调色

Nav 支持通过语义色变量调整页面背景和菜单文字：

```js
NAV_COLOR_BG: '#fbfbfb',
NAV_COLOR_TEXT: '#8c8c8c',
NAV_COLOR_TEXT_HOVER: '#000000'
```

主题工具中的调色板会展示当前值，并可直接复制配置项到 Notion Config。

<!-- theme-config-table -->

### 主要配置项

| 配置键 | 说明 |
| --- | --- |
| `NAV_COLOR_BG` | 页面背景色 |
| `NAV_COLOR_TEXT` | 菜单文字色 |
| `NAV_COLOR_TEXT_HOVER` | 菜单 hover 色 |
| `NAV_INDEX_PAGE` | 见 config.js |
| `NAV_AUTO_SORT` | 见 config.js |
| `NAV_SHOW_TITLE_TEXT` | 见 config.js |
| `NAV_USE_CUSTOM_MENU` | 见 config.js |
| `NAV_MENU_CATEGORY` | 见 config.js |
| `NAV_MENU_TAG` | 见 config.js |
| `NAV_MENU_ARCHIVE` | 见 config.js |
| `NAV_MENU_SEARCH` | 见 config.js |
| `NAV_WIDGET_REVOLVER_MAPS` | 见 config.js |
| `NAV_WIDGET_TO_TOP` | 见 config.js |

<!-- /theme-config-table -->

## 相关

- [内置主题全览](./THEMES_CATALOG.md)
- [如何配置站点](../config-site.md)
- [菜单 Menu / SubMenu](../menu-secondary.md)
