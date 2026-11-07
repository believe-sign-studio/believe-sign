# Verification report — 2 November 2026

## Performed

- Next.js 16.4.4 production build: passed, including server-side enquiry route, server-rendered metadata and static generation. TypeScript strict compilation passed as part of the build.
- ESLint: passed on implementation. Re-run after final packaging/documentation changes as recorded in the command results.
- Private static review build: passed. This build intentionally excludes the server API and uses the handoff options; full production source retains the API.
- Export validator checks all 19 indexable-content routes for one H1, unique title, non-empty description, expected canonical, preview noindex, parseable JSON-LD, linked local targets and image files. Checks sitemap destinations and staging robots. Machine results: `export-check.json`.
- Enquiry handler: 12 automated checks with mocked Turnstile/Resend, covering unconfigured delivery, origin rejection, consent, malformed email, dimensions, honeypot, oversized request, missing/invalid tokens, hostname mismatch, successful mocked delivery and provider failure. Results: `enquiry-check.json`. No actual email or WhatsApp message was sent.
- Legacy inventory: 19 navigation-linked `.html` URLs returned HTTP 200. Homepage and legacy About alias are additionally mapped. Full historical coverage requires Search Console/log exports.

## Limits and release gates

The local browser timed out reaching loopback; local HTTP checks required network permission. Hosted browser review is tracked separately below. No Lighthouse scores, field Core Web Vitals, Google Rich Results Test outcome, actual inbox delivery, real-device phone handoff or production redirect tests are claimed here. Performance targets remain targets: LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 at the field 75th percentile.

Production Next Image supports WebP/AVIF and responsive sizes; the static review export serves original JPGs. The hero image is priority-loaded, dimensions are reserved, below-fold images lazy-load by default, motion is limited to lightweight CSS and respects reduced motion. There is no hero video, analytics script or autoplay download. External Google Fonts currently uses swap with system fallbacks; self-host font files before measuring the final deployment if avoiding that third party is required.

Schema JSON syntax is machine-checked; search eligibility and semantic validation require the external tools on the approved production URL. No ratings, pricing, geo coordinates, opening hours or unsupported certification fields are emitted. Static preview security headers depend on the Sites host; the Vercel Next build emits the configured response headers.

No client-facing CMS dashboard, approved testimonials or detailed project case-study pages are claimed. Structured content and a draft/review/publish Git workflow are provided. No file-upload endpoint is exposed; reference image attachment is handled by the visitor’s chosen app.

## Hosted browser review

Private preview accessed after the user authorized sign-in. Desktop (1440 × 1000) and mobile (390 × 844) browser viewports inspected. Portfolio filtering produced the expected two storefront entries; a project dialog showed the matching image and project-specific WhatsApp URL, and Escape dismissed it. Material selection updated the description and related service link; the day/night button updated the lighting state. The quote wizard retained acrylic signage, 12 × 3 ft dimensions, material and city into its final summary. Missing contact/consent correctly blocked a WhatsApp handoff with a visible error. No real message was sent.

Browser review found joined words where responsive CSS hid line breaks, a doubled heading punctuation mark, and inconsistent client navigation on the static host. Added whitespace at discretionary breaks, normalized heading punctuation, and selected native document links to avoid dependence on static-host RSC routing. Final browser verification follows deployment of these fixes. Lighthouse and physical mobile-device tests remain outstanding.
