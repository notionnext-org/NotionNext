# Vercel静态部署NotionNext
> 迁移自：[Vercel静态部署NotionNext](https://docs.tangly1024.com/article/vercel-deploy-notion-next-static)
> 发布日期：2024-5-10
> 最后编辑：2024-5-10
> 原栏目：🚀 安装部署
> 标签：NotionNext、部署方案
> 摘要：纯静态部署将牺牲动态获取数据的便利性

我目前主要使用Vercel云托管。

Vercel的个人免费版足够普通的博客网站使用，但如果你的网站运营成功，可能会出现每天有大量的访客访问，这样会快速消耗您Vercel的计费函数，在Vercel后台的Usage中可以看到免费版本的用量。

![Untitled](/legacy/3c76fd3ca07c5dd8.png)

此时可以有三种解决方法；

1. 充值Vercel会员

1. 换平台，例如Netlify部署

1. 购买服务器，在自己的VPS上部署。

1. 换部署方案，改为纯静态部署.


## 纯静态部署

站点流量太大，为了节省资费，我在一年前开始使用纯静态的部署方案，因为站点是纯静态的，所以vercel只是为我存放了静态文件，无需实时运行函数来抓取数据和渲染网页。

从而极大地减少Vercel中`FunctionExecution`的用量，但代价是我每次发布文章修改内容都要到Vercel后台重新[redeploy](/user-guide/deploy/vercel-redeploy)一下，好在我的文章更新频率不高。


### 修改方式

在Vercel项目后台的`General`中，将打包命令改为`yarn export`这种模式是静态运行网站，适合站点访问量大，文章更新不频繁的用户。

![Untitled](/legacy/4deb853606a4f95a.png)


### 另一种纯静态部署

另一种就是直接用[Cloudflare的部署方案](/user-guide/deploy/cloudflare-pages)， 而这种方案也是静态导出，需要在更新文章后重新部署。

## 原文链接

https://docs.tangly1024.com/article/vercel-deploy-notion-next-static
