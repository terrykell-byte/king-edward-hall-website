# 03: Pure Pricing & Quote Calculation Engine (Primary Seam)

**What to build:** The core domain logic module (`calculateHireQuote`) and automated unit test suite. Accurately calculates itemized quotes from room selection (`newcombe`, `jubilee`, `library`), date/day-of-week, hours, kitchen surcharges, and enforces headcount limits.

**Blocked by:** 01: Project Scaffolding & Sussex Heritage Design Tokens

**Status:** ready-for-agent

- [ ] Rate definition table configured with 2026/2027 standard weekday vs. peak weekend hourly rates for Newcombe Hall, Jubilee Room, and The Library
- [ ] Add-on surcharges defined for Main Kitchen and Jubilee Kitchen
- [ ] Pure functional seam `calculateHireQuote(input)` implemented with full TypeScript types
- [ ] Calculation engine accurately handles day-of-week detection (off-peak vs peak weekend rates)
- [ ] Headcount capacity validation warnings returned when expected guests exceed room limits (e.g. >200 in Newcombe Hall)
- [ ] Automated test suite covering weekday, weekend, multi-room, and kitchen edge cases
