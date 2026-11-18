import React, { useState } from 'react'
import { TabId } from './Header'
import { SubNavPills, SubNavItem } from './SubNavPills'
import { 
  Check, 
  Ticket, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  UserPlus, 
  HeartHandshake, 
  Send,
  Store,
  Award,
  Flag,
  Music
} from 'lucide-react'

interface EventHubsProps {
  currentEvent: 'all' | 'village-day' | 'village-run' | 'film-nights' | 'sponsors'
  setActiveTab: (tab: TabId) => void
}

const EVENT_SUB_NAV_ITEMS: SubNavItem<TabId>[] = [
  { id: 'events-home', label: 'All Community Events' },
  { id: 'event-village-day', label: 'Lindfield Village Day' },
  { id: 'event-village-run', label: 'Village Run 5K & 10K' },
  { id: 'event-film-nights', label: 'Film Nights Cinema' },
  { id: 'event-sponsors', label: 'Community Sponsors' }
]

export const EventHubs: React.FC<EventHubsProps> = ({ currentEvent, setActiveTab }) => {
  // Cinema ticket booking state
  const [filmTickets, setFilmTickets] = useState(2)
  const [selectedFilm, setSelectedFilm] = useState('Sense and Sensibility (21 Jan 2027)')
  const [cinemaBooked, setCinemaBooked] = useState(false)

  // Stallholder interest state
  const [stallName, setStallName] = useState('')
  const [stallCategory, setStallCategory] = useState('crafts')
  const [stallSubmitted, setStallSubmitted] = useState(false)

  // Village Run Registration State
  const [runnerName, setRunnerName] = useState('')
  const [runnerEmail, setRunnerEmail] = useState('')
  const [runnerRace, setRunnerRace] = useState<'5k' | '10k'>('10k')
  const [runnerRegistered, setRunnerRegistered] = useState(false)

  // Village Run FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Calculate days remaining to Village Run (23/05/2027) and Village Day (05/06/2027)
  const calculateDaysRemaining = (targetDateString: string) => {
    const target = new Date(targetDateString).getTime()
    const now = Date.now()
    const diff = target - now
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  const runDays = calculateDaysRemaining('2027-05-23T10:30:00')
  const dayDays = calculateDaysRemaining('2027-06-05T12:00:00')

  const activeNavTab: TabId =
    currentEvent === 'all'
      ? 'events-home'
      : (`event-${currentEvent}` as TabId)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
      {/* Touch-friendly horizontal scroll-snap sub-navigation */}
      <SubNavPills
        items={EVENT_SUB_NAV_ITEMS}
        activeId={activeNavTab}
        onSelect={(tab) => setActiveTab(tab)}
        ariaLabel="Community events navigation"
      />

      {/* ALL EVENTS OVERVIEW */}
      {currentEvent === 'all' && (
        <div className="space-y-12 animate-in fade-in duration-200">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-brass block mb-2">
              Volunteers &amp; Community In Action
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-forest-dark mb-4">
              Community Celebrations &amp; Events
            </h1>
            <p className="text-sm sm:text-base text-brand-text-muted leading-relaxed">
              Every major village tradition in Lindfield connects back to King Edward Hall. Organised entirely by volunteers, funds raised during Village Day and the Village Run directly maintain our charitable trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1: Village Day */}
            <div className="bg-brand-surface rounded-2xl p-6 border border-brand-forest/10 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold uppercase">
                    Saturday 05/06/2027
                  </span>
                  <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {dayDays} Days
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-forest-dark mb-2">
                  Lindfield Village Day
                </h3>
                <p className="text-xs sm:text-sm text-brand-text-muted mb-5 leading-relaxed">
                  Over 10,000 visitors, 150 stalls on Lindfield Common, children’s dog show, High Street carnival procession, and live music stage.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('event-village-day')}
                className="w-full min-h-[46px] bg-brand-forest text-white text-xs font-bold py-2.5 rounded-xl hover:bg-brand-forest-light transition-colors"
              >
                View Village Day &amp; Register Stall
              </button>
            </div>

            {/* Card 2: Village Run */}
            <div className="bg-brand-surface rounded-2xl p-6 border border-brand-forest/10 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold uppercase">
                    Sunday 23/05/2027
                  </span>
                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {runDays} Days
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-forest-dark mb-2">
                  Lindfield Village Run
                </h3>
                <p className="text-xs sm:text-sm text-brand-text-muted mb-5 leading-relaxed">
                  Scenic 5K and 10K rural trail courses starting at Hickmans Lane Recreation Ground. Electronic chip timing and commemorative medals for all runners.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('event-village-run')}
                className="w-full min-h-[46px] bg-brand-forest text-white text-xs font-bold py-2.5 rounded-xl hover:bg-brand-forest-light transition-colors"
              >
                View Race Guide &amp; Enter Run
              </button>
            </div>

            {/* Card 3: Film Nights */}
            <div className="bg-brand-surface rounded-2xl p-6 border border-brand-forest/10 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
              <div>
                <div className="mb-3">
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-[11px] font-bold uppercase">
                    Monthly Cinema • Newcombe Hall
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-forest-dark mb-2">
                  Film Nights Cinema
                </h3>
                <p className="text-xs sm:text-sm text-brand-text-muted mb-5 leading-relaxed">
                  Blockbuster screenings in the comfort of Newcombe Hall with surround audio, cinema screen, tea, coffee, and homemade cakes.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('event-film-nights')}
                className="w-full min-h-[46px] bg-brand-forest text-white text-xs font-bold py-2.5 rounded-xl hover:bg-brand-forest-light transition-colors"
              >
                Book Film Tickets (£9)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VILLAGE DAY HUB */}
      {currentEvent === 'village-day' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          <div className="p-6 sm:p-12 rounded-2xl bg-gradient-to-br from-brand-forest to-brand-forest-dark text-brand-cream relative overflow-hidden shadow-elevated border border-brand-brass/30">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-3 py-1 rounded-full bg-brand-brass text-white text-xs font-bold uppercase">
                Save the Date • 05/06/2027
              </span>
              <span className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-brass-light" /> Countdown: {dayDays} Days Until Village Day
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-3">
              Lindfield Village Day 2027
            </h1>
            <p className="text-brand-cream/85 text-sm sm:text-base max-w-2xl leading-relaxed mb-6">
              Celebrating its 49th year, Village Day is Mid Sussex’s most celebrated traditional community festival. Hundreds of villagers parade down Lindfield High Street to the Common for a full afternoon of arena entertainment, food quarters, and over 150 local artisan stalls.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-2.5 text-xs font-semibold">
              <span className="bg-white/10 border border-white/15 px-3.5 py-2 rounded-xl flex items-center gap-2">
                <Store className="w-4 h-4 text-brand-brass-light shrink-0" /> 150+ Stalls on Lindfield Common
              </span>
              <span className="bg-white/10 border border-white/15 px-3.5 py-2 rounded-xl flex items-center gap-2">
                <Award className="w-4 h-4 text-brand-brass-light shrink-0" /> Children’s Dog Show
              </span>
              <span className="bg-white/10 border border-white/15 px-3.5 py-2 rounded-xl flex items-center gap-2">
                <Flag className="w-4 h-4 text-brand-brass-light shrink-0" /> High Street Carnival Procession
              </span>
              <span className="bg-white/10 border border-white/15 px-3.5 py-2 rounded-xl flex items-center gap-2">
                <Music className="w-4 h-4 text-brand-brass-light shrink-0" /> Live Music &amp; Sussex Food Quarter
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Event Schedule */}
            <div className="p-6 bg-brand-surface rounded-2xl border border-brand-forest/10 shadow-soft space-y-4">
              <h3 className="font-serif text-xl font-bold text-brand-forest-dark">Schedule &amp; Locations</h3>
              <div className="space-y-3 text-xs text-brand-text-muted">
                <div className="flex gap-4 p-3.5 bg-brand-cream rounded-xl">
                  <span className="font-bold text-brand-forest text-sm shrink-0">12:00 PM</span>
                  <div>
                    <strong className="text-brand-forest-dark block">Grand High Street Procession</strong>
                    Parade departs from the top of High Street down past the duck pond to Lindfield Common.
                  </div>
                </div>
                <div className="flex gap-4 p-3.5 bg-brand-cream rounded-xl">
                  <span className="font-bold text-brand-forest text-sm shrink-0">1:00 PM</span>
                  <div>
                    <strong className="text-brand-forest-dark block">Arena Entertainment &amp; Dog Show</strong>
                    Main arena displays, children’s competition tent, and food quarter open.
                  </div>
                </div>
                <div className="flex gap-4 p-3.5 bg-brand-cream rounded-xl">
                  <span className="font-bold text-brand-forest text-sm shrink-0">5:00 PM</span>
                  <div>
                    <strong className="text-brand-forest-dark block">Stalls Close &amp; Live Hub Evening</strong>
                    Stalls wrap up while the Live Hub stage continues with evening bands and local Sussex food until 6:30 PM.
                  </div>
                </div>
              </div>
            </div>

            {/* Stallholder Registration */}
            <div className="p-6 bg-brand-surface rounded-2xl border border-brand-brass/30 shadow-soft">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-brass block mb-1">
                Stallholder Registration
              </span>
              <h3 className="font-serif text-xl font-bold text-brand-forest-dark mb-2">
                Register Your Stall Interest
              </h3>
              <p className="text-xs text-brand-text-muted mb-4 leading-relaxed">
                Village Day stalls are strictly limited to 150 pitches and sell out within days of opening. Register below to be notified first.
              </p>

              {stallSubmitted ? (
                <div className="p-4 bg-emerald-50 text-emerald-900 rounded-xl text-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Thank you! Your stall interest for <strong>{stallName}</strong> ({stallCategory}) has been prepared.</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`mailto:villageday@kingedwardhall.org.uk?subject=${encodeURIComponent(`Village Day Stall Interest - ${stallName}`)}&body=${encodeURIComponent(`Hello Village Day Committee,\n\nI would like to register stallholder interest for Lindfield Village Day (05/06/2027):\n\nBusiness / Charity: ${stallName}\nCategory: ${stallCategory}\n\nThank you!`)}`}
                      className="inline-flex items-center gap-1.5 bg-brand-forest text-white px-4 py-2 rounded-lg font-bold hover:bg-brand-forest-light transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" /> Send Email to Village Day Team
                    </a>
                    <button
                      type="button"
                      onClick={() => setStallSubmitted(false)}
                      className="text-brand-forest underline px-2 py-1"
                    >
                      Edit details
                    </button>
                  </div>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => { e.preventDefault(); setStallSubmitted(true) }} 
                  className="space-y-3.5"
                >
                  <div>
                    <label className="block text-xs font-semibold text-brand-text-dark mb-1">Business / Charity Name</label>
                    <input 
                      type="text" 
                      value={stallName} 
                      onChange={(e) => setStallName(e.target.value)} 
                      placeholder="e.g. Lindfield Honey & Crafts" 
                      className="w-full min-h-[44px] text-xs sm:text-sm p-2.5 border border-brand-forest/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-brass"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-text-dark mb-1">Stall Category</label>
                    <select 
                      value={stallCategory} 
                      onChange={(e) => setStallCategory(e.target.value)}
                      className="w-full min-h-[44px] text-xs sm:text-sm p-2.5 border border-brand-forest/20 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-brass"
                    >
                      <option value="crafts">Handmade Crafts &amp; Gifts</option>
                      <option value="food">Local Artisan Food / Produce</option>
                      <option value="charity">Registered Local Charity</option>
                      <option value="commercial">Commercial / Retail Service</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full min-h-[48px] bg-brand-brass hover:bg-brand-brass-hover text-white py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-soft"
                  >
                    Submit Stall Notification Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VILLAGE RUN HUB */}
      {currentEvent === 'village-run' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          <div className="p-6 sm:p-12 rounded-2xl bg-gradient-to-br from-emerald-900 to-brand-forest-dark text-white relative shadow-elevated border border-brand-brass/30">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="px-3 py-1 rounded-full bg-emerald-400 text-emerald-950 text-xs font-bold uppercase">
                Sunday 23/05/2027 • Chip Timed
              </span>
              <span className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Countdown: {runDays} Days Until Race Day
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-3">
              Lindfield Village Run 5K &amp; 10K
            </h1>
            <p className="text-white/85 text-sm sm:text-base max-w-2xl leading-relaxed mb-6">
              A classic Sussex cross-country challenge through undulating pastures, woodlands, and countryside trails around Lindfield. 100% of proceeds support the King Edward Hall trust.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
              <div className="bg-white/10 border border-white/15 p-3 rounded-xl">
                <span className="text-xs text-white/70 block">5K Start Time</span>
                <span className="font-bold text-lg">10:45 AM</span>
              </div>
              <div className="bg-white/10 border border-white/15 p-3 rounded-xl">
                <span className="text-xs text-white/70 block">10K Start Time</span>
                <span className="font-bold text-lg">10:30 AM</span>
              </div>
              <div className="bg-white/10 border border-white/15 p-3 rounded-xl">
                <span className="text-xs text-white/70 block">5K Entry</span>
                <span className="font-bold text-lg">£10.00</span>
              </div>
              <div className="bg-white/10 border border-white/15 p-3 rounded-xl">
                <span className="text-xs text-white/70 block">10K Entry</span>
                <span className="font-bold text-lg">£20.00</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Race Entry Form */}
            <div className="p-6 bg-brand-surface rounded-2xl border border-brand-forest/10 shadow-soft">
              <div className="flex items-center gap-2 text-brand-forest font-serif font-bold text-xl mb-1">
                <UserPlus className="w-5 h-5 text-brand-brass" /> Runner Pre-Registration
              </div>
              <p className="text-xs text-brand-text-muted mb-4 leading-relaxed">
                Both 5K and 10K entries sold out early in 2026. Pre-register your spot to guarantee your timing chip and commemorative medal.
              </p>

              {runnerRegistered ? (
                <div className="p-6 bg-emerald-50 text-emerald-900 rounded-xl text-center space-y-3">
                  <Check className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-lg font-bold">Registration Logged!</h4>
                  <p className="text-xs text-brand-text-muted">
                    Thank you, <strong>{runnerName}</strong>. You are provisional for the <strong>{runnerRace.toUpperCase()} race</strong> ({runnerEmail}).
                  </p>
                  <div className="pt-1">
                    <a
                      href={`mailto:run@kingedwardhall.org.uk?subject=${encodeURIComponent(`Village Run ${runnerRace.toUpperCase()} Entry - ${runnerName}`)}&body=${encodeURIComponent(`Hello Village Run Team,\n\nI would like to pre-register for the Lindfield Village Run (23/05/2027):\n\nRunner Name: ${runnerName}\nEmail: ${runnerEmail}\nDistance: ${runnerRace.toUpperCase()} (${runnerRace === '10k' ? '£20' : '£10'})\n\nThank you!`)}`}
                      className="inline-flex items-center justify-center gap-1.5 bg-brand-forest text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-brand-forest-light transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" /> Confirm via Email to Race Team
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRunnerRegistered(false)}
                    className="text-xs text-brand-forest underline pt-1 block mx-auto"
                  >
                    Register another runner
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => { e.preventDefault(); setRunnerRegistered(true); }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-brand-text-dark mb-1">Runner Full Name *</label>
                    <input 
                      type="text" 
                      value={runnerName} 
                      onChange={(e) => setRunnerName(e.target.value)} 
                      placeholder="e.g. David Thompson"
                      className="w-full min-h-[44px] text-xs sm:text-sm p-2.5 border border-brand-forest/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-brass"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-text-dark mb-1">Email Address *</label>
                    <input 
                      type="email" 
                      value={runnerEmail} 
                      onChange={(e) => setRunnerEmail(e.target.value)} 
                      placeholder="david@example.com"
                      className="w-full min-h-[44px] text-xs sm:text-sm p-2.5 border border-brand-forest/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-brass"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-text-dark mb-1">Choose Distance</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRunnerRace('5k')}
                        className={`min-h-[46px] p-3 rounded-xl text-xs font-bold border transition-colors ${
                          runnerRace === '5k' ? 'bg-brand-forest text-white border-brand-forest' : 'bg-brand-cream border-brand-cream-dark'
                        }`}
                      >
                        5K Cross-Country (£10)
                      </button>
                      <button
                        type="button"
                        onClick={() => setRunnerRace('10k')}
                        className={`min-h-[46px] p-3 rounded-xl text-xs font-bold border transition-colors ${
                          runnerRace === '10k' ? 'bg-brand-forest text-white border-brand-forest' : 'bg-brand-cream border-brand-cream-dark'
                        }`}
                      >
                        10K Cross-Country (£20)
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full min-h-[48px] bg-brand-forest hover:bg-brand-forest-light text-white py-3 rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-soft"
                  >
                    Submit Race Entry Request
                  </button>
                </form>
              )}
            </div>

            {/* Race Day Accordion FAQs */}
            <div className="p-6 bg-brand-surface rounded-2xl border border-brand-forest/10 shadow-soft space-y-4">
              <h3 className="font-serif text-xl font-bold text-brand-forest-dark">Runner Information &amp; FAQs</h3>
              
              <div className="space-y-2.5">
                {[
                  { q: "Where does the race start and finish?", a: "The race starts and finishes at Hickmans Lane Recreation Ground in Lindfield, where bag drop tents, refreshments, and first aid are stationed." },
                  { q: "What is the trail terrain like?", a: "Both the 5K and 10K are true rural cross-country routes involving uneven grass, stile crossings, step climbs, and occasional muddy sections depending on weather." },
                  { q: "Are headphones permitted?", a: "No. Because the route crosses active country roads and footpaths, headphones are strictly banned for participant safety and awareness of marshals." },
                  { q: "Are water stations provided?", a: "Yes. Water points are stationed at the start/finish area plus 3 course points on the 10K route and 1 water point on the 5K route." }
                ].map((faq, index) => {
                  const isOpen = openFaq === index
                  return (
                    <div key={index} className="border border-brand-cream-dark rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full min-h-[48px] text-left p-4 text-xs sm:text-sm font-semibold flex justify-between items-center gap-3 bg-brand-cream hover:bg-brand-cream-dark transition-colors"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-brand-forest shrink-0" /> : <ChevronDown className="w-4 h-4 text-brand-text-muted shrink-0" />}
                      </button>
                      {isOpen && (
                        <div className="p-4 text-xs sm:text-sm text-brand-text-muted bg-white border-t border-brand-cream-dark leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FILM NIGHTS HUB */}
      {currentEvent === 'film-nights' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          <div className="p-6 sm:p-12 rounded-2xl bg-gradient-to-br from-purple-900 to-brand-forest-dark text-white relative shadow-elevated border border-brand-brass/30">
            <span className="px-3 py-1 rounded-full bg-purple-300 text-purple-950 text-xs font-bold uppercase mb-3 inline-block">
              Village Cinema Experience
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-3">
              Film Nights at King Edward Hall
            </h1>
            <p className="text-white/85 text-sm sm:text-base max-w-2xl leading-relaxed mb-4">
              Enjoy celebrated movies in the comfort of Newcombe Hall with your fellow Lindfield residents. Screenings feature high-definition projection, full hall surround audio, comfortable tiered seating, and intermission refreshments.
            </p>
            <div className="text-xs sm:text-sm text-brand-brass-light font-bold">
              Tickets: £9.00 per person • Tea, coffee &amp; homemade cakes available
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Upcoming Film Cards (Clickable to select film) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl font-bold text-brand-forest-dark">Upcoming Screenings</h3>
                <span className="text-xs text-brand-text-muted">Tap a film to select</span>
              </div>

              {[
                {
                  id: 'Sense and Sensibility (21 Jan 2027)',
                  dateLabel: 'Thursday 21st January 2027 • 7:30 PM',
                  title: 'Sense and Sensibility',
                  meta: 'Genre: Period Drama • Certificate: U',
                  synopsis:
                    'Emma Thompson and Kate Winslet star in Jane Austen’s classic tale of romance and social mores in idyllic English country estates.'
                },
                {
                  id: 'Pressure (19 Nov 2026)',
                  dateLabel: 'Thursday 19th November 2026 • 7:30 PM',
                  title: 'Pressure',
                  meta: 'Genre: Historical Drama • Certificate: 12A',
                  synopsis:
                    'The gripping story of Group Captain James Stagg and the critical weather forecast that determined the fate of the D-Day landings.'
                }
              ].map((film) => {
                const isSelected = selectedFilm === film.id
                return (
                  <button
                    key={film.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      setSelectedFilm(film.id)
                      setCinemaBooked(false)
                    }}
                    className={`w-full text-left p-5 rounded-2xl transition-all cursor-pointer block ${
                      isSelected
                        ? 'border-2 border-brand-brass bg-brand-surface shadow-elevated ring-2 ring-brand-brass/15'
                        : 'border border-brand-cream-dark bg-brand-surface/80 hover:bg-brand-surface hover:border-brand-brass/50 shadow-soft'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <span className="text-[11px] font-bold text-brand-forest uppercase tracking-wider block">
                        {film.dateLabel}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-brand-forest text-white'
                            : 'bg-brand-cream text-brand-forest-dark'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select Film'}
                      </span>
                    </div>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-brand-forest-dark mb-1">
                      {film.title}
                    </h4>
                    <span className="text-xs font-semibold text-brand-brass block mb-3">
                      {film.meta}
                    </span>
                    <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed mb-4">
                      {film.synopsis}
                    </p>
                    <div
                      className={`text-xs font-semibold p-2.5 rounded-xl flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'text-emerald-800 bg-emerald-50 border border-emerald-200/60'
                          : 'text-brand-forest bg-brand-cream/70'
                      }`}
                    >
                      <span>
                        {isSelected
                          ? '✓ Selected for booking • £9 per ticket'
                          : 'Click to book this screening • £9 per ticket'}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Instant Online Ticket Reservation Counter */}
            <div className="p-6 bg-brand-surface rounded-2xl border border-brand-forest/10 shadow-soft">
              <h3 className="font-serif text-xl font-bold text-brand-forest-dark mb-2">Book Advanced Tickets</h3>
              <p className="text-xs text-brand-text-muted mb-4 leading-relaxed">
                Secure your seats online without transaction fees. Tickets will be held under your name for collection on the door.
              </p>

              {cinemaBooked ? (
                <div className="p-6 bg-emerald-50 text-emerald-900 rounded-xl text-center space-y-3">
                  <Ticket className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-lg font-bold">Booking Provisional Complete!</h4>
                  <p className="text-xs text-brand-text-muted">
                    {filmTickets} ticket(s) reserved for <strong>{selectedFilm}</strong>. Total to pay on collection: <strong>£{filmTickets * 9}</strong>.
                  </p>
                  <div className="pt-1">
                    <a
                      href={`mailto:secretary@kingedwardhall.org.uk?subject=${encodeURIComponent(`Film Nights Ticket Reservation - ${selectedFilm}`)}&body=${encodeURIComponent(`Hello King Edward Hall Film Nights Team,\n\nI would like to reserve door-collection tickets for:\n\nScreening: ${selectedFilm}\nTickets: ${filmTickets} (£${filmTickets * 9}.00 total)\n\nThank you!`)}`}
                      className="inline-flex items-center justify-center gap-1.5 bg-brand-forest text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-brand-forest-light transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" /> Send Reservation Email
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCinemaBooked(false)}
                    className="text-xs text-brand-forest underline pt-1 block mx-auto"
                  >
                    Book for another screening
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-text-dark mb-1">Select Film</label>
                    <select
                      value={selectedFilm}
                      onChange={(e) => setSelectedFilm(e.target.value)}
                      className="w-full min-h-[44px] text-xs sm:text-sm p-2.5 border border-brand-forest/20 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-brass"
                    >
                      <option value="Sense and Sensibility (21 Jan 2027)">Sense and Sensibility (21 Jan 2027)</option>
                      <option value="Pressure (19 Nov 2026)">Pressure (19 Nov 2026)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-text-dark mb-1.5">Number of Tickets</label>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 6].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFilmTickets(num)}
                          className={`min-h-[42px] rounded-xl text-xs font-bold transition-colors ${
                            filmTickets === num ? 'bg-brand-forest text-white shadow-soft' : 'bg-brand-cream hover:bg-brand-cream-dark text-brand-forest-dark'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 bg-brand-cream rounded-xl flex justify-between items-center text-xs">
                    <span className="text-brand-text-muted">Total Due (£9 × {filmTickets}):</span>
                    <span className="font-serif text-lg font-bold text-brand-forest-dark">£{filmTickets * 9}.00</span>
                  </div>

                  <button
                    onClick={() => setCinemaBooked(true)}
                    className="w-full min-h-[48px] bg-brand-brass hover:bg-brand-brass-hover text-white py-3 rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-soft"
                  >
                    Confirm Ticket Reservation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SPONSORS ARCHIVE HUB */}
      {currentEvent === 'sponsors' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-brass block mb-1">
              Local Businesses Giving Back
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest-dark mb-3">
              Community Event Sponsors
            </h1>
            <p className="text-sm text-brand-text-muted leading-relaxed">
              Lindfield Village Day and the Lindfield Village Run are made possible through the generous support of local businesses, family firms, and regional partners.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { name: 'Hamptons Estate Agents', category: 'Headline Village Day Sponsor' },
              { name: 'RTFJ Fine Jewellery', category: 'Major Village Run Sponsor' },
              { name: 'UpCountry Garden Store', category: 'Arena & Grounds Partner' },
              { name: 'Lindfield Life Magazine', category: 'Official Media Partner' },
              { name: 'Mid Downs Radio', category: 'Live Broadcast Sponsor' },
              { name: 'Claire Nash Solicitors', category: 'Community Event Supporter' },
              { name: 'Oathall Veterinary Group', category: 'Children’s Dog Show Sponsor' },
              { name: 'Lindfield Parish Council', category: 'Civic Grant Partner' }
            ].map((sponsor, i) => (
              <div key={i} className="bg-brand-surface p-5 sm:p-6 rounded-2xl border border-brand-forest/10 shadow-soft text-center flex flex-col justify-center">
                <HeartHandshake className="w-7 h-7 sm:w-8 sm:h-8 text-brand-brass mx-auto mb-3" />
                <h4 className="font-serif text-sm sm:text-base font-bold text-brand-forest-dark mb-1">{sponsor.name}</h4>
                <span className="text-[11px] text-brand-text-muted">{sponsor.category}</span>
              </div>
            ))}
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-brand-cream border border-brand-cream-dark text-center max-w-2xl mx-auto space-y-3">
            <h4 className="font-serif text-xl font-bold text-brand-forest-dark">Become a 2027 Event Sponsor</h4>
            <p className="text-xs sm:text-sm text-brand-text-muted">
              Connect your business with over 10,000 local Sussex residents while directly funding the preservation of King Edward Hall.
            </p>
            <a 
              href="mailto:villageday@kingedwardhall.org.uk?subject=2027%20Sponsorship%20Inquiry"
              className="min-h-[46px] inline-flex items-center justify-center gap-2 bg-brand-forest text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-brand-forest-light transition-colors"
            >
              <Send className="w-3.5 h-3.5" /> Inquire About Business Sponsorship
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
