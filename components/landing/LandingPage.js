import BlurText from '@/components/landing/BlurText'
import HlsVideo from '@/components/landing/HlsVideo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowUpRight,
  BarChart3,
  Palette,
  Play,
  Shield,
  Zap
} from 'lucide-react'
import { motion } from 'motion/react'
import Head from 'next/head'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' }
]

const valueProps = [
  {
    icon: Zap,
    title: 'Days, Not Months',
    body: "Concept to launch at a pace that redefines fast. Because waiting isn't a strategy."
  },
  {
    icon: Palette,
    title: 'Obsessively Crafted',
    body: 'Every detail considered. Every element refined. Design so precise, it feels inevitable.'
  },
  {
    icon: BarChart3,
    title: 'Built to Convert',
    body: 'Layouts informed by data. Decisions backed by performance. Results you can measure.'
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    body: 'Enterprise-grade protection comes standard. SSL, DDoS mitigation, compliance. All included.'
  }
]

const testimonials = [
  {
    quote:
      "A complete rebuild in five days. The result outperformed everything we'd spent months building before.",
    name: 'Sarah Chen',
    role: 'CEO, Luminary'
  },
  {
    quote:
      "Conversions up 4x. That's not a typo. The design just works differently when it's built on real data.",
    name: 'Marcus Webb',
    role: 'Head of Growth, Arcline'
  },
  {
    quote:
      "They didn't just design our site. They defined our brand. World-class doesn't begin to cover it.",
    name: 'Elena Voss',
    role: 'Brand Director, Helix'
  }
]

const stats = [
  { value: '200+', label: 'Sites launched' },
  { value: '98%', label: 'Client satisfaction' },
  { value: '3.2x', label: 'More conversions' },
  { value: '5 days', label: 'Average delivery' }
]

const chessRows = [
  {
    title: 'Designed to convert. Built to perform.',
    body: 'Every pixel is intentional. Our AI studies what works across thousands of top sites--then builds yours to outperform them all.',
    cta: 'Learn more',
    image: '/images/feature-1.gif'
  },
  {
    title: 'It gets smarter. Automatically.',
    body: 'Your site evolves on its own. AI monitors every click, scroll, and conversion--then optimizes in real time. No manual updates. Ever.',
    cta: 'See how it works',
    image: '/images/feature-2.gif'
  }
]

const sectionBadgeClass =
  'liquid-glass inline-flex rounded-full px-3.5 py-1 text-xs font-medium uppercase tracking-[0.24em] text-white font-body'

const containerClass = 'mx-auto w-full max-w-screen-3xl px-8 lg:px-16'

function SectionBadge({ children }) {
  return <div className={sectionBadgeClass}>{children}</div>
}

function SectionHeading({ children, className = '' }) {
  return (
    <h2
      className={`font-heading text-4xl italic leading-[0.9] tracking-tight text-white md:text-5xl lg:text-6xl ${className}`}
    >
      {children}
    </h2>
  )
}

function BodyCopy({ children, className = '' }) {
  return (
    <p
      className={`font-body text-sm font-light leading-relaxed text-white/60 md:text-base ${className}`}
    >
      {children}
    </p>
  )
}

function VideoSection({
  src,
  poster = '/images/hero_bg.jpeg',
  desaturated = false,
  children,
  className = ''
}) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      <HlsVideo
        src={src}
        poster={poster}
        desaturated={desaturated}
        className='absolute inset-0 h-full w-full object-cover'
      />
      <div className='pointer-events-none absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-black to-transparent' />
      <div className='pointer-events-none absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-black to-transparent' />
      <div className='relative z-10'>{children}</div>
    </section>
  )
}

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>Studio | AI-Powered Web Design Agency</title>
        <meta
          name='description'
          content='Luxury editorial landing page for an AI-powered web design agency.'
        />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
        <link
          href='https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600&display=swap'
          rel='stylesheet'
        />
      </Head>

      <div className='bg-black font-body text-white'>
        <div className='relative z-10'>
          <header className='fixed left-0 right-0 top-4 z-50 px-8 py-3 lg:px-16'>
            <div className='mx-auto flex w-full max-w-screen-3xl items-center justify-between gap-4'>
              <a
                href='#home'
                className='liquid-glass flex h-14 w-14 items-center justify-center rounded-full'
                aria-label='Studio home'
              >
                <img
                  src='/images/starter/favicon.png'
                  alt='Studio logo'
                  className='h-12 w-12 rounded-full object-cover'
                />
              </a>

              <nav className='hidden md:flex'>
                <div className='liquid-glass flex items-center gap-1 rounded-full px-1.5 py-1'>
                  {navLinks.map(link => (
                    <a
                      key={link.href}
                      href={link.href}
                      className='rounded-full px-3 py-2 text-sm font-medium text-white/90 transition hover:text-white'
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href='#pricing'
                    className='inline-flex items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-black transition hover:bg-white/90'
                  >
                    Get Started
                    <ArrowUpRight className='h-4 w-4' />
                  </a>
                </div>
              </nav>

              <a
                href='#pricing'
                className='liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white md:hidden'
              >
                Get Started
                <ArrowUpRight className='h-4 w-4' />
              </a>
            </div>
          </header>

          <main>
            <section
              id='home'
              className='relative flex h-[1000px] overflow-visible'
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                poster='/images/hero_bg.jpeg'
                preload='auto'
                className='absolute left-0 z-0 h-auto w-full object-contain'
                style={{ top: '20%' }}
              >
                <source
                  src='https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4'
                  type='video/mp4'
                />
              </video>
              <div className='absolute inset-0 z-0 bg-black/5' />
              <div className='pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-[300px] bg-gradient-to-b from-transparent to-black' />

              <div
                className={`${containerClass} relative z-10 flex h-full flex-col items-center text-center`}
                style={{ paddingTop: '150px' }}
              >
                <div className='liquid-glass inline-flex items-center gap-2 rounded-full px-1 py-1'>
                  <span className='rounded-full bg-white px-3 py-1 text-xs font-semibold text-black'>
                    New
                  </span>
                  <span className='pr-3 text-xs font-medium text-white'>
                    Introducing AI-powered web design.
                  </span>
                </div>

                <BlurText
                  text='The Website Your Brand Deserves'
                  className='mt-8 max-w-2xl font-heading text-6xl italic leading-[0.8] tracking-[-4px] text-white md:text-7xl lg:text-[5.5rem]'
                  delay={100}
                  direction='bottom'
                  mode='words'
                />

                <motion.p
                  initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
                  animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
                  className='mt-8 max-w-xl text-sm font-light leading-tight text-white md:text-base'
                >
                  Stunning design. Blazing performance. Built by AI, refined by
                  experts. This is web design, wildly reimagined.
                </motion.p>

                <motion.div
                  initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
                  animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
                  className='mt-10 flex flex-wrap items-center justify-center gap-4'
                >
                  <a href='#pricing'>
                    <Button className='px-5 py-2.5'>
                      Get Started
                      <ArrowUpRight className='h-4 w-4' />
                    </Button>
                  </a>

                  <a
                    href='https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4'
                    target='_blank'
                    rel='noreferrer'
                    className='inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-white/80'
                  >
                    <Play className='h-4 w-4 fill-current' />
                    Watch the Film
                  </a>
                </motion.div>

                <div className='mt-auto flex w-full flex-col items-center pb-8 pt-16'>
                  <div className='liquid-glass mb-8 rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/80'>
                    Trusted by the teams behind
                  </div>
                  <div className='flex flex-wrap items-center justify-center gap-12 md:gap-16'>
                    {['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma'].map(
                      partner => (
                        <span
                          key={partner}
                          className='font-heading text-2xl italic text-white md:text-3xl'
                        >
                          {partner}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>

            <div className='bg-black'>
              <VideoSection
                src='https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8'
                className='py-28'
              >
                <div
                  id='process'
                  className={`${containerClass} flex min-h-[500px] flex-col items-center justify-center text-center`}
                >
                  <SectionBadge>How It Works</SectionBadge>
                  <SectionHeading className='mt-8 max-w-3xl'>
                    You dream it. We ship it.
                  </SectionHeading>
                  <BodyCopy className='mt-6 max-w-xl'>
                    Share your vision. Our AI handles the rest--wireframes,
                    design, code, launch. All in days, not quarters.
                  </BodyCopy>
                  <a href='#pricing' className='mt-10'>
                    <Button size='lg'>Get Started</Button>
                  </a>
                </div>
              </VideoSection>

              <section id='work' className='py-28'>
                <div className={containerClass}>
                  <div className='mx-auto max-w-3xl text-center'>
                    <SectionBadge>Capabilities</SectionBadge>
                    <SectionHeading className='mt-8'>
                      Pro features. Zero complexity.
                    </SectionHeading>
                  </div>

                  <div className='mt-20 space-y-8'>
                    {chessRows.map((row, index) => (
                      <div
                        key={row.title}
                        className={`grid items-center gap-8 lg:grid-cols-2 ${
                          index === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                        }`}
                      >
                        <Card className='rounded-[2rem] p-8 md:p-12'>
                          <div className='max-w-xl'>
                            <h3 className='font-heading text-3xl italic leading-tight text-white md:text-4xl'>
                              {row.title}
                            </h3>
                            <BodyCopy className='mt-6 max-w-lg'>
                              {row.body}
                            </BodyCopy>
                            <a href='#services' className='mt-8 inline-flex'>
                              <Button>{row.cta}</Button>
                            </a>
                          </div>
                        </Card>

                        <Card className='rounded-[2rem] p-4'>
                          <div className='overflow-hidden rounded-2xl'>
                            <img
                              src={row.image}
                              alt={row.title}
                              className='h-full w-full object-cover'
                            />
                          </div>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id='services' className='py-10'>
                <div className={containerClass}>
                  <div className='mx-auto max-w-3xl text-center'>
                    <SectionBadge>Why Us</SectionBadge>
                    <SectionHeading className='mt-8'>
                      The difference is everything.
                    </SectionHeading>
                  </div>

                  <div className='mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
                    {valueProps.map(item => {
                      const Icon = item.icon

                      return (
                        <Card key={item.title} className='h-full'>
                          <CardContent className='flex h-full flex-col p-6'>
                            <div className='liquid-glass-strong flex h-10 w-10 items-center justify-center rounded-full'>
                              <Icon className='h-4 w-4 text-white' />
                            </div>
                            <h3 className='mt-6 text-xl font-medium text-white'>
                              {item.title}
                            </h3>
                            <BodyCopy className='mt-4 text-white/70'>
                              {item.body}
                            </BodyCopy>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              </section>

              <VideoSection
                src='https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8'
                desaturated
                className='py-28'
              >
                <div className={containerClass}>
                  <Card className='rounded-[2rem]'>
                    <CardContent className='p-12 md:p-16'>
                      <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4'>
                        {stats.map(item => (
                          <div key={item.label}>
                            <div className='font-heading text-4xl italic text-white md:text-5xl lg:text-6xl'>
                              {item.value}
                            </div>
                            <p className='mt-3 text-sm font-light text-white/60'>
                              {item.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </VideoSection>

              <section className='py-28'>
                <div className={containerClass}>
                  <div className='mx-auto max-w-3xl text-center'>
                    <SectionBadge>What They Say</SectionBadge>
                    <SectionHeading className='mt-8'>
                      Don&apos;t take our word for it.
                    </SectionHeading>
                  </div>

                  <div className='mt-16 grid grid-cols-1 gap-6 md:grid-cols-3'>
                    {testimonials.map(item => (
                      <Card key={item.name} className='h-full'>
                        <CardContent className='flex h-full flex-col p-8'>
                          <p className='text-sm font-light italic leading-relaxed text-white/80'>
                            &ldquo;{item.quote}&rdquo;
                          </p>
                          <div className='mt-8'>
                            <div className='text-sm font-medium text-white'>
                              {item.name}
                            </div>
                            <div className='mt-1 text-xs font-light text-white/50'>
                              {item.role}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>

              <VideoSection
                src='https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8'
                className='pb-14 pt-28'
              >
                <div id='pricing' className={containerClass}>
                  <div className='mx-auto flex max-w-4xl flex-col items-center text-center'>
                    <SectionHeading className='max-w-3xl text-5xl md:text-6xl lg:text-7xl'>
                      Your next website starts here.
                    </SectionHeading>
                    <BodyCopy className='mt-6 max-w-2xl text-white/70'>
                      Book a free strategy call. See what AI-powered design can
                      do. No commitment, no pressure. Just possibilities.
                    </BodyCopy>

                    <div className='mt-10 flex flex-wrap items-center justify-center gap-4'>
                      <a href='mailto:hello@studio.com'>
                        <Button size='lg'>Book a Call</Button>
                      </a>
                      <a href='#services'>
                        <Button variant='secondary' size='lg'>
                          View Pricing
                        </Button>
                      </a>
                    </div>

                    <div className='mt-32 flex w-full flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row md:items-center md:justify-between'>
                      <p>(c) 2026 Studio. All rights reserved.</p>
                      <div className='flex items-center justify-center gap-6'>
                        {['Privacy', 'Terms', 'Contact'].map(link => (
                          <a
                            key={link}
                            href='mailto:hello@studio.com'
                            className='transition hover:text-white/70'
                          >
                            {link}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </VideoSection>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
