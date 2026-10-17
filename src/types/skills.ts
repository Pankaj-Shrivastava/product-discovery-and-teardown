import type { PillarId } from './index.ts'

export interface ResearchLens {
  id: string
  number: number
  title: string
  questions: string[]
  subsections?: Array<{
    title: string
    questions: string[]
  }>
}

export interface Framework {
  name: string
  description: string
  diagram?: string
}

export interface SkillData {
  id: PillarId
  name: string
  pillarNumber: number
  pillarTitle: string
  description: string
  purpose: string
  lenses: ResearchLens[]
  frameworks: Framework[]
  promptTemplate: string
  qualityChecklist: string[]
  rawContent?: string
}

export interface SkillsValidationResult {
  isValid: boolean
  totalSkills: number
  totalLenses: number
  totalFrameworks: number
  errors: string[]
  warnings: string[]
}
