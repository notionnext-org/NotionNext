import { siteConfig } from '@/lib/config'

const formatProofTime = value => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toISOString().slice(0, 10)
}

const labels = {
  zh: {
    title: '原创存证',
    algorithm: '算法',
    time: '时间',
    hash: '哈希',
    proof: '凭证',
    note: '该信息用于辅助证明当前内容版本，不等同于法律公证或版权登记。'
  },
  en: {
    title: 'Originality proof',
    algorithm: 'Algorithm',
    time: 'Time',
    hash: 'Hash',
    proof: 'Proof',
    note: 'This is supporting evidence for the current content version, not legal notarization or copyright registration.'
  }
}

export default function OriginalityProof({ proof }) {
  if (!proof?.hash) return null
  const t = String(siteConfig('LANG', 'zh-CN')).startsWith('zh')
    ? labels.zh
    : labels.en

  return (
    <section className='mt-8 rounded border border-gray-200 bg-gray-50 p-4 text-sm leading-7 text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300'>
      <div className='font-semibold text-gray-900 dark:text-gray-100'>
        {t.title}
      </div>
      <div className='mt-1'>
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
      <p className='mt-2 text-xs text-gray-500 dark:text-gray-400'>
        {t.note}
      </p>
    </section>
  )
}
