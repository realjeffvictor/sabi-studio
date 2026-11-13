import { Play, Mic } from 'lucide-react'
import Container from '../ui/Container'
import ButtonLink from '../ui/ButtonLink'

const bars = [30, 55, 40, 75, 50, 90, 60, 35, 80, 45, 65, 30, 70, 50, 85, 40, 60, 35, 75, 55]

const scenes = [
  { n: 1, text: 'Village market at dawn', time: '6s' },
  { n: 2, text: 'The griot begins to speak', time: '8s' },
  { n: 3, text: 'Children gather round', time: '5s' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-20 sm:pt-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[48rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl" />

      <Container className="relative text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-900 px-4 py-1.5 text-xs text-ink-300">
          <Mic size={14} className="text-gold-400" />
          Hausa · Igbo · Yoruba · Pidgin
        </span>

        <h1 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          You sabi the story.{' '}
          <span className="bg-linear-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
            We make am move.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-300">
          Turn text, images or a voice note into finished videos with music,
          sound effects, and dialogue that sounds like home.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink to="/signup">Start creating free</ButtonLink>
          <ButtonLink to="/#how-it-works" variant="ghost">
            See how it works
          </ButtonLink>
        </div>

        {/* Studio preview mock-up */}
        <div className="relative mx-auto mt-16 max-w-4xl text-left">
          <div className="absolute -inset-4 rounded-3xl bg-gold-500/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-ink-700 bg-ink-900">
            <div className="flex items-center gap-2 border-b border-ink-700 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-ink-700" />
              <span className="h-3 w-3 rounded-full bg-ink-700" />
              <span className="h-3 w-3 rounded-full bg-ink-700" />
              <span className="ml-3 text-xs text-ink-500">Sabi Studio · New project</span>
            </div>

            <div className="grid gap-px bg-ink-700 md:grid-cols-[1fr_260px]">
              <div className="bg-ink-900 p-4">
                <div className="relative flex aspect-video items-center justify-center rounded-xl bg-linear-to-br from-amber-900/60 via-ink-800 to-ink-950">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-ink-950">
                    <Play fill="currentColor" />
                  </span>
                  <span className="absolute bottom-3 left-3 rounded bg-ink-950/70 px-2 py-1 text-xs text-ink-300">
                    Yoruba · Cinematic
                  </span>
                </div>
                <div className="mt-4 flex h-10 items-end gap-1">
                  {bars.map((h, i) => (
                    <span
                      key={i}
                      className="w-full rounded-sm bg-gold-400/70"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-ink-900 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-500">
                  Scenes
                </p>
                <ul className="space-y-2">
                  {scenes.map((s) => (
                    <li
                      key={s.n}
                      className="flex items-center justify-between rounded-lg border border-ink-700 bg-ink-800 px-3 py-2.5 text-sm"
                    >
                      <span>
                        <span className="mr-2 text-gold-400">{s.n}</span>
                        {s.text}
                      </span>
                      <span className="text-xs text-ink-500">{s.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}