# 基础教程-NextJs是什么
> 迁移自：[基础教程-NextJs是什么](https://docs.tangly1024.com/article/next-js)
> 发布日期：2023-7-9
> 最后编辑：2024-9-12
> 原栏目：⌨ 开发教程

## 序

Next.js 是一个基于 React 的服务器端渲染框架，它提供了一些内置功能，帮助开发者更加容易地构建快速、可靠的应用程序。Next.js 旨在使 React 应用程序的构建过程更加简单，包括预渲染、服务端渲染、自动生成静态页面等特性。


## Next.js 主要特性


### 1. 服务端渲染

Next.js 可以将组件在服务器端进行渲染，并将渲染后的 HTML 代码返回给浏览器，从而加速页面的初始加载速度。NotionNext项目通过在服务端抓取Notion数据，并在服务端生成好页面标签返回前端。


### 2. 静态页面生成

Next.js 可以自动生成静态页面，这对于需要 SEO 的页面来说非常有用。


### 3. 文件系统路由

Next.js 会根据 pages 目录下的文件结构自动生成路由规则，从而简化了路由配置的过程。NotionNext项目在/pages 路径下预先制定了博客常用的路由。并且通过 /themes/theme.js 文件，将路由映射到了themes主题目录下。


### 4. 自动代码拆分

Next.js 会根据页面的需要自动进行代码拆分，从而提高页面的加载速度。


### 5. CSS-in-JS

Next.js 内置了 styled-jsx，可以让开发者在组件内编写 CSS 样式。

[Styling Next.js with Styled JSX](https://nextjs.org/blog/styling-next-with-styled-jsx)

Styled JSX is a CSS-in-JS library that allows you to write encapsulated and scoped CSS to style your components. This blog post will help you get started with using Styled JSX in Next.js.

```HTML
function Home() {
  return (
    &lt;div className="container"&gt;
      &lt;h1&gt;Hello Next.js&lt;/h1&gt;
      &lt;p&gt;Let's explore different ways to style Next.js apps&lt;/p&gt;
      &lt;style jsx&gt;{`
        .container {
          margin: 50px;
        }
        p {
          color: blue;
        }
      `}&lt;/style&gt;
    &lt;/div&gt;
  );
}

export default Home;
```


## 6. 客户端路由

Next.js 提供了一个内置的路由组件，可以在客户端进行路由转换。


## 其他

在 Next.js 中，_app.js 文件是一个特殊的文件，它是所有页面的父组件。可以在这个文件中定义全局的样式和组件，以及自定义错误页面和页面的加载状态。


### _app.js

这是NotionNext项目的 /pages/_app.js文件

```JavaScript
import { useEffect } from 'react'

// import 'animate.css'
import '@/styles/globals.css'
import '@/styles/nprogress.css'
import '@/styles/utility-patterns.css'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
import '@/styles/notion.css' //  重写部分样式

import { GlobalContextProvider } from '@/lib/global'

import AOS from 'aos'
import 'aos/dist/aos.css' // You can also use &lt;link&gt; for styles
import dynamic from 'next/dynamic'

// 自定义样式css和js引入
import ExternalScript from '@/components/ExternalScript'

// 各种扩展插件 动画等
const ExternalPlugins = dynamic(() =&gt; import('@/components/ExternalPlugins'))

const MyApp = ({ Component, pageProps }) =&gt; {
  useEffect(() =&gt; {
    AOS.init()
  }, [])

  return (
        &lt;GlobalContextProvider&gt;
            &lt;Component {...pageProps}/&gt;
            &lt;ExternalPlugins {...pageProps} /&gt;
            &lt;ExternalScript /&gt;
        &lt;/GlobalContextProvider&gt;
  )
}

export default MyApp
```

## 原文链接

https://docs.tangly1024.com/article/next-js
