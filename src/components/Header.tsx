import { useState } from 'react'
import { Menu, X, Calendar, MapPin, ChevronDown, Sparkles } from 'lucide-react'

export type TabId = 
  | 'home' 
  | 'room-hire' 
  | 'room-newcombe' 
  | 'room-jubilee' 
  | 'room-library' 
  | 'kitchens' 
  | 'calculator'
  | 'events-home'
  | 'event-village-day' 
  | 'event-village-run' 
  | 'event-film-nights'
  | 'about' 
  | 'history' 
  | 'donate' 
  | 'faq' 
  | 'contact'

interface HeaderProps {
  activeTab: TabId
  setActiveTab: (tab: TabId) => void
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const handleNav = (tab: TabId) => {
    setActiveTab(tab)
    setMobileMenuOpen(false)
    setActiveDropdown(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isRoomActive = activeTab.startsWith('room') || activeTab === 'calculator' || activeTab === 'kitchens'
  const isEventsActive = activeTab.startsWith('event')
  const isAboutActive = ['about', 'history', 'donate', 'faq', 'contact'].includes(activeTab)

  return (
    <header className="sticky top-0 z-50 bg-brand-surface/95 backdrop-blur-md border-b border-brand-forest/10 transition-all">
      {/* Top Utility Bar */}
      <div className="bg-brand-forest text-brand-cream text-xs py-1.5 px-4 sm:px-8 border-b border-brand-forest-light">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-4">
          <div className="flex items-center gap-3 text-brand-brass-light">
            <span className="flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-brand-brass" /> 24 High Street, Lindfield, West Sussex RH16 2HH
            </span>
            <span className="hidden md:inline text-brand-forest-light">•</span>
            <span className="hidden md:inline">Registered Charity No. 249649</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-medium text-brand-cream/80">
            <span>Opposite the Village Duck Pond</span>
            <button 
              onClick={() => handleNav('donate')}
              className="text-brand-brass hover:text-white transition-colors underline underline-offset-2"
            >
              Support Our Charity
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo / Brand Mark */}
          <button 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="King Edward Hall Lindfield Home"
          >
            <div className="w-11 h-11 rounded-lg bg-brand-forest text-brand-brass flex items-center justify-center font-serif text-2xl font-bold shadow-soft border border-brand-brass/30 group-hover:bg-brand-forest-light transition-colors">
              🏛️
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-brand-forest-dark block group-hover:text-brand-forest transition-colors">
                King Edward Hall
              </span>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-brand-brass block">
                Lindfield • Established 1911
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {/* Pillar 1: Room Hire */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('rooms')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNav('room-hire')}
                className={`px-3 py-2 rounded-md text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                  isRoomActive 
                    ? 'text-brand-forest bg-brand-forest/5' 
                    : 'text-brand-text-dark hover:text-brand-forest hover:bg-brand-forest/5'
                }`}
                aria-expanded={activeDropdown === 'rooms'}
              >
                Room Hire & Facilities
                <ChevronDown className="w-4 h-4 text-brand-text-muted transition-transform" />
              </button>

              {activeDropdown === 'rooms' && (
                <div className="absolute top-full left-0 w-64 bg-brand-surface rounded-xl shadow-elevated border border-brand-forest/10 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button onClick={() => handleNav('room-hire')} className="w-full text-left px-4 py-2 text-xs font-bold text-brand-forest uppercase tracking-wider hover:bg-brand-cream">
                    Overview & All Rooms
                  </button>
                  <div className="h-px bg-brand-cream-dark my-1" />
                  <button onClick={() => handleNav('room-newcombe')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream flex justify-between items-center">
                    <span>Newcombe Hall</span>
                    <span className="text-[11px] text-brand-text-muted bg-brand-cream px-1.5 py-0.5 rounded">200 max</span>
                  </button>
                  <button onClick={() => handleNav('room-jubilee')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream flex justify-between items-center">
                    <span>Jubilee Room</span>
                    <span className="text-[11px] text-brand-text-muted bg-brand-cream px-1.5 py-0.5 rounded">60 max</span>
                  </button>
                  <button onClick={() => handleNav('room-library')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream flex justify-between items-center">
                    <span>The Library</span>
                    <span className="text-[11px] text-brand-text-muted bg-brand-cream px-1.5 py-0.5 rounded">30 max</span>
                  </button>
                  <button onClick={() => handleNav('kitchens')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream">
                    Main & Jubilee Kitchens
                  </button>
                  <div className="h-px bg-brand-cream-dark my-1" />
                  <button onClick={() => handleNav('calculator')} className="w-full text-left px-4 py-2 text-sm font-semibold text-brand-brass hover:bg-brand-brass/10 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Instant Price Calculator</span>
                  </button>
                </div>
              )}
            </div>

            {/* Pillar 2: Community Events */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('events')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNav('events-home')}
                className={`px-3 py-2 rounded-md text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                  isEventsActive 
                    ? 'text-brand-forest bg-brand-forest/5' 
                    : 'text-brand-text-dark hover:text-brand-forest hover:bg-brand-forest/5'
                }`}
                aria-expanded={activeDropdown === 'events'}
              >
                Community Events
                <ChevronDown className="w-4 h-4 text-brand-text-muted transition-transform" />
              </button>

              {activeDropdown === 'events' && (
                <div className="absolute top-full left-0 w-64 bg-brand-surface rounded-xl shadow-elevated border border-brand-forest/10 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button onClick={() => handleNav('events-home')} className="w-full text-left px-4 py-2 text-xs font-bold text-brand-forest uppercase tracking-wider hover:bg-brand-cream">
                    Community Events Calendar
                  </button>
                  <div className="h-px bg-brand-cream-dark my-1" />
                  <button onClick={() => handleNav('event-village-day')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream flex justify-between items-center">
                    <span>Lindfield Village Day</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-medium px-1.5 py-0.5 rounded">05/06/2027</span>
                  </button>
                  <button onClick={() => handleNav('event-village-run')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream flex justify-between items-center">
                    <span>Lindfield Village Run (5K & 10K)</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-medium px-1.5 py-0.5 rounded">23/05/2027</span>
                  </button>
                  <button onClick={() => handleNav('event-film-nights')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream flex justify-between items-center">
                    <span>Film Nights Cinema</span>
                    <span className="text-[10px] bg-purple-100 text-purple-800 font-medium px-1.5 py-0.5 rounded">£9 Tickets</span>
                  </button>
                </div>
              )}
            </div>

            {/* Pillar 3: About & Support */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('about')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNav('about')}
                className={`px-3 py-2 rounded-md text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                  isAboutActive 
                    ? 'text-brand-forest bg-brand-forest/5' 
                    : 'text-brand-text-dark hover:text-brand-forest hover:bg-brand-forest/5'
                }`}
                aria-expanded={activeDropdown === 'about'}
              >
                The Hall & Charity
                <ChevronDown className="w-4 h-4 text-brand-text-muted transition-transform" />
              </button>

              {activeDropdown === 'about' && (
                <div className="absolute top-full right-0 w-64 bg-brand-surface rounded-xl shadow-elevated border border-brand-forest/10 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button onClick={() => handleNav('about')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream">
                    About King Edward Hall
                  </button>
                  <button onClick={() => handleNav('history')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream">
                    1911 History & Heritage
                  </button>
                  <button onClick={() => handleNav('donate')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream flex justify-between items-center">
                    <span>Make a Charity Donation</span>
                    <span className="text-[11px] text-brand-brass font-bold">Gift Aid</span>
                  </button>
                  <button onClick={() => handleNav('faq')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream">
                    Facilities & Social Club FAQ
                  </button>
                  <div className="h-px bg-brand-cream-dark my-1" />
                  <button onClick={() => handleNav('contact')} className="w-full text-left px-4 py-2 text-sm font-medium text-brand-forest hover:bg-brand-cream">
                    Contact Committee & Trustees
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('calculator')}
              className="inline-flex items-center gap-2 bg-brand-brass hover:bg-brand-brass-hover text-white px-4 sm:px-5 py-2.5 rounded-lg text-sm font-bold shadow-soft hover:shadow-elevated transition-all active:scale-[0.98]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Room</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg text-brand-text-dark hover:bg-brand-cream-dark transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-Over Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-brand-cream-dark bg-brand-surface px-4 py-6 space-y-6 animate-in slide-in-from-top-4 duration-200 shadow-elevated">
          {/* Pillar 1 Mobile */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-forest mb-2">Room Hire & Facilities</h3>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleNav('room-hire')} className="text-left p-2.5 rounded-md bg-brand-cream text-sm font-medium hover:bg-brand-cream-dark">All Rooms Overview</button>
              <button onClick={() => handleNav('calculator')} className="text-left p-2.5 rounded-md bg-brand-brass/15 text-brand-forest-dark text-sm font-bold hover:bg-brand-brass/25">Price Calculator</button>
              <button onClick={() => handleNav('room-newcombe')} className="text-left p-2.5 rounded-md bg-brand-cream text-sm font-medium hover:bg-brand-cream-dark">Newcombe Hall (200)</button>
              <button onClick={() => handleNav('room-jubilee')} className="text-left p-2.5 rounded-md bg-brand-cream text-sm font-medium hover:bg-brand-cream-dark">Jubilee Room (60)</button>
              <button onClick={() => handleNav('room-library')} className="text-left p-2.5 rounded-md bg-brand-cream text-sm font-medium hover:bg-brand-cream-dark">The Library (30)</button>
              <button onClick={() => handleNav('kitchens')} className="text-left p-2.5 rounded-md bg-brand-cream text-sm font-medium hover:bg-brand-cream-dark">Kitchen Catering</button>
            </div>
          </div>

          {/* Pillar 2 Mobile */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-forest mb-2">Community Events</h3>
            <div className="space-y-1.5">
              <button onClick={() => handleNav('event-village-day')} className="w-full text-left p-2.5 rounded-md bg-brand-cream text-sm font-medium flex justify-between">
                <span>Lindfield Village Day</span>
                <span className="text-xs text-brand-brass font-bold">05/06/2027</span>
              </button>
              <button onClick={() => handleNav('event-village-run')} className="w-full text-left p-2.5 rounded-md bg-brand-cream text-sm font-medium flex justify-between">
                <span>Lindfield Village Run 5K & 10K</span>
                <span className="text-xs text-brand-brass font-bold">23/05/2027</span>
              </button>
              <button onClick={() => handleNav('event-film-nights')} className="w-full text-left p-2.5 rounded-md bg-brand-cream text-sm font-medium flex justify-between">
                <span>Film Nights Cinema Tickets</span>
                <span className="text-xs text-brand-forest font-bold">£9</span>
              </button>
            </div>
          </div>

          {/* Pillar 3 Mobile */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-forest mb-2">The Hall & Charity</h3>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleNav('about')} className="text-left p-2 rounded-md text-sm hover:bg-brand-cream">About KEH</button>
              <button onClick={() => handleNav('history')} className="text-left p-2 rounded-md text-sm hover:bg-brand-cream">1911 History</button>
              <button onClick={() => handleNav('donate')} className="text-left p-2 rounded-md text-sm text-brand-brass font-bold hover:bg-brand-cream">Donate to Charity</button>
              <button onClick={() => handleNav('faq')} className="text-left p-2 rounded-md text-sm hover:bg-brand-cream">Social Club FAQ</button>
              <button onClick={() => handleNav('contact')} className="col-span-2 text-left p-2 rounded-md text-sm font-semibold text-brand-forest bg-brand-forest/5">Contact & Committee</button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
