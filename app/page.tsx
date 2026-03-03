'use client'
import { ProgressRing } from '@/components/dashboard/ProgressRing'
import { StatsGrid } from '@/components/dashboard/StatsGrid'
import { CurrentSession } from '@/components/dashboard/CurrentSession'
import { WeekCard } from '@/components/dashboard/WeekCard'
import { AchievementBadges } from '@/components/ui/AchievementBadges'
import { DashboardSkeleton } from '@/components/ui/Skeleton'
import { useProgress } from '@/lib/hooks/useProgress'
import { useStreak } from '@/lib/hooks/useStreak'
import { WEEKS } from '@/lib/curriculum'
import Link from 'next/link'
import { Map, Award } from 'lucide-react'

export default function Dashboard() {
  const {
    overallProgress,
    totalTasksDone,
    completedSessions,
    currentSession,
    sessionProgress,
    weekProgress,
    loaded,
  } = useProgress()

  const { streak } = useStreak(totalTasksDone)

  if (!loaded) return <DashboardSkeleton />

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <ProgressRing progress={overallProgress} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">Linux → AI Developer</h1>
          <p className="text-white/50 mt-1">30-Day Curriculum · TailormadeAI.IO</p>
          <p className="text-sm text-white/30 mt-3 max-w-md">
            {overallProgress === 0
              ? 'Start with Pre-Start setup to begin your journey.'
              : overallProgress === 100
              ? '🎉 Curriculum complete! Claim your certificate.'
              : `Keep going — you're building real skills.`}
          </p>
          <div className="flex items-center gap-4 mt-4">
            <Link href="/roadmap" className="inline-flex items-center gap-1.5 text-xs text-accent-blue-light hover:text-white transition-colors">
              <Map className="w-3.5 h-3.5" /> View roadmap
            </Link>
            {overallProgress === 100 && (
              <Link href="/certificate" className="inline-flex items-center gap-1.5 text-xs text-yellow-400 hover:text-white transition-colors">
                <Award className="w-3.5 h-3.5" /> Get certificate
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <StatsGrid
        totalTasksDone={totalTasksDone}
        completedSessions={completedSessions}
        overallProgress={overallProgress}
        streak={streak}
      />

      {/* Achievements */}
      <AchievementBadges
        totalTasksDone={totalTasksDone}
        completedSessions={completedSessions}
        overallProgress={overallProgress}
        streak={streak}
      />

      {/* Current Session */}
      <div>
        <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">Continue Learning</h2>
        <CurrentSession
          sessionId={currentSession.sessionId}
          progress={sessionProgress(currentSession.sessionId)}
        />
      </div>

      {/* Week Overview */}
      <div>
        <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">All Weeks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {WEEKS.map(week => (
            <WeekCard
              key={week.id}
              week={week}
              progress={weekProgress(week.id)}
              completedCount={week.sessions.filter(s => sessionProgress(s.id) === 100).length}
            />
          ))}
        </div>
      </div>

      {/* TailormadeAI footer badge */}
      <div className="flex justify-center pt-4 border-t border-white/5">
        <a
          href="https://tailormadeai.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/8 hover:border-accent-blue/30 transition-colors text-xs text-white/30 hover:text-white/60"
        >
          <div className="w-4 h-4 rounded bg-accent-gradient flex-shrink-0" />
          Powered by TailormadeAI.IO
        </a>
      </div>
    </div>
  )
}
