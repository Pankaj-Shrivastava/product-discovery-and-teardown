---
name: product-technical-research
description: >
  Generates a deep-search prompt for Pillar 4 (Technical Architecture & Design).
  Covers system architecture, system design, measurement infrastructure, failure modes,
  design system/UX, information architecture, platform/API strategy, experimentation culture,
  AI/ML integration, internationalization, and accessibility. Grounded in C4 Model, 
  API Maturity, WCAG, and design heuristics.
---

# Product Technical Research — Prompt Generation Skill

## Purpose

Generate a comprehensive, framework-backed deep-search prompt that uncovers the **technical architecture, design system, and engineering culture** of a given product/app.

## Research Lenses Covered

### 1. System Architecture
- Known tech stack (programming languages, frameworks, databases)
- Cloud infrastructure (AWS, GCP, Azure, on-prem)
- Microservices vs. monolith architecture
- CDN and edge computing strategy
- Mobile architecture (native, hybrid, cross-platform)
- Known engineering blog posts and tech talks

### 2. System Design
- Data flow patterns (event-driven, request-response, streaming)
- API design philosophy (REST, GraphQL, gRPC)
- Database choices and data modeling approach
- Caching strategy and layers
- Search infrastructure
- Real-time features implementation (WebSockets, SSE, polling)

### 3. Measurement Infrastructure
- Analytics and telemetry approach
- Event tracking architecture
- A/B testing infrastructure
- Data warehouse and BI tools
- Real-time monitoring and alerting
- Product analytics tools used (Amplitude, Mixpanel, in-house)

### 4. Failure Modes
- Known outages and incidents (public post-mortems)
- Single points of failure in the architecture
- Degradation patterns (graceful vs. catastrophic)
- Recovery time patterns
- Error handling in the user experience
- Data consistency and backup strategies

### 5. Design System & UX Patterns
- Public design system documentation (if available)
- Typography, color palette, iconography choices
- Component library and design tokens
- Animation and micro-interaction patterns
- Empty states, loading states, error states design
- Dark mode implementation
- Mobile-first vs. desktop-first approach

### 6. Information Architecture
- Navigation structure (tab bar, hamburger, sidebar, bottom nav)
- Content hierarchy and page depth
- Search and discovery patterns
- Categorization and taxonomy
- URL structure and deep linking

### 7. Platform Thinking & API Strategy
- Public API availability and documentation quality
- API versioning and deprecation policy
- Developer ecosystem (SDKs, plugins, extensions)
- Marketplace or app store for third-party integrations
- Webhook and integration capabilities
- API rate limiting and pricing

### 8. Experimentation & A/B Testing Culture
- Evidence of feature flags and gradual rollouts
- Public mentions of experimentation culture
- Speed of iteration (release frequency)
- Beta programs and early access programs
- Experimentation at scale signals (different experiences for different users)

### 9. AI/ML Integration Sophistication
- Where AI/ML is visibly embedded in the product
- Recommendation engine sophistication
- Personalization depth and quality
- Natural language processing features
- Computer vision features
- AI-generated content capabilities
- Genuine AI value vs. AI-washing assessment

### 10. Internationalization (i18n) & Localization
- Number of supported languages
- Quality of translations (machine vs. human)
- RTL (Right-to-Left) language support
- Currency and payment localization
- Cultural adaptation (not just translation)
- Regional feature differences
- Content and regulatory localization

### 11. Accessibility (A11y) Audit
- WCAG 2.1 compliance level (A, AA, AAA)
- Screen reader compatibility
- Keyboard navigation support
- Color contrast ratios
- Text scaling and dynamic type support
- Alt text for images
- Focus management and skip navigation
- Reduced motion support
- Curb-cut effect examples (a11y features that benefit everyone)

## Frameworks to Apply

### C4 Model (Context, Container, Component, Code)
```
Level 1: System Context  — How the system fits in the world
Level 2: Container       — High-level tech building blocks
Level 3: Component       — Internal structure of containers
Level 4: Code            — Implementation details (usually not public)
```

### API Maturity Model
| Level | Description |
|-------|------------|
| 0 | No public API |
| 1 | Basic REST API, limited docs |
| 2 | Well-documented API with SDKs |
| 3 | Platform with developer ecosystem |
| 4 | API-first company, API as product |

### Nielsen's 10 Usability Heuristics
1. Visibility of system status
2. Match between system and real world
3. User control and freedom
4. Consistency and standards
5. Error prevention
6. Recognition rather than recall
7. Flexibility and efficiency of use
8. Aesthetic and minimalist design
9. Help users recognize, diagnose, recover from errors
10. Help and documentation

### WCAG Evaluation Principles (POUR)
- **Perceivable**: Information presentable in ways users can perceive
- **Operable**: Interface components navigable and operable
- **Understandable**: Information and operation understandable
- **Robust**: Content interpretable by assistive technologies

## Prompt Template

```
You are a senior software architect and product design expert. Perform a 
comprehensive technical and design teardown of [PRODUCT_NAME] by [COMPANY_NAME].

Use ONLY publicly available information — engineering blogs, tech talks, 
job postings, public APIs, observable product behavior, and app store data.
Do NOT reference proprietary code, internal architecture documents, or PII.

[INSERT LENS-SPECIFIC QUESTIONS]

Apply the following frameworks:
1. C4 Model (to the extent public info allows, likely Level 1-2)
2. API Maturity Model assessment
3. Nielsen's 10 Usability Heuristics evaluation
4. WCAG POUR principles assessment

For each dimension:
1. Observable evidence from public sources
2. Framework-applied analysis
3. Inferred architecture decisions (clearly marked as inferences)
4. Strengths and gaps identified

Use diagrams for architecture, tables for heuristic evaluation, and 
annotated descriptions for design patterns.
```

## Quality Checklist
- [ ] Prompt covers all 11 lenses in this pillar
- [ ] C4 model applied to observable architecture
- [ ] Accessibility audit using WCAG POUR principles
- [ ] AI/ML assessment distinguishes genuine value from AI-washing
- [ ] Nielsen's heuristics applied to UX evaluation
- [ ] No request for proprietary code or internal documents
