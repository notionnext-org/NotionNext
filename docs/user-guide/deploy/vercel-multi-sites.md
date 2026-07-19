# Vercel部署多个Github网站
> 迁移自：[Vercel部署多个Github网站](https://docs.tangly1024.com/article/vercel-multi-sites)
> 发布日期：2024-2-27
> 最后编辑：2024-11-18
> 原栏目：🚀 安装部署
> 标签：部署方案、NotionNext
> 摘要：Vercel可以同时部署多个网站

如果部署一个网站没能满足您的需求，您可以在vercel中重复部署多个网站。除了vercel，其他的Netlify、CloudFLare等等也可以用类似的方法部署多个。


## 部署原理

在开始部署多个网站前，需要简单了解一下vercel部署站点的原理，github上的项目、


### Vercel导入Github项目

Vercel可以部署多个项目，您可以通过将Github仓库导入Vercel，或者通过别的方式上传代码。

![Untitled](/legacy/2b89251a219edd9e.png)


### Vercel 监听github代码自动部署

如果您的项目是通过Github连接并导入，则Vercel会自动关联监听仓库中代码，一旦Github中的代码发生修改就会重新部署您的站点。


### Vercel 断开Github链接

在项目中可以通过disconnect，断开和github仓库的链接，这样就不会实时监听代码的修改，此时您在Notion中的修改的文章和配置还是会被实时读取到。

![Untitled](/legacy/2eb35e088d4789de.png)


### Vercel重新将项目与Github关联

断开链接的vercel项目，或者从未关联过的项目，可以在这里手动链接，

![Untitled](/legacy/4c0205fd883450cf.png)

链接Github后可以指定监听的分支，例如main分支。

链接后，只要随意修改一下对应分支的代码，vercel就会尝试自动拉取代码并安装部署。


### Vercel与Github的链接关系

1. Vercel项目连接Github仓库是有限制的
同一个Github仓库只能被Vercel中的最多3个项目链接。超过则不被允许。

1. Vercel 后台可以指定当前项目绑定的是Github仓库中的哪个分支
Github仓库是可以建立无数个分支的，每个分支的代码完全独立，您可以将每个分支用来规划城不同的网站。
![Untitled](/legacy/0feb925f1c5a294a.png)


## 如何部署多个NotionNext站点

了解了以上特性我们就可以尝试部署多个站点。


### Github的分支管理

您可以在Github中的NotionNext项目中，创建多个分支，几个分支就是几个网站。

点击左上角的分支名，并打开View all branches ，这里可以管理你的所有分支
![Untitled](/legacy/83ded51c244132b7.png)
点击new branch 创建新分支

![Untitled](/legacy/9c41531a60ea50d8.png)
例如，我创建了 deploy/tangly1024.com这个分支专门用来部署我的网页
![Untitled](/legacy/211d8a7073c368c1.png)
要修改这个分支代码，只要在左上角切换到此分支即可。
::: tip 提示
创建多个分支不是必须步骤，例如我部署的多个项目绑定的都是同一个分支，只是在vercel中通过不同项目的环境变量即可修改网站内容，或者直接在notion_config中修改站点信息即可。
:::


## Vercel的多项目管理

vercel面板首页点击添加新项目

![Untitled](/legacy/bb90bbd8799c20eb.png)

选择导入NotionNext

![Untitled](/legacy/41dd9c89e532fae2.png)

这里需要注意，NotionNext这个仓库最多被重复导入3次，如果要导入新的站点，请将已存在的项目断开Github链接，取消链接的方法已在上文指出。

导入项目后注意给这个项目配置Notion_Page_ID


## 最后

还有什么疑问欢迎在评论区留言。

## 原文链接

https://docs.tangly1024.com/article/vercel-multi-sites
