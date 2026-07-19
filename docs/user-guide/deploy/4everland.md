# 4EverLand部署NotionNext-Web3.0方案
> 迁移自：[4EverLand部署NotionNext-Web3.0方案](https://docs.tangly1024.com/article/notionnext-deploy-web3.0-4everland)
> 发布日期：2023-6-21
> 最后编辑：2024-11-13
> 原栏目：🚀 安装部署
> 标签：NotionNext、部署方案、Web3
> 摘要：部署在Web3.0平台上的网站能够提供更加安全、透明、去中心化和创新的服务，为用户带来更好的体验和价值。NotionNext支持部署在去中心化的Web3.0平台上，这将为用户提供更加安全和可靠的服务，同时也将为网站带来新的商业机会和竞争优势。

::: tip 提示
NotionNext支持部署在去中心化的Web3.0平台，可以尝试体验一下
:::

![download.jpg](/legacy/26cf0917cf2fe01f.jpg)


## 0.序

Web3.0是指下一代互联网，它将重心从仅仅是信息传递和交流转向了更加注重去中心化和加密保护的应用程序。与Web2.0相比，Web3.0更注重用户数据的隐私和安全，以及去中心化应用程序（DApps）的开发和使用。

Web3.0的核心是区块链技术，它是一种去中心化的分布式数据库，可以记录和验证所有交易和信息。通过区块链技术，Web3.0可以提供更加安全、透明和可信的应用程序，并且可以消除中间人的干扰。

部署在Web3.0平台上的网站有以下几个好处：

1. 去中心化：Web3.0平台上的网站不依赖于中心化的服务器，而是使用分布式节点来存储和传输数据。这意味着网站更加安全、可靠，同时不会受到单点故障的影响。

1. 数据隐私和安全：Web3.0平台使用加密技术来保护用户的隐私和安全，确保用户的个人数据不会被共享或出售。这是Web3.0相对于Web2.0的一个重要的改进。

1. 去除中间人：Web3.0平台上的网站可以通过智能合约来自动执行交易，从而去除中间人的干扰，使交易更加便捷和快速。

1. 社区治理：Web3.0平台上的网站可以通过DAO（去中心化自治组织）来实现社区治理，使用户可以直接参与到网站的决策和管理中。

1. 新的商业模式：Web3.0平台上的网站可以通过加密货币来实现支付和奖励，同时也可以通过NFT（非同质化代币）来实现数字资产的交易和管理，这将为网站带来全新的商业模式和机会。

总之，部署在Web3.0平台上的网站能够提供更加安全、透明、去中心化和创新的服务，为用户带来更好的体验和价值。NotionNext支持部署在去中心化的Web3.0平台上，这将为用户提供更加安全和可靠的服务，同时也将为网站带来新的商业机会和竞争优势。


## 1.准备账号

访问4everland官网，并使用github登录

[#IPFS #Arweave #Dfinity #Web3](https://dashboard.4everland.org/login)

![Untitled](/legacy/166eea00e21d7b11.png)


## 2.导入项目

点击 `New Project`

![Untitled](/legacy/bf40b64b4ace9184.png)

找到您的NotionNext项目，(确保您的NotionNext项目是最新的，并且项目中有包含deploy/4everland分支)

点击右侧的Import导入

![Untitled](/legacy/a8d7f45377e9022c.png)


## 3.修改配置

有4处必须修改：

1. Branch，分支改为 `deploy/4everland` ，如无此分支，请从我的代码仓库拉取次分支。

1. `Build Command `编译命令， 改为 `yarn export`

1. Node.js Version 环境版本改为 `18.x`

1. 环境变量添加一项 `VERCEL_ENV `= `production` , 记的点击右侧的`Add` ，然后别忘了添加一个环境变量 `NOTION_PAGE_ID` , 这里的环境变量配置方式和Vercel无异。

![Untitled](/legacy/52d9344084288fac.png)


### 3.1完成

点击底部的Deploy即可部署。 静候几分钟即可。

![Untitled](/legacy/81f14de63e26f4ae.png)


### 3.2配置域名

找到本项目的Domains选项卡

![Untitled](/legacy/6bcd237d664a84dd.png)

添加你的域名：例如 [4everland.tangly1024.com](http://4everland.tangly1024.com/)，点击右侧Add

![Untitled](/legacy/0865b0d05f722da5.png)

然后按照提示，在您的域名解析后台配置好`CNAME`即可。

![Untitled](/legacy/634d93d0a954d1c7.png)

配置成功即可访问

![Untitled](/legacy/fe95265c94bdddc1.png)


### 3.3访问效果

[Tangly Blog | 记录过程，分享心得](https://4everland.tangly1024.com/)

记录过程，分享心得


## 4.特别说明

[cloudflarePage](/user-guide/deploy/cloudflare-pages) 和 4everland 这两种部署方案，实际上是将Next项目导出为静态html。

这样做的缺陷是不支持根据notion内容动态更新。

修改或发布文章后，请到4everland 后台点击重新部署。

## 原文链接

https://docs.tangly1024.com/article/notionnext-deploy-web3.0-4everland
