import fs from 'node:fs'
import path from 'node:path'
import BLOG from '@/blog.config'
import { buildPwaManifest } from './pwa'

let manifestWritten = false

const isPwaEnabled = value => {
  if (value === true || value === 1) return true
  if (typeof value !== 'string') return false
  return ['1', 'true', 'yes', 'on'].includes(value.trim().toLowerCase())
}

export const writePwaManifest = ({ siteInfo = {}, notionConfig = {} } = {}) => {
  if (
    manifestWritten ||
    process.env.BUILD_MODE !== 'true' ||
    !isPwaEnabled(notionConfig?.PWA_ENABLE ?? BLOG.PWA_ENABLE)
  ) {
    return
  }

  const manifestPath = path.join(process.cwd(), 'public', 'manifest.json')
  const manifest = buildPwaManifest({ siteInfo, notionConfig })

  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  manifestWritten = true
}
