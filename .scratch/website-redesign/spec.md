# Spec: King Edward Hall Website Redesign

Status: ready-for-agent

## Problem Statement

The current King Edward Hall website (built over a decade ago on WordPress and Elementor) fails its visitors and volunteer committee across three core dimensions:
1. **Commercial Booking Friction**: Prospective hirers looking to book weddings, birthday parties, or business meetings face a high barrier to entry. Pricing is buried inside an unformatted downloadable PDF (`Hire Charges 2026.pdf`), there is no way to calculate estimated hire costs, and the contact form is a generic text box without dates, times, room options, or expected guest numbers.
2. **Identity Tension & Cluttered Navigation**: The site attempts to simultaneously serve as a commercial venue hire service, an athletic competition portal (Lindfield Village Run), a massive 10,000-person village fair hub (Lindfield Village Day), and an indie cinema club. These disparate purposes are crammed into an unorganized navigation bar that dilutes each offering.
3. **Outdated Presentation & Accidental Confusion**: The site visual theme feels generic and lacks the charm of Lindfield's historic 1911 Edwardian hall. Raw camera filenames and photographer credits leak into image alt text and galleries (`DLL-080125-445`, `040`, `jubilee-bannerjpg`), and uncurated Google reviews mention snooker tables and private bar facilities from the separate, private first-floor Lindfield Club without explanation.

## Solution

A modern, fast, and responsive web application built with a modern static/hybrid stack (Astro/React with Tailwind CSS) that delivers:
1. **A Clear Three-Pillar Architecture**:
   - **Room Hire & Facilities**: Detailed showcases of Newcombe Hall, Jubilee Room, The Library, and both kitchens with dimensions, capacity badges, transparent rate tables, and an interactive booking inquiry estimator.
   - **Community Events**: Dedicated, visually vibrant event hubs for Lindfield Village Day, Lindfield Village Run, and Film Nights with date countdowns, schedules, FAQ accordions, and streamlined registration.
   - **About & Support**: 1911 historic archive, clarity on the charity status (Registered Charity No. 249649), donation call-to-actions, and an explicit FAQ distinguishing the public hall from the upstairs private Lindfield Club.
2. **Interactive Inquiry & Rate Builder**: An intuitive step-by-step calculator that allows hirers to choose room(s), specify date and hours, add kitchen access, view an instant estimated total, and dispatch a structured booking inquiry to the booking secretary.
3. **Sussex Heritage Visual Design System**: A bespoke palette featuring Sussex Forest Green (`#1B382B`), Edwardian Warm Brass (`#C29B38`), and Alabaster Cream (`#FBF9F5`), paired with editorial serif typography and modern accessible controls (WCAG AA compliant).

## User Stories

1. As a prospective wedding organizer, I want to view high-resolution photography and dimensions of Newcombe Hall, so that I can determine if it can seat our 120 guests.
2. As a local parent planning a birthday party, I want to compare the Jubilee Room and Newcombe Hall side-by-side, so that I can pick the most suitable space within my budget.
3. As a business event coordinator, I want to view hourly hire rates for both peak (weekend) and off-peak (weekday) periods on the website without downloading a PDF, so that I can budget quickly.
4. As a community class instructor, I want an interactive inquiry builder where I can select recurring time slots, so that I can check whether regular weekday evening slots are feasible.
5. As an event caterer, I want to see the exact equipment, dimensions, and room access for the Main Kitchen and Jubilee Kitchen, so that I can plan food preparation and service.
6. As a hall hirer, I want to select kitchen add-ons in the booking estimator, so that I see the combined total cost upfront before sending an inquiry.
7. As a mobile phone visitor, I want a touch-friendly booking inquiry form that validates date and time inputs natively, so that I don't have to pinch and zoom on tiny PDF forms.
8. As the volunteer booking secretary, I want all incoming booking inquiries to contain standard structured data (chosen room, date, start/end time, attendee count, event type, kitchen need), so that I don't have to exchange three rounds of emails to gather basic information.
9. As a runner preparing for the Lindfield Village Run, I want to clearly view the race date (23/05/2027), 5K/10K start times, registration fees, and route terrain warnings on a dedicated page, so that I can adequately prepare.
10. As a running entrant, I want direct access to race FAQs (parking, bag drop, timing chip collection, water stations), so that race morning runs smoothly for everyone.
11. As a local resident attending Lindfield Village Day, I want to know the event date (05/06/2027), procession route, start time, and arena schedule, so that my family doesn't miss the high street parade.
12. As a Sussex artisan or merchant, I want to access the stallholder registration interest form for Village Day, so that I can secure a stall before they sell out.
13. As a film enthusiast, I want to see the upcoming Film Night calendar with titles, genres, dates, and ticket prices (£9), so that I can reserve seats online.
14. As a film attendee, I want an online ticket reservation checkout flow, so that I don't have to rely on phone calls during working hours to secure admission.
15. As a prospective bride or groom, I want to read verified 5-star reviews from real people who have held celebrations in the hall, so that I feel confident in the venue's quality and management.
16. As a visitor browsing the hall, I want clear clarification regarding the first-floor Lindfield Club, so that I am not confused by reviews mentioning members' snooker tables or private club rules.
17. As an accessibility-reliant user using a screen reader, I want all images to have descriptive alt text instead of raw camera batch names, so that I can navigate the site comfortably.
18. As a mobility-impaired visitor, I want clear accessibility information (step-free wheelchair access, accessible toilet facilities, hearing loop in Newcombe Hall), so that I know the building accommodates my needs.
19. As a Lindfield village donor, I want a prominent "Support Our Charity" section explaining how funds help preserve the 1911 hall, so that I can contribute a tax-deductible gift.
20. As a local history buff, I want to read the 1911 founding story, WW1 Red Cross hospital usage, and WW2 evacuee heritage of the building with historical photos, so that I appreciate its civic significance.
21. As a corporate sponsor, I want to see our logo and business link properly showcased on the community events sponsor archive, so that our community contribution is recognized.
22. As a hall hirer, I want to view conditions of hire, alcohol licensing rules, and floor plans directly in the browser with an optional download button, so that I can review requirements effortlessly.

## Implementation Decisions

### 1. Architectural Structure & Navigation Layout
- The application will be organized strictly into the Three-Pillar structure:
  - **Pillar 1: Room Hire** (`/room-hire`, `/room-hire/newcombe-hall`, `/room-hire/jubilee-room`, `/room-hire/the-library`, `/room-hire/kitchens`)
  - **Pillar 2: Community Events** (`/events/village-day`, `/events/village-run`, `/events/film-nights`, `/events/sponsors`)
  - **Pillar 3: The Hall & Charity** (`/about`, `/history`, `/donate`, `/contact`, `/faq`)
- Navigation header will feature a clean logo mark ("King Edward Hall • Lindfield 1911"), the three primary dropdown hubs, and a primary CTA button: `[Book a Room]`.
- Mobile navigation will use a clean slide-over drawer with clear section groupings and touch-friendly tap targets (>48px).

### 2. Interactive Inquiry & Pricing Calculator
- The calculator interface is structured as an interactive state machine:
  1. `RoomSelection`: multi-choice pills or cards (Newcombe Hall, Jubilee Room, The Library)
  2. `TimeSlotSelection`: Date picker, start time, duration (hours), and day-of-week rate detection (standard weekday vs. weekend evening)
  3. `AddonsSelection`: Kitchen hire (Main Kitchen vs. Jubilee Kitchen), PA sound/lighting system, or projector setup
  4. `GuestCount`: Numerical input with capacity guardrails (warns if headcount exceeds chosen room capacity)
  5. `InquiryPayload`: Generates a transparent itemized cost breakdown (Base Rate × Hours + Kitchen Surcharge) and populates contact fields (`Name`, `Email`, `Phone`, `EventDescription`)
- All pricing rules will be centralized in a typed rate definition module so changes for future years (2027+) can be updated in a single data structure.

### 3. Visual Design System ("Sussex Heritage & Warm Community")
- **Color Tokens**:
  - `brand-forest`: `#1B382B` (Primary headings, dark accents, active states)
  - `brand-brass`: `#C29B38` (Secondary accents, CTAs, highlight badges)
  - `brand-cream`: `#FBF9F5` (Warm canvas background)
  - `brand-surface`: `#FFFFFF` (Card surfaces, clean modals)
  - `brand-text-dark`: `#2D3748` (Primary body text with high contrast)
  - `brand-text-muted`: `#64748B` (Secondary metadata, captions)
- **Typography Tokens**:
  - Heading font: Editorial serif (`Playfair Display`, `Fraunces`, or `Merriweather`) for an elegant, Edwardian civic feel.
  - Body font: Clean, high-legibility geometric/neo-grotesque sans-serif (`Inter` or `Plus Jakarta Sans`).

### 4. Event Hubs & Social Proof Integration
- Each event hub (Village Day, Village Run, Film Nights) will incorporate a countdown banner to the next scheduled date, accordion FAQs, downloadable guides, and direct ticket/stall enquiry forms.
- Testimonial carousel will display verified reviews filtered for relevant event categories (e.g. "Wedding Reception", "Children's Party", "Cinema Evening"), including reviewer initials and star ratings.
- A designated "Hall vs. Social Club" contextual card will be featured on the About/FAQ page to clarify the role of The Lindfield Club.

## Testing Decisions

- **Good Test Philosophy**: Tests must exercise external behavior and user-observable outcomes (rates calculated, form validation, error states, and responsive navigation) rather than private implementation details.
- **Seams for Testing**:
  1. **Pricing Calculation Seam (`calculateHireQuote`)**: Single pure functional boundary taking room choice, hours, day of week, and add-ons, returning an itemized quote and capacity validation warnings.
  2. **Inquiry Form State Seam**: Validates required contact details, dates in the future, and submission payload formation.
  3. **Navigation & Accessibility Seam**: Component smoke tests verifying that ARIA labels, menu toggles, and contrast ratios meet WCAG AA standards.

## Out of Scope

- Processing live credit card transactions directly on-site for room hire deposits (village hall policy requires date verification and manual booking confirmation by the volunteer secretary prior to invoicing).
- Replacing or modifying external event registration backends (e.g., chip-timing services for the 10K run).
- Administrative backend / CMS portal for real-time calendar syncing (out of scope for initial release; can be integrated with Hallmaster/Skedda in Phase 2).

## Further Notes

- The project issue tracker is configured for local markdown under `.scratch/website-redesign/issues/`.
- Domain terms from `GLOSSARY.md` are used throughout this specification.
