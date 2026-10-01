# Data Analyst Portfolio — Editorial redesign

## Status

Local redesign only. Nothing has been published or pushed to GitHub.
The name Fahmi Akbari and profile portrait were supplied by the owner and are installed. Other personal details, project examples, project screenshots, and certificate entries remain placeholders. Keep placeholders visible until verified content is supplied.

## Design

Warm ivory for reading, deep green for the project gallery and contact section, terracotta for emphasis, and pale chartreuse for dark-surface controls. Large sans-serif titles pair with editorial serif accents. The featured project has a wide image area and adjacent case notes; later projects form a two-column gallery. Experience and Education use separate chronological sections. Certificates use an expandable indexed collection.

## Files and GitHub Pages

- index.html: all content and accessible page structure.
- editorial.css: entire visual design, responsive, print, and reduced-motion styles.
- site.js: menu, section navigation indicator, project filters, certificate expansion, year.
- assets/fahmi-akbari.png: owner-supplied portrait; upload the assets folder too.
- .nojekyll: static GitHub Pages compatibility.
- HANDOFF.md: this guide; it is not required to render the website.

No build, installation, external fonts, services, or backend required. Open index.html directly to preview. CSS and scripts use relative paths and work on both username.github.io and username.github.io/repository/.

When ready, extract the ZIP and upload its CONTENTS into the same GitHub Pages folder as the existing index.html. Do not upload the ZIP itself or leave the files inside an extra portfolio-redesign folder. Keep the existing Pages branch/folder setting. Updating a published repository will publish your changes; do that only after approving the preview.

## Replace the content

1. Search index.html for square brackets. Replace names, location, biography, roles, schools, and contact details with your verified information. Update the title, description, brand's accessible label, fa. monogram, and footer.
2. Remove the Portfolio in progress label only when the portfolio is ready.
3. Replace the sample tool lists with tools you actually use. Update the Approach framework if your process differs.
4. Edit or remove the sample projects. Each .project has a data-category attribute. Use dashboard, python, and/or sql, separated by spaces, to keep the existing filters working.
5. For each project, fill The question, The approach, and The outcome. Include data source, your actual contribution, verified findings, and limitations. Remove the Placeholder badge and sample-project notice only after replacing the sample content. Never insert invented metrics.

## Replace your portrait

Your supplied portrait is already installed at assets/fahmi-akbari.png. To use a different photo later, save it as assets/portrait.jpg. Replace all content INSIDE .portrait-slot with:

```html
<img src="assets/portrait.jpg" alt="Portrait of Your Name" width="400" height="500">
```

Update the parent aside's aria-label to Profile photo. The portrait stays small on desktop and mobile. Use a 4:5 crop if possible.

## Add real project screenshots

Save images in assets with simple lowercase filenames. Replace the content INSIDE the relevant .project-image with:

```html
<img src="assets/retail-dashboard.png" alt="Describe the real dashboard and the information it shows" width="1600" height="1000" loading="lazy">
```

Prefer a 16:10 screenshot with readable chart labels. The CSS preserves the full image without cropping. Replace Discuss this project with a real repository, dashboard, or case-study URL when available; currently these links correctly lead to Contact.

## Certificates: any collection size

The collection initially shows six entries; Show more certificates reveals the next six. Once all entries are visible, Show fewer certificates returns to the first six. The count comes from the actual collection, with no hard-coded maximum. Without JavaScript and in print, all entries are visible.

Duplicate or remove a complete li.certificate-item. Update the number, title, issuer, and date. Replace the certificate-pending span with a real verification link, for example:

```html
<a href="YOUR_VERIFIED_CERTIFICATE_URL">View certificate <span aria-hidden="true">↗</span></a>
```

Use the provider's actual verification URL or an assets/certificate-name.pdf file. Keep credentials in chronological or thematic order. No invented credentials.

## Activate contact links

Replace the email-placeholder span with an anchor using the same class and a verified mailto address. Replace each social-placeholders child span with an anchor using the real LinkedIn, GitHub, or portfolio URL. Remove URL pending and Contact details coming soon once completed. Pending details are deliberately plain text, not fake working buttons.

## Preserve these requirements

- English only; no language selector.
- Navigation: About, Project, Approach, Contact.
- Experience, Education, Certificates stay distinct.
- Do not restore Data Snapshot.
- Preserve filtering, keyboard focus visibility, Escape menu behavior, skip link, reduced-motion support, and live count announcements.
- The mobile navigation breakpoint is 760px in both CSS and JavaScript.

## Preview files

Desktop and mobile screenshots are supplied separately from the website ZIP. They are previews, not assets needed by the website.

## Validation performed

Checked layouts at 320, 390, 768, and 1440 CSS pixels with no horizontal overflow. Verified all four project filters, six-to-twelve certificate expansion and collapse, menu activation by keyboard, Escape returning focus to the menu, and section links. All internal link targets exist; browser console reported no errors. Checked rendered text color pairs against WCAG AA contrast thresholds. This is targeted browser QA, not a formal accessibility certification.


