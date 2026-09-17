# 搜索引擎收录
> 迁移自：[搜索引擎收录](https://docs.tangly1024.com/article/notion-next-search-engine-index)
> 发布日期：2024-3-18
> 最后编辑：2024-5-9
> 原栏目：📊 网站统计
> 标签：NotionNext、站点统计
> 摘要：notionnext的网站百度收录，html验证，的meta放在哪里

网站创建好后，搜索引擎会自动爬取您的站点信息，便于他人搜索到您的站点内容。

而我们可以通过主动提交的方式，加快这一进程。以下以Baidu和GoogleSearch为例

主要分为三步骤。绑定站点，提交站点地图，提交想要被收录的url。


## Baidu站点验证

如果需要让百度快速收录你的网站，可以在[百度站长工具](http://zhanzhang.baidu.com/site/index)中，完成对网站的验证。百度网站的验证方法有三种，这里介绍最简单的一种方法，HTML 标签验证。进入站长工具，输入需要验证的网站（如是自定义域名，请使用 https 链接，如 https://www.domain.com），并选择 HTML 标签验证：

![html标签.png](/legacy/ac3a40288d01c471.png)

复制该标签代码中的**秘钥**，即红色加粗部分，如下示例：

```Bash
&lt;script&gt;

&lt;meta name="baidu-site-verification" content="**NQ53KRpuNy**" /&gt;

&lt;/script&gt;
```


### 配置到NotionNext

<details>
<summary>方法一：使用NotionConfig （简单、推荐）</summary>

打开Notion模板配置中心，添加一条配置  `SEO_BAIDU_SITE_VERIFICATION` , 值为上一步获取的秘钥即可
![Untitled](/legacy/0e822ee269d82815.png)

</details>

<details>
<summary>方法一：使用环境变量</summary>

添加环境变量： `**NEXT_PUBLIC_SEO_BAIDU_SITE_VERIFICATION**` 值为上述的秘钥即可。
![Untitled](/legacy/8e96f9be8dac2650.png)

</details>


## Google绑定站点

在google后台提交您的站点，并且验证您是站长。

1. 注册登录 [https://search.google.com/search-console](https://search.google.com/search-console)

1. 点击左上角添加资源
![Untitled](/legacy/3b1153817c650a91.png)

1. 添加域名
![Untitled](/legacy/c98d6b3ea3ad78b0.png)

1. 根据要求在您的域名服务商添加一条TXT的解析
![Untitled](/legacy/a3f5d2363ca73605.png)
我用CF解析域名，示例如下：
![Untitled](/legacy/bc3bee9fbd9788d7.png)

1. 解析后回到Google控制台并点击右下角 验证按钮。
![Untitled](/legacy/100b01f8acdafafd.png)


## 提交站点地图

NotionNext搭建的网站自带一个站点地图 地址是您的 域名后加 /sitemap.xml

例如域名是  https://blog.tangly1024.com, 则站点地图的地址 https://blog.tangly1024.com/sitemap.xml

![Untitled](/legacy/2ba42bb2c6d133ff.png)


## 提交网页url

提交可以加速被收录，在顶部搜索框直接输入完整的网址页面并按下回车键，例如about页面 /user-guide/intro ，

![Untitled](/legacy/dc9fde47fa05b6e7.png)

Google 会提示 未收录Google，此时我们点击请求编入索引即可

![Untitled](/legacy/073193eaff988ae3.png)

后续按照Google的提示操作即可。

![Untitled](/legacy/097715e474eddbad.png)


## 最后

只要搜索词包含您站点的内容，即可搜索到您的网站，但如果站点权重低，您的站点排名会很靠后，可能在搜索结果的后面几页才能看到。

::: tip 提示
如何让自己的站点在同样竞争力的关键词下获得更优先的排名呢？
:::

这里涉及到SEO的知识，您可以参阅以下文章了解更多：

[SEO怎么做，谷歌SEO优化教程，快速增加你的站点访问量 | Tangly的学习笔记](https://blog.tangly1024.com/article/seo)

在这个以流量为王的时代，无数的流量媒体平台如谷歌、YouTube、Facebook、Bing、抖音、小红书和知乎等，为每个人提供了实现网络事业、走向财富自由的机会。


### 扩展阅读

NotionNext如何在&lt;head&gt;标签中注入元素呢？由于很多第三方的脚本插件都需要在网页的&lt;head&gt;中插入内容，所以如何快速在NotionNext中修改&lt;head&gt;成了一个问题。

在/components/GlobalHead.js 中包含了整个页面所有&lt;head&gt;中的内容，您可以在这里直接插入一些脚本代码。例如百度和google的网站验证代码已经预先设置了，所以只要简单地配置环境变量就可实现：相关代码：

```JavaScript
{siteConfig('SEO_GOOGLE_SITE_VERIFICATION') && (
  &lt;meta
    name='google-site-verification'
    content={siteConfig('SEO_GOOGLE_SITE_VERIFICATION')}
  /&gt;
)}
{siteConfig('SEO_BAIDU_SITE_VERIFICATION') && (
  &lt;meta
    name='baidu-site-verification'
    content={siteConfig('SEO_BAIDU_SITE_VERIFICATION')}
  /&gt;
)}
```

## 原文链接

https://docs.tangly1024.com/article/notion-next-search-engine-index
