# Vercel绑定自定义域名
> 迁移自：[Vercel绑定自定义域名](https://docs.tangly1024.com/article/vercel-domain)
> 发布日期：2022-2-17
> 最后编辑：2025-12-26
> 原栏目：🚀 安装部署
> 标签：NotionNext、部署方案
> 摘要：Vercel 借助cloudFlare可以快速绑定解析自己的域名

::: info 问题
为什么要绑定自定义域名？
:::

vercel默认提供的域名 *.vercel.app 由于滥用已被大陆屏蔽（DNS污染），如果需要在国内能访问到您的站点，请绑定一个新的域名即可


## 准备一个域名

首先购买自己的域名，您可以选择以下渠道进行购买：

- [Namesilo](http://www.namesilo.com/?rid=fe5a225yc)

- [Godaddy](https://www.godaddy.com/zh-sg/offers/godaddy)

另外您还可以选择从以下平台获取到免费的域名：

- [eu.org](https://zhuanlan.zhihu.com/p/538005306) （eu.org是欧盟组织的免费域名；需要英国的用户信息才能注册;）

- ~~[Freenom](https://freenom.com)~~~~ （目前已逐步停止域名服务）~~


#### 首推Namesilo

我早先在腾讯云购买的域名，但奈何无耻的价格套路，最后选择迁入[Namesilo](http://www.namesilo.com/?rid=fe5a225yc)。

::: tip 提示
**套路**指那些首年极其便宜，但次年续费很贵的。如 Godaddy，首年 $0.99，次年续费要 102 元人民币，而且隐私保护还需要额外再加 60 元。
:::

NameSilo优点：

- **价格便宜稳定，无套路**
Namesilo 域名本身价格就比较便宜，COM 域名 $8.99/年，除了一个一美元优惠码，基本没有其他大幅度促销活动，域名续费和首年购买价格一致。
Namesilo 价格表：[Domain Pricing](https://www.namesilo.com/pricing.php?rid=fe5a225yc)
::: tip 提示
填入我的优惠码 `tangly1024a` ** **可以享受 `**1$**`的 优惠。

![Untitled](/legacy/8fa25c54fde6c2d9.png)
:::

- **永久免费的隐私保护**
Namesilo 提供永久免费的域名隐私保护，防止别人通过 WHOIS 查询获取域名所有者的个人注册信息。作为对比，Godaddy 的隐私保护是 60 元/年，Namecheap 则是免费提供第一年。

- **安全性高**
支持账户登陆二次验证和 Domain Defender，保护账户和域名安全。登陆、解锁域名等，都可以设置邮件或短信提醒。

- **支付方便**
支持支付宝、Paypal、信用卡等多种方式付款。


## Vercel控制台添加域名

- 在Vercel控制面板中找到`Setting`→`Domains`→`Add`，在这里可以指定当前项目的绑定域名，一个项目可以绑定多个域名。

![image](/legacy/be2e8205c5965fcd.png)

- 输入域名,并Add之后，如果看到下图中的提示（Invalid Configuration）👇, 说明域名已经添加，但需要根据提示添加CNAME或Nameserver的方式激活它，图中所示是要在域名后台添加一条CNAME类型的解析，参数名`hexo`，值为`cname.vercel-dns.com`。

![image](/legacy/b230574ba68381a8.png)

这里推荐使用CNAME绑定。请按文档后续步骤配置对应的Cname解析。


## 域名服务商解析CNAME

以下分多个平台举例，配置方法大同小异，只是入口不太一样，我这里主要讲CloudFlare的配置方法

::: tip 提示
其它服务商的解析CNAME方法，可以参考

<details>
<summary>腾讯云托管域名</summary>

[https://console.dnspod.cn/dns/list](https://console.dnspod.cn/dns/list) 点击域名进行配置，添加一条CNAME 转发
![Untitled](/legacy/d6916d64e8e1f547.png)
![Untitled](/legacy/d975cd7b99891cc3.png)

</details>
<details>
<summary>阿里云托管域名</summary>

打开控制台 [https://dc.console.aliyun.com/#/domain-list/all](https://dc.console.aliyun.com/#/domain-list/all)  域名列表，点击域名，并添加一条cname转发
![Untitled](/legacy/f0b645723d33b2f8.png)

</details>
<details>
<summary>Freenom 购买的域名</summary>

建议将域名的Nameservers 托管给 CloudFlare，然后在CloudFlare中设置
![Untitled](/legacy/e04d4e3848802ce9.png)

</details>
:::


### 域名转CloudFlare托管

域名服务商购买的域名，默认都会提供一个解析服务，但这个服务是可选的，我们可以通过修改Nameserver的方式，交给CloudFlare或其他DNS服务商进行解析和托管。

CloudFlare具有Worker.js、全球免费CDN、SSL证书，网站DDoS防火墙等特性，我个人习惯将域名解析交给CloudFlare管理 。

- 如何将namesilo购买的域名放在CloudFlare中解析与托管？可参考《**[NameSilo配置Cloudflare域名解析教程](https://namesiloyouhui.com/cloudflare-dns-settings.html)**》。

- 如何将阿里云购买的域名放在CloudFlare中解析与托管？ 具体配置方法可以参考《[阿里云域名用CloudFlare解析域名](https://bbs.maozhishi.com/d/56-cloudflare)》。

- 如何将Dynadot的域名放在CloudFlare中解析与托管？可参考《[Dynadot注册的域名迁移至Cloudflare](https://appscross.com/blog/dynadot-registered-domains-are-migrated-to-cloudflare.html)》。

只要在域名服务商后台，将NameServer修改成CloudFlare为你分配的地址即可。其它域名服务商的操作基本一致不再赘述。

::: tip 提示
由于域名解析存在缓存，从不同服务商将DNS交给CloudFlare托管需要一个生效时间，也许十几分钟，也许几个小时。

在CloudFlare后台点击“立即检查名称服务器”可以查看是否生效，或者等待邮件通知。
![b9d36b3aa2ca475b12b96afcc8fe80b.png](/legacy/93d490cad8cf1e20.png)
:::


### CloudFlare 解析 CNAME

- 打开CloudFlare控制台 [https://dash.cloudflare.com](https://dash.cloudflare.com)，并找到您的域名

- 若您的域名没有解析任何服务器**（即没有添加过任何一条A记录）**，需要添加一条域名A记录指向Vercel服务器地址`76.76.21.21`
![Untitled](/legacy/a695a6086d3c877b.png)

- 按Vercel提示，添加一条CNAME记录值为Vercel的CNAME服务器：`cname-china.vercel-dns.com` ;（vercel默认推荐`cname.vercel-dns.com` ，但这个cname在大陆访问比较慢）
下图是我的配置，这里举例使用的是二级域名 [hexo.tangly1024.com](http://hexo.tangly1024.com)
![Untitled](/legacy/545b4f0b07e11d0d.png)
![Untitled](/legacy/a75074b0c20cb0dd.png)
::: tip 提示
如果添加后出现“没有证书覆盖此主机名。”的错误，先关闭CDN代理
![image.png](/legacy/fe7572b5e513fc50.png)
1.右边点编辑
2.点击修改代理状态（变成灰色仅DNS）
3. 然后保存
![image.png](/legacy/76211692315d3bc4.png)
:::

- 添加成功后，还需要在ssl/tls配配置开启https完全加密 ， 否则会因为证书不匹配导致反复重定向而打不开网页。
![Untitled](/legacy/5513d9ea3c704f4b.png)
如果没有开启SSL完全加密，网站会打开失败
![反复重定向，无法打开页面](/legacy/b623038b99687589.png)

如果域名服务配置正常，Vercel的卡片会变成如图的样子：

![image](/legacy/34a1cff175109f9e.png)

> 接下来就可以通过设置的域名（如 [https://hexo.tangly1024.com](https://hexo.tangly1024.com) ）访问我们的网站了


### 关于根域名的配置

以上举例使用的是二级域名，如果你想像我一样使用 [/user-guide/intro](/user-guide/intro) 这样的根域名，配置参考如下：


#### Vercel后台

直接添加根域名后，vercel会提示需要添加一条@记录指向vercel的服务器 76.76.21.21

![Untitled](/legacy/6e4f4e171bbfcff7.png)


#### 域名管理后台

直接将根域名 解析到 vercel的服务器地址即可 ： 76.76.21.21

![Untitled](/legacy/0e277245ea2470c4.png)

添加根域名的时候，vercel会提示选择以下三种方案，针对个人博客而言，为了让域名简洁，我推荐选择第一种方案，  将www开头的二级域名也重定向到根域名tangly1024.com。

![Untitled](/legacy/4dabe69fa62572f6.png)

完成效果

![Untitled](/legacy/a11f1b9bb5dfb245.png)


## 域名与NotionNext配置

您的新域名绑定后，请配置到NotionNext项目中，配置方法推荐用环境变量:

在Vercel后台添加如下变量：

## 原文链接

https://docs.tangly1024.com/article/vercel-domain
