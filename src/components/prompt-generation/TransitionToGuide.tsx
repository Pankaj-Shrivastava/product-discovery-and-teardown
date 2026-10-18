import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Sparkles, ExternalLink } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const AI_TOOLS = [
  {
    name: 'ChatGPT Plus / Pro',
    model: 'GPT-4o / Canvas',
    color: '#107C41',
    badge: 'High Reasoning',
    url: 'https://chat.openai.com',
  },
  {
    name: 'Claude Pro',
    model: 'Claude 3.5 Sonnet',
    color: '#C07818',
    badge: 'Artifacts & Style',
    url: 'https://claude.ai',
  },
  {
    name: 'Google Gemini',
    model: 'Gemini 2.0 Pro',
    color: '#0284C7',
    badge: 'Deep Search & Recency',
    url: 'https://gemini.google.com',
  },
  {
    name: 'Perplexity AI',
    model: 'Sonar / Pro Search',
    color: '#2563EB',
    badge: 'Citations & Sources',
    url: 'https://www.perplexity.ai',
  },
]

interface TransitionToGuideProps {
  hasCustomEdits?: boolean
}

export const TransitionToGuide: React.FC<TransitionToGuideProps> = ({ hasCustomEdits = false }) => {
  const navigate = useNavigate()
  const { dispatch } = useApp()

  const handleProceed = () => {
    dispatch({ type: 'COMPLETE_STAGE', payload: 2 })
    navigate('/guide')
  }

  const handleBack = () => {
    if (hasCustomEdits) {
      const confirmed = window.confirm(
        'You have unsaved prompt edits in this session. Navigating back will keep them in memory for this session. Leave anyway?'
      )
      if (!confirmed) return
    }
    navigate('/')
  }

  return (
    <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
      {/* Recommended AI Tools Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-[#E2E8F0] mb-8 bg-white shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#107C41] animate-pulse" />
              <span className="text-xs font-mono font-semibold text-[#107C41] uppercase tracking-wider">
                Execution Playbook Ready
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-[#1A202C]">
              Take these prompts to your preferred AI intelligence tools
            </h4>
            <p className="text-xs text-[#64748B] max-w-xl mt-1">
              For best results, execute one pillar prompt per chat session. Then compile the findings into a single Markdown summary document for Stage 4 ingestion.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-[#64748B]">
            <Sparkles className="w-4 h-4 text-[#4355B9]" />
            <span>Multi-Model Compatible</span>
          </div>
        </div>

        {/* AI Tools Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {AI_TOOLS.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#4355B9]/40 hover:bg-white transition-all group flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#EDF2F7] text-[#64748B]">
                    {tool.badge}
                  </span>
                  <ExternalLink className="w-3 h-3 text-[#94A3B8] group-hover:text-[#4355B9] transition-colors" />
                </div>
                <div className="text-xs font-semibold text-[#1A202C] group-hover:text-[#4355B9] transition-colors">
                  {tool.name}
                </div>
              </div>
              <div className="text-[11px] font-mono text-[#64748B] mt-2">
                {tool.model}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <button
          type="button"
          onClick={handleBack}
          className="px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-xs sm:text-sm text-[#64748B] hover:text-[#1A202C] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 cursor-pointer font-medium shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Product Input</span>
        </button>

        <button
          type="button"
          onClick={handleProceed}
          className="px-6 py-3 rounded-xl bg-[#4355B9] hover:bg-[#364599] text-white font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <span>Continue to Research Guide</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
