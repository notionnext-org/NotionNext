# Vercel快速重新部署项目
> 迁移自：[Vercel快速重新部署项目](https://docs.tangly1024.com/article/vercel-redploy)
> 发布日期：2024-3-16
> 最后编辑：2024-11-13
> 原栏目：🚀 安装部署
> 标签：部署方案、NotionNext
> 摘要：如何快速部署vercel项目 

## 使用场景

当我们修改 NotionConfig 的配置或文章内容后，NotionNext 站点会自动同步 Notion 的数据。

然而有以下两种情况可能会需要重部项目：


### 1.更新配置

我们需要重新部署 Vercel 项目，才能使修改的环境变量生效，例如：您的站点使用 yarn export 的纯静态部署方案、以及部分不支持用NotionConfig设置的配置。

在这种情况下，要让配置生效或文章更新，就需要手动触发 Vercel 的重新部署（redeploy）。


### 2.清除缓存

由于NotionNext 站点的每个页面都有独立的缓存，当您修改站点的菜单时，旧版本的菜单可能会被缓存，导致菜单栏无法与所有页面一起更新。

为解决这个问题，也需要重新部署项目。

通常的操作步骤，是在Vercel后台找到部署记录，找到当前生效的那次部署记录（通常是最上面这条，标注了current的）。并且点击右侧按钮下的reploy选项。

上述步骤有点繁琐，本文介绍一个更便捷的方法，以提升重新部署的效率。

![Untitled](/legacy/0422886839981e3e.png)


## 通过修改代码触发

Vercel导入来自Github仓库的项目后，会自动监听代码的修改，并且触发自动部署。

利用这个特性，如果我们要让vercel重新部署，一种做法就是任意修改一下Github上的NotionNext代码，即可触发redeploy。

为了避免代码修改错误，导致编译失败，最保险稳妥的方式是修改一些无关紧要的文件，例如 README.md，在项目首页就可以直接编辑。

![Untitled](/legacy/9ac74abfb3a5590e.png)


## 通过Vercel-Hooks触发

在vercel后台的项目主页，找到Settings → Git → Deploy Hooks 。这里可以创建管理你的hooks。

hooks直译是“钩子”，在这里简单理解为vercel为项目创建一个API接口，通过访问这个url地址将触发项目重新部署。通常它在一些自动化的程序中会被用到。

![Untitled](/legacy/cdea9d8a840781b0.png)

如图，我设置了一个hook名为test，指定部署的是main分支，点击create hook后，vercel分配给了我一个api地址。

![Untitled](/legacy/d15125d43c857bf5.png)

如果后续不需要这个hook，可以点击右侧Revoke删除即可。

怎么使用？点击右侧Copy复制这个地址，然后 在地址栏直接输入，并按下回车即可：

![Untitled](/legacy/383533349dfd6ed5.png)

图中所示返回了一串json提示，这段代码意思是vercel已经成功收到请求，并且为我们创建了一个重新部署的任务，

此时我们返回后台查看，确实有一个重新部署的记录，并且是通过Deploy Hook 触发的。

![Untitled](/legacy/bf00201d9e977259.png)

## 原文链接

https://docs.tangly1024.com/article/vercel-redploy
