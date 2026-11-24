import { useState, useEffect } from "react";
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
    description:
      "Full multi-camera coverage with 400A P2.6 LED stage backdrop, live IMAG switching, robotic cranes, and same-night teaser reel.",
  },
  {
    id: "L_LUpnjgPso", // Replaceable placeholder ID
    title: "Electric Pulse Arena Festival — Stage & LED Visuals",
    category: "LED Screen Rental & VJ Timecode",
    videoCategory: "Event Highlights" as const,
    duration: "02:50",
    resolution: "4K 120Hz Ultra-Sync",
    specs: "16×12 ft Curved LED • Novastar MX40 Pro • GrandMA3 Sync",
    thumbnail:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?auto=format&fit=crop&w=640&q=80",
    description:
      "16×12 ft curved modular LED wall synced to live timecode with pyrotechnics, atmospheric haze, and automated concert lighting.",
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
    description:
      "End-to-end stage production for 3,500 attendees featuring 12-camera live IMAG, motorized line-array truss, and crystal audio.",
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
    description:
      "Official cinematic aftermovie capturing 15,000 festivalgoers with graded 6K footage, aerial sequences, and custom sound design.",
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
      "Polished brand narrative combining interview footage, facility walkthroughs, and motion graphics with professional voiceover.",
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
    description:
      "Comprehensive highlight reel from a 2,000-seat school auditorium annual day featuring dance performances, award ceremonies, and principal addresses.",
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
  const [activeTab, setActiveTab] = useState<string>("All");
  const [activeLedSize, setActiveLedSize] = useState<number>(0);
  const [selectedVideo, setSelectedVideo] = useState(YOUTUBE_VIDEOS[0]);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Form State
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "LED Screen Rental",
    eventDate: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Section Tracking for Navigation Highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "services",
        "led-screens",
        "projects",
        "showcase",
        "why-us",
        "contact",
      ];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      toast.success("Enquiry received! Our production team will contact you within 2 hours.");
      setFormState({
        name: "",
        email: "",
        phone: "",
        service: "LED Screen Rental",
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
      id: "photography",
      num: "01",
      icon: Camera,
      title: "Professional Photography",
      subtitle: "High-Speed Flash Sync & Editorial Capture",
      image: IMAGES.photography,
      accent: "from-blue-500/20 via-cyan-500/10 to-transparent",
      features: [
        "Multi-photographer synchronized coverage",
        "Stage concerts, executive keynotes & red carpet",
        "Same-night social media high-res delivery",
        "Medium-format & 50MP+ full-frame sensors",
      ],
      gear: "Sony α1 / A7R V • Profoto B10X High-Speed Strobes • G-Master Primes",
    },
    {
      id: "video-recording",
      num: "02",
      icon: Video,
      title: "Professional Video Recording",
      subtitle: "Multi-Camera 4K/6K Cinema Capture",
      image: IMAGES.videography,
      accent: "from-purple-500/20 via-pink-500/10 to-transparent",
      features: [
        "Multi-camera 4K/6K cinema setups for full event coverage",
        "Corporate events, school annual days & live performances",
        "Wedding & celebration cinematography with gimbal rigs",
        "Smooth motorized crane, jib arm & aerial drone sweeps",
      ],
      gear: "Sony FX6 / FX3 Cinema Line • DJI Ronin RS3 Pro • Blackmagic ATEM 4K",
    },
    {
      id: "video-editing",
      num: "03",
      icon: Film,
      title: "Video Editing & Post-Production",
      subtitle: "Cinematic Storytelling & Visual Effects",
      image: IMAGES.videoEditing,
      accent: "from-magenta/20 via-indigo-500/10 to-transparent",
      features: [
        "Cinematic editing, color grading & correction (DaVinci Resolve)",
        "Event highlight films & promotional advertisement videos",
        "Motion graphics, visual effects & title animations",
        "Social media reels, short-form cutdowns & audio design",
      ],
      gear: "DaVinci Resolve Studio • Adobe After Effects • Dolby Atmos Audio Suite",
    },
    {
      id: "led-screens",
      num: "04",
      icon: Tv,
      title: "LED Screen Rental & Installation",
      subtitle: "Indoor & Outdoor High-Refresh Video Walls",
      image: IMAGES.ledScreen,
      accent: "from-cyan-500/20 via-blue-500/10 to-transparent",
      features: [
        "Ultra-fine P2.6 & P3.9 pitch modular panels",
        "3840Hz refresh rate (zero camera scanlines)",
        "Daylight high-brightness (up to 5,000 nits)",
        "Ground-stack or certified flying truss rigging",
      ],
      gear: "Novastar MX40 Pro / VX1000 Processors • Tour-Grade Rigging Hardware",
    },
    {
      id: "event-management",
      num: "05",
      icon: Layers,
      title: "Complete Event Management",
      subtitle: "Turnkey Staging, Intelligent Lighting & Audio",
      image: IMAGES.eventManagement,
      accent: "from-magenta/20 via-purple-500/10 to-transparent",
      features: [
        "Custom stage architecture & structural engineering",
        "Computer-controlled moving head lighting beams",
        "Line-array sound systems with digital consoles",
        "Certified technical crew & showrunning directors",
      ],
      gear: "GrandMA3 Lighting Control • L-Acoustics / JBL VTX Audio • Silent Genset",
    },
  ];

  // -----------------------------------------------------------------------
  // DATA: LED SCREEN SOLUTIONS
  // -----------------------------------------------------------------------
  const ledSolutions = [
    {
      name: "8 × 12 ft LED Screen",
      tagline: "Compact Precision for Corporate Keynotes & Galas",
      dimensions: "2.4m High × 3.6m Wide (28.8 sq.m equivalent area)",
      pitch: "P2.6mm Ultra-Fine Indoor",
      resolution: "1382 × 921 pixels (True HD 16:9 Stage Aspect)",
      bestFor: "Corporate Conferences, Product Launches, Ballrooms, Gala Dinners, VIP Expos",
      viewingDistance: "2 meters to 18 meters",
      brightness: "1,200 nits (Flicker-Free Anti-Glare)",
      setupTime: "90 minutes with certified rigging crew",
      image: IMAGES.led8x12,
      highlights: [
        "Seamless magnetic die-cast aluminum frame",
        "Zero-noise fanless power supply units",
        "Dual power and data signal redundancy",
        "Calibrated for mirrorless and broadcast TV cameras",
      ],
    },
    {
      name: "12 × 16 ft LED Screen",
      tagline: "Concert-Scale Grand Stage Impact",
      dimensions: "3.6m High × 4.8m Wide (57.6 sq.m high-impact surface)",
      pitch: "P2.9mm / P3.9mm High-Luminance",
      resolution: "1840 × 1380 pixels (Ultra-Crisp Stage Backdrop)",
      bestFor: "Music Festivals, Live Concerts, School Annual Days, Award Ceremonies",
      viewingDistance: "4 meters to 45 meters",
      brightness: "4,500+ nits (Crystal visibility under bright daylight)",
      setupTime: "2.5 hours with ground stack or flying truss",
      image: IMAGES.led12x16,
      highlights: [
        "High wind resistance and IP65 weather-sealed option",
        "High refresh rate of 3840Hz preventing camera moiré",
        "Novastar 4K HDR color processing with ultra-low latency",
        "Fly-bar rigging compatible with global stage trusses",
      ],
    },
    {
      name: "Custom-Sized & Curved Displays",
      tagline: "Bespoke Architectural Video Engineering",
      dimensions: "Any Height × Any Length (Modular 500×500mm tiles)",
      pitch: "Custom P1.9mm to P3.9mm Modular",
      resolution: "Up to 8K Panoramic (32:9, 21:9 or 360° wraps)",
      bestFor: "Immersive Arenas, Curved Wings, Pillar Wraps, Stage Ceilings, Brand Booths",
      viewingDistance: "Customizable based on venue floor plan",
      brightness: "Custom tuned from 1,000 to 5,500 nits",
      setupTime: "Tailored to architectural scale and venue access",
      image: IMAGES.ledCustom,
      highlights: [
        "Curved angle flexibility (-10° concave to +10° convex)",
        "Seamless 90° right-angle mitering for clean stage pillars",
        "Multi-layer media server integration (Resolume / Disguise)",
        "Full structural safety certification and load testing",
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
      description:
        "Engineered the complete audiovisual backbone for a 1,200-seat keynote summit, featuring seamless stage transitions and real-time live captions.",
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
      description:
        "Full theatrical production for 3,500 students, faculty, and alumni. Synchronized lighting cues with orchestral performances and live YouTube stream.",
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
      description:
        "High-energy runway and backstage portraiture. Instant Wi-Fi tethering enabled PR teams to publish edited, color-matched photos to press wires in real time.",
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
      description:
        "Official 4K festival aftermovie capturing 15,000 festivalgoers, DJ performances, laser shows, and fireworks. Graded in DaVinci Resolve.",
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
      description:
        "An immense curved LED installation spanning the entire arena stage, wrapping 180 degrees around the newly revealed concept vehicle.",
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
      description:
        "Sophisticated ballroom atmosphere with dual projection-replacement LED screens for auction item showcases and live orchestral accompaniment.",
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

  return (
    <div className="site-shell min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground pb-28 lg:pb-0 overflow-x-clip max-w-full">
      {/* ------------------------------------------------------------------- */}
      {/* DESKTOP & MOBILE TOP NAVIGATION BAR                                */}
      {/* ------------------------------------------------------------------- */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-4">
          <nav className="glass-surface flex items-center justify-between rounded-full px-3.5 sm:px-5 py-2 sm:py-3 border border-border/40 shadow-2xl backdrop-blur-xl">
            {/* Brand Logo */}
            <a href="#home" className="flex items-center gap-2.5 sm:gap-3 group">
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
                <span>Get a Quote</span>
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
        id="home"
        className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 sm:px-6 lg:px-8"
      >
        {/* Cinematic Background Image with Vignette */}
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="/__l5e/assets-v1/e2543fd0-8e35-4f7a-bda2-3e24c33a4e28/event-hero.jpg"
            fallbackSrc={IMAGES.hero}
            alt="Eventora Arena Live Concert and Stage Production"
            className="hero-image h-full w-full object-cover opacity-35"
          />
          <div className="hero-vignette absolute inset-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="hero-topline absolute top-0 left-0 right-0" />
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
            From concert-grade modular LED video walls and multi-cam 4K cinema broadcast to turnkey
            event staging and flawless live management, we engineer landmark events that linger
            forever.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mb-12 sm:mb-16 px-4 sm:px-0">
            <a
              href="#projects"
              className="action-primary w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-3.5 sm:py-4 text-sm font-bold text-primary-foreground shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <span>Explore Our Work</span>
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
          <span>EVENTORA • 2026 PRODUCTION LINE</span>
        </div>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 2. SERVICES SECTION                                                 */}
      {/* ------------------------------------------------------------------- */}
      <section
        id="services"
        className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-border/30"
      >
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
            <div>
              <div className="flex items-center gap-2 text-cyan text-xs font-bold uppercase tracking-widest mb-3">
                <span className="h-1 w-6 bg-cyan rounded-full inline-block" />
                <span>Our Capabilities</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                Specialized Services for <span className="text-spectrum">Flawless Productions</span>
              </h2>
            </div>
            <p className="max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed">
              We own and maintain top-tier broadcast equipment, operating with dedicated crews who
              specialize in each discipline.
            </p>
          </div>

          {/* Four Distinct Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="service-card group relative overflow-hidden rounded-2xl border border-border/50 bg-card/60 backdrop-blur-xl p-5 sm:p-7 md:p-8 flex flex-col justify-between transition-all duration-300 hover:border-cyan/50 hover:shadow-2xl"
                >
                  {/* Subtle Background Accent Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-40 group-hover:opacity-70 transition-opacity pointer-events-none`}
                  />

                  {/* Header Row */}
                  <div className="relative z-10 flex items-start justify-between gap-3 mb-5 sm:mb-6">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-cyan/40 bg-cyan/10 text-cyan group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] sm:text-xs font-bold tracking-widest text-muted-foreground uppercase truncate block">
                          {service.subtitle}
                        </span>
                        <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                    <span className="font-display text-2xl sm:text-3xl font-extrabold text-muted-foreground/30 group-hover:text-cyan/40 transition-colors shrink-0">
                      {service.num}
                    </span>
                  </div>

                  {/* Media Preview Image */}
                  <div className="relative z-10 h-40 sm:h-48 w-full rounded-xl overflow-hidden mb-5 sm:mb-6 border border-border/40">
                    <SafeImage
                      src={service.image}
                      fallbackSrc={IMAGES.hero}
                      alt={service.title}
                      className="service-image h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="image-shade absolute inset-0" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between text-xs text-foreground/90 backdrop-blur-md bg-background/60 px-3 py-1.5 rounded-lg border border-border/30">
                      <span className="font-mono text-[10px] text-muted-foreground uppercase truncate w-full">
                        {service.gear}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="relative z-10 space-y-2 sm:space-y-2.5 mb-6 sm:mb-8">
                    {service.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 text-xs sm:text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="h-4 w-4 text-cyan shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="relative z-10 border-t border-border/40 pt-4 mt-auto">
                    <a
                      href="#contact"
                      onClick={() => setFormState((prev) => ({ ...prev, service: service.title }))}
                      className="service-link inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-cyan hover:text-white transition-all group-hover:translate-x-1"
                    >
                      <span>Inquire About {service.title}</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
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
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-cyan text-xs font-bold uppercase tracking-widest mb-3">
              <Tv className="h-4 w-4" />
              <span>Tour-Grade Hardware</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
              Engineered <span className="text-spectrum">LED Screen Solutions</span>
            </h2>
            <p className="text-muted-foreground text-xs sm:text-base leading-relaxed px-2 sm:px-0">
              Featuring ultra-fine pixel pitch, 3840Hz camera-friendly refresh rates, and daylight
              high brightness. Available in standard configurations and custom architectural
              curvature.
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
                        <span>Moiré & Scanline Immunity Guarantee</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Zap className="h-4 w-4 text-magenta shrink-0" />
                        <span>Novastar 4K Dual Redundant Processing</span>
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
                        {currentSolution.tagline}. Optimized for rapid deployment, perfect color
                        consistency, and zero failure.
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
                            Recommended Event Types
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
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
            <div>
              <div className="flex items-center gap-2 text-cyan text-xs font-bold uppercase tracking-widest mb-3">
                <Briefcase className="h-4 w-4" />
                <span>Selected Works</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                Featured <span className="text-spectrum">Event Productions</span>
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-muted-foreground">
              Filter by category to explore our recent technical deployments for schools, music
              festivals, and corporate summits.
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
                    <span className="text-cyan font-bold shrink-0">View Specs →</span>
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
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-magenta text-xs font-bold uppercase tracking-widest mb-3">
              <Play className="h-4 w-4" />
              <span>4K High Frame-Rate Video</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
              Cinematic <span className="text-spectrum">Video Showcase</span>
            </h2>
            <p className="text-muted-foreground text-xs sm:text-base leading-relaxed px-2 sm:px-0">
              Watch our production reels in full high-definition. Easily customizable video IDs for
              your company showreels.
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
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
            <div>
              <div className="flex items-center gap-2 text-cyan text-xs font-bold uppercase tracking-widest mb-3">
                <Award className="h-4 w-4" />
                <span>The Eventora Standard</span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                Engineered for <span className="text-spectrum">Zero Compromise</span>
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Why high-stakes event producers, Fortune 500 corporations, and premier academic
              institutions partner with us.
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
                  No sub-rentals or 3rd party equipment delays. Every camera, processor, and cable
                  is maintained in-house.
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
                  On-site photo tethering delivers social-ready photos in 120 minutes; 24-hour
                  master event teaser reels.
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
                  Hot-standby switchers, secondary fiber runs, and backup generators guarantee 100%
                  show uptime.
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
                  Experienced technical directors, lighting programmers, and audio engineers with
                  10+ years live mastery.
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
                  Planning an Upcoming High-Stakes Event?
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Our technical directors provide complimentary venue surveys and CAD LED rigging
                  previews.
                </p>
              </div>
            </div>
            <a
              href="#contact"
              className="action-primary shrink-0 w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs sm:text-sm font-bold text-primary-foreground shadow-lg hover:brightness-110 text-center"
            >
              <span>Schedule Tech Consultation</span>
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
        {/* Subtle Backdrop Glows */}
        <div className="absolute top-1/2 left-10 h-96 w-96 rounded-full bg-cyan/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-magenta/10 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Direct Action CTAs & Business Info */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-cyan text-xs font-bold uppercase tracking-widest mb-3">
                  <Send className="h-4 w-4" />
                  <span>Get in Touch</span>
                </div>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4">
                  Let’s Engineer Your <span className="text-spectrum">Next Production</span>
                </h2>
                <p className="text-xs sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                  Have an upcoming event or need custom LED wall sizing? Connect directly with our
                  technical team or submit the enquiry form for an itemized proposal.
                </p>

                {/* Direct Action Quick Contact Links */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {/* WhatsApp CTA */}
                  <a
                    href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=Hi%20Eventora,%20I%20would%20like%20to%20enquire%20about%20event%20production%20services.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link group"
                  >
                    <div className="contact-link-icon flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
                      <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-cyan" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-muted-foreground truncate">
                        Chat on WhatsApp (Fastest Response)
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-cyan transition-colors truncate">
                        {BUSINESS_CONFIG.whatsappDisplay}
                      </span>
                    </div>
                    <ArrowUpRight className="contact-link-arrow ml-auto h-4 w-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* Phone CTA */}
                  <a href={`tel:${BUSINESS_CONFIG.phoneTel}`} className="contact-link group">
                    <div className="contact-link-icon flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-muted-foreground truncate">
                        Direct Phone Hotline
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
                        {BUSINESS_CONFIG.phoneDisplay}
                      </span>
                    </div>
                    <ArrowUpRight className="contact-link-arrow ml-auto h-4 w-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* Email CTA */}
                  <a href={`mailto:${BUSINESS_CONFIG.email}`} className="contact-link group">
                    <div className="contact-link-icon flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg group-hover:scale-110 transition-transform">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-magenta" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-muted-foreground truncate">
                        Email Proposals & RFPs
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
              <div className="pt-4 sm:pt-6 border-t border-border/40 text-xs text-muted-foreground space-y-2 mb-6 lg:mb-0">
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
              <div className="glass-surface rounded-2xl sm:rounded-3xl border border-border/50 bg-card/60 backdrop-blur-2xl p-5 sm:p-8 lg:p-10 shadow-2xl">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-1.5 sm:mb-2">
                  Request a Production Quote
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
                  Fill in your event details below. We review specs and return detailed estimates
                  within 2 hours.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
                        className="w-full min-w-0 rounded-xl border border-border/50 bg-background/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan transition-all"
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
                        className="w-full min-w-0 rounded-xl border border-border/50 bg-background/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
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
                        className="w-full min-w-0 rounded-xl border border-border/50 bg-background/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan transition-all"
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
                        className="w-full min-w-0 rounded-xl border border-border/50 bg-background/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan transition-all"
                      />
                    </div>
                  </div>

                  {/* Primary Service Required */}
                  <div className="min-w-0">
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 sm:mb-2">
                      Primary Service Required
                    </label>
                    <select
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className="w-full min-w-0 rounded-xl border border-border/50 bg-background/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan transition-all"
                    >
                      <option value="LED Screen Rental">
                        LED Screen Rental (8x12ft, 12x16ft, Custom)
                      </option>
                      <option value="Professional Photography">
                        Professional Photography & High-Speed Sync
                      </option>
                      <option value="Videography & Video Editing">
                        Videography, Cinema Rigs & Live Broadcast
                      </option>
                      <option value="Complete Event Management">
                        Complete Turnkey Event Production
                      </option>
                      <option value="All Services Package">Comprehensive All-in-One Package</option>
                    </select>
                  </div>

                  {/* Message & Project Scope */}
                  <div className="min-w-0">
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 sm:mb-2">
                      Event Details & Scope
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about the venue, audience size, stage dimensions, or specific technical requirements..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full min-w-0 rounded-xl border border-border/50 bg-background/50 px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-cyan focus:outline-none focus:ring-1 focus:ring-cyan transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="action-primary w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-primary-foreground shadow-xl transition-all hover:brightness-110 active:scale-98 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting Proposal Request...</span>
                    ) : (
                      <>
                        <span>Submit Production Request</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] sm:text-[11px] text-center text-muted-foreground">
                    Strict privacy guaranteed. We never share client contact details or project
                    scopes.
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
      <footer className="border-t border-border/30 bg-background/95 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan/10 border border-cyan/40 text-cyan">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <span className="font-display font-extrabold tracking-widest text-foreground text-sm">
              {BUSINESS_CONFIG.brandName}
            </span>
            <span className="text-muted-foreground">© 2026. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-semibold uppercase tracking-wider text-[11px]">
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
            href="#home"
            className="footer-top inline-flex items-center gap-1.5 hover:text-cyan transition-colors"
          >
            <span>Back to top</span>
            <ArrowRight className="h-3.5 w-3.5 -rotate-90" />
          </a>
        </div>
      </footer>

      {/* ------------------------------------------------------------------- */}
      {/* FLOATING GLASSMORPHISM LIQUID NOTCH BOTTOM NAVIGATION BAR            */}
      {/* ------------------------------------------------------------------- */}
      <LiquidGlassNavbar
        onChange={(index, item) => {
          if (item.id === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else if (item.id === "likes") {
            const el = document.getElementById("projects");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          } else if (item.id === "add") {
            const el = document.getElementById("contact");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          } else if (item.id === "profile") {
            const el = document.getElementById("why-us");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          } else if (item.id === "alerts") {
            const el = document.getElementById("showcase");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />

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
