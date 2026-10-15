# Product Discovery & Teardown — Context Document

## What This Project Is

A client-side web application that empowers Product Managers to systematically research any app/product and produce a portfolio-ready teardown document. The tool generates structured deep-search prompts, processes uploaded research, and builds a polished 10-slide teardown deck.

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

### 3. Legal & Ethical Guardrails
- **No intellectual property** — No proprietary code, internal documents, or trade secrets
- **No PII** — No personally identifiable information of any individual
- **No confidential data** — No leaked financials, internal memos, or NDA-covered material
- **Public information only** — All research uses publicly available sources
- **Public images only** — Screenshots from app stores, marketing sites, public demos
- **Attribution** — Sources cited where applicable

### 4. Portfolio-Ready Output
The final teardown follows McKinsey's Pyramid Principle + PM portfolio best practices:
- Maximum 10 slides (signal over noise)
- Minimum 14pt text (readability)
- Action titles stating insights, not topics
- Visual-first design with annotated screenshots
- MECE structure throughout

## Application Architecture

### Technology
- Pure client-side: HTML + CSS + JavaScript (vanilla)
- PDF parsing: pdf.js (Mozilla)
- PPT generation: PptxGenJS
- PDF export: jsPDF
- No backend required — all processing happens in the browser

### User Flow

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Stage 1    │     │   Stage 2    │     │   Stage 3    │
│   INPUT      │────▶│   PROMPTS    │────▶│   UPLOAD &   │
│   Product    │     │   Generate 6 │     │   SUMMARIZE  │
│   Name       │     │   prompts    │     │   Research   │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
┌──────────────┐     ┌──────────────┐             │
│   Stage 5    │     │   Stage 4    │             │
│   TEARDOWN   │◀────│   BRAINSTORM │◀────────────┘
│   Generate   │     │   & SCOPE    │
│   10 slides  │     │   Finalize   │
└──────────────┘     └──────────────┘
```

### Key Stage Details

**Stage 3 — Summary Generation**: After uploading up to 6 research PDFs, the app extracts content and generates a unified summary document organized by research pillar. This summary becomes the foundation for all downstream work.

**Stage 4 — Brainstorm & Scope**: An interactive panel where users review summary highlights, toggle sections to include/exclude from the teardown, add custom sections, and reorder via drag-and-drop. This ensures the user has full creative control over what goes into the final deck.

**Stage 5 — Teardown Generation**: The scoped content is mapped into the 10-slide McKinsey framework, formatted with action titles, public images, and clean visual design. Downloadable as PPTX and PDF.

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
│   └── PROJECT_PLAN.md         ← Detailed project plan
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
├── src/                        ← Web application source
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
├── LICENSE
└── README.md
```
