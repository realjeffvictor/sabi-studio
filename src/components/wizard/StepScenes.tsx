import { useState, type Dispatch, type SetStateAction } from 'react'
import { Sparkles, Plus, AlertTriangle } from 'lucide-react'
import { mockGenerateScenes, mockRegenerateScene } from '../../services/scriptService'
import { toEditable, toDraft } from '../../services/SceneService'
import type { EditableScene, Project } from '../../types'
import Button from '../ui/Button'
import SceneCard from './SceneCard'

type Props = {
  project: Project
  scenes: EditableScene[]
  setScenes: Dispatch<SetStateAction<EditableScene[]>>
}

export default function StepScenes({ project, scenes, setScenes }: Props) {
  const [generating, setGenerating] = useState(false)
  const [busyKey, setBusyKey] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const total = scenes.reduce((sum, s) => sum + s.duration_seconds, 0)

  async function generateAll() {
    setGenerating(true)
    setError(null)
    try {
      const drafts = await mockGenerateScenes(project)
      setScenes(drafts.map(toEditable))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not generate scenes.')
    } finally {
      setGenerating(false)
    }
  }

  async function regenerate(scene: EditableScene, index: number) {
    setBusyKey(scene.key)
    setError(null)
    try {
      const update = await mockRegenerateScene(project, toDraft(scene, index))
      setScenes((list) => list.map((s) => (s.key === scene.key ? { ...s, ...update } : s)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not regenerate the scene.')
    } finally {
      setBusyKey(null)
    }
  }

  function updateScene(key: string, next: EditableScene) {
    setScenes((list) => list.map((s) => (s.key === key ? next : s)))
  }

  function move(index: number, direction: -1 | 1) {
    setScenes((list) => {
      const target = index + direction
      if (target < 0 || target >= list.length) return list
      const copy = [...list]
      ;[copy[index], copy[target]] = [copy[target], copy[index]]
      return copy
    })
  }

  function remove(key: string) {
    setScenes((list) => list.filter((s) => s.key !== key))
  }

  function addScene() {
    setScenes((list) => [
      ...list,
      toEditable({
        scene_number: list.length + 1,
        duration_seconds: 5,
        visual_description: '',
        camera_notes: '',
        dialogue: [],
        sound_effects: [],
        music_cue: project.music_mood,
      }),
    ])
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold">Review your scenes</h2>
        <p className="mt-1 text-sm text-ink-300">
          Edit, reorder or regenerate scenes until the story feels right.
        </p>
      </div>

      <div className="flex gap-3 rounded-xl border border-gold-500/30 bg-gold-400/5 p-4 text-sm text-ink-300">
        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-gold-400" />
        AI-written dialogue in African languages should be reviewed by a native speaker
        before final generation.
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </p>
      )}

      {scenes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-700 p-12 text-center">
          <Sparkles size={32} className="mx-auto text-gold-400" />
          <h3 className="mt-4 font-display text-lg font-semibold">
            Turn your idea into scenes
          </h3>
          <p className="mt-2 text-sm text-ink-300">
            This uses mock data for now. Real AI scripts come in Phase 4.
          </p>
          <Button onClick={generateAll} loading={generating} className="mt-6">
            Generate scenes
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between text-sm text-ink-300">
            <span>
              {scenes.length} scenes · {total}s total (target {project.target_duration}s)
            </span>
            <Button variant="ghost" onClick={generateAll} loading={generating} className="!px-4 !py-2">
              Regenerate all
            </Button>
          </div>

          <div className="space-y-4">
            {scenes.map((scene, i) => (
              <SceneCard
                key={scene.key}
                scene={scene}
                index={i}
                total={scenes.length}
                busy={busyKey === scene.key}
                onChange={(next) => updateScene(scene.key, next)}
                onMove={(dir) => move(i, dir)}
                onDelete={() => remove(scene.key)}
                onRegenerate={() => regenerate(scene, i)}
              />
            ))}
          </div>

          <Button variant="ghost" onClick={addScene}>
            <Plus size={16} /> Add scene
          </Button>
        </>
      )}
    </div>
  )
}