# RFC: 支持 Notion 选项卡块

- **作者**: @RHZHZ
- **日期**: 2026-08-01
- **状态**: 已实现（待评审）
- **关联 Issue**: https://github.com/notionnext-org/NotionNext/issues/3948

## 摘要

为 NotionNext 增加 Notion 原生选项卡块的渲染支持，使文章中用于多版本、原文译文、方案对比等场景的选项卡内容可以在站点前台正常展示和切换。

实现建议采用数据适配加自定义组件的方式：在 Notion blockMap 格式化阶段识别选项卡块，将其标记为 NotionNext 内部可识别的特殊 embed，再由现有 `NotionEmbed` 扩展点分流到 `NotionTabs` 组件渲染。

## 动机

Notion 已新增选项卡能力，作者可以在同一块区域内通过顶部标签切换不同内容。当前 NotionNext 使用 `react-notion-x@7.10.0` 渲染正文，该版本对未知 block type 会输出 `Unsupported block type ...` 并渲染空内容，导致选项卡块在站点中不可用。

该问题影响所有主题，因为正文最终都复用 `components/NotionPage.js`。因此实现应位于 Notion 数据格式化和通用 Notion 组件层，而不是逐个主题补丁。

## 背景与约束

- `components/NotionPage.js` 直接将 `post.blockMap` 传给 `NotionRenderer`。
- `react-notion-x` 的 `components` 覆盖点只支持既有组件，如 `Code`、`Collection`、`Embed`、`Quote` 等，没有通用 `UnknownBlock` 或 `Tab` 扩展点。
- `react-notion-x` 的 block 分发逻辑是硬编码 `switch (block.type)`，未知类型会渲染空节点。
- `styles/notion.css` 是当前项目覆盖和扩展 Notion 渲染样式的统一入口。
- Notion 官方 Block 文档说明 `tab` block 的直接子节点是 paragraph，paragraph 标题作为标签文本，paragraph 的子节点作为标签页内容。

## 方案

### 提议

新增一个项目内部选项卡渲染链路：

1. 在 `lib/db/notion/getPostBlocks.js` 的 `formatNotionBlock()` 中识别 Notion 选项卡块。
2. 保留原始 `content` 层级，只将选项卡容器 block 转换为特殊 embed：
   - `type = 'embed'`
   - `format.embed_variant = 'notion_tabs'`
   - `format.notion_next_original_type = 原始类型`
3. 在 `components/NotionEmbed.js` 中优先判断 `embed_variant === 'notion_tabs'`，命中时渲染 `NotionTabs`，否则沿用现有 iframe embed 逻辑。
4. 新增 `components/NotionTabs.js`：
   - 通过 `useNotionContext()` 获取 `recordMap`。
   - 使用当前 block 的 `content` 作为 tab item id 列表。
   - 每个 tab item 从 `properties.title` 提取标签文案。
   - 当前激活面板渲染该 tab item 的子内容。
   - 提供 `role="tablist"`、`role="tab"`、`role="tabpanel"` 与 `aria-selected`，保证基础可访问性。
5. 在 `styles/notion.css` 中新增 `.notion-tabs-*` 样式，保证所有主题共享。


### 实现记录

当前实现已落地在通用正文渲染链路，不依赖具体主题：

- `lib/db/notion/getPostBlocks.js` 在 `formatNotionBlock()` 中识别 `tab`、`tabs` 容器，并转换为 `embed`。
- `components/NotionEmbed.js` 优先分流 `format.embed_variant === 'notion_tabs'`，避免进入普通 iframe embed 的 source 校验。
- `components/NotionTabs.js` 从 `useNotionContext()` 读取 `recordMap`，将容器 block 的 `content` 解析为 tab item 列表。
- `styles/notion.css` 提供 `.notion-tabs-*` 通用样式，覆盖浅色、深色和横向滚动场景。

转换后的内部 block 形态：

```js
{
  id: 'tabs-block-id',
  type: 'embed',
  content: ['tab-item-a', 'tab-item-b'],
  format: {
    embed_variant: 'notion_tabs',
    notion_next_original_type: 'tab'
  }
}
```

### 真实数据结构

本地页面 `http://localhost:3000/article/notion-tabs-test` 返回的 Notion 私有 API 结构与官方文档略有差异：

- 容器 block type 为 `tab`。
- 容器 `content` 指向多个 `text` 子块，而不是 `paragraph`。
- 每个 tab item 的 `properties.title` 是标签文本，例如 `是`、`不是`、`选项卡 3`。
- 每个 tab item 的 `content` 指向该标签页正文子块。

示意结构：

```text
page
└─ tab
   ├─ text title="是"
   │  ├─ text title="阿松大现在才"
   │  └─ text
   ├─ text title="不是"
   │  ├─ text title="123123"
   │  └─ text
   └─ text title="选项卡 3"
      ├─ text title="213123123"
      ├─ text
      └─ text title="123213213"
```

因此首版兼容策略以 `tab/tabs` 容器 + `content` 子块链路为准，标签项不强依赖具体 block type，只要能从 `recordMap.block[id]` 读取到 block 即可。

### 组件职责

`NotionTabs` 的职责保持收敛：

- 只负责 tab list、激活状态、键盘切换和 panel 容器。
- 不复制 `react-notion-x` 的 block 分发逻辑。
- panel 中逐个渲染 active tab item 的子 block，而不是渲染 tab item 本身，避免标签标题在内容区重复出现。
- 继续把 `recordMap`、`components`、`mapPageUrl`、`mapImageUrl` 等上下文传回 `NotionRenderer`，保证嵌套内容继续使用站点已有渲染配置。

### 交互设计

- 默认激活第一个有效 tab item。
- 点击 tab button 切换当前 panel。
- 支持 `ArrowLeft`、`ArrowRight`、`Home`、`End` 键切换并移动焦点。
- 使用 `role="tablist"`、`role="tab"`、`role="tabpanel"`、`aria-selected`、`aria-controls` 和 `aria-labelledby` 提供基础可访问性。
- 未激活 panel 当前不保留在 DOM 中，减少重复渲染和复杂状态同步。

### 数据兼容策略

Notion 私有 API 与官方 API 的 block type 命名可能存在差异。实现时应兼容以下形态：

- 容器类型：`tab`、`tabs`、后续发现的等价类型。
- 标签项类型：`paragraph`、`text`。
- 标签文本：优先读取 `properties.title`。
- 标签图标：若私有 API 中存在 `format.page_icon` 或等价字段，可以作为后续增强；首版不依赖图标能力。

如果某个标签项没有标题，使用 `Tab 1`、`Tab 2` 等稳定 fallback。

### 渲染策略

`NotionTabs` 不应复制 `react-notion-x` 的完整 block 分发器。为保持 KISS 和 DRY，建议复用 `NotionRenderer` 渲染单个 tab item 或其子内容。

推荐结构：

```jsx
<div className="notion-tabs">
  <div className="notion-tabs-list" role="tablist">
    <button role="tab" aria-selected={active}>...</button>
  </div>
  <div className="notion-tabs-panel" role="tabpanel">
    <NotionRenderer recordMap={recordMap} blockId={activeTabId} ... />
  </div>
</div>
```

为避免渲染标签项标题重复出现在内容区，可以在渲染 active tab 时构造一个轻量 recordMap 副本，将 active tab item 的 `properties.title` 临时移除，或只渲染 active tab item 的 `content` 子块。优先选择后者，减少对数据结构的修改。

### 样式原则

- 标签栏支持横向滚动，避免移动端溢出。
- 默认激活第一个有效标签。
- 保持与 `react-notion-x` 浅色/深色模式类名兼容。
- 不引入新的设计系统或主题配置。
- 不添加全局配置开关，除非后续维护者要求。

## 备选方案

### 方案 A：升级 `react-notion-x`

优点是可以减少本项目自定义代码。缺点是当前无法确认新版本已支持 Notion tabs，且依赖升级会影响大量正文渲染路径，PR 风险较高。

结论：不作为首选。

### 方案 B：修改或复制 `react-notion-x` 的 Block 分发器

优点是可以直接支持新 block type。缺点是会引入较大的维护成本，未来依赖升级容易冲突，也违背 DRY。

结论：不采用。

### 方案 C：将 tabs 降级为 toggle 或普通文本

优点是实现简单。缺点是用户无法获得 issue 期望的选项卡切换体验，多版本和原文译文对比场景体验明显下降。

结论：仅可作为失败兜底，不作为主要方案。

## 兼容性

- 不引入破坏性变更。
- 不新增环境变量。
- 不要求用户修改 Notion 数据库字段。
- 不要求主题适配，所有主题通过 `NotionPage` 统一获得支持。
- 旧文章和普通 embed 不受影响。

潜在影响点：

- 如果 Notion 私有 API 返回的 tabs 结构与官方文档不同，首版需要根据真实 recordMap 补充兼容分支。
- 如果某些标签页内容中包含需要全页面上下文的块，单独渲染子内容时要确保 `recordMap`、`mapPageUrl`、`mapImageUrl` 仍被正确传递。

## 文档与测试

### 测试

建议新增或更新：

- `__tests__/lib/db/notion/getPostBlocks.test.js`
  - 验证 `tab` 或 `tabs` 容器会被转换为 `embed + notion_tabs`。
  - 验证 `content` 不丢失。
  - 验证普通 `embed` 不受影响。
- `__tests__/components/NotionTabs.test.js`
  - 渲染多个标签按钮。
  - 默认展示第一个标签页内容。
  - 点击第二个标签后展示对应内容。
  - 空标题使用 fallback。

### 手动验证

建议使用包含 Notion 原生选项卡块的测试页面验证：

- 页面无 `Unsupported block type tab/tabs` 控制台日志。
- 首屏正常展示标签按钮与第一个标签页内容。
- 点击标签可以切换内容。
- 移动端标签栏不溢出布局。
- 深色模式下按钮与面板可读。


### 当前验证结果

已完成的自动化验证：

```bash
yarn jest --testMatch "**/__tests__/**/*.test.js" --runTestsByPath "__tests__\\lib\\db\\notion\\getPostBlocks.test.js" "__tests__\\components\\NotionEmbed.test.js" "__tests__\\components\\NotionTabs.test.js" --runInBand
yarn lint
```

结果：

- `__tests__/lib/db/notion/getPostBlocks.test.js` 覆盖 `tab`、`tabs` 容器转换为 `embed + notion_tabs`，并确认 `content` 不丢失。
- `__tests__/components/NotionEmbed.test.js` 覆盖 `notion_tabs` 分流，确认无 iframe source 时不会被普通 embed 逻辑吞掉。
- `__tests__/components/NotionTabs.test.js` 覆盖标签渲染、默认首个 panel、点击切换、空标题 fallback 和富文本标题展平。
- `yarn lint` 通过；输出为项目既有 warning，无新增 error。

已完成的本地页面验证：

- 测试页面：`http://localhost:3000/article/notion-tabs-test`。
- SSR 输出包含 `.notion-tabs` 与 `.notion-tabs-tab`。
- SSR 输出包含三个标签：`是`、`不是`、`选项卡 3`。
- SSR 输出包含首个标签页正文 `阿松大现在才`。
- SSR 输出不再包含原始 `"type":"tab"`。
- 页面 HTML 未出现 `Unsupported block type tab`。

受限项：浏览器插件在当前 Windows 沙盒中启动失败，因此未完成截图级浏览器自动化验证；本轮以 SSR 检查和组件交互测试作为验证依据。

### 用户文档

如实现后需要面向用户说明，可在 `docs/user-guide/notion/` 下新增短文档，说明 Notion 原生选项卡块已支持，以及推荐使用场景。

## 实施顺序

1. [x] 新增数据层识别逻辑和单元测试。
2. [x] 新增 `NotionTabs` 组件和组件测试。
3. [x] 在 `NotionEmbed` 中增加最小分流。
4. [x] 添加 `styles/notion.css` 样式。
5. [x] 跑目标单测和 `yarn lint`。
6. [x] 使用真实页面做 SSR 输出验证。
7. [ ] 使用浏览器截图验证；当前受 Windows 沙盒中的 Browser 插件启动失败限制。

## 开放问题

- [x] 需要拿到真实 Notion 私有 API recordMap，确认容器类型到底是 `tab`、`tabs` 还是其他命名。当前样例确认为 `tab` 容器，兼容实现保留 `tabs`。
- [ ] 是否需要首版支持标签图标。
- [x] 是否需要键盘左右方向键切换标签。当前已支持 `ArrowLeft`、`ArrowRight`、`Home`、`End`。
- [ ] 是否要让未激活标签页内容保留在 DOM 中以支持浏览器搜索和锚点跳转。

## 讨论记录

- Issue: https://github.com/notionnext-org/NotionNext/issues/3948
- Notion Block 文档: https://developers.notion.com/reference/block
