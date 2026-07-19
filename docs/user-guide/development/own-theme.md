# NotionNext自建主题
> 迁移自：[NotionNext自建主题](https://docs.tangly1024.com/article/your-own-theme)
> 发布日期：2023-7-6
> 最后编辑：2024-9-12
> 原栏目：⌨ 开发教程
> 摘要：简单几步骤即可创建属于自己的主题

::: tip 提示
本篇主要介绍在NotionNext中如何 通过复制文件夹简单地创建一个新主题，并且介绍每个主题下必须包含的4种文件作用。
:::

在新上线的NotionNext4.0中，整体代码结构做了优化梳理，极大简化了用户自建主题的流程，我强烈推荐每个使用者创建自己的个性主题，并为其起一个自己的名字。


## 主题管理

NotionNext会**自动扫描themes目录**下的所有文件夹。例如themes目录下有一个example文件夹，则您可以在blog.config.js 或环境变量中直接切换当前主题theme为文件夹的名字即可。

![Untitled](/legacy/9248a3565e6b9f40.png)


### 添加删除主题

如需删除主题，只需将某个主题目录整个删除即可，例如删除整个example文件夹，而不影响网站使用。（强迫症福音）

如需添加主题，可以将别人做好的主题文件夹直接放在themes目录下，或者参考已有的文件夹格式创建自己的主题文件夹。


### 如何创建主题

::: tip 提示
最好的学习方式，就是模仿和复制，然后在您熟练上手了一些技巧后，再开始借助技术手册，尝试二次创作。NotionNext4.0，重新调整了目录结构，让您只需简单复制一个文件夹并重命名，即可开始属于您自己的主题。
:::

::: tip 提示
一开始不推荐自己新建文件夹，而是复制当前已有的主题框架、改名和调整。
:::

建议选一个您比较喜欢的主题，复制这个主题的整个文件夹，例如复制一个example文件夹，并重命名为您的主题名，例如 adam。

要切换当前主题，您直接修改配置中的theme为adam即可生效。

示例：我复制了一个example主题，并重命名为adam，此时我的主题切换按钮中就多了一个adam主题可以选中。

![Untitled](/legacy/07d8fd0a3557a567.png)
![Untitled](/legacy/bb5821a11534e838.png)


## 主题目录说明

每个主题文件夹应有四个部分构成：


### 1. components

文件夹用于存放主题中用到的组件。例如卡片、选择框、导航栏、按钮，等等基础组件。这样可以避免重复开发。

每个主题应该有属于自己的一套组件，不要直接引用其它主题的组件，例如您喜欢fukasawa的博客卡牌组件，可以直接拷贝到您的新主题下使用。

![Untitled](/legacy/f6d8e15b2f3ca245.png)
![Untitled](/legacy/e0bea6eac82e547e.png)


### 2. config.js

主题中常用的一些开关，参数，颜色等等配置都可以提炼成为配置文件放在此处，便于统一维护修改。例如fukasawa主题的config.js中可以配置是否开关侧边栏。我建议一些可供用户个性化的配置都集中在此。

![Untitled](/legacy/1cbabe9a9241bd30.png)


### 3. index.js 布局

主题的入口文件、布局文件，决定用什么方式来将各个小组件组合排列成一个页面。

前端开发的两个基本核心，一是布局，二是组件。

- 布局：决定了每个元素出现在哪里，它占多大空间。

- 组件：决定了每个元素的颜色、边框、阴影、字体、图片背景等等。

作为这个主题的入口文件，NotionNext会寻找这个主题目录下的index.js文件，从而读取布局。以example主题文件为例，example/index.js 的文件底部输出了以下布局：

```
export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
```

<details>
<summary>关于**布局的详细说明**，可点此展开阅读：</summary>

输出这些对象的作用如下参照
即使是非必选的组件也要放回一个空页面元素，或直接返回基础的空白布局。例如
```Python
const LayoutSearch = ()⇒ &lt;&gt;&lt;/&gt;

const LayoutArchive = ()⇒ &lt;LayoutBase&gt;空白页面&lt;/LayoutBase&gt;
```
::: tip 提示
您可以通过阅读任意主题的index.js文件。来了解其工作模式。例如/themes/fukasawa/index.js 中就包含了此主题所有的布局。
另外，路由对应展示的布局，是由blog.config.js 这个文件中配置，您可以自行添加路由，并在主题中输出路由对应的布局名称。
```JavaScript
// 路径和组件映射，不同路径分别展示主题的什么组件
  LAYOUT_MAPPINGS: {
    '-1': 'LayoutBase',
    '/': 'LayoutIndex',
    '/archive': 'LayoutArchive',
    '/page/[page]': 'LayoutPostList',
    '/category/[category]': 'LayoutPostList',
    '/category/[category]/page/[page]': 'LayoutPostList',
    '/tag/[tag]': 'LayoutPostList',
    '/tag/[tag]/page/[page]': 'LayoutPostList',
    '/search': 'LayoutSearch',
    '/search/[keyword]': 'LayoutSearch',
    '/search/[keyword]/page/[page]': 'LayoutSearch',
    '/404': 'Layout404',
    '/tag': 'LayoutTagIndex',
    '/category': 'LayoutCategoryIndex',
    '/[prefix]': 'LayoutSlug',
    '/[prefix]/[slug]': 'LayoutSlug',
    '/[prefix]/[slug]/[...suffix]': 'LayoutSlug',
    '/signin': 'LayoutSignIn',
    '/signup': 'LayoutSignUp'
  },
```
:::

</details>


### 4. style.js 样式

这里可以直接写css，只奏效于当前主题。

![Untitled](/legacy/ba8050fe4a709919.png)


## 关于前端知识

前端技术庞大且复杂，而想渲染出好看的主题样式，不追求动画细节或性能的话，只要最基础的布局和组件也就足够。

另外，这个项目和普通原生的Html项目有些不同，主要有三个内容我需要展开。

1. React-JSX：一个适用于开发超大规模前端页面的底层框架。

1. NextJS：核心框架快速路由，快速渲染就靠它了。

1. TailwindCSS：用语义化的类名，代替传统的style和.css文件，便于维护扩展。

这三个前端知识，我将在后面三篇文章中介绍。

## 原文链接

https://docs.tangly1024.com/article/your-own-theme
