import { CheckSquare, BookOpen, Flame, Zap } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { ALL_SESSIONS, getTotalTaskCount } from '@/lib/curriculum'
import { calcXP, xpLevel } from '@/lib/hooks/useXP'
import { ProgressBar } from '@/components/ui/Progress'

interface StatsGridProps {
  totalTasksDone: number
  completedSessions: number
  overallProgress: number
  streak: number
}

export function StatsGrid({ totalTasksDone, completedSessions, overallProgress, streak }: StatsGridProps) {
  const xp = calcXP(totalTasksDone, completedSessions)
  const { level, title, progress: lvlProgress } = xpLevel(xp)

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Tasks */}
      <Card className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40 font-medium">Tasks Done</span>
          <CheckSquare className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
          <span className="text-2xl font-bold text-white">{totalTasksDone}</span>
          <span className="text-sm text-white/30 ml-1">/ {getTotalTaskCount()}</span>
        </div>
        <ProgressBar value={Math.round((totalTasksDone / getTotalTaskCount()) * 100)} size="sm" />
      </Card>

      {/* Sessions */}
      <Card className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40 font-medium">Sessions</span>
          <BookOpen className="w-4 h-4 text-accent-blue-light" />
        </div>
        <div>
          <span className="text-2xl font-bold text-white">{completedSessions}</span>
          <span className="text-sm text-white/30 ml-1">/ {ALL_SESSIONS.length}</span>
        </div>
        <ProgressBar value={Math.round((completedSessions / ALL_SESSIONS.length) * 100)} size="sm" />
      </Card>

      {/* Streak */}
      <Card className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40 font-medium">Day Streak</span>
          <Flame className={`w-4 h-4 ${streak > 0 ? 'text-orange-400' : 'text-white/20'}`} />
        </div>
        <div className="flex items-end gap-1">
          <span className="text-2xl font-bold text-white">{streak}</span>
          <span className="text-sm text-white/30 mb-0.5">day{streak !== 1 ? 's' : ''}</span>
        </div>
        <p className="text-xs text-white/30">
          {streak === 0 ? 'Complete a task to start' : streak >= 7 ? '🔥 On fire!' : 'Keep going!'}
        </p>
      </Card>

      {/* XP */}
      <Card className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40 font-medium">Level {level}</span>
          <Zap className="w-4 h-4 text-yellow-400" />
        </div>
        <div>
          <span className="text-lg font-bold text-white">{title}</span>
        </div>
        <div>
          <ProgressBar value={lvlProgress} size="sm" />
          <p className="text-xs text-white/30 mt-1">{xp} XP total</p>
        </div>
      </Card>
    </div>
  )
}
