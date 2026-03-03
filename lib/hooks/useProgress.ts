'use client'
import { useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { WEEKS, ALL_SESSIONS, getSessionTaskKeys } from '../curriculum'

export type CheckedMap = Record<string, boolean>

export function useProgress() {
  const [checked, setChecked, loaded] = useLocalStorage<CheckedMap>('curriculum-tasks-v2', {})

  const toggleTask = useCallback(
    (sessionId: string, taskIndex: number) => {
      const key = `${sessionId}-${taskIndex}`
      setChecked(prev => ({ ...prev, [key]: !prev[key] }))
    },
    [setChecked]
  )

  const resetAll = useCallback(() => {
    setChecked({})
  }, [setChecked])

  const sessionProgress = useCallback(
    (sessionId: string): number => {
      const keys = getSessionTaskKeys(sessionId)
      if (!keys.length) return 0
      const done = keys.filter(k => checked[k]).length
      return Math.round((done / keys.length) * 100)
    },
    [checked]
  )

  const weekProgress = useCallback(
    (weekId: string): number => {
      const week = WEEKS.find(w => w.id === weekId)
      if (!week) return 0
      const allKeys = week.sessions.flatMap(s => getSessionTaskKeys(s.id))
      if (!allKeys.length) return 0
      const done = allKeys.filter(k => checked[k]).length
      return Math.round((done / allKeys.length) * 100)
    },
    [checked]
  )

  const overallProgress = useMemo(() => {
    const allKeys = WEEKS.flatMap(w => w.sessions.flatMap(s => getSessionTaskKeys(s.id)))
    if (!allKeys.length) return 0
    const done = allKeys.filter(k => checked[k]).length
    return Math.round((done / allKeys.length) * 100)
  }, [checked])

  const totalTasksDone = useMemo(() => {
    return Object.values(checked).filter(Boolean).length
  }, [checked])

  const completedSessions = useMemo(() => {
    return ALL_SESSIONS.filter(({ sessionId }) => sessionProgress(sessionId) === 100).length
  }, [sessionProgress])

  const currentSession = useMemo(() => {
    // First session that isn't 100% complete
    return ALL_SESSIONS.find(({ sessionId }) => sessionProgress(sessionId) < 100) ?? ALL_SESSIONS[ALL_SESSIONS.length - 1]
  }, [sessionProgress])

  const isTaskChecked = useCallback(
    (sessionId: string, taskIndex: number) => !!checked[`${sessionId}-${taskIndex}`],
    [checked]
  )

  return {
    checked,
    loaded,
    toggleTask,
    resetAll,
    sessionProgress,
    weekProgress,
    overallProgress,
    totalTasksDone,
    completedSessions,
    currentSession,
    isTaskChecked,
  }
}
