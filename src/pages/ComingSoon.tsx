import Container from '../components/ui/Container'
import ButtonLink from '../components/ui/ButtonLink'

export default function ComingSoon({
  title,
  phase,
}: {
  title: string
  phase: number
}) {
  return (
    <Container className="py-32 text-center">
      <h1 className="font-display text-3xl font-bold">{title}</h1>
      <p className="mt-4 text-ink-300">This page is built in Phase {phase}.</p>
      <ButtonLink to="/dashboard" variant="ghost" className="mt-8">
        Back to dashboard
      </ButtonLink>
    </Container>
  )
}