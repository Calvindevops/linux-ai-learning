import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPercent(n: number) {
  return `${n}%`
}

export function getTagBgColor(tagColor: string): string {
  return `${tagColor}22` // 13% opacity hex
}
