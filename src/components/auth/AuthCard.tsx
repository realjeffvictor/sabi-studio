import type { ReactNode } from 'react'
import Container from '../ui/Container'

export default function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}) {
  return (
    <Container className="flex justify-center py-16 sm:py-24">
      <div className="w-full max-w-md rounded-2xl border border-ink-700 bg-ink-900 p-8">
        <h1 className="font-display text-2xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-ink-300">{subtitle}</p>
        <div className="mt-8">{children}</div>
        <div className="mt-6 text-center text-sm text-ink-300">{footer}</div>
      </div>
    </Container>
  )
}