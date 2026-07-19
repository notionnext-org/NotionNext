# 文章版权声明

NotionNext 支持按文章显示版权声明。适合区分原创文章、授权转载、普通转载等场景。

这项功能依赖两个信息：

1. 主题配置中的文章版权开关，例如 `HEXO_ARTICLE_COPYRIGHT`。
2. Notion 文章数据库中的 `copyright` 字段。

## 支持的主题

当前以下主题支持文章级 `copyright` 字段：

| 主题     | 配置项                     |
| -------- | -------------------------- |
| `hexo`   | `HEXO_ARTICLE_COPYRIGHT`   |
| `next`   | `NEXT_ARTICLE_COPYRIGHT`   |
| `heo`    | `HEO_ARTICLE_COPYRIGHT`    |
| `matery` | `MATERY_ARTICLE_COPYRIGHT` |
| `fuwari` | `FUWARI_ARTICLE_COPYRIGHT` |

## 配置模式

文章版权配置支持三种值：

| 配置值   | 效果                                                                                        |
| -------- | ------------------------------------------------------------------------------------------- |
| `true`   | 所有文章都显示版权声明。文章填写了 `copyright` 时显示自定义内容；没填写时显示默认版权声明。 |
| `false`  | 所有文章都不显示版权声明。                                                                  |
| `custom` | 只在文章填写了 `copyright` 字段时显示版权声明；没填写的文章不显示版权块。                   |

如果你的站点大多数文章不需要版权声明，只希望少数原创或授权文章显示，推荐使用 `custom`。

## 在 Notion 中添加 copyright 字段

1. 打开你的 Notion 文章数据库。
2. 新增一列属性，属性名填写 `copyright`。
3. 属性类型推荐选择 `Text` 或 `Rich text`。
4. 哪篇文章需要显示版权声明，就在这篇文章的 `copyright` 字段中填写版权内容。
5. 不需要显示版权声明的文章，保持 `copyright` 为空。

字段名必须是小写：

```text
copyright
```

## 通过 Notion Config 配置

推荐在 Notion Config 表中配置主题版权开关。以 `hexo` 主题为例：

| 配置名                   | 配置值   |
| ------------------------ | -------- |
| `HEXO_ARTICLE_COPYRIGHT` | `custom` |

这样配置后：

- 填写了 `copyright` 的文章会显示版权声明。
- 没填写 `copyright` 的文章不会显示版权块。

其他主题把配置名换成对应主题的配置项即可：

```text
NEXT_ARTICLE_COPYRIGHT=custom
HEO_ARTICLE_COPYRIGHT=custom
MATERY_ARTICLE_COPYRIGHT=custom
FUWARI_ARTICLE_COPYRIGHT=custom
```

## 通过主题 config.js 配置

如果你通过代码配置主题，可以修改对应主题目录下的 `config.js`。

以 `hexo` 主题为例，打开：

```text
themes/hexo/config.js
```

设置为：

```js
HEXO_ARTICLE_COPYRIGHT: 'custom'
```

如果希望所有文章都显示版权声明：

```js
HEXO_ARTICLE_COPYRIGHT: true
```

如果希望所有文章都不显示版权声明：

```js
HEXO_ARTICLE_COPYRIGHT: false
```

## 使用示例

### 原创文章

Notion 文章的 `copyright` 字段填写：

```text
本文为原创文章，采用 CC BY-NC-SA 4.0 协议，转载请注明作者和原文链接。
```

### 禁止转载的原创文章

```text
本文为原创文章，未经作者授权禁止转载。
```

### 授权转载文章

```text
本文为授权转载，原作者：张三，原文链接：https://example.com/post，版权归原作者所有。
```

### 普通转载文章

```text
本文转载自 https://example.com/post，版权归原作者所有，仅作学习和资料整理。
```

## 配合 Notion 模板使用

Notion 模板很适合预填版权内容。你可以为不同写作类型建立模板：

| 模板         | copyright 默认值                                                        |
| ------------ | ----------------------------------------------------------------------- |
| 原创科普文章 | `本文为原创文章，采用 CC BY-NC-SA 4.0 协议，转载请注明作者和原文链接。` |
| 原创禁止转载 | `本文为原创文章，未经作者授权禁止转载。`                                |
| 授权转载     | `本文为授权转载，原作者：，原文链接：，版权归原作者所有。`              |
| 普通转载     | 留空，或手动填写来源和作者信息。                                        |

推荐做法：

1. 在 Notion 数据库中新建模板。
2. 给模板命名，例如“原创文章”“授权转载”。
3. 在模板的 `copyright` 字段中预填常用版权声明。
4. 新建文章时选择对应模板。

这样不用每篇文章重复输入相同版权规则，也不需要 NotionNext 自动判断原创或转载。

## 推荐配置

大多数站点推荐使用：

```js
HEXO_ARTICLE_COPYRIGHT: 'custom'
```

然后只在需要显示版权声明的文章中填写 `copyright`。

这能避免转载文章误显示站点自己的默认版权声明，也能让原创文章通过 Notion 模板快速套用固定授权规则。

## 注意事项

- `copyright` 字段只控制文章底部版权声明文案，不等同于复制权限。
- 如果需要控制文章能否复制，请参考 [文章复制权限](./copy-permission.md)。
- 修改 Notion Config 或 Notion 文章字段后，可能需要等待站点重新同步、刷新缓存或重新部署。
