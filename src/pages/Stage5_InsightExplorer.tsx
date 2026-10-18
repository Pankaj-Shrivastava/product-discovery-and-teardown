import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Search, Filter, CheckSquare } from 'lucide-react'
import { PageTransition } from '../components/layout/PageTransition'
import { useApp } from '../context/AppContext'
import { PILLARS } from '../lib/constants'

export const Stage5_InsightExplorer: React.FC = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useApp()

  const handleNext = () => {
    dispatch({ type: 'COMPLETE_STAGE', payload: 5 })
    navigate('/deck')
  }

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Stage Tracker */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CBD5E1] text-xs text-[#4355B9] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#C0392B] animate-pulse" />
            <span>STAGE 05 / 06 : SYNTHESIS</span>
            <span className="text-[#CBD5E1]">•</span>
            <span className="text-[#C0392B]">INSIGHT EXPLORER</span>
          </div>

          <div className="text-xs text-[#64748B]">
            Target Product: <span className="text-[#1A202C] font-semibold">{state.product.name}</span>
          </div>
        </div>

        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A202C] mb-2">
            Structured Teardown Knowledge Base
          </h1>
          <p className="text-sm text-[#64748B] max-w-2xl">
            Explore deterministically parsed insights, filter by strategic pillar, and pick high-impact findings to generate your executive teardown slide deck.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search insights across all pillars, metrics, and frameworks..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-[#CBD5E1] text-sm text-[#1A202C] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#4355B9] focus:ring-2 focus:ring-[#4355B9]/20 shadow-xs"
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-xl bg-white border border-[#CBD5E1] text-xs font-medium text-[#64748B] hover:text-[#1A202C] hover:bg-[#F8FAFC] flex items-center gap-1.5 cursor-pointer shadow-xs">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter Type</span>
            </button>
            <button className="px-3 py-2 rounded-xl bg-white border border-[#CBD5E1] text-xs font-medium text-[#64748B] hover:text-[#1A202C] hover:bg-[#F8FAFC] flex items-center gap-1.5 cursor-pointer shadow-xs">
              <CheckSquare className="w-3.5 h-3.5 text-[#107C41]" />
              <span>Selected (0)</span>
            </button>
          </div>
        </div>

        {/* Pillar Tabs Preview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {PILLARS.map((p) => (
            <div
              key={p.id}
              className="p-3.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#4355B9]/50 hover:shadow-sm transition-all flex flex-col justify-between cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-[10px] text-[#64748B]">Pillar 0{p.number}</span>
              </div>
              <div className="text-xs font-semibold text-[#1A202C] truncate">{p.shortTitle}</div>
              <div className="text-[11px] text-[#64748B] mt-1">Ready</div>
            </div>
          ))}
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-[#E2E8F0]">
          <button
            onClick={() => navigate('/upload')}
            className="px-4 py-2 rounded-xl bg-white border border-[#CBD5E1] text-sm text-[#64748B] hover:text-[#1A202C] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 cursor-pointer shadow-xs font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Upload &amp; Parse</span>
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-[#4355B9] hover:bg-[#364599] text-white font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Proceed to Build Deck</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </PageTransition>
  )
}
