# NotionNext-升级教程
> 迁移自：[NotionNext-升级教程](https://docs.tangly1024.com/article/how-to-update-notionnext)
> 发布日期：2022-6-2
> 最后编辑：2025-1-21
> 原栏目：✨ 更新日志
> 标签：NotionNext、升级教程
> 摘要：当NotionNext发布新版后，如何更新你的项目？

::: tip 提示
4.8版本加入一些新的功能和配置，同时大量调整了配置文件，**更新时blog.config.js文件会发生大量冲突**，请小心驾驶。
推荐做法是：备份所有原先的文件（下载保留或拉另一个分支备份），或者迁移到NOTION_CONFIG等方式，会后在更新时选择放弃你的原有代码，从而确保代码一致性。版本同步一致后，再参考您的备份文件进行重新配置。
:::


## 前言

通过此文档您将学会如何将NotionNext升级至最新版本，参考此文档您可以完成整个项目的升级。

若您实在无法独立完成可以参考文末的求助方式。


### 版本号说明

请按需更新你的版本，每个版本由三位数字的版本号构成，例如某个版本号 `4.7.13`， 它的含义如下：

第一位：` 4`   大版本升级，架构调整时，此数字会增加，目前表示第4代： 通常整体重构对代码的更新影响比较大，需要谨慎备份与操作。
第二位： `7`  新功能、新特性等调整后会修改此数字，目前是第7次新增功能：添加新功能后blog.config.js或者主题的config.js文件会有些变化，可能带来冲突，因此也需要谨慎备份与更新。
第三位： `13 `  微小功能调整，修复bug的补丁，13代表打了13个补丁：


### 版本历史

本项目在长期维护更新中，不时将修复一些bug和增加新特性。新版本中对页面样式以及加载速度都做了大量的优化，因此推荐您更新到最新版。

您可以在[NotionNext的Github仓库](https://github.com/tangly1024/NotionNext)右上角点击Star，以便关注项目动态，您将第一时间收到新版本发布的消息。

![Untitled](/legacy/5c03aa929431ec11.png)

访问以下文章可以查看版本更新记录：

[NotionNext文档](/user-guide/changelog/latest)

NotionNext教程


## 关于代码备份

如果你的代码做了大量自定义的改动，我建议备份你的代码，避免日后操作时误操作删除了代码。如果你只是很小的样式微调，例如所有的样式和配置都在NotionConfig中设置，而非改动源代码，则无需关注此部分文章：

最简单的方法是下载备份有一个完整的备份

![image.png](/legacy/47a85391838b4668.png)

如果出现更新过程不小心覆盖了自己的代码，还可以通过vercel还原，vercel每次更新都会拉取一次你的代码版本，并针对此版本进行编译打包和部署，每一次部署都留有完整的代码备份。

可以在这里找到：

打开项目→点击`Deployments`

![image.png](/legacy/2f0d0076578cfd8c.png)

找到你的合适的旧版本部署记录，点击`右侧三个点`，再点击`viewsource`，下图中我任选了一个两天前的部署记录：

![image.png](/legacy/303cc71559240992.png)

这里面就是当时编译时的源代码，逐一查找即可：

![image.png](/legacy/6c7c773a470960b6.png)

当然，你可以直接点击此处的右上角，将直接跳转到这个版本在Github中的快照：

![image.png](/legacy/97a5fc78d65f8545.png)

跳转后这里显示的都是当时打包的代码备份，这里的4400400就是当时的快照版本号。

![image.png](/legacy/1ebf898cc2c0c242.png)


## 简单更新方法

当您的代码版本落后于NotionNext最新版时，项目右上角将会出现一个更新按钮，这个按钮可能会有三种情况：

1. 显示 `Fetch upstream` 按钮，点击并选择 `Fetch and merge`即可更新为最新的代码。
![https%3A%2F%2Fs3.us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F4d421dbe-0706-4d4a-98bc-5b10e2c3d12e%2FUntitled.png](/legacy/12eafe232fc36221.png)

1. 显示 `Sync fork` 按钮，点击并选择 `Update branch` 按钮，即可自动更新。
![Untitled](/legacy/03ded28f962b1c4f.png)

1. 没有上面两种情况的按钮，这种情况下大概率是因为修改了相同部分的代码导致冲突，需要手动确认才能合并，请看下文。


### 出现冲突

当我和你的代码发生冲突（`confilcts`），(例如我修改了`blog.config.js`文件，你也修改了此文件)，导致在更新时，Git需要人工确认要合并代码时需要保留的最终代码版本。

这里的弹框按钮具体内容有挺多情况，其中一种是这样，显示 `Disard xx commits` 或者 `open pull request.`

![Untitled](/legacy/230c7c9115c32481.png)

- `Discard xx commits` 的意思是放弃修改的代码，这样就可以消除你与我的代码冲突，然后就可以点击update更新。点击此选项请注意备份自己在代码中修改的配置。

- `Open Pull Request` 非专业人士请勿点击此项。它意味着你希望将你修改的功能或者修复的bug，提交到NotionNext的中央仓库，简称**[PR（贡献代码）](/user-guide/help/support-notion-next#eccae64337804d32a0a7f54ab8c946ad)****，**我会审核你的提交内容，如果审核通过将会在新版本中发布。


## 带有冲突的更新

目前可以有以下几种方式更新。

- 备份并完全覆盖
  1. 备份自己改动的配置文件 例如 blog.config.js ，以及主题 /themes/xx/config.js
  1. 然后点击放弃xx次提交, 点击 Discard 21 commits，表示放弃自己的修改，
![Untitled](/legacy/a8fadc41c814e5af.png)
  1. 然后就可以正常更新, 点击Update branch，页面上方出现一个蓝色的提示横幅，告诉我已经成功更新。
  1. 更新后，按照之前备份的配置文件，重新配置
![Untitled](/legacy/3990447d6d65e73a.png)

- 重头再来
若你并不是熟悉Git的操作，推荐做法是备份一下您的代码，诸如`blog.config.js`配置文件，然后重新`fork`一遍项目，再更新新版本中的配置项，重新配置即可。
所有文章数据都存在你的notion笔记中，此处重新部署的速度其实很快，无需太多配置。

- 找我帮忙
::: warning 注意
这个不是免费的，不然我根本忙不过来😭
由我帮你合并最新的代码，并将更新后的版本用推送的方式发到您的仓库中，收到推送后您只需要按以下步骤，点击3个按钮即可完成升级：
  1. 点击推送给你的页面链接，然后找到底部的 Merge pull request按钮；
![image.png](/legacy/58497acfd6f521e0.png)
  1. 在弹出的选择框中，选择第一项：Create a merge commit;
![image.png](/legacy/2a12b1f6f16afd37.png)
  1. 然后再次点击Confirm Merge 确认接口
![image.png](/legacy/ed51f4c121db4c87.png)
此时站点已经开始自动升级，您只需要稍等片刻，或者到vercel后台督促一下部署记录。
**⚠️**

操作方式，联系小助理告知”代码付费升级“，定价是￥**9.9/**次。
:::

- 更多手动方案，感谢网友们的分享！
[NotionNext更新冲突手动解决方案 | 凌云·LinYun](https://www.linyunlink.top/article/post-240629)

NotionNext更新冲突？网上教程还要VS code和git?通通不需要，马上解决冲突！
[047 一种更新NotionNext版本的简单方法 | Dongdong’s Blog](https://ddw2019.com/047)

这是一种简答的更新notionNext版本的方法
[手动 NotionNext 版本更新教程 | D_SUPER BLOG](https://www.dsuper.xyz/article/notionnext_update_221228)

勤劳的 tangly1024 [ Github][ Blog] 大大又更新了 NotionNext 内容。之前的更新内容不涉及 blog.config.js 文件（配置博客唯一要更改的文件），可以直接 Fetch upstream → Fetch and merge 跟进版本。但是这次涉及到 blog.config.js 文件的修改，新旧内容冲突导致 Github 懵了，需要手动更新。数日前就看到需要更新，今天才得以抽空完成这一"大工程"（实在是懒）。 (1) 浏览器 [Github 已经 Fork 过 NotionNext 项目]; (2) Github desktop 客户端 [ 安装地址]; (3) Visual Studio Code - VS Code [ 安装地址].


## 优化建议


### 尽量不改动代码

您可以借助Notion_Config，或者环境变量等方式来调整站点的配置。从而最大程度减小代码的冲突。


### 建立一个专用部署分支

您可以选择在Git仓库中，建立属于自己的分支，例如我建了一个 `deploy/tangly1024.com` 分支， 并在vercel中导入并选择使用该分支进行部署，`main`分支则用于提交更新最新的代码版本。

![Untitled](/legacy/7095faf911737b2d.png)
![Untitled](/legacy/9330a22b133f9c00.png)

这样，以后您只需在自己的分支修改代码，然后每次更新NotionNext版本只是main分支的更新，然后在自己的仓库中选择将main合并到自己建立的部署分支即可。


## 部署更新失败如何解决

::: info 问题
更新后打开网页，版本号还是旧的？
:::

请检查Vercel部署日志，查看日志方法。


### Deployment模块

打开Vercel后台的Deployment标签，这里可以查看您的所有部署记录。

![在Deployment中可以查看每次部署记录](/legacy/3435967ff5e55d9c.png)

其中，部署状态是绿色的`Ready`表示成功，标注为红色的`Error`则失败

![Untitled](/legacy/632ab88e09fc08cb.png)


### 查看错误日志

点击此次部署记录的标题，打开详情页面

![Untitled](/legacy/7b9b2e958e4d0846.png)

详情页下方，是打包编译的日志，在`Error`分组中展现了出现错误的原因，以及对应的代码行数。按照提示修正github中的代码即可重新部署。

![Untitled](/legacy/419c6a1461535d10.png)


## 寻求帮助

- 留言求助
[1.联系我们 | NotionNext文档](/user-guide/help/feedback)

开始练习写作的小白，我觉得相比写什么、怎么写、写得如何来说，更重要的是坚持写作。

- 社群讨论
[/user-guide/help/community](/user-guide/help/community)

- 向我寻求助
[1.联系我们 | NotionNext文档](/user-guide/help/feedback)

开始练习写作的小白，我觉得相比写什么、怎么写、写得如何来说，更重要的是坚持写作。

## 原文链接

https://docs.tangly1024.com/article/how-to-update-notionnext
