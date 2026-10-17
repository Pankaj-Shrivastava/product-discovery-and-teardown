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
  { label: 'Productivity & Tools', icon: Zap, color: '#38BDF8' },
  { label: 'Social & Communication', icon: MessageSquare, color: '#7C5CFC' },
  { label: 'E-commerce & Marketplace', icon: ShoppingBag, color: '#34D399' },
  { label: 'Finance & Fintech', icon: CreditCard, color: '#FBBF24' },
  { label: 'Developer Tools', icon: Code2, color: '#22D3EE' },
  { label: 'Entertainment & Media', icon: Film, color: '#FB7185' },
  { label: 'Health & Wellness', icon: Heart, color: '#F472B6' },
  { label: 'Education & Learning', icon: GraduationCap, color: '#A78BFA' },
  { label: 'Other', icon: Layers, color: '#8B93B0' },
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
        <label className="text-sm font-semibold text-white flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-[#CABEFF]" />
          <span>Category</span>
          <span className="text-[#8B93B0] text-xs font-normal">Select the best fit</span>
        </label>
        <span className="text-[11px] font-mono text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-0.5 rounded border border-[#38BDF8]/30">
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
                  ? 'bg-[#1C2237] text-white border-[#7C5CFC] shadow-[0_0_16px_rgba(124,92,252,0.25)] ring-1 ring-[#7C5CFC]/50'
                  : 'bg-[#131827]/80 text-[#8B93B0] border-[#2A3150] hover:border-[#3B4468] hover:text-[#F0F2F8] hover:bg-[#1C2237]/60'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? 'bg-[#7C5CFC]/20' : 'bg-[#1C2237] group-hover:bg-[#2A3150]'
                }`}
              >
                <Icon
                  className="w-3.5 h-3.5 transition-transform group-hover:scale-110"
                  style={{ color: isSelected ? cat.color : undefined }}
                />
              </div>

              <span className="truncate font-medium flex-1">{cat.label}</span>

              {isSelected && (
                <motion.span
                  layoutId="category-active-dot"
                  className="w-1.5 h-1.5 rounded-full bg-[#7C5CFC] shrink-0"
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
