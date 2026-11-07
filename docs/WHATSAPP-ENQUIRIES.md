# WhatsApp quotation update

The default final action opens WhatsApp with the complete enquiry: name, mobile, optional email, signage type, approximate dimensions and unit, material, lighting, installation city, requirements and reference-image intent. Visitors still press Send in WhatsApp. No website message claims WhatsApp delivery.

The old file picker was removed. Step 2 explicitly explains that photos/logos must be attached in WhatsApp. Visitors can mark that they have an image; the final review and message remind them to attach it. There are no image uploads or image storage.

Email drafts contain the same details and open in the visitor's email app. A combined email-and-WhatsApp action is shown only in the server build when Resend, sender and Turnstile configuration are present. It verifies email delivery before opening WhatsApp, and offers WhatsApp/email-draft alternatives on failure. The private static Site uses WhatsApp and email-draft handoffs; no direct email delivery is asserted.

Desktop has a compact floating WhatsApp/Call dock. Phones retain the bottom Call/WhatsApp/Quote bar with recognizable icons, avoiding a second floating overlay over form fields. The header and enquiry sections retain quotation actions.

Form fields now have explicit labels and IDs, readable units, separated spacing, a review table, contact consent and clear attachment/send instructions. The quotation page uses descriptive local signage copy without repeating keywords artificially.

Verification: production build, strict TypeScript, lint, message URL encoding tests and mocked server-delivery checks. Browser checks cover field retention, reference-image messaging, validation, handoff URLs, floating actions and mobile overflow. No real enquiry messages are sent during verification.
