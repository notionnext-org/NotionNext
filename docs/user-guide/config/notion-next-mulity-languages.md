# 多数据库：多语言/多板块
> 迁移自：[多数据库：多语言/多板块](https://docs.tangly1024.com/article/notion-next-mulity-languages)
> 发布日期：2024-4-12
> 最后编辑：2024-6-18
> 原栏目：🛠 站点配置

## 使用原理

一个站点域名支持绑定多个数据库，每个数据库有自己的内容和主题配置信息。

原先NOTION_PAGE_ID 只能有一个，新版本中支持一个站点配置多个数据源，借此可以实现多语言、或多板块的功能。

- 旧版NOTION_PAGE_ID
```JavaScript
xxxxxxx
```

- 新版NOTION_PAGE_ID
```JavaScript
xxxxxxx**,en:xxxxx,zh:xxxxx,blog:xxxxxx,product:xxxxx,docs:xxxxxx**
```


## 适用场景

有两种用法：

1. 需要向不同语言的用户展现完全不同内容，例如项目官网，品牌官网等。

1. 需要将一个站点切分成多个子版块，根据路径区分访问哪个版块的数据。


### 效果预览

- 根据url路径不同访问到不同的数据库；例如
[https://preview.tangly1024.com/](https://preview.tangly1024.com/)是中文站；
[https://preview.tangly1024.com/en](https://preview.tangly1024.com/en#google_vignette)是英文站 ， 两个站点的数据库是独立隔离的。
![Untitled](/legacy/33ab3cc22d1a940c.png)
![Untitled](/legacy/0287f598b771d396.png)

- 自动化多语言跳转：
::: tip 提示
最新版中默认关闭。如需开启请在NOTION_CONFIG 中添加`REDIRECT_LANG`=`true`。
访问首页时，会检测用户的默认语言进行自动跳转。
默认语言取自用户浏览器中的偏好语言(`window.navigator.language`)
例如用户的浏览器默认语言如果是英文 ， 则会跳转到 /en目录；否则就不会自动跳转，当然用户可以选择从菜单栏自行选择切换语言。
![Untitled](/legacy/a37b23756c9ba3ae.png)
:::

- 理论上可以配置无数种语言。


## 使用方法

::: warning 注意
注意：多语言功能不支持`静态导出`的部署方案：例如 yarn export，cloudflarePage、4Everland等都不支持多种语言。
:::

若要用静态导出方案，可以用多域名站点解决：例如创建多个不同的域名：`xxx.cn `,` xxx.en`, `xxx.jp` 等； 或者用二级域名 `cn.xxx.com` , `jp.xxx.com`, cn.xxx.com


### 1. 网站准备多个数据库

一种语言一个数据库。例如我准备两个演示数据库

[Notion Blog - EN | Notion](https://tanghh.notion.site/7c1d570661754c8fbc568e00a01fd70e)

NotionNext Blog

[Notion Blog | Notion](https://tanghh.notion.site/02ab3b8678004aa69e9e415905ef32a5?v=b7eb215720224ca5827bfaa5ef82cf2d)

一个NotionNext搭建的博客


### 2. 配置`NOTION_PAGE_ID`。

在`blog.config.js`中将NOTION_PAGE_ID设置成多个（用英文逗号隔开）：
示例：'`02ab3b8678004aa69e9e415905ef32a5`,`**en:7c1d570661754c8fbc568e00a01fd70e**`’

![Untitled](/legacy/0009cc51e2e13f02.png)

其中第一个`PAGE_ID`视作默认主语言，与以往旧版的NotionNext使用方式无异。

而逗号后面的ID要以`语言名`开头且ID中间用`英文冒号:`隔开。例如缩写`en:xxxx` 表示英文站点使用`xxxx`这个数据库，访问站点的` [domain.com]/en` 读取的站点数据来自`xxxx` 这个数据库。


### 3. 路径与数据库映射


### 多语言示例

按照上面的规律我们可以创建更多语言

假设我要创建支持4种语言的站点，默认语言是日文，然后支持切换中文、英文、西班牙文，该如何设置呢？

先准备好对应的四个数据库，如下:

然后将他们配置到NOTION_PAGE_ID中：

```JavaScript
NOTION_PAGE_ID = 'xxJPxx,en:xxENxx,zh:xxZHxx,es:xxESxx'
```

至此大功告成。


### **子版块用法**

这里的路径名，可以不是标准语言名，而是任意英文，这样可以用来区分子版块业务。

例如

结合[Notion_CONFIG](/user-guide/config-site#3edb6a42a64247b689ef89cceadb83dd)的功能，你可以为每个版块配置不同的主题。


### 4. 切换语言

只要让用户跳转到对应的语言路径即可，例如我的默认语言是中文，设置一个菜单让用户点击后切换到英文路径 `/en`   即可。

但是多语言的菜单处理会比较特殊，不能使用相对路径，例如  /en , /zh , /jp 这种作为菜单的slug，而是要用全路径。

例如默认中文主页是 [https://preview.tangly1024.com/](https://preview.tangly1024.com/) ， 则要切换成英文，则需要创建一个菜单，slug是 [https://preview.tangly1024.com/en](https://preview.tangly1024.com/en)。 否则会切换异常。


## 其它


#### 为什么用这种多数据库的方案实现？

考虑到网站中所有的按钮菜单、提示语和文章内容都要设置不同语言的版本，有两种方案：

1. 通过在数据库添加字段区分语言的方案，例如为一条数据打上标签`English`

1. 允许一个站点绑定多个数据库，即多数据源方案。

方案一，势必会导致单个Notion数据库模板的庞大复杂，从而难以维护。

我决定使用“**多数据源**”的方案， 即一个NotionNext网站支持绑定多个Notion数据库，根据用户的语言地区或者所选语言自动切换展示对应数据库的内容。这样的好处有：

1. 差异化运营：针对不同人群，显示的菜单数量和内容、文章内容和数量都可完全不同的，便于不同地区定制化运营。

1. 各数据库独立，使单个数据库的内容更少更易于维护，并且不会在原来的数据库中新增一个”语言”字段，对于不需要多语言的用户来说体验更加无缝。

1. 此方案理论上，允许一个站点配置无数种语言。从而使网站有了更强的扩展性，一个站点可以接入多套数据带来更多可能性。多语言的路径除了 `/en/article/test.html` 、`/zh`、` /jp` 这类语言前缀，也可以是其它丰富的格式，甚至可以借此开发出多个子板块，每个板块定制不同的主题、配置、功能等等。当然，你也可以多建几个二级域名的网站。

## 原文链接

https://docs.tangly1024.com/article/notion-next-mulity-languages
