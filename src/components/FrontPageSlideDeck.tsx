import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play, ArrowRight, Camera } from 'lucide-react'
import { SmartImage } from './SmartImage'
import { TabId } from './Header'

export interface SlideDeckItem {
  id: string
  title: string
  category: string
  caption: string
  credit?: string
  targetTab: TabId
  ctaLabel: string
  urls: string[]
}

export const FRONT_PAGE_SLIDES: SlideDeckItem[] = [
  {
    id: 'keh-exterior-pond',
    title: 'King Edward Hall Opposite Lindfield Duck Pond',
    category: 'Historic 1911 Village Landmark',
    caption: 'Situated in the heart of Lindfield High Street facing the picturesque village pond since 1911.',
    credit: 'Photo: Vix Elizabeth',
    targetTab: 'about',
    ctaLabel: 'Our 1911 Heritage',
    urls: [
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/Vix-Elizabeth-Photo-of-KEH.webp',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/Vix-Elizabeth-Photo-of-KEH.jpg',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/elementor/thumbs/Vix-Elizabeth-Photo-of-KEH-rhcymtmv422rrqg3zp4r2cskd807jthhs96r8j594g.webp',
      'images/newcombe-hall.jpg'
    ]
  },
  {
    id: 'village-day-procession',
    title: 'Lindfield Village Day Procession & Common',
    category: 'Annual Summer Festival • 10,000+ Visitors',
    caption: 'The highlight of Lindfield’s summer calendar, raising vital funds to maintain and improve King Edward Hall.',
    targetTab: 'event-village-day',
    ctaLabel: 'Explore Village Day',
    urls: [
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/DLL-080125-445-procession-pond.webp',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/DLL-080125-445-procession-pond.jpg',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/al_opt_content/IMAGE/www.kingedwardhall.org.uk/wp-content/uploads/2026/06/LVD26-e1780311234222.webp.bv.webp',
      'https://images.squarespace-cdn.com/content/v1/5485c06be4b089bd3e5af3ee/1749205989927-D463AVKDOVE8LQCMHST9/Village+day+drone.jpg?format=1000w'
    ]
  },
  {
    id: 'jubilee-room-interior',
    title: 'The Jubilee Room',
    category: 'Silver Jubilee Hall • Parties & Classes',
    caption: 'Opened in 1977 to celebrate Queen Elizabeth II’s Silver Jubilee, featuring French doors to the patio and a direct hatch to the Jubilee Kitchen.',
    targetTab: 'room-jubilee',
    ctaLabel: 'View Jubilee Room',
    urls: [
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/jubilee-bannerjpg-1200.webp',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/jubilee-bannerjpg.jpg',
      'images/jubilee-room.jpg'
    ]
  },
  {
    id: 'village-run-action',
    title: 'Lindfield Village Run (5K & 10K)',
    category: 'Cross-Country Charity Run',
    caption: 'Our sell-out rural multi-terrain 5K Family Run and 10K Village Run across the West Sussex countryside.',
    targetTab: 'event-village-run',
    ctaLabel: 'Village Run Details',
    urls: [
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/lindfield-village-run-2023_52917276532_o.webp',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/lindfield-village-run-2023_52917276532_o.jpg',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/elementor/thumbs/lindfield-village-run-2023_52917276532_o-e1705405786871-rhcynkw1qu0226qfx3hmpo1ilkrxxokdta8nmtov48.webp'
    ]
  },
  {
    id: 'the-library-pano',
    title: 'The Library Room',
    category: 'Meetings, Seminars & Refreshments',
    caption: 'Situated next door to the Main Kitchen — ideal for committee meetings, clubs, or serving refreshments during larger functions.',
    targetTab: 'room-library',
    ctaLabel: 'View The Library',
    urls: [
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/Library-pano-1920x960-1.webp',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/Library-pano-1920x960-1.jpg',
      'images/library-room.jpg'
    ]
  },
  {
    id: 'film-nights-screening',
    title: 'Monthly Community Film Nights',
    category: 'Cinema in Newcombe Hall',
    caption: 'Enjoy blockbuster and classic cinema screenings on the big screen in the comfort of King Edward Hall.',
    targetTab: 'event-film-nights',
    ctaLabel: 'Book Film Tickets',
    urls: [
      'https://www.kingedwardhall.org.uk/wp-content/uploads/al_opt_content/IMAGE/www.kingedwardhall.org.uk/wp-content/uploads/2024/01/NH-Film.webp.bv.webp',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/2024/01/NH-Film.webp',
      'images/newcombe-hall.jpg'
    ]
  },
  {
    id: 'jubilee-kitchen-hatch',
    title: 'Main & Jubilee Catering Kitchens',
    category: '2 Dedicated Ground-Floor Kitchens',
    caption: 'From full 120-place commercial catering in the Main Kitchen to tea, coffee, and cake via the Jubilee Kitchen hatch.',
    targetTab: 'kitchens',
    ctaLabel: 'View Both Kitchens',
    urls: [
      'https://www.kingedwardhall.org.uk/wp-content/uploads/al_opt_content/IMAGE/www.kingedwardhall.org.uk/wp-content/uploads/elementor/thumbs/Jubilee-Kitchen_bg-rhcymvih20kh6y1wuw7nz6mrhbbonp9ioxbdwa40ps.webp.bv.webp',
      'images/main-kitchen.jpg'
    ]
  },
  {
    id: 'keh-sign-heritage',
    title: '24 High Street, Lindfield',
    category: 'Registered Charity No. 249649',
    caption: 'Maintained by dedicated village volunteers and trustees for the benefit of Lindfield residents and visitors.',
    targetTab: 'room-hire',
    ctaLabel: 'View Hire Rates',
    urls: [
      'https://www.kingedwardhall.org.uk/wp-content/uploads/al_opt_content/IMAGE/www.kingedwardhall.org.uk/wp-content/uploads/2026/01/KEH-Sign.webp.bv.webp',
      'https://www.kingedwardhall.org.uk/wp-content/uploads/elementor/thumbs/Vix-Elizabeth-Photo-of-KEH-rhcymtmv422rrqg3zp4r2cskd807jthhs96r8j594g.webp'
    ]
  }
]

const SLIDE_INTERVAL_MS = 4200

interface FrontPageSlideDeckProps {
  setActiveTab: (tab: TabId) => void
}

export const FrontPageSlideDeck: React.FC<FrontPageSlideDeckProps> = ({ setActiveTab }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const thumbStripRef = useRef<HTMLDivElement>(null)

  const totalSlides = FRONT_PAGE_SLIDES.length
  const currentSlide = FRONT_PAGE_SLIDES[activeIndex] || FRONT_PAGE_SLIDES[0]

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  // Continuously and slowly scroll through the slides automatically unless explicitly paused
  useEffect(() => {
    if (isPaused) return
    const timer = window.setInterval(goToNext, SLIDE_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [isPaused, goToNext])

  // Smoothly scroll the thumbnail strip horizontally to keep the active thumbnail centered
  useEffect(() => {
    const container = thumbStripRef.current
    if (!container) return
    const activeThumb = container.children[activeIndex] as HTMLElement | undefined
    if (!activeThumb) return
    const targetLeft =
      activeThumb.offsetLeft - container.clientWidth / 2 + activeThumb.clientWidth / 2
    container.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth'
    })
  }, [activeIndex])

  return (
    <div
      className="rounded-2xl overflow-hidden bg-brand-forest-dark border border-brand-brass/35 shadow-elevated"
      role="region"
      aria-roledescription="carousel"
      aria-label="King Edward Hall photo slide deck"
    >
      {/* Main Slide Viewport with Slow Horizontal Gliding Track */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-brand-forest-dark">
        <div
          className="flex w-full h-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {FRONT_PAGE_SLIDES.map((slide, idx) => {
            const isCurrent = idx === activeIndex
            return (
              <div key={slide.id} className="w-full h-full shrink-0 relative overflow-hidden">
                <SmartImage
                  urls={slide.urls}
                  alt={slide.title}
                  className={`w-full h-full object-cover object-center transition-transform duration-[4500ms] ease-out ${
                    isCurrent ? 'scale-105' : 'scale-100'
                  }`}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </div>
            )
          })}
        </div>

        {/* Subtle gradient overlay for readable heritage typography */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-forest-dark/95 via-brand-forest-dark/30 to-black/20" />

        {/* Top Bar: Slide Counter & Auto-play Toggle */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-forest-dark/80 backdrop-blur-xs border border-brand-brass/40 text-[11px] font-bold uppercase tracking-wider text-brand-brass-light">
            <Camera className="w-3.5 h-3.5 text-brand-brass" />
            <span>{currentSlide.category}</span>
          </span>

          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-xs text-[11px] font-semibold text-white/90">
              {activeIndex + 1} / {totalSlides}
            </span>
            <button
              type="button"
              onClick={() => setIsPaused((p) => !p)}
              aria-label={isPaused ? 'Resume slide deck autoplay' : 'Pause slide deck autoplay'}
              className="w-8 h-8 rounded-full bg-black/50 hover:bg-brand-brass text-white flex items-center justify-center transition-colors"
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Previous / Next Navigation Arrows */}
        <button
          type="button"
          onClick={goToPrev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-brand-forest-dark/75 hover:bg-brand-brass text-white border border-white/20 flex items-center justify-center shadow-soft transition-all active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-brand-forest-dark/75 hover:bg-brand-brass text-white border border-white/20 flex items-center justify-center shadow-soft transition-all active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Bottom Caption & CTA Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 z-10">
          <div className="space-y-1 max-w-xl">
            <h2 className="font-serif text-lg sm:text-2xl font-bold text-white leading-snug">
              {currentSlide.title}
            </h2>
            <p className="text-xs sm:text-sm text-brand-cream/85 line-clamp-2 leading-relaxed">
              {currentSlide.caption}
              {currentSlide.credit ? ` (${currentSlide.credit})` : ''}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveTab(currentSlide.targetTab)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="self-start sm:self-auto shrink-0 min-h-[40px] inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-brass hover:bg-brand-brass-hover text-white text-xs font-bold shadow-soft transition-all"
          >
            <span>{currentSlide.ctaLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Thumbnail Strip & Slide Selector Bar */}
      <div className="bg-brand-forest-dark/95 border-t border-brand-forest-light/40 px-3 py-2.5">
        <div
          ref={thumbStripRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5 scroll-smooth"
        >
          {FRONT_PAGE_SLIDES.map((slide, idx) => {
            const isActive = idx === activeIndex
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Show slide ${idx + 1}: ${slide.title}`}
                aria-current={isActive ? 'true' : undefined}
                className={`group relative shrink-0 w-16 sm:w-20 h-11 sm:h-12 rounded-lg overflow-hidden border-2 transition-all duration-500 ${
                  isActive
                    ? 'border-brand-brass ring-2 ring-brand-brass/40 scale-[1.03]'
                    : 'border-transparent opacity-60 hover:opacity-95'
                }`}
              >
                <SmartImage
                  urls={slide.urls}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
