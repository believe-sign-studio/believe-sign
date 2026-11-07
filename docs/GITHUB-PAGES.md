# GitHub Pages deployment

Target owner: Mukul1991 only. Target repository: believe-sign.
Planned repository URL: https://github.com/Mukul1991/believe-sign
Planned Pages URL: https://mukul1991.github.io/believe-sign/
Neither URL is evidence of creation or deployment.

## Build

Use Node 22 and `npm ci`, then `npm run build:pages`.
The lockfile records dependency versions; node_modules is installed by CI and is not committed.
The build exports the existing site, removes API routes from the static build only,
sets /believe-sign as the base path, validates links, images, metadata and video embeds,
and writes .nojekyll. TypeScript is checked by Next.js during the build.
Default Next.js/Sites builds retain their existing root path when NEXT_PUBLIC_BASE_PATH is unset.
No visual CSS or layout changes are required by this migration.

## Repository and deployment

The owner approved public deployment after the requested checks on 7 November 2026.
Only the Mukul1991 connection is used for repository writes.
The workflow builds on main pushes and pull requests; only main pushes or manual runs
in Mukul1991/believe-sign may deploy. GitHub Pages must use GitHub Actions as its source.
No environment secrets are required. Optional server email credentials must never be
committed or added to client variables. Keep node_modules, caches and .env secrets excluded.
The dependency manifest and lockfile are included; CI installs them using npm ci.

## Static hosting behavior

WhatsApp enquiries, email drafts, floating contact actions, gallery, material controls,
lighting toggle and YouTube embeds are preserved. Visitors must send the prepared message
in their app and manually attach reference images. GitHub Pages does not run the optional
Resend/Turnstile API endpoint. Its server source remains included for server-capable hosting.

## Verification limits

The export check confirms referenced image files and video embed markup; actual YouTube
playback depends on the video owner's embed permissions and network availability.
Local browser QA passed for both videos and homepage/form layouts at widths 320, 390, 768 and 1440.
