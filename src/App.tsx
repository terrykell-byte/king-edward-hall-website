import { useState, useEffect, useCallback } from 'react'
import { Header, TabId, ALL_TAB_IDS } from './components/Header'
import { Footer } from './components/Footer'
import { BookingCalculator } from './components/BookingCalculator'
import { RoomShowcases } from './components/RoomShowcases'
import { EventHubs } from './components/EventHubs'
import { AboutAndCharity } from './components/AboutAndCharity'
import { FrontPageSlideDeck } from './components/FrontPageSlideDeck'
import { SmartImage } from './components/SmartImage'
import { PillarVenueIcon, PillarFestivalIcon, PillarHeritageIcon } from './components/BrandIcons'
import { ROOM_RATES, KITCHEN_RATES, RoomId, KitchenId } from './domain/pricing'
import { 
  Calendar, 
  Star, 
  ArrowRight, 
  Sparkles, 
  ChevronRight,
  Utensils
} from 'lucide-react'

function getTabFromHash(): TabId {
  if (typeof window === 'undefined') return 'home'
  const rawHash = window.location.hash.replace(/^#/, '') as TabId
  return ALL_TAB_IDS.includes(rawHash) ? rawHash : 'home'
}

export function App() {
  const [activeTab, setActiveTabState] = useState<TabId>(getTabFromHash)
  const [selectedCalculatorRoom, setSelectedCalculatorRoom] = useState<RoomId>('newcombe')
  const [selectedCalculatorKitchen, setSelectedCalculatorKitchen] = useState<KitchenId>('none')

  const setActiveTab = useCallback((tab: TabId) => {
    setActiveTabState(tab)
    if (typeof window !== 'undefined') {
      const targetHash = tab === 'home' ? '#home' : `#${tab}`
      if (window.location.hash !== targetHash) {
        window.history.pushState(null, '', targetHash)
      }
    }
  }, [])

  useEffect(() => {
    const onHashChange = () => {
      setActiveTabState(getTabFromHash())
    }
    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('popstate', onHashChange)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('popstate', onHashChange)
    }
  }, [])

  const handleOpenCalculatorForRoom = useCallback((roomId: RoomId, kitchenId: KitchenId = 'none') => {
    setSelectedCalculatorRoom(roomId)
    setSelectedCalculatorKitchen(kitchenId)
    setActiveTab('calculator')
  }, [setActiveTab])

  const renderRoomsAndKitchensPhotoGrid = () => (
    <div className="space-y-6">
      {/* 3 Function Rooms Photo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(Object.keys(ROOM_RATES) as RoomId[]).map((rId) => {
          const room = ROOM_RATES[rId]
          const tabTarget = `room-${rId}` as TabId
          return (
            <div
              key={rId}
              className="group bg-brand-surface rounded-2xl border border-brand-forest/10 hover:border-brand-brass/40 shadow-soft hover:shadow-elevated transition-all overflow-hidden flex flex-col justify-between"
            >
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab(tabTarget)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="relative block w-full aspect-[16/10] bg-brand-forest-dark overflow-hidden text-left"
                >
                  <SmartImage
                    urls={room.imageCandidates}
                    alt={`${room.name} at King Edward Hall`}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-forest-dark/85 via-transparent to-transparent flex items-end justify-between p-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-brass-light block">
                        {room.dimensions} • Up to {room.maxCapacity} Seated
                      </span>
                      <h3 className="font-serif text-xl font-bold text-white">
                        {room.name}
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-brand-brass text-white text-[11px] font-bold">
                      from £{room.weekdayRate}/hr
                    </span>
                  </div>
                </button>

                <div className="p-5 pb-4">
                  <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed">
                    {room.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab(tabTarget)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="flex-1 min-h-[42px] rounded-xl bg-brand-cream hover:bg-brand-cream-dark text-brand-forest-dark text-xs font-bold transition-colors flex items-center justify-center gap-1"
                >
                  <span>View Room Details</span>
                  <ChevronRight className="w-3.5 h-3.5 text-brand-brass" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleOpenCalculatorForRoom(rId)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="min-h-[42px] px-3.5 rounded-xl bg-brand-forest hover:bg-brand-forest-light text-white text-xs font-bold transition-colors"
                >
                  Hire Quote
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* 2 Catering Kitchens Photo Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[KITCHEN_RATES.main_kitchen, KITCHEN_RATES.jubilee_kitchen].map((kitchen) => (
          <div
            key={kitchen.id}
            className="group bg-brand-surface rounded-2xl border border-brand-forest/10 hover:border-brand-brass/40 shadow-soft hover:shadow-elevated transition-all overflow-hidden grid grid-cols-1 sm:grid-cols-12"
          >
            <button
              type="button"
              onClick={() => {
                setActiveTab('kitchens')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="sm:col-span-5 relative aspect-[16/10] sm:aspect-auto sm:h-full bg-brand-forest-dark overflow-hidden text-left"
            >
              <SmartImage
                urls={kitchen.imageCandidates || ['images/main-kitchen.jpg']}
                alt={`${kitchen.name} at King Edward Hall`}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-forest-dark/80 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-brand-brass-light border border-brand-brass/30">
                <Utensils className="w-3 h-3 text-brand-brass" /> +£{kitchen.flatRate} Flat Rate
              </span>
            </button>

            <div className="sm:col-span-7 p-5 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-brand-forest-dark mb-1.5">
                  {kitchen.name}
                </h3>
                <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed mb-4">
                  {kitchen.description}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('kitchens')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-forest hover:text-brand-brass transition-colors py-1.5"
                >
                  <span>View Kitchen Details &amp; Equipment</span>
                  <ChevronRight className="w-4 h-4 text-brand-brass" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderContent = () => {
    // 1. HOME TAB
    if (activeTab === 'home') {
      return (
        <div className="space-y-12 sm:space-y-16 animate-in fade-in duration-300">
          {/* Hero Section with Front-Page Photo Slide Deck */}
          <section className="relative overflow-hidden bg-brand-forest text-brand-cream py-10 sm:py-16 lg:py-20 px-4 sm:px-8 border-b border-brand-brass/30">
            {/* Subtle radial heritage glow */}
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-forest-light/40 via-transparent to-transparent"
              aria-hidden="true"
            />
            <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-brass/20 text-brand-brass-light border border-brand-brass/35 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-brand-brass" /> Historic 1911 Edwardian Landmark
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12]">
                  The Heart of Lindfield Community &amp; Celebrations
                </h1>

                <p className="text-sm sm:text-base text-brand-cream/85 leading-relaxed">
                  Situated directly opposite the picturesque village duck pond in West Sussex, King Edward Hall provides the premier venue for weddings, parties, theatrical performances, and community gatherings.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    onClick={() => setActiveTab('calculator')}
                    className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 bg-brand-brass hover:bg-brand-brass-hover text-white px-6 py-3 rounded-xl font-bold text-sm shadow-soft transition-all active:scale-[0.98]"
                  >
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>Check Availability &amp; Rates</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('events-home')}
                    className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-5 py-3 rounded-xl font-bold text-sm transition-all"
                  >
                    <span>Village Events</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>

                {/* Trust bar */}
                <div className="pt-4 border-t border-brand-forest-light/60 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-brand-cream/75">
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="font-bold text-white">4.5 / 5 Rating</span>
                    <span>(76 Reviews)</span>
                  </div>
                  <div>• Charity No. 249649</div>
                  <div>• 3 Rooms &amp; 2 Kitchens</div>
                </div>
              </div>

              {/* Original Front-Page Photo Slide Deck */}
              <div className="lg:col-span-7">
                <FrontPageSlideDeck setActiveTab={setActiveTab} />
              </div>
            </div>
          </section>

          {/* KEH Room Hire & Kitchens Visual Showcase (Matching Original Front Page) */}
          <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-brass block mb-1">
                  KEH Room &amp; Kitchen Hire
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest-dark">
                  Three Function Rooms &amp; Two Kitchens
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('room-hire')}
                className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-forest hover:text-brand-brass transition-colors"
              >
                <span>View Full 2026/2027 Tariff Table</span>
                <ArrowRight className="w-4 h-4 text-brand-brass" />
              </button>
            </div>

            {renderRoomsAndKitchensPhotoGrid()}
          </section>

          {/* Three Pillars Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-8 py-2 sm:py-4">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-brass block mb-1">
                Explore King Edward Hall
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest-dark">
                Three Pillars of Our Village Hub
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Pillar 1 */}
              <div className="bg-brand-surface rounded-2xl p-6 sm:p-8 border border-brand-forest/10 hover:border-brand-brass/40 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-forest/8 text-brand-forest border border-brand-brass/25 flex items-center justify-center mb-5">
                    <PillarVenueIcon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brand-forest-dark mb-2">Room Hire &amp; Facilities</h3>
                  <p className="text-sm text-brand-text-muted leading-relaxed mb-6">
                    Three versatile halls and two kitchens equipped with stage, PA sound loop, and step-free access for weddings, parties, and classes.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('room-hire')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-forest hover:text-brand-brass transition-colors py-1"
                >
                  <span>Explore Rooms &amp; Rates</span>
                  <ChevronRight className="w-4 h-4 text-brand-brass" />
                </button>
              </div>

              {/* Pillar 2 */}
              <div className="bg-brand-surface rounded-2xl p-6 sm:p-8 border border-brand-forest/10 hover:border-brand-brass/40 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-forest/8 text-brand-forest border border-brand-brass/25 flex items-center justify-center mb-5">
                    <PillarFestivalIcon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brand-forest-dark mb-2">Community Events</h3>
                  <p className="text-sm text-brand-text-muted leading-relaxed mb-6">
                    Home of Lindfield Village Day (49th year, 10,000+ visitors), the Lindfield Village Run 5K/10K, and monthly community Film Nights.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('events-home')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-forest hover:text-brand-brass transition-colors py-1"
                >
                  <span>View Event Calendar</span>
                  <ChevronRight className="w-4 h-4 text-brand-brass" />
                </button>
              </div>

              {/* Pillar 3 */}
              <div className="bg-brand-surface rounded-2xl p-6 sm:p-8 border border-brand-forest/10 hover:border-brand-brass/40 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-forest/8 text-brand-forest border border-brand-brass/25 flex items-center justify-center mb-5">
                    <PillarHeritageIcon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brand-forest-dark mb-2">Charity &amp; Heritage</h3>
                  <p className="text-sm text-brand-text-muted leading-relaxed mb-6">
                    Preserving 115+ years of Edwardian heritage, operated by volunteer trustees under Registered Charitable Trust No. 249649.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('about')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-forest hover:text-brand-brass transition-colors py-1"
                >
                  <span>Our History &amp; Charity</span>
                  <ChevronRight className="w-4 h-4 text-brand-brass" />
                </button>
              </div>
            </div>
          </section>

          {/* Interactive Calculator Section embedded on home */}
          <section className="bg-brand-cream-dark/50 py-10 sm:py-12 px-4 sm:px-8 border-y border-brand-cream-dark">
            <BookingCalculator
              initialRoomId={selectedCalculatorRoom}
              initialKitchenId={selectedCalculatorKitchen}
              showMobileStickyBar={false}
            />
          </section>
        </div>
      )
    }

    // 2. ROOM HIRE OVERVIEW & PRICING TABLE / MOBILE CARDS
    if (activeTab === 'room-hire') {
      return (
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-10 sm:space-y-12 animate-in fade-in duration-200">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-brass block mb-2">
              Transparent Venue Hire In Lindfield
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-forest-dark mb-4">
              Our Rooms &amp; Kitchens
            </h1>
            <p className="text-sm sm:text-base text-brand-text-muted leading-relaxed">
              We have 3 different-sized rooms available depending on your requirements, and two dedicated kitchens. Click on any room or kitchen below to explore photographs, floor plans, and hire details.
            </p>
          </div>

          {/* Visual Photo Showcase of All 3 Rooms & 2 Kitchens */}
          {renderRoomsAndKitchensPhotoGrid()}

          {/* Transparent Pricing Section (Mobile Cards + Desktop Table) */}
          <div className="bg-brand-surface rounded-2xl p-5 sm:p-8 border border-brand-forest/10 shadow-soft">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-forest-dark">Hire Charges (2026/2027)</h3>
                <p className="text-xs text-brand-text-muted">Standard hourly rates. Fully inclusive of tables, chairs, heating, and lighting.</p>
              </div>
              <button
                onClick={() => setActiveTab('calculator')}
                className="w-full sm:w-auto min-h-[44px] bg-brand-brass hover:bg-brand-brass-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-soft transition-colors"
              >
                Open Cost Estimator
              </button>
            </div>

            {/* Mobile-First Stacked Rate Cards (< md) */}
            <div className="md:hidden space-y-3.5">
              {(Object.keys(ROOM_RATES) as RoomId[]).map((rId) => {
                const room = ROOM_RATES[rId]
                const detailTab = `room-${rId}` as TabId
                return (
                  <div
                    key={rId}
                    className="p-4 rounded-xl bg-brand-cream/70 border border-brand-cream-dark space-y-3"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="font-serif text-lg font-bold text-brand-forest-dark">{room.name}</h4>
                        <span className="text-xs text-brand-text-muted">{room.dimensions}</span>
                      </div>
                      <span className="bg-brand-forest/10 text-brand-forest text-xs px-2.5 py-0.5 rounded-full font-bold">
                        {room.maxCapacity} seated
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-white p-2.5 rounded-lg border border-brand-cream-dark">
                      <div>
                        <span className="text-brand-text-muted block text-[11px]">Standard Weekday</span>
                        <strong className="text-brand-forest-dark text-sm">£{room.weekdayRate}.00 / hr</strong>
                      </div>
                      <div>
                        <span className="text-brand-text-muted block text-[11px]">Weekend / Fri Eve</span>
                        <strong className="text-brand-brass text-sm">£{room.weekendRate}.00 / hr</strong>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab(detailTab)}
                        className="flex-1 min-h-[42px] rounded-lg bg-white border border-brand-forest/15 text-xs font-bold text-brand-forest"
                      >
                        Room Details →
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenCalculatorForRoom(rId)}
                        className="flex-1 min-h-[42px] rounded-lg bg-brand-forest text-white text-xs font-bold"
                      >
                        Estimate Quote
                      </button>
                    </div>
                  </div>
                )
              })}

              {/* Kitchen Add-on Cards on Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[KITCHEN_RATES.main_kitchen, KITCHEN_RATES.jubilee_kitchen].map((k) => (
                  <div
                    key={k.id}
                    className="p-3.5 rounded-xl bg-brand-cream/40 border border-brand-cream-dark flex justify-between items-center gap-3"
                  >
                    <div>
                      <strong className="text-sm font-serif text-brand-forest-dark block">{k.name}</strong>
                      <span className="text-xs text-brand-text-muted">£{k.flatRate}.00 flat fee per session</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('kitchens')}
                      className="text-xs font-bold text-brand-forest underline shrink-0 py-2"
                    >
                      Details →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Comparison Table (md and up) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-brand-cream-dark text-brand-forest font-bold">
                    <th className="py-3 px-4">Room / Space</th>
                    <th className="py-3 px-4">Dimensions</th>
                    <th className="py-3 px-4">Capacity</th>
                    <th className="py-3 px-4">Standard Weekday</th>
                    <th className="py-3 px-4">Weekend Peak</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-cream-dark text-brand-text-dark">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-brand-forest-dark">{ROOM_RATES.newcombe.name}</td>
                    <td className="py-3.5 px-4 text-brand-text-muted">{ROOM_RATES.newcombe.dimensions}</td>
                    <td className="py-3.5 px-4"><span className="bg-brand-forest/10 text-brand-forest px-2 py-0.5 rounded font-bold">{ROOM_RATES.newcombe.maxCapacity} seated</span></td>
                    <td className="py-3.5 px-4 font-semibold">£{ROOM_RATES.newcombe.weekdayRate}.00 / hour</td>
                    <td className="py-3.5 px-4 font-bold text-brand-brass">£{ROOM_RATES.newcombe.weekendRate}.00 / hour</td>
                    <td className="py-3.5 px-4 text-right">
                      <button onClick={() => setActiveTab('room-newcombe')} className="text-brand-forest hover:underline font-bold">Details →</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-brand-forest-dark">{ROOM_RATES.jubilee.name}</td>
                    <td className="py-3.5 px-4 text-brand-text-muted">{ROOM_RATES.jubilee.dimensions}</td>
                    <td className="py-3.5 px-4"><span className="bg-brand-forest/10 text-brand-forest px-2 py-0.5 rounded font-bold">{ROOM_RATES.jubilee.maxCapacity} seated</span></td>
                    <td className="py-3.5 px-4 font-semibold">£{ROOM_RATES.jubilee.weekdayRate}.00 / hour</td>
                    <td className="py-3.5 px-4 font-bold text-brand-brass">£{ROOM_RATES.jubilee.weekendRate}.00 / hour</td>
                    <td className="py-3.5 px-4 text-right">
                      <button onClick={() => setActiveTab('room-jubilee')} className="text-brand-forest hover:underline font-bold">Details →</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-brand-forest-dark">{ROOM_RATES.library.name}</td>
                    <td className="py-3.5 px-4 text-brand-text-muted">{ROOM_RATES.library.dimensions}</td>
                    <td className="py-3.5 px-4"><span className="bg-brand-forest/10 text-brand-forest px-2 py-0.5 rounded font-bold">{ROOM_RATES.library.maxCapacity} seated</span></td>
                    <td className="py-3.5 px-4 font-semibold">£{ROOM_RATES.library.weekdayRate}.00 / hour</td>
                    <td className="py-3.5 px-4 font-bold text-brand-brass">£{ROOM_RATES.library.weekendRate}.00 / hour</td>
                    <td className="py-3.5 px-4 text-right">
                      <button onClick={() => setActiveTab('room-library')} className="text-brand-forest hover:underline font-bold">Details →</button>
                    </td>
                  </tr>
                  <tr className="bg-brand-cream/50">
                    <td className="py-3.5 px-4 font-semibold text-brand-forest-dark">{KITCHEN_RATES.main_kitchen.name}</td>
                    <td className="py-3.5 px-4 text-brand-text-muted">Full catering</td>
                    <td className="py-3.5 px-4 text-brand-text-muted">Commercial</td>
                    <td className="py-3.5 px-4 font-semibold" colSpan={2}>£{KITCHEN_RATES.main_kitchen.flatRate}.00 flat fee per session</td>
                    <td className="py-3.5 px-4 text-right">
                      <button onClick={() => setActiveTab('kitchens')} className="text-brand-forest hover:underline font-bold">Details →</button>
                    </td>
                  </tr>
                  <tr className="bg-brand-cream/50">
                    <td className="py-3.5 px-4 font-semibold text-brand-forest-dark">{KITCHEN_RATES.jubilee_kitchen.name}</td>
                    <td className="py-3.5 px-4 text-brand-text-muted">Tea &amp; cake service</td>
                    <td className="py-3.5 px-4 text-brand-text-muted">Domestic</td>
                    <td className="py-3.5 px-4 font-semibold" colSpan={2}>£{KITCHEN_RATES.jubilee_kitchen.flatRate}.00 flat fee per session</td>
                    <td className="py-3.5 px-4 text-right">
                      <button onClick={() => setActiveTab('kitchens')} className="text-brand-forest hover:underline font-bold">Details →</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Embedded Calculator */}
          <BookingCalculator
            initialRoomId={selectedCalculatorRoom}
            initialKitchenId={selectedCalculatorKitchen}
            showMobileStickyBar={false}
          />
        </div>
      )
    }

    // 3. SPECIFIC ROOM SHOWCASES
    if (activeTab === 'room-newcombe') {
      return (
        <RoomShowcases
          currentRoom="newcombe"
          setActiveTab={setActiveTab}
          onSelectRoomForCalculator={handleOpenCalculatorForRoom}
        />
      )
    }
    if (activeTab === 'room-jubilee') {
      return (
        <RoomShowcases
          currentRoom="jubilee"
          setActiveTab={setActiveTab}
          onSelectRoomForCalculator={handleOpenCalculatorForRoom}
        />
      )
    }
    if (activeTab === 'room-library') {
      return (
        <RoomShowcases
          currentRoom="library"
          setActiveTab={setActiveTab}
          onSelectRoomForCalculator={handleOpenCalculatorForRoom}
        />
      )
    }
    if (activeTab === 'kitchens') {
      return (
        <RoomShowcases
          currentRoom="kitchens"
          setActiveTab={setActiveTab}
          onSelectRoomForCalculator={handleOpenCalculatorForRoom}
        />
      )
    }
    if (activeTab === 'calculator') {
      return (
        <div className="py-4 sm:py-8 px-4 sm:px-8">
          <BookingCalculator
            initialRoomId={selectedCalculatorRoom}
            initialKitchenId={selectedCalculatorKitchen}
            showMobileStickyBar={true}
          />
        </div>
      )
    }

    // 4. COMMUNITY EVENT HUBS
    if (activeTab === 'events-home') return <EventHubs currentEvent="all" setActiveTab={setActiveTab} />
    if (activeTab === 'event-village-day') return <EventHubs currentEvent="village-day" setActiveTab={setActiveTab} />
    if (activeTab === 'event-village-run') return <EventHubs currentEvent="village-run" setActiveTab={setActiveTab} />
    if (activeTab === 'event-film-nights') return <EventHubs currentEvent="film-nights" setActiveTab={setActiveTab} />
    if (activeTab === 'event-sponsors') return <EventHubs currentEvent="sponsors" setActiveTab={setActiveTab} />

    // 5. ABOUT, HISTORY, CHARITY & FAQ
    if (activeTab === 'about') return <AboutAndCharity section="about" setActiveTab={setActiveTab} />
    if (activeTab === 'history') return <AboutAndCharity section="history" setActiveTab={setActiveTab} />
    if (activeTab === 'donate') return <AboutAndCharity section="donate" setActiveTab={setActiveTab} />
    if (activeTab === 'faq') return <AboutAndCharity section="faq" setActiveTab={setActiveTab} />
    if (activeTab === 'contact') return <AboutAndCharity section="contact" setActiveTab={setActiveTab} />

    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-brand-text-dark font-sans selection:bg-brand-brass selection:text-white">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1">
        {renderContent()}
      </main>
      <Footer setActiveTab={setActiveTab} />
    </div>
  )
}

export default App
