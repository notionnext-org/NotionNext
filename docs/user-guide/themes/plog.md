# Plog 主题

> 主题 ID：`plog` · 预览：[preview.tangly1024.com/?theme=plog](https://preview.tangly1024.com/?theme=plog)

## 主题预览

![Plog 主题预览](/images/themes-preview/plog.webp)

## 简介

偏图片与轻量图文化展示。

## 主题特性

- **定位**：偏图片与轻量图文化展示。
- **适用场景**：图文轻博客
- **配置前缀**：`NOBELIUM_*` / `PLOG_*`（共 **7** 项，见下方配置表）
- **在线预览**：[preview.tangly1024.com/?theme=plog](https://preview.tangly1024.com/?theme=plog)

## 适用场景

图文轻博客

## 启用方式

1. Notion Config 表：`THEME` = `plog`
2. 环境变量：`NEXT_PUBLIC_THEME=plog`
3. `blog.config.js` 的 `THEME`

## 配置说明

配置文件：[`themes/plog/config.js`](https://github.com/notionnext-org/NotionNext/blob/main/themes/plog/config.js)  
也可在 **Notion Config** 表中填写同名键（对象/数组用 JSON）。

### Plog 主题调色

Plog 支持通过语义色变量调整主色：

```js
PLOG_COLOR_PRIMARY: '#1d4ed8'
```

主题工具中的调色板会展示当前值，并可直接复制配置项到 Notion Config。

<!-- theme-config-table -->

### 主要配置项

| 配置键 | 说明 |
| --- | --- |
| `PLOG_COLOR_PRIMARY` | 主题主色 |
| `NOBELIUM_MENU_CATEGORY` | 见 config.js |
| `NOBELIUM_MENU_TAG` | 见 config.js |
| `NOBELIUM_MENU_ARCHIVE` | 见 config.js |
| `NOBELIUM_MENU_SEARCH` | 见 config.js |
| `NOBELIUM_MENU_RSS` | 见 config.js |
| `NOBELIUM_NAV_NOTION_ICON` | 见 config.js |

<!-- /theme-config-table -->

## 相关

- [内置主题全览](./THEMES_CATALOG.md)
- [如何配置站点](../config-site.md)
- [菜单 Menu / SubMenu](../menu-secondary.md)
