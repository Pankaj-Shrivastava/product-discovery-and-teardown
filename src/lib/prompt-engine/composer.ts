import { PILLARS } from '../constants'
import { skillsData } from '../../data/skills'
import type { GeneratedPrompt, ProductInput } from '../../types'
import type { Framework, ResearchLens, SkillData } from '../../types/skills'
import {
  filterAndAdaptLenses,
  getBusinessModelDirectives,
  getCategoryDirectives,
  getCrossPillarDeduplication,
  getPlatformDirectives,
  getSourceGuidance,
} from './filters'

/**
 * Prompt names per pillar for professional presentation in UI and exports.
 */
export const PILLAR_PROMPT_NAMES: Record<number, string> = {
  1: 'Strategic Deep Dive',
  2: 'Market & Competitive Landscape',
  3: 'Product Craft & User Journey',
  4: 'Technical Architecture & Systems',
  5: 'Behavioral Psychology & Habit Loops',
  6: 'Trust, Ethics & Safety Audit',
}

/**
 * Persona/role definition per pillar.
 */
export const PILLAR_ROLES: Record<number, string> = {
  1: 'senior product strategist and corporate development analyst',
  2: 'lead market intelligence researcher and competitive strategist',
  3: 'principal product manager and digital user experience researcher',
  4: 'principal systems architect and technical product teardown specialist',
  5: 'behavioral scientist and digital habit formation psychologist',
  6: 'digital ethics investigator and trust & safety product auditor',
}

/**
 * Sanitize user input to safely inject into prompt text, preventing markdown or prompt breakage.
 */
export function sanitizeInput(input: string): string {
  if (!input) return ''
  return input
    // oxlint-disable-next-line no-control-regex
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, '') // remove control chars
    .replace(/`/g, "'") // replace backticks with single quotes
    .trim()
}

/**
 * Calculate the exact word count of any prompt text.
 */
export function calculateWordCount(text: string): number {
  if (!text || !text.trim()) return 0
  return text.trim().split(/\s+/).filter(Boolean).length
}

/**
 * Estimate the research execution time based on lens count and framework count.
 */
export function estimateResearchTime(lensCount: number, frameworkCount: number): string {
  const complexity = lensCount + frameworkCount
  if (complexity >= 14) return '20-25 minutes'
  if (complexity >= 10) return '15-20 minutes'
  if (complexity >= 6) return '10-15 minutes'
  return '8-10 minutes'
}

/**
 * Transform a lens question into an action-oriented research directive.
 */
function makeActionOriented(question: string, productName: string): string {
  const q = question.trim()
  if (!q) return ''

  // If already phrased with a strong action verb, return it
  if (/^(analyze|investigate|evaluate|benchmark|synthesize|deconstruct|audit|map|assess|compare|examine|identify|quantify|determine|uncover|profile)\b/i.test(q)) {
    return q
  }

  // Common noun phrase transformations
  if (/^mission\b/i.test(q)) return `Analyze mission and strategic mandate: ${q}.`
  if (/^value proposition\b/i.test(q)) return `Evaluate core value proposition for ${productName}: ${q}.`
  if (/^pricing\b/i.test(q)) return `Evaluate pricing model and packaging: ${q}.`
  if (/^unit economics\b/i.test(q)) return `Deconstruct estimated unit economics and revenue levers: ${q}.`
  if (/^moat\b/i.test(q)) return `Assess defensibility and structural moats protecting ${productName}: ${q}.`
  if (/^tam\b|^sam\b|^som\b|^market sizing\b/i.test(q)) return `Quantify TAM/SAM/SOM market opportunity: ${q}.`
  if (/^competitor\b/i.test(q)) return `Benchmark key competitors against ${productName}: ${q}.`
  if (/^onboarding\b/i.test(q)) return `Evaluate user onboarding and time-to-first-value: ${q}.`
  if (/^tech stack\b|^architecture\b/i.test(q)) return `Inspect technology stack and infrastructure patterns: ${q}.`
  if (/^dark pattern\b/i.test(q)) return `Audit for deceptive design patterns and friction: ${q}.`

  // Default concise action prefix
  return `Assess: ${q}`
}

/**
 * Formats research lenses with numbered headers, subsections, and action-oriented bullet questions.
 */
function formatLensesSection(lenses: ResearchLens[], productName: string): string {
  const sections: string[] = []

  lenses.forEach((lens, index) => {
    const lensNumber = lens.number || index + 1
    const lines: string[] = [`#### Lens ${lensNumber}: ${lens.title}`]

    if (lens.subsections && lens.subsections.length > 0) {
      lens.subsections.forEach((sub) => {
        lines.push(`  **${sub.title}:**`)
        sub.questions.forEach((subQ) => {
          const actionSubTask = makeActionOriented(subQ, productName)
          lines.push(`  - ${actionSubTask}`)
        })
      })
    } else if (lens.questions && lens.questions.length > 0) {
      lens.questions.forEach((question) => {
        const actionTask = makeActionOriented(question, productName)
        lines.push(`- ${actionTask}`)
      })
    }

    sections.push(lines.join('\n'))
  })

  return sections.join('\n\n')
}

/**
 * Formats frameworks with explicit instructions on how the AI must apply them to this teardown.
 */
function formatFrameworksSection(frameworks: Framework[], productName: string): string {
  if (!frameworks || frameworks.length === 0) {
    return 'Apply standard product management and industry frameworks relevant to this dimension.'
  }

  const parts: string[] = []

  frameworks.forEach((fw, i) => {
    const lines: string[] = [
      `### Framework ${i + 1}: ${fw.name}`,
      `*Focus:* ${fw.description}`,
      `*Application Task for ${productName}:* Explicitly apply ${fw.name} to ${productName} in a structured breakdown table with concrete observable data.`,
    ]

    if (fw.diagram && fw.diagram.trim()) {
      lines.push(`\`\`\`\n${fw.diagram.trim()}\n\`\`\``)
    }

    parts.push(lines.join('\n'))
  })

  return parts.join('\n\n')
}

/**
 * Compose a single high-value, product-aware research prompt from ProductInput and SkillData.
 */
export function composePrompt(product: ProductInput, skill: SkillData): GeneratedPrompt {
  const safeProductName = sanitizeInput(product.name) || 'The Product'
  const safeCompanyName = sanitizeInput(product.companyName) || 'The Company'
  const safeCategory = sanitizeInput(product.category) || 'Productivity & Tools'
  const safePlatform = sanitizeInput(product.platform) || 'Cross-platform'
  const safeBusinessModel = sanitizeInput(product.businessModel) || 'B2B'
  const safeAdditionalContext = sanitizeInput(product.additionalContext || '')

  const pillarNumber = skill.pillarNumber
  const pillarMeta = PILLARS.find((p) => p.number === pillarNumber) || {
    id: skill.id,
    number: pillarNumber,
    title: skill.pillarTitle || skill.name,
    color: '#7C5CFC',
    iconName: 'Compass',
  }

  const promptName = PILLAR_PROMPT_NAMES[pillarNumber] || `${skill.pillarTitle} Teardown`
  const roleTitle = PILLAR_ROLES[pillarNumber] || 'senior product researcher and analyst'

  // Apply smart filtering and contextual adaptations
  const adaptedLenses = filterAndAdaptLenses(skill.lenses, product, pillarNumber)
  const categoryDirectives = getCategoryDirectives(product.category, pillarNumber)
  const platformDirectives = getPlatformDirectives(product.platform, pillarNumber)
  const businessModelDirectives = getBusinessModelDirectives(product.businessModel, pillarNumber)
  const scopeBoundary = getCrossPillarDeduplication(pillarNumber)
  const sources = getSourceGuidance(pillarNumber, product)

  // Construct modular sections
  const headerSection = [
    `# EXECUTIVE PM RESEARCH PROMPT: ${promptName.toUpperCase()}`,
    `You are an elite ${roleTitle}. Conduct an exhaustive, evidence-based teardown of **${safeProductName}** by **${safeCompanyName}**. Uncover deep product insights, structural trade-offs, and strategic decisions beyond surface-level feature summaries.`,
  ].join('\n\n')

  const contextSection = [
    '## 1. PRODUCT CONTEXT & PARAMETERS',
    `- **Product Name**: ${safeProductName}`,
    `- **Company / Maker**: ${safeCompanyName}`,
    `- **Category**: ${safeCategory}`,
    `- **Primary Platform**: ${safePlatform}`,
    `- **Business Model**: ${safeBusinessModel}`,
    `- **Additional Context**: ${safeAdditionalContext || 'None specified. Analyze current public production offering.'}`,
  ].join('\n')

  const ethicalGuardrailsSection = [
    '## 2. ETHICAL GUARDRAILS & PUBLIC RESEARCH PROTOCOL',
    'Execute this teardown under strict ethical and compliance guidelines:',
    '1. **Public Information Only**: Rely EXCLUSIVELY on publicly available, observable, legitimately published data (public websites, help docs, app stores, patent filings, corporate blogs, earnings reports, public APIs, user reviews).',
    '2. **No Proprietary or Confidential Data**: Do NOT seek, infer, or hallucinate confidential internal documents, non-public roadmaps, unreleased features, or leaked source code.',
    '3. **No Personally Identifiable Information (PII)**: Do NOT include personal details, private contact data, or individual employee or user names.',
    '4. **Explicit Confidence Tagging**: Clearly distinguish verified facts from analytical inferences. Mark speculative conclusions as `[Inference]`.',
  ].join('\n')

  const boundarySection = [
    '## 3. SCOPE BOUNDARIES & CROSS-PILLAR DEDUPLICATION',
    scopeBoundary,
  ].join('\n\n')

  // Domain Directives (Smart filtering outputs)
  const domainDirectivesList: string[] = [
    ...categoryDirectives.map((d) => `- [Category: ${safeCategory}] ${d}`),
    ...platformDirectives.map((d) => `- [Platform: ${safePlatform}] ${d}`),
    ...businessModelDirectives.map((d) => `- [Model: ${safeBusinessModel}] ${d}`),
  ]

  const domainDirectivesSection =
    domainDirectivesList.length > 0
      ? [
          '## 4. CONTEXTUAL FOCUS & ADAPTATIONS',
          `Tailor your investigation to the operational realities of ${safeProductName}:`,
          ...domainDirectivesList,
        ].join('\n')
      : ''

  const lensesFormatted = formatLensesSection(adaptedLenses, safeProductName)
  const researchQuestionsSection = [
    '## 5. SYSTEMATIC RESEARCH LENSES & INVESTIGATION TASKS',
    `Thoroughly address each research lens for ${safeProductName}. Treat each bullet as an active investigative assignment:`,
    lensesFormatted,
  ].join('\n\n')

  const frameworksFormatted = formatFrameworksSection(skill.frameworks, safeProductName)
  const frameworksSection = [
    '## 6. FRAMEWORK GROUNDING & APPLICATION REQUIREMENTS',
    `You MUST ground your teardown in the following named frameworks. Systematically apply each to ${safeProductName}:`,
    frameworksFormatted,
  ].join('\n\n')

  const sourcesList = sources.map((s) => `- ${s}`).join('\n')
  const sourcesSection = [
    '## 7. RECOMMENDED PUBLIC RESEARCH SOURCES',
    `Consult and synthesize evidence from the following high-yield public sources for ${safeProductName}:`,
    sourcesList,
  ].join('\n')

  const outputFormatSection = [
    '## 8. REQUIRED OUTPUT FORMAT & STRUCTURE',
    'Structure your teardown report with the following standardized markdown sections:',
    '1. **Executive Summary Table**: Matrix with columns `[Key Dimension | Finding Summary | Strategic Impact (High/Med/Low) | Confidence (High/Med/Low)]`.',
    '2. **Detailed Lens Teardown**: Numbered sections per lens above with factual observations, metrics, quotes, and observable flows.',
    '3. **Framework Application Matrices**: Concrete tables or diagrams mapping ${safeProductName} against each required framework.',
    '4. **Critical Gaps & Strategic Vulnerabilities**: Table of 3-5 non-obvious product vulnerabilities, unaddressed pain points, or competitive risks.',
    '5. **Evidence Log & Sources**: Citations of public domains, filings, and community forums consulted.',
  ].join('\n')

  // Combine full prompt
  const fullPromptParts = [
    headerSection,
    contextSection,
    ethicalGuardrailsSection,
    boundarySection,
    domainDirectivesSection,
    researchQuestionsSection,
    frameworksSection,
    sourcesSection,
    outputFormatSection,
  ].filter(Boolean)

  let fullPrompt = fullPromptParts.join('\n\n---\n\n')

  // If prompt exceeds 4000 words (extreme edge case), condense formatting
  let wordCount = calculateWordCount(fullPrompt)
  if (wordCount > 4000) {
    fullPrompt = fullPrompt.replace(/\n{3,}/g, '\n\n')
    wordCount = calculateWordCount(fullPrompt)
  }

  const lensCount = adaptedLenses.length
  const frameworkCount = skill.frameworks ? skill.frameworks.length : 0
  const estimatedTime = estimateResearchTime(lensCount, frameworkCount)

  return {
    id: `prompt-${skill.id.replace('product-', '').replace('-research', '')}`,
    pillarNumber,
    pillarName: pillarMeta.title,
    promptName,
    icon: pillarMeta.iconName,
    color: pillarMeta.color,
    fullPrompt,
    wordCount,
    lensCount,
    frameworkCount,
    estimatedResearchTime: estimatedTime,
    metadata: {
      productName: safeProductName,
      companyName: safeCompanyName,
      category: safeCategory,
      platform: safePlatform,
      businessModel: safeBusinessModel,
      generatedAt: new Date().toISOString(),
    },
    // Backward compatibility fields
    content: fullPrompt,
    pillarId: skill.id,
    pillarTitle: pillarMeta.title,
    frameworks: skill.frameworks.map((f) => f.name),
    copied: false,
  }
}

/**
 * Compose prompts for all 6 pillars for a given product.
 */
export function composeAllPrompts(
  product: ProductInput,
  skills: SkillData[] = skillsData
): GeneratedPrompt[] {
  // Sort skills strictly by pillarNumber (1 to 6)
  const sortedSkills = [...skills].sort((a, b) => a.pillarNumber - b.pillarNumber)

  return sortedSkills.map((skill) => composePrompt(product, skill))
}
