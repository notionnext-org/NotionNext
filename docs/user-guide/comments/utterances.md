# Utterance
> 迁移自：[Utterance](https://docs.tangly1024.com/article/notion-next-utterance)
> 发布日期：2023-6-29
> 最后编辑：2024-1-31
> 原栏目：📩 评论插件

## Utterance


### 完成预览效果

![Untitled](/legacy/ca73cd9ce0289c44.png)


## 配置Utterance

只需两步骤，在github中创建仓库，安转插件

<details>
<summary>1.在您的Github中创建一个开源项目用于存放评论</summary>

点击下方链接跳转到创建项目页面
[Build software better, together](https://github.com/new)

You can't perform that action at this time. You signed in with another tab or window. You signed out in another tab or window. Reload to refresh your session. Reload to refresh your session.
示例
![Untitled](/legacy/09cabcaea87a3358.png)

</details>

<details>
<summary>2.在github中安装[utterance插件](https://github.com/apps/utterances)</summary>

访问此地址安装：[https://github.com/apps/utterances](https://github.com/apps/utterances) ， 点击右上角install即可
![Untitled](/legacy/41ec5fc90fe2e094.png)
允许utterance访问所有仓库，并勾选install，可以只勾选作为评论用的仓库地址。
![Untitled](/legacy/4a5891638603d962.png)

</details>


## 配置NotionNext

只需两步，设置环境变量，重新部署项目。

<details>
<summary>1.将用作评论仓库名添加到Vercel添加环境变量</summary>

后台`settings`→ `environment variables `→ 添加 → `save` 即可。如下图：
![Untitled](/legacy/e25ae8c5ed7dc9da.png)
::: tip 提示
注意，`仓库名`的格式是** [您的用户名/您的仓库名] **如下示例

![Untitled](/legacy/4f253f5c9f1290d2.png)
添加后的效果
![Untitled](/legacy/fc68e9498a6e705f.png)
:::

</details>

<details>
<summary>2.添加完环境变量记得`Redploy`项目。</summary>

![Untitled](/legacy/f57abdcff2f0a275.png)

</details>

## 原文链接

https://docs.tangly1024.com/article/notion-next-utterance
