# Photo 主题

> 主题 ID：`photo` · 预览：[preview.tangly1024.com/?theme=photo](https://preview.tangly1024.com/?theme=photo)

## 主题预览

![Photo 主题预览](/images/themes-preview/photo.webp)

## 简介

摄影作品与相册网格。

## 主题特性

- **定位**：摄影作品与相册网格。
- **适用场景**：摄影相册、侧栏推荐
- **配置前缀**：`PHOTO_*`（共 **12** 项，见下方配置表）
- **在线预览**：[preview.tangly1024.com/?theme=photo](https://preview.tangly1024.com/?theme=photo)

## 适用场景

摄影相册、侧栏推荐

## 启用方式

1. Notion Config 表：`THEME` = `photo`
2. 环境变量：`NEXT_PUBLIC_THEME=photo`
3. `blog.config.js` 的 `THEME`

## 配置说明

配置文件：[`themes/photo/config.js`](https://github.com/notionnext-org/NotionNext/blob/main/themes/photo/config.js)  
也可在 **Notion Config** 表中填写同名键（对象/数组用 JSON）。

### Photo 主题调色

Photo 支持通过语义色变量调整主色和深色主色：

```js
PHOTO_COLOR_PRIMARY: '#2563eb',
PHOTO_COLOR_PRIMARY_DARK: '#ca8a04'
```

主题工具中的调色板会展示当前值，并可直接复制配置项到 Notion Config。

<!-- theme-config-table -->

### 主要配置项

| 配置键 | 说明 |
| --- | --- |
| `PHOTO_COLOR_PRIMARY` | 主题主色 |
| `PHOTO_COLOR_PRIMARY_DARK` | 深色模式主色 |
| `PHOTO_MENU_CATEGORY` | 见 config.js |
| `PHOTO_MENU_TAG` | 见 config.js |
| `PHOTO_MENU_ARCHIVE` | 见 config.js |
| `PHOTO_MENU_SEARCH` | 见 config.js |
| `PHOTO_HOME_BACKGROUND` | 见 config.js |
| `PHOTO_ARTICLE_RECOMMEND` | 见 config.js |
| `PHOTO_VIDEO_COMBINE` | 见 config.js |
| `PHOTO_VIDEO_COMBINE_SHOW_PAGE_FORCE` | 见 config.js |
| `PHOTO_PREVIEW_CATEGORY_COUNT` | 见 config.js |
| `PHOTO_POST_LIST_COVER` | 见 config.js |

<!-- /theme-config-table -->

## 相关

- [内置主题全览](./THEMES_CATALOG.md)
- [如何配置站点](../config-site.md)
- [菜单 Menu / SubMenu](../menu-secondary.md)
