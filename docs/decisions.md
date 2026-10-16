# Product Discovery & Teardown — Architecture Decision Records

> **Version**: 1.0  
> **Last Updated**: 2026-10-16  
> **Format**: Lightweight ADR (Architecture Decision Record)

---

## ADR-001: Drop BYOK (Bring Your Own Key) LLM Integration

**Status**: ✅ Accepted  
**Date**: 2026-10-16  
**Context**: The original design had users entering API keys (OpenAI, Gemini, Claude, Groq) into the browser app for direct LLM calls from the client.

**Decision**: Remove all BYOK functionality. The app makes zero external API calls.

**Rationale**:
| Risk | Severity | Detail |
|------|----------|--------|
| XSS key exfiltration | 🔴 Critical | Any XSS vulnerability or malicious browser extension can read `localStorage` and steal API keys |
| Supply-chain attack | 🔴 Critical | Any compromised npm dependency can silently read and exfiltrate stored keys |
| Network interception | 🟡 High | MITM via corporate proxies, compromised WiFi, or browser extensions can intercept keys in HTTP headers |
| No revocation control | 🟡 High | No server-side mechanism to detect abuse or revoke compromised keys |
| CORS restrictions | 🟠 Medium | Some LLM providers restrict direct browser-to-API calls, requiring workarounds that reduce security |

**Alternatives Considered**:
1. **Lightweight serverless proxy** — Adds infrastructure cost, deployment complexity, and a new attack surface. Rejected for scope.
2. **Service Worker encryption** — Keys still accessible in browser memory. False sense of security. Rejected.
3. **Session-only storage (no localStorage)** — Reduces persistence risk but doesn't address XSS or supply-chain. Rejected.

**Consequences**:
- Users must run prompts in their own AI tool interfaces (ChatGPT, Gemini, etc.)
- App needs a good Research Guide (Stage 3) to compensate for the manual step
- Summary document upload replaces direct LLM summarization
- Zero infrastructure cost — app is fully static

---

## ADR-002: React + Vite + Tailwind over Vanilla HTML/CSS/JS

**Status**: ✅ Accepted  
**Date**: 2026-10-16  
**Context**: Original CONTEXT.md specified "Pure Client-Side: HTML5 + Vanilla CSS3 + Modern ES6+ JavaScript (no build step required)."

**Decision**: Use React 19 + Vite + TypeScript + Tailwind CSS v4 + shadcn/ui.

**Rationale**:
- The app has 6 distinct stages with complex UI interactions (drag-and-drop, masonry grids, modal previews, animated transitions)
- Component-based architecture is essential for maintainability across 6 stage pages with shared state
- TypeScript prevents entire classes of bugs (especially in the parser and prompt engine)
- Tailwind v4 + shadcn/ui delivers premium, accessible components without a heavy framework dependency
- Vite provides fast dev experience and optimized production builds
- **Still 100% client-side** — Vite produces a static SPA bundle. Zero backend required.

**Trade-offs**:
| Gained | Lost |
|--------|------|
| Component model, type safety, ecosystem | Zero-build simplicity |
| Premium UI components (shadcn/ui) | Single HTML file portability |
| Fast iteration with HMR | View-source simplicity |
| Code-splitting, lazy loading | Instant load without JS parsing |

**Consequences**:
- Requires `npm install` + `npm run dev` for development
- Build step required for production deployment
- Larger initial bundle (~200KB gzipped) but code-split by stage

---

## ADR-003: Deterministic Summary Doc Parser over LLM-Based Summarization

**Status**: ✅ Accepted  
**Date**: 2026-10-16  
**Context**: Stage 4 needs to convert user's research summary into structured insights. Two approaches: (a) LLM-based extraction, (b) deterministic AST-based parsing.

**Decision**: Use deterministic Markdown parser (`unified` + `remark`) with fuzzy header-to-pillar mapping.

**Rationale**:
- Consistent with zero-LLM philosophy — no API keys, no external calls
- Deterministic = same input always produces same output = testable, debuggable
- Markdown AST parsing is a solved problem with mature libraries
- Fuzzy keyword matching for pillar mapping is sufficient (we know the 6 pillar names and their associated terms)
- Users are guided to structure their summary doc using our template (Stage 3), so input is semi-structured

**Trade-offs**:
| Gained | Lost |
|--------|------|
| No API dependency | Semantic understanding of content |
| Deterministic output | Ability to rephrase or summarize |
| Zero latency | Auto-categorization of ambiguous content |
| Testable with unit tests | Handling of wildly unstructured input |
| Privacy — content stays in browser | AI-quality insight extraction |

**Mitigations**:
- Provide a well-designed summary template for users to follow
- Implement fuzzy matching with keyword scoring for headers that don't exactly match pillar names
- "General Insights" bucket catches all unmapped content — nothing is lost
- Users can manually re-assign insights to pillars in the Insight Explorer

---

## ADR-004: React Context + useReducer over Zustand/Redux

**Status**: ✅ Accepted  
**Date**: 2026-10-16  
**Context**: Need state management for multi-stage wizard flow (product input → prompts → insights → deck).

**Decision**: Use React Context + `useReducer` (built-in React).

**Rationale**:
- State shape is straightforward: product context, 6 prompts, parsed insights, deck configuration
- No need for middleware, devtools, or async state management
- Zero additional dependencies
- The app is a linear wizard — state flows forward through stages, rarely back
- Context + useReducer handles all our patterns: form state, generated data, user selections

**When to revisit**: If we add features requiring complex async flows, undo/redo, or cross-tab synchronization.

---

## ADR-005: Build-Time SKILL.md Parsing over Runtime Parsing

**Status**: ✅ Accepted  
**Date**: 2026-10-16  
**Context**: 6 SKILL.md files need to be transformed into structured data for the prompt engine.

**Decision**: Parse SKILL.md files at build time (Vite plugin or prebuild script), emit as JSON module.

**Rationale**:
- SKILL.md files change rarely (they're authored content, not runtime data)
- Build-time parsing = zero runtime cost to the user
- Structured JSON is directly consumable by TypeScript with full type safety
- No Markdown parsing library needed in the client bundle for this purpose
- Vite plugin can validate all 6 skills are present and well-formed at build time

**Alternatives Considered**:
1. **Runtime fetch + parse** — Adds latency, requires bundling a Markdown parser, no build-time validation. Rejected.
2. **Manually convert to TypeScript** — Error-prone, SKILL.md and TS data go out of sync. Rejected.

---

## ADR-006: shadcn/ui over Material UI / Headless UI / Custom Components

**Status**: ✅ Accepted  
**Date**: 2026-10-16  
**Context**: Need polished, accessible UI components for forms, cards, dialogs, tabs, etc.

**Decision**: Use shadcn/ui (Radix UI primitives + Tailwind styling).

**Rationale**:
- **No dependency lock-in**: Components are copied into your project, not imported from a package. You own the code.
- **Radix UI foundation**: WAI-ARIA compliant accessibility out of the box (focus management, keyboard nav, screen reader support).
- **Tailwind-native**: Styles use Tailwind classes, consistent with our styling approach. No CSS-in-JS runtime.
- **Customizable**: Every component is a file in your project — modify freely without forking a library.
- **Beautiful defaults**: New York variant provides a premium, modern aesthetic matching our design goals.

**Alternatives Considered**:
| Alternative | Why Rejected |
|-------------|-------------|
| Material UI (MUI) | Heavy bundle, CSS-in-JS runtime, opinionated Google Material look clashes with our dark premium aesthetic |
| Headless UI | Good but fewer components than Radix, less ecosystem support |
| Custom from scratch | Too much effort for accessible components (focus traps, aria, keyboard nav) |
| Chakra UI | CSS-in-JS dependency, heavier than shadcn/ui |

---

## ADR-007: React Router v7 over TanStack Router / No Router

**Status**: ✅ Accepted  
**Date**: 2026-10-16  
**Context**: The app has 6 stages that need URL-addressable navigation.

**Decision**: Use React Router v7.

**Rationale**:
- Industry standard with massive ecosystem and documentation
- URL-driven stage navigation (`/`, `/prompts`, `/guide`, `/upload`, `/insights`, `/deck`)
- Enables browser back/forward navigation between stages
- Supports lazy loading of stage components for code-splitting
- v7 has improved type safety and data loading patterns

**Alternatives Considered**:
| Alternative | Why Rejected |
|-------------|-------------|
| TanStack Router | Excellent type safety but smaller community, newer — unnecessary risk for a straightforward routing use case |
| No router (conditional rendering) | No URL support, breaks browser back button, can't share/bookmark stages |

---

## ADR-008: Framer Motion for Animations

**Status**: ✅ Accepted  
**Date**: 2026-10-16  
**Context**: The app needs page transitions, card animations, micro-interactions, and staggered reveals.

**Decision**: Use Framer Motion.

**Rationale**:
- Declarative animation API that integrates naturally with React component lifecycle
- `AnimatePresence` handles mount/unmount animations (critical for stage transitions)
- `layout` prop handles layout animations (card reordering in deck builder)
- `stagger` for prompt card reveal animations
- Respects `prefers-reduced-motion` with built-in support
- Well-maintained, widely adopted in production React apps

**Bundle impact**: ~32KB gzipped. Acceptable for the animation capabilities it provides.

---

## ADR-009: Markdown as Summary Document Format

**Status**: ✅ Accepted  
**Date**: 2026-10-16  
**Context**: Users need to upload their compiled research for parsing. What file format should we accept?

**Decision**: Accept Markdown (`.md`) and plain text (`.txt`) only.

**Rationale**:
- AI tools (ChatGPT, Gemini, Claude) naturally output Markdown-formatted text
- Markdown has clear structural markers (headers, lists, tables) that our AST parser can reliably extract
- No binary format parsing needed — simpler, lighter, more secure
- Users can create `.md` files easily (paste into VS Code, Notion export, NotebookLM output)
- Plain text fallback ensures no user is excluded

**Alternatives Considered**:
| Alternative | Why Rejected |
|-------------|-------------|
| PDF upload | Requires pdf.js (~400KB), complex text extraction, layout-dependent parsing, unreliable |
| DOCX upload | Requires docx parsing library, complex XML extraction, formatting noise |
| JSON upload | Too technical for PM users to create |
| Google Docs API | Requires authentication, server-side, breaks zero-backend principle |

**Consequences**:
- Must provide clear instructions in Stage 3 on how to save AI output as `.md`
- Downloadable template helps users structure their summary correctly

---

## ADR-010: No Data Persistence (Stateless Sessions)

**Status**: ✅ Accepted (with future reconsideration)  
**Date**: 2026-10-16  
**Context**: Should the app save progress to localStorage, IndexedDB, or a file?

**Decision**: No persistence for v1. All state is session-only (lost on page refresh).

**Rationale**:
- Simplest implementation — no serialization, no storage quota management, no migration logic
- Privacy-first — nothing stored in the browser beyond the session
- Users can download their prompts (.md), summary template (.md), and final deck (PPTX/PDF) at each stage
- The workflow is typically completed in one sitting (1-2 hours)

**When to revisit**: If user feedback indicates session loss is a significant pain point, add optional localStorage persistence with explicit "Save Progress" / "Clear Data" controls.

---

## ADR-011: PptxGenJS for Slide Generation

**Status**: ✅ Accepted  
**Date**: 2026-10-16  
**Context**: Need to generate downloadable PowerPoint files from user-curated insights.

**Decision**: Use PptxGenJS for client-side PPTX generation.

**Rationale**:
- 100% client-side — no server needed
- Produces valid `.pptx` files compatible with PowerPoint, Google Slides, and Keynote
- API supports text, images, tables, shapes — sufficient for our 10-slide deck
- Enforces 14pt minimum text via configuration
- Active maintenance and good documentation

**Bundle impact**: ~50KB gzipped. Loaded lazily only when user reaches Stage 6.
