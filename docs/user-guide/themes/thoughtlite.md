# ThoughtLite 主题

> 主题 ID：`thoughtlite` · 预览：[preview.tangly1024.com/?theme=thoughtlite](https://preview.tangly1024.com/?theme=thoughtlite)

## 主题预览

![ThoughtLite 主题预览](/images/themes-preview/thoughtlite.webp)

## 简介

轻阅读向时间线与 Latest 卡片，单列列表与文章卡片排版。

## 主题特性

- **定位**：轻阅读向时间线与 Latest 卡片，单列列表与文章卡片排版。
- **适用场景**：时间线首页、Latest 卡片
- **配置前缀**：`THOUGHTLITE_*`（共 **18** 项，见下方配置表）
- **在线预览**：[preview.tangly1024.com/?theme=thoughtlite](https://preview.tangly1024.com/?theme=thoughtlite)

## 适用场景

时间线首页、Latest 卡片

## 启用方式

1. Notion Config 表：`THEME` = `thoughtlite`
2. 环境变量：`NEXT_PUBLIC_THEME=thoughtlite`
3. `blog.config.js` 的 `THEME`

## 进阶实现文档

实现细节、全局改动与架构说明见 [ThoughtLite 实现文档](../../developer/themes/THOUGHTLITE.md)。如果你准备改主题或提交 PR，建议继续阅读。

## 配置说明

配置文件：[`themes/thoughtlite/config.js`](https://github.com/notionnext-org/NotionNext/blob/main/themes/thoughtlite/config.js)  
也可在 **Notion Config** 表中填写同名键（对象/数组用 JSON）。

### ThoughtLite 主题调色

ThoughtLite 支持通过语义色变量调整背景、卡片、文字、边框和强调色：

```js
THOUGHTLITE_COLOR_BG: '#faf9f7',
THOUGHTLITE_COLOR_SURFACE: '#ffffff',
THOUGHTLITE_COLOR_TEXT: '#1a1a1a',
THOUGHTLITE_COLOR_MUTED: '#6b6b6b',
THOUGHTLITE_COLOR_BORDER: '#e8e6e3',
THOUGHTLITE_COLOR_ACCENT: '#2563eb'
```

主题工具中的调色板会展示当前值，并可直接复制配置项到 Notion Config。

<!-- theme-config-table -->

### 主要配置项

| 配置键 | 说明 |
| --- | --- |
| `THOUGHTLITE_COLOR_BG` | 页面背景色 |
| `THOUGHTLITE_COLOR_SURFACE` | 卡片背景色 |
| `THOUGHTLITE_COLOR_TEXT` | 主文字色 |
| `THOUGHTLITE_COLOR_MUTED` | 次级文字色 |
| `THOUGHTLITE_COLOR_BORDER` | 边框色 |
| `THOUGHTLITE_COLOR_ACCENT` | 强调色 |
| `THOUGHTLITE_MENU_CATEGORY` | 见 config.js |
| `THOUGHTLITE_MENU_TAG` | 见 config.js |
| `THOUGHTLITE_MENU_ARCHIVE` | 见 config.js |
| `THOUGHTLITE_MENU_SEARCH` | 见 config.js |
| `THOUGHTLITE_HOME_TIMELINE` | 见 config.js |
| `THOUGHTLITE_HOME_LATEST_CARD` | 见 config.js |
| `THOUGHTLITE_SIDEBAR_ONLY_ON_POST` | 见 config.js |
| `THOUGHTLITE_POST_LIST_COVER` | 见 config.js |
| `THOUGHTLITE_TITLE_IMAGE` | 见 config.js |
| `THOUGHTLITE_HOME_MINIMAL_HEADER` | 见 config.js |
| `THOUGHTLITE_ARTICLE_LAYOUT_VERTICAL` | 见 config.js |
| `THOUGHTLITE_ARTICLE_HIDDEN_NOTIFICATION` | 见 config.js |

<!-- /theme-config-table -->

## 相关

- [内置主题全览](./THEMES_CATALOG.md)
- [如何配置站点](../config-site.md)
- [菜单 Menu / SubMenu](../menu-secondary.md)
