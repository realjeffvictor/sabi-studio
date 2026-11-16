import type { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string }

export default function TextField({ label, id, ...rest }: Props) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-')
  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-ink-300">
        {label}
      </label>
      <input
        id={inputId}
        {...rest}
        className="mt-1.5 w-full rounded-xl border border-ink-700 bg-ink-800 px-4 py-3 text-sm text-ink-100 placeholder:text-ink-500 focus:border-gold-400 focus:outline-none"
      />
    </div>
  )
}