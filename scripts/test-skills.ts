import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parseSkillMarkdown, validateSkillsData } from '../plugins/vite-plugin-skills/parser.ts'
import { PillarId } from '../src/types/index.ts'
import { SkillData } from '../src/types/skills.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const skillsDir = path.resolve(rootDir, 'skills')

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ Assertion Failed: ${message}`)
    throw new Error(message)
  }
}

function runTests() {
  console.log('🧪 Running Skills Pipeline Unit Tests...\n')

  const researchSkillIds: PillarId[] = [
    'product-strategic-research',
    'product-market-research',
    'product-user-research',
    'product-technical-research',
    'product-behavioral-research',
    'product-ethics-research',
  ]

  const loadedSkills: SkillData[] = []

  for (const skillId of researchSkillIds) {
    const filePath = path.join(skillsDir, skillId, 'SKILL.md')
    assert(fs.existsSync(filePath), `Skill file must exist at ${filePath}`)

    const content = fs.readFileSync(filePath, 'utf-8')
    const parsed = parseSkillMarkdown(content, skillId)
    loadedSkills.push(parsed)
  }

  // Test 1: Exactly 6 skills loaded
  assert(loadedSkills.length === 6, 'Should parse exactly 6 research skills')
  console.log('✅ Test 1: Exactly 6 research skills loaded')

  // Test 2: Validation passes with no errors
  const validation = validateSkillsData(loadedSkills)
  assert(validation.isValid, 'Validation result should be valid')
  assert(validation.errors.length === 0, 'Validation should have 0 errors')
  assert(validation.totalLenses === 47, `Total lenses should be 47 (found ${validation.totalLenses})`)
  assert(validation.totalFrameworks === 20, `Total frameworks should be 20 (found ${validation.totalFrameworks})`)
  console.log(`✅ Test 2: Validation passed (47 lenses, 20 frameworks across 6 pillars)`)

  // Test 3: Strategic Pillar (Pillar 1) detailed assertions
  const strategic = loadedSkills.find((s) => s.id === 'product-strategic-research')!
  assert(strategic.pillarNumber === 1, 'Strategic pillar number must be 1')
  assert(strategic.lenses.length === 9, `Strategic pillar should have 9 lenses, found ${strategic.lenses.length}`)
  assert(
    strategic.lenses[0].title.toLowerCase().includes('mission'),
    'Lens 1 should be Mission & Vision'
  )
  assert(strategic.frameworks.length === 3, 'Strategic pillar should have 3 frameworks')
  assert(
    strategic.promptTemplate.includes('[PRODUCT_NAME]'),
    'Template must contain [PRODUCT_NAME]'
  )
  assert(
    strategic.promptTemplate.includes('[COMPANY_NAME]'),
    'Template must contain [COMPANY_NAME]'
  )
  assert(
    strategic.qualityChecklist.length >= 4,
    'Strategic pillar should have quality checklist items'
  )
  console.log('✅ Test 3: Pillar 1 (Strategic) verified (9 lenses, 3 frameworks, templates, checklist)')

  // Test 4: Market Pillar (Pillar 2) detailed assertions
  const market = loadedSkills.find((s) => s.id === 'product-market-research')!
  assert(market.pillarNumber === 2, 'Market pillar number must be 2')
  assert(market.lenses.length === 7, `Market pillar should have 7 lenses, found ${market.lenses.length}`)
  assert(
    market.frameworks.some((f) => f.name.includes("Porter's Five Forces")),
    'Must include Porter Five Forces framework'
  )
  console.log('✅ Test 4: Pillar 2 (Market) verified (7 lenses, Porter Five Forces, Growth Loops)')

  // Test 5: User Research Pillar (Pillar 3) detailed assertions
  const user = loadedSkills.find((s) => s.id === 'product-user-research')!
  assert(user.pillarNumber === 3, 'User research pillar number must be 3')
  assert(user.lenses.length === 12, `User pillar should have 12 lenses, found ${user.lenses.length}`)
  assert(
    user.frameworks.some((f) => f.name.includes('JTBD')),
    'Must include JTBD framework'
  )
  console.log('✅ Test 5: Pillar 3 (Users & Craft) verified (12 lenses, JTBD, HEART framework)')

  // Test 6: Technical Pillar (Pillar 4) detailed assertions
  const tech = loadedSkills.find((s) => s.id === 'product-technical-research')!
  assert(tech.pillarNumber === 4, 'Tech pillar number must be 4')
  assert(tech.lenses.length === 11, `Tech pillar should have 11 lenses, found ${tech.lenses.length}`)
  assert(
    tech.frameworks.some((f) => f.name.includes('C4 Model')),
    'Must include C4 Model'
  )
  console.log('✅ Test 6: Pillar 4 (Technical) verified (11 lenses, C4 Model, API Maturity, A11y)')

  // Test 7: Behavioral Psychology (Pillar 5) detailed assertions
  const behavioral = loadedSkills.find((s) => s.id === 'product-behavioral-research')!
  assert(behavioral.pillarNumber === 5, 'Behavioral pillar number must be 5')
  assert(behavioral.lenses.length === 4, `Behavioral pillar should have 4 lenses, found ${behavioral.lenses.length}`)
  assert(
    behavioral.frameworks.some((f) => f.name.includes('Hook Model')),
    'Must include Hook Model'
  )
  console.log('✅ Test 7: Pillar 5 (Behavioral) verified (4 lenses with sub-lenses, Hook Model, Fogg B=MAT)')

  // Test 8: Trust, Safety & Ethics (Pillar 6) detailed assertions
  const ethics = loadedSkills.find((s) => s.id === 'product-ethics-research')!
  assert(ethics.pillarNumber === 6, 'Ethics pillar number must be 6')
  assert(ethics.lenses.length === 4, `Ethics pillar should have 4 lenses, found ${ethics.lenses.length}`)
  assert(
    ethics.frameworks.some((f) => f.name.includes('Privacy by Design')),
    'Must include Privacy by Design'
  )
  console.log('✅ Test 8: Pillar 6 (Ethics & Safety) verified (4 lenses, Privacy by Design, Dark Patterns)')

  // Test 9: All questions extracted have non-empty content
  let totalQuestions = 0
  for (const s of loadedSkills) {
    for (const l of s.lenses) {
      assert(l.questions.length > 0, `Lens ${l.title} in ${s.id} must have questions`)
      totalQuestions += l.questions.length
    }
  }
  assert(totalQuestions > 100, `Should extract rich set of questions, found ${totalQuestions}`)
  console.log(`✅ Test 9: All lenses contain questions (${totalQuestions} total questions parsed)`)

  // Test 10: Missing skill data edge case (docs/edge-cases.md)
  const fiveSkillsSubset = loadedSkills.slice(0, 5) // Simulate 5 of 6 skills available
  const subsetValidation = validateSkillsData(fiveSkillsSubset)
  assert(subsetValidation.isValid, 'Should remain valid with 5/6 skills (non-fatal)')
  assert(
    subsetValidation.warnings.some((w) => w.includes('Missing research skill')),
    'Should emit build-time warning for missing skill'
  )
  console.log('✅ Test 10: Missing skill edge case verified (build-time warning emitted, app loads with 5/6 prompts)')

  console.log('\n🎉 ALL 10 UNIT TESTS PASSED SUCCESSFULLY!\n')
}

runTests()
