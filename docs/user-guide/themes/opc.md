# Opc 主题

> 主题 ID：`opc` · 预览：[preview.tangly1024.com/?theme=opc](https://preview.tangly1024.com/?theme=opc)

## 主题预览

![Opc 主题预览](/images/themes-preview/opc.webp)

## 简介

Opc 是面向个人主页、一人公司和独立开发者的入口主题。首页突出个人品牌、主项目、长期记录，以及“任务文件 → 产物 → 验收 → 返工”的 AI 生产流水线。

## 主题特性

- **定位**：个人主页 / 一人公司入口。
- **主路径**：保留 NotionNext 项目和长期记录两个主要按钮。
- **流水线展示**：说明 AI 不再模拟公司部门开会，而是作为市场调研、研发执行、视觉素材、发布运营、QA 验收等能力入口被临时调用。
- **任务契约**：强调每轮先写任务文件、产物路径和验收标准；执行 AI 一次只领取一个任务，完成后交付文件并结束。
- **验证优先**：先买/接入成熟方案，不能买再复制成熟竞品，最后才自研；没有数据验证前不开发大功能。
- **近况模块**：展示最近推进的游戏、小说、短剧、工具产品、流量媒体、AI 企业工作流和量化交易方向。
- **配色配置**：支持浅色和深色基础色变量。
- **信息配置**：支持在主题控制台调整首页主要文案与链接。

## 适用场景

- 独立开发者个人主页
- 一人公司入口页
- AI 任务流水线展示页
- 个人品牌和长期记录入口

## 推荐展示文案

如果你想把 Opc 用作一人公司的公开主页，可以把默认文案改成：

```text
副标题：一人公司的 AI 任务流水线实验室
主介绍：我把 AI 当作能力入口，而不是模拟公司部门开会；用任务文件、产物路径和验收标准，运行内容、产品与交易实验。
卡片标题：可验收的 AI 生产流水线
卡片说明：每轮只推进一个最小可验证目标：先买或接入成熟方案，再复制成熟做法，最后才自研；执行 AI 只领取一张任务单，交付文件后结束。
近况说明：当前所有方向都按 ready、running、review、done 的流水线推进，只统计有效产物、验收结果和真实业务数据。
```

## 启用方式

1. Notion Config 表：`THEME` = `opc`
2. 环境变量：`NEXT_PUBLIC_THEME=opc`
3. `blog.config.js` 的 `THEME`

## 配置说明

配置文件：[themes/opc/config.js](https://github.com/notionnext-org/NotionNext/blob/main/themes/opc/config.js)

也可以在 **Notion Config** 表中填写同名键覆盖默认值。

<!-- theme-config-table -->

### 常用信息配置

| 配置键 | 说明 |
| --- | --- |
| `OPC_NAME` | 顶部名称 |
| `OPC_KICKER` | 首屏标签 |
| `OPC_TITLE` | 主标题 |
| `OPC_SUBTITLE` | 副标题 |
| `OPC_DESCRIPTION` | 主介绍 |
| `OPC_PRIMARY_TEXT` | 主按钮文字 |
| `OPC_PRIMARY_URL` | 主按钮链接 |
| `OPC_SECONDARY_TEXT` | 副按钮文字 |
| `OPC_SECONDARY_URL` | 副按钮链接 |
| `OPC_STATUS_TEXT` | 状态标签 |
| `OPC_CARD_TITLE` | 工作流卡片标题 |
| `OPC_CARD_DESCRIPTION` | 工作流说明 |
| `OPC_NOW_TITLE` | 近况标题 |
| `OPC_NOW_DESCRIPTION` | 近况说明 |
| `OPC_NOW_ITEMS` | 近况标签，英文逗号分隔 |

### 配色配置

Opc 支持主题控制台调整浅色和深色基础色：

| 配置键 | 说明 |
| --- | --- |
| `OPC_COLOR_PRIMARY` | 浅色主色 |
| `OPC_COLOR_BG` | 浅色页面背景 |
| `OPC_COLOR_CARD` | 浅色卡片背景 |
| `OPC_COLOR_TEXT` | 浅色主文字 |
| `OPC_COLOR_TEXT_SECONDARY` | 浅色次级文字 |
| `OPC_COLOR_BORDER` | 浅色边框 |
| `OPC_COLOR_PRIMARY_DARK` | 深色主色 |
| `OPC_COLOR_BG_DARK` | 深色页面背景 |
| `OPC_COLOR_CARD_DARK` | 深色卡片背景 |
| `OPC_COLOR_TEXT_DARK` | 深色主文字 |
| `OPC_COLOR_TEXT_SECONDARY_DARK` | 深色次级文字 |
| `OPC_COLOR_BORDER_DARK` | 深色边框 |

<!-- /theme-config-table -->

## 相关

- [内置主题全览](./THEMES_CATALOG.md)
- [如何配置站点](../config-site.md)
