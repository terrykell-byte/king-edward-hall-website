import { Heart, Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react'
import { TabId } from './Header'

interface FooterProps {
  setActiveTab: (tab: TabId) => void
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-brand-forest-dark text-brand-cream border-t border-brand-forest-light/30">
      {/* Charity Callout Bar */}
      <div className="bg-brand-forest px-4 sm:px-8 py-8 border-b border-brand-forest-light/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-brass/20 text-brand-brass flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 fill-brand-brass" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-white font-bold">Support King Edward Hall Charity</h4>
              <p className="text-sm text-brand-cream/80 max-w-xl">
                As a registered independent charitable trust (Number 249649), every pound raised from hall hire, Village Day, and donations preserves our 1911 Edwardian building for future generations.
              </p>
            </div>
          </div>
          <button 
            onClick={() => {
              setActiveTab('donate')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="shrink-0 bg-brand-brass hover:bg-brand-brass-hover text-white px-6 py-3 rounded-lg font-bold text-sm shadow-soft transition-all"
          >
            Make a Charity Donation
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: About & Address */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-serif text-xl font-bold text-white">King Edward Hall</span>
            </div>
            <p className="text-sm text-brand-cream/70 mb-4 leading-relaxed">
              Situated in the heart of Lindfield, West Sussex, directly opposite the picturesque village duck pond. Dedicated to the memory of King Edward VII, 1911.
            </p>
            <div className="space-y-2 text-xs text-brand-cream/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-brass shrink-0 mt-0.5" />
                <span>24 High Street, Lindfield, West Sussex, RH16 2HH</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-brass shrink-0" />
                <span>Registered Charity No. 249649</span>
              </div>
            </div>
          </div>

          {/* Col 2: Room Hire */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-brass mb-4">Room Hire & Spaces</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => { setActiveTab('room-newcombe'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="text-brand-cream/80 hover:text-white transition-colors">
                  Newcombe Hall (200 Seated)
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('room-jubilee'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="text-brand-cream/80 hover:text-white transition-colors">
                  Jubilee Room (60 Seated)
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('room-library'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="text-brand-cream/80 hover:text-white transition-colors">
                  The Library (30 Seated)
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('kitchens'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="text-brand-cream/80 hover:text-white transition-colors">
                  Main Commercial & Jubilee Kitchens
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('calculator'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="text-brand-brass hover:text-white font-semibold transition-colors flex items-center gap-1">
                  <span>Interactive Price Calculator</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Community Events */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-brass mb-4">Community Events</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => { setActiveTab('event-village-day'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="text-brand-cream/80 hover:text-white transition-colors flex items-center justify-between w-full">
                  <span>Lindfield Village Day</span>
                  <span className="text-[10px] text-amber-300">05/06/2027</span>
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('event-village-run'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="text-brand-cream/80 hover:text-white transition-colors flex items-center justify-between w-full">
                  <span>Lindfield Village Run 5K/10K</span>
                  <span className="text-[10px] text-emerald-300">23/05/2027</span>
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('event-film-nights'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="text-brand-cream/80 hover:text-white transition-colors flex items-center justify-between w-full">
                  <span>Film Nights Cinema</span>
                  <span className="text-[10px] text-purple-300">Monthly</span>
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('history'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="text-brand-cream/80 hover:text-white transition-colors">
                  1911 Hall Heritage Timeline
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Contacts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-brass mb-4">Key Inquiries</h4>
            <div className="space-y-3 text-xs text-brand-cream/80">
              <div>
                <span className="text-white font-medium block">Room Hire Administrator</span>
                <a href="mailto:roomhire@kingedwardhall.org.uk" className="text-brand-brass hover:underline flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5" /> roomhire@kingedwardhall.org.uk
                </a>
              </div>
              <div>
                <span className="text-white font-medium block">Hon. Secretary (General Matters)</span>
                <a href="mailto:secretary@kingedwardhall.org.uk" className="text-brand-brass hover:underline flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5" /> secretary@kingedwardhall.org.uk
                </a>
              </div>
              <div>
                <span className="text-white font-medium block">Village Run Team</span>
                <a href="mailto:run@kingedwardhall.org.uk" className="text-brand-brass hover:underline flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5" /> run@kingedwardhall.org.uk
                </a>
              </div>
              <div>
                <span className="text-white font-medium block">Village Day Team</span>
                <a href="mailto:villageday@kingedwardhall.org.uk" className="text-brand-brass hover:underline flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5" /> villageday@kingedwardhall.org.uk
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="border-t border-brand-forest-light/40 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-brand-cream/60 gap-4">
          <p>© {new Date().getFullYear()} King Edward Hall, Lindfield. Registered Charitable Trust Number 249649.</p>
          <div className="flex gap-4">
            <button onClick={() => { setActiveTab('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="hover:text-white">Conditions of Hire</button>
            <button onClick={() => { setActiveTab('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="hover:text-white">Licensing & Accessibility</button>
            <button onClick={() => { setActiveTab('faq'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="hover:text-white">Lindfield Club FAQ</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
