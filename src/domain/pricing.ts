export type RoomId = 'newcombe' | 'jubilee' | 'library'
export type KitchenId = 'main_kitchen' | 'jubilee_kitchen' | 'none'
export type EquipmentId = 'pa_system' | 'projector'
export type SeatingLayoutId = 'banquet' | 'theatre' | 'boardroom'

export interface SeatingLayoutConfig {
  id: SeatingLayoutId
  label: string
  capacity: number
  description: string
}

export interface RoomRateConfig {
  id: RoomId
  name: string
  weekdayRate: number
  weekendRate: number
  maxCapacity: number
  diningCapacity: number
  dimensions: string
  description: string
  features: string[]
  imagePath: string
  imageCandidates: string[]
  galleryPhotos?: {
    label: string
    caption: string
    urls: string[]
  }[]
  seatingLayouts: SeatingLayoutConfig[]
}

export interface KitchenRateConfig {
  id: KitchenId
  name: string
  flatRate: number
  description: string
  imagePath?: string
  imageCandidates?: string[]
  facilities?: string[]
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
    diningCapacity: 100,
    dimensions: '15.6m × 8.6m',
    description: 'Largest hall space, ideal for wedding receptions, concerts, parties & exhibitions. Includes stage and PA system with induction loop.',
    features: ['Raised Proscenium Stage', 'PA Induction Hearing Loop', 'Dimmable Lighting', 'Level Access'],
    imagePath: 'https://www.kingedwardhall.org.uk/wp-content/uploads/al_opt_content/IMAGE/www.kingedwardhall.org.uk/wp-content/uploads/2024/01/NH-Film.webp.bv.webp',
    imageCandidates: [
      'https://www.kingedwardhall.org.uk/wp-content/uploads/al_opt_content/IMAGE/www.kingedwardhall.org.uk/wp-content/uploads/2024/01/NH-Film.webp.bv.webp',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/NH-Film.webp',
      'images/newcombe-hall.jpg'
    ],
    galleryPhotos: [
      {
        label: 'Newcombe Hall & Stage',
        caption: 'Newcombe Hall interior (15.6m × 8.6m excluding stage)',
        urls: [
          'https://www.kingedwardhall.org.uk/wp-content/uploads/al_opt_content/IMAGE/www.kingedwardhall.org.uk/wp-content/uploads/2024/01/NH-Film.webp.bv.webp',
          'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/NH-Film.webp',
          'images/newcombe-hall.jpg'
        ]
      },
      {
        label: 'Wedding & Banquet Setup',
        caption: 'Newcombe Hall configured for weddings and receptions',
        urls: [
          'https://www.kingedwardhall.org.uk/wp-content/uploads/al_opt_content/IMAGE/www.kingedwardhall.org.uk/wp-content/uploads/2024/01/NH-Wedding-1.webp.bv.webp',
          'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/NH-Wedding-1.webp',
          'images/newcombe-hall.jpg'
        ]
      }
    ],
    seatingLayouts: [
      {
        id: 'theatre',
        label: 'Theatre / Concert',
        capacity: 200,
        description: 'Tiered row seating facing the raised proscenium stage with central aisle and full hearing loop coverage.'
      },
      {
        id: 'banquet',
        label: 'Wedding / Banquet',
        capacity: 100,
        description: '10 round or trestle dining tables with dancefloor space in front of the stage and direct Main Kitchen service.'
      },
      {
        id: 'boardroom',
        label: 'Exhibition / Fair',
        capacity: 150,
        description: 'Perimeter trestle tables and open central promenade ideal for craft fairs, art exhibitions, and society events.'
      }
    ]
  },
  jubilee: {
    id: 'jubilee',
    name: 'Jubilee Room',
    weekdayRate: 18,
    weekendRate: 24,
    maxCapacity: 60,
    diningCapacity: 40,
    dimensions: '9.2m × 6.1m',
    description: 'Medium hall popular for children’s birthday parties, fitness classes, and family gatherings with direct kitchen access.',
    features: ['Direct Kitchen Hatch', 'Sprung Floor', 'French Doors to Patio', 'Wheelchair Ramp'],
    imagePath: 'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/jubilee-bannerjpg-1200.webp',
    imageCandidates: [
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/jubilee-bannerjpg-1200.webp',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/al_opt_content/IMAGE/www.kingedwardhall.org.uk/wp-content/uploads/2024/01/jubilee-bannerjpg-1200.webp.bv.webp',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/jubilee-bannerjpg.jpg',
      'images/jubilee-room.jpg'
    ],
    seatingLayouts: [
      {
        id: 'theatre',
        label: 'Seated Presentation',
        capacity: 60,
        description: 'Row seating for society talks, AGMs, and community presentations with natural daylight.'
      },
      {
        id: 'banquet',
        label: 'Party / Dining Tables',
        capacity: 40,
        description: 'Arranged with dining tables and open play/gathering area beside the Jubilee Kitchen serving hatch.'
      },
      {
        id: 'boardroom',
        label: 'Fitness / Workshop',
        capacity: 30,
        description: 'Clear sprung timber floor space for yoga, pilates, dance classes, or easel art sessions.'
      }
    ]
  },
  library: {
    id: 'library',
    name: 'The Library',
    weekdayRate: 14,
    weekendRate: 18,
    maxCapacity: 30,
    diningCapacity: 24,
    dimensions: '6.4m × 4.8m',
    description: 'Intimate room ideal for committee meetings, seminars, craft workshops, or refreshment staging.',
    features: ['Meeting Boardroom Layout', 'Next to Main Kitchen', 'Natural Daylight', 'Serving Table Space'],
    imagePath: 'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/Library-pano-1920x960-1.webp',
    imageCandidates: [
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/Library-pano-1920x960-1.webp',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/al_opt_content/IMAGE/www.kingedwardhall.org.uk/wp-content/uploads/2024/01/Library-pano-1920x960-1.webp.bv.webp',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/Library-pano-1920x960-1.jpg',
      'images/library-room.jpg'
    ],
    seatingLayouts: [
      {
        id: 'boardroom',
        label: 'Boardroom Table',
        capacity: 20,
        description: 'Executive conference table arrangement for parish council, trustee, and committee meetings.'
      },
      {
        id: 'theatre',
        label: 'Seminar Seating',
        capacity: 30,
        description: 'Compact row or semicircle seating for small talks, tutoring, and book club gatherings.'
      },
      {
        id: 'banquet',
        label: 'VIP Green Room / Buffet',
        capacity: 24,
        description: 'Configured as a quiet breakout room or drinks/buffet reception lounge supporting Newcombe Hall.'
      }
    ]
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
    description: 'Accessible to all three rooms and the largest of our two kitchens. Upgraded in 2015 with catering gas cooker, hot cupboard, commercial glass washer, and 100-person crockery.',
    imagePath: 'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/new_kitchen01-header.webp',
    imageCandidates: [
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/new_kitchen01-header.webp',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/new_kitchen01-header.jpg',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/al_opt_content/IMAGE/www.kingedwardhall.org.uk/wp-content/uploads/2024/01/new_kitchen01-header.webp.bv.webp',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/al_opt_content/IMAGE/www.kingedwardhall.org.uk/wp-content/uploads/2024/01/new_kitchen01-header.jpg.bv.webp',
      'images/main-kitchen.jpg'
    ],
    facilities: [
      'Catering sized gas cooker & hot cupboard',
      'Commercial glass washer & refrigerator',
      'Automatic catering water boiler (permanent boiling water)',
      'Cups and saucers for 100 persons + microwave oven'
    ]
  },
  jubilee_kitchen: {
    id: 'jubilee_kitchen',
    name: 'Jubilee Kitchen',
    flatRate: 15,
    description: 'Smaller kitchen available to hire with any of our three rooms, featuring direct access to the Jubilee Room via a serving hatch.',
    imagePath: 'https://www.kingedwardhall.org.uk/wp-content/uploads/al_opt_content/IMAGE/www.kingedwardhall.org.uk/wp-content/uploads/elementor/thumbs/Jubilee-Kitchen_bg-rhcymvih20kh6y1wuw7nz6mrhbbonp9ioxbdwa40ps.webp.bv.webp',
    imageCandidates: [
      'https://www.kingedwardhall.org.uk/wp-content/uploads/al_opt_content/IMAGE/www.kingedwardhall.org.uk/wp-content/uploads/elementor/thumbs/Jubilee-Kitchen_bg-rhcymvih20kh6y1wuw7nz6mrhbbonp9ioxbdwa40ps.webp.bv.webp',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/elementor/thumbs/Jubilee-Kitchen_bg-rhcymvih20kh6y1wuw7nz6mrhbbonp9ioxbdwa40ps.webp',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/Jubilee-Kitchen_bg.webp',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/Jubilee-Kitchen_bg.jpg',
      'images/jubilee-kitchen.jpg'
    ],
    facilities: [
      'Direct serving hatch access into the Jubilee Room',
      'Small electric oven, microwave oven & refrigerator',
      'Automatic catering water boiler supplying permanent boiling water',
      'Cups and saucers for 50 persons'
    ]
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
  guestCount: number
  estimatedTotal: number
  capacityWarning: string | null
}

/**
 * Formats a Date object as YYYY-MM-DD in local time (avoiding UTC day-shift bugs).
 */
export function formatLocalDate(d: Date): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Returns the YYYY-MM-DD date string for the Saturday approximately 3 weeks ahead in local time.
 */
export function getDefaultSaturdayDate(baseDate: Date = new Date()): string {
  const target = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 21)
  const dayOfWeek = target.getDay()
  const daysUntilSaturday = (6 - dayOfWeek + 7) % 7
  target.setDate(target.getDate() + daysUntilSaturday)
  return formatLocalDate(target)
}

/**
 * Pure calculation seam for King Edward Hall room hire quotes.
 * Enforces peak rate on Friday evening (from 18:00 onwards, including sessions extending past 18:00),
 * Saturdays, and Sundays.
 */
export function calculateHireQuote(input: HireQuoteInput): HireQuoteOutput {
  const room = ROOM_RATES[input.roomId]
  if (!room) {
    throw new Error(`Unknown room identifier: ${input.roomId}`)
  }

  const kitchen = KITCHEN_RATES[input.kitchenId] || KITCHEN_RATES.none
  const selectedEquipment = input.equipmentIds || []

  const safeDuration = Math.max(
    1,
    Number.isFinite(input.durationHours) ? Math.round(input.durationHours) : 1
  )
  const safeGuestCount = Math.max(
    1,
    Number.isFinite(input.guestCount) ? Math.round(input.guestCount) : 1
  )

  // Determine peak rate: Friday >= 18:00 (or extending past 18:00), Saturday (all day), Sunday (all day)
  let dayOfWeek = -1
  if (/^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
    const [year, month, day] = input.date.split('-').map(Number)
    const dateObj = new Date(year, month - 1, day)
    if (!Number.isNaN(dateObj.getTime())) {
      dayOfWeek = dateObj.getDay() // 0 = Sunday, 5 = Friday, 6 = Saturday
    }
  }

  const [rawHour, rawMinute] = (input.startTime || '00:00').split(':')
  const parsedHour = parseInt(rawHour || '0', 10)
  const parsedMinute = parseInt(rawMinute || '0', 10)
  const hourNumber = Number.isFinite(parsedHour) ? parsedHour : 0
  const minuteNumber = Number.isFinite(parsedMinute) ? parsedMinute : 0
  const sessionEndHour = hourNumber + minuteNumber / 60 + safeDuration

  const isFridayEvening = dayOfWeek === 5 && (hourNumber >= 18 || sessionEndHour > 18)
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
  const isPeakRate = isWeekend || isFridayEvening

  const hourlyRate = isPeakRate ? room.weekendRate : room.weekdayRate
  const totalRoomCost = hourlyRate * safeDuration
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
  if (safeGuestCount > room.maxCapacity) {
    capacityWarning = `Expected guests (${safeGuestCount}) exceeds ${room.name} maximum seated capacity (${room.maxCapacity}).`
  }

  return {
    roomId: input.roomId,
    roomName: room.name,
    isPeakRate,
    hourlyRate,
    durationHours: safeDuration,
    totalRoomCost,
    kitchenId: input.kitchenId,
    kitchenName: kitchen.name,
    kitchenCost,
    equipmentCost,
    equipmentNames,
    guestCount: safeGuestCount,
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
 * Generates the plain-text inquiry body used for both email clients and clipboard copy.
 */
export function formatInquiryPlainText(quote: HireQuoteOutput, contact: BookingContactInfo): string {
  return [
    `Hello Tracy,`,
    ``,
    `I would like to make a provisional room hire inquiry for King Edward Hall:`,
    ``,
    `--- BOOKING DETAILS ---`,
    `Room: ${quote.roomName}`,
    `Date: ${contact.date} (${quote.isPeakRate ? 'Peak Weekend / Evening' : 'Standard Weekday'})`,
    `Time: ${contact.startTime} (${quote.durationHours} hours)`,
    `Attendees: ${quote.guestCount} guests`,
    quote.capacityWarning ? `Capacity Note: ${quote.capacityWarning}` : null,
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
}

/**
 * Generates an inquiry mailto URL and preformatted text body,
 * eliminating Feature Envy in presentation components.
 */
export function generateInquiryMailto(quote: HireQuoteOutput, contact: BookingContactInfo): string {
  const subject = `Room Hire Inquiry - ${quote.roomName} (${contact.date})`
  const body = formatInquiryPlainText(quote, contact)

  return `mailto:roomhire@kingedwardhall.org.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
