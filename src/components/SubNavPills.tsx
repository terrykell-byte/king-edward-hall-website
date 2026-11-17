export interface SubNavItem<T extends string = string> {
  id: T
  label: string
  isBack?: boolean
}

interface SubNavPillsProps<T extends string = string> {
  items: SubNavItem<T>[]
  activeId: T | string
  onSelect: (id: T) => void
  ariaLabel?: string
}

export function SubNavPills<T extends string = string>({
  items,
  activeId,
  onSelect,
  ariaLabel = 'Section navigation'
}: SubNavPillsProps<T>) {
  return (
    <div className="relative mb-8 sm:mb-10 border-b border-brand-cream-dark">
      <nav
        aria-label={ariaLabel}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3.5 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory"
      >
        {items.map((item) => {
          const isActive = !item.isBack && item.id === activeId
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`snap-start shrink-0 min-h-[42px] px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-brand-forest text-white shadow-soft ring-1 ring-brand-brass/40'
                  : item.isBack
                    ? 'bg-brand-surface border border-brand-forest/15 hover:border-brand-brass/50 text-brand-forest-dark'
                    : 'bg-brand-cream hover:bg-brand-cream-dark text-brand-forest-dark'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
