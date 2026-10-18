import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, RotateCcw, Clock } from 'lucide-react'
import { useApp } from '../../context/AppContext'

interface StageUnderDevelopmentWrapperProps {
  stageNumber: number
  stageTitle: string
  featureTitle?: string
  description?: string
  children: React.ReactNode
}

/**
 * StageUnderDevelopmentWrapper:
 * Blurs unfinished stages (Stages 4-6) while keeping the underlying UI subtly visible.
 * Renders an elevated frosted glass modal card explaining the v2.0 roadmap with direct action CTAs.
 */
export const StageUnderDevelopmentWrapper: React.FC<StageUnderDevelopmentWrapperProps> = ({
  stageNumber,
  stageTitle,
  featureTitle = 'Synthesis & Slide Deck Engine Coming Soon',
  description = 'Stages 1 to 3 provide everything needed to run comprehensive multi-LLM teardowns right now. In-browser markdown AST parsing, insight synthesis, and one-click PPTX export are under active development for the v2.0 release.',
  children,
}) => {
  const navigate = useNavigate()
  const { dispatch } = useApp()

  const handleStartNew = () => {
    dispatch({ type: 'RESET_STATE' })
    navigate('/')
  }

  return (
    <div className="relative w-full min-h-[calc(100vh-12rem)] flex flex-col justify-start">
      {/* Underlying UI with light subtle blur so all elements remain clearly visible */}
      <div
        className="w-full filter blur-[2px] opacity-80 pointer-events-none select-none transition-all duration-300"
        aria-hidden="true"
      >
        {children}
      </div>

      {/* Frosted Glass Overlay Card */}
      <div className="absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-6 pointer-events-none bg-slate-900/[0.03]">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto max-w-lg w-full bg-white/98 backdrop-blur-xl border border-[#CBD5E1] rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.16)] text-center relative overflow-hidden"
        >
          {/* Subtle Ambient Glow Behind Card */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-[#4355B9]/15 via-[#2563EB]/10 to-[#107C41]/15 rounded-full blur-2xl pointer-events-none" />

          {/* Top Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EDF2F7] border border-[#CBD5E1] text-[11px] font-semibold text-[#4355B9] mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#C07818] animate-pulse" />
            <span>STAGE 0{stageNumber} / 06 • IN ACTIVE DEVELOPMENT</span>
          </div>

          {/* Icon Badge */}
          <div className="relative mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4355B9]/10 via-[#2563EB]/10 to-[#107C41]/10 border border-[#E2E8F0] flex items-center justify-center text-[#4355B9] mb-4 shadow-xs">
            <Clock className="w-6 h-6 stroke-[2.2] text-[#4355B9]" />
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#107C41] flex items-center justify-center text-white">
              <Sparkles className="w-2.5 h-2.5" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A202C] tracking-tight mb-2">
            {featureTitle}
          </h2>

          <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-3">
            Module: <span className="text-[#4355B9] font-bold">{stageTitle}</span> (v2.0 Roadmap)
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-6 max-w-md mx-auto">
            {description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
            <button
              type="button"
              onClick={() => navigate('/guide')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4355B9] via-[#4F62C8] to-[#2563EB] text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Research Guide (Stage 3)</span>
            </button>

            <button
              type="button"
              onClick={handleStartNew}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#64748B] hover:text-[#1A202C] hover:bg-[#F8FAFC] font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start New Teardown</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
