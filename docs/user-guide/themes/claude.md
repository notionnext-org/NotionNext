# Claude 主题

> 主题 ID：`claude` · 预览：[preview.tangly1024.com/?theme=claude](https://preview.tangly1024.com/?theme=claude)

## 主题预览

![Claude 主题预览](/images/themes-preview/claude.webp)

## 简介

类 Claude Docs 的文档与终端氛围。

## 主题特性

- **定位**：类 Claude Docs 的文档与终端氛围。
- **适用场景**：文档风、GitHub 式首页
- **配置前缀**：`CLAUDE_*`（共 **17** 项，见下方配置表）
- **在线预览**：[preview.tangly1024.com/?theme=claude](https://preview.tangly1024.com/?theme=claude)

## 适用场景

文档风、GitHub 式首页

## 启用方式

1. Notion Config 表：`THEME` = `claude`
2. 环境变量：`NEXT_PUBLIC_THEME=claude`
3. `blog.config.js` 的 `THEME`

## 进阶实现文档

实现细节、全局改动与架构说明见 [Claude 实现文档](../../developer/themes/CLAUDE.md)。如果你准备改主题或提交 PR，建议继续阅读。

## 配置说明

配置文件：[`themes/claude/config.js`](https://github.com/notionnext-org/NotionNext/blob/main/themes/claude/config.js)  
也可在 **Notion Config** 表中填写同名键（对象/数组用 JSON）。

<!-- theme-config-table -->

### 主要配置项

| 配置键 | 说明 |
| --- | --- |
| `CLAUDE_BLOG_NAME` | 见 config.js |
| `CLAUDE_BLOG_NAME_EN` | 见 config.js |
| `CLAUDE_POST_AD_ENABLE` | 见 config.js |
| `CLAUDE_POST_COVER_ENABLE` | 见 config.js |
| `CLAUDE_ARTICLE_RECOMMEND_POSTS` | 见 config.js |
| `CLAUDE_MENU_CATEGORY` | 见 config.js |
| `CLAUDE_MENU_TAG` | 见 config.js |
| `CLAUDE_MENU_ARCHIVE` | 见 config.js |
| `CLAUDE_TOC_ENABLE` | 见 config.js |
| `CLAUDE_TOC_SHOW_LEVEL3` | 见 config.js |
| `CLAUDE_TOC_SCROLL_BEHAVIOR` | 见 config.js |
| `CLAUDE_SUBTITLE_DARK_ONLY` | 见 config.js |
| `CLAUDE_PROFILE_AVATAR` | 见 config.js |
| `CLAUDE_FOOTER_COPYRIGHT` | 见 config.js |
| `CLAUDE_README_CACHE_ENABLED` | 见 config.js |
| `CLAUDE_CONTRIBUTION_PERSIST_ENABLED` | 见 config.js |
| `CLAUDE_CONTRIBUTION_EVENT_LIMIT` | 见 config.js |

<!-- /theme-config-table -->

## 相关

- [内置主题全览](./THEMES_CATALOG.md)
- [如何配置站点](../config-site.md)
- [菜单 Menu / SubMenu](../menu-secondary.md)
