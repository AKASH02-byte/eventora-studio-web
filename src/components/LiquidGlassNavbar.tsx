import React, { useState, useEffect, useRef, useId, useCallback } from "react";
import { useSpring } from "framer-motion";
import { Home, Heart, PlusCircle, User, Bell } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number | string;
}

export interface LiquidGlassNavbarProps {
  items?: NavItem[];
  defaultActiveIndex?: number;
  activeIndex?: number;
  onChange?: (index: number, item: NavItem) => void;
  className?: string;
}

const DEFAULT_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "likes", label: "Likes", icon: Heart },
  { id: "add", label: "Add", icon: PlusCircle },
  { id: "profile", label: "Profile", icon: User },
  { id: "alerts", label: "Alerts", icon: Bell },
];

export function LiquidGlassNavbar({
  items = DEFAULT_ITEMS,
  defaultActiveIndex = 0,
  activeIndex: controlledIndex,
  onChange,
  className = "",
}: LiquidGlassNavbarProps) {
  const isControlled = controlledIndex !== undefined;
  const [uncontrolledIndex, setUncontrolledIndex] = useState(defaultActiveIndex);
  const activeIdx = isControlled ? controlledIndex : uncontrolledIndex;

  const rawId = useId();
  const clipId = `liquid-bar-clip-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const specGradId = `specular-grad-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [containerWidth, setContainerWidth] = useState(() => {
    if (typeof window !== "undefined") {
      return Math.min(420, Math.max(280, window.innerWidth - 32));
    }
    return 360;
  });

  // Geometric constants for the liquid wave cradle
  const barHeight = 76; // Total height of the navbar
  const yFlat = 18; // Height of the flat top line of the main bar
  const yScoop = 54; // Depth of the concave cradle under the active orb
  const rCorner = 24; // Corner radius for the pill ends
  const scoopHalfW = 42; // Half-width of the liquid scoop
  const orbDiameter = 48; // Diameter of the active floating orb
  const orbRadius = orbDiameter / 2;

  // Calculate synchronous target X coordinate for the active tab
  const getTabCenter = useCallback(
    (index: number) => {
      const container = containerRef.current;
      const tab = tabRefs.current[index];

      if (container && tab) {
        const cRect = container.getBoundingClientRect();
        const tRect = tab.getBoundingClientRect();
        if (tRect.width > 0) {
          return tRect.left - cRect.left + tRect.width / 2;
        }
      }

      if (containerWidth > 0 && items.length > 0) {
        const tabWidth = containerWidth / items.length;
        return tabWidth * (index + 0.5);
      }
      return 38;
    },
    [containerWidth, items.length],
  );

  const targetX = getTabCenter(activeIdx);

  // Fast, responsive spring physics without sluggish lag
  const springX = useSpring(targetX, {
    stiffness: 420,
    damping: 28,
    mass: 0.7,
  });

  const [currentX, setCurrentX] = useState(targetX);

  // Synchronize dynamic SVG path with spring updates
  useEffect(() => {
    const unsub = springX.on("change", (latest) => {
      setCurrentX(latest);
    });
    return unsub;
  }, [springX]);

  // Update target when activeIdx or containerWidth changes
  useEffect(() => {
    const newTarget = getTabCenter(activeIdx);
    springX.set(newTarget);
  }, [activeIdx, containerWidth, getTabCenter, springX]);

  // Dynamically measure container dimensions across mobile & tablet viewports
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) {
        setContainerWidth(rect.width);
      }
    };

    measure();

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0) {
          setContainerWidth(width);
        }
      }
    });

    ro.observe(el);
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  // Synchronous tab switch: updates active index and starts spring immediately in the same frame
  const handleSelectTab = (index: number) => {
    if (!isControlled) {
      setUncontrolledIndex(index);
    }
    const newTarget = getTabCenter(index);
    springX.set(newTarget);

    if (onChange && items[index]) {
      onChange(index, items[index]);
    }
  };

  const activeItem = items[activeIdx] || items[0];
  const ActiveIcon = activeItem.icon;

  // =========================================================================
  // DYNAMIC SVG PATHS (Liquid Cradle & Luminous Wave Top Edge)
  // =========================================================================
  const generatePaths = (w: number, x: number) => {
    const minX = rCorner + 12;
    const maxX = w - rCorner - 12;
    const clampedX = Math.max(minX, Math.min(maxX, x));

    const x1 = clampedX - scoopHalfW;
    const x2 = clampedX + scoopHalfW;

    // 1. Top Edge Path (Used for the luminous cyan-to-violet specular stroke)
    let topEdge = `M 0 ${yFlat + rCorner} A ${rCorner} ${rCorner} 0 0 1 ${rCorner} ${yFlat}`;

    if (x1 > rCorner) {
      topEdge += ` L ${x1} ${yFlat}`;
      topEdge += ` C ${x1 + 16} ${yFlat}, ${clampedX - 22} ${yScoop}, ${clampedX} ${yScoop}`;
    } else {
      topEdge += ` C ${rCorner + 4} ${yFlat}, ${clampedX - 18} ${yScoop}, ${clampedX} ${yScoop}`;
    }

    if (x2 < w - rCorner) {
      topEdge += ` C ${clampedX + 22} ${yScoop}, ${x2 - 16} ${yFlat}, ${x2} ${yFlat}`;
      topEdge += ` L ${w - rCorner} ${yFlat}`;
    } else {
      topEdge += ` C ${clampedX + 18} ${yScoop}, ${w - rCorner - 4} ${yFlat}, ${w - rCorner} ${yFlat}`;
    }

    topEdge += ` A ${rCorner} ${rCorner} 0 0 1 ${w} ${yFlat + rCorner}`;

    // 2. Full Closed Body Path (Used for SVG clipPath and glass background fill)
    let fullPath = topEdge;
    fullPath += ` L ${w} ${barHeight - rCorner}`;
    fullPath += ` A ${rCorner} ${rCorner} 0 0 1 ${w - rCorner} ${barHeight}`;
    fullPath += ` L ${rCorner} ${barHeight}`;
    fullPath += ` A ${rCorner} ${rCorner} 0 0 1 0 ${barHeight - rCorner}`;
    fullPath += " Z";

    return { topEdge, fullPath };
  };

  const { topEdge, fullPath } = generatePaths(containerWidth, currentX);

  return (
    // Responsive Visibility: lg:hidden ensures the bar is ONLY visible on mobile and tablet screens
    <aside
      aria-label="Mobile Navigation"
      className={`fixed bottom-4 inset-x-0 z-50 px-2 sm:px-6 flex justify-center pb-[env(safe-area-inset-bottom)] pointer-events-none select-none lg:hidden max-w-full ${className}`}
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-[420px] sm:max-w-[480px] h-[76px] sm:h-[80px] pointer-events-auto"
      >
        {/* =================================================================== */}
        {/* SVG DEFINITIONS: CLIP PATH & CYAN-TO-VIOLET SPECULAR GRADIENTS      */}
        {/* =================================================================== */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-[24px]"
          aria-hidden="true"
        >
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <path d={fullPath} />
            </clipPath>

            {/* Specular Highlight Gradient matching the website's cyan-to-violet palette */}
            <linearGradient id={specGradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--electric-blue)" stopOpacity="0.85" />
              <stop offset="48%" stopColor="var(--cyan)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="var(--magenta)" stopOpacity="0.85" />
            </linearGradient>

            {/* Subtle atmospheric cyan glow puddle beneath the active orb */}
            <radialGradient id={`${clipId}-trough-glow`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.35" />
              <stop offset="60%" stopColor="var(--electric-blue)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* =================================================================== */}
        {/* 1. CLIPPED DARK-MODE GLASSMORPHIC BACKGROUND CONTAINER              */}
        {/* =================================================================== */}
        <div
          className="absolute inset-0 backdrop-blur-2xl shadow-[var(--shadow-glass)]"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklch, var(--card) 85%, transparent) 0%, color-mix(in oklch, var(--background) 92%, transparent) 100%)",
            WebkitClipPath: `url(#${clipId})`,
            clipPath: `url(#${clipId})`,
          }}
        />

        {/* =================================================================== */}
        {/* 2. SVG CONTOUR & LUMINOUS CYAN-TO-VIOLET SPECULAR RIM               */}
        {/* =================================================================== */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10"
          aria-hidden="true"
        >
          {/* Base 1px Glass Border matching --border-glass */}
          <path d={fullPath} fill="none" stroke="var(--border-glass)" strokeWidth="1" />

          {/* Atmospheric subtle cyan glow puddle in the cradle */}
          <ellipse
            cx={currentX}
            cy={yScoop - 2}
            rx={scoopHalfW * 0.75}
            ry={12}
            fill={`url(#${clipId}-trough-glow)`}
          />

          {/* Luminous Specular Highlight along the entire top wave contour */}
          <path
            d={topEdge}
            fill="none"
            stroke={`url(#${specGradId})`}
            strokeWidth="1.75"
            strokeLinecap="round"
            className="drop-shadow-[0_0_8px_color-mix(in_oklch,var(--cyan)_70%,transparent)]"
          />
        </svg>

        {/* =================================================================== */}
        {/* 3. SYNCHRONOUS ELEVATED ACTIVE CIRCLE (CYAN-TO-VIOLET GRADIENT)     */}
        {/* =================================================================== */}
        <div
          className="absolute z-30 pointer-events-none flex items-center justify-center"
          style={{
            width: orbDiameter,
            height: orbDiameter,
            top: 2,
            transform: `translateX(${currentX - orbRadius}px)`,
            willChange: "transform",
          }}
        >
          {/* Glowing Frosted Glass Circle with Cyan-to-Violet Spectrum Accent */}
          <div
            className="relative w-full h-full rounded-full flex items-center justify-center backdrop-blur-xl border border-white/35 shadow-[var(--shadow-primary)] ring-1 ring-cyan/40"
            style={{
              background: "var(--spectrum)",
            }}
          >
            {/* Specular Radial Inner Glow */}
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_32%_28%,rgba(255,255,255,0.45),transparent_60%)] pointer-events-none" />

            {/* Instant Synchronous Active Icon (No Stagger/Delay/Lag) */}
            <div className="relative z-10 text-primary-foreground drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)] flex items-center justify-center">
              <ActiveIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.4]" />
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 4. 5-COLUMN ICON TOUCH TARGET GRID                                 */}
        {/* =================================================================== */}
        <div
          className="relative z-20 grid grid-cols-5 h-full w-full items-end"
          style={{ paddingBottom: 16 }}
        >
          {items.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeIdx === index;

            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                onClick={() => handleSelectTab(index)}
                className="group relative flex flex-col items-center justify-center min-w-[44px] min-h-[44px] w-full h-[48px] touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan/80 rounded-full cursor-pointer active:scale-95 transition-transform"
                aria-label={tab.label}
                aria-selected={isActive}
                role="tab"
              >
                {/* Instant Inactive Icon: Immediately hides when active, highlights on hover */}
                <div
                  className={`flex items-center justify-center transition-all duration-150 ${
                    isActive
                      ? "opacity-0 scale-75 -translate-y-1 pointer-events-none"
                      : "text-muted-foreground group-hover:text-cyan opacity-85 group-hover:opacity-100 scale-100"
                  }`}
                >
                  <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2]" />
                </div>

                {/* Optional Badge Indicator */}
                {tab.badge && !isActive && (
                  <span className="absolute top-1.5 right-1/4 h-2 w-2 rounded-full bg-cyan ring-2 ring-[var(--background)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* =================================================================== */}
        {/* 5. SUBTLE BOTTOM HOME INDICATOR                                     */}
        {/* =================================================================== */}
        <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none z-20">
          <div className="w-28 sm:w-36 h-1 rounded-full bg-[var(--border-glass)] backdrop-blur-sm opacity-60" />
        </div>
      </div>
    </aside>
  );
}

export default LiquidGlassNavbar;
