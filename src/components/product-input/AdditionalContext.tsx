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
          className="text-sm font-semibold text-white flex items-center gap-1.5"
        >
          <HelpCircle className="w-4 h-4 text-[#A78BFA]" />
          <span>Anything specific you want to explore?</span>
          <span className="text-[11px] font-mono text-[#8B93B0] bg-[#1C2237] px-2 py-0.5 rounded border border-[#2A3150]">
            OPTIONAL
          </span>
        </label>
        <span
          className={`text-[11px] font-mono transition-colors ${
            value.length > maxLength * 0.9 ? 'text-[#FBBF24]' : 'text-[#8B93B0]'
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
          className="w-full px-4 py-3 rounded-xl text-sm font-normal text-white placeholder-[#8B93B0]/50 bg-[#131827] border border-[#2A3150] transition-all duration-200 outline-none resize-none focus:border-[#A78BFA] focus:ring-2 focus:ring-[#A78BFA]/30 group-hover:border-[#3B4468]"
        />
      </div>
      <p className="text-[11px] text-[#8B93B0]">
        Adding focused angles here primes prompt synthesis to dig into tailored mechanics.
      </p>
    </div>
  )
}
