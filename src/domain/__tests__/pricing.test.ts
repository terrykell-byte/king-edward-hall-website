import { describe, it, expect } from 'vitest'
import { calculateHireQuote, ROOM_RATES, KITCHEN_RATES } from '../pricing'

describe('calculateHireQuote', () => {
  it('calculates weekday off-peak quote for Newcombe Hall accurately', () => {
    // 2026-11-18 is a Wednesday
    const quote = calculateHireQuote({
      roomId: 'newcombe',
      date: '2026-11-18',
      durationHours: 4,
      kitchenId: 'none',
      guestCount: 80
    })

    expect(quote.isWeekend).toBe(false)
    expect(quote.hourlyRate).toBe(28)
    expect(quote.totalRoomCost).toBe(112)
    expect(quote.kitchenCost).toBe(0)
    expect(quote.estimatedTotal).toBe(112)
    expect(quote.capacityWarning).toBeNull()
  })

  it('calculates weekend peak quote with Main Kitchen surcharge', () => {
    // 2026-11-21 is a Saturday
    const quote = calculateHireQuote({
      roomId: 'newcombe',
      date: '2026-11-21',
      durationHours: 5,
      kitchenId: 'main_kitchen',
      guestCount: 120
    })

    expect(quote.isWeekend).toBe(true)
    expect(quote.hourlyRate).toBe(38)
    expect(quote.totalRoomCost).toBe(190)
    expect(quote.kitchenCost).toBe(25)
    expect(quote.estimatedTotal).toBe(215)
    expect(quote.capacityWarning).toBeNull()
  })

  it('calculates Jubilee Room with Jubilee Kitchen add-on', () => {
    // 2026-11-22 is a Sunday
    const quote = calculateHireQuote({
      roomId: 'jubilee',
      date: '2026-11-22',
      durationHours: 3,
      kitchenId: 'jubilee_kitchen',
      guestCount: 40
    })

    expect(quote.isWeekend).toBe(true)
    expect(quote.hourlyRate).toBe(24)
    expect(quote.totalRoomCost).toBe(72)
    expect(quote.kitchenCost).toBe(15)
    expect(quote.estimatedTotal).toBe(87)
    expect(quote.capacityWarning).toBeNull()
  })

  it('triggers capacity warning when guestCount exceeds room maxCapacity', () => {
    const quote = calculateHireQuote({
      roomId: 'library',
      date: '2026-11-18',
      durationHours: 2,
      kitchenId: 'none',
      guestCount: 45 // Library capacity is 30
    })

    expect(quote.capacityWarning).toBe(
      'Expected guests (45) exceeds The Library maximum seated capacity (30).'
    )
  })

  it('exposes defined rates configuration correctly', () => {
    expect(ROOM_RATES.newcombe.name).toBe('Newcombe Hall')
    expect(ROOM_RATES.newcombe.maxCapacity).toBe(200)
    expect(KITCHEN_RATES.main_kitchen.flatRate).toBe(25)
  })
})
