export type Project = {
  id: string
  title: string
  idea: string | null
  style: string | null
  language: string | null
  accent: string | null
  music_mood: string | null
  target_duration: number
  voice_key: string | null
  sfx_enabled: boolean
  voice_balance: number
  status: string
  created_at: string
  updated_at: string
}

export type ProjectPatch = Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>

export type Profile = {
  id: string
  display_name: string | null
  credits: number
}

export type DialogueLine = {
  speaker: string
  text_native: string
  text_english: string
  emotion: string
}

export type SceneDraft = {
  scene_number: number
  duration_seconds: number
  visual_description: string | null
  camera_notes: string | null
  dialogue: DialogueLine[]
  sound_effects: string[]
  music_cue: string | null
}

export type Scene = SceneDraft & {
  id: string
  project_id: string
}

// A scene being edited in the browser. "key" keeps React lists stable.
export type EditableScene = SceneDraft & { key: string }