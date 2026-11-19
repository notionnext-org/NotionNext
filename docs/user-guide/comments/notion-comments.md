# NotionComments

NotionComments 使用一个 Notion 数据库保存评论，适合不想额外部署 Twikoo、Waline 等评论后端的站点。

这不是 Notion 页面右上角的官方评论区，而是通过 Notion API 写入你自己的评论数据库。访客不需要登录 Notion；默认需要填写邮箱，也可以开启无需邮箱的匿名模式。

## 适合谁使用

- 你已经在用 NotionNext，希望评论数据也保存在 Notion。
- 你不想维护 MongoDB、LeanCloud、独立评论服务或额外二级域名。
- 你能接受在 Notion 数据库中手动查看、删除或整理评论。

如果你需要后台审核、邮件通知、垃圾评论过滤、社交登录或头像系统，Twikoo、Waline、Artalk 仍然更合适。

> 部署限制：NotionComments 依赖本站的 `/api/notion-comments` 服务端接口，只支持 Vercel、Netlify、Zeabur、VPS、Node.js 服务等动态部署。使用 `yarn export` 生成纯静态站点时，没有服务端 API，不能使用这个插件。

## 执行前检查

为已有站点配置时，先确认当前部署平台、目标环境（生产或预览）、是否已有可用的评论数据库及 Integration，并检查相关变量是否已设置及其生效方式。复用现有配置；不要覆盖其他评论插件、站点的 `NOTION_TOKEN` 或其他环境的配置。`NOTION_TOKEN` 也可能被站点其他功能使用，更换前须确认影响。

需要具备目标 Notion 工作区中创建数据库、创建连接并授权数据库的权限，以及目标部署环境变量的修改权限。缺少权限或无法确认现有配置时，说明具体缺项并停止需要该权限的操作，不要猜测凭据或数据库 ID。公开变量 `NEXT_PUBLIC_*` 会进入浏览器构建产物；Token 只能存于服务端密钥配置或未提交的本地环境文件，不能打印、粘贴到对话、日志、截图或提交到仓库。检查密钥时只报告是否存在，不输出值。

先确认目标环境采用普通模式还是匿名模式，以及是否已有显式的审核配置；保留现有选择。部署平台中的变量可能覆盖文件中的值，应以目标环境实际生效的设置为准。修改前记录变量名及是否存在，不记录密钥值；完成后按部署平台流程重新构建或部署，使客户端与服务端使用一致的设置。

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

普通模式写入所有基础字段；匿名模式不写入 `Author` 和 `IpAddress`。为兼容两种模式，建议保留全部基础字段。增强字段是可选的；没有 `Nickname` 时不会保存昵称。启用审核时必须添加 `Status` select 字段，否则提交会失败。读取时 `Approved` 和状态为空的旧记录都会公开，因此启用审核前应检查现有记录的状态，避免误以为空状态会被隐藏。

建议把这个数据库放在站点数据库之外，方便单独管理评论。

## 创建 Notion Integration

Integration 可以理解成“给 NotionNext 使用的机器人账号”。NotionNext 不能直接用你的 Notion 登录态访问数据库，必须通过这个 Integration Token 才能读写评论数据库。

> 提醒：Integration 不只是评论插件会用到的配置。它是把网站上的用户交互安全写回 Notion 数据的关键能力。评论、表单、反馈、订单、会员资料、用户权限等功能，未来都可以沿着这条链路扩展。先把评论跑通，相当于给站点打通了“用户行为 -> Notion 数据库”的第一条通道。

### 1. 新建连接

1. 打开 [Notion 开发者连接页面](https://www.notion.so/my-integrations)，登录存放评论数据库的 Notion 账号。
2. 在 `Developer connections` 页面，点击右上角蓝色的 **`+ New connection`**。旧版界面可能显示 `New integration` 或 `新建集成`，它们是同一个创建入口；不要选择 `Personal access tokens` 或 `MCP tokens`。
3. 名称填写 `Notion_Comment`（也可以自定义），然后在 `Associated workspace` 中选择评论数据库所在的工作区。
4. 完成创建。新建连接默认为内部连接；如果界面没有类型选项，直接继续即可。
5. 创建后点击该连接，进入管理页面。

如果看不到目标工作区或无法创建连接，先确认登录的账号和工作区是否正确，并检查创建连接的权限；需要时请工作区所有者协助。

### 2. 配置功能权限

在连接管理页打开 `Configuration` / `配置`，找到 `Capabilities` / `功能` 区域，开启以下内容权限并保存：

- `Read content` / `读取内容`：读取评论数据库中的评论。
- `Insert content` / `插入内容`：将新评论写入评论数据库。
- `Update content` / `更新内容` 可选：当前基础评论功能不依赖它。

评论功能不要勾选：

- 不需要 `读取评论`。
- 不需要 `插入评论`。

这里使用的是独立 Notion 评论数据库，不是 Notion 页面右上角的原生评论功能，所以不需要给 integration 开启评论功能权限。权限越少越安全。

### 3. 复制访问令牌

在同一个 `Configuration` / `配置` 页面找到 `API token` / `集成令牌`，点击复制按钮，将其保存为部署环境变量 `NOTION_TOKEN`。请复制该连接自己的令牌，不要使用 `Personal access token` 或 `MCP token`。

注意：

- 不要把这个令牌发给别人。
- 不要写进 `blog.config.js`。
- 不要使用 `NEXT_PUBLIC_NOTION_TOKEN` 这种前端可见变量名。

### 4. 授权访问评论数据库

只有创建 integration 还不够，还必须把评论数据库共享给它。否则接口会报没有权限。

推荐做法：

1. 打开**复制到你自己工作区的**评论数据库页面，不要在原始模板页面操作。
2. 点击页面右上角 `...`，选择 `Connections` / `连接`，再点击 `Add connection` / `添加连接`。
3. 搜索并选择刚创建的 `Notion_Comment`，确认添加。

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
NOTION_TOKEN=your_connection_api_token
# 可选：匿名模式不要求邮箱，昵称选填
NEXT_PUBLIC_COMMENT_NOTION_ANONYMOUS=false
# 可选：开启后新评论写入 Pending，前台只显示 Approved
# 未设置时，匿名模式默认开启审核，普通模式默认关闭
# NOTION_COMMENT_REQUIRE_APPROVAL=true
# 可选：同一 IP 每分钟最多提交次数，默认 5
NOTION_COMMENT_RATE_LIMIT=5
```

说明：

- `NEXT_PUBLIC_COMMENT_NOTION_ENABLE`：开启 NotionComments。
- `NOTION_COMMENT_DATABASE_ID`：评论数据库 ID。
- `NOTION_TOKEN`：Notion integration token，是服务端密钥，不要加 `NEXT_PUBLIC_` 前缀。
- `NEXT_PUBLIC_COMMENT_NOTION_ANONYMOUS`：设置为 `true` 后隐藏邮箱输入框；昵称选填，不填时显示“匿名访客”。服务端会忽略请求中传入的邮箱，也不会将 IP、User-Agent 或邮箱哈希写入 Notion。
- `NOTION_COMMENT_REQUIRE_APPROVAL`：是否开启审核。设置为 `true` 后，新评论会写入 `Pending`，需要站长在 Notion 数据库中改成 `Approved` 才会显示。未设置时，匿名模式默认开启审核，普通模式默认关闭；显式设置 `false` 可以关闭审核。
- `NOTION_COMMENT_RATE_LIMIT`：基础频率限制，默认同一 IP 每分钟 5 条。

以上是示例，不要直接覆盖已有设置。尤其不要把审核变量设为空字符串来表示未设置：只有变量真正不存在时才按模式采用默认值；设置为空字符串时审核关闭。修改环境变量后需要重新构建或部署，确保目标环境的客户端和服务端使用相同的匿名模式设置。

匿名模式不要求访客提供身份信息，但不代表网络层面无法识别：托管平台和网络服务可能仍会处理或记录 IP 等访问数据。服务端在处理请求时仍使用 IP 进行基础频率限制，该限制只保存在当前进程内存中，不是多实例环境下的全局防刷。匿名模式不支持通过邮箱发送回复通知或验证评论所有权。现有历史评论及其中保存的信息不会被自动删除。

## 获取数据库 ID

打开评论数据库页面，浏览器地址通常类似：

```text
https://www.notion.so/workspace/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx?v=yyyy
```

`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` 这段 32 位 ID 就是数据库 ID。复制时可以保留或去掉中间的短横线，Notion API 都能识别。请使用**复制到自己工作区后的评论数据库**的地址，不要使用模板链接中的 ID，也不要把 `?v=` 后面的视图 ID 当成数据库 ID。

## 启用和验证

1. 确认目标环境已完成部署，打开一篇未隐藏评论的文章，滚动到评论区；多个插件启用时选择 `Notion` Tab。
2. 使用不含敏感信息的测试内容提交一条评论。普通模式填写有效邮箱；匿名模式不填写邮箱，昵称可留空。正文不能为空且最多 2000 字符，昵称最多 40 字符。
3. 在自己的评论数据库确认新增记录的 `PostId` 与文章页面 ID 一致，正文正确。匿名模式检查该记录未写入邮箱、IP、User-Agent 和邮箱哈希；昵称需要 `Nickname` 字段才能保存。
4. 开启审核时，确认新记录为 `Pending` 且刷新后不公开；将其改为 `Approved`，刷新后确认显示。未开启审核时，确认评论刷新后显示。再提交一条回复，确认关联和显示正常。
5. 验证完成后在 Notion 删除测试评论及其回复；记录验证的目标环境、模式和结果，不记录 Token、访客邮箱或其他个人信息。

评论按文章的 Notion 页面 ID 写入 `PostId`，所以文章改 slug 不会丢失评论关联。

## 使用效果

评论提交后会写入 Notion 评论数据库；开启审核时，批准后才会出现在文章评论区：

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
- 如果开启了审核，数据库是否有名为 `Status`、类型为 Select 的字段；缺少该字段会导致提交失败。`Pending` 改为 `Approved` 是提交成功后的显示步骤。

检查浏览器网络请求的状态码和服务端日志时，不要复制 Token、完整请求体、邮箱或 IP：`400` 表示输入无效，检查正文、邮箱及长度；`429` 表示触发频率限制，等待一分钟后重试；`500` 表示服务端或 Notion 操作失败，检查变量是否存在、数据库授权、字段类型及服务端错误。若网络中断或返回错误，重试前先检查数据库是否已经写入，避免重复评论。无法访问部署配置或 Notion 时，报告缺少的权限和已观察到的状态，不要声称验证成功。

### Netlify 部署后接口 404

先直接访问：

```text
https://你的域名/api/notion-comments?postId=test
```

- 返回 JSON 数组：接口可读取数据库；`[]` 只说明该 `postId` 没有公开评论，不能证明写入正常。
- 返回接口的 JSON `500`：请求已到达接口但读取失败，检查服务端配置、数据库 ID 和共享权限。其他 `500` 页面还可能来自部署平台，应查看平台日志确认来源。
- 返回 `404`：检查 Netlify 是否启用了 Next.js API Routes，不要使用 `yarn export`，也不要把发布目录设成 `out`；同时确认访问的是正确域名和部署环境。

Netlify 项目应使用 Next.js 动态部署能力；构建日志里需要能看到 Next.js 插件和 Functions / API Routes 相关输出。

### 评论能写入，但页面不显示

检查 `PostId` 是否等于当前文章页面 ID。手动改数据库内容时，不要修改 `PostId`、`ParentId` 和 `Level`。

### 如何删除垃圾评论

直接在 Notion 评论数据库中删除对应记录即可。删除父评论后，它下面的回复会作为独立评论显示，建议同时清理子回复。

## 安全建议

- 不要把 `NOTION_TOKEN` 写进 `blog.config.js` 或任何前端可见配置。
- 如果令牌意外泄露，应在 Notion 撤销或轮换，并更新所有依赖它的服务端环境变量；不要在排查时再次公开旧令牌。
- 不要给 integration 授权整个工作区，只共享评论数据库即可。
- 如果站点评论量变大，建议开启 `NOTION_COMMENT_REQUIRE_APPROVAL`，在 Notion 数据库里手动审核。
- 评论内容会公开显示，不要让用户提交敏感信息。

参考实现：[goldeye0351/notioncomments](https://github.com/goldeye0351/notioncomments)。
