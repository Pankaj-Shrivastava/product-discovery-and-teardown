import React from 'react'
import { HelpCircle } from 'lucide-react'

interface AdditionalContextProps {
  value?: string
  onChange: (val: string) => void
  maxLength?: number
}

export const AdditionalContext: React.FC<AdditionalContextProps> = ({
  value = '',
  onChange,
  maxLength = 500,
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="additional-context-input"
          className="text-sm font-semibold text-[#1A202C] flex items-center gap-1.5"
        >
          <HelpCircle className="w-4 h-4 text-[#7C3AED]" />
          <span>Anything specific you want to explore?</span>
          <span className="text-[11px] font-mono text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded border border-[#E2E8F0]">
            OPTIONAL
          </span>
        </label>
        <span
          className={`text-[11px] font-mono transition-colors ${
            value.length > maxLength * 0.9 ? 'text-[#C07818]' : 'text-[#64748B]'
          }`}
          aria-live="polite"
        >
          {value.length}/{maxLength}
        </span>
      </div>

      <div className="relative group">
        <textarea
          id="additional-context-input"
          rows={3}
          maxLength={maxLength}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., Focus on issue triage velocity, multiplayer sync engine, keyboard-first UX, retention hooks, and enterprise pricing expansion..."
          className="w-full px-4 py-3 rounded-xl text-sm font-normal text-[#1A202C] placeholder-[#94A3B8] bg-white border border-[#E2E8F0] transition-all duration-200 outline-none resize-none focus:border-[#4355B9] focus:ring-2 focus:ring-[#4355B9]/20 group-hover:border-[#CBD5E1] shadow-xs"
        />
      </div>
      <p className="text-[11px] text-[#64748B]">
        Adding focused angles here primes prompt synthesis to dig into tailored mechanics.
      </p>
    </div>
  )
}
