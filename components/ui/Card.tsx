import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  gradient?: boolean
}

export function Card({ className, hover = false, gradient = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-white/8 bg-card p-5',
        hover && 'transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-card-hover hover:border-accent-blue/30',
        gradient && 'bg-card-gradient',
        className
      )}
      {...props}
    />
  )
}
