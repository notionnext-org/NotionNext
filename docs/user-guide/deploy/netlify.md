# Netlify云函数部署
> 迁移自：[Netlify云函数部署](https://docs.tangly1024.com/article/deploy-notion-next-with-netlify)
> 发布日期：2023-8-1
> 最后编辑：2026-5-2
> 原栏目：🚀 安装部署
> 标签：部署方案、NotionNext、Netlify

::: tip 提示
从NotionNext 4.0.9 开始 支持 Netlify部署，Netlify相比Vercel有更充足的免费额度，而且中国大陆访问的速度很不错。

构建环境请使用 Node 22（与官方仓库 README 一致），本地开发与构建命令以 Yarn 为准，例如 &lt;code&gt;yarn&lt;/code&gt;、&lt;code&gt;yarn build&lt;/code&gt;。
:::


## 序

Netlify 和 Vercel的部署方案大同小异，只是在之前的版本中存在依赖的不兼容，导致Netlify部署失败。在4.0.9版本中已经修复

现在您可以在netlify中轻松部署

![Untitled](/legacy/8bce12d26893bcf5.png)


## 开始

用github登录Netlify

[Develop and deploy websites and apps in record time | Netlify](https://www.netlify.com/)

Accelerate the time to deploy your websites and apps. Bring your integrations and APIs together on one powerful serverless platform. Get started for free!

点击Import an existing project ，导入您的github项目

![Untitled](/legacy/2c01f30a32ff7cb6.png)

除了部署时添加环境变量，无需其它额外配置


### 配置域名

和Vercel的方案大同小异，可以在首页的Domain settings中找到配置，按照指引添加域名，并配置CNAME即可。

![Untitled](/legacy/f0a0593c7209a949.png)

## 原文链接

https://docs.tangly1024.com/article/deploy-notion-next-with-netlify
