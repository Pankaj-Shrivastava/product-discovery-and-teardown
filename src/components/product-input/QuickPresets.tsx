import React from 'react'
import { Sparkles } from 'lucide-react'
import { ProductInput } from '../../types'

interface QuickPresetsProps {
  onSelectPreset: (preset: ProductInput) => void
  currentName?: string
}

export const PRESET_PRODUCTS: Array<{
  name: string
  companyName: string
  category: ProductInput['category']
  platform: ProductInput['platform']
  businessModel: ProductInput['businessModel']
  additionalContext: string
  tagline: string
}> = [
  {
    name: 'Linear',
    companyName: 'Linear Orbit, Inc.',
    category: 'Productivity & Tools',
    platform: 'Cross-platform',
    businessModel: 'B2B',
    additionalContext:
      'Focus on issue triage, keyboard-first velocity, syncing engine, and multiplayer workspace model.',
    tagline: 'Speed-obsessed issue tracker',
  },
  {
    name: 'Spotify',
    companyName: 'Spotify AB',
    category: 'Entertainment & Media',
    platform: 'Cross-platform',
    businessModel: 'B2C',
    additionalContext:
      'Analyze Discover Weekly algorithmic personalization, two-sided creator marketplace, and freemium retention levers.',
    tagline: 'Audio streaming & personalization',
  },
  {
    name: 'Figma',
    companyName: 'Figma, Inc.',
    category: 'Productivity & Tools',
    platform: 'Web',
    businessModel: 'B2B',
    additionalContext:
      'Explore multiplayer canvas rendering, community plugin monetization, and bottom-up team adoption.',
    tagline: 'Collaborative interface design',
  },
  {
    name: 'Notion',
    companyName: 'Notion Labs, Inc.',
    category: 'Productivity & Tools',
    platform: 'Cross-platform',
    businessModel: 'B2B',
    additionalContext:
      'Focus on block-based architecture, template creator economy, AI assistant integration, and modular workspace adoption.',
    tagline: 'Connected workspace & wiki',
  },
]

export const QuickPresets: React.FC<QuickPresetsProps> = ({ onSelectPreset, currentName }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs text-[#64748B]">
        <span className="flex items-center gap-1.5 font-medium text-[#1A202C]">
          <Sparkles className="w-3.5 h-3.5 text-[#4355B9]" />
          <span>Or populate from curated PM teardown templates:</span>
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESET_PRODUCTS.map((preset) => {
          const isActive = currentName?.toLowerCase() === preset.name.toLowerCase()

          return (
            <button
              key={preset.name}
              type="button"
              onClick={() => onSelectPreset(preset)}
              className={`px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-mono transition-all duration-150 flex items-center gap-2 cursor-pointer border ${
                isActive
                  ? 'bg-[#4355B9]/10 text-[#4355B9] border-[#4355B9] shadow-xs font-semibold'
                  : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#4355B9]/40 hover:text-[#1A202C] hover:bg-[#F8FAFC]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#107C41]" />
              <span className="font-semibold text-[#1A202C]">{preset.name}</span>
              <span className="text-[#64748B] text-[10px] hidden sm:inline">
                ({preset.tagline})
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
