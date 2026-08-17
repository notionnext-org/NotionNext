import { sha256 } from 'js-sha256'

const TRUE_VALUES = new Set(['1', 'true', 'yes', 'y', 'on', '是', '启用'])

function hasValue(value) {
  return value !== undefined && value !== null && String(value).trim() !== ''
}

function hasProofMetadata(post = {}) {
  return (
    hasValue(post.proofHash) ||
    hasValue(post.proofUrl) ||
    hasValue(post.ext?.proofHash) ||
    hasValue(post.ext?.proofUrl)
  )
}

export function isOriginalityProofEnabled(globalEnabled, post = {}) {
  const localFlag = post.proof ?? post.originalityProof ?? post.ext?.proof

  if (localFlag !== undefined && localFlag !== null) {
    return (
      localFlag === true ||
      TRUE_VALUES.has(String(localFlag).trim().toLowerCase())
    )
  }

  return (
    globalEnabled === true ||
    globalEnabled === 'true' ||
    hasProofMetadata(post)
  )
}

function normalizeText(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function normalizeUrl(siteUrl, post = {}) {
  const base = String(siteUrl || '').replace(/\/$/, '')
  const path = post.href || post.slug || post.id || ''

  if (/^https?:\/\//.test(path)) {
    return path
  }

  return `${base}/${String(path).replace(/^\//, '')}`
}

export function createOriginalityProof({
  enabled,
  post,
  content,
  author,
  siteUrl
}) {
  if (!enabled || !post || !hasValue(content)) {
    return null
  }

  const canonicalUrl = normalizeUrl(siteUrl, post)
  const payload = {
    title: normalizeText(post.title),
    pageId: normalizeText(post.id),
    author: normalizeText(author),
    url: canonicalUrl,
    content: normalizeText(content)
  }
  const localHash = sha256(JSON.stringify(payload))
  const externalHash = post.proofHash || post.ext?.proofHash
  const proofUrl = post.proofUrl || post.ext?.proofUrl || ''
  const proofTime =
    post.proofTime ||
    post.ext?.proofTime ||
    post.lastEditedDate ||
    post.publishDate ||
    ''

  return {
    algorithm: 'SHA-256',
    hash: externalHash || localHash,
    localHash,
    proofTime,
    proofUrl,
    pageId: post.id,
    title: post.title,
    url: canonicalUrl,
    provider: externalHash || proofUrl ? 'external' : 'local'
  }
}

export function applyOriginalityProofRecord(proof, record) {
  if (!proof || !record) return proof

  return {
    ...proof,
    hash: record.hash || proof.hash,
    proofTime: record.proofTime || proof.proofTime,
    proofUrl: record.proofUrl || proof.proofUrl || '/proofs/originality.json',
    provider: record.provider || 'manifest'
  }
}

export function formatOriginalityProofText(proof = {}) {
  return [
    proof.title && `Title: ${proof.title}`,
    proof.url && `URL: ${proof.url}`,
    proof.algorithm && `Algorithm: ${proof.algorithm}`,
    proof.hash && `Hash: ${proof.hash}`,
    proof.proofTime && `Time: ${proof.proofTime}`,
    proof.proofUrl && `Proof: ${proof.proofUrl}`,
    proof.provider && `Provider: ${proof.provider}`
  ]
    .filter(Boolean)
    .join('\n')
}
