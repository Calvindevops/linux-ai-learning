'use client'
import Link from 'next/link'
import { CheckCircle2, Circle, RotateCcw } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/Progress'
import { ProgressRing } from '@/components/dashboard/ProgressRing'
import { Button } from '@/components/ui/Button'
import { useProgress } from '@/lib/hooks/useProgress'
import { WEEKS, getSessionTaskKeys } from '@/lib/curriculum'

export default function ProgressPage() {
  const { overallProgress, sessionProgress, weekProgress, totalTasksDone, completedSessions, resetAll, loaded } = useProgress()

  if (!loaded) return null

  const handleReset = () => {
    if (confirm('Reset all progress? This cannot be undone.')) resetAll()
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Progress</h1>
          <p className="text-white/40 mt-1 text-sm">{totalTasksDone} tasks done · {completedSessions} sessions complete</p>
        </div>
        <Button variant="danger" size="sm" onClick={handleReset}>
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </Button>
      </div>

      {/* Overall ring */}
      <Card className="flex items-center gap-8">
        <ProgressRing progress={overallProgress} size={112} />
        <div className="space-y-2 flex-1">
          <p className="text-sm font-semibold text-white">Overall Curriculum Progress</p>
          <p className="text-xs text-white/40">{overallProgress}% of all tasks completed across {WEEKS.length} weeks and {WEEKS.flatMap(w => w.sessions).length} sessions.</p>
        </div>
      </Card>

      {/* Per-week breakdown */}
      {WEEKS.map(week => {
        const pct = weekProgress(week.id)
        return (
          <div key={week.id}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: week.color }} />
              <h2 className="text-sm font-semibold text-white">{week.label} — {week.title}</h2>
              <span className="ml-auto text-xs text-white/30">{pct}%</span>
            </div>
            <ProgressBar value={pct} className="mb-4" />
            <div className="space-y-2">
              {week.sessions.map(session => {
                const sPct = sessionProgress(session.id)
                const taskCount = getSessionTaskKeys(session.id).length
                return (
                  <Link key={session.id} href={`/sessions/${session.id}`}>
                    <Card hover className="flex items-center gap-3 py-3">
                      {sPct === 100
                        ? <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                        : <Circle className="w-4 h-4 text-white/20 flex-shrink-0" />
                      }
                      <span className="text-sm text-white flex-1 truncate">{session.title}</span>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <ProgressBar value={sPct} size="sm" className="w-20 hidden sm:block" />
                        <span className="text-xs text-white/30 w-8 text-right">{sPct}%</span>
                      </div>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
