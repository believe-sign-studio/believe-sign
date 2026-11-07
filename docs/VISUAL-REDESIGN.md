# Visual refactor — 2 November 2026

## Findings in the existing implementation

- `globals.css` made the homepage hero a two-column grid with fixed 570–720 px rows. Its landscape photograph used `fill` and `object-fit: cover` inside a narrow vertical container, cropping the Prince Lodge lettering.
- The caption was absolutely positioned inside that crop. Shorter/mobile variants could move the caption/action close to the edges.
- `.project:nth-child(even)` added 45–55 px offsets, leaving uneven gallery gaps.
- An all-dark theme and repeated serif/italic headings obscured the hierarchy between services, work, workshop, studio and enquiries.
- Several fixed/minimum heights and tiny labels reduced mobile readability.

## Changes

The homepage remains the same Next.js route and uses the same business data, photographs and interactive components. The hero now uses a content-driven editorial introduction and a full-width image at its natural 1080 × 476 ratio; the caption and portfolio action live in their own normal-flow row. The quote action precedes the photograph on mobile and desktop.

Warm ivory, charcoal and muted architectural gray sections replace the uniform dark field. Sans headings, an occasional serif line, and photographic sections vary the rhythm. Orange is limited mainly to quotation actions and small cues. Six image-led service tiles point to the existing family pages; 2D and glow signage remain linked below them. Project cards have aligned rows, natural image composition and factual photograph descriptions. The workshop image keeps its complete composition. The material/light explorer retains all six materials and explicitly labels the simulation. Enquiry actions include the wizard, WhatsApp and phone, with an added desktop header phone link.

Routes, existing page metadata, canonical logic, schema, sitemap/robots, service copy, quotation validation and server endpoint are preserved. Header/footer use the client-supplied B emblem. No stock or invented project media has been introduced.

## Verification

Production Next.js build with the server enquiry route: passed. Strict TypeScript compilation and ESLint: passed before the final sizing adjustment. The review export and per-page SEO checks are repeated before packaging. Browser inspection covers the requested 320, 375, 390, 430, 768, 1024, 1440 and 1920 px widths; final observations are delivered in the workspace review report. No field Core Web Vitals or Lighthouse result is asserted.
