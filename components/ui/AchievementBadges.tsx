'use client'
import { cn } from '@/lib/utils'

interface Achievement {
  id: string
  emoji: string
  title: string
  desc: string
  unlocked: boolean
}

interface AchievementBadgesProps {
  totalTasksDone: number
  completedSessions: number
  overallProgress: number
  streak: number
}

export function AchievementBadges({ totalTasksDone, completedSessions, overallProgress, streak }: AchievementBadgesProps) {
  const achievements: Achievement[] = [
    { id: 'first_task',    emoji: '⚡', title: 'First Step',      desc: 'Complete your first task',           unlocked: totalTasksDone >= 1 },
    { id: 'first_session', emoji: '📖', title: 'Bookworm',        desc: 'Complete your first session',        unlocked: completedSessions >= 1 },
    { id: 'streak_3',      emoji: '🔥', title: 'On Fire',         desc: '3-day streak',                       unlocked: streak >= 3 },
    { id: 'streak_7',      emoji: '🚀', title: 'Unstoppable',     desc: '7-day streak',                       unlocked: streak >= 7 },
    { id: 'tasks_25',      emoji: '💪', title: 'Hustler',         desc: 'Complete 25 tasks',                  unlocked: totalTasksDone >= 25 },
    { id: 'tasks_50',      emoji: '🏋️', title: 'Grinder',         desc: 'Complete 50 tasks',                  unlocked: totalTasksDone >= 50 },
    { id: 'sessions_5',    emoji: '🎯', title: 'Sharp Shooter',   desc: 'Complete 5 sessions',                unlocked: completedSessions >= 5 },
    { id: 'sessions_10',   emoji: '🌟', title: 'Star Learner',    desc: 'Complete 10 sessions',               unlocked: completedSessions >= 10 },
    { id: 'halfway',       emoji: '🏁', title: 'Halfway There',   desc: 'Reach 50% overall progress',         unlocked: overallProgress >= 50 },
    { id: 'week1',         emoji: '🐧', title: 'Linux Initiate',  desc: 'Complete Week 1',                    unlocked: completedSessions >= 5 },
    { id: 'week2',         emoji: '🌐', title: 'Network Ninja',   desc: 'Complete Week 2',                    unlocked: completedSessions >= 10 },
    { id: 'graduate',      emoji: '🎓', title: 'AI Engineer',     desc: 'Complete the full curriculum',       unlocked: overallProgress === 100 },
  ]

  const unlocked = achievements.filter(a => a.unlocked)
  const locked = achievements.filter(a => !a.unlocked)

  if (unlocked.length === 0) return null

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider">Achievements</h2>
        <span className="text-xs text-white/30">{unlocked.length}/{achievements.length}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {unlocked.map(a => (
          <div
            key={a.id}
            title={`${a.title}: ${a.desc}`}
            className="group relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/8 border border-white/10 hover:border-accent-blue/30 transition-all cursor-default"
          >
            <span className="text-base">{a.emoji}</span>
            <span className="text-xs font-semibold text-white/70">{a.title}</span>
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block z-10 pointer-events-none">
              <div className="bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white/70 whitespace-nowrap shadow-xl">
                {a.desc}
              </div>
            </div>
          </div>
        ))}
        {locked.slice(0, 4).map(a => (
          <div
            key={a.id}
            title={`Locked: ${a.desc}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/3 border border-white/5 opacity-40 cursor-default"
          >
            <span className="text-base grayscale">{a.emoji}</span>
            <span className="text-xs font-semibold text-white/30">{a.title}</span>
          </div>
        ))}
        {locked.length > 4 && (
          <div className="flex items-center px-3 py-1.5 rounded-full bg-white/3 border border-white/5 opacity-40">
            <span className="text-xs text-white/30">+{locked.length - 4} more</span>
          </div>
        )}
      </div>
    </div>
  )
}
