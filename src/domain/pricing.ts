export type RoomId = 'newcombe' | 'jubilee' | 'library'
export type KitchenId = 'main_kitchen' | 'jubilee_kitchen' | 'none'
export type EquipmentId = 'pa_system' | 'projector'

export interface RoomRateConfig {
  id: RoomId
  name: string
  weekdayRate: number
  weekendRate: number
  maxCapacity: number
  dimensions: string
  description: string
  features: string[]
}

export interface KitchenRateConfig {
  id: KitchenId
  name: string
  flatRate: number
  description: string
}

export interface EquipmentRateConfig {
  id: EquipmentId
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
    description: 'Largest hall space, ideal for wedding receptions, concerts, parties & exhibitions. Includes stage and PA system with induction loop.',
    features: ['Raised Proscenium Stage', 'PA Induction Hearing Loop', 'Dimmable Lighting', 'Level Access']
  },
  jubilee: {
    id: 'jubilee',
    name: 'Jubilee Room',
    weekdayRate: 18,
    weekendRate: 24,
    maxCapacity: 60,
    dimensions: '9.2m × 6.1m',
    description: 'Medium hall popular for children’s birthday parties, fitness classes, and family gatherings with direct kitchen access.',
    features: ['Direct Kitchen Hatch', 'Sprung Floor', 'Garden View Windows', 'Wheelchair Ramp']
  },
  library: {
    id: 'library',
    name: 'The Library',
    weekdayRate: 14,
    weekendRate: 18,
    maxCapacity: 30,
    dimensions: '6.4m × 4.8m',
    description: 'Intimate room ideal for committee meetings, seminars, craft workshops, or refreshment staging.',
    features: ['Meeting Boardroom Layout', 'Quiet Character', 'Natural Daylight', 'Serving Table Space']
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
    name: 'Main Kitchen',
    flatRate: 25,
    description: 'Fully equipped large catering kitchen accessible to all halls. Includes commercial ovens, warmers, and dishwasher.'
  },
  jubilee_kitchen: {
    id: 'jubilee_kitchen',
    name: 'Jubilee Kitchen',
    flatRate: 15,
    description: 'Compact kitchen adjacent to Jubilee Room, equipped with hot water boiler, fridge, and serving hatch for tea/coffee.'
  }
}

export const EQUIPMENT_RATES: Record<EquipmentId, EquipmentRateConfig> = {
  pa_system: {
    id: 'pa_system',
    name: 'PA Sound System & Microphones',
    flatRate: 20,
    description: 'Full audio system with wireless roaming microphones and induction hearing loop.'
  },
  projector: {
    id: 'projector',
    name: 'HD Digital Projector & Screen',
    flatRate: 15,
    description: 'High-lumen projector with HDMI input and pull-down presentation screen.'
  }
}

export interface HireQuoteInput {
  roomId: RoomId
  date: string // YYYY-MM-DD
  startTime: string // HH:MM
  durationHours: number
  kitchenId: KitchenId
  equipmentIds?: EquipmentId[]
  guestCount: number
}

export interface HireQuoteOutput {
  roomId: RoomId
  roomName: string
  isPeakRate: boolean
  hourlyRate: number
  durationHours: number
  totalRoomCost: number
  kitchenId: KitchenId
  kitchenName: string
  kitchenCost: number
  equipmentCost: number
  equipmentNames: string[]
  estimatedTotal: number
  capacityWarning: string | null
}

/**
 * Pure calculation seam for King Edward Hall room hire quotes.
 * Enforces peak rate on Friday evening (from 18:00 onwards), Saturdays, and Sundays.
 */
export function calculateHireQuote(input: HireQuoteInput): HireQuoteOutput {
  const room = ROOM_RATES[input.roomId]
  if (!room) {
    throw new Error(`Unknown room identifier: ${input.roomId}`)
  }

  const kitchen = KITCHEN_RATES[input.kitchenId] || KITCHEN_RATES.none
  const selectedEquipment = input.equipmentIds || []

  // Determine peak rate: Friday >= 18:00, Saturday (all day), Sunday (all day)
  const [year, month, day] = input.date.split('-').map(Number)
  const dateObj = new Date(year, month - 1, day)
  const dayOfWeek = dateObj.getDay() // 0 = Sunday, 5 = Friday, 6 = Saturday

  const hourNumber = parseInt(input.startTime.split(':')[0] || '0', 10)
  const isFridayEvening = dayOfWeek === 5 && hourNumber >= 18
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
  const isPeakRate = isWeekend || isFridayEvening

  const hourlyRate = isPeakRate ? room.weekendRate : room.weekdayRate
  const totalRoomCost = hourlyRate * Math.max(1, input.durationHours)
  const kitchenCost = kitchen.flatRate

  let equipmentCost = 0
  const equipmentNames: string[] = []
  for (const eqId of selectedEquipment) {
    const eq = EQUIPMENT_RATES[eqId]
    if (eq) {
      equipmentCost += eq.flatRate
      equipmentNames.push(eq.name)
    }
  }

  const estimatedTotal = totalRoomCost + kitchenCost + equipmentCost

  let capacityWarning: string | null = null
  if (input.guestCount > room.maxCapacity) {
    capacityWarning = `Expected guests (${input.guestCount}) exceeds ${room.name} maximum seated capacity (${room.maxCapacity}).`
  }

  return {
    roomId: input.roomId,
    roomName: room.name,
    isPeakRate,
    hourlyRate,
    durationHours: input.durationHours,
    totalRoomCost,
    kitchenId: input.kitchenId,
    kitchenName: kitchen.name,
    kitchenCost,
    equipmentCost,
    equipmentNames,
    estimatedTotal,
    capacityWarning
  }
}

export interface BookingContactInfo {
  name: string
  email: string
  phone: string
  eventDescription: string
  date: string
  startTime: string
}

/**
 * Generates an inquiry mailto URL and preformatted text body,
 * eliminating Feature Envy in presentation components.
 */
export function generateInquiryMailto(quote: HireQuoteOutput, contact: BookingContactInfo): string {
  const subject = `Room Hire Inquiry - ${quote.roomName} (${contact.date})`
  const body = [
    `Hello Tracy,`,
    ``,
    `I would like to make a provisional room hire inquiry for King Edward Hall:`,
    ``,
    `--- BOOKING DETAILS ---`,
    `Room: ${quote.roomName}`,
    `Date: ${contact.date} (${quote.isPeakRate ? 'Peak Weekend / Evening' : 'Standard Weekday'})`,
    `Time: ${contact.startTime} (${quote.durationHours} hours)`,
    `Kitchen: ${quote.kitchenName} (£${quote.kitchenCost})`,
    quote.equipmentNames.length > 0 ? `Equipment: ${quote.equipmentNames.join(', ')} (£${quote.equipmentCost})` : null,
    `Estimated Total Hire: £${quote.estimatedTotal}`,
    ``,
    `--- HIRER CONTACT ---`,
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    `Phone: ${contact.phone}`,
    `Event Details: ${contact.eventDescription}`,
    ``,
    `Thank you!`
  ].filter(Boolean).join('\n')

  return `mailto:roomhire@kingedwardhall.org.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
