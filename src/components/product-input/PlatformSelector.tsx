import React from 'react'
import { motion } from 'framer-motion'
import { Smartphone, Globe, Monitor, Laptop, LucideIcon } from 'lucide-react'
import { Platform } from '../../types'

interface PlatformSelectorProps {
  value: Platform
  onChange: (val: Platform) => void
}

interface PlatformOption {
  label: Platform
  icon: LucideIcon
  hint: string
}

const PLATFORMS: PlatformOption[] = [
  { label: 'Cross-platform', icon: Laptop, hint: 'Multi-device ecosystem' },
  { label: 'Web', icon: Globe, hint: 'Browser-first' },
  { label: 'Mobile', icon: Smartphone, hint: 'iOS & Android' },
  { label: 'Desktop', icon: Monitor, hint: 'macOS & Windows' },
]

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-[#1A202C] flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-[#107C41]" />
          <span>Primary Platform</span>
        </label>
        <span className="text-[11px] text-[#64748B]">Target Environment</span>
      </div>

      <div
        role="radiogroup"
        aria-label="Platform"
        className="grid grid-cols-2 sm:grid-cols-4 gap-2"
      >
        {PLATFORMS.map((plat) => {
          const isSelected = value === plat.label
          const Icon = plat.icon

          return (
            <button
              key={plat.label}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(plat.label)}
              className={`relative flex flex-col items-center justify-center p-3 min-h-[44px] rounded-xl border text-center transition-all duration-200 outline-none cursor-pointer ${
                isSelected
                  ? 'bg-[#EDF2F7] text-[#1A202C] border-[#107C41] shadow-xs ring-1 ring-[#107C41]/30 font-semibold'
                  : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#1A202C] hover:bg-[#F8FAFC]'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="platform-indicator-bg"
                  className="absolute inset-0 bg-gradient-to-b from-[#107C41]/08 to-transparent rounded-xl pointer-events-none"
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                />
              )}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1.5 transition-colors ${
                  isSelected ? 'bg-[#107C41]/15 text-[#107C41]' : 'bg-[#F1F5F9] text-[#64748B]'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold leading-tight">{plat.label}</span>
              <span className="text-[10px] text-[#64748B] mt-0.5 font-normal truncate max-w-full">
                {plat.hint}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
