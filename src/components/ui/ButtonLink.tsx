import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { buttonClass } from './buttonStyles'

type Props = {
  to: string
  variant?: 'primary' | 'ghost'
  children: ReactNode
  className?: string
}

export default function ButtonLink({
  to,
  variant = 'primary',
  children,
  className = '',
}: Props) {
  return (
    <Link to={to} className={buttonClass(variant, className)}>
      {children}
    </Link>
  )
}