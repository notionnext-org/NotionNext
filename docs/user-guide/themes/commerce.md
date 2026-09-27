# Commerce主题
> 迁移自：[Commerce主题](https://docs.tangly1024.com/article/notionnext-commerce)
> 发布日期：2024-3-24
> 最后编辑：2024-9-12
> 原栏目：⭐ 主题参数


## 主题预览

![Commerce 主题预览](/images/themes-preview/commerce.webp)

可以搭建一个简易企业产品官网的 主题，在线预览：（以下是本主题的赞助商）

[shuida123.com](http://shuida123.com/)


### 开启方式

更新代码至最新的4.4.2；并配置主题为commerce即可。


## Commerce 主题

该主题暂时没有特异功能，后期预计会加入一个多张封面图轮播的功能。


### 产品中心

特色组件，首页会根据category分类，用一个可点击切换的tab组件展示您的文章。左侧显示目前的分类，右侧显示该分类下的所有post。

![Untitled](/legacy/536b21ad45cf95ad.png)


### 配置参考

在/themes/commerce/config.js 中可以看到该主题支持的配置

### Commerce 主题调色

Commerce 支持通过语义色变量调整主色和页面背景：

```js
COMMERCE_COLOR_PRIMARY: '#D2232A',
COMMERCE_COLOR_BG: '#f5f5f5'
```

主题工具中的调色板会展示当前值，并可直接复制配置项到 Notion Config。

```CSS
const CONFIG = {
  COMMERCE_COLOR_PRIMARY: '#D2232A',
  COMMERCE_COLOR_BG: '#f5f5f5',

  // 封面大图开启
  COMMERCE_HOME_BANNER_ENABLE: true,

  COMMERCE_TEXT_CENTER_TITLE: 'Product Center', //中间产品区块标题
  COMMERCE_TEXT_CENTER_DESCRIPTION:
    'The vision of NotionNext is to help you effortlessly and seamlessly build your own website, amplifying the value of your brand.', // 中间产品区块文字描述
  COMMERCE_TEXT_CENTER_CATEGORY_TITLE: 'Product Categories', //左侧产品分类标题
  COMMERCE_TEXT_FOOTER_TITLE: 'Contact US', // COMMERCE主题页脚文案标题；按Shift+Enter键可以换行
  COMMERCE_TEXT_FOOTER_MENU_1: 'Product Center', //COMMERCE主题页脚左侧菜单标题1
  COMMERCE_TEXT_FOOTER_MENU_2: 'About US', //COMMERCE主题页脚左侧菜单标题2
  COMMERCE_HOME_POSTS_COUNT: 9, //首页展示商品数
  COMMERCE_CONTACT_WHATSAPP_SHOW: true, //是否展示whatsapp联系按钮 请配置 CONTACT_WHATSAPP
  COMMERCE_CONTACT_TELEGRAM_SHOW: true //联系栏展示telegram按钮 请配置 CONTACT_TELEGRAM
}
export default CONFIG
```

文档不断完善中，有问题可以留言。

## 原文链接

https://docs.tangly1024.com/article/notionnext-commerce
