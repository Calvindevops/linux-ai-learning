'use client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Lightbulb, ListTodo } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { TaskList } from '@/components/session/TaskList'
import { BookReference } from '@/components/session/BookReference'
import { QuizSection } from '@/components/session/QuizSection'
import { ProgressBar } from '@/components/ui/Progress'
import { CollapsibleSection } from '@/components/ui/CollapsibleSection'
import { useProgress } from '@/lib/hooks/useProgress'
import { useStreak } from '@/lib/hooks/useStreak'
import { useKeyboardNav } from '@/lib/hooks/useKeyboardNav'
import { getSession, getWeekForSession, ALL_SESSIONS } from '@/lib/curriculum'

interface Props {
  params: { id: string }
}

// Estimated minutes per session (rough guide)
const SESSION_TIMES: Record<string, number> = {
  s0: 90, s1: 60, s2: 60, s3: 75, s4: 60, s5: 90,
  s6: 60, s7: 60, s8: 75, s9: 75, s10: 90,
  s11: 90, s12: 90, s13: 60, s14: 90, s15: 120,
  s16: 90, s17: 90, s18: 90, s19: 120, s20: 240,
}

export default function SessionPage({ params }: Props) {
  const { toggleTask, isTaskChecked, sessionProgress, totalTasksDone } = useProgress()
  const { recordActivity } = useStreak(totalTasksDone)

  useKeyboardNav(params.id)

  const session = getSession(params.id)
  const week = getWeekForSession(params.id)

  if (!session || !week) return notFound()

  const progress = sessionProgress(params.id)
  const idx = ALL_SESSIONS.findIndex(s => s.sessionId === params.id)
  const prev = idx > 0 ? ALL_SESSIONS[idx - 1] : null
  const next = idx < ALL_SESSIONS.length - 1 ? ALL_SESSIONS[idx + 1] : null
  const estMins = SESSION_TIMES[session.id] ?? 60
  const doneTasks = session.tasks.filter((_, i) => isTaskChecked(session.id, i)).length

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-white/30">
        <Link href="/sessions" className="hover:text-white/60 transition-colors">Sessions</Link>
        <span>/</span>
        <span className="text-white/50">{week.label}</span>
        <span className="ml-auto text-white/20 hidden sm:block">j/k or ← → to navigate</span>
      </div>

      {/* Sticky progress */}
      <div className="sticky top-14 z-20 -mx-6 px-6 py-2 bg-black/80 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-3 max-w-3xl">
          <ProgressBar value={progress} size="sm" className="flex-1" />
          <span className="text-xs text-white/40 flex-shrink-0">{progress}%</span>
        </div>
      </div>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge label={session.tag} color={session.tagColor} />
          <span className="text-xs text-white/30">{session.date}</span>
          <span className="text-xs text-white/20">·</span>
          <span className="text-xs text-white/30">~{estMins} min</span>
        </div>
        <h1 className="text-2xl font-bold text-white">{session.title}</h1>
      </div>

      {/* Concept — collapsible */}
      <CollapsibleSection
        title="Core Concept"
        icon={<Lightbulb className="w-4 h-4 text-amber-400" />}
        className="border-amber-500/20 bg-amber-500/5"
        defaultOpen={true}
      >
        <p className="text-sm text-white/70 leading-relaxed">{session.concept}</p>
      </CollapsibleSection>

      {/* Book References */}
      {session.bookRefs.length > 0 && <BookReference bookRefs={session.bookRefs} />}

      {/* Tasks — collapsible */}
      <CollapsibleSection
        title="Tasks"
        icon={<ListTodo className="w-4 h-4 text-accent-blue-light" />}
        badge={`${doneTasks}/${session.tasks.length}`}
        defaultOpen={true}
      >
        <TaskList
          sessionId={session.id}
          tasks={session.tasks}
          isChecked={isTaskChecked}
          onToggle={toggleTask}
          progress={progress}
          onRecordActivity={recordActivity}
        />
      </CollapsibleSection>

      {/* Quiz + Claude Prompt */}
      <QuizSection questions={session.quiz} claudePrompt={session.claudePrompt} />

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-white/8">
        {prev ? (
          <Link href={`/sessions/${prev.sessionId}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Previous
          </Link>
        ) : <div />}
        {next ? (
          <Link href={`/sessions/${next.sessionId}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
            Next <ArrowRight className="w-4 h-4" />
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
