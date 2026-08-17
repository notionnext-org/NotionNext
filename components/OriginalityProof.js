import { siteConfig } from '@/lib/config'
import { formatOriginalityProofText } from '@/lib/utils/originalityProof'
import { useState } from 'react'

const formatProofTime = value => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toISOString().slice(0, 10)
}

const labels = {
  zh: {
    title: '原创存证',
    external: '外部凭证',
    manifest: '公开清单',
    local: '本地哈希',
    algorithm: '算法',
    time: '时间',
    hash: '哈希',
    proof: '凭证',
    copy: '复制证据',
    copied: '已复制',
    copyFailed: '请手动复制',
    note: '该信息用于辅助证明当前内容版本，不等同于法律公证或版权登记。'
  },
  en: {
    title: 'Originality proof',
    external: 'External proof',
    manifest: 'Public manifest',
    local: 'Local hash',
    algorithm: 'Algorithm',
    time: 'Time',
    hash: 'Hash',
    proof: 'Proof',
    copy: 'Copy evidence',
    copied: 'Copied',
    copyFailed: 'Copy manually',
    note: 'This is supporting evidence for the current content version, not legal notarization or copyright registration.'
  }
}

export default function OriginalityProof({ proof }) {
  const [copyStatus, setCopyStatus] = useState('')

  if (!proof?.hash) return null
  const t = String(siteConfig('LANG', 'zh-CN')).startsWith('zh')
    ? labels.zh
    : labels.en
  const copyText = formatOriginalityProofText(proof)
  const providerLabel =
    proof.provider === 'external'
      ? t.external
      : proof.provider === 'manifest'
        ? t.manifest
        : t.local
  const shortHash = `${String(proof.hash).slice(0, 12)}...`
  const copyProof = () => {
    if (!navigator.clipboard) {
      setCopyStatus(t.copyFailed)
      return
    }

    void navigator.clipboard
      .writeText(copyText)
      .then(() => setCopyStatus(t.copied))
      .catch(() => setCopyStatus(t.copyFailed))
  }

  return (
    <details className='mt-8 rounded border border-gray-200 bg-gray-50 p-4 text-sm leading-7 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300'>
      <summary className='cursor-pointer list-none font-semibold text-gray-900 dark:text-gray-100'>
        {t.title} · {providerLabel} · {shortHash}
      </summary>
      <div className='mt-3'>
        <span className='mr-2 font-medium'>{t.algorithm}:</span>
        <span>{proof.algorithm}</span>
      </div>
      {proof.proofTime && (
        <div className='mt-1'>
          <span className='mr-2 font-medium'>{t.time}:</span>
          <span>{formatProofTime(proof.proofTime)}</span>
        </div>
      )}
      <div className='mt-1'>
        <span className='mr-2 font-medium'>{t.hash}:</span>
        <code className='break-all rounded bg-white px-1 py-0.5 text-xs dark:bg-black'>
          {proof.hash}
        </code>
      </div>
      {proof.proofUrl && (
        <div className='mt-1'>
          <span className='mr-2 font-medium'>{t.proof}:</span>
          <a
            className='break-all underline'
            href={proof.proofUrl}
            target='_blank'
            rel='noreferrer'>
            {proof.proofUrl}
          </a>
        </div>
      )}
      <button
        type='button'
        className='mt-3 rounded border border-gray-300 bg-white px-3 py-1 text-xs text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
        onClick={copyProof}>
        {copyStatus || t.copy}
      </button>
      <p className='mt-2 text-xs text-gray-500 dark:text-gray-400'>
        {t.note}
      </p>
    </details>
  )
}
