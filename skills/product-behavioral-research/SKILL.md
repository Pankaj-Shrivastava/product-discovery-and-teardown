---
name: product-behavioral-research
description: >
  Generates a deep-search prompt for Pillar 5 (Behavioral Psychology & Engagement).
  Covers Hook Model, cognitive biases in product design, onboarding psychology (Fogg B=MAT),
  and engagement depth/frequency. Grounded in Nir Eyal's Hook Model, BJ Fogg's Behavior Model,
  and the Cognitive Bias Codex.
---

# Product Behavioral Research — Prompt Generation Skill

## Purpose

Generate a comprehensive, framework-backed deep-search prompt that uncovers the **behavioral psychology, habit formation mechanics, and engagement engineering** of a given product/app.

## Research Lenses Covered

### 1. Hook Model & Habit Architecture (Nir Eyal)

#### Trigger Analysis
- **External Triggers**: Push notifications, emails, SMS, social media, deep links
  - Frequency and timing patterns
  - Personalization level
  - Call-to-action clarity
- **Internal Triggers**: Emotional states that prompt product usage
  - Boredom → entertainment apps (TikTok, YouTube)
  - Loneliness → social apps (Instagram, WhatsApp)
  - Uncertainty → information apps (Google, Perplexity)
  - Anxiety → productivity apps (Todoist, Calendar)
  - FOMO → social/news apps (Twitter, LinkedIn)
- Which internal trigger has the product successfully mapped to?

#### Action Analysis
- What is the simplest behavior done in anticipation of reward?
- How frictionless is the core action? (taps, cognitive load)
- Does the UI naturally guide toward the primary action?
- Fogg's simplicity factors: Time, Money, Physical Effort, Brain Cycles, Social Deviance, Non-routine

#### Variable Reward Analysis
- **Rewards of the Tribe**: Social validation (likes, comments, followers)
- **Rewards of the Hunt**: Information, resources, deals (search results, news feed)
- **Rewards of the Self**: Mastery, completion, competence (streaks, badges, levels)
- How much variability exists in the reward? (Predictable rewards lose engagement)

#### Investment Analysis
- What value does the user store in the product?
- Data investment: profiles, history, preferences, content
- Social investment: connections, followers, reputation
- Effort investment: customization, workflows, integrations
- How does each investment make the next cycle better?

### 2. Cognitive Biases in Product Design

| Bias | How It's Used | Where to Look |
|------|--------------|---------------|
| **Endowment Effect** | Users value what they've customized | Profile setup, workspace creation |
| **Default Effect** | Pre-selected options guide behavior | Settings, onboarding choices |
| **Loss Aversion** | Fear of losing progress/status | Streaks, trial expirations, "don't lose your data" |
| **Anchoring** | First number seen influences perception | Pricing pages, plan comparisons |
| **Social Proof** | Others' actions validate behavior | Reviews, user counts, "X people doing this" |
| **Scarcity** | Limited availability increases desire | "Only 3 left", "Limited time offer" |
| **Sunk Cost Fallacy** | Past investment justifies continued use | "You've been a member for X months" |
| **Reciprocity** | Free value creates obligation | Free trials, free features, gifts |
| **Bandwagon Effect** | Popularity drives adoption | Trending, popular, top charts |
| **IKEA Effect** | Users value what they build | Templates, customization, creation tools |
| **Peak-End Rule** | Experience judged by peak and end moments | Celebration screens, successful checkout |
| **Zeigarnik Effect** | Incomplete tasks occupy the mind | Progress bars, incomplete profiles |

### 3. Onboarding Psychology (Fogg Behavior Model)

#### B = MAT (Behavior = Motivation × Ability × Trigger)
- **Motivation**: How does the product build motivation before asking for effort?
  - Does it show value before requiring sign-up?
  - Does it use social proof or authority during onboarding?
  - Does it create anticipation?
- **Ability**: How simple is the first interaction?
  - Number of form fields
  - Social sign-in availability
  - Progressive disclosure usage
  - Pre-filled defaults
- **Trigger**: What prompts the user to take action?
  - Clear CTAs
  - Contextual prompts
  - Urgency or scarcity cues

#### Onboarding Patterns Evaluation
- **Progressive Profiling**: Asking for info gradually vs. all at once
- **Interactive Walkthroughs**: Guided tours vs. tooltip hints vs. video
- **Empty State Design**: How the product looks before user adds data
- **Quick Wins**: Does the user accomplish something meaningful within first session?
- **Personalization Gates**: Questions that tailor the experience ("What brings you here?")

### 4. Engagement Depth & Frequency

#### Stickiness Metrics
- **DAU/MAU Ratio**: Daily active / Monthly active users (benchmark by category)
  - Social media: 50-65%
  - Messaging: 60-70%
  - Productivity: 30-50%
  - E-commerce: 10-25%
- **Session Length**: Average time per session
- **Session Frequency**: Sessions per day/week
- **Feature Adoption Depth**: % of users using N+ features

#### Habit Loop Strength Assessment
- How quickly does the product establish a routine?
- Is usage tied to a specific time/place/emotion?
- What happens when the user misses a day? (Streak mechanics, re-engagement)
- Compulsion vs. genuine value assessment

#### Engagement vs. Addiction Evaluation
- Does the product respect user time?
- Are there digital well-being features (time limits, usage reports)?
- Is the engagement loop sustainable or exploitative?
- Dark pattern assessment in engagement mechanics

## Frameworks to Apply

### Nir Eyal's Hook Model
```
    ┌────────────────────────┐
    │                        │
    ▼                        │
 TRIGGER ──▶ ACTION ──▶ VARIABLE ──▶ INVESTMENT
 (Internal/   (Simple    REWARD       (Store value
  External)    action)   (Tribe/       for next
                          Hunt/Self)    cycle)
    │                                    │
    └────────────────────────────────────┘
```

### BJ Fogg Behavior Model
```
High ┃           ●  Trigger succeeds
     ┃         ●    (above the curve)
  M  ┃       ●
  O  ┃     ●
  T  ┃   ●───── Action Line ─────
  I  ┃  ●
  V  ┃ ●    Trigger fails
  A  ┃●      (below the curve)
  T  ┃
  I  ┃
  O  ┃
  N  ┃
     ┗━━━━━━━━━━━━━━━━━━━━━━━━━
            ABILITY (Easy →)
```

### Cognitive Bias Audit Matrix
For each identified bias, evaluate:
- **Presence**: Is this bias actively leveraged? (Yes/No/Subtle)
- **Ethicality**: Is the use beneficial, neutral, or manipulative?
- **Effectiveness**: How well does it drive the desired behavior?
- **User Awareness**: Is the user likely aware of the influence?

## Prompt Template

```
You are a behavioral psychologist specializing in digital product design and 
habit formation. Perform a comprehensive behavioral analysis of [PRODUCT_NAME] 
by [COMPANY_NAME].

Use ONLY publicly available information — the product itself (as observable), 
app store reviews, user experience reports, and published research. 
Do NOT reference internal user data, A/B test results, or PII.

[INSERT LENS-SPECIFIC QUESTIONS]

Apply the following frameworks:
1. Nir Eyal's Hook Model (map each component)
2. BJ Fogg's Behavior Model (B=MAT) for onboarding
3. Cognitive Bias Codex audit (identify top 5-7 biases used)
4. Engagement depth assessment with stickiness benchmarks

For each dimension:
1. Observable behavioral design choices
2. Framework-applied analysis
3. Ethical assessment (beneficial vs. manipulative)
4. Engagement sustainability rating

Format with structured tables for bias analysis, flow diagrams for 
hook loops, and clear examples from the product.
```

## Quality Checklist
- [ ] Prompt covers all 4 lenses in this pillar
- [ ] Hook Model mapped with all 4 components
- [ ] Cognitive biases identified with ethical assessment
- [ ] Fogg B=MAT applied to onboarding analysis
- [ ] Engagement vs. addiction distinction addressed
- [ ] No internal user data or PII requested
