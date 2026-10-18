import React from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  Zap,
  ShoppingBag,
  CreditCard,
  Heart,
  GraduationCap,
  Film,
  Code2,
  Layers,
  LucideIcon,
} from 'lucide-react'
import { ProductCategory } from '../../types'

interface CategorySelectorProps {
  value: ProductCategory
  onChange: (val: ProductCategory) => void
}

interface CategoryOption {
  label: ProductCategory
  icon: LucideIcon
  color: string
}

const CATEGORIES: CategoryOption[] = [
  { label: 'Productivity & Tools', icon: Zap, color: '#0284C7' },
  { label: 'Social & Communication', icon: MessageSquare, color: '#4355B9' },
  { label: 'E-commerce & Marketplace', icon: ShoppingBag, color: '#107C41' },
  { label: 'Finance & Fintech', icon: CreditCard, color: '#C07818' },
  { label: 'Developer Tools', icon: Code2, color: '#2563EB' },
  { label: 'Entertainment & Media', icon: Film, color: '#C0392B' },
  { label: 'Health & Wellness', icon: Heart, color: '#DB2777' },
  { label: 'Education & Learning', icon: GraduationCap, color: '#7C3AED' },
  { label: 'Other', icon: Layers, color: '#64748B' },
]

export const CategorySelector: React.FC<CategorySelectorProps> = ({ value, onChange }) => {
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      nextIndex = (index + 1) % CATEGORIES.length
      onChange(CATEGORIES[nextIndex].label)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      nextIndex = (index - 1 + CATEGORIES.length) % CATEGORIES.length
      onChange(CATEGORIES[nextIndex].label)
    }
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-[#1A202C] flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-[#4355B9]" />
          <span>Category</span>
          <span className="text-[#64748B] text-xs font-normal">Select the best fit</span>
        </label>
        <span className="text-[11px] font-mono text-[#4355B9] bg-[#4355B9]/10 px-2 py-0.5 rounded border border-[#4355B9]/30">
          {value}
        </span>
      </div>

      <div
        role="radiogroup"
        aria-label="Product Category"
        className="grid grid-cols-2 sm:grid-cols-3 gap-2"
      >
        {CATEGORIES.map((cat, idx) => {
          const isSelected = value === cat.label
          const Icon = cat.icon

          return (
            <button
              key={cat.label}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onChange(cat.label)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`relative group flex items-center gap-2.5 px-3 py-2.5 min-h-[44px] rounded-xl border text-left text-xs transition-all duration-200 outline-none cursor-pointer ${
                isSelected
                  ? 'bg-[#EDF2F7] text-[#1A202C] border-[#4355B9] shadow-xs ring-1 ring-[#4355B9]/40 font-semibold'
                  : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#CBD5E1] hover:text-[#1A202C] hover:bg-[#F8FAFC]'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? 'bg-[#4355B9]/15' : 'bg-[#F1F5F9] group-hover:bg-[#E2E8F0]'
                }`}
              >
                <Icon
                  className="w-3.5 h-3.5 transition-transform group-hover:scale-110"
                  style={{ color: isSelected ? cat.color : undefined }}
                />
              </div>

              <span className="truncate flex-1">{cat.label}</span>

              {isSelected && (
                <motion.span
                  layoutId="category-active-dot"
                  className="w-1.5 h-1.5 rounded-full bg-[#4355B9] shrink-0"
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
