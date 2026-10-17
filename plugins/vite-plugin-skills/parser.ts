import type { Framework, ResearchLens, SkillData, SkillsValidationResult } from '../../src/types/skills.ts'
import type { PillarId } from '../../src/types/index.ts'

interface PillarMapping {
  id: PillarId
  number: number
  title: string
}

const PILLAR_MAPPINGS: Record<string, PillarMapping> = {
  'product-strategic-research': {
    id: 'product-strategic-research',
    number: 1,
    title: 'Strategic & Business Context',
  },
  'product-market-research': {
    id: 'product-market-research',
    number: 2,
    title: 'Market, Competition & Go-To-Market',
  },
  'product-user-research': {
    id: 'product-user-research',
    number: 3,
    title: 'Users, Outcomes & Product Craft',
  },
  'product-technical-research': {
    id: 'product-technical-research',
    number: 4,
    title: 'Technical Architecture & Design',
  },
  'product-behavioral-research': {
    id: 'product-behavioral-research',
    number: 5,
    title: 'Behavioral Psychology & Engagement',
  },
  'product-ethics-research': {
    id: 'product-ethics-research',
    number: 6,
    title: 'Trust, Safety & Ethics',
  },
}

/**
 * Extracts YAML frontmatter key-value pairs from markdown
 */
function extractFrontmatter(content: string): { name: string; description: string } {
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!frontmatterMatch) {
    return { name: '', description: '' }
  }

  const rawYaml = frontmatterMatch[1]
  const nameMatch = rawYaml.match(/^name:\s*(.+)$/m)
  const name = nameMatch ? nameMatch[1].trim() : ''

  // Multi-line folded description (e.g., description: >\n  line 1\n  line 2)
  let description = ''
  const descMatch = rawYaml.match(/description:\s*(?:>|\|)?\s*\r?\n([\s\S]*?)(?:^[a-zA-Z0-9_-]+:|$)/m)
  if (descMatch) {
    description = descMatch[1]
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .join(' ')
  } else {
    const singleLineMatch = rawYaml.match(/^description:\s*(.+)$/m)
    if (singleLineMatch) {
      description = singleLineMatch[1].trim()
    }
  }

  return { name, description }
}

/**
 * Extracts section text between a specific level-2 header and the next level-2 header
 */
function extractSection(content: string, headerPrefix: string): string {
  const lines = content.split(/\r?\n/)
  let inSection = false
  const sectionLines: string[] = []

  for (const line of lines) {
    if (new RegExp(`^##\\s+${headerPrefix}`, 'i').test(line)) {
      inSection = true
      continue
    }

    if (inSection) {
      // If we encounter another level-2 header (## but not ###), we exit the section
      if (/^##\s+/.test(line)) {
        break
      }
      sectionLines.push(line)
    }
  }

  return sectionLines.join('\n').trim()
}

function buildLens(raw: { number: number; title: string; lines: string[] }, fallbackIndex: number): ResearchLens {
  const lensNum = raw.number || fallbackIndex
  const questions: string[] = []
  const subsections: Array<{ title: string; questions: string[] }> = []

  let currentSubTitle = ''
  let currentSubQuestions: string[] = []

  for (const line of raw.lines) {
    const subMatch = line.match(/^####\s+(.+)$/)
    if (subMatch) {
      if (currentSubTitle && currentSubQuestions.length > 0) {
        subsections.push({ title: currentSubTitle, questions: [...currentSubQuestions] })
        currentSubQuestions = []
      }
      currentSubTitle = subMatch[1].trim()
      continue
    }

    const bulletMatch = line.match(/^\s*[-*]\s+(.+)$/)
    if (bulletMatch) {
      const q = bulletMatch[1].trim()
      questions.push(currentSubTitle ? `${currentSubTitle}: ${q}` : q)
      if (currentSubTitle) {
        currentSubQuestions.push(q)
      }
      continue
    }

    // Markdown table row parsing (e.g. Cognitive biases, Dark patterns)
    const tableRowMatch = line.match(/^\s*\|\s*([^|]+)\|\s*([^|]+)(?:\|\s*([^|]+))?\|/)
    if (tableRowMatch) {
      const col1 = tableRowMatch[1].trim().replace(/\*\*/g, '')
      const col2 = tableRowMatch[2].trim()
      const col3 = tableRowMatch[3]?.trim()

      // Skip header and separator rows
      if (
        col1 &&
        !/^[-:\s]+$/.test(col1) &&
        !/^bias|dark pattern|dimension|metric|name$/i.test(col1)
      ) {
        const item = col3 ? `${col1}: ${col2} (Context: ${col3})` : `${col1}: ${col2}`
        questions.push(currentSubTitle ? `${currentSubTitle}: ${item}` : item)
        if (currentSubTitle) {
          currentSubQuestions.push(item)
        }
      }
    }
  }

  if (currentSubTitle && currentSubQuestions.length > 0) {
    subsections.push({ title: currentSubTitle, questions: currentSubQuestions })
  }

  return {
    id: `lens-${lensNum}-${raw.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    number: lensNum,
    title: raw.title,
    questions,
    subsections: subsections.length > 0 ? subsections : undefined,
  }
}

/**
 * Parses Research Lenses section into structured ResearchLens objects
 */
function parseLenses(lensesSection: string): ResearchLens[] {
  if (!lensesSection) return []

  const lines = lensesSection.split(/\r?\n/)
  const lenses: ResearchLens[] = []
  let currentLens: { number: number; title: string; lines: string[] } | null = null

  for (const line of lines) {
    const headerMatch = line.match(/^###\s+(?:(\d+)\.\s*)?([^\r\n]+)/)
    if (headerMatch) {
      if (currentLens) {
        lenses.push(buildLens(currentLens, lenses.length + 1))
      }
      currentLens = {
        number: headerMatch[1] ? parseInt(headerMatch[1], 10) : lenses.length + 1,
        title: headerMatch[2].trim(),
        lines: [],
      }
    } else if (currentLens) {
      currentLens.lines.push(line)
    }
  }

  if (currentLens) {
    lenses.push(buildLens(currentLens, lenses.length + 1))
  }

  return lenses
}

function buildFramework(raw: { name: string; lines: string[] }): Framework {
  const fullText = raw.lines.join('\n').trim()

  // Extract code block diagram if present
  const diagramMatch = fullText.match(/```(?:\w+)?\r?\n([\s\S]*?)\r?\n```/)
  const diagram = diagramMatch ? diagramMatch[1].trim() : undefined

  // Description is the text without the diagram code block
  const textWithoutDiagram = fullText.replace(/```(?:\w+)?\r?\n[\s\S]*?\r?\n```/g, '').trim()
  const description =
    textWithoutDiagram
      .split(/\r?\n\r?\n/)
      .map((p) => p.trim())
      .filter(Boolean)[0] || raw.name

  return {
    name: raw.name,
    description,
    diagram,
  }
}

/**
 * Parses Frameworks section into structured Framework objects
 */
function parseFrameworks(frameworksSection: string): Framework[] {
  if (!frameworksSection) return []

  const lines = frameworksSection.split(/\r?\n/)
  const frameworks: Framework[] = []
  let currentFramework: { name: string; lines: string[] } | null = null

  for (const line of lines) {
    const headerMatch = line.match(/^###\s+([^\r\n]+)/)
    if (headerMatch) {
      if (currentFramework) {
        frameworks.push(buildFramework(currentFramework))
      }
      currentFramework = {
        name: headerMatch[1].trim(),
        lines: [],
      }
    } else if (currentFramework) {
      currentFramework.lines.push(line)
    }
  }

  if (currentFramework) {
    frameworks.push(buildFramework(currentFramework))
  }

  return frameworks
}

/**
 * Extracts prompt template from ``` code fence
 */
function parsePromptTemplate(templateSection: string): string {
  if (!templateSection) return ''
  const codeBlockMatch = templateSection.match(/```(?:\w+)?\r?\n([\s\S]*?)\r?\n```/)
  return codeBlockMatch ? codeBlockMatch[1].trim() : templateSection.trim()
}

/**
 * Parses quality checklist items
 */
function parseChecklist(checklistSection: string): string[] {
  if (!checklistSection) return []
  const items: string[] = []
  const lines = checklistSection.split(/\r?\n/)
  for (const line of lines) {
    const checkMatch = line.match(/^\s*-\s*\[[ x]\]\s*(.+)$/i)
    if (checkMatch) {
      items.push(checkMatch[1].trim())
    }
  }
  return items
}

/**
 * Parses a single SKILL.md file content into structured SkillData
 */
export function parseSkillMarkdown(rawContent: string, fallbackId?: PillarId): SkillData {
  const frontmatter = extractFrontmatter(rawContent)
  const skillId = (frontmatter.name || fallbackId || '') as PillarId
  const mapping = PILLAR_MAPPINGS[skillId] || {
    id: skillId,
    number: 1,
    title: frontmatter.name,
  }

  const purpose = extractSection(rawContent, 'Purpose')
  const lensesSection = extractSection(rawContent, 'Research Lenses')
  const frameworksSection =
    extractSection(rawContent, 'Frameworks to Apply') || extractSection(rawContent, 'Frameworks')
  const templateSection = extractSection(rawContent, 'Prompt Template')
  const checklistSection = extractSection(rawContent, 'Quality Checklist')

  const lenses = parseLenses(lensesSection)
  const frameworks = parseFrameworks(frameworksSection)
  const promptTemplate = parsePromptTemplate(templateSection)
  const qualityChecklist = parseChecklist(checklistSection)

  return {
    id: mapping.id,
    name: frontmatter.name || mapping.id,
    pillarNumber: mapping.number,
    pillarTitle: mapping.title,
    description: frontmatter.description,
    purpose,
    lenses,
    frameworks,
    promptTemplate,
    qualityChecklist,
    rawContent,
  }
}

/**
 * Validates loaded skills against specification criteria
 */
export function validateSkillsData(skills: SkillData[]): SkillsValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  if (!skills || skills.length === 0) {
    errors.push('No skill data was loaded.')
    return {
      isValid: false,
      totalSkills: 0,
      totalLenses: 0,
      totalFrameworks: 0,
      errors,
      warnings,
    }
  }

  const requiredPillars: PillarId[] = [
    'product-strategic-research',
    'product-market-research',
    'product-user-research',
    'product-technical-research',
    'product-behavioral-research',
    'product-ethics-research',
  ]

  for (const requiredId of requiredPillars) {
    const found = skills.find((s) => s.id === requiredId)
    if (!found) {
      warnings.push(`Missing research skill: ${requiredId} (App will load with ${skills.length}/6 prompts)`)
    }
  }

  let totalLenses = 0
  let totalFrameworks = 0

  for (const skill of skills) {
    totalLenses += skill.lenses.length
    totalFrameworks += skill.frameworks.length

    if (!skill.description) {
      warnings.push(`Skill ${skill.id} has an empty description frontmatter.`)
    }
    if (!skill.purpose) {
      warnings.push(`Skill ${skill.id} is missing a ## Purpose section.`)
    }
    if (skill.lenses.length === 0) {
      errors.push(`Skill ${skill.id} has 0 parsed research lenses.`)
    }
    if (skill.frameworks.length === 0) {
      warnings.push(`Skill ${skill.id} has 0 parsed frameworks.`)
    }
    if (!skill.promptTemplate) {
      errors.push(`Skill ${skill.id} is missing a prompt template inside code fences.`)
    }
  }

  return {
    isValid: errors.length === 0,
    totalSkills: skills.length,
    totalLenses,
    totalFrameworks,
    errors,
    warnings,
  }
}
