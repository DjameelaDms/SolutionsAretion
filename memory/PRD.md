# ARETION / Arkan Alray Co - Landing Page PRD

## Original Problem Statement
Create a visually appealing and informative landing page for ARETION Informatics Solutions (Now updated to Arkan Alray Co). The landing page should reflect the company's identity, provide comprehensive details about its disruptive technology for critical infrastructure, market opportunities, and competitive moat, and feature heavy SEO/GEO/AEO optimizations.

## Company Details
- **Company Name**: Arkan Alray Co
- **Brand Name**: ARETION
- **Location**: King Abdullah Financial District (KAFD), Innovation Boulevard, Al Aqeeq, Building 7229, Riyadh 13519, Saudi Arabia
- **Contact**: +966 11 525 6458 | Contact@aretion.org
- **Platform URL**: https://platform.aretion.org/contact

## Implementation Status - June 2026

### ✅ Completed Features
- [x] Header with ARETION logo and navigation (Solutions, Why Us, Get In Touch)
- [x] Hero section with disruptive technology messaging
- [x] All 9 solution cards with descriptions and background images
- [x] Capabilities section with technical features
- [x] Market Opportunity section ($500B+ addressable market)
- [x] Why We Win (Competitive Moat) section
- [x] Business Model section with revenue distribution
- [x] Proven Impact "Golden Hour → Minute" section
- [x] Trust & Compliance section (ISO 27001, CSA STAR Level 2)
- [x] Contact section with 4 categories (all link to platform.aretion.org/contact)
- [x] Footer with Arkan Alray Co details and KAFD address
- [x] Optimized Framer Motion animations
- [x] Mobile responsiveness
- [x] Heavy SEO/GEO/AEO optimization in index.html
- [x] JSON-LD schemas (Organization, LocalBusiness, FAQPage, HowTo, Speakable)
- [x] Arabic Company Profiles (PDF & DOCX) generated
- [x] **English Language Version** - Primary language

### Tech Stack
- Frontend: React + Tailwind CSS + Framer Motion
- Backend: FastAPI + MongoDB (simplified, status endpoints only)
- UI Components: Shadcn/UI + Lucide Icons
- Fonts: Playfair Display (Google Fonts)
- Document Generation: reportlab, python-docx, arabic-reshaper, python-bidi

### SEO/GEO/AEO Implementation
- **SEO**: Title tags, meta descriptions, keywords, canonical URLs, Open Graph, Twitter Cards
- **GEO**: geo.region, geo.placename, geo.position, LocalBusiness schema, areaServed
- **AEO**: FAQPage schema, HowTo schema, Speakable specification for voice search

## Code Architecture
```
/app/
├── backend/
│   ├── .env
│   ├── requirements.txt
│   └── server.py                    # Simplified (health check only)
├── frontend/
│   ├── public/
│   │   ├── index.html               # Heavy SEO/GEO/AEO schemas
│   │   ├── ARETION_Company_Profile_Arabic.pdf
│   │   └── ARETION_Company_Profile_Arabic.docx
│   ├── src/
│   │   ├── components/ui/           # Shadcn components
│   │   ├── App.css                  # Styles
│   │   ├── index.css                # Base styles
│   │   └── App.js                   # Main app (English)
│   └── package.json
└── memory/
    └── PRD.md
```

## Prioritized Backlog

### P2 - Medium Priority
- [ ] Add downloadable investor deck PDF
- [ ] Add partner/client logos when assets become available
- [ ] Add testimonials with real quotes (when available)

### P3 - Nice to Have
- [ ] Video embed for company overview
- [ ] Interactive case studies section
- [ ] Blog/News section integration
- [ ] Arabic language toggle (optional)

## Key Links
- **Contact**: https://platform.aretion.org/contact
- **Advisors/Team**: https://platform.aretion.org/advisors
- **Preview**: https://aretion-preview-1.preview.emergentagent.com
