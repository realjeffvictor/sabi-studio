import type { ButtonHTMLAttributes } from 'react'
import Spinner from './Spinner'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger'
  loading?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary: 'bg-gold-400 text-ink-950 hover:bg-gold-300',
  ghost: 'border border-ink-700 text-ink-100 hover:border-gold-400 hover:text-gold-300',
  danger: 'border border-red-500/40 text-red-400 hover:bg-red-500/10',
}

export default function Button({
  variant = 'primary',
  loading = false,
  className = '',
  children,
  disabled,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {loading && <Spinner size={16} className="text-current" />}
      {children}
    </button>
  )
}