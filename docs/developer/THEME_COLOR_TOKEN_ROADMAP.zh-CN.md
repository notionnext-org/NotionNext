# 主题色变量与调色板开发计划

本文记录 `#3393` 的实施计划：将主题色号命名规范化、调色板化，并让主题颜色配置可以通过 Notion Config、环境变量或主题配置文件覆盖。

## 目标

- 所有内置主题逐步从 Tailwind 固定色名迁移到语义色变量，并最终具备可独立调整的浅色、深色两套调色板。
- 每个主题维护自己的颜色配置键，例如 `HEO_COLOR_PRIMARY`、`HEXO_COLOR_PRIMARY`；已有成熟模型可保留语义明确的旧键，例如 `FUWARI_THEME_COLOR_HUE`。
- 每个主题在 `style.js` 中把配置键映射为主题作用域 CSS 变量。
- 主题切换工具展示当前主题调色板，帮助用户复制配置键和值。
- 用户文档列出每个主题支持的颜色配置项。
- 发布新版本时在 changelog 中说明迁移范围和兼容策略。

## 非目标

- 不一次性重写所有主题。
- 不用 `#theme-x .bg-indigo-600` 这类覆盖方式作为长期方案。
- 不要求所有主题暴露完全相同数量的扩展颜色，但必须满足下文的基础色契约。
- 不立即强制引入全局 `THEME_COLOR_*`，先以主题独立配置为主。

## 命名规范

主题颜色配置使用主题前缀：

```js
HEO_COLOR_PRIMARY
HEO_COLOR_PRIMARY_HOVER
HEO_COLOR_PRIMARY_TEXT
HEO_COLOR_ACCENT
HEO_COLOR_BG
HEO_COLOR_CARD
HEO_COLOR_BORDER
HEO_COLOR_TEXT
HEO_COLOR_TEXT_SECONDARY
```

CSS 变量使用小写主题前缀，且只挂载在当前主题根节点：

```css
#theme-heo {
  --heo-color-primary: ...;
  --heo-color-primary-hover: ...;
  --heo-color-bg: ...;
}
```

组件使用语义变量：

```jsx
className="bg-[var(--heo-color-primary)] text-[var(--heo-color-primary-text)]"
```

## 最小调色板

| 语义 | 用途 |
| --- | --- |
| `PRIMARY` | 主按钮、选中态、重点链接 |
| `PRIMARY_HOVER` | 主色 hover |
| `PRIMARY_TEXT` | 主色背景上的文字 |
| `ACCENT` | 辅助强调、徽标、装饰 |
| `BG` | 页面背景 |
| `CARD` | 卡片、面板、浮层 |
| `BORDER` | 边框、分割线 |
| `TEXT` | 标题和正文 |
| `TEXT_SECONDARY` | 摘要、元信息、弱化文字 |

所有内置主题的浅色和深色模式都至少实现 `PRIMARY`、`BG`、`CARD`、`TEXT`、`BORDER`；主题实际使用了次级文字、强调色或 hover 色时，也必须分别暴露对应 token。深色配置键统一追加 `_DARK`，例如 `HEO_COLOR_BG_DARK`。

manifest 中出现配置项不等于完成支持。对应 CSS 变量必须被主题组件真实消费，控制台修改后立即生效；浅色和深色值必须相互独立，切换模式不能串用另一组色号。默认值必须与迁移前主题视觉一致。

## 调色板元数据

调色板工具需要读取每个主题支持的颜色项。推荐最小结构：

```js
{
  key: 'HEO_COLOR_PRIMARY',
  cssVar: '--heo-color-primary',
  label: '主色',
  defaultValue: '#4f46e5'
}
```

实现位置待第一批代码落地时确认，优先选择改动面最小的位置：

- `conf/themeSwitch.manifest.js`：适合与主题切换面板一起读取。
- 独立 registry：适合后续色板字段较多时拆分。

## 阶段计划

### Phase 1：文档和规范

- [x] 在长期计划中记录 Tailwind 快速开发到语义色变量的演进。
- [x] 在主题迁移指南中加入颜色 token 规则。
- [x] 在 `#3393` 回复完整实施计划。
- [ ] 在用户向主题文档中加入“主题调色”总说明。

### Phase 2：代表主题验证

- [x] `heo` 增加 `HEO_COLOR_*` 默认配置。
- [x] `heo/style.js` 映射主题作用域 CSS 变量。
- [x] 替换 `heo` 中主色、强调色、背景、卡片、边框、文字的明显硬编码用法。
- [ ] 保留视觉默认值，避免现有站点升级后明显变样。

### Phase 3：兼容已有主题色

- [x] `hexo` 保留 `HEXO_THEME_COLOR` 兼容。
- [x] `hexo` 增加 `HEXO_COLOR_PRIMARY` 等新键。
- [x] `fuwari` 对齐单主色主题调色板模型。

### Phase 4：主题切换工具调色板

- [x] 定义调色板元数据读取方式。
- [x] 在主题切换面板加入调色板入口。
- [x] 展示配置键、语义名称、色块、当前值。
- [x] 支持复制配置键和值。
- [ ] 支持本地实时预览，不强制立即写入远端配置。

### Phase 5：扩展到全部主题

- 已完成扩展样本：`heo`、`hexo`、`fuwari`、`next`、`simple`、`matery`、`medium`、`nobelium`、`plog`、`commerce`、`gitbook`、`typography`、`claude`、`fukasawa`、`nav`、`magzine`、`game`、`movie`、`photo`、`example`、`thoughtlite`、`starter`、`proxio`、`landing`、`endspace`。
- [ ] 按主题逐个迁移色号。
- [ ] 所有内置主题补齐浅色、深色两套基础色契约。
- [ ] 每个主题保留自己的默认视觉风格。
- [ ] 每个主题文档列出支持的颜色配置。
- [ ] 主题总览标记调色板支持状态。

### Phase 6：验证与发布

- [ ] 运行最小必要测试和静态检查。
- [ ] 对代表主题做桌面与移动端视觉 smoke check。
- [x] 更新 changelog。
- [ ] 发布新版本。

## 迁移顺序建议

1. `heo`：多色板代表主题。
2. `hexo`：已有 `HEXO_THEME_COLOR`，优先做兼容迁移。
3. `fuwari`：单主色代表主题。
4. 后续新增主题必须在首版就声明 `*_COLOR_*` 与 manifest 调色板。
5. 其他主题按使用频率和改动风险推进。

## 验收标准

- 新增主题不再引入无语义的固定业务色名。
- 已迁移主题的主要品牌色可以通过 Notion Config 覆盖。
- 调色板工具能展示当前主题支持的色号。
- 所有内置主题的调色板都至少展示两套 `PRIMARY`、`BG`、`CARD`、`TEXT`、`BORDER`，且每项实时生效。
- 浅色和深色配置互不串色，主题默认配置与迁移前视觉一致。
- 用户能从文档知道配置键、默认值和影响区域。
- 旧配置不直接失效。
