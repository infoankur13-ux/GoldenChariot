# Golden Chariot Foodstuff Trading Co. LLC — PRD

## Original Problem Statement
Premium, modern, responsive corporate website for Golden Chariot Foodstuff Trading Co. LLC, a Dubai (UAE) based foodstuff trading company. Current focus: rice trading & supply; future expansion into other food commodities. Step 1 = website foundation + HOME PAGE only (real functional website, reusable components, not a static image). Visual direction: client-approved reference (gold + cream + dark brown, premium B2B, rice-focused). Real stock photography only (no AI-looking images). No invented stats/certifications/facts.

## User Personas
- B2B rice importers / distributors / food processors requesting quotes
- Trading partners evaluating credibility & supply reliability
- Future food-commodity buyers (Other Products = future expansion)

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + lenis (smooth scroll) — single home page composed of reusable components in /app/frontend/src/components (Header, Hero, TrustBar, Marquee, Products, Quality, About, GlobalPresence, CtaBanner, Footer, QuoteModal, WhatsAppFloat, Logo, Reveal) + /app/frontend/src/data/content.js (single source of copy & images)
- Backend: FastAPI + MongoDB template untouched (no backend needed yet — enquiry form is frontend-only per client decision)
- Design tokens: /app/design_guidelines.json (gold #C5A059/#D4AF37/#E6CA65, cream #FAF7F2, ivory #FDFCF7, ebony #1C1611; Cormorant Garamond + Plus Jakarta Sans + JetBrains Mono)

## Core Requirements (static)
Two-level sticky header with contact bar & socials; kinetic hero (masked line reveal, Dubai skyline + arch rice portrait, parallax, rotating badge); 4 trust highlights; editorial marquee; 4 rice product cards; 5-step quality process; about section with benefits; global presence map with Dubai hub + animated trade arcs (no fake stats); final CTA banner; dark gold footer with newsletter; shared Get-a-Quote enquiry modal (frontend-only, success toast); floating WhatsApp button (+971 50 123 4567); fully responsive; subtle premium animations; semantic/SEO markup; data-testids on interactive elements.

## Implemented (2026-09-12)
- Full home page per spec with verified real stock photography (Unsplash/Pexels/Wikimedia, all URLs 200-checked, visually verified)
- Quote modal wired to every CTA (Get a Quote, Contact Us, Contact Us Now, product "View Details" presets the product interest, footer product links)
- Newsletter + social/placeholder links use sonner toasts
- Verified: hero reveal, products, quality, global map, CTA, footer, modal submit → toast → close, mobile menu, no horizontal overflow, backend /api health

## Decisions
- Logo: coded gold chariot-wheel emblem + wordmark placeholder (client to upload official logo file — swap in Logo.jsx)
- Unbuilt pages (About/Rice/Other Products/Quality/Global/Contact pages, Privacy, Terms, search, socials) show "launching soon" toasts
- Enquiry form is frontend-only (MOCKED — no storage/email yet)

## Backlog
- P0: Backend enquiry endpoint (MongoDB) + email notification (Resend) for the quote form; official logo upload & swap
- P1: Inner pages: About Us, Rice Products catalogue (4 product detail pages), Other Products, Quality, Global Presence, Contact Us; search
- P2: Privacy Policy / Terms pages, testimonials (client-approved only), blog/trade insights, Google Maps embed, multi-language (EN/AR)

## Next Tasks
1. Ask client for official logo file + real social URLs
2. Wire enquiry form to backend + Resend email to info@goldenchariot.ae
3. Build About Us & Rice Products inner pages reusing existing components
