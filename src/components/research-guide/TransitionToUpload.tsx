import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ArrowLeft, CheckCircle2, UploadCloud } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export const TransitionToUpload: React.FC = () => {
  const navigate = useNavigate()
  const { dispatch } = useApp()

  const handleProceed = () => {
    dispatch({ type: 'COMPLETE_STAGE', payload: 3 })
    navigate('/upload')
  }

  return (
    <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
      <div className="rounded-2xl bg-white border border-[#E2E8F0] p-6 sm:p-8 mb-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#107C41] animate-pulse" />
              <span className="text-xs font-bold text-[#107C41] uppercase tracking-wider">
                READY FOR DETERMINISTIC AST INGESTION
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#1A202C] tracking-tight">
              Once your summary document is compiled, head to Stage 4
            </h3>

            <p className="text-xs sm:text-sm text-[#64748B] max-w-2xl mt-1.5 leading-relaxed">
              Stage 4 parses your document locally with zero external API calls, transforming raw findings into interactive Insight Cards for your presentation deck.
            </p>
          </div>

          {/* Pre-Flight Checklist Card */}
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] shrink-0 text-xs">
            <span className="text-[11px] text-[#64748B] uppercase font-bold tracking-wider block mb-2.5">
              Pre-Upload Verification Checklist
            </span>
            <ul className="space-y-2 text-[#334155]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#107C41] shrink-0" />
                <span>Covers all 6 research pillars</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0284C7] shrink-0" />
                <span>Saved as Markdown (.md) or plain text (.txt)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C07818] shrink-0" />
                <span>Contains factual findings &amp; data tables</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <button
          type="button"
          onClick={() => navigate('/prompts')}
          className="px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-xs sm:text-sm text-[#64748B] hover:text-[#1A202C] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 cursor-pointer font-medium shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Research Prompts</span>
        </button>

        <button
          type="button"
          onClick={handleProceed}
          className="px-6 py-3 rounded-xl bg-[#4355B9] hover:bg-[#364599] text-white font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Summary Document</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
