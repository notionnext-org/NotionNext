# 评论插件说明
> 迁移自：[评论插件说明](https://docs.tangly1024.com/article/notion-next-comment-plugin)
> 发布日期：2024-7-11
> 最后编辑：2024-7-11
> 原栏目：📩 评论插件

## NotionNext评论插件

NotionNext支持多种评论插件，通常只需要准备好对应的评论功能，在NotionNext的环境变量中添加评论插件的信息即可启用。

目前支持7种评论插件，其中部署最快速的是 **Cusdis** 和 **Utterance**这两个插件，他们几乎不需要另外的设置，直接配置到NotionNext即可。

其中体验比较好的是Twikoo。它支持直接在页面上管理评论，而且能友好地根据用户评论时的邮箱展示头像，同时支持方便的邮箱通知配置。

另外Valine/Waline也很不错，它们是很相似的一对评论插件，借助LeanCloud存储数据。

### 评论、登录和会员能力的边界

如果只是给博客、文档站或个人网站增加评论，优先选择现有评论插件。Twikoo、Waline、Artalk、Giscus、Cusdis 等方案已经覆盖了评论存储、审核、通知、反垃圾和迁移等常见需求，不需要把评论系统重新写进 NotionNext。

如果站点需要登录、会员权限或“只有登录用户才能评论”，建议把登录身份、会员权限和评论存储拆开看：

- 登录身份可以交给 Clerk 等认证服务。
- Notion Integration 更适合作为站长可维护的低频权限后台，例如维护会员状态、角色、过期时间和可访问内容。
- 评论数据可以继续使用现有评论插件；只有在确实需要与站点账号深度绑定时，再考虑启用一个轻量的 Notion 评论适配。

不建议一开始把支付、订单、积分、复杂 RBAC 全塞进 NotionNext。Notion 适合当“站长可视化后台”和低频权限源，不适合当高并发交易数据库。评论如果流量较大，仍建议使用 Waline、Artalk、Twikoo 或自建数据库，并保留登录身份绑定。

这类能力会尽量作为可选插件、适配器或示例存在，不影响博客站点的最简单使用路径。相关规划见 [会员、权限与评论可选集成路线图](../../developer/MEMBERSHIP_COMMENTS_ROADMAP.md)。


### 同时部署多个评论插件

您可以选择同时部署多个。多个评论插件会在评论区用切换面板的形式展现

![Untitled](/legacy/ca70e8b75d83a586.png)


### 关闭特定文章的评论

在4.5.4以后的版本中，支持在Notion数据库中配置comment属性，如果属性值为Hide，就可以隐藏该页面的评论区域。

具体方法，找到页面的字段列表，在最后找到+Add a property 按钮 ，然后添加一个新的字段, 类型是 Select（下拉框）名称是 comment ， 然后添加Hide和Show 两个下拉框的值即可。

1. 点击添加新属性

![0.如果显示 more properties 则先点此展开所有被折叠的选项](/legacy/0db5f5d89389aef4.png)
![1. 添加新属性](/legacy/7ab467a7c36c212a.png)

1. 设置属性名和类型

![2.选择属性类型 Select](/legacy/8877db70fe37b27c.png)
    1. 添加选项
![3. 设置属性名 comment](/legacy/14e7de3445532482.png)

![4. 添加下拉框支持的选项](/legacy/feedfaa748929f14.png)
![5. 添加好选项，这里我添加了两个，其实有用的就是Hide。如果识别为Hide则隐藏评论](/legacy/640c41b503520e73.png)

1. 使用

![6.使用效果](/legacy/de5b9cae6b5d5f49.png)

参考实现结果：

[1文章测试 | Notion](https://www.notion.so/tanghh/1-4ccb80cbc8a847d1bc2111fe791919ae?pvs=4)

目录1

## 原文链接

https://docs.tangly1024.com/article/notion-next-comment-plugin

## NotionComments

如果希望评论数据也保存在 Notion 中，可以使用 [NotionComments](./notion-comments.md)。它通过 Notion API 写入独立的评论数据库，访客不需要登录 Notion；支持昵称、回复、加载更多、Notion 手动审核和基础频率限制，但没有独立管理后台、邮件通知和完整垃圾评论过滤，更适合轻量站点。
