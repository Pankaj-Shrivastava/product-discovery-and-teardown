---
name: product-user-research
description: >
  Generates a deep-search prompt for Pillar 3 (Users, Outcomes & Product Craft).
  Covers user segments, actors/roles, pain points, JTBD, business-product outcome mapping,
  feature prioritization, metrics, aha moment, user life fit, activation/TTV, retention curves,
  user journey mapping, and trade-off analysis. Grounded in JTBD, HEART, AARRR, and Outcome Mapping.
---

# Product User Research — Prompt Generation Skill

## Purpose

Generate a comprehensive, framework-backed deep-search prompt that uncovers the **user landscape, product craft decisions, and measurement strategy** of a given product/app.

## Research Lenses Covered

### 1. User Segments
- Primary, secondary, and tertiary user segments
- Demographic profiles (age, geography, income, profession)
- Psychographic profiles (motivations, values, digital maturity)
- Segment size and revenue contribution estimates
- Underserved or emerging segments

### 2. Actors & Roles
- Different user types (consumer, admin, creator, viewer, moderator)
- Permission hierarchies and access controls
- Multi-sided platform actors (buyer/seller, driver/rider, host/guest)
- Internal actors (support, ops, sales) and their product interfaces

### 3. Pain Points & Jobs-to-be-Done
- **Functional JTBD**: "When [situation], I want to [motivation], so I can [outcome]"
- **Emotional JTBD**: How users want to feel
- **Social JTBD**: How users want to be perceived
- Pain points before this product existed
- Remaining unmet needs and frustrations

### 4. Business → Product Outcome Mapping
- Company-level business objectives (revenue, market share, retention)
- How each business KPI translates to a product metric
- Input metrics that drive output metrics
- Leading vs. lagging indicators
```
Business Outcome          Product Outcome          Input Metric
─────────────────         ──────────────────       ─────────────
Revenue Growth     →      Conversion Rate     →    Paywall views
User Retention     →      D30 Retention       →    Core action freq
Market Expansion   →      New geo activation  →    Localized content
```

### 5. Prioritized Feature Set
- Core features (table stakes, must-have)
- Differentiating features (competitive edge)
- Delight features (unexpected value)
- Feature usage distribution (power law curve)
- Features removed or deprecated (and why)

### 6. Key Metrics & Guardrails
- **North Star Metric**: The single metric that best captures user value
- **Input Metrics**: Metrics that drive the North Star
- **Guardrail Metrics**: Metrics that must NOT degrade (quality, safety, performance)
- **Counter Metrics**: What could go wrong if you over-optimize the North Star
- Metrics hierarchy mapping

### 7. Aha Moment
- What is the exact moment users realize product value?
- How many steps/actions to reach it?
- Benchmark examples (Slack: 2000 messages, Facebook: 7 friends in 10 days)
- How the product accelerates users toward this moment

### 8. User Life Fit
- When in the day/week does the user engage?
- What triggers product usage (time-based, event-based, emotion-based)?
- How does the product fit alongside other tools in the user's stack?
- Frequency expectations (daily utility vs. weekly vs. occasional)

### 9. Activation & Time-to-Value (TTV)
- Number of steps from sign-up to first value delivery
- Friction points in the activation funnel
- Drop-off rates per step (if publicly known)
- Onboarding design patterns (progressive disclosure, interactive tours, empty states)
- Comparison with competitor onboarding

### 10. Retention Curves & Cohort Analysis
- Expected D1/D7/D30/D90 retention patterns
- Does the retention curve flatten (PMF indicator)?
- Early churn causes (onboarding failure, expectation mismatch)
- Late churn causes (value degradation, competitor switching)
- Retention levers (notifications, streaks, social hooks, data accumulation)

### 11. User Journey Mapping (Multi-layer)
- Map each stage: Discovery → Sign-up → Setup → First Mile → Core Loop → Power Use
- For each stage, track:
  - **Actions**: What the user physically does
  - **Touchpoints**: UI elements, notifications, emails
  - **Cognitive State**: +Psych (delight) / -Psych (friction)
  - **Emotional Arc**: Excitement, confusion, satisfaction, frustration
  - **Decision Points**: Where users make choices that affect their path

### 12. Trade-off Analysis & Product Debt
- What was clearly sacrificed for speed/simplicity?
- Visible tech debt in the UX (inconsistencies, broken flows)
- Feature gaps that reveal prioritization philosophy
- "Why is this missing?" analysis — regulatory, technical, strategic, or oversight?

## Frameworks to Apply

### JTBD Framework (Clayton Christensen)
```
When I am [situation/context]
I want to [motivation/goal]  
So I can [expected outcome/benefit]
```

### Google HEART Framework
| Dimension | Definition | Example Metric |
|-----------|-----------|---------------|
| Happiness | User satisfaction | NPS, CSAT |
| Engagement | Usage depth/frequency | DAU/MAU, session time |
| Adoption | New user/feature uptake | Sign-ups, feature activation |
| Retention | Users coming back | D7/D30 retention |
| Task Success | Efficiency/effectiveness | Task completion rate, error rate |

### AARRR (Pirate Metrics)
```
Acquisition → Activation → Retention → Revenue → Referral
```

### Outcome Mapping
For every business objective, trace the chain:
```
Business Goal → Product Strategy → Product Metric → Feature/Experiment
```

## Prompt Template

```
You are a senior product manager and user researcher. Perform a comprehensive 
user and product craft analysis of [PRODUCT_NAME] by [COMPANY_NAME].

Use ONLY publicly available information — app store reviews, public case studies, 
blog posts, press releases, and observable product behavior. Do NOT use proprietary 
data, internal documents, or PII.

[INSERT LENS-SPECIFIC QUESTIONS]

Apply the following frameworks:
1. Jobs-to-be-Done (functional, emotional, social)
2. Google HEART metrics framework
3. AARRR funnel analysis
4. Business-to-Product outcome mapping

For each dimension:
1. Provide factual findings based on public data
2. Apply the relevant framework
3. Identify gaps between ideal and actual
4. Rate data confidence (high/medium/low)

Use tables for metrics, flow diagrams for journeys, and structured lists 
for feature analysis.
```

## Quality Checklist
- [ ] Prompt covers all 12 lenses in this pillar
- [ ] JTBD statements requested in proper format
- [ ] HEART and AARRR frameworks explicitly applied
- [ ] Retention curves and activation flow analyzed
- [ ] Multi-layer user journey mapping requested
- [ ] No proprietary/PII data requested
