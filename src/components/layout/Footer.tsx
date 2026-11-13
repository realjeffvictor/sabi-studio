import Container from '../ui/Container'
import Logo from '../ui/Logo'

export default function Footer() {
  return (
    <footer className="border-t border-ink-800 py-12">
      <Container className="flex flex-col items-center justify-between gap-6 text-sm text-ink-500 sm:flex-row">
        <Logo />
        <p>© {new Date().getFullYear()} Sabi Studio. Made for African storytellers.</p>
      </Container>
    </footer>
  )
}