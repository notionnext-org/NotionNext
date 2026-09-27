import { useEffect, useRef, useState } from 'react'
import { useNotionContext } from 'react-notion-x'
import NotionTabs from '@/components/NotionTabs'

export const HTML_ARTIFACT_RESIZE_MESSAGE = 'notion-next:html-artifact-resize'
export const HTML_ARTIFACT_MEASURE_MESSAGE = 'notion-next:html-artifact-measure'
export const HTML_ARTIFACT_MIN_HEIGHT = 32
export const HTML_ARTIFACT_MAX_HEIGHT = 4096

const HTML_ARTIFACT_RESIZE_BRIDGE = `<script data-notion-next-auto-height>
(() => {
  if (window.__notionNextHtmlArtifactAutoHeight) return
  window.__notionNextHtmlArtifactAutoHeight = true

  const messageType = ${JSON.stringify(HTML_ARTIFACT_RESIZE_MESSAGE)}
  const measureMessageType = ${JSON.stringify(HTML_ARTIFACT_MEASURE_MESSAGE)}
  let frameId = null
  let lastHeight = 0

  const measure = () => {
    frameId = null
    const body = document.body
    if (!body) return

    const bodyRect = body.getBoundingClientRect()
    let contentTop = bodyRect.top
    let contentBottom = bodyRect.bottom

    for (const element of body.children) {
      const rect = element.getBoundingClientRect()
      if (rect.width === 0 && rect.height === 0) continue
      contentTop = Math.min(contentTop, rect.top)
      contentBottom = Math.max(contentBottom, rect.bottom)
    }

    const style = window.getComputedStyle(body)
    const marginTop = Number.parseFloat(style.marginTop) || 0
    const marginBottom = Number.parseFloat(style.marginBottom) || 0
    let height = contentBottom - contentTop + marginTop + marginBottom

    if (body.scrollHeight > window.innerHeight + 1) {
      height = Math.max(height, body.scrollHeight + marginTop + marginBottom)
    }

    height = Math.ceil(height)
    if (!Number.isFinite(height) || height <= 0 || height === lastHeight) return

    lastHeight = height
    window.parent.postMessage({ type: messageType, height }, '*')
  }

  const scheduleMeasure = () => {
    if (frameId !== null) return
    frameId = window.requestAnimationFrame(measure)
  }

  window.addEventListener('message', event => {
    if (event.source !== window.parent) return
    if (event.data?.type !== measureMessageType) return
    scheduleMeasure()
  })

  const start = () => {
    if (!document.body) return

    if (typeof ResizeObserver === 'function') {
      const resizeObserver = new ResizeObserver(scheduleMeasure)
      resizeObserver.observe(document.body)
    }

    if (typeof MutationObserver === 'function') {
      const mutationObserver = new MutationObserver(scheduleMeasure)
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
      })
    }

    window.addEventListener('load', scheduleMeasure, true)
    document.fonts?.ready?.then(scheduleMeasure).catch(() => {})
    scheduleMeasure()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true })
  } else {
    start()
  }
})()
</script>`

export const withHtmlArtifactResizeBridge = srcDoc => {
  if (typeof srcDoc !== 'string' || !srcDoc) return srcDoc

  const injectBeforeClosingTag = tagName => {
    const closingTagPattern = new RegExp(`</${tagName}\\s*>`, 'gi')
    let closingTagIndex = -1

    for (const match of srcDoc.matchAll(closingTagPattern)) {
      closingTagIndex = match.index
    }

    if (closingTagIndex < 0) return null
    return `${srcDoc.slice(
      0,
      closingTagIndex
    )}${HTML_ARTIFACT_RESIZE_BRIDGE}\n${srcDoc.slice(closingTagIndex)}`
  }

  const documentWithBridge =
    injectBeforeClosingTag('body') || injectBeforeClosingTag('html')

  if (documentWithBridge) return documentWithBridge
  return `${srcDoc}\n${HTML_ARTIFACT_RESIZE_BRIDGE}`
}

export const normalizeHtmlArtifactHeight = value => {
  const height = Number(value)
  if (!Number.isFinite(height) || height <= 0) return null

  return Math.min(
    HTML_ARTIFACT_MAX_HEIGHT,
    Math.max(HTML_ARTIFACT_MIN_HEIGHT, Math.ceil(height))
  )
}

const getConfiguredHeight = (block, isHtmlArtifact) => {
  const height = Number(block?.format?.block_height)
  if (Number.isFinite(height) && height > 0) return height
  return isHtmlArtifact ? 640 : 480
}

const NotionEmbed = ({ block }) => {
  const { recordMap } = useNotionContext()
  const iframeRef = useRef(null)
  const source =
    recordMap?.signed_urls?.[block?.id] ||
    block?.format?.display_source ||
    block?.properties?.source?.[0]?.[0]
  const isHtmlArtifact =
    block?.type === 'embed' && block?.format?.embed_variant === 'html_artifact'
  const isNotionTabs =
    block?.type === 'embed' && block?.format?.embed_variant === 'notion_tabs'
  const srcDoc = isHtmlArtifact
    ? block?.format?.html_artifact_content
    : undefined
  const configuredHeight = getConfiguredHeight(block, isHtmlArtifact)
  const [height, setHeight] = useState(configuredHeight)

  const requestHtmlArtifactHeight = () => {
    if (!isHtmlArtifact) return
    iframeRef.current?.contentWindow?.postMessage(
      { type: HTML_ARTIFACT_MEASURE_MESSAGE },
      '*'
    )
  }

  useEffect(() => {
    setHeight(configuredHeight)
  }, [block?.id, configuredHeight])

  // block.id is intentionally excluded: the handler reads the current iframe
  // ref at message time, and onLoad remeasures whenever its document changes.
  useEffect(() => {
    if (!isHtmlArtifact) return

    const handleResizeMessage = event => {
      if (event.source !== iframeRef.current?.contentWindow) return
      if (event.data?.type !== HTML_ARTIFACT_RESIZE_MESSAGE) return

      const nextHeight = normalizeHtmlArtifactHeight(event.data.height)
      if (nextHeight === null) return
      setHeight(currentHeight =>
        currentHeight === nextHeight ? currentHeight : nextHeight
      )
    }

    window.addEventListener('message', handleResizeMessage)
    iframeRef.current?.contentWindow?.postMessage(
      { type: HTML_ARTIFACT_MEASURE_MESSAGE },
      '*'
    )

    return () => window.removeEventListener('message', handleResizeMessage)
  }, [isHtmlArtifact])

  if (isNotionTabs) {
    return <NotionTabs block={block} />
  }

  if (
    !srcDoc &&
    (typeof source !== 'string' || source.startsWith('attachment:'))
  ) {
    return null
  }

  const title =
    block?.properties?.title?.[0]?.[0] ||
    (isHtmlArtifact ? 'Notion HTML block' : 'iframe embed')
  const resizableSrcDoc = isHtmlArtifact
    ? withHtmlArtifactResizeBridge(srcDoc)
    : undefined

  return (
    <figure className='notion-asset-wrapper notion-asset-wrapper-embed'>
      <div style={{ height, position: 'relative' }}>
        <iframe
          ref={iframeRef}
          className='notion-asset-object-fit'
          src={resizableSrcDoc ? undefined : source}
          srcDoc={resizableSrcDoc}
          title={title}
          frameBorder='0'
          loading='lazy'
          scrolling='auto'
          onLoad={requestHtmlArtifactHeight}
          allowFullScreen={!isHtmlArtifact}
          sandbox={
            isHtmlArtifact
              ? 'allow-scripts allow-forms allow-popups'
              : undefined
          }
        />
      </div>
    </figure>
  )
}

export default NotionEmbed
