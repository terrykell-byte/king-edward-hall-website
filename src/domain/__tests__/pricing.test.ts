import { describe, it, expect } from 'vitest'
import {
  calculateHireQuote,
  generateInquiryMailto,
  formatInquiryPlainText,
  ROOM_RATES,
  KITCHEN_RATES,
  EQUIPMENT_RATES
} from '../pricing'

describe('calculateHireQuote', () => {
  it('calculates weekday off-peak quote for Newcombe Hall accurately', () => {
    // 2026-11-18 is a Wednesday
    const quote = calculateHireQuote({
      roomId: 'newcombe',
      date: '2026-11-18',
      startTime: '10:00',
      durationHours: 4,
      kitchenId: 'none',
      guestCount: 80
    })

    expect(quote.isPeakRate).toBe(false)
    expect(quote.hourlyRate).toBe(28)
    expect(quote.totalRoomCost).toBe(112)
    expect(quote.kitchenCost).toBe(0)
    expect(quote.equipmentCost).toBe(0)
    expect(quote.estimatedTotal).toBe(112)
    expect(quote.capacityWarning).toBeNull()
  })

  it('triggers peak rate on Friday evening from 18:00 onwards', () => {
    // 2026-11-20 is a Friday
    const quote = calculateHireQuote({
      roomId: 'newcombe',
      date: '2026-11-20',
      startTime: '19:00',
      durationHours: 4,
      kitchenId: 'none',
      guestCount: 100
    })

    expect(quote.isPeakRate).toBe(true)
    expect(quote.hourlyRate).toBe(38)
    expect(quote.totalRoomCost).toBe(152)
  })

  it('treats Friday daytime prior to 18:00 as standard off-peak', () => {
    // 2026-11-20 is a Friday
    const quote = calculateHireQuote({
      roomId: 'newcombe',
      date: '2026-11-20',
      startTime: '14:00',
      durationHours: 3,
      kitchenId: 'none',
      guestCount: 50
    })

    expect(quote.isPeakRate).toBe(false)
    expect(quote.hourlyRate).toBe(28)
    expect(quote.totalRoomCost).toBe(84)
  })

  it('calculates weekend peak quote with Main Kitchen and PA System surcharge', () => {
    // 2026-11-21 is a Saturday
    const quote = calculateHireQuote({
      roomId: 'newcombe',
      date: '2026-11-21',
      startTime: '15:00',
      durationHours: 5,
      kitchenId: 'main_kitchen',
      equipmentIds: ['pa_system'],
      guestCount: 120
    })

    expect(quote.isPeakRate).toBe(true)
    expect(quote.hourlyRate).toBe(38)
    expect(quote.totalRoomCost).toBe(190)
    expect(quote.kitchenCost).toBe(25)
    expect(quote.equipmentCost).toBe(20)
    expect(quote.estimatedTotal).toBe(235)
    expect(quote.capacityWarning).toBeNull()
  })

  it('calculates Jubilee Room with Jubilee Kitchen add-on using canonical glossary name', () => {
    // 2026-11-22 is a Sunday
    const quote = calculateHireQuote({
      roomId: 'jubilee',
      date: '2026-11-22',
      startTime: '13:00',
      durationHours: 3,
      kitchenId: 'jubilee_kitchen',
      guestCount: 40
    })

    expect(quote.isPeakRate).toBe(true)
    expect(quote.kitchenName).toBe('Jubilee Kitchen')
    expect(quote.totalRoomCost).toBe(72)
    expect(quote.kitchenCost).toBe(15)
    expect(quote.estimatedTotal).toBe(87)
  })

  it('triggers capacity warning when guestCount exceeds room maxCapacity', () => {
    const quote = calculateHireQuote({
      roomId: 'library',
      date: '2026-11-18',
      startTime: '10:00',
      durationHours: 2,
      kitchenId: 'none',
      guestCount: 45 // Library capacity is 30
    })

    expect(quote.capacityWarning).toBe(
      'Expected guests (45) exceeds The Library maximum seated capacity (30).'
    )
  })

  it('generates structured mailto URI and plain text inquiry summary avoiding feature envy', () => {
    const quote = calculateHireQuote({
      roomId: 'newcombe',
      date: '2026-11-21',
      startTime: '18:00',
      durationHours: 4,
      kitchenId: 'main_kitchen',
      guestCount: 100
    })

    const contact = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '07700900000',
      eventDescription: 'Wedding Anniversary',
      date: '2026-11-21',
      startTime: '18:00'
    }

    const plainText = formatInquiryPlainText(quote, contact)
    expect(plainText).toContain('Room: Newcombe Hall')
    expect(plainText).toContain('Estimated Total Hire: £177')
    expect(plainText).toContain('Name: John Doe')

    const mailto = generateInquiryMailto(quote, contact)
    expect(mailto).toContain('mailto:roomhire@kingedwardhall.org.uk')
    expect(mailto).toContain('John%20Doe')
    expect(mailto).toContain('Newcombe%20Hall')
  })

  it('exposes defined rates, seating layouts, and visual asset paths', () => {
    expect(ROOM_RATES.newcombe.name).toBe('Newcombe Hall')
    expect(ROOM_RATES.newcombe.maxCapacity).toBe(200)
    expect(ROOM_RATES.newcombe.seatingLayouts.length).toBeGreaterThanOrEqual(3)
    expect(ROOM_RATES.newcombe.imagePath).toBe('images/newcombe-hall.jpg')
    expect(KITCHEN_RATES.main_kitchen.flatRate).toBe(25)
    expect(KITCHEN_RATES.jubilee_kitchen.name).toBe('Jubilee Kitchen')
    expect(EQUIPMENT_RATES.pa_system.flatRate).toBe(20)
  })
})
