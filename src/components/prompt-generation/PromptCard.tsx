import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Copy,
  Check,
  Eye,
  Clock,
  Layers,
  Sparkles,
  BookOpen,
  ArrowUpRight,
} from 'lucide-react'
import type { GeneratedPrompt } from '../../types'
import { PillarIcon } from './PillarIcon'
import { getSkillByPillarNumber } from '../../data/skills'

interface PromptCardProps {
  prompt: GeneratedPrompt
  isExpanded?: boolean
  onToggleExpand?: () => void
  onOpenPreview: () => void
  onCopy: (prompt: GeneratedPrompt) => void
  isCopied?: boolean
}

export const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  onOpenPreview,
  onCopy,
  isCopied = false,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  // Context sweet spot calculation (800-1500 words is the sweet spot)
  const wordCount = prompt.wordCount
  const sweetSpotPercent = Math.min(100, Math.round((wordCount / 1600) * 100))

  // Retrieve skill frameworks for executive chip display
  const skill = getSkillByPillarNumber(prompt.pillarNumber)
  const topFrameworks = skill?.frameworks?.slice(0, 3) || []

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
      if (!window.getSelection()?.toString()) {
        e.preventDefault()
        onCopy(prompt)
      }
    } else if (e.key === 'Enter') {
      onOpenPreview()
    }
  }

  return (
    <motion.div
      layout
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl glass-panel border border-[#E2E8F0] hover:border-[#4355B9]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden outline-none focus:ring-2 focus:ring-[#4355B9]/40 shadow-xs"
      style={{
        boxShadow: isHovered
          ? `0 12px 28px -6px ${prompt.color}18, 0 0 0 1px ${prompt.color}35`
          : undefined,
      }}
    >
      {/* Top Accent Gradient Line */}
      <div
        className="h-1.5 w-full transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${prompt.color}, transparent)`,
          opacity: isHovered ? 1 : 0.65,
        }}
      />

      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs"
              style={{
                backgroundColor: `${prompt.color}15`,
                border: `1px solid ${prompt.color}40`,
                color: prompt.color,
              }}
            >
              <PillarIcon name={prompt.icon} className="w-5 h-5" />
            </div>

            <div>
              <span
                className="px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase inline-block"
                style={{
                  backgroundColor: `${prompt.color}12`,
                  color: prompt.color,
                  border: `1px solid ${prompt.color}30`,
                }}
              >
                PILLAR 0{prompt.pillarNumber}
              </span>
              <div className="text-[11px] font-medium text-[#64748B] mt-0.5">
                {prompt.pillarName}
              </div>
            </div>
          </div>

          {/* Direct Modal Open Icon Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onOpenPreview()
            }}
            title="Open Rich Prompt Studio"
            className="p-2 rounded-xl bg-[#F8FAFC] hover:bg-[#EDF2F7] text-[#64748B] hover:text-[#4355B9] border border-[#E2E8F0] transition-colors cursor-pointer group/icon"
          >
            <ArrowUpRight className="w-4 h-4 group-hover/icon:translate-x-0.5 group-hover/icon:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Prompt Name & Subtitle */}
        <div className="mb-4">
          <h3
            onClick={onOpenPreview}
            className="text-lg font-bold text-[#1A202C] tracking-tight group-hover:text-[#4355B9] transition-colors cursor-pointer"
          >
            {prompt.promptName}
          </h3>
          <p className="text-xs text-[#64748B] leading-relaxed mt-1 line-clamp-2">
            Multi-lens teardown examining {prompt.lensCount} strategic dimensions grounded in {prompt.frameworkCount} frameworks.
          </p>
        </div>

        {/* Grounded Framework Chips Teaser */}
        {topFrameworks.length > 0 && (
          <div className="mb-4">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-1.5">
              Grounded Frameworks
            </div>
            <div className="flex flex-wrap gap-1.5">
              {topFrameworks.map((fw) => (
                <span
                  key={fw.name}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-[#F1F5F9] text-[#334155] border border-[#E2E8F0] truncate max-w-[200px]"
                >
                  {fw.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Metadata Badges */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A202C]">
            <Layers className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>{prompt.lensCount} Lenses</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A202C]">
            <BookOpen className="w-3.5 h-3.5 text-[#C07818]" />
            <span>{prompt.frameworkCount} Frameworks</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A202C]">
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>{prompt.wordCount.toLocaleString()} Words</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#1A202C]">
            <Clock className="w-3.5 h-3.5 text-[#107C41]" />
            <span>{prompt.estimatedResearchTime}</span>
          </div>
        </div>

        {/* Prompt Sweet Spot Indicator */}
        <div className="mt-auto pt-2 border-t border-[#E2E8F0]">
          <div className="flex items-center justify-between text-[11px] text-[#64748B] mb-1.5">
            <span className="flex items-center gap-1">
              <span>Context Sweet Spot</span>
              {wordCount > 4000 ? (
                <span className="text-[10px] text-[#DC2626] font-medium">• Too Long</span>
              ) : wordCount > 1600 ? (
                <span className="text-[10px] text-[#C07818] font-medium">• Comprehensive</span>
              ) : wordCount >= 800 ? (
                <span className="text-[10px] text-[#107C41] font-medium">• Optimal</span>
              ) : (
                <span className="text-[10px] text-[#C07818] font-medium">• Compact</span>
              )}
            </span>
            <span className="text-[#1A202C] font-medium">{prompt.wordCount.toLocaleString()} words</span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-[#EDF2F7] overflow-hidden p-0.5">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${sweetSpotPercent}%`,
                background:
                  wordCount > 4000
                    ? '#DC2626'
                    : wordCount > 1600
                    ? '#C07818'
                    : `linear-gradient(90deg, ${prompt.color}88, ${prompt.color})`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Card Footer Actions: Direct View Modal + Quick Copy */}
      <div className="px-5 sm:px-6 py-3.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between gap-2.5">
        {/* Primary View Prompt Button -> Directly launches rich modal */}
        <button
          type="button"
          onClick={onOpenPreview}
          className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#4355B9]/10 text-[#4355B9] hover:bg-[#4355B9] hover:text-white border border-[#4355B9]/25 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 group/view"
        >
          <Eye className="w-3.5 h-3.5 group-hover/view:scale-110 transition-transform" />
          <span>View Prompt</span>
        </button>

        {/* Quick Copy CTA */}
        <button
          type="button"
          onClick={() => onCopy(prompt)}
          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 ${
            isCopied
              ? 'bg-[#107C41] text-white shadow-sm'
              : 'bg-white hover:bg-[#F1F5F9] text-[#1A202C] border border-[#CBD5E1]'
          }`}
          title="Copy this prompt to clipboard"
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#4355B9]" />
              <span>Quick Copy</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}
