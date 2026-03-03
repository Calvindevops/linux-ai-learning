import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

// GET /api/progress?user_id=xxx
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('user_id')
  if (!userId) return NextResponse.json({ error: 'Missing user_id' }, { status: 400 })

  let supabase
  try { supabase = getSupabase() } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 503 }) }

  const { data, error } = await supabase
    .from('progress')
    .select('task_key, completed')
    .eq('user_id', userId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const checked: Record<string, boolean> = {}
  for (const row of data ?? []) {
    checked[row.task_key] = row.completed
  }

  return NextResponse.json({ checked })
}

// POST /api/progress
// body: { user_id, task_key, completed }
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { user_id, task_key, completed } = body

  if (!user_id || !task_key || typeof completed !== 'boolean') {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  let supabase
  try { supabase = getSupabase() } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 503 }) }

  const { error } = await supabase
    .from('progress')
    .upsert({ user_id, task_key, completed, updated_at: new Date().toISOString() }, { onConflict: 'user_id,task_key' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
