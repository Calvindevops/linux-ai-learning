'use client'
import { useState } from 'react'
import { Copy, Check, Terminal } from 'lucide-react'

interface TerminalBlockProps {
  command: string
}

export function TerminalBlock({ command }: TerminalBlockProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group bg-[#0a0a0a] rounded-lg border border-white/10 px-4 py-3 font-mono text-sm flex items-start gap-3">
      <Terminal className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
      <span className="text-green-400 flex-shrink-0">$</span>
      <span className="text-white/80 flex-1 break-all">{command}</span>
      <button
        onClick={copy}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10 flex-shrink-0"
        title="Copy command"
      >
        {copied
          ? <Check className="w-3.5 h-3.5 text-green-400" />
          : <Copy className="w-3.5 h-3.5 text-white/40" />
        }
      </button>
    </div>
  )
}
