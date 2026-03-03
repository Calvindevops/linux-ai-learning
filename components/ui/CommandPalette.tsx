'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { ALL_SESSIONS, WEEKS, getSession } from '@/lib/curriculum'

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleOpen = useCallback(() => { setOpen(true); setQuery('') }, [])
  const handleClose = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); handleOpen() }
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [handleOpen, handleClose])

  const results = query.trim()
    ? ALL_SESSIONS.filter(({ sessionId, weekLabel }) => {
        const session = getSession(sessionId)
        if (!session) return false
        const q = query.toLowerCase()
        return (
          session.title.toLowerCase().includes(q) ||
          session.tag.toLowerCase().includes(q) ||
          weekLabel.toLowerCase().includes(q)
        )
      }).slice(0, 8)
    : ALL_SESSIONS.slice(0, 8)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4" onClick={handleClose}>
      <div
        className="w-full max-w-lg bg-[#111] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <Search className="w-4 h-4 text-white/40 flex-shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search sessions..."
            className="flex-1 bg-transparent text-white placeholder-white/30 text-sm outline-none"
          />
          <button onClick={handleClose}><X className="w-4 h-4 text-white/40 hover:text-white" /></button>
        </div>
        <ul className="py-2 max-h-80 overflow-y-auto">
          {results.map(({ sessionId, weekLabel }) => {
            const session = getSession(sessionId)
            if (!session) return null
            const week = WEEKS.find(w => w.sessions.some(s => s.id === sessionId))
            return (
              <li key={sessionId}>
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 text-left transition-colors"
                  onClick={() => { router.push(`/sessions/${sessionId}`); handleClose() }}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: week?.color ?? '#155eef' }}
                  />
                  <span className="text-sm text-white flex-1 truncate">{session.title}</span>
                  <span className="text-xs text-white/30">{weekLabel}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <div className="px-4 py-2 border-t border-white/10 text-xs text-white/30 flex gap-4">
          <span>↑↓ navigate</span><span>↵ select</span><span>esc close</span>
        </div>
      </div>
    </div>
  )
}
