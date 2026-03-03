'use client'
import { useState, lazy, Suspense } from 'react'
import { BookOpen, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { BOOK, BookRef } from '@/lib/curriculum'

const PDFViewer = lazy(() => import('@/components/ui/PDFViewer').then(m => ({ default: m.PDFViewer })))

interface BookReferenceProps {
  bookRefs: BookRef[]
}

export function BookReference({ bookRefs }: BookReferenceProps) {
  const [expanded, setExpanded] = useState(true)
  const [viewerOpen, setViewerOpen] = useState(false)

  if (!bookRefs.length) return null

  return (
    <>
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 overflow-hidden">
        <button
          onClick={() => setExpanded(v => !v)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-emerald-500/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">
              {BOOK.linux.short} — {bookRefs.length} Chapter{bookRefs.length !== 1 ? 's' : ''}
            </span>
          </div>
          {expanded ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
        </button>

        {expanded && (
          <div className="px-5 pb-4 space-y-3 border-t border-emerald-500/10 pt-3">
            {bookRefs.map((ref, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex-shrink-0 w-16 text-xs font-mono text-emerald-400 bg-emerald-500/10 rounded px-2 py-1 text-center h-fit">
                  Ch {ref.chapter}
                </div>
                <div>
                  <p className="text-xs text-emerald-200/70 leading-relaxed">{ref.note}</p>
                  <p className="text-xs text-white/30 mt-1">{BOOK.linux.chapters[ref.chapter]}</p>
                </div>
              </div>
            ))}

            {/* Open book button */}
            <div className="flex items-center gap-3 pt-2 border-t border-emerald-500/10">
              <button
                onClick={() => setViewerOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-semibold transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Open Linux Book
              </button>
              <a
                href="/books/linux.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Download PDF
              </a>
            </div>
          </div>
        )}
      </div>

      {/* PDF Viewer Modal */}
      {viewerOpen && (
        <Suspense fallback={null}>
          <PDFViewer
            file="/books/linux.pdf"
            title="Linux Notes for Professionals (GoalKicker)"
            onClose={() => setViewerOpen(false)}
          />
        </Suspense>
      )}
    </>
  )
}
