import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Info,
  AlertCircle,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { PageTransition } from '../components/layout/PageTransition'
import { PILLARS } from '../lib/constants'
import { ProductInput } from '../types'
import { ProductNameInput } from '../components/product-input/ProductNameInput'
import { CompanyNameInput } from '../components/product-input/CompanyNameInput'
import { CategorySelector } from '../components/product-input/CategorySelector'
import { PlatformSelector } from '../components/product-input/PlatformSelector'
import { BusinessModelSelector } from '../components/product-input/BusinessModelSelector'
import { AdditionalContext } from '../components/product-input/AdditionalContext'
import { QuickPresets } from '../components/product-input/QuickPresets'
import { composeAllPrompts } from '../lib/prompt-engine/composer'

export const Stage1_ProductInput: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { state, dispatch } = useApp()

  const [touched, setTouched] = useState<{
    name?: boolean
    companyName?: boolean
  }>({})
  const [shakeTrigger, setShakeTrigger] = useState(0)

  // Redirect notification message if coming from unauthorized Stage 2 direct access
  const redirectMessage = (location.state as { message?: string } | null)?.message

  const isNameValid = state.product.name.trim().length >= 2
  const isCompanyValid = state.product.companyName.trim().length >= 1
  const isFormValid = isNameValid && isCompanyValid

  const getNameError = (): string | undefined => {
    if (!state.product.name.trim()) {
      return 'Product name is required'
    }
    if (state.product.name.trim().length < 2) {
      return 'Enter the full product name (minimum 2 characters)'
    }
    return undefined
  }

  const getCompanyError = (): string | undefined => {
    if (!state.product.companyName.trim()) {
      return 'Company or maker name is required'
    }
    return undefined
  }

  const handleUpdate = (field: keyof ProductInput, value: unknown) => {
    dispatch({
      type: 'SET_PRODUCT',
      payload: { [field]: value },
    })
  }

  const handleSelectPreset = (preset: ProductInput) => {
    dispatch({
      type: 'SET_PRODUCT',
      payload: preset,
    })
    setTouched({ name: true, companyName: true })
  }

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    setTouched({ name: true, companyName: true })

    if (!isFormValid) {
      setShakeTrigger((prev) => prev + 1)
      return
    }

    const generatedPrompts = composeAllPrompts(state.product)
    dispatch({ type: 'SET_PROMPTS', payload: generatedPrompts })
    dispatch({ type: 'COMPLETE_STAGE', payload: 1 })
    navigate('/prompts')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // If Enter is pressed outside textarea, attempt submit
    if (e.key === 'Enter' && (e.target as HTMLElement).tagName !== 'TEXTAREA') {
      e.preventDefault()
      handleSubmit()
    }
  }

  // Count filled fields for completion progress
  const requiredCount = 2
  const filledRequiredCount = (isNameValid ? 1 : 0) + (isCompanyValid ? 1 : 0)
  const isAllFilled = isFormValid

  return (
    <PageTransition>
      <div
        className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 w-full flex flex-col items-center"
        onKeyDown={handleKeyDown}
      >
        {/* Direct access redirect alert message if present */}
        {redirectMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-[#C07818]/10 border border-[#C07818]/30 text-[#C07818] text-xs flex items-center gap-2.5 shadow-sm"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-medium">{redirectMessage}</span>
          </motion.div>
        )}

        {/* Stage Tracker Pill */}
        <div className="flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full bg-white border border-[#E2E8F0] text-xs font-mono text-[#4355B9] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#4355B9] animate-ping" />
          <span>STAGE 01 / 06 : SPECIFICATION</span>
          <span className="text-[#CBD5E1]">•</span>
          <span className="text-[#107C41] font-medium">PRODUCT INGESTION</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-xl mb-8 flex flex-col items-center">
          <div className="mb-4 relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#4355B9] via-[#2563EB] to-[#107C41] rounded-2xl blur-md opacity-25 group-hover:opacity-40 transition duration-500" />
            <img
              src="/icon.png"
              alt="Product Discovery & Teardown Studio"
              className="relative w-16 h-16 rounded-2xl object-contain shadow-lg ring-1 ring-black/5"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1A202C] mb-3">
            Discover any product like a{' '}
            <span className="text-[#4355B9]">
              Pro PM
            </span>
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-[#4355B9] to-[#2563EB] rounded-full mx-auto mb-3 shadow-xs" />
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
            Generate framework-backed research prompts across 6 strategic pillars, guide multi-LLM teardowns, and synthesize insights into presentation decks.
          </p>
        </div>

        {/* Curated Presets Bar */}
        <div className="w-full mb-6">
          <QuickPresets
            onSelectPreset={handleSelectPreset}
            currentName={state.product.name}
          />
        </div>

        {/* Main Product Input Form Card */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className={`w-full rounded-2xl p-5 sm:p-8 relative transition-all duration-300 border ${
            isAllFilled
              ? 'glass-panel-elevated ring-1 ring-[#4355B9]/25 shadow-md'
              : 'glass-panel'
          }`}
        >
          {/* Card Dynamic Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#E2E8F0] gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-300 ${
                  isAllFilled
                    ? 'bg-[#107C41] shadow-[0_0_8px_rgba(16,124,65,0.4)]'
                    : 'bg-[#C07818] shadow-[0_0_6px_rgba(192,120,24,0.4)] animate-pulse'
                }`}
              />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1A202C] truncate">
                {isAllFilled ? (
                  <span
                    className="flex items-center gap-1.5 truncate max-w-xs sm:max-w-md"
                    title={`${state.product.name} (${state.product.companyName})`}
                  >
                    <span className="text-[#1A202C] font-semibold truncate">
                      Target:{' '}
                      {state.product.name.length > 40
                        ? `${state.product.name.slice(0, 40)}...`
                        : state.product.name}
                    </span>
                    <span className="text-[#64748B] font-normal truncate">
                      (
                      {state.product.companyName.length > 30
                        ? `${state.product.companyName.slice(0, 30)}...`
                        : state.product.companyName}
                      )
                    </span>
                  </span>
                ) : (
                  <span>Specify Product Target</span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`text-[11px] font-mono px-2.5 py-0.5 rounded border transition-colors ${
                  isAllFilled
                    ? 'bg-[#107C41]/10 text-[#107C41] border-[#107C41]/30 font-semibold'
                    : 'bg-[#F1F5F9] text-[#64748B] border-[#E2E8F0]'
                }`}
              >
                {isAllFilled
                  ? 'READY TO GENERATE'
                  : `${filledRequiredCount}/${requiredCount} REQUIRED FIELDS`}
              </span>
            </div>
          </div>

          {/* Form Fields Stack */}
          <div className="flex flex-col gap-6">
            {/* 1.1 Product Name Input */}
            <ProductNameInput
              value={state.product.name}
              onChange={(val) => handleUpdate('name', val)}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
              error={getNameError()}
              touched={touched.name}
              shakeTrigger={shakeTrigger}
            />

            {/* 1.1 Company Name Input */}
            <CompanyNameInput
              value={state.product.companyName}
              onChange={(val) => handleUpdate('companyName', val)}
              onBlur={() => setTouched((prev) => ({ ...prev, companyName: true }))}
              error={getCompanyError()}
              touched={touched.companyName}
              shakeTrigger={shakeTrigger}
            />

            {/* 1.1 Category Selector */}
            <CategorySelector
              value={state.product.category}
              onChange={(val) => handleUpdate('category', val)}
            />

            {/* 1.1 Platform Selector */}
            <PlatformSelector
              value={state.product.platform}
              onChange={(val) => handleUpdate('platform', val)}
            />

            {/* 1.1 Business Model Selector */}
            <BusinessModelSelector
              value={state.product.businessModel}
              onChange={(val) => handleUpdate('businessModel', val)}
            />

            {/* 1.1 Additional Context (Optional) */}
            <div className="flex flex-col gap-2">
              <AdditionalContext
                value={state.product.additionalContext}
                onChange={(val) => handleUpdate('additionalContext', val)}
              />

              {/* Edge Case: Unknown/Niche Product Guidance Tip */}
              <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-2.5 text-xs text-[#64748B]">
                <Info className="w-4 h-4 text-[#0284C7] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <span className="text-[#1A202C] font-medium">Early-stage or niche product?</span>{' '}
                  Public AI data may be limited. Add known user personas, workflows, or target
                  monetization to <span className="text-[#4355B9] font-medium">Additional Context</span> for
                  sharper prompt synthesis.
                </p>
              </div>
            </div>
          </div>

          {/* Pillars Coverage Preview (Empty state -> filled state feedback) */}
          <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#107C41]" />
                <span>6 Research Pillars to be Composed</span>
              </span>
              <span className="text-[11px] font-mono text-[#107C41] font-semibold">100% Client-Side AST</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PILLARS.map((p) => (
                <div
                  key={p.id}
                  className={`p-2.5 rounded-lg border text-xs transition-all duration-200 flex items-center gap-2 ${
                    isAllFilled
                      ? 'bg-[#F8FAFC] border-[#E2E8F0] text-[#1A202C]'
                      : 'bg-[#F8FAFC]/50 border-[#E2E8F0]/60 text-[#64748B]'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      backgroundColor: p.color,
                      boxShadow: isAllFilled ? `0 0 6px ${p.color}50` : 'none',
                    }}
                  />
                  <span className="truncate font-medium">{p.shortTitle}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Action Footer */}
          <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#64748B] order-2 sm:order-1">
              <ShieldCheck className="w-4 h-4 text-[#107C41] shrink-0" />
              <span>Zero server dependencies • Client-side privacy</span>
            </div>

            <div
              className="w-full sm:w-auto order-1 sm:order-2 flex flex-col items-center sm:items-end gap-1.5"
              onClick={() => {
                if (!isFormValid) {
                  setTouched({ name: true, companyName: true })
                  setShakeTrigger((prev) => prev + 1)
                }
              }}
            >
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2.5 group cursor-pointer ${
                  isFormValid
                    ? 'bg-gradient-to-r from-[#4355B9] via-[#4F62C8] to-[#5C6EC9] text-white hover:shadow-[0_4px_16px_rgba(67,85,185,0.3)] hover:scale-[1.01] active:scale-[0.99]'
                    : 'bg-[#EDF2F7] text-[#94A3B8] border border-[#E2E8F0] cursor-not-allowed'
                }`}
                title={
                  isFormValid
                    ? 'Proceed to prompt generation'
                    : 'Please fill in product name and company to proceed'
                }
              >
                <span>Generate Research Prompts</span>
                <ArrowRight
                  className={`w-4 h-4 transition-transform ${
                    isFormValid ? 'group-hover:translate-x-1' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {!isFormValid && (touched.name || touched.companyName) && (
                  <motion.span
                    initial={{ opacity: 0, y: -2 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -2 }}
                    className="text-[11px] text-[#C07818] flex items-center gap-1 font-mono"
                  >
                    <AlertTriangle className="w-3 h-3" />
                    Complete required fields to continue
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </form>

        {/* Helpful Footnote */}
        <div className="mt-6 flex items-center gap-2 text-xs text-[#64748B] font-mono">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#107C41]" />
          <span>Press Enter anywhere in the form to generate prompts</span>
        </div>
      </div>
    </PageTransition>
  )
}
