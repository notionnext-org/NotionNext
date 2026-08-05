# Nobelium 主题

> 主题 ID：`nobelium` · 预览：[preview.tangly1024.com/?theme=nobelium](https://preview.tangly1024.com/?theme=nobelium)

## 主题预览

![Nobelium 主题预览](/images/themes-preview/nobelium.webp)

## 简介

致敬Nobelium,极简排版风格。

## 主题特性

- **定位**：致敬Nobelium,极简排版风格。
- **适用场景**：极简博客
- **配置前缀**：`NOBELIUM_*`（共 **11** 项，见下方配置表）
- **在线预览**：[preview.tangly1024.com/?theme=nobelium](https://preview.tangly1024.com/?theme=nobelium)

## 适用场景

极简博客

## 启用方式

1. Notion Config 表：`THEME` = `nobelium`
2. 环境变量：`NEXT_PUBLIC_THEME=nobelium`
3. `blog.config.js` 的 `THEME`

## 配置说明

配置文件：[`themes/nobelium/config.js`](https://github.com/notionnext-org/NotionNext/blob/main/themes/nobelium/config.js)  
也可在 **Notion Config** 表中填写同名键（对象/数组用 JSON）。

### Nobelium 主题调色

Nobelium 支持通过语义色变量调整主色：

```js
NOBELIUM_COLOR_PRIMARY: '#6b7280'
```

主题工具中的调色板会展示当前值，并可直接复制配置项到 Notion Config。

<!-- theme-config-table -->

### 主要配置项

| 配置键 | 说明 |
| --- | --- |
| `NOBELIUM_NAV_NOTION_ICON` | 见 config.js |
| `NOBELIUM_COLOR_PRIMARY` | 主题主色 |
| `NOBELIUM_MENU_RANDOM_POST` | 见 config.js |
| `NOBELIUM_MENU_SEARCH_BUTTON` | 见 config.js |
| `NOBELIUM_MENU_DARKMODE_BUTTON` | 见 config.js |
| `NOBELIUM_MENU_CATEGORY` | 见 config.js |
| `NOBELIUM_MENU_TAG` | 见 config.js |
| `NOBELIUM_MENU_ARCHIVE` | 见 config.js |
| `NOBELIUM_MENU_SEARCH` | 见 config.js |
| `NOBELIUM_MENU_RSS` | 见 config.js |
| `NOBELIUM_AUTO_COLLAPSE_NAV_BAR` | 见 config.js |

<!-- /theme-config-table -->

## 相关

- [内置主题全览](./THEMES_CATALOG.md)
- [如何配置站点](../config-site.md)
- [菜单 Menu / SubMenu](../menu-secondary.md)
