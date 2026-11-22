# 图标库-FontAwesome
> 迁移自：[图标库-FontAwesome](https://docs.tangly1024.com/article/notion-next-font-awesome)
> 发布日期：2023-8-2
> 最后编辑：2025-4-12
> 原栏目：🛠 站点配置

## 前言

您可以看到notion数据库中有一个icon字段，这是用来制定菜单的图标

![Untitled](/legacy/fee3f998d2b3988c.png)

但是 这个神秘代码是什么意思？


### FontAwesome 图标字体库

NotionNext默认使用fontawesome作为图标库，这是一个在线的图标字体库提供了大量的免费图标。

::: tip 提示
在4.8.4之后的新版本中支持了IconFont图标，支撑更多的图标自定义，但是用会较为复杂，文档参考:《 ‣ 》
:::

![Untitled](/legacy/c254d63860b32a46.png)

点击下方链接预览更多图标

[Free Icons | Font Awesome](https://fontawesome.com/search?o=r&m=free)

Search all of Font Awesome's free and Open Source icons. Then use them wherever and however you want.


## 如何使用

在Fontawesome的图标列表中，找到你喜欢的图标，打开查看详情

![Untitled](/legacy/96789548cc7e1e62.png)

下方的代码框中就是你要的神秘代码了

例如 `fa-solid fa-user` 这串代码粘贴到您的notion中的icon字段，即可显示出这个用户的图标。


## 注意

1. 图标名称由两部分构成，由空格隔开，必须完整复制才能使用
例如 `fa-solid fa-user` 这个图标
还有一个无填充的用户图标如下
![Untitled](/legacy/c6fe35169dba7d24.png)

1. 图表类型可以缩写
例如我在notion库中配置的默认用户图标是 `fas fa-user` ，其本质上就是 `fa-solid fa-user` 这个图标，只不过图标类型被缩写了。
![Untitled](/legacy/90718f94d3c89601.png)
![Untitled](/legacy/d6953a3729d073ea.png)

## 原文链接

https://docs.tangly1024.com/article/notion-next-font-awesome
