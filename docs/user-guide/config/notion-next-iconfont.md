# 图标库-IconFont
> 迁移自：[图标库-IconFont](https://docs.tangly1024.com/article/notion-next-iconfont)
> 发布日期：2025-4-11
> 最后编辑：2025-4-12
> 原栏目：🛠 站点配置
> 摘要：如何在notionnext中配置iconfont

::: tip 提示
如需使用IconFont图标，请先将NotionNext 升级至 ≥4.8.4
:::


## IconFont

这是阿里巴巴提供的矢量图标库。相比默认的fontawesome图标，iconfont有更多的色彩丰富的图标素材可供选择。

![image.png](/legacy/3fcbd7b8d3ceda3f.png)


### 使用方法

1. 首先在Notion_Config 中添加以下配置
截图效果如下：
![image.png](/legacy/2958771e3882e374.png)

1. 在你的菜单图表中，填写iconfont的图标id
iconfont的图标id默认都是`icon-xxx`这样的格式
![image.png](/legacy/eb725eb4f07fad22.png)
id从iconfont后台获取
![image.png](/legacy/8251b952aa0aa3d8.png)
配置后的效果如下；
![image.png](/legacy/072a20aff3ac73bf.png)

原先默认支持的fontawesome图标，我默认将所有图标都通过cdn导入，因此无需用户手动导入图标。

而iconfont的图标千千万，这里需要将对应的图标下载并上传到notionnext项目中，然后填写这个图标id才能生效。接下来的文章中，我将介绍如何下载自己喜欢的图标，并且导入项目。


## 如何导入iconfont图标？

1. 注册登录Iconfont
[iconfont-阿里巴巴矢量图标库](https://www.iconfont.cn/)

iconfont-国内功能很强大且图标内容很丰富的矢量图标库，提供矢量图标下载、在线存储、格式转换等功能。阿里巴巴体验团队倾力打造，设计和前端开发的便捷工具

1. 通过搜索或浏览推荐找到你想要的图标
![image.png](/legacy/a814afbeda4103a5.png)

1. 将喜欢的图标添加入库
点击那个**类似购物车**的图标，点击后你的右上角购物车数量就会增加1。
![image.png](/legacy/cb12373b50614727.png)

1. 全部图标添加完成后，点击右上角购物车图标
这里列出所有刚刚添加的图标，不喜欢的话也可以单击图标进行删除。如果确认图标无误，我们点击下方的添加至项目
![image.png](/legacy/6a87ce818a271e65.png)

1. 加入已有的项目
这里我事先创建了一个项目名为”测试“，直接选中，并点击确定即可。
![image.png](/legacy/ba357e834d7930f9.png)
如果没有项目，则点击右上方的加号，新建一个项目。**项目**是所有图标的合集，便于打包下载。
![点击右上角新建项目](/legacy/0559b06f03bc9543.png)
![输入新项目名并确认](/legacy/36ffd9293ee43058.png)


### 下载项目文件

在上一步中，点击确定后，页面会自动跳转的”我的项目中心“并选中当前的项目：

![image.png](/legacy/9ec3e5c02db9f25c.png)

注意切换成Symbol模式，这样你就能看到所有图标的id，例如下图中，我添加了三个图标，他们的id分别为`icon-jumao` `icon-gengduomaochong`  `icon-lanmao` 。这个我们在后面配置到notion中会使用到。

![image.png](/legacy/c15bdc3141f175f3.png)

点击右侧 ”下载至本地“按钮

![image.png](/legacy/e015a276afffc9b9.png)

下载完成后会是一个zip压缩包，解压后会是一个文件夹

![image.png](/legacy/0b860bed68aa1e31.png)

文件夹的内容就是我们要的图标素材：

![image.png](/legacy/21d2e5b08372aace.png)

需要注意，里面文件名叫 demo 和 demo_index 的这两个文件是用来本地预览的，将demo_index文件用浏览器打开可以查看下载的图标是否正确。

打开demo_index文件会显示这样一个网页供您检查内容：

![image.png](/legacy/5134723c14bc19f9.png)


### 上传素材

文件夹中，剩下的四个文件(iconfont.css，iconfont.js，iconfont.json，iconfont.ttf)，我们需要上传到项目的 /public/webfonts 目录下：

![文件上传到项目中](/legacy/7d44ffcb58207b5e.png)

上传文件的方式有两种，一是通过开发工具下载整个NotionNext工程，然后将文件放入项目，并同步代码到gihubt中，这种方法适合具有一定开发能力的用户。

另一种则是直接在github中上传文件：


### 在github中上传图标素材

1. 打开你的github中的NotionNext项目页面：
![image.png](/legacy/80b9eec3e41004a8.png)

1. 点击进入public目录
![image.png](/legacy/b2ab98250458f870.png)

1. 再点击进入webfonts目录
![image.png](/legacy/6688f3bd55852bd7.png)

1. 依次点击Add files 和 Upload files 按钮
![image.png](/legacy/8fbadb0420c33785.png)

1. 在上传页面中，将除了demo的四个文件一起拖拽至上传窗口中；
![image.png](/legacy/1cf9b7face45a63c.png)

1. 稍等几秒上传完成后，点击下方的commit changes即可
![image.png](/legacy/b8d98f71e6583611.png)

1. 最后检查
完成后你的项目/public/webfonts目录下应该会出现以下几个文件
![image.png](/legacy/7f38bb72f3a24416.png)


## 如何使用？

1. 在Notion_Config 中添加以下配置
截图效果如下：
![image.png](/legacy/05b2b46be85fa271.png)

1. 在你的菜单图表中，填写图标id
图标id默认都是`icon-xxx`这样的格式
![image.png](/legacy/3e1e3b03b3b3b741.png)
id从iconfont后台获取
![image.png](/legacy/199c4e07c27246fc.png)
配置后的效果如下；
![image.png](/legacy/7b49a4e4b3e47e64.png)

## 原文链接

https://docs.tangly1024.com/article/notion-next-iconfont
