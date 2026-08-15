# UMAMI统计
> 迁移自：[UMAMI统计](https://docs.tangly1024.com/article/notion-next-umami)
> 发布日期：2025-8-27
> 最后编辑：2025-8-27
> 原栏目：📊 网站统计

**Umami** 是一款开源的、注重隐私的网站分析工具。您可以把它看作是 **Google Analytics 的一个更简单、更轻量、更保护用户隐私的替代品**。

![image.png](/legacy/5d5e1ac181a08986.png)


#### **UMAMI主要特点和优势：**

1. **极度轻量**
它的跟踪脚本非常小（约 2KB），几乎不会影响您网站的加载速度。

1. **简洁直观的界面**
界面设计干净清爽，只展示最重要的指标（如页面浏览量、访问用户数、平均停留时间等），让您能快速获取信息，而不会被海量复杂的数据淹没。

1. **尊重隐私**
**不开设：** 不使用 Cookie 来跟踪用户，因此不需要烦人的 Cookie 横幅提示。
**不收集个人数据：** 不会收集或存储任何可以识别个人身份的信息（PII），符合 GDPR、CCPA 等隐私法规。
所有数据都归您自己所有。

1. **自托管**
您可以将 Umami 部署在自己的服务器上（支持 Docker 部署），这意味着您对自己的数据拥有 100% 的完全控制权，数据不会发送给任何第三方公司。它同时也提供云端付费托管服务。

1. **开源免费**
其代码在 MIT 许可证下开源，可以免费使用和修改。拥有一个活跃的社区支持其发展。


## NotionNext嵌入RPA

如果用云托管服务的话，只需要在Notion的配置中心添加`UMAMI_ID`即可：

配置截图效果：

![image.png](/legacy/a6a5455240a4d14a.png)


### UMAMI_ID从哪里来？

UMAMI_ID 的值来自于umami后台的website_id

![image.png](/legacy/34e2f34a5ddfdb43.png)

id 同时可以在官方提供的注入代码中找到

![image.png](/legacy/0ee05d5db9794795.png)


### 关于umami注册

注册和创建站点的步骤此处不做赘述，按照官方指引，用邮箱注册验证即可。注册链接[https://cloud.umami.is/](https://cloud.umami.is/) ,

UMAMI云托管提供免费14天试用，到期后每月20$。除了选择官方的云托管，你还可以选择自行搭建一个umami。

![image.png](/legacy/c9422a8bfa09971e.png)


## 自行搭建

自行搭建的UMAMI，在NotionNext中的配置需要多一项UMAMI_HOST，指向你自建的umami的脚本地址。

umami后台获取的HOST地址：

![image.png](/legacy/0306a23b5106e9d1.png)

可借助Zeabur方案，一键部署umami：[https://zeabur.com/zh-CN/templates](https://zeabur.com/zh-CN/templates) ， 在zeabur的应用模板中心直接搜umami即可。

![image.png](/legacy/43e4d7d4a8ad57a4.png)

也可借助vercel方案自建UMAMI，参考下文：

[从零开始搭建一个免费的个人博客数据统计系统（umami + Vercel + Heroku）-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/2262145)

使用Heroku创建Postgres数据库，通过Vercel一键部署umami服务，轻松收集网站统计数据。配置自定义脚本名称和域名，优化数据追踪。无需后续维护，便捷管理网站数据，适合个人博客使用。

## 原文链接

https://docs.tangly1024.com/article/notion-next-umami
