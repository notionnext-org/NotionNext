# CloudFlarePage静态部署
> 迁移自：[CloudFlarePage静态部署](https://docs.tangly1024.com/article/notion-next-cloud-flare)
> 发布日期：2023-3-13
> 最后编辑：2026-5-10
> 原栏目：🚀 安装部署
> 标签：NotionNext、部署方案、CloudFlare
> 摘要：cloudflare支持纯静态导出的notionnext，兼容性不那么好，但不失为一种选择。

## 前言

::: tip 提示
CloudFlare方案适用于站点访问量大，而文章更新不频繁的用户。
目前是我个人在用的方案。
:::

参考haixin的文章[《NotionNext建站-cloudflare版》](https://www.haixin.io/article/notion-next-on-cf)，这里做了优化

部署效果预览

[Notion Blog | 一个NotionNext搭建的博客](https://cloudflare.tangly1024.com/)

一个NotionNext搭建的博客

::: info 问题
CloudFlare版本是静态导出的，**不支持实时更新文章**，每次更改Notion内容后请手动部署站点。若需要实时动态更新请使用Vercel\Netlify\Zeabur\VPS部署方案。
:::

::: tip 提示
CloudFlare部署方案，以及其他所有使用 静态导出的方案，默认都不支持NotionNext自带的搜索功能，必须集成Algolia插件才能实现全文搜索。

详情参考Algolia全文搜索插件获取帮助:
[Algolia搜索引擎 | NotionNext帮助手册](/user-guide/config/algolia)

NotionNext如何配置Algolia
:::


## ⚠️ Cloudflare Pages 构建镜像 V1 弃用通知

::: danger 重要：V1 构建镜像将于 2026 年 9 月 15 日弃用
如果你正在使用 Cloudflare Pages 的 **V1 构建镜像**（旧版环境），你的项目将在 2026 年 9 月 15 日被自动迁移到 V3。
建议你提前手动升级，以避免自动迁移可能带来的构建问题。

**V3 构建镜像的核心变化：**
- Node.js 默认版本从 12.18.0 升级到 **22.16.0**
- Yarn 默认版本从 1.22.4 升级到 **4.9.1**（Berry）
- npm 默认版本从 6.14.4 升级到 **10.9.2**
- Ubuntu 从 18.04 升级到 **22.04.2**

**关键注意事项：** V3 默认使用 Yarn 4.x（Berry），不再兼容 Yarn 1.x 格式的 `yarn.lock` 文件。
必须设置 `YARN_VERSION=1.22.22` 环境变量以保持兼容。

详情参见下方 [V3 构建镜像迁移指南](#v3-构建镜像迁移指南)。
:::

## 开始

访问CloudFlarePage

[Cloudflare Pages](https://pages.cloudflare.com/)

Build your next application with Cloudflare Pages


### 创建项目

![Untitled](/legacy/eae0c1921ef7ccc0.png)

::: warning 注意
注意，2026年新版的Cloudflare 默认引导部署Workers，但是NotionNext目前的代码不支持Workers动态。 暂时还是选择使用Pages静态部署：
![部署页面底部有个小小的Pages](/legacy/2e139d8baa050794.png)
:::

1. 直接连接git
![Untitled](/legacy/1a26aefb66d30bef.png)

1. 导入项目
![Untitled](/legacy/6e07dfea953ed984.png)

1. 选择分支
分支选择` deploy/cloudflare-support` ；
在4.0.9之后的版本中，可以直接使用`main`分支部署，无需切换分支
![Untitled](/legacy/20413b7d85154964.png)

### 配置参数
来到页面下方的构建设置：
  - 构建命令填
```Bash
yarn export
```
  - 输出根目录 `out`
![Untitled](/legacy/010491fba650a2e6.png)


### 构建镜像版本选择

Cloudflare Pages 提供 V1、V2、V3 三个版本的构建镜像。**V1 将于 2026-09-15 弃用**，建议现在切换到 V3。

在项目 Dashboard 中操作：**Settings** > **Build** > **Build image version** > 为 **Production** 和 **Preview** 环境都选择 **v3**。

### 环境变量

在项目 **Settings** > **Environment variables** 中添加以下变量，同时应用到 Production 和 Preview 环境：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `NODE_VERSION` | `22` | Node.js 版本（项目使用 22） |
| `YARN_VERSION` | `1.22.22` | **必需**：V3 默认 Yarn 4.x，必须指定 Yarn 1.x |
| `BUILD_MODE` | `true` | 启用构建模式 |
| `EXPORT` | `true` | 启用静态导出 |

::: warning `YARN_VERSION` 是最关键的变量
V3 默认使用 Yarn 4.9.1（Berry），无法读取本项目 Yarn 1.x 格式的 `yarn.lock`，必须设置此变量。
:::

V3 还支持通过文件检测 Node.js 版本（`.nvmrc` 和 `.node-version`），本项目已包含这两个文件作为双保险。

配置效果如下

![image.png](/legacy/ff8e259828f3e6cf.png)

最后点击保存并部署即可。


### 完成部署

页面中心会显示您的访问域名

![Untitled](/legacy/2283354350ed2532.png)


## V3 构建镜像迁移指南

### 构建镜像版本对比

| 组件 | V1（旧版，即将弃用） | V2 | V3（推荐） |
|------|---------------------|-----|-----------|
| Node.js | 12.18.0 | 18.20.8 | **22.16.0** |
| Yarn | 1.22.4 | 4.1.1 | **4.9.1** |
| npm | 6.14.4 | 9.6.6 | **10.9.2** |
| Ubuntu | 18.04 | 22.04.2 | **22.04.2** |
| 弃用日期 | **2026-09-15** | 2027-02-23 | N/A（最新） |

### V3 迁移步骤

1. 进入 [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > 选择你的 Pages 项目
2. 前往 **Settings** > **Build** > **Build image version**
3. 为 **Production** 和 **Preview** 环境都选择 **v3**
4. 在 **Settings** > **Environment variables** 中添加 `YARN_VERSION` = `1.22.22`
5. 确保 `NODE_VERSION` 设置为 `22`（或依赖 `.nvmrc` / `.node-version` 文件自动检测）
6. 保存设置，触发一次新的部署验证构建成功

### V3 重要限制

V3 构建镜像与 V1/V2 有以下行为差异，需要注意：

- **不读取 `package.json` 的 `engines` 字段**：Node.js 和包管理器版本不会从 `engines` 中检测
- **不检测 `yarn.lock` 文件版本**：不会根据 lockfile 格式自动选择 Yarn 版本
- **不检测 `pnpm-lock.yaml` 文件版本**：需要手动设置 `PNPM_VERSION`
- **不支持 Node.js 版本代号**：如 `hydrogen`、`lts/hydrogen`，必须使用数字版本号
- **不支持 pipenv 和 Pipfile**

### V3 完整配置清单

| 配置项 | 类型 | 值 | 说明 |
|--------|------|-----|------|
| Build command | 构建设置 | `yarn export` | 静态导出命令 |
| Output directory | 构建设置 | `out` | 静态文件输出目录 |
| Build image version | 构建设置 | **v3** | 生产和预览环境都选 v3 |
| `NODE_VERSION` | 环境变量 | `22` | Node.js 22.x |
| `YARN_VERSION` | 环境变量 | `1.22.22` | **必需** — 保持 Yarn Classic |
| `BUILD_MODE` | 环境变量 | `true` | 构建模式 |
| `EXPORT` | 环境变量 | `true` | 静态导出模式 |
| `.nvmrc` | 项目文件 | `22` | Node 版本文件（V3 支持） |
| `.node-version` | 项目文件 | `22` | Node 版本文件（V3 支持） |

### 版本固定最佳实践

::: tip 最佳实践
为避免 V3 构建镜像的自动软件更新导致构建失败，建议：
1. 通过环境变量固定关键工具的版本（如 `YARN_VERSION`、`NODE_VERSION`）
2. 关注 [Cloudflare Changelog](https://developers.cloudflare.com/changelog/) 了解预装软件的更新计划
3. 主要版本更新前会提前 3 个月通知，minor 更新可能无通知
4. 在 Preview 环境先验证新配置，再应用到 Production
:::

## FAQ

部署失败？如果你的构建日志中出现：

```JSON
YN0070: Migrating from Yarn 1; automatically enabling the compatibility node-modules linker 👍
```

或类似 Yarn 版本不兼容的错误，说明你正在使用 V3 构建镜像但未配置 `YARN_VERSION`。

解决方法：**按照上方 [V3 构建镜像迁移指南](#v3-构建镜像迁移指南) 配置环境变量，而不是降级到旧版环境**。

如果已正确配置 `YARN_VERSION=1.22.22` 仍有问题，可临时降级为旧版构建环境：

![Untitled](/legacy/8094169b65d52e78.png)

![Untitled](/legacy/46906e8884b4406f.png)


### 需要帮助？

如果你的部署异常，没有出现一个绿色的勾，通常是代码修改异常或者配置错误导致，点击右侧的查看详情，获取详细的部署日志：

![image.png](/legacy/4962bb89e9b834fa.png)

在构建日志这一栏可以看到所有详细的错误信息，根据错误日志进行排查问题，如果无法自行排查，可以将日志复制或截图，寻求他人帮助。

![image.png](/legacy/005db960c8859766.png)


## CloudFlarePage如何绑定自定义域名？

项目主页找到`自定义域`，找到下方设置自定义域

![Untitled](/legacy/3011d4085321741b.png)

填写域名并继续

![Untitled](/legacy/84626393c95239ac.png)

按照要求在域名服务商后台配置一个CNAME转发

![Untitled](/legacy/1b00ce496b455cba.png)

- CNAME转发示例
![Untitled](/legacy/aa89a2a369ffa95c.png)

- 点击下方的激活域，由于我使用的域名商本身就是cloudflare，故此步骤只需几秒即可完成验证。
![Untitled](/legacy/94c7788c6a3f6212.png)


## Hooks 触发部署

CloudFlare 支持和Vercel 类似的hooks 功能，后台生成一个调用地址，即可触发站点重新部署，用于更新文件和配置等。

在项目的设置页面，构建栏目下的部署挂钩。点击加号➕新增一个hooks即可

![image.png](/legacy/0c5401e0d3174d1a.png)

创建挂钩时，要指定你部署的github代码分支，以及随意起一个挂钩名称；

![image.png](/legacy/cde5ce1419afcb17.png)
![image.png](/legacy/b15faf06a3c70471.png)
创建后会生成一个webhook链接，点击复制链接保存使用。

需要注意，CloudFlare的hook 和 Vercel 不一样：

- **Vercel webhook** 👉 GET 也行（在浏览器地址栏输入Webhook网址即可 简单触发）

- **Cloudflare Deploy Hook** 👉 只允许 POST（更安全）
浏览器访问会提示 `method_not_allowed`
![image.png](/legacy/abfa7c8ab36bf6dc.png)

👉 防止被随便浏览器点一下就触发部署

Windows/Mac/Linux可以用 终端命令行输入以下命令触发

```Bash
curl -X POST https://你的hook地址
```

当页面显示如下内容，说明已经触发了重新部署

![image.png](/legacy/96b39161c65a6447.png)
```Bash
{
  "result": {
    "id": "64b89b29-663d-4483-bde9-281cbf8e93d9"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## 原文链接

https://docs.tangly1024.com/article/notion-next-cloud-flare
