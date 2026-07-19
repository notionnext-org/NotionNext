# URL风格自定义
> 迁移自：[URL风格自定义](https://docs.tangly1024.com/article/notion-next-url-customize)
> 发布日期：2024-5-8
> 最后编辑：2024-9-29
> 原栏目：🛠 站点配置
> 标签：NotionNext、SEO
> 摘要：NotionNext 自定义url风格

::: tip 提示
在4.5.0之后的版本中，支持将博文url前缀配置为 `%category%` ，即文章所属分类；从而语义化URL、有利于SEO。 参考文末教程。
在4.5.2之后，支持将url中的中文分类名，映射为英文单词，参考文末教程。
:::


## URL构成

![Untitled](/legacy/299c0c8acb078258.png)


### NotionNext中的URL

目前博客列表的文章都有统一的`前缀`，默认是  `article` ； 因此访问您列表中的博客时默认打开的路径url是这样的：

![Untitled](/legacy/36bccb6c804624bc.png)

> [/user-guide/intro](/user-guide/config/url-customize)[/](/user-guide/config/url-customize)[`article`](/user-guide/config/url-customize)[/](/user-guide/config/url-customize)[notion-next-url-customize](/user-guide/config/url-customize)

在以上链接中：URL 主要可以拆分为3个部分构成，绿色部分是你的站点域名， 红色部分是url前缀，蓝色部分则是取自数据库中的slug部分。


### URL优化有利于SEO

URL最好能有明确的层级和语义，以便于搜索引擎抓取、收录、并更好地排名。

我建议设置一个有意义的url，例如我的每一篇文章的url都是手动设置的，并且可以通过url推测这篇文章的内容。


## URL前缀配置

在NotionNext的blog.config.js 中可以找到以下配置，来设置你的默认文章前缀：

```JavaScript
POST_URL_PREFIX: process.env.NEXT_PUBLIC_POST_URL_PREFIX || 'article',
```

默认填写的`article`  ，您可以任意填写为其它前缀，例如 `post`  、 `p` 等等。


### 变量配置

您可以配置以下变量，他们在生成网页后会被动态替换成对应的值

年月日取自博客文章的date字段，分类名在您的Notion数据库的category

![Untitled](/legacy/03c7f5722d5f3562.png)


### 使用示例

例如《[SEO指南](https://seo.tangly1024.com/)》 这个站点的url分格就是用的`分类`：访问文章的链接格式如下：[https://seo.tangly1024.com/一、SEO概念入门/what-is-google-seo](https://seo.tangly1024.com/%E4%B8%80%E3%80%81SEO%E6%A6%82%E5%BF%B5%E5%85%A5%E9%97%A8/what-is-google-seo)

![Untitled](/legacy/a26d1153c677587f.png)


## 分类名映射

如果分类名称是中文，希望url中分类名映射为英文，请更新到4.5.2之后的版本。

url里分类名可以映射为自己想要的英文单词，便于统一url: `xx.com/知行合一/slug` -&gt; `xx.com/learning/slug`


#### 使用方法

在NotionConfig添加类似以下配置:

如图

![Untitled](/legacy/9780bba2fb92c666.png)

可在参考模板数据库中配置

[配置中心 | Notion](https://www.notion.so/tanghh/8f4fe6b17a9e43e0bcfb6edb50f10a62?pvs=4)

配置中心使用说明

::: warning 注意
注意，这里最常出现一个错误，因为Notion会自动将用户输入的英文双引号转成中文，从而导致配置无法读取。因此建议复制我上面的配置进行调整，而非手动输入双引号
![正常的英文双引号](/legacy/e3e378816b3302cd.png)
![中文双引号的格式是非法的](/legacy/68fbc620fe5389f4.png)
与双引号相关的配置都要格外小心，在其他的配置中也会出现类似的问题。
:::


## 组合使用

以上变量可以混合使用，但是必须用`/`隔开。

例如：

POST_URL_PREFIX 配置为： `%category%/%year%/%month%/%day%`

则博客文章的url风格示例如下：`https://[domain]/分类名称/2024/12/31/文章id`

## 原文链接

https://docs.tangly1024.com/article/notion-next-url-customize
