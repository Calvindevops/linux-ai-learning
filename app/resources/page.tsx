'use client'
import { ResourceSection } from '@/components/resources/BookCard'
import { BooksGrid } from '@/components/resources/BooksGrid'
import { AIToolsGrid } from '@/components/resources/AIToolsGrid'
import { RESOURCES } from '@/lib/curriculum'

export default function ResourcesPage() {
  return (
    <div className="space-y-12 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Resources</h1>
        <p className="text-white/40 mt-1 text-sm">Reference books, tools, and reading for the curriculum.</p>
      </div>

      <BooksGrid />
      <AIToolsGrid />

      <ResourceSection title="Reference Docs" items={RESOURCES.reference} accent="#155eef" />
      <ResourceSection title="Tools & Platforms" items={RESOURCES.tools} accent="#10b981" />
      <ResourceSection title="Reading" items={RESOURCES.reading} accent="#f59e0b" />
    </div>
  )
}
