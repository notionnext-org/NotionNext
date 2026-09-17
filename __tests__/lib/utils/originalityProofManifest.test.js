/** @jest-environment node */

import fs from 'fs'
import os from 'os'
import path from 'path'
import {
  createOriginalityProofManifest,
  findOriginalityProofManifestRecord,
  isOriginalityProofAutoManifestEnabled,
  recordOriginalityProofManifest
} from '@/lib/utils/originalityProofManifest'

describe('originalityProofManifest', () => {
  it('creates a stable public manifest', () => {
    expect(
      createOriginalityProofManifest([
        { pageId: 'b', url: 'https://example.com/b', hash: 'hash-b' },
        { pageId: 'a', url: 'https://example.com/a', hash: 'hash-a' }
      ])
    ).toEqual({
      version: 1,
      proofs: [
        {
          pageId: 'a',
          title: '',
          url: 'https://example.com/a',
          algorithm: 'SHA-256',
          hash: 'hash-a',
          proofTime: '',
          proofUrl: '/proofs/originality.json',
          provider: 'manifest'
        },
        {
          pageId: 'b',
          title: '',
          url: 'https://example.com/b',
          algorithm: 'SHA-256',
          hash: 'hash-b',
          proofTime: '',
          proofUrl: '/proofs/originality.json',
          provider: 'manifest'
        }
      ]
    })
  })

  it('records and finds a manifest proof', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'notionnext-proof-'))
    recordOriginalityProofManifest(
      {
        pageId: 'page-id',
        title: 'Hello',
        url: 'https://example.com/article/hello',
        algorithm: 'SHA-256',
        hash: 'hash',
        proofTime: '2026-07-15'
      },
      true,
      root
    )

    expect(
      findOriginalityProofManifestRecord(
        { id: 'page-id', href: '/article/hello' },
        'https://example.com',
        root
      )
    ).toMatchObject({
      hash: 'hash',
      proofUrl: '/proofs/originality.json',
      provider: 'manifest'
    })
  })

  it('parses manifest enable flags', () => {
    expect(isOriginalityProofAutoManifestEnabled('true')).toBe(true)
    expect(isOriginalityProofAutoManifestEnabled('是')).toBe(true)
    expect(isOriginalityProofAutoManifestEnabled('false')).toBe(false)
  })
})
