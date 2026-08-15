# Giscus
> 迁移自：[Giscus](https://docs.tangly1024.com/article/notion-next-giscus)
> 发布日期：2023-6-29
> 最后编辑：2024-1-31
> 原栏目：📩 评论插件
> 标签：NotionNext、插件、Giscus

## Giscus

项目会在您的Github项目讨论区创建评论数据，便于维护管理 ,


## 完成效果 预览

支持表情包评论

![Untitled](/legacy/d592ce5c57ca0fdd.png)

您可以在Github的Discusstion讨论区随时管理评论。

![Untitled](/legacy/31b70dc94a9f6e50.png)


## 配置Giscus

分为4步骤，创建仓库、开启discussion、安转giscus插件、配置giscus插件。


### 1.在您的Github中创建一个开源项目用于存放评论
[Build software better, together](https://github.com/new)

You can't perform that action at this time. You signed in with another tab or window. You signed out in another tab or window. Reload to refresh your session. Reload to refresh your session.
![Untitled](/legacy/c9d44bda1daf226a.png)


### 2.在项目Setting中开启discussion功能
![Untitled](/legacy/c08864810d50bb52.png)
滚动到下方，找到Discussions并开启它
![Untitled](/legacy/17a26668a875bde6.png)


### 3.在Github中安装giscus应用
点此链接安装：[https://github.com/apps/giscus](https://github.com/apps/giscus)
点击右上方的Install即可，并确认 允许访问仓库数据权限：
![Untitled](/legacy/7668aff963111d57.png)
默认勾选All repositories即可。也可以只勾选用作评论的仓库，（后续还可以再回来配置）
![Untitled](/legacy/91b2ce4744917b70.png)


### 4.访问[Giscus](https://giscus.app/zh-CN)填写并获取您的`Giscus配置参数`
访问 以下giscus地址：
[giscus](https://giscus.app/zh-CN)

无需数据库。全部数据均储存在 GitHub Discussions 中。 选择 giscus 的显示语言。找不到你的语言？ 贡献 一个吧。 选择 giscus 连接到的仓库。请确保： 选择页面与嵌入的 discussion 之间的映射关系。 选择新 discussions 所在的分类。 推荐使用 公告（announcements） 类型的分类，以确保新 discussion 只能由仓库维护者和 giscus 创建。 Discussion 分类 选择是否启用某些特性。 Discussion 的元数据将定期被发送到父页面（被嵌入的页面）。作为演示，尝试启用此选项并在此页面打开浏览器控制台。查看 文档 获取更多细节。 选择适合你网站的主题。找不到合适的？ 贡献 一个新主题吧。 在你想让评论出现的位置添加以下 标签。但如果已经存在带有 giscus 类的元素，则评论会被放在那里。 您尚未配置 仓库和/或 分类 。 在您填写这些字段之前，不会显示这些字段的值。 你可以在嵌入的页面中使用 .giscus 和 .giscus-frame 选择器来自定义容器布局。
主要配置输入您的仓库名，并选择`Discussion`分类为 `Announcements` .
![Untitled](/legacy/9ac20e28e4fa8940.png)
填写完成在页面下方可以 看到配置最重要的是 `data-repo,data-repo-id`,`data-category-id` 这三项。
![Untitled](/legacy/5f462484859abb12.png)


## 配置NotionNext

添加giscus环境变量即可


### 1. 在Vercel后台将上面获取的`Giscus配置参数`添加到环境变量。

giscus的三项配置参数： `data-repo,data-repo-id`,`data-category-id` 添加到Vercel后台环境变量的名字关系：

添加效果如下

![Untitled](/legacy/98ce1184e9aa1d78.png)


### 2. 添加完环境变量记得`Redploy`项目。

![Untitled](/legacy/25b939ea36291c10.png)

## 原文链接

https://docs.tangly1024.com/article/notion-next-giscus
