# Typography主题
> 迁移自：[Typography主题](https://docs.tangly1024.com/article/notion-next-typography)
> 发布日期：2025-7-7
> 最后编辑：2026-4-30
> 原栏目：⭐ 主题参数


::: tip 提示
新主题，需要升级到V4.8.6 之后的版本才能使用
:::


## 致谢

感谢[Yakiisama](https://github.com/yakiisama)贡献的主题！

![image.png](/legacy/316e2bfe81cd54b1.png)


## 主题预览

![Typography 主题预览](/images/themes-preview/typography.webp)

点此预览： [https://preview.tangly1024.com/en?theme=typography](https://preview.tangly1024.com/en?theme=typography)

![image.png](/legacy/b20c15283f5bfc1e.png)


## 使用

在配置文件或环境变量中将主题修改为typography即可。

需要注意，此主题的首页标题读取的是配置文件 /themes/typography/config.js 中的内容，而非默认的读取notion数据库标题，因此需要手动修改。（支持环境变量或Notion_Config修改）。

### Typography 主题调色

Typography 支持通过语义色变量调整主色和标题色：

```js
TYPOGRAPHY_COLOR_PRIMARY: '#2e405b',
TYPOGRAPHY_COLOR_TITLE: '#276077'
```

主题工具中的调色板会展示当前值，并可直接复制配置项到 Notion Config。

```JavaScript
const CONFIG = {
  TYPOGRAPHY_COLOR_PRIMARY: '#2e405b',
  TYPOGRAPHY_COLOR_TITLE: '#276077',

  // 博客標題 雙語言
  TYPOGRAPHY_BLOG_NAME: process.env.NEXT_PUBLIC_TYPOGRAPHY_BLOG_NAME || '活字印刷',
  TYPOGRAPHY_BLOG_NAME_EN: process.env.NEXT_PUBLIC_TYPOGRAPHY_BLOG_NAME || 'Typography',

  TYPOGRAPHY_POST_AD_ENABLE: process.env.NEXT_PUBLIC_TYPOGRAPHY_POST_AD_ENABLE || false, // 文章列表是否插入广告

  TYPOGRAPHY_POST_COVER_ENABLE: process.env.NEXT_PUBLIC_TYPOGRAPHY_POST_COVER_ENABLE || false, // 是否展示博客封面

  TYPOGRAPHY_ARTICLE_RECOMMEND_POSTS: process.env.NEXT_PUBLIC_TYPOGRAPHY_ARTICLE_RECOMMEND_POSTS || true, // 文章详情底部显示推荐

  // 菜单配置
  TYPOGRAPHY_MENU_CATEGORY: true, // 显示分类
  TYPOGRAPHY_MENU_TAG: true, // 显示标签
  TYPOGRAPHY_MENU_ARCHIVE: true, // 显示归档
}
export default CONFIG
```

## 原文链接

https://docs.tangly1024.com/article/notion-next-typography
