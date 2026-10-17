import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Copy,
  Check,
  Maximize2,
  ChevronDown,
  ChevronUp,
  Clock,
  Layers,
  Sparkles,
  BookOpen,
} from 'lucide-react'
import type { GeneratedPrompt } from '../../types'
import { PillarIcon } from './PillarIcon'
import { PromptSyntaxViewer } from './PromptSyntaxViewer'

interface PromptCardProps {
  prompt: GeneratedPrompt
  isExpanded: boolean
  onToggleExpand: () => void
  onOpenPreview: () => void
  onCopy: (prompt: GeneratedPrompt) => void
  isCopied?: boolean
}

export const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  isExpanded,
  onToggleExpand,
  onOpenPreview,
  onCopy,
  isCopied = false,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  // Context sweet spot calculation (800-1500 words is the sweet spot)
  const wordCount = prompt.wordCount
  const sweetSpotPercent = Math.min(100, Math.round((wordCount / 1600) * 100))

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
      // Don't intercept if user has text selected
      if (!window.getSelection()?.toString()) {
        e.preventDefault()
        onCopy(prompt)
      }
    }
  }

  return (
    <motion.div
      layout
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl glass-panel border border-[#232A44] hover:border-[#7C5CFC]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden outline-none focus:ring-2 focus:ring-[#7C5CFC]/50 shadow-lg"
      style={{
        boxShadow: isHovered
          ? `0 12px 30px -10px ${prompt.color}25, 0 0 0 1px ${prompt.color}40`
          : undefined,
      }}
    >
      {/* Top Accent Gradient Line */}
      <div
        className="h-1 w-full transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${prompt.color}, transparent)`,
          opacity: isHovered || isExpanded ? 1 : 0.6,
        }}
      />

      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
              style={{
                backgroundColor: `${prompt.color}15`,
                border: `1px solid ${prompt.color}40`,
                color: prompt.color,
              }}
            >
              <PillarIcon name={prompt.icon} className="w-4 h-4" />
            </div>

            <div>
              <span
                className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider uppercase inline-block"
                style={{
                  backgroundColor: `${prompt.color}18`,
                  color: prompt.color,
                  border: `1px solid ${prompt.color}35`,
                }}
              >
                PILLAR 0{prompt.pillarNumber}
              </span>
              <div className="text-[11px] font-mono text-[#8B93B0] mt-0.5">
                {prompt.pillarName}
              </div>
            </div>
          </div>

          {/* Quick Preview Modal Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onOpenPreview()
            }}
            title="Open Fullscreen Reader & Editor"
            className="p-2 rounded-lg bg-[#141A2D] hover:bg-[#202744] text-[#8B93B0] hover:text-[#CABEFF] border border-[#262E4C] transition-colors cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Prompt Name & Subtitle */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#F3F4F8] transition-colors">
            {prompt.promptName}
          </h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed mt-1 line-clamp-2">
            Multi-lens teardown examining {prompt.lensCount} strategic dimensions grounded in {prompt.frameworkCount} frameworks.
          </p>
        </div>

        {/* Metadata Badges */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0F1424] border border-[#202740] text-[#CBD5E1]">
            <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>{prompt.lensCount} Lenses</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0F1424] border border-[#202740] text-[#CBD5E1]">
            <BookOpen className="w-3.5 h-3.5 text-[#FBBF24]" />
            <span>{prompt.frameworkCount} Frameworks</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0F1424] border border-[#202740] text-[#CBD5E1]">
            <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
            <span>{prompt.wordCount.toLocaleString()} Words</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0F1424] border border-[#202740] text-[#CBD5E1]">
            <Clock className="w-3.5 h-3.5 text-[#34D399]" />
            <span>{prompt.estimatedResearchTime}</span>
          </div>
        </div>

        {/* Prompt Sweet Spot Indicator */}
        <div className="mb-4 pt-2 border-t border-[#1F263E]/60">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8B93B0] mb-1.5">
            <span className="flex items-center gap-1">
              <span>Context Sweet Spot</span>
              {wordCount > 4000 ? (
                <span className="text-[10px] text-[#EF4444] font-medium">• Too Long (Amber/Red)</span>
              ) : wordCount > 1600 ? (
                <span className="text-[10px] text-[#FBBF24] font-medium">• Comprehensive</span>
              ) : wordCount >= 800 ? (
                <span className="text-[10px] text-[#34D399] font-medium">• Optimal</span>
              ) : (
                <span className="text-[10px] text-[#FBBF24] font-medium">• Compact</span>
              )}
            </span>
            <span className="text-white font-medium">{prompt.wordCount.toLocaleString()} words</span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-[#13192C] overflow-hidden p-0.5">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${sweetSpotPercent}%`,
                background:
                  wordCount > 4000
                    ? '#EF4444'
                    : wordCount > 1600
                    ? '#FBBF24'
                    : `linear-gradient(90deg, ${prompt.color}88, ${prompt.color})`,
              }}
            />
          </div>
        </div>

        {/* Inline Expandable Prompt Preview */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden mb-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-[#8B93B0] uppercase tracking-wider">
                  Prompt Body Preview
                </span>
                <button
                  type="button"
                  onClick={onOpenPreview}
                  className="text-[11px] font-mono text-[#7C5CFC] hover:text-[#9B7FFF] flex items-center gap-1 cursor-pointer"
                >
                  <span>Edit in Modal</span>
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>

              <PromptSyntaxViewer
                content={prompt.fullPrompt}
                color={prompt.color}
                maxHeight="max-h-80"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Card Footer Actions */}
      <div className="px-5 sm:px-6 py-3.5 bg-[#0D1222]/80 border-t border-[#1F263E] flex items-center justify-between gap-3">
        {/* Toggle Expand Inline */}
        <button
          type="button"
          onClick={onToggleExpand}
          className="text-xs font-mono font-medium text-[#94A3B8] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer py-1"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Hide Prompt</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              <span>View Prompt</span>
            </>
          )}
        </button>

        {/* Copy Prompt CTA */}
        <button
          type="button"
          onClick={() => onCopy(prompt)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
            isCopied
              ? 'bg-[#10B981] text-white shadow-[0_0_15px_rgba(16,185,129,0.35)]'
              : 'bg-[#1C233C] hover:bg-[#2A3459] text-white hover:text-white border border-[#2B355A]'
          }`}
          title="Copy this prompt (or press Ctrl+C)"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#7C5CFC]" />
              <span>Copy Prompt</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}
