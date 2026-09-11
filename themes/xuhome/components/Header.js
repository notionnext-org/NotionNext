import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import CONFIG from '../config'

export default function Header(props) {
  const router = useRouter()
  const isHome = router.pathname === '/'
  const showHero = siteConfig('XUHOME_HERO_ENABLE', false, CONFIG)

  if (isHome && showHero) return null

  return (
    <div>
      <SmartLink
        href='/'
        className='no-underline hover:opacity-80 transition-opacity'
      >
        <h1 className='text-4xl font-black text-[#0284c7] uppercase tracking-tight'>
          {siteConfig('TITLE')}
        </h1>
      </SmartLink>
      {siteConfig('BIO') && (
        <p className='text-base text-slate-600 dark:text-slate-400 mt-2 font-semibold max-w-xl'>
          {siteConfig('BIO')}
        </p>
      )}
    </div>
  )
}
