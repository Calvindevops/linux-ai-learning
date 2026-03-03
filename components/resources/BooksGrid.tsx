'use client'
import { useState, lazy, Suspense } from 'react'
import { BookOpen, ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/Card'

const PDFViewer = lazy(() => import('@/components/ui/PDFViewer').then(m => ({ default: m.PDFViewer })))

const BOOKS = [
  {
    file: '/books/linux.pdf',
    title: 'Linux Notes for Professionals',
    publisher: 'GoalKicker',
    color: '#10b981',
    description: 'Comprehensive Linux reference: filesystem, permissions, shell, services, networking.',
  },
  {
    file: '/books/bash.pdf',
    title: 'Bash Notes for Professionals',
    publisher: 'GoalKicker',
    color: '#3b82f6',
    description: 'Bash scripting deep dive: variables, arrays, functions, traps, process substitution.',
  },
  {
    file: '/books/python.pdf',
    title: 'Python Notes for Professionals',
    publisher: 'GoalKicker',
    color: '#f59e0b',
    description: 'Python from basics to advanced: OOP, decorators, async, standard library.',
  },
  {
    file: '/books/sql.pdf',
    title: 'SQL Notes for Professionals',
    publisher: 'GoalKicker',
    color: '#8b5cf6',
    description: 'Core SQL: queries, joins, subqueries, transactions, indexes, window functions.',
  },
  {
    file: '/books/mysql.pdf',
    title: 'MySQL Notes for Professionals',
    publisher: 'GoalKicker',
    color: '#ef4444',
    description: 'MySQL-specific syntax, administration, replication, and performance tuning.',
  },
  {
    file: '/books/postgres.pdf',
    title: 'PostgreSQL Notes for Professionals',
    publisher: 'GoalKicker',
    color: '#06b6d4',
    description: 'PostgreSQL features, JSON/JSONB, full-text search, extensions, and administration.',
  },
]

export function BooksGrid() {
  const [active, setActive] = useState<typeof BOOKS[0] | null>(null)

  return (
    <>
      <div>
        <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">Reference Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {BOOKS.map(book => (
            <Card key={book.file} hover className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-10 rounded flex items-center justify-center flex-shrink-0 text-white text-xs font-bold"
                  style={{ backgroundColor: `${book.color}22`, color: book.color, border: `1px solid ${book.color}44` }}
                >
                  PDF
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white leading-tight">{book.title}</h3>
                  <p className="text-xs text-white/30 mt-0.5">{book.publisher}</p>
                </div>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">{book.description}</p>
              <div className="flex items-center gap-2 mt-auto pt-1">
                <button
                  onClick={() => setActive(book)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                  style={{ backgroundColor: `${book.color}22`, color: book.color }}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Read
                </button>
                <a
                  href={book.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  Download
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {active && (
        <Suspense fallback={null}>
          <PDFViewer
            file={active.file}
            title={`${active.title} — ${active.publisher}`}
            onClose={() => setActive(null)}
          />
        </Suspense>
      )}
    </>
  )
}
