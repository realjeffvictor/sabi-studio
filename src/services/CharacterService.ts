import { supabase } from '../lib/supabase'
import type { Character, CharacterPatch } from '../types'

export async function listCharacters(projectId: string): Promise<Character[]> {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('project_id', projectId)
    .order('created_at')

  if (error) throw new Error(error.message)
  return data as Character[]
}

export async function createCharacter(
  projectId: string,
  input: CharacterPatch & { name: string },
): Promise<Character> {
  const { data, error } = await supabase
    .from('characters')
    .insert({ project_id: projectId, ...input })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Character
}

export async function updateCharacter(id: string, patch: CharacterPatch): Promise<void> {
  const { error } = await supabase.from('characters').update(patch).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteCharacter(id: string): Promise<void> {
  const { error } = await supabase.from('characters').delete().eq('id', id)
  if (error) throw new Error(error.message)
}