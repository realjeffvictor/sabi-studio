import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'

const steps = [
  { title: 'Share your idea', text: 'Type it, upload a picture, or record a voice note.' },
  { title: 'Choose style and voice', text: 'Pick a look, a language, an accent and a music mood.' },
  { title: 'Review the scenes', text: 'Edit the script and dialogue until it feels right.' },
  { title: 'Generate and share', text: 'Get your finished video, ready to download and post.' },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-20">
      <Container>
        <SectionHeading eyebrow="How it works" title="From idea to video in four steps" />
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-ink-700 bg-ink-900 p-6">
              <span className="font-display text-3xl font-extrabold text-gold-400">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-300">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}