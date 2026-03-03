'use client'
import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import { Checkbox } from '@/components/ui/Checkbox'
import { TerminalBlock } from './TerminalBlock'
import { ProgressBar } from '@/components/ui/Progress'

interface TaskListProps {
  sessionId: string
  tasks: string[]
  isChecked: (sessionId: string, idx: number) => boolean
  onToggle: (sessionId: string, idx: number) => void
  progress: number
  onRecordActivity?: () => void
}

function isShellCommand(task: string): boolean {
  const t = task.trim()
  const prefixes = ['sudo ', 'apt ', 'npm ', 'pip3 ', 'pip ', 'git ', 'chmod ', 'chown ', 'curl ', 'mkdir ', 'cd ', 'echo ', 'cat ', 'ls ', 'find ', 'grep ', 'tar ', 'ssh ', 'scp ', 'docker ', 'python3 ', 'python ', 'node ', 'systemctl ', 'crontab ', 'export ', 'source ', 'ping ', 'wget ', 'touch ', 'rm ', 'mv ', 'cp ', 'htop ', 'ps ', 'kill ', 'ip ', 'ss ', 'nslookup ', 'dig ', 'traceroute ', 'df ', 'du ', 'free ', 'uname ', 'id ', 'whoami ', 'groups ', 'printenv ', 'nano ', 'vim ', 'sed ', 'awk ', 'tee ']
  return prefixes.some(p => t.startsWith(p)) && !t.startsWith('AGENT:') && !t.startsWith('📗')
}

export function TaskList({ sessionId, tasks, isChecked, onToggle, progress, onRecordActivity }: TaskListProps) {
  const prevProgress = useRef(progress)
  const done = tasks.filter((_, i) => isChecked(sessionId, i)).length

  // Confetti when session reaches 100%
  useEffect(() => {
    if (progress === 100 && prevProgress.current < 100) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#155eef', '#4f8cff', '#10b981', '#f59e0b', '#a855f7'],
      })
    }
    prevProgress.current = progress
  }, [progress])

  const handleToggle = (idx: number) => {
    onToggle(sessionId, idx)
    onRecordActivity?.()
    // Mini confetti on individual task completion
    if (!isChecked(sessionId, idx)) {
      confetti({ particleCount: 20, spread: 50, origin: { y: 0.7 }, scalar: 0.7 })
    }
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-white/40">{done}/{tasks.length} tasks complete</span>
        <ProgressBar value={progress} size="sm" className="w-32" />
      </div>
      {tasks.map((task, i) => {
        const checked = isChecked(sessionId, i)
        const looksLikeCommand = isShellCommand(task)
        return (
          <div key={i}>
            <Checkbox checked={checked} onChange={() => handleToggle(i)} label={task} />
            {looksLikeCommand && !checked && (
              <div className="ml-8 mt-1 mb-1">
                <TerminalBlock command={task.replace(/\s*\(.*?\)\s*$/, '').trim()} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
