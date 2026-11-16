import { useState } from 'react'
import { TabId } from './Header'
import { Check, Ticket, ChevronDown, ChevronUp } from 'lucide-react'

interface EventHubsProps {
  currentEvent: 'all' | 'village-day' | 'village-run' | 'film-nights'
  setActiveTab: (tab: TabId) => void
}

export const EventHubs: React.FC<EventHubsProps> = ({ currentEvent, setActiveTab }) => {
  // Cinema ticket booking state
  const [filmTickets, setFilmTickets] = useState(2)
  const [selectedFilm, setSelectedFilm] = useState('Sense and Sensibility (21 Jan 2027)')
  const [cinemaBooked, setCinemaBooked] = useState(false)

  // Stallholder interest state
  const [stallName, setStallName] = useState('')
  const [stallCategory, setStallCategory] = useState('crafts')
  const [stallSubmitted, setStallSubmitted] = useState(false)

  // Village Run FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
      {/* Navigation sub-tabs */}
      <div className="flex flex-wrap gap-2 border-b border-brand-cream-dark pb-4 mb-10">
        <button
          onClick={() => setActiveTab('events-home')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
            currentEvent === 'all' ? 'bg-brand-forest text-white' : 'bg-brand-cream hover:bg-brand-cream-dark text-brand-forest-dark'
          }`}
        >
          All Community Events
        </button>
        <button
          onClick={() => setActiveTab('event-village-day')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
            currentEvent === 'village-day' ? 'bg-brand-forest text-white' : 'bg-brand-cream hover:bg-brand-cream-dark text-brand-forest-dark'
          }`}
        >
          Lindfield Village Day
        </button>
        <button
          onClick={() => setActiveTab('event-village-run')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
            currentEvent === 'village-run' ? 'bg-brand-forest text-white' : 'bg-brand-cream hover:bg-brand-cream-dark text-brand-forest-dark'
          }`}
        >
          Village Run 5K & 10K
        </button>
        <button
          onClick={() => setActiveTab('event-film-nights')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
            currentEvent === 'film-nights' ? 'bg-brand-forest text-white' : 'bg-brand-cream hover:bg-brand-cream-dark text-brand-forest-dark'
          }`}
        >
          Film Nights Cinema
        </button>
      </div>

      {/* ALL EVENTS OVERVIEW */}
      {currentEvent === 'all' && (
        <div className="space-y-12 animate-in fade-in duration-200">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-brass block mb-2">
              Volunteers & Community In Action
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-forest-dark mb-4">
              Community Celebrations & Events
            </h1>
            <p className="text-sm sm:text-base text-brand-text-muted leading-relaxed">
              Every major village tradition in Lindfield connects back to King Edward Hall. Organised entirely by volunteers, funds raised during Village Day and the Village Run directly maintain our charitable trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Village Day */}
            <div className="bg-brand-surface rounded-2xl p-6 border border-brand-forest/10 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold uppercase mb-3">
                  Saturday 05/06/2027 • 49th Year
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-forest-dark mb-2">
                  Lindfield Village Day
                </h3>
                <p className="text-xs text-brand-text-muted mb-4 leading-relaxed">
                  Over 10,000 visitors, 150 stalls on Lindfield Common, children’s dog show, High Street carnival procession, and live music stage.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('event-village-day')}
                className="w-full bg-brand-forest text-white text-xs font-bold py-2.5 rounded-lg hover:bg-brand-forest-light transition-colors"
              >
                View Village Day & Register Stall
              </button>
            </div>

            {/* Card 2: Village Run */}
            <div className="bg-brand-surface rounded-2xl p-6 border border-brand-forest/10 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold uppercase mb-3">
                  Sunday 23/05/2027 • Cross-Country
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-forest-dark mb-2">
                  Lindfield Village Run
                </h3>
                <p className="text-xs text-brand-text-muted mb-4 leading-relaxed">
                  Scenic 5K and 10K rural trail courses starting at Hickmans Lane Recreation Ground. Electronic chip timing and commemorative medals for all runners.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('event-village-run')}
                className="w-full bg-brand-forest text-white text-xs font-bold py-2.5 rounded-lg hover:bg-brand-forest-light transition-colors"
              >
                View Race Guide & 2027 Info
              </button>
            </div>

            {/* Card 3: Film Nights */}
            <div className="bg-brand-surface rounded-2xl p-6 border border-brand-forest/10 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-[11px] font-bold uppercase mb-3">
                  Monthly Cinema • Newcombe Hall
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-forest-dark mb-2">
                  Film Nights Cinema
                </h3>
                <p className="text-xs text-brand-text-muted mb-4 leading-relaxed">
                  Blockbuster screenings in the comfort of Newcombe Hall with surround audio, cinema screen, tea, coffee, and homemade cakes.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('event-film-nights')}
                className="w-full bg-brand-forest text-white text-xs font-bold py-2.5 rounded-lg hover:bg-brand-forest-light transition-colors"
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
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-brand-forest to-brand-forest-dark text-brand-cream relative overflow-hidden shadow-elevated">
            <span className="px-3 py-1 rounded-full bg-brand-brass text-brand-forest-dark text-xs font-bold uppercase mb-3 inline-block">
              Save the Date • 05/06/2027
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-3">
              Lindfield Village Day 2027
            </h1>
            <p className="text-brand-cream/80 text-sm sm:text-base max-w-2xl leading-relaxed mb-6">
              Celebrating its 49th year, Village Day is Mid Sussex’s most celebrated traditional community festival. Hundreds of villagers parade down Lindfield High Street to the Common for a full afternoon of arena entertainment, food quarters, and over 150 local artisan stalls.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold">
              <span className="bg-white/10 px-3 py-1.5 rounded-md">🎪 150+ Stalls on Lindfield Common</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-md">🐕 Children’s Dog Show</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-md">🎺 High Street Carnival Procession</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-md">🎸 Live Music & Beer Tent</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Event Schedule */}
            <div className="p-6 bg-brand-surface rounded-2xl border border-brand-forest/10 space-y-4">
              <h3 className="font-serif text-xl font-bold text-brand-forest-dark">Schedule & Locations</h3>
              <div className="space-y-3 text-xs text-brand-text-muted">
                <div className="flex gap-4 p-3 bg-brand-cream rounded-lg">
                  <span className="font-bold text-brand-forest text-sm">12:00 PM</span>
                  <div>
                    <strong className="text-brand-forest-dark block">Grand High Street Procession</strong>
                    Parade departs from the top of High Street down past the duck pond to Lindfield Common.
                  </div>
                </div>
                <div className="flex gap-4 p-3 bg-brand-cream rounded-lg">
                  <span className="font-bold text-brand-forest text-sm">1:00 PM</span>
                  <div>
                    <strong className="text-brand-forest-dark block">Arena Entertainment & Dog Show</strong>
                    Main arena displays, children’s competition tent, and food quarter open.
                  </div>
                </div>
                <div className="flex gap-4 p-3 bg-brand-cream rounded-lg">
                  <span className="font-bold text-brand-forest text-sm">5:00 PM</span>
                  <div>
                    <strong className="text-brand-forest-dark block">Stalls Close & Live Hub Evening</strong>
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
              <p className="text-xs text-brand-text-muted mb-4">
                Village Day stalls are strictly limited to 150 pitches and sell out within days of opening. Register below to be notified first.
              </p>

              {stallSubmitted ? (
                <div className="p-4 bg-emerald-50 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Thank you! Your stall interest for <strong>{stallName}</strong> has been received.</span>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => { e.preventDefault(); setStallSubmitted(true) }} 
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs font-semibold text-brand-text-dark mb-1">Business / Charity Name</label>
                    <input 
                      type="text" 
                      value={stallName} 
                      onChange={(e) => setStallName(e.target.value)} 
                      placeholder="e.g. Lindfield Honey & Crafts" 
                      className="w-full text-xs p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-brass"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-text-dark mb-1">Stall Category</label>
                    <select 
                      value={stallCategory} 
                      onChange={(e) => setStallCategory(e.target.value)}
                      className="w-full text-xs p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-brass"
                    >
                      <option value="crafts">Handmade Crafts & Gifts</option>
                      <option value="food">Local Artisan Food / Produce</option>
                      <option value="charity">Registered Local Charity</option>
                      <option value="commercial">Commercial / Retail Service</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-brand-brass hover:bg-brand-brass-hover text-white py-2.5 rounded-lg text-xs font-bold transition-colors"
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
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-emerald-900 to-brand-forest-dark text-white relative shadow-elevated">
            <span className="px-3 py-1 rounded-full bg-emerald-400 text-emerald-950 text-xs font-bold uppercase mb-3 inline-block">
              Sunday 23/05/2027 • Chip Timed
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-3">
              Lindfield Village Run 5K & 10K
            </h1>
            <p className="text-white/80 text-sm sm:text-base max-w-2xl leading-relaxed mb-6">
              A classic Sussex cross-country challenge through undulating pastures, woodlands, and countryside trails around Lindfield. 100% of proceeds support the King Edward Hall trust.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 p-3 rounded-lg">
                <span className="text-xs text-white/70 block">5K Start Time</span>
                <span className="font-bold text-lg">10:45 AM</span>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <span className="text-xs text-white/70 block">10K Start Time</span>
                <span className="font-bold text-lg">10:30 AM</span>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <span className="text-xs text-white/70 block">5K Entry</span>
                <span className="font-bold text-lg">£10.00</span>
              </div>
              <div className="bg-white/10 p-3 rounded-lg">
                <span className="text-xs text-white/70 block">10K Entry</span>
                <span className="font-bold text-lg">£20.00</span>
              </div>
            </div>
          </div>

          {/* Race Day Accordion FAQs */}
          <div className="p-6 bg-brand-surface rounded-2xl border border-brand-forest/10 space-y-4">
            <h3 className="font-serif text-xl font-bold text-brand-forest-dark">Runner Information & FAQs</h3>
            
            <div className="space-y-2">
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
                      className="w-full text-left p-4 text-xs sm:text-sm font-semibold flex justify-between items-center bg-brand-cream hover:bg-brand-cream-dark transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-brand-forest" /> : <ChevronDown className="w-4 h-4 text-brand-text-muted" />}
                    </button>
                    {isOpen && (
                      <div className="p-4 text-xs text-brand-text-muted bg-white border-t border-brand-cream-dark leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* FILM NIGHTS HUB */}
      {currentEvent === 'film-nights' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-purple-900 to-brand-forest-dark text-white relative shadow-elevated">
            <span className="px-3 py-1 rounded-full bg-purple-300 text-purple-950 text-xs font-bold uppercase mb-3 inline-block">
              Village Cinema Experience
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-3">
              Film Nights at King Edward Hall
            </h1>
            <p className="text-white/80 text-sm sm:text-base max-w-2xl leading-relaxed mb-4">
              Enjoy celebrated movies in the comfort of Newcombe Hall with your fellow Lindfield residents. Screenings feature high-definition projection, full hall surround audio, comfortable tiered seating, and intermission refreshments.
            </p>
            <div className="text-xs text-brand-brass-light font-bold">
              Tickets: £9.00 per person • Tea, coffee & homemade cakes available
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Upcoming Film Cards */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-brand-forest-dark">Upcoming Screenings</h3>

              <div className="p-5 rounded-xl border-2 border-brand-brass bg-brand-surface shadow-soft">
                <span className="text-[11px] font-bold text-brand-forest uppercase tracking-wider block mb-1">
                  Thursday 21st January 2027 • 7:30 PM
                </span>
                <h4 className="font-serif text-2xl font-bold text-brand-forest-dark mb-1">Sense and Sensibility</h4>
                <span className="text-xs font-semibold text-brand-brass block mb-3">Genre: Period Drama • Certificate: U</span>
                <p className="text-xs text-brand-text-muted leading-relaxed mb-4">
                  Emma Thompson and Kate Winslet star in Jane Austen’s classic tale of romance and social mores in idyllic English country estates.
                </p>
                <div className="text-xs text-emerald-700 font-semibold bg-emerald-50 p-2 rounded-md">
                  ✓ Online booking currently open • £9 per ticket
                </div>
              </div>

              <div className="p-5 rounded-xl border border-brand-cream-dark bg-brand-cream">
                <span className="text-[11px] font-bold text-brand-text-muted uppercase tracking-wider block mb-1">
                  Thursday 19th November 2026 • 7:30 PM
                </span>
                <h4 className="font-serif text-xl font-bold text-brand-forest-dark mb-1">Pressure</h4>
                <span className="text-xs font-semibold text-brand-text-muted block mb-3">Genre: Historical Drama • Certificate: 12A</span>
                <p className="text-xs text-brand-text-muted leading-relaxed">
                  The gripping story of Group Captain James Stagg and the critical weather forecast that determined the fate of the D-Day landings.
                </p>
              </div>
            </div>

            {/* Instant Online Ticket Reservation Counter */}
            <div className="p-6 bg-brand-surface rounded-2xl border border-brand-forest/10 shadow-soft">
              <h3 className="font-serif text-xl font-bold text-brand-forest-dark mb-2">Book Advanced Tickets</h3>
              <p className="text-xs text-brand-text-muted mb-4">
                Secure your seats online without transaction fees. Tickets will be held under your name for collection on the door.
              </p>

              {cinemaBooked ? (
                <div className="p-6 bg-emerald-50 text-emerald-900 rounded-xl text-center space-y-2">
                  <Ticket className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-serif text-lg font-bold">Booking Provisional Complete!</h4>
                  <p className="text-xs text-brand-text-muted">
                    {filmTickets} ticket(s) reserved for <strong>{selectedFilm}</strong>. Total to pay on collection: <strong>£{filmTickets * 9}</strong>.
                  </p>
                  <button
                    onClick={() => setCinemaBooked(false)}
                    className="text-xs text-brand-forest underline pt-2 block mx-auto"
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
                      className="w-full text-xs p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-brass"
                    >
                      <option value="Sense and Sensibility (21 Jan 2027)">Sense and Sensibility (21 Jan 2027)</option>
                      <option value="Pressure (19 Nov 2026)">Pressure (19 Nov 2026)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-brand-text-dark mb-1">Number of Tickets</label>
                    <div className="flex items-center gap-3">
                      {[1, 2, 3, 4, 6].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFilmTickets(num)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            filmTickets === num ? 'bg-brand-forest text-white' : 'bg-brand-cream hover:bg-brand-cream-dark'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-brand-cream rounded-lg flex justify-between items-center text-xs">
                    <span className="text-brand-text-muted">Total Due (£9 × {filmTickets}):</span>
                    <span className="font-serif text-lg font-bold text-brand-forest-dark">£{filmTickets * 9}.00</span>
                  </div>

                  <button
                    onClick={() => setCinemaBooked(true)}
                    className="w-full bg-brand-brass hover:bg-brand-brass-hover text-white py-3 rounded-lg text-xs font-bold transition-colors shadow-soft"
                  >
                    Confirm Ticket Reservation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
