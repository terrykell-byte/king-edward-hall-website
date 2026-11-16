import { RoomId } from '../domain/pricing'
import { TabId } from './Header'
import { Users, Maximize2, Music, Check, ArrowRight, Accessibility } from 'lucide-react'

interface RoomShowcasesProps {
  currentRoom: RoomId | 'kitchens'
  setActiveTab: (tab: TabId) => void
}

export const RoomShowcases: React.FC<RoomShowcasesProps> = ({ currentRoom, setActiveTab }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
      {/* Navigation sub-tabs */}
      <div className="flex flex-wrap gap-2 border-b border-brand-cream-dark pb-4 mb-10">
        <button
          onClick={() => setActiveTab('room-hire')}
          className="px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-brand-cream hover:bg-brand-cream-dark text-brand-forest-dark transition-colors"
        >
          ← All Rooms Overview
        </button>
        <button
          onClick={() => setActiveTab('room-newcombe')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
            currentRoom === 'newcombe' ? 'bg-brand-forest text-white' : 'bg-brand-cream hover:bg-brand-cream-dark text-brand-forest-dark'
          }`}
        >
          Newcombe Hall
        </button>
        <button
          onClick={() => setActiveTab('room-jubilee')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
            currentRoom === 'jubilee' ? 'bg-brand-forest text-white' : 'bg-brand-cream hover:bg-brand-cream-dark text-brand-forest-dark'
          }`}
        >
          Jubilee Room
        </button>
        <button
          onClick={() => setActiveTab('room-library')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
            currentRoom === 'library' ? 'bg-brand-forest text-white' : 'bg-brand-cream hover:bg-brand-cream-dark text-brand-forest-dark'
          }`}
        >
          The Library
        </button>
        <button
          onClick={() => setActiveTab('kitchens')}
          className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
            currentRoom === 'kitchens' ? 'bg-brand-forest text-white' : 'bg-brand-cream hover:bg-brand-cream-dark text-brand-forest-dark'
          }`}
        >
          Commercial Kitchens
        </button>
      </div>

      {currentRoom === 'newcombe' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-brand-brass/20 text-brand-forest-dark text-xs font-bold uppercase tracking-wider mb-3">
                Grand Hall • Historic 1911
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest-dark mb-4">
                The Newcombe Hall
              </h1>
              <p className="text-base text-brand-text-muted leading-relaxed mb-6">
                Formerly known as the Main Hall, this magnificent space was rededicated in memory of Brian Newcombe, voluntary KEH committee leader for over 55 years. Featuring a high vaulted ceiling, polished wood flooring, raised proscenium stage, and an induction hearing loop, it is Lindfield’s premier choice for wedding celebrations, theatrical shows, conferences, and charity balls.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-brand-cream border border-brand-cream-dark">
                  <div className="flex items-center gap-2 text-brand-forest text-xs font-bold uppercase mb-1">
                    <Maximize2 className="w-4 h-4 text-brand-brass" /> Hall Dimensions
                  </div>
                  <span className="font-serif text-xl font-bold text-brand-forest-dark">15.6m × 8.6m</span>
                  <span className="text-[11px] text-brand-text-muted block mt-0.5">Excludes raised stage</span>
                </div>
                <div className="p-4 rounded-xl bg-brand-cream border border-brand-cream-dark">
                  <div className="flex items-center gap-2 text-brand-forest text-xs font-bold uppercase mb-1">
                    <Users className="w-4 h-4 text-brand-brass" /> Capacity
                  </div>
                  <span className="font-serif text-xl font-bold text-brand-forest-dark">200 Seated</span>
                  <span className="text-[11px] text-brand-text-muted block mt-0.5">100 with dining tables</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setActiveTab('calculator')}
                  className="inline-flex items-center gap-2 bg-brand-brass hover:bg-brand-brass-hover text-white px-6 py-3 rounded-lg font-bold text-sm shadow-soft transition-all"
                >
                  <span>Check Availability & Price</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="self-center text-sm font-semibold text-brand-forest">
                  £28/hr weekday • £38/hr weekend
                </div>
              </div>
            </div>

            {/* Visual preview card */}
            <div className="rounded-2xl overflow-hidden shadow-elevated border border-brand-forest/15 bg-brand-forest-dark text-brand-cream relative aspect-video flex flex-col justify-end p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-forest-light via-brand-forest to-brand-forest-dark">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-brand-brass-light text-xs font-semibold">
                  <Music className="w-4 h-4 text-brand-brass" /> Professional Sound & Stage Facilities
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">Full Stage & PA System</h3>
                <p className="text-xs text-brand-cream/80 max-w-md">
                  Equipped with an induction hearing loop for hearing aids, dimmable ambient lighting, display boards, and direct double-door access to the Main Kitchen.
                </p>
                <div className="flex gap-2 pt-2 text-xs">
                  <span className="px-2.5 py-1 rounded bg-white/10 text-brand-cream flex items-center gap-1">
                    <Accessibility className="w-3.5 h-3.5 text-brand-brass" /> Wheelchair Accessible
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white/10 text-brand-cream flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-brand-brass" /> Stage Lighting
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentRoom === 'jubilee' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-brand-brass/20 text-brand-forest-dark text-xs font-bold uppercase tracking-wider mb-3">
                Built 1977 • Queen's Silver Jubilee
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest-dark mb-4">
                The Jubilee Room
              </h1>
              <p className="text-base text-brand-text-muted leading-relaxed mb-6">
                Opened to celebrate Queen Elizabeth II’s Silver Jubilee, this warm, versatile hall is the village favourite for children’s birthday parties, fitness classes (yoga, pilates, dance), art societies, and family celebrations. It connects directly to the Jubilee Kitchenette for easy tea, coffee, and cake staging.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-brand-cream border border-brand-cream-dark">
                  <div className="flex items-center gap-2 text-brand-forest text-xs font-bold uppercase mb-1">
                    <Maximize2 className="w-4 h-4 text-brand-brass" /> Dimensions
                  </div>
                  <span className="font-serif text-xl font-bold text-brand-forest-dark">9.2m × 6.1m</span>
                  <span className="text-[11px] text-brand-text-muted block mt-0.5">Warm sprung flooring</span>
                </div>
                <div className="p-4 rounded-xl bg-brand-cream border border-brand-cream-dark">
                  <div className="flex items-center gap-2 text-brand-forest text-xs font-bold uppercase mb-1">
                    <Users className="w-4 h-4 text-brand-brass" /> Seated Capacity
                  </div>
                  <span className="font-serif text-xl font-bold text-brand-forest-dark">60 Seated</span>
                  <span className="text-[11px] text-brand-text-muted block mt-0.5">40 with tables</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setActiveTab('calculator')}
                  className="inline-flex items-center gap-2 bg-brand-brass hover:bg-brand-brass-hover text-white px-6 py-3 rounded-lg font-bold text-sm shadow-soft transition-all"
                >
                  <span>Check Availability & Price</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="self-center text-sm font-semibold text-brand-forest">
                  £18/hr weekday • £24/hr weekend
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-8 bg-brand-cream border border-brand-cream-dark flex flex-col justify-center space-y-4">
              <h3 className="font-serif text-xl font-bold text-brand-forest-dark">Key Highlights for Hirers</h3>
              <ul className="space-y-3 text-sm text-brand-text-muted">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span>Direct hatch and door access to the Jubilee Kitchenette for refreshments.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span>Abundant natural daylight through west-facing garden windows.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span>Level wheelchair access with disabled toilet adjacent.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {currentRoom === 'library' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-brand-brass/20 text-brand-forest-dark text-xs font-bold uppercase tracking-wider mb-3">
                Intimate Room • Meeting Space
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest-dark mb-4">
                The Library
              </h1>
              <p className="text-base text-brand-text-muted leading-relaxed mb-6">
                Originally established as Lindfield’s village library, this charming room retains its peaceful, bookish character. It is ideally configured for committee meetings, AGM presentations, tutoring, interview panels, and small workshop gatherings.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-brand-cream border border-brand-cream-dark">
                  <div className="flex items-center gap-2 text-brand-forest text-xs font-bold uppercase mb-1">
                    <Maximize2 className="w-4 h-4 text-brand-brass" /> Dimensions
                  </div>
                  <span className="font-serif text-xl font-bold text-brand-forest-dark">6.4m × 4.8m</span>
                </div>
                <div className="p-4 rounded-xl bg-brand-cream border border-brand-cream-dark">
                  <div className="flex items-center gap-2 text-brand-forest text-xs font-bold uppercase mb-1">
                    <Users className="w-4 h-4 text-brand-brass" /> Seated Capacity
                  </div>
                  <span className="font-serif text-xl font-bold text-brand-forest-dark">30 Seated</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setActiveTab('calculator')}
                  className="inline-flex items-center gap-2 bg-brand-brass hover:bg-brand-brass-hover text-white px-6 py-3 rounded-lg font-bold text-sm shadow-soft transition-all"
                >
                  <span>Check Availability & Price</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="self-center text-sm font-semibold text-brand-forest">
                  £14/hr weekday • £18/hr weekend
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-8 bg-brand-cream border border-brand-cream-dark flex flex-col justify-center space-y-4">
              <h3 className="font-serif text-xl font-bold text-brand-forest-dark">Ideal For:</h3>
              <ul className="space-y-3 text-sm text-brand-text-muted">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span>Parish council and club executive meetings with conference table arrangement.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span>Serving drinks and buffet refreshments alongside Newcombe Hall functions.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                  <span>Educational workshops, examinations, and craft clubs.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {currentRoom === 'kitchens' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest-dark mb-3">
              Kitchen & Catering Facilities
            </h1>
            <p className="text-sm text-brand-text-muted">
              King Edward Hall offers two dedicated kitchens to accommodate everything from a five-course wedding banquet to a simple tea and cake service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-brand-surface border-2 border-brand-forest/20 shadow-soft">
              <div className="inline-block px-3 py-1 rounded-full bg-brand-forest/10 text-brand-forest text-xs font-bold uppercase tracking-wider mb-3">
                Full Catering • £25 Flat Surcharge
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-forest-dark mb-2">Main Commercial Kitchen</h3>
              <p className="text-sm text-brand-text-muted mb-6">
                Our primary large kitchen is fully equipped for professional event caterers and large private functions. Accessible to all three halls via service corridors.
              </p>
              <ul className="space-y-2.5 text-xs text-brand-text-muted border-t border-brand-cream-dark pt-4">
                <li className="flex items-center gap-2">✓ Double commercial ovens & high-speed gas hob</li>
                <li className="flex items-center gap-2">✓ Rapid-cycle commercial dishwasher</li>
                <li className="flex items-center gap-2">✓ Large capacity refrigerator and food prep stations</li>
                <li className="flex items-center gap-2">✓ Dual serving hatches opening to hall corridors</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-brand-surface border-2 border-brand-brass/30 shadow-soft">
              <div className="inline-block px-3 py-1 rounded-full bg-brand-brass/15 text-brand-forest-dark text-xs font-bold uppercase tracking-wider mb-3">
                Light Refreshments • £15 Flat Surcharge
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-forest-dark mb-2">Jubilee Kitchenette</h3>
              <p className="text-sm text-brand-text-muted mb-6">
                An intimate kitchen situated directly beside the Jubilee Room. Designed for tea, coffee, sandwich preparation, and birthday cake staging.
              </p>
              <ul className="space-y-2.5 text-xs text-brand-text-muted border-t border-brand-cream-dark pt-4">
                <li className="flex items-center gap-2">✓ Instant continuous hot water boiler (urn)</li>
                <li className="flex items-center gap-2">✓ Domestic refrigerator and microwave</li>
                <li className="flex items-center gap-2">✓ Teacups, saucers, and cutlery supply</li>
                <li className="flex items-center gap-2">✓ Direct serving counter into the Jubilee Room</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
