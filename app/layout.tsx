import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { MobileNav } from '@/components/layout/MobileNav'
import { CommandPalette } from '@/components/ui/CommandPalette'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Linux → AI Developer | TailormadeAI',
  description: 'Interactive 30-day curriculum: Linux fundamentals to AI agent development. Built by TailormadeAI.IO.',
  keywords: ['Linux', 'AI', 'Claude', 'agents', 'curriculum', 'learning', 'TailormadeAI'],
  authors: [{ name: 'TailormadeAI.IO', url: 'https://tailormadeai.io' }],
  openGraph: {
    title: 'Linux → AI Developer | 30-Day Curriculum',
    description: 'Learn Linux, Python, Claude API, and AI agent development in 30 days.',
    type: 'website',
    siteName: 'TailormadeAI Learning',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Linux → AI Developer | 30-Day Curriculum',
    description: 'Learn Linux, Python, Claude API, and AI agent development in 30 days.',
    creator: '@TailormadeAI',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <CommandPalette />
        <Sidebar />
        <div className="lg:pl-64 min-h-screen pb-16 lg:pb-0">
          <Header />
          <main className="p-6 max-w-5xl mx-auto">
            {children}
          </main>
        </div>
        <MobileNav />
      </body>
    </html>
  )
}
