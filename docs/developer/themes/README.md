# Themes Documentation

中文 | [English](./README.en.md)

本目录用于**开发者向**主题说明（架构、全局改动、迁移计划）及英文文档。  
**站长向统一入口**：[user-guide/themes/README.md](../../user-guide/themes/README.md)（25 个主题各一篇 `<id>.md`）。

## 文档分工

| 类型 | 位置 | 说明 |
| --- | --- | --- |
| 站长教程 | `docs/user-guide/themes/<id>.md` | 启用、场景、配置表；**Proxio / Heo 全文在此** |
| 开发者深度 | 本目录 `CLAUDE.md` 等 | 实现细节、Supabase、`_app.js` 等 |
| 已合并存根 | `PROXIO.md`、`HEO.md` | 仅重定向，勿再编辑 |

## 主题索引

| Theme | 站长文档 | 开发者 / 英文 |
| --- | --- | --- |
| Proxio | [proxio.md](../../user-guide/themes/proxio.md) | 已合并至站长文档 |
| HEO | [heo.md](../../user-guide/themes/heo.md) | 已合并至站长文档 |
| Claude | [claude.md](../../user-guide/themes/claude.md) | [CLAUDE.md](./CLAUDE.md) · [CLAUDE.en.md](./CLAUDE.en.md) |
| Endspace | [endspace.md](../../user-guide/themes/endspace.md) | [ENDSPACE.md](./ENDSPACE.md) · [ENDSPACE.en.md](./ENDSPACE.en.md) |
| Fuwari | [fuwari.md](../../user-guide/themes/fuwari.md) | [FUWARI.md](./FUWARI.md) |
| ThoughtLite | [thoughtlite.md](../../user-guide/themes/thoughtlite.md) | [THOUGHTLITE.md](./THOUGHTLITE.md) · [THOUGHTLITE.en.md](./THOUGHTLITE.en.md) |

全部主题列表：[THEMES_CATALOG.md](../../user-guide/themes/THEMES_CATALOG.md)

## 维护约定

- 新增主题时，在 **`docs/user-guide/themes/<id>.md`** 写站长说明；仅当需要记录全局改动时再在本目录补开发者文档。
- 修改 `themes/<id>/config.js` 后运行 `node scripts/generate-theme-user-docs.mjs` 刷新配置表（`proxio` / `heo` 仅更新 `<!-- theme-config-table -->` 段）。
- **合并主仓库时**：除 `themes/<id>/` 外，需在 **`public/images/themes-preview/`** 提交 `<id>.png` / `<id>.webp`，并更新 **`conf/themeSwitch.manifest.js`**；详见 [主题迁移指南 §8](../THEME_MIGRATION_GUIDE.zh-CN.md)。
