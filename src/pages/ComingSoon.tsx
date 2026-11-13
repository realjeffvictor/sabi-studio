import Container from '../components/ui/Container'
import ButtonLink from '../components/ui/ButtonLink'

export default function ComingSoon({ title }: { title: string }) {
  return (
    <Container className="py-32 text-center">
      <h1 className="font-display text-3xl font-bold">{title}</h1>
      <p className="mt-4 text-ink-300">This page is built in Phase 2.</p>
      <ButtonLink to="/" variant="ghost" className="mt-8">
        Back home
      </ButtonLink>
    </Container>
  )
}