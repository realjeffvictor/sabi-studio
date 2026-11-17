import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import { createProject } from '../../services/projectService'
import type { Project } from '../../types'
import TextField from '../ui/TextField'
import Button from '../ui/Button'

export default function NewProjectModal({
  onClose,
  onCreated,
}: {
  onClose: () => void
  onCreated: (project: Project) => void
}) {
  const [title, setTitle] = useState('')
  const [idea, setIdea] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const project = await createProject({ title: title.trim(), idea: idea.trim() })
      onCreated(project)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="New project"
        className="w-full max-w-lg rounded-2xl border border-ink-700 bg-ink-900 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h2 className="font-display text-xl font-bold">New project</h2>
          <button onClick={onClose} aria-label="Close" className="text-ink-500 hover:text-ink-100">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <TextField
            label="Project title"
            required
            maxLength={80}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="The Griot of Kano"
            autoFocus
          />
          <div>
            <label htmlFor="idea" className="block text-sm font-medium text-ink-300">
              Your idea (optional)
            </label>
            <textarea
              id="idea"
              rows={4}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="A storyteller shares an old folktale with children at sunset..."
              className="mt-1.5 w-full rounded-xl border border-ink-700 bg-ink-800 px-4 py-3 text-sm text-ink-100 placeholder:text-ink-500 focus:border-gold-400 focus:outline-none"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" loading={submitting}>
              Create project
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}