import { ExternalLink } from 'lucide-react'
import { Card } from '@/components/ui/Card'

const AI_TOOLS = {
  'AI Coding Assistants': [
    { name: '@claudeai', desc: 'Claude Code — AI pair programmer in your terminal', url: 'https://claude.ai/code', color: '#f97316' },
    { name: '@cursor_ai', desc: 'VS Code fork with AI inline editing', url: 'https://cursor.com', color: '#155eef' },
    { name: '@windsurf_ai', desc: 'Agentic IDE with Cascade AI flows', url: 'https://codeium.com/windsurf', color: '#06b6d4' },
    { name: '@Replit', desc: 'Browser-based IDE with AI + deploy', url: 'https://replit.com', color: '#f59e0b' },
  ],
  'AI App Builders': [
    { name: '@v0', desc: 'Generate React UI with chat prompts', url: 'https://v0.dev', color: '#ffffff' },
    { name: '@Lovable', desc: 'Full-stack apps from natural language', url: 'https://lovable.dev', color: '#ec4899' },
    { name: '@boltdotnew', desc: 'In-browser full-stack dev environment', url: 'https://bolt.new', color: '#6366f1' },
  ],
  'Backend & Data': [
    { name: '@supabase', desc: 'Open source Firebase alternative — PostgreSQL + Auth + Storage', url: 'https://supabase.com', color: '#10b981' },
    { name: '@getconvex', desc: 'Reactive backend — serverless functions + real-time DB', url: 'https://convex.dev', color: '#f59e0b' },
    { name: '@vercel', desc: 'Deploy Next.js apps instantly, edge functions, analytics', url: 'https://vercel.com', color: '#ffffff' },
  ],
  'Design & Media': [
    { name: '@figma', desc: 'Collaborative UI design — build your app mockups here', url: 'https://figma.com', color: '#a855f7' },
    { name: '@midjourney', desc: 'AI image generation for assets and inspiration', url: 'https://midjourney.com', color: '#ef4444' },
  ],
}

export function AIToolsGrid() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-1">AI Tools for Developers</h2>
        <p className="text-xs text-white/30">Tools used or referenced in the curriculum.</p>
      </div>
      {Object.entries(AI_TOOLS).map(([category, tools]) => (
        <div key={category}>
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tools.map(tool => (
              <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer">
                <Card hover className="flex items-start gap-3 group">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 text-xs font-bold"
                    style={{ backgroundColor: `${tool.color}22`, color: tool.color, border: `1px solid ${tool.color}33` }}
                  >
                    AI
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-white">{tool.name}</span>
                      <ExternalLink className="w-3 h-3 text-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-white/40 mt-0.5 leading-relaxed">{tool.desc}</p>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
