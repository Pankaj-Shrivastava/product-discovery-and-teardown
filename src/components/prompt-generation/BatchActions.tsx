import React, { useState } from 'react'
import { Copy, Download, FileText, Check } from 'lucide-react'
import type { GeneratedPrompt } from '../../types'
import { copyTextToClipboard, downloadBlobFile } from '../../lib/utils'

interface BatchActionsProps {
  prompts: GeneratedPrompt[]
  productName: string
  onToast: (message: string, type?: 'success' | 'error') => void
}

export const BatchActions: React.FC<BatchActionsProps> = ({
  prompts,
  productName,
  onToast,
}) => {
  const [isCopyingAll, setIsCopyingAll] = useState(false)
  const [isCopiedAll, setIsCopiedAll] = useState(false)

  const sanitizedFileName = (productName || 'product')
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .replace(/-+/g, '-')

  const generateCombinedPromptsText = (format: 'txt' | 'md'): string => {
    const divider = format === 'md' ? '\n\n---\n\n' : '\n\n' + '='.repeat(80) + '\n\n'

    const header =
      format === 'md'
        ? `# Research Prompts Teardown Suite: ${productName}\n` +
          `Generated on: ${new Date().toLocaleDateString()}\n` +
          `Total Pillars: ${prompts.length}\n\n` +
          `## Table of Contents\n` +
          prompts
            .map(
              (p) =>
                `- [Pillar 0${p.pillarNumber}: ${p.promptName}](#pillar-0${p.pillarNumber}-${p.promptName.toLowerCase().replace(/[^a-z0-9]+/g, '-')})`
            )
            .join('\n') +
          '\n\n---\n\n'
        : `================================================================================\n` +
          `RESEARCH PROMPTS TEARDOWN SUITE: ${productName.toUpperCase()}\n` +
          `Generated on: ${new Date().toLocaleDateString()}\n` +
          `Total Pillars: ${prompts.length}\n` +
          `================================================================================\n\n`

    const body = prompts.map((p) => p.fullPrompt).join(divider)

    return header + body
  }

  const handleCopyAll = async () => {
    if (prompts.length === 0) return

    setIsCopyingAll(true)
    const combined = generateCombinedPromptsText('md')
    const success = await copyTextToClipboard(combined)
    setIsCopyingAll(false)

    if (success) {
      setIsCopiedAll(true)
      onToast(`All ${prompts.length} research prompts copied to clipboard!`, 'success')
      setTimeout(() => setIsCopiedAll(false), 2500)
    } else {
      onToast('Clipboard access was denied. Please use the individual copy or download options.', 'error')
    }
  }

  const handleDownloadTxt = () => {
    if (prompts.length === 0) return
    const content = generateCombinedPromptsText('txt')
    const fileName = `${sanitizedFileName}-research-prompts.txt`
    const success = downloadBlobFile(fileName, content, 'text/plain;charset=utf-8')
    if (success) {
      onToast(`Downloaded ${fileName}`, 'success')
    } else {
      onToast('Download failed. Browser blocked file creation.', 'error')
    }
  }

  const handleDownloadMd = () => {
    if (prompts.length === 0) return
    const content = generateCombinedPromptsText('md')
    const fileName = `${sanitizedFileName}-research-prompts.md`
    const success = downloadBlobFile(fileName, content, 'text/markdown;charset=utf-8')
    if (success) {
      onToast(`Downloaded ${fileName}`, 'success')
    } else {
      onToast('Download failed. Browser blocked file creation.', 'error')
    }
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
      {/* Copy All Prompts */}
      <button
        type="button"
        disabled={isCopyingAll || prompts.length === 0}
        onClick={handleCopyAll}
        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
          isCopiedAll
            ? 'bg-[#107C41] text-white'
            : 'bg-[#4355B9] hover:bg-[#364599] text-white'
        }`}
        title="Copy all 6 prompts to clipboard with dividers"
      >
        {isCopiedAll ? (
          <>
            <Check className="w-4 h-4" />
            <span>All Prompts Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span>Copy All Prompts</span>
          </>
        )}
      </button>

      {/* Download as Markdown */}
      <button
        type="button"
        onClick={handleDownloadMd}
        className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#1A202C] border border-[#CBD5E1] text-xs sm:text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
        title="Download all prompts as structured Markdown (.md)"
      >
        <FileText className="w-4 h-4 text-[#2563EB]" />
        <span>Download .md</span>
      </button>

      {/* Download as Text */}
      <button
        type="button"
        onClick={handleDownloadTxt}
        className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#F8FAFC] text-[#1A202C] border border-[#CBD5E1] text-xs sm:text-sm font-medium flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
        title="Download all prompts as plain text (.txt)"
      >
        <Download className="w-4 h-4 text-[#4355B9]" />
        <span>Download .txt</span>
      </button>
    </div>
  )
}
