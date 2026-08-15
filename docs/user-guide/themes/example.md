# Example 主题

> 主题 ID：`example` · 预览：[preview.tangly1024.com/?theme=example](https://preview.tangly1024.com/?theme=example)

## 主题预览

![Example 主题预览](/images/themes-preview/example.webp)

## 简介

示例与演示向默认骨架。

## 主题特性

- **定位**：示例与演示向默认骨架。
- **适用场景**：新主题开发骨架
- **配置前缀**：`EXAMPLE_*`（共 **9** 项，见下方配置表）
- **在线预览**：[preview.tangly1024.com/?theme=example](https://preview.tangly1024.com/?theme=example)

## 适用场景

新主题开发骨架

## 启用方式

1. Notion Config 表：`THEME` = `example`
2. 环境变量：`NEXT_PUBLIC_THEME=example`
3. `blog.config.js` 的 `THEME`

## 配置说明

配置文件：[`themes/example/config.js`](https://github.com/notionnext-org/NotionNext/blob/main/themes/example/config.js)  
也可在 **Notion Config** 表中填写同名键（对象/数组用 JSON）。

### Example 主题调色

Example 支持通过语义色变量调整主色：

```js
EXAMPLE_COLOR_PRIMARY: '#6b7280'
```

主题工具中的调色板会展示当前值，并可直接复制配置项到 Notion Config。

<!-- theme-config-table -->

### 主要配置项

| 配置键 | 说明 |
| --- | --- |
| `EXAMPLE_COLOR_PRIMARY` | 主题主色 |
| `EXAMPLE_MENU_CATEGORY` | 见 config.js |
| `EXAMPLE_MENU_TAG` | 见 config.js |
| `EXAMPLE_MENU_ARCHIVE` | 见 config.js |
| `EXAMPLE_MENU_SEARCH` | 见 config.js |
| `EXAMPLE_POST_LIST_COVER` | 见 config.js |
| `EXAMPLE_TITLE_IMAGE` | 见 config.js |
| `EXAMPLE_ARTICLE_LAYOUT_VERTICAL` | 见 config.js |
| `EXAMPLE_ARTICLE_HIDDEN_NOTIFICATION` | 见 config.js |

<!-- /theme-config-table -->

## 相关

- [内置主题全览](./THEMES_CATALOG.md)
- [如何配置站点](../config-site.md)
- [菜单 Menu / SubMenu](../menu-secondary.md)
