# SaleSmartly聊天插件
> 迁移自：[SaleSmartly聊天插件](https://docs.tangly1024.com/article/notion-next-salesmatly-pulgin)
> 发布日期：2024-5-10
> 最后编辑：2024-9-21
> 原栏目：🧷 外部扩展
> 标签：NotionNext、插件、聊天
> 摘要：NotionNext配置Salesmatly插件

由于Facebook聊天插件停运，目前可以选择用SaleSmartly插件作为对话工具


## 效果预览

网页右下角的聊天图标，点击后可以与站长进行聊天通讯。

![Untitled](/legacy/e6ae71207ec0190a.png)
![Untitled](/legacy/3f3dc123fb807287.png)

SaleSmartly的免费版上线是一千个会话，即超过一千位客户咨询后，就不再收到新的消息，需要升级套餐后才可使用。


## 安装方式

1. 登录[SaleSmartly](https://share.salesmartly.com/gsuvhl)后台获取安装代码

1. 配置在NotionNext中。

安装代码获取方式：


### 1.登录并配置SaleSmart

访问SaleSmartly主页 注册登录。

[你是否经常为了管理独立站的客户而烦恼？你是否想要提高你的销售转化率和客户满意度？你是否想要利用社交媒体的力量来扩大你的市场？  如果你的答案是肯定的，那么我强烈推荐你使用SaleSmartly，它会让你的独立站事业更加成功，让你的客户更加满意： -聚合在线聊天（livechat）、WhatsApp、Facebook Messenger、Instagram、Telegram、Line、Email、Wechat -AI机器人自动回复常见问题 -营销自动化发送个性化消息 -客服自动分配会话等  还有免费试用版，有需要的可以了解一下这款全渠道客户聊天工具](https://share.salesmartly.com/gsuvhl)

选择介入网页聊天插件

![Untitled](/legacy/4f133301f5023d2f.png)

点击新人指引教程，选择添加聊天插件到您的网站，并点击配置插件

![image.png](/legacy/65abc9b737cbeb9d.png)

在这里可以配置你的聊天插件的名称以及一些预设消息

![Untitled](/legacy/d1ea9ae3c5e2237d.png)

为了插件能正常聊天，这里需要实名认证

![Untitled](/legacy/b19bbbef9847296a.png)


### 2. 获取安装代码

然后点击复制安装代码

![Untitled](/legacy/1e4bda2f96b9c87c.png)

代码会自动复制到您的剪贴板中，格式如下

```HTML
&lt;script src="**https://assets.salesmartly.com/js/xxxxxxx.js**"&gt;&lt;/script&gt;
```

将红色的链接部分配置到Notion_CONFIG中，添加一个CUSTOM_EXTERNAL_JS配置，配置结果如下：

![image.png](/legacy/fda49860fe05b0a3.png)

直接我的这行配置到notion中，再将url改成你的即可：

::: tip 提示
这里**配置值**是需要用中括号加英文双引号拼起来[””]，它代表一串配置数组，支持多个用英文逗号隔开。例如["https://1.js","https://2.js","https://3.js"]

直接在Notion中手动输入这项配置时，Notion会自动将英文的双引号转成中文，导致软件报错，因此建议复制我这里写好的格式，再将url替换成您自己的。
:::

<details>
<summary>~~旧版配置方法（废弃）~~</summary>

将上述脚本中的链接部分（下划线加粗标红部分）复制出来在浏览器中打开，可以看到一段代码
![Untitled](/legacy/9056636faa47e4eb.png)
全选并复制这里的代码内容
![Untitled](/legacy/a66369f15d7b7260.png)
打开Notion模板中的的配置中心，将配置粘贴到 GLOBAL_JS 配置项即可。
![Untitled](/legacy/0f1fa10804a7ea5f.png)

</details>


## 附

在Salesmart后台主页，可以选择使用不同的终端用于接收回复消息，例如绑定小程序后，您可以在小程序中，接收或回复用户的消息。

![image.png](/legacy/503f27b69809f83b.png)


## 其它聊天插件选择

你可以任意查找网上的其它插件进行安装，例如参考文档中的[TIDIO插件安装](/user-guide/plugins/notion-next-tidio)或者使用[Chatway聊天插件](https://go.chatway.app/)，他们与SaleSmartly的安装方式基本一致。例如Chatway插件配置也是添加一个脚本地址即可，示例如下：

![image.png](/legacy/5d79121e1e4e2e6d.png)

## 原文链接

https://docs.tangly1024.com/article/notion-next-salesmatly-pulgin
