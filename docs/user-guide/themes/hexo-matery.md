# Hexo/Matery主题
> 迁移自：[Hexo/Matery主题](https://docs.tangly1024.com/article/notion-next-greetings)
> 发布日期：2023-6-27
> 最后编辑：2024-9-12
> 原栏目：⭐ 主题参数

## 调整主题配色

以Matery主题为例，如果需要调整导航栏，按钮和标签等颜色的话，可以采取如下配置，以下CSS脚本将Mataery主题的紫色都替换为木槿色。

```CSS
/* 导航栏签颜色 */
#sticky-nav.bg-indigo-700 {
    background-color: #9c26b0;
}

/* 夜间模式导航栏签颜色 */
.dark div#sticky-nav {
 background-color: red;
}

/* 首页开始阅读按钮 */
.glassmorphism.w-40.z-40 {
    background-color: #9c26b0;
    border: none;
}

/* 标签颜色 */
a.cursor-pointer.bg-indigo-700 {
    background-color: #9c26b0;
}

/* 移动端侧边栏 */
#side-bar&gt;.bg-indigo-700 {
    background-color: #9c26b0;
}

/* 移动端侧边栏菜单 */
nav div:hover,li:hover {
    background-color: #9c26b0!important;
}

/* 悬浮菜单 */
.right-2 .bg-indigo-700 {
    background-color: #9c26b0;
}

/* 目录进度条 */
.h-4.bg-indigo-400 {
    background-color: #9c26b0;
}

/* 目录文字高亮 */
nav .text-green-500{
    color: #9c26b0;
}

/* 网站页脚 */
footer.bg-indigo-700{
    background-color: #9c26b0;
}

/* 翻页按钮 */
button.bg-indigo-700{
    background-color: #9c26b0;
}

/* 文章页隐藏发布时间 */
#article-wrapper &gt; div.wow.fadeInUp.px-10 &gt; section &gt; div.flex.flex-wrap.gap-3.mt-5.text-sm &gt; a {
  display: none;
}

/* 文章页隐藏发布时间 */
#article-wrapper &gt; div.wow.fadeInUp.px-10 &gt; section &gt; div.flex.flex-wrap.gap-3.mt-5.text-sm &gt; a {
  display: none;
}

/* 文章页隐藏更新时间 */
#article-wrapper &gt; div.wow.fadeInUp.px-10 &gt; section &gt; div.flex.flex-wrap.gap-3.mt-5.text-sm &gt; span.whitespace-nowrap {
  display: none;
}

/* 文章页隐藏阅读次数 */
#article-wrapper .busuanzi_container_page_pv {
  display: none ！important;
}

/* 文章页隐藏字数 */
#wordCountWrapper &gt; span:nth-child(1){
 display: none !important;
}

/* 文章页隐藏阅读时长 */
#wordCountWrapper &gt; span:nth-child(2){
 display: none;
}
```

![预览效果](/legacy/5ffac934bfb2f28d.png)

![预览效果](/legacy/903ca8e0cf804072.png)

直接填写在您的 NOTION_CONFIG 中的GLOBAL_CSS这一栏即可。更多配置方法可参考 ‣


## 首页欢迎语

Hexo和matery主题首页支持动态打字的效果显示欢迎语。

![Untitled](/legacy/f2cb671a33544619.png)

![Untitled](/legacy/4c70c6c5cba1fa29.png)


### 配置方式

修改blog.config.js中的 GREETING_WORDS 配置：

```JavaScript
// 3.14.1版本后，欢迎语在此配置，英文逗号隔开 ,  即可支持多个欢迎语打字效果。
GREETING_WORDS: process.env.NEXT_PUBLIC_GREETING_WORDS || 'Hi，我是一个程序员, Hi，我是一个打工人,Hi，我是一个干饭人,欢迎来到我的博客🎉',
```

示例：改成以下内容后，网站引导语会依次显示 `您好，欢迎访问我的网站` `我是张三` `我是一个设计师`

```JavaScript
// 3.14.1版本后，欢迎语在此配置，英文逗号隔开 ,  即可支持多个欢迎语打字效果。
GREETING_WORDS: process.env.NEXT_PUBLIC_GREETING_WORDS || '您好，欢迎访问我的网站,我是张三,我是一个设计师',
```

### 速度的设置

修改blog.config.js中的 GREETING_WORDS_TYPE_SPEED 和 GREETING_WORDS_BACK_SPEED 配置：

```JavaScript
  // 欢迎语打字效果类型速度
  GREETING_WORDS_TYPE_SPEED:
    process.env.NEXT_PUBLIC_GREETING_WORDS_TYPE_SPEED || 200,

  // 欢迎语打字效果回退速度
  GREETING_WORDS_BACK_SPEED:
    process.env.NEXT_PUBLIC_GREETING_WORDS_BACK_SPEED || 100,
    
```

### 注意点

1. 只能修改单引号内部的内容，不要擅自修改格式、不要添加多组单引号
错误示范：
```JavaScript
// 修改成了中括号数组 ['xx','xx','xx']
GREETING_WORDS:  ['Hi，我是一个程序员,',' Hi，我是一个打工人,','Hi，我是一个干饭人,欢迎来到我的博客🎉']

// 修改成了 多组单引号 'xx','xx','xx'
GREETING_WORDS:  process.env.NEXT_PUBLIC_GREETING_WORDS || 'Hi，我是一个程序员,',' Hi，我是一个打工人,','Hi，我是一个干饭人,欢迎来到我的博客🎉'
```

1. 如果需要打印多句话，可以用**英文逗号**作为分隔符隔开
中文逗号将被识别为普通的文字，而不是分隔符。
正确示例
```JavaScript
'语句一,语句二,语句三'
```
错误示范：` , ` → ` ``**，**`** **（注意区别中文和英文分隔符）
```JavaScript
'语句一，语句二，语句三'
```

## 原文链接

https://docs.tangly1024.com/article/notion-next-greetings
