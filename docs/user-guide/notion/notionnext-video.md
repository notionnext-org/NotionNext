# Notion嵌入B站视频
> 迁移自：[Notion嵌入B站视频](https://docs.tangly1024.com/article/notionnext-video)
> 发布日期：2024-3-4
> 最后编辑：2024-9-4
> 原栏目：✒ Notion教程
> 标签：NotionNext、Notion
> 摘要：NotionNext 嵌入B站视频

Notion默认没有优化B站的视频；但您可以这样操作：

大致三步骤，复制B站的嵌入脚本，从脚本中复制视频的url，将url作为内嵌网页嵌入Notion。

1. 视频复制分享链接中的嵌入代码
![Untitled](/legacy/2a17663de41dfdec.png)

1. 转换代码为url格式：
默认复制的内容是一个网页脚本 ：
```JavaScript
&lt;iframe src="//player.bilibili.com/player.html?aid=1700928875&bvid=BV1aK42187hF&cid=1446312848&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"&gt; &lt;/iframe&gt;
```
提取出其中src的部分：
![309659556-2832155c-cdd9-4ca5-a68f-44a1502dc1d5.png](/legacy/0e70defa0cdf71bf.png)
即： `**//player.bilibili.com/player.html?aid=1700928875&bvid=BV1aK42187hF&cid=1446312848&p=1**`

1. 用Notion的`embed`嵌入 ；
  - embed可将任何网页无缝嵌入Notion
![309660274-5d6b9cbd-0980-45b6-8be4-07d437ef6496.png](/legacy/c6017811a24f6303.png)
  - 直接输入链接，并点击 Embed link 即可：
![Untitled](/legacy/d102cb669a0c9d88.png)

::: info 说明
如果无法播放，可以在链接前面加上 https: 例如：
:::

`**https:**`//player.bilibili.com/player.html?aid=1700928875&bvid=BV1aK42187hF&cid=1446312848&p=1


## 效果

https://player.bilibili.com/player.html?aid=1700928875&bvid=BV1aK42187hF&cid=1446312848&p=1

## 原文链接

https://docs.tangly1024.com/article/notionnext-video
