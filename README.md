# Believe Sign — Crafted to Be Seen

Next.js App Router / TypeScript website for Believe Sign, Siliguri. The source lives in this `website` folder. Real photographs were recovered from the existing company website; no generated installation images, invented testimonials, statistics or awards are used.

## Run and deploy

Requires Node 22+ and npm. From this folder:

```powershell
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
npm start
```

For Vercel, import this folder as the project root. `vercel.json` selects Next.js. Copy `.env.example` to `.env.local` locally; configure secrets in Vercel rather than committing them. Production uses the full Next server and optimized Next Image. A private Sites review deployment uses a static export and original images, with WhatsApp/email handoffs. `node scripts/build-preview.mjs` produces that review export in `out` and restores the server route afterwards; stop running Next servers before this command on Windows.

Do not launch the new domain or change DNS until the launch checklist is approved. Keep `NEXT_PUBLIC_INDEXABLE=false` on previews. Set it to `true` and rebuild only for the approved production deployment. Canonicals, sitemap and JSON-LD target `https://believesign.com`. Set apex-domain redirects at the host after ownership verification.

## Quotation delivery

The wizard validates fields and prepares complete WhatsApp and mailto messages. Visitors review and send these themselves. Optional images remain on the device and must be attached in the selected app. The site deliberately has no upload endpoint or public file storage.

`POST /api/enquiry/` is available in the Vercel build. It validates with Zod, checks same-origin JSON requests, limits request size, enforces consent and a honeypot, verifies a one-time Turnstile token and hostname, then sends a text-only Resend email. It does not log enquiry bodies or store a database copy. It fails closed with HTTP 503 until `RESEND_API_KEY`, `ENQUIRY_FROM`, and `TURNSTILE_SECRET_KEY` are set. Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` at build time and register the production hostname in Turnstile. Verify the sending domain in Resend. Add host-level rate limits before production. End-to-end inbox delivery has not been tested without these credentials.

## Content and editorial workflow

Business contacts, service copy, FAQs and the portfolio are separated into `content/business.ts`. Replace photographs in `public/images`; add the approved image filename, category, title and descriptive alt text to the project collection. Service metadata and sitemap derive from that collection. Page-level editorial content is in `app/[slug]/page.tsx`; the first planning guide is in `app/blog/[slug]/page.tsx`.

Use a draft Git branch and Vercel preview for edits. Review accuracy, media permission, spelling, accessibility and SEO, then merge to publish. This is a structured content system, not a nontechnical CMS dashboard. Sanity is not connected or billed. A future CMS can supply the same typed collections once an account and editorial roles are approved. Keep unpublished case studies and testimonials out of the exported collections. Add project detail routes only after original case-study facts have been reviewed.

## Delivery documents

- `docs/AUDIT.md`: verified facts, limitations, references and design direction.
- `docs/legacy-inventory.json`: fetched legacy URL status, titles and descriptions.
- `docs/migration.csv`: per-URL proposed destinations.
- `docs/KEYWORDS.md`: intent-to-page map, with no invented volume data.
- `docs/LAUNCH.md`: configuration, approvals, launch and rollback.
- `docs/QA.md`: checks actually performed and unmeasured targets.

Legacy HTML snapshots are retained under `docs/legacy-*.html` for audit evidence. They are not shipped in the static public output.
