export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-ink-300">{subtitle}</p>}
    </div>
  )
}