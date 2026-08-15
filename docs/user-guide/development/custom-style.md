# NotionNext用配置调整样式
> 迁移自：[NotionNext用配置调整样式](https://docs.tangly1024.com/article/custom-your-style)
> 发布日期：2024-3-2
> 最后编辑：2024-9-29
> 原栏目：⌨ 开发教程
> 标签：NotionNext
> 摘要：不会react、不会 nextjs、不会webpack、不会TailWindCSS如何调整样式

如果没有技术开发基础，如何自定义样式，调整页面的背景色、字号、框架？本文分享用纯css方案自定义站点，此方案对纯小白会友好一些。


## 前言

NotionNext在[4.2版本](/user-guide/changelog/v4-history)后支持直接在Notion中编辑CSS和JS脚本，从而实时修改网页样式，这种方式调整样式对源代码无是无侵入的。换言之，您无需打开Github代码，只要在Notion笔记中编写几个指令即可调整网页上的效果。


### 效果

我在Notion中添加了一个配置如下

![Untitled](/legacy/5a4d154e8b204e9f.png)

我的网页刷新后，立刻出现如下效果：

![Untitled](/legacy/ac376f31ea9bb7d5.png)


## 步骤介绍

总的来说，只要两步骤完成样式调整：

1.在你的网站上定位出需要改动的元素源码，并获得此元素的`selector`

::: tip 提示
selector指的是选择器，它是一段类似地理坐标的脚本，告诉CSS要将样式运用在哪个元素。
例如：亚洲→中国→广东→深圳→福田区 这是一个地理选择器。在网页中根据页面的标签元素： #header &gt; .clazzname &gt; div  这是一个CSS selector。
关于css选择器感兴趣的话可以通过以下文章了解：

[CSS 选择器 | 菜鸟教程](https://www.runoob.com/cssref/css-selectors.html)

CSS 选择器  CSS（层叠样式表）提供了多种选择器，用于选择要应用样式的 HTML 元素。 CSS 选择器用于选择你想要的元素的样式的模式。 下列表格中的 “CSS” 列表示在 CSS 版本的属性定义，CSS1、CSS2 和 CSS3 是层叠样式表（Cascading Style Sheets）的不同版本，每个版本引入了新的特性和功能，以改进网页样式的控制和设计。  常见的 CSS 选择器   下是一些常见的 CSS 选择器：  元..
:::

2.在您笔记的NotionConfig中编写CSS样式

::: tip 提示
NotionConfig指的是您的Notion笔记数据库中，一个类型为CONFIG、名为配置中心的页面，这个页面中的表格可以用来配置站点信息。
:::


## 操作演示

接下来我将带您将Hexo主题的首页标题字体放大，并调整成红色，其它的样式修改也是类似的。


### 一、获取要修改元素的Selector（选择器）

1. 用浏览器打开您已经部署好的网站
例如我打开了自己的网站 [/user-guide/intro](/user-guide/intro)

1. 按下键盘上的`F12`打开控制台
![Untitled](/legacy/0ef850da506cd80f.png)
::: tip 提示
控制台右上角的三个点可以设置控制台停靠的位置，您可以设置靠在不同的位置，防止遮挡元素。
:::

1. 点击控制台`左上角的选择器`，进入`选择模式`
![Untitled](/legacy/6ac012d54e9f8eeb.png)
进入选择器模式后，此按钮变成蓝色，并且您`鼠标指向的元素`都会被一个`蓝色遮罩高亮`突出，同时会有一个`悬浮框`展示当前元素的信息。
![Untitled](/legacy/85aed1e38353b676.png)

1. 在源代码中定位此元素
**单击**目标对象后，控制台中该对象的**源代码自动被蓝色选**中，这就是我们要定位的代码元素
![Untitled](/legacy/26a046b0be12a4df.png)
::: tip 提示
单击后您将退出选择器模式
:::

1. 如何获得selector？
右键点击被蓝色选中的源代码，并依次点击 `复制`→` 复制selector `即可。
![Untitled](/legacy/929e38640c0cf6f7.png)
::: tip 提示
此时你的系统剪贴板内容如下：

`#header &gt; div &gt; ``[div.font-black.text-4xl.md](http://div.font-black.text-4xl.md/)``\:text-5xl.shadow-text`
课外阅读：这行命令相当于一个地理位置坐标，它定位的是` id为header的元素 `下的`标签为div元素`下的class为`[.font-black.text-4xl.md](http://div.font-black.text-4xl.md/)``\:text-5xl.shadow-text` 的div元素。
:::


### 二、编写css样式

1. 我们的目标是把字体放大，并且颜色调成红色，该怎么写CSS呢？
![Untitled](/legacy/c3f6670fd1ab0241.png)
这里示例的元素是p，意思把网页中所有的p元素都调整成大字体和红色。可以推断出我们的CSS写法应该是：
```CSS
#header &gt; div &gt; [div.font-black.text-4xl.md](http://div.font-black.text-4xl.md/)\:text-5xl.shadow-text{
    font-size: 5rem; /* 设置字体大小稍微大一点 */
    color: red; /* 设置字体颜色为红色 */
}
```
::: warning 注意
输入css代码时，请提前将输入法切换成英文。防止中文输入法全角标点和空格导致的代码编译异常。
:::

1. 在Notion中编辑
打开CONFIG配置中心，添加一个配置GLOBAL_CSS，内容就是上面的CSS样式。
![Untitled](/legacy/e959b5afac3b9c8d.png)
::: warning 注意
注意：
配置的启用要打上钩，否则不生效。
如果要配置多个不同的样式，可以换行后继续粘贴内容

![Untitled](/legacy/9968e6ad4bf77cce.png)
  1. 刷新网页预览效果
然后根据您的需求，再一点点调试即可
![Untitled](/legacy/ef9337e391b6a0a8.png)
:::


## 最后

关于CSS调整页面样式的介绍就到这里，NotionNext本身用到了框架化的 React+ TailWindCSS等技术，通过纯css的方案能实现的功能有限。如果需要更进一步的调整，例如版面布局的调整则需要更专业的开发。

## 原文链接

https://docs.tangly1024.com/article/custom-your-style
