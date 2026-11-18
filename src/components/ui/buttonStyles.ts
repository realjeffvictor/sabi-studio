export type ButtonVariant = 'primary' | 'ghost' | 'danger'

const base =
  'group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-linear-to-b from-gold-300 to-gold-500 text-ink-950 shadow-lg shadow-gold-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold-500/40 active:translate-y-0 before:absolute before:inset-0 before:-z-10 before:-translate-x-full before:bg-linear-to-r before:from-transparent before:via-white/40 before:to-transparent before:transition-transform before:duration-700 hover:before:translate-x-full',
  ghost:
    'border border-white/15 bg-white/5 text-ink-100 backdrop-blur hover:border-gold-400/60 hover:bg-white/10 hover:text-gold-300',
  danger: 'border border-red-500/40 text-red-400 hover:bg-red-500/10',
}

export function buttonClass(variant: ButtonVariant, extra = ''): string {
  return `${base} ${variants[variant]} ${extra}`
}