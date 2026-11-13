import Container from '../components/ui/Container'
import ButtonLink from '../components/ui/ButtonLink'

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="font-display text-6xl font-extrabold text-gold-400">404</p>
      <p className="mt-4 text-ink-300">This page no dey here.</p>
      <ButtonLink to="/" className="mt-8">
        Go home
      </ButtonLink>
    </Container>
  )
}