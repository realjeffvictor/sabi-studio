import { useEffect, useRef, useState } from 'react'
import { Check, Loader2, Circle } from 'lucide-react'
import {
  STAGES,
  estimateCredits,
  getLanguage,
  getMood,
  getStyle,
  
} from '../../data/options'
import { runMockPipeline } from '../../services/pipelineService'
import type { Character, EditableScene, Project } from '../../types'
import Button from '../ui/Button'
import ButtonLink from '../ui/ButtonLink'

export default function StepGenerate({
  project,
  scenes,
  characters,
}: {
  project: Project
  scenes: EditableScene[]
  characters: Character[]
}) {
  const [running, setRunning] = useState(false)
  const [stageIndex, setStageIndex] = useState(-1)
  const [percent, setPercent] = useState(0)
  const [finished, setFinished] = useState(false)
  const cancelled = useRef(false)

  // Stop the fake progress if the person leaves this page
  useEffect(() => {
    cancelled.current = false
    return () => {
      cancelled.current = true
    }
  }, [])

  const seconds = scenes.reduce((sum, s) => sum + s.duration_seconds, 0)

  async function start() {
    setRunning(true)
    setFinished(false)
    await runMockPipeline(
      (i, p) => {
        setStageIndex(i)
        setPercent(p)
      },
      () => cancelled.current,
    )
    if (!cancelled.current) {
      setFinished(true)
      setRunning(false)
    }
  }

    const summary = [
    ['Style', getStyle(project.style)?.name],
    ['Story language', getLanguage(project.language)?.name],
    ['Cast', characters.map((c) => c.name).join(', ')],
    ['Music', getMood(project.music_mood)?.name],
    ['Scenes', `${scenes.length} scenes, ${seconds}s`],
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-xl font-bold">Ready to generate</h2>
        <p className="mt-1 text-sm text-ink-300">
          This run is a simulation. It shows the progress screen the real pipeline will use.
        </p>
      </div>

      <dl className="grid gap-3 rounded-2xl border border-ink-700 bg-ink-900 p-5 sm:grid-cols-2">
        {summary.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs text-ink-500">{label}</dt>
            <dd className="font-medium">{value ?? '-'}</dd>
          </div>
        ))}
        <div>
          <dt className="text-xs text-ink-500">Estimated cost</dt>
          <dd className="font-medium text-gold-300">{estimateCredits(seconds)} credits</dd>
        </div>
      </dl>

      {stageIndex >= 0 && (
        <ul className="space-y-3">
          {STAGES.map((stage, i) => {
            const done = finished || i < stageIndex
            const active = !finished && i === stageIndex
            return (
              <li
                key={stage.id}
                className="flex items-center gap-4 rounded-xl border border-ink-700 px-4 py-3"
              >
                {done ? (
                  <Check size={18} className="text-gold-400" />
                ) : active ? (
                  <Loader2 size={18} className="animate-spin text-gold-400" />
                ) : (
                  <Circle size={18} className="text-ink-700" />
                )}
                <span className={done || active ? 'text-ink-100' : 'text-ink-500'}>
                  {stage.label}
                </span>
                {active && (
                  <div className="ml-auto h-2 w-32 overflow-hidden rounded-full bg-ink-800">
                    <div
                      className="h-full bg-gold-400 transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}

      {finished ? (
        <div className="rounded-2xl border border-gold-500/40 bg-gold-400/5 p-8 text-center">
          <Check size={36} className="mx-auto text-gold-400" />
          <h3 className="mt-3 font-display text-lg font-semibold">Simulation complete</h3>
          <p className="mt-2 text-sm text-ink-300">
            No video was made, because this is the mock pipeline. Real stages come in
            Phases 4 to 9.
          </p>
          <ButtonLink to="/dashboard" className="mt-6">
            Back to dashboard
          </ButtonLink>
        </div>
      ) : (
        <Button onClick={start} loading={running} disabled={scenes.length === 0}>
          Generate video (simulation)
        </Button>
      )}
    </div>
  )
}