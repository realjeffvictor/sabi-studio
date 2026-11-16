import { supabase } from '../lib/supabase'
import type { Profile } from '../types'

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, display_name, credits')
    .eq('id', userId)
    .maybeSingle()

  if (error) throw new Error(error.message)
  return data as Profile | null
}