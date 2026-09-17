import fs from 'fs'
import path from 'path'

const TRUE_VALUES = new Set(['1', 'true', 'yes', 'y', 'on', '是', '启用'])
const PROOF_PATH = path.join('public', 'proofs', 'originality.json')

export function isOriginalityProofAutoManifestEnabled(value) {
  return value === true || TRUE_VALUES.has(String(value).trim().toLowerCase())
}

function getManifestPath(rootDir = process.cwd()) {
  return path.join(rootDir, PROOF_PATH)
}

function readManifest(rootDir = process.cwd()) {
  const file = getManifestPath(rootDir)
  if (!fs.existsSync(file)) return { version: 1, proofs: [] }

  try {
    const manifest = JSON.parse(fs.readFileSync(file, 'utf8'))
    return {
      version: 1,
      proofs: Array.isArray(manifest.proofs) ? manifest.proofs : []
    }
  } catch {
    return { version: 1, proofs: [] }
  }
}

function normalizeUrl(siteUrl, post = {}) {
  const base = String(siteUrl || '').replace(/\/$/, '')
  const slug = post.href || post.slug || post.id || ''

  if (/^https?:\/\//.test(slug)) return slug
  return `${base}/${String(slug).replace(/^\//, '')}`
}

function entryKey(entry = {}) {
  return entry.pageId || entry.url
}

export function createOriginalityProofManifest(proofs = []) {
  const proofMap = new Map()

  proofs.forEach(proof => {
    if (!proof?.hash) return
    const entry = {
      pageId: proof.pageId || '',
      title: proof.title || '',
      url: proof.url || '',
      algorithm: proof.algorithm || 'SHA-256',
      hash: proof.hash,
      proofTime: proof.proofTime || '',
      proofUrl: '/proofs/originality.json',
      provider: 'manifest'
    }
    if (!entryKey(entry)) return
    proofMap.set(entryKey(entry), entry)
  })

  return {
    version: 1,
    proofs: [...proofMap.values()].sort((a, b) =>
      String(a.url || a.pageId).localeCompare(String(b.url || b.pageId))
    )
  }
}

export function findOriginalityProofManifestRecord(
  post,
  siteUrl,
  rootDir = process.cwd()
) {
  const manifest = readManifest(rootDir)
  const url = normalizeUrl(siteUrl, post)

  return (
    manifest.proofs.find(entry => entry.pageId && entry.pageId === post?.id) ||
    manifest.proofs.find(entry => entry.url && entry.url === url) ||
    null
  )
}

export function recordOriginalityProofManifest(
  proof,
  enabled,
  rootDir = process.cwd()
) {
  if (!enabled || !proof?.hash) return

  const current = readManifest(rootDir)
  const next = createOriginalityProofManifest([...current.proofs, proof])
  const file = getManifestPath(rootDir)
  const content = `${JSON.stringify(next, null, 2)}\n`
  fs.mkdirSync(path.dirname(file), { recursive: true })

  if (fs.existsSync(file) && fs.readFileSync(file, 'utf8') === content) return
  fs.writeFileSync(file, content, 'utf8')
}
