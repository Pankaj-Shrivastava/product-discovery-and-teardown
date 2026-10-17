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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C2237] border border-[#2A3150] text-xs font-mono text-[#CABEFF]">
            <span className="w-2 h-2 rounded-full bg-[#FB7185] animate-pulse" />
            <span>STAGE 05 / 06 : SYNTHESIS</span>
            <span className="text-[#2A3150]">•</span>
            <span className="text-[#FB7185]">INSIGHT EXPLORER</span>
          </div>

          <div className="text-xs font-mono text-[#8B93B0]">
            Target Product: <span className="text-white font-semibold">{state.product.name}</span>
          </div>
        </div>

        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Structured Teardown Knowledge Base
          </h1>
          <p className="text-sm text-[#8B93B0] max-w-2xl">
            Explore deterministically parsed insights, filter by strategic pillar, and pick high-impact findings to generate your executive teardown slide deck.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8B93B0] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search insights across all pillars, metrics, and frameworks..."
              className="w-full pl-10 pr-4 py-2 bg-[#131827] rounded-xl border border-[#2A3150] text-sm text-white placeholder:text-[#8B93B0] focus:outline-none focus:border-[#7C5CFC]"
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-xl bg-[#131827] border border-[#2A3150] text-xs font-medium text-[#8B93B0] hover:text-white flex items-center gap-1.5 cursor-pointer">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter Type</span>
            </button>
            <button className="px-3 py-2 rounded-xl bg-[#131827] border border-[#2A3150] text-xs font-medium text-[#8B93B0] hover:text-white flex items-center gap-1.5 cursor-pointer">
              <CheckSquare className="w-3.5 h-3.5 text-[#34D399]" />
              <span>Selected (0)</span>
            </button>
          </div>
        </div>

        {/* Pillar Tabs Preview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {PILLARS.map((p) => (
            <div
              key={p.id}
              className="p-3.5 rounded-xl glass-panel border border-[#2A3150] hover:border-[#7C5CFC]/50 transition-all flex flex-col justify-between cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-[10px] font-mono text-[#8B93B0]">Pillar 0{p.number}</span>
              </div>
              <div className="text-xs font-semibold text-white truncate">{p.shortTitle}</div>
              <div className="text-[11px] font-mono text-[#8B93B0] mt-1">Ready</div>
            </div>
          ))}
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-[#2A3150]">
          <button
            onClick={() => navigate('/upload')}
            className="px-4 py-2 rounded-xl bg-[#131827] border border-[#2A3150] text-sm text-[#8B93B0] hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Upload &amp; Parse</span>
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#9B7FFF] text-white font-semibold text-sm hover:shadow-[0_0_20px_rgba(124,92,252,0.4)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Proceed to Build Deck</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </PageTransition>
  )
}
