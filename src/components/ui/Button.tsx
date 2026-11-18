import type { ButtonHTMLAttributes } from 'react'
import Spinner from './Spinner'
import { buttonClass, type ButtonVariant } from './buttonStyles'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  loading?: boolean
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
      className={buttonClass(variant, className)}
    >
      {loading && <Spinner size={16} className="text-current" />}
      {children}
    </button>
  )
}