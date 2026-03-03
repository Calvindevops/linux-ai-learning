'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ALL_SESSIONS } from '@/lib/curriculum'

export function useKeyboardNav(currentSessionId?: string) {
  const router = useRouter()

  useEffect(() => {
    if (!currentSessionId) return

    const idx = ALL_SESSIONS.findIndex(s => s.sessionId === currentSessionId)

    const handler = (e: KeyboardEvent) => {
      // Don't fire when typing in an input/textarea
      const tag = (e.target as HTMLElement).tagName
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return

      if (e.key === 'j' || e.key === 'ArrowRight') {
        const next = ALL_SESSIONS[idx + 1]
        if (next) router.push(`/sessions/${next.sessionId}`)
      }
      if (e.key === 'k' || e.key === 'ArrowLeft') {
        const prev = ALL_SESSIONS[idx - 1]
        if (prev) router.push(`/sessions/${prev.sessionId}`)
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [currentSessionId, router])
}
