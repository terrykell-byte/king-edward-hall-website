# Architecture & Design System

## Overview

The redesign addresses the architectural tension discovered during our audit of the original site: the site was forced to simultaneously serve commercial hire customers, village festival organizers, and charitable heritage archivists without clear visual or cognitive separation.

The architecture structures the platform into **Three Clear Pillars**, synchronized with URL hash routing (`#home`, `#room-hire`, `#calculator`, `#events-home`, `#about`, etc.):

```
                       ┌──────────────────────────────┐
                       │   King Edward Hall Platform  │
                       └──────────────┬───────────────┘
                                      │
            ┌─────────────────────────┼─────────────────────────┐
            ▼                         ▼                         ▼
  ┌───────────────────┐     ┌───────────────────┐     ┌───────────────────┐
  │ 1. Room Hire &    │     │ 2. Village Events │     │ 3. Charity &      │
  │    Facilities     │     │    Hub            │     │    Heritage       │
  └───────────────────┘     └───────────────────┘     └───────────────────┘
```

---

## 🎨 Visual Identity & Palette

Defined in `tailwind.config.js`, the design system pays homage to King Edward Hall's 1911 Edwardian architecture (red brick, timber framing, and duck pond setting) while maintaining modern accessibility standards:

| Token Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `brand-forest-dark` | `#11251C` | Headings, primary brand anchors, high-contrast dark overlays |
| `brand-forest` | `#1B382B` | Primary navigation, hero backgrounds, primary buttons |
| `brand-forest-light` | `#26503E` | Subtle borders, button hover states, radial hero highlights |
| `brand-brass` | `#C29B38` | Warm Edwardian accents, badges, call-to-actions |
| `brand-brass-hover` | `#A9852D` | Brass CTA hover and active states |
| `brand-brass-light` | `#E6D3A3` | High-contrast brass text on dark forest backgrounds |
| `brand-cream` | `#FBF9F5` | Warm Alabaster canvas background |
| `brand-cream-dark` | `#F2ECE1` | Card borders, dividers, subtle secondary surfaces |
| `brand-surface` | `#FFFFFF` | Content cards, modal dialogs, elevated sheets |
| `brand-text-dark` | `#1F2937` | High-legibility body prose |
| `brand-text-muted` | `#5B6776` | Secondary captions, dimensions, and metadata |

---

## 🧩 Core UI Components

- **`Header.tsx`**: Three-pillar desktop navigation with hover and keyboard-accessible (`onFocus` / `onBlur` / `Escape`) dropdown menus, plus a mobile drawer with body scroll locking and `>= 44px` touch targets.
- **`FrontPageSlideDeck.tsx`**: Auto-gliding 8-slide hero carousel showcasing original KEH photography, pause/play controls, and a synchronized horizontal thumbnail strip.
- **`SmartImage.tsx`**: Multi-candidate image loader that attempts remote high-resolution WebP/JPG assets in order and falls back to local `public/images/` assets on network error.
- **`RoomShowcases.tsx`**: Interactive room & kitchen showcases featuring dynamic SVG architectural floor plan schematics (`banquet`, `theatre`, `boardroom`), multi-photo gallery switchers, and an accessible `role="dialog"` floor plan modal.
- **`BookingCalculator.tsx`**: 4-step interactive quote estimator with room/kitchen pre-selection, touch steppers, live itemized quote breakdown, and `mailto:` + clipboard inquiry dispatch.
- **`SubNavPills.tsx`**: Horizontal scroll-snap pill navigation shared across Room Showcases, Event Hubs, and About & Charity views.
