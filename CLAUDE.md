# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Security — ABSOLUTE RULES
- **NEVER delete, nuke, or remove projects, directories, or files** — always build on top, iterate, refactor.
- **NEVER run `rm -rf`, `git clean -f`, or any destructive file operations** without Calvin's explicit per-instance approval

## Commands

```bash
# Dev server (use node directly to avoid Windows npm conflict in WSL)
node node_modules/next/dist/bin/next dev

# Production build
node node_modules/next/dist/bin/next build

# Or if WSL-native npm is installed:
npm run dev
npm run build
npm run lint
```

Dev server runs at http://localhost:3000.

## Environment Setup

Copy `.env.local.example` to `.env.local` and fill in Supabase values:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Without these, the app works fully via localStorage. The `/api/progress` route returns 503 until env vars are set.

## Supabase Table

Run this SQL in your Supabase project to enable cloud sync:
```sql
create table progress (
  id uuid default gen_random_uuid() primary key,
  user_id text not null,
  task_key text not null,
  completed boolean default false,
  updated_at timestamptz default now(),
  unique(user_id, task_key)
);
alter table progress enable row level security;
create policy "Users manage own progress" on progress for all using (auth.uid()::text = user_id);
```

## Architecture

**Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS · Framer Motion · Supabase · Lucide React

**Key files:**
- `lib/curriculum.ts` — all curriculum data (WEEKS, BOOK, RESOURCES). All content changes go here.
- `lib/hooks/useProgress.ts` — progress state, computed values (overallProgress, sessionProgress, etc.)
- `lib/hooks/useLocalStorage.ts` — generic localStorage hook used by useProgress
- `lib/supabase.ts` — lazy Supabase client (only initializes when env vars are present)

**Progress data model:** stored in localStorage under key `curriculum-tasks-v2` as `{ "sessionId-taskIndex": boolean }`. The `/api/progress` route syncs this to Supabase when env vars are configured.

**Routing:**
- `/` — dashboard with ProgressRing, StatsGrid, CurrentSession, WeekCards
- `/sessions` — all sessions list, filterable by `?week=w1`
- `/sessions/[id]` — individual session: concept, book refs, task list, quiz, prev/next nav
- `/progress` — per-week and per-session breakdown with reset button
- `/resources` — reference links, tools, reading material

**Component organization:**
- `components/ui/` — primitives (Button, Card, Badge, ProgressBar, Checkbox, CommandPalette)
- `components/layout/` — Sidebar, Header, MobileNav (fixed sidebar on desktop, bottom nav on mobile)
- `components/dashboard/` — ProgressRing, StatsGrid, CurrentSession, WeekCard
- `components/session/` — TaskList, TerminalBlock (with copy button), BookReference, QuizSection

**Command Palette:** triggered by Ctrl+K / Cmd+K, searches all session titles and tags.

## WSL Note

`npm` resolves to the Windows install at `/mnt/c/Program Files/nodejs/npm`, which causes UNC path errors with Next.js. Always use `node node_modules/next/dist/bin/next` directly, or install Node.js natively in WSL via `nvm` or NodeSource.
