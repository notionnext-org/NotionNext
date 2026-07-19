# 文章状态

NotionNext 用 `status` 决定文章是否进入公共入口，用 `password` 决定正文是否需要密码查看。两者是独立字段，不要把 `Invisible` 当成私密文章使用。

## status 基础状态

`status` 建议只使用三类语义：`Published`、`Invisible`、`Draft`。如果你的 Notion 下拉值做了本地化，请在 `NEXT_PUBLIC_NOTION_PROPERTY_STATUS_PUBLISH` 和 `NEXT_PUBLIC_NOTION_PROPERTY_STATUS_INVISIBLE` 中映射到这两个公开状态；其他值都按未发布内容处理。

| 展示位置 | Published | Invisible | Draft / 其他值 |
| --- | --- | --- | --- |
| 首页 / 分页 | 显示 | 不显示 | 不显示 |
| 归档 | 显示 | 不显示 | 不显示 |
| 分类 | 显示 | 不显示 | 不显示 |
| 标签列表 | 显示 | 不显示 | 不显示 |
| 标签 / 分类统计 | 统计 | 不统计 | 不统计 |
| 站内搜索 | 可搜索 | 不搜索 | 不搜索 |
| RSS | 输出 | 不输出 | 不输出 |
| Sitemap | 输出 | 不输出 | 不输出 |
| Algolia 索引 | 索引 | 不索引 | 不索引 |
| 直接 slug 访问 | 可以访问 | 可以访问 | 不作为公开访问目标 |

## Invisible 的定位

`Invisible` 表示“没有公共入口，但保留完整 `slug` 直接访问”。它适合内嵌页、补充页、临时分享页等场景。

`Invisible` 不应参与任何公共聚合入口，包括首页、归档、分类、标签、标签统计、RSS、Sitemap、站内搜索和 Algolia 索引。知道完整地址的人仍然可以访问它，所以它不是私密文章。

## password 修饰属性

`password` 是叠加在 `status` 之上的内容保护字段，不改变文章是否出现在列表里的规则。

| 行为 | 无 password | 有 password |
| --- | --- | --- |
| 列表 / 入口可见性 | 按 `status` 决定 | 按 `status` 决定 |
| RSS 正文 | 完整输出 | 不暴露正文，最多保留标题、摘要或入口 |
| 搜索索引正文 | 完整索引 | 不暴露正文 |
| 页面内容 | 直接可见 | 需要密码解锁 |

如果希望文章有公开入口但正文加密，使用 `status = Published` 加 `password`。如果希望文章不进入公共入口但可以通过完整链接访问，使用 `status = Invisible`。如果还没有准备公开，使用 `Draft` 或其他未映射状态。

## 公众号和外部发布

公众号、外部平台同步、转载来源等信息不要复用 `status`。这类字段更适合作为展示或同步策略字段单独维护，避免影响 `Published`、`Invisible`、`Draft` 的基础语义。
