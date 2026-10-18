import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, AlertCircle, Sparkles } from 'lucide-react'

interface ProductNameInputProps {
  value: string
  onChange: (val: string) => void
  onBlur?: () => void
  error?: string
  touched?: boolean
  maxLength?: number
  shakeTrigger?: number
}

export const ProductNameInput: React.FC<ProductNameInputProps> = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
  maxLength = 100,
  shakeTrigger = 0,
}) => {
  const isValid = value.trim().length >= 2
  const showError = Boolean(touched && error)

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label
          htmlFor="product-name-input"
          className="text-sm font-semibold text-[#1A202C] flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 text-[#4355B9]" />
          <span>What product do you want to tear down?</span>
          <span className="text-[#DC2626] text-xs font-normal" title="Required field">*</span>
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

      <motion.div
        animate={shakeTrigger > 0 ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
        transition={{ duration: 0.35 }}
        className="relative group"
      >
        <input
          id="product-name-input"
          type="text"
          value={value}
          maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder="e.g., Linear, Spotify, Figma, Notion..."
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-required="true"
          aria-invalid={showError}
          aria-describedby={showError ? 'product-name-error' : undefined}
          className={`w-full min-h-[48px] px-4 py-3.5 rounded-xl text-base sm:text-lg font-medium text-[#1A202C] placeholder-[#94A3B8] bg-white border transition-all duration-200 outline-none pr-11 shadow-xs ${
            showError
              ? 'border-[#DC2626] focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20'
              : isValid
              ? 'border-[#107C41]/60 focus:border-[#4355B9] focus:ring-2 focus:ring-[#4355B9]/20'
              : 'border-[#E2E8F0] focus:border-[#4355B9] focus:ring-2 focus:ring-[#4355B9]/20 group-hover:border-[#CBD5E1]'
          }`}
        />

        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
          {isValid ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              className="w-5 h-5 rounded-full bg-[#107C41]/10 border border-[#107C41]/40 flex items-center justify-center text-[#107C41]"
              title="Valid product name"
            >
              <Check className="w-3 h-3 stroke-[3]" />
            </motion.div>
          ) : showError ? (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-5 h-5 rounded-full bg-[#DC2626]/10 border border-[#DC2626]/40 flex items-center justify-center text-[#DC2626]"
            >
              <AlertCircle className="w-3.5 h-3.5" />
            </motion.div>
          ) : null}
        </div>
      </motion.div>

      <AnimatePresence>
        {showError && (
          <motion.p
            id="product-name-error"
            role="alert"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.15 }}
            className="text-xs text-[#DC2626] flex items-center gap-1.5 pl-0.5"
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{error}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
