'use client'
import { useState, useCallback, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2 } from 'lucide-react'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

interface PDFViewerProps {
  file: string        // e.g. "/books/linux.pdf"
  title: string
  initialPage?: number
  onClose: () => void
}

export function PDFViewer({ file, title, initialPage = 1, onClose }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState(initialPage)
  const [scale, setScale] = useState(1.2)
  const [inputVal, setInputVal] = useState(String(initialPage))

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
  }, [])

  const prev = () => {
    const p = Math.max(1, pageNumber - 1)
    setPageNumber(p)
    setInputVal(String(p))
  }

  const next = () => {
    const p = Math.min(numPages, pageNumber + 1)
    setPageNumber(p)
    setInputVal(String(p))
  }

  const goToPage = (e: React.FormEvent) => {
    e.preventDefault()
    const p = Math.min(numPages, Math.max(1, parseInt(inputVal, 10) || 1))
    setPageNumber(p)
    setInputVal(String(p))
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [pageNumber, numPages, onClose])

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 flex-shrink-0">
        <span className="text-sm font-semibold text-white flex-1 truncate">{title}</span>

        {/* Zoom */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setScale(s => Math.max(0.6, +(s - 0.2).toFixed(1)))}
            className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs text-white/40 w-10 text-center">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => setScale(s => Math.min(2.5, +(s + 0.2).toFixed(1)))}
            className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-5 bg-white/10" />

        {/* Page navigation */}
        <button onClick={prev} disabled={pageNumber <= 1} className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-white disabled:opacity-30 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <form onSubmit={goToPage} className="flex items-center gap-1.5">
          <input
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            className="w-10 bg-white/10 rounded text-center text-xs text-white py-1 outline-none focus:ring-1 focus:ring-accent-blue"
          />
          <span className="text-xs text-white/30">/ {numPages || '…'}</span>
        </form>
        <button onClick={next} disabled={pageNumber >= numPages} className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-white disabled:opacity-30 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="w-px h-5 bg-white/10" />

        <button onClick={onClose} className="p-1.5 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors" title="Close (Esc)">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* PDF content */}
      <div className="flex-1 overflow-auto flex justify-center py-6 px-4">
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center gap-2 text-white/40 mt-20">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm">Loading PDF…</span>
            </div>
          }
          error={
            <div className="text-red-400 text-sm mt-20 text-center">
              <p>Failed to load PDF.</p>
              <a href={file} target="_blank" rel="noopener noreferrer" className="underline mt-2 block text-accent-blue-light">
                Open directly in browser →
              </a>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            className="shadow-2xl"
            renderAnnotationLayer={true}
            renderTextLayer={true}
          />
        </Document>
      </div>

      {/* Bottom hint */}
      <div className="text-center py-2 text-xs text-white/20 flex-shrink-0">
        ← → arrow keys to navigate · Esc to close
      </div>
    </div>
  )
}
