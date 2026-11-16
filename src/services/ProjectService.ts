import { supabase } from '../lib/supabase'
import type { Project } from '../types'

export async function listProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data as Project[]
}

export async function createProject(input: {
  title: string
  idea: string
}): Promise<Project> {
  // user_id is filled in automatically by the database (default auth.uid())
  const { data, error } = await supabase
    .from('projects')
    .insert({ title: input.title, idea: input.idea || null })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Project
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw new Error(error.message)
}