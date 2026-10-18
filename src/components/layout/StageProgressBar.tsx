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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Teardown Stages Progress"
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar justify-between"
        >
          {STAGES.map((stage, idx) => {
            const isActive = idx === activeIndex
            const isCompleted = state.stageCompletion[stage.number] || idx < activeIndex

            return (
              <React.Fragment key={stage.number}>
                <Link
                  to={stage.path}
                  aria-current={isActive ? 'step' : undefined}
                  className={cn(
                    'group flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shrink-0 select-none focus:outline-none focus:ring-2 focus:ring-[#4355B9] focus:ring-offset-1 focus:ring-offset-white',
                    isActive
                      ? 'bg-[#EDF2F7] text-[#4355B9] ring-1 ring-[#4355B9]/40 shadow-xs font-semibold'
                      : isCompleted
                      ? 'text-[#1A202C] hover:bg-[#F1F5F9] hover:text-[#4355B9]'
                      : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#1A202C]'
                  )}
                >
                  <span
                    className={cn(
                      'w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] transition-all',
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
                  <span className="whitespace-nowrap">{stage.title}</span>
                </Link>

                {idx < STAGES.length - 1 && (
                  <ChevronRight className="w-3.5 h-3.5 text-[#CBD5E1] shrink-0" aria-hidden="true" />
                )}
              </React.Fragment>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
