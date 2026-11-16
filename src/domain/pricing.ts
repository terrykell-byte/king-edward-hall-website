export type RoomId = 'newcombe' | 'jubilee' | 'library'
export type KitchenId = 'main_kitchen' | 'jubilee_kitchen' | 'none'

export interface RoomRateConfig {
  id: RoomId
  name: string
  weekdayRate: number
  weekendRate: number
  maxCapacity: number
  description: string
  dimensions: string
}

export interface KitchenRateConfig {
  id: KitchenId
  name: string
  flatRate: number
  description: string
}

export const ROOM_RATES: Record<RoomId, RoomRateConfig> = {
  newcombe: {
    id: 'newcombe',
    name: 'Newcombe Hall',
    weekdayRate: 28,
    weekendRate: 38,
    maxCapacity: 200,
    dimensions: '15.6m × 8.6m',
    description: 'Largest hall space, ideal for wedding receptions, concerts, parties & exhibitions. Includes stage and PA system with induction loop.'
  },
  jubilee: {
    id: 'jubilee',
    name: 'Jubilee Room',
    weekdayRate: 18,
    weekendRate: 24,
    maxCapacity: 60,
    dimensions: '9.2m × 6.1m',
    description: 'Medium hall popular for children’s birthday parties, fitness classes, and family gatherings with direct kitchen access.'
  },
  library: {
    id: 'library',
    name: 'The Library',
    weekdayRate: 14,
    weekendRate: 18,
    maxCapacity: 30,
    dimensions: '6.4m × 4.8m',
    description: 'Intimate room ideal for committee meetings, seminars, craft workshops, or refreshment staging.'
  }
}

export const KITCHEN_RATES: Record<KitchenId, KitchenRateConfig> = {
  none: {
    id: 'none',
    name: 'No Kitchen Required',
    flatRate: 0,
    description: 'Standard room hire without dedicated kitchen catering facilities.'
  },
  main_kitchen: {
    id: 'main_kitchen',
    name: 'Main Commercial Kitchen',
    flatRate: 25,
    description: 'Fully equipped large catering kitchen accessible to all halls. Includes commercial ovens, warmers, and dishwasher.'
  },
  jubilee_kitchen: {
    id: 'jubilee_kitchen',
    name: 'Jubilee Kitchenette',
    flatRate: 15,
    description: 'Compact kitchen adjacent to Jubilee Room, equipped with hot water boiler, fridge, and serving hatch for tea/coffee.'
  }
}

export interface HireQuoteInput {
  roomId: RoomId
  date: string // YYYY-MM-DD
  durationHours: number
  kitchenId: KitchenId
  guestCount: number
}

export interface HireQuoteOutput {
  roomId: RoomId
  roomName: string
  isWeekend: boolean
  hourlyRate: number
  durationHours: number
  totalRoomCost: number
  kitchenId: KitchenId
  kitchenName: string
  kitchenCost: number
  estimatedTotal: number
  capacityWarning: string | null
}

/**
 * Pure calculation seam for King Edward Hall room hire quotes.
 */
export function calculateHireQuote(input: HireQuoteInput): HireQuoteOutput {
  const room = ROOM_RATES[input.roomId]
  if (!room) {
    throw new Error(`Unknown room identifier: ${input.roomId}`)
  }

  const kitchen = KITCHEN_RATES[input.kitchenId] || KITCHEN_RATES.none

  // Determine weekend (Friday evening, Saturday, Sunday)
  // Parse date string without timezone drift
  const [year, month, day] = input.date.split('-').map(Number)
  const dateObj = new Date(year, month - 1, day)
  const dayOfWeek = dateObj.getDay() // 0 = Sunday, 6 = Saturday
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

  const hourlyRate = isWeekend ? room.weekendRate : room.weekdayRate
  const totalRoomCost = hourlyRate * Math.max(1, input.durationHours)
  const kitchenCost = kitchen.flatRate
  const estimatedTotal = totalRoomCost + kitchenCost

  let capacityWarning: string | null = null
  if (input.guestCount > room.maxCapacity) {
    capacityWarning = `Expected guests (${input.guestCount}) exceeds ${room.name} maximum seated capacity (${room.maxCapacity}).`
  }

  return {
    roomId: input.roomId,
    roomName: room.name,
    isWeekend,
    hourlyRate,
    durationHours: input.durationHours,
    totalRoomCost,
    kitchenId: input.kitchenId,
    kitchenName: kitchen.name,
    kitchenCost,
    estimatedTotal,
    capacityWarning
  }
}
