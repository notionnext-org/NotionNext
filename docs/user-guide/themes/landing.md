# Landing 主题

> 主题 ID：`landing` · 预览：[preview.tangly1024.com/?theme=landing](https://preview.tangly1024.com/?theme=landing)

## 主题预览

![Landing 主题预览](/images/themes-preview/landing.webp)

## 简介

单页着陆与分区滚动叙述。

## 主题特性

- **定位**：单页着陆与分区滚动叙述。
- **适用场景**：单页着陆分区
- **配置前缀**：`LANDING_*`（共 **66** 项，见下方配置表）
- **在线预览**：[preview.tangly1024.com/?theme=landing](https://preview.tangly1024.com/?theme=landing)

## 适用场景

单页着陆分区

## 启用方式

1. Notion Config 表：`THEME` = `landing`
2. 环境变量：`NEXT_PUBLIC_THEME=landing`
3. `blog.config.js` 的 `THEME`

## 配置说明

配置文件：[`themes/landing/config.js`](https://github.com/notionnext-org/NotionNext/blob/main/themes/landing/config.js)  
也可在 **Notion Config** 表中填写同名键（对象/数组用 JSON）。

### Landing 主题调色

Landing 主题可通过 `LANDING_COLOR_PRIMARY` 调整强调色：

```js
LANDING_COLOR_PRIMARY: '#ef4444'
```

切换到 Landing 后，也可以在全局主题工具中查看当前调色板，并复制对应配置项。

<!-- theme-config-table -->

### 主要配置项

| 配置键 | 说明 |
| --- | --- |
| `LANDING_COLOR_PRIMARY` | 主题强调色 |
| `LANDING_HEADER_BUTTON_1_TITLE` | 见 config.js |
| `LANDING_HEADER_BUTTON_1_URL` | 见 config.js |
| `LANDING_HEADER_BUTTON_2_TITLE` | 见 config.js |
| `LANDING_HEADER_BUTTON_2_URL` | 见 config.js |
| `LANDING_HERO_TITLE_1` | 见 config.js |
| `LANDING_HERO_P_1` | 见 config.js |
| `LANDING_HERO_BUTTON_1_TEXT` | 见 config.js |
| `LANDING_HERO_BUTTON_1_LINK` | 见 config.js |
| `LANDING_HERO_BUTTON_2_TEXT` | 见 config.js |
| `LANDING_HERO_BUTTON_2_LINK` | 见 config.js |
| `LANDING_HERO_VIDEO_IMAGE` | 见 config.js |
| `LANDING_HERO_VIDEO_IFRAME` | 见 config.js |
| `LANDING_HERO_VIDEO_TIPS` | 见 config.js |
| `LANDING_FEATURES_HEADER_1` | 见 config.js |
| `LANDING_FEATURES_HEADER_1_P` | 见 config.js |
| `LANDING_FEATURES_HEADER_2` | 见 config.js |
| `LANDING_FEATURES_HEADER_2_P` | 见 config.js |
| `LANDING_FEATURES_CARD_1_TITLE` | 见 config.js |
| `LANDING_FEATURES_CARD_1_P` | 见 config.js |
| `LANDING_FEATURES_CARD_2_TITLE` | 见 config.js |
| `LANDING_FEATURES_CARD_2_P` | 见 config.js |
| `LANDING_FEATURES_CARD_3_TITLE` | 见 config.js |
| `LANDING_FEATURES_CARD_3_P` | 见 config.js |
| `LANDING_FEATURES_BLOCK_HEADER` | 见 config.js |
| `LANDING_FEATURES_BLOCK_P` | 见 config.js |
| `LANDING_FEATURES_BLOCK_1_TITLE` | 见 config.js |
| `LANDING_FEATURES_BLOCK_1_P` | 见 config.js |
| `LANDING_FEATURES_BLOCK_2_TITLE` | 见 config.js |
| `LANDING_FEATURES_BLOCK_2_P` | 见 config.js |
| `LANDING_FEATURES_BLOCK_3_TITLE` | 见 config.js |
| `LANDING_FEATURES_BLOCK_3_P` | 见 config.js |
| `LANDING_FEATURES_BLOCK_4_TITLE` | 见 config.js |
| `LANDING_FEATURES_BLOCK_4_P` | 见 config.js |
| `LANDING_FEATURES_BLOCK_5_TITLE` | 见 config.js |
| `LANDING_FEATURES_BLOCK_5_P` | 见 config.js |
| `LANDING_FEATURES_BLOCK_6_TITLE` | 见 config.js |
| `LANDING_FEATURES_BLOCK_6_P` | 见 config.js |
| `LANDING_TESTIMONIALS_HEADER` | 见 config.js |
| `LANDING_TESTIMONIALS_P` | 见 config.js |
| `LANDING_TESTIMONIALS_AVATAR` | 见 config.js |

共 **65** 项，上表列出前 40 项，完整列表见 [config.js](https://github.com/notionnext-org/NotionNext/blob/main/themes/landing/config.js)。

<!-- /theme-config-table -->

## 相关

- [内置主题全览](./THEMES_CATALOG.md)
- [如何配置站点](../config-site.md)
- [菜单 Menu / SubMenu](../menu-secondary.md)
