# 社区站数据库模板

NotionNext 默认适合个人博客和独立页面。如果你想把同一个 Notion 数据库扩展成社区、团队、开源项目或活动官网，可以在原有文章字段上增量加入 `Member` 与 `Event` 类型。

这份模板不要求重建数据库，也不要求更换主题。它的目标是让站点先具备稳定的数据约定，后续再按主题或自定义页面逐步展示成员、活动和作者关系。

## 适用场景

- 社区官网：展示成员、活动、文章和复盘记录。
- 团队主页：展示团队成员、岗位、个人主页和代表内容。
- 开源项目站：展示维护者、贡献者、版本活动和项目文章。
- 小型组织站：用 Notion 作为内容与运营后台。

## 保留基础字段

继续保留 NotionNext 现有字段：

| 字段名 | 用途 |
| --- | --- |
| `title` | 页面标题 |
| `type` | 页面类型，例如 `Post`、`Page`、`Member`、`Event` |
| `status` | 发布状态，例如 `Published`、`Invisible` |
| `summary` | 摘要 |
| `slug` | 页面路径 |
| `date` | 发布时间 |
| `category` | 分类 |
| `tags` | 标签 |
| `password` | 文章密码 |
| `icon` | 页面图标 |

## 页面类型约定

`type` 建议保留原有值，并增量加入社区类型：

| type | 含义 |
| --- | --- |
| `Post` | 普通文章 |
| `Page` | 独立页面 |
| `Notice` | 公告 |
| `Menu` | 一级菜单 |
| `SubMenu` | 二级菜单 |
| `Member` | 成员资料 |
| `Event` | 活动或事件 |

`status` 仍建议使用：

| status | 含义 |
| --- | --- |
| `Published` | 对外展示 |
| `Invisible` | 暂不展示，但保留在数据库中 |

## Member 字段

成员资料可以作为 `type = Member` 的页面放在同一个数据库中。

### 必需字段

| 字段名 | Notion 类型 | 示例 | 用途 |
| --- | --- | --- | --- |
| `type` | Select | `Member` | 识别成员资料 |
| `status` | Select | `Published` | 控制是否展示 |
| `title` | Title | `Ada Chen` | 成员姓名或昵称 |
| `slug` | Text | `members/ada-chen` | 成员详情路径 |

### 推荐字段

| 字段名 | Notion 类型 | 示例 | 用途 |
| --- | --- | --- | --- |
| `bio` | Text | `AI builder and community organizer.` | 成员简介 |
| `role` | Text | `Maintainer` | 成员身份 |
| `avatar` | URL | `https://...` | 头像 |
| `featured` | Checkbox | `true` | 首页或目录优先展示 |
| `verified` | Checkbox | `true` | 已审核或核心成员标记 |
| `joinedAtText` | Text | `2026 / 05` | 加入时间展示 |
| `quote` | Text | `Build useful things.` | 成员短句 |
| `sortOrder` | Number | `10` | 手动排序 |
| `website` | URL | `https://example.com` | 个人主页 |
| `social_github` | URL | `https://github.com/example` | GitHub |
| `social_x` | URL | `https://x.com/example` | X / Twitter |
| `social_linkedin` | URL | `https://linkedin.com/in/example` | LinkedIn |

## Post 作者映射

如果文章需要关联到成员页，建议在 `Post` 行上增加作者字段。

| 字段名 | Notion 类型 | 示例 | 用途 |
| --- | --- | --- | --- |
| `author` | Text | `Ada Chen` | 前台显示作者名 |
| `author_slug` | Text | `ada-chen` | 显式映射到 `members/ada-chen` |

多作者站点可以继续预留：

| 字段名 | Notion 类型 | 示例 | 用途 |
| --- | --- | --- | --- |
| `authors` | Text | `Ada Chen,Ben Li` | 多作者名称 |
| `author_slugs` | Text | `ada-chen,ben-li` | 多作者成员映射 |
| `member_slugs` | Text | `ada-chen,ben-li` | 文章相关成员 |
| `event_slugs` | Text | `demo-day-2026` | 文章相关活动 |

## Event 字段

活动可以作为 `type = Event` 的页面预先进入数据库。即使当前主题没有单独的活动页，这些字段也能先形成稳定内容约定。

| 字段名 | Notion 类型 | 示例 | 用途 |
| --- | --- | --- | --- |
| `type` | Select | `Event` | 识别活动 |
| `status` | Select | `Published` | 控制是否展示 |
| `title` | Title | `AI Builder Night` | 活动名称 |
| `slug` | Text | `events/ai-builder-night` | 活动路径 |
| `summary` | Text | `A weekly AI builder meetup.` | 活动摘要 |
| `event_start` | Date | `2026-06-01 19:00` | 开始时间 |
| `event_end` | Date | `2026-06-01 21:00` | 结束时间 |
| `location` | Text | `Shanghai / Online` | 地点 |
| `organizer_slugs` | Text | `ada-chen,ben-li` | 组织者成员 slug |
| `registration_url` | URL | `https://...` | 报名入口 |

## Slug 建议

为了避免和文章路径混在一起，建议社区类型使用前缀：

| 类型 | slug 示例 |
| --- | --- |
| Member | `members/ada-chen` |
| Event | `events/ai-builder-night` |
| Post | `ai-community-report` |

文章中的 `author_slug`、`member_slugs`、`event_slugs` 可以只写末段：

```text
author_slug = ada-chen
member_slugs = ada-chen,ben-li
event_slugs = ai-builder-night
```

前台实现时再统一拼成 `/members/ada-chen` 或 `/events/ai-builder-night`。

## 最小录入流程

### 新增成员

1. 新建一行页面。
2. 设置 `type = Member`。
3. 设置 `status = Published` 或 `Invisible`。
4. 填写 `title`、`slug`、`bio`、`role`、`avatar`。
5. 如需优先展示，勾选 `featured` 或设置 `sortOrder`。

### 新增文章并关联成员

1. 正常创建 `Post`。
2. 填写 `author`。
3. 填写 `author_slug`，值与成员 slug 末段一致。
4. 如需关联更多成员或活动，填写 `member_slugs`、`event_slugs`。

### 新增活动

1. 新建一行页面。
2. 设置 `type = Event`。
3. 设置 `status = Published`。
4. 填写 `title`、`slug`、`summary`。
5. 补充时间、地点、组织者和报名入口。

## 渐进接入建议

先完成数据库字段和录入规范，再逐步接入前台：

1. 只录入 `Member` 数据，用于后续成员目录。
2. 给文章补 `author` / `author_slug`，建立作者关系。
3. 录入 `Event`，先作为普通页面或自定义列表的数据源。
4. 再根据主题能力实现成员目录、活动列表、详情页和关系展示。

这样可以在不破坏原博客流程的前提下，把 NotionNext 从个人博客逐步扩展为社区或组织站点。
