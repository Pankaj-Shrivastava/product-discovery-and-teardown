import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Layers,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { PageTransition } from '../components/layout/PageTransition'
import { PILLARS } from '../lib/constants'
import { composeAllPrompts } from '../lib/prompt-engine/composer'
import type { GeneratedPrompt } from '../types'
import { PromptCard } from '../components/prompt-generation/PromptCard'
import { PromptPreview } from '../components/prompt-generation/PromptPreview'
import { BatchActions } from '../components/prompt-generation/BatchActions'
import { TransitionToGuide } from '../components/prompt-generation/TransitionToGuide'
import { copyTextToClipboard } from '../lib/utils'

interface ToastState {
  id: number
  message: string
  type: 'success' | 'error'
}

export const Stage2_PromptGeneration: React.FC = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useApp()

  // Track expanded prompt cards (by ID)
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({})

  // Modal preview state
  const [activePreviewPromptId, setActivePreviewPromptId] = useState<string | null>(null)

  // Track which card was copied recently for inline feedback
  const [recentlyCopiedId, setRecentlyCopiedId] = useState<string | null>(null)

  // Track if user has customized any prompts during this session
  const [hasCustomEdits, setHasCustomEdits] = useState(false)

  // Toast notification queue
  const [toasts, setToasts] = useState<ToastState[]>([])

  // Warn on browser unload/close if user has customized prompts
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasCustomEdits) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasCustomEdits])

  // Ensure prompts are generated if missing or direct URL visited
  useEffect(() => {
    if (!state.product.name.trim()) {
      navigate('/', {
        replace: true,
        state: { message: 'Start by entering a product name' },
      })
    } else if (state.prompts.length === 0) {
      const generated = composeAllPrompts(state.product)
      dispatch({ type: 'SET_PROMPTS', payload: generated })
    }
  }, [state.product, state.prompts.length, navigate, dispatch])

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  const handleToggleExpand = (promptId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [promptId]: !prev[promptId],
    }))
  }

  const handleCopySinglePrompt = async (prompt: GeneratedPrompt, customText?: string) => {
    const textToCopy = customText || prompt.fullPrompt
    const success = await copyTextToClipboard(textToCopy)

    if (success) {
      setRecentlyCopiedId(prompt.id)
      showToast(`Pillar ${prompt.pillarNumber} prompt copied to clipboard!`, 'success')
      setTimeout(() => setRecentlyCopiedId(null), 2500)
    } else {
      showToast('Clipboard access was denied. Please copy manually from the editor modal.', 'error')
    }
  }

  const handleSavePromptEdit = (promptId: string, updatedText: string) => {
    setHasCustomEdits(true)
    const updated = state.prompts.map((p) => {
      if (p.id === promptId) {
        return {
          ...p,
          fullPrompt: updatedText,
          content: updatedText,
          wordCount: updatedText.trim().split(/\s+/).filter(Boolean).length,
        }
      }
      return p
    })
    dispatch({ type: 'SET_PROMPTS', payload: updated })
  }

  // Active modal prompt resolution
  const activePromptIndex = state.prompts.findIndex((p) => p.id === activePreviewPromptId)
  const activePrompt = activePromptIndex !== -1 ? state.prompts[activePromptIndex] : null

  const handleNavigateModalPrompt = (direction: 'prev' | 'next') => {
    if (activePromptIndex === -1) return
    const nextIndex = direction === 'next' ? activePromptIndex + 1 : activePromptIndex - 1
    if (nextIndex >= 0 && nextIndex < state.prompts.length) {
      setActivePreviewPromptId(state.prompts[nextIndex].id)
    }
  }

  // Aggregate stats
  const totalLenses = state.prompts.reduce((acc, p) => acc + p.lensCount, 0)
  const totalFrameworks = state.prompts.reduce((acc, p) => acc + p.frameworkCount, 0)
  const totalWords = state.prompts.reduce((acc, p) => acc + p.wordCount, 0)

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Floating Toast Notifications */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className={`px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-mono font-medium pointer-events-auto border ${
                  toast.type === 'success'
                    ? 'bg-[#0B1516] border-[#10B981]/50 text-[#10B981]'
                    : 'bg-[#180D10] border-[#F43F5E]/50 text-[#F43F5E]'
                }`}
              >
                {toast.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{toast.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Stage Tracker Header Pill */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141A2D] border border-[#232B45] text-xs font-mono text-[#CABEFF] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
            <span>STAGE 02 / 06 : GENERATION</span>
            <span className="text-[#2B3558]">•</span>
            <span className="text-[#38BDF8]">RESEARCH PROMPTS</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#8B93B0]">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>6 Pillar Prompts Generated</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-[#1E253D]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-[#7C5CFC]/15 text-[#7C5CFC] border border-[#7C5CFC]/30">
                PROMPT SUITE READY
              </span>
              <span className="text-xs text-[#8B93B0] font-mono">
                {state.product.companyName}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Research Prompts for{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7C5CFC] via-[#9B7FFF] to-[#38BDF8]">
                {state.product.name}
              </span>
            </h1>

            <p className="text-sm text-[#94A3B8] max-w-2xl mt-2 leading-relaxed">
              Domain-specific prompts engineered from 6 product teardown research skills, grounded in {totalFrameworks} industry frameworks and {totalLenses} strategic lenses.
            </p>

            {/* Quick Aggregate Stats Strip */}
            <div className="flex items-center gap-4 sm:gap-6 mt-4 text-xs font-mono text-[#8B93B0] flex-wrap">
              <span className="flex items-center gap-1.5 text-[#CAD1E9]">
                <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>{totalLenses} Research Lenses</span>
              </span>
              <span className="flex items-center gap-1.5 text-[#CAD1E9]">
                <BookOpen className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span>{totalFrameworks} Frameworks Grounded</span>
              </span>
              <span className="flex items-center gap-1.5 text-[#CAD1E9]">
                <Sparkles className="w-3.5 h-3.5 text-[#A78BFA]" />
                <span>~{totalWords.toLocaleString()} Words Total</span>
              </span>
            </div>
          </div>

          {/* Batch Actions Toolbar */}
          <div className="shrink-0">
            <BatchActions
              prompts={state.prompts}
              productName={state.product.name}
              onToast={showToast}
            />
          </div>
        </div>

        {/* 6-Card Grid with Staggered Animation & Missing Skill Data Fallback */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PILLARS.map((pillar) => {
            const prompt = state.prompts.find((p) => p.pillarNumber === pillar.number)
            if (!prompt) {
              return (
                <div
                  key={pillar.id}
                  className="rounded-2xl glass-panel border border-[#F59E0B]/30 bg-[#16120B]/50 p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40">
                        PILLAR 0{pillar.number}
                      </span>
                      <span className="text-xs font-mono text-[#F59E0B]">Skill Missing</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{pillar.title}</h3>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      This research skill definition was unavailable at build time. Prompts for other pillars remain fully functional.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#F59E0B]/20 text-xs text-[#F59E0B] font-mono flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Prompt unavailable</span>
                  </div>
                </div>
              )
            }

            return (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                isExpanded={!!expandedCards[prompt.id]}
                onToggleExpand={() => handleToggleExpand(prompt.id)}
                onOpenPreview={() => setActivePreviewPromptId(prompt.id)}
                onCopy={handleCopySinglePrompt}
                isCopied={recentlyCopiedId === prompt.id}
              />
            )
          })}
        </motion.div>

        {/* Transition to Stage 3 Research Guide */}
        <TransitionToGuide hasCustomEdits={hasCustomEdits} />

        {/* Fullscreen Prompt Preview & Editor Modal */}
        <PromptPreview
          prompt={activePrompt}
          isOpen={activePreviewPromptId !== null}
          onClose={() => setActivePreviewPromptId(null)}
          onNavigatePrompt={handleNavigateModalPrompt}
          hasPrev={activePromptIndex > 0}
          hasNext={activePromptIndex !== -1 && activePromptIndex < state.prompts.length - 1}
          onSaveEdit={handleSavePromptEdit}
          onCopy={handleCopySinglePrompt}
          isCopied={activePrompt ? recentlyCopiedId === activePrompt.id : false}
        />
      </div>
    </PageTransition>
  )
}
