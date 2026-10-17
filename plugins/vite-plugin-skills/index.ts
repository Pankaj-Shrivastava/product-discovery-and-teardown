import fs from 'fs'
import path from 'path'
import type { Plugin } from 'vite'
import { parseSkillMarkdown, validateSkillsData } from './parser.ts'
import type { SkillData } from '../../src/types/skills.ts'
import type { PillarId } from '../../src/types/index.ts'

const VIRTUAL_MODULE_ID = 'virtual:skills-data'
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`

const RESEARCH_SKILL_DIRS: PillarId[] = [
  'product-strategic-research',
  'product-market-research',
  'product-user-research',
  'product-technical-research',
  'product-behavioral-research',
  'product-ethics-research',
]

export interface VitePluginSkillsOptions {
  skillsDir?: string
  warnOnMissing?: boolean
}

/**
 * Loads and parses all 6 research skills from the filesystem
 */
export function loadAllSkills(skillsDir: string, warnOnMissing = true): SkillData[] {
  const loadedSkills: SkillData[] = []

  for (const skillId of RESEARCH_SKILL_DIRS) {
    const skillFilePath = path.join(skillsDir, skillId, 'SKILL.md')

    if (!fs.existsSync(skillFilePath)) {
      if (warnOnMissing) {
        console.warn(`[vite-plugin-skills] Warning: Missing skill file at ${skillFilePath}`)
      }
      continue
    }

    try {
      const rawContent = fs.readFileSync(skillFilePath, 'utf-8')
      const parsed = parseSkillMarkdown(rawContent, skillId)
      loadedSkills.push(parsed)
    } catch (err) {
      console.error(`[vite-plugin-skills] Failed to parse skill at ${skillFilePath}:`, err)
    }
  }

  // Sort by pillarNumber (1 to 6)
  loadedSkills.sort((a, b) => a.pillarNumber - b.pillarNumber)

  // Validate loaded skills
  const validation = validateSkillsData(loadedSkills)
  if (validation.warnings.length > 0 && warnOnMissing) {
    for (const w of validation.warnings) {
      console.warn(`[vite-plugin-skills] ${w}`)
    }
  }
  if (!validation.isValid) {
    console.error(`[vite-plugin-skills] Validation errors:`, validation.errors)
  }

  return loadedSkills
}

/**
 * Vite plugin that parses SKILL.md files into structured TypeScript data
 * and exposes them via `virtual:skills-data`.
 */
export function vitePluginSkills(options: VitePluginSkillsOptions = {}): Plugin {
  let rootDir = process.cwd()
  let skillsDirectory = options.skillsDir || path.resolve(rootDir, 'skills')

  return {
    name: 'vite-plugin-skills',

    configResolved(config) {
      rootDir = config.root
      if (!options.skillsDir) {
        skillsDirectory = path.resolve(rootDir, 'skills')
      }
    },

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID
      }
      return null
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        const skills = loadAllSkills(skillsDirectory, options.warnOnMissing ?? true)

        // Register each SKILL.md file for HMR watch tracking
        for (const skillId of RESEARCH_SKILL_DIRS) {
          const filePath = path.join(skillsDirectory, skillId, 'SKILL.md')
          if (fs.existsSync(filePath)) {
            this.addWatchFile(filePath)
          }
        }

        return `
export const skillsData = ${JSON.stringify(skills, null, 2)};
export default skillsData;
`
      }
      return null
    },

    handleHotUpdate({ file, server }) {
      if (file.includes('skills') && file.endsWith('.md')) {
        const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID)
        if (mod) {
          server.moduleGraph.invalidateModule(mod)
          server.ws.send({
            type: 'full-reload',
            path: '*',
          })
        }
      }
    },
  }
}

export default vitePluginSkills
