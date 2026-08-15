/**
 * 内置主题列表（与 themes/<id>/config.js 同步）
 * 供 generate-theme-user-docs.mjs、.vitepress/config.mts 共用
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const REPO_ROOT = path.resolve(__dirname, '../..')
export const THEMES_DIR = path.join(REPO_ROOT, 'themes')
export const GITHUB_BLOB = 'https://github.com/notionnext-org/NotionNext/blob/main'

/** @returns {string[]} */
export function getBuiltinThemeIds() {
  return fs
    .readdirSync(THEMES_DIR)
    .filter(d => fs.existsSync(path.join(THEMES_DIR, d, 'config.js')))
    .sort()
}

/** @returns {Record<string, { name?: string, summary?: string }>} */
export function loadThemeSwitchManifest() {
  const manifestSrc = fs.readFileSync(
    path.join(REPO_ROOT, 'conf/themeSwitch.manifest.js'),
    'utf8'
  )
  /** @type {Record<string, { name?: string, summary?: string }>} */
  const manifest = {}
  for (const m of manifestSrc.matchAll(/(\w+):\s*\{([^}]+)\}/g)) {
    const id = m[1]
    const body = m[2]
    const nameM = body.match(/name:\s*'([^']+)'/)
    const sumM = body.match(/summary:\s*'([^']+)'/)
    manifest[id] = { name: nameM?.[1], summary: sumM?.[1] }
  }
  return manifest
}

/** @returns {{ text: string, link: string }[]} */
export function getThemeSidebarItems() {
  const manifest = loadThemeSwitchManifest()
  return getBuiltinThemeIds().map(id => ({
    text: manifest[id]?.name || id.charAt(0).toUpperCase() + id.slice(1),
    link: `/user-guide/themes/${id}`
  }))
}
