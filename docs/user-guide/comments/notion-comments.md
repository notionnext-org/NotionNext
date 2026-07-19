# NotionComments

NotionComments 使用一个 Notion 数据库保存评论，适合不想额外部署 Twikoo、Waline 等评论后端的站点。

这不是 Notion 页面右上角的官方评论区，而是通过 Notion API 写入你自己的评论数据库。访客只需要填写邮箱和评论内容，不需要登录 Notion。

## 适合谁使用

- 你已经在用 NotionNext，希望评论数据也保存在 Notion。
- 你不想维护 MongoDB、LeanCloud、独立评论服务或额外二级域名。
- 你能接受在 Notion 数据库中手动查看、删除或整理评论。

如果你需要后台审核、邮件通知、垃圾评论过滤、社交登录或头像系统，Twikoo、Waline、Artalk 仍然更合适。

> 部署限制：NotionComments 依赖本站的 `/api/notion-comments` 服务端接口，只支持 Vercel、Netlify、Zeabur、VPS、Node.js 服务等动态部署。使用 `yarn export` 生成纯静态站点时，没有服务端 API，不能使用这个插件。

## 为什么选择独立评论数据库

NotionComments 采用“方案 A”：用一个独立的 Notion 数据库保存公开站点评论。

这样做不是因为 Notion 没有原生评论功能，而是因为公开博客的评论和 Notion 工作区内部协作评论不是同一个场景。独立数据库更可控，也更适合给匿名访客或普通读者使用。

| 方案                   | 优点                                                                                | 限制                                                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 独立 Notion 评论数据库 | 访客不需要登录 Notion；字段可扩展；方便做审核、过滤、统计、迁移；也能复用到其他网站 | 不是 Notion 页面右上角的原生评论区，需要单独维护一个评论数据库                                                |
| Notion 原生页面评论    | 评论直接出现在文章对应的 Notion 页面中，站长可以在 Notion 内查看和回复              | API 能力受 Notion 限制；访客身份通常会变成 integration 身份；公开站点上的昵称、邮箱、审核、反垃圾仍要额外设计 |

因此当前推荐方案是独立评论数据库。它牺牲了一点“原生感”，换来更清晰的权限边界、更稳定的公开访客体验和更强的可控性。

## 为什么暂不使用 Notion 原生评论

Notion API 支持读取和创建页面评论，但它更适合工作区内部协作，不完全适合公开网站评论区：

- 访客不一定有 Notion 账号，也不应该为了评论被要求登录 Notion。
- 通过 API 写入时，评论通常代表 integration，而不是访客自己的 Notion 身份。
- 原生评论的部分能力受 API 限制，例如 resolved comments、选中文本范围讨论等能力不适合完整复刻成公开评论区。
- 公开网站常见的审核、垃圾评论处理、用户昵称、邮箱、统计、迁移，都更适合放在独立评论数据库中控制。

如果你的站点是内部知识库，读者都在同一个 Notion 工作区里，原生评论会更自然；如果你的站点面向公开访客，独立评论数据库更稳妥。

## 功能

- 文章评论和嵌套回复。
- 回复展开/收起。
- 评论列表加载更多。
- 昵称、邮箱识别和首字母头像。
- 可选审核状态：站长在 Notion 数据库里把 `Pending` 改成 `Approved` 后再展示。
- 基础反垃圾：长度限制、蜜罐字段、同一 IP 简单频率限制。
- 提交中、加载中、加载失败重试等基础交互。
- 多评论插件并存时，作为一个评论 Tab 显示。

## 准备 Notion 评论数据库

推荐直接复制这个评论数据库模板：
[Notion 评论数据库模板](https://tanghh.notion.site/398f93b9208b80bb9be8cdae6e2914d1?v=b0ef93b9208b83c9834d881b83dd1e34&source=copy_link)。

打开模板后，点击右上角的 `Duplicate` / `复制`，把它复制到你自己的 Notion 工作区。复制完成后，你就不需要再手动创建下面这些字段，只需要继续完成 Integration 授权和环境变量配置。

如果你想自己从零创建数据库，字段名称必须和下表完全一致：

| 字段        | 类型   | 说明                                      |
| ----------- | ------ | ----------------------------------------- |
| `PostId`    | Title  | 文章的 Notion 页面 ID，用来关联评论和文章 |
| `ParentId`  | Text   | 父评论 ID，一级评论留空                   |
| `Content`   | Text   | 评论正文                                  |
| `IpAddress` | Text   | 访客 IP，用于排查滥用                     |
| `Author`    | Email  | 访客邮箱，前缀会作为昵称显示              |
| `Level`     | Number | 回复层级                                  |

增强字段建议一起添加，复制模板的用户通常已经包含这些字段：

| 字段        | 类型   | 说明                                               |
| ----------- | ------ | -------------------------------------------------- |
| `Nickname`  | Text   | 访客填写的昵称，优先用于前台展示                   |
| `EmailHash` | Text   | 邮箱哈希，用于未来头像、会员识别或去重             |
| `Status`    | Select | 审核状态，建议选项为 `Approved`、`Pending`、`Spam` |
| `CreatedAt` | Date   | 评论提交时间                                       |
| `UserAgent` | Text   | 浏览器 User-Agent，用于排查垃圾评论                |

基础字段必须存在；增强字段是可选的。旧数据库不添加增强字段也能继续提交评论，只是不会启用昵称保存、审核状态和额外排查信息。

建议把这个数据库放在站点数据库之外，方便单独管理评论。

## 创建 Notion Integration

Integration 可以理解成“给 NotionNext 使用的机器人账号”。NotionNext 不能直接用你的 Notion 登录态访问数据库，必须通过这个 Integration Token 才能读写评论数据库。

> 提醒：Integration 不只是评论插件会用到的配置。它是把网站上的用户交互安全写回 Notion 数据的关键能力。评论、表单、反馈、订单、会员资料、用户权限等功能，未来都可以沿着这条链路扩展。先把评论跑通，相当于给站点打通了“用户行为 -> Notion 数据库”的第一条通道。

### 1. 新建连接

1. 打开 [Notion integrations](https://www.notion.so/my-integrations)。
2. 点击 `New integration` 或 `新建集成`。
3. 名称可以填写 `Notion_Comment`，方便以后识别。
4. 选择你的 Notion 工作区。
5. 类型选择内部集成或 Internal integration。
6. 保存后进入这个 integration 的管理页面。

### 2. 配置功能权限

在 integration 管理页的 `配置` 页面，找到 `功能` 区域。

内容功能建议这样勾选：

- 勾选 `读取内容`：用于读取评论数据库中的评论。
- 勾选 `插入内容`：用于把新评论写入评论数据库。
- `更新内容` 可选：当前基础评论功能不依赖它；如果以后要在站点侧编辑评论、标记审核状态，再开启它。

评论功能不要勾选：

- 不需要 `读取评论`。
- 不需要 `插入评论`。

这里使用的是独立 Notion 评论数据库，不是 Notion 页面右上角的原生评论功能，所以不需要给 integration 开启评论功能权限。权限越少越安全。

### 3. 复制访问令牌

在同一个 `配置` 页面找到 `集成令牌` 或 `访问令牌`。

1. 点击令牌输入框右侧的复制按钮。
2. 复制出来的值一般以 `secret_` 开头。
3. 把这个值保存为部署环境变量 `NOTION_TOKEN`。

注意：

- 不要把这个令牌发给别人。
- 不要写进 `blog.config.js`。
- 不要使用 `NEXT_PUBLIC_NOTION_TOKEN` 这种前端可见变量名。

### 4. 授权访问评论数据库

只有创建 integration 还不够，还必须把评论数据库共享给它。否则接口会报没有权限。

推荐做法：

1. 打开你前面创建的评论数据库页面。
2. 点击页面右上角 `...`。
3. 找到 `Connections` 或 `连接`。
4. 搜索并选择刚创建的 `Notion_Comment`。
5. 确认添加。

如果你在 integration 管理页的 `内容访问权限` 页面操作，也可以点击 `编辑权限`，搜索评论数据库所在页面或数据库，然后添加访问权限。建议只授权评论数据库，不要把整个工作区都授权给这个 integration。

### 5. 检查是否配置成功

配置完成后，应该满足：

- Integration 页面能看到访问令牌。
- `读取内容` 和 `插入内容` 已开启。
- 评论数据库已连接到这个 integration。
- 部署环境变量里已经配置 `NOTION_TOKEN` 和 `NOTION_COMMENT_DATABASE_ID`。

如果评论提交失败，最常见原因就是只创建了 integration，但忘记把评论数据库共享给它。

## 配置环境变量

在 Vercel、Netlify、Zeabur、服务器 `.env` 等部署环境中添加：

```bash
NEXT_PUBLIC_COMMENT_NOTION_ENABLE=true
NOTION_COMMENT_DATABASE_ID=your_comment_database_id
NOTION_TOKEN=secret_xxx
# 可选：开启后新评论写入 Pending，前台只显示 Approved
NOTION_COMMENT_REQUIRE_APPROVAL=false
# 可选：同一 IP 每分钟最多提交次数，默认 5
NOTION_COMMENT_RATE_LIMIT=5
```

说明：

- `NEXT_PUBLIC_COMMENT_NOTION_ENABLE`：开启 NotionComments。
- `NOTION_COMMENT_DATABASE_ID`：评论数据库 ID。
- `NOTION_TOKEN`：Notion integration token，是服务端密钥，不要加 `NEXT_PUBLIC_` 前缀。
- `NOTION_COMMENT_REQUIRE_APPROVAL`：是否开启审核。设置为 `true` 后，新评论会写入 `Pending`，需要站长在 Notion 数据库中改成 `Approved` 才会显示。
- `NOTION_COMMENT_RATE_LIMIT`：基础频率限制，默认同一 IP 每分钟 5 条。

修改环境变量后需要重新部署。

## 获取数据库 ID

打开评论数据库页面，浏览器地址通常类似：

```text
https://www.notion.so/workspace/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?v=yyyy
```

`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` 这段 32 位 ID 就是数据库 ID。复制时可以保留或去掉中间的短横线，Notion API 都能识别。

## 启用和验证

1. 部署后打开任意文章页。
2. 滚动到评论区，应该能看到 `Notion` 评论 Tab 或评论表单。
3. 输入邮箱和评论内容并提交。
4. 回到 Notion 评论数据库，确认新增了一条记录。
5. 如果开启了审核，把这条记录的 `Status` 从 `Pending` 改为 `Approved`，刷新文章页后再确认显示。

评论按文章的 Notion 页面 ID 写入 `PostId`，所以文章改 slug 不会丢失评论关联。

## 使用效果

评论提交后，会同时出现在文章评论区和你的 Notion 评论数据库中：

![NotionComments 使用效果](/legacy/notion-comments-demo.png)

## 和其他评论插件一起使用

NotionNext 支持同时开启多个评论插件。开启 NotionComments 后，如果你同时配置了 Twikoo、Giscus、Waline 等插件，评论区会用 Tab 切换展示。

如果只想显示 NotionComments，请移除其他评论插件的环境变量。

## 关闭某篇文章评论

NotionNext 仍然沿用通用规则：在文章数据库中添加 `comment` 属性，值设置为 `Hide`，该文章就不会显示评论区。

## 静态导出限制

NotionComments 需要 `/api/notion-comments` 服务端接口来读取和写入 Notion 数据库。纯静态导出模式没有服务端 API，无法使用这个插件。

也就是说，以下部署方式支持：

- Vercel / Netlify / Zeabur 等支持 Next.js API Routes 的平台。
- 自己的 VPS 或服务器上用 `yarn start` / Node.js 运行 NotionNext。
- Docker、PM2、宝塔等本质上仍然运行 Node.js 服务的部署方式。

以下方式不支持：

- `yarn export` 生成的纯静态站点。
- 只托管 HTML/CSS/JS 文件的静态空间。
- 没有 Node.js 服务端接口能力的对象存储、CDN 静态托管。

如果你必须使用静态导出，请选择 Giscus、Utterances、Cusdis 等不依赖本站 API 的方案。

## 常见问题

### 页面没有显示评论区

检查：

- `NEXT_PUBLIC_COMMENT_NOTION_ENABLE` 是否为 `true`。
- 修改环境变量后是否重新部署。
- 当前文章是否把 `comment` 设置成了 `Hide`。
- 是否启用了搜索引擎爬虫模式预览，爬虫不会加载评论组件。

### 提交评论失败

检查：

- `NOTION_TOKEN` 是否正确，且没有误写成 `NEXT_PUBLIC_NOTION_TOKEN`。
- `NOTION_COMMENT_DATABASE_ID` 是否是评论数据库 ID。
- 评论数据库是否已共享给对应 integration。
- 数据库字段名称和类型是否与文档表格一致。
- 如果开启了审核，`Status` 是否已经改成 `Approved`。

### 评论能写入，但页面不显示

检查 `PostId` 是否等于当前文章页面 ID。手动改数据库内容时，不要修改 `PostId`、`ParentId` 和 `Level`。

### 如何删除垃圾评论

直接在 Notion 评论数据库中删除对应记录即可。删除父评论后，它下面的回复会作为独立评论显示，建议同时清理子回复。

## 安全建议

- 不要把 `NOTION_TOKEN` 写进 `blog.config.js` 或任何前端可见配置。
- 不要给 integration 授权整个工作区，只共享评论数据库即可。
- 如果站点评论量变大，建议开启 `NOTION_COMMENT_REQUIRE_APPROVAL`，在 Notion 数据库里手动审核。
- 评论内容会公开显示，不要让用户提交敏感信息。

参考实现：[goldeye0351/notioncomments](https://github.com/goldeye0351/notioncomments)。
