import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { copyTextToClipboard } from '../../lib/utils'

interface PromptSyntaxViewerProps {
  content: string
  color?: string
  className?: string
  maxHeight?: string
  onToast?: (message: string, type: 'success' | 'error') => void
}

export const PromptSyntaxViewer: React.FC<PromptSyntaxViewerProps> = ({
  content,
  color = '#4355B9',
  className = '',
  maxHeight = '',
  onToast,
}) => {
  const [copiedSectionIndex, setCopiedSectionIndex] = useState<number | null>(null)

  // Split prompt into sections delimited by '---' or '## '
  const lines = content.split('\n')

  const handleCopySection = async (sectionLines: string[], sectionIdx: number) => {
    const text = sectionLines.join('\n').trim()
    const success = await copyTextToClipboard(text)
    if (success) {
      setCopiedSectionIndex(sectionIdx)
      if (onToast) onToast('Section copied to clipboard!', 'success')
      setTimeout(() => setCopiedSectionIndex(null), 2000)
    }
  }

  // Pre-calculate section ranges for section copying
  let currentSectionNumber = 0

  return (
    <div
      className={`font-mono text-xs leading-relaxed p-4 sm:p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#334155] space-y-2 selection:bg-[#4355B9]/20 selection:text-[#1A202C] ${maxHeight} ${className}`}
    >
      {lines.map((line, idx) => {
        const trimmed = line.trim()

        if (!trimmed) {
          return <div key={idx} className="h-2" />
        }

        if (trimmed === '---') {
          return <hr key={idx} className="border-[#E2E8F0] my-4" />
        }

        // Top level H1 (# ...)
        if (line.startsWith('# ')) {
          return (
            <div
              key={idx}
              className="text-sm sm:text-base font-bold font-sans tracking-tight pt-2 pb-1.5 border-b border-[#E2E8F0] flex items-center justify-between"
              style={{ color }}
            >
              <span>{line.replace('# ', '')}</span>
            </div>
          )
        }

        // Section H2 (## 1. ..., ## 2. ..., etc.)
        if (line.startsWith('## ')) {
          currentSectionNumber += 1
          const sectionNumMatch = line.match(/^##\s*(\d+)\./)
          const secId = sectionNumMatch ? `prompt-sec-${sectionNumMatch[1]}` : `prompt-sec-${idx}`
          const isThisCopied = copiedSectionIndex === idx

          return (
            <div
              key={idx}
              id={secId}
              className="scroll-mt-4 text-xs font-bold font-sans text-[#1A202C] uppercase tracking-wider pt-4 pb-1.5 flex items-center justify-between gap-2 border-b border-[#E2E8F0]/70"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <span className="truncate">{line.replace('## ', '')}</span>
              </div>

              {/* Copy Section Action */}
              <button
                type="button"
                onClick={() => {
                  // Find all lines belonging to this section up to the next '##'
                  const sectionContent: string[] = [line]
                  for (let i = idx + 1; i < lines.length; i++) {
                    if (lines[i].startsWith('## ')) break
                    sectionContent.push(lines[i])
                  }
                  handleCopySection(sectionContent, idx)
                }}
                className="shrink-0 text-[10px] font-sans font-medium px-2 py-0.5 rounded-md bg-white border border-[#CBD5E1] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#1A202C] transition-colors flex items-center gap-1 cursor-pointer"
                title="Copy only this section"
              >
                {isThisCopied ? (
                  <>
                    <Check className="w-3 h-3 text-[#107C41]" />
                    <span className="text-[#107C41]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Section</span>
                  </>
                )}
              </button>
            </div>
          )
        }

        // Sub-heading H3 (### ...)
        if (line.startsWith('### ')) {
          return (
            <div
              key={idx}
              className="font-semibold font-sans text-xs pt-2.5 pl-2.5 border-l-2 text-[#1A202C] mt-2 mb-1"
              style={{ borderColor: color }}
            >
              {line.replace('### ', '')}
            </div>
          )
        }

        // Sub-sub-heading H4 (#### ...)
        if (line.startsWith('#### ')) {
          return (
            <div key={idx} className="font-semibold text-xs text-[#4355B9] pl-3 pt-1">
              {line.replace('#### ', '')}
            </div>
          )
        }

        // Bullet point (- ...)
        if (trimmed.startsWith('- ')) {
          const bulletContent = trimmed.substring(2)
          return (
            <div key={idx} className="pl-4 flex items-start gap-2 text-[#334155]">
              <span className="text-[#94A3B8] select-none mt-0.5 font-sans">•</span>
              <span className="leading-relaxed">{bulletContent}</span>
            </div>
          )
        }

        // Indented bullet (  - ...)
        if (line.startsWith('  - ')) {
          return (
            <div key={idx} className="pl-8 flex items-start gap-2 text-[#475569]">
              <span className="text-[#94A3B8] select-none mt-0.5 font-sans">◦</span>
              <span className="leading-relaxed">{line.trim().substring(2)}</span>
            </div>
          )
        }

        // Code block / table row
        if (line.startsWith('```') || line.startsWith('|')) {
          return (
            <div
              key={idx}
              className="px-3 py-1 rounded-lg bg-[#EDF2F7] text-[#1E293B] border border-[#CBD5E1] text-[11px] overflow-x-auto whitespace-pre font-mono"
            >
              {line}
            </div>
          )
        }

        // Standard body paragraph
        return (
          <div key={idx} className="leading-relaxed text-[#475569]">
            {line}
          </div>
        )
      })}
    </div>
  )
}
