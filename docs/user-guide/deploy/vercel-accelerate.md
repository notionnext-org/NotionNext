# Vercel域名加速
> 迁移自：[Vercel域名加速](https://docs.tangly1024.com/article/vercel-accelerate)
> 发布日期：2024-12-24
> 最后编辑：2024-12-24
> 原栏目：🚀 安装部署
> 摘要：Vercel搭建的站点如何提升在大陆的访问效率

## Vercel域名在国内被墙

vercel.app因为被大量使用，自然而然被墙掉了，不过好在 Vercel 官方提供了单独的 IP 和 CNAME 地址给大家，对于国内的用户来说，配置一下单独的解析，依然可以享受 Vercel 提供的服务。

将上述步骤中用到的 ip和 cname地址替换成以下内容即可：

A记录地址：`76.223.126.88` 或 `76.76.21.98` 等

CNAME 记录地址：`cname-china.vercel-dns.com`

::: tip 提示
:::

### A记录和CNAME的区别
> A记录就是把一个域名解析到一个IP地址（Address，特指数字IP地址）；
> CNAME记录就是把域名解析到另外一个域名。
> 其功能差不多，CNAME将几个主机名指向一个别名，其实跟指向IP地址是一样的，因为这个别名也要做一个A记录的。


### 提升Vercel站点在国内的访问效率

我使用CloudFlare的CDN，目前没有大陆节点，因而在国内的访问其实速度一般而且不稳定（部分的地区无法访问），如果主要面向国内用户最终解决方法是将网站备案，然后购买国内服务商的CDN服务，例如腾讯云的[CDN或EdgeOne](https://cloud.tencent.com/product/cdn)。

当然，想省事还有另外的解决方案，例如国人开放的CDN项目：

[提升部署在cloudflare、vercel或netlify的网站在中国国内的访问速度和稳定性](https://xingpingcn.top/enhanced-faas-in-cn.html)

通过优化的 CNAME 解析，改善 cloudflare、Vercel 和 Netlify 在中国大陆的访问速度和稳定性，解决官方默认解析的不稳定问题。附测速结果和常见问题解答

[GitHub - xingpingcn/enhanced-FaaS-in-China: 提升部署在cloudflare、vercel或netlify的网页在中国的访问速度和稳定性 Improve the access speed and stability in China of web pages hosted on cloudflare, vercel or netlify by merely changing your CNAME record. cf优选域名 | cf优选ip | cloudflare | vercel | netlify | 加速 | 国内 | 中国 | 境内 | 大陆](https://github.com/xingpingcn/enhanced-FaaS-in-China)

提升部署在cloudflare、vercel或netlify的网页在中国的访问速度和稳定性 Improve the access speed and stability in China of web pages hosted on cloudflare, vercel or netlify by merely changing your CNAME record. cf优选域名 | cf优...

或者可以尝试以下项目

[推一下 Vercel 加速节点](https://www.yt-blog.top/9952/)

写在前面 Vercel 不仅可以部署 Hexo 博客，还能部署很多服务。 境内选择 Vercel 的站长很多，为了提升访问速度，自然选择了距离大陆最近的香港节点。 选的多了，节点压力自然就会增大，就算 Vercel 属于大平台，对陆带宽依旧有限，必然会出现互相影响的情况。 再加上滥用资源等问题出现，不少小伙伴反馈 Ve...


### 对比效果

图1是加速前，图2是加速后

![加速前](/legacy/44d1958343b6b7e3.png)
![加速后](/legacy/ba89cafef19fca68.png)

## 原文链接

https://docs.tangly1024.com/article/vercel-accelerate
