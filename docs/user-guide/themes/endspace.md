# Endspace 主题

> 主题 ID：`endspace` · 预览：[preview.tangly1024.com/?theme=endspace](https://preview.tangly1024.com/?theme=endspace)

## 主题预览

![Endspace 主题预览](/images/themes-preview/endspace.webp)

## 简介

轻工业终末风，侧栏导航、悬浮控件与加载动画。

## 主题特性

- **定位**：轻工业终末风，侧栏导航、悬浮控件与加载动画。
- **适用场景**：工业风加载与侧栏
- **配置前缀**：`ENDSPACE_*`（共 **19** 项，见下方配置表）
- **在线预览**：[preview.tangly1024.com/?theme=endspace](https://preview.tangly1024.com/?theme=endspace)

## 适用场景

工业风加载与侧栏

## 启用方式

1. Notion Config 表：`THEME` = `endspace`
2. 环境变量：`NEXT_PUBLIC_THEME=endspace`
3. `blog.config.js` 的 `THEME`

## 进阶实现文档

实现细节、全局改动与架构说明见 [Endspace 实现文档](../../developer/themes/ENDSPACE.md)。如果你准备改主题或提交 PR，建议继续阅读。

## 配置说明

配置文件：[`themes/endspace/config.js`](https://github.com/notionnext-org/NotionNext/blob/main/themes/endspace/config.js)  
也可在 **Notion Config** 表中填写同名键（对象/数组用 JSON）。

<!-- theme-config-table -->

### 主要配置项

| 配置键 | 说明 |
| --- | --- |
| `ENDSPACE_LOADING_COVER` | 见 config.js |
| `ENDSPACE_LOADING_SITE_NAME` | 见 config.js |
| `ENDSPACE_LOADING_TEXT_INIT` | 见 config.js |
| `ENDSPACE_LOADING_TEXT_LOADING` | 见 config.js |
| `ENDSPACE_LOADING_TEXT_COMPLETE` | 见 config.js |
| `ENDSPACE_LOADING_TEXT_SWEEPING` | 见 config.js |
| `ENDSPACE_LOADING_TEXT_FADEOUT` | 见 config.js |
| `ENDSPACE_LOADING_IMAGE` | 见 config.js |
| `ENDSPACE_BANNER_WATERMARK_TEXT` | 见 config.js |
| `ENDSPACE_ARTICLE_WATERMARK_TEXT` | 见 config.js |
| `ENDSPACE_MENU_CATEGORY` | 见 config.js |
| `ENDSPACE_MENU_TAG` | 见 config.js |
| `ENDSPACE_MENU_ARCHIVE` | 见 config.js |
| `ENDSPACE_MENU_SEARCH` | 见 config.js |
| `ENDSPACE_POST_LIST_COVER` | 见 config.js |
| `ENDSPACE_POST_LIST_PREVIEW` | 见 config.js |
| `ENDSPACE_ARTICLE_LAYOUT_VERTICAL` | 见 config.js |
| `ENDSPACE_ARTICLE_ADJACENT` | 见 config.js |
| `ENDSPACE_WIDGET_DARK_MODE` | 见 config.js |

<!-- /theme-config-table -->

## 相关

- [内置主题全览](./THEMES_CATALOG.md)
- [如何配置站点](../config-site.md)
- [菜单 Menu / SubMenu](../menu-secondary.md)
