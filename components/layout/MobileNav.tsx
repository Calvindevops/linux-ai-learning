'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, Map, Library } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', icon: LayoutDashboard, label: 'Home' },
  { href: '/roadmap', icon: Map, label: 'Roadmap' },
  { href: '/sessions', icon: BookOpen, label: 'Sessions' },
  { href: '/resources', icon: Library, label: 'Resources' },
]

export function MobileNav() {
  const pathname = usePathname()
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080808] border-t border-white/8 flex">
      {NAV.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors',
            pathname === href ? 'text-accent-blue-light' : 'text-white/30 hover:text-white/60'
          )}
        >
          <Icon className="w-5 h-5" />
          {label}
        </Link>
      ))}
    </nav>
  )
}
