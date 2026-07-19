# AI聊天机器人-Coze
> 迁移自：[AI聊天机器人-Coze](https://docs.tangly1024.com/article/notion-next-coze)
> 发布日期：2024-9-20
> 最后编辑：2024-9-30
> 原栏目：🧷 外部扩展

## 前言

你可以直接像站点右下角的AI助手提问，它会尽可能地帮你解决问题。本文将介绍如何将Coze的AI机器人接入到NotionNext。

![右下角AI助手](/legacy/7deb8fc1a9bf85e8.png)
![提问示例](/legacy/e0486743c1ca076f.png)


### 特点：

Coze支持介入Bing、百度等搜索引擎插件，提问时会自动检索互联网并为你整理答案。

Coze支持将你的文章内容等等来源信息整理为一个知识库，便于在回答问题时检索这个知识库并给出更专业的回答。


## NotionNext如何配置Coze

在你的Notion_config中添加两项配置，分别是机器人的称呼和机器人ID即可：

![image.png](/legacy/0ca3a385d5939035.png)

参考如下：

这里的COZE_TITLE可以任意填写，他只会影响你窗口中AI机器人的标题，例如NotionNext-AI助理：

![image.png](/legacy/a5a354cb17f68c5e.png)

这里我们还需要在Coze后台创建自己的机器人，并获得一个`BOT_ID`。


## 如何创建自己的Coze机器人？

注册国内版Coze，主要使用国内的大模型，例如豆包、通义千问等等。

[扣子-AI 智能体开发平台](https://www.coze.cn/home)

扣子是新一代 AI 大模型智能体开发平台。整合了插件、长短期记忆、工作流、卡片等丰富能力，扣子能帮你低门槛、快速搭建个性化或具备商业价值的智能体，并发布到豆包、飞书等各个平台。

或使用国际版，用的是GPT\Claude\Gemini等国外大模型。

[Coze: Next-Gen AI Chatbot Developing Platform](https://www.coze.com/)

Coze is a next-generation AI application and chatbot developing platform for everyone. Regardless of your programming experience, Coze enables you to effortlessly create various chatbots and deploy them across different social platforms and messaging apps.

两者操作、配置方式几乎一致，国际版的插件稍微强一些，但对于国内使用体验可能有点门槛，例如网络问题。

下文我用国内版Coze来举例。


### 创建机器人

在个人空间，点击右上角创建一个Bot即可

![image.png](/legacy/9bb5d7abe2490889.png)

按需填写你的名称描述和头像。

![image.png](/legacy/645369f18b46e154.png)


### 机器人设置页面介绍

从上往下，分别可以设置大语言模型、插件、与知识库。（其它还有很多丰富的设置我们以后再折腾）

![image.png](/legacy/96f597edf12a1b62.png)


#### 关于模型

可以按照你的需求选择模型的参数，我这边选择默认的豆包即可。

![image.png](/legacy/a312788d48fbde6e.png)


#### 插件

点击右侧添加插件，

![image.png](/legacy/3886e29affbdd3de.png)

然后按需添加即可，可以选择添加一些网络搜索的插件。

![image.png](/legacy/297e7c463669eeff.png)

::: tip 提示
若插件太多，Bot可能会忙不过来，这里有一些比较进阶的知识，即AI工作流；
它支持用图形拖拽、低代码编程的方式，让AI根据用户意图，自动选择合适的插件和流程进行工作；关于工作流，此文不做赘述。感兴趣可以参考这篇《[FastGPT工作流](https://blog.tangly1024.com/article/build-an-enterprise-AI-knowledge-base-using-FastGPT)》进行配置，FastGPT与Coze基本操作大同小异。
![image.png](/legacy/350c05113d2bf451.png)
:::


### 知识库

在知识这一栏，点击右侧加号，可以将你的知识库绑定到这个机器人上：

![image.png](/legacy/3802ff20c672288f.png)

弹出的知识库列表中，直接点击右侧添加即可。

![image.png](/legacy/92b9722c10c3d04c.png)

我这里已经提前创建好了一个NotionNext的知识库，而你还没创建知识库，因此这里是空的。这里我们可以先关闭此弹窗，先正常发布后，回过头再完善知识库。

知识库知识库允许你投喂给AI一些专业知识，以便它们可以更精确地按照你的要求回答问题。它需要另外维护和导入，因此我与这里的Chat插件分开介绍，在后文中我会提到知识库的创建和导入。


### 调试

我们可以直接在右侧的预览和调试中进行测试，和AI进行对话。后续如果更新知识库，或者修改插件、AI参数等等都可以在这里直接调试：

![image.png](/legacy/35b530c7e9d668c9.png)


### 发布并获取Bot-ID

我们这里直接点击右上角发布：

![image.png](/legacy/085a5db81f2bdf47.png)

这里会跳出一个引导窗，让你填写开场白和预置的问题，可以按需填写并确认，或者点击跳过并直接发布，我们后面可以再回来修改。

![image.png](/legacy/d0519b5de5ee8e23.png)


### 发布选项

这里可以选择将机器人发布到那些平台，直接滚动到窗口最下方，选择勾选WebSDK，然后点击右上角发布。

![image.png](/legacy/41ca4a7b1e1f7a31.png)

::: tip 提示
这里我们还可以选择微信公众号的接入方式，这个也不复杂，不过可以等我们下次修改配置时，再回来改这里即可。
![0253152c921eca5e3d3b2ad024fac6e.jpg](/legacy/6b06ede34cb353ef.jpg)
:::


### 获取Bot_Id

发布后点击安装，即可获取你的WebSDK的机器人ID了

![image.png](/legacy/afb750a4e12e43e1.png)

复制bot_id后面的这串数字即可，（注意去掉引号）

![image.png](/legacy/5a28d795538e4d4e.png)


## 知识库

coze主页点击上方知识库标签，并点击右上角的创建知识库。

![image.png](/legacy/80879ad38410b3c8.png)

在弹出的信息框中选择，文本格式，然后导入类型可以按照你的需求选择，这里的选择只是决定你的初始数据导入方式，后面我们可以任选别的方式来更新、修改这个知识库内容。

![image.png](/legacy/1e73980cab6fc66e.png)

例如，我选择在线数据导入，然后方式选择自动采集

![image.png](/legacy/69ba85b571ad0e27.png)

然后选择`批量添加`URL，这里直接粘贴你的网站URL跟地址、或者像我这样导入站点地图的地址即可。

![image.png](/legacy/77d179d1d60d8618.png)

然后选择确认，系统将自动采集导入你的内容。

后续你还可以使用上传本地文档、导入Notion文档、自定义导入（直接输入文本知识）等方式不断完善这个知识库。

![image.png](/legacy/5e5f0b20dd7dd20a.png)


## 最后

知识库配置好，记得回到个人空间下，找到你的机器人，点击他进入机器人配置页面。

![image.png](/legacy/9f928714eafbe980.png)

在知识这一栏目，添加你刚才配置的知识库

![image.png](/legacy/e62f67cd94bb652a.png)

关联知识库后，点击右上角的发布，从而然你的最新配置生效。

![image.png](/legacy/d55f29b5efbc0854.png)

就到这里了，尝试一下和你的机器人聊天吧，只要是你知识库内相关的内容，它都能给出更精准的回复。


## 附

如果有任何疑问欢迎留言询问。

如果需要让AI直接对接到微信公众号，可以参考此文开通：

[扣子 - 文档中心](https://www.coze.cn/docs/guides/wechat_subscription)

## 原文链接

https://docs.tangly1024.com/article/notion-next-coze
