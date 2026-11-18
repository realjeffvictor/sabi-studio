import { useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { Play, Loader2, Plus, Trash2, AlertTriangle } from 'lucide-react'
import { LANGUAGES, VOICES, getLanguage, suggestVoice } from '../../data/options'
import { mockPreviewVoice } from '../../services/voiceService'
import { createCharacter, deleteCharacter } from '../../services/CharacterService'
import type { Character, CharacterPatch, Project, ProjectPatch } from '../../types'
import Button from '../ui/Button'

const field =
  'w-full rounded-lg border border-ink-700 bg-ink-800 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-gold-400 focus:outline-none'

type Props = {
  project: Project
  characters: Character[]
  setCharacters: Dispatch<SetStateAction<Character[]>>
  onChange: (patch: ProjectPatch) => void
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-ink-500">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  )
}

export default function StepCast({ project, characters, setCharacters, onChange }: Props) {
  const [playing, setPlaying] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const hasNarrator = characters.some((c) => c.role === 'narrator')

  async function add(role: Character['role']) {
    if (!project.language) return
    const language = getLanguage(project.language)
    const gender: Character['gender'] = characters.length % 2 === 0 ? 'female' : 'male'
    const age: Character['age_group'] = role === 'narrator' ? 'elder' : 'adult'

    setAdding(true)
    setError(null)
    try {
      const created = await createCharacter(project.id, {
        name: role === 'narrator' ? 'Narrator' : `Character ${characters.length + 1}`,
        role,
        description: '',
        gender,
        age_group: age,
        language: project.language,
        accent: language?.accents[0] ?? null,
        voice_key: suggestVoice(project.language, gender, age),
      })
      setCharacters((list) => [...list, created])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not add the character.')
    } finally {
      setAdding(false)
    }
  }

  function patch(c: Character, p: CharacterPatch) {
    const next: CharacterPatch = { ...p }
    const gender = p.gender !== undefined ? p.gender : c.gender
    const age = p.age_group !== undefined ? p.age_group : c.age_group

    if (p.language !== undefined && p.language !== c.language) {
      next.accent = getLanguage(p.language)?.accents[0] ?? null
      next.voice_key = suggestVoice(p.language, gender, age)
    } else if (p.gender !== undefined || p.age_group !== undefined) {
      next.voice_key = suggestVoice(c.language, gender, age)
    }

    setCharacters((list) => list.map((x) => (x.id === c.id ? { ...x, ...next } : x)))
  }

  async function remove(c: Character) {
    if (!window.confirm(`Remove ${c.name || 'this character'}?`)) return
    try {
      await deleteCharacter(c.id)
      setCharacters((list) => list.filter((x) => x.id !== c.id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not remove the character.')
    }
  }

  async function preview(key: string) {
    setPlaying(key)
    await mockPreviewVoice(key)
    setPlaying(null)
  }

  // Warn when two characters share one voice
  const byVoice = new Map<string, string[]>()
  for (const c of characters) {
    if (!c.voice_key) continue
    byVoice.set(c.voice_key, [...(byVoice.get(c.voice_key) ?? []), c.name || 'Unnamed'])
  }
  const sharedVoices = [...byVoice.values()].filter((names) => names.length > 1)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-bold">Your cast</h2>
        <p className="mt-1 text-sm text-ink-300">
          Add the characters who speak in your story and give each one a language and voice.
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-ink-300">Story language (default for new characters)</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {LANGUAGES.map((l) => (
            <button
              key={l.id}
              disabled={!l.available}
              onClick={() => onChange({ language: l.id })}
              aria-pressed={project.language === l.id}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                project.language === l.id
                  ? 'border-gold-400 bg-gold-400/10 text-gold-300'
                  : l.available
                    ? 'border-ink-700 text-ink-100 hover:border-ink-500'
                    : 'border-ink-800 text-ink-500'
              } disabled:cursor-not-allowed`}
            >
              {l.name}
              {!l.available && <span className="ml-2 text-xs">Soon</span>}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      {sharedVoices.map((names) => (
        <div
          key={names.join('-')}
          className="flex gap-3 rounded-xl border border-gold-500/30 bg-gold-400/5 p-4 text-sm text-ink-300"
        >
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-gold-400" />
          {names.join(' and ')} share the same voice. Pick different voices so listeners can
          tell them apart.
        </div>
      ))}

      <div className="space-y-4">
        {characters.map((c) => {
          const language = getLanguage(c.language)
          const voices = VOICES.filter((v) => v.language === c.language)
          return (
            <div key={c.id} className="rounded-2xl border border-ink-700 bg-ink-950/40 p-5">
              <div className="flex items-start justify-between gap-3">
                <input
                  value={c.name}
                  onChange={(e) => patch(c, { name: e.target.value })}
                  placeholder="Character name"
                  aria-label="Character name"
                  className={`${field} max-w-64 font-medium`}
                />
                <button
                  onClick={() => remove(c)}
                  aria-label={`Remove ${c.name}`}
                  className="rounded-lg p-2 text-ink-500 transition hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <Field label="Role">
                  <select
                    value={c.role}
                    onChange={(e) => patch(c, { role: e.target.value as Character['role'] })}
                    className={field}
                  >
                    <option value="lead">Lead</option>
                    <option value="supporting">Supporting</option>
                    <option value="narrator">Narrator</option>
                  </select>
                </Field>
                <Field label="Gender">
                  <select
                    value={c.gender ?? 'female'}
                    onChange={(e) => patch(c, { gender: e.target.value as 'female' | 'male' })}
                    className={field}
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </Field>
                <Field label="Age">
                  <select
                    value={c.age_group ?? 'adult'}
                    onChange={(e) =>
                      patch(c, { age_group: e.target.value as 'child' | 'adult' | 'elder' })
                    }
                    className={field}
                  >
                    <option value="child">Child</option>
                    <option value="adult">Adult</option>
                    <option value="elder">Elder</option>
                  </select>
                </Field>
              </div>

              <div className="mt-4">
                <Field label={c.role === 'narrator' ? 'Appearance (optional)' : 'Appearance'}>
                  <textarea
                    rows={2}
                    value={c.description ?? ''}
                    onChange={(e) => patch(c, { description: e.target.value })}
                    placeholder="Tall, grey beard, wears a red cap and a blue agbada..."
                    className={field}
                  />
                </Field>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Language">
                  <select
                    value={c.language ?? ''}
                    onChange={(e) => patch(c, { language: e.target.value })}
                    className={field}
                  >
                    {LANGUAGES.filter((l) => l.available).map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Accent">
                  <select
                    value={c.accent ?? ''}
                    onChange={(e) => patch(c, { accent: e.target.value })}
                    className={field}
                  >
                    {(language?.accents ?? []).map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-4 flex items-end gap-2">
                <div className="flex-1">
                  <Field label="Voice">
                    <select
                      value={c.voice_key ?? ''}
                      onChange={(e) => patch(c, { voice_key: e.target.value })}
                      className={field}
                    >
                      {voices.map((v) => (
                        <option key={v.key} value={v.key}>
                          {v.name} ({v.age} {v.gender})
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
                <button
                  onClick={() => c.voice_key && preview(c.voice_key)}
                  disabled={playing !== null || !c.voice_key}
                  aria-label={`Preview voice for ${c.name}`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink-700 text-gold-400 transition hover:border-gold-400 disabled:opacity-50"
                >
                  {playing === c.voice_key ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Play size={16} />
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {!project.language && (
        <p className="text-sm text-ink-500">Choose a story language to start adding characters.</p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button variant="ghost" onClick={() => add('lead')} loading={adding} disabled={!project.language}>
          <Plus size={16} /> Add character
        </Button>
        {!hasNarrator && (
          <Button variant="ghost" onClick={() => add('narrator')} disabled={adding || !project.language}>
            <Plus size={16} /> Add narrator
          </Button>
        )}
      </div>

      <p className="text-xs text-ink-500">
        Voice previews are mocked. Real audio arrives in Phase 5. The voice names, accent names
        and counts are placeholders for now.
      </p>
    </div>
  )
}