---
name: XuHome
colors:
  primary: '#0284c7'
  primary-hover: '#0ea5e9'
  accent: '#fde68a'
  on-primary: '#000000'
  on-accent: '#000000'
  background: '#faf8f5'
  surface: '#ffffff'
  on-surface: '#0f172a'
  text-secondary: '#475569'
  dark-background: '#0b1120'
  dark-surface: '#172033'
  dark-on-surface: '#f8fafc'
  dark-text-secondary: '#cbd5e1'
typography:
  body:
    fontFamily: ui-sans-serif
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.6
  label:
    fontFamily: ui-sans-serif
    fontSize: 12px
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
components:
  page:
    backgroundColor: '{colors.background}'
    textColor: '{colors.on-surface}'
  page-dark:
    backgroundColor: '{colors.dark-background}'
    textColor: '{colors.dark-on-surface}'
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.on-primary}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: 8px
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
    textColor: '{colors.on-primary}'
  chip-accent:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.on-accent}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: 4px
  card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.on-surface}'
    rounded: '{rounded.sm}'
    padding: 16px
  card-dark:
    backgroundColor: '{colors.dark-surface}'
    textColor: '{colors.dark-on-surface}'
    rounded: '{rounded.sm}'
    padding: 16px
  metadata:
    textColor: '{colors.text-secondary}'
    typography: '{typography.label}'
  metadata-dark:
    textColor: '{colors.dark-text-secondary}'
    typography: '{typography.label}'
---

# Overview

XuHome uses a compact neo-brutalist blog layout: hard borders, offset shadows and small accent blocks. Color customization must preserve legibility before preserving a particular foreground color.

# Colors

Light and dark palettes are independent. Dark mode uses dark page and card surfaces across all large areas; light surfaces must not remain as large blocks. Primary, hover and accent backgrounds always derive their foreground from the candidate with the higher WCAG contrast ratio.

# Typography

Body copy stays compact and readable. Labels, dates and controls use heavy uppercase text to retain the neo-brutalist character.

# Layout

Use an 8px rhythm with compact 4px adjustments. Content remains centered with a readable main column and a narrower sidebar.

# Elevation & Depth

Depth comes from hard offset shadows in the active border color, never from soft white glows. Dark mode keeps those shadows saturated but avoids bright surface blocks.

# Shapes

Cards, buttons and inputs use a restrained 2px radius and visible 2–3px borders.

# Components

Buttons and tags use the same interaction rules: primary backgrounds use `on-primary`, hover backgrounds use `on-primary-hover`, and accent backgrounds use `on-accent`. Text colors must change together with their background state. Hero text uses its custom colors in light mode and the active dark primary/text colors in dark mode.

The theme console behaves like a fast right-side drawer. It enters from just beyond the viewport in 200ms with an ease-out curve and exits before unmounting, so users can visually locate it. Respect `prefers-reduced-motion` by removing the transition.

# Do's and Don'ts

- Do keep body and secondary text light on dark surfaces.
- Do switch border and hard-shadow colors with the active mode.
- Do derive button foreground colors whenever a palette background changes.
- Do animate the theme console from the screen edge instead of making it appear abruptly.
- Don't hardcode `text-white` for arbitrary user-selected colors.
- Don't write active light-mode aliases inline; doing so prevents dark-mode CSS from taking effect.
