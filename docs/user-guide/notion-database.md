# Notion数据库的使用
> 迁移自：[Notion数据库的使用](https://docs.tangly1024.com/article/start-to-write)
> 发布日期：2023-6-27
> 最后编辑：2024-9-4
> 原栏目：✒ Notion教程
> 标签：Notion
> 摘要：数据库的每一列有不同的功能；
第一列type表是文章的类型 ，有 post、page、menu这几种类型，post表示博文列表、page表示单独页面、menu是菜单。
第三列summary 是文章摘要，只有post会用到，显示在文章列表中
第七列 slug ，在menu中表示跳转到那个页面， 在post和page中表示 这篇文章在博客中的访问地址。

## 基本操作


### 如何进行写作？

将鼠标指向数据库表中的title这一栏，会浮现一个OPEN的按钮，点击即可查看编写文章；点击右上角的蓝色**NEW**按钮创建新文章。

![Untitled](/legacy/29fd085490ca9eee.png)


### 如何排序或置顶文章？

Notion数据库支持手动拖拽排序，鼠标选停在表格的左侧会出现六个点构成的按钮，并提示“Drag to move”，此时即可拖动文章进行排序。

![Untitled](/legacy/0698c34b2ec30cde.png)


## Notion数据库说明

在部署NotionNext项目时，您必须复制我提供的Notion数据库，这个数据库预先填充了以下字段：

### 4.10.9 之后的兼容性说明

Notion 自身会不断调整数据库块的内部类型。新版 NotionNext 已兼容以下场景：

- 配置库既可以是旧的 `collection_view`，也可以是新版页面数据库常见的 `collection_view_page`。
- 页面正文中包含数据库视图、HTML 块、Tabs 块或空内容块时，不会因为 `content is not iterable` 这类异常中断构建。
- 文章纯文本摘要和目录会跳过无法安全展开的特殊块，优先保证页面能正常生成。

如果升级后发现配置没有生效，优先检查：

1. Notion Config 数据库是否仍在主页面内容中，而不是被放进未公开页面。
2. 配置库里的 `key`、`value`、`enable` 字段名称是否和模板一致。
3. 部署记录是否已经使用包含 `4.10.9` 的最新提交。


## Notion进阶教程
::: tip 提示
Notion是一个能让效率暴涨的生产力引擎，可以帮你书写文档、管理笔记，搭建知识库，甚至可以为你规划项目、时间管理、组织团队、提高生产力、还有当前最强大的AI技术加持。
:::

如果希望进一步探索Notion的功能，可以尝试《[Notion All in One 搭建高能效率系统](https://www.notion.so/cb321d270b454a56bfa3a7199001daf9?pvs=25)》课程

## 原文链接

https://docs.tangly1024.com/article/start-to-write
