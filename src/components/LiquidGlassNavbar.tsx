import React, { useState } from "react";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
}

export interface LiquidGlassNavbarProps {
  items: NavItem[];
  defaultActiveIndex?: number;
  activeIndex?: number;
  onChange?: (index: number, item: NavItem) => void;
  theme?: "dark" | "light";
  className?: string;
}

export function LiquidGlassNavbar({
  items,
  defaultActiveIndex = 0,
  activeIndex: controlledIndex,
  onChange,
  theme = "dark",
  className = "",
}: LiquidGlassNavbarProps) {
  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultActiveIndex);
  const activeIdx = controlledIndex ?? uncontrolledIndex;

  const handleSelect = (index: number) => {
    if (controlledIndex === undefined) {
      setUncontrolledIndex(index);
    }
    if (onChange && items[index]) {
      onChange(index, items[index]);
    }
  };

  const isLight = theme === "light";

  return (
    <aside
      aria-label="Mobile Navigation"
      className={`fixed inset-x-0 bottom-0 z-50 flex justify-center px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-2 pointer-events-none lg:hidden ${className}`}
    >
      <nav
        className={`pointer-events-auto flex h-16 w-full max-w-[420px] items-center gap-1 rounded-full border p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.16)] backdrop-blur-sm ${
          isLight
            ? "border-zinc-200 bg-white/90"
            : "border-zinc-800 bg-zinc-950/90"
        }`}
      >
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIdx === index;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(index)}
              className={`group flex min-h-11 touch-manipulation items-center justify-center rounded-full transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/70 active:scale-95 ${
                isActive
                  ? `flex-[1.55] gap-1.5 px-2.5 ${
                      isLight
                        ? "bg-zinc-900 text-white"
                        : "bg-white text-zinc-900"
                    }`
                  : `flex-1 px-2 ${
                      isLight
                        ? "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                    }`
              }`}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={`h-[18px] w-[18px] shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                  isActive ? "stroke-[2.25]" : "stroke-[1.8]"
                }`}
                aria-hidden="true"
              />
              {isActive && (
                <span className="text-[11px] font-semibold leading-none">{item.label}</span>
              )}
              {item.badge && !isActive && (
                <span className="absolute h-1.5 w-1.5 rounded-full bg-zinc-900" />
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default LiquidGlassNavbar;
