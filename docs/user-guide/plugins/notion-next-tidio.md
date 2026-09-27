# TIDIO聊天插件
> 迁移自：[TIDIO聊天插件](https://docs.tangly1024.com/article/notion-next-tidio)
> 发布日期：2024-9-21
> 最后编辑：2024-9-21
> 原栏目：🧷 外部扩展

## 效果

网页右下角会悬挂一个聊天按钮，用户可以直接发送消息对话，你可以在你的TIDIO客户端收到消息并进行回复，和SaleSmartly的功能基本一直，可以选择安装任意一种。

![image.png](/legacy/7db4e85c04495e28.png)

SaleSmartly的免费版上限是每月50个会话，超出后需要升级套餐后才可使用。


## 安装方法

和SaleSmartly安装方式几乎一致。

1. 登录TIDIO后台
[Accelerate Your Growth With #1 AI Customer Service | Tidio](https://www.tidio.com/)

Convert more leads, provide stellar support, and boost your revenue with Tidio’s game-changing AI-driven customer service solution.

1. 按照引导获取你的手动安装代码
首次注册后，TIDIO会自动引导你获取安装代码，这是安装代码格式：
```JavaScript
&lt;script src="**//code.tidio.co/xxxxxx.js**" async&gt;&lt;/script&gt;
```
如果你已经配置好，可以在设置→ Installation → Manual install 中找到你的安装代码
![image.png](/legacy/f41392ac5771f1e3.png)


## 配置

将上述安装代码中的URL部分复制出来，即这段：**//code.tidio.co/xxxxxx.js**

配置到NotionNext中,添加一个配置 CUSTOM_EXTERNAL_JS，参考如下

![image.png](/legacy/3b4d809da726e148.png)

可以直接复制我的这个配置，并将URL替换成你的。

## 原文链接

https://docs.tangly1024.com/article/notion-next-tidio
