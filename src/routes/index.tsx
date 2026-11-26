import { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Camera,
  Video,
  Film,
  Layers,
  Sparkles,
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Play,
  Maximize2,
  ShieldCheck,
  Zap,
  Award,
  Users,
  ExternalLink,
  Sliders,
  Send,
  Briefcase,
  Tv,
  Home,
  Palette,
  Clapperboard,
  Moon,
  Sun,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LiquidGlassNavbar } from "@/components/LiquidGlassNavbar";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  image: string;
  specs: string;
  description: string;
  deliverables: string[];
}

export const Route = createFileRoute("/")({
  component: HomePage,
});

// =========================================================================
// EDITABLE BUSINESS CONFIGURATION PLACEHOLDERS
// Customize these values for your specific production company details.
// =========================================================================
const BUSINESS_CONFIG = {
  brandName: "EVENTORA",
  brandSubtitle: "STUDIOS & PRODUCTIONS",
  tagline: "Live Event Production & Cinematic Media",
  phoneDisplay: "+1 (555) 019-2834",
  phoneTel: "+15550192834",
  whatsappDisplay: "+1 (555) 019-2834",
  whatsappNumber: "15550192834",
  email: "contact@eventora.example.com",
  studioAddress: "Studio 4, Creative Media Park, Metro District",
  operatingHours: "Mon – Sun: 9:00 AM – 9:00 PM (24/7 Event On-Call)",
};

// =========================================================================
// REPLACEABLE YOUTUBE VIDEO SHOWCASE
// Swap the video IDs below with your actual YouTube video IDs.
// Each video has a "videoCategory" for filtering in the portfolio.
// =========================================================================
const VIDEO_CATEGORIES = [
  "All",
  "Corporate Films",
  "Annual Days",
  "Event Highlights",
  "Cinematic Videos",
] as const;

const YOUTUBE_VIDEOS = [
  {
    id: "kJQP7kiw5Fk", // Replaceable placeholder ID
    title: "Global Tech Summit 2026 — Mainstage Broadcast",
    category: "Cinematic Videography & Live Stream",
    videoCategory: "Corporate Films" as const,
    duration: "03:45",
    resolution: "4K UHD 60FPS",
    specs: "Sony FX6 Cinema Rig • 400A P2.6 LED Wall • Multi-Cam ATEM",
    thumbnail:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=640&q=80",
    description: "Multi-camera coverage, live switching, and a same-day teaser reel.",
  },
  {
    id: "L_LUpnjgPso", // Replaceable placeholder ID
    title: "Electric Pulse Arena Festival — Stage & LED Visuals",
    category: "LED Screen Rental & VJ Timecode",
    videoCategory: "Event Highlights" as const,
    duration: "02:50",
    resolution: "4K 120Hz",
    specs: "16×12 ft Curved LED • Novastar MX40 Pro • GrandMA3 Sync",
    thumbnail:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=640&q=80",
    description: "Curved LED wall, timecode playback, lighting, and live visuals.",
  },
  {
    id: "dQw4w9WgXcQ", // Replaceable placeholder ID
    title: "Heritage Academy Annual Day — Grand Theatrical Show",
    category: "School Annual Day & Theatrical Lights",
    videoCategory: "Annual Days" as const,
    duration: "04:15",
    resolution: "4K HDR Master",
    specs: "12×16 ft LED Screen • 8-Cam Cinema Coverage • 3,500 Attendees",
    thumbnail:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=640&q=80",
    description: "Stage, live cameras, lighting, and sound for a 3,500-seat annual day.",
  },
  {
    id: "ScMzIvxBSi4", // Replaceable placeholder ID
    title: "Neon Horizon Electronic Fest — Cinematic Aftermovie",
    category: "Post-Production & Color Grade",
    videoCategory: "Cinematic Videos" as const,
    duration: "03:20",
    resolution: "6K Master / 4K Delivery",
    specs: "DaVinci Resolve • 120fps Slow-Motion • Aerial Drone Sweeps",
    thumbnail:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=640&q=80",
    description: "Festival aftermovie with 6K capture, aerials, and colour grade.",
  },
  {
    id: "9bZkp7q19f0", // Replaceable placeholder ID
    title: "Meridian Industries — Corporate Brand Film",
    category: "Corporate Film & Brand Story",
    videoCategory: "Corporate Films" as const,
    duration: "02:40",
    resolution: "4K HDR Dolby Vision",
    specs: "Sony FX3 • Anamorphic Lenses • Studio Voiceover & Foley",
    thumbnail:
      "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=640&q=80",
    description:
      "Brand film combining interviews, location footage, motion graphics, and voiceover.",
  },
  {
    id: "JGwWNGJdvx8", // Replaceable placeholder ID
    title: "Sunrise Academy Annual Day 2026 — Full Highlight Reel",
    category: "School Event Highlights",
    videoCategory: "Annual Days" as const,
    duration: "05:10",
    resolution: "4K 60FPS",
    specs: "6-Camera Multi-Angle • Jib Crane • Wireless Lav Audio",
    thumbnail:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=640&q=80",
    description: "Annual-day highlights: performances, awards, and key moments.",
  },
];

// =========================================================================
// CURATED HIGH-RESOLUTION CINEMATIC VISUALS
// With built-in fallback handling for local development and offline preview
// =========================================================================
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=85",
  photography:
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=85",
  videography:
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=85",
  videoEditing:
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=85",
  ledScreen:
    "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85",
  eventManagement:
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=85",
  led8x12:
    "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=85",
  led12x16:
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85",
  ledCustom:
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=85",
  projectCorporate:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=85",
  projectSchool:
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=85",
  projectConcert:
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=1200&q=85",
  projectGala:
    "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=1200&q=85",
};

// Resilient Image Component with automatic fallback
function SafeImage({
  src,
  fallbackSrc,
  alt,
  className,
}: {
  src: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
      loading="lazy"
    />
  );
}

// =========================================================================
// MAIN HOMEPAGE COMPONENT
// =========================================================================
function HomePage() {
  const scrollSpyLockRef = useRef(false);
  const scrollSpyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [activeLedSize, setActiveLedSize] = useState<number>(0);
  const [selectedVideo, setSelectedVideo] = useState(YOUTUBE_VIDEOS[0]);
  const [activeSection, setActiveSection] = useState<string>("top");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    typeof window !== "undefined" && window.localStorage.getItem("eventora-theme") === "light"
      ? "light"
      : "dark",
  );

  // Form State
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "LED Video Wall Rental & Installation",
    eventDate: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("eventora-theme", theme);
  }, [theme]);

  // Section tracking for navigation highlighting
  useEffect(() => {
    const sectionIds = [
      "top",
      "services",
      "led-screens",
      "projects",
      "showcase",
      "why-us",
      "contact",
    ];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollSpyLockRef.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.05, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      if (scrollSpyTimerRef.current) {
        clearTimeout(scrollSpyTimerRef.current);
      }
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim()) {
      toast.error("Please provide at least your name and email address.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Thanks — we’ll be in touch soon.");
      setFormState({
        name: "",
        email: "",
        phone: "",
        service: "LED Video Wall Rental & Installation",
        eventDate: "",
        message: "",
      });
    }, 900);
  };

  // -----------------------------------------------------------------------
  // DATA: SERVICES
  // -----------------------------------------------------------------------
  const services = [
    {
      id: "event-management",
      num: "01",
      icon: Layers,
      title: "Event Management & Production",
      subtitle: "End-to-End Planning, Staging & Show Delivery",
      image: IMAGES.eventManagement,
      accent: "from-magenta/20 via-purple-500/10 to-transparent",
      features: [
        "Planning, timelines, and vendor coordination",
        "Stage, lighting, audio, and crew management",
        "On-site technical direction from load-in to show close",
      ],
      gear: "Show Calling • Technical Direction • Stage, Lighting & Audio Systems",
      overview:
        "A single production partner for the moving parts that make a live event feel effortless.",
      deliverables: [
        "Venue and production planning",
        "Show flow and crew coordination",
        "Technical delivery and on-site management",
      ],
    },
    {
      id: "stage-videography",
      num: "02",
      icon: Video,
      title: "Stage Videography & Live Capture",
      subtitle: "Multi-Camera Coverage for Live Performances",
      image: IMAGES.videography,
      accent: "from-purple-500/20 via-pink-500/10 to-transparent",
      features: [
        "4K multi-camera coverage for stages and events",
        "IMAG, live switching, and broadcast-ready feeds",
        "Gimbals, long lenses, cranes, and audience coverage",
      ],
      gear: "Sony FX6 / FX3 Cinema Line • DJI Ronin RS3 Pro • Blackmagic ATEM 4K",
      overview:
        "Cinematic stage coverage that keeps every performance, speaker, and audience reaction in frame.",
      deliverables: [
        "Camera plan and operator team",
        "Live screen and stream feeds",
        "Event master and social-ready selects",
      ],
    },
    {
      id: "led-screens",
      num: "03",
      icon: Tv,
      title: "LED Video Wall Rental & Installation",
      subtitle: "Indoor & Outdoor High-Refresh Displays",
      image: IMAGES.ledScreen,
      accent: "from-cyan-500/20 via-blue-500/10 to-transparent",
      features: [
        "P2.6 and P3.9 modular LED panels",
        "3840Hz camera-friendly refresh",
        "Ground-stacked, flown, curved, and custom builds",
      ],
      gear: "Novastar MX40 Pro / VX1000 Processors • Tour-Grade Rigging Hardware",
      overview:
        "High-impact LED displays engineered for the room, the camera, and the moment on stage.",
      deliverables: [
        "Screen sizing and venue layout",
        "Delivery, rigging, and signal setup",
        "Playback operation and technical support",
      ],
    },
    {
      id: "video-editing",
      num: "04",
      icon: Film,
      title: "Video Editing & Post-Production",
      subtitle: "Cinematic Films, Highlights & Social Cutdowns",
      image: IMAGES.videoEditing,
      accent: "from-magenta/20 via-indigo-500/10 to-transparent",
      features: [
        "Event films, highlight reels, and brand stories",
        "Colour grading, sound finishing, and motion graphics",
        "Formats tailored for web, social, and presentation screens",
      ],
      gear: "DaVinci Resolve Studio • Adobe After Effects • Dolby Atmos Audio Suite",
      overview:
        "Thoughtful post-production that turns event footage into a film people want to watch again.",
      deliverables: [
        "Editorial and story structure",
        "Colour, sound, and motion finishing",
        "Master files, reels, and platform exports",
      ],
    },
    {
      id: "video-editing-training",
      num: "05",
      icon: Clapperboard,
      title: "Video Editing Training & Workshops",
      subtitle: "Practical Post-Production Training for Creators",
      image: IMAGES.videoEditing,
      accent: "from-violet-500/20 via-magenta/10 to-transparent",
      features: [
        "DaVinci Resolve and Adobe editing workflows",
        "Hands-on projects with real production footage",
        "One-to-one, small-group, and team workshops",
      ],
      gear: "DaVinci Resolve Studio • Adobe After Effects • Professional Editing Workstations",
      overview:
        "Practical, project-led training for editors who want a repeatable professional workflow.",
      deliverables: [
        "Beginner to advanced learning tracks",
        "Colour, audio, and motion graphics modules",
        "Portfolio feedback and workflow templates",
      ],
    },
    {
      id: "photography",
      num: "06",
      icon: Camera,
      title: "Event Photography",
      subtitle: "Editorial Coverage & Fast Delivery",
      image: IMAGES.photography,
      accent: "from-blue-500/20 via-cyan-500/10 to-transparent",
      features: [
        "Concerts, keynotes, launches, and red carpets",
        "Multi-photographer coverage for every angle",
        "Fast social-media selects and final galleries",
      ],
      gear: "Sony α1 / A7R V • Profoto B10X High-Speed Strobes • G-Master Primes",
      overview: "Editorial event imagery that captures the scale, detail, and energy of the room.",
      deliverables: [
        "Shot list and coverage plan",
        "Same-day social selects",
        "Edited gallery and press-ready images",
      ],
    },
  ];
  const selectedService = services.find((service) => service.id === selectedServiceId) ?? null;

  // -----------------------------------------------------------------------
  // DATA: LED SCREEN SOLUTIONS
  // -----------------------------------------------------------------------
  const ledSolutions = [
    {
      name: "8 × 12 ft LED Screen",
      tagline: "For keynotes, galas, and indoor events",
      dimensions: "2.4m high × 3.6m wide",
      pitch: "P2.6mm Ultra-Fine Indoor",
      resolution: "1382 × 921 pixels · 16:9",
      bestFor: "Conferences, launches, ballrooms, and galas",
      viewingDistance: "2–18 metres",
      brightness: "1,200 nits",
      image: IMAGES.led8x12,
      highlights: ["Die-cast aluminium frame", "Fanless power supply", "Redundant power and data"],
    },
    {
      name: "12 × 16 ft LED Screen",
      tagline: "For concerts and large stages",
      dimensions: "3.6m high × 4.8m wide",
      pitch: "P2.9mm / P3.9mm High-Luminance",
      resolution: "1840 × 1380 pixels",
      bestFor: "Music Festivals, Live Concerts, School Annual Days, Award Ceremonies",
      viewingDistance: "4–45 metres",
      brightness: "4,500+ nits",
      image: IMAGES.led12x16,
      highlights: [
        "IP65 weather-sealed option",
        "3840Hz camera-friendly refresh",
        "Novastar 4K processing",
      ],
    },
    {
      name: "Custom-Sized & Curved Displays",
      tagline: "Built to fit your venue",
      dimensions: "Modular 500 × 500mm tiles",
      pitch: "Custom P1.9mm to P3.9mm Modular",
      resolution: "Up to 8K panoramic",
      bestFor: "Immersive Arenas, Curved Wings, Pillar Wraps, Stage Ceilings, Brand Booths",
      viewingDistance: "Planned for your venue",
      brightness: "1,000–5,500 nits",
      image: IMAGES.ledCustom,
      highlights: [
        "Concave and convex curves",
        "90° corners and pillar wraps",
        "Resolume and Disguise support",
      ],
    },
  ];

  // -----------------------------------------------------------------------
  // DATA: FEATURED PROJECTS
  // -----------------------------------------------------------------------
  const projects = [
    {
      id: "p1",
      title: "Global AI Innovators Keynote",
      category: "Corporate Events",
      client: "Vertex Enterprise Summit",
      year: "2026",
      image: IMAGES.projectCorporate,
      specs: "8×12 ft P2.6 LED Wall • 4K Dual Cam • Spatial Audio",
      description: "LED wall, live cameras, and sound for a 1,200-seat keynote.",
      deliverables: [
        "P2.6 LED Backdrop",
        "2-Camera 4K IMAG",
        "Wireless Shure Mic Grid",
        "Same-Day Teaser Reel",
      ],
    },
    {
      id: "p2",
      title: "St. Xavier's Grand Centenary Day",
      category: "School Annual Days",
      client: "St. Xavier's Educational Trust",
      year: "2026",
      image: IMAGES.projectSchool,
      specs: "12×16 ft Center LED • 80ft Moving Light Truss • 8-Cam Cinema",
      description: "Stage, lighting, live stream, and cameras for a 3,500-person annual day.",
      deliverables: [
        "12×16 ft High-Bright LED",
        "8-Camera Live Cut",
        "48-Ch Digital Audio Console",
        "Full 4K Archive",
      ],
    },
    {
      id: "p3",
      title: "Prism Vogue Fashion Week Gala",
      category: "Photography",
      client: "Vogue Haute Couture Network",
      year: "2026",
      image: IMAGES.photography,
      specs: "100+ Designer Looks • Profoto High-Speed Sync • 120min Delivery",
      description: "Runway and backstage photography with fast press delivery.",
      deliverables: [
        "Runway Action Capture",
        "VIP Step-and-Repeat",
        "Instant Press Cloud Folder",
        "Exhibition Prints",
      ],
    },
    {
      id: "p4",
      title: "Neon Horizon Electronic Music Fest",
      category: "Cinematic Videography",
      client: "Pulse Entertainment Group",
      year: "2026",
      image: IMAGES.projectConcert,
      specs: "6K Cinema Rigs • Heavy Lift Drone • 120fps Slow-Motion",
      description: "Festival aftermovie with 6K capture, drone footage, and DaVinci grade.",
      deliverables: [
        "3-Minute Cinematic Reel",
        "60-Sec Social Cutdowns",
        "Raw 6K Master ProRes",
        "Sound Design Mix",
      ],
    },
    {
      id: "p5",
      title: "Nexus Horizon Curved Stage Wall",
      category: "LED Installations",
      client: "Titan Motors Product Launch",
      year: "2026",
      image: IMAGES.ledScreen,
      specs: "24m Panoramic Curved LED • 8K Media Server • Zero Bezel",
      description: "180° curved LED wall for a vehicle reveal.",
      deliverables: [
        "Bespoke Modular Wall",
        "Novastar MX40 Pro Sync",
        "Ground Structural Rigging",
        "On-Site Video Engineer",
      ],
    },
    {
      id: "p6",
      title: "Emerald Royale Charity Gala",
      category: "Corporate Events",
      client: "Global Heritage Foundation",
      year: "2026",
      image: IMAGES.projectGala,
      specs: "Dual 8×12 ft LED Screens • Warm Ambient Lighting • 4K Film",
      description: "Dual LED screens, lighting, and 4K event film for a charity gala.",
      deliverables: [
        "Dual LED Wing Screens",
        "Warm Architectural Wash",
        "Live Auction Feed",
        "Post-Event Highlights",
      ],
    },
  ];

  const filteredProjects =
    activeTab === "All" ? projects : projects.filter((p) => p.category === activeTab);

  const mobileNavItems = [
    { id: "top", label: "Home", icon: Home },
    { id: "services", label: "Services", icon: Layers },
    { id: "led-screens", label: "LED", icon: Tv },
    { id: "projects", label: "Work", icon: Briefcase },
    { id: "contact", label: "Quote", icon: MessageSquare },
  ];

  const mobileActiveIndex =
    activeSection === "top"
      ? 0
      : activeSection === "services"
        ? 1
        : activeSection === "led-screens"
          ? 2
          : activeSection === "projects" ||
              activeSection === "showcase" ||
              activeSection === "why-us"
            ? 3
            : activeSection === "contact"
              ? 4
              : 0;

  return (
    <div
      className={`site-shell ${theme === "light" ? "light" : ""} min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground pb-28 lg:pb-0 overflow-x-clip max-w-full`}
    >
      {/* ------------------------------------------------------------------- */}
      {/* DESKTOP & MOBILE TOP NAVIGATION BAR                                */}
      {/* ------------------------------------------------------------------- */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-4">
          <nav className="glass-surface flex items-center justify-between rounded-full px-3.5 sm:px-5 py-2 sm:py-3 border border-border/40 shadow-2xl backdrop-blur-xl">
            {/* Brand Logo */}
            <a href="#top" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="brand-icon flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl font-bold tracking-wider text-sm transition-transform duration-300 group-hover:scale-105">
                <Sparkles className="h-4 w-4 text-cyan" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold tracking-widest text-xs sm:text-sm text-foreground group-hover:text-cyan transition-colors">
                  {BUSINESS_CONFIG.brandName}
                </span>
                <span className="text-[9px] tracking-wider text-muted-foreground uppercase hidden sm:inline">
                  {BUSINESS_CONFIG.brandSubtitle}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <a
                href="#services"
                className={`transition-colors hover:text-cyan ${activeSection === "services" ? "text-cyan font-bold" : ""}`}
              >
                Services
              </a>
              <a
                href="#led-screens"
                className={`transition-colors hover:text-cyan ${activeSection === "led-screens" ? "text-cyan font-bold" : ""}`}
              >
                LED Screens
              </a>
              <a
                href="#projects"
                className={`transition-colors hover:text-cyan ${activeSection === "projects" ? "text-cyan font-bold" : ""}`}
              >
                Projects
              </a>
              <a
                href="#showcase"
                className={`transition-colors hover:text-cyan ${activeSection === "showcase" ? "text-cyan font-bold" : ""}`}
              >
                Showcase
              </a>
              <a
                href="#why-us"
                className={`transition-colors hover:text-cyan ${activeSection === "why-us" ? "text-cyan font-bold" : ""}`}
              >
                Why Us
              </a>
              <a
                href="#contact"
                className={`transition-colors hover:text-cyan ${activeSection === "contact" ? "text-cyan font-bold" : ""}`}
              >
                Contact
              </a>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
                className="theme-toggle inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-card/60 text-muted-foreground transition-all hover:border-cyan/60 hover:text-cyan"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              >
                {theme === "dark" ? (
                  <Sun className="h-3.5 w-3.5" />
                ) : (
                  <Moon className="h-3.5 w-3.5" />
                )}
              </button>
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=Hi%20Eventora,%20I%20would%20like%20to%20enquire%20about%20event%20production%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border/50 hover:border-cyan/50 transition-all"
                title="Chat with Technical Director on WhatsApp"
              >
                <MessageSquare className="h-3.5 w-3.5 text-cyan" />
                <span>WhatsApp</span>
              </a>

              <a
                href="#contact"
                className="action-primary inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground tracking-wide hover:brightness-110 active:scale-95 transition-all"
              >
                <span>Get a quote</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* ------------------------------------------------------------------- */}
      {/* 1. HERO SECTION                                                     */}
      {/* ------------------------------------------------------------------- */}
      <section
        id="top"
        className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      >
        {/* Cinematic Background Image with Vignette */}
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="/__l5e/assets-v1/e2543fd0-8e35-4f7a-bda2-3e24c33a4e28/event-hero.jpg"
            fallbackSrc={IMAGES.hero}
            alt="Eventora Arena Live Concert and Stage Production"
            className="hero-image h-full w-full object-cover opacity-15"
          />
          <div className="hero-vignette absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="hero-topline absolute top-0 left-0 right-0" />
        </div>

        {/* Live, lightweight motion layer — shared geometry across themes */}
        <div className="hero-aurora" aria-hidden="true">
          <span className="aurora-orb aurora-orb-one" />
          <span className="aurora-orb aurora-orb-two" />
          <span className="aurora-orb aurora-orb-three" />
          <span className="aurora-orb aurora-orb-four" />
        </div>

        {/* Ambient Glow Orbs */}
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-electric-blue/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-magenta/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/3 h-80 w-80 rounded-full bg-cyan/15 blur-3xl pointer-events-none" />

        {/* Hero Content Container */}
        <div className="relative z-10 mx-auto max-w-5xl text-center flex flex-col items-center w-full">
          {/* Status Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3.5 sm:px-4 py-1.5 backdrop-blur-md mb-6 sm:mb-8 animate-fade-in shadow-lg max-w-[92vw]">
            <span className="status-light animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted-foreground truncate">
              <span className="sm:hidden">Live Event Production & Media</span>
              <span className="hidden sm:inline">
                Production • Photography • LED Walls • Event Management
              </span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] max-w-4xl mb-4 sm:mb-6">
            We Capture Moments.{" "}
            <span className="text-spectrum block sm:inline">We Create Experiences.</span>
          </h1>

          {/* Supporting Description */}
          <p className="max-w-2xl text-sm sm:text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 sm:mb-10 px-2 sm:px-0">
            Event production, LED walls, photography, and multi-camera video for live events.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mb-12 sm:mb-16 px-4 sm:px-0">
            <a
              href="#projects"
              className="action-primary w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-3.5 sm:py-4 text-sm font-bold text-primary-foreground shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <span>View work</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#contact"
              className="action-glass w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-border/60 bg-card/40 px-8 py-3.5 sm:py-4 text-sm font-semibold text-foreground backdrop-blur-md transition-all hover:border-cyan/50 hover:bg-card/70 hover:scale-105"
            >
              <Phone className="h-4 w-4 text-cyan" />
              <span>Contact Us</span>
            </a>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full max-w-4xl border-t border-border/40 pt-6 sm:pt-8 mt-2">
            <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-xl border border-border/20 bg-card/20 backdrop-blur-sm text-center">
              <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                500+
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-1">
                Events Delivered
              </span>
            </div>
            <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-xl border border-border/20 bg-card/20 backdrop-blur-sm text-center">
              <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-cyan">
                4K HDR
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-1">
                Cinema Broadcast
              </span>
            </div>
            <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-xl border border-border/20 bg-card/20 backdrop-blur-sm text-center">
              <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                3840 Hz
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-1">
                LED Refresh Rate
              </span>
            </div>
            <div className="flex flex-col items-center p-2.5 sm:p-3 rounded-xl border border-border/20 bg-card/20 backdrop-blur-sm text-center">
              <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-magenta">
                100%
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-1">
                In-House Gear
              </span>
            </div>
          </div>
        </div>

        {/* Ambient Bottom Scroll Indicator */}
        <div className="hidden lg:flex items-center gap-2 hero-scroll">
          <span className="hero-scroll-line" />
          <span>SCROLL TO EXPLORE</span>
        </div>
        <div className="hidden lg:block hero-coordinate">
          <span>EVENTORA • LIVE PRODUCTION</span>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 2. SERVICES SECTION                                                 */}
      {/* ------------------------------------------------------------------- */}
      <section
        id="services"
        className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-border/30"
      >
        <div className="ambient-section-bg" aria-hidden="true" />
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
            <div>
              <div className="flex items-center gap-2 text-cyan text-xs font-bold uppercase tracking-widest mb-3">
                <span className="h-1 w-6 bg-cyan rounded-full inline-block" />
                <span>Our Capabilities</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                Production, <span className="text-spectrum">done properly</span>
              </h2>
            </div>
            <p className="max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed">
              In-house equipment and specialist crews for every part of the show.
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article
                  id={`service-${service.id}`}
                  key={`detail-${service.id}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedServiceId(service.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedServiceId(service.id);
                    }
                  }}
                  className="service-detail group relative scroll-mt-28 cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl border border-border/50 bg-card/70 backdrop-blur-xl transition-all duration-300 hover:border-cyan/60 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-50`}
                  />
                  <div
                    className={`relative grid grid-cols-1 ${index % 2 === 0 ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[0.9fr_1.1fr]"}`}
                  >
                    <div
                      className={`relative min-h-64 overflow-hidden ${index % 2 === 0 ? "lg:order-2" : ""}`}
                    >
                      <SafeImage
                        src={service.image}
                        fallbackSrc={IMAGES.hero}
                        alt={service.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="image-shade absolute inset-0" />
                    </div>
                    <div
                      className={`relative p-6 sm:p-10 lg:p-12 ${index % 2 === 0 ? "lg:order-1" : ""}`}
                    >
                      <div className="mb-5 flex items-center gap-3 text-cyan">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan/40 bg-cyan/10">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-bold uppercase tracking-[0.22em]">
                          Service {service.num}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                        {service.title}
                      </h3>
                      <p className="mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground">
                        {service.overview}
                      </p>
                      <div className="mt-6 grid gap-2.5">
                        {service.deliverables.map((deliverable) => (
                          <div
                            key={deliverable}
                            className="flex items-center gap-2.5 text-sm text-foreground/80"
                          >
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan" />
                            <span>{deliverable}</span>
                          </div>
                        ))}
                      </div>
                      <a
                        href="#contact"
                        onClick={(event) => {
                          event.stopPropagation();
                          setFormState((prev) => ({ ...prev, service: service.title }));
                        }}
                        className="action-primary mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-bold text-primary-foreground transition-all hover:brightness-110"
                      >
                        <span>Plan this service</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 3. LED SCREEN SOLUTIONS SHOWCASE                                    */}
      {/* ------------------------------------------------------------------- */}
      <section
        id="led-screens"
        className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-border/30 bg-muted/20"
      >
        <div className="ambient-section-bg" aria-hidden="true" />
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-cyan text-xs font-bold uppercase tracking-widest mb-3">
              <Tv className="h-4 w-4" />
              <span>Tour-Grade Hardware</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
              LED screen <span className="text-spectrum">solutions</span>
            </h2>
            <p className="text-muted-foreground text-xs sm:text-base leading-relaxed px-2 sm:px-0">
              Camera-friendly LED walls in standard sizes or custom builds.
            </p>
          </div>

          {/* Size Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            {ledSolutions.map((sol, idx) => (
              <button
                key={idx}
                onClick={() => setActiveLedSize(idx)}
                className={`px-3.5 sm:px-5 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 border ${
                  activeLedSize === idx
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-cyan/20 scale-105"
                    : "bg-card/60 text-muted-foreground border-border/50 hover:text-foreground hover:border-cyan/50"
                }`}
              >
                {sol.name}
              </button>
            ))}
          </div>

          {/* Active Solution Feature Spotlight */}
          {(() => {
            const currentSolution = ledSolutions[activeLedSize];
            return (
              <div className="led-showcase rounded-2xl sm:rounded-3xl border border-border/50 bg-card/60 backdrop-blur-2xl overflow-hidden shadow-2xl p-4 sm:p-8 lg:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                  {/* Left Column: Visual Stage Simulation */}
                  <div className="lg:col-span-7 flex flex-col">
                    <div className="relative rounded-2xl overflow-hidden border border-border/50 aspect-video group">
                      <SafeImage
                        src={currentSolution.image}
                        fallbackSrc={IMAGES.ledScreen}
                        alt={currentSolution.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                      {/* Display Overlay Badges */}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="rounded-full bg-background/80 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-bold text-cyan border border-cyan/40">
                          {currentSolution.pitch}
                        </span>
                        <span className="rounded-full bg-background/80 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-semibold text-foreground border border-border/40">
                          3840Hz Refresh
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-end justify-between">
                        <div>
                          <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-muted-foreground">
                            Standard Dimensions
                          </span>
                          <p className="font-display text-base sm:text-xl font-bold text-foreground">
                            {currentSolution.dimensions}
                          </p>
                        </div>
                        <span className="text-[11px] sm:text-xs font-mono px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-black/60 border border-white/10 text-cyan">
                          {currentSolution.resolution}
                        </span>
                      </div>
                    </div>

                    {/* Camera Certification Strip */}
                    <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-muted/40 border border-border/30 text-[11px] sm:text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <ShieldCheck className="h-4 w-4 text-cyan shrink-0" />
                        <span>Camera-friendly refresh</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Zap className="h-4 w-4 text-magenta shrink-0" />
                        <span>Novastar 4K processing</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Technical Details & Specifications */}
                  <div className="lg:col-span-5 flex flex-col justify-between mt-2 lg:mt-0">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-cyan mb-1.5 sm:mb-2 block">
                        Display Profile
                      </span>
                      <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground mb-2 sm:mb-3">
                        {currentSolution.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mb-5 sm:mb-6 leading-relaxed">
                        {currentSolution.tagline}.
                      </p>

                      {/* Quick Specs Grid */}
                      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-5 sm:mb-6">
                        <div className="p-2.5 sm:p-3 rounded-xl border border-border/40 bg-card/40">
                          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground block">
                            Optimal Viewing
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-foreground">
                            {currentSolution.viewingDistance}
                          </span>
                        </div>
                        <div className="p-2.5 sm:p-3 rounded-xl border border-border/40 bg-card/40">
                          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground block">
                            Max Brightness
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-foreground">
                            {currentSolution.brightness}
                          </span>
                        </div>
                        <div className="p-2.5 sm:p-3 rounded-xl border border-border/40 bg-card/40 col-span-2">
                          <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-muted-foreground block">
                            Best for
                          </span>
                          <span className="text-xs font-medium text-foreground">
                            {currentSolution.bestFor}
                          </span>
                        </div>
                      </div>

                      {/* Technical Highlights */}
                      <div className="space-y-1.5 sm:space-y-2 mb-6 sm:mb-8">
                        {currentSolution.highlights.map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-cyan shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Book This Screen CTA */}
                    <a
                      href="#contact"
                      onClick={() =>
                        setFormState((prev) => ({
                          ...prev,
                          service: `LED Screen Rental (${currentSolution.name})`,
                        }))
                      }
                      className="action-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-xs sm:text-sm font-bold text-primary-foreground shadow-lg hover:brightness-110 transition-all text-center"
                    >
                      <span>Reserve {currentSolution.name}</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 4. FEATURED PROJECTS PORTFOLIO                                      */}
      {/* ------------------------------------------------------------------- */}
      <section
        id="projects"
        className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-border/30"
      >
        <div className="ambient-section-bg" aria-hidden="true" />
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
            <div>
              <div className="flex items-center gap-2 text-cyan text-xs font-bold uppercase tracking-widest mb-3">
                <Briefcase className="h-4 w-4" />
                <span>Selected Works</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                Selected <span className="text-spectrum">work</span>
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-muted-foreground">
              A selection of recent work.
            </p>
          </div>

          {/* Category Filter Tabs with Horizontal Mobile Swipe */}
          <div className="flex flex-nowrap sm:flex-wrap gap-2 pb-3 overflow-x-auto no-scrollbar mb-8 sm:mb-10 border-b border-border/30 -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              "All",
              "Corporate Events",
              "School Annual Days",
              "Photography",
              "Cinematic Videography",
              "LED Installations",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border shrink-0 ${
                  activeTab === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card/50 text-muted-foreground border-border/40 hover:text-foreground hover:border-cyan/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="project-card group cursor-pointer relative rounded-2xl overflow-hidden border border-border/50 bg-card/60 backdrop-blur-md flex flex-col justify-end p-5 sm:p-6 transition-all duration-300 hover:border-cyan/60 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Background Image */}
                <SafeImage
                  src={project.image}
                  fallbackSrc={IMAGES.hero}
                  alt={project.title}
                  className="project-image absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="project-shade absolute inset-0" />

                {/* Top Category Badge */}
                <div className="relative z-10 flex items-center justify-between mb-auto pb-16 sm:pb-24">
                  <span className="rounded-full bg-background/80 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] font-bold tracking-wider uppercase text-cyan border border-cyan/40">
                    {project.category}
                  </span>
                  <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-background/60 backdrop-blur-md border border-border/40 flex items-center justify-center text-muted-foreground group-hover:text-cyan group-hover:border-cyan/60 transition-colors">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Bottom Card Content */}
                <div className="relative z-10">
                  <div className="text-[10px] sm:text-[11px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                    {project.client} • {project.year}
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground group-hover:text-cyan transition-colors mb-1.5 sm:mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3 sm:mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-white/10 pt-2.5 sm:pt-3 text-[10px] sm:text-[11px] text-foreground/80 font-mono">
                    <span className="truncate pr-2">{project.specs}</span>
                    <span className="text-cyan font-bold shrink-0">Details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 5. CINEMATIC VIDEO SHOWCASE                                         */}
      {/* ------------------------------------------------------------------- */}
      <section
        id="showcase"
        className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-border/30 bg-muted/10"
      >
        <div className="ambient-section-bg" aria-hidden="true" />
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-magenta text-xs font-bold uppercase tracking-widest mb-3">
              <Play className="h-4 w-4" />
              <span>Video</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
              Recent <span className="text-spectrum">work</span>
            </h2>
            <p className="text-muted-foreground text-xs sm:text-base leading-relaxed px-2 sm:px-0">
              Films, live-event coverage, and highlights.
            </p>
          </div>

          {/* Main Active Video Player */}
          <div className="film-card rounded-2xl sm:rounded-3xl border border-border/60 bg-card/70 backdrop-blur-2xl p-3 sm:p-5 md:p-6 shadow-2xl mb-6 sm:mb-10 overflow-hidden">
            <div className="relative aspect-video w-full rounded-xl sm:rounded-2xl overflow-hidden bg-black/80 shadow-inner">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.id}?rel=0&modestbranding=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full border-0"
              />
            </div>

            {/* Video Caption & Technical Specs */}
            <div className="mt-4 sm:mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 px-1 sm:px-2">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="rounded-full bg-cyan/10 border border-cyan/30 px-2.5 py-0.5 text-[10px] font-bold text-cyan uppercase tracking-wider">
                    {selectedVideo.category}
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono text-muted-foreground">
                    Duration: {selectedVideo.duration} • {selectedVideo.resolution}
                  </span>
                </div>
                <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                  {selectedVideo.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-3xl leading-relaxed">
                  {selectedVideo.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-glass w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold border border-border/50 hover:border-cyan/50 transition-all text-center"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-cyan" />
                  <span>Open on YouTube</span>
                </a>
              </div>
            </div>
          </div>

          {/* Playlist Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {YOUTUBE_VIDEOS.map((vid, idx) => {
              const isSelected = selectedVideo.id === vid.id;
              return (
                <div
                  key={vid.id}
                  onClick={() => setSelectedVideo(vid)}
                  className={`cursor-pointer rounded-2xl p-3.5 sm:p-4 border transition-all duration-200 ${
                    isSelected
                      ? "border-cyan/60 bg-cyan/10 shadow-lg scale-102"
                      : "border-border/40 bg-card/40 hover:border-border hover:bg-card/70"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-cyan text-black"
                          : "bg-card border border-border/50 text-muted-foreground"
                      }`}
                    >
                      <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-current ml-0.5" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground uppercase truncate">
                      Reel 0{idx + 1} • {vid.duration}
                    </span>
                  </div>
                  <h4 className="font-display text-xs sm:text-sm font-bold text-foreground line-clamp-1">
                    {vid.title}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground line-clamp-1 mt-0.5 sm:mt-1">
                    {vid.specs}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 6. WHY CHOOSE US                                                    */}
      {/* ------------------------------------------------------------------- */}
      <section
        id="why-us"
        className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-border/30"
      >
        <div className="ambient-section-bg" aria-hidden="true" />
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
            <div>
              <div className="flex items-center gap-2 text-cyan text-xs font-bold uppercase tracking-widest mb-3">
                <Award className="h-4 w-4" />
                <span>Why Eventora</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                Built for <span className="text-spectrum">live events</span>
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-muted-foreground leading-relaxed">
              The details that keep a production running smoothly.
            </p>
          </div>

          {/* Core Differentiators Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-16">
            <div className="why-item">
              <div className="why-icon h-10 w-10 rounded-xl flex items-center justify-center shrink-0">
                <Sliders className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
                  100% Owned Hardware
                </h3>
                <p className="why-label text-xs mt-1 leading-relaxed">
                  Cameras, processors, and cabling maintained by our team.
                </p>
              </div>
            </div>

            <div className="why-item">
              <div className="why-icon h-10 w-10 rounded-xl flex items-center justify-center shrink-0">
                <Zap className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
                  Rapid Same-Day Delivery
                </h3>
                <p className="why-label text-xs mt-1 leading-relaxed">
                  Fast photo selects and event teasers when timing matters.
                </p>
              </div>
            </div>

            <div className="why-item">
              <div className="why-icon h-10 w-10 rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
                  Dual-Redundant Power
                </h3>
                <p className="why-label text-xs mt-1 leading-relaxed">
                  Backup switchers, signal paths, and power planned in advance.
                </p>
              </div>
            </div>

            <div className="why-item">
              <div className="why-icon h-10 w-10 rounded-xl flex items-center justify-center shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-sm sm:text-base font-bold text-foreground">
                  Certified Show Directors
                </h3>
                <p className="why-label text-xs mt-1 leading-relaxed">
                  Technical directors, lighting programmers, and audio engineers on site.
                </p>
              </div>
            </div>
          </div>

          {/* Proof Strip */}
          <div className="rounded-2xl border border-border/50 bg-card/40 p-5 sm:p-8 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6">
            <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-cyan/10 border border-cyan/40 flex items-center justify-center text-cyan shrink-0">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h4 className="font-display text-base sm:text-lg font-bold text-foreground">
                  Planning an event?
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Ask for a venue survey or LED layout.
                </p>
              </div>
            </div>
            <a
              href="#contact"
              className="action-primary shrink-0 w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs sm:text-sm font-bold text-primary-foreground shadow-lg hover:brightness-110 text-center"
            >
              <span>Talk to our team</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 7. CONTACT & ENQUIRY SECTION                                        */}
      {/* ------------------------------------------------------------------- */}
      <section
        id="contact"
        className="contact-section relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-border/30 overflow-hidden"
      >
        <div className="ambient-section-bg" aria-hidden="true" />
        {/* Subtle Backdrop Glows */}
        <div className="absolute top-1/2 left-10 h-96 w-96 rounded-full bg-cyan/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-magenta/10 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="contact-layout grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
            {/* Left Column: Direct Action CTAs & Business Info */}
            <div className="contact-intro-panel lg:col-span-5 flex flex-col justify-between rounded-3xl p-6 sm:p-8 lg:p-10 overflow-hidden">
              <div>
                <div className="inline-flex items-center gap-2 text-cyan text-xs font-bold uppercase tracking-widest mb-3">
                  <Send className="h-4 w-4" />
                  <span>Get in Touch</span>
                </div>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
                  Let’s talk about <span className="contact-heading-accent">your event</span>
                </h2>
                <p className="text-xs sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                  Share the date, venue, and what you need. We’ll take it from there.
                </p>

                {/* Direct Action Quick Contact Links */}
                <div className="contact-channels grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {/* WhatsApp CTA */}
                  <a
                    href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=Hi%20Eventora,%20I%20would%20like%20to%20enquire%20about%20event%20production%20services.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link contact-channel group sm:col-span-2"
                  >
                    <div className="contact-link-icon flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
                      <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-cyan" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-muted-foreground truncate">
                        WhatsApp
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-cyan transition-colors truncate">
                        {BUSINESS_CONFIG.whatsappDisplay}
                      </span>
                    </div>
                    <ArrowUpRight className="contact-link-arrow ml-auto h-4 w-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* Phone CTA */}
                  <a
                    href={`tel:${BUSINESS_CONFIG.phoneTel}`}
                    className="contact-link contact-channel group"
                  >
                    <div className="contact-link-icon flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-muted-foreground truncate">
                        Phone
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                        {BUSINESS_CONFIG.phoneDisplay}
                      </span>
                    </div>
                    <ArrowUpRight className="contact-link-arrow ml-auto h-4 w-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* Email CTA */}
                  <a
                    href={`mailto:${BUSINESS_CONFIG.email}`}
                    className="contact-link contact-channel group"
                  >
                    <div className="contact-link-icon flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-magenta" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-muted-foreground truncate">
                        Email
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-magenta transition-colors truncate">
                        {BUSINESS_CONFIG.email}
                      </span>
                    </div>
                    <ArrowUpRight className="contact-link-arrow ml-auto h-4 w-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Physical Studio Address */}
              <div className="contact-meta pt-5 border-t border-border/40 text-xs text-muted-foreground space-y-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="h-4 w-4 text-cyan shrink-0 mt-0.5" />
                  <span>{BUSINESS_CONFIG.studioAddress}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-cyan shrink-0" />
                  <span>{BUSINESS_CONFIG.operatingHours}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Glassmorphism Booking & Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="contact-form-panel rounded-3xl border border-border/70 bg-card p-5 sm:p-8 lg:p-10">
                <div className="quote-form-header">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan">
                      Start a project
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mt-2">
                      Tell us what you’re planning
                    </h3>
                  </div>
                  <div className="quote-response">
                    <span className="quote-response-dot" />
                    <span>Replies within one business day</span>
                  </div>
                </div>

                <div className="quote-steps" aria-label="Quote request steps">
                  <span className="quote-step quote-step-active">
                    <b>01</b> Details
                  </span>
                  <span className="quote-step">
                    <b>02</b> Requirements
                  </span>
                  <span className="quote-step">
                    <b>03</b> Review
                  </span>
                </div>

                <form onSubmit={handleFormSubmit} className="quote-form space-y-4 sm:space-y-5">
                  <div className="quote-fields grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Full Name */}
                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 sm:mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alexander Vance"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="quote-control w-full min-w-0 rounded-xl border border-border/50 bg-background/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 sm:mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. alex@company.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="quote-control w-full min-w-0 rounded-xl border border-border/50 bg-background/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan transition-all"
                      />
                    </div>
                  </div>

                  <div className="quote-fields grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Phone Number */}
                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 sm:mb-2">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +1 (555) 000-0000"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="quote-control w-full min-w-0 rounded-xl border border-border/50 bg-background/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan transition-all"
                      />
                    </div>

                    {/* Event Date */}
                    <div className="min-w-0">
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 sm:mb-2">
                        Estimated Event Date
                      </label>
                      <input
                        type="date"
                        value={formState.eventDate}
                        onChange={(e) => setFormState({ ...formState, eventDate: e.target.value })}
                        className="quote-control w-full min-w-0 rounded-xl border border-border/50 bg-background/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan transition-all"
                      />
                    </div>
                  </div>

                  {/* Primary Service Required */}
                  <div className="min-w-0">
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 sm:mb-2">
                      Service needed
                    </label>
                    <select
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className="quote-control w-full min-w-0 rounded-xl border border-border/50 bg-background/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan transition-all"
                    >
                      {services.map((service) => (
                        <option key={service.id} value={service.title}>
                          {service.title}
                        </option>
                      ))}
                      <option value="All Services Package">Multiple services</option>
                    </select>
                  </div>

                  {/* Message & Project Scope */}
                  <div className="min-w-0">
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 sm:mb-2">
                      Event details
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Venue, audience size, event format, and anything else we should know."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="quote-control quote-message w-full min-w-0 rounded-xl border border-border/50 bg-background/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="action-primary w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-primary-foreground shadow-xl transition-all hover:brightness-110 active:scale-98 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending…</span>
                    ) : (
                      <>
                        <span>Send request</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] sm:text-[11px] text-center text-muted-foreground">
                    Your details stay private.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* FOOTER                                                              */}
      {/* ------------------------------------------------------------------- */}
      <footer className="border-t border-border/30 bg-background/95 px-4 pt-8 pb-24 text-xs text-muted-foreground sm:px-6 sm:pt-12 md:pb-8 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 md:justify-start">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan/10 border border-cyan/40 text-cyan">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <span className="font-display font-extrabold tracking-widest text-foreground text-sm">
                {BUSINESS_CONFIG.brandName}
              </span>
              <span className="text-muted-foreground">© 2026. All rights reserved.</span>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/20 bg-violet-500/10 px-2.5 py-1 text-[11px] leading-none text-muted-foreground">
              Powered by{" "}
              <a
                href="https://vikaasinfina.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-violet-500"
              >
                VikaasInfina
              </a>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-semibold uppercase tracking-wider text-[11px]">
            <a href="#services" className="hover:text-cyan transition-colors">
              Services
            </a>
            <a href="#led-screens" className="hover:text-cyan transition-colors">
              LED Screens
            </a>
            <a href="#projects" className="hover:text-cyan transition-colors">
              Projects
            </a>
            <a href="#showcase" className="hover:text-cyan transition-colors">
              Showcase
            </a>
            <a href="#why-us" className="hover:text-cyan transition-colors">
              Why Us
            </a>
            <a href="#contact" className="hover:text-cyan transition-colors">
              Contact
            </a>
          </div>

          <a
            href="#top"
            className="footer-top inline-flex items-center gap-1.5 hover:text-cyan transition-colors"
          >
            <span>Back to top</span>
            <ArrowRight className="h-3.5 w-3.5 -rotate-90" />
          </a>
        </div>
      </footer>

      {/* ------------------------------------------------------------------- */}
      {/* MOBILE FLOATING PILL NAVIGATION BAR                                  */}
      {/* ------------------------------------------------------------------- */}
      <div className="md:hidden">
        <LiquidGlassNavbar
          items={mobileNavItems}
          activeIndex={mobileActiveIndex}
          theme={theme}
          onChange={(_, item) => {
            scrollSpyLockRef.current = true;
            setActiveSection(item.id);

            if (scrollSpyTimerRef.current) {
              clearTimeout(scrollSpyTimerRef.current);
            }
            scrollSpyTimerRef.current = setTimeout(() => {
              scrollSpyLockRef.current = false;
            }, 700);

            if (item.id === "top") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              const el = document.getElementById(item.id);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* SERVICE DETAIL DIALOG                                               */}
      {/* ------------------------------------------------------------------- */}
      <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedServiceId(null)}>
        {selectedService &&
          (() => {
            const Icon = selectedService.icon;
            return (
              <DialogContent className="glass-surface max-h-[90vh] w-[94vw] max-w-4xl overflow-y-auto border-border/60 bg-card/95 p-0 text-foreground backdrop-blur-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative min-h-64 overflow-hidden lg:min-h-full">
                    <SafeImage
                      src={selectedService.image}
                      fallbackSrc={IMAGES.hero}
                      alt={selectedService.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="image-shade absolute inset-0" />
                  </div>
                  <div className="p-6 sm:p-8">
                    <DialogHeader>
                      <div className="mb-4 flex items-center gap-3 text-cyan">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan/40 bg-cyan/10">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-xs font-bold uppercase tracking-[0.22em]">
                          Explore service {selectedService.num}
                        </span>
                      </div>
                      <DialogTitle className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                        {selectedService.title}
                      </DialogTitle>
                      <DialogDescription className="pt-2 text-sm leading-relaxed text-muted-foreground">
                        {selectedService.overview}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="mt-6 space-y-3">
                      {selectedService.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2.5 text-sm text-foreground/80"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 border-t border-border/40 pt-5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                        Production toolkit
                      </span>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {selectedService.gear}
                      </p>
                    </div>

                    <a
                      href="#contact"
                      onClick={() => {
                        setFormState((prev) => ({ ...prev, service: selectedService.title }));
                        setSelectedServiceId(null);
                      }}
                      className="action-primary mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:brightness-110"
                    >
                      <span>Plan this service</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </DialogContent>
            );
          })()}
      </Dialog>

      {/* ------------------------------------------------------------------- */}
      {/* PROJECT DETAILS DIALOG MODAL                                        */}
      {/* ------------------------------------------------------------------- */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        {selectedProject && (
          <DialogContent className="glass-surface max-w-2xl w-[94vw] sm:w-full p-4 sm:p-6 border-border/60 bg-card/90 backdrop-blur-2xl text-foreground max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full bg-cyan/10 border border-cyan/30 px-3 py-0.5 text-[10px] font-bold text-cyan uppercase tracking-wider">
                  {selectedProject.category}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  {selectedProject.client} • {selectedProject.year}
                </span>
              </div>
              <DialogTitle className="font-display text-xl sm:text-2xl font-bold">
                {selectedProject.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-xs sm:text-sm">
                Technical Production Scope & Deliverables
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border/40">
                <SafeImage
                  src={selectedProject.image}
                  fallbackSrc={IMAGES.hero}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                {selectedProject.description}
              </p>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan block mb-2">
                  Delivered Production Scope:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedProject.deliverables?.map((del: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-[11px] sm:text-xs font-mono text-muted-foreground">
                  Hardware: {selectedProject.specs}
                </span>
                <a
                  href="#contact"
                  onClick={() => {
                    setSelectedProject(null);
                    setFormState((prev) => ({
                      ...prev,
                      message: `Inquiring about project similar to: ${selectedProject.title}`,
                    }));
                  }}
                  className="action-primary w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow text-center"
                >
                  <span>Request Similar Setup</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
