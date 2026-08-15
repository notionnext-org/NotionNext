# 参考手册（4.10.2）

本目录与 **`conf/*.config.js`**、`blog.config.js` 同步维护，描述 **当前主线**（`package.json` 版本，现为 **4.10.2**）能力，替代多年前源站教程中的过时表述。

| 文档 | 内容 |
| --- | --- |
| [全站功能与配置索引](./features.md) | 评论、统计、挂件、文章、Notion、性能、广告等 **全部配置项** |
| [Notion 数据与 4.x 能力](./notion-4x.md) | 数据库视图、字段、Menu、置顶、嵌入媒体等 |
| [部署与环境](./../deploy/) | 各平台部署（见 deploy 目录） |

配置优先级（与 [config-site.md](../config-site.md) 一致）：**Notion Config 表 > 环境变量 > `conf/*.js` > 主题 `config.js`**。

维护者更新代码中的配置时，请同步修改本目录，流程见 [MAINTENANCE_WORKFLOW.md](../MAINTENANCE_WORKFLOW.md)。
