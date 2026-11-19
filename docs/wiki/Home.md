# King Edward Hall — Knowledge Base & Wiki

Welcome to the King Edward Hall Website Redesign documentation wiki. This knowledge base provides an in-depth reference for developers, trustees, and booking managers.

---

## 📑 Wiki Navigation

1. **[Architecture & Design System](Architecture-and-Design.md)**
   - Three-pillar structural model & hash-based deep linking
   - Sussex Heritage color palette (`tailwind.config.js`) & typography hierarchy
   - Front-page photo slide deck, resilient `SmartImage` fallback, and WCAG AA accessibility
2. **[Pricing & Booking Domain Engine](Pricing-and-Booking-Domain.md)**
   - Pure domain modeling & pricing logic (`calculateHireQuote`)
   - Peak weekend & Friday evening overlap rules (`>= 18:00` or sessions extending past `18:00`)
   - Kitchen pre-selection, equipment add-ons, and local timezone Saturday defaults
   - Unit test suite (`Vitest` — 11 tests) & `mailto:` / clipboard inquiry formatting
3. **[Community Events Hub](Community-Events-Hub.md)**
   - Lindfield Village Day stallholder registration (`villageday@kingedwardhall.org.uk`)
   - Lindfield Village Run 5K/10K pre-registration (`run@kingedwardhall.org.uk`) & live countdown
   - Film Nights interactive screening cards & ticket reservations (`secretary@kingedwardhall.org.uk`)
   - Local business sponsors archive
4. **[Charity & Heritage Stewardship](Charity-and-Heritage.md)**
   - Registered Charity No. 249649 governance
   - 1911 historic timeline
   - Legal & operational distinction from The Lindfield Club
   - HMRC Gift Aid boost calculation (+25%) & donation pledge dispatch
5. **[Deployment & CI/CD Operations](Deployment-and-Operations.md)**
   - Automated GitHub Actions test + build + deploy pipeline
   - Vite relative base configuration
   - Local preview server operations
6. **[User Acceptance Testing (UAT) Plan](UAT-Test-Plan.md)**
   - End-user test suites (`UAT-NAV`, `UAT-ROOM`, `UAT-CALC`, `UAT-EVT`, `UAT-CHAR`, `UAT-A11Y`)
   - Persona checklists & committee sign-off sheet

---

## 🔗 Quick Links
* **Live Web & Mobile Site**: [https://terrykell-byte.github.io/king-edward-hall-website/](https://terrykell-byte.github.io/king-edward-hall-website/)
* **GitHub Repository**: [terrykell-byte/king-edward-hall-website](https://github.com/terrykell-byte/king-edward-hall-website)
* **Domain Glossary**: [`GLOSSARY.md`](../../GLOSSARY.md)
* **Design Specification**: [`.scratch/website-redesign/spec.md`](../../.scratch/website-redesign/spec.md)
