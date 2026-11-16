# Architecture & Design System

## Overview

The redesign addresses the architectural tension discovered during our audit of the original site: the site was forced to simultaneously serve commercial hire customers, village festival organizers, and charitable heritage archivists without clear visual or cognitive separation.

The new architecture structures the platform into **Three Clear Pillars**:

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

The design system pays homage to King Edward Hall's 1911 Edwardian architecture (red brick, timber framing, and duck pond setting) while maintaining modern accessibility standards (WCAG AAA contrast ratios):

| Color Name | Hex Code | Purpose |
| :--- | :--- | :--- |
| `brand-forest-dark` | `#172e22` | Headings, primary brand anchors, strong contrast text |
| `brand-forest` | `#1f3d2b` | Primary navigation, hero backgrounds, primary buttons |
| `brand-brass` | `#c69234` | Warm accents, badges, call-to-actions, countdown highlights |
| `brand-brass-hover`| `#ad7a25` | Button hover and active states |
| `brand-cream` | `#fcfaf6` | Soft page background (avoids harsh pure white glare) |
| `brand-surface` | `#ffffff` | Content cards, modal backdrops, elevated sheets |
| `brand-text-dark` | `#1c2826` | High-legibility body prose |
| `brand-text-muted`| `#52605b` | Secondary captions, dimensions, and timestamps |

---

## 📱 Mobile-First Responsive Breakpoints

1. **Header & Navigation**:
   - Desktop ($\ge 1024\text{px}$): Horizontal navbar with hover dropdowns for each pillar, quick phone contact link, and primary "Book a Room" brass button.
   - Mobile ($< 1024\text{px}$): High-contrast sticky header with collapsible slide-over drawer (`Menu` / `X` toggle). Sub-pillar buttons are organized into a 2-column touch grid.

2. **Room Hire Calculator**:
   - Single-column flow on mobile with enlarged touch targets ($\ge 44\text{px}$) for date pickers, duration buttons, and add-on toggles.
   - Sticky calculation summary panel on mobile.
