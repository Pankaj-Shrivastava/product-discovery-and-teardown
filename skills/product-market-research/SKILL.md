---
name: product-market-research
description: >
  Generates a deep-search prompt for Pillar 2 (Market, Competition & Go-To-Market).
  Covers competitive dynamics, GTM strategy, market entry, pricing, flywheel/network effects,
  growth loops, and switching costs. Grounded in Porter's Five Forces, Reforge Growth Loops,
  and competitive moat analysis.
---

# Product Market Research — Prompt Generation Skill

## Purpose

Generate a comprehensive, framework-backed deep-search prompt that uncovers the **market positioning, competitive landscape, and go-to-market strategy** of a given product/app.

## Research Lenses Covered

### 1. Competitive Dynamics
- Who are the direct competitors (same category, same user)?
- Who are the indirect competitors (different solution, same job-to-be-done)?
- What is this product's unique positioning / differentiation?
- What competitive moats exist?
  - **Network Effects**: Does the product become more valuable as more people use it?
  - **Switching Costs**: How painful is it to leave?
  - **Economies of Scale**: Cost advantages from scale?
  - **Brand**: Mindshare and trust advantages?
  - **Proprietary Technology/Data**: Unique tech or data assets?
- Market share estimates and trajectory

### 2. Go-to-Market Strategy
- Primary distribution channels (app stores, web, enterprise sales, partnerships)
- Is growth primarily organic, paid, or viral?
- Content marketing and SEO strategy
- Sales-led vs. product-led growth (PLG) vs. community-led growth
- Channel partnerships and distribution deals

### 3. Market Entry
- When did the product enter the market?
- What was the beachhead market (initial niche)?
- Expansion path: How did they move from niche to mainstream?
- Timing advantages or disadvantages
- First-mover vs. fast-follower dynamics

### 4. Pricing Strategy
- Pricing model: Free, freemium, subscription, usage-based, marketplace, ads
- Pricing tiers and feature differentiation across tiers
- Enterprise vs. consumer pricing
- Price anchoring and psychological pricing tactics
- Price comparison with competitors
- Free trial / money-back strategies

### 5. Flywheel & Network Effects
- Identify the core flywheel: What self-reinforcing loop drives growth?
- Types of network effects present:
  - Direct (same-side): More users → more value for all users
  - Indirect (cross-side): More supply → more demand → more supply
  - Data: More usage → better algorithms → better experience
- Flywheel friction points and acceleration levers

### 6. Growth Loops (Reforge Framework)
- **Viral/Social Loop**: User creates → shares → recipient discovers → signs up
- **Content-Led Loop**: User creates content → indexed → discovered → new user
- **Paid Loop**: Revenue → reinvest in ads → acquire users → generate revenue
- **Sales Loop**: Revenue → hire sales → close deals → generate revenue
- Which loop is primary? Which are secondary?
- Loop efficiency and compounding rate

### 7. Switching Costs & Lock-in
- **Data Lock-in**: User data, history, preferences stored in product
- **Financial Lock-in**: Sunk costs, annual plans, credits
- **Social Lock-in**: Team adoption, social graph, collaboration history
- **Customization Lock-in**: Workflows, integrations, trained behaviors
- **Ecosystem Lock-in**: Dependencies on complementary products
- How quickly do switching costs accumulate?

## Frameworks to Apply

### Porter's Five Forces
```
                ┌─────────────────┐
                │   Threat of     │
                │   New Entrants  │
                └────────┬────────┘
                         │
┌─────────────┐  ┌───────▼────────┐  ┌──────────────┐
│  Bargaining │  │   Competitive  │  │  Bargaining  │
│  Power of   │──│   Rivalry      │──│  Power of    │
│  Suppliers  │  │   Among Firms  │  │  Buyers      │
└─────────────┘  └───────┬────────┘  └──────────────┘
                         │
                ┌────────▼────────┐
                │   Threat of     │
                │   Substitutes   │
                └─────────────────┘
```

### Reforge Growth Loop Mapping
For each identified loop, map:
1. **Trigger**: What starts the loop?
2. **Action**: What does the user do?
3. **Output**: What does the action produce?
4. **Reinput**: How does the output feed back into the trigger?

### Competitive Positioning Matrix
Create a 2×2 matrix using the two most important competitive dimensions:
```
         High [Dimension A]
              │
    Niche     │    Leader
    Premium   │    
──────────────┼──────────────
    Laggard   │    Mass
              │    Market
              │
         Low [Dimension A]
    Low [Dim B]     High [Dim B]
```

## Prompt Template

```
You are a senior market strategist and competitive intelligence analyst. 
Perform a comprehensive market and competitive analysis of [PRODUCT_NAME] 
by [COMPANY_NAME].

Use ONLY publicly available information. Do NOT reference proprietary data, 
internal documents, or personally identifiable information.

[INSERT LENS-SPECIFIC QUESTIONS]

Apply the following frameworks:
1. Porter's Five Forces analysis
2. Reforge Growth Loop identification and mapping
3. Competitive positioning matrix (identify the two most differentiating axes)
4. Switching cost inventory across all dimensions

For each dimension, provide:
1. Factual findings with source indicators
2. Framework-applied analysis
3. Strategic implications
4. Confidence level (high/medium/low based on data availability)

Format with clear headers, tables for comparisons, and diagrams where helpful.
```

## Quality Checklist
- [ ] Prompt covers all 7 lenses in this pillar
- [ ] Porter's Five Forces explicitly requested
- [ ] Growth loops identified with Reforge framework
- [ ] Switching costs analyzed across all dimensions
- [ ] No proprietary/confidential information requested
- [ ] Competitive 2×2 matrix requested
