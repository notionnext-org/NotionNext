/* eslint-disable react/no-unknown-property */
import CONFIG from './config'
import { themeConsoleStyle } from '@/lib/themeConsoleStyle'
/**
 * ThoughtLite 风格：仅作用于 #theme-thoughtlite
 * 设计为 CSS 变量 + 少量全局子选择器，便于与 Notion 正文协同。
 */
const Style = () => {
  return (
    <style jsx global>{`
      #theme-thoughtlite {
        --tl-bg: #faf9f7;
        --tl-surface: #ffffff;
        --tl-text: #1a1a1a;
        --tl-muted: #6b6b6b;
        --tl-faint: #a3a3a3;
        --tl-border: #e8e6e3;
        --tl-accent: #2563eb;
        --tl-accent-soft: rgba(37, 99, 235, 0.08);
        --tl-radius: 10px;
        --tl-font-display: ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif;
        --tl-font-body: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto,
          'Helvetica Neue', Arial, 'Noto Sans', 'PingFang SC', 'Microsoft YaHei', sans-serif;
        background-color: var(--tl-bg);
        color: var(--tl-text);
        font-family: var(--tl-font-body);
      }

      .dark #theme-thoughtlite {
        --tl-bg: #0c0c0d;
        --tl-surface: #141416;
        --tl-text: #ececec;
        --tl-muted: #9ca3af;
        --tl-faint: #6b7280;
        --tl-border: #27272a;
        --tl-accent: #60a5fa;
        --tl-accent-soft: rgba(96, 165, 250, 0.12);
      }

      #theme-thoughtlite .tl-header {
        background-color: color-mix(in srgb, var(--tl-bg) 88%, transparent);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid var(--tl-border);
        overflow: visible;
      }

      #theme-thoughtlite .tl-brand {
        font-family: var(--tl-font-display);
        letter-spacing: -0.02em;
      }

      #theme-thoughtlite .tl-nav-link {
        color: var(--tl-muted);
        font-size: 0.875rem;
        transition: color 0.15s ease;
      }

      #theme-thoughtlite .tl-nav-link:hover {
        color: var(--tl-text);
      }

      #theme-thoughtlite .tl-icon-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 9999px;
        color: var(--tl-muted);
        border: 1px solid transparent;
        transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
      }

      #theme-thoughtlite .tl-icon-btn:hover {
        color: var(--tl-text);
        background: var(--tl-accent-soft);
        border-color: var(--tl-border);
      }

      #theme-thoughtlite .tl-timeline {
        padding-bottom: 3rem;
      }

      #theme-thoughtlite .tl-timeline-day {
        margin-bottom: 2.5rem;
      }

      #theme-thoughtlite .tl-timeline-day-label {
        font-family: var(--tl-font-display);
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--tl-text);
        margin: 0 0 1rem;
        padding-bottom: 0.35rem;
        border-bottom: 1px solid var(--tl-border);
      }

      #theme-thoughtlite .tl-timeline-rail {
        list-style: none;
        margin: 0;
        padding: 0;
        border-left: 1px solid var(--tl-border);
        margin-left: 0.35rem;
      }

      #theme-thoughtlite .tl-timeline-item {
        position: relative;
        padding-left: 1.25rem;
        margin-bottom: 0.25rem;
      }

      #theme-thoughtlite .tl-timeline-item::before {
        content: '';
        position: absolute;
        left: -5px;
        top: 0.65rem;
        width: 9px;
        height: 9px;
        border-radius: 9999px;
        background: var(--tl-surface);
        border: 2px solid var(--tl-accent);
      }

      #theme-thoughtlite .tl-card {
        background: var(--tl-surface);
        border: 1px solid var(--tl-border);
        border-radius: var(--tl-radius);
      }

      #theme-thoughtlite .tl-latest-card {
        border-left: 3px solid var(--tl-accent);
        padding: 1rem 1.25rem;
        margin-bottom: 2rem;
        background: var(--tl-surface);
        border-radius: 0 var(--tl-radius) var(--tl-radius) 0;
        border: 1px solid var(--tl-border);
        border-left-width: 3px;
      }

      #theme-thoughtlite .tl-latest-card h3 {
        margin: 0 0 0.5rem;
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--tl-muted);
        font-weight: 600;
      }

      #theme-thoughtlite #article-wrapper.tl-prose-wrap {
        font-size: 1.05rem;
        line-height: 1.75;
        color: var(--tl-text);
      }

      #theme-thoughtlite #article-wrapper.tl-prose-wrap .notion {
        color: inherit;
      }

      #theme-thoughtlite #article-wrapper.tl-prose-wrap h1,
      #theme-thoughtlite #article-wrapper.tl-prose-wrap h2,
      #theme-thoughtlite #article-wrapper.tl-prose-wrap h3 {
        font-family: var(--tl-font-display);
        letter-spacing: -0.02em;
      }

      #theme-thoughtlite .tl-article-hero {
        margin-bottom: 1.5rem;
      }

      #theme-thoughtlite .tl-article-title {
        font-family: var(--tl-font-display);
        font-size: clamp(1.75rem, 4vw, 2.25rem);
        font-weight: 700;
        line-height: 1.2;
        margin: 0 0 0.75rem;
        color: var(--tl-text);
      }

      #theme-thoughtlite .tl-footer {
        border-top: 1px solid var(--tl-border);
        background: color-mix(in srgb, var(--tl-bg) 96%, var(--tl-surface));
        color: var(--tl-muted);
      }

      #theme-thoughtlite .tl-page-hero {
        font-family: var(--tl-font-display);
      }

      #theme-thoughtlite .tl-archive-item::before {
        content: '';
        position: absolute;
        left: -4px;
        top: 1.15rem;
        width: 7px;
        height: 7px;
        border-radius: 9999px;
        background: var(--tl-surface);
        border: 2px solid var(--tl-accent);
      }

      #theme-thoughtlite .tl-chip {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        padding: 0.4rem 0.85rem;
        margin: 0.25rem;
        border-radius: 9999px;
        border: 1px solid var(--tl-border);
        background: var(--tl-surface);
        font-size: 0.875rem;
        color: var(--tl-text);
        text-decoration: none;
        transition:
          border-color 0.15s ease,
          color 0.15s ease,
          background 0.15s ease;
      }

      #theme-thoughtlite .tl-chip:hover {
        border-color: var(--tl-accent);
        color: var(--tl-accent);
        background: var(--tl-accent-soft);
      }

      #theme-thoughtlite .tl-pager {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.45rem 1rem;
        border-radius: 9999px;
        border: 1px solid var(--tl-border);
        background: var(--tl-surface);
        color: var(--tl-text);
        text-decoration: none;
        font-weight: 500;
        transition:
          border-color 0.15s ease,
          color 0.15s ease;
      }

      #theme-thoughtlite .tl-pager:hover:not(.tl-pager--disabled) {
        border-color: var(--tl-accent);
        color: var(--tl-accent);
      }

      #theme-thoughtlite .tl-pager--disabled {
        visibility: hidden;
        pointer-events: none;
      }

      #theme-thoughtlite .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      #theme-thoughtlite .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      ${themeConsoleStyle('thoughtlite', CONFIG)}
  `}</style>
  )
}

export { Style }
