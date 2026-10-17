export type ProductCategory =
  | 'Social & Communication'
  | 'Productivity & Tools'
  | 'E-commerce & Marketplace'
  | 'Finance & Fintech'
  | 'Health & Wellness'
  | 'Education & Learning'
  | 'Entertainment & Media'
  | 'Developer Tools'
  | 'Other'

export type Platform = 'Mobile' | 'Web' | 'Desktop' | 'Cross-platform'

export type BusinessModel = 'B2C' | 'B2B' | 'B2B2C' | 'Marketplace' | 'Platform'

export interface ProductInput {
  name: string
  companyName: string
  category: ProductCategory
  platform: Platform
  businessModel: BusinessModel
  additionalContext?: string
}

export type PillarId =
  | 'product-strategic-research'
  | 'product-market-research'
  | 'product-user-research'
  | 'product-technical-research'
  | 'product-behavioral-research'
  | 'product-ethics-research'

export interface PillarMeta {
  id: PillarId
  number: number
  title: string
  shortTitle: string
  color: string
  bgColor: string
  borderColor: string
  iconName: string
  description: string
}

export interface GeneratedPromptMetadata {
  productName: string
  companyName: string
  category: string
  platform: string
  businessModel: string
  generatedAt: string
}

export interface GeneratedPrompt {
  id: string
  pillarNumber: number
  pillarName: string
  promptName: string
  icon: string
  color: string
  fullPrompt: string
  wordCount: number
  lensCount: number
  frameworkCount: number
  estimatedResearchTime: string
  metadata: GeneratedPromptMetadata
  // Backward compatibility fields
  content?: string
  pillarId?: PillarId
  pillarTitle?: string
  frameworks?: string[]
  copied?: boolean
}

export interface InsightCard {
  id: string
  type: 'finding' | 'metric' | 'framework' | 'quote' | 'comparison' | 'gap' | 'recommendation'
  title: string
  content: string
  bulletPoints?: string[]
  confidence: 'high' | 'medium' | 'low'
  sourceSection: string
  tags: string[]
  selected: boolean
}

export interface DetectedFramework {
  name: string
  count: number
}

export interface PillarData {
  pillarId: string
  pillarName: string
  pillarNumber: number
  icon: string
  color: string
  insights: InsightCard[]
  frameworks: DetectedFramework[]
  completeness: number
}

export interface PillarInsights {
  pillars: PillarData[]
  unmatched: InsightCard[]
  metadata: {
    totalInsights: number
    parsedAt: string
    sourceFileName: string
    confidenceScore: number
  }
}

export interface Slide {
  id: string
  title: string
  type: string
  insights: InsightCard[]
  notes?: string
}

export interface DeckState {
  slides: Slide[]
  theme: string
}

export type StageNumber = 1 | 2 | 3 | 4 | 5 | 6

export interface StageInfo {
  number: StageNumber
  path: string
  title: string
  shortTitle: string
  tagline: string
  badge: string
}

export interface AppState {
  product: ProductInput
  prompts: GeneratedPrompt[]
  insights: PillarInsights | null
  deck: DeckState
  currentStage: StageNumber
  stageCompletion: Record<StageNumber, boolean>
}
