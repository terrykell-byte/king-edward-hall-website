# Pricing & Booking Domain Engine

## Domain Seam Isolation

Following Matt Pocock's software engineering standards, all pricing rules and inquiry formulation logic live in pure TypeScript functions isolated from React rendering:
- Implementation: [`src/domain/pricing.ts`](file:///home/antigravity/src/domain/pricing.ts)
- Test Suite: [`src/domain/__tests__/pricing.test.ts`](file:///home/antigravity/src/domain/__tests__/pricing.test.ts)

---

## 💷 Pricing Matrix (2026 / 2027 Rates)

### 1. Hall Spaces (Hourly Rates)
* **Newcombe Hall** (Capacity: 200, $15.6\text{m} \times 8.6\text{m}$):
  * Standard Weekday: **£28.00 / hour**
  * Weekend Peak: **£38.00 / hour**
* **Jubilee Room** (Capacity: 60, $9.2\text{m} \times 6.1\text{m}$):
  * Standard Weekday: **£18.00 / hour**
  * Weekend Peak: **£24.00 / hour**
* **The Library** (Capacity: 30, $6.4\text{m} \times 4.8\text{m}$):
  * Standard Weekday: **£14.00 / hour**
  * Weekend Peak: **£18.00 / hour**

### 2. Kitchen Facilities (Flat Fee per Session)
* **Main Kitchen** (Full commercial catering): **£25.00 flat fee**
* **Jubilee Kitchen** (Domestic tea/coffee hatch): **£15.00 flat fee**
* **None**: **£0.00**

### 3. Equipment Add-Ons (Flat Fee per Booking)
* **PA Sound System & Microphones** (Induction loop included): **£20.00 flat fee**
* **Multimedia Projector & Screen**: **£15.00 flat fee**

---

## ⏰ Peak vs. Off-Peak Business Rules

In strict adherence to the specification (`KEH-002`) and code-review findings:
* **Weekend Peak Rates** apply to:
  1. All bookings on **Saturday**
  2. All bookings on **Sunday**
  3. Bookings on **Friday evening** starting at or after **18:00**
* **Weekday Rates** apply to Monday through Thursday (all day) and Friday daytime (before 18:00).

```typescript
export function isWeekendOrPeak(dateString: string, startTime: string = '09:00'): boolean {
  if (!dateString) return false
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return false
  
  const day = date.getDay() // 0 = Sun, 5 = Fri, 6 = Sat
  if (day === 0 || day === 6) return true
  
  if (day === 5) {
    const [hour] = startTime.split(':').map(Number)
    if (!isNaN(hour) && hour >= 18) return true
  }
  
  return false
}
```

---

## ✉️ Automated Inquiry Email Schema

To eliminate PDF friction without requiring an expensive booking database, the application generates client-side `mailto:` URIs pre-populated with:
- **Subject**: `[Booking Request] <clientName> - <roomName> (<date>)`
- **Body**: Complete itemized breakdown (room duration, kitchen, equipment, recurring frequency, total estimate, and charity booking policy notice).
