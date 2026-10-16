import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Upload, FileCode, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'
import { PageTransition } from '../components/layout/PageTransition'
import { useApp } from '../context/AppContext'

export const Stage4_UploadParse: React.FC = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useApp()

  const handleNext = () => {
    dispatch({ type: 'COMPLETE_STAGE', payload: 4 })
    navigate('/insights')
  }

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col items-center">
        {/* Stage Tracker */}
        <div className="flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-[#1C2237] border border-[#2A3150] text-xs font-mono text-[#CABEFF]">
          <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
          <span>STAGE 04 / 06 : INGESTION</span>
          <span className="text-[#2A3150]">•</span>
          <span className="text-[#22D3EE]">UPLOAD &amp; PARSE</span>
        </div>

        {/* Hero */}
        <div className="text-center max-w-xl mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Upload Summary Document
          </h1>
          <p className="text-sm text-[#8B93B0]">
            Drop your synthesized research notes (`.md` or `.txt`). Our deterministic parser maps markdown AST headers into structured cards across all 6 pillars without calling any external LLM.
          </p>
        </div>

        {/* Dropzone Container */}
        <div className="w-full glass-panel-elevated rounded-2xl p-8 border-2 border-dashed border-[#2A3150] hover:border-[#7C5CFC]/50 transition-all flex flex-col items-center justify-center text-center cursor-pointer group mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#1C2237] border border-[#2A3150] flex items-center justify-center text-[#7C5CFC] group-hover:scale-105 transition-transform mb-4 shadow-[0_0_20px_rgba(124,92,252,0.2)]">
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-white mb-1">
            Drag &amp; drop your research markdown file here
          </h3>
          <p className="text-xs text-[#8B93B0] mb-4">
            Supports Markdown (.md) or plain text (.txt) up to 10MB
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-[#34D399] bg-[#34D399]/10 px-3 py-1 rounded-full border border-[#34D399]/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% In-Browser AST Parsing • Zero Network Transmission</span>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="w-full flex items-center justify-between pt-6 border-t border-[#2A3150]">
          <button
            onClick={() => navigate('/guide')}
            className="px-4 py-2 rounded-xl bg-[#131827] border border-[#2A3150] text-sm text-[#8B93B0] hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Guide</span>
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C5CFC] to-[#9B7FFF] text-white font-semibold text-sm hover:shadow-[0_0_20px_rgba(124,92,252,0.4)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Proceed to Insight Explorer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </PageTransition>
  )
}
