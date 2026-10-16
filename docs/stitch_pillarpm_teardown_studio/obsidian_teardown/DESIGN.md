---
name: Obsidian Teardown
colors:
  surface: '#0f131e'
  surface-dim: '#0f131e'
  surface-bright: '#353945'
  surface-container-lowest: '#0a0e19'
  surface-container-low: '#171b27'
  surface-container: '#1b1f2b'
  surface-container-high: '#262a36'
  surface-container-highest: '#313441'
  on-surface: '#dfe2f2'
  on-surface-variant: '#c9c4d8'
  inverse-surface: '#dfe2f2'
  inverse-on-surface: '#2c303c'
  outline: '#938ea1'
  outline-variant: '#484555'
  surface-tint: '#cabeff'
  primary: '#cabeff'
  on-primary: '#32009a'
  primary-container: '#947dff'
  on-primary-container: '#2b0088'
  inverse-primary: '#613de0'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#45dfa4'
  on-tertiary: '#003825'
  tertiary-container: '#00a574'
  on-tertiary-container: '#003120'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e6deff'
  primary-fixed-dim: '#cabeff'
  on-primary-fixed: '#1c0062'
  on-primary-fixed-variant: '#4918c8'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#68fcbf'
  tertiary-fixed-dim: '#45dfa4'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#0f131e'
  on-background: '#dfe2f2'
  surface-variant: '#313441'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.04em
  label-xs:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

This design system is engineered for analytical product managers, strategists, and teardown specialists who operate under high information density and demand ruthless precision. The experience fuses the operational velocity of Linear, the analytical density of a Bloomberg Terminal, and the structured clarity of Notion dark mode.

The aesthetic marries **Tactile Tech-Minimalism** with subtle **Frosted Glassmorphism**. High visual discipline, micro-subtle borders, and atmospheric depth define the interface. Interactions feel immediate, razor-sharp, and deliberate. The emotional response is one of total cognitive control, intelligence amplification, and surgical product clarity.

## Colors

The palette relies on deep, non-fatiguing dark layers punctuated by an electric violet primary accent and six domain-specific pillar colors.

### Core Canvas & Surfaces
- **Canvas Base:** `#0B0F1A` (Deep navy-obsidian black)
- **Card Surface:** `#131827` (Muted midnight slate)
- **Elevated / Popover Surface:** `#1C2237` (Subtle lifted navy)
- **Interactive Hover Surface:** `#232B45`
- **Border Subtle:** `#2A3150` (Low-contrast separator)
- **Border Highlight / Focus:** `#7C5CFC`

### Text & Icons
- **Text High-Contrast:** `#F8FAFC` (96% opacity white)
- **Text Muted:** `#94A3B8` (Slate secondary)
- **Text Dimmed:** `#64748B` (Tertiary/meta info)

### Primary Accent
- **Base:** `#7C5CFC` (Electric violet)
- **Hover:** `#9B7FFF` (Luminous violet)
- **Muted Fill:** `rgba(124, 92, 252, 0.12)`

### 6-Pillar Domain Accents
Used strictly for semantic categorization, taxonomy tagging, analytics graphing, and teardown scoring matrices:
- **Strategic Pillar:** `#34D399` (Emerald) | `rgba(52, 211, 153, 0.12)`
- **Market Pillar:** `#FBBF24` (Amber) | `rgba(251, 191, 36, 0.12)`
- **Users Pillar:** `#38BDF8` (Sky Blue) | `rgba(56, 189, 248, 0.12)`
- **Technical Pillar:** `#22D3EE` (Cyan) | `rgba(34, 211, 238, 0.12)`
- **Behavioral Pillar:** `#FB7185` (Rose) | `rgba(251, 113, 133, 0.12)`
- **Ethics Pillar:** `#A78BFA` (Lavender) | `rgba(167, 139, 250, 0.12)`

## Typography

The type system balances clean prose reading with high-density data legibility:
- **Inter** commands titles, narrative analysis, teardown documentation, and general UI text. Negative tracking tightens geometric cohesion at larger scales.
- **JetBrains Mono** governs all analytical metadata: telemetry metrics, scoring algorithms, status tags, shortcut indicators, timestamps, and column headers in analytical matrices.

Numerical values inside data grids and comparisons must always enable tabular figures (`font-variant-numeric: tabular-nums`) to preserve spatial vertical alignment.

## Layout & Spacing

The system implements a structured **Fluid Grid** calibrated for information density:
- **Desktop (>= 1280px):** 12-column adaptive layout, 24px (`gutter-lg`) gutters, 32px (`margin-lg`) margin. Optimized for side-by-side product teardown comparisons, tree views, and canvas-based node maps.
- **Tablet (768px - 1279px):** 8-column layout, 16px (`gutter`) gutters, 24px (`margin-md`) margin. Side panels collapse into modal overlays or bottom drawers.
- **Mobile (< 768px):** 4-column layout, 16px (`gutter`) gutters, 16px (`margin`) margin. Analytical panes stack sequentially into vertical cards.

Component spacing uses a compact 4px base step, prioritizing data density over excessive negative space while preserving optical isolation via sharp 1px borders.

## Elevation & Depth

Visual hierarchy operates through **Tonal Layering**, **Frosted Glass Surfaces**, and tinted **Ambient Violet/Slate Drops**:

- **Tier 0 (Canvas Base `#0B0F1A`):** The ground plane.
- **Tier 1 (Resting Cards `#131827`):** Solid surface bounded by a razor 1px border (`#2A3150`). Shadow: `0 2px 4px rgba(0, 0, 0, 0.4)`.
- **Tier 2 (Interactive Floating / Hover Cards):** Surface elevated to `#1C2237`. Shadow: `0 8px 24px -4px rgba(11, 15, 26, 0.8), 0 0 16px -2px rgba(124, 92, 252, 0.15)`. Border transitions to `rgba(124, 92, 252, 0.4)`.
- **Tier 3 (Modals, Command Bar, Flyouts):** Semi-transparent `#131827/90` accompanied by `backdrop-filter: blur(12px)`. Subtle perimeter glow: `0 16px 40px rgba(0, 0, 0, 0.7), 0 0 24px rgba(124, 92, 252, 0.2)`. Border: `1px solid rgba(124, 92, 252, 0.3)`.

## Shapes

The geometric hierarchy applies exact corner radii depending on element role and surface scale:
- **Cards & Data Panels:** `12px` (Softened precision containers).
- **Controls, Input Fields & Dropdowns:** `8px` (Ergonomic target affordance).
- **Badges, Metric Tags & Code Chips:** `6px` (Tight, compact indicators).
- **Command Palette & Global Modals:** `12px` or `16px`.

## Components

### Buttons
- **Primary:** Filled `#7C5CFC` with text `#F8FAFC`. Radius: `8px`. Hover: `#9B7FFF`. Focus ring: `2px solid #7C5CFC` with 2px offset.
- **Secondary / Ghost:** Transparent background with `1px solid #2A3150`. Hover: background `#1C2237`, border `#7C5CFC`.
- **Pillar Action:** Bordered with pillar-specific hue, low-opacity tinted fill on hover.

### Chips & Badges
- Corner radius: `6px`. Font: `JetBrains Mono` (`label-xs` or `label-sm`).
- Composed of 10% fill opacity of pillar color, a matching 1px border at 30% opacity, and bright colored label text. Include a 6px status indicator circle when representing active states.

### Cards & Analytical Modules
- Background: `#131827`. Border: `1px solid #2A3150`. Radius: `12px`.
- Card headers maintain strict 12px vertical padding with muted monospace metadata labels on the right and strong Inter section headers on the left.

### Form Inputs & Selects
- Height: 36px. Background: `#0B0F1A`. Border: `1px solid #2A3150`. Radius: `8px`.
- Text: `#F8FAFC`, placeholder: `#64748B`.
- Focus: Border snaps to `#7C5CFC` with an outer soft violet shadow `0 0 0 3px rgba(124, 92, 252, 0.2)`.

### Checkboxes & Segmented Toggles
- Checkboxes: 16x16px, radius 4px, `#0B0F1A` surface, `#2A3150` border. Active state: `#7C5CFC` fill with crisp white vector check.
- Segmented Control: Container background `#0B0F1A` with 8px radius; selected tab elevated to `#1C2237` with `1px solid #2A3150`.

### Teardown-Specific Components
- **Pillar Scorecard Indicator:** Circular or linear micro-progress gauge tinted to the pillar color (`#34D399` to `#A78BFA`), accompanied by a JetBrains Mono numeric readout (`8.4/10`).
- **Command Menu (Cmd+K):** Centered floating glass sheet (`#131827/90` with `backdrop-filter: blur(12px)`), 12px radius, instant keyboard-indexed results.