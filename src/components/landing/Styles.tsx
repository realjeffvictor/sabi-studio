import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'

const styles = [
  { name: 'Anime', note: 'Bold lines, expressive eyes', gradient: 'from-pink-500/40 to-indigo-700/40' },
  { name: 'Disney-style', note: 'Warm 3D family animation', gradient: 'from-sky-400/40 to-emerald-600/40' },
  { name: 'Cinematic', note: 'Film-grade light and lenses', gradient: 'from-amber-500/40 to-stone-900' },
  { name: 'Documentary', note: 'Real, grounded and honest', gradient: 'from-slate-400/30 to-slate-800' },
  { name: 'Comic', note: 'Colorful cartoon energy', gradient: 'from-orange-500/40 to-rose-700/40' },
]

export default function Styles() {
  return (
    <section id="styles" className="scroll-mt-24 py-20">
      <Container>
        <SectionHeading
          eyebrow="Styles"
          title="Pick the look of your story"
          subtitle="The same script can become an anime, a family cartoon or a film."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {styles.map((s) => (
            <div
              key={s.name}
              className={`flex aspect-[3/4] flex-col justify-end rounded-2xl border border-ink-700 bg-linear-to-br ${s.gradient} p-5`}
            >
              <h3 className="font-display text-lg font-semibold">{s.name}</h3>
              <p className="mt-1 text-xs text-ink-300">{s.note}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}