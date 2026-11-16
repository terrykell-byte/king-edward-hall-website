import { useState } from 'react'
import { Header, TabId } from './components/Header'
import { Footer } from './components/Footer'
import { BookingCalculator } from './components/BookingCalculator'
import { RoomShowcases } from './components/RoomShowcases'
import { EventHubs } from './components/EventHubs'
import { AboutAndCharity } from './components/AboutAndCharity'
import { 
  Calendar, 
  Star, 
  ArrowRight, 
  Sparkles, 
  ChevronRight
} from 'lucide-react'

export function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home')

  const renderContent = () => {
    // 1. HOME TAB
    if (activeTab === 'home') {
      return (
        <div className="space-y-16 animate-in fade-in duration-300">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-brand-forest text-brand-cream py-16 sm:py-24 px-4 sm:px-8 border-b border-brand-forest-light">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-brass/20 text-brand-brass-light border border-brand-brass/30 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-brand-brass" /> Historic 1911 Edwardian Landmark
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                  The Heart of Lindfield Community & Celebrations
                </h1>

                <p className="text-base sm:text-lg text-brand-cream/85 max-w-xl leading-relaxed">
                  Situated directly opposite the picturesque village duck pond in West Sussex, King Edward Hall provides the premier venue for weddings, parties, theatrical performances, and community gatherings.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => setActiveTab('calculator')}
                    className="inline-flex items-center gap-2 bg-brand-brass hover:bg-brand-brass-hover text-white px-7 py-3.5 rounded-xl font-bold text-sm shadow-soft transition-all active:scale-[0.98]"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Check Room Availability & Rates</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('events-home')}
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 px-6 py-3.5 rounded-xl font-bold text-sm transition-all"
                  >
                    <span>Upcoming Village Events</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Trust bar */}
                <div className="pt-6 border-t border-brand-forest-light/60 flex flex-wrap items-center gap-6 text-xs text-brand-cream/70">
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="font-bold text-white">4.5 / 5 Rating</span>
                    <span>(76 Google Reviews)</span>
                  </div>
                  <div>• Registered Charity No. 249649</div>
                  <div>• Up to 200 Seated Guests</div>
                </div>
              </div>

              {/* Hero Teaser Cards */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-brand-surface text-brand-text-dark p-6 rounded-2xl shadow-elevated border border-brand-forest/10 space-y-4">
                  <div className="flex justify-between items-center border-b border-brand-cream-dark pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-forest">
                      Quick Venue Guide
                    </span>
                    <span className="text-[11px] font-semibold text-brand-brass bg-brand-brass/10 px-2 py-0.5 rounded">
                      2026/2027 Rates
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div 
                      onClick={() => setActiveTab('room-newcombe')} 
                      className="p-3 rounded-xl bg-brand-cream hover:bg-brand-cream-dark cursor-pointer transition-colors flex justify-between items-center"
                    >
                      <div>
                        <strong className="text-sm font-serif text-brand-forest-dark block">Newcombe Hall</strong>
                        <span className="text-xs text-brand-text-muted">Weddings, shows & balls • 200 max</span>
                      </div>
                      <span className="text-xs font-bold text-brand-forest">from £28/hr</span>
                    </div>

                    <div 
                      onClick={() => setActiveTab('room-jubilee')} 
                      className="p-3 rounded-xl bg-brand-cream hover:bg-brand-cream-dark cursor-pointer transition-colors flex justify-between items-center"
                    >
                      <div>
                        <strong className="text-sm font-serif text-brand-forest-dark block">Jubilee Room</strong>
                        <span className="text-xs text-brand-text-muted">Children's parties & classes • 60 max</span>
                      </div>
                      <span className="text-xs font-bold text-brand-forest">from £18/hr</span>
                    </div>

                    <div 
                      onClick={() => setActiveTab('room-library')} 
                      className="p-3 rounded-xl bg-brand-cream hover:bg-brand-cream-dark cursor-pointer transition-colors flex justify-between items-center"
                    >
                      <div>
                        <strong className="text-sm font-serif text-brand-forest-dark block">The Library</strong>
                        <span className="text-xs text-brand-text-muted">Meetings & seminars • 30 max</span>
                      </div>
                      <span className="text-xs font-bold text-brand-forest">from £14/hr</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('calculator')}
                    className="w-full bg-brand-forest text-white py-2.5 rounded-lg text-xs font-bold hover:bg-brand-forest-light transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-brand-brass" />
                    <span>Calculate Custom Estimate</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Three Pillars Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-brass block mb-1">
                Explore King Edward Hall
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest-dark">
                Three Pillars of Our Village Hub
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="bg-brand-surface rounded-2xl p-8 border border-brand-forest/10 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-forest/10 text-brand-forest flex items-center justify-center mb-5 font-serif font-bold text-xl">
                    🏛️
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brand-forest-dark mb-2">Room Hire & Facilities</h3>
                  <p className="text-sm text-brand-text-muted leading-relaxed mb-6">
                    Three versatile halls and two kitchens equipped with stage, PA sound loop, and step-free access for weddings, parties, and classes.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('room-hire')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-forest hover:text-brand-brass transition-colors"
                >
                  <span>Explore Rooms & Rates</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Pillar 2 */}
              <div className="bg-brand-surface rounded-2xl p-8 border border-brand-forest/10 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center mb-5 font-serif font-bold text-xl">
                    🎪
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brand-forest-dark mb-2">Community Events</h3>
                  <p className="text-sm text-brand-text-muted leading-relaxed mb-6">
                    Home of Lindfield Village Day (49th year, 10,000+ visitors), the Lindfield Village Run 5K/10K, and monthly community Film Nights.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('events-home')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-forest hover:text-brand-brass transition-colors"
                >
                  <span>View Event Calendar</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Pillar 3 */}
              <div className="bg-brand-surface rounded-2xl p-8 border border-brand-forest/10 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-800 flex items-center justify-center mb-5 font-serif font-bold text-xl">
                    🤝
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brand-forest-dark mb-2">Charity & Heritage</h3>
                  <p className="text-sm text-brand-text-muted leading-relaxed mb-6">
                    Preserving 115+ years of Edwardian heritage, operated by volunteer trustees under Registered Charitable Trust No. 249649.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('about')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-forest hover:text-brand-brass transition-colors"
                >
                  <span>Our History & Charity</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          {/* Interactive Calculator Section embedded on home */}
          <section className="bg-brand-cream-dark/50 py-12 px-4 sm:px-8 border-y border-brand-cream-dark">
            <BookingCalculator />
          </section>
        </div>
      )
    }

    // 2. ROOM HIRE OVERVIEW & PRICING TABLE
    if (activeTab === 'room-hire') {
      return (
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-12 animate-in fade-in duration-200">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-brass block mb-2">
              Transparent Venue Hire In Lindfield
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-forest-dark mb-4">
              Our Rooms & Facilities
            </h1>
            <p className="text-sm sm:text-base text-brand-text-muted leading-relaxed">
              Whether you are organizing a dream wedding reception, a milestone birthday party, a corporate workshop, or regular fitness classes, King Edward Hall offers flexible, characterful spaces in the heart of Lindfield.
            </p>
          </div>

          {/* Transparent Pricing Table */}
          <div className="bg-brand-surface rounded-2xl p-6 sm:p-8 border border-brand-forest/10 shadow-soft">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-forest-dark">Hire Charges (2026/2027)</h3>
                <p className="text-xs text-brand-text-muted">Standard hourly rates. Fully inclusive of tables, chairs, heating, and lighting.</p>
              </div>
              <button
                onClick={() => setActiveTab('calculator')}
                className="bg-brand-brass hover:bg-brand-brass-hover text-white px-5 py-2.5 rounded-lg text-xs font-bold shadow-soft transition-colors"
              >
                Open Cost Estimator
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
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
                    <td className="py-3.5 px-4 font-semibold text-brand-forest-dark">The Newcombe Hall</td>
                    <td className="py-3.5 px-4 text-brand-text-muted">15.6m × 8.6m</td>
                    <td className="py-3.5 px-4"><span className="bg-brand-forest/10 text-brand-forest px-2 py-0.5 rounded font-bold">200 seated</span></td>
                    <td className="py-3.5 px-4 font-semibold">£28.00 / hour</td>
                    <td className="py-3.5 px-4 font-bold text-brand-brass">£38.00 / hour</td>
                    <td className="py-3.5 px-4 text-right">
                      <button onClick={() => setActiveTab('room-newcombe')} className="text-brand-forest hover:underline font-bold">Details →</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-brand-forest-dark">The Jubilee Room</td>
                    <td className="py-3.5 px-4 text-brand-text-muted">9.2m × 6.1m</td>
                    <td className="py-3.5 px-4"><span className="bg-brand-forest/10 text-brand-forest px-2 py-0.5 rounded font-bold">60 seated</span></td>
                    <td className="py-3.5 px-4 font-semibold">£18.00 / hour</td>
                    <td className="py-3.5 px-4 font-bold text-brand-brass">£24.00 / hour</td>
                    <td className="py-3.5 px-4 text-right">
                      <button onClick={() => setActiveTab('room-jubilee')} className="text-brand-forest hover:underline font-bold">Details →</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-brand-forest-dark">The Library</td>
                    <td className="py-3.5 px-4 text-brand-text-muted">6.4m × 4.8m</td>
                    <td className="py-3.5 px-4"><span className="bg-brand-forest/10 text-brand-forest px-2 py-0.5 rounded font-bold">30 seated</span></td>
                    <td className="py-3.5 px-4 font-semibold">£14.00 / hour</td>
                    <td className="py-3.5 px-4 font-bold text-brand-brass">£18.00 / hour</td>
                    <td className="py-3.5 px-4 text-right">
                      <button onClick={() => setActiveTab('room-library')} className="text-brand-forest hover:underline font-bold">Details →</button>
                    </td>
                  </tr>
                  <tr className="bg-brand-cream/50">
                    <td className="py-3.5 px-4 font-semibold text-brand-forest-dark">Main Commercial Kitchen</td>
                    <td className="py-3.5 px-4 text-brand-text-muted">Full catering</td>
                    <td className="py-3.5 px-4 text-brand-text-muted">Commercial</td>
                    <td className="py-3.5 px-4 font-semibold" colSpan={2}>£25.00 flat fee per session</td>
                    <td className="py-3.5 px-4 text-right">
                      <button onClick={() => setActiveTab('kitchens')} className="text-brand-forest hover:underline font-bold">Details →</button>
                    </td>
                  </tr>
                  <tr className="bg-brand-cream/50">
                    <td className="py-3.5 px-4 font-semibold text-brand-forest-dark">Jubilee Kitchenette</td>
                    <td className="py-3.5 px-4 text-brand-text-muted">Tea & cake service</td>
                    <td className="py-3.5 px-4 text-brand-text-muted">Domestic</td>
                    <td className="py-3.5 px-4 font-semibold" colSpan={2}>£15.00 flat fee per session</td>
                    <td className="py-3.5 px-4 text-right">
                      <button onClick={() => setActiveTab('kitchens')} className="text-brand-forest hover:underline font-bold">Details →</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Embedded Calculator */}
          <BookingCalculator />
        </div>
      )
    }

    // 3. SPECIFIC ROOM SHOWCASES
    if (activeTab === 'room-newcombe') return <RoomShowcases currentRoom="newcombe" setActiveTab={setActiveTab} />
    if (activeTab === 'room-jubilee') return <RoomShowcases currentRoom="jubilee" setActiveTab={setActiveTab} />
    if (activeTab === 'room-library') return <RoomShowcases currentRoom="library" setActiveTab={setActiveTab} />
    if (activeTab === 'kitchens') return <RoomShowcases currentRoom="kitchens" setActiveTab={setActiveTab} />
    if (activeTab === 'calculator') return <div className="py-8"><BookingCalculator /></div>

    // 4. COMMUNITY EVENT HUBS
    if (activeTab === 'events-home') return <EventHubs currentEvent="all" setActiveTab={setActiveTab} />
    if (activeTab === 'event-village-day') return <EventHubs currentEvent="village-day" setActiveTab={setActiveTab} />
    if (activeTab === 'event-village-run') return <EventHubs currentEvent="village-run" setActiveTab={setActiveTab} />
    if (activeTab === 'event-film-nights') return <EventHubs currentEvent="film-nights" setActiveTab={setActiveTab} />

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
