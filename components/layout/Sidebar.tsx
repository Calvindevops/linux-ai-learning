'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, BarChart3, Library, Search, Map, Award } from 'lucide-react'
import { WEEKS } from '@/lib/curriculum'
import { useProgress } from '@/lib/hooks/useProgress'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/roadmap', icon: Map, label: 'Roadmap' },
  { href: '/sessions', icon: BookOpen, label: 'Sessions' },
  { href: '/progress', icon: BarChart3, label: 'Progress' },
  { href: '/resources', icon: Library, label: 'Resources' },
  { href: '/certificate', icon: Award, label: 'Certificate' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { weekProgress } = useProgress()

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-[#080808] border-r border-white/8 fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/8">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-accent-gradient flex items-center justify-center text-xs font-bold text-white">L</div>
          <span className="text-sm font-semibold text-white">Linux → AI</span>
        </div>
        <p className="text-xs text-white/30 mt-1">30-Day Curriculum</p>
      </div>

      {/* Nav */}
      <nav className="px-3 py-4 flex-1 overflow-y-auto">
        <div className="space-y-0.5 mb-6">
          {NAV.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                pathname === href
                  ? 'bg-accent-blue/15 text-accent-blue-light font-medium'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          ))}
        </div>

        {/* Weeks */}
        <div>
          <p className="px-3 text-xs font-semibold text-white/20 uppercase tracking-wider mb-2">Weeks</p>
          <div className="space-y-1">
            {WEEKS.map(week => {
              const pct = weekProgress(week.id)
              return (
                <Link
                  key={week.id}
                  href={`/sessions?week=${week.id}`}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: week.color }}
                  />
                  <span className="text-xs text-white/50 group-hover:text-white/80 flex-1 truncate">{week.label}</span>
                  <span className="text-xs text-white/30">{pct}%</span>
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Cmd+K hint */}
      <div className="px-4 py-3 border-t border-white/8 space-y-3">
        <button
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-white/5 hover:bg-white/8 transition-colors text-white/30 text-xs"
          onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
        >
          <Search className="w-3.5 h-3.5" />
          <span className="flex-1 text-left">Quick search...</span>
          <kbd className="text-white/20">⌘K</kbd>
        </button>
        {/* TailormadeAI branding */}
        <a
          href="https://tailormadeai.io"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group"
        >
          <div className="w-4 h-4 rounded bg-accent-gradient flex-shrink-0" />
          <span className="text-xs text-white/20 group-hover:text-white/40 transition-colors">TailormadeAI.IO</span>
        </a>
      </div>
    </aside>
  )
}
