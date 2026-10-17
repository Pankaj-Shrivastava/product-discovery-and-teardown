import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Building, Users, ShoppingCart, Cpu, LucideIcon } from 'lucide-react'
import { BusinessModel } from '../../types'

interface BusinessModelSelectorProps {
  value: BusinessModel
  onChange: (val: BusinessModel) => void
}

interface ModelOption {
  label: BusinessModel
  name: string
  description: string
  icon: LucideIcon
}

const BUSINESS_MODELS: ModelOption[] = [
  {
    label: 'B2B',
    name: 'Business-to-Business',
    description: 'Enterprise SaaS, productivity & workflow software',
    icon: Building,
  },
  {
    label: 'B2C',
    name: 'Business-to-Consumer',
    description: 'Direct consumer apps, subscriptions & freemium',
    icon: Users,
  },
  {
    label: 'Marketplace',
    name: 'Two-Sided Network',
    description: 'Multi-sided buyer & seller liquidity platform',
    icon: ShoppingCart,
  },
  {
    label: 'Platform',
    name: 'Developer / Ecosystem',
    description: 'APIs, infrastructure, SDKs & extensibility hubs',
    icon: Cpu,
  },
  {
    label: 'B2B2C',
    name: 'Enterprise-to-Consumer',
    description: 'Employer or partner distributed consumer solutions',
    icon: Briefcase,
  },
]

export const BusinessModelSelector: React.FC<BusinessModelSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-white flex items-center gap-1.5">
          <Briefcase className="w-4 h-4 text-[#FBBF24]" />
          <span>Business Model</span>
        </label>
        <span className="text-[11px] font-mono text-[#FBBF24] bg-[#FBBF24]/10 px-2 py-0.5 rounded border border-[#FBBF24]/30">
          {value}
        </span>
      </div>

      <div
        role="radiogroup"
        aria-label="Business Model"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
      >
        {BUSINESS_MODELS.map((model) => {
          const isSelected = value === model.label
          const Icon = model.icon

          return (
            <button
              key={model.label}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(model.label)}
              className={`relative flex items-start gap-3 p-3 min-h-[44px] rounded-xl border text-left transition-all duration-200 outline-none cursor-pointer ${
                isSelected
                  ? 'bg-[#1C2237] text-white border-[#FBBF24] shadow-[0_0_16px_rgba(251,191,36,0.2)] ring-1 ring-[#FBBF24]/40'
                  : 'bg-[#131827]/80 text-[#8B93B0] border-[#2A3150] hover:border-[#3B4468] hover:text-[#F0F2F8] hover:bg-[#1C2237]/60'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  isSelected ? 'bg-[#FBBF24]/20 text-[#FBBF24]' : 'bg-[#1C2237] text-[#8B93B0]'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono tracking-wide text-white">
                    {model.label}
                  </span>
                  <span className="text-[10px] text-[#8B93B0] font-medium truncate ml-1">
                    {model.name}
                  </span>
                </div>
                <p className="text-[11px] text-[#8B93B0] leading-snug mt-0.5 line-clamp-2">
                  {model.description}
                </p>
              </div>

              {isSelected && (
                <motion.div
                  layoutId="model-active-ring"
                  className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shrink-0 self-center"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
