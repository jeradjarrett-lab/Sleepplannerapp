import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info.tsx';

const supabaseUrl = `https://${projectId}.supabase.co`;

// Create a singleton Supabase client for the frontend
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

export function createClient() {
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient(supabaseUrl, publicAnonKey);
  }
  return supabaseInstance;
}

// Export the client directly for convenience
export const supabase = createClient();
