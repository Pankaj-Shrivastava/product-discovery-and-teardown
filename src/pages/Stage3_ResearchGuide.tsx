import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { PageTransition } from '../components/layout/PageTransition'
import { ResearchWorkflowSteps } from '../components/research-guide/ResearchWorkflowSteps'
import { AIToolCards } from '../components/research-guide/AIToolCards'
import { NotebookLMBanner } from '../components/research-guide/NotebookLMBanner'
import { SummaryTemplateGuide } from '../components/research-guide/SummaryTemplateGuide'
import { TransitionToUpload } from '../components/research-guide/TransitionToUpload'

interface ToastState {
  id: number
  message: string
  type: 'success' | 'error'
}

export const Stage3_ResearchGuide: React.FC = () => {
  const { state } = useApp()
  const [toasts, setToasts] = useState<ToastState[]>([])

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }

  const productName = state.product.name.trim() || 'Your Product'
  const companyName = state.product.companyName.trim() || 'Target Company'

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
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

        {/* Stage Tracker Pill */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141A2D] border border-[#232B45] text-xs font-mono text-[#CABEFF] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
            <span>STAGE 03 / 06 : PROTOCOL</span>
            <span className="text-[#2B3558]">•</span>
            <span className="text-[#34D399]">RESEARCH PLAYBOOK</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#8B93B0]">
            <HelpCircle className="w-3.5 h-3.5 text-[#7C5CFC]" />
            <span>Informational Stage (No Gate)</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-10 pb-6 border-b border-[#1E253D]">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-[#34D399]/15 text-[#34D399] border border-[#34D399]/30">
              OPERATIONAL PLAYBOOK
            </span>
            <span className="text-xs text-[#8B93B0] font-mono">
              Target: {productName} by {companyName}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Multi-LLM Research Protocol for{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#34D399] via-[#38BDF8] to-[#7C5CFC]">
              {productName}
            </span>
          </h1>

          <p className="text-sm text-[#94A3B8] max-w-2xl mt-2 leading-relaxed">
            Learn how to deploy your 6 generated prompts into external frontier AI engines (ChatGPT, Claude, Gemini, Perplexity), synthesize findings with NotebookLM, and format your summary document for automated AST parsing in Stage 4.
          </p>
        </div>

        {/* 1. Five Step Workflow Roadmap */}
        <ResearchWorkflowSteps />

        {/* 2. Recommended AI Research Engines */}
        <AIToolCards />

        {/* 3. Highlighted Google NotebookLM Multi-Document Synthesis Workflow */}
        <NotebookLMBanner productName={productName} onToast={showToast} />

        {/* 4. Summary Document Guide & Template Download */}
        <SummaryTemplateGuide
          productName={productName}
          companyName={companyName}
          category={state.product.category}
          platform={state.product.platform}
          businessModel={state.product.businessModel}
          onToast={showToast}
        />

        {/* 5. Pre-Flight Checklist & Transition to Stage 4 */}
        <TransitionToUpload />
      </div>
    </PageTransition>
  )
}
