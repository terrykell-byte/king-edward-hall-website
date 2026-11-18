import React, { useState, useEffect } from 'react'
import { RoomId, KitchenId, ROOM_RATES, KITCHEN_RATES, SeatingLayoutId } from '../domain/pricing'
import { TabId } from './Header'
import { SubNavPills, SubNavItem } from './SubNavPills'
import { SmartImage } from './SmartImage'
import { 
  Users, 
  Maximize2, 
  Music, 
  Check, 
  ArrowRight, 
  Accessibility, 
  FileText, 
  Printer, 
  Split,
  LayoutGrid,
  Utensils,
  Camera
} from 'lucide-react'

interface RoomShowcasesProps {
  currentRoom: RoomId | 'kitchens'
  setActiveTab: (tab: TabId) => void
  onSelectRoomForCalculator?: (roomId: RoomId, kitchenId?: KitchenId) => void
}

const ROOM_SUB_NAV_ITEMS: SubNavItem<TabId>[] = [
  { id: 'room-hire', label: '← Rates & Overview', isBack: true },
  { id: 'room-newcombe', label: 'Newcombe Hall' },
  { id: 'room-jubilee', label: 'Jubilee Room' },
  { id: 'room-library', label: 'The Library' },
  { id: 'kitchens', label: 'Kitchen Facilities' }
]

/**
 * Clean minimalist architectural SVG floor plan schematic that adapts to room and seating layout.
 */
const ArchitecturalFloorPlanSvg: React.FC<{ roomId: RoomId; layoutId: SeatingLayoutId }> = ({
  roomId,
  layoutId
}) => {
  const room = ROOM_RATES[roomId]
  return (
    <svg
      viewBox="0 0 420 230"
      className="w-full h-auto rounded-xl bg-brand-forest-dark text-brand-cream border border-brand-brass/30 shadow-inner"
      role="img"
      aria-label={`Architectural floor plan schematic of ${room.name} in ${layoutId} configuration (${room.dimensions})`}
    >
      {/* Subtle architectural blueprint grid */}
      <defs>
        <pattern id={`grid-${roomId}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(230, 211, 163, 0.08)" strokeWidth="0.75" />
        </pattern>
      </defs>
      <rect width="420" height="230" fill={`url(#grid-${roomId})`} />

      {/* Outer perimeter walls */}
      <rect
        x="28"
        y="24"
        width="364"
        height="174"
        rx="4"
        fill="rgba(27, 56, 43, 0.6)"
        stroke="#C29B38"
        strokeWidth="2"
      />

      {/* Dimension callout top */}
      <text x="210" y="16" textAnchor="middle" fill="#E6D3A3" fontSize="10" fontFamily="sans-serif" fontWeight="600">
        {room.name.toUpperCase()} • {room.dimensions}
      </text>

      {/* Room-specific architectural features */}
      {roomId === 'newcombe' && (
        <g>
          {/* Proscenium Stage on the right */}
          <rect x="318" y="32" width="66" height="158" rx="3" fill="rgba(194, 155, 56, 0.18)" stroke="#C29B38" strokeWidth="1.5" />
          <text x="351" y="114" textAnchor="middle" fill="#FBF9F5" fontSize="9" fontWeight="700" transform="rotate(-90 351 114)">
            RAISED STAGE &amp; PA
          </text>
          {/* Kitchen Service Hatch top-left */}
          <line x1="70" y1="24" x2="130" y2="24" stroke="#34D399" strokeWidth="3" />
          <text x="100" y="36" textAnchor="middle" fill="#A7F3D0" fontSize="8">
            Main Kitchen Access
          </text>
        </g>
      )}

      {roomId === 'jubilee' && (
        <g>
          {/* Serving Hatch to Jubilee Kitchen */}
          <rect x="318" y="60" width="66" height="102" rx="3" fill="rgba(194, 155, 56, 0.14)" stroke="#C29B38" strokeWidth="1.2" strokeDasharray="4 2" />
          <text x="351" y="114" textAnchor="middle" fill="#E6D3A3" fontSize="8.5" fontWeight="600" transform="rotate(-90 351 114)">
            JUBILEE KITCHEN HATCH
          </text>
          {/* French doors along bottom wall */}
          <line x1="70" y1="198" x2="280" y2="198" stroke="#6EE7B7" strokeWidth="3" />
          <text x="175" y="190" textAnchor="middle" fill="#A7F3D0" fontSize="8">
            French Doors to Outside Patio
          </text>
        </g>
      )}

      {roomId === 'library' && (
        <g>
          {/* Heritage Bookcases along top & right walls */}
          <rect x="40" y="28" width="260" height="8" fill="rgba(194, 155, 56, 0.35)" />
          <text x="170" y="46" textAnchor="middle" fill="#E6D3A3" fontSize="8">
            Adjacent to Main Kitchen • Refreshment &amp; Meeting Suite
          </text>
        </g>
      )}

      {/* Dynamic Seating Layout Illustration */}
      {layoutId === 'banquet' && (
        <g fill="rgba(251, 249, 245, 0.15)" stroke="#E6D3A3" strokeWidth="1.2">
          {[78, 148, 218].map((cx) =>
            [76, 144].map((cy) => (
              <g key={`${cx}-${cy}`}>
                <circle cx={cx} cy={cy} r="18" />
                <circle cx={cx} cy={cy - 22} r="2.5" fill="#C29B38" />
                <circle cx={cx} cy={cy + 22} r="2.5" fill="#C29B38" />
                <circle cx={cx - 22} cy={cy} r="2.5" fill="#C29B38" />
                <circle cx={cx + 22} cy={cy} r="2.5" fill="#C29B38" />
              </g>
            ))
          )}
          {roomId === 'newcombe' && (
            <g>
              <rect x="262" y="56" width="44" height="110" rx="3" fill="rgba(194, 155, 56, 0.08)" stroke="#E6D3A3" strokeDasharray="3 3" />
              <text x="284" y="114" textAnchor="middle" fill="#E6D3A3" fontSize="8" transform="rotate(-90 284 114)">
                DANCE FLOOR
              </text>
            </g>
          )}
        </g>
      )}

      {layoutId === 'theatre' && (
        <g fill="#E6D3A3">
          {[65, 95, 125, 155, 185, 215, 245, 275].map((x) =>
            [52, 72, 92, 130, 150, 170].map((y) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="14" height="10" rx="2" fill="rgba(251, 249, 245, 0.25)" stroke="#C29B38" strokeWidth="0.9" />
            ))
          )}
          <text x="175" y="115" textAnchor="middle" fill="rgba(251, 249, 245, 0.6)" fontSize="8">
            CENTRAL ACCESS AISLE
          </text>
        </g>
      )}

      {layoutId === 'boardroom' && (
        <g>
          <rect
            x="84"
            y="68"
            width="180"
            height="84"
            rx="6"
            fill="rgba(194, 155, 56, 0.2)"
            stroke="#E6D3A3"
            strokeWidth="1.5"
          />
          <text x="174" y="113" textAnchor="middle" fill="#FBF9F5" fontSize="9" fontWeight="600">
            {roomId === 'library' ? 'CONFERENCE TABLE' : 'OPEN FLOOR / WORKSHOPS'}
          </text>
        </g>
      )}

      {/* Step-Free Entrance Indicator bottom-left */}
      <rect x="24" y="96" width="8" height="32" fill="#34D399" rx="2" />
      <text x="195" y="218" textAnchor="middle" fill="rgba(251, 249, 245, 0.7)" fontSize="9">
        Step-Free Wheelchair Access • Illuminated Exits • Tables &amp; Chairs Included
      </text>
    </svg>
  )
}

export const RoomShowcases: React.FC<RoomShowcasesProps> = ({
  currentRoom,
  setActiveTab,
  onSelectRoomForCalculator
}) => {
  const [selectedLayout, setSelectedLayout] = useState<SeatingLayoutId>('banquet')
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number>(0)
  const [modalRoomId, setModalRoomId] = useState<RoomId | null>(null)

  useEffect(() => {
    setSelectedPhotoIdx(0)
  }, [currentRoom])

  useEffect(() => {
    if (!modalRoomId) {
      document.body.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalRoomId(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [modalRoomId])

  const activeNavTab: TabId =
    currentRoom === 'kitchens'
      ? 'kitchens'
      : (`room-${currentRoom}` as TabId)

  const handleBookRoom = (roomId: RoomId, kitchenId?: KitchenId) => {
    if (onSelectRoomForCalculator) {
      onSelectRoomForCalculator(roomId, kitchenId)
    } else {
      setActiveTab('calculator')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderRoomDetail = (roomId: RoomId, badgeText: string, extendedParagraph: string, highlights: string[]) => {
    const room = ROOM_RATES[roomId]
    const currentLayoutObj =
      room.seatingLayouts.find((l) => l.id === selectedLayout) || room.seatingLayouts[0]
    const gallery = room.galleryPhotos || []
    const activeGalleryPhoto = gallery[selectedPhotoIdx] || null
    const imageUrls = activeGalleryPhoto ? activeGalleryPhoto.urls : room.imageCandidates

    return (
      <div className="space-y-10 animate-in fade-in duration-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Editorial Info & Interactive Layout Selector */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-brass/15 text-brand-forest-dark border border-brand-brass/30 text-xs font-bold uppercase tracking-wider mb-3">
                {badgeText}
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest-dark mb-4">
                {room.name}
              </h1>
              <p className="text-sm sm:text-base text-brand-text-muted leading-relaxed">
                {extendedParagraph}
              </p>
            </div>

            {/* Key Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-brand-surface border border-brand-forest/10 shadow-soft">
                <div className="flex items-center gap-1.5 text-brand-forest text-[11px] font-bold uppercase mb-1">
                  <Maximize2 className="w-3.5 h-3.5 text-brand-brass" /> Dimensions
                </div>
                <span className="font-serif text-lg sm:text-xl font-bold text-brand-forest-dark block">
                  {room.dimensions}
                </span>
                <span className="text-[11px] text-brand-text-muted">Floor area</span>
              </div>

              <div className="p-4 rounded-xl bg-brand-surface border border-brand-forest/10 shadow-soft">
                <div className="flex items-center gap-1.5 text-brand-forest text-[11px] font-bold uppercase mb-1">
                  <Users className="w-3.5 h-3.5 text-brand-brass" /> Capacity
                </div>
                <span className="font-serif text-lg sm:text-xl font-bold text-brand-forest-dark block">
                  {room.maxCapacity} Seated
                </span>
                <span className="text-[11px] text-brand-text-muted">{room.diningCapacity} at tables</span>
              </div>

              <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-brand-surface border border-brand-forest/10 shadow-soft">
                <div className="flex items-center gap-1.5 text-brand-forest text-[11px] font-bold uppercase mb-1">
                  <Check className="w-3.5 h-3.5 text-brand-brass" /> Hire Tariff
                </div>
                <span className="font-serif text-lg sm:text-xl font-bold text-brand-forest-dark block">
                  £{room.weekdayRate}–£{room.weekendRate}/hr
                </span>
                <span className="text-[11px] text-brand-text-muted">Tables &amp; chairs incl.</span>
              </div>
            </div>

            {/* Interactive Layout Configuration Explorer */}
            <div className="p-5 rounded-2xl bg-brand-surface border border-brand-forest/10 shadow-soft space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-forest flex items-center gap-1.5">
                  <LayoutGrid className="w-4 h-4 text-brand-brass" /> Explore Seating Configurations
                </span>
                <span className="text-xs font-bold text-brand-brass bg-brand-brass/10 px-2.5 py-0.5 rounded-full">
                  Up to {currentLayoutObj.capacity} guests
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {room.seatingLayouts.map((layout) => {
                  const isSelected = currentLayoutObj.id === layout.id
                  return (
                    <button
                      key={layout.id}
                      type="button"
                      onClick={() => setSelectedLayout(layout.id)}
                      className={`min-h-[42px] px-2.5 py-2 rounded-xl text-xs font-bold transition-all text-center ${
                        isSelected
                          ? 'bg-brand-forest text-white shadow-soft'
                          : 'bg-brand-cream hover:bg-brand-cream-dark text-brand-forest-dark'
                      }`}
                    >
                      {layout.label}
                    </button>
                  )
                })}
              </div>

              <p className="text-xs text-brand-text-muted leading-relaxed pt-1">
                {currentLayoutObj.description}
              </p>
            </div>

            {/* Highlights List */}
            <ul className="space-y-2 text-xs sm:text-sm text-brand-text-muted">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-brand-brass mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => handleBookRoom(roomId)}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-brand-brass hover:bg-brand-brass-hover text-white px-6 py-3 rounded-xl font-bold text-sm shadow-soft transition-all active:scale-[0.98]"
              >
                <span>Estimate {room.name} Hire</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setModalRoomId(roomId)}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-brand-forest/20 bg-brand-surface hover:bg-brand-cream text-xs sm:text-sm font-bold text-brand-forest transition-colors"
              >
                <FileText className="w-4 h-4 text-brand-brass" />
                <span>Interactive Floor Plan &amp; Specs</span>
              </button>
            </div>
          </div>

          {/* Right Column: Original KEH Room Photograph + Live Schematic */}
          <div className="lg:col-span-6 space-y-4">
            <div className="group relative rounded-2xl overflow-hidden shadow-elevated border border-brand-forest/15 bg-brand-forest-dark aspect-video">
              <SmartImage
                urls={imageUrls}
                alt={`${room.name} interior at King Edward Hall, Lindfield (${room.dimensions})`}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-forest-dark/90 via-brand-forest-dark/20 to-transparent flex flex-col justify-end p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-brass-light block">
                      {activeGalleryPhoto ? activeGalleryPhoto.label : 'King Edward Hall • Ground Floor'}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      {room.name} ({room.dimensions})
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm text-white font-medium flex items-center gap-1">
                      <Accessibility className="w-3.5 h-3.5 text-brand-brass-light" /> Step-Free
                    </span>
                    {roomId === 'newcombe' && (
                      <span className="px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm text-white font-medium flex items-center gap-1">
                        <Music className="w-3.5 h-3.5 text-brand-brass-light" /> Stage &amp; PA Loop
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Optional multi-photo switcher when room has multiple existing KEH photos */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-2">
                {gallery.map((gPhoto, idx) => {
                  const isCurrent = idx === selectedPhotoIdx
                  return (
                    <button
                      key={gPhoto.label}
                      type="button"
                      onClick={() => setSelectedPhotoIdx(idx)}
                      className={`flex-1 flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all ${
                        isCurrent
                          ? 'bg-brand-forest text-white border-brand-forest shadow-soft'
                          : 'bg-brand-surface text-brand-forest-dark border-brand-forest/15 hover:border-brand-brass'
                      }`}
                    >
                      <SmartImage
                        urls={gPhoto.urls}
                        alt={gPhoto.label}
                        className="w-12 h-9 rounded-lg object-cover shrink-0"
                        loading="lazy"
                      />
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold block truncate">{gPhoto.label}</span>
                        <span className={`text-[10px] flex items-center gap-1 ${isCurrent ? 'text-brand-brass-light' : 'text-brand-text-muted'}`}>
                          <Camera className="w-3 h-3" /> View Photo
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            {/* Live Architectural Floor Plan Preview */}
            <div className="p-4 rounded-2xl bg-brand-surface border border-brand-forest/10 shadow-soft space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-brand-forest-dark">
                  Schematic Preview: {currentLayoutObj.label} ({currentLayoutObj.capacity} Max)
                </span>
                <button
                  type="button"
                  onClick={() => setModalRoomId(roomId)}
                  className="text-brand-brass hover:underline font-bold"
                >
                  Enlarge Plan →
                </button>
              </div>
              <ArchitecturalFloorPlanSvg roomId={roomId} layoutId={currentLayoutObj.id} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
      {/* Touch-friendly horizontal scroll-snap sub-navigation */}
      <SubNavPills
        items={ROOM_SUB_NAV_ITEMS}
        activeId={activeNavTab}
        onSelect={(tab) => {
          setSelectedPhotoIdx(0)
          setActiveTab(tab)
        }}
        ariaLabel="Room showcases navigation"
      />

      {/* NEWCOMBE HALL */}
      {currentRoom === 'newcombe' &&
        renderRoomDetail(
          'newcombe',
          'Formerly the Main Hall • Historic 1911',
          'The Newcombe Hall measures 15.6 × 8.6 metres (excluding the stage) and accommodates up to 200 people seated in rows or 100 seated at tables. Renamed in March 2014 in memory of Brian Newcombe (voluntary committee member for over 55 years), the stage and Public Address system with hearing loop make this hall ideal for weddings, large social gatherings, film nights, and charity functions.',
          [
            'Raised proscenium stage with curtains, stage lighting, and PA sound system with hearing loop.',
            'We also have a supply of display stands available for exhibitions, craft fairs, and societies.',
            'Accessible to both the Main Kitchen and Jubilee Kitchen for full event catering.'
          ]
        )}

      {/* JUBILEE ROOM */}
      {currentRoom === 'jubilee' &&
        renderRoomDetail(
          'jubilee',
          'Named for the Silver Jubilee of Queen Elizabeth II',
          `Our smaller hall, the Jubilee Room, was built in 1977 to celebrate the Silver Jubilee of Queen Elizabeth II. With direct access to the ${KITCHEN_RATES.jubilee_kitchen.name} via a serving hatch and French doors opening onto a small outside patio area, it is a popular venue for children’s birthday parties, classes, and smaller events where catering is required.`,
          [
            `Direct access to the ${KITCHEN_RATES.jubilee_kitchen.name} via an internal serving hatch.`,
            'Access to a small outside patio area via glazed French doors.',
            'Warm sprung timber flooring and step-free access with adjacent accessible facilities.'
          ]
        )}

      {/* THE LIBRARY */}
      {currentRoom === 'library' &&
        renderRoomDetail(
          'library',
          'Formerly Lindfield’s Popular Village Library',
          'Our smallest room, The Library, accommodates up to 30 people seated in rows and is ideally suited for meetings, seminars, and workshops. Situated right next door to the Main Kitchen, it is also a very popular room in which to serve refreshments and buffets when holding larger functions.',
          [
            'Ideally suited for committee meetings, clubs, seminars, and small gatherings.',
            'Situated next door to the Main Kitchen — popular for serving refreshments at larger functions.',
            'Quiet ground-floor character with natural daylight and included tables and chairs.'
          ]
        )}

      {/* KITCHEN SHOWCASE */}
      {currentRoom === 'kitchens' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-brass/15 text-brand-forest-dark text-xs font-bold uppercase tracking-wider mb-3">
              <Utensils className="w-3.5 h-3.5 text-brand-brass" /> Catering &amp; Refreshment Spaces
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest-dark mb-3">
              Kitchen &amp; Catering Facilities
            </h1>
            <p className="text-sm sm:text-base text-brand-text-muted">
              King Edward Hall offers two dedicated ground-floor kitchens available to hire with any of our three rooms — from full 120-place event catering in the Main Kitchen to tea, coffee, and light refreshments in the Jubilee Kitchen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* MAIN KITCHEN CARD WITH ORIGINAL PHOTO */}
            <div 
              role="region"
              aria-label="Main Kitchen specifications"
              className="rounded-2xl bg-brand-surface border border-brand-forest/15 shadow-soft overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video bg-brand-forest-dark overflow-hidden">
                  <SmartImage
                    urls={KITCHEN_RATES.main_kitchen.imageCandidates || ['images/main-kitchen.jpg']}
                    alt="Main Kitchen at King Edward Hall, Lindfield"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-forest-dark/85 via-transparent to-transparent flex items-end justify-between p-4 sm:p-5">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-brass-light block">
                        Largest of Our Two Kitchens • Upgraded 2015
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-white">
                        {KITCHEN_RATES.main_kitchen.name}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-brand-forest text-white text-xs font-bold border border-brand-brass/40">
                      +£{KITCHEN_RATES.main_kitchen.flatRate} Flat Fee
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pb-4">
                  <p className="text-sm text-brand-text-muted mb-5 leading-relaxed">
                    The Main Kitchen is accessible to all three of our rooms and is a spacious catering kitchen adequately suited for large functions. King Edward Hall also has its own <strong>120-place setting of crockery and cutlery</strong> available for hire.
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-brand-text-muted border-t border-brand-cream-dark pt-4 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-brass shrink-0" />
                      <span>Catering-sized gas cooker &amp; commercial hot cupboard</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-brass shrink-0" />
                      <span>Commercial glass washer, refrigerator &amp; microwave oven</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-brass shrink-0" />
                      <span>Automatic catering water boiler supplying permanent boiling water</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-brass shrink-0" />
                      <span>Cups and saucers for 100 persons (plus 120-place crockery hire available)</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <button
                  onClick={() => handleBookRoom('newcombe', 'main_kitchen')}
                  className="w-full min-h-[46px] bg-brand-forest hover:bg-brand-forest-light text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Add Main Kitchen in Booking Calculator →
                </button>
              </div>
            </div>

            {/* JUBILEE KITCHEN CARD WITH ORIGINAL PHOTO */}
            <div 
              role="region"
              aria-label="Jubilee Kitchen specifications"
              className="rounded-2xl bg-brand-surface border border-brand-brass/30 shadow-soft overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video bg-brand-forest-dark overflow-hidden">
                  <SmartImage
                    urls={KITCHEN_RATES.jubilee_kitchen.imageCandidates || ['images/jubilee-kitchen.jpg']}
                    alt="Jubilee Kitchen at King Edward Hall, Lindfield"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-forest-dark/85 via-transparent to-transparent flex items-end justify-between p-4 sm:p-5">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-brass-light block">
                        Smaller Kitchen • Direct Serving Hatch
                      </span>
                      <h3 className="font-serif text-2xl font-bold text-white">
                        {KITCHEN_RATES.jubilee_kitchen.name}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-brand-brass text-white text-xs font-bold">
                      +£{KITCHEN_RATES.jubilee_kitchen.flatRate} Flat Fee
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pb-4">
                  <p className="text-sm text-brand-text-muted mb-5 leading-relaxed">
                    Our smaller kitchen is available to hire with any of our three rooms and has direct access to the Jubilee Room via a serving hatch — ideal for smaller events, children’s parties, and meetings.
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-brand-text-muted border-t border-brand-cream-dark pt-4 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-brass shrink-0" />
                      <span>Direct serving hatch into the Jubilee Room</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-brass shrink-0" />
                      <span>Small electric oven, microwave oven &amp; refrigerator</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-brass shrink-0" />
                      <span>Automatic catering water boiler supplying permanent boiling water</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-brass shrink-0" />
                      <span>Cups and saucers for 50 persons</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                <button
                  onClick={() => handleBookRoom('jubilee', 'jubilee_kitchen')}
                  className="w-full min-h-[46px] bg-brand-brass hover:bg-brand-brass-hover text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Book Jubilee Room + Jubilee Kitchen →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Matrix */}
      <div className="mt-14 pt-10 border-t border-brand-cream-dark">
        <div className="flex items-center gap-2 mb-6">
          <Split className="w-5 h-5 text-brand-brass" />
          <h3 className="font-serif text-2xl font-bold text-brand-forest-dark">Side-by-Side Room Comparison</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(Object.values(ROOM_RATES)).map((room) => (
            <div
              key={room.id}
              className="bg-brand-surface rounded-2xl border border-brand-forest/10 shadow-soft overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-36 bg-brand-forest-dark overflow-hidden">
                  <SmartImage
                    urls={room.imageCandidates}
                    alt={room.name}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-brand-forest-dark/80 backdrop-blur-sm text-white border border-brand-brass/40">
                    {room.maxCapacity} max
                  </span>
                </div>
                <div className="p-6 pb-4">
                  <h4 className="font-serif text-xl font-bold text-brand-forest-dark mb-1">{room.name}</h4>
                  <div className="text-xs font-semibold text-brand-brass mb-4">
                    £{room.weekdayRate}/hr weekday • £{room.weekendRate}/hr weekend
                  </div>
                  <div className="space-y-2 text-xs text-brand-text-muted mb-4">
                    <div>• Dimensions: <strong className="text-brand-text-dark">{room.dimensions}</strong></div>
                    <div>• Capacity: <strong className="text-brand-text-dark">{room.maxCapacity} seated ({room.diningCapacity} dining)</strong></div>
                    <div className="pt-2.5 border-t border-brand-cream-dark space-y-1.5">
                      {room.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-brand-text-dark">
                          <Check className="w-3.5 h-3.5 text-brand-brass shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <button
                  onClick={() => handleBookRoom(room.id)}
                  className="w-full min-h-[44px] bg-brand-forest text-white py-2.5 rounded-xl text-xs font-bold hover:bg-brand-forest-light transition-colors"
                >
                  Estimate {room.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Architectural Floor Plan & Premises Modal */}
      {modalRoomId && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="floor-plan-modal-title"
          className="fixed inset-0 z-50 bg-brand-forest-dark/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setModalRoomId(null)}
        >
          <div
            className="bg-brand-surface rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-elevated border border-brand-forest/20 space-y-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start border-b border-brand-cream-dark pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-brass block">
                  Architectural Schematic &amp; Premises Rules
                </span>
                <h4 id="floor-plan-modal-title" className="font-serif text-xl font-bold text-brand-forest-dark">
                  {ROOM_RATES[modalRoomId].name} ({ROOM_RATES[modalRoomId].dimensions})
                </h4>
              </div>
              <button 
                type="button"
                onClick={() => setModalRoomId(null)} 
                className="min-w-[36px] min-h-[36px] rounded-lg hover:bg-brand-cream text-brand-text-muted hover:text-brand-forest-dark text-base font-bold"
                aria-label="Close floor plan viewer"
              >
                ✕
              </button>
            </div>

            {/* Layout mode buttons inside modal */}
            <div className="flex gap-2">
              {ROOM_RATES[modalRoomId].seatingLayouts.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setSelectedLayout(l.id)}
                  className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-colors ${
                    selectedLayout === l.id
                      ? 'bg-brand-forest text-white'
                      : 'bg-brand-cream text-brand-forest-dark hover:bg-brand-cream-dark'
                  }`}
                >
                  {l.label} ({l.capacity})
                </button>
              ))}
            </div>

            <ArchitecturalFloorPlanSvg roomId={modalRoomId} layoutId={selectedLayout} />

            <div className="p-4 bg-brand-cream rounded-xl text-xs text-brand-text-muted leading-relaxed space-y-1.5">
              <p><strong className="text-brand-forest-dark">Premises &amp; Safety Specification:</strong></p>
              <p>• Emergency exits are clearly marked with illuminated green signage and step-free egress.</p>
              <p>• Maximum floor occupancy: 200 persons (Newcombe Hall), 60 (Jubilee Room), 30 (The Library).</p>
              <p>• Alcohol sales require a Temporary Event Notice (TEN) filed with Mid Sussex District Council at least 10 working days prior.</p>
              <p>• All music and amplified sound must conclude by 23:30 PM to respect High Street residents.</p>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-forest hover:text-brand-brass transition-colors py-2"
              >
                <Printer className="w-4 h-4 text-brand-brass" /> Print / Save PDF Specification
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const targetRoom = modalRoomId
                    setModalRoomId(null)
                    handleBookRoom(targetRoom)
                  }}
                  className="bg-brand-brass hover:bg-brand-brass-hover text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  Book This Room
                </button>
                <button
                  type="button"
                  onClick={() => setModalRoomId(null)}
                  className="bg-brand-forest text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-brand-forest-light transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
