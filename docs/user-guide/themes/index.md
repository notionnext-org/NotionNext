# 内置主题说明文档（26 个）

每个主题一篇独立说明：**主题特性**、**启用方式**与 **`themes/<id>/config.js` 配置表** 与代码同步。维护者可运行：

```bash
node scripts/generate-theme-user-docs.mjs
```

从各主题 `config.js` 重新生成配置表（改键名后请执行）。`proxio` / `heo` 含手写章节，脚本只更新 `<!-- theme-config-table -->` 段。

<!-- theme-index-table -->

## 全部主题（26 个）

| ID | 名称 | 特性摘要 | 说明 |
| --- | --- | --- | --- |
| `claude` | Claude | 类 Claude Docs 的文档与终端氛围。 | [claude.md](./claude.md) · [实现文档](../../developer/themes/CLAUDE.md) |
| `commerce` | Commerce | 电商与商品展示向页面结构。 | [commerce.md](./commerce.md) |
| `endspace` | Endspace | 轻工业终末风，侧栏导航、悬浮控件与加载动画。 | [endspace.md](./endspace.md) · [实现文档](../../developer/themes/ENDSPACE.md) |
| `example` | Example | 示例与演示向默认骨架。 | [example.md](./example.md) |
| `fukasawa` | Fukasawa | 深川式多栏与侧边信息密度较高。 | [fukasawa.md](./fukasawa.md) |
| `fuwari` | Fuwari | 日系轻量双栏与主题色板。 | [fuwari.md](./fuwari.md) · [实现文档](../../developer/themes/FUWARI.md) |
| `game` | Game | 偏游戏与像素元素装饰。 | [game.md](./game.md) |
| `gitbook` | GitBook | 文档与手册式侧栏目录结构。 | [gitbook.md](./gitbook.md) |
| `heo` | Heo | 致敬张洪Heo,丰富的 模块化组件。 | [heo.md](./heo.md) |
| `hexo` | Hexo | 类 Hexo 经典博客结构与侧边栏。 | [hexo.md](./hexo.md) |
| `landing` | Landing | 单页着陆与分区滚动叙述。 | [landing.md](./landing.md) |
| `magzine` | Magazine | 杂志封面与大图列表风格。 | [magzine.md](./magzine.md) |
| `matery` | Matery | 卡片式列表与 Material 质感组件。 | [matery.md](./matery.md) |
| `medium` | Medium | Medium 风格阅读体验与排版。 | [medium.md](./medium.md) |
| `movie` | Movie | 影视与海报墙式呈现。 | [movie.md](./movie.md) |
| `nav` | Nav | 顶部导航主导航的现代布局。 | [nav.md](./nav.md) |
| `next` | Next | 经典双栏布局，右侧栏与移动端悬浮目录。 | [next.md](./next.md) |
| `nobelium` | Nobelium | 致敬Nobelium,极简排版风格。 | [nobelium.md](./nobelium.md) |
| `opc` | Opc | 个人主页与一人公司入口，聚焦 AI 工作流。 | [opc.md](./opc.md) |
| `photo` | Photo | 摄影作品与相册网格。 | [photo.md](./photo.md) |
| `plog` | Plog | 偏图片与轻量图文化展示。 | [plog.md](./plog.md) |
| `proxio` | Proxio | 作品集与个人品牌展示增强。 | [proxio.md](./proxio.md) |
| `simple` | Simple | 极简清爽，适合文字为主的博客。 | [simple.md](./simple.md) |
| `starter` | Starter | 落地页与区块化营销向模板。 | [starter.md](./starter.md) |
| `thoughtlite` | ThoughtLite | 轻阅读向时间线与 Latest 卡片，单列列表与文章卡片排版。 | [thoughtlite.md](./thoughtlite.md) · [实现文档](../../developer/themes/THOUGHTLITE.md) |
| `typography` | Typography | 排版优先，强调正文阅读与层级。 | [typography.md](./typography.md) |

<!-- /theme-index-table -->

另见：[主题总览](./overview.md) · [内置主题全览](./THEMES_CATALOG.md)
