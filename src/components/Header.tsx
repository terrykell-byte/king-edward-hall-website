import { useState, useEffect } from 'react'
import { Menu, X, Calendar, MapPin, ChevronDown, Sparkles, Heart } from 'lucide-react'
import { KingEdwardLogo } from './BrandIcons'

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
  | 'event-sponsors'
  | 'about' 
  | 'history' 
  | 'donate' 
  | 'faq' 
  | 'contact'

export const ALL_TAB_IDS: readonly TabId[] = [
  'home',
  'room-hire',
  'room-newcombe',
  'room-jubilee',
  'room-library',
  'kitchens',
  'calculator',
  'events-home',
  'event-village-day',
  'event-village-run',
  'event-film-nights',
  'event-sponsors',
  'about',
  'history',
  'donate',
  'faq',
  'contact'
]

interface HeaderProps {
  activeTab: TabId
  setActiveTab: (tab: TabId) => void
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  const handleNav = (tab: TabId) => {
    setActiveTab(tab)
    setMobileMenuOpen(false)
    setActiveDropdown(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isRoomActive = activeTab.startsWith('room') || activeTab === 'calculator' || activeTab === 'kitchens'
  const isEventsActive = activeTab.startsWith('event')
  const isAboutActive = ['about', 'history', 'donate', 'faq', 'contact'].includes(activeTab)

  const mobileButtonClass = (tab: TabId, highlightBrass = false) => {
    const isCurrent = activeTab === tab
    if (isCurrent) {
      return 'bg-brand-forest text-white font-bold ring-1 ring-brand-brass shadow-soft'
    }
    if (highlightBrass) {
      return 'bg-brand-brass/15 text-brand-forest-dark font-bold hover:bg-brand-brass/25 border border-brand-brass/30'
    }
    return 'bg-brand-cream/80 text-brand-text-dark font-medium hover:bg-brand-cream-dark'
  }

  const handleDropdownBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setActiveDropdown(null)
    }
  }

  const handleDropdownKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setActiveDropdown(null)
    }
  }

  return (
    <>
      {/* Backdrop overlay rendered outside <header> so backdrop-filter does not clip fixed positioning */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-brand-forest-dark/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <header className="sticky top-0 z-50 bg-brand-surface border-b border-brand-forest/10 shadow-sm transition-all">
        {/* Top Utility Bar — Desktop/Tablet only to preserve compact 64px header on mobile */}
        <div className="hidden md:block bg-brand-forest text-brand-cream text-xs py-1.5 px-4 sm:px-8 border-b border-brand-forest-light">
          <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
            <div className="flex items-center gap-3 text-brand-brass-light">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-brand-brass" /> 24 High Street, Lindfield, West Sussex RH16 2HH
              </span>
              <span className="text-brand-forest-light">•</span>
              <span>Registered Charity No. 249649</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-medium text-brand-cream/80">
              <span>Opposite the Village Duck Pond</span>
              <button 
                type="button"
                onClick={() => handleNav('donate')}
                className="text-brand-brass-light hover:text-white transition-colors underline underline-offset-2 font-semibold"
              >
                Support Our Charity
              </button>
            </div>
          </div>
        </div>

        {/* Main Navbar (64px on mobile, 80px on desktop) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo / Brand Mark */}
            <button 
              type="button"
              onClick={() => handleNav('home')} 
              className="flex items-center text-left group focus:outline-none"
              aria-label="Lindfield's King Edward Hall Home"
            >
              <KingEdwardLogo variant="header" />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {/* Pillar 1: Room Hire */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('rooms')}
                onMouseLeave={() => setActiveDropdown(null)}
                onFocus={() => setActiveDropdown('rooms')}
                onBlur={handleDropdownBlur}
                onKeyDown={handleDropdownKeyDown}
              >
                <button
                  type="button"
                  onClick={() => handleNav('room-hire')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                    isRoomActive 
                      ? 'text-brand-forest bg-brand-forest/8' 
                      : 'text-brand-text-dark hover:text-brand-forest hover:bg-brand-forest/5'
                  }`}
                  aria-expanded={activeDropdown === 'rooms'}
                  aria-haspopup="true"
                >
                  Room Hire &amp; Facilities
                  <ChevronDown className="w-4 h-4 text-brand-text-muted transition-transform" />
                </button>

                {activeDropdown === 'rooms' && (
                  <div className="absolute top-full left-0 w-64 bg-brand-surface rounded-xl shadow-elevated border border-brand-forest/10 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <button type="button" onClick={() => handleNav('room-hire')} className="w-full text-left px-4 py-2 text-xs font-bold text-brand-forest uppercase tracking-wider hover:bg-brand-cream">
                      Overview &amp; All Rooms
                    </button>
                    <div className="h-px bg-brand-cream-dark my-1" />
                    <button type="button" onClick={() => handleNav('room-newcombe')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream flex justify-between items-center">
                      <span>Newcombe Hall</span>
                      <span className="text-[11px] text-brand-text-muted bg-brand-cream px-1.5 py-0.5 rounded">200 max</span>
                    </button>
                    <button type="button" onClick={() => handleNav('room-jubilee')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream flex justify-between items-center">
                      <span>Jubilee Room</span>
                      <span className="text-[11px] text-brand-text-muted bg-brand-cream px-1.5 py-0.5 rounded">60 max</span>
                    </button>
                    <button type="button" onClick={() => handleNav('room-library')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream flex justify-between items-center">
                      <span>The Library</span>
                      <span className="text-[11px] text-brand-text-muted bg-brand-cream px-1.5 py-0.5 rounded">30 max</span>
                    </button>
                    <button type="button" onClick={() => handleNav('kitchens')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream">
                      Main &amp; Jubilee Kitchens
                    </button>
                    <div className="h-px bg-brand-cream-dark my-1" />
                    <button type="button" onClick={() => handleNav('calculator')} className="w-full text-left px-4 py-2 text-sm font-semibold text-brand-brass hover:bg-brand-brass/10 flex items-center gap-2">
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
                onFocus={() => setActiveDropdown('events')}
                onBlur={handleDropdownBlur}
                onKeyDown={handleDropdownKeyDown}
              >
                <button
                  type="button"
                  onClick={() => handleNav('events-home')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                    isEventsActive 
                      ? 'text-brand-forest bg-brand-forest/8' 
                      : 'text-brand-text-dark hover:text-brand-forest hover:bg-brand-forest/5'
                  }`}
                  aria-expanded={activeDropdown === 'events'}
                  aria-haspopup="true"
                >
                  Community Events
                  <ChevronDown className="w-4 h-4 text-brand-text-muted transition-transform" />
                </button>

                {activeDropdown === 'events' && (
                  <div className="absolute top-full left-0 w-64 bg-brand-surface rounded-xl shadow-elevated border border-brand-forest/10 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <button type="button" onClick={() => handleNav('events-home')} className="w-full text-left px-4 py-2 text-xs font-bold text-brand-forest uppercase tracking-wider hover:bg-brand-cream">
                      Community Events Calendar
                    </button>
                    <div className="h-px bg-brand-cream-dark my-1" />
                    <button type="button" onClick={() => handleNav('event-village-day')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream flex justify-between items-center">
                      <span>Lindfield Village Day</span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-medium px-1.5 py-0.5 rounded">05/06/2027</span>
                    </button>
                    <button type="button" onClick={() => handleNav('event-village-run')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream flex justify-between items-center">
                      <span>Lindfield Village Run (5K &amp; 10K)</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-medium px-1.5 py-0.5 rounded">23/05/2027</span>
                    </button>
                    <button type="button" onClick={() => handleNav('event-film-nights')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream flex justify-between items-center">
                      <span>Film Nights Cinema</span>
                      <span className="text-[10px] bg-purple-100 text-purple-800 font-medium px-1.5 py-0.5 rounded">£9 Tickets</span>
                    </button>
                    <button type="button" onClick={() => handleNav('event-sponsors')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream flex justify-between items-center">
                      <span>Community Sponsors</span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-medium px-1.5 py-0.5 rounded">Partners</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Pillar 3: About & Support */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('about')}
                onMouseLeave={() => setActiveDropdown(null)}
                onFocus={() => setActiveDropdown('about')}
                onBlur={handleDropdownBlur}
                onKeyDown={handleDropdownKeyDown}
              >
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors ${
                    isAboutActive 
                      ? 'text-brand-forest bg-brand-forest/8' 
                      : 'text-brand-text-dark hover:text-brand-forest hover:bg-brand-forest/5'
                  }`}
                  aria-expanded={activeDropdown === 'about'}
                  aria-haspopup="true"
                >
                  The Hall &amp; Charity
                  <ChevronDown className="w-4 h-4 text-brand-text-muted transition-transform" />
                </button>

                {activeDropdown === 'about' && (
                  <div className="absolute top-full right-0 w-64 bg-brand-surface rounded-xl shadow-elevated border border-brand-forest/10 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                    <button type="button" onClick={() => handleNav('about')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream">
                      About King Edward Hall
                    </button>
                    <button type="button" onClick={() => handleNav('history')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream">
                      1911 History &amp; Heritage
                    </button>
                    <button type="button" onClick={() => handleNav('donate')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream flex justify-between items-center">
                      <span>Make a Charity Donation</span>
                      <span className="text-[11px] text-brand-brass font-bold">Gift Aid</span>
                    </button>
                    <button type="button" onClick={() => handleNav('faq')} className="w-full text-left px-4 py-2 text-sm text-brand-text-dark hover:bg-brand-cream">
                      Facilities &amp; Social Club FAQ
                    </button>
                    <div className="h-px bg-brand-cream-dark my-1" />
                    <button type="button" onClick={() => handleNav('contact')} className="w-full text-left px-4 py-2 text-sm font-medium text-brand-forest hover:bg-brand-cream">
                      Contact Committee &amp; Trustees
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* Action Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => handleNav('calculator')}
                className="inline-flex items-center gap-2 bg-brand-brass hover:bg-brand-brass-hover text-white px-3.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-soft hover:shadow-elevated transition-all active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Book a Room</span>
              </button>

              {/* Mobile Hamburger Button (>= 44x44px touch target) */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-brand-forest/15 bg-brand-cream/60 text-brand-forest-dark hover:bg-brand-cream-dark transition-colors"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer — anchored directly to bottom of <header> via absolute top-full */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="lg:hidden absolute top-full inset-x-0 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain border-t border-brand-cream-dark bg-brand-surface px-4 py-5 space-y-5 shadow-elevated"
          >
            {/* Quick Home Link */}
            <button
              type="button"
              onClick={() => handleNav('home')}
              className={`w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-between ${mobileButtonClass('home')}`}
            >
              <span>Home Page</span>
              <span className="text-[11px] opacity-75">Welcome &amp; Slide Deck</span>
            </button>

            {/* Pillar 1 Mobile */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-brass">
                  01 • Room Hire &amp; Facilities
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleNav('room-hire')}
                  className={`min-h-[48px] text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-between ${mobileButtonClass('room-hire')}`}
                >
                  <span>All Rooms &amp; Rates</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('calculator')}
                  className={`min-h-[48px] text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors flex items-center gap-1.5 ${mobileButtonClass('calculator', true)}`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-brand-brass shrink-0" />
                  <span>Price Calculator</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('room-newcombe')}
                  className={`min-h-[48px] text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors ${mobileButtonClass('room-newcombe')}`}
                >
                  <span className="block">Newcombe Hall</span>
                  <span className="text-[10px] opacity-75">Up to 200 guests</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('room-jubilee')}
                  className={`min-h-[48px] text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors ${mobileButtonClass('room-jubilee')}`}
                >
                  <span className="block">Jubilee Room</span>
                  <span className="text-[10px] opacity-75">Up to 60 guests</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('room-library')}
                  className={`min-h-[48px] text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors ${mobileButtonClass('room-library')}`}
                >
                  <span className="block">The Library</span>
                  <span className="text-[10px] opacity-75">Up to 30 guests</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('kitchens')}
                  className={`min-h-[48px] text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors ${mobileButtonClass('kitchens')}`}
                >
                  <span className="block">Kitchen Catering</span>
                  <span className="text-[10px] opacity-75">Main &amp; Jubilee</span>
                </button>
              </div>
            </div>

            {/* Pillar 2 Mobile */}
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-brass mb-2">
                02 • Community Events
              </h3>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleNav('events-home')}
                  className={`w-full min-h-[48px] text-left px-3.5 py-2.5 rounded-xl text-sm transition-colors flex justify-between items-center ${mobileButtonClass('events-home')}`}
                >
                  <span>All Community Events Overview</span>
                  <span className="text-xs font-bold opacity-80">Hub →</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('event-village-day')}
                  className={`w-full min-h-[48px] text-left px-3.5 py-2.5 rounded-xl text-sm transition-colors flex justify-between items-center ${mobileButtonClass('event-village-day')}`}
                >
                  <span>Lindfield Village Day</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-brand-brass/20 text-brand-forest-dark font-bold">05/06/2027</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('event-village-run')}
                  className={`w-full min-h-[48px] text-left px-3.5 py-2.5 rounded-xl text-sm transition-colors flex justify-between items-center ${mobileButtonClass('event-village-run')}`}
                >
                  <span>Lindfield Village Run 5K &amp; 10K</span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-800 font-bold">23/05/2027</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('event-film-nights')}
                  className={`w-full min-h-[48px] text-left px-3.5 py-2.5 rounded-xl text-sm transition-colors flex justify-between items-center ${mobileButtonClass('event-film-nights')}`}
                >
                  <span>Film Nights Cinema Tickets</span>
                  <span className="text-[11px] font-bold opacity-90">£9.00</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('event-sponsors')}
                  className={`w-full min-h-[48px] text-left px-3.5 py-2.5 rounded-xl text-sm transition-colors flex justify-between items-center ${mobileButtonClass('event-sponsors')}`}
                >
                  <span>Community Event Sponsors</span>
                  <span className="text-[11px] font-semibold opacity-75">Partners</span>
                </button>
              </div>
            </div>

            {/* Pillar 3 Mobile */}
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-brand-brass mb-2">
                03 • The Hall &amp; Charity
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className={`min-h-[48px] text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors ${mobileButtonClass('about')}`}
                >
                  About KEH
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('history')}
                  className={`min-h-[48px] text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors ${mobileButtonClass('history')}`}
                >
                  1911 Heritage
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('faq')}
                  className={`min-h-[48px] text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors ${mobileButtonClass('faq')}`}
                >
                  Social Club FAQ
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className={`min-h-[48px] text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm transition-colors ${mobileButtonClass('contact')}`}
                >
                  Contact &amp; Trustees
                </button>
              </div>
            </div>

            {/* Mobile Utility & Charity Footer inside Drawer */}
            <div className="p-4 rounded-2xl bg-brand-forest text-brand-cream space-y-3">
              <div className="flex items-start gap-2.5 text-xs">
                <MapPin className="w-4 h-4 text-brand-brass shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">24 High Street, Lindfield, RH16 2HH</span>
                  <span className="text-brand-cream/75">Opposite the Village Duck Pond • Charity No. 249649</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleNav('donate')}
                className="w-full min-h-[48px] bg-brand-brass hover:bg-brand-brass-hover text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-soft transition-colors"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Support Our Charity (Gift Aid)</span>
              </button>
            </div>
          </nav>
        )}
      </header>
    </>
  )
}
