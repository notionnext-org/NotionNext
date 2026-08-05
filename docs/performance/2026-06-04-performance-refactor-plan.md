# 2026-06-04 性能重构推进计划

## 背景

4.10.0 已完成首轮主题渲染与 page-data 瘦身，但最新体检发现，生产构建阶段仍存在跨进程缓存锁竞争。问题表现为多个 Next 静态生成 worker 同时等待同一个 Notion 数据 key，旧策略在 30 秒后会绕过锁并重复执行昂贵的 Notion 数据生成任务，导致构建时间拉长、日志噪音变大，并增加 CI 不稳定风险。

本阶段目标是在不改变现有主题、配置插件和用户可见功能的前提下，先稳定构建与缓存基础，再继续推进主题运行时性能优化。

## 总体优先级

### P0 构建缓存与锁稳定性

- 构建阶段不再使用 30 秒超时后并发绕过锁的策略。
- 文件锁支持 `bypass`、`wait`、`throw` 三种超时策略，默认保持兼容。
- 构建缓存调用显式使用 `wait` 策略，优先等待锁持有者写入缓存。
- 锁释放或等待方接管前，增加缓存二次读取，降低锁释放瞬间的竞态重算。
- 文件缓存写入改为临时文件 + rename 的原子写入，避免读到半成品 JSON。

### P1 生产基线与预算验收

- 每次 P0 调整后必须跑 `yarn build`。
- 构建成功后跑 `yarn perf:page-data`，确认 page-data budget 不回退。
- 后续恢复全主题生产 Lighthouse 审计，并更新主题性能基线。

### P2 主题首屏 LCP 与图片

- 优先主题：`landing`、`magzine`、`matery`、`hexo`、`next`。
- 明确首屏图片尺寸、`sizes`、priority 边界。
- 非首屏图片保持 lazy，不抢首屏加载优先级。

### P3 JS/CSS 瘦身

- 优先检查 `PrismMac`、`NotionPage`、代码高亮、搜索标记和文章页专用逻辑。
- 继续拆分主题专用、文章页专用、代码块专用模块。
- 清理所有主题共享但实际只被少数主题使用的 CSS/JS。

### P4 scroll/layout 运行时治理

- 优先主题：`next`、`hexo`、`heo`、`commerce`。
- 合并滚动监听，减少多组件重复读写 scroll 状态。
- 将同步布局读取改成 observer、缓存 ref 或 rAF 批处理。

### P5 DOM 与可访问性收尾

- 控制 `next`、`hexo` 的 DOM 规模。
- 继续修复 `typography`、`magzine` 的可访问性低分项。

## 本阶段已完成

- 新建性能优化分支：`codex/perf-build-cache-stability`。
- 修复 main 最新 CI 中 `convertInnerUrl` 测试对 `notion-utils` ESM 的直接依赖。
- 新增文件锁回归测试，覆盖：
  - `wait` 策略等待锁持有者缓存结果，不重复执行昂贵函数。
  - 默认数字 timeout 仍保持旧的 bypass 兼容行为。
- 第二次生产构建已完成，旧的 `ABSOLUTE TIMEOUT ... Bypassing lock` 为 0。
- `yarn perf:page-data` 通过，所有采样路由均未超过预算。

## 当前验收结果

- `yarn -s type-check`：通过。
- `yarn -s lint --file ...`：通过。
- `yarn -s test __tests__/lib/cache/file_lock.test.js --runInBand`：通过。
- `yarn -s build`：通过。
- `yarn -s perf:page-data`：通过。

本地 `convertInnerUrl` DOM 测试仍受当前 Windows 环境中 `canvas.node` 原生模块缺失影响，测试环境在进入断言前失败；CI 上原始失败点是 `notion-utils` ESM 解析，本阶段已通过测试内 mock 修复。

## 下一批建议

1. 增加构建阶段全站数据预热，让 `global_data` 与 `site` 在静态 worker 扩散前完成一次共享写入。
2. 统计构建日志中的 `extended waiting` 和 `acquired after extended wait`，将其降到接近 0。
3. 在生产构建稳定后恢复全主题 Lighthouse，重新排序 LCP、CLS、unused JS/CSS 的主题优先级。
4. 从 `next / hexo / heo / commerce` 开始治理 scroll/layout 热点。
