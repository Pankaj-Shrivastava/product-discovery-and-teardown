import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { STAGES } from '../../lib/constants'

export const Header: React.FC = () => {
  const { state } = useApp()
  const location = useLocation()

  const currentStageInfo = STAGES.find((s) => s.path === location.pathname) || STAGES[0]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header" role="banner">
      <div className="h-14 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand + Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to="/"
            aria-label="Product Discovery & Teardown Studio Home"
            className="flex items-center gap-2.5 shrink-0 group focus:outline-none focus:ring-2 focus:ring-[#4355B9] rounded-lg p-1"
          >
            <div className="relative shrink-0">
              <img
                src="/icon.png"
                alt="Product Discovery & Teardown Studio"
                className="w-8 h-8 rounded-lg object-contain shadow-[0_2px_8px_rgba(67,85,185,0.25)] group-hover:shadow-[0_4px_12px_rgba(67,85,185,0.35)] group-hover:scale-105 transition-all"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm sm:text-base text-[#1A202C] tracking-tight leading-tight">
                Product Discovery <span className="text-[#4355B9]">&amp;</span> Teardown
              </span>
              <span className="text-[10px] text-[#64748B] tracking-wider uppercase -mt-0.5 hidden sm:inline">
                Studio Edition
              </span>
            </div>
          </Link>

          {/* Product Breadcrumb with truncation & full tooltip for long names */}
          {state.product.name && (
            <div className="hidden md:flex items-center gap-1.5 text-xs text-[#64748B] shrink-0 pl-2 border-l border-[#E2E8F0]">
              <span className="text-[#94A3B8]">›</span>
              <span
                title={`${state.product.name} ${state.product.companyName ? `(${state.product.companyName})` : ''}`}
                className="px-2 py-0.5 rounded bg-[#F1F5F9] text-[#1A202C] font-medium text-[11px] border border-[#E2E8F0] truncate max-w-[220px] lg:max-w-xs flex items-center gap-1.5 cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#107C41] shrink-0" />
                <span className="truncate">{state.product.name}</span>
                {state.product.companyName && (
                  <span className="text-[#64748B] truncate">({state.product.companyName})</span>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Right: Stage Badge & Status Badges */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          {/* Active Stage Badge */}
          <div
            aria-live="polite"
            className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] text-xs text-[#64748B]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4355B9] animate-pulse" />
            <span>STAGE 0{currentStageInfo.number}</span>
            <span className="text-[#CBD5E1]">/</span>
            <span className="text-[#1A202C] font-semibold">{currentStageInfo.badge}</span>
          </div>

          {/* Protocol Badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#64748B] px-2.5 py-1 rounded bg-white border border-[#E2E8F0] shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#107C41]" />
            <span>6-PILLAR PROTOCOL</span>
          </div>
        </div>
      </div>
    </header>
  )
}
