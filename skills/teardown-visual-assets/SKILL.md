---
name: teardown-visual-assets
description: >
  Guides the collection, organization, and preparation of public visual assets
  (screenshots, diagrams, public images) for use in the teardown presentation.
  Ensures all images are from public sources with no IP/PII violations.
---

# Teardown Visual Assets — Skill

## Purpose

Guide the systematic collection and organization of **public visual assets** (app screenshots, marketing images, diagrams) for inclusion in the teardown presentation. All assets must be legally safe — no intellectual property violations, no PII, no confidential material.

## Legal & Ethical Rules

### ✅ ALLOWED Sources
| Source | Example | Notes |
|--------|---------|-------|
| App Store Screenshots | Google Play / Apple App Store listings | Publicly published by the company |
| Marketing Website | Hero images, feature pages | Public marketing material |
| Public Blog Posts | Product screenshots in company blog | Published for public consumption |
| Press Kits | Official press/media assets | Explicitly provided for media use |
| Public Demo Videos | YouTube product demos | Publicly accessible |
| Social Media | Official account posts | Public posts only |
| Review Sites | G2, Capterra, TrustRadius screenshots | User-submitted public content |

### ❌ NOT ALLOWED Sources
| Source | Why |
|--------|-----|
| Internal dashboards | Confidential / proprietary |
| Private user data screens | PII risk |
| Competitor internal tools | IP violation |
| Paywalled content | Access-restricted |
| Employee LinkedIn photos | PII |
| Leaked documents | Confidential |
| Screenshots of private conversations | PII and privacy |

## Screenshot Checklist

### Core Product Screens (Must Have)
- [ ] **App Icon & Branding**: Logo as it appears in app stores
- [ ] **Onboarding Flow**: First 3-5 screens new users see
- [ ] **Home/Dashboard**: The primary landing screen
- [ ] **Core Feature**: The #1 feature that delivers main value
- [ ] **Navigation**: How users move between sections

### Growth & Engagement Screens (Nice to Have)
- [ ] **Notification Examples**: Push notification content/style
- [ ] **Empty States**: What users see before adding data
- [ ] **Achievement/Reward**: Streaks, badges, celebrations
- [ ] **Sharing/Referral**: Social sharing or invite mechanisms
- [ ] **Pricing/Paywall**: Subscription or upgrade screens

### Design System Screens (For Theme Extraction)
- [ ] **Color Usage**: Screens showing primary brand colors
- [ ] **Typography**: Screens showing heading/body text hierarchy
- [ ] **Component Patterns**: Cards, buttons, forms, modals
- [ ] **Dark/Light Mode**: Both modes if available

## Image Organization Schema

Organize collected images into this folder structure:

```
assets/
├── {product-name}/
│   ├── branding/
│   │   ├── app-icon.png
│   │   └── logo-marketing.png
│   ├── onboarding/
│   │   ├── 01-welcome.png
│   │   ├── 02-signup.png
│   │   └── 03-personalization.png
│   ├── core-features/
│   │   ├── home-dashboard.png
│   │   ├── primary-feature.png
│   │   └── secondary-feature.png
│   ├── growth-engagement/
│   │   ├── notifications.png
│   │   ├── rewards.png
│   │   └── sharing.png
│   ├── pricing/
│   │   └── pricing-page.png
│   └── design-system/
│       ├── color-usage.png
│       ├── typography.png
│       └── components.png
```

## Image Preparation for Slides

### Size Requirements
| Slide Element | Recommended Size | Aspect Ratio |
|--------------|-----------------|--------------|
| Full-slide background | 1920×1080 px | 16:9 |
| Half-slide image | 960×1080 px | ~1:1 |
| Phone screenshot | 375×812 px | ~9:19.5 (iPhone) |
| Feature callout | 600×400 px | 3:2 |
| Icon/logo | 200×200 px | 1:1 |

### Annotation Guidelines
When annotating screenshots for the teardown:
- Use **callout boxes** with thin borders in the accent color
- Use **numbered circles** (①②③) for sequential flows
- Use **arrows** to point at specific UI elements
- Keep annotations **outside** the screenshot when possible
- Use the product's own color palette for annotation colors

### Image Quality
- Minimum resolution: 72 DPI for screen, 150 DPI for print
- Format: PNG for screenshots (lossless), JPEG for photos
- No watermarks or overlaid text from third-party tools
- Consistent device frames (if using any): same device, same color

## Slide-to-Image Mapping

| Slide # | Slide Title | Images Needed |
|---------|------------|---------------|
| 1 | Title & Thesis | App icon, hero marketing image |
| 2 | Executive Summary | None (text-focused) or subtle background |
| 3 | Business Model & Market | Competitor logos (public), pricing screenshot |
| 4 | User Personas & Pain Points | Target user context images (stock/public) |
| 5 | Onboarding & Activation | Annotated onboarding flow screenshots (3-5) |
| 6 | Core Product & Features | Annotated feature screenshots (2-3) |
| 7 | Growth & Retention | Notification/reward/sharing screenshots |
| 8 | Behavioral & Trust | Privacy settings, dark pattern examples |
| 9 | Critique & Opportunities | Problem area screenshots with annotations |
| 10 | Strategic Recommendations | None (text-focused) or vision mockup |

## Quality Checklist
- [ ] All images from public sources only
- [ ] No PII visible in any screenshot (blur if necessary)
- [ ] No confidential/proprietary information visible
- [ ] Images organized in the standard folder structure
- [ ] Resolution meets minimum requirements
- [ ] Annotations use product's color palette
- [ ] Each slide's image needs are mapped
