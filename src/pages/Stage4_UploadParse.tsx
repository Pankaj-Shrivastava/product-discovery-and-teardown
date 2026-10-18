import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Upload, ShieldCheck } from 'lucide-react'
import { PageTransition } from '../components/layout/PageTransition'
import { StageUnderDevelopmentWrapper } from '../components/layout/StageUnderDevelopmentWrapper'
import { useApp } from '../context/AppContext'

export const Stage4_UploadParse: React.FC = () => {
  const navigate = useNavigate()
  const { dispatch } = useApp()

  const handleNext = () => {
    dispatch({ type: 'COMPLETE_STAGE', payload: 4 })
    navigate('/insights')
  }

  return (
    <PageTransition>
      <StageUnderDevelopmentWrapper
        stageNumber={4}
        stageTitle="Upload & Parse"
        featureTitle="Automated Document Ingestion Coming Soon"
        description="Stages 1 to 3 give you everything needed to run comprehensive multi-LLM teardowns right now. In-browser markdown AST parsing, insight synthesis, and one-click PPTX export are under active development for the v2.0 release."
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col items-center">
        {/* Stage Tracker */}
        <div className="flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full bg-white border border-[#CBD5E1] text-xs text-[#4355B9] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#0284C7] animate-pulse" />
          <span>STAGE 04 / 06 : INGESTION</span>
          <span className="text-[#CBD5E1]">•</span>
          <span className="text-[#0284C7]">UPLOAD &amp; PARSE</span>
        </div>

        {/* Hero */}
        <div className="text-center max-w-xl mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1A202C] mb-2">
            Upload Summary Document
          </h1>
          <p className="text-sm text-[#64748B]">
            Drop your synthesized research notes (`.md` or `.txt`). Our deterministic parser maps markdown AST headers into structured cards across all 6 pillars without calling any external LLM.
          </p>
        </div>

        {/* Dropzone Container */}
        <div className="w-full bg-white rounded-2xl p-8 border-2 border-dashed border-[#CBD5E1] hover:border-[#4355B9]/60 hover:bg-[#F8FAFC] transition-all flex flex-col items-center justify-center text-center cursor-pointer group mb-8 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#EEF2FF] border border-[#CBD5E1] flex items-center justify-center text-[#4355B9] group-hover:scale-105 transition-transform mb-4 shadow-xs">
            <Upload className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-[#1A202C] mb-1">
            Drag &amp; drop your research markdown file here
          </h3>
          <p className="text-xs text-[#64748B] mb-4">
            Supports Markdown (.md) or plain text (.txt) up to 10MB
          </p>
          <div className="flex items-center gap-2 text-xs text-[#107C41] bg-[#107C41]/10 px-3 py-1 rounded-full border border-[#107C41]/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% In-Browser AST Parsing • Zero Network Transmission</span>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="w-full flex items-center justify-between pt-6 border-t border-[#E2E8F0]">
          <button
            onClick={() => navigate('/guide')}
            className="px-4 py-2 rounded-xl bg-white border border-[#CBD5E1] text-sm text-[#64748B] hover:text-[#1A202C] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 cursor-pointer shadow-xs font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Guide</span>
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-[#4355B9] hover:bg-[#364599] text-white font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Proceed to Insight Explorer</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      </StageUnderDevelopmentWrapper>
    </PageTransition>
  )
}
