# PWA 安装入口

NotionNext 可以为博客开启 PWA 安装能力。开启后，Android Chrome 会在访问博客首页且满足 HTTPS、固定 manifest、service worker 等条件时显示「安装应用」入口；用户安装后，桌面会出现使用站点图标和站点名称的快捷方式。

## 开启方式

推荐在 Notion Config 表中新增配置：

| key | value | 说明 |
| --- | --- | --- |
| `PWA_ENABLE` | `true` | 开启 PWA 安装入口 |
| `PWA_THEME_COLOR` | `#111827` | Android Chrome 状态栏和安装主题色 |
| `PWA_NAME` | `Tangly 的学习笔记` | 备用覆盖项；默认读取站点标题，通常不用单独配置 |
| `PWA_SHORT_NAME` | `Tangly` | 备用覆盖项；默认读取站点标题，通常不用单独配置 |
| `PWA_ICON` | `/favicon.png` | 页面图标（apple-touch-icon / favicon 回退）；**不控制 manifest 安装图标**，manifest 默认使用内置尺寸合规的 PNG |
| `PWA_ICON_192` | `/my-icon-192.png` | 可选：覆盖 manifest 192×192 普通图标；须提供真实 192×192 尺寸的资源 |
| `PWA_ICON_512` | `/my-icon-512.png` | 可选：覆盖 manifest 512×512 普通图标；须提供真实 512×512 尺寸的资源 |
| `PWA_ICON_192_MASKABLE` | `/my-icon-192-maskable.png` | 可选：覆盖 manifest 192×192 maskable 图标；资源应留有足够安全边距 |
| `PWA_ICON_512_MASKABLE` | `/my-icon-512-maskable.png` | 可选：覆盖 manifest 512×512 maskable 图标；资源应留有足够安全边距 |

也可以在部署平台环境变量中开启：

```bash
NEXT_PUBLIC_PWA_ENABLE=true
NEXT_PUBLIC_PWA_THEME_COLOR=#111827
```

配置完成后重新部署站点。manifest 固定输出到 `/manifest.json`，默认指向首页 `/`；名称和描述优先使用站点信息，安装图标默认使用内置尺寸合规的 PNG，可通过 `PWA_ICON_192`、`PWA_ICON_512` 及对应 maskable 配置项覆盖。静态导出时，构建过程会把这些站点信息写入固定 manifest 文件。

## 图标要求

### Manifest 安装图标（默认）

默认情况下，manifest 使用项目内置的四个尺寸合规的 PNG 图标，无需任何配置：

| 内置资源 | 尺寸 | Purpose |
| --- | --- | --- |
| `/icon-192.png` | 192×192 | `any` |
| `/icon-512.png` | 512×512 | `any` |
| `/icon-192-maskable.png` | 192×192 | `maskable` |
| `/icon-512-maskable.png` | 512×512 | `maskable` |

如需使用自定义图标覆盖 manifest，请配置 `PWA_ICON_192`、`PWA_ICON_512`、`PWA_ICON_192_MASKABLE`、`PWA_ICON_512_MASKABLE`，并确保提供的资源尺寸与声明一致。

### 页面图标（PWA_ICON）

`PWA_ICON` 仅用于 `<link rel="apple-touch-icon">` 等页面元数据，**不会改变 manifest 中的安装图标**。默认读取站点图标（`siteInfo.icon`），通常无需单独配置。

### 通用要求

- 优先使用正方形 PNG 图标，建议至少 512×512。
- 如果使用相对路径，请把文件放在 `public` 目录下，例如 `public/favicon.png` 对应 `/favicon.png`。
- 如果使用远程 URL，请保持图标地址能被公网访问。

## Android Chrome 安装

1. 用 Android Chrome 打开你的博客首页。
2. 等页面加载完成后，打开 Chrome 右上角菜单。
3. 点击「安装应用」或「添加到主屏幕」。
4. 确认安装后，桌面会出现站点快捷方式。

如果没有出现安装入口，请先检查：

- 站点是否使用 HTTPS。
- `PWA_ENABLE` 是否为 `true`。
- 浏览器能否访问 `/manifest.json` 和 `/sw.js`。
- `/manifest.json` 中的图标地址是否能正常打开。

## 注意事项

- PWA 开关默认关闭，不会影响未开启站点。
- 该功能用于安装博客快捷方式，不会把站点变成离线应用；当前 service worker 只用于满足安装条件和后续扩展。
- 如果关闭 `PWA_ENABLE`，新访问的浏览器不会继续注册 service worker；已经安装到桌面的快捷方式需要用户自行卸载。
