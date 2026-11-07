# Launch and rollback checklist

## Required before public launch

- Approve the brand direction, wording, business facts and recovered media rights. Confirm phone, WhatsApp and exact address. Replace the Facebook share URL with a stable official profile when supplied.
- Approve final project titles; supply detailed case studies and paired day/night photographs if available. The current explorer is a clearly marked simulation.
- Review the draft privacy text and agree a specific inbox retention schedule. Establish a process to answer deletion requests. No secure upload service is enabled; reference images are attached through visitors’ messaging apps.
- Confirm the proposed consultation/design/fabrication/checking/installation workflow. Do not infer quality certifications or electrical ratings from the website.
- Set up Vercel with `website` as its root. Add Resend and Turnstile environment variables, register the correct hostname and verify the email sending domain. Add host-level API rate limiting and re-run abuse and delivery tests. No production email delivery is claimed before an actual inbox test.
- Confirm the approved production domain. Configure HTTPS, www→apex and HTTP→HTTPS once. Build with `NEXT_PUBLIC_INDEXABLE=true` only on production; leave previews private/noindex.
- Test all form steps, consent, validation, phone/WhatsApp/email links on real mobile devices. Verify custom 404 status, errors, SMTP/provider failures and spam rejection. Check keyboard focus, native modal, menu, tabs and reduced motion.
- Run Lighthouse on mobile and desktop, Rich Results Test and Schema.org validator. Inspect actual metadata, canonical, sitemap and robots. Measure real-user LCP/INP/CLS after launch; lab scores cannot promise field results.

## Domain migration

1. Keep believesign.in online and retain its hosting/DNS. Export all old URLs from Search Console, analytics, sitemap, backlinks and logs; merge with `migration.csv` and resolve aliases found in the old About navigation.
2. Review each mapping. Unmatched specialist products currently map to the relevant solutions hub, which mentions them; add stronger landing content when original specifications become available. Do not blanket-redirect every page to `/`.
3. Back up old source, database, DNS zone and redirect configuration. Record current TTLs and rollback owner. Do not change MX records while changing website DNS.
4. Preview and validate the new production build before authorizing cutover. Verify old URL redirects on staging with `curl -I` or equivalent.
5. After explicit migration approval, install one-hop 301/308 redirects on the OLD host from the CSV, preserving meaningful paths. New-site configuration cannot redirect traffic that still lands on the old server. Avoid redirect chains and loops.
6. Verify both domains in Search Console, submit the new sitemap and use Change of Address where applicable. Update Google Business Profile and official social website links after approval. Do not alter addresses or create extra offices.
7. Monitor indexing, 404s, server errors, enquiries and organic landing traffic. Maintain old-domain redirects long term, at least one year; renew the old domain.

## Analytics

No GA4 code is installed. With authorized access, add consent-aware measurement for phone, WhatsApp, email, quote submission and project enquiries. Never include name, phone, email, free text or message URLs in event payloads. Use page/category identifiers only.

## Rollback

Keep the last approved Vercel deployment and old host backup. If cutover causes critical errors, redeploy the last known-good version or restore the prior DNS target and old-host configuration using the saved zone. Re-test contact paths and indexing directives. Document rollback time and any emails whose delivery could not be confirmed. Do not delete the old website during migration.
