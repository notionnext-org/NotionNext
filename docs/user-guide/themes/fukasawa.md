# Fukasawa 主题

> 主题 ID：`fukasawa` · 预览：[preview.tangly1024.com/?theme=fukasawa](https://preview.tangly1024.com/?theme=fukasawa)

## 主题预览

![Fukasawa 主题预览](/images/themes-preview/fukasawa.webp)

## 简介

深川式多栏与侧边信息密度较高。

## 主题特性

- **定位**：深川式多栏与侧边信息密度较高。
- **适用场景**：多栏高密度信息
- **配置前缀**：`FUKASAWA_*`（共 **12** 项，见下方配置表）
- **在线预览**：[preview.tangly1024.com/?theme=fukasawa](https://preview.tangly1024.com/?theme=fukasawa)

## 适用场景

多栏高密度信息

## 启用方式

1. Notion Config 表：`THEME` = `fukasawa`
2. 环境变量：`NEXT_PUBLIC_THEME=fukasawa`
3. `blog.config.js` 的 `THEME`

## 配置说明

配置文件：[`themes/fukasawa/config.js`](https://github.com/notionnext-org/NotionNext/blob/main/themes/fukasawa/config.js)  
也可在 **Notion Config** 表中填写同名键（对象/数组用 JSON）。

### Fukasawa 主题调色

Fukasawa 支持通过语义色变量调整页面背景：

```js
FUKASAWA_COLOR_BG: '#eeedee'
```

主题工具中的调色板会展示当前值，并可直接复制配置项到 Notion Config。

<!-- theme-config-table -->

### 主要配置项

| 配置键 | 说明 |
| --- | --- |
| `FUKASAWA_COLOR_BG` | 页面背景色 |
| `FUKASAWA_MAILCHIMP_FORM` | 见 config.js |
| `FUKASAWA_POST_LIST_COVER` | 见 config.js |
| `FUKASAWA_POST_LIST_COVER_FORCE` | 见 config.js |
| `FUKASAWA_POST_LIST_PREVIEW` | 见 config.js |
| `FUKASAWA_POST_LIST_ANIMATION` | 见 config.js |
| `FUKASAWA_MENU_CATEGORY` | 见 config.js |
| `FUKASAWA_MENU_TAG` | 见 config.js |
| `FUKASAWA_MENU_ARCHIVE` | 见 config.js |
| `FUKASAWA_SIDEBAR_COLLAPSE_BUTTON` | 见 config.js |
| `FUKASAWA_SIDEBAR_COLLAPSE_SATUS_DEFAULT` | 见 config.js |
| `FUKASAWA_SIDEBAR_COLLAPSE_ON_SCROLL` | 见 config.js |

<!-- /theme-config-table -->

## 相关

- [内置主题全览](./THEMES_CATALOG.md)
- [如何配置站点](../config-site.md)
- [菜单 Menu / SubMenu](../menu-secondary.md)
