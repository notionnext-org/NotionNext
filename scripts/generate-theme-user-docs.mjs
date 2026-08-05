/**
 * Generate docs/user-guide/themes/<id>.md for every built-in theme.
 * Run: node scripts/generate-theme-user-docs.mjs
 *
 * Themes with merged long-form docs (proxio, heo) use <!-- theme-config-table -->
 * markers; only the config table between markers is regenerated.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  GITHUB_BLOB,
  REPO_ROOT,
  getBuiltinThemeIds,
  loadThemeSwitchManifest
} from './lib/builtin-themes.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const themesDir = path.join(REPO_ROOT, 'themes')
const outDir = path.join(REPO_ROOT, 'docs/user-guide/themes')

/** 开发者向长篇（不进在线 VitePress 站） */
const DEV_DEEP_DOCS = {
  claude: `${GITHUB_BLOB}/docs/developer/themes/CLAUDE.md`,
  endspace: `${GITHUB_BLOB}/docs/developer/themes/ENDSPACE.md`,
  fuwari: `${GITHUB_BLOB}/docs/developer/themes/FUWARI.md`,
  thoughtlite: `${GITHUB_BLOB}/docs/developer/themes/THOUGHTLITE.md`
}

const manifest = loadThemeSwitchManifest()

const scenes = {
  simple: '个人文字博客、默认入门',
  hexo: '类 Hexo 双栏博客',
  heo: '模块化首页、通知与英雄区',
  gitbook: '技术文档、手册侧栏目录',
  next: '经典双栏 + 移动 TOC',
  medium: 'Medium 风阅读列表',
  matery: 'Material 卡片封面列表',
  nobelium: '极简博客',
  fukasawa: '多栏高密度信息',
  fuwari: '日系双栏、色板定制',
  typography: '排版优先、少干扰',
  nav: '导航站、链接聚合',
  plog: '图文轻博客',
  photo: '摄影相册、侧栏推荐',
  movie: '影视海报墙',
  game: '游戏像素风装饰',
  landing: '单页着陆分区',
  starter: '营销落地页区块',
  opc: '个人主页、一人公司入口、AI 工作流展示',
  proxio: '作品集、SaaS 品牌站',
  commerce: '商品展示页',
  magzine: '杂志封面大图列表',
  claude: '文档风、GitHub 式首页',
  endspace: '工业风加载与侧栏',
  example: '新主题开发骨架',
  thoughtlite: '时间线首页、Latest 卡片'
}

function extractKeys(configPath) {
  const src = fs.readFileSync(configPath, 'utf8')
  const keys = []
  const re = /^\s*([A-Z][A-Z0-9_]+):/gm
  let km
  while ((km = re.exec(src)) !== null) keys.push(km[1])
  return [...new Set(keys)]
}

function extractComments(configPath) {
  const lines = fs.readFileSync(configPath, 'utf8').split('\n')
  const map = {}
  for (let i = 0; i < lines.length; i++) {
    const km = lines[i].match(/^\s*([A-Z][A-Z0-9_]+):/)
    if (!km) continue
    const key = km[1]
    const inline = lines[i].match(/\/\/\s*(.+)$/)
    if (inline) {
      map[key] = inline[1].trim()
      continue
    }
    if (i > 0) {
      const prev = lines[i - 1].match(/^\s*\/\/\s*(.+)$/)
      if (prev) map[key] = prev[1].trim()
    }
  }
  return map
}

function buildConfigTableBlock(id, keys, notes) {
  let block = '<!-- theme-config-table -->\n\n'
  block += '### 主要配置项\n\n'
  block += '| 配置键 | 说明 |\n| --- | --- |\n'
  const showKeys = keys.slice(0, 40)
  for (const k of showKeys) {
    const note = (notes[k] || '见 config.js').replace(/\|/g, '\\|')
    block += `| \`${k}\` | ${note} |\n`
  }
  if (keys.length > 40) {
    block += `\n共 **${keys.length}** 项，上表列出前 40 项，完整列表见 [config.js](${GITHUB_BLOB}/themes/${id}/config.js)。\n`
  }
  block += '\n<!-- /theme-config-table -->\n'
  return block
}

function ensureFeaturesSection(filePath, id, title, summary, keys) {
  let src = fs.readFileSync(filePath, 'utf8')
  if (src.includes('## 主题特性')) return false
  const block = buildFeaturesSection(id, title, summary, keys)
  const afterIntro = src.match(/(## 简介[\s\S]*?\n\n)(## )/)
  if (afterIntro) {
    src = src.replace(afterIntro[0], afterIntro[1] + block + afterIntro[2])
    fs.writeFileSync(filePath, src, 'utf8')
    return true
  }
  return false
}

function patchConfigTable(filePath, tableBlock) {
  const src = fs.readFileSync(filePath, 'utf8')
  const start = '<!-- theme-config-table -->'
  const end = '<!-- /theme-config-table -->'
  if (!src.includes(start) || !src.includes(end)) {
    console.warn('skip patch (no markers):', filePath)
    return false
  }
  const re = new RegExp(
    `${start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`
  )
  fs.writeFileSync(filePath, src.replace(re, tableBlock.trim()), 'utf8')
  return true
}

function buildFeaturesSection(id, title, summary, keys) {
  const scene = scenes[id] || '见 [内置主题全览](./THEMES_CATALOG.md) 选型表'
  const prefix =
    keys.find(k => k.includes('_'))?.split('_')[0] ||
    id.toUpperCase().replace(/[^A-Z0-9]/g, '')
  let md = '## 主题特性\n\n'
  md += `- **定位**：${summary || scene}\n`
  md += `- **适用场景**：${scene}\n`
  md += `- **配置前缀**：\`${prefix}_*\`（共 **${keys.length}** 项，见下方配置表）\n`
  md += `- **在线预览**：[preview.tangly1024.com/?theme=${id}](https://preview.tangly1024.com/?theme=${id})\n\n`
  return md
}

function buildFullDoc(id, title, summary, keys, notes) {
  let md = `# ${title} 主题\n\n`
  md += `> 主题 ID：\`${id}\` · 预览：[preview.tangly1024.com/?theme=${id}](https://preview.tangly1024.com/?theme=${id})\n\n`
  md += `## 简介\n\n${summary || scenes[id] || '见主题切换面板简介。'}\n\n`
  md += buildFeaturesSection(id, title, summary, keys)
  md += `## 适用场景\n\n${scenes[id] || '见 [主题全览](./THEMES_CATALOG.md) 选型表'}\n\n`
  md += '## 启用方式\n\n'
  md += `1. Notion Config 表：\`THEME\` = \`${id}\`\n`
  md += `2. 环境变量：\`NEXT_PUBLIC_THEME=${id}\`\n`
  md += '3. `blog.config.js` 的 `THEME`\n\n'

  const devLink = DEV_DEEP_DOCS[id]
  if (devLink) {
    md += '## 开发者深度文档\n\n'
    md += `实现细节、全局改动与架构说明见 [${title} 开发者文档（GitHub）](${devLink})（与本文站长向说明分工）。\n\n`
  }

  md += '## 配置说明\n\n'
  md += `配置文件：[\`themes/${id}/config.js\`](${GITHUB_BLOB}/themes/${id}/config.js)  \n`
  md += '也可在 **Notion Config** 表中填写同名键（对象/数组用 JSON）。\n\n'
  md += buildConfigTableBlock(id, keys, notes)
  md += '\n## 相关\n\n'
  md += '- [内置主题全览](./THEMES_CATALOG.md)\n'
  md += '- [如何配置站点](../config-site.md)\n'
  md += '- [菜单 Menu / SubMenu](../menu-secondary.md)\n'
  return md
}

function buildThemeIndexTable(ids) {
  let block = '<!-- theme-index-table -->\n\n'
  block += '## 全部主题（' + ids.length + ' 个）\n\n'
  block += '| ID | 名称 | 特性摘要 | 说明 |\n| --- | --- | --- | --- |\n'
  for (const id of ids) {
    const meta = manifest[id] || {}
    const title = meta.name || id.charAt(0).toUpperCase() + id.slice(1)
    const summary = (meta.summary || scenes[id] || '—').replace(/\|/g, '\\|')
    const dev = DEV_DEEP_DOCS[id]
      ? ` · [开发文档（GitHub）](${DEV_DEEP_DOCS[id]})`
      : ''
    block += `| \`${id}\` | ${title} | ${summary} | [${id}.md](./${id}.md)${dev} |\n`
  }
  block += '\n<!-- /theme-index-table -->\n'
  return block
}

function writeThemeIndex(ids) {
  const indexPath = path.join(outDir, 'index.md')
  const header = `# 内置主题说明文档（${ids.length} 个）

每个主题一篇独立说明：**主题特性**、**启用方式**与 **\`themes/<id>/config.js\` 配置表** 与代码同步。

\`\`\`bash
node scripts/generate-theme-user-docs.mjs
\`\`\`

从各主题 \`config.js\` 重新生成配置表（改键名后请执行）。\`proxio\` / \`heo\` 含手写章节，脚本只更新 \`<!-- theme-config-table -->\` 段。

`
  const footer = `
另见：[主题总览](./overview.md) · [内置主题全览](./THEMES_CATALOG.md)
`
  const tableBlock = buildThemeIndexTable(ids)
  let body = header + tableBlock + footer

  if (fs.existsSync(indexPath)) {
    const src = fs.readFileSync(indexPath, 'utf8')
    const start = '<!-- theme-index-table -->'
    const end = '<!-- /theme-index-table -->'
    if (src.includes(start) && src.includes(end)) {
      const re = new RegExp(
        `${start.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`
      )
      body = src.replace(re, tableBlock.trim())
    }
  }
  fs.writeFileSync(indexPath, body, 'utf8')
  console.log('wrote index:', indexPath)
}

const ids = getBuiltinThemeIds()
const missing = []

for (const id of ids) {
  const cfgPath = path.join(themesDir, id, 'config.js')
  const keys = extractKeys(cfgPath)
  const notes = extractComments(cfgPath)
  const meta = manifest[id] || {}
  const title = meta.name || id.charAt(0).toUpperCase() + id.slice(1)
  const summary = meta.summary || scenes[id] || ''
  const outPath = path.join(outDir, `${id}.md`)
  const tableBlock = buildConfigTableBlock(id, keys, notes)

  if (!manifest[id]) {
    console.warn('warn: no THEME_SWITCH_MANIFEST entry for', id)
  }

  if (fs.existsSync(outPath)) {
    const addedFeatures = ensureFeaturesSection(
      outPath,
      id,
      title,
      summary,
      keys
    )
    if (patchConfigTable(outPath, tableBlock)) {
      console.log(
        'patched:',
        outPath,
        keys.length,
        'keys',
        addedFeatures ? '+features' : ''
      )
      continue
    }
  }

  if (!fs.existsSync(outPath)) {
    missing.push(id)
  }

  fs.writeFileSync(outPath, buildFullDoc(id, title, summary, keys, notes), 'utf8')
  console.log('wrote', outPath, keys.length, 'keys')
}

writeThemeIndex(ids)

if (missing.length) {
  console.log('created new docs for:', missing.join(', '))
}

const extraMd = fs
  .readdirSync(outDir)
  .filter(f => f.endsWith('.md') && f !== 'index.md' && f !== 'README.md')
  .map(f => f.replace(/\.md$/, ''))
  .filter(id => !ids.includes(id) && !['THEMES_CATALOG', 'overview'].includes(id))

if (extraMd.length) {
  console.warn('warn: orphan theme docs (no themes/ folder):', extraMd.join(', '))
}

console.log(`ok: ${ids.length} builtin themes documented`)
