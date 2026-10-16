# Product Discovery & Teardown — Deployment Guide

> **Version**: 1.0  
> **Last Updated**: 2026-10-16  
> **Architecture**: 100% static SPA — zero backend, zero serverless functions, zero database

---

## 1. Build Process

### 1.1 Production Build

```bash
# Install dependencies
npm install

# Run build (includes SKILL.md parsing + Vite production build)
npm run build
```

This produces a `dist/` directory containing:
```
dist/
├── index.html              ← SPA entry point
├── assets/
│   ├── index-[hash].js     ← Main JS bundle (code-split by stage)
│   ├── index-[hash].css    ← Compiled Tailwind CSS
│   ├── vendor-[hash].js    ← React, Router, Framer Motion
│   ├── stage4-[hash].js    ← Lazy: parser + upload
│   ├── stage5-[hash].js    ← Lazy: insight explorer
│   ├── stage6-[hash].js    ← Lazy: deck builder + PptxGenJS
│   └── skills-[hash].json  ← Parsed SKILL.md data
└── favicon.svg
```

### 1.2 Build Verification

```bash
# Preview production build locally
npm run preview

# Check bundle size
npx vite-bundle-visualizer
```

### 1.3 Build Configuration

Key Vite config for production:

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,         // No sourcemaps in production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router'],
          motion: ['framer-motion'],
          parser: ['unified', 'remark-parse', 'remark-rehype'],
          pptx: ['pptxgenjs'],
        }
      }
    }
  }
});
```

---

## 2. Deployment Targets

### 2.1 Vercel (Primary — Recommended)

**Why Vercel:**
- Zero configuration for Vite + React projects
- Automatic HTTPS, CDN, and edge caching
- Preview deployments on every PR
- Free tier is more than sufficient (no backend = no compute costs)

**Setup:**
1. Connect GitHub repository to Vercel
2. Vercel auto-detects Vite and configures build
3. No environment variables needed (zero-backend app)

**Vercel Configuration** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ]
}
```

**Key rewrite rule**: The `/(.*) → /index.html` rewrite ensures client-side routing works. Without it, direct navigation to `/prompts` or `/insights` would return 404.

### 2.2 GitHub Pages (Fallback)

**Why GitHub Pages:**
- Free hosting directly from the repository
- No additional account/service needed
- Good for open-source project landing page

**Limitations:**
- No rewrite rules → must use hash routing (`/#/prompts` instead of `/prompts`)
- No custom headers (no security headers)
- No preview deployments

**Setup:**

1. **Update `vite.config.ts`** for GitHub Pages:
```typescript
export default defineConfig({
  base: '/product-discovery-and-teardown/',  // repo name
  // ... rest of config
});
```

2. **Switch to hash routing** in `App.tsx`:
```typescript
import { HashRouter } from 'react-router';
// Use <HashRouter> instead of <BrowserRouter>
```

3. **GitHub Actions workflow** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
        id: deployment
```

4. **Enable GitHub Pages** in repo Settings → Pages → Source: "GitHub Actions"

### 2.3 Netlify (Alternative)

**Setup:**
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

**`netlify.toml`:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*"
  [headers.values]
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

---

## 3. Environment Configuration

### 3.1 Environment Variables

This app requires **zero environment variables**. There are:
- No API keys (no BYOK)
- No backend URLs
- No database connections
- No analytics tokens
- No feature flags (yet)

The only build-time config is the `base` path for GitHub Pages deployment.

### 3.2 Build-Time vs. Runtime

| Data | When Resolved | How |
|------|--------------|-----|
| SKILL.md → JSON | Build time | Vite plugin / prebuild script |
| Tailwind CSS | Build time | Vite + PostCSS |
| TypeScript → JS | Build time | Vite + ESBuild |
| Product context | Runtime | User input → React state |
| Prompt composition | Runtime | Pure function in browser |
| Summary parsing | Runtime | unified/remark in browser |
| PPTX generation | Runtime | PptxGenJS in browser |

---

## 4. Security Considerations

### 4.1 Threat Model

Since this is a fully static SPA with zero external calls:

| Threat | Risk Level | Mitigation |
|--------|-----------|------------|
| **XSS** | 🟡 Low | React auto-escapes JSX. No `dangerouslySetInnerHTML`. Content Security Policy headers. |
| **Supply chain** | 🟡 Medium | Regular `npm audit`. Lock file committed. Minimal dependency count. |
| **Data exfiltration** | 🟢 Minimal | No data sent anywhere. No analytics. No external API calls. |
| **CORS issues** | 🟢 None | No cross-origin requests made. |
| **Session hijacking** | 🟢 None | No sessions, no authentication, no cookies. |
| **API key theft** | 🟢 None | No API keys stored or used (BYOK dropped). |

### 4.2 Content Security Policy

Add via deployment headers (Vercel/Netlify config):

```
Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self'; 
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
  font-src 'self' https://fonts.gstatic.com; 
  img-src 'self' data: blob:; 
  connect-src 'self'; 
  frame-src 'none'; 
  object-src 'none';
```

### 4.3 Dependency Security

```bash
# Run before each release
npm audit

# Auto-fix non-breaking vulnerabilities
npm audit fix

# Check for known vulnerabilities in production deps
npx better-npm-audit audit --production
```

---

## 5. Performance Optimization

### 5.1 Caching Strategy

| Resource | Cache Policy | Rationale |
|----------|-------------|-----------|
| `index.html` | `no-cache` | Must always serve latest version for SPA routing |
| `assets/*.js` | `immutable, max-age=31536000` | Content-hashed filenames — cache forever |
| `assets/*.css` | `immutable, max-age=31536000` | Content-hashed filenames — cache forever |
| `favicon.svg` | `max-age=86400` | Infrequently changed |

### 5.2 Code Splitting

Stages 4-6 are lazy-loaded:
```typescript
const Stage4 = lazy(() => import('./pages/Stage4_UploadParse'));
const Stage5 = lazy(() => import('./pages/Stage5_InsightExplorer'));
const Stage6 = lazy(() => import('./pages/Stage6_DeckBuilder'));
```

Users who only use the prompt generation (Stages 1-3) never download the parser, explorer, or PPTX libraries.

### 5.3 Asset Optimization

- **Fonts**: Self-host Inter and JetBrains Mono (avoid Google Fonts CDN latency)
- **Icons**: Lucide React with tree-shaking (only import used icons)
- **Images**: None required (text/SVG-based UI)

---

## 6. Monitoring & Observability

### 6.1 What We DON'T Track

- ❌ No analytics (Google Analytics, Mixpanel, etc.)
- ❌ No error reporting (Sentry, LogRocket, etc.)
- ❌ No user behavior tracking
- ❌ No cookies or fingerprinting

### 6.2 What We CAN Observe

| Signal | How |
|--------|-----|
| **Deployment status** | Vercel/Netlify dashboard |
| **Build success/failure** | GitHub Actions logs |
| **Bundle size regression** | `vite-bundle-visualizer` in CI |
| **Lighthouse scores** | Lighthouse CI in GitHub Actions |
| **Dependency vulnerabilities** | `npm audit` in CI |

### 6.3 Optional: Privacy-Respecting Analytics

If analytics are desired in the future, consider:
- **Plausible Analytics** — Privacy-first, no cookies, GDPR-compliant, lightweight (~1KB)
- **Umami** — Self-hosted, open source, privacy-focused
- Add only with explicit user consent banner

---

## 7. CI/CD Pipeline

### 7.1 GitHub Actions Workflow

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build
      - run: npm audit --production

  lighthouse:
    needs: lint-and-build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci && npm run build
      - uses: treosh/lighthouse-ci-action@v12
        with:
          configPath: './lighthouserc.json'
          uploadArtifacts: true
```

### 7.2 Lighthouse CI Config

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist"
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

---

## 8. Domain & Custom URL

### 8.1 Custom Domain Setup (Vercel)

1. Purchase domain (e.g., `teardown.tools` or `productteardown.app`)
2. In Vercel dashboard → Project → Settings → Domains → Add domain
3. Configure DNS:
   - A record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`
4. Vercel auto-provisions SSL certificate

### 8.2 Custom Domain Setup (GitHub Pages)

1. In repo Settings → Pages → Custom domain → Enter domain
2. Configure DNS:
   - CNAME record pointing to `<username>.github.io`
3. Enable "Enforce HTTPS"
4. Add `CNAME` file to `public/` directory:
```
teardown.tools
```

---

## 9. Rollback Strategy

Since the app is a static SPA with no database:

| Scenario | Action |
|----------|--------|
| **Bad deployment** | Revert to previous Git commit. Vercel/Netlify auto-redeploy. |
| **Broken build** | CI catches it before deployment (lint + type-check + build). |
| **Dependency vulnerability** | `npm audit fix` → commit → redeploy. |
| **Complete rollback** | `git revert HEAD` or redeploy any previous commit. |

No database migrations, no data corruption risk, no state to restore. Rollback is always safe and instant.
