import { useState } from 'react'
import { TabId } from './Header'
import { SubNavPills, SubNavItem } from './SubNavPills'
import { 
  Heart, 
  Star, 
  ShieldCheck, 
  Building, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Quote,
  Send
} from 'lucide-react'

interface AboutAndCharityProps {
  section: 'about' | 'history' | 'donate' | 'faq' | 'contact'
  setActiveTab: (tab: TabId) => void
}

interface Testimonial {
  id: string
  initials: string
  author: string
  category: 'wedding' | 'party' | 'community' | 'cinema'
  rating: number
  event: string
  quote: string
  source: string
}

const ABOUT_SUB_NAV_ITEMS: SubNavItem<TabId>[] = [
  { id: 'about', label: 'About KEH' },
  { id: 'history', label: '1911 History' },
  { id: 'donate', label: 'Support Our Charity' },
  { id: 'faq', label: 'Facilities & Lindfield Club FAQ' },
  { id: 'contact', label: 'Contact & Trustees' }
]

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    initials: 'T.W.',
    author: 'Trevor Weeks MBE',
    category: 'wedding',
    rating: 5,
    event: 'Wedding Reception & Celebration',
    quote: 'A really good sized hall with a raised stage. Lovely warm atmosphere and an unbeatable picturesque location opposite the village duck pond.',
    source: 'Google Verified Review'
  },
  {
    id: '2',
    initials: 'P.S.',
    author: 'Patrícia S.',
    category: 'community',
    rating: 5,
    event: 'Community Arts & Schedule',
    quote: 'I really like how the community makes use of the place; there is always something going on and it is well worth keeping up with the schedule.',
    source: 'Google Verified Review'
  },
  {
    id: '3',
    initials: 'S.G.',
    author: 'Stephen G.',
    category: 'cinema',
    rating: 5,
    event: 'Film Night Showing',
    quote: 'Attended the cinema night. Great movie, superb sound setup, and wonderful tea and homemade cakes during intermission.',
    source: 'Google Verified Review'
  },
  {
    id: '4',
    initials: 'G.B.',
    author: 'Gordon B.',
    category: 'community',
    rating: 5,
    event: 'Weekly Art Society',
    quote: 'The centre is quite large with a main hall and side rooms. Wheelchair accessible ramp entrance and accessible facilities. The venue is really well maintained.',
    source: 'Local Hirer'
  },
  {
    id: '5',
    initials: 'P.G.',
    author: 'Pina G.',
    category: 'party',
    rating: 5,
    event: 'Wellbeing Workshop',
    quote: 'Had the most incredible sound bath experience here. The acoustic resonance in Newcombe Hall is absolutely magical.',
    source: 'Google Verified Review'
  }
]

export const AboutAndCharity: React.FC<AboutAndCharityProps> = ({ section, setActiveTab }) => {
  const [donationAmount, setDonationAmount] = useState<number>(25)
  const [giftAid, setGiftAid] = useState<boolean>(true)
  const [donated, setDonated] = useState<boolean>(false)

  // Testimonial Carousel state
  const [testimonialCategory, setTestimonialCategory] = useState<string>('all')
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  const filteredTestimonials = testimonialCategory === 'all' 
    ? TESTIMONIALS 
    : TESTIMONIALS.filter(t => t.category === testimonialCategory)

  const activeTestimonial = filteredTestimonials[currentSlide % filteredTestimonials.length]

  const nextTestimonial = () => {
    setCurrentSlide(prev => (prev + 1) % filteredTestimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentSlide(prev => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
      {/* Touch-friendly horizontal scroll-snap sub-navigation */}
      <SubNavPills
        items={ABOUT_SUB_NAV_ITEMS}
        activeId={section}
        onSelect={(tab) => setActiveTab(tab)}
        ariaLabel="About and charity navigation"
      />

      {/* ABOUT OVERVIEW */}
      {section === 'about' && (
        <div className="space-y-12 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-brass block mb-2">
                At The Heart of Village Life
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest-dark mb-4">
                King Edward Hall, Lindfield
              </h1>
              <p className="text-sm sm:text-base text-brand-text-muted leading-relaxed mb-4">
                Erected in 1911 and dedicated to the memory of King Edward VII, King Edward Hall stands majestically facing Lindfield duck pond. Operated entirely as an independent charitable trust (No. 249649) by dedicated local volunteers, the hall serves as the civic heart of Lindfield.
              </p>
              <p className="text-sm text-brand-text-muted leading-relaxed mb-6">
                From wedding breakfasts and children’s birthday parties to parish meetings, theatre productions, and village fairs, our facilities are maintained to modern standards while safeguarding our rich Edwardian character.
              </p>

              <div className="grid grid-cols-3 gap-3 text-center border-t border-brand-cream-dark pt-6">
                <div className="p-3 rounded-xl bg-brand-surface border border-brand-forest/10 shadow-soft">
                  <span className="font-serif text-xl sm:text-2xl font-bold text-brand-forest block">1911</span>
                  <span className="text-[11px] text-brand-text-muted block">Foundation</span>
                </div>
                <div className="p-3 rounded-xl bg-brand-surface border border-brand-forest/10 shadow-soft">
                  <span className="font-serif text-xl sm:text-2xl font-bold text-brand-forest block">4.5 ★</span>
                  <span className="text-[11px] text-brand-text-muted block">76 Reviews</span>
                </div>
                <div className="p-3 rounded-xl bg-brand-surface border border-brand-forest/10 shadow-soft">
                  <span className="font-serif text-xl sm:text-2xl font-bold text-brand-forest block">3 Halls</span>
                  <span className="text-[11px] text-brand-text-muted block">&amp; 2 Kitchens</span>
                </div>
              </div>
            </div>

            {/* Curated Interactive Review Carousel with Mobile-Friendly Filter Pills */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <h3 className="font-serif text-xl font-bold text-brand-forest-dark">Verified Hirer Testimonials</h3>
                
                {/* Category Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <Filter className="w-3.5 h-3.5 text-brand-brass mr-0.5 shrink-0" />
                  {['all', 'wedding', 'party', 'cinema'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => { setTestimonialCategory(cat); setCurrentSlide(0); }}
                      className={`min-h-[34px] px-3 py-1 rounded-lg capitalize transition-colors ${
                        testimonialCategory === cat
                          ? 'bg-brand-forest text-white font-bold shadow-soft'
                          : 'bg-brand-cream text-brand-text-muted hover:bg-brand-cream-dark'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {activeTestimonial && (
                <div className="p-6 rounded-2xl bg-brand-surface border border-brand-forest/15 shadow-elevated relative flex flex-col justify-between min-h-[210px]">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-brand-brass/20 text-brand-forest font-bold text-xs flex items-center justify-center">
                          {activeTestimonial.initials}
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-bold text-brand-forest-dark block">{activeTestimonial.author}</span>
                          <span className="text-[11px] text-brand-text-muted">{activeTestimonial.event}</span>
                        </div>
                      </div>

                      <div className="flex text-amber-400">
                        {[...Array(activeTestimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <div className="relative pl-6 pr-2 my-3">
                      <Quote className="w-4 h-4 text-brand-brass/60 absolute left-0 top-0.5" />
                      <p className="text-xs sm:text-sm text-brand-text-dark italic leading-relaxed">
                        "{activeTestimonial.quote}"
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-brand-cream-dark text-xs">
                    <span className="text-[11px] text-brand-text-muted">{activeTestimonial.source}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={prevTestimonial}
                        className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-brand-cream hover:bg-brand-cream-dark text-brand-forest-dark transition-colors"
                        aria-label="Previous testimonial"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-[11px] font-mono px-1">
                        {(currentSlide % filteredTestimonials.length) + 1} / {filteredTestimonials.length}
                      </span>
                      <button
                        onClick={nextTestimonial}
                        className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-brand-cream hover:bg-brand-cream-dark text-brand-forest-dark transition-colors"
                        aria-label="Next testimonial"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 1911 HISTORY TIMELINE */}
      {section === 'history' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-brass block mb-1">
              Over A Century of Civic Service
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest-dark mb-3">
              The History of King Edward Hall
            </h1>
            <p className="text-sm sm:text-base text-brand-text-muted leading-relaxed">
              Built on land donated by Mr. Sturdy of Paxhill with £2,200 raised through village fetes and donations, the hall has served through war, peace, and celebration.
            </p>
          </div>

          <div className="relative border-l-2 border-brand-brass/40 ml-3 sm:ml-4 pl-6 space-y-8">
            <div className="relative bg-brand-surface p-5 rounded-2xl border border-brand-forest/10 shadow-soft">
              <span className="absolute -left-[33px] top-6 w-4 h-4 rounded-full bg-brand-forest border-2 border-white ring-2 ring-brand-brass" />
              <span className="text-xs font-bold text-brand-brass uppercase">11th January 1911</span>
              <h3 className="font-serif text-xl font-bold text-brand-forest-dark mt-0.5">Grand Opening by Col. Dudley Sampson</h3>
              <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed mt-1.5">
                Designed by architect Walter Tower of Old Place and built by Norman &amp; Burt. The opening dedicated the hall to the memory of King Edward VII with the closing wish: <em>"That all things work in peace and harmony."</em>
              </p>
            </div>

            <div className="relative bg-brand-surface p-5 rounded-2xl border border-brand-forest/10 shadow-soft">
              <span className="absolute -left-[33px] top-6 w-4 h-4 rounded-full bg-brand-forest border-2 border-white ring-2 ring-brand-brass" />
              <span className="text-xs font-bold text-brand-brass uppercase">1914 – 1918 (World War I)</span>
              <h3 className="font-serif text-xl font-bold text-brand-forest-dark mt-0.5">Red Cross Convalescent Hospital</h3>
              <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed mt-1.5">
                Commandant Mrs. Godfrey Hooper directed the hall as a Red Cross auxiliary hospital caring for wounded Belgian and British soldiers returning from the Western Front.
              </p>
            </div>

            <div className="relative bg-brand-surface p-5 rounded-2xl border border-brand-forest/10 shadow-soft">
              <span className="absolute -left-[33px] top-6 w-4 h-4 rounded-full bg-brand-forest border-2 border-white ring-2 ring-brand-brass" />
              <span className="text-xs font-bold text-brand-brass uppercase">1939 – 1945 (World War II)</span>
              <h3 className="font-serif text-xl font-bold text-brand-forest-dark mt-0.5">Evacuee Reception &amp; Canadian Dances</h3>
              <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed mt-1.5">
                The hall served as a primary reception centre for children evacuated from London, and hosted legendary social dances with Canadian soldiers stationed in Lindfield.
              </p>
            </div>

            <div className="relative bg-brand-surface p-5 rounded-2xl border border-brand-forest/10 shadow-soft">
              <span className="absolute -left-[33px] top-6 w-4 h-4 rounded-full bg-brand-forest border-2 border-white ring-2 ring-brand-brass" />
              <span className="text-xs font-bold text-brand-brass uppercase">1977</span>
              <h3 className="font-serif text-xl font-bold text-brand-forest-dark mt-0.5">Silver Jubilee Wing Opened</h3>
              <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed mt-1.5">
                To mark Queen Elizabeth II’s 25th jubilee year, the committee constructed the Jubilee Room extension to accommodate expanding community clubs and parties.
              </p>
            </div>

            <div className="relative bg-brand-surface p-5 rounded-2xl border border-brand-forest/10 shadow-soft">
              <span className="absolute -left-[33px] top-6 w-4 h-4 rounded-full bg-brand-forest border-2 border-white ring-2 ring-brand-brass" />
              <span className="text-xs font-bold text-brand-brass uppercase">2014 – Present</span>
              <h3 className="font-serif text-xl font-bold text-brand-forest-dark mt-0.5">Dedication of Newcombe Hall</h3>
              <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed mt-1.5">
                The Main Hall was officially named The Newcombe Hall in tribute to Brian Newcombe, who voluntarily served the committee for over 55 years.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CHARITY DONATION CARD */}
      {section === 'donate' && (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-brand-surface border-2 border-brand-brass/40 shadow-elevated animate-in fade-in duration-200">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-brand-brass/20 text-brand-brass flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 fill-brand-brass" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest-dark">Support Our 1911 Hall</h1>
            <p className="text-xs sm:text-sm text-brand-text-muted mt-1 leading-relaxed">
              Registered Charitable Trust No. 249649. Your donation helps fund ongoing restoration, heating upgrades, and roof preservation.
            </p>
          </div>

          {donated ? (
            <div className="p-6 bg-emerald-50 text-emerald-900 rounded-xl text-center space-y-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-serif text-lg font-bold">Thank You For Your Support!</h4>
              <p className="text-xs text-brand-text-muted">
                Your pledge of <strong>£{donationAmount}</strong>
                {giftAid ? (
                  <> (with Gift Aid boosting value to <strong>£{(donationAmount * 1.25).toFixed(2)}</strong>)</>
                ) : null}{' '}
                has been prepared for the Charitable Trust.
              </p>
              <div className="pt-1">
                <a
                  href={`mailto:secretary@kingedwardhall.org.uk?subject=${encodeURIComponent(`Charity Donation Pledge (£${donationAmount}) - King Edward Hall`)}&body=${encodeURIComponent(`Hello Hon. Secretary,\n\nI would like to make a charitable donation to King Edward Hall Charitable Trust (Charity No. 249649):\n\nDonation Amount: £${donationAmount}.00\nGift Aid Declaration: ${giftAid ? `Yes (+25% HMRC Gift Aid, total value £${(donationAmount * 1.25).toFixed(2)})` : 'No'}\n\nPlease reply with the charity BACS / Gift Aid details.\n\nThank you!`)}`}
                  className="inline-flex items-center justify-center gap-1.5 bg-brand-forest text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-brand-forest-light transition-colors"
                >
                  <Send className="w-3.5 h-3.5" /> Email Donation Pledge to Trustees
                </a>
              </div>
              <button
                type="button"
                onClick={() => setDonated(false)}
                className="text-xs text-brand-forest underline pt-1 block mx-auto"
              >
                Make another donation
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-2">
                  Select Donation Amount
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[10, 25, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setDonationAmount(amt)}
                      className={`min-h-[48px] py-3 rounded-xl font-bold text-sm transition-all ${
                        donationAmount === amt
                          ? 'bg-brand-forest text-white ring-2 ring-brand-forest/20 shadow-soft'
                          : 'bg-brand-cream hover:bg-brand-cream-dark text-brand-forest-dark'
                      }`}
                    >
                      £{amt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-brand-cream rounded-xl border border-brand-cream-dark space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={giftAid}
                    onChange={(e) => setGiftAid(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded text-brand-brass focus:ring-brand-brass"
                  />
                  <div className="text-xs">
                    <strong className="text-brand-forest-dark block">Add Gift Aid (+25% at no extra cost)</strong>
                    <span className="text-brand-text-muted block mt-0.5 leading-relaxed">
                      I am a UK taxpayer. Gift Aid allows King Edward Hall to reclaim 25p for every £1 donated from HMRC.
                    </span>
                  </div>
                </label>
              </div>

              <div className="flex justify-between items-center text-xs font-semibold px-2">
                <span className="text-brand-text-muted">Total value to King Edward Hall:</span>
                <span className="font-serif text-xl font-bold text-brand-forest">
                  £{giftAid ? (donationAmount * 1.25).toFixed(2) : donationAmount.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => setDonated(true)}
                className="w-full min-h-[48px] bg-brand-brass hover:bg-brand-brass-hover text-white py-3.5 rounded-xl font-bold text-sm shadow-soft transition-all"
              >
                Proceed With £{donationAmount} Donation
              </button>
            </div>
          )}
        </div>
      )}

      {/* FACILITIES & LINDFIELD CLUB FAQ */}
      {section === 'faq' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-brass block mb-1">
              Common Questions &amp; Clarifications
            </span>
            <h1 className="font-serif text-3xl font-bold text-brand-forest-dark mb-2">
              Frequently Asked Questions
            </h1>
            <p className="text-sm text-brand-text-muted">
              Everything you need to know about hire policies, building facilities, and the first-floor Lindfield Club.
            </p>
          </div>

          <div className="space-y-4">
            {/* The Lindfield Club Distinction Card */}
            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-lg">
                <Building className="w-5 h-5 text-brand-brass shrink-0" />
                What is the relation between King Edward Hall and The Lindfield Club?
              </div>
              <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                Under the original 1911 trust deeds, a social club was established on the first floor of the building. Today, <strong>The Lindfield Club</strong> operates upstairs as a separate, independent private members' club (with snooker tables, private member lounge, and members' bar).
              </p>
              <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                When you hire King Edward Hall, you are hiring the ground floor community halls (Newcombe Hall, Jubilee Room, The Library, and kitchens) from the <strong>King Edward Hall Charitable Trust</strong>. Club membership is not required for hall hire.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-surface border border-brand-forest/10 shadow-soft space-y-2">
              <h4 className="font-serif font-bold text-base text-brand-forest-dark">
                Is parking available at King Edward Hall?
              </h4>
              <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed">
                Because King Edward Hall is a historic 1911 building in the centre of Lindfield village, there is no private car park on site. Free on-street parking is available along the High Street and surrounding roads, as well as the nearby public car park on Hickmans Lane (5 minutes' walk).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-surface border border-brand-forest/10 shadow-soft space-y-2">
              <h4 className="font-serif font-bold text-base text-brand-forest-dark">
                Is the hall wheelchair accessible?
              </h4>
              <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed">
                Yes. There is a step-free wheelchair accessible ramp entrance into the ground floor halls, and a dedicated accessible toilet. Newcombe Hall is also equipped with an induction hearing loop system.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-brand-surface border border-brand-forest/10 shadow-soft space-y-2">
              <h4 className="font-serif font-bold text-base text-brand-forest-dark">
                Can alcohol be served at private functions?
              </h4>
              <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed">
                Yes. The hall holds a Premises License allowing alcohol consumption. However, if alcohol is being sold at your event, a separate Temporary Event Notice (TEN) or licensed bar arrangement must be confirmed in advance with our booking administrator.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CONTACT & TRUSTEES */}
      {section === 'contact' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-brass block mb-1">
              Volunteer Governance
            </span>
            <h1 className="font-serif text-3xl font-bold text-brand-forest-dark mb-2">
              Contact &amp; Committee Directory
            </h1>
            <p className="text-sm text-brand-text-muted">
              King Edward Hall is managed by local volunteer trustees and an elected management committee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-brand-surface border border-brand-forest/10 shadow-soft space-y-4">
              <h3 className="font-serif text-lg font-bold text-brand-forest-dark">Key Officers</h3>
              <div className="space-y-3 text-xs sm:text-sm text-brand-text-muted">
                <div className="p-3.5 bg-brand-cream rounded-xl">
                  <span className="font-bold text-brand-forest-dark block">Tracy Ely</span>
                  <span className="text-brand-text-muted block mb-1">Room Hire Administrator</span>
                  <a href="mailto:roomhire@kingedwardhall.org.uk" className="text-brand-brass font-semibold hover:underline">
                    roomhire@kingedwardhall.org.uk
                  </a>
                </div>
                <div className="p-3.5 bg-brand-cream rounded-xl">
                  <span className="font-bold text-brand-forest-dark block">Nikki Smith</span>
                  <span className="text-brand-text-muted block mb-1">Honorary Secretary (General Inquiries)</span>
                  <a href="mailto:secretary@kingedwardhall.org.uk" className="text-brand-brass font-semibold hover:underline">
                    secretary@kingedwardhall.org.uk
                  </a>
                </div>
                <div className="p-3.5 bg-brand-cream rounded-xl">
                  <span className="font-bold text-brand-forest-dark block">William Blunden</span>
                  <span className="text-brand-text-muted block">Chairman of the Management Committee</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-brand-surface border border-brand-forest/10 shadow-soft space-y-4">
              <h3 className="font-serif text-lg font-bold text-brand-forest-dark">Trustees &amp; Postal Address</h3>
              <div className="text-xs sm:text-sm text-brand-text-muted space-y-3">
                <div className="p-3.5 bg-brand-cream rounded-xl">
                  <span className="font-bold text-brand-forest-dark block">Registered Charity Trustees</span>
                  <p className="mt-1">Simon Cartwright, Ian Sayers, and Mark White.</p>
                </div>
                <div className="p-3.5 bg-brand-cream rounded-xl">
                  <span className="font-bold text-brand-forest-dark block">Postal Address</span>
                  <p className="mt-1 leading-relaxed">
                    The King Edward Hall<br />
                    24 High Street, Lindfield<br />
                    West Sussex, RH16 2HH
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
