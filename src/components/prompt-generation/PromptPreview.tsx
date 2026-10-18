import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit3,
  RotateCcw,
  Sparkles,
  Layers,
  BookOpen,
  Clock,
  Compass,
} from 'lucide-react'
import type { GeneratedPrompt } from '../../types'
import { PillarIcon } from './PillarIcon'
import { PromptSyntaxViewer } from './PromptSyntaxViewer'
import { calculateWordCount } from '../../lib/prompt-engine/composer'

interface PromptPreviewProps {
  prompt: GeneratedPrompt | null
  isOpen: boolean
  onClose: () => void
  onNavigatePrompt: (direction: 'prev' | 'next') => void
  hasPrev: boolean
  hasNext: boolean
  onSaveEdit: (promptId: string, newPromptText: string) => void
  onCopy: (prompt: GeneratedPrompt, customText?: string) => void
  isCopied?: boolean
  allPrompts?: GeneratedPrompt[]
  onSelectPrompt?: (promptId: string) => void
}

/**
 * AI Model recommendations per strategic pillar.
 */
const PILLAR_AI_RECOMMENDATIONS: Record<number, { model: string; tip: string }> = {
  1: {
    model: 'Claude 3.7 Sonnet or ChatGPT 4o',
    tip: 'Excels at strategic moat synthesis, defensibility audits, and corporate development logic.',
  },
  2: {
    model: 'Perplexity Pro or ChatGPT with Web Search',
    tip: 'Essential for live competitor benchmarking, market pricing intelligence, and customer reviews.',
  },
  3: {
    model: 'Claude 3.7 Sonnet (Extended Thinking)',
    tip: 'Superb multi-step user journey mapping, design craft critique, and UX heuristic evaluation.',
  },
  4: {
    model: 'DeepSeek R1 or Claude 3.7 Sonnet',
    tip: 'Deep architectural reasoning for API surface design, distributed systems, and infra bottlenecks.',
  },
  5: {
    model: 'Claude 3.7 Sonnet or ChatGPT 4o',
    tip: 'Specialized behavioral psychology for habit formation loops, cognitive biases, and retention.',
  },
  6: {
    model: 'Claude 3.7 Sonnet or Gemini 1.5 Pro',
    tip: 'Rigorous scrutiny for deceptive UI patterns, data autonomy, regulatory posture, and trust audits.',
  },
}

/**
 * Standard numbered sections in the prompt blueprint for quick jumping.
 */
const PROMPT_SECTIONS = [
  { num: 1, label: '1. Identity' },
  { num: 2, label: '2. Ethics' },
  { num: 3, label: '3. Scope' },
  { num: 4, label: '4. Context' },
  { num: 5, label: '5. Lenses' },
  { num: 6, label: '6. Frameworks' },
  { num: 7, label: '7. Sources' },
  { num: 8, label: '8. Output Spec' },
]

export const PromptPreview: React.FC<PromptPreviewProps> = ({
  prompt,
  isOpen,
  onClose,
  onNavigatePrompt,
  hasPrev,
  hasNext,
  onSaveEdit,
  onCopy,
  isCopied = false,
  allPrompts = [],
  onSelectPrompt,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview')
  const [editedText, setEditedText] = useState('')
  const [hasChanges, setHasChanges] = useState(false)
  const [activeSectionNum, setActiveSectionNum] = useState<number | null>(null)

  // Reset or initialize state when prompt changes
  useEffect(() => {
    if (prompt) {
      setEditedText(prompt.fullPrompt)
      setHasChanges(false)
      setActiveSectionNum(null)
    }
  }, [prompt?.id, prompt?.fullPrompt])

  // Handle keyboard navigation: Esc to close, ArrowLeft for prev, ArrowRight for next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && hasPrev && activeTab === 'preview') {
        onNavigatePrompt('prev')
      } else if (e.key === 'ArrowRight' && hasNext && activeTab === 'preview') {
        onNavigatePrompt('next')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, hasPrev, hasNext, activeTab, onClose, onNavigatePrompt])

  if (!isOpen || !prompt) return null

  const liveWordCount = calculateWordCount(editedText)
  const aiRecommendation = PILLAR_AI_RECOMMENDATIONS[prompt.pillarNumber] || PILLAR_AI_RECOMMENDATIONS[1]

  // Find adjacent prompt objects for context-aware button labels
  const currentIndex = allPrompts.findIndex((p) => p.id === prompt.id)
  const prevPrompt = currentIndex > 0 ? allPrompts[currentIndex - 1] : null
  const nextPrompt = currentIndex >= 0 && currentIndex < allPrompts.length - 1 ? allPrompts[currentIndex + 1] : null

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setEditedText(val)
    setHasChanges(val !== prompt.fullPrompt)
    onSaveEdit(prompt.id, val)
  }

  const handleReset = () => {
    setEditedText(prompt.fullPrompt)
    setHasChanges(false)
    onSaveEdit(prompt.id, prompt.fullPrompt)
  }

  const handleCopyCurrent = () => {
    onCopy(prompt, editedText)
  }

  const handleScrollToSection = (num: number) => {
    setActiveSectionNum(num)
    const el = document.getElementById(`prompt-sec-${num}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0F172A]/45 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl h-[92vh] max-h-[900px] rounded-2xl bg-white border border-[#CBD5E1] shadow-[0_25px_60px_rgba(0,0,0,0.22)] flex flex-col overflow-hidden z-10"
        >
          {/* Top Bar with Pillar Info & Controls */}
          <div className="px-5 sm:px-6 py-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
                style={{
                  backgroundColor: `${prompt.color}15`,
                  border: `1px solid ${prompt.color}40`,
                  color: prompt.color,
                }}
              >
                <PillarIcon name={prompt.icon} className="w-5 h-5" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${prompt.color}15`,
                      color: prompt.color,
                      border: `1px solid ${prompt.color}40`,
                    }}
                  >
                    PILLAR 0{prompt.pillarNumber}
                  </span>
                  <span className="text-xs text-[#64748B] truncate hidden sm:inline">
                    {prompt.pillarName}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-[#1A202C] truncate mt-0.5">
                  {prompt.promptName}
                </h2>
              </div>
            </div>

            {/* Right Controls: View Switcher, Copy & Close */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Tabs: Preview vs Edit */}
              <div className="flex items-center bg-[#EDF2F7] p-1 rounded-xl border border-[#CBD5E1]">
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'preview'
                      ? 'bg-[#4355B9] text-white shadow-xs'
                      : 'text-[#64748B] hover:text-[#1A202C]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Reader</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'edit'
                      ? 'bg-[#4355B9] text-white shadow-xs'
                      : 'text-[#64748B] hover:text-[#1A202C]'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editor</span>
                  {hasChanges && <span className="w-1.5 h-1.5 rounded-full bg-[#107C41]" />}
                </button>
              </div>

              {/* Copy Button */}
              <button
                type="button"
                onClick={handleCopyCurrent}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 ${
                  isCopied
                    ? 'bg-[#107C41] text-white shadow-sm'
                    : 'bg-white hover:bg-[#F1F5F9] text-[#1A202C] border border-[#CBD5E1]'
                }`}
                title="Copy full prompt to clipboard"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#4355B9]" />
                    <span className="hidden sm:inline">Copy Prompt</span>
                    <span className="sm:hidden">Copy</span>
                  </>
                )}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl bg-white hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#1A202C] border border-[#CBD5E1] transition-colors cursor-pointer"
                title="Close modal (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Metrics & AI Recommendation Strip */}
          <div className="px-5 sm:px-6 py-2.5 bg-white border-b border-[#E2E8F0] flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs">
            {/* Left: Metrics */}
            <div className="flex items-center gap-3 sm:gap-5 flex-wrap text-[#475569]">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#2563EB]" />
                <span className="font-semibold text-[#1A202C]">{prompt.lensCount}</span> Lenses
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#C07818]" />
                <span className="font-semibold text-[#1A202C]">{prompt.frameworkCount}</span> Frameworks
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
                <span className="font-semibold text-[#1A202C]">{liveWordCount.toLocaleString()}</span> Words
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#107C41]" />
                <span>{prompt.estimatedResearchTime}</span>
              </span>
            </div>

            {/* Right: Revert or AI Tag */}
            <div className="flex items-center gap-2">
              {hasChanges ? (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[11px] text-[#C0392B] hover:text-[#991B1B] flex items-center gap-1 cursor-pointer transition-colors font-medium bg-[#FEF2F2] px-2.5 py-1 rounded-lg border border-[#FCA5A5]/40"
                  title="Revert modifications to original generated prompt"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Revert to original</span>
                </button>
              ) : (
                <div className="text-[11px] text-[#4355B9] bg-[#4355B9]/10 px-2.5 py-0.5 rounded-full border border-[#4355B9]/25 flex items-center gap-1.5">
                  <Compass className="w-3 h-3 text-[#4355B9]" />
                  <span className="truncate max-w-[260px] sm:max-w-[340px]">
                    Best in {aiRecommendation.model}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Section Quick-Jump Pills (Only shown in Reader mode) */}
          {activeTab === 'preview' && (
            <div className="px-5 sm:px-6 py-2 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider shrink-0 mr-1">
                Jump To:
              </span>
              {PROMPT_SECTIONS.map((sec) => (
                <button
                  key={sec.num}
                  type="button"
                  onClick={() => handleScrollToSection(sec.num)}
                  className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${
                    activeSectionNum === sec.num
                      ? 'bg-[#4355B9] text-white border-[#4355B9] shadow-xs'
                      : 'bg-white hover:bg-[#EDF2F7] text-[#475569] hover:text-[#1A202C] border-[#CBD5E1]'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          )}

          {/* Body Content Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F8FAFC]">
            {activeTab === 'preview' ? (
              <div className="space-y-4 max-w-4xl mx-auto">
                {/* AI Model Execution Tip Banner */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#4355B9]/08 via-[#2563EB]/06 to-[#107C41]/08 border border-[#CBD5E1] text-xs flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#4355B9] shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-[#1A202C]">
                      Recommended Execution Engine: {aiRecommendation.model}
                    </span>
                    <p className="text-[#64748B] text-[11px] mt-0.5 leading-relaxed">
                      {aiRecommendation.tip} Paste this prompt in a fresh chat session for focused, unconstrained research.
                    </p>
                  </div>
                </div>

                {/* Formatted Syntax Reader */}
                <PromptSyntaxViewer
                  content={editedText}
                  color={prompt.color}
                  className="bg-white shadow-xs border border-[#CBD5E1]"
                />
              </div>
            ) : (
              <div className="h-full flex flex-col max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-2 text-xs text-[#64748B]">
                  <span>Live Markdown Editor — Any changes will be copied & exported immediately</span>
                  <span>{liveWordCount} words</span>
                </div>
                <textarea
                  value={editedText}
                  onChange={handleTextChange}
                  className="flex-1 w-full p-4 sm:p-5 rounded-2xl bg-white border border-[#CBD5E1] focus:border-[#4355B9] focus:ring-2 focus:ring-[#4355B9]/20 font-mono text-xs leading-relaxed text-[#1A202C] resize-none outline-none selection:bg-[#4355B9]/20 selection:text-[#1A202C] shadow-xs"
                  placeholder="Edit your prompt markdown here..."
                />
              </div>
            )}
          </div>

          {/* Pillar Glider Bar at Modal Bottom */}
          <div className="px-5 sm:px-6 py-3 bg-white border-t border-[#E2E8F0] flex items-center justify-between gap-3 text-xs">
            {/* Previous Pillar with Name */}
            <button
              type="button"
              disabled={!hasPrev}
              onClick={() => onNavigatePrompt('prev')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-medium max-w-[220px] sm:max-w-[280px] truncate ${
                hasPrev
                  ? 'bg-white hover:bg-[#F1F5F9] text-[#1A202C] border-[#CBD5E1] shadow-xs active:scale-95'
                  : 'opacity-40 cursor-not-allowed text-[#94A3B8] border-[#E2E8F0]'
              }`}
              title={prevPrompt ? `Go to Pillar ${prevPrompt.pillarNumber}: ${prevPrompt.promptName}` : 'First pillar'}
            >
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <span className="truncate">
                {prevPrompt ? `Pillar 0${prevPrompt.pillarNumber}: ${prevPrompt.promptName}` : 'Previous Pillar'}
              </span>
            </button>

            {/* Center Pillar Dots Navigator */}
            {allPrompts.length > 0 && onSelectPrompt && (
              <div className="hidden md:flex items-center gap-1.5">
                {allPrompts.map((p) => {
                  const isCurrent = p.id === prompt.id
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => onSelectPrompt(p.id)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer border ${
                        isCurrent
                          ? 'text-white border-transparent shadow-xs scale-105'
                          : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#1A202C] border-[#E2E8F0] hover:bg-[#EDF2F7]'
                      }`}
                      style={{
                        backgroundColor: isCurrent ? p.color : undefined,
                      }}
                      title={`Pillar 0${p.pillarNumber}: ${p.promptName}`}
                    >
                      {p.pillarNumber}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Next Pillar with Name */}
            <button
              type="button"
              disabled={!hasNext}
              onClick={() => onNavigatePrompt('next')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer font-medium max-w-[220px] sm:max-w-[280px] truncate ${
                hasNext
                  ? 'bg-white hover:bg-[#F1F5F9] text-[#1A202C] border-[#CBD5E1] shadow-xs active:scale-95'
                  : 'opacity-40 cursor-not-allowed text-[#94A3B8] border-[#E2E8F0]'
              }`}
              title={nextPrompt ? `Go to Pillar ${nextPrompt.pillarNumber}: ${nextPrompt.promptName}` : 'Last pillar'}
            >
              <span className="truncate">
                {nextPrompt ? `Pillar 0${nextPrompt.pillarNumber}: ${nextPrompt.promptName}` : 'Next Pillar'}
              </span>
              <ChevronRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
