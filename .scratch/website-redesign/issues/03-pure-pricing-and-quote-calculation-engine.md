# 03: Pure Pricing & Quote Calculation Engine (Primary Seam)

**What to build:** The core domain logic module (`calculateHireQuote`) and automated unit test suite. Accurately calculates itemized quotes from room selection (`newcombe`, `jubilee`, `library`), date/day-of-week, hours, kitchen surcharges, and enforces headcount limits.

**Blocked by:** 01: Project Scaffolding & Sussex Heritage Design Tokens

**Status:** resolved

- [x] Rate definition table configured with 2026/2027 standard weekday vs. peak weekend hourly rates for Newcombe Hall, Jubilee Room, and The Library
- [x] Add-on surcharges defined for Main Kitchen and Jubilee Kitchen
- [x] Pure functional seam `calculateHireQuote(input)` implemented with full TypeScript types
- [x] Calculation engine accurately handles day-of-week detection (off-peak vs peak weekend rates)
- [x] Headcount capacity validation warnings returned when expected guests exceed room limits (e.g. >200 in Newcombe Hall)
- [x] Automated test suite covering weekday, weekend, multi-room, and kitchen edge cases

## Resolution
Implemented in `src/domain/pricing.ts` and thoroughly tested in `src/domain/__tests__/pricing.test.ts`. 100% test pass rate.
