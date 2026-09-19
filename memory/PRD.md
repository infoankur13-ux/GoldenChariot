# Golden Chariot Foodstuff Trading Co. LLC — PRD

## Original Problem Statement
Build a premium, responsive corporate home page for Golden Chariot Foodstuff Trading Co. LLC, a Dubai-based B2B foodstuff and rice trading company. Preserve the approved gold, warm cream, and dark-brown visual identity; use only realistic stock photography; do not invent business claims, certifications, customer reviews, or ratings.

## User Personas
- B2B rice importers, distributors, food processors, and buyers requesting quotations.
- Trading partners assessing product quality, supply coordination, and Dubai market access.
- Future food commodity and private-label customers.

## Current Architecture
- **Frontend:** Traditional multi-page static site. The original homepage remains `/app/frontend/public/index.html` with `style.css` and `script.js`; seven inner routes use shared `/app/frontend/public/inner.css` and `inner.js`.
- **Client-side behavior:** jQuery 3.7.1 for the homepage slider/carousel plus inner-page navigation, mobile drawer, quote/contact forms, catalogue filtering/search/load-more, reveal motion, and lightweight notifications.
- **Assets:** Official untouched logo at `/app/frontend/public/assets/logo/golden-chariot-logo.png`; remote real-stock photography from Unsplash, Pexels, and Wikimedia.
- **Serving:** `yarn start` runs `python3 -m http.server 3000 --directory public`; no React, Tailwind, TypeScript, or framework runtime is used.
- **Backend:** Existing FastAPI/MongoDB template is untouched. No backend flow is required for the present website.
- **Design tokens:** `/app/design_guidelines.json` remains the visual reference (gold #C5A059/#D4AF37/#E6CA65, cream #FAF7F2, ebony #1C1611; Cormorant Garamond, Plus Jakarta Sans, JetBrains Mono).

## Core Requirements
- Two-level sticky header, official logo, navigation, contact bar, quote CTA, mobile drawer, and WhatsApp action.
- Four-image automatic hero slider (Dubai, rice, rice fields, container logistics), smooth fades, and accessible dots.
- Trust bar, editorial rice marquee, four rice product cards, quality process, company story, and Dubai trade map.
- Global Trade/Sourcing photo gallery with Global Sourcing, Efficient Logistics, and Bulk Distribution cards.
- Google-style reviews carousel containing **only clearly labelled demo placeholders** until verified reviews are supplied.
- Private Label section framed as an **emerging/future capability**, not an established service.
- Quote and newsletter forms operate as clearly labelled frontend-only demos.
- Responsive layout and data test IDs for user-facing, interactive, and key informational elements.

## Implemented — 2026-09-19
- Converted the prior React/Tailwind prototype into a static HTML/CSS/jQuery site while preserving the existing content hierarchy, palette, CTAs, popup, footer, WhatsApp action, and responsive behavior.
- Installed the official unmodified landscape PNG logo in desktop header, mobile menu, footer, and favicon.
- Added hero slider, demo review carousel, Global Trade/Sourcing, and future-oriented Private Label sections using professional real-stock photography.
- Replaced framework serving with a simple static server command; project package manifest contains no React or Tailwind dependencies.
- Verification: Playwright frontend test report `/app/test_reports/iteration_1.json` passed at 100% (desktop/mobile, slider, modal validation/submit, carousel, responsive overflow, logo placement, WhatsApp). No blocking defects.

## Professional UI/UX Finishing Pass — 2026-09-19
- Preserved the approved section order, copy, palette, logo, and static HTML/CSS/jQuery architecture; no framework or page restructure was introduced.
- Curated and localized 11 high-resolution real-stock assets for Dubai, rice cultivation, cargo shipping, warehousing, sourcing, processing, private-label logistics, and the final CTA. Added responsive image ratios, crop control, lazy loading, async decoding, and high-priority loading for the first hero image.
- Replaced mixed text-glyph icons with a consistent custom SVG symbol library covering contact, navigation, trust, sourcing, process, benefit, social, carousel, modal, and WhatsApp controls.
- Refined typography hierarchy, body readability, section rhythm, card alignment, shadows, border radii, focus states, premium hover feedback, hero crossfades, carousel easing, and mobile modal ergonomics.
- Added restrained IntersectionObserver reveal motion with a fail-safe visible default, plus hero/review touch swipes, viewport-aware review dots, arrow disabled states, visibility-aware hero autoplay, and improved accessibility state handling.
- QA: `/app/test_reports/iteration_2.json` verified imagery, icons, interactions, modal flows, static runtime, and responsive behavior across 1920/1440 desktop, 768 tablet, and 390/320 mobile. Its reveal timing defect was subsequently fixed and self-verified at 1920, 768, 390, and 320 widths with zero hidden content and zero horizontal overflow. JavaScript syntax, CSS structure, and all local assets also passed final checks.

## Icon Rendering Bug Fix — 2026-09-19
- Removed all external SVG sprite `<use>` references and deleted the obsolete `assets/icons.svg` dependency.
- Embedded self-contained inline SVG geometry for all 41 interface icons while preserving the approved gold/currentColor styling, dimensions, alignment, and layout.
- Targeted desktop/mobile regression verification passed in `/app/test_reports/iteration_3.json`: 41/41 icons contain inline geometry, with zero external sprite references, blank icons, zero-size visible icons, or icon-related console errors.

## Seven Static Inner Pages — 2026-09-19
- Created seven new screenshot-directed routes without modifying the existing homepage: `/about-us/`, `/quality/`, `/global-presence/`, `/contact-us/`, `/other-products/`, `/rice-products/`, and `/rice-products/1121-basmati-rice/`.
- Added shared `inner.css` and `inner.js` design-system files that reproduce the homepage header, footer, inline SVG icons, quote modal, mobile drawer, toast notifications, and WhatsApp action while keeping the homepage isolated.
- Implemented all requested page sections: About story/stats/journey/purpose/sourcing/commitment; quality workflow/testing/safety/storage/compliance; global map/regions/logistics/partner benefits; contact details/enquiry/location/support; emerging commodity categories; searchable/filterable rice catalogue; and detailed 1121 product information/specifications/packaging/applications/quality journey.
- Added 17 locally hosted real-stock page assets for rice, commodity categories, quality inspection, warehouses, logistics and map visuals. Product packaging visuals are clearly illustrative mockups.
- Added working route navigation, responsive category filters, product search, load-more behavior, the 1121 detail link, contact/quote form validation, and mobile navigation. All interactive and key informational elements include unique `data-testid` attributes.
- Verification: `/app/test_reports/iteration_4.json` passed all seven routes, shared components, navigation, catalogue interactions, form flows, desktop/mobile responsiveness, image loading, and homepage isolation. A synthetic jump-scroll reveal edge case was subsequently hardened and self-verified across all seven routes at 390px with zero hidden sections or horizontal overflow.

## Decisions and Current Limitations
- **MOCKED:** Quote enquiries and newsletter submissions show local success notifications only; no data is stored or emailed.
- **MOCKED:** The new Contact enquiry form also shows a local success notification only; no data is stored or emailed.
- **MOCKED:** Reviews, rating, customer names, and dates are labelled demo placeholders and are not real Google data.
- **ILLUSTRATIVE:** Inner-page product specifications, commodity availability, packaging mockups, market descriptions, and compliance-document examples require client confirmation before publication as verified commercial claims.
- Social links, search, legal pages, and future navigation destinations show a lightweight “being prepared” message.
- The legacy `/app/frontend/src` files are retained only as historical reference and are not served or loaded by the site.
- Preview infrastructure may emit intermittent Cloudflare challenge/RUM `net::ERR_ABORTED` entries during automated browser shutdown; all required website assets and user flows load successfully.

## Prioritized Backlog
### P0
- Replace demo enquiry submission with a MongoDB-backed endpoint and email notification workflow.
- Obtain real social URLs and approved business contact/address details.
- Replace review placeholders with client-approved verified Google review content or an approved feed.

### P1
- Add a full rice catalogue and approved product specifications.
- Publish Private Label only when business confirms service availability and final terms.

### P2
- Privacy Policy and Terms pages, approved map embed, trade insights/blog, Arabic locale, and approved customer case studies.

## Next Action Items
1. Client visual review of the seven screenshot-matched inner pages.
2. Confirm live product specifications, market coverage, commodity availability, certification wording, office details, and packaging options.
3. Confirm a live quote/contact handling preference to replace frontend-only demo submissions.
4. Supply verified reviews and social destinations.