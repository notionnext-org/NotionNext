> 尽量按此模板PR内容，或粘贴相关的ISSUE链接。

## 已知问题

1. (示例)版本号管理不规范
   - 版本号直接写在环境变量中，容易出错
   - 多处维护版本号，可能不一致

## 解决方案

1. (示例)将版本号管理从 `.env.local` 迁移到 `package.json`
   - 统一从 `package.json` 读取版本号
   - 使用 IIFE 优雅处理版本号获取逻辑
   - 保持向后兼容，支持环境变量覆盖

## 改动收益

1. (示例)更规范的版本管理
   - 统一从 `package.json` 读取
   - 保持与 npm 生态一致
   - 减少人为错误

## 具体改动

1. （示例）`blog.config.js`
   - 移除原有的静态版本号配置
   - 在文件末尾添加动态版本号获取逻辑
   - 保持向后兼容，优先使用环境变量
   - 添加错误处理和默认值

## 测试确认

- [ ] 本地开发环境测试通过
- [ ] 生产环境构建测试通过
- [ ] （如适用）版本号正确显示
- [ ] （如适用）环境变量配置正常工作

## 用户文档（`docs/user-guide/` / `docs/developer/`）

如果本 PR 新增或修改了站长会使用的功能、主题配置、环境变量、Notion Config 键、插件开关、部署步骤、默认行为或可见 UI 交互，请同步更新 `docs/user-guide/` 或 `docs/developer/` 中对应说明，并在下方勾选已完成项。

只有纯内部重构、测试、CI、依赖维护、拼写修正等不改变站长使用方式的改动，才可以勾选「不适用」。

- [ ] 不适用（无文档改动）
- [ ] 已按 [维护工作流](https://github.com/notionnext-org/NotionNext/blob/main/docs/user-guide/MAINTENANCE_WORKFLOW.md) 自检
- [ ] 路径符合 `docs/user-guide/` 目录约定
- [ ] 已更新 [user-guide/README.md](https://github.com/notionnext-org/NotionNext/blob/main/docs/user-guide/README.md)（新增/移动文章时）
- [ ] 已更新 [ARTICLE_INDEX.md](https://github.com/notionnext-org/NotionNext/blob/main/docs/user-guide/ARTICLE_INDEX.md)（新 slug 或路径变更时）
- [ ] 环境变量名与 `conf/*.config.js` 一致（若文档涉及配置）
- [ ] 示例中无真实 Token、`.env`、私有 ID
- [ ] 保留或更新了「原文链接」（若源自 docs.tangly1024.com）

文档说明（可选）：对应官方 slug / URL、是否与功能 PR 配套
