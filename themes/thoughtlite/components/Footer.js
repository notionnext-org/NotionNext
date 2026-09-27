import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import BeiAnSite from '@/components/BeiAnSite'
import CopyRightDate from '@/components/CopyRightDate'
import PoweredBy from '@/components/PoweredBy'

const UPSTREAM_REPO = 'https://github.com/tuyuritio/astro-theme-thought-lite'
const UPSTREAM_AUTHOR = 'https://github.com/tuyuritio'

export const Footer = () => {
  return (
    <footer className='tl-footer relative z-10 mt-auto w-full px-4 py-8 text-sm'>
      <div className='mx-auto flex max-w-3xl flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left'>
        <CopyRightDate />
        <div className='flex flex-col items-center gap-1 md:items-end text-xs'>
          <div className='flex flex-wrap justify-center gap-x-2'>
            <BeiAnSite />
            <BeiAnGongAn />
          </div>
          <PoweredBy />
        </div>
      </div>
      <p className='mx-auto mt-6 max-w-3xl border-t border-[var(--tl-border)] pt-4 text-center text-xs leading-relaxed text-[var(--tl-muted)]'>
        <span className='font-medium text-[var(--tl-text)]'>ThoughtLite</span>
        {' 主题 · 设计参考 '}
        <a
          className='text-[var(--tl-accent)] underline-offset-2 hover:underline'
          href={UPSTREAM_REPO}
          target='_blank'
          rel='noopener noreferrer'>
          tuyuritio/astro-theme-thought-lite
        </a>
        {'（原作者 '}
        <a
          className='text-[var(--tl-accent)] underline-offset-2 hover:underline'
          href={UPSTREAM_AUTHOR}
          target='_blank'
          rel='noopener noreferrer'>
          tuyuritio
        </a>
        ）
      </p>
    </footer>
  )
}
