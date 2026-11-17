# Zeabur云部署
> 迁移自：[Zeabur云部署](https://docs.tangly1024.com/article/deploy-notion-next-with-zeabur)
> 发布日期：2023-6-29
> 最后编辑：2026-5-2
> 原栏目：🚀 安装部署
> 标签：部署方案、NotionNext、Zeabur

## Zeabur

Zeabur是一款优秀的、国人自研的托管平台，部署效果预览：

[Notion Blog | 一个NotionNext搭建的博客](https://tangly.zeabur.app/)

一个NotionNext搭建的博客

- 绑定个性域名

[Notion Blog | 一个NotionNext搭建的博客](https://zeabur-tangly.tangly1024.com/)

一个NotionNext搭建的博客


## 开始

创建一个项目

![Untitled](/legacy/b5eabc7ce5896e4f.png)

![Untitled](/legacy/56648b6274aae7ee.png)

![Untitled](/legacy/9fb2369458bdd9a6.png)


## 导入代码

点击Deploy New Service

![Untitled](/legacy/e237427c8b700878.png)

选择Git

![Untitled](/legacy/64e4dec8e180fea0.png)

点击Configure Github进行授权

![Untitled](/legacy/b8926c7a2b6ed2e1.png)

点击 Install 统同意安装Zeabur插件

![Untitled](/legacy/a842063f7bd92830.png)

返回刷新授权页面

搜索查找你的NotionNext项目

![Untitled](/legacy/3071cd872e59cf8b.png)

点击导入，然后等着就好了


## 配置

项目下方的Variable中可以添加对应的环境变量

添加 Key 为 NOTION_PAGE_ID，值为您的页面 id 即可。

![Untitled](/legacy/98603dd527e1d790.png)


### 其它一键部署

[Zeabur](https://dash.zeabur.com/templates/AA9MFJ)

A platform that help you deploy your service with one click,                No matter what programming language you use, what framework you use.


### 绑定个性域名

添加域名后进行CNAME解析即可,可参考Vercel绑定自定义域名

![Untitled](/legacy/ada386bbcaad48df.png)


## 官方文档

[快速开始 – Zeabur](https://zeabur.com/docs/zh-CN/get-started)

Zeabur: Deploy your service with one click.

## 原文链接

https://docs.tangly1024.com/article/deploy-notion-next-with-zeabur
