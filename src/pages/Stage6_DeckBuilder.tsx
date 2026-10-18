import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Presentation, Download, RotateCcw } from 'lucide-react'
import { PageTransition } from '../components/layout/PageTransition'
import { useApp } from '../context/AppContext'

export const Stage6_DeckBuilder: React.FC = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useApp()

  const handleReset = () => {
    dispatch({ type: 'RESET_STATE' })
    navigate('/')
  }

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Stage Tracker */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CBD5E1] text-xs text-[#4355B9] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-pulse" />
            <span>STAGE 06 / 06 : DELIVERY</span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="text-[#7C3AED]">BUILD YOUR DECK</span>
          </div>

          <div className="text-xs text-[#64748B]">
            Executive Presentation Studio
          </div>
        </div>

        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A202C] mb-2">
            Build Your Teardown Slide Deck
          </h1>
          <p className="text-sm text-[#64748B] max-w-2xl">
            Export presentation-ready slides directly to PowerPoint (.pptx) or PDF. Choose themes, reorder sections, and present with PM executive polish.
          </p>
        </div>

        {/* Deck Preview Canvas */}
        <div className="w-full bg-white rounded-2xl p-8 border border-[#E2E8F0] mb-8 flex flex-col items-center justify-center min-h-[320px] text-center relative overflow-hidden shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-[#EEF2FF] border border-[#CBD5E1] flex items-center justify-center text-[#4355B9] mb-4 shadow-xs">
            <Presentation className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#1A202C] mb-1">
            {state.product.name} Executive Teardown
          </h3>
          <p className="text-xs text-[#64748B] mb-6 max-w-md">
            Prepared with the 6-Pillar Product Intelligence Protocol • Strategy, Market, Craft, Tech, Psychology, Ethics
          </p>
          <div className="flex items-center gap-3">
            <button
              disabled
              className="px-4 py-2 rounded-xl bg-[#F8FAFC] text-xs font-semibold text-[#94A3B8] border border-[#E2E8F0] flex items-center gap-2 cursor-not-allowed opacity-75"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export .PPTX (Stage 6)</span>
            </button>
            <button
              disabled
              className="px-4 py-2 rounded-xl bg-[#F8FAFC] text-xs font-semibold text-[#94A3B8] border border-[#E2E8F0] flex items-center gap-2 cursor-not-allowed opacity-75"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF (Stage 6)</span>
            </button>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-[#E2E8F0]">
          <button
            onClick={() => navigate('/insights')}
            className="px-4 py-2 rounded-xl bg-white border border-[#CBD5E1] text-sm text-[#64748B] hover:text-[#1A202C] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 cursor-pointer shadow-xs font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights</span>
          </button>

          <button
            onClick={handleReset}
            className="px-5 py-2 rounded-xl bg-white border border-[#CBD5E1] text-sm text-[#64748B] hover:text-[#C0392B] hover:border-[#C0392B]/40 hover:bg-[#FEF2F2] transition-colors flex items-center gap-2 cursor-pointer shadow-xs font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start New Teardown</span>
          </button>
        </div>
      </div>
    </PageTransition>
  )
}
