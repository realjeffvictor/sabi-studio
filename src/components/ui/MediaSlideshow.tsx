import { useEffect, useState } from 'react'
import type { Slide } from '../../data/media'

const FALLBACKS = [
  'from-amber-900/70 via-ink-900 to-ink-950',
  'from-teal-900/60 via-ink-900 to-ink-950',
  'from-rose-900/50 via-ink-900 to-ink-950',
  'from-violet-900/50 via-ink-900 to-ink-950',
  'from-orange-900/60 via-ink-900 to-ink-950',
]

type Props = {
  slides: Slide[]
  interval?: number
  /** Must include positioning, e.g. "absolute inset-0" */
  className?: string
  showCaption?: boolean
  showDots?: boolean
  letterbox?: boolean
  overlay?: 'soft' | 'strong'
}

export default function MediaSlideshow({
  slides,
  interval = 6000,
  className = '',
  showCaption = true,
  showDots = true,
  letterbox = false,
  overlay = 'soft',
}: Props) {
  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState<Record<string, boolean>>({})
  const [reduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (reduced || slides.length < 2) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval)
    return () => clearInterval(timer)
  }, [reduced, slides.length, interval])

  const markFailed = (src: string) => setFailed((f) => ({ ...f, [src]: true }))
  const current = slides[index]
  const bottom = letterbox ? 'bottom-[12%]' : 'bottom-10'

  return (
    <div className={`overflow-hidden bg-ink-950 ${className}`}>
      {slides.map((slide, i) => {
        const active = i === index
        return (
          <div
            key={slide.src}
            aria-hidden="true"
            className={`absolute inset-0 transition-opacity duration-[1400ms] ${
              active ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {failed[slide.src] ? (
              <div
                className={`h-full w-full bg-linear-to-br ${FALLBACKS[i % FALLBACKS.length]}`}
              />
            ) : slide.type === 'video' ? (
              <video
                className="h-full w-full object-cover"
                src={slide.src}
                poster={slide.poster}
                autoPlay
                muted
                loop
                playsInline
                onError={() => markFailed(slide.src)}
              />
            ) : (
              <img
                src={slide.src}
                alt=""
                className="h-full w-full animate-kenburns object-cover"
                onError={() => markFailed(slide.src)}
              />
            )}
          </div>
        )
      })}

      <div
        className={`absolute inset-0 ${
          overlay === 'strong'
            ? 'bg-ink-950/75'
            : 'bg-linear-to-t from-ink-950 via-ink-950/20 to-ink-950/30'
        }`}
      />

      {letterbox && (
        <>
          <div className="absolute inset-x-0 top-0 h-[8%] bg-black" />
          <div className="absolute inset-x-0 bottom-0 h-[8%] bg-black" />
        </>
      )}

      {showCaption && current && (
        <div
          key={index}
          className={`absolute left-6 right-6 animate-fade-up sm:left-10 ${bottom}`}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">
            Scene {String(index + 1).padStart(2, '0')}
          </p>
          <p className="mt-1 font-display text-2xl font-bold sm:text-3xl">{current.title}</p>
          <p className="mt-1 max-w-md text-sm text-ink-300">{current.caption}</p>
        </div>
      )}

      {showDots && slides.length > 1 && (
        <div className={`absolute right-6 flex gap-2 sm:right-10 ${bottom}`}>
          {slides.map((s, i) => (
            <button
              key={s.src}
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-8 bg-gold-400' : 'w-3 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}