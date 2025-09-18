import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

export const useSupabase = () => {
  if (supabaseClient) {
    return supabaseClient
  }

  const config = useRuntimeConfig()
  
  const supabaseUrl = config.public.supabaseUrl!
  const supabaseAnonKey = config.public.supabaseAnonKey!

  if (!supabaseUrl) {
    throw new Error('Missing SUPABASE_URL environment variable')
  }

  if (!supabaseAnonKey) {
    throw new Error('Missing SUPABASE_ANON_KEY environment variable')
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  
  return supabaseClient
}