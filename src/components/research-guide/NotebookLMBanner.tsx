import React, { useState } from 'react'
import {
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Cpu,
} from 'lucide-react'
import { copyTextToClipboard } from '../../lib/utils'

interface NotebookLMBannerProps {
  productName: string
  onToast: (message: string, type?: 'success' | 'error') => void
}

export const NotebookLMBanner: React.FC<NotebookLMBannerProps> = ({
  productName,
  onToast,
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false)
  const safeName = productName || 'the target product'

  const notebookLmSynthesisPrompt =
    `Act as a Principal Product Strategist. Based on all the research sources uploaded in this notebook, synthesize a single, unified, comprehensive teardown summary document for ${safeName}.\n\n` +
    `Structure your output strictly using these 6 exact Markdown pillar headers:\n` +
    `## 1. Strategic & Business Context\n` +
    `## 2. Market & Competition\n` +
    `## 3. Users & Product Craft\n` +
    `## 4. Technical Architecture\n` +
    `## 5. Behavioral Psychology\n` +
    `## 6. Trust, Safety & Ethics\n\n` +
    `For each pillar, provide:\n` +
    `- Factual teardown observations with cited evidence\n` +
    `- Markdown tables for metrics, pricing tiers, or competitive benchmarks\n` +
    `- Analysis using named frameworks\n` +
    `- Strategic vulnerabilities and product trade-offs\n\n` +
    `Rely ONLY on the provided source materials. Maintain an objective, highly analytical tone.`

  const handleCopyPrompt = async () => {
    const success = await copyTextToClipboard(notebookLmSynthesisPrompt)
    if (success) {
      setCopiedPrompt(true)
      onToast('NotebookLM synthesis prompt copied to clipboard!', 'success')
      setTimeout(() => setCopiedPrompt(false), 2500)
    } else {
      onToast('Unable to copy. Please manually select the prompt text.', 'error')
    }
  }

  return (
    <div className="mb-12 relative rounded-2xl glass-panel border border-[#7C5CFC]/40 bg-gradient-to-br from-[#12102A]/90 via-[#0B0F1F]/90 to-[#070A14]/90 p-6 sm:p-8 overflow-hidden shadow-2xl">
      {/* Decorative Background Glows */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#7C5CFC]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#38BDF8]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7C5CFC] animate-ping" />
            <span className="px-3 py-1 rounded-full bg-[#7C5CFC]/15 text-[#CABEFF] border border-[#7C5CFC]/30 text-xs font-mono font-bold tracking-wider uppercase">
              RECOMMENDED SYNTHESIS ENGINE
            </span>
          </div>

          <a
            href="https://notebooklm.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-[#38BDF8] hover:text-[#7DD3FC] flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>Open notebooklm.google.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Title & Value Prop */}
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Synthesize All 6 Pillars in Google NotebookLM</span>
            <Sparkles className="w-5 h-5 text-[#FBBF24]" />
          </h3>
          <p className="text-sm text-[#CAD1E9] leading-relaxed max-w-3xl mt-1.5">
            Instead of manually stitching together 6 disparate AI chat responses, upload all 6 raw outputs into Google NotebookLM. Its multi-document context window cross-references findings across pillars and synthesizes a unified, citation-grounded summary document ready for Stage 4.
          </p>
        </div>

        {/* 5-Step NotebookLM Workflow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-6 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-[#080C18]/80 border border-[#1E253D]">
            <span className="text-[#7C5CFC] font-bold block mb-1">STEP 1</span>
            <span className="text-white font-medium block">Open NotebookLM</span>
            <p className="text-[#8B93B0] text-[11px] font-sans mt-1">
              Visit notebooklm.google.com (free with Google account).
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#080C18]/80 border border-[#1E253D]">
            <span className="text-[#38BDF8] font-bold block mb-1">STEP 2</span>
            <span className="text-white font-medium block">Create Notebook</span>
            <p className="text-[#8B93B0] text-[11px] font-sans mt-1">
              Name it &ldquo;{safeName} Teardown Intelligence&rdquo;.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#080C18]/80 border border-[#1E253D]">
            <span className="text-[#34D399] font-bold block mb-1">STEP 3</span>
            <span className="text-white font-medium block">Upload 6 Outputs</span>
            <p className="text-[#8B93B0] text-[11px] font-sans mt-1">
              Add the 6 raw chat responses as source text notes.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#080C18]/80 border border-[#1E253D]">
            <span className="text-[#FBBF24] font-bold block mb-1">STEP 4</span>
            <span className="text-white font-medium block">Run Synthesis</span>
            <p className="text-[#8B93B0] text-[11px] font-sans mt-1">
              Paste the structured prompt below to unite all 6 pillars.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#080C18]/80 border border-[#1E253D]">
            <span className="text-[#FB7185] font-bold block mb-1">STEP 5</span>
            <span className="text-white font-medium block">Export for Stage 4</span>
            <p className="text-[#8B93B0] text-[11px] font-sans mt-1">
              Copy the Markdown summary document for upload.
            </p>
          </div>
        </div>

        {/* NotebookLM Pre-Engineered Prompt Box */}
        <div className="rounded-xl bg-[#060914] border border-[#1E253D] p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs font-mono font-semibold text-[#8B93B0] uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#7C5CFC]" />
              <span>Pre-Engineered NotebookLM Synthesis Prompt</span>
            </span>

            <button
              type="button"
              onClick={handleCopyPrompt}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                copiedPrompt
                  ? 'bg-[#10B981] text-white shadow-[0_0_15px_rgba(16,185,129,0.35)]'
                  : 'bg-[#1C233C] hover:bg-[#2A3459] text-white border border-[#2B355A]'
              }`}
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied Prompt!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#7C5CFC]" />
                  <span>Copy Synthesis Prompt</span>
                </>
              )}
            </button>
          </div>

          <pre className="font-mono text-xs leading-relaxed text-[#94A3B8] p-3 rounded-lg bg-[#0A0E1A] overflow-x-auto whitespace-pre-wrap selection:bg-[#7C5CFC]/30 selection:text-white">
            {notebookLmSynthesisPrompt}
          </pre>
        </div>
      </div>
    </div>
  )
}
