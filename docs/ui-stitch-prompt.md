# Google Stitch UI Generation Prompt

> **Purpose**: Paste this prompt into [Google Stitch](https://stitch.withgoogle.com/) to generate UI mockups for the Product Discovery & Teardown web app.  
> **Color palette**: Deep navy dark theme with violet primary accent and 6 distinct pillar colors.  
> **Note**: You may need to break this into multiple Stitch sessions per stage for best results.

---

## Master Prompt — Full Application UI

```
Design a premium dark-themed web application called "Product Discovery & Teardown" — a tool for Product Managers to systematically research any product across 6 research pillars and build portfolio-ready teardown presentations.

The app is a multi-stage wizard with 6 stages. It should feel like a premium analytical tool — think Linear meets Bloomberg meets Notion in dark mode. Clean, spacious, with purposeful micro-interactions. No clutter.

### Color System

Use this exact color palette:

**Base Colors:**
- Background: #0B0F1A (deep navy-black)
- Surface (cards/panels): #131827
- Surface Elevated (modals/hovers): #1C2237
- Border: #2A3150
- Text Primary: #F0F2F8
- Text Secondary: #8B93B0
- Text Tertiary/Placeholder: #565E7A

**Primary Accent:**
- Primary: #7C5CFC (violet)
- Primary Hover: #9B7FFF
- Primary Muted: rgba(124, 92, 252, 0.12)

**6 Pillar Colors (each research pillar has its own accent):**
- Pillar 1 — Strategic: #34D399 (emerald)
- Pillar 2 — Market: #FBBF24 (amber)
- Pillar 3 — Users: #38BDF8 (sky blue)
- Pillar 4 — Technical: #22D3EE (cyan)
- Pillar 5 — Behavioral: #FB7185 (rose)
- Pillar 6 — Ethics: #A78BFA (violet/lavender)

**Status Colors:**
- Success: #34D399
- Warning: #FBBF24
- Error: #F87171
- Info: #60A5FA

**Typography:**
- Font: Inter (headings and body), JetBrains Mono (code/prompts)
- Headings: Bold, slightly larger tracking
- Body: Regular weight, 16px base
- Prompt text: JetBrains Mono, 14px

**Shape Language:**
- Border radius: 12px for cards, 8px for buttons/inputs, 6px for badges
- Shadows: Subtle layered shadows with blue/violet tint
- Glassmorphism: Subtle backdrop blur on elevated surfaces

### Global Layout

The app has a persistent top bar and a horizontal stage progress indicator:

- **Header**: Left-aligned wordmark "Product Discovery & Teardown" in Text Primary. When a product is loaded, show the product name as a subtle breadcrumb. Right side: minimal — maybe a theme toggle icon.
- **Stage Progress Bar**: A horizontal stepper with 6 steps below the header. Each step shows: step number, step name, completion status (empty circle → filled circle → checkmark). The active step has the primary violet glow. Completed steps show the checkmark in the primary color. Future steps are dimmed. Steps are clickable to navigate.
  - Step 1: "Product Input"
  - Step 2: "Research Prompts"
  - Step 3: "Research Guide"
  - Step 4: "Upload & Parse"
  - Step 5: "Insight Explorer"
  - Step 6: "Build Your Deck"

---

### STAGE 1 — Product Input

A centered, focused input form on the dark background. The form lives inside a subtle glassmorphic card (backdrop blur, faint border, slightly elevated surface).

**Hero Section** above the form:
- Large heading (32px, bold): "Discover any product like a Pro PM"
- Subtitle (18px, Text Secondary): "Generate framework-backed research prompts across 6 strategic pillars"
- Subtle animated gradient accent line under the heading (violet to sky blue)

**Form Fields** (inside the card):
1. **Product Name** — Large text input, placeholder "e.g., Instagram, Notion, Uber..."
   - 20px font size, prominent. Full width. Violet focus ring.
2. **Company Name** — Standard text input, placeholder "e.g., Meta, Notion Labs, Uber Technologies"
3. **Product Category** — Segmented button group (pill-shaped toggle buttons in a row):
   Options: Social & Communication | Productivity & Tools | E-commerce | Finance & Fintech | Health & Wellness | Education | Entertainment & Media | Developer Tools | Other
   - Unselected: Surface background, Text Secondary
   - Selected: Primary Muted background with violet text
4. **Platform** — Chip group (multiple selectable):
   Options: 📱 Mobile | 🌐 Web | 🖥️ Desktop | 🔄 Cross-platform
   - Same style as category but with emoji/icon prefixes
5. **Business Model** — Radio button group (single select):
   Options: B2C | B2B | B2B2C | Marketplace | Platform
6. **Additional Context** — Optional textarea, placeholder: "Anything specific you want to explore? (optional)"
   - Smaller, collapsible or dimmed until focused

**CTA Button**: Full width at the bottom of the card:
- Text: "Generate Research Prompts →"
- Style: Violet primary button (#7C5CFC), white text, 16px bold
- Disabled state: 50% opacity, no hover effect
- Enabled state: Subtle glow shadow, hover lifts slightly

---

### STAGE 2 — Prompt Generation

**Hero Section:**
- Heading: "Your Research Prompts Are Ready" with a subtle checkmark icon
- Subtitle showing: "6 prompts for [Product Name] by [Company Name]" with the product name in Primary color

**Prompt Card Grid**: 3 columns × 2 rows on desktop, responsive.

Each **Prompt Card** is a Surface-colored card with the pillar's accent color as a left border (4px) and a small colored icon in the top-left:

Card content:
- **Pillar icon** (top-left): Small circle with pillar color background and white icon
- **Pillar name** (e.g., "Strategic & Business Context") — bold, Text Primary
- **Prompt name** (e.g., "Strategic Deep Dive") — Text Secondary, smaller
- **Metadata badges row**: 
  - "9 lenses" badge (small, Surface Elevated bg)
  - "3 frameworks" badge
  - "~1,050 words" badge
  - "~18 min" badge (estimated research time)
- **Action buttons row** (bottom):
  - "📋 Copy Prompt" — Primary button style, compact
  - "👁️ Preview" — Ghost/outline button
  - "✏️ Edit" — Ghost/outline button

**Card hover state**: Slight Y-axis lift, increased shadow, pillar color border brightens.

**Expanded card state** (when Preview is clicked): Card expands inline or opens a modal showing the full prompt text in JetBrains Mono on a slightly darker surface, with:
- Role instruction highlighted in a colored callout box
- Framework names in bold with pillar color
- Lens questions with numbered headers
- Ethical guardrails section at the bottom with a subtle warning-colored border

**Batch Actions** (below the grid):
- "📋 Copy All Prompts" — Secondary button
- "📥 Download as .md" — Secondary button
- Divider, then CTA: "Continue to Research Guide →" in Primary style

---

### STAGE 3 — Research Guide

A single-column layout with a visual step-by-step guide.

**Heading**: "Take Your Prompts to AI & Research"
**Subtitle**: "Use your preferred AI tool to run the 6 research prompts, then compile a summary document."

**Step-by-step visual guide** (5 steps, vertical timeline with connecting line):

Step 1: 📋 "Copy a prompt from the previous stage"
Step 2: 🤖 "Open your preferred AI tool"
Step 3: 📝 "Paste the prompt and run the research"
Step 4: 🔁 "Repeat for all 6 pillars"
Step 5: 📄 "Compile a single summary document"

**AI Tool Recommendation Cards** (4 cards in a row):
Each card has:
- Tool logo/icon area (use a placeholder colored circle with the first letter)
- Tool name: ChatGPT, Google Gemini, Claude, Perplexity
- One-line description: "Best for: broad research", "Best for: web-grounded citations", etc.
- "Open →" link

**Pro Tip Callout** (full width, Info colored left border):
"💡 Pro Tip: Use Google NotebookLM to upload all 6 research outputs and ask it to synthesize a unified summary document organized by the 6 pillars. This produces the best input for the next stage."

**Summary Template Section**:
- Card showing the expected summary document format (6 pillar headers with placeholder content)
- "📥 Download Summary Template (.md)" button (Primary style)
- Collapsible "View Example Summary" section

**Transition CTA**: 
- Checklist items:
  ✓ Covers all 6 pillars
  ✓ Markdown or plain text format
  ✓ Contains specific findings
- Button: "Upload Summary Document →"

---

### STAGE 4 — Upload & Parse

**Centered layout** with a large drag-and-drop zone.

**Drag-and-Drop Zone**:
- Large rounded rectangle (300px height), dashed border in Border color (#2A3150)
- Center icon: Upload/cloud icon in Text Tertiary
- Text: "Drag & drop your summary document here"
- Subtitle: ".md or .txt files accepted"
- "or click to browse" link in Primary color
- **Active drop state**: Border becomes Primary color, background gets Primary Muted fill, icon animates

**Post-Upload: Parse Results**
After file is processed, show:

- **Parse Summary Card**: Surface card showing:
  - File name and size
  - Total insights extracted: "47 insights found"
  - Parse confidence: Progress bar (e.g., 85%) with color coding
  - 6 mini pillar indicators showing coverage:
    Each is a small row: pillar color dot + pillar name + insight count + completeness bar
    e.g., "🟢 Strategic — 9 insights — ████░░ 78%"

- **Warnings** (if any): Amber-bordered callout listing issues
  e.g., "⚠️ No content found for Pillar 5 (Behavioral). Consider adding behavioral research."

- CTA: "Explore Insights →"

---

### STAGE 5 — Insight Explorer (Hero Screen)

This is the most important screen. It should feel like a premium data exploration interface.

**Layout**: Two-column — left sidebar (240px) + main content area.

**Left Sidebar**:
- **Pillar Navigation**: 6 items, vertically stacked
  Each item: Pillar color dot + Pillar name + Insight count badge (e.g., "9")
  Active item: Primary muted background, bold text, left border in pillar color
  Inactive items: Normal text, hover shows surface elevated bg
  
- **Divider**

- **Stats Panel** (below navigation):
  - "47 total insights"
  - "12 selected for deck"
  - "85% pillar coverage"
  - Each stat is a small label + number pair

**Top Bar** (above the main content, below the global stage bar):
- Search input: "🔍 Search insights..." — full width, Surface background
- Filter dropdown: "Filter by type" → Finding, Metric, Gap, Recommendation, Framework
- Sort dropdown: "Sort by" → Confidence, Type, Length
- View toggle: Grid icon | List icon (two view modes)

**Main Content — Insight Card Grid**:
Masonry-style grid (2-3 columns depending on width) of insight cards.

Each **Insight Card**:
- Surface background, 12px border radius
- **Top**: Insight type badge (e.g., "📊 Metric" in a small colored badge — each type has its own muted color)
- **Title**: Bold, 16px — an action-oriented title (e.g., "Revenue is primarily subscription-based at 73%")
- **Content**: Text Secondary, 14px — 2-3 lines of the insight text, truncated with "Read more"
- **Bottom row**: 
  - Confidence indicator: 3 dots (●●●○ = high, ●●○○ = medium, ●○○○ = low)
  - Framework tag if detected: "Business Model Canvas" in a small muted badge
  - Source section: small muted text showing original header path
- **Selection toggle**: Top-right corner, a subtle "+ Add to Deck" button that changes to "✓ In Deck" when selected (Primary color fill)

**Card interactions**:
- Hover: Slight lift, border brightens
- Click: Expands inline showing full content
- Selected state: Left border becomes Primary color, subtle Primary muted background

**Bottom Fixed Bar** (when insights are selected):
- Left: "12 insights selected"
- Right: "Build Your Deck →" Primary button with arrow

---

### STAGE 6 — Build Your Deck

**Layout**: Two-column — left panel (slide list, 320px) + main content (slide preview).

**Left Panel — Slide List**:
- **Heading**: "Your Teardown Deck" with slide count "10 slides"
- **Draggable slide items**: Each is a compact card showing:
  - Drag handle icon (⠿) on the left
  - Slide number
  - Slide title (editable on click)
  - Small insight count badge
  - Delete button (subtle, on hover)
- Slides can be reordered by dragging
- "Add Slide" button at the bottom (ghost button)

**Main Content — Slide Preview**:
- Large 16:9 preview area (Surface Elevated background)
- Shows a WYSIWYG representation of the selected slide
- Below the preview:
  - Slide title input (editable)
  - Layout selector (text-left, text-right, centered, two-column)
  - Content area showing the insights assigned to this slide

**Bottom Action Bar**:
- Theme selector: 3-4 preset color themes (small color swatches)
- "📥 Download PPTX" — Primary button
- "📥 Download PDF" — Secondary button
- Download progress indicator (when generating)

---

### Additional Design Notes

- All page transitions should feel smooth (fade + slight slide)
- Cards should have subtle entry animations (stagger from bottom)
- The overall aesthetic should communicate "this is a professional tool built by someone who understands product management"
- Empty states should be encouraging, not generic — use relevant messaging
- The entire app should work beautifully at 1280px, 768px, and 375px widths
- Use generous spacing — never feel cramped
- Text should be highly legible — no tiny text, good line height (1.6 for body)
```

---

## Individual Stage Prompts

> Use these if you want to generate each stage separately in Stitch for higher fidelity.

### Stage 1 Only

```
Design a dark-themed product input page for a PM research tool.

Background: #0B0F1A. Card surface: #131827 with subtle glassmorphism (backdrop blur, faint #2A3150 border).

Centered layout. Hero heading "Discover any product like a Pro PM" in #F0F2F8, 32px bold. Subtitle "Generate framework-backed research prompts across 6 strategic pillars" in #8B93B0.

Form inside the card:
1. Large product name input (20px font, placeholder "e.g., Instagram, Notion, Uber...")
2. Company name input
3. Category selector — pill-shaped segmented buttons (Social & Communication, Productivity & Tools, E-commerce, Finance & Fintech, Health & Wellness, Education, Entertainment & Media, Developer Tools, Other). Selected = rgba(124,92,252,0.12) bg with #7C5CFC text
4. Platform chips (📱 Mobile, 🌐 Web, 🖥️ Desktop, 🔄 Cross-platform) — multi-select
5. Business Model radio (B2C, B2B, B2B2C, Marketplace, Platform)
6. Optional context textarea

CTA: "Generate Research Prompts →" — full width, #7C5CFC background, white text, subtle violet glow shadow. Disabled at 50% opacity.

Font: Inter. Border radius: 12px cards, 8px inputs. Focus ring: #7C5CFC.
```

### Stage 2 Only

```
Design a dark-themed prompt generation results page.

Background: #0B0F1A. 

Header: "Your Research Prompts Are Ready" with "6 prompts for Instagram by Meta" subtitle (product name in #7C5CFC).

3×2 grid of prompt cards on #131827 surface:

Each card has:
- 4px left border in pillar color (Emerald #34D399, Amber #FBBF24, Sky #38BDF8, Cyan #22D3EE, Rose #FB7185, Lavender #A78BFA)
- Pillar color circle icon (top-left)
- Pillar name bold in #F0F2F8
- Prompt name in #8B93B0
- Row of metadata badges: "9 lenses", "3 frameworks", "~1,050 words", "~18 min" — each in #1C2237 background
- Bottom: "📋 Copy" primary button, "👁️ Preview" ghost button, "✏️ Edit" ghost button

Cards hover: subtle lift, border brightens. Below grid: "📋 Copy All" and "📥 Download .md" secondary buttons, then "Continue to Research Guide →" CTA.

Font: Inter (headings), JetBrains Mono (prompt text). Border radius: 12px.
```

### Stage 5 Only (Hero Screen)

```
Design a dark-themed insight explorer — the hero screen of a PM research tool.

Background: #0B0F1A. Two-column layout.

LEFT SIDEBAR (240px, #131827):
- 6 pillar navigation items, vertically stacked:
  • 🟢 Strategic & Business (9) — #34D399 dot
  • 🟡 Market & Competition (7) — #FBBF24 dot
  • 🔵 Users & Product Craft (12) — active state, #38BDF8 left border, bold, rgba(56,189,248,0.12) background
  • 🔵 Technical Architecture (8) — #22D3EE dot
  • 🌸 Behavioral Psychology (6) — #FB7185 dot
  • 💜 Trust, Safety & Ethics (5) — #A78BFA dot
- Divider
- Stats: "47 total • 12 selected • 85% coverage"

TOP BAR:
- Search: "🔍 Search insights..." input on #131827
- Filters: "Type ▼" "Sort ▼" dropdowns
- View toggle: grid/list icons

MAIN CONTENT — Masonry card grid (3 columns):
Show 6-8 insight cards on #131827 surface:

Card 1: Badge "📊 Metric" (sky muted). Title "Revenue is 73% subscription-based" bold. Content preview in #8B93B0. Confidence: ●●●○. Tag "Business Model Canvas". Top-right: "+ Add to Deck"

Card 2: Badge "🎯 Finding". Title "Primary user segment is mid-market SaaS teams". Selected state — left border #7C5CFC, subtle violet tint. "✓ In Deck" button.

Card 3: Badge "⚠️ Gap" (amber). Title "No public data on unit economics". Confidence: ●○○○.

Card 4: Badge "💡 Recommendation". Title "Opportunity: expand into SMB segment". Confidence: ●●○○.

Show varied card heights (masonry). Hover: subtle lift. 

BOTTOM FIXED BAR: "12 insights selected" left, "Build Your Deck →" primary button right.

Font: Inter 16px body. #7C5CFC accent. 12px border radius.
```
