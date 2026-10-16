import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppProvider } from './context/AppContext'
import { Layout } from './components/layout/Layout'
import { Stage1_ProductInput } from './pages/Stage1_ProductInput'
import { Stage2_PromptGeneration } from './pages/Stage2_PromptGeneration'
import { Stage3_ResearchGuide } from './pages/Stage3_ResearchGuide'
import { Stage4_UploadParse } from './pages/Stage4_UploadParse'
import { Stage5_InsightExplorer } from './pages/Stage5_InsightExplorer'
import { Stage6_DeckBuilder } from './pages/Stage6_DeckBuilder'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Stage1_ProductInput />} />
          <Route path="prompts" element={<Stage2_PromptGeneration />} />
          <Route path="guide" element={<Stage3_ResearchGuide />} />
          <Route path="upload" element={<Stage4_UploadParse />} />
          <Route path="insights" element={<Stage5_InsightExplorer />} />
          <Route path="deck" element={<Stage6_DeckBuilder />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
