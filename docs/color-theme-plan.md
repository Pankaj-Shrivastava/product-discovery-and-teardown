# Color Theme Architecture & Nordic Mist Migration Plan

> **Version**: 1.0  
> **Last Updated**: 2026-10-17  
> **Target Theme**: **Option 2: Nordic Mist & Indigo (Light)**  
> **Purpose**: Serves as the definitive design system blueprint for migrating the Studio from the initial high-contrast dark/neon theme to the eye-soothing Nordic Mist & Indigo theme. Includes inline visual color swatches, full component-level token mappings, and a 1-instruction rollback protocol.

---

## 1. Executive Summary & Aesthetic Rationale

- **Prior State (Legacy Dark/Neon)**: Cold, high-contrast dark void (`#070A14` / `#0B0F1A`) with electric neon purple (`#7C5CFC`), cyan (`#38BDF8`), and heavy glowing drop shadows. Causes rapid visual fatigue during long reading and research sessions.
- **New State (Nordic Mist & Indigo)**: Airy, calm Scandinavian design studio inspired by Linear Light and Stripe dashboards. Built on a soft, non-glaring mist canvas (`#F4F6F9`), pure milk card surfaces (`#FFFFFF`), architectural deep slate typography (`#1A202C`), and restorative royal indigo accents (`#4355B9`).

---

## 2. Master Palette Tokens (With Visual Swatches)

### 2.1 Core System Tokens

| Token Name | Prior (Legacy Dark) | New (Nordic Mist Light) | Role in Studio UI | Contrast Ratio |
|---|:---:|:---:|---|:---:|
| **Canvas Background** | <span style="display:inline-block;width:14px;height:14px;background-color:#0B0F1A;border:1px solid #333;border-radius:3px;vertical-align:middle;"></span> `#0B0F1A` | <span style="display:inline-block;width:14px;height:14px;background-color:#F4F6F9;border:1px solid #CBD5E1;border-radius:3px;vertical-align:middle;"></span> **`#F4F6F9`** | Primary viewport background (zero harsh glare) | — |
| **Card Surface** | <span style="display:inline-block;width:14px;height:14px;background-color:#131827;border:1px solid #333;border-radius:3px;vertical-align:middle;"></span> `#131827` | <span style="display:inline-block;width:14px;height:14px;background-color:#FFFFFF;border:1px solid #CBD5E1;border-radius:3px;vertical-align:middle;"></span> **`#FFFFFF`** | Floating cards, modal dialogs, inputs, panels | 15.2:1 vs text |
| **Hover Surface** | <span style="display:inline-block;width:14px;height:14px;background-color:#1C2237;border:1px solid #333;border-radius:3px;vertical-align:middle;"></span> `#1C2237` | <span style="display:inline-block;width:14px;height:14px;background-color:#EBF0F5;border:1px solid #CBD5E1;border-radius:3px;vertical-align:middle;"></span> **`#EBF0F5`** | Hover states on interactive cards & chips | — |
| **Primary Accent** | <span style="display:inline-block;width:14px;height:14px;background-color:#7C5CFC;border:1px solid #333;border-radius:3px;vertical-align:middle;"></span> `#7C5CFC` | <span style="display:inline-block;width:14px;height:14px;background-color:#4355B9;border:1px solid #CBD5E1;border-radius:3px;vertical-align:middle;"></span> **`#4355B9`** | Brand identity, primary CTAs, active indicators | 5.8:1 (AA) |
| **Accent Hover** | <span style="display:inline-block;width:14px;height:14px;background-color:#6542EC;border:1px solid #333;border-radius:3px;vertical-align:middle;"></span> `#6542EC` | <span style="display:inline-block;width:14px;height:14px;background-color:#364599;border:1px solid #CBD5E1;border-radius:3px;vertical-align:middle;"></span> **`#364599`** | Button hover and pressed states | 7.4:1 (AAA) |
| **Main Body Text** | <span style="display:inline-block;width:14px;height:14px;background-color:#F0F2F8;border:1px solid #333;border-radius:3px;vertical-align:middle;"></span> `#F0F2F8` | <span style="display:inline-block;width:14px;height:14px;background-color:#1A202C;border:1px solid #CBD5E1;border-radius:3px;vertical-align:middle;"></span> **`#1A202C`** | Primary headings, prompts, card labels | 14.8:1 (AAA) |
| **Secondary Text** | <span style="display:inline-block;width:14px;height:14px;background-color:#8B93B0;border:1px solid #333;border-radius:3px;vertical-align:middle;"></span> `#8B93B0` | <span style="display:inline-block;width:14px;height:14px;background-color:#64748B;border:1px solid #CBD5E1;border-radius:3px;vertical-align:middle;"></span> **`#64748B`** | Subtitles, step descriptions, metadata | 5.2:1 (AA) |
| **Muted / Placeholders** | <span style="display:inline-block;width:14px;height:14px;background-color:#475569;border:1px solid #333;border-radius:3px;vertical-align:middle;"></span> `#475569` | <span style="display:inline-block;width:14px;height:14px;background-color:#94A3B8;border:1px solid #CBD5E1;border-radius:3px;vertical-align:middle;"></span> **`#94A3B8`** | Form placeholders, timestamps, counters | 3.2:1 |
| **Hairline Borders** | <span style="display:inline-block;width:14px;height:14px;background-color:#2A3150;border:1px solid #333;border-radius:3px;vertical-align:middle;"></span> `#2A3150` | <span style="display:inline-block;width:14px;height:14px;background-color:#E2E8F0;border:1px solid #CBD5E1;border-radius:3px;vertical-align:middle;"></span> **`#E2E8F0`** | Card outlines, dividers, input borders | — |
| **Subtle Active Borders** | <span style="display:inline-block;width:14px;height:14px;background-color:#3E486D;border:1px solid #333;border-radius:3px;vertical-align:middle;"></span> `#3E486D` | <span style="display:inline-block;width:14px;height:14px;background-color:#CBD5E1;border:1px solid #CBD5E1;border-radius:3px;vertical-align:middle;"></span> **`#CBD5E1`** | Active tabs, selected pills, focused cards | — |

---

### 2.2 6 Research Pillar Tokens (Nordic Studio Calibration)

All 6 research pillars are updated from harsh neon primaries to refined, grounded studio pigments:

| Pillar Number & Name | Prior Color (Neon) | New Color (Nordic Studio) | New Badge Background | New Border Color |
|---|:---:|:---:|:---:|:---:|
| **1. Strategic & Business** | <span style="display:inline-block;width:14px;height:14px;background-color:#34D399;border:1px solid #333;border-radius:3px;vertical-align:middle;"></span> `#34D399` | <span style="display:inline-block;width:14px;height:14px;background-color:#107C41;border:1px solid #CBD5E1;border-radius:3px;vertical-align:middle;"></span> **`#107C41`** *(Studio Green)* | `rgba(16, 124, 65, 0.08)` | `rgba(16, 124, 65, 0.25)` |
| **2. Market & Competition** | <span style="display:inline-block;width:14px;height:14px;background-color:#FBBF24;border:1px solid #333;border-radius:3px;vertical-align:middle;"></span> `#FBBF24` | <span style="display:inline-block;width:14px;height:14px;background-color:#C07818;border:1px solid #CBD5E1;border-radius:3px;vertical-align:middle;"></span> **`#C07818`** *(Warm Amber)* | `rgba(192, 120, 24, 0.08)` | `rgba(192, 120, 24, 0.25)` |
| **3. Users & Product Craft** | <span style="display:inline-block;width:14px;height:14px;background-color:#38BDF8;border:1px solid #333;border-radius:3px;vertical-align:middle;"></span> `#38BDF8` | <span style="display:inline-block;width:14px;height:14px;background-color:#2563EB;border:1px solid #CBD5E1;border-radius:3px;vertical-align:middle;"></span> **`#2563EB`** *(Cobalt Slate)* | `rgba(37, 99, 235, 0.08)` | `rgba(37, 99, 235, 0.25)` |
| **4. Technical Architecture** | <span style="display:inline-block;width:14px;height:14px;background-color:#22D3EE;border:1px solid #333;border-radius:3px;vertical-align:middle;"></span> `#22D3EE` | <span style="display:inline-block;width:14px;height:14px;background-color:#0284C7;border:1px solid #CBD5E1;border-radius:3px;vertical-align:middle;"></span> **`#0284C7`** *(Sky Slate)* | `rgba(2, 132, 199, 0.08)` | `rgba(2, 132, 199, 0.25)` |
| **5. Behavioral Psychology** | <span style="display:inline-block;width:14px;height:14px;background-color:#FB7185;border:1px solid #333;border-radius:3px;vertical-align:middle;"></span> `#FB7185` | <span style="display:inline-block;width:14px;height:14px;background-color:#C0392B;border:1px solid #CBD5E1;border-radius:3px;vertical-align:middle;"></span> **`#C0392B`** *(Warm Coral)* | `rgba(192, 57, 43, 0.08)` | `rgba(192, 57, 43, 0.25)` |
| **6. Trust, Safety & Ethics** | <span style="display:inline-block;width:14px;height:14px;background-color:#A78BFA;border:1px solid #333;border-radius:3px;vertical-align:middle;"></span> `#A78BFA` | <span style="display:inline-block;width:14px;height:14px;background-color:#7C3AED;border:1px solid #CBD5E1;border-radius:3px;vertical-align:middle;"></span> **`#7C3AED`** *(Royal Purple)* | `rgba(124, 58, 237, 0.08)` | `rgba(124, 58, 237, 0.25)` |

---

## 3. Class & Style Translation Reference

| Legacy Tailwind / Style Expression | Replacement Nordic Studio Expression |
|---|---|
| `bg-[#0B0F1A]` / `bg-[#070A14]` | `bg-[#F4F6F9]` |
| `bg-[#131827]` | `bg-[#FFFFFF]` |
| `bg-[#1C2237]` | `bg-[#EDF2F7]` (or `bg-[#F8FAFC]` for subtle surfaces) |
| `border-[#2A3150]` / `border-[#1F263E]` | `border-[#E2E8F0]` |
| `border-[#3E486D]` | `border-[#CBD5E1]` |
| `text-[#F0F2F8]` / `text-white` (body) | `text-[#1A202C]` |
| `text-[#8B93B0]` | `text-[#64748B]` |
| `text-[#CABEFF]` | `text-[#4355B9]` |
| `from-[#7C5CFC] to-[#9B7FFF]` | `from-[#4355B9] to-[#5C6EC9]` |
| `shadow-[0_0_20px_rgba(124,92,252,0.4)]` | `shadow-[0_4px_14px_rgba(67,85,185,0.2)]` |
| `.glass-panel` | `bg-white border border-[#E2E8F0] shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]` |
| `.glass-panel-elevated` | `bg-white border border-[#E2E8F0] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.08),0_8px_10px_-6px_rgba(0,0,0,0.04)]` |
| `.glass-header` | `bg-white/90 backdrop-blur-md border-b border-[#E2E8F0]` |

---

## 4. Complete List of Target Files (29 Files)

### 4.1 Global Styles & Data
1. [src/index.css](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/index.css) — CSS variables, scrollbar, utility classes, `color-scheme: light`.
2. [src/lib/constants.ts](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/lib/constants.ts) — `PILLARS` array color, bgColor, borderColor values.

### 4.2 Layout & Shell
3. [src/components/layout/Header.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/layout/Header.tsx) — Frosted white header, slate wordmark, indigo logo.
4. [src/components/layout/StageProgressBar.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/layout/StageProgressBar.tsx) — Top progress bar, active stage indicator, completed badges.
5. [src/components/layout/Layout.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/layout/Layout.tsx) — Viewport container, subtle ambient gradients.

### 4.3 Stage 1: Product Input
6. [src/pages/Stage1_ProductInput.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/pages/Stage1_ProductInput.tsx) — Main stage container, hero headers, CTA button.
7. [src/components/product-input/ProductNameInput.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/product-input/ProductNameInput.tsx) — Input fields, helper text, focus rings.
8. [src/components/product-input/CompanyNameInput.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/product-input/CompanyNameInput.tsx) — Input fields, focus states.
9. [src/components/product-input/CategorySelector.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/product-input/CategorySelector.tsx) — Selection dropdown, selected chip pills.
10. [src/components/product-input/PlatformSelector.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/product-input/PlatformSelector.tsx) — Multi-select platform buttons and chips.
11. [src/components/product-input/BusinessModelSelector.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/product-input/BusinessModelSelector.tsx) — Dropdown menu, selected chips.
12. [src/components/product-input/QuickPresets.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/product-input/QuickPresets.tsx) — Preset product recommendation pills.
13. [src/components/product-input/AdditionalContext.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/product-input/AdditionalContext.tsx) — Context textarea, char counters.

### 4.4 Stage 2: Prompt Generation
14. [src/pages/Stage2_PromptGeneration.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/pages/Stage2_PromptGeneration.tsx) — Stage container, search bar, card grid layout.
15. [src/components/prompt-generation/PromptCard.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/prompt-generation/PromptCard.tsx) — 6 prompt cards, header tags, action buttons.
16. [src/components/prompt-generation/PromptSyntaxViewer.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/prompt-generation/PromptSyntaxViewer.tsx) — Inline syntax highlighter, callout boxes.
17. [src/components/prompt-generation/PromptPreview.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/prompt-generation/PromptPreview.tsx) — Fullscreen modal reader, scrim backdrop, edit textarea.
18. [src/components/prompt-generation/BatchActions.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/prompt-generation/BatchActions.tsx) — Copy All and Download (.txt / .md) action bar.
19. [src/components/prompt-generation/TransitionToGuide.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/prompt-generation/TransitionToGuide.tsx) — Stage 3 transition CTA card, AI tool chips.

### 4.5 Stage 3: Research Guide
20. [src/pages/Stage3_ResearchGuide.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/pages/Stage3_ResearchGuide.tsx) — Playbook page wrapper, hero banner, toast state.
21. [src/components/research-guide/ResearchWorkflowSteps.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/research-guide/ResearchWorkflowSteps.tsx) — 5-step numbered workflow cards.
22. [src/components/research-guide/AIToolCards.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/research-guide/AIToolCards.tsx) — 4 AI engine cards (ChatGPT, Gemini, Claude, Perplexity).
23. [src/components/research-guide/NotebookLMBanner.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/research-guide/NotebookLMBanner.tsx) — NotebookLM workflow banner, copyable synthesis prompt.
24. [src/components/research-guide/SummaryTemplateGuide.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/research-guide/SummaryTemplateGuide.tsx) — Template download, accordions, Spotify case study.
25. [src/components/research-guide/TransitionToUpload.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/research-guide/TransitionToUpload.tsx) — Pre-flight checklist, Stage 4 navigation.

### 4.6 Stages 4, 5, 6 Future Screens
26. [src/pages/Stage4_UploadParse.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/pages/Stage4_UploadParse.tsx) — Upload dropzone, file requirements.
27. [src/pages/Stage5_InsightExplorer.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/pages/Stage5_InsightExplorer.tsx) — Knowledge base search, pillar tabs.
28. [src/pages/Stage6_DeckBuilder.tsx](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/pages/Stage6_DeckBuilder.tsx) — Presentation slide builder canvas.

### 4.7 Engine Logic
29. [src/lib/prompt-engine/composer.ts](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/lib/prompt-engine/composer.ts) — Verification of prompt object color attributes.

---

## 5. One-Instruction Instant Rollback Protocol

If you ever wish to revert from the Nordic Mist theme back to the original dark theme, execute either of the following single-instruction options:

### Option A: Using the Git Checkpoint
Run this command in the terminal:
```bash
git restore src/
```
*(This immediately restores all modified files in `src/` to the last clean dark-theme git commit).*

### Option B: Prompt Instruction to the Agent
Simply say:
> **"Revert the color theme back to the original dark mode as documented in Section 6 of docs/color-theme-plan.md."**

---

## 6. Original Legacy Dark Theme Archive (For Reference & Restoration)

Below is the exact original configuration preserved for reference:

```css
/* Original src/index.css :root tokens */
:root {
  --background: #0B0F1A;
  --foreground: #F0F2F8;
  --card: #131827;
  --card-foreground: #F0F2F8;
  --popover: #131827;
  --popover-foreground: #F0F2F8;
  --primary: #7C5CFC;
  --primary-foreground: #FFFFFF;
  --secondary: #1C2237;
  --secondary-foreground: #F0F2F8;
  --muted: #1A2138;
  --muted-foreground: #8B93B0;
  --accent: #2A3150;
  --accent-foreground: #F0F2F8;
  --destructive: #EF4444;
  --destructive-foreground: #FFFFFF;
  --border: #2A3150;
  --input: #1C2237;
  --ring: #7C5CFC;
  --radius: 0.75rem;

  /* Legacy Pillar Accents */
  --pillar-strategic: #34D399;
  --pillar-market: #FBBF24;
  --pillar-users: #38BDF8;
  --pillar-technical: #22D3EE;
  --pillar-behavioral: #FB7185;
  --pillar-ethics: #A78BFA;
}
```
```typescript
// Original src/lib/constants.ts PILLARS colors
Strategic:  color: '#34D399', bgColor: 'rgba(52, 211, 153, 0.1)',  borderColor: 'rgba(52, 211, 153, 0.3)'
Market:     color: '#FBBF24', bgColor: 'rgba(251, 191, 36, 0.1)',  borderColor: 'rgba(251, 191, 36, 0.3)'
Users:      color: '#38BDF8', bgColor: 'rgba(56, 189, 248, 0.1)',  borderColor: 'rgba(56, 189, 248, 0.3)'
Technical:  color: '#22D3EE', bgColor: 'rgba(34, 211, 238, 0.1)',  borderColor: 'rgba(34, 211, 238, 0.3)'
Behavioral: color: '#FB7185', bgColor: 'rgba(251, 113, 133, 0.1)', borderColor: 'rgba(251, 113, 133, 0.3)'
Ethics:     color: '#A78BFA', bgColor: 'rgba(167, 139, 250, 0.1)', borderColor: 'rgba(167, 139, 250, 0.3)'
```
