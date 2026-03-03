import { createClient, SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (_client) return _client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new Error('Supabase env vars not set. Copy .env.local.example to .env.local and fill in your values.')
  _client = createClient(url, key)
  return _client
}

// Database types
export interface ProgressRow {
  id: string
  user_id: string
  task_key: string
  completed: boolean
  updated_at: string
}

// SQL to create the table in Supabase:
//
// create table progress (
//   id uuid default gen_random_uuid() primary key,
//   user_id text not null,
//   task_key text not null,
//   completed boolean default false,
//   updated_at timestamptz default now(),
//   unique(user_id, task_key)
// );
//
// alter table progress enable row level security;
// create policy "Users can manage their own progress"
//   on progress for all using (auth.uid()::text = user_id);
