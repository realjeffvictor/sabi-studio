import { MUSIC_MOODS } from '../../data/options'
import type { Project, ProjectPatch } from '../../types'

type Props = { project: Project; onChange: (patch: ProjectPatch) => void }

export default function StepSound({ project, onChange }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-bold">Sound and music</h2>
        <p className="mt-1 text-sm text-ink-300">Set the mood of your score and the mix.</p>
      </div>

      <div>
        <p className="text-sm font-medium text-ink-300">Music mood</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {MUSIC_MOODS.map((m) => (
            <button
              key={m.id}
              onClick={() => onChange({ music_mood: m.id })}
              aria-pressed={project.music_mood === m.id}
              className={`rounded-full border px-5 py-2 text-sm transition ${
                project.music_mood === m.id
                  ? 'border-gold-400 bg-gold-400/10 text-gold-300'
                  : 'border-ink-700 text-ink-300 hover:border-ink-500'
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>
      </div>

      <label className="flex cursor-pointer items-center justify-between rounded-xl border border-ink-700 px-4 py-4">
        <span>
          <span className="block font-medium">Sound effects</span>
          <span className="text-xs text-ink-500">Footsteps, wind, crowds and more</span>
        </span>
        <input
          type="checkbox"
          checked={project.sfx_enabled}
          onChange={(e) => onChange({ sfx_enabled: e.target.checked })}
          className="h-5 w-5 accent-gold-400"
        />
      </label>

      <div>
        <div className="flex items-center justify-between text-sm">
          <label htmlFor="balance" className="font-medium text-ink-300">
            Voice and music balance
          </label>
          <span className="text-ink-500">
            Voice {project.voice_balance}% · Music {100 - project.voice_balance}%
          </span>
        </div>
        <input
          id="balance"
          type="range"
          min={0}
          max={100}
          value={project.voice_balance}
          onChange={(e) => onChange({ voice_balance: Number(e.target.value) })}
          className="mt-3 w-full accent-gold-400"
        />
        <div className="mt-1 flex justify-between text-xs text-ink-500">
          <span>More music</span>
          <span>More voice</span>
        </div>
      </div>
    </div>
  )
}