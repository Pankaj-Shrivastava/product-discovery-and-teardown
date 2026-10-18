import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { StageProgressBar } from './StageProgressBar'
import { FloatingScrollToTop } from './FloatingScrollToTop'

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F6F9] text-[#1A202C] relative overflow-x-clip flex flex-col selection:bg-[#4355B9]/15 selection:text-[#1A202C]">
      {/* Skip to Main Content Link for WCAG Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#4355B9] focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#4355B9] text-xs font-semibold"
      >
        Skip to main content
      </a>

      {/* Ambient background glow elements (Subtle Nordic Studio Mist) */}
      <div className="fixed -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[380px] bg-[#4355B9]/04 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="fixed top-96 -left-32 w-80 h-80 bg-[#2563EB]/03 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed top-[600px] -right-28 w-96 h-96 bg-[#107C41]/03 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header & Sub-header Stage Navigation */}
      <Header />
      <StageProgressBar />

      {/* Main Content Viewport */}
      <main id="main-content" tabIndex={-1} className="w-full flex-1 pt-28 pb-16 flex flex-col focus:outline-none">
        <Outlet />
      </main>

      {/* Floating CTA Scroll to Top with Scroll Progress Ring */}
      <FloatingScrollToTop />

      {/* Minimal Footer */}
      <footer className="border-t border-[#E2E8F0] py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-[#64748B]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Product Discovery &amp; Teardown Studio • 6-Pillar Intelligence Protocol</span>
          <span className="text-[11px] text-[#94A3B8]">Zero-Server • 100% Client-Side Privacy</span>
        </div>
      </footer>
    </div>
  )
}
