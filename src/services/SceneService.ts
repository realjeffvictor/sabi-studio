import { supabase } from '../lib/supabase'
import type { EditableScene, Scene, SceneDraft } from '../types'

export async function listScenes(projectId: string): Promise<Scene[]> {
  const { data, error } = await supabase
    .from('scenes')
    .select('*')
    .eq('project_id', projectId)
    .order('scene_number')

  if (error) throw new Error(error.message)
  return data as Scene[]
}

// Simple approach: remove the old scenes, then insert the new list.
// (Not atomic. We can make it safer later with a database function.)
export async function saveScenes(projectId: string, drafts: SceneDraft[]): Promise<Scene[]> {
  const { error: deleteError } = await supabase
    .from('scenes')
    .delete()
    .eq('project_id', projectId)
  if (deleteError) throw new Error(deleteError.message)

  if (drafts.length === 0) return []

  const rows = drafts.map((d, i) => ({
    project_id: projectId,
    scene_number: i + 1,
    duration_seconds: d.duration_seconds,
    visual_description: d.visual_description,
    camera_notes: d.camera_notes,
    dialogue: d.dialogue,
    sound_effects: d.sound_effects,
    music_cue: d.music_cue,
  }))

  const { data, error } = await supabase
    .from('scenes')
    .insert(rows)
    .select()
    .order('scene_number')

  if (error) throw new Error(error.message)
  return data as Scene[]
}

export function toEditable(s: SceneDraft & { id?: string }): EditableScene {
  return {
    key: s.id ?? crypto.randomUUID(),
    scene_number: s.scene_number,
    duration_seconds: s.duration_seconds,
    visual_description: s.visual_description,
    camera_notes: s.camera_notes,
    dialogue: s.dialogue,
    sound_effects: s.sound_effects,
    music_cue: s.music_cue,
  }
}

export function toDraft(s: EditableScene, index: number): SceneDraft {
  return {
    scene_number: index + 1,
    duration_seconds: s.duration_seconds,
    visual_description: s.visual_description,
    camera_notes: s.camera_notes,
    dialogue: s.dialogue,
    sound_effects: s.sound_effects,
    music_cue: s.music_cue,
  }
}