import { Languages as LanguagesIcon } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'

const core = ['Hausa', 'Igbo', 'Yoruba', 'Nigerian Pidgin']
const soon = ['Swahili', 'Amharic', 'Zulu', 'Twi', 'English (Nigerian accent)']

export default function Languages() {
  return (
    <section id="languages" className="scroll-mt-24 py-20">
      <Container>
        <SectionHeading
          eyebrow="Languages"
          title="Africa's voices, front and center"
          subtitle="Most AI video tools can't speak like us. Sabi Studio is built to."
        />
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-ink-700 bg-ink-900 p-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-gold-400">
            <LanguagesIcon size={18} /> Core languages
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {core.map((l) => (
              <span
                key={l}
                className="rounded-full border border-gold-500/40 bg-gold-400/10 px-4 py-2 text-sm text-gold-300"
              >
                {l}
              </span>
            ))}
          </div>

          <p className="mt-8 text-sm font-semibold text-ink-300">Coming soon</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {soon.map((l) => (
              <span
                key={l}
                className="rounded-full border border-ink-700 px-4 py-2 text-sm text-ink-300"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}