/** @jest-environment node */

import {
  applyOriginalityProofRecord,
  createOriginalityProof,
  formatOriginalityProofText,
  isOriginalityProofEnabled
} from '@/lib/utils/originalityProof'

const post = {
  id: 'page-id',
  title: 'Hello',
  href: '/article/hello',
  lastEditedDate: '2026-07-15T00:00:00.000Z'
}

describe('originalityProof', () => {
  it('supports global opt-in, per-post opt-in, and metadata auto opt-in', () => {
    expect(isOriginalityProofEnabled(false, {})).toBe(false)
    expect(isOriginalityProofEnabled('true', {})).toBe(true)
    expect(isOriginalityProofEnabled(false, { proof: 'yes' })).toBe(true)
    expect(
      isOriginalityProofEnabled(false, { proofUrl: 'https://proof.example' })
    ).toBe(true)
    expect(isOriginalityProofEnabled(false, { ext: { proofHash: 'hash' } })).toBe(true)
    expect(
      isOriginalityProofEnabled(true, {
        proof: 'false',
        proofUrl: 'https://proof.example'
      })
    ).toBe(false)
  })

  it('generates a deterministic content hash', () => {
    const first = createOriginalityProof({
      enabled: true,
      post,
      content: 'Body text',
      author: 'Author',
      siteUrl: 'https://example.com'
    })
    const second = createOriginalityProof({
      enabled: true,
      post,
      content: 'Body text',
      author: 'Author',
      siteUrl: 'https://example.com'
    })

    expect(first.hash).toBe(second.hash)
    expect(first.url).toBe('https://example.com/article/hello')
  })

  it('changes the local hash when content changes', () => {
    const first = createOriginalityProof({
      enabled: true,
      post,
      content: 'Body text',
      author: 'Author',
      siteUrl: 'https://example.com'
    })
    const second = createOriginalityProof({
      enabled: true,
      post,
      content: 'Changed body text',
      author: 'Author',
      siteUrl: 'https://example.com'
    })

    expect(first.localHash).not.toBe(second.localHash)
  })

  it('uses an external proof hash when provided', () => {
    const proof = createOriginalityProof({
      enabled: true,
      post: {
        ...post,
        proofHash: 'external-hash',
        proofUrl: 'https://proof.example'
      },
      content: 'Body text',
      author: 'Author',
      siteUrl: 'https://example.com'
    })

    expect(proof.hash).toBe('external-hash')
    expect(proof.provider).toBe('external')
  })

  it('treats ext proof urls as external proof metadata', () => {
    const proof = createOriginalityProof({
      enabled: true,
      post: { ...post, ext: { proofUrl: 'https://proof.example/ext' } },
      content: 'Body text',
      author: 'Author',
      siteUrl: 'https://example.com'
    })

    expect(proof.proofUrl).toBe('https://proof.example/ext')
    expect(proof.provider).toBe('external')
  })

  it('formats copyable proof evidence', () => {
    expect(
      formatOriginalityProofText({
        title: 'Hello',
        url: 'https://example.com/article/hello',
        algorithm: 'SHA-256',
        hash: 'abc',
        provider: 'local'
      })
    ).toBe(
      [
        'Title: Hello',
        'URL: https://example.com/article/hello',
        'Algorithm: SHA-256',
        'Hash: abc',
        'Provider: local'
      ].join('\n')
    )
  })

  it('applies a public manifest record to a local proof', () => {
    expect(
      applyOriginalityProofRecord(
        {
          hash: 'local-hash',
          proofTime: '2026-07-15',
          provider: 'local'
        },
        {
          hash: 'manifest-hash',
          proofUrl: '/proofs/originality.json',
          provider: 'manifest'
        }
      )
    ).toMatchObject({
      hash: 'manifest-hash',
      proofTime: '2026-07-15',
      proofUrl: '/proofs/originality.json',
      provider: 'manifest'
    })
  })
})
