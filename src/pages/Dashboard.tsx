import { useEffect, useState } from 'react'
import { Coins, Plus, Film } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { listProjects, deleteProject } from '../services/ProjectService'
import { getProfile } from '../services/profileService'
import { SLIDES } from '../data/media'
import type { Profile, Project } from '../types'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'
import MediaSlideshow from '../components/ui/MediaSlideshow'
import ProjectCard from '../components/dashboard/ProjectCard'
import NewProjectModal from '../components/dashboard/NewProjectModal'

export default function Dashboard() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!user) return
    let cancelled = false

    Promise.all([listProjects(), getProfile(user.id)])
      .then(([projectList, profileData]) => {
        if (cancelled) return
        setProjects(projectList)
        setProfile(profileData)
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
  }, [user, reloadKey])

  function retry() {
    setError(null)
    setLoading(true)
    setReloadKey((k) => k + 1)
  }

  async function handleDelete(project: Project) {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return
    try {
      await deleteProject(project.id)
      setProjects((list) => list.filter((p) => p.id !== project.id))
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Could not delete the project.')
    }
  }

  function handleCreated(project: Project) {
    setProjects((list) => [project, ...list])
    setShowNew(false)
  }

  const name = profile?.display_name || user?.email?.split('@')[0] || 'there'
  const chip =
    'inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-950/60 px-4 py-2 text-sm backdrop-blur'

  return (
    <Container className="scope-teal py-10">
      <section className="relative overflow-hidden rounded-3xl border border-white/10">
        <MediaSlideshow
          slides={SLIDES}
          interval={8000}
          overlay="strong"
          showCaption={false}
          showDots={false}
          className="absolute inset-0"
        />
        <div className="relative flex flex-col gap-8 p-8 sm:flex-row sm:items-end sm:justify-between sm:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">
              Your studio
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Welcome, {name}
            </h1>
            <p className="mt-2 text-ink-300">Your stories live here.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className={chip}>
              <Coins size={16} className="text-gold-400" />
              {profile ? `${profile.credits} credits` : '— credits'}
            </span>
            <span className={chip}>
              <Film size={16} className="text-gold-400" />
              {projects.length} {projects.length === 1 ? 'project' : 'projects'}
            </span>
            <Button onClick={() => setShowNew(true)}>
              <Plus size={16} /> New project
            </Button>
          </div>
        </div>
      </section>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner size={28} />
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-8 text-center">
            <p className="text-red-400">Could not load your projects: {error}</p>
            <Button variant="ghost" onClick={retry} className="mt-4">
              Try again
            </Button>
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink-700 p-14 text-center">
            <Film size={36} className="mx-auto text-ink-500" />
            <h2 className="mt-4 font-display text-xl font-semibold">No projects yet</h2>
            <p className="mt-2 text-sm text-ink-300">
              Create your first project to start telling a story.
            </p>
            <Button onClick={() => setShowNew(true)} className="mt-6">
              <Plus size={16} /> New project
            </Button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      {showNew && (
        <NewProjectModal onClose={() => setShowNew(false)} onCreated={handleCreated} />
      )}
    </Container>
  )
}