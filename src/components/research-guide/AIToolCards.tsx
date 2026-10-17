import React from 'react'
import { ExternalLink, Sparkles, Lightbulb } from 'lucide-react'

interface AITool {
  id: string
  name: string
  model: string
  provider: string
  badge: string
  bestFor: string
  accentColor: string
  url: string
  strengths: string[]
}

const AI_TOOLS: AITool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT Plus / Pro',
    model: 'GPT-4o & Canvas',
    provider: 'OpenAI',
    badge: 'Interactive Teardowns',
    bestFor: 'Broad exploratory research with conversational follow-up questions.',
    accentColor: '#10A37F',
    url: 'https://chat.openai.com',
    strengths: [
      'Canvas interface enables real-time editing of output blocks',
      'Strong creative synthesis for Jobs-to-be-Done and personas',
      'Extensive domain familiarity with modern software stacks',
    ],
  },
  {
    id: 'gemini',
    name: 'Google Gemini Advanced',
    model: 'Gemini 2.0 Pro',
    provider: 'Google DeepMind',
    badge: 'Live Web Grounding',
    bestFor: 'Web-grounded research with Google search indexing and real-time recency.',
    accentColor: '#38BDF8',
    url: 'https://gemini.google.com',
    strengths: [
      'Huge context window handles extensive prompt requirements effortlessly',
      'Google Search grounding surfaces fresh press releases and recent pivots',
      'Seamless export to Google Docs and Google Workspace ecosystem',
    ],
  },
  {
    id: 'claude',
    name: 'Claude Pro',
    model: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    badge: 'Nuanced Systems Analysis',
    bestFor: 'Deep architectural reasoning, structured tables, and rigorous Markdown formatting.',
    accentColor: '#D97706',
    url: 'https://claude.ai',
    strengths: [
      'Highest fidelity adherence to complex multi-part Markdown instructions',
      'Artifacts panel keeps code, matrices, and teardown sections cleanly isolated',
      'Exceptional analytical skepticism — avoids superficial hype or marketing fluff',
    ],
  },
  {
    id: 'perplexity',
    name: 'Perplexity Pro',
    model: 'Sonar / Pro Search',
    provider: 'Perplexity AI',
    badge: 'Verifiable Citations',
    bestFor: 'Citation-rich research with explicit public source URLs and quantitative verification.',
    accentColor: '#22D3EE',
    url: 'https://www.perplexity.ai',
    strengths: [
      'Embeds clickable footnotes and links to official blogs and filings',
      'Pro Search iteratively queries multiple angles to verify factual metrics',
      'Filters by domain (academic, tech blogs, social sentiment on Reddit)',
    ],
  },
]

export const AIToolCards: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Recommended AI Research Engines
          </h2>
          <p className="text-xs text-[#8B93B0] mt-0.5">
            Select the tool best matched to your research style, or combine them for maximum rigor.
          </p>
        </div>

        <span className="text-xs font-mono text-[#8B93B0] flex items-center gap-1.5 self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-[#FBBF24]" />
          <span>All 4 engines tested with our prompts</span>
        </span>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {AI_TOOLS.map((tool) => (
          <div
            key={tool.id}
            className="rounded-2xl glass-panel border border-[#232A44] hover:border-[#7C5CFC]/50 transition-all p-5 flex flex-col justify-between group"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm font-mono shrink-0"
                    style={{
                      backgroundColor: `${tool.accentColor}18`,
                      border: `1px solid ${tool.accentColor}40`,
                      color: tool.accentColor,
                    }}
                  >
                    {tool.name.charAt(0)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-base group-hover:text-[#CABEFF] transition-colors">
                        {tool.name}
                      </h3>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-medium hidden sm:inline"
                        style={{
                          backgroundColor: `${tool.accentColor}15`,
                          color: tool.accentColor,
                          border: `1px solid ${tool.accentColor}30`,
                        }}
                      >
                        {tool.badge}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-[#8B93B0] flex items-center gap-2 mt-0.5">
                      <span>{tool.provider}</span>
                      <span>•</span>
                      <span className="text-[#CBD5E1]">{tool.model}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-[#141A2D] hover:bg-[#202744] text-[#8B93B0] hover:text-white border border-[#262E4C] transition-colors cursor-pointer shrink-0"
                  title={`Open ${tool.name} in new tab`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Best For Callout */}
              <div className="p-2.5 rounded-xl bg-[#090D18] border border-[#1E253D] text-xs text-[#CBD5E1] mb-3">
                <strong className="text-white font-semibold">Best for: </strong>
                {tool.bestFor}
              </div>

              {/* Strengths List */}
              <ul className="space-y-1.5 mb-4 text-xs text-[#94A3B8]">
                {tool.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#64748B] mt-0.5">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Launch Action */}
            <div className="pt-3 border-t border-[#1F263E] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#8B93B0]">
                External LLM Session
              </span>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-[#7C5CFC] hover:text-[#9B7FFF] flex items-center gap-1 transition-colors"
              >
                <span>Launch {tool.name.split(' ')[0]}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Tip Callout Card */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#7C5CFC]/15 via-[#38BDF8]/10 to-transparent border border-[#7C5CFC]/30 flex items-start gap-3 text-xs leading-relaxed">
        <Lightbulb className="w-5 h-5 text-[#FBBF24] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white uppercase tracking-wider font-mono mr-1.5">
            PRO STRATEGY:
          </span>
          <span className="text-[#CBD5E1]">
            Use <strong>Perplexity</strong> first to gather quantitative market sizing, pricing tables, and verified citations. Then take the raw factual findings into <strong>Claude</strong> or <strong>ChatGPT</strong> with our prompts to synthesize deep architectural, psychological, and strategic teardowns.
          </span>
        </div>
      </div>
    </div>
  )
}
