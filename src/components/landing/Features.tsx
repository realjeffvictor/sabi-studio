import {
  Sparkles,
  Mic,
  Palette,
  Music,
  Clapperboard,
  SlidersHorizontal,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'

const features: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Sparkles,
    title: 'Text, image or voice in',
    text: 'Start from an idea, a picture, or just speak it. Sabi Studio turns it into scenes.',
  },
  {
    icon: Mic,
    title: 'Voices that sound like home',
    text: 'Hausa, Igbo, Yoruba and Pidgin dialogue, with accents built for African audiences.',
  },
  {
    icon: Palette,
    title: 'Many visual styles',
    text: 'Anime, 3D family animation, cinematic film and documentary looks.',
  },
  {
    icon: Music,
    title: 'Music and sound design',
    text: 'Afrobeat, gospel, suspense and more, with sound effects mixed in.',
  },
  {
    icon: Clapperboard,
    title: 'Lip-sync',
    text: 'Characters whose mouths match the words they speak.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Edit every scene',
    text: 'Change the script, voices and timing before you generate the final video.',
  },
]

export default function Features() {
  return (
    <section id="features" className="scroll-mt-24 py-20">
      <Container>
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to tell the story"
          subtitle="From first idea to finished video, in one studio."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-ink-700 bg-ink-900 p-6 transition hover:border-gold-500/50"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-400/10 text-gold-400">
                <Icon size={22} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}