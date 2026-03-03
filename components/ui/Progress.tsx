'use client'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  className?: string
  showLabel?: boolean
  size?: 'sm' | 'md'
}

export function ProgressBar({ value, className, showLabel = false, size = 'md' }: ProgressBarProps) {
  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-white/50 mb-1">
          <span>Progress</span>
          <span>{value}%</span>
        </div>
      )}
      <div className={cn('w-full bg-white/10 rounded-full overflow-hidden', size === 'sm' ? 'h-1' : 'h-2')}>
        <div
          className="h-full bg-accent-gradient rounded-full transition-all duration-700 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
