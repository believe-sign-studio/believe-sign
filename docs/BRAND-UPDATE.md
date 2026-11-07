# Brand update — 2 November 2026

Client requested a tone and typography similar to https://signocraft.in/index.php#about and supplied Believe Sign brand artwork.

Browser-computed reference styles: body background #050505, accent #FF5A00, body text #D4D4D8, Bricolage Grotesque body text, Fraunces headings. Applied this pairing and a consistent dark/orange palette across the existing original Believe Sign layouts, services, quotation form and footer. No competitor copy, imagery or code was imported.

`public/images/believe-sign-logo.jpg` is the client-supplied full poster from the provided Facebook CDN URL. Header/footer show its existing B emblem through a CSS crop; the source artwork is preserved intact. This replaces the provisional B-arrow symbol. The poster's other services and email address are not silently substituted for the previously verified website content. Client can supply a standalone SVG/transparent logo for a smaller header asset later.

The theme is isolated in `app/brand-theme.css` for maintainability. Font loading uses Google Fonts with swap and system fallbacks. Existing verified content, contact details, SEO routes and enquiry logic are preserved.
