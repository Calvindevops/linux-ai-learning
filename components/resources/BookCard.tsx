import { ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { ResourceLink } from '@/lib/curriculum'

interface ResourceSectionProps {
  title: string
  items: ResourceLink[]
  accent?: string
}

export function ResourceSection({ title, items, accent = '#155eef' }: ResourceSectionProps) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-4">{title}</h2>
      <div className="space-y-3">
        {items.map(({ title: t, url, note }) => (
          <Card key={url} hover className="flex items-start gap-4 group">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
              style={{ backgroundColor: accent }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-white hover:text-accent-blue-light transition-colors truncate"
                >
                  {t}
                </a>
                <ExternalLink className="w-3 h-3 text-white/20 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-white/40 mt-0.5 leading-relaxed">{note}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
