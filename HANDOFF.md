# Fahmi Akbari portfolio — Hallmark folio edition
Updated 7 November 2026. Not published.

## Canonical website
Static HTML/CSS/JS for GitHub Pages. Homepage: index.html. Detail route: projects/inventory-monitoring.html.
CSS and JS query version: folio-1.
All required assets are local. System fonts: Constantia / Iowan Old Style / Georgia for display, Segoe UI / Arial for body. Rendering can differ by OS.

## Design and interactions
Graphite background, warm silver accents, serif name and section headings.
Project presentation follows the owner's WhatsApp video: one large scene, two selectable covers, next/previous controls and a cover expansion transition.
Keyboard arrow navigation, touch swipe, category filters, reduced motion and no-JavaScript fallbacks.
No autoplay. Native details preserve the existing problem/methods/findings placeholders.
Case study opens in the same tab.
Education and Experience remain separate. No Professional Training heading.
Certificates show six initially and expand to all seven.

## Assets and facts
fahmi-akbari.png: owner-provided portrait.
assets/inventory.jpg, assets/cohorts.jpg, assets/freight.jpg: generated geometric illustrations for project covers, NOT dashboard screenshots or evidence of results.
Project placeholders remain marked. Replace these with real project material when ready; 1400x780 or larger landscape images are recommended.
No stock photos, third-party fonts or external script dependencies.
Email from the owner's supplied banner: fahmiakbari.id@gmail.com.
LinkedIn from supplied profile screenshot: https://www.linkedin.com/in/fahmiakbarii/
GitHub from the previously supplied repository owner: https://github.com/fahmiakbari

## Copy changes
Removed redundant numbered section eyebrows; preserved section headings and anchor IDs.
Hero shortened from 'I analyze data to understand what’s happening in a business, where problems arise, and what can be improved. My experience in operations helps me turn findings into practical recommendations.'
to 'I use data to investigate business problems and guide practical decisions.'
Projects heading is now 'Project collection'.
Project summaries shortened, while placeholder details remain.
Contact placeholders replaced with previously supplied contact information.
Credentials, education dates, employment dates and descriptions preserved.

## Upload
Extract the ZIP and upload its CONTENTS into the repository root:
index.html, editorial.css, site.js, fahmi-akbari.png, .nojekyll, assets/ and projects/.
Keep folder structure. Do not upload the ZIP itself or put everything in another folder.
Both assets/ and updated site.js are REQUIRED for the gallery.

## Verification
Edge: desktop 1366x768, mobile 390x844, tablet 820x1024, wide 1920x1080.
Additional fold checks at 1280x800, 1440x900 and 375x812.
Verified gallery selection, filters, disabled controls for a single result, native project details, certificate expansion, mobile menu, same-tab route, image loading and no horizontal overflow.
Keyboard switching, transition cleanup and no-JavaScript visibility checked separately.
Hallmark static lint: zero Floor failures and zero Reflex findings; render tier unavailable because puppeteer-core is absent. Visual verification performed separately through Playwright/Edge.
Subagent review unavailable due to its usage limit; final visual review performed in-thread.
Existing system fonts and temporary cover illustrations are the main limitations.

## Workflow layout revision
Homepage CSS version workflow-2. Four connected steps run left to right on desktop, top to bottom at 900px and below. Copy is unchanged. Desktop/mobile screenshots verified. For this revision upload index.html and editorial.css.


## Cinematic project detail revision
Three project routes now exist: projects/inventory-monitoring.html, projects/customer-churn.html, projects/supply-chain.html.
Homepage gallery View project links open each route in the same tab. Each route links to the next preview and back to the portfolio.
Shared project-story.css?v=story-1 and project-story.js?v=story-1 are required in the repository root.
Design follows the two supplied videos (22.01.31 and 22.01.33): full-image introduction, alternating reading/visual areas, side-navigation for method panels, broad contrasting sections, illustrated transition, and next-project ending.
The homepage design and connected four-step Approach layout remain unchanged.
Case-study copy is still explicitly placeholder material: no unverified results or metrics were introduced.
assets/warehouse-story.png is an original built-in Imagegen illustration, not a photograph of the employer's warehouse or a real dashboard.
The customer and supply-chain previews use the existing cohorts.jpg and freight.jpg illustrated covers.
Methods use accessible vertical tabs with Up/Down/Home/End keys and focus states. Without JavaScript, all panels are visible and tab controls are hidden.
Chapter links maintain an active indicator. Header height is measured to keep anchors clear, including after resizing. Scroll respects reduced-motion preferences.
QA: all three routes tested at 1366x900, 390x844, 320x740 and 820x1024; no horizontal overflow, all images loaded, tab switching and focus worked, back/next links worked, no JS exceptions. Local relative asset and fragment links verified.
Upload the entire package contents, retaining assets/ and projects/. This is not an index.html-only update.
Not published. Actual screenshots and verified findings remain the key missing material.
