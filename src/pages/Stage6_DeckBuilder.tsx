import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Presentation, Download, Share2, Sparkles, RotateCcw } from 'lucide-react'
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C2237] border border-[#2A3150] text-xs font-mono text-[#CABEFF]">
            <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-pulse" />
            <span>STAGE 06 / 06 : DELIVERY</span>
            <span className="text-[#2A3150]">•</span>
            <span className="text-[#A78BFA]">BUILD YOUR DECK</span>
          </div>

          <div className="text-xs font-mono text-[#8B93B0]">
            Executive Presentation Studio
          </div>
        </div>

        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Build Your Teardown Slide Deck
          </h1>
          <p className="text-sm text-[#8B93B0] max-w-2xl">
            Export presentation-ready slides directly to PowerPoint (.pptx) or PDF. Choose themes, reorder sections, and present with PM executive polish.
          </p>
        </div>

        {/* Deck Preview Canvas */}
        <div className="w-full glass-panel-elevated rounded-2xl p-8 border border-[#2A3150] mb-8 flex flex-col items-center justify-center min-h-[320px] text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7C5CFC] to-[#38BDF8] flex items-center justify-center text-white mb-4 shadow-[0_0_24px_rgba(124,92,252,0.4)]">
            <Presentation className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">
            {state.product.name} Executive Teardown
          </h3>
          <p className="text-xs text-[#8B93B0] mb-6 max-w-md">
            Prepared with the 6-Pillar Product Intelligence Protocol • Strategy, Market, Craft, Tech, Psychology, Ethics
          </p>
          <div className="flex items-center gap-3">
            <button
              disabled
              className="px-4 py-2 rounded-xl bg-[#1C2237] text-xs font-semibold text-[#8B93B0] border border-[#2A3150] flex items-center gap-2 cursor-not-allowed opacity-75"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export .PPTX (Stage 6)</span>
            </button>
            <button
              disabled
              className="px-4 py-2 rounded-xl bg-[#1C2237] text-xs font-semibold text-[#8B93B0] border border-[#2A3150] flex items-center gap-2 cursor-not-allowed opacity-75"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF (Stage 6)</span>
            </button>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-[#2A3150]">
          <button
            onClick={() => navigate('/insights')}
            className="px-4 py-2 rounded-xl bg-[#131827] border border-[#2A3150] text-sm text-[#8B93B0] hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights</span>
          </button>

          <button
            onClick={handleReset}
            className="px-5 py-2 rounded-xl bg-[#131827] border border-[#2A3150] text-sm text-[#8B93B0] hover:text-[#EF4444] hover:border-[#EF4444]/40 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start New Teardown</span>
          </button>
        </div>
      </div>
    </PageTransition>
  )
}
