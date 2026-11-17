import { useState } from 'react'
import { Type, Image as ImageIcon, Mic } from 'lucide-react'
import { DURATIONS } from '../../data/options'
import type { Project, ProjectPatch } from '../../types'

const modes = [
  { id: 'text', label: 'Text', icon: Type },
  { id: 'image', label: 'Image', icon: ImageIcon },
  { id: 'voice', label: 'Voice note', icon: Mic },
] as const

type Props = { project: Project; onChange: (patch: ProjectPatch) => void }

export default function StepInput({ project, onChange }: Props) {
  const [mode, setMode] = useState<(typeof modes)[number]['id']>('text')
  const [images, setImages] = useState<File[]>([])
  const [voiceNote, setVoiceNote] = useState<File | null>(null)

  const idea = project.idea ?? ''

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-bold">Tell us your idea</h2>
        <p className="mt-1 text-sm text-ink-300">
          Describe the story. The more detail, the better the scenes.
        </p>
      </div>

      <div className="flex gap-2">
        {modes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setMode(id)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
              mode === id
                ? 'border-gold-400 bg-gold-400/10 text-gold-300'
                : 'border-ink-700 text-ink-300 hover:border-ink-500'
            }`}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      <div>
        <label htmlFor="idea" className="block text-sm font-medium text-ink-300">
          Story idea
        </label>
        <textarea
          id="idea"
          rows={6}
          value={idea}
          onChange={(e) => onChange({ idea: e.target.value })}
          placeholder="A storyteller shares an old folktale with children at sunset..."
          className="mt-1.5 w-full rounded-xl border border-ink-700 bg-ink-800 px-4 py-3 text-sm text-ink-100 placeholder:text-ink-500 focus:border-gold-400 focus:outline-none"
        />
        <p className="mt-1 text-xs text-ink-500">
          {idea.trim().length < 10
            ? 'Write at least 10 characters to continue.'
            : `${idea.trim().length} characters`}
        </p>
      </div>

      {mode === 'image' && (
        <div className="rounded-xl border border-dashed border-ink-700 p-5">
          <label className="block text-sm font-medium text-ink-300">
            Reference images (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files ?? []))}
            className="mt-3 block w-full text-sm text-ink-300 file:mr-4 file:rounded-full file:border-0 file:bg-gold-400 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-ink-950"
          />
          {images.length > 0 && (
            <ul className="mt-3 space-y-1 text-sm text-ink-300">
              {images.map((f) => (
                <li key={f.name}>
                  {f.name} ({Math.round(f.size / 1024)} KB)
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-xs text-ink-500">
            Files are not uploaded yet. Uploading is connected in a later phase.
          </p>
        </div>
      )}

      {mode === 'voice' && (
        <div className="rounded-xl border border-dashed border-ink-700 p-5">
          <label className="block text-sm font-medium text-ink-300">
            Voice note (optional)
          </label>
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setVoiceNote(e.target.files?.[0] ?? null)}
            className="mt-3 block w-full text-sm text-ink-300 file:mr-4 file:rounded-full file:border-0 file:bg-gold-400 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-ink-950"
          />
          {voiceNote && <p className="mt-3 text-sm text-ink-300">{voiceNote.name}</p>}
          <p className="mt-3 text-xs text-ink-500">
            Not uploaded yet. Turning voice notes into ideas comes in a later phase.
          </p>
        </div>
      )}

      <div>
        <p className="text-sm font-medium text-ink-300">Video length</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {DURATIONS.map((d) => (
            <button
              key={d}
              onClick={() => onChange({ target_duration: d })}
              className={`rounded-full border px-5 py-2 text-sm transition ${
                project.target_duration === d
                  ? 'border-gold-400 bg-gold-400/10 text-gold-300'
                  : 'border-ink-700 text-ink-300 hover:border-ink-500'
              }`}
            >
              {d} seconds
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}