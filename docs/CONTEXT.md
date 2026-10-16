# Product Discovery & Teardown — Context Document

## What This Project Is

A client-side React web application that empowers Product Managers to systematically research any app/product and produce a portfolio-ready teardown document. The tool generates structured deep-search prompts, guides users through external AI-powered research, deterministically parses uploaded summary documents, and presents insights in an interactive explorer for the user to build their own presentation deck.

## Problem Statement

Product Managers preparing for interviews, building portfolios, or performing competitive analysis need to deeply understand products across multiple dimensions — strategy, market, users, technology, behavior, and ethics. This research is typically unstructured, incomplete, and difficult to synthesize into a compelling narrative. This tool solves that by providing a framework-backed, multi-lens research methodology.

## Who This Is For

- **Primary**: Product Managers preparing product teardowns for interviews or portfolios
- **Secondary**: Aspiring PMs studying product strategy, design, and growth
- **Tertiary**: Product leaders performing competitive analysis

## Core Principles

### 1. Framework-Backed Research
Every prompt is grounded in established PM frameworks: Business Model Canvas, Porter's Five Forces, JTBD, Reforge Growth Loops, Hook Model, HEART/AARRR metrics, McKinsey Pyramid Principle, and more.

### 2. Multi-Lens Coverage (6 Pillars)
Research is organized into 6 distinct pillars ensuring MECE (Mutually Exclusive, Collectively Exhaustive) coverage:

| Pillar | Focus Area | Key Frameworks |
|--------|-----------|---------------|
| 1. Strategic & Business | Mission, revenue, ecosystem, lifecycle, unit economics | Business Model Canvas, Value Chain |
| 2. Market & Competition | Competitors, GTM, pricing, growth loops, switching costs | Porter's Five Forces, Reforge |
| 3. Users & Product Craft | Segments, JTBD, metrics, retention, feature prioritization | JTBD, HEART, AARRR, Outcome Mapping |
| 4. Technical & Architecture | System design, APIs, experimentation, AI/ML, a11y, i18n | C4 Model, API Maturity, WCAG |
| 5. Behavioral Psychology | Hook model, cognitive biases, onboarding psychology | Nir Eyal, Fogg B=MAT, BJ Fogg |
| 6. Trust, Safety & Ethics | Dark patterns, algorithmic fairness, data governance | Privacy by Design, Ethical Design |

### 3. Zero LLM Dependency
The app itself makes **zero AI/LLM API calls**. Prompt generation is pure client-side template composition. Summary document parsing is deterministic (AST-based). Users run prompts in their own AI tools (ChatGPT, Gemini, Claude, Perplexity) and bring back the research as a summary document.

### 4. Legal & Ethical Guardrails
- **No intellectual property** — No proprietary code, internal documents, or trade secrets
- **No PII** — No personally identifiable information of any individual
- **No confidential data** — No leaked financials, internal memos, or NDA-covered material
- **Public information only** — All research uses publicly available sources
- **Public images only** — Screenshots from app stores, marketing sites, public demos
- **Attribution** — Sources cited where applicable

### 5. Portfolio-Ready Output
The final teardown follows McKinsey's Pyramid Principle + PM portfolio best practices:
- Maximum 10 slides (signal over noise)
- Minimum 14pt text (readability)
- Action titles stating insights, not topics
- Visual-first design with annotated screenshots
- MECE structure throughout

## Application Architecture

### Technology
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **State Management**: React Context + useReducer
- **Routing**: React Router v7
- **Animations**: Framer Motion
- **Summary Doc Parsing**: unified + remark + rehype (deterministic Markdown AST parser)
- **File Upload**: react-dropzone (drag & drop)
- **PPT Generation**: PptxGenJS (client-side PowerPoint presentation generation)
- **PDF Export**: jsPDF + html2canvas (client-side slide deck to PDF export)
- **Hosting**: 100% static SPA — Vercel (primary), GitHub Pages (fallback)

### Security Decision: No BYOK

This application intentionally does **NOT** implement Bring Your Own Key (BYOK) LLM integration. Reasons:

1. **XSS vulnerability**: API keys stored in `localStorage` are accessible to any XSS attack or malicious browser extension
2. **Supply-chain risk**: Any npm dependency can silently read `localStorage` and exfiltrate API keys
3. **Network interception**: Keys sent in browser HTTP headers are vulnerable to MITM via compromised proxies or networks
4. **No revocation control**: No server-side mechanism to detect abuse or revoke compromised keys
5. **Not needed**: Stages 1-2 are pure template synthesis. For research, users use their own AI tool interfaces directly.

Instead, the app guides users to run prompts in their preferred AI tool's own interface (ChatGPT, Gemini, Claude, Perplexity), which handles authentication and security properly.

### User Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Stage 1    │     │   Stage 2    │     │   Stage 3    │
│   INPUT      │────▶│   PROMPTS    │────▶│   RESEARCH   │
│   Product    │     │   Generate 6 │     │   GUIDE      │
│   Name +     │     │   prompts    │     │   How to use │
│   Context    │     │              │     │   AI tools   │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
┌──────────────┐     ┌──────────────┐     ┌──────▼───────┐
│   Stage 6    │     │   Stage 5    │     │   Stage 4    │
│   BUILD      │◀────│   INSIGHT    │◀────│   UPLOAD &   │
│   YOUR DECK  │     │   EXPLORER   │     │   PARSE      │
│   Select,    │     │   Interactive │     │   Summary    │
│   Reorder,   │     │   insight    │     │   Doc        │
│   Export     │     │   presentation│    │   Drag&Drop  │
└──────────────┘     └──────────────┘     └──────────────┘
```

### Key Stage Details

**Stage 1 — Product Input**: User enters the product name, company name, and selects category (e.g., Social, Productivity, E-commerce), platform type (Mobile, Web, Desktop, Cross-platform), and business model (B2C, B2B, Marketplace). These inputs personalize the generated prompts.

**Stage 2 — Prompt Generation**: The app composes 6 deep-research prompts by weaving the product context into the SKILL.md templates. Each prompt is framework-backed, lens-comprehensive, and includes ethical guardrails. Users copy prompts with one click.

**Stage 3 — Research Guide**: An in-app guide showing users how to paste prompts into ChatGPT, Gemini, Claude, or Perplexity, run the research, and compile a summary document. Includes a downloadable summary template and a recommended workflow using Google NotebookLM for synthesis.

**Stage 4 — Upload & Parse**: Users drag-and-drop their summary document (Markdown or plain text). The app deterministically parses it into structured insights using AST-based Markdown parsing, fuzzy header-to-pillar mapping, and framework detection.

**Stage 5 — Insight Explorer**: A beautiful, interactive presentation of parsed insights organized by pillar. Features masonry card layout, pillar sidebar navigation, filtering by type/confidence/framework, full-text search, and one-click selection for the deck. This is the hero UX experience of the app.

**Stage 6 — Build Your Deck**: Users select insights from the explorer, reorder them via drag-and-drop into a 10-slide structure, customize titles and layouts, choose a color theme, and export as PPTX or PDF.

## 10-Slide Teardown Structure

| # | Slide | Purpose |
|---|-------|---------| 
| 1 | Title & Thesis | Product name, one-line thesis, author, date |
| 2 | Executive Summary | Core verdict, 3 key findings, strategic implication |
| 3 | Business Model & Market | Revenue model, TAM/SAM, competitive 2×2 matrix |
| 4 | User Personas & Pain Points | Personas, JTBD statements, core pain points |
| 5 | Onboarding & Activation | Step-by-step flow, TTV, friction audit |
| 6 | Core Product & Features | Feature architecture, IA, annotated UI |
| 7 | Growth & Retention Engine | Growth loops, retention mechanics, Hook Model |
| 8 | Behavioral & Trust Analysis | Biases deployed, ethical audit, trust signals |
| 9 | Critique & Opportunities | Gaps with Impact×Effort matrix, proposed fixes |
| 10 | Strategic Recommendations | North star metric, guardrails, future strategy |

## Skills System

The project includes 8 skills organized under `/skills/`:

### Prompt Generation Skills (6)
Each skill contains PM frameworks, structured prompt templates, and evaluation criteria for its respective pillar:
1. `product-strategic-research` — Strategic & Business Context
2. `product-market-research` — Market, Competition & GTM
3. `product-user-research` — Users, Outcomes & Product Craft
4. `product-technical-research` — Technical Architecture & Design
5. `product-behavioral-research` — Behavioral Psychology & Engagement
6. `product-ethics-research` — Trust, Safety & Ethics

### Teardown Production Skills (2)
7. `teardown-design-theme` — Extract app's visual identity, apply to teardown deck
8. `teardown-visual-assets` — Guide public screenshot collection and organization

## Directory Structure

```
product-discovery-and-teardown/
├── docs/
│   ├── CONTEXT.md              ← This file
│   ├── architecture.md         ← Full system architecture
│   └── implementation-plan.md  ← Phased implementation plan
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
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── components/
│   ├── pages/
│   ├── lib/
│   ├── context/
│   ├── types/
│   └── data/
├── plugins/
│   └── vite-plugin-skills/
├── public/
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── LICENSE
└── README.md
```
