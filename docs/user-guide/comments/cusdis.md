# Cusdis
> 迁移自：[Cusdis](https://docs.tangly1024.com/article/notion-next-cusdis)
> 发布日期：2023-6-27
> 最后编辑：2024-2-2
> 原栏目：📩 评论插件

## Cusdis

完成效果预览

您的博文底部会有这样的评论页面。

![Untitled](/legacy/8c376b8e68078fef.png)


## 开始


### 注册Cusdis

访问Cusdis的官网进行登录注册

[Cusdis - Lightweight, privacy-first, open-source comment system](https://cusdis.com/)

The JS SDK embedded to your website is only around 5kb (gzipped). It has built-in i18n, dark-mode. Moderate all the comments on a dashboard. You will receive Email notification when a new comment comes in, and approve the new comment without login. You can set a Webhook URL that will be triggered when your websites have new comment.

<details>
<summary>点击`Start for free` ，并用Github登录即可 `Sign in With Github` (点击查看截图)</summary>

![Untitled](/legacy/1e7aa3eb319239d7.png)
![Untitled](/legacy/ee8eb1d99928a29c.png)

</details>

<details>
<summary>[可选] 配置邮件通知地址，以便收到新评论时邮件通知您，（点击展开截图）</summary>

![Untitled](/legacy/c6b5e453f44eb98e.png)

</details>

<details>
<summary>点击左上角`New website`. 填写网站名字完成创建。</summary>

![Untitled](/legacy/f3302677a2f3fcfa.png)

</details>

<details>
<summary>点击`Embed Code`获取您的应用ID，即`data-app-id`, 复制这串id备用。</summary>

![Untitled](/legacy/a8077f3e76589581.png)
![Untitled](/legacy/a68ae61f4c1427a5.png)

</details>


### 配置NotionNext

<details>
<summary>在Vercel后台添加一个环境变量` NEXT_PUBLIC_COMMENT_CUSDIS_APP_ID`，值为上面获取到的`data-app-id`。</summary>

![Untitled](/legacy/bd1058ed9b1a2793.png)

</details>

<details>
<summary>添加完环境变量记得`Redploy`项目。</summary>

![Untitled](/legacy/dcad7abd7327cf77.png)

</details>


## 说明

cusdis 评论区收到用户评论后会发一封邮件通知管理员，需要管理员审核通过 （点击`Approved`）后才会展示评论内容：

![Untitled](/legacy/3d2868e2e5f60c6a.png)

## 原文链接

https://docs.tangly1024.com/article/notion-next-cusdis
