# Gitbook主题
> 迁移自：[Gitbook主题](https://docs.tangly1024.com/article/notionnext-gitbook)
> 发布日期：2023-6-27
> 最后编辑：2024-9-12
> 原栏目：⭐ 主题参数


## 主题预览

![GitBook 主题预览](/images/themes-preview/gitbook.webp)

## Gitbook主题说明

::: tip 提示
V4.4.4 2024-04-25更新
左侧导航栏支持自动折叠：文章导航，展开一个文件夹时，其它文件夹自动折叠；从而确保一次只展开一个，便于阅读。
:::

可参考我的文档:

![Untitled](/legacy/af82382495ca03d2.png)


### 三处注意

1. 使用Category（分类）来控制左侧的一级标题

1. 需要创建一个 `slug`=`about `的关于页面，作为整篇文档的首页。

1. 排序：站点开启了自动排序功能，优先将分类名相同的内容聚在一起，没有分类的文章则会被置顶，如果需要调整排序，则关闭GITBOOK_AUTO_SORT，手动拖拽文章排序，并将同分类的文章靠在一起即可。

![Untitled](/legacy/d539a228faaed6f0.png)


### gitbook支持的相关配置

### GitBook 主题调色

GitBook 支持通过语义色变量调整主色：

```js
GITBOOK_COLOR_PRIMARY: '#16a34a'
```

主题工具中的调色板会展示当前值，并可直接复制配置项到 Notion Config。

```JavaScript
const CONFIG = {
  GITBOOK_COLOR_PRIMARY: '#16a34a',

  GITBOOK_INDEX_PAGE: 'about', // 文档首页显示的文章，请确此路径包含在您的notion数据库中

  GITBOOK_AUTO_SORT: process.env.NEXT_PUBLIC_GITBOOK_AUTO_SORT || true, // 是否自动按分类名 归组排序文章；自动归组可能会打乱您Notion中的文章顺序

  GITBOOK_LATEST_POST_RED_BADGE:
    process.env.NEXT_PUBLIC_GITBOOK_LATEST_POST_RED_BADGE || true, // 是否给最新文章显示红点

  // 菜单
  GITBOOK_MENU_CATEGORY: true, // 显示分类
  GITBOOK_BOOK_MENU_TAG: true, // 显示标签
  GITBOOK_MENU_ARCHIVE: true, // 显示归档
  GITBOOK_MENU_SEARCH: true, // 显示搜索

  // 导航文章自动排他折叠
  GITBOOK_EXCLUSIVE_COLLAPSE: true, // 一次只展开一个分类，其它文件夹自动关闭。

  // Widget
  GITBOOK_WIDGET_REVOLVER_MAPS:
    process.env.NEXT_PUBLIC_WIDGET_REVOLVER_MAPS || 'false', // 地图插件
  GITBOOK_WIDGET_TO_TOP: true // 跳回顶部
}
export default CONFIG
```

## 原文链接

https://docs.tangly1024.com/article/notionnext-gitbook
