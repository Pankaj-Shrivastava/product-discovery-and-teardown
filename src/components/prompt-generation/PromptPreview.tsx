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
}

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
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview')
  const [editedText, setEditedText] = useState('')
  const [hasChanges, setHasChanges] = useState(false)

  // Reset or initialize state when prompt changes
  useEffect(() => {
    if (prompt) {
      setEditedText(prompt.fullPrompt)
      setHasChanges(false)
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

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#070A14]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-5xl h-[90vh] max-h-[850px] rounded-2xl bg-[#0D1222] border border-[#232B45] shadow-2xl flex flex-col overflow-hidden z-10"
        >
          {/* Top Bar with Pillar Info & Controls */}
          <div className="px-5 sm:px-6 py-4 bg-[#090D18] border-b border-[#232B45] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
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
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase"
                    style={{
                      backgroundColor: `${prompt.color}20`,
                      color: prompt.color,
                      border: `1px solid ${prompt.color}40`,
                    }}
                  >
                    PILLAR 0{prompt.pillarNumber}
                  </span>
                  <span className="text-xs font-mono text-[#8B93B0] truncate hidden sm:inline">
                    {prompt.pillarName}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white truncate mt-0.5">
                  {prompt.promptName}
                </h2>
              </div>
            </div>

            {/* Right Controls: View Switcher, Copy & Close */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Tabs: Preview vs Edit */}
              <div className="flex items-center bg-[#13192B] p-1 rounded-xl border border-[#232B45]">
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'preview'
                      ? 'bg-[#7C5CFC] text-white shadow-sm'
                      : 'text-[#8B93B0] hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Reader</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'edit'
                      ? 'bg-[#7C5CFC] text-white shadow-sm'
                      : 'text-[#8B93B0] hover:text-white'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editor</span>
                  {hasChanges && <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />}
                </button>
              </div>

              {/* Copy Button */}
              <button
                type="button"
                onClick={handleCopyCurrent}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isCopied
                    ? 'bg-[#10B981] text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-[#1D253E] hover:bg-[#283254] text-white border border-[#2B355A]'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#7C5CFC]" />
                    <span className="hidden sm:inline">Copy Prompt</span>
                    <span className="sm:hidden">Copy</span>
                  </>
                )}
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-xl bg-[#141A2D] hover:bg-[#202744] text-[#8B93B0] hover:text-white border border-[#262E4C] transition-colors cursor-pointer"
                title="Close modal (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="px-5 sm:px-6 py-2.5 bg-[#0A0E1A] border-b border-[#1A2035] flex items-center justify-between text-xs font-mono text-[#8B93B0]">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 text-[#CBD5E1]">
                <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>{prompt.lensCount} Lenses</span>
              </span>
              <span className="flex items-center gap-1.5 text-[#CBD5E1]">
                <BookOpen className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span>{prompt.frameworkCount} Frameworks</span>
              </span>
              <span className="flex items-center gap-1.5 text-[#CBD5E1]">
                <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
                <span>{liveWordCount.toLocaleString()} Words</span>
              </span>
              <span className="flex items-center gap-1.5 text-[#CBD5E1]">
                <Clock className="w-3.5 h-3.5 text-[#34D399]" />
                <span>{prompt.estimatedResearchTime}</span>
              </span>
            </div>

            {hasChanges && (
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] font-mono text-[#F87171] hover:text-[#EF4444] flex items-center gap-1 cursor-pointer transition-colors"
                title="Revert modifications to original generated prompt"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Revert to original</span>
              </button>
            )}
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-hidden p-4 sm:p-6 bg-[#080B16]">
            {activeTab === 'preview' ? (
              <PromptSyntaxViewer
                content={editedText}
                color={prompt.color}
                maxHeight="h-full"
                className="h-full"
              />
            ) : (
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-2 text-xs font-mono text-[#8B93B0]">
                  <span>Live Markdown Editor — Any changes will be copied & exported</span>
                  <span>{liveWordCount} words</span>
                </div>
                <textarea
                  value={editedText}
                  onChange={handleTextChange}
                  className="flex-1 w-full p-4 rounded-xl bg-[#090D18] border border-[#232942] focus:border-[#7C5CFC] font-mono text-xs leading-relaxed text-[#CAD1E9] resize-none outline-none selection:bg-[#7C5CFC]/30 selection:text-white"
                  placeholder="Edit your prompt markdown here..."
                />
              </div>
            )}
          </div>

          {/* Footer with Previous / Next Arrows */}
          <div className="px-5 sm:px-6 py-3 bg-[#090D18] border-t border-[#232B45] flex items-center justify-between text-xs font-mono">
            <button
              type="button"
              disabled={!hasPrev}
              onClick={() => onNavigatePrompt('prev')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                hasPrev
                  ? 'bg-[#141A2D] hover:bg-[#202744] text-[#CBD5E1] border-[#262E4C]'
                  : 'opacity-40 cursor-not-allowed text-[#64748B] border-[#1A2035]'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Pillar</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-[#090D18] text-[10px] text-[#64748B] border border-[#232B45]">
                ←
              </kbd>
            </button>

            <span className="text-xs text-[#8B93B0]">
              Pillar {prompt.pillarNumber} of 6
            </span>

            <button
              type="button"
              disabled={!hasNext}
              onClick={() => onNavigatePrompt('next')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                hasNext
                  ? 'bg-[#141A2D] hover:bg-[#202744] text-[#CBD5E1] border-[#262E4C]'
                  : 'opacity-40 cursor-not-allowed text-[#64748B] border-[#1A2035]'
              }`}
            >
              <span>Next Pillar</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-[#090D18] text-[10px] text-[#64748B] border border-[#232B45]">
                →
              </kbd>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
