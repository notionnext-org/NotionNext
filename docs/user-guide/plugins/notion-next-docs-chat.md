# Gemini AI 助手

NotionNext 已内置一个轻量 AI 助手入口，可以把你的博客接到自己的 Gemini 免费额度。核心原则只有一个：`GOOGLE_GENERATIVE_AI_API_KEY` 只能放在服务端代理里，不能写进前端代码、Notion 配置表或 `NEXT_PUBLIC_*` 环境变量。

## 适用场景

- 想在博客右下角放一个 AI 助手。
- 想让助手回答站点部署、主题配置、文章内容或常见问题。
- 想复用 NotionNext 文档站同款 Gemini + Cloudflare Pages Function 方案。

如果你已经在用 Coze、Dify、Chatbase，也可以继续用它们；这个方案更适合想自己控制模型 Key 和系统提示词的站点。

## 部署代理

在 Cloudflare Pages 项目中添加 Function，例如 `functions/api/docs-chat.ts`。NotionNext 官方文档站已经使用这个文件作为参考实现，它会在服务端读取 Gemini Key，并向前端暴露一个安全的聊天 API。

Cloudflare Pages 环境变量：

```bash
GOOGLE_GENERATIVE_AI_API_KEY=你的 Gemini API Key
DOCS_CHAT_MODEL=gemini-flash-lite-latest
DOCS_CHAT_CORS_ORIGINS=https://你的博客域名
DOCS_CHAT_MAX_TOKENS=1200
```

`DOCS_CHAT_CORS_ORIGINS` 可以填写多个域名，用英文逗号分隔：

```bash
DOCS_CHAT_CORS_ORIGINS=https://blog.example.com,https://docs.example.com
```

本地或临时调试时可以先用 `*`，正式站点建议改成自己的域名。

## 接入博客

在博客站点的部署平台中添加：

```bash
NEXT_PUBLIC_DOCS_CHAT_API=https://你的文档站域名/api/docs-chat
NEXT_PUBLIC_DOCS_CHAT_TITLE=AI 助手
NEXT_PUBLIC_DOCS_CHAT_WELCOME=你好，我是本站 AI 助手。你可以问我文章、主题和部署问题。
```

重新部署后，页面右下角会出现 AI 助手按钮。

也可以在 Notion 配置表中添加同名配置：

| 配置                | 说明                                                              |
| ------------------- | ----------------------------------------------------------------- |
| `DOCS_CHAT_API`     | 聊天代理地址，例如 `https://notionnext.example.com/api/docs-chat` |
| `DOCS_CHAT_TITLE`   | 右下角按钮和窗口标题                                              |
| `DOCS_CHAT_WELCOME` | 打开窗口后的第一句欢迎语                                          |

## 让 AI 更懂你的网站

最小可用版本只需要改服务端代理里的系统提示词。可以把这些信息写进去：

- 你的站点定位和读者人群。
- 常见入口，例如 `/about`、`/links`、`/archive`。
- 希望 AI 优先回答的主题。
- 不希望 AI 回答的范围。

不要把用户私密信息、后台地址、密钥或未公开资料写进提示词。

## 常见问题

### 为什么不用 `NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY`？

`NEXT_PUBLIC_*` 会被打包到浏览器里，任何访问者都能看到。Gemini Key 必须只放在 Cloudflare Pages、Vercel Function 或你自己的后端服务里。

### 能不能直接复用 NotionNext 官方文档站的接口？

不建议。官方接口的额度、提示词和跨域策略会按文档站维护。自己的博客应当部署自己的代理，并用自己的 Gemini 免费额度。

### 和 Coze 方案怎么选？

想最快搭建并使用 Coze 知识库，选 [Coze AI 聊天机器人](./notion-next-coze.md)。想自己控制 Gemini Key、模型和提示词，选这个方案。
