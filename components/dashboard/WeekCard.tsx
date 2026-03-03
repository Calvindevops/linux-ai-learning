import Link from 'next/link'
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/Progress'
import { Week } from '@/lib/curriculum'

interface WeekCardProps {
  week: Week
  progress: number
  completedCount: number
}

export function WeekCard({ week, progress, completedCount }: WeekCardProps) {
  const isComplete = progress === 100

  return (
    <Card hover className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ backgroundColor: week.color }}
          >
            {week.label[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white/40 uppercase tracking-wide">{week.label}</span>
              {isComplete && <CheckCircle2 className="w-3.5 h-3.5 text-success" />}
            </div>
            <h3 className="text-sm font-semibold text-white mt-0.5">{week.title}</h3>
          </div>
        </div>
        <span className="text-xs text-white/30 flex-shrink-0">{completedCount}/{week.sessions.length}</span>
      </div>

      <p className="text-xs text-white/40 leading-relaxed">{week.subtitle}</p>

      <ProgressBar value={progress} size="sm" />

      <Link
        href={`/sessions?week=${week.id}`}
        className="flex items-center gap-1 text-xs text-white/40 hover:text-accent-blue-light transition-colors self-start"
      >
        View sessions <ChevronRight className="w-3.5 h-3.5" />
      </Link>
    </Card>
  )
}
