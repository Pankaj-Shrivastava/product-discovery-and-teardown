# Product Discovery & Teardown — Edge Cases

> **Version**: 1.0  
> **Last Updated**: 2026-10-16  
> **Purpose**: Catalog known edge cases, boundary conditions, and failure scenarios across all 6 stages.

---

## Stage 1 — Product Input

### Input Validation

| Edge Case | Scenario | Expected Behavior |
|-----------|----------|-------------------|
| **Empty product name** | User clicks "Generate" without entering a name | Show inline validation error with shake animation. CTA stays disabled. |
| **Single character name** | User types "X" | Require minimum 2 characters. Show helper: "Enter the full product name" |
| **Very long product name** | "Microsoft Azure DevOps Server Enterprise Edition 2025" (50+ chars) | Accept but truncate display in headers/cards to 40 chars with ellipsis. Full name in prompts. |
| **Special characters** | Product names with `&`, `/`, `()` — e.g., "AT&T", "iOS/iPadOS" | Allow all UTF-8 characters. Sanitize only for file names on download. |
| **Unicode / non-Latin** | "微信 (WeChat)", "카카오톡" | Full Unicode support. Prompt templates handle any character set. |
| **Product = Company** | User enters "Google" as both product and company | Allow it. The prompts work fine with duplicate values. |
| **Company name empty** | User enters product name but not company | Company is required — show validation. Many prompts reference `[COMPANY_NAME]`. |
| **No category selected** | User skips category selection | Default to "Other". Prompts still work without category-specific filtering. |
| **Multiple platforms** | Product is on all platforms (mobile + web + desktop) | Allow multi-select. "Cross-platform" option covers this. |
| **Unknown product** | User enters a very niche/new product with little public info | Still generate prompts — they'll return less data from AI, but the framework questions are still valuable. Show a tip: "For newer products, research may be limited." |

### Navigation Edge Cases

| Edge Case | Expected Behavior |
|-----------|-------------------|
| **Direct URL to Stage 2 without Stage 1 data** | Redirect to Stage 1 with message "Start by entering a product name" |
| **Browser back button from Stage 2** | Return to Stage 1 with form pre-filled |
| **Page refresh mid-flow** | State lost (no persistence). Show empty state with "Start Over" option. |
| **Multiple tabs** | Each tab has independent state (React Context is per-instance). No conflicts. |

---

## Stage 2 — Prompt Generation

### Prompt Composition

| Edge Case | Scenario | Expected Behavior |
|-----------|----------|-------------------|
| **Missing skill data** | A SKILL.md file is malformed or missing at build time | Build-time warning. App loads with 5/6 prompts. Show "Prompt unavailable" card for missing pillar. |
| **Prompt too long** | Composed prompt exceeds ~4000 words | Trim lower-priority lenses. Show word count badge in amber instead of green. |
| **Prompt too short** | Product context is minimal (name only, no category) | Still generate full prompts. Category-specific filtering simply doesn't activate. |
| **Special chars in product name in prompt** | Product name has `"`, `'`, `\n`, backticks | Escape properly when injecting into prompt template. No raw interpolation. |
| **Category "Other" selected** | No category-specific lens filtering applies | Generate all lenses for all pillars. No filtering = maximum coverage. |
| **B2B product with consumer-focused lenses** | Pillar 3 asks about "app store reviews" for an enterprise B2B tool | Smart filtering de-emphasizes consumer-specific questions. But keeps them as "if applicable" — some B2B tools do have app store presence. |

### Clipboard & Download

| Edge Case | Expected Behavior |
|-----------|-------------------|
| **Clipboard API not available** | Fallback to `document.execCommand('copy')`. If that fails, show "Select All" with manual copy instructions. |
| **Clipboard permission denied** | Show toast: "Clipboard access denied. You can manually select and copy the text." |
| **Download blocked by browser** | Catch error, show alternative: "Right-click and save the text below" |
| **"Copy All" with 6 long prompts** | Concatenate with clear dividers (`---`). Total may be 5000+ words — clipboard handles this fine. |
| **Edit then copy** | User edits a prompt in the preview modal, then copies. Copies the edited version, not the original. |
| **Edit then navigate away** | Warn user: "You have unsaved edits. Leave anyway?" Edits are per-session only. |

---

## Stage 3 — Research Guide

### Content Edge Cases

| Edge Case | Expected Behavior |
|-----------|-------------------|
| **External links broken** | AI tool links (ChatGPT, Gemini, etc.) open in new tab. If service is down, that's not our problem — just link correctly. |
| **Template download fails** | Serve template as inline-generated Blob URL, not a server file. Cannot fail unless browser is severely broken. |
| **User skips this stage** | Allow direct navigation to Stage 4 from Stage 2. Research Guide is informational, not a gate. |

---

## Stage 4 — Upload & Parse

### File Upload

| Edge Case | Scenario | Expected Behavior |
|-----------|----------|-------------------|
| **Wrong file type** | User uploads `.pdf`, `.docx`, `.pptx` | Show error: "Please upload a Markdown (.md) or plain text (.txt) file. PDFs and Word docs are not supported." |
| **Empty file** | File has 0 bytes | Show error: "The file appears to be empty. Please check and re-upload." |
| **Very large file** | File > 5MB | Show warning: "Large files may take a moment to parse." Process anyway. Hard limit at 20MB. |
| **Very small file** | File < 100 bytes (a few lines) | Parse it, but show low confidence warning: "Very little content found. Results may be limited." |
| **No Markdown structure** | Plain text with no headers, no bullets — just paragraphs | Parser puts everything in "General Insights" bucket. Show warning: "No pillar structure detected. All content placed under General." |
| **Wrong language** | Summary doc is in Hindi, Spanish, etc. | Parser still extracts by structure (headers, bullets). Keyword matching for pillar mapping may fail — content goes to General. |
| **Multiple files dropped** | User drops 3 files at once | Accept only the first file. Show message: "Please upload a single summary document." |
| **Drag-and-drop not supported** | Older browser or assistive tech | Show fallback file picker button: "Or click to browse files" |
| **File with BOM** | UTF-8 file with Byte Order Mark | Strip BOM before parsing. |
| **Windows line endings** | `\r\n` vs `\n` | Normalize to `\n` before parsing. |

### Parser Edge Cases

| Edge Case | Scenario | Expected Behavior |
|-----------|----------|-------------------|
| **No pillar headers found** | Summary doc uses completely different structure | Map all content to "General Insights". Show: "We couldn't match your content to the 6 research pillars. You can manually assign insights." |
| **Partial pillar coverage** | Only 3 of 6 pillars present in doc | Parse what's there. Show completeness indicator: "3/6 pillars covered." Missing pillars show empty state with suggestion to research more. |
| **Duplicate pillar headers** | Doc has two "## Strategic" sections | Merge content from both into a single pillar. |
| **Deeply nested headers** | `#### Sub-sub-sub-section` content | Flatten to parent pillar. Don't lose content just because nesting is deep. |
| **Tables in Markdown** | Well-formatted Markdown tables | Extract table data as `tableData` on InsightCards. Render as tables in Insight Explorer. |
| **Code blocks in summary** | User included code snippets (architecture analysis) | Preserve code blocks as-is within insights. Render with syntax highlighting. |
| **Very long bullet points** | A single bullet is 500+ words | Treat as a single insight. Truncate preview in card, expand on click. |
| **Numbered lists vs bullets** | `1. First finding` vs `- First finding` | Both parse identically as list items → insights. |
| **Framework not detected** | Summary mentions "business model canvas" in lowercase mid-sentence | Fuzzy matching with case-insensitive regex. Match partial names too (e.g., "BMC" → Business Model Canvas). |
| **Ambiguous header mapping** | Header says "Users and Market Analysis" — could be Pillar 2 or 3 | Use keyword scoring: count pillar-specific keywords in the content under that header. Assign to highest-scoring pillar. |

---

## Stage 5 — Insight Explorer

### Display Edge Cases

| Edge Case | Expected Behavior |
|-----------|-------------------|
| **Zero insights parsed** | Show empty state: "No insights found. Try uploading a more structured summary document." with link back to template. |
| **1-2 insights only** | Show them without the masonry grid. Single column. Encourage: "Add more research for a richer teardown." |
| **100+ insights** | Virtualize the card grid. Show "Load more" pagination or infinite scroll. |
| **Very long insight text** | Truncate at 200 chars in card preview. "Read more" expands inline. |
| **No insights for a pillar** | Pillar tab shows count badge "0". Content area shows: "No insights found for this pillar." |
| **All insights selected** | "Select All" changes to "Deselect All". Badge shows full count. |
| **Search returns nothing** | Show: "No insights match your search." with clear search button. |

### Interaction Edge Cases

| Edge Case | Expected Behavior |
|-----------|-------------------|
| **Select 50+ insights for deck** | Allow it. Deck builder will show a warning: "You've selected many insights. Consider narrowing to 20-30 for a focused deck." |
| **Deselect all insights then go to deck** | Show: "No insights selected. Go back to the Explorer to select content for your deck." |
| **Filter + search combined** | Filters and search are AND-composed. Show active filter count. "Clear all filters" button. |
| **Rapid pillar switching** | Debounce animations. Don't trigger transition if switching within 100ms. |

---

## Stage 6 — Deck Builder

### Slide Management

| Edge Case | Expected Behavior |
|-----------|-------------------|
| **No insights selected** | Deck builder shows 10 slide shells with empty content areas. User can manually type content. |
| **Insight doesn't fit a slide** | Overflow insights go to a "Parking Lot" section below the 10 slides. User can drag them in. |
| **Drag-and-drop fails** | Keyboard fallback: Up/Down arrows + Enter to reorder. Accessible to screen readers. |
| **Slide title too long** | Truncate at 80 chars in preview. Full title in editor. |

### Export Edge Cases

| Edge Case | Expected Behavior |
|-----------|-------------------|
| **PPTX generation fails** | Catch error, show: "Export failed. Try again or download as PDF instead." Log error to console. |
| **PDF generation on mobile** | `html2canvas` may struggle with complex layouts. Show warning on mobile: "PDF export works best on desktop." |
| **Very long content per slide** | PPTX generator enforces 14pt minimum. Content overflow is handled by truncation with "..." and a notes section. |
| **No product name set** | Fallback to "Product Teardown" in slide titles and file names. |
| **File name sanitization** | Download as `{ProductName}_Teardown.pptx`. Strip special chars from filename. |
| **Browser blocks download** | Show popup blocker warning with instructions to allow downloads. |

---

## Cross-Cutting Edge Cases

### Browser Compatibility

| Edge Case | Expected Behavior |
|-----------|-------------------|
| **Safari private browsing** | localStorage may be restricted. App works without persistence — state is session-only anyway. |
| **IE11** | Not supported. Show "Please use a modern browser" message. |
| **Mobile browser** | Full responsive support. Some features (drag-and-drop) use touch events via @dnd-kit. |
| **Slow network** | App is a static SPA — once loaded, no network needed. Show loading spinner during initial bundle download. |
| **JavaScript disabled** | Show `<noscript>` message: "This app requires JavaScript to run." |

### Accessibility

| Edge Case | Expected Behavior |
|-----------|-------------------|
| **Screen reader** | All interactive elements have ARIA labels. Stage transitions announced. |
| **Keyboard only** | Full tab navigation. Focus rings visible. Enter/Space activates buttons. |
| **High contrast mode** | Respect `prefers-contrast: more`. Ensure all text meets AA contrast. |
| **Reduced motion** | Respect `prefers-reduced-motion`. Disable Framer Motion animations. |
| **Zoom 200%** | Layout remains usable. No horizontal scrolling. |

### Data Integrity

| Edge Case | Expected Behavior |
|-----------|-------------------|
| **Browser crash mid-flow** | All state is lost. User restarts from Stage 1. Consider adding optional localStorage save in future. |
| **Copy-paste prompt with encoding issues** | Prompts are pure ASCII/UTF-8 text. No encoding-sensitive characters. |
| **Summary doc with malicious content** | Parser only extracts text structure. No `eval()`, no `innerHTML`. Content is sanitized by React's JSX rendering. |
| **XSS in product name** | React auto-escapes JSX. Product name `<script>alert('x')</script>` renders as text, not executed. |
