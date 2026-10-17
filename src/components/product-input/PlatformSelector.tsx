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
        <label className="text-sm font-semibold text-white flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-[#34D399]" />
          <span>Primary Platform</span>
        </label>
        <span className="text-[11px] font-mono text-[#8B93B0]">Target Environment</span>
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
                  ? 'bg-[#1C2237] text-white border-[#34D399] shadow-[0_0_16px_rgba(52,211,153,0.2)] ring-1 ring-[#34D399]/40'
                  : 'bg-[#131827]/80 text-[#8B93B0] border-[#2A3150] hover:border-[#3B4468] hover:text-[#F0F2F8] hover:bg-[#1C2237]/60'
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="platform-indicator-bg"
                  className="absolute inset-0 bg-gradient-to-b from-[#34D399]/10 to-transparent rounded-xl pointer-events-none"
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                />
              )}
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center mb-1.5 transition-colors ${
                  isSelected ? 'bg-[#34D399]/20 text-[#34D399]' : 'bg-[#1C2237] text-[#8B93B0]'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold leading-tight">{plat.label}</span>
              <span className="text-[10px] text-[#8B93B0] mt-0.5 font-normal truncate max-w-full">
                {plat.hint}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
