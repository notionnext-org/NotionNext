# Twikoo
> 迁移自：[Twikoo](https://docs.tangly1024.com/article/notionnext-twikoo)
> 发布日期：2022-12-20
> 最后编辑：2024-7-31
> 原栏目：📩 评论插件
> 标签：NotionNext
> 摘要：NotionNext现在支持 Twikoo啦，很好用的评论 插件

## Twikoo

经评论区网友推荐，我开始使用 Twikoo，Twikoo是一个简洁、安全、免费的静态网站评论系统，基于 [腾讯云开发](https://curl.qcloud.com/KnnJtUom)。一番体验，发现Twikoo真的很强大，目前我决定用它作为主要评论插件。

Twikoo支持支持即时通知反垃圾插件、隐私设置等功能，无需另外登录后台，并且配置方式也十分方便，在页面评论区就可以直接管理评论、配置插件。

::: tip 提示
Twikoo支持一键导入valine评论数据，您可以很方便地迁移评论数据。
:::

![Untitled](/legacy/d93a06d972657351.png)


### 快速配置

在最新版本中 NotionNext已经 支持该评论插件，配置 方法很简单：

在Vercel后台添加一个环境变量 `NEXT_PUBLIC_COMMENT_ENV_ID` ; 值为您部署好的`twikoo`后台地址。以我的举例：

![Untitled](/legacy/35d635ccc0a23f75.png)

配置好redeploy您的项目即可获得如下配置

![Untitled](/legacy/ab22544ca490ee83.png)

::: tip 提示
问题来了，twikoo的后台地址怎么获得呢？
:::

借助vercel，您可以非常快速地部署自己的twikoo后台，用于储存评论数据。


## Twikoo部署步骤

twikoo的后台数据存储是基于MongoDB数据库的，我们可以先注册创建一个免费的在线MongoDB数据库。

::: tip 提示
Twikoo我以经很久不重新部署了，除了参阅我下文的教程外，建议您参考官方最新的文档和视频。
:::

关于Twikoo的部署建议您参考官方文档：

[云函数部署 | Twikoo 文档](https://twikoo.js.org/backend.html?fbclid=IwAR0DM3tX9I0zBlY9oYorxC_d9c0LcQYR6J1p4OS-kiNF2PcLkcEmShBCayQ)

一个简洁、安全、免费的静态网站评论系统

相关视频教程

[Twikoo Vercel 部署教程_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Fh411e7ZH/)

Twikoo Vercel 部署教程共计2条视频，包括：2022 版部署教程、2021 老版部署教程（已废弃）等，UP主更多精彩视频，请关注UP账号。


## 实践步骤

我之前部署的操作流程，由于MongoDB的后台页面变化已经twikoo的代码升级，此文已是两年前版本（2022-12-20）。仅供大致流程参考。


### 1.创建MongoDB数据库

[MongoDB Cloud](https://cloud.mongodb.com/)

Products Solutions Developer Data Platform Innovate fast at scale with a unified developer experience White Papers & Presentations Webinars, white papers, data sheet and more Resources Company Pricing MongoDB cloud services consist of a comprehensive suite of data products that accelerate and simplify how you build with data for any application.

<details>
<summary>1.注册登录并创建数据库</summary>

![推荐使用Github登录](/legacy/c0765cda50662d02.png)
![选择最右边的免费方案即可](/legacy/64be60c684cf3ed0.png)
![选择一个地区，点击Create Cluster](/legacy/062721204e95de2e.png)
![创建用户名密码](/legacy/7287a4b355fd6b07.png)
::: tip 提示
这里下方要设置一个允许访问该数据库的IP地址，推荐设置0.0.0.0，即所有地址都允许访问，毕竟我也不知道自己会用什么ip访问这个数据库。
依次点击：1.左侧菜单Network Access、2.右侧面板Add IP Adress，

![Untitled](/legacy/f9763ea59bc1f9cb.png)
输入IP地址0.0.0.0/0并提交
![Untitled](/legacy/a5ca6e95d8340747.png)
:::

</details>

<details>
<summary>2.获取数据库连接地址</summary>

![面板首页点击Connect点击 MongoDB Drivers](/legacy/dec764bfa41f11ed.png)
![选择 Drivers类型](/legacy/1e3a3576ce8d49c9.png)
![这里的版本号无关紧要](/legacy/db6271ab043a058b.png)
::: tip 提示
注意，**&lt;password&gt;**要手动替换成您设置的密码 ; 填写密码时去掉两侧的尖括号 &lt; &gt;
:::

示例 **mongodb+srv://username:123456@xx.com**

</details>


### 2. Vercel一键部署

<details>
<summary>1.点击此链接导入代码</summary>

::: tip 提示
部分网友反馈：部署到 Vercel的时候总是报错：An unexpected error occurred. Our team has already been notified and are working to resolve the issue, please try again shortly.而用Twikoo官方版本的一键部署就可以成功部署。
我很久不部署twikoo了，这里建议还是参阅官方的代码
[云函数部署 | Twikoo 文档](https://twikoo.js.org/backend.html?fbclid=IwAR0DM3tX9I0zBlY9oYorxC_d9c0LcQYR6J1p4OS-kiNF2PcLkcEmShBCayQ)
:::

一个简洁、安全、免费的静态网站评论系统
<details>
<summary>~~(改良版)官方的代码仓库部署失败，尝试用此链接部署~~</summary>

[New Project – Vercel](https://vercel.com/import/project?template=https://github.com/ciraos/twikoo-vercel)

</details>
<details>
<summary>(旧)~~点击下方链接一键部署~~</summary>

[New Project - Vercel](https://vercel.com/import/project?template=https://github.com/imaegoo/twikoo/tree/main/src/server/vercel)

Create Git Repository To ensure you can easily update your project after deploying it, a Git repository must be created. Every push to that Git repository will be deployed automatically.

</details>

</details>

<details>
<summary>2.点击Create将twikoo的代码拷入您的仓库</summary>

![Untitled](/legacy/e61f5966c2a841de.png)
![点击右上角Continue to Dashboard](/legacy/785e5937de2d5281.png)

</details>

<details>
<summary>3.配置MongoDB数据库地址</summary>

添加一个配置 `MONGODB_URI` 环境变量即可，其值为上一步获得的MongoDB连接地址，注意将链接中MONGODB的密码`&lt;password&gt;`替换成您设置的。
![在twikoo后台添加MONGODB_URI的环境变量](/legacy/47d590be873798d8.png)
![添加完成后记得重新部署](/legacy/ee8e00f1d5663886.png)

</details>

- 部署后为确保此服务能被公开访问掉，需要检查vercel后台的权限验证是关闭状态：
在setting的Deployment Protection下确保Disabled关闭
![149B6744-99AC-46B3-88C4-7114006F620A.jpeg](/legacy/f3d2986737dc8489.jpg)

上述部署完成后，您将获得一个vercel的twikoo后台页面，在vercel后台的domain中可以看到平台为您分配的默认域名，您可以选择像我一样自定义绑定域名，详情参考《vercel绑定自定义域名》这一章节

[https://twikoo.tangly1024.com/](https://twikoo.tangly1024.com/)


## 配置在NotionNext

将您的twikoo后台地址配置在NotionNext的后台，并redeploy即可。

![Untitled](/legacy/1699a663f2cd5e46.png)


## 🎉🎉🎉🎉🎉

到此完成~ 点击右下角的小齿轮即可配置您的管理员密码、并进行更多的功能设置。赶快体验吧~

![Untitled](/legacy/6ec6479b0d49c155.png)


## Twikoo文档

可以访问官方文档获取安装部署帮助，并且查看Twikoo的更多特性。

[Twikoo](https://vuepress-theme-hope.github.io/v2/comment/zh/guide/twikoo.html)

一个简洁、安全、免费的静态网站评论系统，基于 腾讯云开发open in new window 。 部署共有四种方式。 部署方式 描述 一键部署 [不建议] 虽然方便，但是仅支持按量计费环境--也就是说， 一键部署的环境，当免费资源用尽后，将会产生费用。且按量计费环境无法切换为包年包月环境。免费额度数据库读操作数只有 500 次 / 天， 无法支撑 Twikoo 的运行需求 。 手动部署 [建议] 手动部署到腾讯云云开发环境，在中国大陆访问速度较快。由于基础版 1 已从 0 元涨价至 6.9 元 / 月，需要付费购买环境才能部署。 命令行部署 [不建议] 仅针对有 Node.js 经验的开发者。 Vercel 部署 [建议] 适用于想要免费部署的用户，在中国大陆访问速度较慢。 点击以下按钮将 Twikoo 一键部署到云开发 如果你打算部署到一个现有的云开发环境，请直接从第 3 步开始。 提示 推荐创建上海环境。如选择广州环境，需要在 twikoo.init()


## 结束

NotionNext还支持其它多种评论插件，可访问以下文章获得帮助：

[NotionNext如何添加评论插件 | TANGLY's BLOG](/user-guide/comments/overview)

NotionNext添加Cusdis/Giscus/Gitalk/Utterance的步骤教程

[NotionNext配置评论插件-Valine/Waline | TANGLY's BLOG](/user-guide/comments/valine)

Valine和Waline都是 基于LeanCloud 的 快速、简洁的评论系统，理论上支持但不限于静态博客。 Waline 是从 Valine 衍生的带后端评论系统，可以看作是Valine的升级版，具备更多Valine不支持的功能，两者的数据结构是可以兼容的，你甚至可以同时安装Valine和Waline，两者的评论互通。 两个插件均要借助LeanCloud提供的云函数，云数据存储等功能，对于普通开发者来说免费版已经足够使用。 1.请先登录或注册 LeanCloud, 进入控制台后点击左下角创建应用： 2.进入刚刚创建的应用，选择左下角的设置&gt;应用Key，查看你的APP ID和APP Key。 获取上述的 appId、 appKey等参数后，就可以直接在NotionNext（版本≥3.3.9）中激活valine了， 如果不想使用Valine可以直接跳到文章下一节《Waline部署》部分。 在NotionNext的Vercel环境变量中配置以下内容： NEXT_PUBLIC_VALINE_SERVER_URLS NEXT_PUBLIC_VALINE_PLACEHOLDER 环境变量配置示例： NEXT_PUBLIC_VALINE_SERVER_URLS 说明 此参数选填，在应用内部会尝试自动获取，如果发现获取失败，请手动提供配置，配置方法： 在LeanCloud刚创建的应用中，选择左下角的 设置&gt; 应用Key，找到 Request 域名 第一行： 注意，需要手动在域名前加上 https:// 否则会无法访问valine评论。 安全域名（可选） 点击展开 leanCloud支持设置自己的 安全域名 ，设置后，仅列表中配置的域名才可以访问你的服务。例如我只在博客中用到valine服务，那么我的安全域名只需要配置为 /user-guide/intro。 部署valine后台（可选）点击展开 valine没有自带后台，可以借助 Valine-Admin 几分钟就可以部署一个管理后台，支持行评论的查看、删除，以及邮件通知，垃圾评论过滤等功能。部署方式不在此文赘述，可以请参阅 官方文档中的"云引擎一键部署 "部分.


### FAQ

twikoo曾经支持在博客列表直接显示文章评论数，但是比较消耗性能，我就关闭了，目前暂不支持此功能.

```SQL
COMMENT_TWIKOO_COUNT_ENABLE:
    process.env.NEXT_PUBLIC_COMMENT_TWIKOO_COUNT_ENABLE || false, // 博客列表是否显示评论数
```

## 原文链接

https://docs.tangly1024.com/article/notionnext-twikoo
