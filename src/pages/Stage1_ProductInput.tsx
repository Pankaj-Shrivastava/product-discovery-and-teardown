import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Target, Compass, Terminal } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { PageTransition } from '../components/layout/PageTransition'
import { PILLARS } from '../lib/constants'

export const Stage1_ProductInput: React.FC = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useApp()

  const handleNext = () => {
    dispatch({ type: 'COMPLETE_STAGE', payload: 1 })
    navigate('/prompts')
  }

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col items-center">
        {/* Stage Tracker Pill */}
        <div className="flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#1C2237] border border-[#2A3150] text-xs font-mono text-[#CABEFF]">
          <span className="w-2 h-2 rounded-full bg-[#7C5CFC] animate-ping" />
          <span>STAGE 01 / 06 : SPECIFICATION</span>
          <span className="text-[#2A3150]">•</span>
          <span className="text-[#34D399]">PRODUCT INGESTION</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-2xl mb-8 flex flex-col items-center">
          <div className="mb-4 relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#7C5CFC] via-[#38BDF8] to-[#34D399] rounded-2xl blur-md opacity-35 group-hover:opacity-60 transition duration-500" />
            <img
              src="/icon.png"
              alt="Product Discovery & Teardown Studio"
              className="relative w-16 h-16 rounded-2xl object-contain shadow-2xl ring-1 ring-white/10"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Discover any product like a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C5CFC] via-[#CABEFF] to-[#38BDF8]">Pro PM</span>
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-[#7C5CFC] to-[#38BDF8] rounded-full mx-auto mb-3 shadow-[0_0_12px_rgba(124,92,252,0.5)]" />
          <p className="text-sm sm:text-base text-[#8B93B0]">
            Generate framework-backed research prompts across 6 strategic pillars, guide multi-LLM teardowns, and synthesize insights into presentation decks.
          </p>
        </div>

        {/* Ingestion Preview Card */}
        <div className="w-full glass-panel-elevated rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          {/* Card Header Meta */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#2A3150]/60">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-white">
                Active Product Target: {state.product.name || 'Not Configured'}
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#8B93B0] bg-[#131827] px-2.5 py-0.5 rounded border border-[#2A3150]">
              PRECISION CALIBRATED
            </span>
          </div>

          {/* Quick Context Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-[#131827] border border-[#2A3150]">
              <div className="text-xs text-[#8B93B0] font-mono mb-1">01. PRODUCT</div>
              <div className="text-base font-semibold text-white">{state.product.name}</div>
              <div className="text-xs text-[#8B93B0] mt-0.5">{state.product.companyName}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#131827] border border-[#2A3150]">
              <div className="text-xs text-[#8B93B0] font-mono mb-1">02. CATEGORY &amp; MODEL</div>
              <div className="text-base font-semibold text-white">{state.product.category}</div>
              <div className="text-xs text-[#8B93B0] mt-0.5">{state.product.businessModel} • {state.product.platform}</div>
            </div>

            <div className="p-4 rounded-xl bg-[#131827] border border-[#2A3150]">
              <div className="text-xs text-[#8B93B0] font-mono mb-1">03. ACTIVE PROTOCOLS</div>
              <div className="text-base font-semibold text-[#34D399]">6 Strategic Pillars</div>
              <div className="text-xs text-[#8B93B0] mt-0.5">AST Parser Engine Ready</div>
            </div>
          </div>

          {/* Pillar Grid Preview */}
          <div className="mb-6">
            <div className="text-xs font-mono text-[#8B93B0] uppercase tracking-wider mb-3">
              Included Research Pillars
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {PILLARS.map((p) => (
                <div
                  key={p.id}
                  className="p-2.5 rounded-lg bg-[#131827]/70 border border-[#2A3150]/60 flex items-center gap-2"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: p.color }}
                  />
                  <span className="text-xs text-[#F0F2F8] truncate font-medium">
                    {p.shortTitle}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#2A3150]/60">
            <span className="text-xs text-[#8B93B0] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#34D399]" />
              Zero API keys required • Client-side privacy
            </span>
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#9B7FFF] text-white font-semibold text-sm hover:shadow-[0_0_20px_rgba(124,92,252,0.4)] transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Proceed to Prompt Generation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
