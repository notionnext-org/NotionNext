# Notion-faster加速Notion
> 迁移自：[Notion-faster加速Notion](https://docs.tangly1024.com/article/notion-faster)
> 发布日期：2022-6-30
> 最后编辑：2024-9-4
> 原栏目：✒ Notion教程
> 标签：Notion、国内访问
> 摘要：加快Notion的访问速度，感谢国内大神分享的此项目

::: tip 提示
由于政策等原因影响，Notion并没有在中国大陆架设服务器，导致国内访问Notion的速度堪忧，本文分享一个方案，有效提升Notion在国内的访问体验。
:::


## Notion-faster

Notion-faster是由jerryw维护的一项公益项目，

它使用优质线路对Notion进行反向代理, 以加速Notion在中国大陆的访问速度, 解决Notion打不开、网速慢等问题。以下是项目主页：

[Notion-faster](https://jerryw.cn/notion-faster)

用优质线路对Notion进行反向代理, 以加速Notion在中国大陆的访问速度, 解决Notion打不开、网速慢等问题。目前的权宜之计, Notion在中国大陆网络环境得到极大改善之时，就是此项目结束之日。 本项目由 产品沉思录（ProductThinking）赞助， 了解详情请点此 我不代表 Notion 官方，我只是一个热爱使用 Notion 的 Notion 用户。 此项目是公益项目，不具有任何保证。我会尽力维护反向代理的可用，但对于由于不可抗力导致反向代理中断带来的数据丢失及其他事故，概不负责。反向代理被强制中断的原因包括但不限于：被云服务器提供商停用，被 DDos，Notion 在中国大陆无法正常访问（以https://status.notion.so为准）。 禁止使用此反向代理做违反中华人民共和国法律的事。 如遇到突发情况，请再次访问 此页面获取最新消息( Ctrl+Shift+R 以清除缓存)。 关掉代理软件(如果有)，根据你使用的设备进行下一步。 Windows Mac iPhone/iPad Android 改Hosts和改 DNS 二者选一个即可，桌面端可修改Hosts或修改 DNS ；移动端修改DNS更方便，自行查找资料修改配置即可。 119.28.13.121 www.notion.so 119.28.13.121 msgstore.www.notion.so DOT: dns.jerryw.cn DOH: https://dns.jerryw.cn:8443/dns-query 纯自动化监测，每分钟探测一次。此页面也展示了当前所有可用节点。 如何确认自己的数据是否保存到了 Notion 的云上 一般情况下，Notion 过几秒都会自动保存，会在标题栏的右边出现 Saving 和一个圈 当这个圈出现后再次消失，则为保存成功，数据不会丢失。 在电脑端，你可以使用 Ctrl+S (Windows/Linux) 或 Cmd+S （Mac) 让这个保存的标志强制出现 如果 Saving 出现了很久都不消失，则表明此服务挂掉了 数据安全 此反向代理只进行了流量的代理，起到中转功能，并没有储存任何数据。此服务器只是从 tcp 层面转发了 https 流量，无 的域名证书私钥，无法解密流量(不知道传输的是什么内容)。 使用中遇到 offline 怎么办 当特殊情况发生的时候，取消修改 hosts 或 DNS（或者使用其他可以连接的方式），不停地按ctrl/cmd + S，直到 offline 消失， Saving 的标志消失。你的数据在Notion的云上，而不在反向代理的服务器上，丢失也只会丢失由于短暂网络中断而无法保存的少量数据。 改DNS vs 改hosts 从总体来看, 改DNS可以"一劳永逸" ，因为我会随着服务器的调整修改DNS服务器的记录，而且也支持多个反向代理服务器的负载均衡。所使用的DNS为自建 ADGURD HOME。上游为国内DNSPod，ECS 支持十分好，仅仅有对Notion 的重写，无广告拦截。 从修改便利程度来看, 移动端修改DNS比较方便, 电脑端修改hosts比较方便.


## 使用方法

改Hosts和改 DNS 二者选一个即可，桌面端可修改Hosts或修改 DNS ，以下是修改hosts的说明


### 一、改Hosts

<details>
<summary>Windows</summary>

本地搜索 cmd，然后右键以管理员身份打开
![image](/legacy/fd92000bd0445fc7.png)
接着分别输入以下命令：
```Plain Text
cd C:\Windows\System32\drivers\etc
notepad hosts
```
![image](/legacy/941d3beedd82c05b.png)
将下方的两行内容加到记事本编辑的文件后面，保存并退出。
```Plain Text
119.28.13.121 www.notion.so
119.28.13.121 msgstore.www.notion.so
```
图片仅供参考，具体 Hosts 信息以上代码框内的为准
![image](/legacy/c88ad43d6e9e2801.png)

</details>

<details>
<summary>Mac</summary>

下载[ihosts](https://apps.apple.com/cn/app/ihosts-etc-hosts-editor/id1102004240?mt=12)，将下列hosts信息写入
```Plain Text
119.28.13.121 www.notion.so
119.28.13.121 msgstore.www.notion.so
```
![image](/legacy/8dd21b083f116bec.jpg)
图片仅供参考，具体 Hosts 信息以上代码框内的为准

</details>

<details>
<summary>iPhone/iPad</summary>

前提：ios 版本大于等于 14
下载下面的描述文件
[https://dns.jerryw.cn:8443/apple/dot.mobileconfig?host=dns.jerryw.cn](https://dns.jerryw.cn:8443/apple/dot.mobileconfig?host=dns.jerryw.cn)
下载配置文件后，前往「设置」。你将会看到「已下载描述文件选项」。
![image](/legacy/8a939a3f7cf56add.png)
点击以查看刚刚下载的配置文件，选择右上角「安装」文件：(没有签名, 因为我还不是ios开发者...暂时可能没有必要吧)
![image](/legacy/36f6e8f61b029efb.jpg)
图片仅供参考，请以实际为准
你可以通过「设置- VPN 与网络-DNS」设置及选择要使用的 DNS 配置。
![image](/legacy/5e043a6e36503dd1.png)
如图所示，选择第二个

</details>

<details>
<summary>Win-Mac-Linux(Beta)</summary>

下载 [SwithHosts](https://swh.app/) 并安装
安装下图所示添加 hosts，其中 URL 为
```Plain Text
https://hosts.notionfaster.org
```
![image](/legacy/9efcd7a636398502.png)
点击确定后就能看到，一些 hosts 规则已经刷新出来了，点击按钮开启
![image](/legacy/f61153a85a36c44f.png)

### 为什么使用 SwithHost
一方面，相比于自己编辑 host 文件，更加简单。另一方面，使用远程 hosts 文件，如果节点信息变更，也能在第一时间更新，避免意料之外的宕机发生。

</details>


### 二、修改DNS

移动端修改DNS更方便，自行查找资料修改配置即可。

DNS服务器

```Bash
DOT: dns.jerryw.cn
DOH: https://dns.jerryw.cn:8443/dns-query
```


## 附录

Notion的汉化方法：

[GitHub - Reamd7/notion-zh_CN at 2.4.10](https://github.com/Reamd7/notion-zh_CN/tree/2.4.10)

notion 中文化. Contribute to Reamd7/notion-zh_CN development by creating an account on GitHub.

## 原文链接

https://docs.tangly1024.com/article/notion-faster
