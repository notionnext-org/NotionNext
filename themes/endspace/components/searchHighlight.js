import { loadExternalResource } from '@/lib/utils'

const escapeRegExp = value =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Endspace search highlight must be idempotent because users can resubmit the
 * same keyword on the same result DOM.
 */
export default async function replaceEndspaceSearchResult({ doms, search, target }) {
  if (!doms || !target) return

  try {
    await loadExternalResource('https://cdnjs.cloudflare.com/ajax/libs/mark.js/8.11.1/mark.min.js', 'js')
    const Mark = window.Mark
    const instance = new Mark(doms)
    const re = search ? new RegExp(escapeRegExp(search), 'gim') : null

    instance.unmark({
      element: target.element,
      className: target.className,
      done: () => {
        if (re) {
          instance.markRegExp(re, target)
        }
      }
    })
  } catch (error) {
    console.error('endspace search highlight failed', error)
  }
}
