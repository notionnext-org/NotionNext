import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import Typewriter from './Typewriter'

export default function HeroSection(props) {
  const heroBio = siteConfig('XUHOME_HERO_BIO', '', CONFIG) || siteConfig('BIO')
  const heroTextsRaw = siteConfig('XUHOME_HERO_TEXTS', [], CONFIG)
  const heroTexts = Array.isArray(heroTextsRaw)
    ? heroTextsRaw
    : typeof heroTextsRaw === 'string'
      ? heroTextsRaw
          .split('|')
          .map(s => s.trim())
          .filter(Boolean)
      : []
  const heroTitle =
    siteConfig('XUHOME_HERO_TITLE', '', CONFIG) || siteConfig('TITLE')
  const typeSpeed = siteConfig('XUHOME_HERO_TYPE_SPEED', 80, CONFIG)
  const deleteSpeed = siteConfig('XUHOME_HERO_DELETE_SPEED', 40, CONFIG)
  const typePause = siteConfig('XUHOME_HERO_TYPE_PAUSE', 2000, CONFIG)
  const texts = heroTexts.length > 0 ? heroTexts : [heroTitle]

  return (
    <div className='mb-8'>
      <div
        className='text-3xl font-black uppercase tracking-tight mb-2 min-h-[2.5rem]'
        style={{ color: 'var(--xuhome-hero-title-active)' }}
      >
        {texts.length > 1 ? (
          <Typewriter
            texts={texts}
            speed={typeSpeed}
            deleteSpeed={deleteSpeed}
            pause={typePause}
            loop={true}
          />
        ) : (
          <Typewriter texts={texts} speed={typeSpeed} loop={false} />
        )}
      </div>

      {heroBio && (
        <p
          className='text-base font-semibold leading-relaxed max-w-2xl'
          style={{ color: 'var(--xuhome-hero-bio-active)' }}
        >
          {heroBio}
        </p>
      )}

      <div
        className='mt-6 border-b-[3px]'
        style={{ borderColor: 'var(--xuhome-hero-title-active)' }}
      />
    </div>
  )
}
