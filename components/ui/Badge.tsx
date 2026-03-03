import { cn } from '@/lib/utils'

interface BadgeProps {
  label: string
  color?: string
  className?: string
}

export function Badge({ label, color = '#155eef', className }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide', className)}
      style={{ backgroundColor: `${color}22`, color, border: `1px solid ${color}44` }}
    >
      {label}
    </span>
  )
}
