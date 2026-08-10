# OpenAI 兼容 AI 助手

NotionNext 内置了一个轻量 AI 聊天入口，可以接入 DeepSeek 或其它兼容 OpenAI `chat/completions` 格式的模型服务。页面前端只负责显示聊天窗口，真正的模型请求必须走服务端代理。

## 为什么这样设计

DeepSeek 提供的是模型 API，不是 Chatbase、Coze 那种完整网页浮窗 SDK。API Key 不能写进 `NEXT_PUBLIC_*`、Notion 配置表或前端代码，否则访问者可以在浏览器里看到密钥。

因此推荐架构是：

1. 站点前端配置 `NEXT_PUBLIC_AI_CHAT_API`，显示右下角 AI 助手。
2. 服务端代理 `/api/ai-chat` 读取 `AI_CHAT_API_KEY`。
3. 代理转发到 DeepSeek 或其它 OpenAI 兼容接口。

## 前端配置

在 Vercel、Cloudflare Pages、Netlify 或服务器环境变量中添加：

```bash
NEXT_PUBLIC_AI_CHAT_API=https://你的域名/api/ai-chat
NEXT_PUBLIC_AI_CHAT_TITLE=AI 助手
NEXT_PUBLIC_AI_CHAT_WELCOME=你好，我是本站 AI 助手。你可以问我文章、主题和部署问题。
```

也可以在 Notion 配置表中添加同名配置：

| 配置              | 说明                                                      |
| ----------------- | --------------------------------------------------------- |
| `AI_CHAT_API`     | 聊天代理地址，例如 `https://blog.example.com/api/ai-chat` |
| `AI_CHAT_TITLE`   | 右下角按钮和窗口标题                                      |
| `AI_CHAT_WELCOME` | 打开窗口后的第一句欢迎语                                  |

## DeepSeek 代理配置

如果你使用 Cloudflare Pages Functions，可以直接使用仓库内置的 `functions/api/ai-chat.ts`。在部署平台的服务端环境变量中添加：

```bash
AI_CHAT_API_KEY=你的 DeepSeek API Key
AI_CHAT_BASE_URL=https://api.deepseek.com
AI_CHAT_MODEL=deepseek-v4-flash
AI_CHAT_CORS_ORIGINS=https://你的博客域名
AI_CHAT_MAX_TOKENS=1200
AI_CHAT_TEMPERATURE=0.3
```

`AI_CHAT_CORS_ORIGINS` 可以填写多个域名，用英文逗号分隔：

```bash
AI_CHAT_CORS_ORIGINS=https://blog.example.com,https://docs.example.com
```

本地或临时调试可以先写 `*`，正式站点建议改成自己的域名。

## 使用其它 OpenAI 兼容服务

只要服务支持 `POST /chat/completions`，通常只需要替换：

```bash
AI_CHAT_BASE_URL=https://你的服务商 base url
AI_CHAT_MODEL=你的模型名
AI_CHAT_API_KEY=你的服务端密钥
```

不要改前端组件，也不要把密钥写进 Notion。

## 自定义回答范围

可以用服务端变量设置系统提示词：

```bash
AI_CHAT_SYSTEM_PROMPT=你是本站 AI 助手，只回答本站文章、主题、配置和部署相关问题。回答要简洁，不确定时说明限制。
```

建议写入：

- 站点定位和读者人群
- 重点栏目或文章入口
- 不希望 AI 回答的范围
- 需要优先提示的部署、配置或联系信息

不要写入后台地址、私密页面、未公开资料或任何密钥。

## 和 Coze、Chatbase、Dify 怎么选

| 方案                | 适合场景                                             |
| ------------------- | ---------------------------------------------------- |
| OpenAI 兼容 AI 助手 | 想自己控制模型、Key、系统提示词，或直接使用 DeepSeek |
| Coze                | 想使用可视化工作流、插件和平台知识库                 |
| Chatbase            | 想用第三方平台自动抓取网站内容并生成聊天机器人       |
| Dify                | 已经自建 Dify 应用，希望直接嵌入 Dify 聊天窗口       |

DeepSeek API 本身不会自动读取你的 Notion 数据库或站点文章。如果需要“基于全站文章回答”，后续还需要单独维护知识库或 RAG 流程。
