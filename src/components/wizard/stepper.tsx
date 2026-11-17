import { Check } from 'lucide-react'

export default function Stepper({
  steps,
  current,
  onSelect,
}: {
  steps: string[]
  current: number
  onSelect: (index: number) => void
}) {
  return (
    <ol className="flex items-center gap-2 overflow-x-auto pb-2">
      {steps.map((label, i) => {
        const done = i < current
        const active = i === current
        return (
          <li key={label} className="flex shrink-0 items-center gap-2">
            <button
              disabled={!done}
              onClick={() => onSelect(i)}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition ${
                active
                  ? 'bg-gold-400 text-ink-950'
                  : done
                    ? 'text-ink-100 hover:bg-ink-800'
                    : 'text-ink-500'
              } disabled:cursor-default`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                  active
                    ? 'bg-ink-950 text-gold-400'
                    : done
                      ? 'bg-gold-400/20 text-gold-300'
                      : 'bg-ink-800'
                }`}
              >
                {done ? <Check size={14} /> : i + 1}
              </span>
              <span className="font-medium">{label}</span>
            </button>
            {i < steps.length - 1 && <span className="h-px w-5 bg-ink-700" />}
          </li>
        )
      })}
    </ol>
  )
}