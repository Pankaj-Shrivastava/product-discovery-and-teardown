import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, AlertCircle, Building2 } from 'lucide-react'

interface CompanyNameInputProps {
  value: string
  onChange: (val: string) => void
  onBlur?: () => void
  error?: string
  touched?: boolean
  maxLength?: number
  shakeTrigger?: number
}

export const CompanyNameInput: React.FC<CompanyNameInputProps> = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
  maxLength = 100,
  shakeTrigger = 0,
}) => {
  const isValid = value.trim().length >= 1
  const showError = Boolean(touched && error)

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="company-name-input"
          className="text-sm font-semibold text-white flex items-center gap-1.5"
        >
          <Building2 className="w-4 h-4 text-[#38BDF8]" />
          <span>Who makes it?</span>
          <span className="text-[#FB7185] text-xs font-normal" title="Required field">*</span>
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

      <motion.div
        animate={shakeTrigger > 0 ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
        transition={{ duration: 0.35 }}
        className="relative group"
      >
        <input
          id="company-name-input"
          type="text"
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder="e.g., Linear Orbit, Inc. or Adobe"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-required="true"
          aria-invalid={showError}
          aria-describedby={showError ? 'company-name-error' : undefined}
          className={`w-full min-h-[44px] px-4 py-3 rounded-xl text-sm sm:text-base font-medium text-white placeholder-[#8B93B0]/50 bg-[#131827] border transition-all duration-200 outline-none pr-11 ${
            showError
              ? 'border-[#FB7185] focus:border-[#FB7185] focus:ring-2 focus:ring-[#FB7185]/30 shadow-[0_0_15px_rgba(251,113,133,0.15)]'
              : isValid
              ? 'border-[#34D399]/70 focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/40 shadow-[0_0_16px_rgba(52,211,153,0.1)]'
              : 'border-[#2A3150] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/30 group-hover:border-[#3B4468]'
          }`}
        />

        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
          {isValid ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className="w-5 h-5 rounded-full bg-[#34D399]/20 border border-[#34D399]/60 flex items-center justify-center text-[#34D399]"
              title="Valid company name"
            >
              <Check className="w-3 h-3 stroke-[3]" />
            </motion.div>
          ) : showError ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-5 h-5 rounded-full bg-[#FB7185]/20 border border-[#FB7185]/60 flex items-center justify-center text-[#FB7185]"
            >
              <AlertCircle className="w-3.5 h-3.5" />
            </motion.div>
          ) : null}
        </div>
      </motion.div>

      <AnimatePresence>
        {showError && (
          <motion.p
            id="company-name-error"
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.15 }}
            className="text-xs text-[#FB7185] flex items-center gap-1.5 pl-0.5"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
