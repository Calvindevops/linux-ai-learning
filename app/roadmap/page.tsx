'use client'
import Link from 'next/link'
import { CheckCircle2, Circle, Lock } from 'lucide-react'
import { useProgress } from '@/lib/hooks/useProgress'
import { WEEKS } from '@/lib/curriculum'

export default function RoadmapPage() {
  const { sessionProgress, completedSessions } = useProgress()

  // A session is "unlocked" if the previous session is at least started
  const allSessions = WEEKS.flatMap(w => w.sessions.map(s => ({ ...s, weekId: w.id, week: w })))

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Learning Roadmap</h1>
        <p className="text-white/40 mt-1 text-sm">Your 30-day path from Linux fundamentals to AI agent development.</p>
      </div>

      {WEEKS.map((week, wi) => (
        <div key={week.id} className="relative">
          {/* Week header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 z-10 relative"
              style={{ backgroundColor: week.color }}
            >
              {wi}
            </div>
            <div>
              <span className="text-xs text-white/40 uppercase tracking-wider">{week.label}</span>
              <h2 className="text-sm font-semibold text-white">{week.title}</h2>
            </div>
          </div>

          {/* Sessions */}
          <div className="ml-4 pl-6 border-l border-white/8 space-y-3 pb-4">
            {week.sessions.map((session, si) => {
              const globalIdx = allSessions.findIndex(s => s.id === session.id)
              const pct = sessionProgress(session.id)
              const done = pct === 100
              const prev = allSessions[globalIdx - 1]
              const unlocked = !prev || sessionProgress(prev.id) > 0

              return (
                <div key={session.id} className="relative">
                  {/* Connector dot */}
                  <div
                    className="absolute -left-[1.65rem] top-3 w-3 h-3 rounded-full border-2 flex-shrink-0"
                    style={{
                      backgroundColor: done ? week.color : unlocked ? 'transparent' : '#1a1a1a',
                      borderColor: done ? week.color : unlocked ? week.color : '#333',
                    }}
                  />

                  <Link href={`/sessions/${session.id}`}>
                    <div className={`rounded-xl border p-4 transition-all duration-200 ${
                      done
                        ? 'border-white/10 bg-white/3'
                        : unlocked
                        ? 'border-white/10 bg-card hover:border-accent-blue/30 hover:shadow-card-hover hover:-translate-y-0.5'
                        : 'border-white/5 bg-white/2 opacity-50 cursor-not-allowed'
                    }`}>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {done
                            ? <CheckCircle2 className="w-4 h-4 text-success" />
                            : unlocked
                            ? <Circle className="w-4 h-4 text-white/30" />
                            : <Lock className="w-4 h-4 text-white/20" />
                          }
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-white">{session.title}</span>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full font-semibold"
                              style={{ backgroundColor: `${session.tagColor}22`, color: session.tagColor }}
                            >
                              {session.tag}
                            </span>
                          </div>
                          <p className="text-xs text-white/40 mt-0.5 line-clamp-1">{session.concept}</p>
                          {pct > 0 && !done && (
                            <div className="mt-2 flex items-center gap-2">
                              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-accent-gradient rounded-full" style={{ width: `${pct}%` }} />
                              </div>
                              <span className="text-xs text-white/30">{pct}%</span>
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-white/20 flex-shrink-0">{session.date.split(' — ')[0]}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
