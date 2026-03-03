'use client'
import { useProgress } from '@/lib/hooks/useProgress'
import { calcXP } from '@/lib/hooks/useXP'
import { Lock, Download, Share2 } from 'lucide-react'
import Link from 'next/link'

export default function CertificatePage() {
  const { overallProgress, completedSessions, totalTasksDone, loaded } = useProgress()
  const xp = calcXP(totalTasksDone, completedSessions)
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  if (!loaded) return null

  if (overallProgress < 100) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
          <Lock className="w-7 h-7 text-white/30" />
        </div>
        <h1 className="text-xl font-bold text-white">Certificate Locked</h1>
        <p className="text-white/40 max-w-sm text-sm">
          Complete 100% of the curriculum to unlock your certificate. You're at {overallProgress}%.
        </p>
        <Link
          href="/roadmap"
          className="mt-2 px-4 py-2 rounded-lg bg-accent-blue text-white text-sm font-semibold hover:bg-blue-600 transition-colors"
        >
          View Roadmap
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center animate-fade-in py-8">
      {/* Certificate */}
      <div
        id="certificate"
        className="w-full max-w-2xl rounded-2xl border-2 border-accent-blue/40 bg-[#080810] p-10 text-center relative overflow-hidden"
        style={{ boxShadow: '0 0 60px rgba(21,94,239,0.2), 0 0 120px rgba(21,94,239,0.08)' }}
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(21,94,239,0.08)_0%,transparent_70%)] pointer-events-none" />

        {/* TailormadeAI badge */}
        <div className="flex justify-center mb-6">
          <div className="px-4 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/10 text-xs font-semibold text-accent-blue-light tracking-widest uppercase">
            TailormadeAI.IO
          </div>
        </div>

        <p className="text-white/40 text-sm uppercase tracking-widest mb-2">Certificate of Completion</p>

        <div className="text-6xl mb-4">🎓</div>

        <h1 className="text-3xl font-bold text-white mb-2">Linux → AI Developer</h1>
        <p className="text-lg text-white/50 mb-6">30-Day Curriculum</p>

        <div className="w-24 h-px bg-accent-blue/40 mx-auto mb-6" />

        <p className="text-white/40 text-sm mb-1">This certifies that you have successfully completed</p>
        <p className="text-white font-semibold text-lg mb-6">all {completedSessions} sessions · {totalTasksDone} tasks · {xp} XP</p>

        <p className="text-white/30 text-xs">{today}</p>

        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50">
            🐧 Linux Fundamentals
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50">
            🐍 Python Scripting
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50">
            🤖 Claude AI Agents
          </div>
          <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white/50">
            🚀 Production Deployment
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/8 flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded bg-accent-gradient" />
          <span className="text-xs text-white/30">Powered by <span className="text-accent-blue-light">TailormadeAI.IO</span></span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-blue hover:bg-blue-600 text-white text-sm font-semibold transition-colors"
        >
          <Download className="w-4 h-4" /> Save / Print
        </button>
        <button
          onClick={() => {
            const text = `I just completed the Linux → AI Developer 30-Day Curriculum by @TailormadeAI! 🎓🐧🤖 #Linux #AI #Claude`
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank')
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-colors border border-white/10"
        >
          <Share2 className="w-4 h-4" /> Share on X
        </button>
      </div>
    </div>
  )
}
