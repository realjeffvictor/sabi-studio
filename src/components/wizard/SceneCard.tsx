import { ChevronUp, ChevronDown, RefreshCw, Trash2, Plus, X } from 'lucide-react'
import { EMOTIONS } from '../../data/options'
import type { Character, DialogueLine, EditableScene } from '../../types'

const field =
  'w-full rounded-lg border border-ink-700 bg-ink-800 px-3 py-2 text-sm text-ink-100 placeholder:text-ink-500 focus:border-gold-400 focus:outline-none'

type Props = {
  scene: EditableScene
  index: number
  total: number
  busy: boolean
  characters: Character[]
  onChange: (next: EditableScene) => void
  onMove: (direction: -1 | 1) => void
  onDelete: () => void
  onRegenerate: () => void
}

export default function SceneCard({
  scene,
  index,
  total,
  busy,
  characters,
  onChange,
  onMove,
  onDelete,
  onRegenerate,
}: Props) {
  function setLine(i: number, patch: Partial<DialogueLine>) {
    onChange({
      ...scene,
      dialogue: scene.dialogue.map((line, n) => (n === i ? { ...line, ...patch } : line)),
    })
  }

  function pickSpeaker(i: number, characterId: string) {
    const c = characters.find((x) => x.id === characterId)
    if (c) setLine(i, { character_id: c.id, speaker: c.name })
  }

  function addLine() {
    const first = characters.find((c) => c.role !== 'narrator') ?? characters[0]
    onChange({
      ...scene,
      dialogue: [
        ...scene.dialogue,
        {
          character_id: first?.id ?? null,
          speaker: first?.name ?? 'Narrator',
          text_native: '',
          text_english: '',
          emotion: 'neutral',
          delivery: '',
        },
      ],
    })
  }

  function removeLine(i: number) {
    onChange({ ...scene, dialogue: scene.dialogue.filter((_, n) => n !== i) })
  }

  function parseEffects(text: string): string[] {
    return text
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }

  const iconBtn =
    'rounded-lg p-2 text-ink-500 transition hover:bg-ink-800 hover:text-ink-100 disabled:opacity-30'

  return (
    <div className="rounded-2xl border border-ink-700 bg-ink-900 p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">
          <span className="mr-2 text-gold-400">{index + 1}</span>Scene
        </h3>
        <div className="flex items-center gap-1">
          <button className={iconBtn} disabled={index === 0} onClick={() => onMove(-1)} aria-label="Move up">
            <ChevronUp size={18} />
          </button>
          <button className={iconBtn} disabled={index === total - 1} onClick={() => onMove(1)} aria-label="Move down">
            <ChevronDown size={18} />
          </button>
          <button className={iconBtn} disabled={busy} onClick={onRegenerate} aria-label="Regenerate scene">
            <RefreshCw size={16} className={busy ? 'animate-spin' : ''} />
          </button>
          <button className={`${iconBtn} hover:!text-red-400`} onClick={onDelete} aria-label="Delete scene">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_110px]">
        <div>
          <label className="text-xs font-medium text-ink-500">What we see</label>
          <textarea
            rows={3}
            value={scene.visual_description ?? ''}
            onChange={(e) => onChange({ ...scene, visual_description: e.target.value })}
            className={`${field} mt-1`}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-500">Seconds</label>
          <input
            type="number"
            min={1}
            max={30}
            value={scene.duration_seconds}
            onChange={(e) =>
              onChange({ ...scene, duration_seconds: Math.max(1, Number(e.target.value) || 1) })
            }
            className={`${field} mt-1`}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-ink-500">Ambience (background atmosphere)</label>
          <input
            value={scene.ambience ?? ''}
            onChange={(e) => onChange({ ...scene, ambience: e.target.value })}
            placeholder="Busy market, haggling voices, motorbikes"
            className={`${field} mt-1`}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-ink-500">Sound effects (separate with commas)</label>
          <input
            key={scene.sound_effects.join('|')}
            defaultValue={scene.sound_effects.join(', ')}
            onBlur={(e) => onChange({ ...scene, sound_effects: parseEffects(e.target.value) })}
            placeholder="door creak, coins jingling"
            className={`${field} mt-1`}
          />
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium text-ink-500">Dialogue</p>
        <div className="mt-2 space-y-3">
          {scene.dialogue.map((line, i) => {
            const speakerKnown = characters.some((c) => c.id === line.character_id)
            const emotions = EMOTIONS.includes(line.emotion) ? EMOTIONS : [line.emotion, ...EMOTIONS]
            return (
              <div key={i} className="rounded-xl border border-ink-800 bg-ink-950/50 p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={speakerKnown ? (line.character_id ?? '') : ''}
                    onChange={(e) => pickSpeaker(i, e.target.value)}
                    aria-label="Speaker"
                    className={`${field} max-w-44`}
                  >
                    {!speakerKnown && <option value="">{line.speaker || '(unassigned)'}</option>}
                    {characters.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={line.emotion}
                    onChange={(e) => setLine(i, { emotion: e.target.value })}
                    aria-label="Emotion"
                    className={`${field} max-w-36`}
                  >
                    {emotions.map((em) => (
                      <option key={em} value={em}>
                        {em}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeLine(i)}
                    aria-label="Remove line"
                    className="ml-auto text-ink-500 hover:text-red-400"
                  >
                    <X size={16} />
                  </button>
                </div>
                <input
                  value={line.delivery ?? ''}
                  onChange={(e) => setLine(i, { delivery: e.target.value })}
                  placeholder="Delivery: whispering, cutting in, after a pause, with a laugh..."
                  className={`${field} mt-2 italic`}
                />
                <textarea
                  rows={2}
                  value={line.text_native}
                  onChange={(e) => setLine(i, { text_native: e.target.value })}
                  placeholder="Dialogue in the character's language"
                  className={`${field} mt-2`}
                />
                <textarea
                  rows={2}
                  value={line.text_english}
                  onChange={(e) => setLine(i, { text_english: e.target.value })}
                  placeholder="English meaning"
                  className={`${field} mt-2 text-ink-300`}
                />
              </div>
            )
          })}
        </div>
        <button
          onClick={addLine}
          className="mt-3 inline-flex items-center gap-1.5 text-sm text-gold-400 hover:text-gold-300"
        >
          <Plus size={14} /> Add dialogue line
        </button>
      </div>
    </div>
  )
}