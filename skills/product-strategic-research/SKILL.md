---
name: product-strategic-research
description: >
  Generates a deep-search prompt for Pillar 1 (Strategic & Business Context).
  Covers mission/vision, company verticals, revenue model, ecosystem, regulatory landscape,
  business-mission conflict, unit economics, privacy/data strategy, and product lifecycle stage.
  Grounded in Business Model Canvas, Porter's Value Chain, and Product Lifecycle frameworks.
---

# Product Strategic Research — Prompt Generation Skill

## Purpose

Generate a comprehensive, framework-backed deep-search prompt that uncovers the **strategic and business context** of a given product/app. The resulting prompt, when used in AI research tools, should produce insights grounded in publicly available data.

## Research Lenses Covered

### 1. Mission & Vision
- What is the company's stated mission and vision?
- What was the founding thesis / origin story?
- How has the mission evolved over time?
- Is there a gap between stated mission and observed behavior?

### 2. Company Verticals
- What distinct lines of business does the company operate?
- Which vertical does this specific app serve?
- How do verticals cross-subsidize each other?
- What is the strategic importance of this app relative to other verticals?

### 3. Revenue Model
- Primary revenue streams (subscriptions, ads, transactions, licensing, etc.)
- Revenue mix and dependency ratios
- Monetization maturity (early, optimized, diversified)
- Revenue per user segment

### 4. Ecosystem
- Key platform dependencies (iOS, Android, web, APIs)
- Partner integrations and strategic alliances
- Developer ecosystem and third-party extensions
- Data ecosystem and interoperability

### 5. Regulatory Landscape
- Industry-specific regulations (HIPAA, PCI-DSS, FERPA, etc.)
- Data privacy compliance (GDPR, CCPA, DPDP Act)
- Content regulation and age restrictions
- Antitrust and competition law implications

### 6. Business ↔ Mission Conflict
- Where does monetization pressure conflict with user value?
- Examples of compromises made (ads vs. experience, data selling vs. privacy)
- How does the company publicly address these tensions?
- Shareholder vs. stakeholder trade-offs

### 7. Unit Economics & LTV/CAC
- Customer Acquisition Cost (CAC) by channel
- Lifetime Value (LTV) estimates
- LTV/CAC ratio and payback period
- Expansion revenue and Net Revenue Retention (NRR)
- Marginal cost structure

### 8. Privacy & Data Strategy
- Data collection scope and minimization practices
- Consent architecture and user control
- Privacy as competitive advantage (Apple ATT model)
- Data monetization vs. data protection stance

### 9. Product Lifecycle Stage
- Where on the S-curve: Introduction → Growth → Maturity → Decline?
- Stage-appropriate strategies currently deployed
- Signs of lifecycle transition (feature plateau, market saturation)
- Reinvention or pivot indicators

## Frameworks to Apply

### Business Model Canvas (Osterwalder)
```
┌─────────────────────────────────────────────────────────────┐
│ Key Partners │ Key Activities │ Value Proposition │ Customer │
│              │ Key Resources  │                   │ Segments │
│              │                │                   │          │
├──────────────┴────────────────┼───────────────────┤          │
│ Cost Structure                │ Revenue Streams   │ Channels │
│                               │                   │ Customer │
│                               │                   │ Relations│
└───────────────────────────────┴───────────────────┴──────────┘
```

### Porter's Value Chain
Analyze primary activities (inbound logistics, operations, outbound, marketing, service) and support activities (infrastructure, HR, tech development, procurement) to understand where value is created.

### Product Lifecycle Framework
Map the product's current stage and evaluate whether strategies match the stage:
- **Introduction**: Market education, feature development
- **Growth**: Scale, network effects, competitive positioning
- **Maturity**: Optimization, cost reduction, market defense
- **Decline**: Harvest, pivot, or sunset decisions

## Prompt Template

When generating the prompt, use this structure:

```
You are a senior product strategist and business analyst. I need you to perform 
a comprehensive strategic deep dive on [PRODUCT_NAME] by [COMPANY_NAME].

Research and analyze the following dimensions using ONLY publicly available 
information. Do NOT use any proprietary, confidential, or personally identifiable 
information.

[INSERT LENS-SPECIFIC QUESTIONS FROM ABOVE]

For each dimension, provide:
1. Factual findings with source references
2. Analysis using relevant frameworks (Business Model Canvas, Porter's Value Chain)
3. Strategic implications and insights
4. Gaps or areas where public data is insufficient

Format your response with clear headers, bullet points, and tables where applicable.
Prioritize depth over breadth — go deep on what's knowable publicly.
```

## Quality Checklist
- [ ] Prompt covers all 9 lenses in this pillar
- [ ] No request for proprietary/confidential information
- [ ] Frameworks are explicitly referenced for the AI to apply
- [ ] Output format is specified for structured research
- [ ] Product name is dynamically inserted
