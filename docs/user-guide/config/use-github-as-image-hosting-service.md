# 站点图标favicon与Github图床
> 迁移自：[站点图标favicon与Github图床](https://docs.tangly1024.com/article/use-github-as-image-hosting-service)
> 发布日期：2024-5-13
> 最后编辑：2024-9-22
> 原栏目：🛠 站点配置
> 标签：图床
> 摘要：使用Github作为图床

## 什么是Favicon

Favicon.ico是网站的图标文件，通常用于显示在浏览器标签页上、书签列表中以及在浏览器地址栏中。

例如我在浏览器中打开的这三个标签页都有各自的Favicon

![image.png](/legacy/042f6b2b1fa40800.png)

"Favicon"是"Favorites Icon"的缩写，它允许网站在用户收藏夹和书签列表中显示自定义的小图标，以提高网站的识别度和品牌形象。

这个图标文件通常可以命名为 "favicon.ico"，并且放置在网站的根目录下。


## favicon与图床

NotionNext中如果要修改favicon.ico 图片需要用户自行上传，覆盖原先public目录下的favicon.ico。设置favicon的方法参考此教程《[浏览器站点图标配置](/user-guide/config/site-basics#41d1a74a311943f38050835b693ffeec)》

![image.png](/legacy/e739a8e6c22f4a48.png)


## 用外部图片来配置的方案

最新版本NotionNext中支持直接在Notion_Config中配置favicon的地址，只需添加一个如下配置

![配置favicon效果](/legacy/7ffd8f0856431375.png)

这样的好处是无需修改代码的情况下，一份代码支持部署多个站点，且每个的图标都不一样。

不过这种方案前提是你有一个自己的图床，如果没有的话，可以参考下文，我享一种：利用github作为图床，将favicon上传到图床，并配置在NotionNext站点的用法。


## 什么是图床

图床是指专门用于存储和托管图片文件的网络服务。

通常，用户可以将图片上传到图床服务器上，并获得一个链接，用于在网页、论坛或社交媒体等平台上分享这些图片。图床服务可以帮助用户节省网页空间和带宽，同时方便图片的管理和分享。

您上传到笔记的图片会存储在Notion的文件服务器中，这时候相当于用Notion作为您的图床。例如以下就是一个notion服务器的图片链接。

> [https://www.notion.so/images/page-cover/gradients_11.jpg](https://www.notion.so/images/page-cover/gradients_11.jpg)


### Github当做图床

访问以下链接创建一个新的代码仓库

[https://github.com/new](https://github.com/new)

Repository name可以随意填写，注意要选择为Public类型

![Untitled](/legacy/76a07a81076ffea2.png)


### 上传文件

首次创建好项目后会进入一个引导页，在这里可以点击 uploading an existing file 进行上传文件

![Untitled](/legacy/3a732ecbb05321ac.png)

这里我上传了一张gif动图，后续你可以随时回到项目主页，通过右上角的 Add file → Upload files 进行上传文件

![Untitled](/legacy/03d32f01f413224a.png)


### 获取图片地址

上传成功后在仓库中可以找到文件列表，点击打开此文件地址

![Untitled](/legacy/13ef8446b1f64a14.png)

跳转后的页面地址栏，就是此文件的url

![Untitled](/legacy/4dcd7d92478b8d12.png)

需要注意，这个文件的url默认打开是github的项目页面，要直接访问源文件需要以下处理：

1. 在地址栏中的 url背后 拼接一个 ?raw=true ，并按下回车键访问此新地址。
![Untitled](/legacy/26839a373e29afa9.png)

1. 观察并获取地址栏跳转后的真实地址
浏览器会自动从github.com/xxx/xxx.gif 跳转到 `https://raw.githubusercontent.com/xxx/xxx.gif`，
后面这个url就是图片文件的真实地址了，复制这个地址配置即可。
![Untitled](/legacy/2127eedc7f7480c1.png)


## 最后

以上我演示的是一个 gif 文件，实际上你要用来配置的favicon文件名后缀应当以 `.ico` 结尾，如何生成ico文件，可以参考这篇文章：《[浏览器站点图标配置](/user-guide/config/site-basics#41d1a74a311943f38050835b693ffeec)-如何制作您的icon》

## 原文链接

https://docs.tangly1024.com/article/use-github-as-image-hosting-service
