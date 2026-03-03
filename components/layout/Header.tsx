'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu } from 'lucide-react'
import { useProgress } from '@/lib/hooks/useProgress'
import { ProgressBar } from '@/components/ui/Progress'

const TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/sessions': 'Sessions',
  '/progress': 'Progress',
  '/resources': 'Resources',
}

export function Header() {
  const pathname = usePathname()
  const { overallProgress } = useProgress()
  const title = TITLES[pathname] ?? 'Session'

  return (
    <header className="h-14 border-b border-white/8 flex items-center gap-4 px-6 bg-[#080808]/80 backdrop-blur-sm sticky top-0 z-30">
      <span className="text-sm font-semibold text-white">{title}</span>
      <div className="flex-1" />
      <div className="hidden sm:flex items-center gap-3 text-xs text-white/40">
        <ProgressBar value={overallProgress} size="sm" className="w-24" />
        <span>{overallProgress}% complete</span>
      </div>
      <button
        className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
        onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
        title="Search (Ctrl+K)"
      >
        <Search className="w-4 h-4" />
      </button>
    </header>
  )
}
