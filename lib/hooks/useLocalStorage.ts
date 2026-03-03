'use client'
import { useState, useEffect, useCallback } from 'react'

export function useLocalStorage<T>(key: string, fallback: T): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [value, setValue] = useState<T>(fallback)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored !== null) setValue(JSON.parse(stored))
    } catch {
      // ignore parse errors
    }
    setLoaded(true)
  }, [key])

  const save = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue(prev => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next
        try {
          localStorage.setItem(key, JSON.stringify(resolved))
        } catch {
          // ignore storage errors
        }
        return resolved
      })
    },
    [key]
  )

  return [value, save, loaded]
}
