# Stages 4–6 Frosted Blur Wrapper Implementation & Reversion Guide

## 1. Overview & Purpose
In the current release (v1.0), **Stages 1 through 3** provide the complete, valuable end-to-end prompt engineering and teardown workflow:
* **Stage 1 (`/`)**: Product Specification & ingestion (forms, presets, parameters).
* **Stage 2 (`/prompts`)**: 6-pillar prompt synthesis engine (preview, in-browser editor, clipboard copy, batch exports).
* **Stage 3 (`/guide`)**: Operational playbook for executing prompts in frontier LLMs (ChatGPT, Claude, Gemini, DeepSeek, NotebookLM).

**Stages 4, 5, and 6** are forward-looking architectural modules (v2.0 roadmap):
* **Stage 4 (`/upload`)**: Automated Markdown AST Ingestion.
* **Stage 5 (`/insights`)**: Structured Teardown Knowledge Base & Filter.
* **Stage 6 (`/deck`)**: Executive Slide Deck Builder (.pptx / .pdf export).

To give users transparency into the product roadmap without causing confusion over stub buttons, Stages 4, 5, and 6 are wrapped in a **Frosted Glass Blur Overlay**.

---

## 2. Architecture & File Inventory

### Files Added:
* [`src/components/layout/StageUnderDevelopmentWrapper.tsx`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/layout/StageUnderDevelopmentWrapper.tsx) — Reusable frosted glass overlay component with animated entry, status badge, explanation, and action CTAs.

### Files Modified:
1. [`src/pages/Stage4_UploadParse.tsx`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/pages/Stage4_UploadParse.tsx) — Wrapped inner page content.
2. [`src/pages/Stage5_InsightExplorer.tsx`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/pages/Stage5_InsightExplorer.tsx) — Wrapped inner page content.
3. [`src/pages/Stage6_DeckBuilder.tsx`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/pages/Stage6_DeckBuilder.tsx) — Wrapped inner page content.
4. [`src/components/layout/StageProgressBar.tsx`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/layout/StageProgressBar.tsx) — Added subtle `SOON` pill indicator for stages 4, 5, and 6 on desktop.

---

## 3. CTA & Interaction Mapping

> [!NOTE]
> **No underlying CTAs or code logic were deleted.** 
> All original buttons, inputs, handlers, and dropzones remain 100% intact in the code. The wrapper simply disables pointer events and applies a light visual blur to the background container (`filter blur-[2px] opacity-80 pointer-events-none select-none aria-hidden="true"`), ensuring all background elements, cards, and text remain clearly visible.

### CTAs Added in the Frosted Modal Overlay:
| Button Label | Action Performed | Destination / Effect |
|--------------|------------------|----------------------|
| **"← Back to Research Guide (Stage 3)"** (Primary CTA) | `navigate('/guide')` | Safely routes user back to Stage 3 playbook |
| **"Start New Teardown"** (Secondary CTA) | `dispatch({ type: 'RESET_STATE' }); navigate('/')` | Resets store and returns to Stage 1 |

### Underlying Page CTAs (Preserved Beneath the Blur):

#### Stage 4 (`Stage4_UploadParse.tsx`):
* `Back to Guide` button (`onClick={() => navigate('/guide')}`) — Preserved.
* `Proceed to Insight Explorer` button (`onClick={handleNext}`: completes stage 4, routes to `/insights`) — Preserved.
* Drag-and-drop file upload zone — Preserved.

#### Stage 5 (`Stage5_InsightExplorer.tsx`):
* `Back to Upload & Parse` button (`onClick={() => navigate('/upload')}`) — Preserved.
* `Proceed to Build Deck` button (`onClick={handleNext}`: completes stage 5, routes to `/deck`) — Preserved.
* Search input, Filter Type button, Selected count button, 6 Pillar tabs — Preserved.

#### Stage 6 (`Stage6_DeckBuilder.tsx`):
* `Back to Insights` button (`onClick={() => navigate('/insights')}`) — Preserved.
* `Start New Teardown` button (`onClick={handleReset}`) — Preserved.
* `Export .PPTX (Stage 6)` & `Export PDF (Stage 6)` disabled buttons — Preserved.

---

## 4. Reversion Instructions (How to Unlock Stages)

When you are ready to launch Stages 4, 5, and/or 6, follow the steps below to restore full interactivity. You can unlock stages **individually** or **all at once**.

### To Unlock Stage 4 (`src/pages/Stage4_UploadParse.tsx`):
1. Open [`src/pages/Stage4_UploadParse.tsx`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/pages/Stage4_UploadParse.tsx).
2. Remove the import:
   ```diff
   - import { StageUnderDevelopmentWrapper } from '../components/layout/StageUnderDevelopmentWrapper'
   ```
3. Remove the `<StageUnderDevelopmentWrapper ...>` opening tag:
   ```diff
      return (
        <PageTransition>
   -      <StageUnderDevelopmentWrapper
   -        stageNumber={4}
   -        stageTitle="Upload & Parse"
   -        featureTitle="Automated Document Ingestion Coming Soon"
   -        description="..."
   -      >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col items-center">
   ```
4. Remove the `</StageUnderDevelopmentWrapper>` closing tag near the bottom:
   ```diff
            </div>
   -      </StageUnderDevelopmentWrapper>
        </PageTransition>
      )
   ```

### To Unlock Stage 5 (`src/pages/Stage5_InsightExplorer.tsx`):
1. Open [`src/pages/Stage5_InsightExplorer.tsx`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/pages/Stage5_InsightExplorer.tsx).
2. Remove the import:
   ```diff
   - import { StageUnderDevelopmentWrapper } from '../components/layout/StageUnderDevelopmentWrapper'
   ```
3. Remove the `<StageUnderDevelopmentWrapper ...>` opening tag:
   ```diff
      return (
        <PageTransition>
   -      <StageUnderDevelopmentWrapper
   -        stageNumber={5}
   -        stageTitle="Insight Explorer"
   -        featureTitle="Structured Insight Explorer Coming Soon"
   -        description="..."
   -      >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
   ```
4. Remove the `</StageUnderDevelopmentWrapper>` closing tag near the bottom:
   ```diff
            </div>
   -      </StageUnderDevelopmentWrapper>
        </PageTransition>
      )
   ```

### To Unlock Stage 6 (`src/pages/Stage6_DeckBuilder.tsx`):
1. Open [`src/pages/Stage6_DeckBuilder.tsx`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/pages/Stage6_DeckBuilder.tsx).
2. Remove the import:
   ```diff
   - import { StageUnderDevelopmentWrapper } from '../components/layout/StageUnderDevelopmentWrapper'
   ```
3. Remove the `<StageUnderDevelopmentWrapper ...>` opening tag:
   ```diff
      return (
        <PageTransition>
   -      <StageUnderDevelopmentWrapper
   -        stageNumber={6}
   -        stageTitle="Build Your Deck"
   -        featureTitle="Executive Slide Deck Builder Coming Soon"
   -        description="..."
   -      >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
   ```
4. Remove the `</StageUnderDevelopmentWrapper>` closing tag near the bottom:
   ```diff
            </div>
   -      </StageUnderDevelopmentWrapper>
        </PageTransition>
      )
   ```

---

### To Remove the `SOON` Badges from Navigation Bar (`src/components/layout/StageProgressBar.tsx`):
Open [`src/components/layout/StageProgressBar.tsx`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/layout/StageProgressBar.tsx#L57-L68):

```diff
  <span
    className={cn(
      'whitespace-nowrap transition-all duration-200 flex items-center gap-1.5',
      isActive ? 'inline-flex' : 'hidden lg:inline-flex'
    )}
  >
    <span>{stage.title}</span>
-   {stage.number >= 4 && (
-     <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#EDF2F7] text-[#94A3B8] border border-[#CBD5E1]/60 leading-none">
-       Soon
-     </span>
-   )}
  </span>
```

*(If you unlock stages one by one, e.g. unlocking only Stage 4 first, change the condition from `stage.number >= 4` to `stage.number >= 5`)*.

---

## 5. Clean-Up Check After Full Launch
Once all three stages (4, 5, and 6) are active:
1. Delete or archive [`src/components/layout/StageUnderDevelopmentWrapper.tsx`](file:///c:/Users/panka/Documents/Pankaj_CodeSpace/AI_Projects/product-discovery-and-teardown/src/components/layout/StageUnderDevelopmentWrapper.tsx).
2. Run `npm run build` to verify clean compilation with zero unused imports or type errors.
