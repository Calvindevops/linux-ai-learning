import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/Progress'
import { getSession, getWeekForSession } from '@/lib/curriculum'

interface CurrentSessionProps {
  sessionId: string
  progress: number
}

export function CurrentSession({ sessionId, progress }: CurrentSessionProps) {
  const session = getSession(sessionId)
  const week = getWeekForSession(sessionId)
  if (!session || !week) return null

  return (
    <Card gradient className="flex flex-col gap-4 border-accent-blue/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-accent-blue-light" />
          <span className="text-xs text-accent-blue-light font-semibold uppercase tracking-wide">Continue Learning</span>
        </div>
        <Badge label={week.label} color={week.color} />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white">{session.title}</h3>
        <p className="text-sm text-white/50 mt-1 line-clamp-2">{session.concept}</p>
      </div>

      <div className="flex items-center gap-3">
        <ProgressBar value={progress} className="flex-1" />
        <span className="text-xs text-white/40 flex-shrink-0">{progress}%</span>
      </div>

      <Link
        href={`/sessions/${sessionId}`}
        className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-lg bg-accent-blue hover:bg-blue-600 text-white text-sm font-semibold transition-colors"
      >
        Start Session <ArrowRight className="w-4 h-4" />
      </Link>
    </Card>
  )
}
