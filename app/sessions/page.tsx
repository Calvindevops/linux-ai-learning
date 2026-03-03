'use client'
import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, Circle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/Progress'
import { useProgress } from '@/lib/hooks/useProgress'
import { WEEKS } from '@/lib/curriculum'

function SessionsContent() {
  const params = useSearchParams()
  const weekFilter = params.get('week')
  const { sessionProgress, weekProgress } = useProgress()

  const weeks = weekFilter ? WEEKS.filter(w => w.id === weekFilter) : WEEKS

  return (
    <div className="space-y-10 animate-fade-in">
      {weeks.map(week => (
        <div key={week.id}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: week.color }} />
            <h2 className="text-sm font-semibold text-white">{week.label} — {week.title}</h2>
            <span className="ml-auto text-xs text-white/30">{weekProgress(week.id)}%</span>
          </div>

          <div className="space-y-3">
            {week.sessions.map(session => {
              const pct = sessionProgress(session.id)
              const done = pct === 100

              return (
                <Link key={session.id} href={`/sessions/${session.id}`}>
                  <Card hover className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {done
                        ? <CheckCircle2 className="w-5 h-5 text-success" />
                        : <Circle className="w-5 h-5 text-white/20" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-white">{session.title}</span>
                        <Badge label={session.tag} color={session.tagColor} />
                      </div>
                      <p className="text-xs text-white/40 mt-0.5 truncate">{session.date}</p>
                      {pct > 0 && !done && <ProgressBar value={pct} size="sm" className="mt-2 max-w-xs" />}
                    </div>
                    <span className="text-xs text-white/30 flex-shrink-0">{pct}%</span>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function SessionsPage() {
  return (
    <Suspense>
      <SessionsContent />
    </Suspense>
  )
}
