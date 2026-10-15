---
name: product-ethics-research
description: >
  Generates a deep-search prompt for Pillar 6 (Trust, Safety & Ethics).
  Covers trust and safety by design, dark patterns and ethical design audit,
  algorithmic fairness, and data governance. Grounded in Privacy by Design,
  Dark Pattern Taxonomy, and ethical design frameworks.
---

# Product Ethics Research — Prompt Generation Skill

## Purpose

Generate a comprehensive, framework-backed deep-search prompt that uncovers the **trust mechanisms, safety architecture, ethical design choices, and data governance** of a given product/app.

## Research Lenses Covered

### 1. Trust & Safety by Design
- **Content Moderation**: How does the product handle user-generated content?
  - Automated moderation (AI-based filtering)
  - Human moderation (staff, community moderators)
  - Hybrid approaches
  - Transparency reports (if published)
- **Abuse Prevention**: What mechanisms prevent malicious usage?
  - Rate limiting and spam prevention
  - Identity verification requirements
  - Reporting and flagging systems
  - Block and mute capabilities
- **Safety Features**: Proactive safety measures
  - Age verification and parental controls
  - Sensitive content warnings
  - Crisis intervention features (mental health, emergency)
  - Self-harm and dangerous content detection
- **Trust Signals**: How does the product build user trust?
  - Verified badges and identity markers
  - Transparency about data usage
  - Security certifications and compliance badges
  - User reviews and social proof of safety

### 2. Dark Patterns & Ethical Design Audit

#### Dark Pattern Taxonomy (Harry Brignull)
| Dark Pattern | Description | What to Look For |
|-------------|-------------|-----------------|
| **Forced Continuity** | Silently charging after free trial | Auto-renewal without clear warning |
| **Roach Motel** | Easy to get in, hard to get out | Complex account deletion, hidden unsubscribe |
| **Trick Questions** | Confusing wording to mislead | Double negatives in opt-outs |
| **Sneak into Basket** | Adding items without consent | Pre-checked add-ons in checkout |
| **Hidden Costs** | Revealing costs late in funnel | Fees shown only at checkout |
| **Bait and Switch** | Different outcome than expected | Misleading button labels |
| **Confirmshaming** | Guilt-tripping to opt-in | "No thanks, I don't want to save money" |
| **Disguised Ads** | Ads that look like content/navigation | Native ads without clear labeling |
| **Friend Spam** | Sending messages on user's behalf | Contact list harvesting during onboarding |
| **Privacy Zuckering** | Confusing privacy settings | Complex privacy dashboards, default sharing |

#### Digital Well-Being Assessment
- Does the product include time management features?
- Screen time reminders or usage dashboards?
- "Take a break" prompts?
- Notification management and quiet hours?
- Infinite scroll vs. natural stopping points?
- Autoplay behavior (opt-in vs. opt-out)?
- Comparison to competitors' well-being features

### 3. Algorithmic Fairness
- **Recommendation Engine Bias**: Do recommendations reinforce filter bubbles?
- **Demographic Bias**: Any known issues with bias against specific groups?
- **Content Amplification**: Does the algorithm favor sensational/divisive content?
- **Transparency**: Is algorithmic decision-making explained to users?
- **Appeal Mechanisms**: Can users challenge algorithmic decisions?
- **Audit History**: Any public audits or third-party assessments?

### 4. Data Governance
- **Collection Scope**: What data is collected? (stated vs. observed)
  - App permissions requested (camera, contacts, location, microphone)
  - Tracking across apps and websites
  - Behavioral data and usage analytics
- **Retention Policy**: How long is data kept?
  - Published data retention schedules
  - Right to deletion and data portability
  - Account deletion completeness
- **Transparency**: How clearly is data usage communicated?
  - Privacy policy readability (grade level assessment)
  - Cookie consent implementation quality
  - Data usage dashboard for users
- **Third-Party Sharing**: Who gets access to user data?
  - Ad network partnerships
  - Data broker relationships (if publicly known)
  - Law enforcement data sharing policies
- **Security Posture**: How is data protected?
  - Encryption standards (at rest, in transit)
  - Known security incidents and responses
  - Bug bounty programs
  - SOC 2, ISO 27001, or similar certifications

## Frameworks to Apply

### Privacy by Design (Ann Cavoukian's 7 Principles)
1. **Proactive not Reactive** — Prevent problems, don't fix them after
2. **Privacy as the Default** — No action needed for privacy protection
3. **Privacy Embedded into Design** — Built-in, not bolted-on
4. **Full Functionality** — No false trade-offs (privacy vs. functionality)
5. **End-to-End Security** — Full lifecycle protection
6. **Visibility and Transparency** — Open and accountable
7. **Respect for User Privacy** — User-centric, consent-driven

### Ethical Design Evaluation Matrix
| Dimension | Score (1-5) | Evidence |
|-----------|-------------|----------|
| User Autonomy | | Can users easily control their experience? |
| Transparency | | Are decisions and data use clearly explained? |
| Fairness | | Does the product treat all users equitably? |
| Beneficence | | Does the product genuinely help users? |
| Non-maleficence | | Does the product avoid causing harm? |
| Privacy | | Is user data respected and protected? |
| Accountability | | Is there recourse when things go wrong? |

### Trust Architecture Model
```
                    ┌───────────────────┐
                    │   TRUST           │
                    │   (User Belief)   │
                    └─────────┬─────────┘
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │ Safety   │   │ Privacy  │   │ Fairness │
        │ Signals  │   │ Controls │   │ & Equity │
        └──────────┘   └──────────┘   └──────────┘
              │               │               │
              ▼               ▼               ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │Moderation│   │ Consent  │   │Algorithm │
        │Reporting │   │ Data Min │   │ Audits   │
        │Blocking  │   │ Portabil │   │ Appeals  │
        └──────────┘   └──────────┘   └──────────┘
```

## Prompt Template

```
You are a digital ethics researcher and trust & safety expert. Perform a 
comprehensive ethical design audit of [PRODUCT_NAME] by [COMPANY_NAME].

Use ONLY publicly available information — the product's observable behavior,
privacy policies, transparency reports, app store privacy labels, published
audits, and press coverage. Do NOT reference internal policies, confidential
incidents, or PII.

[INSERT LENS-SPECIFIC QUESTIONS]

Apply the following frameworks:
1. Harry Brignull's Dark Pattern Taxonomy (audit for each pattern)
2. Ann Cavoukian's Privacy by Design 7 Principles
3. Ethical Design Evaluation Matrix (score 1-5 per dimension)
4. Trust Architecture assessment

For each dimension:
1. Observable evidence from public sources
2. Framework-applied evaluation with scoring
3. Comparison with industry best practices
4. Specific improvement recommendations

Be balanced — highlight both ethical strengths AND concerns.
Format with evaluation matrices, checklists, and clear evidence tables.
```

## Quality Checklist
- [ ] Prompt covers all 4 lenses in this pillar
- [ ] Dark pattern taxonomy systematically audited
- [ ] Privacy by Design principles evaluated
- [ ] Algorithmic fairness assessed
- [ ] Digital well-being features catalogued
- [ ] Balanced assessment (strengths AND concerns)
- [ ] No internal/confidential information requested
