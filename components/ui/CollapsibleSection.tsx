'use client'
import { useState, ReactNode } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CollapsibleSectionProps {
  title: string
  icon?: ReactNode
  children: ReactNode
  defaultOpen?: boolean
  accent?: string
  className?: string
  badge?: string | number
}

export function CollapsibleSection({
  title, icon, children, defaultOpen = true, accent, className, badge
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={cn('rounded-xl border border-white/8 bg-card overflow-hidden', className)}>
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/3 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="text-sm font-semibold text-white">{title}</span>
          {badge !== undefined && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-semibold"
              style={accent ? { backgroundColor: `${accent}22`, color: accent } : { backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)' }}
            >
              {badge}
            </span>
          )}
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 text-white/30 flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-white/30 flex-shrink-0" />
        }
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4">
          {children}
        </div>
      )}
    </div>
  )
}
