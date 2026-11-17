import React from 'react'

export const KingEdwardCrest: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer minimalist shield/badge frame */}
    <rect
      x="2"
      y="2"
      width="44"
      height="44"
      rx="10"
      className="fill-brand-forest stroke-brand-brass/50"
      strokeWidth="1.5"
    />
    {/* Subtle inner brass keyline */}
    <rect
      x="5"
      y="5"
      width="38"
      height="38"
      rx="7"
      className="stroke-brand-brass/25"
      strokeWidth="1"
    />
    {/* Edwardian 1911 Gable Roof */}
    <path
      d="M11 22L24 12L37 22"
      className="stroke-brand-brass"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Gable finial & clock/rose window detail */}
    <circle cx="24" cy="17.5" r="1.75" className="fill-brand-brass-light" />
    {/* Columns & Archway */}
    <path
      d="M14 22V35M34 22V35"
      className="stroke-brand-cream/90"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M20 35V27.5C20 25.2909 21.7909 23.5 24 23.5C26.2091 23.5 28 25.2909 28 27.5V35"
      className="stroke-brand-brass-light"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Foundation Plinth */}
    <line
      x1="11"
      y1="35"
      x2="37"
      y2="35"
      className="stroke-brand-brass"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
  </svg>
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
