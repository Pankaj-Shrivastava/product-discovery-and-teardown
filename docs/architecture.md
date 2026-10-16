# Product Discovery & Teardown — Architecture Document

> **Version**: 3.0  
> **Last Updated**: 2026-10-16  
> **Status**: Active  
> **Scope**: Full system architecture (implementation phased separately)

---

## 1. System Overview

A **100% client-side React web application** that empowers Product Managers to systematically research any product and build a portfolio-ready teardown presentation. The tool generates structured deep-search prompts across 6 research pillars, guides users through external AI-powered research, then deterministically parses and presents insights for the user to curate into a polished slide deck.

### 1.1 Design Philosophy

| Principle | Implementation |
|-----------|---------------|
| **Zero backend** | Entire app runs in the browser — no servers, no APIs, no infrastructure costs |
| **Zero LLM dependency** | No AI/LLM calls from the app itself. Prompt generation is template synthesis; insight parsing is deterministic |
| **Privacy-first** | No data leaves the browser. No analytics, no tracking, no external calls |
| **Framework-grounded** | Every prompt is backed by established PM frameworks (BMC, Porter's, JTBD, Hook Model, etc.) |
| **User owns their data** | All research, insights, and decks live in the user's files — the app is just a processing tool |

### 1.2 What This App Does NOT Do

- ❌ **No BYOK (Bring Your Own Key)** — API keys in the browser create XSS, supply-chain, and network interception vulnerabilities. Users run prompts in their own AI tools externally.
- ❌ **No server-side processing** — No backend, no cloud functions, no database
- ❌ **No user accounts** — No login, no authentication, no session management
- ❌ **No proprietary data** — Only public information; legal/ethical guardrails enforced at the prompt level

---

## 2. User Flow Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          PRODUCT DISCOVERY & TEARDOWN                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Stage 1          Stage 2           Stage 3          Stage 4                │
│  ┌──────────┐    ┌──────────┐    ┌───────────┐    ┌──────────────┐         │
│  │  INPUT   │───▶│ PROMPTS  │───▶│ RESEARCH  │───▶│ UPLOAD &     │         │
│  │ Product  │    │ Generate │    │  GUIDE    │    │ PARSE        │         │
│  │ Name +   │    │ 6 deep   │    │ How to    │    │ Summary Doc  │         │
│  │ Context  │    │ prompts  │    │ research  │    │ Drag & Drop  │         │
│  └──────────┘    └──────────┘    └───────────┘    └──────┬───────┘         │
│                                                          │                  │
│                    Stage 6           Stage 5              │                  │
│                  ┌───────────┐    ┌───────────┐          │                  │
│                  │ BUILD     │◀───│ INSIGHT   │◀─────────┘                  │
│                  │ YOUR DECK │    │ EXPLORER  │                             │
│                  │ Select,   │    │ Beautiful │                             │
│                  │ Reorder,  │    │ interactive│                            │
│                  │ Export    │    │ presentation│                           │
│                  └───────────┘    └───────────┘                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Stage Details

| Stage | Name | Input | Output | LLM Required? |
|-------|------|-------|--------|---------------|
| 1 | **Product Input** | Product name, company name, category, platform type | Validated product context object | ❌ No |
| 2 | **Prompt Generation** | Product context object + 6 SKILL.md templates | 6 fully-composed deep-research prompts | ❌ No |
| 3 | **Research Guide** | (informational) | Instructions for using prompts in AI tools + creating summary doc | ❌ No |
| 4 | **Upload & Parse** | User's summary document (Markdown/TXT) | Structured insight data organized by pillar | ❌ No |
| 5 | **Insight Explorer** | Parsed insight data | Interactive, visual insight cards with pillar navigation | ❌ No |
| 6 | **Build Your Deck** | User-selected insights | PPTX / PDF download | ❌ No |

---

## 3. Technology Stack

### 3.1 Core Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| **Runtime** | React | 19.x | Component model, ecosystem, DX |
| **Language** | TypeScript | 5.x | Type safety, IDE support, refactoring confidence |
| **Build Tool** | Vite | 6.x | Fast HMR, optimized builds, ESBuild under the hood |
| **Styling** | Tailwind CSS | 4.x | Utility-first, design tokens, responsive |
| **Components** | shadcn/ui | latest | Radix primitives + Tailwind, no dependency lock-in, accessible |
| **Routing** | React Router | 7.x | Stage-based navigation, URL-driven state |
| **State** | React Context + useReducer | built-in | Lightweight, sufficient for multi-stage wizard flow |
| **Icons** | Lucide React | latest | Consistent, tree-shakeable icon set (used by shadcn/ui) |

### 3.2 Feature Libraries

| Feature | Library | Purpose |
|---------|---------|---------|
| **Markdown Parsing** | `unified` + `remark` + `rehype` | Parse user's summary doc into AST, extract structured data |
| **Drag & Drop** | `@dnd-kit/core` | Reorder slides, sections in deck builder |
| **File Upload** | `react-dropzone` | Drag-and-drop file upload with validation |
| **PPT Generation** | `pptxgenjs` | Client-side PowerPoint file creation |
| **PDF Export** | `jspdf` + `html2canvas` | Client-side PDF rendering from slide previews |
| **Clipboard** | Navigator Clipboard API | One-click prompt copying |
| **Syntax Highlighting** | `shiki` | Prompt preview with syntax highlighting |
| **Animations** | `framer-motion` | Page transitions, micro-interactions, card animations |

### 3.3 Build-Time Tooling

| Tool | Purpose |
|------|---------|
| **Vite Plugin (custom)** | Parse SKILL.md files at build time → emit structured JSON |
| **ESLint + Prettier** | Code quality and formatting |
| **TypeScript strict mode** | Maximum type safety |

### 3.4 Deployment

| Target | Method | Notes |
|--------|--------|-------|
| **Vercel** (primary) | Git push → auto-deploy | Zero config for Vite + React |
| **GitHub Pages** (fallback) | `vite build` → deploy `dist/` | Static SPA with hash routing |

---

## 4. Data Architecture

### 4.1 Skills Data Pipeline (Build-Time)

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  SKILL.md files  │     │  Vite Plugin     │     │  skills.json     │
│  (6 research +   │────▶│  (build-time)    │────▶│  (bundled in     │
│   2 teardown)    │     │  Parse YAML +    │     │   app as module) │
│                  │     │  Extract lenses,  │     │                  │
│                  │     │  frameworks,      │     │                  │
│                  │     │  templates        │     │                  │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

Each skill is transformed into:

```typescript
interface SkillData {
  id: string;                    // e.g., "product-strategic-research"
  name: string;                  // e.g., "Strategic & Business Context"
  pillarNumber: number;          // 1-6
  description: string;           // From YAML frontmatter
  lenses: ResearchLens[];        // Extracted research dimensions
  frameworks: Framework[];       // Named frameworks with descriptions
  promptTemplate: string;        // The prompt template with placeholders
  qualityChecklist: string[];    // Quality validation items
}

interface ResearchLens {
  name: string;                  // e.g., "Mission & Vision"
  questions: string[];           // Specific research questions
}

interface Framework {
  name: string;                  // e.g., "Business Model Canvas"
  description: string;
  visual?: string;               // ASCII diagram if present
}
```

### 4.2 Application State Shape

```typescript
interface AppState {
  // Stage 1: Product Input
  product: {
    name: string;
    companyName: string;
    category: ProductCategory;      // 'social' | 'productivity' | 'ecommerce' | etc.
    platform: Platform;             // 'mobile' | 'web' | 'desktop' | 'cross-platform'
    businessModel: BusinessModel;   // 'b2c' | 'b2b' | 'b2b2c' | 'marketplace'
    additionalContext?: string;     // Free-form user notes
  };

  // Stage 2: Generated Prompts
  prompts: GeneratedPrompt[];       // 6 prompts, one per pillar

  // Stage 4-5: Parsed Insights
  insights: PillarInsights;         // Structured data from summary doc

  // Stage 6: Deck Builder
  deck: DeckState;                  // Selected slides, order, customizations

  // Navigation
  currentStage: 1 | 2 | 3 | 4 | 5 | 6;
  stageCompletion: Record<number, boolean>;
}
```

### 4.3 Prompt Composition Engine

The prompt generation is **pure deterministic string composition** — no LLM involved:

```
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────────────┐
│  Product Context │   │  Skill Template  │   │  Composed Prompt        │
│  ───────────────│   │  ─────────────── │   │  ───────────────────── │
│  name: "Notion" │ + │  role preamble   │ = │  Full prompt with:      │
│  company: "..."  │   │  lens questions  │   │  • Role instruction     │
│  category: prod  │   │  framework refs  │   │  • All lens questions   │
│  platform: web   │   │  output format   │   │  • Framework references │
│  model: b2b      │   │  guardrails      │   │  • Output structure     │
│                  │   │  quality checks  │   │  • Ethical guardrails   │
└─────────────────┘   └─────────────────┘   │  • Product-specific     │
                                             │    context woven in     │
                                             └─────────────────────────┘
```

**Smart composition features:**
- Product category awareness (skip marketplace questions for single-player tools)
- Platform-specific lens filtering (skip mobile architecture for web-only products)
- Cross-pillar deduplication instructions (avoid redundancy across 6 prompts)
- Output format optimization for LLM consumption

### 4.4 Summary Document Parser (Deterministic)

The parser converts user's summary document (Markdown) into structured insights **without any LLM**:

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  User's Summary  │     │  Deterministic   │     │  Structured      │
│  Document (.md)  │────▶│  Parser          │────▶│  Insights        │
│                  │     │                  │     │                  │
│  Markdown with   │     │  1. Parse to AST │     │  PillarInsights  │
│  headers,        │     │  2. Map headers  │     │  ├── Strategic   │
│  bullets,        │     │     to pillars   │     │  ├── Market      │
│  tables,         │     │  3. Extract      │     │  ├── Users       │
│  content         │     │     key-value    │     │  ├── Technical   │
│                  │     │     pairs        │     │  ├── Behavioral  │
│                  │     │  4. Identify     │     │  └── Ethics      │
│                  │     │     frameworks   │     │                  │
│                  │     │  5. Score        │     │  Each containing │
│                  │     │     confidence   │     │  InsightCard[]   │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

**Parser strategy:**
1. **AST-based**: Use `unified`/`remark` to parse Markdown into an Abstract Syntax Tree
2. **Header mapping**: Match `## headers` to pillar names using fuzzy keyword matching (e.g., "Strategic" / "Business Model" / "Revenue" → Pillar 1)
3. **Content extraction**: Pull bullet points, table rows, and paragraphs as individual insight nuggets
4. **Framework detection**: Regex patterns to identify framework references (e.g., "Porter's Five Forces", "JTBD", "Hook Model")
5. **Insight scoring**: Word count + framework density + data presence = confidence indicator
6. **Graceful fallback**: Unmatched content goes to a "General Insights" bucket — nothing is lost

### 4.5 Insight Data Model

```typescript
interface PillarInsights {
  pillars: PillarData[];
  unmatched: InsightCard[];        // Content that didn't map to a pillar
  metadata: {
    totalInsights: number;
    parsedAt: string;
    sourceFileName: string;
    confidenceScore: number;       // Overall parse quality 0-100
  };
}

interface PillarData {
  pillarId: string;
  pillarName: string;
  pillarNumber: number;
  icon: string;                    // Lucide icon name
  color: string;                   // Theme color for this pillar
  insights: InsightCard[];
  frameworks: DetectedFramework[];
  completeness: number;            // 0-100, how many lenses were covered
}

interface InsightCard {
  id: string;
  type: 'finding' | 'metric' | 'framework' | 'quote' | 'comparison' | 'gap' | 'recommendation';
  title: string;                   // Auto-generated action title
  content: string;                 // The insight text
  bulletPoints?: string[];         // Structured sub-points
  tableData?: TableRow[];          // If extracted from a table
  confidence: 'high' | 'medium' | 'low';
  sourceSection: string;           // Original header path in summary doc
  tags: string[];                  // Auto-detected keywords
  selected: boolean;               // User toggle for deck inclusion
}
```

---

## 5. Component Architecture

### 5.1 Page Structure

```
App
├── Layout
│   ├── Header (logo, product name, stage indicator)
│   ├── StageProgressBar (visual step indicator with completion status)
│   └── Main Content Area
│       ├── Stage1_ProductInput
│       │   ├── ProductNameInput
│       │   ├── CategorySelector
│       │   ├── PlatformSelector
│       │   └── BusinessModelSelector
│       │
│       ├── Stage2_PromptGeneration
│       │   ├── PromptOverview (6-card grid)
│       │   ├── PromptCard (expandable, with copy/edit)
│       │   ├── PromptPreview (full prompt with syntax highlighting)
│       │   └── PromptActions (copy all, download as .txt)
│       │
│       ├── Stage3_ResearchGuide
│       │   ├── AIToolGuide (step-by-step with tool logos)
│       │   ├── SummaryDocTemplate (show expected format)
│       │   └── ExampleSummary (collapsible example)
│       │
│       ├── Stage4_UploadParse
│       │   ├── FileDropZone (drag & drop area)
│       │   ├── ParseProgressIndicator
│       │   ├── ParseResultsSummary
│       │   └── ParseWarnings (unmapped content alerts)
│       │
│       ├── Stage5_InsightExplorer
│       │   ├── PillarNavigation (6-tab sidebar)
│       │   ├── InsightGrid (masonry/card layout)
│       │   ├── InsightCard (interactive, expandable)
│       │   ├── InsightFilters (by type, confidence, framework)
│       │   ├── InsightSearch (full-text search within insights)
│       │   └── SelectionSummary (count of selected insights)
│       │
│       └── Stage6_DeckBuilder
│           ├── SlideList (draggable sidebar)
│           ├── SlidePreview (live WYSIWYG preview)
│           ├── SlideEditor (title, content, layout toggles)
│           ├── ThemeSelector (color schemes)
│           └── ExportActions (PPTX, PDF download)
│
└── SharedComponents
    ├── Button, Card, Dialog, Tooltip (shadcn/ui)
    ├── CopyButton (clipboard utility)
    ├── PageTransition (framer-motion wrapper)
    └── EmptyState (contextual empty state illustrations)
```

### 5.2 Stage 5 — Insight Explorer (Key Experience)

This is the **hero feature** of the app — where the user's raw research becomes a beautiful, navigable knowledge base:

```
┌──────────────────────────────────────────────────────────────────────┐
│  🔍 Search insights...                          Filter ▼  Sort ▼   │
├─────────┬────────────────────────────────────────────────────────────┤
│         │                                                            │
│ PILLARS │  ┌─────────────────┐  ┌─────────────────┐                │
│         │  │ 📊 Revenue is   │  │ 🎯 Primary user │                │
│ ● Strat │  │ primarily from  │  │ segment is mid- │                │
│ ○ Markt │  │ subscriptions   │  │ market SaaS     │                │
│ ○ Users │  │ with 73% of     │  │ teams of 10-50  │                │
│ ○ Tech  │  │ total revenue   │  │ ─────────────── │                │
│ ○ Behav │  │ ─────────────── │  │ Confidence: ●●● │                │
│ ○ Ethcs │  │ Confidence: ●●●○│  │ Framework: JTBD │                │
│         │  │ [+ Add to Deck] │  │ [+ Add to Deck] │                │
│─────────│  └─────────────────┘  └─────────────────┘                │
│         │                                                            │
│ STATS   │  ┌─────────────────┐  ┌─────────────────┐                │
│ 47 total│  │ ⚠️ Gap: No      │  │ 📈 LTV/CAC      │                │
│ 12 sel. │  │ public data on  │  │ ratio estimated  │                │
│ 85% cov │  │ unit economics  │  │ at 3.2x based    │                │
│         │  │ ─────────────── │  │ on public filings│                │
│         │  │ Type: Gap       │  │ ─────────────── │                │
│         │  │ [+ Add to Deck] │  │ Type: Metric     │                │
│         │  └─────────────────┘  │ [+ Add to Deck] │                │
│         │                       └─────────────────┘                │
└─────────┴────────────────────────────────────────────────────────────┘
```

**Key UX patterns:**
- **Pillar sidebar navigation** with completion indicators
- **Masonry card grid** with different card types (finding, metric, gap, recommendation, framework)
- **Card interactions**: expand, select for deck, view source section
- **Filtering**: by pillar, type, confidence, framework
- **Search**: full-text search across all insights
- **Batch actions**: select all from a pillar, clear selection
- **Visual density controls**: compact / comfortable / spacious view toggle

---

## 6. Research Guide & Summary Doc Flow

### 6.1 Stage 3 — Research Guide (On-Screen Instructions)

Since the app doesn't call any LLM, Stage 3 is an **in-app guide** that teaches users how to:

1. **Copy prompts** from Stage 2 into their preferred AI tool
2. **Run research** using ChatGPT, Gemini, Claude, or Perplexity
3. **Compile a summary document** from the 6 research outputs
4. **Format the summary** in the expected Markdown structure

The guide includes:
- Logo-based tool cards (ChatGPT, Gemini, Claude, Perplexity) with usage tips
- A downloadable **summary document template** (`.md` file) with pre-filled headers
- A collapsible **example summary** showing what good output looks like
- A **"Pro tip"** section recommending Perplexity for citation-rich research and NotebookLM for synthesis

### 6.2 Expected Summary Document Format

The parser is designed to handle flexible input, but the template guides users toward this structure:

```markdown
# Product Teardown Research: [Product Name]

## 1. Strategic & Business Context
### Mission & Vision
- [findings...]
### Revenue Model
- [findings...]
...

## 2. Market & Competition
### Competitive Landscape
- [findings...]
...

## 3. Users & Product Craft
...

## 4. Technical Architecture
...

## 5. Behavioral Psychology
...

## 6. Trust, Safety & Ethics
...
```

**Parser flexibility:**
- Headers can be numbered or unnumbered
- Section names can use keywords (parser does fuzzy matching)
- Tables, bullets, and paragraphs all work
- Content doesn't need to perfectly match pillar structure — the parser will do best-effort mapping

---

## 7. Legal & Ethical Guardrails

### 7.1 Enforced at Prompt Level
Every generated prompt includes:
- ✅ "Use ONLY publicly available information"
- ❌ "Do NOT use proprietary, confidential, or personally identifiable information"
- ✅ "Sources: app store, marketing sites, public blogs, press releases, engineering talks"
- ❌ "Do NOT reference internal documents, leaked data, or private communications"

### 7.2 Enforced at App Level
- No external API calls — nothing leaves the browser
- No data persistence beyond the browser session (unless user explicitly saves)
- No user accounts, no analytics, no tracking
- Open source — fully auditable

---

## 8. Deployment Architecture

```
┌─────────────────────────────────────────────┐
│              DEPLOYMENT                      │
│                                              │
│  Git Push ──▶ Vercel / GitHub Pages          │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │         Static SPA Bundle              │  │
│  │  ┌──────────┐  ┌──────────────────┐   │  │
│  │  │ index.html│  │ assets/          │   │  │
│  │  └──────────┘  │  ├── js/*.js     │   │  │
│  │                 │  ├── css/*.css   │   │  │
│  │                 │  └── skills.json │   │  │
│  │                 └──────────────────┘   │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  Zero servers. Zero APIs. Zero cost.         │
└─────────────────────────────────────────────┘
```

---

## 9. Directory Structure

```
product-discovery-and-teardown/
├── docs/
│   ├── CONTEXT.md                    ← Project context
│   ├── architecture.md               ← This file
│   └── implementation-plan.md         ← Phased implementation plan
├── skills/
│   ├── product-strategic-research/
│   │   └── SKILL.md
│   ├── product-market-research/
│   │   └── SKILL.md
│   ├── product-user-research/
│   │   └── SKILL.md
│   ├── product-technical-research/
│   │   └── SKILL.md
│   ├── product-behavioral-research/
│   │   └── SKILL.md
│   ├── product-ethics-research/
│   │   └── SKILL.md
│   ├── teardown-design-theme/
│   │   └── SKILL.md
│   └── teardown-visual-assets/
│       └── SKILL.md
├── src/
│   ├── main.tsx                       ← App entry point
│   ├── App.tsx                        ← Root component with routing
│   ├── index.css                      ← Tailwind directives + global styles
│   ├── components/
│   │   ├── ui/                        ← shadcn/ui components
│   │   ├── layout/                    ← Header, ProgressBar, Layout
│   │   └── shared/                    ← CopyButton, EmptyState, etc.
│   ├── pages/
│   │   ├── Stage1_ProductInput.tsx
│   │   ├── Stage2_PromptGeneration.tsx
│   │   ├── Stage3_ResearchGuide.tsx
│   │   ├── Stage4_UploadParse.tsx
│   │   ├── Stage5_InsightExplorer.tsx
│   │   └── Stage6_DeckBuilder.tsx
│   ├── lib/
│   │   ├── prompt-engine/             ← Prompt composition logic
│   │   │   ├── composer.ts            ← Main composition function
│   │   │   ├── skill-data.ts          ← Parsed skill data (generated)
│   │   │   └── filters.ts             ← Category/platform-aware filtering
│   │   ├── parser/                    ← Summary doc parser
│   │   │   ├── markdown-parser.ts     ← Remark-based AST parser
│   │   │   ├── pillar-mapper.ts       ← Header → pillar fuzzy matching
│   │   │   ├── insight-extractor.ts   ← Content → InsightCard extraction
│   │   │   └── framework-detector.ts  ← Regex-based framework identification
│   │   ├── deck/                      ← Deck builder logic
│   │   │   ├── slide-generator.ts     ← Map insights to slide structure
│   │   │   ├── pptx-builder.ts        ← PptxGenJS wrapper
│   │   │   └── pdf-exporter.ts        ← jsPDF + html2canvas wrapper
│   │   └── utils/                     ← Shared utilities
│   │       ├── clipboard.ts
│   │       └── file-helpers.ts
│   ├── context/                       ← React Context providers
│   │   ├── AppContext.tsx             ← Global state provider
│   │   └── reducer.ts                ← State reducer + actions
│   ├── types/                         ← TypeScript type definitions
│   │   ├── skills.ts
│   │   ├── prompts.ts
│   │   ├── insights.ts
│   │   └── deck.ts
│   └── data/
│       └── skills.json                ← Build-time generated from SKILL.md
├── plugins/
│   └── vite-plugin-skills/            ← Custom Vite plugin for SKILL.md parsing
│       └── index.ts
├── public/
│   └── favicon.svg
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── LICENSE
└── README.md
```

---

## 10. Performance Considerations

| Concern | Strategy |
|---------|----------|
| **Bundle size** | Tree-shaking, code-splitting by stage (lazy-load Stage 5-6) |
| **SKILL.md parsing** | Done at build time, not runtime — zero cost to user |
| **Summary doc parsing** | Web Worker for large documents to avoid UI blocking |
| **Slide rendering** | Virtualized list for slide previews |
| **Export generation** | Progress indicator during PPTX/PDF creation |

---

## 11. Accessibility

- All shadcn/ui components are built on Radix UI (WAI-ARIA compliant)
- Keyboard navigation for all stages
- Screen reader announcements for stage transitions
- Color contrast ratios ≥ 4.5:1 (WCAG AA)
- Focus management on stage navigation
- Reduced motion support via `prefers-reduced-motion`
