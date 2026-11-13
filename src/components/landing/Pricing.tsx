import { Check } from 'lucide-react'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import ButtonLink from '../ui/ButtonLink'

const tiers = [
  {
    name: 'Starter',
    price: '₦0',
    note: '50 free credits',
    perks: ['Try every style', 'Watermarked videos', 'Community support'],
    highlight: false,
  },
  {
    name: 'Creator',
    price: '₦5,000',
    note: 'per month',
    perks: ['500 credits', 'No watermark', 'All languages', 'Priority generation'],
    highlight: true,
  },
  {
    name: 'Studio',
    price: '₦20,000',
    note: 'per month',
    perks: ['2,500 credits', 'Custom characters', 'Team seats', 'Priority support'],
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 py-20">
      <Container>
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, credit-based pricing"
          subtitle="Placeholder prices for now. Final plans come later."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-2xl border p-8 ${
                t.highlight
                  ? 'border-gold-400 bg-ink-900 shadow-lg shadow-gold-500/10'
                  : 'border-ink-700 bg-ink-900'
              }`}
            >
              <h3 className="font-display text-lg font-semibold">{t.name}</h3>
              <p className="mt-4 font-display text-4xl font-bold">{t.price}</p>
              <p className="text-sm text-ink-500">{t.note}</p>
              <ul className="mt-6 space-y-3 text-sm text-ink-300">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <Check size={16} className="text-gold-400" /> {p}
                  </li>
                ))}
              </ul>
              <ButtonLink
                to="/signup"
                variant={t.highlight ? 'primary' : 'ghost'}
                className="mt-8 w-full"
              >
                Get started
              </ButtonLink>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}