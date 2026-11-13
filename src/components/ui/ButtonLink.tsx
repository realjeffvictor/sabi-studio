import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Props = {
  to: string
  variant?: 'primary' | 'ghost'
  children: ReactNode
  className?: string
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950'

const variants = {
  primary: 'bg-gold-400 text-ink-950 hover:bg-gold-300',
  ghost:
    'border border-ink-700 text-ink-100 hover:border-gold-400 hover:text-gold-300',
}

export default function ButtonLink({
  to,
  variant = 'primary',
  children,
  className = '',
}: Props) {
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  )
}