import React, { useState } from 'react'
import {
  Download,
  FileText,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Eye,
  BookOpen,
} from 'lucide-react'
import { downloadBlobFile } from '../../lib/utils'

interface SummaryTemplateGuideProps {
  productName: string
  companyName: string
  category: string
  platform: string
  businessModel: string
  onToast: (message: string, type?: 'success' | 'error') => void
}

export const SummaryTemplateGuide: React.FC<SummaryTemplateGuideProps> = ({
  productName,
  companyName,
  category,
  platform,
  businessModel,
  onToast,
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isExampleOpen, setIsExampleOpen] = useState(false)

  const safeProduct = productName || 'Product'
  const safeCompany = companyName || 'Company'
  const sanitizedSlug =
    safeProduct
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'product'

  // Generate dynamic template tailored to the active product
  const templateMarkdown =
    `# Product Teardown Summary: ${safeProduct} by ${safeCompany}\n` +
    `Date: ${new Date().toLocaleDateString()}\n` +
    `Category: ${category} | Platform: ${platform} | Business Model: ${businessModel}\n\n` +
    `---\n\n` +
    `## 1. Strategic & Business Context\n\n` +
    `### Mission & Overarching Strategic Mandate\n` +
    `- **Mission**: [Insert company/product mission statement and strategic mandate]\n` +
    `- **Core Value Proposition**: [Primary customer problem solved and unique value delivered]\n\n` +
    `### Monetization Mechanics & Unit Economics\n` +
    `| Tier / Package | Target Persona | Price Point | Core Value Inclusions |\n` +
    `|---|---|---|---|\n` +
    `| Free / Starter | Individual creators / Evaluators | $0 | Basic workspace, core editor |\n` +
    `| Pro / Team | High-velocity operators | $10 - $20 / mo | Unlimited uploads, version history |\n` +
    `| Enterprise | Large organizations | Custom contract | SSO, SAML, dedicated CSM, SLA |\n\n` +
    `- **Unit Economics & Margins**: [Gross margins, estimated CAC payback periods, LTV levers]\n` +
    `- **Structural Moats**: [Network effects, high switching costs, brand equity, ecosystem integrations]\n\n` +
    `---\n\n` +
    `## 2. Market & Competition\n\n` +
    `### Market Sizing & Tailwinds\n` +
    `- **TAM / SAM / SOM**: [Total addressable market estimates and category compound growth rate]\n` +
    `- **Macro Headwinds**: [Regulatory pressure, commoditization risks, platform dependency]\n\n` +
    `### Competitor Comparison Matrix\n` +
    `| Competitor | Primary Advantage | Vulnerability | Positioning Angle |\n` +
    `|---|---|---|---|\n` +
    `| [Competitor A] | Deep enterprise sales force | Bloated legacy UX | Top-down procurement |\n` +
    `| [Competitor B] | Freemium viral growth | Weak compliance/governance | Bottom-up prosumer |\n` +
    `| ${safeProduct} | Elegant product craft & velocity | Mid-market churn | Integrated unified hub |\n\n` +
    `- **Reforge Growth Loops**: [Viral referral loops, content SEO loops, paid acquisition loops]\n` +
    `- **Switching Costs**: [Proprietary file formats, workflow muscle memory, collaborative team graph]\n\n` +
    `---\n\n` +
    `## 3. Users & Product Craft\n\n` +
    `### Core Personas & Jobs-to-be-Done (JTBD)\n` +
    `- **Primary Persona**: [Demographic and psychographic traits of core daily user]\n` +
    `- **Functional JTBD**: *"When I need to coordinate asynchronous cross-functional projects, I want a single source of truth, so I can eliminate status meetings."*\n` +
    `- **Emotional JTBD**: *Feel in complete control and calm amidst corporate ambiguity.*\n\n` +
    `### UX Craft, Activation & Delight\n` +
    `- **Onboarding & Time-to-First-Value**: [First mile experience, template pickers, frictionless signup]\n` +
    `- **Micro-Interactions & Craft**: [Subtle typography, keyboard shortcut ergonomics, fluid transitions]\n` +
    `- **Google HEART Assessment**: [Happiness (CSAT/NPS), Engagement (DAU/MAU), Adoption, Retention, Task Success]\n\n` +
    `---\n\n` +
    `## 4. Technical Architecture\n\n` +
    `### Inferred System Architecture & Stack\n` +
    `- **Client Layer**: [React, WebAssembly, Swift/Kotlin native components, Electron]\n` +
    `- **Backend Infrastructure**: [Microservices, distributed cloud storage, real-time WebSockets, CRDT/OT sync]\n` +
    `- **Public API Strategy**: [REST/GraphQL maturity, webhook triggers, SDK ecosystem]\n` +
    `- **Accessibility & Performance**: [WCAG 2.1 AA compliance, Core Web Vitals, sub-second latency targets]\n\n` +
    `---\n\n` +
    `## 5. Behavioral Psychology\n\n` +
    `### Hook Model & Habit Formation Mechanics\n` +
    `- **Trigger**: [External: notifications/emails; Internal: anxiety over dropped balls]\n` +
    `- **Action**: [Minimal tap interaction to check updates or log a task]\n` +
    `- **Variable Reward**: [Tribe: collaborator praise; Hunt: new project milestones; Self: clean inbox/dashboard]\n` +
    `- **Investment**: [Storing documentation, customizing workflows, inviting team members]\n\n` +
    `- **Cognitive Biases Leveraged**: [Endowment Effect, IKEA Effect, Loss Aversion, Default Effect]\n\n` +
    `---\n\n` +
    `## 6. Trust, Safety & Ethics\n\n` +
    `### Privacy, Dark Patterns & Autonomy Audit\n` +
    `- **Dark Pattern Scan**: [Audit for sneak-into-basket, confirmshaming, hard-to-cancel traps (result: clean/flagged)]\n` +
    `- **Privacy by Design**: [Clear data minimization, transparent opt-outs, SOC 2 Type II certifications]\n` +
    `- **Critical Gaps & Ethical Risks**: [AI data ingestion consent, user burnout risks, platform lock-in leverage]\n`

  const handleDownloadTemplate = () => {
    const fileName = `${sanitizedSlug}-teardown-template.md`
    const success = downloadBlobFile(fileName, templateMarkdown, 'text/markdown;charset=utf-8')
    if (success) {
      onToast(`Downloaded ${fileName}`, 'success')
    } else {
      onToast('Download failed. Browser blocked file creation.', 'error')
    }
  }

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-bold text-[#1A202C] tracking-tight flex items-center gap-2">
            <span>Summary Document Guide &amp; Template</span>
            <FileText className="w-4 h-4 text-[#4355B9]" />
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Stage 4 uses deterministic AST parsing to extract insight cards directly from your Markdown headers and tables.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadTemplate}
          className="px-4 py-2 rounded-xl bg-[#4355B9] hover:bg-[#364599] text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Download Summary Template (.md)</span>
        </button>
      </div>

      {/* Formatting Requirements Card */}
      <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] mb-4 shadow-xs">
        <h3 className="text-sm font-bold text-[#1A202C] mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#107C41]" />
          <span>Stage 4 Ingestion Requirements</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#475569]">
          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <strong className="text-[#1A202C] block mb-1">1. Exact Pillar Headers</strong>
            <span>Use Level 2 headings (`## 1. Strategic & Business Context`, etc.). The parser relies on these for 100% accurate pillar mapping.</span>
          </div>

          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <strong className="text-[#1A202C] block mb-1">2. Markdown Tables</strong>
            <span>Format competitor teardowns and pricing tiers as Markdown tables. Stage 4 automatically parses these into structured data cards.</span>
          </div>

          <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <strong className="text-[#1A202C] block mb-1">3. Factual Findings</strong>
            <span>Include observable data points, metrics, and quotes. Bullet points (`- `) are converted into distinct Insight Cards.</span>
          </div>
        </div>
      </div>

      {/* Template Preview Accordion */}
      <div className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden mb-4 shadow-xs">
        <button
          type="button"
          onClick={() => setIsPreviewOpen((prev) => !prev)}
          className="w-full px-5 py-3.5 flex items-center justify-between text-xs font-medium text-[#1A202C] hover:bg-[#F8FAFC] transition-colors cursor-pointer bg-white"
        >
          <span className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#4355B9]" />
            <span>Preview Summary Template Structure (`{sanitizedSlug}-teardown-template.md`)</span>
          </span>
          {isPreviewOpen ? <ChevronUp className="w-4 h-4 text-[#64748B]" /> : <ChevronDown className="w-4 h-4 text-[#64748B]" />}
        </button>

        {isPreviewOpen && (
          <div className="p-5 bg-[#F8FAFC] border-t border-[#E2E8F0]">
            <pre className="text-xs leading-relaxed text-[#334155] max-h-80 overflow-y-auto whitespace-pre-wrap selection:bg-[#4355B9]/20 selection:text-[#1A202C]">
              {templateMarkdown}
            </pre>
          </div>
        )}
      </div>

      {/* Real-World Sample Summary Accordion */}
      <div className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden shadow-xs">
        <button
          type="button"
          onClick={() => setIsExampleOpen((prev) => !prev)}
          className="w-full px-5 py-3.5 flex items-center justify-between text-xs font-medium text-[#1A202C] hover:bg-[#F8FAFC] transition-colors cursor-pointer bg-white"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#C07818]" />
            <span>View Example Teardown Summary (Spotify Case Study)</span>
          </span>
          {isExampleOpen ? <ChevronUp className="w-4 h-4 text-[#64748B]" /> : <ChevronDown className="w-4 h-4 text-[#64748B]" />}
        </button>

        {isExampleOpen && (
          <div className="p-5 bg-[#F8FAFC] border-t border-[#E2E8F0] text-xs text-[#334155] space-y-3 leading-relaxed max-h-80 overflow-y-auto selection:bg-[#4355B9]/20 selection:text-[#1A202C]">
            <div className="text-[#1A202C] font-bold text-sm"># Product Teardown Summary: Spotify</div>
            <div className="text-[#64748B]">Category: Entertainment & Media | Platform: Cross-platform | Business Model: Freemium B2C</div>
            <div className="text-[#107C41] font-bold pt-2">## 1. Strategic & Business Context</div>
            <p className="text-[#475569]">
              - **Mission**: Unlock the potential of human creativity by giving a million creative artists the opportunity to live off their art.<br />
              - **Monetization**: Ad-supported free tier (~12% gross margin) serves as the top-of-funnel customer acquisition engine for Premium subscriptions (~30% gross margin).<br />
              - **Moat**: Algorithmic personalization engine (Discover Weekly, Daylist) combined with high playlist migration switching costs.
            </p>
            <div className="text-[#C07818] font-bold pt-2">## 2. Market & Competition</div>
            <p className="text-[#475569]">
              - **Market Position**: Global streaming audio market leader with ~31% market share ahead of Apple Music (~15%) and Amazon Music (~13%).<br />
              - **Growth Loops**: User-generated playlist SEO loop + Spotify Wrapped annual viral distribution loop generating massive zero-CAC acquisition spikes.
            </p>
            <div className="text-[#2563EB] font-bold pt-2">## 3. Users & Product Craft</div>
            <p className="text-[#475569]">
              - **Core JTBD**: When I want an emotional soundtrack for my commute/workout, I want personalized instant music without decision fatigue, so I can elevate my mental state.<br />
              - **Aha Moment**: First time Discover Weekly predicts an unknown artist the user immediately saves.
            </p>
            <div className="text-[#0284C7] font-bold pt-2">## 4. Technical Architecture</div>
            <p className="text-[#475569]">
              - **Client**: Native C++ audio rendering core wrapped in Swift/Kotlin and React Native UI overlays.<br />
              - **Infrastructure**: Google Cloud Platform, BigQuery for telemetry, Cassandra for playlist graph storage, and custom Spotify Connect protocol for device handoff.
            </p>
            <div className="text-[#C0392B] font-bold pt-2">## 5. Behavioral Psychology</div>
            <p className="text-[#475569]">
              - **Hook Model**: Trigger (End of workday / boredom) → Action (Tap play on Daylist) → Variable Reward (Fresh sonic discoveries) → Investment (Hearting songs, building library).<br />
              - **Endowment Effect**: Users value playlists they personally curated far above generic albums.
            </p>
            <div className="text-[#7C3AED] font-bold pt-2">## 6. Trust, Safety & Ethics</div>
            <p className="text-[#475569]">
              - **Artist Royalty Friction**: Stream-share royalty model pays ~$0.003–$0.005 per stream, drawing recurring artist compensation criticisms.<br />
              - **Data Privacy**: Extensive listening telemetry collected, though users retain granular private session and social listening toggle controls.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
