# 批量配置 INLINE_CONFIG
> 迁移自：[批量配置 INLINE_CONFIG](https://docs.tangly1024.com/article/notion-next-inline-config)
> 发布日期：2024-4-12
> 最后编辑：2024-12-28
> 原栏目：🛠 站点配置

## 前言

在V4.1.0-V4.4.2的版本中，支持用户在Notion_Config中按照`配置名-变量值`的格式在数据库中配置。

![Untitled](/legacy/330f140db5186c4f.png)

当配置少的时候，这样是够用的，但若面临几十个甚至上百个配置的时候，这种方案略显乏力。

因此在V4.4.3中推出了`INLINE_CONFIG` 。即用JSON文本导入的行内配置。


### 使用场景

需要大量导入配置，例如starter主题的首页文字信息，在自定义您的Starter主页文字内容时，需要配置的内容非常多。

一个个在NOTION_CONFIG中配置很慢，而现在可以把/themes/starter/config.js中的对象复制出来转成json文本，然后配置到`INLINE_CONFIG` 即可。


### 使用方式

在Notion_CONFIG中添加一项key为`INLINE_CONFIG` 的配置，值为 JSON文本 :

```JSON
{
  "KEY":"VAL",
  "KEY2":"VAL2"
}
```

<details>
<summary>~~废弃配置方法~~</summary>

js键值对注入配置非常不安全，因此废弃
或者JS对象的键值对 `{KEY:'VAL'}` ，（两种格式只能选一，不能混合存在）
```JavaScript
{
  KEY:'VAL',
  KEY2:'VAL2'
}
```

</details>


### 适用场景

需要大量导入配置，例如starter主题的全站翻译，因为starter主题的文字配置很多，逐一在NOTION_CONFIG中配置很慢，所以我干脆将`/themes/starter/config.js`中的对象复制出来用AI批量翻译即可。具体配置效果，可以参考我的NotionNext英文官网的`INLINE_CONFIG`：

[INLINE_CONFIG | Notion](https://www.notion.so/tanghh/INLINE_CONFIG-ec90bdbe977646388e9329d24f6600cf?pvs=4)

Built with Notion, the all-in-one connected workspace with publishing capabilities.


### 示例Config内容

我通常是本地创建一个`config.json`文件，把所有配置一次性都在里面填好，然后粘贴到到INLINE_CONFIG即可，参考文件：

config.json

## 原文链接

https://docs.tangly1024.com/article/notion-next-inline-config
