import React from 'react'

/**
 * Signature "Lindfield's KING EDWARD HALL" brand mark inspired by the classic hall logo,
 * rendered in the Sussex Heritage palette (Forest Green #1B382B, Warm Brass #C29B38, Alabaster Cream #FBF9F5)
 * and editorial brand typography (Playfair Display & Plus Jakarta Sans).
 */
export const KingEdwardLogo: React.FC<{ variant?: 'header' | 'footer' }> = ({ variant = 'header' }) => (
  <div
    className={`relative inline-flex flex-col justify-between overflow-hidden rounded-lg bg-brand-forest text-white shadow-soft transition-transform group-hover:scale-[1.01] select-none ${
      variant === 'header'
        ? 'px-3.5 pt-2 pb-2.5 sm:px-4 sm:pt-2.5 sm:pb-3 border border-brand-forest-dark/15'
        : 'px-4 pt-2.5 pb-3 border border-brand-brass/30'
    }`}
  >
    {/* Slanted "Lindfield's" script/italic line arching over KING */}
    <div className="relative h-3.5 sm:h-4">
      <span
        className="inline-block font-serif italic font-semibold text-brand-brass-light text-sm sm:text-base leading-none tracking-tight -rotate-[9deg] origin-bottom-left translate-y-0.5 drop-shadow-[0_1px_1px_rgba(17,37,28,0.8)]"
      >
        Lindfield’s
      </span>
    </div>

    {/* Bold uppercase "KING EDWARD HALL" indented to sit beneath the arch of Lindfield's */}
    <div className="pl-3 sm:pl-4 pt-0.5">
      <span className="font-serif font-bold uppercase tracking-[0.08em] text-white text-xs sm:text-sm md:text-base leading-none block whitespace-nowrap">
        KING EDWARD HALL
      </span>
    </div>

    {/* Signature Warm Brass bottom accent bar */}
    <div className="absolute inset-x-0 bottom-0 h-1 sm:h-1.5 bg-brand-brass" aria-hidden="true" />
  </div>
)

export const PillarVenueIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M3 10L12 3L21 10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 10V20H19V10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.5 20V14.5C9.5 13.1193 10.6193 12 12 12C13.3807 12 14.5 13.1193 14.5 14.5V20" stroke="#C29B38" strokeWidth="1.75" strokeLinecap="round" />
    <line x1="3" y1="20" x2="21" y2="20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
)

export const PillarFestivalIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M12 3V6" stroke="#C29B38" strokeWidth="1.75" strokeLinecap="round" />
    <path d="M10 3H14" stroke="#C29B38" strokeWidth="1.75" strokeLinecap="round" />
    <path d="M3 13L12 6L21 13H3Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 13V20H19V13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 20L12 15L15 20" stroke="#C29B38" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="3" y1="20" x2="21" y2="20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
  </svg>
)

export const PillarHeritageIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    <path d="M12 21C12 21 4 16.5 4 10V5L12 2L20 5V10C20 16.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 7.5C10.8 6.3 8.8 6.5 8 8C7.2 9.5 8 11.5 12 14.5C16 11.5 16.8 9.5 16 8C15.2 6.5 13.2 6.3 12 7.5Z" stroke="#C29B38" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
