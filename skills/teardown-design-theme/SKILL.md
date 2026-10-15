---
name: teardown-design-theme
description: >
  Analyzes the researched app's visual design language and extracts brand tokens
  (colors, fonts, layout patterns) to create a matching theme for the teardown 
  presentation. Ensures the teardown deck feels visually connected to the product
  being analyzed.
---

# Teardown Design Theme — Skill

## Purpose

Analyze the target product's public-facing design language and extract visual tokens to create a cohesive theme for the teardown presentation deck. The teardown should feel visually connected to the product being analyzed while maintaining professional readability.

## What to Extract

### 1. Color Palette
- **Primary Brand Color**: The dominant color in the app/website
- **Secondary Colors**: Supporting palette colors
- **Background Colors**: Light and dark mode backgrounds
- **Accent Colors**: CTA buttons, highlights, links
- **Semantic Colors**: Success (green), error (red), warning (yellow), info (blue)

#### Extraction Sources (Public Only)
- App icon colors
- Website header/hero section
- Marketing pages
- App store screenshots
- Public brand guidelines (if published)
- Social media branding

### 2. Typography
- **Primary Font**: Headlines and prominent text
- **Secondary Font**: Body text and descriptions
- **Monospace Font**: Code or data displays (if applicable)
- **Font Weights Used**: Light, regular, medium, bold, black
- **Font Sizing Scale**: Heading sizes, body size, caption size

#### Fallback Strategy
If exact fonts cannot be determined, match to the closest Google Fonts equivalent:
- Sans-serif geometric → Inter, Outfit, or Poppins
- Sans-serif humanist → Open Sans, Roboto, or Nunito
- Serif → Playfair Display, Merriweather, or Lora
- Monospace → JetBrains Mono, Fira Code, or Source Code Pro

### 3. Layout Patterns
- **Grid System**: Column count, gutters, margins
- **Card Styles**: Border radius, shadow depth, padding
- **Spacing Scale**: Consistent spacing units
- **Content Width**: Max container width
- **Visual Density**: Spacious vs. compact

### 4. Visual Style
- **Shape Language**: Rounded vs. sharp corners, organic vs. geometric
- **Shadow Style**: Flat, subtle elevation, dramatic depth
- **Icon Style**: Outline, filled, duotone, custom illustrations
- **Photography Style**: Real photos, illustrations, 3D renders, abstract
- **Motion Style**: Subtle, playful, dramatic, minimal

## Theme Application to Teardown Deck

### Slide Design Rules
| Element | Rule |
|---------|------|
| **Background** | Use product's dark/light mode background or a professional neutral |
| **Headings** | Product's primary brand color or closest professional equivalent |
| **Body Text** | Minimum 14pt, high-contrast color on background |
| **Accent** | Product's CTA/accent color for highlights and callouts |
| **Charts/Diagrams** | Use product's color palette for data visualization |
| **Borders/Dividers** | Match product's shape language (rounded vs. sharp) |

### Theme JSON Structure
When extracting a theme, output in this format for the app to consume:

```json
{
  "productName": "Example App",
  "colors": {
    "primary": "#6366F1",
    "secondary": "#8B5CF6",
    "accent": "#F59E0B",
    "background": "#0F172A",
    "surface": "#1E293B",
    "text": "#F8FAFC",
    "textMuted": "#94A3B8"
  },
  "typography": {
    "headingFont": "Inter",
    "bodyFont": "Inter",
    "headingSizes": { "h1": "32pt", "h2": "24pt", "h3": "18pt" },
    "bodySize": "14pt",
    "captionSize": "12pt"
  },
  "shapes": {
    "borderRadius": "12px",
    "cardShadow": "0 4px 6px rgba(0,0,0,0.1)",
    "borderStyle": "1px solid rgba(255,255,255,0.1)"
  },
  "style": {
    "mood": "professional-modern",
    "density": "spacious",
    "iconStyle": "outline"
  }
}
```

## Process

1. **Input**: Product name (already known from main workflow)
2. **Observe**: Visit public marketing site, app store listing, and app screenshots
3. **Extract**: Pull color hex codes, identify fonts, note layout patterns
4. **Map**: Translate extracted tokens into teardown-compatible theme
5. **Validate**: Ensure 14pt minimum text is readable on chosen backgrounds
6. **Output**: Theme configuration for the PPTX generator

## Readability Validation
Before applying any theme, verify:
- [ ] Text contrast ratio ≥ 4.5:1 for body text (WCAG AA)
- [ ] Text contrast ratio ≥ 3:1 for large text / headings
- [ ] Background doesn't compete with content
- [ ] Charts and diagrams are legible in the color scheme
- [ ] Theme works in both projected and printed formats

## Quality Checklist
- [ ] Colors extracted from public sources only
- [ ] Font choices are Google Fonts (freely available)
- [ ] 14pt minimum text size maintained
- [ ] Contrast ratios validated
- [ ] Theme JSON structure complete
- [ ] No proprietary brand assets used (only color/style inspiration)
