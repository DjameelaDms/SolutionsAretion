# ARETION / Arkan Alray Co - Landing Page PRD

## Original Problem Statement
Create a visually appealing and informative landing page for ARETION Informatics Solutions (Now updated to Arkan Alray Co). The landing page should reflect the company's identity, provide comprehensive details about its disruptive technology for critical infrastructure, market opportunities, and competitive moat, and feature heavy SEO/GEO/AEO optimizations.

## Company Details
- **Company Name**: Arkan Alray Co (شركة أركان الراي)
- **Brand Name**: ARETION
- **Location**: King Abdullah Financial District (KAFD), Innovation Street, Al Aqiq, Building 7229, Riyadh 13519, Saudi Arabia
- **Contact**: +966 11 525 6458 | Contact@aretion.org
- **Platform URL**: https://platform.aretion.org/contact

## Implementation Status - June 2026

### ✅ Completed Features
- [x] Header with ARETION logo and bilingual navigation
- [x] Hero section with disruptive technology messaging
- [x] All 9 solution cards with descriptions (7 with images, 2 without)
- [x] Capabilities section with technical features
- [x] Market Opportunity section (qualitative, no exact figures)
- [x] Why We Win (Competitive Moat) section
- [x] Business Model section
- [x] Proven Impact "Golden Minute" section
- [x] Trust & Compliance section (ISO 27001, CSA STAR Level 2)
- [x] Contact section with 4 categories
- [x] Footer with Arkan Alray Co details and KAFD address
- [x] Optimized Framer Motion animations
- [x] Mobile responsiveness
- [x] Heavy SEO/GEO/AEO optimization in index.html
- [x] JSON-LD schemas (Organization, LocalBusiness, FAQPage, HowTo, Speakable)
- [x] Arabic Company Profiles (PDF & DOCX) generated
- [x] **Full Arabic Translation (RTL Layout) - COMPLETED**
- [x] **Full English Translation (LTR Layout) - COMPLETED**
- [x] **Bilingual Language Toggle** - Globe icon switches AR/EN with localStorage persistence
- [x] **Link Updates - June 2026**:
  - "تواصل معنا / Get In Touch" → https://platform.aretion.org/contact
  - "تعرف على فريقنا / Meet Our Team" → https://platform.aretion.org/advisors
  - All contact categories → https://platform.aretion.org/contact
- [x] **Backend Cleanup - June 2026**: Removed legacy /api/contact endpoint
- [x] **Solution Images Fixed - June 2026**: Updated with accessible Unsplash/Pexels URLs
- [x] **Icons RTL Fixed - June 2026**: All icons now properly positioned for RTL
- [x] **Text Updates - June 2026**:
  - "لماذا ننتصر" → "لماذا لا يوجد منافس لنا"
  - "طويل الأجل" → "طويل الأمد"  
  - Golden Minute: "الاستجابة من أول دقيقة - الدقيقة الذهبية"
  - "جميع المنتجات جاهزة للنشر" → "جاهزة للسوق"
  - "الولايات القضائية" → "الكثير من الدول"
- [x] **MAJOR REFACTOR - June 2026**: App.js reduced from 1261 lines to 54 lines
  - Created 12 separate component files
  - Created LanguageContext for state management
  - Created translations.js with full AR/EN content

### Tech Stack
- Frontend: React + Tailwind CSS + Framer Motion
- Backend: FastAPI + MongoDB (simplified, status endpoints only)
- UI Components: Shadcn/UI + Lucide Icons
- Fonts: Tajawal, Noto Naskh Arabic (Google Fonts)
- Document Generation: reportlab, python-docx, arabic-reshaper, python-bidi

### SEO/GEO/AEO Implementation
- **SEO**: Title tags, meta descriptions, keywords, canonical URLs, Open Graph, Twitter Cards
- **GEO**: geo.region, geo.placename, geo.position, LocalBusiness schema, areaServed
- **AEO**: FAQPage schema, HowTo schema, Speakable specification for voice search

## Code Architecture (After Refactoring)
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
│   │   ├── components/
│   │   │   ├── landing/             # 12 component files
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── SolutionsSection.jsx
│   │   │   │   ├── CapabilitiesSection.jsx
│   │   │   │   ├── BenefitsSection.jsx
│   │   │   │   ├── MarketOpportunitySection.jsx
│   │   │   │   ├── WhyWeWinSection.jsx
│   │   │   │   ├── BusinessModelSection.jsx
│   │   │   │   ├── DemoSection.jsx
│   │   │   │   ├── TrustComplianceSection.jsx
│   │   │   │   ├── ContactSection.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── ui/                  # Shadcn components
│   │   ├── context/
│   │   │   └── LanguageContext.jsx  # Bilingual state management
│   │   ├── data/
│   │   │   └── translations.js      # AR/EN translations (~33KB)
│   │   ├── App.css                  # RTL-adjusted styles
│   │   ├── index.css                # Arabic fonts, RTL base
│   │   └── App.js                   # Main app (54 lines)
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

## Key Links
- **Contact**: https://platform.aretion.org/contact
- **Advisors/Team**: https://platform.aretion.org/advisors
- **Preview**: https://aretion-preview-1.preview.emergentagent.com
