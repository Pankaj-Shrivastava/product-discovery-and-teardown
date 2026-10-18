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
                className={`px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 text-xs font-medium pointer-events-auto border ${
                  toast.type === 'success'
                    ? 'bg-[#F0FDF4] border-[#107C41]/30 text-[#107C41]'
                    : 'bg-[#FEF2F2] border-[#C0392B]/30 text-[#C0392B]'
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
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CBD5E1] text-xs text-[#4355B9] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#107C41] animate-pulse" />
            <span>STAGE 03 / 06 : PROTOCOL</span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="text-[#107C41]">RESEARCH PLAYBOOK</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <HelpCircle className="w-3.5 h-3.5 text-[#4355B9]" />
            <span>Informational Stage (No Gate)</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-10 pb-6 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-[#107C41]/10 text-[#107C41] border border-[#107C41]/30">
              OPERATIONAL PLAYBOOK
            </span>
            <span className="text-xs text-[#64748B]">
              Target: {productName} by {companyName}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A202C] tracking-tight">
            Multi-LLM Research Protocol for{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#107C41] via-[#2563EB] to-[#4355B9]">
              {productName}
            </span>
          </h1>

          <p className="text-sm text-[#64748B] max-w-2xl mt-2 leading-relaxed">
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
