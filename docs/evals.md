# Product Discovery & Teardown — Evaluation & Quality Criteria

> **Version**: 1.0  
> **Last Updated**: 2026-10-16  
> **Purpose**: Define how to evaluate quality at every stage — prompt quality, parser accuracy, UI/UX, performance, and accessibility.

---

## 1. Prompt Quality Evaluation

### 1.1 Per-Prompt Scorecard

Each generated prompt is evaluated against these criteria:

| Criterion | Weight | Score (1-5) | How to Evaluate |
|-----------|--------|-------------|-----------------|
| **Lens coverage** | 25% | | Does the prompt include ALL research lenses from the SKILL.md? Count covered vs. total. |
| **Framework grounding** | 20% | | Are named frameworks explicitly referenced with instructions to apply them? |
| **Product specificity** | 15% | | Is the product name, category, and context woven into the questions (not just `[PRODUCT_NAME]` replacement)? |
| **Ethical guardrails** | 15% | | Does the prompt explicitly state "public info only", "no PII", "no proprietary data"? |
| **Output structure** | 15% | | Does the prompt specify the expected output format (tables, headers, confidence levels)? |
| **Actionability** | 10% | | Are questions framed as research tasks, not just topic headers? |

### 1.2 Prompt Quality Targets

| Metric | Target | Minimum |
|--------|--------|---------|
| Lens coverage | 100% of SKILL.md lenses | 90% |
| Framework references | All named frameworks from skill | ≥ 80% |
| Word count | 800–1200 words | 500–1500 |
| Ethical guardrails | Present in every prompt | 100% required |
| Output format spec | Detailed format instructions | Basic structure |

### 1.3 Cross-Prompt Evaluation

| Criterion | How to Evaluate |
|-----------|-----------------|
| **No redundancy** | Check that the same question doesn't appear in multiple pillar prompts |
| **MECE coverage** | Together, the 6 prompts should cover the full PM analysis framework without gaps or overlaps |
| **Consistent tone** | All prompts use the same professional voice and instruction style |
| **Consistent format** | All prompts follow the same structural template (role → context → questions → frameworks → output format → guardrails) |

### 1.4 Prompt Testing Protocol

**Manual Test Methodology:**
1. Generate prompts for 5 diverse products:
   - Consumer mobile app (e.g., Instagram)
   - B2B SaaS tool (e.g., Notion)
   - Marketplace (e.g., Airbnb)
   - Fintech app (e.g., Robinhood)
   - Developer tool (e.g., Vercel)
2. Paste each prompt into ChatGPT-4o and Gemini 2.0
3. Evaluate the AI response against the scorecard above
4. Log results in a comparison spreadsheet

**Automated Test Methodology:**
- Unit tests validate that `composePrompt()` output contains expected sections
- Regex tests verify ethical guardrails are present
- Word count assertions per prompt
- Lens count assertions match SKILL.md

---

## 2. Summary Document Parser Evaluation

### 2.1 Parser Accuracy Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| **Pillar mapping accuracy** | % of content sections correctly assigned to their pillar | ≥ 85% |
| **Insight extraction rate** | % of meaningful content extracted as InsightCards (vs. lost/ignored) | ≥ 95% |
| **Framework detection recall** | % of framework mentions correctly identified | ≥ 90% |
| **False pillar mapping** | % of content assigned to the wrong pillar | ≤ 5% |
| **Content loss rate** | % of summary doc content not captured in any insight | ≤ 2% |
| **Parse time** | Time to parse a typical 3000-word summary doc | < 500ms |

### 2.2 Parser Test Suite

**Test Documents:**
Create a set of test summary documents with known structure:

| Test Doc | Description | What It Tests |
|----------|------------|---------------|
| `perfect-structure.md` | Follows our template exactly with all 6 pillars | Happy path — 100% mapping expected |
| `partial-coverage.md` | Only 3 of 6 pillars present | Graceful handling of missing pillars |
| `flat-structure.md` | No headers, just paragraphs | "General Insights" fallback |
| `different-headers.md` | Uses non-standard header names (e.g., "Business Analysis" instead of "Strategic & Business Context") | Fuzzy matching accuracy |
| `deeply-nested.md` | 4+ levels of header nesting | Correct parent-pillar attribution |
| `tables-heavy.md` | Lots of Markdown tables | Table extraction into InsightCard.tableData |
| `mixed-format.md` | Mix of bullets, paragraphs, tables, code blocks, quotes | Multi-format extraction |
| `non-english.md` | Summary in a non-English language | Structure-based extraction without keyword matching |
| `very-long.md` | 10,000+ words | Performance and memory handling |
| `minimal.md` | 5 bullet points total | Low-content handling and warnings |

### 2.3 Parser Regression Tests

After each parser change, run all test documents and assert:
- Same or better pillar mapping accuracy
- No increase in content loss rate
- No new false pillar mappings
- Parse time hasn't regressed

---

## 3. UI/UX Evaluation

### 3.1 Stage-by-Stage UX Checklist

#### Stage 1 — Product Input
- [ ] Form is immediately understandable without instructions
- [ ] Validation errors are clear, specific, and non-blocking (user can still type)
- [ ] Tab order follows visual order
- [ ] "Generate Prompts" CTA is visually prominent and disabled state is clear
- [ ] Category/platform/model selectors are touch-friendly on mobile
- [ ] Page loads in < 1 second

#### Stage 2 — Prompt Generation
- [ ] All 6 prompt cards visible without scrolling on desktop
- [ ] Card hover states provide clear affordance (clickable feel)
- [ ] Copy button shows success feedback (toast/checkmark animation)
- [ ] Full prompt preview is readable (no tiny text, good line spacing)
- [ ] Edit mode is discoverable and intuitive
- [ ] "Copy All" and "Download" actions are prominent but not overwhelming
- [ ] Prompt cards stagger-animate on entry (polished feel)

#### Stage 3 — Research Guide
- [ ] Step-by-step flow is scannable (numbered, visual)
- [ ] AI tool cards have recognizable branding (colors/logos)
- [ ] Template download works with one click
- [ ] NotebookLM workflow is clearly explained
- [ ] User doesn't feel "stuck" — clear paths forward

#### Stage 4 — Upload & Parse
- [ ] Drag-and-drop zone is large, obvious, and well-labeled
- [ ] File type restrictions are communicated before upload attempt
- [ ] Parse progress is visible (not a blank screen during parsing)
- [ ] Parse results show pillar-by-pillar breakdown
- [ ] Warnings about low coverage are helpful, not scary

#### Stage 5 — Insight Explorer
- [ ] Pillar navigation is always visible and indicates current selection
- [ ] Insight cards are scannable (key info visible without expanding)
- [ ] Selection state (for deck) is visually clear (not subtle)
- [ ] Filters and search are responsive (< 100ms feedback)
- [ ] Empty states for individual pillars are helpful, not discouraging
- [ ] Card type visual differentiation is clear (finding vs. metric vs. gap)

#### Stage 6 — Deck Builder
- [ ] Drag-and-drop reordering works on both desktop and mobile
- [ ] Slide preview accurately represents the final output
- [ ] Export buttons show progress during generation
- [ ] Downloaded files open correctly in PowerPoint, Google Slides, and Keynote

### 3.2 Design Quality Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| **First Meaningful Paint** | < 1.5s | Lighthouse |
| **Time to Interactive** | < 3.0s | Lighthouse |
| **Cumulative Layout Shift** | < 0.1 | Lighthouse |
| **Largest Contentful Paint** | < 2.5s | Lighthouse |
| **Color contrast** | ≥ 4.5:1 (AA) | axe-core or Chrome DevTools |
| **Touch target size** | ≥ 44×44px | Manual audit |
| **Responsive breakpoints** | 3 (mobile 375px, tablet 768px, desktop 1280px) | Manual testing |

### 3.3 User Testing Protocol

**5-user test script** (moderated):
1. "You're a PM preparing for an interview. Use this tool to start researching [Instagram/Notion/Uber]."
2. Observe: Can they complete Stage 1 without guidance?
3. Observe: Do they understand what the prompts are for?
4. Observe: Do they know what to do with the Research Guide?
5. Ask: "On a scale of 1-10, how professional does this tool feel?"
6. Ask: "What would you change?"

---

## 4. Performance Evaluation

### 4.1 Bundle Size Budget

| Chunk | Target | Max |
|-------|--------|-----|
| **Initial bundle** (Stage 1-2) | < 150KB gzipped | 200KB |
| **Stage 3 chunk** | < 20KB gzipped | 30KB |
| **Stage 4-5 chunk** (parser + explorer) | < 80KB gzipped | 120KB |
| **Stage 6 chunk** (PptxGenJS + deck builder) | < 60KB gzipped | 100KB |
| **Total** | < 310KB gzipped | 450KB |

### 4.2 Runtime Performance

| Operation | Target | How to Measure |
|-----------|--------|----------------|
| Prompt generation (6 prompts) | < 50ms | `performance.now()` in composer |
| Summary doc parsing (3000 words) | < 500ms | `performance.now()` in parser |
| Summary doc parsing (10,000 words) | < 2000ms | `performance.now()` in parser |
| Insight card rendering (50 cards) | < 16ms per frame (60fps) | Chrome DevTools Performance tab |
| PPTX generation (10 slides) | < 3000ms | `performance.now()` in builder |
| PDF export (10 slides) | < 5000ms | `performance.now()` in exporter |

### 4.3 Memory

| Metric | Target |
|--------|--------|
| Heap usage (Stage 1-3) | < 30MB |
| Heap usage (Stage 4-5 with 100 insights) | < 80MB |
| Heap usage (Stage 6 during export) | < 150MB |
| No memory leaks on stage navigation | Verify with Chrome DevTools Memory tab |

---

## 5. Accessibility Evaluation

### 5.1 WCAG 2.1 Compliance Targets

| Level | Target |
|-------|--------|
| **Level A** | 100% compliance (mandatory) |
| **Level AA** | 100% compliance (target) |
| **Level AAA** | Best effort (not required) |

### 5.2 Automated Accessibility Tests

| Tool | What It Tests | When to Run |
|------|-------------|-------------|
| **axe-core** | WCAG violations, ARIA issues, color contrast | Every PR |
| **Lighthouse Accessibility** | Score ≥ 95 | Every deployment |
| **eslint-plugin-jsx-a11y** | JSX accessibility issues | Every save (IDE lint) |

### 5.3 Manual Accessibility Tests

| Test | Frequency |
|------|-----------|
| Full keyboard navigation (Tab, Enter, Escape, Arrow keys) | Per stage release |
| Screen reader walkthrough (NVDA on Windows, VoiceOver on Mac) | Per major release |
| High contrast mode verification | Per theme change |
| 200% zoom test | Per layout change |
| Reduced motion preference test | Per animation addition |

---

## 6. Evaluation Schedule

| Phase | What to Evaluate | Eval Type |
|-------|-----------------|-----------|
| Phase 1 complete | Stage 1 UX, form validation | UX checklist |
| Phase 3 complete | Prompt quality scorecard (5 products) | Manual + unit tests |
| Phase 5 complete | End-to-end flow Stage 1-3 | User testing (3 users) |
| Phase 6 complete | Parser accuracy on 10 test docs | Automated tests |
| Phase 7 complete | Insight Explorer UX | UX checklist + user testing |
| Phase 8 complete | Full flow + export quality | Full evaluation suite |
| Pre-deployment | Lighthouse, axe-core, bundle size | Automated |
