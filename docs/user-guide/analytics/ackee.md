# Ackee站点统计
> 迁移自：[Ackee站点统计](https://docs.tangly1024.com/article/notion-next-ackee)
> 发布日期：2023-8-1
> 最后编辑：2024-1-31
> 原栏目：📊 网站统计

::: tip 提示
通常我们会选择 uptime kuma , umami 等站点监控程序，来对我们的站点访问信息进行监控，但是其大多数都依赖docker等后端承载。而ackee 是一款可以直接使用vercel加MongoDB免费搭建的站点统计工具。
:::


## 效果

在后台可以查看实时访客，总访客、文章访问频次排行等信息。

![Untitled](/legacy/7b444807ced71c53.png)

接下来介绍如何部署


## 部署ackee管理后台


### 1.创建MongoDB数据库

[MongoDB Cloud](https://cloud.mongodb.com/)

Products Solutions Developer Data Platform Innovate fast at scale with a unified developer experience White Papers & Presentations Webinars, white papers, data sheet and more Resources Company Pricing MongoDB cloud services consist of a comprehensive suite of data products that accelerate and simplify how you build with data for any application.

<details>
<summary>1.注册账号 创建数据库</summary>

![推荐使用Github登录](/legacy/76aa1c675b245047.png)
![选择最右边的免费方案即可](/legacy/0272802666cbc202.png)
![选择一个地区，点击Create Cluster](/legacy/b5e912de572e32c9.png)
![创建用户名密码](/legacy/54dba97b2a71e70b.png)
::: tip 提示
这里下方要设置一个允许访问该数据库的IP地址，推荐设置0.0.0.0，即所有地址都允许访问，毕竟我也不知道自己会用什么ip访问这个数据库。
:::

</details>

<details>
<summary>2.获取数据库连接地址</summary>

![面板首页点击Connect](/legacy/4540298a350f8f1f.png)
![点击 MongoDB Drivers](/legacy/559423cb7af3f107.png)
![点击复制您的数据库连接地址](/legacy/b0c876e08611dfa3.png)
::: tip 提示
注意，&lt;password&gt;要手动替换成您设置的密码
:::

</details>


### 2. 一键部署

官方有所有渠道的部署方式，我这里拿Netlify举例，Netlify和Vercel的操作流程几乎一致，都是导入项目，配置环境变量即可部署。此处不展开用Vercel部署的教程。

- 可参考官方的教程文档获取更多帮助
[https://github.com/electerious/Ackee/blob/master/docs/Get%20started.md](https://github.com/electerious/Ackee/blob/master/docs/Get%20started.md)

点击下方链接一键在Netlify上部署Ackee；推荐使用github账号登录

[Netlify App](https://app.netlify.com/start/deploy?repository=https://github.com/electerious/Ackee)

Start building the best web experiences in record time

配置参考下图，然后点击`save & deploy` 即可

![Untitled](/legacy/e571ef2b6a21d125.png)

部署完成后，在后台绑定域名

点击 Site configuration→ Domain management → Domains ，然后点击 Add domain  alias 。

填写您准备的域名，并点击Save保存。

![Untitled](/legacy/36a30d62bc9cfe3e.png)

此时页面会提示** Awaiting External DNS** ， 意思是等待您绑定DNS信息。


#### 如何在域名商后台绑定您的域名？

在域名服务商中添加一个CNAME即可生效。和vercel的操作基本一致。

可以参考《Vercel绑定域名》这篇文章的 《CNAME解析》部分

[Vercel绑定自定义域名 | NotionNext文档](/user-guide/deploy/vercel-domain#c7b213564fdb40ffb43b51ae31c08963)

Vercel 借助cloudFlare可以快速绑定解析自己的域名


#### 登录Ackee后台添加您的网址，并获取配置

用上一步账号密码登录后台，找到Setting，点击New domain 添加您的域名

![Untitled](/legacy/ae0e5436d7fa291d.png)

获取到嵌入代码和Domain id即可

![Untitled](/legacy/03b132cad4d8f380.png)


## 配置NotionNext

从上一步的嵌入代码提取出Ackee的三个变量，在NotionNext项目后台添加如下环境变量即可


## 完成

配置后，重新部署NotionNext项目接即可

## 原文链接

https://docs.tangly1024.com/article/notion-next-ackee
