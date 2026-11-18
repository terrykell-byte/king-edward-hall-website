# Pricing & Booking Domain Engine

## Domain Seam Isolation

All pricing rules, date calculations, and inquiry formatting logic live in pure TypeScript functions isolated from React rendering:
- Implementation: [`src/domain/pricing.ts`](../../src/domain/pricing.ts)
- Test Suite: [`src/domain/__tests__/pricing.test.ts`](../../src/domain/__tests__/pricing.test.ts) (11 unit tests)

---

## 💷 Pricing Matrix (2026 / 2027 Rates)

### 1. Hall Spaces (Hourly Rates)
* **Newcombe Hall** (Capacity: 200 seated / 100 dining, $15.6\text{m} \times 8.6\text{m}$):
  * Standard Weekday: **£28.00 / hour**
  * Weekend Peak: **£38.00 / hour**
* **Jubilee Room** (Capacity: 60 seated / 40 dining, $9.2\text{m} \times 6.1\text{m}$):
  * Standard Weekday: **£18.00 / hour**
  * Weekend Peak: **£24.00 / hour**
* **The Library** (Capacity: 30 seated / 24 dining, $6.4\text{m} \times 4.8\text{m}$):
  * Standard Weekday: **£14.00 / hour**
  * Weekend Peak: **£18.00 / hour**

### 2. Kitchen Facilities (Flat Fee per Session)
* **Main Kitchen** (Full commercial catering, 100-person crockery): **£25.00 flat fee**
* **Jubilee Kitchen** (Serving hatch to Jubilee Room, 50-person crockery): **£15.00 flat fee**
* **No Kitchen Required (`none`)**: **£0.00**

### 3. Equipment Add-Ons (Flat Fee per Booking)
* **PA Sound System & Microphones** (Induction hearing loop included): **£20.00 flat fee**
* **HD Digital Projector & Screen**: **£15.00 flat fee**

---

## ⏰ Peak vs. Off-Peak Business Rules

Implemented in `calculateHireQuote(input: HireQuoteInput)`:
* **Weekend Peak Rates** apply to:
  1. All bookings on **Saturday** (`dayOfWeek === 6`)
  2. All bookings on **Sunday** (`dayOfWeek === 0`)
  3. Bookings on **Friday evening** (`dayOfWeek === 5`) that either start at or after **18:00** (`hourNumber >= 18`) **or** start earlier on Friday afternoon and extend past **18:00** (`sessionEndHour > 18`).
* **Weekday Rates** apply to Monday through Thursday (all day) and Friday daytime sessions concluding at or before 18:00.
* **Input Sanitization**: `durationHours` and `guestCount` are clamped to valid positive integers ($\ge 1$), and malformed/empty date strings are safely guarded against `NaN`.
* **Local Timezone Date Helpers**: `formatLocalDate(d)` and `getDefaultSaturdayDate(baseDate)` compute `YYYY-MM-DD` strings in local time so the calculator always defaults to a Saturday ~3 weeks ahead without UTC day-shift issues.

---

## ✉️ Automated Inquiry Email & Clipboard Schema

To eliminate PDF friction without requiring a backend database, `formatInquiryPlainText` and `generateInquiryMailto` generate both a clipboard-ready plain-text summary and a `mailto:roomhire@kingedwardhall.org.uk` URI:
- **Subject**: `Room Hire Inquiry - <roomName> (<date>)`
- **Body**:
  - Room name, date, and rate tier (`Peak Weekend / Evening` vs. `Standard Weekday`)
  - Start time and duration in hours
  - Expected attendee count (`Attendees: <guestCount> guests`) and any capacity warning note
  - Selected kitchen (`Main Kitchen`, `Jubilee Kitchen`, or `No Kitchen Required`) and equipment add-ons
  - Itemized estimated total hire fee
  - Hirer contact details (Full Name, Email, Phone, Event Details, and Recurring Booking flag)
