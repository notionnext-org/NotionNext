/**
 * MiniSearch tokenizer for Chinese / mixed docs.
 * Default VitePress splits only on whitespace/punctuation, so queries like「部署」match nothing.
 */
export function cjkTokenize(text: string): string[] {
  const tokens: string[] = []

  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' })
    for (const { segment } of segmenter.segment(text)) {
      const s = segment.trim()
      if (!s) continue
      if (/^[\u4e00-\u9fff]+$/.test(s)) {
        tokens.push(s, ...s.split(''))
      } else if (/[a-zA-Z0-9]/.test(s)) {
        tokens.push(
          ...s
            .split(/[\s\p{P}\p{Z}]+/u)
            .filter(Boolean)
            .flatMap((w) => [w, w.toLowerCase()])
        )
      } else {
        tokens.push(s)
      }
    }
    return [...new Set(tokens)]
  }

  const parts = text.split(/([\u4e00-\u9fff]+)/)
  for (const part of parts) {
    if (!part) continue
    if (/^[\u4e00-\u9fff]+$/.test(part)) {
      tokens.push(part, ...part.split(''))
    } else {
      for (const w of part.split(/[\s\p{P}\p{Z}]+/u)) {
        if (!w) continue
        tokens.push(w, w.toLowerCase())
      }
    }
  }
  return [...new Set(tokens)]
}
