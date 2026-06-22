# ARETION / Arkan Alray Co - Landing Page PRD

## Original Problem Statement
Create a visually appealing and informative landing page for ARETION Informatics Solutions (Now updated to Arkan Alray Co). The landing page should reflect the company's identity, provide comprehensive details about its disruptive technology for critical infrastructure, market opportunities, and competitive moat, and feature heavy SEO/GEO/AEO optimizations.

## Company Details
- **Company Name**: Arkan Alray Co (شركة أركان الراي)
- **Brand Name**: ARETION
- **Location**: King Abdullah Financial District (KAFD), Innovation Street, Al Aqiq, Building 7229, Riyadh 13519, Saudi Arabia
- **Contact**: +966 11 525 6458 | Contact@aretion.org
- **Platform URL**: https://platform.aretion.org/contact

## User Personas
- **Investors**: VCs, PE firms, and strategic investors evaluating growth opportunities
- **Government Entities**: Saudi Arabia and GCC municipalities seeking disaster management solutions
- **Healthcare Organizations**: Hospitals and health networks requiring emergency response systems
- **Strategic Partners**: Enterprise customers and potential acquirers

## Core Requirements
1. **Header**: Company logo and simplified navigation (Solutions, Why Us, Get In Touch)
2. **Hero Section**: Disruptive technology focus, mission statement, "Get In Touch" CTA
3. **Core Sections**: Solutions grid (9 items), Market Opportunity, Why We Win (Competitive Moat), Business Model, Capabilities (Mobile-optimized), Proven Impact ("Golden Minute"), Trust & Compliance (ISO, CSA STAR certifications)
4. **Visual Identity**: Professional, engaging visuals with Framer Motion animations
5. **Call to Action**: Prominent CTAs directing to `https://platform.aretion.org/contact`
6. **Footer**: Company Info (Arkan Alray Co), Riyadh KAFD Address, and copyright
7. **SEO/GEO/AEO**: Extensive JSON-LD schema, meta tags, local business, and voice search optimizations targeting Saudi Arabia/GCC
8. **Localization**: Complete formal Arabic translation of the landing page (RTL layout)

## Implementation Status - June 2026

### ✅ Completed Features
- [x] Header with ARETION logo and Arabic navigation
- [x] Hero section with disruptive technology messaging
- [x] All 9 solution cards with Arabic descriptions
- [x] Capabilities section with technical features
- [x] Market Opportunity section (qualitative, no exact figures)
- [x] Why We Win (Competitive Moat) section
- [x] Business Model section
- [x] Proven Impact "Golden Minute" section
- [x] Trust & Compliance section (ISO 27001, CSA STAR Level 2)
- [x] Contact section with 4 categories (Investors, Partnerships, Media, General)
- [x] Footer with Arkan Alray Co details and KAFD address
- [x] Optimized Framer Motion animations
- [x] Mobile responsiveness
- [x] Heavy SEO/GEO/AEO optimization in index.html
- [x] JSON-LD schemas (Organization, LocalBusiness, FAQPage, HowTo, Speakable)
- [x] Arabic Company Profiles (PDF & DOCX) generated
- [x] **Full Arabic Translation (RTL Layout) - COMPLETED June 2026**
  - HTML `dir="rtl"` and `lang="ar"` attributes
  - Arabic fonts (Tajawal, Noto Naskh Arabic)
  - RTL-specific CSS adjustments
  - All content translated with "sense-for-sense" approach

### Tech Stack
- Frontend: React + Tailwind CSS + Framer Motion
- Backend: FastAPI + MongoDB (legacy, unused)
- UI Components: Shadcn/UI + Lucide Icons
- Fonts: Tajawal, Noto Naskh Arabic (Google Fonts)
- Document Generation: reportlab, python-docx, arabic-reshaper, python-bidi

## Prioritized Backlog

### P1 - High Priority
- [ ] Refactor App.js (1200+ lines) into smaller components (HeroSection, SolutionsSection, Footer, etc.)
- [ ] Add explicit RTL Tailwind utilities where needed

### P2 - Medium Priority
- [ ] Remove legacy /api/contact backend endpoint (dead code)
- [ ] Replace partner logo placeholders with actual logos when available
- [ ] Add downloadable investor deck PDF

### P3 - Nice to Have
- [ ] Add language toggle (Arabic/English)
- [ ] Video embed for company overview
- [ ] Interactive case studies section

## Code Architecture
```
/app/
├── backend/
│   ├── .env
│   ├── requirements.txt
│   └── server.py                  # Legacy FastAPI app (unused)
├── frontend/
│   ├── public/
│   │   ├── index.html             # Heavy SEO/GEO/AEO schemas & meta tags
│   │   ├── ARETION_Company_Profile_Arabic.pdf
│   │   └── ARETION_Company_Profile_Arabic.docx
│   ├── src/
│   │   ├── App.css                # RTL-adjusted styles
│   │   ├── index.css              # Arabic fonts, RTL base styles
│   │   └── App.js                 # Full Arabic translation
│   └── package.json
├── generate_arabic_pdf.py
├── generate_arabic_word.py
└── memory/
    └── PRD.md
```

## Next Tasks
1. Consider refactoring App.js into component files for maintainability
2. Add partner logos when assets become available
3. Implement language toggle if English version is needed
