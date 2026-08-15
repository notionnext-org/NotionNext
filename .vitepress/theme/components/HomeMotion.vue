<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

let teardown: (() => void) | undefined

function isHomeRoute() {
  return route.path === '/' || route.path === '/index.html'
}

async function resetMotion() {
  teardown?.()
  teardown = undefined

  if (!isHomeRoute() || typeof window === 'undefined') {
    return
  }

  await nextTick()
  await new Promise((resolve) => window.requestAnimationFrame(() => resolve(undefined)))

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) {
    return
  }

  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger')
  ])

  gsap.registerPlugin(ScrollTrigger)

  const ctx = gsap.context(() => {
    const heroTargets = [
      '.VPHomeHero .name',
      '.VPHomeHero .text',
      '.VPHomeHero .tagline',
      '.VPHomeHero .actions',
      '.VPHomeHero .image'
    ].filter((selector) => document.querySelector(selector))

    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .from(heroTargets, {
        autoAlpha: 0,
        y: 24,
        duration: 0.72,
        stagger: 0.08,
        clearProps: 'transform,visibility,opacity'
      })
      .from(
        '.VPHome .VPFeature',
        {
          autoAlpha: 0,
          y: 18,
          duration: 0.52,
          stagger: 0.05,
          clearProps: 'transform,visibility,opacity'
        },
        '-=0.28'
      )

    gsap.utils.toArray('.nn-home-section').forEach((section, sectionIndex) => {
      const homeSection = section as HTMLElement
      const sectionTargets = homeSection.querySelectorAll(
        '.nn-home-kicker, h2, .nn-section-heading > a, .nn-compare-card, .nn-step-card, .nn-theme-card, .nn-usecase-grid > a, .nn-open-grid > div, .nn-faq-list details'
      )

      gsap.from(sectionTargets.length ? sectionTargets : homeSection, {
        autoAlpha: 0,
        y: 30,
        duration: 0.62,
        ease: 'power3.out',
        stagger: 0.055,
        clearProps: 'transform,visibility,opacity',
        scrollTrigger: {
          trigger: homeSection,
          start: 'top 82%',
          once: true,
          refreshPriority: sectionIndex
        }
      })
    })

    ScrollTrigger.refresh()
  }, document.body)

  teardown = () => {
    ctx.revert()
  }
}

onMounted(() => {
  resetMotion()
})

watch(
  () => route.path,
  () => {
    resetMotion()
  }
)

onBeforeUnmount(() => {
  teardown?.()
})
</script>

<template></template>
