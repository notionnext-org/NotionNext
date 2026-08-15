# 字体字号
> 迁移自：[字体字号](https://docs.tangly1024.com/article/notion-next-web-font)
> 发布日期：2023-7-30
> 最后编辑：2024-6-17
> 原栏目：🛠 站点配置
> 摘要：介绍网站字体设置

> 原文此处为 GitHub 用户附件图片，迁移时源链接已过期，暂以文字说明保留上下文。

::: tip 提示
在4.4.3及以前的版本中，字体只能通过修改blog.config.js修改，在4.4.4以后得新版本可以用 NOTION_CONFIG配置。
具体配置方式请参阅文档底部的，NOTION_CONFIG 修改部分
:::


## 默认字体

系统默认是无衬线字体，您可以在`blog.config.js` 中自定义字体 ，相关配置如下：

```JavaScript
// START ************网站字体*****************
// ['font-serif','font-sans'] 两种可选，分别是衬线和无衬线: 参考 https://www.jianshu.com/p/55e410bd2115
// 后面空格隔开的 font-light 是字体粗细，留空是默认粗细；参考 https://www.tailwindcss.cn/docs/font-weight
FONT_STYLE: process.env.NEXT_PUBLIC_FONT_STYLE || 'font-sans font-light',

// 字体CSS 例如 https://npm.elemecdn.com/lxgw-wenkai-webfont@1.6.0/style.css
// 如果需要引入第三方字体，可以在此添加URL
FONT_URL: [
  // 'https://npm.elemecdn.com/lxgw-wenkai-webfont@1.6.0/style.css',
  'https://fonts.googleapis.com/css?family=Bitter&display=swap',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap',
  'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300&display=swap'
],

// 无衬线字体 例如'"LXGW WenKai"' , 如果字体有包含空格，需要用 "双 引 号" 包起来。
FONT_SANS: [
  // '"LXGW WenKai"',
  '"PingFang SC"',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Hiragino Sans GB"',
  '"Microsoft YaHei"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Segoe UI"',
  '"Noto Sans SC"',
  'HarmonyOS_Regular',
  '"Helvetica Neue"',
  'Helvetica',
  '"Source Han Sans SC"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"'
],

// 衬线字体 例如'"LXGW WenKai"'
FONT_SERIF: [
  // '"LXGW WenKai"',
  'Bitter',
  '"Noto Serif SC"',
  'SimSun',
  '"Times New Roman"',
  'Times',
  'serif',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Apple Color Emoji"'
],
FONT_AWESOME: process.env.NEXT_PUBLIC_FONT_AWESOME_PATH || 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', // font-awesome 字体图标地址; 可选 /css/all.min.css ， https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/font-awesome/6.0.0/css/all.min.css

// END ************网站字体*****************
```


## 字体使用说明

先确定是`font-sans`，`font-serif`, 然后在对应的FONT_SANS 和FONT_SERIF 里面配置字体名。衬线字体serif适用于正式的官网等场景，非衬线则显得比较轻松，按需选取。

例如配置了`font-serif` ，则需要在`FONT_SERIF`里面配置对应字体名,

```Java
// 衬线字体 例如'"LXGW WenKai"'
FONT_SERIF: [
  // '"LXGW WenKai"',
  'Bitter',
  '"Noto Serif SC"',
  'SimSun',
  '"Times New Roman"',
  'Times',
  'serif',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Apple Color Emoji"'
],
```

字体读取的顺序是网页中的字符，会按照字体名的顺序依次查找，如果当前字体没有找到，则尝试找下一个。依次是`'Bitter'→ '"Noto Serif SC"'→'SimSun'→ '"Times New Roman"'，`

FONT_STYLE 还支持配置字体粗细， font-light 表示细的字体，不配置则是默认粗细，更多可以参考《[TailwindCSS font-weight](https://www.tailwindcss.cn/docs/font-weight)》


## 配置说明


### 修改示范

旧版本中使用这种改动 `blog.config.js` 的方式，新版本可以使用`NOTION_CONFIG`进行配置。按照以下配置网站将默认显示[**霞鹜文楷**](https://github.com/lxgw/LxgwWenKai)字体，标粗下划线部分是修改的内容**:**

```JavaScript
// START ************网站字体*****************

FONT_STYLE: process.env.NEXT_PUBLIC_FONT_STYLE || 'font-sans', // ['font-serif','font-sans'] 两种可选，分别是衬线和无衬线: 参考 https://www.jianshu.com/p/55e410bd2115
// 字体CSS 例如 https://npm.elemecdn.com/lxgw-wenkai-webfont@1.6.0/style.css
FONT_URL: [
  **'https://npm.elemecdn.com/lxgw-wenkai-webfont@1.6.0/style.css',**
  'https://fonts.googleapis.com/css?family=Bitter&display=swap',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300&display=swap',
  'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@300&display=swap'
],
// 无衬线字体 例如'"LXGW WenKai"'
FONT_SANS: [
  **'"LXGW WenKai"'**,
  '"PingFang SC"',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Hiragino Sans GB"',
  '"Microsoft YaHei"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Segoe UI"',
  '"Noto Sans SC"',
  'HarmonyOS_Regular',
  '"Helvetica Neue"',
  'Helvetica',
  '"Source Han Sans SC"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"'
],
// 衬线字体 例如'"LXGW WenKai"'
FONT_SERIF: [
  **'"LXGW WenKai"'**,
  'Bitter',
  '"Noto Serif SC"',
  'SimSun',
  '"Times New Roman"',
  'Times',
  'serif',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Apple Color Emoji"'
],
FONT_AWESOME: process.env.NEXT_PUBLIC_FONT_AWESOME_PATH || 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', // font-awesome 字体图标地址; 可选 /css/all.min.css ， https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/font-awesome/6.0.0/css/all.min.css

// END ************网站字体*****************
```

::: tip 提示
注意，如果字体名称中间有空格，则要用双引号包装，对比如下：
无空格的字体：’Bitter’
有空格的字体:  '"LXGW WenKai"'
:::


### NOTION_CONFIG修改字体

- 直接添加一个 [FONT_URL](https://www.notion.so/tanghh/8f4fe6b17a9e43e0bcfb6edb50f10a62?pvs=4) 配置即可覆盖，便于自行配置web字体的路径。

- 同时，如果要自定义除了 `sans` 或 `serif` 之外的字体，建议在GLOBAL_CSS 中配置 font-family 的CSS样式，例如
![1DA44854-4AB3-40D9-AA8E-A497DB539281.png](/legacy/430c853ba15465ec.png)


## 字号修改

想要调整网页的字体大小怎么做？两种方案，一是通过css手动指定某个元素的字号，二是通过调整[tailwindCSS的配置](https://www.tailwindcss.cn/docs/font-size)，整体调整不同字体的大小；

- 方法一，调整个例
在notion-config的自定义样式配置中，或者custom.css中直接指定某个元素的字体，示例：
```CSS
#bannerGroup a div {
    color: red;
    font-size: 2rem;
}
```
效果如下：
![Untitled](/legacy/dd7b7898028b260c.png)

- 文章字体
如果只想调整文章正文的字体，可以通过添加css实现 , 在你的notionconfig中修改GLOBAL_CSS即可。
默认字体是`1rem`。
```CSS
.notion {
  font-size: 1.5rem;
}
```
只会影响正文部分
![Untitled](/legacy/be9b53a86164ddcd.png)

- 方法二，项目底层（高级用法请小心尝试）
在tailwind.config.js 中添加如下配置，其中base是默认字号，其它则是项目中有用到的更大或更小字号。这种方案其实不做推荐，因为整体字号要适配主题的样式，任意调整会导致样式不协调。
  1. 在主题的`BaseLayout`中设置全局默认字体`text-base`，例如/theme/heo/index.js → &lt;LayoutBase&gt;中：
```HTML
&lt;div
  id="theme-heo"
  className={`${siteConfig('FONT_STYLE')} text-base bg-[#f7f9fe] dark:bg-[#18171d] h-full min-h-screen flex flex-col scroll-smooth`}
&gt;
...
&lt;/div&gt;
```
  1. 修改 tailwind.config.js
![Untitled](/legacy/1b6b0711a74179c1.png)
代码内容,如果把base调整为1.5rem，则整体字号会大一些：
```Bash
fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem'
    },
```

## 原文链接

https://docs.tangly1024.com/article/notion-next-web-font
