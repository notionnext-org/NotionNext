# Movie主题
> 迁移自：[Movie主题](https://docs.tangly1024.com/article/notionnext-movie)
> 发布日期：2024-3-17
> 最后编辑：2024-9-12
> 原栏目：⭐ 主题参数


## 主题预览

![Movie 主题预览](/images/themes-preview/movie.webp)

可以搭建影视网站的主题。在线预览：[https://movie.tangly1024.com/](https://movie.tangly1024.com/) 。

对应示例数据库：

[Movie1024 | Notion](https://tanghh.notion.site/f3530f73fd3448779478d085dcad9332?v=8b70a9f9d5b04acda972e95c4177b42b&pvs=4)

NotionNext搭建的影视分享网站


### 开启方式

更新代码至最新的4.4.0；并配置主题为movie即可。

### Movie 主题调色

Movie 支持通过语义色变量调整主色和深色主色：

```js
MOVIE_COLOR_PRIMARY: '#2563eb',
MOVIE_COLOR_PRIMARY_DARK: '#ca8a04'
```

主题工具中的调色板会展示当前值，并可直接复制配置项到 Notion Config。


## Movie 主题

除了更简洁的排板，加入两个特色功能，分别是视频聚合、以及Dplayer播放器


### 视频聚合功能

::: tip 提示
movie主题，默认开启了视频聚合功能，如需关闭，请在/themes/movie/config.js中操作。
:::

什么是视频聚合功能？

如果一篇文章中有多个视频，且每个视频标注了caption，它们会被从文章的所有位置摘出来，移动至网站的顶部显示。

::: tip 提示
什么是caption？指视频的标题、说明、题注等。
如何配置caption？在嵌入元素的右上角点击Caption按钮，即可添加，caption默认显示在左下角。

![Untitled](/legacy/5d5cbc7715b2065f.png)
:::

以下图一是我给每个视频添加的caption，图二是在网页中聚合在顶部显示：

![Untitled](/legacy/1d5f42866d2dffa4.png)

## 支持的视频源
![Untitled](/legacy/3d46a9393c3bbb87.png)

本主题的视频来源，可以有以下三种方案嵌入：

1. 结合Notion使用，在Notion中上传视频进行播放。

1. 第三方视频平台的播放器，B站、Youtube等，用 Embed嵌入notion。

1. m3u8等在线视频源，借助dplayer播放器嵌入notion。


### Dplayer使用说明

Dplayer是**一款免费、专业的视频和音乐播放器**，可以支持视频链接下载。 它支持所有视频格式，支持4K/超高清视频文件，并能够高清播放。 它也是一个高清音频播放器。 DPlayer可以支持mp4、mpk、3gp等多种格式的视频播放，还可以支持在线视频链接串流、例如m3u8等，这一切都是免费的。


#### 自带一个Dplayer

NotionNext项目内置了一个视频播放器，代码在/public/dplayer.htm中。只要访问您站点 `http://[你的域名]/dplayer.htm?n=[视频地址]` 即可播放。


#### 示例

例如： 站点是 https://[movie.tangly1024.com](http://movie.tangly1024.com) ,  视频地址是 `[https://yzzy.play-cdn2.com/20220407/8233_5a57bac6/index.m3u8](https://yzzy.play-cdn2.com/20220407/8233_5a57bac6/index.m3u8)`

此时，只要将这个地址嵌入Notion即可播放 [https://movie.tangly1024.com/dplayer.htm?n=https%3A%2F%2Fyzzy.play-cdn2.com%2F20220407%2F8233_5a57bac6%2Findex.m3u8](https://movie.tangly1024.com/dplayer.htm?n=https%3A%2F%2Fyzzy.play-cdn2.com%2F20220407%2F8233_5a57bac6%2Findex.m3u8)。

![Untitled](/legacy/1981d04882f53412.png)

::: tip 提示
注意：

  1. 要先部署上线一次您的站点，才可以用`http://[你的域名]/dplayer.htm?n=[视频地址]`
  1. 请用您自己的域名，我的这个网站不一定常开。
:::

## 原文链接

https://docs.tangly1024.com/article/notionnext-movie
