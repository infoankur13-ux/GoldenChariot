# Golden Chariot Foodstuff Trading Co. LLC — PRD

## Original Problem Statement
Build a premium, responsive corporate home page for Golden Chariot Foodstuff Trading Co. LLC, a Dubai-based B2B foodstuff and rice trading company. Preserve the approved gold, warm cream, and dark-brown visual identity; use only realistic stock photography; do not invent business claims, certifications, customer reviews, or ratings.

## User Personas
- B2B rice importers, distributors, food processors, and buyers requesting quotations.
- Trading partners assessing product quality, supply coordination, and Dubai market access.
- Future food commodity and private-label customers.

## Current Architecture
- **Frontend:** Traditional static site only — `/app/frontend/public/index.html`, `style.css`, and `script.js`.
- **Client-side behavior:** jQuery 3.7.1 for the hero slider, review carousel, mobile menu, quote modal/forms, smooth section scrolling, and lightweight notifications.
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

## Decisions and Current Limitations
- **MOCKED:** Quote enquiries and newsletter submissions show local success notifications only; no data is stored or emailed.
- **MOCKED:** Reviews, rating, customer names, and dates are labelled demo placeholders and are not real Google data.
- Social links, search, legal pages, and future navigation destinations show a lightweight “being prepared” message.
- The legacy `/app/frontend/src` files are retained only as historical reference and are not served or loaded by the site.

## Prioritized Backlog
### P0
- Replace demo enquiry submission with a MongoDB-backed endpoint and email notification workflow.
- Obtain real social URLs and approved business contact/address details.
- Replace review placeholders with client-approved verified Google review content or an approved feed.

### P1
- Build static inner pages for About, Rice Products and individual product details, Quality, Global Presence, and Contact.
- Add a full rice catalogue and approved product specifications.
- Publish Private Label only when business confirms service availability and final terms.

### P2
- Privacy Policy and Terms pages, approved map embed, trade insights/blog, Arabic locale, and approved customer case studies.

## Next Action Items
1. Client review of the static home page and confirmation of live quote-handling preference.
2. Supply verified reviews, social destinations, and any finalized contact details.
3. Select the first inner page or catalogue scope for implementation.