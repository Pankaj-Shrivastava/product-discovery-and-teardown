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
    <div className="fixed top-14 left-0 right-0 z-40 bg-[#0A0E19]/90 backdrop-blur-md border-b border-[#2A3150]/60">
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
                    'group flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shrink-0 select-none focus:outline-none focus:ring-2 focus:ring-[#7C5CFC] focus:ring-offset-1 focus:ring-offset-[#0B0F1A]',
                    isActive
                      ? 'bg-[#1C2237] text-[#CABEFF] ring-1 ring-[#7C5CFC]/50 shadow-[0_0_14px_rgba(124,92,252,0.25)] font-semibold'
                      : isCompleted
                      ? 'text-[#F0F2F8] hover:bg-[#131827] hover:text-white'
                      : 'text-[#8B93B0] hover:bg-[#131827] hover:text-[#F0F2F8]'
                  )}
                >
                  <span
                    className={cn(
                      'w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] transition-all',
                      isActive
                        ? 'bg-[#7C5CFC] text-white shadow-[0_0_8px_rgba(124,92,252,0.6)] font-bold'
                        : isCompleted
                        ? 'bg-[#34D399]/20 text-[#34D399] border border-[#34D399]/40'
                        : 'bg-[#1C2237] text-[#8B93B0] group-hover:text-white'
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
                  <ChevronRight className="w-3.5 h-3.5 text-[#2A3150] shrink-0" aria-hidden="true" />
                )}
              </React.Fragment>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
