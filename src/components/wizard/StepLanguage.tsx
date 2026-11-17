import { useState } from 'react'
import { Play, Loader2, Check } from 'lucide-react'
import { LANGUAGES, VOICES, getLanguage, type LanguageOption } from '../../data/options'
import { mockPreviewVoice } from '../../services/voiceService'
import type { Project, ProjectPatch } from '../../types'

type Props = { project: Project; onChange: (patch: ProjectPatch) => void }

export default function StepLanguage({ project, onChange }: Props) {
  const [playing, setPlaying] = useState<string | null>(null)
  const language = getLanguage(project.language)
  const voices = VOICES.filter((v) => v.language === project.language)

  function pickLanguage(l: LanguageOption) {
    if (!l.available || l.id === project.language) return
    onChange({ language: l.id, accent: l.accents[0] ?? null, voice_key: null })
  }

  async function preview(key: string) {
    setPlaying(key)
    await mockPreviewVoice(key)
    setPlaying(null)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-bold">Language and voice</h2>
        <p className="mt-1 text-sm text-ink-300">
          Choose the language your characters speak, then an accent and a voice.
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-ink-300">Language</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {LANGUAGES.map((l) => (
            <button
              key={l.id}
              disabled={!l.available}
              onClick={() => pickLanguage(l)}
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

      {language && language.accents.length > 0 && (
        <div>
          <p className="text-sm font-medium text-ink-300">Accent</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {language.accents.map((a) => (
              <button
                key={a}
                onClick={() => onChange({ accent: a })}
                aria-pressed={project.accent === a}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  project.accent === a
                    ? 'border-gold-400 bg-gold-400/10 text-gold-300'
                    : 'border-ink-700 text-ink-300 hover:border-ink-500'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      )}

      {language && (
        <div>
          <p className="text-sm font-medium text-ink-300">Voice</p>
          <ul className="mt-2 space-y-2">
            {voices.map((v) => {
              const selected = project.voice_key === v.key
              return (
                <li
                  key={v.key}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                    selected ? 'border-gold-400 bg-gold-400/5' : 'border-ink-700'
                  }`}
                >
                  <button
                    onClick={() => onChange({ voice_key: v.key })}
                    aria-pressed={selected}
                    className="flex flex-1 items-center gap-3 text-left"
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                        selected ? 'border-gold-400 bg-gold-400 text-ink-950' : 'border-ink-500'
                      }`}
                    >
                      {selected && <Check size={14} />}
                    </span>
                    <span>
                      <span className="font-medium">{v.name}</span>
                      <span className="ml-2 text-xs text-ink-500">
                        {v.age} {v.gender}
                      </span>
                    </span>
                  </button>
                  <button
                    onClick={() => preview(v.key)}
                    disabled={playing !== null}
                    aria-label={`Preview ${v.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-700 text-gold-400 transition hover:border-gold-400 disabled:opacity-50"
                  >
                    {playing === v.key ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Play size={16} />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
          <p className="mt-3 text-xs text-ink-500">
            Voice previews are mocked. Real audio arrives in Phase 5.
          </p>
        </div>
      )}
    </div>
  )
}