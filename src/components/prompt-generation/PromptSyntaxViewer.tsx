import React from 'react'

interface PromptSyntaxViewerProps {
  content: string
  color?: string
  className?: string
  maxHeight?: string
}

export const PromptSyntaxViewer: React.FC<PromptSyntaxViewerProps> = ({
  content,
  color = '#4355B9',
  className = '',
  maxHeight = 'max-h-96',
}) => {
  const lines = content.split('\n')

  return (
    <div
      className={`font-mono text-xs leading-relaxed overflow-y-auto p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] space-y-1.5 selection:bg-[#4355B9]/20 selection:text-[#1A202C] ${maxHeight} ${className}`}
    >
      {lines.map((line, idx) => {
        const trimmed = line.trim()

        if (!trimmed) {
          return <div key={idx} className="h-2" />
        }

        if (trimmed === '---') {
          return <hr key={idx} className="border-[#E2E8F0] my-3" />
        }

        // Top level H1
        if (line.startsWith('# ')) {
          return (
            <div
              key={idx}
              className="text-sm font-bold tracking-wide pt-2 pb-1 border-b border-[#E2E8F0]"
              style={{ color }}
            >
              {line}
            </div>
          )
        }

        // Section H2
        if (line.startsWith('## ')) {
          return (
            <div
              key={idx}
              className="text-xs font-bold text-[#1A202C] uppercase tracking-wider pt-3 pb-0.5 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
              <span>{line.replace('## ', '')}</span>
            </div>
          )
        }

        // Framework / Lens H3
        if (line.startsWith('### ')) {
          return (
            <div
              key={idx}
              className="font-semibold text-xs pt-1.5 pl-2 border-l-2 text-[#1A202C]"
              style={{ borderColor: color }}
            >
              {line.replace('### ', '')}
            </div>
          )
        }

        // Sub-lens H4
        if (line.startsWith('#### ')) {
          return (
            <div key={idx} className="font-semibold text-xs text-[#4355B9] pl-3">
              {line.replace('#### ', '')}
            </div>
          )
        }

        // Bullet point
        if (trimmed.startsWith('- ')) {
          const bulletContent = trimmed.substring(2)
          return (
            <div key={idx} className="pl-4 flex items-start gap-2 text-[#334155]">
              <span className="text-[#94A3B8] select-none mt-0.5">•</span>
              <span className="leading-relaxed">{bulletContent}</span>
            </div>
          )
        }

        // Indented bullet
        if (line.startsWith('  - ')) {
          return (
            <div key={idx} className="pl-8 flex items-start gap-2 text-[#475569]">
              <span className="text-[#94A3B8] select-none mt-0.5">◦</span>
              <span className="leading-relaxed">{line.trim().substring(2)}</span>
            </div>
          )
        }

        // Code fence or table line
        if (line.startsWith('```') || line.startsWith('|')) {
          return (
            <div
              key={idx}
              className="px-2 py-0.5 rounded bg-[#EDF2F7] text-[#1E293B] border border-[#E2E8F0] font-mono text-[11px] overflow-x-auto"
            >
              {line}
            </div>
          )
        }

        // General text
        return (
          <div key={idx} className="leading-relaxed text-[#475569]">
            {line}
          </div>
        )
      })}
    </div>
  )
}
