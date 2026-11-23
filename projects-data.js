/**
 * Project Data Portfolio Repository
 * Albert S. Villasor - Front-End Developer & UI/UX Designer
 * 5 Featured Projects in Order:
 * 1. SolarWarden
 * 2. Fashion Pulse
 * 3. SafeDrive
 * 4. SoundFlow
 * 5. Exmouth View Hotel (not Seaside)
 */

const projectsData = [
  {
    id: "solarwarden",
    title: "SolarWarden — Smart Solar Track & Panel Health Monitoring",
    category: "ui-ux",
    badge: "Capstone Prototype",
    role: "Lead UI/UX Designer & Prototyper",
    year: "2024 - 2026",
    shortDesc: "A complete IoT & clean-energy mobile app experience designed in Figma featuring 18+ high-fidelity screens, real-time power telemetry, obstruction alerts, and motorized cleaner controls.",
    coverImage: "images/project-solarwarden.jpg",
    figmaLink: "https://www.figma.com/design/qR8RTnQgU09SgX2auEqLV8/PROTOTYPE-capstone-?node-id=0-1&t=Okb7KvRZAGEPW6UT-1",
    demoLink: "https://www.figma.com/proto/qR8RTnQgU09SgX2auEqLV8/PROTOTYPE-capstone-?node-id=0-1&t=Okb7KvRZAGEPW6UT-1&scaling=scale-down",
    tags: ["UI/UX Design", "Figma", "IoT Mobile UI", "Design System", "Prototyping", "Clean Energy"],
    highlights: [
      "18+ High-Fidelity Mobile Screens & Components",
      "Real-time Telemetry: Voltage, Current, Daily Yield & Performance Curves",
      "Automated Obstruction Detection & Robotic Cleaner Trigger",
      "Comprehensive Settings, Diagnostic Logs & Notification Workflows"
    ],
    overview: `SolarWarden is an advanced IoT solar monitoring mobile platform designed to empower residential and commercial solar array operators. Through empathetic user research and iterative wireframing in Figma, the interface bridges hardware telemetry with intuitive mobile UX, delivering instant visibility into energy yield, sensor metrics, and maintenance alerts.`,
    uxProcess: [
      {
        step: "01. Problem Discovery",
        description: "Solar operators suffer from invisible efficiency loss due to bird droppings, dust, and physical debris. Existing industrial dashboards are convoluted and desktop-bound."
      },
      {
        step: "02. Information Architecture",
        description: "Structured a streamlined 4-tier navigation model: Instant Status Dashboard -> Deep Panel Diagnostics -> Automated Cleaner Controls -> Maintenance Logs & Settings."
      },
      {
        step: "03. Visual Design & Ergonomics",
        description: "Crafted a sustainable forest-green & crisp mint color palette (#0F432E, #10B981) symbolizing clean energy, combined with high-contrast accessibility standards and custom micro-widgets."
      },
      {
        step: "04. Interactive Prototyping",
        description: "Built dynamic component states in Figma, including interactive toggles, animated power curves, modal alerts, and seamless multi-device onboarding."
      }
    ],
    keyFeatures: [
      {
        icon: "activity",
        title: "Live Sensor Telemetry",
        desc: "Instant readout of panel voltage, wattage, temperature, and historical yield graph comparison."
      },
      {
        icon: "shield-alert",
        title: "Obstruction Detection",
        desc: "Vision and sensor-based detection that alerts users immediately when panel surface efficiency drops."
      },
      {
        icon: "cpu",
        title: "Motorized Cleaner Control",
        desc: "One-tap remote cleaner activation, schedule configuration, and cleaning cycle timer."
      },
      {
        icon: "bell",
        title: "Smart Notification System",
        desc: "Categorized critical alerts, scheduled maintenance reminders, and power surge advisories."
      }
    ],
    techStack: [
      { name: "Figma", type: "Design & Prototyping" },
      { name: "Design System", type: "Atomic UI Components" },
      { name: "Mobile UI/UX", type: "iOS & Android Human Guidelines" },
      { name: "IoT UX Architecture", type: "Hardware-to-Software Bridge" }
    ],
    gallery: [
      "images/project-solarwarden.jpg",
      "images/solarwarden-figma.png"
    ]
  },
  {
    id: "fashionpulse",
    title: "Fashion Pulse — Dynamic Trend Discovery & Editorial Platform",
    category: "web",
    badge: "Full-Stack Web Application",
    role: "Front-End Developer & UI Designer",
    year: "2024 - 2026",
    shortDesc: "A responsive fashion magazine and trend discovery platform built with Django, featuring visual Style Lens, curated galleries, user trend submissions, and modern responsive layouts.",
    coverImage: "images/project-fashionpulse.jpg",
    githubLink: "https://github.com/AlbertVills",
    tags: ["HTML5 / CSS3", "JavaScript", "Python & Django", "Responsive Web Design", "UI Design", "SQLite"],
    highlights: [
      "Curated Style Lens visual discovery feed",
      "Dynamic Trend Articles & Editorial Insights",
      "Community Gallery with user submission & review flow",
      "Responsive layout optimized for mobile, tablet, and desktop"
    ],
    overview: `Fashion Pulse is an interactive web experience celebrating high-fashion and street culture. Developed using Django and modern front-end technologies, the application balances rich visual editorial storytelling with responsive performance, interactive mood boards, and clean layout geometry.`,
    uxProcess: [
      {
        step: "01. Editorial Visual Direction",
        description: "Designed a clean, minimalist aesthetic inspired by high-end editorial magazines, utilizing high-contrast typography, ample whitespace, and sleek image containers."
      },
      {
        step: "02. Responsive Architecture",
        description: "Engineered responsive CSS grid and flexbox layouts that dynamically reorganize fashion cards, editorial banners, and navigation menus across all screen dimensions."
      },
      {
        step: "03. Dynamic Content Rendering",
        description: "Integrated Django template system with JavaScript micro-interactions for live filtering of fashion trends, user galleries, and article bookmarking."
      }
    ],
    keyFeatures: [
      {
        icon: "compass",
        title: "Style Lens Discovery",
        desc: "Visual exploration tool allowing visitors to explore aesthetic movements, color rhythms, and seasonal trends."
      },
      {
        icon: "book-open",
        title: "Trend Articles & Insights",
        desc: "Rich editorial article pages with typography hierarchy, author spotlights, and related style recommendations."
      },
      {
        icon: "image",
        title: "Interactive User Gallery",
        desc: "Masonry-style photo showcase supporting community styling submissions and mood inspiration."
      },
      {
        icon: "user-check",
        title: "Admin & Editorial Portal",
        desc: "Intuitive dashboard for content curation, article publication, and image asset management."
      }
    ],
    techStack: [
      { name: "Python / Django", type: "Backend & Templating" },
      { name: "HTML5 & CSS3", type: "Semantic Structure & Styling" },
      { name: "Vanilla JavaScript", type: "Dynamic DOM & Filtering" },
      { name: "SQLite", type: "Relational Database" }
    ],
    gallery: [
      "images/project-fashionpulse.jpg",
      "images/fashionpulse/style1.png",
      "images/fashionpulse/resort.jpg",
      "images/fashionpulse/autumn.jpg",
      "images/fashionpulse/spring-summer.png"
    ]
  },
  {
    id: "safedrive",
    title: "SafeDrive — Real-Time Driver Companion & Emergency Navigation",
    category: "mobile",
    badge: "Cross-Platform Mobile App",
    role: "Mobile Front-End Developer (Flutter)",
    year: "2025",
    shortDesc: "A Flutter mobile companion featuring interactive OpenStreetMap navigation, real-time geolocator tracking, emergency SOS contact dispatch, speed alerts, and modern onboarding.",
    coverImage: "images/project-safedrive.jpg",
    githubLink: "https://github.com/AlbertVills",
    tags: ["Flutter", "Dart", "flutter_map", "Geolocator", "Local Notifications", "Mobile UI"],
    highlights: [
      "Interactive map integration with OpenStreetMap & LatLong2",
      "Real-time GPS tracking and live speed monitoring",
      "Emergency SOS dispatch with automated contact notifications",
      "Smooth tutorial onboarding and PIN/OTP verification flow"
    ],
    overview: `SafeDrive is built to combat distracted and hazardous driving by providing a seamless, driver-focused navigation interface. Built in Flutter for Android and iOS, it prioritizes large touch targets, high-visibility contrast for daylight/night driving, and instant single-tap emergency SOS broadcasting.`,
    uxProcess: [
      {
        step: "01. Driver Ergonomics Research",
        description: "Studied in-car cockpit accessibility constraints to eliminate cluttered buttons, optimizing for one-hand thumb interaction and high-contrast night readability."
      },
      {
        step: "02. Map & Geolocation Integration",
        description: "Leveraged flutter_map and Geolocator to deliver silky 60fps route rendering with smooth location marker interpolation."
      },
      {
        step: "03. Safety-First Workflows",
        description: "Engineered emergency contact management with quick SOS triggers that notify pre-saved emergency contacts with current coordinates."
      }
    ],
    keyFeatures: [
      {
        icon: "navigation",
        title: "Live GPS Navigation",
        desc: "Turn-by-turn routing with dynamic recalculation, destination search, and ETA projections."
      },
      {
        icon: "alert-triangle",
        title: "Emergency SOS Broadcast",
        desc: "Instant panic alert system transmitting live coordinates to trusted emergency contacts."
      },
      {
        icon: "users",
        title: "Emergency Contacts Hub",
        desc: "Quick-access contacts book with relation badges, instant dial, and SMS broadcast."
      },
      {
        icon: "key",
        title: "OTP Secure Verification",
        desc: "Frictionless authentication flow using pin-put widgets and phone number validation."
      }
    ],
    techStack: [
      { name: "Flutter", type: "Cross-Platform UI Framework" },
      { name: "Dart", type: "Programming Language" },
      { name: "flutter_map & LatLong2", type: "Map Rendering Engine" },
      { name: "Geolocator", type: "Device GPS Telemetry" }
    ],
    gallery: [
      "images/project-safedrive.jpg",
      "images/safedrive/car.png",
      "images/safedrive/background.jpg"
    ]
  },
  {
    id: "soundflow",
    title: "SoundFlow — Minimalist Glassmorphic Mobile Music Player",
    category: "mobile",
    badge: "Flutter Audio Experience",
    role: "Mobile UI & Flutter Developer",
    year: "2025",
    shortDesc: "A sleek, immersive mobile audio streaming & local playback player featuring dynamic album artwork, synchronized playback controls, lyric cards, and glassmorphism visual styling.",
    coverImage: "images/project-soundflow.png",
    githubLink: "https://github.com/AlbertVills",
    tags: ["Flutter", "Dart", "AudioPlayers", "Google Fonts", "Glassmorphism UI", "Mobile App"],
    highlights: [
      "Custom audio playback controller (Play/Pause, Scrubbing, Shuffle, Repeat)",
      "Vibrant frosted-glass blur cards and dynamic background gradients",
      "Curated playlist with rich album art metadata",
      "Responsive layout across various Android and iOS screen aspect ratios"
    ],
    overview: `SoundFlow was engineered as a study in modern mobile micro-interactions and audio UI ergonomics. Built in Flutter using the audioplayers package, it treats every song as a visual art piece, using subtle color extraction and backdrop blurs to create an emotional, tactile music listening experience.`,
    uxProcess: [
      {
        step: "01. Tactile Audio UI",
        description: "Created intuitive music scrubbing bars, waveform representations, and responsive tactile button states."
      },
      {
        step: "02. Visual Hierarchy & Typography",
        description: "Paired expressive Google Fonts with clean album cover grids to give users immediate emotional connection to their tracks."
      },
      {
        step: "03. Performance Optimization",
        description: "Optimized audio buffer management and state reactivity to ensure glitch-free audio playback even during background app switching."
      }
    ],
    keyFeatures: [
      {
        icon: "play-circle",
        title: "High-Fidelity Audio Controls",
        desc: "Smooth seek bar, volume control, track skipping, and playback state listeners."
      },
      {
        icon: "disc",
        title: "Dynamic Album Visualizer",
        desc: "Art-driven backgrounds that adapt their ambient glow to match the active song's artwork."
      },
      {
        icon: "list-music",
        title: "Curated Playlist Management",
        desc: "Fast playlist browsing with track durations, artist credits, and instant search."
      }
    ],
    techStack: [
      { name: "Flutter", type: "Mobile UI Engine" },
      { name: "Dart", type: "Programming Language" },
      { name: "AudioPlayers", type: "Audio Stream & Decoder" },
      { name: "Google Fonts", type: "Modern Typography" }
    ],
    gallery: [
      "images/project-soundflow.png",
      "images/soundflow/diewithasmile.jpg",
      "images/soundflow/glimpseofus.jpg",
      "images/soundflow/allornothing.jpg"
    ]
  },
  {
    id: "exmouth-hotel",
    title: "Exmouth View Hotel — Luxury Coastal Resort & Web Experience",
    category: "ui-ux",
    badge: "Figma Web Design Concept",
    role: "UI/UX Designer",
    year: "2024 - 2025",
    shortDesc: "A luxury coastal hospitality web interface designed in Figma for Exmouth View Hotel, featuring interactive dining menus, sports attractions, local excursions, and elegant suite booking workflows.",
    coverImage: "images/project-exmouth.jpg",
    figmaLink: "https://www.figma.com/design/cklyNi3mkIxAfuTIZj1qvF/Untitled?node-id=0-1&t=Okb7KvRZAGEPW6UT-1",
    demoLink: "https://www.figma.com/design/cklyNi3mkIxAfuTIZj1qvF/Untitled?node-id=0-1&t=Okb7KvRZAGEPW6UT-1",
    tags: ["UI/UX Design", "Figma", "Hospitality Web UI", "Design System", "Interactive Prototype"],
    highlights: [
      "Multi-page luxury web prototype: Home, About Us, Local Attractions, Sports Attractions, Daily Menus",
      "Dark luxury coastal aesthetic with sunset twilight ambiance and gold lighting",
      "Interactive category tabbed menus for culinary offerings and outdoor activities",
      "Responsive desktop and mobile layout with high-converting reservation calls-to-action"
    ],
    overview: `A complete UI/UX web layout and digital guest experience designed in Figma for Exmouth View Hotel, an upscale coastal retreat. The design balances sophisticated twilight aesthetics with high-resolution imagery, seamless dining reservation flows, and local tourist attraction discovery guides.`,
    uxProcess: [
      {
        step: "01. Brand & Coastal Ambience",
        description: "Developed a refined visual identity tailored for Exmouth View Hotel, pairing sunset coastal imagery with deep twilight blue-charcoal backdrops and warm ambient highlights."
      },
      {
        step: "02. Guest Navigation Architecture",
        description: "Created an intuitive 5-section guest journey: Home -> About Us -> Local Attraction Explorer -> Sport Attraction Reservations -> Daily Culinary Menus."
      },
      {
        step: "03. Interactive Menu & Booking System",
        description: "Prototyped tabbed culinary menus for resort guests and streamlined booking workflows for hotel suites and sports facilities."
      }
    ],
    keyFeatures: [
      {
        icon: "utensils",
        title: "Daily Culinary Showcase",
        desc: "Interactive multi-course dining menus with dish descriptions and beverage pairings."
      },
      {
        icon: "compass",
        title: "Local Attraction Guide",
        desc: "Curated regional seaside guides, marine adventures, and excursion bookings."
      },
      {
        icon: "activity",
        title: "Sports & Club Facilities",
        desc: "Court reservations, water sports booking, and resort club activities."
      },
      {
        icon: "calendar",
        title: "Luxury Suite Reservation",
        desc: "Frictionless guest check-in inquiry and reservation booking."
      }
    ],
    techStack: [
      { name: "Figma", type: "Visual Design & Prototyping" },
      { name: "Design System", type: "Atomic UI Components & Tokens" },
      { name: "Information Architecture", type: "Hospitality Guest UX" }
    ],
    gallery: [
      "images/project-exmouth.jpg",
      "images/hotel-figma.png"
    ]
  },
  {
    id: "tag-or-die",
    title: "Tag or Die — 3D Multiplayer Roblox Action & Obby Experience",
    category: "game",
    badge: "Roblox Experience",
    role: "Game Developer & 3D Level Designer",
    year: "2025 - 2026",
    shortDesc: "A fast-paced 3D multiplayer survival tag experience built on Roblox, featuring dynamic obstacle courses (obby), interactive tag mechanics, custom physics, and competitive gameplay.",
    coverImage: "images/project-tagordie.jpg",
    robloxLink: "https://www.roblox.com/share?code=b36f7ea024028b41b2ad2b51eee95308&type=ExperienceDetails&stamp=1795192573049",
    demoLink: "https://www.roblox.com/share?code=b36f7ea024028b41b2ad2b51eee95308&type=ExperienceDetails&stamp=1795192573049",
    tags: ["Roblox Studio", "Lua / Luau", "3D Level Design", "Game Mechanics", "Multiplayer", "Physics"],
    highlights: [
      "Custom fast-paced survival tag mechanics with dynamic chaser vs runner roles",
      "Dynamic obstacle courses with moving platforms, climbing walls, and speed pads",
      "Multiplayer session management, round timers, and automated intermission cycles",
      "Vibrant low-poly 3D environmental level design and optimized collision geometry"
    ],
    overview: `Tag or Die is an adrenaline-fueled 3D multiplayer survival experience developed in Roblox Studio using Luau scripting. Players navigate colorful, modular obstacle courses while evading designated chasers in timed rounds. The project showcases real-time multiplayer network replication, physics tuning, player collision detection, and engaging level architecture designed for player retention.`,
    uxProcess: [
      {
        step: "01. Core Loop Design",
        description: "Formulated the core gameplay loop: Waiting Lobby -> Map Selection -> Role Assignment (Tag Chasers vs Runners) -> Timed Survival Run -> Leaderboard & Rewards."
      },
      {
        step: "02. 3D Obstacle Course Architecture",
        description: "Engineered responsive platforming geometry with varying verticality, balance beams, climbing walls, and speed boosts to reward skill-based movement."
      },
      {
        step: "03. Luau Scripting & Multiplayer Replication",
        description: "Wrote optimized client-server scripts in Luau to handle hitbox collisions, tag state synchronization, round countdowns, and automated intermission cycles with zero latency."
      }
    ],
    keyFeatures: [
      {
        icon: "gamepad-2",
        title: "Dynamic Tag Mechanics",
        desc: "Instant tag propagation, role swapping, and proximity alerts between runners and chasers."
      },
      {
        icon: "layers",
        title: "Modular Obby Courses",
        desc: "Handcrafted 3D courses with parkour checkpoints, jump pads, and finish line gates."
      },
      {
        icon: "users",
        title: "Multiplayer Lobby & Matchmaking",
        desc: "Real-time session lobbies supporting seamless multiplayer matchmaking."
      },
      {
        icon: "trophy",
        title: "Round Rewards & Stats",
        desc: "Persistent coin accumulation, victory win streaks, and cosmetic player trails."
      }
    ],
    techStack: [
      { name: "Roblox Studio", type: "3D Game Engine & World Builder" },
      { name: "Luau (Lua)", type: "Client-Server Gameplay Scripting" },
      { name: "3D Modeling", type: "Low-Poly Collision Geometry" },
      { name: "Network Replication", type: "State Synchronization" }
    ],
    gallery: [
      "images/project-tagordie.jpg"
    ]
  }
];

// Helper export
if (typeof window !== "undefined") {
  window.projectsData = projectsData;
}
