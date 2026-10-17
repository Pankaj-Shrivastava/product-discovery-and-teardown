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
    <div className="mt-12 pt-8 border-t border-[#1F263E]">
      <div className="rounded-2xl glass-panel border border-[#232B45] p-6 sm:p-8 bg-gradient-to-r from-[#12162B]/80 via-[#0E1325]/80 to-[#0A0E1A]/80 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-mono font-bold text-[#10B981] uppercase tracking-wider">
                READY FOR DETERMINISTIC AST INGESTION
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Once your summary document is compiled, head to Stage 4
            </h3>

            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl mt-1.5 leading-relaxed">
              Stage 4 parses your document locally with zero external API calls, transforming raw findings into interactive Insight Cards for your presentation deck.
            </p>
          </div>

          {/* Pre-Flight Checklist Card */}
          <div className="p-4 rounded-xl bg-[#080C18] border border-[#1E253D] shrink-0 font-mono text-xs">
            <span className="text-[11px] text-[#8B93B0] uppercase font-bold tracking-wider block mb-2.5">
              Pre-Upload Verification Checklist
            </span>
            <ul className="space-y-2 text-[#CBD5E1]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                <span>Covers all 6 research pillars</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                <span>Saved as Markdown (.md) or plain text (.txt)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FBBF24] shrink-0" />
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
          className="px-4 py-2.5 rounded-xl bg-[#131827] border border-[#232B45] text-xs sm:text-sm text-[#8B93B0] hover:text-white transition-colors flex items-center gap-2 cursor-pointer font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Research Prompts</span>
        </button>

        <button
          type="button"
          onClick={handleProceed}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#9B7FFF] text-white font-semibold text-sm hover:shadow-[0_0_25px_rgba(124,92,252,0.45)] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Summary Document</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
