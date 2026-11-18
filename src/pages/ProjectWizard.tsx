import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getProject, updateProject } from '../services/ProjectService'
import { listScenes, saveScenes, toEditable, toDraft } from '../services/SceneService'
import { listCharacters, updateCharacter } from '../services/CharacterService'
import type { Character, EditableScene, Project, ProjectPatch } from '../types'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'
import Stepper from '../components/wizard/stepper'
import StepInput from '../components/wizard/StepInput'
import StepStyle from '../components/wizard/StepStyle'
import StepCast from '../components/wizard/StepCast'
import StepSound from '../components/wizard/StepSound'
import StepScenes from '../components/wizard/StepScenes'
import StepGenerate from '../components/wizard/StepGenerate'

const STEPS = ['Input', 'Style', 'Cast', 'Sound', 'Scenes', 'Generate']
const CAST_STEP = 2
const SCENES_STEP = 4
const STEP_SCOPES = ['', 'scope-ember', 'scope-teal', 'scope-violet', '', 'scope-rose']

const FIELDS = [
  'title',
  'idea',
  'style',
  'language',
  'accent',
  'music_mood',
  'target_duration',
  'sfx_enabled',
  'voice_balance',
] as const

function formFields(p: Project): ProjectPatch {
  return Object.fromEntries(FIELDS.map((k) => [k, p[k]])) as ProjectPatch
}

function canContinue(
  step: number,
  p: Project,
  scenes: EditableScene[],
  characters: Character[],
): boolean {
  switch (step) {
    case 0:
      return (p.idea ?? '').trim().length >= 10
    case 1:
      return !!p.style
    case 2:
      return (
        !!p.language &&
        characters.length > 0 &&
        characters.every((c) => c.name.trim() && c.language && c.accent && c.voice_key)
      )
    case 3:
      return !!p.music_mood
    case 4:
      return scenes.length > 0
    default:
      return true
  }
}

export default function ProjectWizard() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)
  const [characters, setCharacters] = useState<Character[]>([])
  const [scenes, setScenes] = useState<EditableScene[]>([])
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false

    Promise.all([getProject(id), listScenes(id), listCharacters(id)])
      .then(([proj, sceneList, castList]) => {
        if (cancelled) return
        setProject(proj)
        setScenes(sceneList.map(toEditable))
        setCharacters(castList)
        // Returning to a project that already has scenes? Jump to them.
        setStep(sceneList.length > 0 ? SCENES_STEP : 0)
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  function change(patch: ProjectPatch) {
    setProject((p) => (p ? { ...p, ...patch } : p))
  }

  async function goNext() {
    if (!project) return
    setSaving(true)
    setSaveError(null)
    try {
      const saved = await updateProject(project.id, formFields(project))
      setProject(saved)

      if (step === CAST_STEP) {
        const cleaned = characters.map((c) => ({ ...c, name: c.name.trim() }))
        await Promise.all(
          cleaned.map((c) =>
            updateCharacter(c.id, {
              name: c.name,
              role: c.role,
              description: c.description,
              gender: c.gender,
              age_group: c.age_group,
              language: c.language,
              accent: c.accent,
              voice_key: c.voice_key,
            }),
          ),
        )
        setCharacters(cleaned)
      }

      if (step === SCENES_STEP) {
        const stored = await saveScenes(project.id, scenes.map(toDraft))
        setScenes(stored.map(toEditable))
      }

      setStep((s) => s + 1)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Could not save your changes.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner size={28} />
      </div>
    )
  }

  if (error || !project) {
    return (
      <Container className="py-24 text-center">
        <p className="text-red-400">{error ?? 'Project not found.'}</p>
        <Link to="/dashboard" className="mt-4 inline-block text-gold-400 hover:underline">
          Back to dashboard
        </Link>
      </Container>
    )
  }

  return (
    <Container className={`max-w-4xl py-10 ${STEP_SCOPES[step]}`}>
    
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1.5 text-sm text-ink-300 hover:text-ink-100"
      >
        <ArrowLeft size={14} /> Dashboard
      </Link>
      <h1 className="mt-3 font-display text-2xl font-bold">{project.title}</h1>

      <div className="mt-6">
        <Stepper steps={STEPS} current={step} onSelect={setStep} />
      </div>

      <div key={step} className="mt-6 animate-fade-up rounded-2xl border border-ink-700 bg-ink-900 p-6 sm:p-8">
        {step === 0 && <StepInput project={project} onChange={change} />}
        {step === 1 && <StepStyle project={project} onChange={change} />}
        {step === 2 && (
          <StepCast
            project={project}
            characters={characters}
            setCharacters={setCharacters}
            onChange={change}
          />
        )}
        {step === 3 && <StepSound project={project} onChange={change} />}
        {step === 4 && (
          <StepScenes
            project={project}
            characters={characters}
            scenes={scenes}
            setScenes={setScenes}
          />
        )}
        {step === 5 && <StepGenerate project={project} scenes={scenes} characters={characters} />}
      </div>

      {saveError && (
        <p role="alert" className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {saveError}
        </p>
      )}

      {step < STEPS.length - 1 && (
        <div className="mt-6 flex justify-between">
          <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
            <ArrowLeft size={16} /> Back
          </Button>
          <Button
            onClick={goNext}
            loading={saving}
            disabled={!canContinue(step, project, scenes, characters)}
          >
            Continue <ArrowRight size={16} />
          </Button>
        </div>
      )}
    </Container>
  )
}