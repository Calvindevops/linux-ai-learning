'use client'
import { useState, useEffect } from 'react'

interface StreakData {
  current: number
  lastActiveDate: string | null
}

export function useStreak(totalTasksDone: number) {
  const [streak, setStreak] = useState<StreakData>({ current: 0, lastActiveDate: null })

  useEffect(() => {
    try {
      const stored = localStorage.getItem('curriculum-streak-v1')
      const today = new Date().toISOString().split('T')[0]

      if (!stored) {
        if (totalTasksDone > 0) {
          const s = { current: 1, lastActiveDate: today }
          localStorage.setItem('curriculum-streak-v1', JSON.stringify(s))
          setStreak(s)
        }
        return
      }

      const data: StreakData = JSON.parse(stored)
      if (!data.lastActiveDate) { setStreak(data); return }

      const last = new Date(data.lastActiveDate)
      const now = new Date(today)
      const diffDays = Math.floor((now.getTime() - last.getTime()) / 86400000)

      if (diffDays === 0) {
        setStreak(data)
      } else if (diffDays === 1) {
        // Consecutive day — streak continues if user has done tasks today
        // We bump on next task completion; for now just show current
        setStreak(data)
      } else {
        // Streak broken
        const reset = { current: totalTasksDone > 0 ? 1 : 0, lastActiveDate: today }
        localStorage.setItem('curriculum-streak-v1', JSON.stringify(reset))
        setStreak(reset)
      }
    } catch {
      // ignore
    }
  }, [totalTasksDone])

  // Call this whenever a task is completed
  const recordActivity = () => {
    const today = new Date().toISOString().split('T')[0]
    try {
      const stored = localStorage.getItem('curriculum-streak-v1')
      const data: StreakData = stored ? JSON.parse(stored) : { current: 0, lastActiveDate: null }
      const last = data.lastActiveDate
      let next: StreakData

      if (!last || last !== today) {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yStr = yesterday.toISOString().split('T')[0]
        next = {
          current: last === yStr ? data.current + 1 : 1,
          lastActiveDate: today,
        }
      } else {
        next = data
      }

      localStorage.setItem('curriculum-streak-v1', JSON.stringify(next))
      setStreak(next)
    } catch {
      // ignore
    }
  }

  return { streak: streak.current, recordActivity }
}
