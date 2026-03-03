'use client'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CheckboxProps {
  checked: boolean
  onChange: () => void
  label: string
  className?: string
}

export function Checkbox({ checked, onChange, label, className }: CheckboxProps) {
  return (
    <button
      onClick={onChange}
      className={cn(
        'flex items-start gap-3 w-full text-left group rounded-lg px-3 py-2 transition-colors hover:bg-white/5',
        className
      )}
      aria-checked={checked}
      role="checkbox"
    >
      <span
        className={cn(
          'mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150',
          checked
            ? 'bg-accent-blue border-accent-blue'
            : 'border-white/20 group-hover:border-white/40'
        )}
      >
        {checked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
      </span>
      <span
        className={cn(
          'text-sm leading-relaxed transition-colors',
          checked ? 'text-white/40 line-through' : 'text-white/80 group-hover:text-white'
        )}
      >
        {label}
      </span>
    </button>
  )
}
