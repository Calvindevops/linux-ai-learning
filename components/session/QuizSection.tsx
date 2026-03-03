'use client'
import { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp, Copy, Check, Terminal } from 'lucide-react'

interface QuizSectionProps {
  questions: string[]
  claudePrompt: string
}

export function QuizSection({ questions, claudePrompt }: QuizSectionProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [promptCopied, setPromptCopied] = useState(false)

  const copyPrompt = async () => {
    await navigator.clipboard.writeText(claudePrompt)
    setPromptCopied(true)
    setTimeout(() => setPromptCopied(false), 2000)
  }

  const openClaude = () => {
    // Copy prompt and open claude.ai
    navigator.clipboard.writeText(claudePrompt)
    window.open('https://claude.ai/new', '_blank')
  }

  return (
    <div className="space-y-4">
      {/* Quiz */}
      <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 overflow-hidden">
        <button
          onClick={() => setOpen(v => !v)}
          className="w-full flex items-center justify-between px-5 py-4 hover:bg-purple-500/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">Knowledge Check — {questions.length} Questions</span>
          </div>
          {open ? <ChevronUp className="w-4 h-4 text-white/30" /> : <ChevronDown className="w-4 h-4 text-white/30" />}
        </button>

        {open && (
          <div className="px-5 pb-4 border-t border-purple-500/10 pt-3 space-y-3">
            {questions.map((q, i) => (
              <div key={i} className="flex gap-3">
                <span className="flex-shrink-0 text-xs font-bold text-purple-400/60">{i + 1}.</span>
                <p className="text-sm text-white/70 leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ask Claude panel */}
      <div className="rounded-xl border border-accent-blue/20 bg-accent-blue/5 p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-accent-blue-light" />
          <span className="text-xs font-semibold text-accent-blue-light uppercase tracking-wide">Ask Claude</span>
        </div>
        <p className="text-sm text-white/60 leading-relaxed italic">"{claudePrompt}"</p>
        <div className="flex items-center gap-2">
          {/* Primary: Open claude.ai with prompt copied */}
          <button
            onClick={openClaude}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent-blue hover:bg-blue-600 text-white text-xs font-semibold transition-colors"
          >
            <Terminal className="w-3.5 h-3.5" />
            Ask Claude →
          </button>
          {/* Secondary: Just copy */}
          <button
            onClick={copyPrompt}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-blue/20 hover:bg-accent-blue/30 text-accent-blue-light text-xs transition-colors"
          >
            {promptCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            {promptCopied ? 'Copied!' : 'Copy prompt'}
          </button>
        </div>
        <p className="text-xs text-white/25">Clicking "Ask Claude →" copies the prompt and opens claude.ai in a new tab.</p>
      </div>
    </div>
  )
}
