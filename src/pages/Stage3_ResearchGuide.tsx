import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, BookOpen, Bot, FileText, CheckCircle, ExternalLink } from 'lucide-react'
import { PageTransition } from '../components/layout/PageTransition'
import { useApp } from '../context/AppContext'

const AI_TOOLS = [
  {
    name: 'Perplexity AI',
    badge: 'Recommended for Citations',
    accent: '#38BDF8',
    description: 'Best for web-grounded market figures, pricing tiers, and competitor benchmarks.',
    link: 'https://www.perplexity.ai',
  },
  {
    name: 'Claude 3.7 / Opus',
    badge: 'Best for Architecture & Depth',
    accent: '#A78BFA',
    description: 'Superior for nuanced technical trade-offs, UX teardowns, and behavioral psychology.',
    link: 'https://claude.ai',
  },
  {
    name: 'ChatGPT / GPT-4o',
    badge: 'Fast & Versatile',
    accent: '#34D399',
    description: 'Great for general strategic framing, business model canvas, and rapid summaries.',
    link: 'https://chat.openai.com',
  },
  {
    name: 'Google Gemini',
    badge: 'Multimodal & Ecosystem',
    accent: '#FBBF24',
    description: 'Excellent for deep research reports, large context windows, and Google workspace synthesis.',
    link: 'https://gemini.google.com',
  },
]

export const Stage3_ResearchGuide: React.FC = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useApp()

  const handleNext = () => {
    dispatch({ type: 'COMPLETE_STAGE', payload: 3 })
    navigate('/upload')
  }

  return (
    <PageTransition>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Stage Tracker */}
        <div className="flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-[#1C2237] border border-[#2A3150] text-xs font-mono text-[#CABEFF] w-fit">
          <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
          <span>STAGE 03 / 06 : PROTOCOL</span>
          <span className="text-[#2A3150]">•</span>
          <span className="text-[#34D399]">RESEARCH GUIDE</span>
        </div>

        {/* Hero */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Execute Multi-LLM Research Protocol
          </h1>
          <p className="text-sm text-[#8B93B0] max-w-2xl">
            Run the 6 generated prompts in your favorite AI research tools. Then copy the answers into a single markdown summary file to upload in Stage 4.
          </p>
        </div>

        {/* 3 Step Protocol Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-panel p-5 rounded-xl border border-[#2A3150]">
            <div className="w-7 h-7 rounded-lg bg-[#7C5CFC]/20 text-[#CABEFF] flex items-center justify-center font-mono font-bold text-xs mb-3">
              01
            </div>
            <h3 className="text-base font-semibold text-white mb-1">Paste &amp; Prompt</h3>
            <p className="text-xs text-[#8B93B0] leading-relaxed">
              Copy each pillar prompt into Perplexity or Claude with web search enabled.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-[#2A3150]">
            <div className="w-7 h-7 rounded-lg bg-[#38BDF8]/20 text-[#38BDF8] flex items-center justify-center font-mono font-bold text-xs mb-3">
              02
            </div>
            <h3 className="text-base font-semibold text-white mb-1">Synthesize into Markdown</h3>
            <p className="text-xs text-[#8B93B0] leading-relaxed">
              Aggregate the responses into a markdown document using `## Pillar Name` headings.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-xl border border-[#2A3150]">
            <div className="w-7 h-7 rounded-lg bg-[#34D399]/20 text-[#34D399] flex items-center justify-center font-mono font-bold text-xs mb-3">
              03
            </div>
            <h3 className="text-base font-semibold text-white mb-1">Drop &amp; Deterministic Parse</h3>
            <p className="text-xs text-[#8B93B0] leading-relaxed">
              Drop the summary document into Stage 4. Zero LLMs, 100% deterministic local AST parsing.
            </p>
          </div>
        </div>

        {/* Recommended AI Tools */}
        <div className="mb-8">
          <h2 className="text-sm font-mono text-[#8B93B0] uppercase tracking-wider mb-4">
            Recommended Research Engines
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AI_TOOLS.map((tool) => (
              <a
                key={tool.name}
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl glass-panel border border-[#2A3150] hover:border-[#7C5CFC]/50 transition-all group flex items-start justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-white group-hover:text-[#CABEFF] transition-colors">
                      {tool.name}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-mono"
                      style={{
                        backgroundColor: `${tool.accent}15`,
                        color: tool.accent,
                        border: `1px solid ${tool.accent}30`,
                      }}
                    >
                      {tool.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#8B93B0] leading-relaxed">{tool.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-[#8B93B0] group-hover:text-white shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-[#2A3150]">
          <button
            onClick={() => navigate('/prompts')}
            className="px-4 py-2 rounded-xl bg-[#131827] border border-[#2A3150] text-sm text-[#8B93B0] hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Prompts</span>
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#9B7FFF] text-white font-semibold text-sm hover:shadow-[0_0_20px_rgba(124,92,252,0.4)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Proceed to Upload &amp; Parse</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </PageTransition>
  )
}
