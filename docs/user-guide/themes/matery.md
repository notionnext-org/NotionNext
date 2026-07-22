# Matery 主题

> 主题 ID：`matery` · 预览：[preview.tangly1024.com/?theme=matery](https://preview.tangly1024.com/?theme=matery)

## 主题预览

![Matery 主题预览](/images/themes-preview/matery.webp)

## 简介

卡片式列表与 Material 质感组件。

## 主题特性

- **定位**：卡片式列表与 Material 质感组件。
- **适用场景**：Material 卡片封面列表
- **配置前缀**：`MATERY_*`（共 **26** 项，见下方配置表）
- **在线预览**：[preview.tangly1024.com/?theme=matery](https://preview.tangly1024.com/?theme=matery)

## 适用场景

Material 卡片封面列表

## 启用方式

1. Notion Config 表：`THEME` = `matery`
2. 环境变量：`NEXT_PUBLIC_THEME=matery`
3. `blog.config.js` 的 `THEME`

## 配置说明

配置文件：[`themes/matery/config.js`](https://github.com/notionnext-org/NotionNext/blob/main/themes/matery/config.js)  
也可在 **Notion Config** 表中填写同名键（对象/数组用 JSON）。

### Matery 主题调色

Matery 支持通过语义色变量调整主色、浅主色和页面背景：

```js
MATERY_COLOR_PRIMARY: '#4338ca',
MATERY_COLOR_PRIMARY_LIGHT: '#818cf8',
MATERY_COLOR_BG: '#f5f5f5'
```

主题工具中的调色板会展示当前值，并可直接复制配置项到 Notion Config。

### 阅读导向首页

在 Notion Config 中将 `MATERY_HOME_READING_LAYOUT` 设为 `true`，或配置环境变量 `NEXT_PUBLIC_MATERY_HOME_READING_LAYOUT=true`，首页会从单一文章时间流切换为四个阅读入口：推荐文章、分类主题、最新文章与 RSS。推荐文章优先识别 `Featured`、`Recommend`、`Recommended` 或 `推荐` 标签；没有匹配标签时使用前 3 篇文章。默认值为 `false`，原有分页或滚动文章列表保持不变。

<!-- theme-config-table -->

### 主要配置项

| 配置键 | 说明 |
| --- | --- |
| `MATERY_HOME_BANNER_ENABLE` | 见 config.js |
| `MATERY_HOME_BANNER_GREETINGS` | 见 config.js |
| `MATERY_HOME_NAV_BUTTONS` | 见 config.js |
| `MATERY_HOME_NAV_BACKGROUND_IMG_FIXED` | 见 config.js |
| `MATERY_SHOW_START_READING` | 见 config.js |
| `MATERY_HOME_READING_LAYOUT` | 使用阅读导向首页：推荐文章、分类入口、最新文章与 RSS |
| `MATERY_MENU_CATEGORY` | 见 config.js |
| `MATERY_MENU_TAG` | 见 config.js |
| `MATERY_MENU_ARCHIVE` | 见 config.js |
| `MATERY_MENU_SEARCH` | 见 config.js |
| `MATERY_POST_LIST_COVER` | 见 config.js |
| `MATERY_POST_LIST_SUMMARY` | 见 config.js |
| `MATERY_POST_LIST_PREVIEW` | 见 config.js |
| `MATERY_ARTICLE_ADJACENT` | 见 config.js |
| `MATERY_ARTICLE_COPYRIGHT` | 支持 `true` 全部显示、`false` 全部关闭、`custom` 仅填写 `copyright` 时显示。 |
| `MATERY_ARTICLE_NOT_BY_AI` | 见 config.js |
| `MATERY_ARTICLE_RECOMMEND` | 见 config.js |
| `MATERY_WIDGET_LATEST_POSTS` | 见 config.js |
| `MATERY_WIDGET_ANALYTICS` | 见 config.js |
| `MATERY_WIDGET_TO_TOP` | 见 config.js |
| `MATERY_WIDGET_TO_COMMENT` | 见 config.js |
| `WIDGET_DARK_MODE` | 见 config.js |
| `MATERY_WIDGET_TOC` | 见 config.js |
| `MATERY_COLOR_PRIMARY` | 主题主色 |
| `MATERY_COLOR_PRIMARY_LIGHT` | 浅主色，用于弱强调状态 |
| `MATERY_COLOR_BG` | 页面背景色 |

<!-- /theme-config-table -->

## 相关

- [内置主题全览](./THEMES_CATALOG.md)
- [如何配置站点](../config-site.md)
- [菜单 Menu / SubMenu](../menu-secondary.md)
