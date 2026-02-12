import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('[Supabase] Missing env vars: VITE_SUPABASE_URL or VITE_SUPABASE_KEY not set');
} else {
  console.log('[Supabase] Client initialized', { url: supabaseUrl, keyPresent: !!supabaseAnonKey });
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
