import { STYLES } from '../../data/options'
import type { Project, ProjectPatch } from '../../types'

type Props = { project: Project; onChange: (patch: ProjectPatch) => void }

export default function StepStyle({ project, onChange }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-bold">Choose a visual style</h2>
        <p className="mt-1 text-sm text-ink-300">This sets the look of every scene.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STYLES.map((s) => {
          const selected = project.style === s.id
          return (
            <button
              key={s.id}
              onClick={() => onChange({ style: s.id })}
              aria-pressed={selected}
              className={`flex aspect-[4/3] flex-col justify-end rounded-2xl border bg-linear-to-br ${s.gradient} p-5 text-left transition ${
                selected
                  ? 'border-gold-400 ring-1 ring-gold-400'
                  : 'border-ink-700 hover:border-ink-500'
              }`}
            >
              <h3 className="font-display text-lg font-semibold">{s.name}</h3>
              <p className="mt-1 text-xs text-ink-300">{s.note}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}