import React from 'react'
import {
  Copy,
  ExternalLink,
  Search,
  RefreshCw,
  FileCheck2,
  ArrowRight,
} from 'lucide-react'

const STEPS = [
  {
    step: '01',
    title: 'Copy a Prompt',
    subtitle: 'From Stage 2',
    description: 'Grab one of your 6 framework-grounded prompts from the previous stage.',
    icon: Copy,
    accent: '#7C5CFC',
  },
  {
    step: '02',
    title: 'Open an AI Tool',
    subtitle: 'Claude, ChatGPT, etc.',
    description: 'Open your preferred LLM with web browsing or deep research capabilities enabled.',
    icon: ExternalLink,
    accent: '#38BDF8',
  },
  {
    step: '03',
    title: 'Paste & Research',
    subtitle: 'Let the AI analyze',
    description: 'Paste the prompt. The AI executes systematically across all lenses and frameworks.',
    icon: Search,
    accent: '#34D399',
  },
  {
    step: '04',
    title: 'Repeat for 6 Pillars',
    subtitle: 'Full strategic depth',
    description: 'Execute each pillar in a fresh chat session for focused, unconstrained research.',
    icon: RefreshCw,
    accent: '#FBBF24',
  },
  {
    step: '05',
    title: 'Compile Summary',
    subtitle: 'Single Markdown doc',
    description: 'Combine all findings under the 6 pillar headings using our template or NotebookLM.',
    icon: FileCheck2,
    accent: '#FB7185',
  },
]

export const ResearchWorkflowSteps: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            5-Step Research Execution Protocol
          </h2>
          <p className="text-xs text-[#8B93B0] mt-0.5">
            Follow this recommended sequence to generate exhaustive, evidence-backed product intelligence.
          </p>
        </div>
        <span className="hidden sm:inline-block text-xs font-mono text-[#7C5CFC] px-2.5 py-1 rounded-full bg-[#7C5CFC]/10 border border-[#7C5CFC]/25">
          STANDARD PROTOCOL
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {STEPS.map((stepItem, idx) => {
          const Icon = stepItem.icon
          return (
            <div
              key={stepItem.step}
              className="relative p-4 rounded-xl glass-panel border border-[#232A44] hover:border-[#7C5CFC]/40 transition-all flex flex-col justify-between group overflow-hidden"
            >
              {/* Top Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: stepItem.accent }}
              />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="font-mono text-xs font-bold px-2 py-0.5 rounded-md"
                    style={{
                      backgroundColor: `${stepItem.accent}15`,
                      color: stepItem.accent,
                      border: `1px solid ${stepItem.accent}30`,
                    }}
                  >
                    STEP {stepItem.step}
                  </span>

                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${stepItem.accent}15`,
                      color: stepItem.accent,
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white mb-0.5 group-hover:text-[#F1F5F9] transition-colors">
                  {stepItem.title}
                </h3>
                <div className="text-[11px] font-mono text-[#7C5CFC] mb-2 font-medium">
                  {stepItem.subtitle}
                </div>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {stepItem.description}
                </p>
              </div>

              {idx < STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[#475569] pointer-events-none">
                  <ArrowRight className="w-4 h-4 opacity-40" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
