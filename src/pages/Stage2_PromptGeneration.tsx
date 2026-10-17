import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Copy } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { PageTransition } from '../components/layout/PageTransition'
import { PILLARS } from '../lib/constants'
import { composeAllPrompts } from '../lib/prompt-engine/composer'

export const Stage2_PromptGeneration: React.FC = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useApp()

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

  const handleNext = () => {
    dispatch({ type: 'COMPLETE_STAGE', payload: 2 })
    navigate('/guide')
  }

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Stage Tracker Pill */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C2237] border border-[#2A3150] text-xs font-mono text-[#CABEFF]">
            <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
            <span>STAGE 02 / 06 : GENERATION</span>
            <span className="text-[#2A3150]">•</span>
            <span className="text-[#38BDF8]">RESEARCH PROMPTS</span>
          </div>
          <span className="text-xs font-mono text-[#8B93B0]">6 Pillar Prompts Loaded</span>
        </div>

        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Multi-Pillar Research Prompts for <span className="text-[#7C5CFC]">{state.product.name}</span>
          </h1>
          <p className="text-sm text-[#8B93B0] max-w-2xl">
            Each prompt is algorithmically composed from domain-specific PM research skills, framing rigorous questions across 6 core strategic dimensions.
          </p>
        </div>

        {/* 6-Pillar Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="glass-panel rounded-xl p-5 border border-[#2A3150] hover:border-[#7C5CFC]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold"
                    style={{
                      backgroundColor: pillar.bgColor,
                      color: pillar.color,
                      border: `1px solid ${pillar.borderColor}`,
                    }}
                  >
                    PILLAR 0{pillar.number}
                  </span>
                  <span className="text-xs text-[#8B93B0] font-mono">Framework v3</span>
                </div>

                <h3 className="text-base font-semibold text-white mb-1.5">{pillar.title}</h3>
                <p className="text-xs text-[#8B93B0] leading-relaxed mb-4">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#2A3150]/60 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#8B93B0]">Ready to copy</span>
                <button
                  type="button"
                  className="px-3 py-1 rounded bg-[#1C2237] hover:bg-[#2A3150] text-xs font-medium text-[#F0F2F8] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-[#7C5CFC]" />
                  <span>Copy Prompt</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-[#2A3150]">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 rounded-xl bg-[#131827] border border-[#2A3150] text-sm text-[#8B93B0] hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Product Input</span>
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#9B7FFF] text-white font-semibold text-sm hover:shadow-[0_0_20px_rgba(124,92,252,0.4)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Proceed to Research Guide</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </PageTransition>
  )
}
