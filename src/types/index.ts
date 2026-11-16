export type Project = {
  id: string
  title: string
  idea: string | null
  style: string | null
  language: string | null
  status: string
  target_duration: number
  created_at: string
  updated_at: string
}

export type Profile = {
  id: string
  display_name: string | null
  credits: number
}