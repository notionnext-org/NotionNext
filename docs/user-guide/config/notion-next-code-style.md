# 代码块风格
> 迁移自：[代码块风格](https://docs.tangly1024.com/article/notion-next-code-style)
> 发布日期：2023-7-30
> 最后编辑：2024-1-31
> 原栏目：🛠 站点配置

## 相关配置文件

```JavaScript
// START********代码相关********
// PrismJs 代码相关
PRISM_JS_PATH: 'https://npm.elemecdn.com/prismjs@1.29.0/components/',
PRISM_JS_AUTO_LOADER: 'https://npm.elemecdn.com/prismjs@1.29.0/plugins/autoloader/prism-autoloader.min.js',

// 代码主题 @see https://github.com/PrismJS/prism-themes
PRISM_THEME_PREFIX_PATH: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-okaidia.css', // 代码块默认主题
PRISM_THEME_SWITCH: process.env.NEXT_PUBLIC_PRISM_THEME_SWITCH || true, // 是否开启浅色/深色模式代码主题切换； 开启后将显示以下两个主题
PRISM_THEME_LIGHT_PATH: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-solarizedlight.css', // 浅色模式主题
PRISM_THEME_DARK_PATH: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-okaidia.min.css', // 深色模式主题

CODE_MAC_BAR: process.env.NEXT_PUBLIC_CODE_MAC_BAR || true, // 代码左上角显示mac的红黄绿图标
CODE_LINE_NUMBERS: process.env.NEXT_PUBLIC_CODE_LINE_NUMBERS || false, // 是否显示行号
CODE_COLLAPSE: process.env.NEXT_PUBLIC_CODE_COLLAPSE || true, // 是否折叠代码框
CODE_COLLAPSE_EXPAND_DEFAULT: process.env.NEXT_PUBLIC_CODE_COLLAPSE_EXPAND_DEFAULT || true, // 折叠代码默认是展开状态
CODE_COLLAPSE_MIN_LINES: process.env.NEXT_PUBLIC_CODE_COLLAPSE_MIN_LINES || 20, // 只有超过该行数的代码块才显示折叠条
// END********代码相关********
```


### 代码折叠与侧栏预览

开启 `CODE_COLLAPSE` 后，超过 `CODE_COLLAPSE_MIN_LINES` 的长代码块会显示折叠条。桌面端会额外显示“在侧栏查看”按钮，点击后可在右侧固定侧栏中阅读完整代码，并支持复制、关闭按钮、Esc 或点击遮罩退出；移动端保持原有折叠/展开行为。

### 代码风格配置说明

浅色模式（日间模式）和深色模式（夜间模式）支持各配置一种代码风格；

目前默认浅色模式主题 prism-solarizedlight，深色模式代码主题prism-okaidia

![Untitled](/legacy/f5a5161867f2796a.png)


## 支持的代码主题列表

参考elemecdn： [https://npm.elemecdn.com/prism-themes/themes/](https://npm.elemecdn.com/prism-themes/themes/)
在线预览代码主题： [https://github.com/PrismJS/prism-themes](https://github.com/PrismJS/prism-themes)

## 原文链接

https://docs.tangly1024.com/article/notion-next-code-style
