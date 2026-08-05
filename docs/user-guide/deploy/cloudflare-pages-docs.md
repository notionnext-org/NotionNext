# Cloudflare Pages 部署文档站（VitePress）

本仓库教程通过 **VitePress** 构建为静态站（例如 `notionnext.tangly1024.com`）。

> 与 `yarn export` 博客静态站不同：文档站**不**需要 `NOTION_PAGE_ID`。

## 组织仓库推荐：GitHub Actions 部署（无需 CF 连 Git）

GitHub **组织**下的仓库，在 Cloudflare 里「连接 Git」常出现权限、安装范围或仓库列表异常。更稳妥的做法：

**GitHub 负责构建 → API 上传到 Cloudflare Pages**，不经过 Cloudflare 的 Git 集成。

### 一次性准备

#### 1. Cloudflare 创建 Pages 项目（空项目即可）

Cloudflare 控制台 → **Workers 和 Pages** → **创建** → **Pages** → **上传资产**（先随便传一个小文件完成创建），项目名称例如：

```text
notionnext-docs
```

记下该名称，后面部署命令要用。

或本地（已登录 `wrangler login`）：

```bash
npx wrangler pages project create notionnext-docs --production-branch=main
```

#### 2. 创建 API Token

Cloudflare → **我的个人资料** → **API 令牌** → **创建令牌** → 使用模板 **编辑 Cloudflare Workers**，或自定义权限：

| 权限 | 级别 |
| --- | --- |
| Account → Cloudflare Pages | Edit |
| Account → Account Settings | Read |

复制生成的 Token（只显示一次）。

在 **Workers 和 Pages** 概览页右侧可复制 **Account ID**。

#### 3. 在 GitHub 配置 Secrets（组织或仓库均可）

仓库在 **组织**下时，建议在组织里配（组织 **Settings → Secrets and variables → Actions**），或在该仓库 **Settings → Secrets and variables → Actions**：

| Secret 名称 | 内容 |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | 上一步的 API Token |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Account ID |

可选 **Variables**（非敏感）：

| Variable 名称 | 内容 |
| --- | --- |
| `CLOUDFLARE_PAGES_PROJECT_NAME` | Pages 项目名，默认 `notionnext-docs` |

组织仓库需确认：**Settings → Actions → General** 允许使用 Actions，且组织策略未禁止 `secrets` 传给 workflow。

#### 4. 启用仓库自带 Workflow

本仓库已包含 [`.github/workflows/deploy-docs-site.yml`](https://github.com/notionnext-org/NotionNext/blob/main/.github/workflows/deploy-docs-site.yml)：

- `push` 到 `main` 且变更 `docs/**`、`.vitepress/**` 等 → 自动 `yarn docs:site:build` 并部署  
- 也可在 GitHub **Actions** 页手动 **Run workflow**

首次 push 含该 workflow 的文件后，到 **Actions** 查看 **Deploy docs site (VitePress)** 是否成功。

#### 5. 绑定自定义域

仍在 Cloudflare **Pages 项目**里操作（与 Git 无关）：

**自定义域** → 添加 `notionnext.tangly1024.com`（DNS 在 Cloudflare 时通常自动添加 CNAME）。

---

## 方案对比

| 方式 | 组织仓库 | 说明 |
| --- | --- | --- |
| **GitHub Actions + wrangler**（推荐） | 兼容好 | 只需 API Token，不装 CF GitHub App |
| Cloudflare 连接 Git | 常出问题 | 需在组织安装 Cloudflare App 并授权仓库 |
| 本地 `wrangler pages deploy` | 手动 | 适合调试，不适合日常自动更新 |

### 若仍想用「连接 Git」（可选排查）

1. GitHub **组织 Settings → GitHub Apps** → 安装 **Cloudflare Workers and Pages**，授权 **notionnext-org/NotionNext**。  
2. 组织 **Third-party access** 策略允许该 App。  
3. Cloudflare 侧用有 **组织仓库访问权** 的账号登录并重新授权 GitHub。

多数情况下不如直接使用上文 **Actions 方案**。

---

## 本地开发与构建

```bash
yarn
yarn docs:site:dev      # http://localhost:5173
yarn docs:site:build    # 输出 .vitepress/dist
yarn docs:site:preview
```

本地手动上传（与 Actions 相同命令）：

```bash
yarn docs:site:build
npx wrangler pages deploy .vitepress/dist --project-name=notionnext-docs
```

需先 `npx wrangler login`。

---

## Cloudflare「连接 Git」参考（个人仓库）

| 配置项 | 值 |
| --- | --- |
| 构建命令 | `yarn install && yarn docs:site:build` |
| 输出目录 | `.vitepress/dist` |
| Node | `22` |

组织仓库更建议用上文 **Actions** 流程。

---

## 发布范围

见 `.vitepress/config.mts`：在线站发布 `user-guide/`、`developer/`、`community/` 及根目录主要入口页；根目录 README 作为仓库目录说明不进入 VitePress。

## 文档评论（Giscus，可选）

构建时注入环境变量后，教程页底显示 **文档反馈**（同步到 GitHub Discussions）：

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| `VITE_GISCUS_REPO_ID` | Secret | `R_kgDOGHdxTw`（`notionnext-org/NotionNext`） |
| `VITE_GISCUS_CATEGORY_ID` | Secret | `DIC_kwDOGHdxT84CBR2I`（Discussions 分类 **General**） |
| `VITE_GISCUS_ENABLED` | Variable | 设为 `false` 可关闭评论区 |

组织仓库 Actions 部署时通常已在 GitHub Secrets 配好；详见 [maintain-docs.md](../maintain-docs.md) 与根目录 `.env.docs.example`。

## 相关

- [WEBSITE.md](../WEBSITE.md)  
- [cloudflare-pages.md](./cloudflare-pages.md) — 博客 `yarn export` 静态站
