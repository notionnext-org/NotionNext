# XuHome 主题

> 主题 ID：`xuhome` · 预览：[preview.tangly1024.com/?theme=xuhome](https://preview.tangly1024.com/?theme=xuhome)

> 作者：[@govmoe](https://github.com/govmoe)（hatch_blod） · [主题源码](https://github.com/govmoe/XuHome-Theme) · [作者示例站](https://blog.002.hk/)

## 主题预览

### 桌面端

![XuHome 桌面端主题预览](/images/themes-preview/xuhome.webp)

### 移动端

<img src="/images/themes-preview/xuhome-mobile.webp" alt="XuHome 移动端主题预览" width="390" />

## 简介

新粗野主义博客主题，粗边框、偏移阴影、Hero 打字机与响应式导航。

## 主题特性

- **定位**：新粗野主义博客主题，粗边框、偏移阴影、Hero 打字机与响应式导航。
- **适用场景**：高辨识度个人博客、新粗野主义卡片布局
- **配置前缀**：`XUHOME_*`（共 **29** 项，见下方配置表）
- **在线预览**：[preview.tangly1024.com/?theme=xuhome](https://preview.tangly1024.com/?theme=xuhome)

## 适用场景

高辨识度个人博客、新粗野主义卡片布局

## 启用方式

1. Notion Config 表：`THEME` = `xuhome`
2. 环境变量：`NEXT_PUBLIC_THEME=xuhome`
3. `blog.config.js` 的 `THEME`

修改后重新构建或部署站点。若同时在 Notion Config、环境变量和 `blog.config.js` 中设置了主题，以 Notion Config 的值优先。

## 背景图

主题默认使用纯色背景，不依赖额外静态资源。需要背景图时，将图片放入站点的 `public/` 目录，并在 Notion Config 或 `themes/xuhome/config.js` 中填写路径：

```text
XUHOME_BG_IMAGE=/images/my-background.webp
```

建议选用经过压缩的 WebP 图片，并确认文字与卡片在浅色、深色模式下仍有足够对比度。

## Hero 与打字机

`XUHOME_HERO_TITLE`、`XUHOME_HERO_BIO` 留空时会使用站点标题和简介。`XUHOME_HERO_TEXTS` 在 Notion Config 中可使用竖线分隔多段内容：

```text
Hello|Welcome|Enjoy reading
```

可通过 `XUHOME_HERO_TYPE_SPEED`、`XUHOME_HERO_DELETE_SPEED` 和 `XUHOME_HERO_TYPE_PAUSE` 调整节奏。

## 配置说明

配置文件：[`themes/xuhome/config.js`](https://github.com/notionnext-org/NotionNext/blob/main/themes/xuhome/config.js)
也可在 **Notion Config** 表中填写同名键（对象/数组用 JSON）。

<!-- theme-config-table -->

### 主要配置项

| 配置键 | 说明 |
| --- | --- |
| `XUHOME_BG_IMAGE` | 页面背景图路径；留空则使用纯色背景 |
| `XUHOME_HERO_ENABLE` | 首页显示 Hero 区 |
| `XUHOME_HERO_TITLE` | 见 config.js |
| `XUHOME_HERO_BIO` | 见 config.js |
| `XUHOME_HERO_TEXTS` | 打字机轮播文字 |
| `XUHOME_HERO_TITLE_COLOR` | Hero 标题颜色 |
| `XUHOME_HERO_BIO_COLOR` | Hero 简介颜色 |
| `XUHOME_HERO_TYPE_SPEED` | 打字速度（毫秒/字） |
| `XUHOME_HERO_DELETE_SPEED` | 删除速度（毫秒/字） |
| `XUHOME_HERO_TYPE_PAUSE` | 每段文字停留时间（毫秒） |
| `XUHOME_MENU_ARCHIVE` | 显示归档入口 |
| `XUHOME_MENU_TAG` | 显示标签入口 |
| `XUHOME_MENU_SEARCH` | 显示搜索入口 |
| `XUHOME_SIDEBAR` | 桌面端显示侧边栏 |
| `XUHOME_ARTICLE_RECOMMEND_POSTS` | 文章页显示推荐内容 |
| `XUHOME_UPTIME_ENABLE` | 显示站点运行时长 |
| `XUHOME_UPTIME_TITLE` | 见 config.js |
| `XUHOME_UPTIME_SINCE` | 建站日期（YYYY-MM-DD） |
| `XUHOME_COLOR_PRIMARY` | 主题控制台配色 |
| `XUHOME_COLOR_PRIMARY_HOVER` | 见 config.js |
| `XUHOME_COLOR_ACCENT` | 见 config.js |
| `XUHOME_COLOR_BG` | 见 config.js |
| `XUHOME_COLOR_CARD` | 卡片背景 |
| `XUHOME_COLOR_TEXT` | 见 config.js |
| `XUHOME_COLOR_TEXT_SECONDARY` | 次级文字 |
| `XUHOME_COLOR_BORDER` | 边框与阴影 |
| `XUHOME_COLOR_PRIMARY_DARK` | 深色模式主色 |
| `XUHOME_COLOR_PRIMARY_HOVER_DARK` | 深色模式主色 hover |
| `XUHOME_COLOR_ACCENT_DARK` | 深色模式强调色 |
| `XUHOME_COLOR_BG_DARK` | 见 config.js |
| `XUHOME_COLOR_CARD_DARK` | 深色模式卡片背景 |
| `XUHOME_COLOR_TEXT_DARK` | 见 config.js |
| `XUHOME_COLOR_TEXT_SECONDARY_DARK` | 深色模式次级文字 |
| `XUHOME_COLOR_BORDER_DARK` | 深色模式边框与阴影 |

<!-- /theme-config-table -->

## 许可与来源

主题由 [@govmoe](https://github.com/govmoe)（hatch_blod）贡献，原始主题仓库声明采用 MIT 许可证。视觉方向参考 [ImUpXuu/xuhome](https://github.com/ImUpXuu/xuhome)，本次提交不包含参考站点的图片、字体等静态资源。

## 相关

- [作者提交 Issue #4399](https://github.com/notionnext-org/NotionNext/issues/4399)
- [XuHome Theme 原始仓库](https://github.com/govmoe/XuHome-Theme)
- 视觉参考：[ImUpXuu/xuhome](https://github.com/ImUpXuu/xuhome)
- [内置主题全览](./THEMES_CATALOG.md)
- [如何配置站点](../config-site.md)
- [菜单 Menu / SubMenu](../menu-secondary.md)
