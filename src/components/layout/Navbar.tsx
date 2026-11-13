import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Container from '../ui/Container'
import Logo from '../ui/Logo'
import ButtonLink from '../ui/ButtonLink'

const links = [
  { label: 'Features', to: '/#features' },
  { label: 'Styles', to: '/#styles' },
  { label: 'Languages', to: '/#languages' },
  { label: 'Pricing', to: '/#pricing' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-ink-800 bg-ink-950/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="text-sm text-ink-300 transition hover:text-ink-100"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link to="/login" className="text-sm text-ink-300 hover:text-ink-100">
            Log in
          </Link>
          <ButtonLink to="/signup" className="!px-5 !py-2">
            Get started
          </ButtonLink>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-ink-800 bg-ink-950 md:hidden">
          <Container className="flex flex-col gap-4 py-5">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-ink-300"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="text-ink-300">
              Log in
            </Link>
            <ButtonLink to="/signup">Get started</ButtonLink>
          </Container>
        </div>
      )}
    </header>
  )
}