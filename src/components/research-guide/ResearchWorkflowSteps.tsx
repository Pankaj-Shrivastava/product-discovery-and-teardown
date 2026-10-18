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
    accent: '#4355B9',
  },
  {
    step: '02',
    title: 'Open an AI Tool',
    subtitle: 'Claude, ChatGPT, etc.',
    description: 'Open your preferred LLM with web browsing or deep research capabilities enabled.',
    icon: ExternalLink,
    accent: '#2563EB',
  },
  {
    step: '03',
    title: 'Paste & Research',
    subtitle: 'Let the AI analyze',
    description: 'Paste the prompt. The AI executes systematically across all lenses and frameworks.',
    icon: Search,
    accent: '#107C41',
  },
  {
    step: '04',
    title: 'Repeat for 6 Pillars',
    subtitle: 'Full strategic depth',
    description: 'Execute each pillar in a fresh chat session for focused, unconstrained research.',
    icon: RefreshCw,
    accent: '#C07818',
  },
  {
    step: '05',
    title: 'Compile Summary',
    subtitle: 'Single Markdown doc',
    description: 'Combine all findings under the 6 pillar headings using our template or NotebookLM.',
    icon: FileCheck2,
    accent: '#C0392B',
  },
]

export const ResearchWorkflowSteps: React.FC = () => {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-[#1A202C] tracking-tight">
            5-Step Research Execution Protocol
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Follow this recommended sequence to generate exhaustive, evidence-backed product intelligence.
          </p>
        </div>
        <span className="hidden sm:inline-block text-xs text-[#4355B9] px-2.5 py-1 rounded-full bg-[#4355B9]/10 border border-[#4355B9]/25 font-semibold">
          STANDARD PROTOCOL
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {STEPS.map((stepItem, idx) => {
          const Icon = stepItem.icon
          return (
            <div
              key={stepItem.step}
              className="relative p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#4355B9]/40 hover:shadow-md transition-all flex flex-col justify-between group overflow-hidden shadow-xs"
            >
              {/* Top Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: stepItem.accent }}
              />

              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-md"
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

                <h3 className="text-sm font-bold text-[#1A202C] mb-0.5 transition-colors">
                  {stepItem.title}
                </h3>
                <div className="text-[11px] text-[#4355B9] mb-2 font-medium">
                  {stepItem.subtitle}
                </div>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {stepItem.description}
                </p>
              </div>

              {idx < STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[#94A3B8] pointer-events-none">
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
