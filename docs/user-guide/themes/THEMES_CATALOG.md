# 内置主题全览（25 个）

> 与 `themes/` 目录及 `conf/themeSwitch.manifest.js` 同步 · 当前版本 **4.10.2**
> 先按站点目标选主题，再进入单个主题文档看配置。

预览：`https://preview.tangly1024.com/?theme=<id>`（`id` 为下表主题 ID，小写）。

切换方式：`NEXT_PUBLIC_THEME=<id>`、Notion Config 的 `THEME`，或开启 `THEME_SWITCH` 挂件。

## 按场景选主题

| 你想做什么 | 优先看 | 备选 | 选择理由 |
| --- | --- | --- | --- |
| 个人博客 / 日常写作 | [simple](./simple.md)、[hexo](./hexo.md) | [nobelium](./nobelium.md)、[typography](./typography.md) | 结构清楚、文章优先、配置负担低 |
| 文档 / 知识库 / 教程站 | [gitbook](./gitbook.md)、[claude](./claude.md) | [thoughtlite](./thoughtlite.md) | 侧边栏、目录和阅读连续性更强 |
| 作品集 / 个人品牌 | [proxio](./proxio.md)、[starter](./starter.md) | [landing](./landing.md) | 首屏表达强，适合展示身份、作品和服务 |
| 产品官网 / SaaS 落地页 | [starter](./starter.md)、[landing](./landing.md) | [commerce](./commerce.md) | 有产品介绍、功能区块、价格和 CTA 结构 |
| 图片 / 摄影 / 视觉内容 | [photo](./photo.md)、[plog](./plog.md) | [magzine](./magzine.md) | 图片展示密度更高，适合视觉浏览 |
| 导航站 / 资源聚合 | [nav](./nav.md) | [gitbook](./gitbook.md) | 更适合分类入口、链接集合和资源导航 |
| 杂志感 / 强视觉首页 | [magzine](./magzine.md)、[heo](./heo.md) | [fuwari](./fuwari.md) | 首页表现力强，适合内容品牌化 |
| 游戏 / 互动展示 | [game](./game.md) | [movie](./movie.md) | 适合特殊内容形态和沉浸式展示 |

## 新手怎么选？

如果你还没有明确偏好，按下面规则选择：

- 只是想先跑起来：选 `simple`。
- 想做传统博客：选 `hexo` 或 `next`。
- 想做教程/知识库：选 `gitbook`。
- 想展示个人品牌或服务：选 `proxio`。
- 想做产品落地页：选 `starter`。
- 想突出图片：选 `photo`。

部署成功后再换主题也可以，主题 ID 改完重新部署即可。

## 主题预览图

主题预览图位于 `public/images/themes-preview/`。如果你在本地或线上看到预览图缺失，优先检查对应主题是否有 `<id>.webp` 或 `<id>.png`。

常用入口：

- [主题预览站](https://preview.tangly1024.com/)
- [主题总览说明](./overview.md)
- [配置站点](../config-site.md)

## 完整主题表

| ID | 名称 | 定位 | 说明文档 |
| --- | --- | --- | --- |
| `simple` | Simple | 默认极简文字博客 | [simple.md](./simple.md) |
| `hexo` | Hexo | 经典双栏博客 | [hexo.md](./hexo.md) |
| `heo` | Heo | 模块化首页、通知条、英雄区 | [heo.md](./heo.md) |
| `gitbook` | GitBook | 文档/手册侧栏目录 | [gitbook.md](./gitbook.md) |
| `next` | Next | 双栏 + 移动悬浮目录 | [next.md](./next.md) |
| `medium` | Medium | Medium 风阅读 | [medium.md](./medium.md) |
| `matery` | Matery | Material 卡片列表 | [matery.md](./matery.md) |
| `nobelium` | Nobelium | 极简 | [nobelium.md](./nobelium.md) |
| `fukasawa` | Fukasawa | 多栏高密度 | [fukasawa.md](./fukasawa.md) |
| `fuwari` | Fuwari | 日系双栏色板 | [fuwari.md](./fuwari.md) · [FUWARI.md](../../developer/themes/FUWARI.md) |
| `typography` | Typography | 排版优先 | [typography.md](./typography.md) |
| `nav` | Nav | 导航站/聚合 | [nav.md](./nav.md) |
| `plog` | Plog | 图文/轻博客 | [plog.md](./plog.md) |
| `photo` | Photo | 摄影相册 | [photo.md](./photo.md) |
| `movie` | Movie | 影视海报墙 | [movie.md](./movie.md) |
| `game` | Game | 游戏像素风 | [game.md](./game.md) |
| `landing` | Landing | 单页着陆 | [landing.md](./landing.md) |
| `starter` | Starter | 营销落地页区块 | [starter.md](./starter.md) |
| `proxio` | Proxio | 作品集/品牌站 | [proxio.md](./proxio.md) |
| `commerce` | Commerce | 商品展示 | [commerce.md](./commerce.md) |
| `magzine` | Magazine | 杂志封面风（目录名 `magzine`） | [magzine.md](./magzine.md) |
| `claude` | Claude | 文档风 + 贡献热力图首页 | [claude.md](./claude.md) · [CLAUDE.md](../../developer/themes/CLAUDE.md) |
| `endspace` | Endspace | 终末工业风加载与侧栏 | [endspace.md](./endspace.md) · [ENDSPACE.md](../../developer/themes/ENDSPACE.md) |
| `example` | Example | 主题开发骨架 | [example.md](./example.md) |
| `thoughtlite` | ThoughtLite | 时间线首页 + Latest 卡片 | [thoughtlite.md](./thoughtlite.md) · [THOUGHTLITE.md](../../developer/themes/THOUGHTLITE.md) |

## 主题切换挂件

`NEXT_PUBLIC_THEME_SWITCH=true` 时，使用 `THEME_SWITCH_MANIFEST` 中的名称、简介与 `public/images/themes-preview/<id>.png|webp`。

新增主题贡献需提交预览图并更新 manifest，见 [THEME_MIGRATION_GUIDE.zh-CN.md](../../developer/THEME_MIGRATION_GUIDE.zh-CN.md)。

## 维护说明

修改 `themes/<id>/config.js` 后，运行 `node scripts/generate-theme-user-docs.mjs` 可刷新对应 `docs/user-guide/themes/<id>.md` 中的配置表。

## 主题菜单键（HEO 命名遗留）

部分主题（含 **Proxio**）用 `HEO_MENU_ARCHIVE` 等控制默认顶栏四项，与是否使用 HEO 主题无关。见 [proxio.md](./proxio.md#右上角导航定制)。
