# Artalk
> 迁移自：[Artalk](https://docs.tangly1024.com/article/notion-next-artalk)
> 发布日期：2023-8-8
> 最后编辑：2024-1-31
> 原栏目：📩 评论插件
> 摘要：NotionNext支持Artalk评论插件

## Artalk介绍

[Artalk | 自托管评论系统](https://artalk.js.org/)

一款简洁的自托管评论系统

**Artalk** 是一款简洁的**自托管**评论系统，你可以在服务器上**轻松部署**并置入前端页面中。

来到你的博客，或是任意位置，放置 Artalk 评论框，让页面具备丰富的**社会化**功能。

![image](/legacy/30621e71e984b586.png)


### **功能亮点**

- **轻量设计**
前端采用 TypeScript (Vanilla JS)，轻量级，无冗余依赖，仅 ~30KB (gzipped)。
后端采用 Golang 重制 (Artalk v2)，跨平台，体积小巧，五脏俱全，快速部署。

- **“麻雀虽小，五脏俱全”**
  - Markdown 语法 + 代码高亮
  - [**通知中心**](https://artalk.js.org/guide/frontend/sidebar.html) - 站内：侧边栏 + 红点标记
  - [**多形式推送**](https://artalk.js.org/guide/backend/admin_notify.html) - 站外：邮件、TG、钉钉、飞书 + 异步执行
  - [**评论审核**](https://artalk.js.org/guide/backend/moderator.html)：折叠 / 反垃圾 / 频率限制 / 滑动验证
  - [**多站点**](https://artalk.js.org/guide/backend/multi-site.html)：共用同一个后端程序，多站点集中化管理
  - [**表情包**](https://artalk.js.org/guide/frontend/emoticons.html)：支持 OwO 格式 + 动态加载
  - [**Artrans**](https://artalk.js.org/guide/transfer.html)：评论数据快速迁移 (导入 / 导出) 工具
  - 评论投票 / 身份徽章 / 密码验证 / 说说模式
  - 评论盖楼 / 评论分页 / 滚动加载 / 实时预览
  - 评论排序 / 评论置顶 / 评论防丢 / 自动填充
  - 图片上传 / 页面管理 / 站点隔离 / 夜间模式


## 样式预览

![Untitled](/legacy/5dd803e5ea3445e0.png)

支持markdown、图片、图标等多重特性

![Untitled](/legacy/be242458cb2ee77a.png)

支持查看消息列表记录

点击Messages即可

![Untitled](/legacy/419044cedca8f2fb.png)

Artalk后台页面

![Untitled](/legacy/4e26229d4b60e72b.png)


## 配置方式

Vercel添加一个后台环境变量即可


## Artalk安装

按照官方文档部署：

[📦 程序部署 | Artalk](https://artalk.js.org/guide/deploy.html)

一款简洁的自托管评论系统

这里为部署方式做个概括

1. Docker一键启动后端
```JavaScript
docker run -d \
    --name artalk \
    -p 8080:23366 \
    -v $(pwd)/data:/data \
    --restart=always \
    artalk/artalk-go
```

1. 初始化管理后台密码
```Bash
docker exec -it artalk artalk admin
```
执行以上命令后，按照提示操作即可
![Untitled](/legacy/e9d6e3191498709c.png)


### 添加你的信任域名

::: tip 提示
**TIP**

你需要将「使用该后端的前端」URL 地址加入可信域名列表中，
若非默认 80/443 端口需额外附带端口号，例如：`**https://example.com:8080**`
:::

在管理后台中找到Settings → Trusted domains。

配置参考如下；添加可信域名，并点击Apply保存

![Untitled](/legacy/8232e00cfe65af59.png)


## 完成

## 原文链接

https://docs.tangly1024.com/article/notion-next-artalk
