# Product Discovery & Teardown — Implementation Plan

> **Version**: 3.0  
> **Last Updated**: 2026-10-16  
> **Scope**: Stage 1 (Input) → Stage 2 (Prompt Generation) → Stage 3 (Research Guide)  
> **Later phases** (Upload, Insight Explorer, Deck Builder) will be planned separately.

---

## Guiding Principles

1. **Ship each phase as a working increment** — every phase ends with something usable
2. **UI-first** — build the interface before the logic; validate the experience early
3. **Premium aesthetics from day one** — no "placeholder" UIs; every screen looks polished
4. **Type everything** — TypeScript strict mode, no `any`, no shortcuts

---

## Phase 0 — Project Scaffolding

> **Goal**: Bootable Vite + React + TypeScript + Tailwind project with routing and design system foundations.

### 0.1 Initialize Project

| Task | Details |
|------|---------|
| Scaffold Vite + React + TS | `npx -y create-vite@latest ./ --template react-ts` |
| Install Tailwind CSS v4 | Follow Vite integration guide for Tailwind v4 |
| Install React Router v7 | `npm install react-router` |
| Install Framer Motion | `npm install framer-motion` |
| Initialize shadcn/ui | `npx -y shadcn@latest init` — select New York style, Zinc base color, CSS variables |
| Add initial shadcn components | `npx shadcn@latest add button card input label select textarea badge tooltip dialog tabs separator` |

### 0.2 Design System Setup

| Task | Details |
|------|---------|
| Configure Tailwind theme | Custom color palette, typography scale, spacing, border radius |
| Set up CSS variables | Dark theme tokens in `index.css` via shadcn's theming |
| Import Google Font | Inter (primary), JetBrains Mono (code/prompts) |
| Create global styles | Smooth scrolling, selection colors, scrollbar styling |
| Set up Framer Motion defaults | Page transition variants, spring configs |

### 0.3 App Shell

| Task | Details |
|------|---------|
| Create `App.tsx` | Router setup with 6 stage routes |
| Create `Layout.tsx` | Persistent header + stage progress bar + main content area |
| Create `Header` component | Logo/wordmark, current product name (when set), stage title |
| Create `StageProgressBar` | 6-step visual indicator with completion states, clickable navigation |
| Create `PageTransition` wrapper | Framer Motion `AnimatePresence` wrapper for stage transitions |
| Set up React Context | `AppContext.tsx` + `reducer.ts` with initial state shape |
| Set up routing | `/` → Stage 1, `/prompts` → Stage 2, `/guide` → Stage 3, etc. |

### 0.4 Deliverable

✅ Empty app shell with navigation between 6 stages, dark theme, animated transitions, and progress bar.

---

## Phase 1 — Stage 1: Product Input

> **Goal**: Beautiful input form that captures product context and stores it in app state.

### 1.1 Product Input Form

| Task | Details |
|------|---------|
| `ProductNameInput` | Large, prominent text input with label "What product do you want to tear down?" |
| `CompanyNameInput` | Secondary input: "Who makes it?" with auto-suggest disabled |
| `CategorySelector` | Radio group or segmented control with options: Social & Communication, Productivity & Tools, E-commerce & Marketplace, Finance & Fintech, Health & Wellness, Education & Learning, Entertainment & Media, Developer Tools, Other |
| `PlatformSelector` | Chip/toggle group: Mobile, Web, Desktop, Cross-platform |
| `BusinessModelSelector` | Radio group: B2C, B2B, B2B2C, Marketplace, Platform |
| `AdditionalContext` | Optional textarea: "Anything specific you want to explore?" |

### 1.2 Form UX

| Task | Details |
|------|---------|
| Validation | Product name required (min 2 chars), company name required |
| Visual feedback | Input focus rings, validation error animations, character counters |
| CTA button | "Generate Research Prompts →" — disabled until required fields filled |
| Keyboard support | Tab order, Enter to submit |
| Persistence | Save form state to app context on change (no localStorage yet) |

### 1.3 Visual Design

| Task | Details |
|------|---------|
| Hero section | Large heading: "Discover any product like a Pro PM", supporting subtitle about the 6-pillar methodology |
| Layout | Centered card on dark background, glassmorphism card effect |
| Micro-interactions | Input focus glow, button hover/press states, form entry animations |
| Empty state → filled state | Subtle animation as user fills in the form |
| Responsive | Full-width on mobile, max-w-2xl centered on desktop |

### 1.4 Deliverable

✅ Working input form that captures product context, validates, and navigates to Stage 2.

---

## Phase 2 — Skills Data Pipeline

> **Goal**: Parse SKILL.md files at build time into structured TypeScript data available to the prompt engine.

### 2.1 Vite Plugin for SKILL.md Parsing

| Task | Details |
|------|---------|
| Create `plugins/vite-plugin-skills/index.ts` | Custom Vite plugin that runs at build time |
| YAML frontmatter extraction | Parse `---` delimited frontmatter for name, description |
| Markdown AST parsing | Use a lightweight markdown parser (or regex) to extract: |
| | • Research lenses (## headers under "Research Lenses Covered") |
| | • Questions under each lens (bullet points) |
| | • Framework names and descriptions |
| | • Prompt template (content inside the ``` code block after "Prompt Template") |
| | • Quality checklist items |
| Output format | Emit a virtual module `virtual:skills-data` that exports `SkillData[]` |
| Type definitions | Create `types/skills.ts` with `SkillData`, `ResearchLens`, `Framework` interfaces |

### 2.2 Alternative: Static JSON Generation

If the Vite virtual module approach proves complex, fallback to:

| Task | Details |
|------|---------|
| Build script | `scripts/parse-skills.ts` — Node script that reads SKILL.md files, outputs `src/data/skills.json` |
| NPM script | `"prebuild": "tsx scripts/parse-skills.ts"` |
| Import | `import skillsData from '@/data/skills.json'` with type assertion |

### 2.3 Skill Data Validation

| Task | Details |
|------|---------|
| Runtime validation | Verify all 6 research skills loaded, each has lenses + template |
| Console warnings | Warn if any skill is missing expected sections |
| Unit tests | Test parser output against known SKILL.md structure |

### 2.4 Deliverable

✅ All 6 SKILL.md files parsed into structured TypeScript data, importable as a module.

---

## Phase 3 — Prompt Composition Engine

> **Goal**: Pure-function engine that composes high-value research prompts by weaving product context into skill templates.

### 3.1 Core Composer

| Task | Details |
|------|---------|
| `lib/prompt-engine/composer.ts` | Main function: `composePrompt(product: ProductContext, skill: SkillData): GeneratedPrompt` |
| Template interpolation | Replace `[PRODUCT_NAME]`, `[COMPANY_NAME]` with actual values |
| Lens question injection | Replace `[INSERT LENS-SPECIFIC QUESTIONS]` with all research lens questions, formatted with numbered headers and bullet points |
| Framework reference injection | Ensure all framework names and descriptions are woven into the prompt body |
| Output format specification | Append structured output format instructions (tables, headers, bullets, confidence ratings) |
| Ethical guardrails injection | Ensure every prompt contains the "public information only" guardrails |

### 3.2 Smart Filtering

| Task | Details |
|------|---------|
| `lib/prompt-engine/filters.ts` | Functions that modify prompt content based on product context |
| Category-aware filtering | Skip irrelevant lenses: e.g., for a B2C app, de-emphasize "Enterprise Sales Loop" in market pillar |
| Platform-aware filtering | For web-only products, skip "Mobile architecture (native, hybrid, cross-platform)" questions |
| Business model context | For marketplace products, emphasize "Multi-sided platform actors" and "Cross-side network effects" |
| Cross-pillar dedup | Add a meta-instruction: "Focus on [pillar topic] specifically. Other pillars will cover [adjacent topics]." |

### 3.3 Prompt Enhancement

| Task | Details |
|------|---------|
| Action-oriented framing | Reframe lens questions from static lists to action-oriented research tasks |
| Context priming | Add a "Context" section at the top of each prompt with product name, category, platform, business model |
| Source guidance | Add specific source suggestions per pillar (e.g., "Check Crunchbase for funding data", "Review app store reviews for user pain points") |
| Length optimization | Target 800-1200 word prompts — long enough for depth, short enough for LLM context windows |
| Output structure | Specify exact output format the user should get back — headers, tables, bullet depth |

### 3.4 Prompt Data Model

```typescript
interface GeneratedPrompt {
  id: string;                      // e.g., "prompt-strategic"
  pillarNumber: number;            // 1-6
  pillarName: string;              // e.g., "Strategic & Business Context"
  promptName: string;              // e.g., "Strategic Deep Dive"
  icon: string;                    // Lucide icon name
  color: string;                   // Pillar accent color
  fullPrompt: string;              // The complete, ready-to-paste prompt
  wordCount: number;               // Prompt word count
  lensCount: number;               // Number of research lenses covered
  frameworkCount: number;          // Number of frameworks referenced
  estimatedResearchTime: string;   // e.g., "15-20 minutes"
  metadata: {
    productName: string;
    companyName: string;
    category: string;
    platform: string;
    businessModel: string;
    generatedAt: string;
  };
}
```

### 3.5 Deliverable

✅ `composePrompt()` function that produces 6 high-value, product-aware, framework-grounded prompts.

---

## Phase 4 — Stage 2: Prompt Generation UI

> **Goal**: Beautiful prompt display with copy, expand, preview, and download interactions.

### 4.1 Prompt Overview Grid

| Task | Details |
|------|---------|
| `Stage2_PromptGeneration.tsx` | Main page component |
| Hero section | "Your Research Prompts Are Ready" heading with product name + pillar count |
| 6-card grid | 3×2 grid on desktop, 2×3 on tablet, 1×6 stacked on mobile |
| Card design | Each card shows: pillar icon + color, pillar name, prompt name, lens count, framework count, word count, estimated time |
| Card states | Default → hover (glow + lift) → expanded (full prompt visible) |
| Stagger animation | Cards animate in with staggered delay on page load |

### 4.2 Prompt Card Component

| Task | Details |
|------|---------|
| `PromptCard.tsx` | Individual prompt card component |
| Collapsed view | Icon, title, metadata badges (lens count, framework count, ~word count) |
| Expand toggle | Click card or "View Prompt" button to expand inline |
| Expanded view | Full prompt text with syntax-style highlighting (headers bold, frameworks colored, questions structured) |
| Copy button | "📋 Copy Prompt" — copies full prompt to clipboard, shows toast "Copied!" |
| Prompt size indicator | Visual bar showing prompt length relative to LLM context window sweet spot |

### 4.3 Prompt Preview Modal

| Task | Details |
|------|---------|
| `PromptPreview.tsx` | Full-screen modal for reading/editing a single prompt |
| Display | Formatted prompt with: role instruction highlighted, lens questions numbered, frameworks in callout boxes |
| Edit mode | Toggle to editable textarea — user can customize before copying |
| Copy from modal | Copy button inside modal |
| Navigation | Previous/Next arrows to cycle through 6 prompts |

### 4.4 Batch Actions

| Task | Details |
|------|---------|
| "Copy All Prompts" button | Copies all 6 prompts separated by `---` dividers |
| "Download as .txt" button | Downloads a `.txt` file with all 6 prompts |
| "Download as .md" button | Downloads a `.md` file with formatted headers per pillar |
| Keyboard shortcuts | `Ctrl+C` when card focused copies that prompt |

### 4.5 Transition to Stage 3

| Task | Details |
|------|---------|
| CTA section | Below cards: "Now take these prompts to your favorite AI tool →" |
| Tool logos | Small logos/icons for ChatGPT, Gemini, Claude, Perplexity |
| "Continue to Research Guide →" button | Navigates to Stage 3 |

### 4.6 Deliverable

✅ Fully interactive prompt generation UI with copy, preview, edit, and download capabilities.

---

## Phase 5 — Stage 3: Research Guide

> **Goal**: In-app guide that teaches users how to use the prompts in external AI tools and create a summary document.

### 5.1 Research Workflow Guide

| Task | Details |
|------|---------|
| `Stage3_ResearchGuide.tsx` | Main page component |
| Step-by-step guide | Visual numbered steps with icons and descriptions |
| **Step 1**: Copy a prompt | "Copy one of your 6 research prompts from the previous stage" |
| **Step 2**: Open an AI tool | Card grid showing ChatGPT, Google Gemini, Claude, Perplexity with brief descriptions |
| **Step 3**: Paste & research | "Paste the prompt and let the AI do the deep research" |
| **Step 4**: Repeat for each pillar | "Run all 6 prompts for comprehensive coverage" |
| **Step 5**: Compile summary | "Combine all research into a single summary document" |

### 5.2 AI Tool Recommendation Cards

| Task | Details |
|------|---------|
| Tool cards | 4 cards, each with: tool logo/icon, tool name, best-for description, link to tool |
| **ChatGPT** | "Best for: Broad research with follow-up questions" — link to chat.openai.com |
| **Google Gemini** | "Best for: Web-grounded research with citations" — link to gemini.google.com |
| **Claude** | "Best for: Nuanced analysis and structured output" — link to claude.ai |
| **Perplexity** | "Best for: Citation-rich research with source links" — link to perplexity.ai |
| **Pro tip callout** | "Use Perplexity for fact-finding, then Gemini or ChatGPT for synthesis" |

### 5.3 Summary Document Guide

| Task | Details |
|------|---------|
| "How to Create Your Summary" section | Collapsible/accordion with detailed instructions |
| Template download | "📥 Download Summary Template (.md)" — pre-structured markdown file with pillar headers |
| Template preview | Inline preview of the template structure |
| Format requirements | "Use Markdown format (.md or .txt). Structure your findings under the 6 pillar headings." |
| Pro tips | "Use Google NotebookLM to upload all 6 research outputs and ask it to synthesize a unified summary document" |
| Example summary | Collapsible section showing a sample summary document (abbreviated) for a well-known product |

### 5.4 NotebookLM Workflow (Highlighted)

| Task | Details |
|------|---------|
| NotebookLM callout card | Prominent card recommending NotebookLM as a synthesis tool |
| Step-by-step | 1. Go to notebooklm.google.com → 2. Create notebook → 3. Upload 6 research outputs → 4. Ask "Create a unified summary organized by these 6 pillars: [list]" → 5. Copy/download the summary |
| Why NotebookLM | "It can process all 6 research documents simultaneously and produce a coherent, cross-referenced summary" |

### 5.5 Transition to Stage 4

| Task | Details |
|------|---------|
| CTA section | "Once you have your summary document ready..." |
| "Upload Summary Document →" button | Navigates to Stage 4 |
| Checklist | "Before uploading, make sure your summary: ✓ Covers all 6 pillars, ✓ Is in Markdown or plain text format, ✓ Contains specific findings (not just questions)" |

### 5.6 Deliverable

✅ Complete research guide with AI tool recommendations, summary template download, and NotebookLM workflow.

---

## Phase Summary

| Phase | What Ships | Key Files |
|-------|-----------|-----------|
| **Phase 0** | App shell, routing, design system, dark theme | `App.tsx`, `Layout.tsx`, `index.css`, `AppContext.tsx` |
| **Phase 1** | Product input form with validation | `Stage1_ProductInput.tsx`, `reducer.ts` |
| **Phase 2** | SKILL.md → structured data pipeline | `vite-plugin-skills/`, `types/skills.ts`, `skills.json` |
| **Phase 3** | Prompt composition engine | `composer.ts`, `filters.ts`, `GeneratedPrompt` types |
| **Phase 4** | Prompt generation UI | `Stage2_PromptGeneration.tsx`, `PromptCard.tsx`, `PromptPreview.tsx` |
| **Phase 5** | Research guide with AI tool instructions | `Stage3_ResearchGuide.tsx`, summary template `.md` |

---

## Future Phases (Not Yet Planned in Detail)

These will be planned after the prompt generation pipeline is complete and validated:

| Phase | Stage | What It Covers |
|-------|-------|---------------|
| **Phase 6** | Stage 4: Upload & Parse | Drag-and-drop file upload, deterministic Markdown parser, pillar mapping, insight extraction |
| **Phase 7** | Stage 5: Insight Explorer | Interactive insight card grid, pillar navigation, filtering, search, selection for deck |
| **Phase 8** | Stage 6: Deck Builder | Slide ordering with drag-and-drop, slide preview, theme selection, PPTX/PDF export |
| **Phase 9** | Polish & Deploy | Performance optimization, accessibility audit, Vercel deployment, README |

---

## Definition of Done (Per Phase)

- [ ] All tasks completed and manually tested
- [ ] TypeScript strict mode — no `any` types
- [ ] Responsive on mobile, tablet, and desktop
- [ ] Keyboard navigable
- [ ] Dark theme consistently applied
- [ ] Page transitions smooth
- [ ] No console errors or warnings
- [ ] Code follows ESLint + Prettier rules
