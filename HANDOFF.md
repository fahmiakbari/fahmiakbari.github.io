# Portfolio — English only

## Current user requirements

The top navigation contains exactly About, Project, Approach, and Contact, linking to #about, #projects, #approach, and #contact. The other sections remain in the page.

The website is now English only. The user explicitly requested removing the Indonesian version and EN/ID controls. Do not restore multilingual behavior unless requested. The old language preference in browser storage is no longer read or used.

Keep the light white/charcoal/deep-blue/burgundy design. Data Snapshot is removed; the portrait area is smaller; Experience, Education, and Certificates are separate sections. Personal details and certificate entries are placeholders because no real details have been provided.

## Deployable files

- index.html: English content and base styles.
- editorial.css: theme and responsive styles.
- site.js: mobile menu, active navigation, project filters, current year.
- .nojekyll: optional GitHub Pages compatibility file.

Place all four files together at the site root. No build step or backend is required. The translation file has been removed and must not be referenced. Navigation labels and project-count feedback are maintained in English by site.js.

## Editing content

The Certificates section uses a full-width responsive grid: three columns on desktop, two at 900px and below, and one at 650px and below. Twelve placeholder entries are provided. With JavaScript enabled, six entries display initially; Show more certificates reveals another six per click. Once all entries are visible, Show fewer certificates returns to six. The count is derived from the actual list, so more than twelve entries are supported. Without JavaScript all entries remain visible, and print styles also show every entry.

Duplicate or remove a .certificate-item in index.html to match the real collection and update its visual number. No fixed maximum is imposed. Replace all placeholder names, issuers, dates, and pending-link text with verified content before presenting the collection as real credentials.

Edit copy, the document title, and description directly in index.html. Add real certificate names, issuers, dates, and verification links to the certificate list. Replace the pending-link text with an anchor only when a real link is available. Do not invent credentials or results.

To activate real contact links, replace the placeholder span with an anchor and verified URL or mailto address, remove placeholder-contact and aria-disabled, and update its accessible label.

## Hosting

This version has not been deployed. In this session, Sites returned “Sites project not found” for the original project appgprj_6abd0a1a65f881919b8e81afa5c5cd81. No replacement project was created or sharing settings changed.
