# Hexo 主题

> 主题 ID：`hexo` · 预览：[preview.tangly1024.com/?theme=hexo](https://preview.tangly1024.com/?theme=hexo)

## 主题预览

![Hexo 主题预览](/images/themes-preview/hexo.webp)

## 简介

类 Hexo 经典博客结构与侧边栏。

## 主题特性

- **定位**：类 Hexo 经典博客结构与侧边栏。
- **适用场景**：类 Hexo 双栏博客
- **配置前缀**：`HEXO_*`（共 **29** 项，见下方配置表）
- **在线预览**：[preview.tangly1024.com/?theme=hexo](https://preview.tangly1024.com/?theme=hexo)

## 适用场景

类 Hexo 双栏博客

## 启用方式

1. Notion Config 表：`THEME` = `hexo`
2. 环境变量：`NEXT_PUBLIC_THEME=hexo`
3. `blog.config.js` 的 `THEME`

## 配置说明

配置文件：[`themes/hexo/config.js`](https://github.com/notionnext-org/NotionNext/blob/main/themes/hexo/config.js)  
也可在 **Notion Config** 表中填写同名键（对象/数组用 JSON）。

### Hexo 主题调色

Hexo 主题开始使用语义化主色变量，推荐使用 `HEXO_COLOR_PRIMARY` 调整主色：

```js
HEXO_COLOR_PRIMARY: '#928CEE'
```

旧配置 `HEXO_THEME_COLOR` 仍然兼容；如果两个配置都存在，`HEXO_COLOR_PRIMARY` 优先生效。主题工具中的调色板会显示当前主色，并可直接复制配置项到 Notion Config。

<!-- theme-config-table -->

### 主要配置项

| 配置键 | 说明 |
| --- | --- |
| `HEXO_HOME_BANNER_ENABLE` | 见 config.js |
| `HEXO_HOME_BANNER_GREETINGS` | 见 config.js |
| `HEXO_HOME_NAV_BUTTONS` | 见 config.js |
| `HEXO_HOME_NAV_BACKGROUND_IMG_FIXED` | 见 config.js |
| `HEXO_SHOW_START_READING` | 见 config.js |
| `HEXO_MENU_INDEX` | 见 config.js |
| `HEXO_MENU_CATEGORY` | 见 config.js |
| `HEXO_MENU_TAG` | 见 config.js |
| `HEXO_MENU_ARCHIVE` | 见 config.js |
| `HEXO_MENU_SEARCH` | 见 config.js |
| `HEXO_MENU_RANDOM` | 见 config.js |
| `HEXO_POST_LIST_COVER` | 见 config.js |
| `HEXO_POST_LIST_COVER_HOVER_ENLARGE` | 见 config.js |
| `HEXO_POST_LIST_COVER_DEFAULT` | 见 config.js |
| `HEXO_POST_LIST_SUMMARY` | 见 config.js |
| `HEXO_POST_LIST_PREVIEW` | 见 config.js |
| `HEXO_POST_LIST_IMG_CROSSOVER` | 见 config.js |
| `HEXO_ARTICLE_ADJACENT` | 见 config.js |
| `HEXO_ARTICLE_COPYRIGHT` | 支持 `true` 全部显示、`false` 全部关闭、`custom` 仅填写 `copyright` 时显示。 |
| `HEXO_ARTICLE_NOT_BY_AI` | 见 config.js |
| `HEXO_ARTICLE_RECOMMEND` | 见 config.js |
| `HEXO_WIDGET_LATEST_POSTS` | 见 config.js |
| `HEXO_WIDGET_ANALYTICS` | 见 config.js |
| `HEXO_WIDGET_TO_TOP` | 见 config.js |
| `HEXO_WIDGET_TO_COMMENT` | 见 config.js |
| `HEXO_WIDGET_DARK_MODE` | 见 config.js |
| `HEXO_WIDGET_TOC` | 见 config.js |
| `HEXO_COLOR_PRIMARY` | 主题主色，优先于旧版 `HEXO_THEME_COLOR` |
| `HEXO_THEME_COLOR` | 见 config.js |
| `HEXO_ARTICLE_ROUTE_LOADING` | 见 config.js |

<!-- /theme-config-table -->

## 相关

- [内置主题全览](./THEMES_CATALOG.md)
- [如何配置站点](../config-site.md)
- [菜单 Menu / SubMenu](../menu-secondary.md)
