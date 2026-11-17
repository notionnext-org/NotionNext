export function resolveArticleCopyrightText({ post, locale, mode }) {
  const rawCopyright = post?.copyright
  const customCopyright =
    typeof rawCopyright === 'string' ? rawCopyright.trim() : rawCopyright
  const hasCustomCopyright =
    customCopyright !== undefined &&
    customCopyright !== null &&
    String(customCopyright).trim() !== ''

  if (mode === false || mode === 'false') {
    return ''
  }

  if (mode === 'custom' && !hasCustomCopyright) {
    return ''
  }

  return hasCustomCopyright
    ? customCopyright
    : locale?.COMMON?.COPYRIGHT_NOTICE || ''
}
