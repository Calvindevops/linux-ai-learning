'use client'
const XP_PER_TASK = 10
const XP_PER_SESSION = 100

export function calcXP(totalTasksDone: number, completedSessions: number): number {
  return totalTasksDone * XP_PER_TASK + completedSessions * XP_PER_SESSION
}

export function xpLevel(xp: number): { level: number; title: string; nextXP: number; progress: number } {
  const levels = [
    { min: 0,    title: 'Newcomer' },
    { min: 100,  title: 'Linux Learner' },
    { min: 300,  title: 'Shell Scripter' },
    { min: 600,  title: 'Service Admin' },
    { min: 1000, title: 'Network Engineer' },
    { min: 1500, title: 'Python Coder' },
    { min: 2200, title: 'API Builder' },
    { min: 3000, title: 'Agent Developer' },
    { min: 4000, title: 'AI Architect' },
    { min: 5000, title: 'AI Engineer' },
  ]
  let level = 0
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].min) { level = i; break }
  }
  const current = levels[level].min
  const next = levels[level + 1]?.min ?? current + 1000
  const progress = Math.min(100, Math.round(((xp - current) / (next - current)) * 100))
  return { level: level + 1, title: levels[level].title, nextXP: next - xp, progress }
}
