# 站点组合
> 迁移自：[站点组合](https://docs.tangly1024.com/article/notion-next-site-combine)
> 发布日期：2024-5-29
> 最后编辑：2024-6-3
> 原栏目：🛠 站点配置

## 多板块站点的搭建

围绕一个核心站点域名，通常可以做很多业务，例如搭建内容更丰富的综合网站，既有博客、相册、文档、落地页、产品页、甚至电商页面等功能的综合网站该怎么做？

旧的做法是用二级域名多站点，新的NotionNext中则支持多板块。


## 二级域名多站点

我创建了很多网站，每个网站有各自的主题和功能：

1. [www.tangly1024.com](/user-guide/intro) 主页介绍

1. [blog.tangly1024.com](/user-guide/intro) 博客

1. [docs.tangly1024.com](/user-guide/intro) 文档

1. xxx 等等。

这样每个站点都有各自的数据库和独立的权重域名进行运营。


## 单站点多板块

NotionNext结合[《多数据库》](/user-guide/config/notion-next-mulity-languages)可以有很多灵活的玩法

“一个站点支持绑定多个notion数据库”，部署的第2个以上的数据库，可以指定子路径访问；并且每个数据库可以配置自己的主题(用`NOTION_CONFIG`)。

从而最终实现以下效果,每个子路径实际访问的是不同的Notion数据库。

1. www.xx.com 主站 , 可以是任意主题或者导航风格。例如nav、heo、starter等等。

1. www.xx.com/blog, 博客板块使用example主题

1. www.xx.com/docs，文档板块使用docs主题。

1. www.xx.com/movie，视频板块，使用movie主题

1. www.xx.com/albulm，相册板块，使用plog主题。

首页主题作为导航使用，然后设置URL跳转到子版块。这样就可以创建一个具有多种综合业务的门户网站。


### 单站点的缺陷

1. 不支持静态部署，只能用动态的方案；即不支持Cloudflare\yarn export 等纯静态导出

1. 与多语言功能冲突。如果子版块要差异化运营多语言就不支持。

## 原文链接

https://docs.tangly1024.com/article/notion-next-site-combine
