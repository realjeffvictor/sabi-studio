import { Loader2 } from 'lucide-react'

export default function Spinner({
  size = 20,
  className = 'text-gold-400',
}: {
  size?: number
  className?: string
}) {
  return <Loader2 size={size} className={`animate-spin ${className}`} />
}