import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-400 text-ink-950">
        <Play size={14} fill="currentColor" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        Sabi <span className="text-gold-400">Studio</span>
      </span>
    </Link>
  )
}