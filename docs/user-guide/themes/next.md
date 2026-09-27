# Next 主题

> 主题 ID：`next` · 预览：[preview.tangly1024.com/?theme=next](https://preview.tangly1024.com/?theme=next)

## 主题预览

![Next 主题预览](/images/themes-preview/next.webp)

## 简介

经典双栏布局，右侧栏与移动端悬浮目录。

## 主题特性

- **定位**：经典双栏布局，右侧栏与移动端悬浮目录。
- **适用场景**：经典双栏 + 移动 TOC
- **配置前缀**：`NEXT_*`（共 **29** 项，见下方配置表）
- **在线预览**：[preview.tangly1024.com/?theme=next](https://preview.tangly1024.com/?theme=next)

## 适用场景

经典双栏 + 移动 TOC

## 启用方式

1. Notion Config 表：`THEME` = `next`
2. 环境变量：`NEXT_PUBLIC_THEME=next`
3. `blog.config.js` 的 `THEME`

## 配置说明

配置文件：[`themes/next/config.js`](https://github.com/notionnext-org/NotionNext/blob/main/themes/next/config.js)  
也可在 **Notion Config** 表中填写同名键（对象/数组用 JSON）。

### Next 主题调色

Next 支持通过语义色变量调整主色和页面背景：

```js
NEXT_COLOR_PRIMARY: '#4e80ee',
NEXT_COLOR_BG: '#eeedee'
```

主题工具中的调色板会展示当前值，并可直接复制配置项到 Notion Config。

<!-- theme-config-table -->

### 主要配置项

| 配置键 | 说明 |
| --- | --- |
| `NEXT_HOME_BANNER` | 见 config.js |
| `NEXT_HOME_BANNER_STRINGS` | 见 config.js |
| `NEXT_NAV_TYPE` | 见 config.js |
| `NEXT_POST_LIST_COVER` | 见 config.js |
| `NEXT_POST_LIST_PREVIEW` | 见 config.js |
| `NEXT_POST_LIST_SUMMARY` | 见 config.js |
| `NEXT_PREVIEW_TAG_COUNT` | 见 config.js |
| `NEXT_PREVIEW_CATEGORY_COUNT` | 见 config.js |
| `NEXT_POST_HEADER_IMAGE_VISIBLE` | 见 config.js |
| `NEXT_RIGHT_BAR` | 见 config.js |
| `NEXT_RIGHT_LATEST_POSTS` | 见 config.js |
| `NEXT_RIGHT_CATEGORY_LIST` | 见 config.js |
| `NEXT_RIGHT_TAG_LIST` | 见 config.js |
| `NEXT_RIGHT_AD` | 见 config.js |
| `NEXT_MENU_HOME` | 见 config.js |
| `NEXT_MENU_CATEGORY` | 见 config.js |
| `NEXT_MENU_TAG` | 见 config.js |
| `NEXT_MENU_ARCHIVE` | 见 config.js |
| `NEXT_MENU_SEARCH` | 见 config.js |
| `NEXT_WIDGET_TO_TOP` | 见 config.js |
| `NEXT_WIDGET_TO_BOTTOM` | 见 config.js |
| `NEXT_WIDGET_DARK_MODE` | 见 config.js |
| `NEXT_WIDGET_TOC` | 见 config.js |
| `NEXT_COLOR_PRIMARY` | 主题主色 |
| `NEXT_COLOR_BG` | 页面背景色 |
| `NEXT_ARTICLE_RELATE_POSTS` | 见 config.js |
| `NEXT_ARTICLE_COPYRIGHT` | 支持 `true` 全部显示、`false` 全部关闭、`custom` 仅填写 `copyright` 时显示。 |
| `NEXT_ARTICLE_NOT_BY_AI` | 见 config.js |
| `NEXT_ARTICLE_INFO` | 见 config.js |

<!-- /theme-config-table -->

## 相关

- [内置主题全览](./THEMES_CATALOG.md)
- [如何配置站点](../config-site.md)
- [菜单 Menu / SubMenu](../menu-secondary.md)
