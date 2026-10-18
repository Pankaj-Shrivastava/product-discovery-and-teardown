import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Check, ChevronRight } from 'lucide-react'
import { STAGES } from '../../lib/constants'
import { useApp } from '../../context/AppContext'
import { cn } from '../../lib/utils'

export const StageProgressBar: React.FC = () => {
  const location = useLocation()
  const { state } = useApp()

  const currentStageIndex = STAGES.findIndex((s) => s.path === location.pathname)
  const activeIndex = currentStageIndex >= 0 ? currentStageIndex : 0

  return (
    <div className="fixed top-14 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <nav
          aria-label="Teardown Stages Progress"
          className="flex items-center justify-between gap-1 sm:gap-2 py-2 px-1.5 overflow-x-auto no-scrollbar"
        >
          {STAGES.map((stage, idx) => {
            const isActive = idx === activeIndex
            const isCompleted = state.stageCompletion[stage.number] || idx < activeIndex

            return (
              <React.Fragment key={stage.number}>
                <Link
                  to={stage.path}
                  title={`Stage ${stage.number}: ${stage.title}${isCompleted ? ' (Completed)' : isActive ? ' (Current)' : ''}`}
                  aria-current={isActive ? 'step' : undefined}
                  className={cn(
                    'group flex items-center gap-1.5 sm:gap-2 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shrink-0 select-none focus:outline-none focus:ring-2 focus:ring-[#4355B9] focus:ring-offset-1 focus:ring-offset-white border',
                    isActive
                      ? 'bg-[#EDF2F7] text-[#4355B9] border-[#4355B9]/50 shadow-xs font-semibold px-2.5 sm:px-3'
                      : isCompleted
                      ? 'text-[#1A202C] hover:bg-[#F1F5F9] hover:text-[#4355B9] border-transparent px-1.5 sm:px-2.5 lg:px-3'
                      : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1A202C] border-transparent px-1.5 sm:px-2.5 lg:px-3'
                  )}
                >
                  <span
                    className={cn(
                      'w-5 h-5 rounded-full flex items-center justify-center text-[10px] transition-all shrink-0',
                      isActive
                        ? 'bg-[#4355B9] text-white shadow-[0_2px_6px_rgba(67,85,185,0.35)] font-bold'
                        : isCompleted
                        ? 'bg-[#107C41]/15 text-[#107C41] border border-[#107C41]/30 font-semibold'
                        : 'bg-[#EDF2F7] text-[#64748B] group-hover:text-[#1A202C]'
                    )}
                  >
                    {isCompleted && !isActive ? (
                      <Check className="w-3 h-3 stroke-[2.5]" aria-hidden="true" />
                    ) : (
                      <span aria-hidden="true">{stage.number}</span>
                    )}
                  </span>
                  <span
                    className={cn(
                      'whitespace-nowrap transition-all duration-200 flex items-center gap-1.5',
                      isActive ? 'inline-flex' : 'hidden lg:inline-flex'
                    )}
                  >
                    <span>{stage.title}</span>
                    {stage.number >= 4 && (
                      <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#EDF2F7] text-[#94A3B8] border border-[#CBD5E1]/60 leading-none">
                        Soon
                      </span>
                    )}
                  </span>
                </Link>

                {idx < STAGES.length - 1 && (
                  <ChevronRight
                    className="w-3.5 h-3.5 text-[#CBD5E1] shrink-0"
                    aria-hidden="true"
                  />
                )}
              </React.Fragment>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
