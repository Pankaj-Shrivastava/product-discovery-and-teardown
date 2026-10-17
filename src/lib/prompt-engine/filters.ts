import type { ProductInput, ProductCategory, Platform, BusinessModel } from '../../types'
import type { ResearchLens } from '../../types/skills'

/**
 * Returns cross-pillar deduplication boundaries so each prompt remains
 * MECE (Mutually Exclusive, Collectively Exhaustive) per Section 3.2 of the plan.
 */
export function getCrossPillarDeduplication(pillarNumber: number): string {
  switch (pillarNumber) {
    case 1:
      return (
        'SCOPE BOUNDARY & CROSS-PILLAR DEDUPLICATION:\n' +
        'Focus strictly on business strategy, mission, monetization mechanics, unit economics, and sustainable competitive moats. ' +
        'Detailed competitor teardowns & market positioning matrices belong to Pillar 2 (Market & Competition). ' +
        'User journeys, personas, and UI/UX craft belong to Pillar 3 (Users & Product Craft). ' +
        'Underlying technical architecture belongs to Pillar 4 (Technical Architecture). ' +
        'Cognitive biases and habit formation loops belong to Pillar 5 (Behavioral Psychology). ' +
        'Regulatory compliance, privacy audits, and dark patterns belong to Pillar 6 (Trust, Safety & Ethics).'
      )
    case 2:
      return (
        'SCOPE BOUNDARY & CROSS-PILLAR DEDUPLICATION:\n' +
        'Focus strictly on market sizing (TAM/SAM/SOM), competitor matrices, positioning quadrants, Reforge growth loops, and switching costs. ' +
        'Internal business model canvas and company-level unit economics belong to Pillar 1 (Strategic Context). ' +
        'Detailed persona wireframes and feature usability belong to Pillar 3 (Product Craft). ' +
        'API and cloud infrastructure belong to Pillar 4 (Technical Architecture). ' +
        'Psychological triggers and retention mechanics belong to Pillar 5 (Behavioral Psychology).'
      )
    case 3:
      return (
        'SCOPE BOUNDARY & CROSS-PILLAR DEDUPLICATION:\n' +
        'Focus strictly on target personas, Jobs-to-be-Done (JTBD), information architecture, navigation hierarchy, UX craft, and delight moments. ' +
        'Growth-loop acquisition channels belong to Pillar 2 (Market & Competition). ' +
        'Client/server networking and tech stack implementations belong to Pillar 4 (Technical Architecture). ' +
        'Dopaminergic habit loops and variable rewards belong to Pillar 5 (Behavioral Psychology). ' +
        'Dark patterns and deceptive UI practices belong to Pillar 6 (Trust, Safety & Ethics).'
      )
    case 4:
      return (
        'SCOPE BOUNDARY & CROSS-PILLAR DEDUPLICATION:\n' +
        'Focus strictly on technical architecture, client/server models, data pipelines, public APIs, performance metrics, and accessibility (A11y/WCAG). ' +
        'Commercial monetization and pricing belong to Pillar 1 (Strategic Context). ' +
        'Visual design polish and qualitative user personas belong to Pillar 3 (Product Craft). ' +
        'Engagement hooks belong to Pillar 5 (Behavioral Psychology). ' +
        'Privacy policies and terms of service audits belong to Pillar 6 (Trust, Safety & Ethics).'
      )
    case 5:
      return (
        'SCOPE BOUNDARY & CROSS-PILLAR DEDUPLICATION:\n' +
        'Focus strictly on behavioral psychology: the Hook Model (Trigger, Action, Variable Reward, Investment), BJ Fogg Behavior Model (B=MAT), cognitive biases, and habit loops. ' +
        'High-level user flows and screen layouts belong to Pillar 3 (Users & Product Craft). ' +
        'Technical push notification infrastructure belongs to Pillar 4 (Technical Architecture). ' +
        'Ethical boundaries of persuasion and predatory dark patterns belong to Pillar 6 (Trust, Safety & Ethics).'
      )
    case 6:
      return (
        'SCOPE BOUNDARY & CROSS-PILLAR DEDUPLICATION:\n' +
        'Focus strictly on digital ethics, dark pattern taxonomy (Harry Brignull), Privacy by Design (Cavoukian), user autonomy, algorithmic transparency, and security postures. ' +
        'General technical architecture belongs to Pillar 4 (Technical Architecture). ' +
        'Standard behavioral engagement mechanics belong to Pillar 5 (Behavioral Psychology).'
      )
    default:
      return 'Focus strictly on this pillar topic. Other pillars will cover adjacent topics.'
  }
}

/**
 * Returns category-aware guidance and adaptations based on the product category.
 */
export function getCategoryDirectives(category: ProductCategory, pillarNumber: number): string[] {
  if (category === 'Other') {
    return []
  }

  const directives: string[] = []

  switch (category) {
    case 'Productivity & Tools':
      if (pillarNumber === 1) directives.push('Analyze seat-based vs usage-based pricing tiers, freemium-to-pro conversion triggers, and team expansion economics.')
      if (pillarNumber === 3) directives.push('Prioritize workflow velocity, hotkey/keyboard ergonomics, time-to-first-value, and workspace organization hierarchy.')
      if (pillarNumber === 4) directives.push('Examine real-time collaborative editing latency, offline document sync, conflict resolution (CRDT/OT), and cross-platform state caching.')
      break

    case 'Developer Tools':
      if (pillarNumber === 1) directives.push('Examine developer-led bottom-up adoption (PLG), enterprise sales overlay, open-source monetization, and cloud hosting margins.')
      if (pillarNumber === 3) directives.push('Focus on CLI ergonomics, API documentation clarity, SDK developer experience (DX), terminal onboarding, and error messaging precision.')
      if (pillarNumber === 4) directives.push('Deeply analyze API specifications (REST/GraphQL/gRPC), webhook reliability, rate limits, SDK code generation, and CI/CD integration posture.')
      if (pillarNumber === 6) directives.push('Audit credential management, secrets handling, dependency vulnerability scanning, and third-party telemetry opt-outs.')
      break

    case 'Finance & Fintech':
      if (pillarNumber === 1) directives.push('Investigate interchange fees, net interest margin (NIM), payment processing take rates, and regulatory capital requirements.')
      if (pillarNumber === 3) directives.push('Evaluate trust-building onboarding UX, financial transparency cues, transaction confirmation states, and fraud warning friction.')
      if (pillarNumber === 4) directives.push('Evaluate banking core integration, PCI-DSS compliance posture, ledger immutability, sub-second transaction processing, and encryption standards.')
      if (pillarNumber === 6) directives.push('Conduct deep scrutiny of KYC/AML compliance, hidden transaction fees, predatory lending patterns, regulatory disclosures, and financial data sharing.')
      break

    case 'Health & Wellness':
      if (pillarNumber === 1) directives.push('Analyze clinical validation investments, direct-to-consumer subscription models, insurance/B2B wellness reimbursement channels, and HIPAA compliance costs.')
      if (pillarNumber === 3) directives.push('Examine compassionate UX tone, medical disclaimers, sensitive health symptom logging, and empathetic error states.')
      if (pillarNumber === 4) directives.push('Examine Protected Health Information (PHI) encryption, HIPAA/GDPR health data compliance, and medical device/wearable Bluetooth sync.')
      if (pillarNumber === 6) directives.push('Audit health data privacy, third-party advertising tracker leakage, emergency crisis escalation protocols, and clinical efficacy claim boundaries.')
      break

    case 'E-commerce & Marketplace':
      if (pillarNumber === 1) directives.push('Evaluate Gross Merchandise Value (GMV), take-rate percentage, buyer/seller acquisition economics, and fulfillment/logistics margins.')
      if (pillarNumber === 2) directives.push('Analyze two-sided marketplace liquidity, cross-side network effects, disintermediation defense, and localized catalog depth.')
      if (pillarNumber === 3) directives.push('Examine search relevance, filter granularity, high-intent product detail page (PDP) hierarchy, checkout friction, and buyer-seller messaging.')
      if (pillarNumber === 5) directives.push('Investigate urgency cues (low-stock badges, flash sales), cart abandonment re-engagement triggers, and post-purchase loyalty rewards.')
      if (pillarNumber === 6) directives.push('Audit for deceptive drip pricing, fake review moderation, counterfeit detection, and seller fee transparency.')
      break

    case 'Social & Communication':
      if (pillarNumber === 1) directives.push('Analyze ad-supported monetization (CPM/CPC), creator monetization splits, premium user subscriptions, and brand partnership infrastructure.')
      if (pillarNumber === 2) directives.push('Map direct network effects (Metcalfe’s law), viral coefficient (k-factor), audience multi-homing vulnerability, and creator retention.')
      if (pillarNumber === 3) directives.push('Examine the core composition flow, consumption feed typography, conversation threading, notification preferences, and relationship graph discovery.')
      if (pillarNumber === 5) directives.push('Deep-dive into infinite scroll mechanics, social validation metrics (likes, reactions, reposts), intermittent reinforcement, and notification batches.')
      if (pillarNumber === 6) directives.push('Analyze content moderation scalability, harassment reporting workflows, shadowbanning transparency, minor safety controls, and algorithmic echo chamber mitigations.')
      break

    case 'Education & Learning':
      if (pillarNumber === 1) directives.push('Analyze individual subscription vs institutional/B2B licensing, course completion economics, and credentialing revenue.')
      if (pillarNumber === 3) directives.push('Examine pedagogical scaffolding, lesson chunking, interactive quiz feedback loops, and mastery progression visualization.')
      if (pillarNumber === 5) directives.push('Analyze streak psychology, learning habit triggers, spaced repetition intervals, and intrinsic vs extrinsic motivation balance.')
      break

    case 'Entertainment & Media':
      if (pillarNumber === 1) directives.push('Analyze content licensing/production costs, ad tier vs premium tier unit economics, and subscriber lifetime value (LTV) vs churn.')
      if (pillarNumber === 3) directives.push('Evaluate content discovery algorithms, playback controls, watchlist management, and personalized recommendation carousels.')
      if (pillarNumber === 4) directives.push('Examine adaptive bitrate video/audio streaming, DRM integration, CDN caching edge nodes, and offline content download management.')
      if (pillarNumber === 5) directives.push('Examine autoplay mechanics, personalized binge hooks, watch history recommendations, and session continuation prompts.')
      break
  }

  return directives
}

/**
 * Returns platform-aware adaptations based on whether the product is Web, Mobile, Desktop, or Cross-platform.
 */
export function getPlatformDirectives(platform: Platform, pillarNumber: number): string[] {
  const directives: string[] = []

  switch (platform) {
    case 'Web':
      if (pillarNumber === 3) directives.push('Target desktop and mobile browser viewports, responsive breakpoint adaptations, URL-addressable navigation, and web keyboard navigation.')
      if (pillarNumber === 4) directives.push('Focus on Progressive Web App (PWA) readiness, Service Worker caching strategies, web bundle performance (Core Web Vitals), and browser compatibility.')
      break

    case 'Mobile':
      if (pillarNumber === 3) directives.push('Focus on mobile touch targets (minimum 44x44 pt), thumb-zone reachability, haptic feedback, bottom sheet navigation, and pull-to-refresh gestures.')
      if (pillarNumber === 4) directives.push('Focus on native mobile architecture (iOS Swift/Android Kotlin or cross-platform React Native/Flutter), background app refresh, push notification APNS/FCM tokens, and local SQLite/Room/CoreData storage.')
      break

    case 'Desktop':
      if (pillarNumber === 3) directives.push('Focus on native desktop menu bar integration, complex multi-window or tabbed workflows, global OS shortcuts, and large screen information density.')
      if (pillarNumber === 4) directives.push('Analyze desktop packaging (Electron, Tauri, native AppKit/WinUI), local filesystem access permissions, background daemon resource footprint, and auto-updater mechanisms.')
      break

    case 'Cross-platform':
      if (pillarNumber === 3) directives.push('Evaluate design system consistency across touch and pointer environments, responsive layout transitions, and device-appropriate affordances.')
      if (pillarNumber === 4) directives.push('Scrutinize multi-device real-time state synchronization, conflict resolution strategies, cross-client session management, and unified design token architectures.')
      break
  }

  return directives
}

/**
 * Returns business-model-aware adaptations.
 */
export function getBusinessModelDirectives(businessModel: BusinessModel, pillarNumber: number): string[] {
  const directives: string[] = []

  switch (businessModel) {
    case 'B2B':
      if (pillarNumber === 1) directives.push('Analyze ACV/TCV bands, procurement negotiation dynamics, annual contract locks, ROI justification frameworks, and pilot-to-enterprise expansion paths.')
      if (pillarNumber === 2) directives.push('Emphasize enterprise sales cycles, RFP/RFI readiness, channel partner programs, and migration/switching cost lock-in.')
      if (pillarNumber === 3) directives.push('For user review analysis, scrutinize B2B software directories (G2, Capterra, Gartner Peer Insights) in addition to any companion app store presence. Distinguish buyer persona (economic decision maker) from daily active user persona.')
      if (pillarNumber === 4) directives.push('Examine enterprise readiness requirements: SAML/SSO integration, Role-Based Access Control (RBAC), audit logging, SIEM export, and SOC 2 Type II compliance.')
      break

    case 'B2C':
      if (pillarNumber === 1) directives.push('Analyze consumer willingness-to-pay, freemium friction balance, impulse upgrade triggers, and payment methods (Apple In-App Purchase, Google Play Billing, Stripe Checkout).')
      if (pillarNumber === 2) directives.push('De-emphasize enterprise sales cycles; focus on consumer acquisition loops, organic word-of-mouth, paid performance marketing, and virality.')
      if (pillarNumber === 3) directives.push('Deep-dive into App Store and Google Play reviews, Trustpilot ratings, Reddit community sentiment, and consumer onboarding completion rates.')
      if (pillarNumber === 5) directives.push('Scrutinize consumer emotional triggers, instant gratification moments, variable rewards, and habit formation loops.')
      break

    case 'Marketplace':
      if (pillarNumber === 1) directives.push('Analyze two-sided unit economics: Buyer CAC, Seller CAC, take rate percentage, GMV velocity, and dispute settlement liability.')
      if (pillarNumber === 2) directives.push('Focus on two-sided liquidity equilibrium, cross-side network effects, cold-start marketplace bootstrapping, and disintermediation leakage defense.')
      if (pillarNumber === 3) directives.push('Analyze separate buyer and seller journeys, merchant dashboard vs consumer storefront UX, search filtering, and two-way review/rating trust architectures.')
      break

    case 'Platform':
      if (pillarNumber === 1) directives.push('Analyze developer ecosystem economics, app store revenue sharing, platform API usage billing, and platform lock-in leverage.')
      if (pillarNumber === 2) directives.push('Evaluate platform gravity: developer community size, third-party integrations catalog, ecosystem flywheel effects, and competitive platform migration barriers.')
      if (pillarNumber === 4) directives.push('Perform an in-depth audit of developer tooling: API versioning policies, developer sandbox environments, webhooks, rate limits, and SDK coverage across major languages.')
      break

    case 'B2B2C':
      if (pillarNumber === 1) directives.push('Examine dual revenue model: enterprise licensing fees paired with consumer transaction or premium feature monetization.')
      if (pillarNumber === 3) directives.push('Analyze the symbiotic user journey: satisfying employer/enterprise buyer governance while delivering high end-consumer engagement.')
      break
  }

  return directives
}

/**
 * Returns suggested high-yield public sources per pillar and product context.
 */
export function getSourceGuidance(pillarNumber: number, product: ProductInput): string[] {
  const isB2B = product.businessModel === 'B2B' || product.businessModel === 'Platform'

  switch (pillarNumber) {
    case 1: // Strategic & Business Context
      return [
        'SEC 10-K, 10-Q, and S-1 regulatory filings (if public, or parent company filings)',
        'Crunchbase, PitchBook, or Dealroom funding rounds, valuations, and investor syndicates',
        'Founder, CEO, and executive keynote transcripts, podcast interviews (e.g., 20VC, Lenny’s Podcast, Acquired)',
        'Public investor presentations, earnings call transcripts, and investor day teardowns',
        'Company press releases, official corporate blog announcements, and pricing tier change history',
      ]

    case 2: // Market & Competition
      return [
        isB2B
          ? 'G2 Grid reports, Gartner Magic Quadrants, Forrester Waves, and Capterra competitive matrices'
          : 'App Store category rankings, Google Play top charts, and consumer trend reports',
        'Similarweb / SEMrush web traffic metrics, organic search keywords, and referral channel distributions',
        'Competitor official websites, feature comparison tables, and packaging/pricing pages',
        'Industry analyst whitepapers (IDC, McKinsey, CB Insights) covering market sizing and headwinds',
        'Direct competitor teardowns, public product changelogs, and patent assignment databases',
      ]

    case 3: // Users & Product Craft
      return [
        isB2B
          ? 'G2 and Capterra verified user reviews, Slack/Discord community discussions, and B2B forum feedback'
          : 'Apple App Store and Google Play Store user reviews, ratings distribution, and version changelogs',
        'Reddit user communities (e.g. r/software, specific product subreddits), Hacker News discussions, and Trustpilot reviews',
        'Product walkthrough videos on YouTube, Mobbin UI pattern teardowns, and design case studies',
        'Public help center documentation, knowledge base hierarchy, and getting-started tutorials',
        'Customer interview transcripts, public testimonials, and user conference session recordings',
      ]

    case 4: // Technical Architecture
      return [
        'Official engineering blog posts (e.g., Medium, Substack, company engineering domains)',
        'Conference tech talks (QCon, AWS re:Invent, Google I/O, InfoQ, Strange Loop, GitHub Universe)',
        'Public GitHub repositories, open-source SDKs, developer documentation, and OpenAPI/Swagger specs',
        'BuiltWith, StackShare, and Wappalyzer technological footprint inspections',
        'Public status pages (e.g., statuspage.io), post-mortem incident reports, and system latency disclosures',
        'WebPageTest, Chrome Lighthouse audits, and axe-core accessibility compliance scans',
      ]

    case 5: // Behavioral Psychology
      return [
        'Direct observational teardown of onboarding walkthroughs and welcome notification sequences',
        'Push notification, email digest, and SMS trigger cadences and copywriting strategies',
        'Observable gamification components (progress bars, streaks, milestone badges, celebration animations)',
        'Behavioral design case studies (Growth.design teardowns, Reforge case analyses)',
        'App store review sentiment regarding habit formation, daily active routine integration, or user churn triggers',
      ]

    case 6: // Trust, Safety & Ethics
      return [
        'Public Terms of Service, Privacy Policy, and Cookie Disclosures',
        'Annual Corporate Transparency Reports and Government Data Request disclosures',
        'Deceptive Design (formerly Dark Patterns) audits and UX teardown critiques',
        'Public security disclosures, bug bounty programs (HackerOne, Bugcrowd), and SOC 2 / ISO 27001 audit statements',
        'Regulatory enforcement actions, FTC/EU GDPR consent decrees, or news coverage of privacy investigations',
      ]

    default:
      return ['Public product documentation, press releases, user reviews, and industry analysis']
  }
}

/**
 * Adapts and contextualizes research lenses for the specific product without dropping lenses,
 * ensuring 100% lens coverage target while maintaining deep product specificity.
 */
export function filterAndAdaptLenses(
  lenses: ResearchLens[],
  product: ProductInput,
  pillarNumber: number
): ResearchLens[] {
  const isWebOnly = product.platform === 'Web'
  const isB2B = product.businessModel === 'B2B'
  const isMarketplace = product.businessModel === 'Marketplace'
  const cleanName = product.name.replace(/`/g, "'").trim()

  return lenses.map((lens) => {
    // Clone questions to avoid mutating original skill data
    let adaptedQuestions = [...lens.questions]

    // Platform-aware adaptations
    if (isWebOnly) {
      adaptedQuestions = adaptedQuestions.map((q) => {
        if (/mobile architecture|native app|ios|android|app store/i.test(q)) {
          return `${q} (Note: As ${cleanName} is Web-first, focus on responsive web, PWA readiness, and browser APIs; evaluate mobile apps only if companion apps exist).`
        }
        return q
      })
    }

    // Business model adaptations
    if (isB2B) {
      adaptedQuestions = adaptedQuestions.map((q) => {
        if (/consumer reviews|app store reviews|consumer sentiment/i.test(q)) {
          return `${q} (For B2B: evaluate G2, Capterra, Gartner Peer Insights, and enterprise communities alongside any app store presence).`
        }
        if (/sales loop|monetization/i.test(q)) {
          return `${q} (Contextualize for B2B: examine enterprise sales cycles, seat-based vs usage pricing, and procurement dynamics).`
        }
        return q
      })
    }

    if (isMarketplace && pillarNumber === 2) {
      adaptedQuestions = adaptedQuestions.map((q) => {
        if (/network effects/i.test(q)) {
          return `${q} (Specifically map cross-side network effects between supply and demand actors).`
        }
        return q
      })
    }

    return {
      ...lens,
      questions: adaptedQuestions,
    }
  })
}
