import { useEffect, useRef } from 'react'

export default function HlsVideo({
  src,
  poster,
  className = '',
  style,
  desaturated = false
}) {
  const videoRef = useRef(null)

  useEffect(() => {
    let hls
    let mounted = true

    const setup = async () => {
      const video = videoRef.current
      if (!video || !src) return

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src
        video.play().catch(() => {})
        return
      }

      const HlsModule = await import('hls.js')
      const Hls = HlsModule.default

      if (!mounted || !Hls.isSupported()) return

      hls = new Hls({
        autoStartLoad: true,
        enableWorker: true
      })

      hls.loadSource(src)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {})
      })
    }

    setup()

    return () => {
      mounted = false
      if (hls) {
        hls.destroy()
      }
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      poster={poster}
      className={className}
      style={{
        ...style,
        filter: desaturated ? 'saturate(0)' : undefined
      }}
    />
  )
}
