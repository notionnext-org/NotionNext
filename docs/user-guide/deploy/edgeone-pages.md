# EdgeOne部署NotionNext
> 迁移自：[EdgeOne部署NotionNext](https://docs.tangly1024.com/article/deploy-notion-next-with-edge-one)
> 发布日期：2024-11-13
> 最后编辑：2026-5-2
> 原栏目：🚀 安装部署
> 标签：部署方案

::: warning 注意
腾讯云推出的EdgeOne支持部署Nextjs等主流前端框架项目，目前只支持静态导出，不支持动态站点，感兴趣的话可以体验一下。
:::


## 什么是EdgeOne？

![image.png](/legacy/98e6ba5059642eaf.png)

边缘安全加速平台EO（Tencent Cloud EdgeOne，下文简称为EdgeOne）**基于腾讯边缘计算节点提供加速 和安全的解决方案**，为电商与零售、金融服务、内容资讯与游戏等行业保驾护航，提升用户体验。 支持全网域名解析，实现统一管理，域名解析记录可添加。 添加域名后，DNS 解析自动导入该域名下的所有主机记录。

参考文章：

[腾讯推出免费部署网站服务，可搭建个人博客：EdgeOne Pages](https://mp.weixin.qq.com/s/LdE-bNPttF6d8sDEvsgKuw)


## 注册开通

使用「EdgeOne Pages」你需要准备 Google 和 Github 的账号，然后访问 EdgeOne 网站进行注册账号。

点击注册：[https://edgeone.ai/register](https://edgeone.ai/register) 。注册完成后跳转到腾讯云后台，点击“立即开通”从而开启OpenEdge功能。

![image.png](/legacy/e2fde02d3a3dc93d.png)


## 关联Github导入项目

开通Pages后，页面提示板顶绑定 GitHub

![image.png](/legacy/eab7cee1303c2a76.png)

按照步骤进行授权

![image.png](/legacy/fc1d435ac6a9d337.png)

选择允许访问的代码项目，这里我选择允许访问所有仓库。（您也可以指定只访问个别仓库）

![image.png](/legacy/e2593e58eff96648.png)


### 导入项目

选择NotionNext项目

![image.png](/legacy/10ab179bdf2c532e.png)


### 配置编译选项

系统会自动检测项目的框架，并且预填写构建命令。

![image.png](/legacy/3ba032d991aeb8b7.png)

这里我们要注意三处地方改动：

1. 构建命令请使用静态导出：`**yarn export**`（不要再用 `**yarn build**` 作为最终构建命令）。若托管面板模板仍显示 `npm run build` / `npm run export`，请按仓库习惯改为 Yarn。前者是动态站点，后者是静态。

1. `项目名称`要修改一下，名称长度必须为5到63个字符，只能包含小写字母、数字和连字符。

1. 环境变量中添加您的`NOTION_PAGE_ID`

修改后配置如下图：

![image.png](/legacy/14a2f5d30373d6a0.png)

确认配置后就可以点击“开始部署”按钮，进行部署了：


### 等待部署

过程需要几分钟不等。

![image.png](/legacy/6a90f47eaed46482.png)


### 部署完成

![image.png](/legacy/646bb8f4a40cbc70.png)

点击右上角的预览按钮，获取临时访问链接：

![image.png](/legacy/5671fac8545ab77b.png)

点击访问；

![image.png](/legacy/03962c7a827f16d9.png)


## 修改配置与重新部署

您可以随时返回到项目设置中，添加或修改环境变量，例如修改主题.

![image.png](/legacy/dc5e2946c85d8068.png)

然后在构建部署栏目中，点击更多，并重新部署项目

![image.png](/legacy/ebdc918388b619f6.png)


## 绑定自定义域名

项目设置中，点击添加自定义域名

![image.png](/legacy/9ee52bd15f7ace99.png)

输入您需要绑定的域名

![image.png](/legacy/6d5caeb51bbd57c7.png)

按照要求在您的域名服务商后台添加一条`CNAME`解析即可

![image.png](/legacy/b26d5257549bed4d.png)

例如系统分配给我的CNAME是 `eo `→ `eo.tangly1024.com.dns.edgeone.app.` 。

我的域名托管在CloudFlare，因此我用CloudFlare来示例如何配置CNAME。

点击DNS管理，添加记录，类型是CNAME，名称是eo，目标是我的`eo.tangly1024.com.dns.edgeone.app.` （注意这里填写你的，每个人不一样），然后将代理状态的橙色云暂时关闭。最后点击保存。

![image.png](/legacy/9bfb2ea4eca4ff57.png)

然后点击验证：

![image.png](/legacy/13754a23039c4c04.png)

系统会检查您的DNS解析状态

![image.png](/legacy/afabf2b74cdaac7e.png)

验证成功：

![image.png](/legacy/dc1d57a240a92ad4.png)

然后系统会自动验证证书大概2分钟左右能完成。

![image.png](/legacy/632b1a552ba92b3c.png)

这里其实可以不用等它，只要DNS记录验证成功，就可以直接访问站点了


### 访问站点

[Tangly的学习笔记 | 取势、明道、优术](https://eo.tangly1024.com/)

取势、明道、优术

EdgeOne在使用的过程中还有一些小BUG，例如部署后配置没有生效，毕竟是比较初版的功能，后面更新应该会好。

最后，当站点都启动完成后，可以回到CloudFlare后台，开启橙色的代理状态，从而激活CloudFlare的缓存、全球CDN加速等功能。

![image.png](/legacy/15a45a06ee40e8ce.png)

## 原文链接

https://docs.tangly1024.com/article/deploy-notion-next-with-edge-one
