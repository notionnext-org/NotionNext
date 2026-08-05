# Medium 主题

> 主题 ID：`medium` · 预览：[preview.tangly1024.com/?theme=medium](https://preview.tangly1024.com/?theme=medium)

## 主题预览

![Medium 主题预览](/images/themes-preview/medium.webp)

## 简介

Medium 风格阅读体验与排版。

## 主题特性

- **定位**：Medium 风格阅读体验与排版。
- **适用场景**：Medium 风阅读列表
- **配置前缀**：`MEDIUM_*`（共 **14** 项，见下方配置表）
- **在线预览**：[preview.tangly1024.com/?theme=medium](https://preview.tangly1024.com/?theme=medium)

## 适用场景

Medium 风阅读列表

## 启用方式

1. Notion Config 表：`THEME` = `medium`
2. 环境变量：`NEXT_PUBLIC_THEME=medium`
3. `blog.config.js` 的 `THEME`

## 配置说明

配置文件：[`themes/medium/config.js`](https://github.com/notionnext-org/NotionNext/blob/main/themes/medium/config.js)  
也可在 **Notion Config** 表中填写同名键（对象/数组用 JSON）。

### Medium 主题调色

Medium 支持通过语义色变量调整主色：

```js
MEDIUM_COLOR_PRIMARY: '#4f46e5'
```

主题工具中的调色板会展示当前值，并可直接复制配置项到 Notion Config。

<!-- theme-config-table -->

### 主要配置项

| 配置键 | 说明 |
| --- | --- |
| `MEDIUM_RIGHT_PANEL_DARK` | 见 config.js |
| `MEDIUM_COLOR_PRIMARY` | 主题主色 |
| `MEDIUM_POST_LIST_COVER` | 见 config.js |
| `MEDIUM_POST_LIST_PREVIEW` | 见 config.js |
| `MEDIUM_POST_LIST_CATEGORY` | 见 config.js |
| `MEDIUM_POST_LIST_TAG` | 见 config.js |
| `MEDIUM_POST_DETAIL_CATEGORY` | 见 config.js |
| `MEDIUM_POST_DETAIL_TAG` | 见 config.js |
| `MEDIUM_MENU_CATEGORY` | 见 config.js |
| `MEDIUM_MENU_TAG` | 见 config.js |
| `MEDIUM_MENU_ARCHIVE` | 见 config.js |
| `MEDIUM_MENU_SEARCH` | 见 config.js |
| `MEDIUM_WIDGET_REVOLVER_MAPS` | 见 config.js |
| `MEDIUM_WIDGET_TO_TOP` | 见 config.js |

<!-- /theme-config-table -->

## 相关

- [内置主题全览](./THEMES_CATALOG.md)
- [如何配置站点](../config-site.md)
- [菜单 Menu / SubMenu](../menu-secondary.md)
