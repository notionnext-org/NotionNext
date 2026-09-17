# Notion数据备份
> 迁移自：[Notion数据备份](https://docs.tangly1024.com/article/notion-backup)
> 发布日期：2024-10-4
> 最后编辑：2024-10-4
> 原栏目：✒ Notion教程

## NotionNext和Notion的关系

NotionNext只是一个脚本，将您Notion笔记中的内容渲染成博客的布局，并附加一些小功能和插件。而几乎所有的站点数据都存放在您的Notion笔记中，NotionNext仅在代码中保存简单的配置。

Notion是由Notion Labs Inc开发的一款应用程序，Notion Labs Inc于2016年在美国加利福利亚州旧金山市创立。截至2021年10月，Notion估值103亿美元，在全球拥有超2000万用户，团队规模为180人左右。

Notion产品演变至今，已经发展成一个拥有众多功能的复杂产品。他为大型企业、小型创业公司与个人，都提供了标准解决方案，同时还重点面向创业公司、远程办公、教育行业与非营利组织进行了产品优化。Notion在笔记的表达能力、团队协同、创作者生态上，做出了差异化的产品体验。


## **关于Notion自动备份**

如果你是团队用户，你的你的同事在Notion里存放了大量的文档、文件和协作记录，那么定期进行手动备份是有必要的。

手动进行Notion备份**可以预防服务器无法访问**的情况，让你可以随时在本地获取最新的数据和文件，提高数据和文档的安全性。


### **Notion数据储存在哪里**

你在客户端里录入的所有数据和文档都会上传至云端，即Notion的数据中心。


### **Notion数据安全性如何**

根据[Notion官方数据安全介绍](https://www.notion.so/help/security-and-privacy)，其应用程序是由全球云计算行业大佬——亚马逊云计算服务（Amazon Web Services ，AWS）进行托管，由AWS来保证数据中心的物理安全。

![Notion应用程序由AWS托管.webp](/legacy/66eb7a8b73e1282b.webp)


### **Notion自动备份的频率**

Notion每分钟自动备份一次，不需要担心突然停电或死机导致数据丢失。


## **手动备份：Notion笔记导出**

为了进一步提高数据安全性，可以手动进行Notion备份。


### **导出文件支持哪些格式？**

你可以把Notion页面和所有已上传的文件导出为HTML、Markdown或者CSV（导出Database可选）格式。

如果你是**Business**或**Enterprise计划**的团队用户，那么你还可以将整个workspace导出为PDF格式，有利于进行商业合规性备份。


### **导出整个Workspace**

第一步：点击左侧边栏的`**Settings & Members**`

![导出整个Workspace - 第一步：点击左侧边栏的“Settings & Members”](/legacy/1ba41bc00f45696d.webp)

第二步：点击左侧边栏的`**Settings**`，向下滚动看到并点击`**Export all workspace content**`

![导出整个workspace - 第二步：点击左侧边栏的“Settings”，向下滚动看到并点击“Export all Workspace Content”](/legacy/e678174813f4c899.webp)

第三步：选择导出选项，选项包括**导出格式**、**导出内容**、**是否为子页面创建子文件夹**等。

![导出整个Workspace - 第三步：选择导出选项，然后点击蓝色Export按钮开始导出](/legacy/d277f889cb6b87bc.webp)

第四步：点击蓝色`**Export**`按钮导出，然后等待接收来自Notion的邮件，邮件中包含备份的下载链接，链接7天后过期。

::: tip 提示
**注意**
目前只有**Notion网页版**和**桌面客户端**支持导出功能。
:::


## **导入Notion备份**

有了本地文件，我们还要学习如何导入Notion备份。

步骤非常简单：

第一步：点击Notion左侧边栏的`**Settings & Members**`

![点击左侧边栏的“Settings & Members”](/legacy/f85fc461f40dd234.webp)

第二步：在设置菜单栏中找到并点击`**Import**`

第三步：在导入界面下方，点击`**Upload from your computer**`选择备份文件；或者直接将备份文件拖入该区域。

第四步：等待导入完成，Notion会直接跳转到导入后的页面。

![在设置菜单栏中找到并点击Import，点击Upload from your computer选择备份文件](/legacy/c0b24ea50996fce1.webp)


## **Notion页面误删了怎么恢复？**

- 在Notion左侧边栏，滚动至最下方，点击`**Trash**`按钮浏览已删除页面；

![在Notion左侧边栏，滚动至最下方，点击Trash按钮](/legacy/c30b7382960f1bda.webp)

- 在已删除的页面列表中，找到需要恢复的页面，然后点击右侧的**折返箭头**小图标，即可恢复该页面。

![在已删除的页面列表中，找到需要恢复的页面，然后点击右侧的折返箭头小图标，即刻恢复该页面。](/legacy/52becb08271d6d51.webp)

::: tip 提示
**小贴士**
被删除的页面只能在垃圾箱中保留**30天，超过这个期限该页面将被彻底删除**。
:::


## **如何在Notion编辑历史中恢复旧版页面**

- 在页面右上方，点击**时钟按钮**🕘，查看页面编辑历史；

![在页面右上方，点击 时钟按钮🕘，查看页面编辑历史](/legacy/db4d913914c60cac.webp)

- 在编辑历史中，找到想要恢复的版本，然后点击右侧的**时钟按钮**查看具体信息；

![在编辑历史中，找到想要恢复的版本，然后点击右侧的时钟按钮查看具体信息](/legacy/ba3cab7e9a6a3e7d.webp)

- 在弹窗中，点击蓝色的`**Restore version**`按钮，即可将页面恢复成该历史版本。

![在弹窗中，点击蓝色的Restore version按钮，即可将页面恢复成该历史版本](/legacy/ffd932c9bb0c19dd.webp)

## 原文链接

https://docs.tangly1024.com/article/notion-backup
