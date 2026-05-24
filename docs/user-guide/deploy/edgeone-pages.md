# 腾讯云 EdgeOne Pages 部署

> 完整排错见仓库 [DEPLOYMENT.md · EdgeOne Pages](https://github.com/notionnext-org/NotionNext/blob/main/DEPLOYMENT.md#腾讯云-edgeone-pages)

## 环境要求

| 项 | 说明 |
| --- | --- |
| Node | 与仓库根目录 **`.nvmrc` 完全一致**（当前为 `20.18.0`） |
| 包管理 | `yarn install` → `yarn build` 或 `yarn export` |
| 必配变量 | `NOTION_PAGE_ID` 等（见 [配置站点](../config-site.md)） |

EdgeOne 会按 `.nvmrc` 切换 Node。若日志出现 **`Failed to switch to Node.js 20.20.0`** 等，说明仓库过旧或控制台所选版本与 `.nvmrc` 不一致——请拉取最新 `main`，并在 **项目设置 → Node.js 版本** 中选择与 `.nvmrc` 相同的补丁号（如 `20.18.0`）。

## 推荐：框架预设「Next SSG」

部分用户在默认 Pages 构建流程下，Node 切换成功后会在 `yarn install` 阶段遇到 **`ENOSPC: no space left on device`**（构建机 `/dev/shm` 或磁盘不足）。

若出现该情况，可在 EdgeOne 控制台尝试将**框架预设**改为 **Next SSG**（或平台提供的 Next 静态导出类预设）后重新部署。该方式通常由平台优化安装与构建路径，占用更小，社区反馈可成功完成部署。

仍失败时请结合下方 ENOSPC 小节与 [构建性能调优](./build-tuning.md)。

## `yarn install` 报 ENOSPC

日志中若已有 **`Now, we're on node version v20.18.0`**，则 Node 版本已正常，失败原因是**构建机空间不足**，与 NotionNext 代码无关。

可尝试（按顺序）：

1. 改用上文 **Next SSG** 预设，或关闭「依赖/构建缓存」后无缓存重构建一次  
2. 向 EdgeOne / 腾讯云工单说明 `yarn install` 阶段 ENOSPC，询问构建盘配额  
3. 若平台支持，设置 `YARN_CACHE_FOLDER` 到空间更大的路径（以官方文档为准）  
4. 在 GitHub Actions 等环境完成 `yarn build` / `yarn export`，仅将静态产物同步到 EdgeOne 托管

## 构建超时

Notion 拉取慢导致单页超时，请参阅 **[构建性能调优](./build-tuning.md)**，例如：

```env
BUILD_PREFETCH_ENABLED=false
STATIC_PAGE_GENERATION_TIMEOUT=600
```

## 相关 Issue

- [#4014](https://github.com/notionnext-org/NotionNext/issues/4014) — EdgeOne Node 版本与 ENOSPC 排错（已在 `main` 将 `.nvmrc` 对齐 `20.18.0`）
