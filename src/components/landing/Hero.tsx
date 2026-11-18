import { useEffect, useState } from 'react'
import { Mic } from 'lucide-react'
import Container from '../ui/Container'
import ButtonLink from '../ui/ButtonLink'
import MediaSlideshow from '../ui/MediaSlideshow'
import { SLIDES } from '../../data/media'

function RecBadge() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [])

  const mm = String(Math.floor(seconds / 60) % 60).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return (
    <div className="absolute left-4 top-[calc(8%+0.75rem)] z-20 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 font-mono text-xs text-white backdrop-blur">
      <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
      REC 00:{mm}:{ss}
    </div>
  )
}

function FloatingChip({
  label,
  value,
  className,
}: {
  label: string
  value: string
  className: string
}) {
  return (
    <div
      className={`absolute z-30 hidden rounded-xl border border-white/10 bg-ink-900/80 px-4 py-2.5 shadow-xl backdrop-blur-xl sm:block ${className}`}
    >
      <p className="text-[10px] font-semibold uppercase tracking-widest text-gold-400">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-16 sm:pt-24">
      <div className="pointer-events-none absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-gold-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-40 h-[26rem] w-[26rem] rounded-full bg-orange-500/10 blur-3xl" />

      <Container className="relative">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-ink-300 backdrop-blur">
            <Mic size={14} className="text-gold-400" />
            Hausa · Igbo · Yoruba · Pidgin
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl">
            You sabi the story.{' '}
            <span className="bg-linear-to-r from-gold-300 via-orange-400 to-gold-500 bg-clip-text text-transparent">
              We make am move.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-300">
            Turn text, images or a voice note into finished videos with music, sound
            effects, and dialogue that sounds like home.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink to="/signup">Start creating free</ButtonLink>
            <ButtonLink to="/#how-it-works" variant="ghost">
              See how it works
            </ButtonLink>
          </div>
        </div>

        {/* Cinematic screen */}
        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="absolute -inset-6 rounded-[2rem] bg-linear-to-r from-gold-500/25 via-orange-500/10 to-teal-400/15 blur-3xl" />
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/60">
            <MediaSlideshow slides={SLIDES} letterbox className="absolute inset-0" />
            <RecBadge />
          </div>

          <FloatingChip label="Voice" value="Yoruba · warm" className="-left-2 top-1/4 sm:-left-10" />
          <FloatingChip label="Score" value="Afrobeat" className="-right-2 top-1/2 sm:-right-10" />
          <FloatingChip label="Sound" value="Market ambience" className="-bottom-5 right-12" />
        </div>
      </Container>
    </section>
  )
}