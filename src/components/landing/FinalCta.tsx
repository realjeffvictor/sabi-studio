import Container from '../ui/Container'
import ButtonLink from '../ui/ButtonLink'

export default function FinalCta() {
  return (
    <section className="py-20">
      <Container>
        <div className="rounded-3xl border border-gold-500/30 bg-linear-to-br from-gold-500/15 to-ink-900 px-6 py-16 text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Your story dey wait. Make am move.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-300">
            Join Sabi Studio and turn your next idea into a video that speaks your language.
          </p>
          <ButtonLink to="/signup" className="mt-8">
            Start creating free
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}