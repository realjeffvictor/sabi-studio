import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import type { Project } from '../../types'

const statusLabel: Record<string, string> = {
  draft: 'Draft',
  generating: 'Generating',
  done: 'Finished',
  failed: 'Failed',
}

export default function ProjectCard({
  project,
  onDelete,
}: {
  project: Project
  onDelete: (project: Project) => void
}) {
  const date = new Date(project.created_at).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="group flex flex-col rounded-2xl border border-ink-700 bg-ink-900 transition hover:border-gold-500/50">
      <Link to={`/projects/${project.id}`} className="flex-1 p-5">
        <div className="flex aspect-video items-center justify-center rounded-xl bg-linear-to-br from-ink-800 to-ink-950 text-xs text-ink-500">
          Preview coming soon
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold">{project.title}</h3>
        {project.idea && (
          <p className="mt-1 line-clamp-2 text-sm text-ink-300">{project.idea}</p>
        )}
      </Link>

      <div className="flex items-center justify-between border-t border-ink-800 px-5 py-3">
        <div className="flex items-center gap-3 text-xs text-ink-500">
          <span className="rounded-full bg-gold-400/10 px-2.5 py-1 text-gold-300">
            {statusLabel[project.status] ?? project.status}
          </span>
          <span>{date}</span>
        </div>
        <button
          onClick={() => onDelete(project)}
          aria-label={`Delete ${project.title}`}
          className="rounded-lg p-2 text-ink-500 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}