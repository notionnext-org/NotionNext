import fs from 'node:fs'
import path from 'node:path'
import { buildPwaManifest } from './pwa'

let manifestWritten = false

export const writePwaManifest = ({ siteInfo = {}, notionConfig = {} } = {}) => {
  if (manifestWritten || process.env.BUILD_MODE !== 'true') return

  const manifestPath = path.join(process.cwd(), 'public', 'manifest.json')
  const manifest = buildPwaManifest({ siteInfo, notionConfig })

  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
  manifestWritten = true
}
