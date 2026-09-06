export const BRAND = {
  name: "IEC-SOA",
  fullName: "Innovation & Entrepreneurship Cell",
  institution: "ITER · Siksha 'O' Anusandhan",
  tagline: "Where ideas find direction.",
  registrationUrl: "https://registration.ecellsoa.com", // PocketBase connected registration portal
  logo: "/logo.png"
};

export const DOMINO_SECTIONS = [
  {
    index: 0,
    number: "01",
    id: "who-we-are",
    title: "WHO WE ARE",
    tag: "IEC-SOA",
    tagline: "Built by students, for students.",
    subtagline: "Think beyond the classroom.",
    keywords: ["THINK", "CREATE", "BUILD"],
    robotDialogues: [
      "Welcome to IEC-SOA! We are a student-powered launchpad for builders, thinkers, and creators who dare to think beyond the classroom. We connect you with top mentors and resources so your ideas become real ventures."
    ],
    robotState: "pointing",
    theme: "identity",
    color: "#00f0ff",
    colorSecondary: "#52f6ff",
    glowColor: "rgba(0, 240, 255, 0.7)",
    note: "D4",
    freq: 293.66
  },
  {
    index: 1,
    number: "02",
    id: "what-we-do",
    title: "WHAT WE DO",
    tagline: "Three connected pillars of growth.",
    pillars: [
      {
        id: "events",
        title: "EVENTS",
        description: "Create opportunities to participate, experiment and compete.",
        tag: "COMPETE"
      },
      {
        id: "mentorship",
        title: "MENTORSHIP",
        description: "Learn from industry experts, alumni and startup founders.",
        tag: "GUIDANCE"
      },
      {
        id: "exposure",
        title: "EXPOSURE",
        description: "Discover internships, live projects and valuable collaborations.",
        tag: "OPPORTUNITY"
      }
    ],
    robotDialogues: [
      "Three connected pillars fuel our ecosystem: high-stakes Events to compete, direct Mentorship from industry pioneers, and corporate Exposure to launch real-world products."
    ],
    robotState: "thinking",
    theme: "pillars",
    color: "#00ff88",
    colorSecondary: "#61ffb1",
    glowColor: "rgba(0, 255, 136, 0.7)",
    note: "E4",
    freq: 329.63
  },
  {
    index: 2,
    number: "03",
    id: "events",
    title: "WHERE IDEAS COME ALIVE",
    subtitle: "EVENTS",
    tagline: "Learn. Compete. Connect. Create.",
    events: [
      {
        id: "esummit",
        name: "E-SUMMIT",
        tagline: "Flagship Innovation Conclave",
        description: "Eastern India's grandest annual entrepreneurship summit uniting student visionaries, venture capital funds, top angel investors, and industry icons for intense 36-hour buildathons, startup expos, and live funding pitches.",
        tags: ["STARTUP EXPO", "BUILDATHON", "VC PITCHING", "GLOBAL PANELS", "FIRESIDE CHATS"],
        robotDialogue: "E-Summit is our flagship annual innovation festival! It unites top venture capitalists, angel investors, founders, and students for intense buildathons, startup expos, live funding pitches, and leadership panels."
      },
      {
        id: "exnova",
        name: "EXNOVA",
        tagline: "Where Creativity Meets Corporate Strategy",
        description: "IEC-SOA's premier creative business & management challenge. Teams dive into real-world corporate case studies, conduct live market research, engineer brand identities, and pitch disruptive product strategies directly to industry juries.",
        tags: ["CASE STUDY CHALLENGE", "MARKET RESEARCH", "DESIGN THINKING", "BRAND BLUEPRINT", "PITCH BATTLE"],
        robotDialogue: "EXNOVA is our premier creative business challenge! Teams dive into real-world corporate case studies, analyze market dynamics, formulate breakthrough brand strategies, and pitch bold solutions directly to industry judges."
      },
      {
        id: "foundation",
        name: "FOUNDATION SERIES",
        tagline: "0-to-1 Startup Masterclasses",
        description: "Comprehensive entrepreneurial bootcamps and masterclasses taking you from zero to one. Master idea validation, customer discovery, minimum viable product (MVP) development, financial modeling, marketing psychology, and investor pitch deck crafting.",
        tags: ["IDEA VALIDATION", "MVP BUILDING", "FINANCIAL MODELING", "PITCH DECKS", "FOUNDER MENTORSHIP"],
        robotDialogue: "The Foundation Series is our ground-up startup masterclass! We bring in successful founders, mentors, and alumni to teach you idea validation, minimum viable products, branding, financial modeling, and winning investor pitch decks."
      }
    ],
    robotDialogues: [
      "Flagship conclaves, 36-hour hackathons, and founder masterclasses — this is where raw passion turns into scalable prototypes."
    ],
    convergenceTitle: "EXPERIENCE",
    convergenceDialogue: "And these are just some of the experiences waiting for you.",
    robotState: "excited",
    theme: "events",
    color: "#ffb800",
    colorSecondary: "#ffd566",
    glowColor: "rgba(255, 184, 0, 0.75)",
    note: "G4",
    freq: 392.00
  },
  {
    index: 3,
    number: "04",
    id: "teams",
    title: "FIND YOUR PLACE.",
    subtitle: "ONE E-CELL. SIX PATHS.",
    tagline: "Choose where you want to make your mark.",
    teams: [
      {
        id: "technical",
        name: "TECHNICAL",
        headline: "Build your skills.",
        benefits: ["Real Projects", "Problem Solving", "Technical Growth", "Portfolio"]
      },
      {
        id: "media",
        name: "MEDIA",
        headline: "Make moments matter.",
        benefits: ["Creative Skills", "Photography", "Videography", "Portfolio", "Exposure"]
      },
      {
        id: "event",
        name: "EVENT MANAGEMENT",
        headline: "Create experiences.",
        benefits: ["Leadership", "Planning", "Teamwork", "Execution", "Networking"]
      },
      {
        id: "pr",
        name: "PUBLIC RELATIONS",
        headline: "Build connections.",
        benefits: ["Networking", "Communication", "Confidence", "Industry Exposure"]
      },
      {
        id: "content",
        name: "CONTENT",
        headline: "Give ideas a voice.",
        benefits: ["Writing", "Storytelling", "Research", "Communication"]
      },
      {
        id: "design",
        name: "DESIGN",
        headline: "Make ideas visible.",
        benefits: ["Design Skills", "Creative Thinking", "Portfolio", "Visual Communication"]
      }
    ],
    robotDialogues: [
      "Six specialized wings drive our community: Tech, Media, Events, PR, Content, and Design. Pick your domain and build serious portfolio projects!"
    ],
    robotState: "pointing",
    theme: "teams",
    color: "#ff007f",
    colorSecondary: "#ff52a5",
    glowColor: "rgba(255, 0, 127, 0.75)",
    note: "A4",
    freq: 440.00
  },
  {
    index: 4,
    number: "05",
    id: "founders",
    title: "FROM IDEA TO IMPACT",
    subtitle: "MEET THE BUILDERS",
    founders: [
      {
        id: "biraja",
        name: "BIRAJA PRASAD ROUT",
        role: "Founder, Biggies Burger",
        category: "ALUMNI FOUNDER",
        initials: "BR",
        highlight: "Pioneering QSR brand originating from Odisha",
        fullDescription: "Pioneering entrepreneur behind Biggies Burger, scaling an indigenous QSR brand from Odisha to nationwide success with over 130 stores.",
        dialogue: "Biraja Prasad Rout built Biggies Burger from Odisha into a nationwide brand with over 130 stores! Proof of the power of consistent execution."
      },
      {
        id: "abhishek",
        name: "DR. ABHISHEK GAUTAM",
        role: "Founder, Ambula",
        category: "HEALTH-TECH",
        initials: "AG",
        highlight: "Revolutionizing healthcare access through technology",
        fullDescription: "Doctor and entrepreneur revolutionizing UHI and emergency medical access across India through digital health infrastructure.",
        dialogue: "Dr. Abhishek Gautam founded Ambula, harnessing digital health infrastructure to bring rapid medical care to patients in need."
      },
      {
        id: "bibhu",
        name: "BIBHU BAHALIA",
        role: "Co-Founder, Assava",
        category: "CLEANTECH",
        initials: "BB",
        highlight: "Sustainable materials and circular economy innovations",
        fullDescription: "Co-founder at Assava, developing circular, plant-based materials to replace plastics and synthetic textiles.",
        dialogue: "Bibhu Bahalia co-founded Assava, leading deep-tech innovations in sustainable plant-based materials for a circular green economy."
      },
      {
        id: "driev",
        name: "driEV",
        role: "AI-Driven EV Micro-Mobility",
        category: "SUPPORTED STARTUP",
        initials: "EV",
        highlight: "Flexible and eco-friendly EV micro-mobility solutions based in Bhubaneswar.",
        fullDescription: "driEV is an AI-driven electric bike and scooter rental platform based in Bhubaneswar, focused on providing flexible and eco-friendly micro-mobility solutions. Through its startup outreach and promotion initiatives, Innovation & Entrepreneurship Cell (IEC) supported driEV by providing visibility and connecting the venture with the student and entrepreneurial ecosystem, helping showcase its innovative approach to sustainable urban mobility.",
        dialogue: "driEV is an AI-driven electric bike and scooter rental platform based in Bhubaneswar! Through startup outreach and promotion, IEC supported driEV by providing visibility and connecting the venture with our student and entrepreneurial ecosystem."
      },
      {
        id: "influcraft",
        name: "InfluCraft",
        role: "AI Creator-Tech & SaaS Platform",
        category: "SUPPORTED STARTUP",
        initials: "IC",
        highlight: "AI-driven infrastructure and SaaS solutions empowering the creator economy.",
        fullDescription: "InfluCraft is a Bhubaneswar-based creator-tech startup developing AI-driven infrastructure and SaaS solutions for the creator economy. Its platform helps brands, agencies, and creators streamline campaigns, collaborations, workflows, analytics, and payments. IEC played a role in promoting and showcasing InfluCraft, bringing greater awareness of the startup and its technology-driven approach among students and the university's entrepreneurial ecosystem.",
        dialogue: "InfluCraft is a creator-tech startup building AI-driven SaaS solutions for the creator economy! IEC helped promote and showcase InfluCraft, bringing greater awareness of its tech-driven platform across the student ecosystem."
      }
    ],
    journeySteps: ["IDEA", "ACTION", "IMPACT"],
    robotDialogues: [
      "Our alumni proof-of-concept: founders who started right where you are and scaled nationwide — from Biggies Burger (130+ stores) to AI-mobility pioneer driEV!"
    ],
    robotState: "thinking",
    theme: "founders",
    color: "#2979ff",
    colorSecondary: "#75a7ff",
    glowColor: "rgba(41, 121, 255, 0.75)",
    note: "C5",
    freq: 523.25
  },
  {
    index: 5,
    number: "06",
    id: "your-move",
    title: "YOUR MOVE.",
    subtitle: "One small decision can start something much bigger.",
    cta: "JOIN E-CELL",
    philosophy: [
      "IDEA", "DIRECTION", "ACTION", "EXPERIENCE", "PEOPLE", "OPPORTUNITY", "IMPACT"
    ],
    robotDialogues: [
      "Every major venture begins with a single domino. Your move starts now — click 'JOIN E-CELL' and take your first step with us!"
    ],
    robotState: "celebrating",
    theme: "climax",
    color: "#ffd700",
    colorSecondary: "#ffffff",
    glowColor: "rgba(255, 215, 0, 0.85)",
    note: "E5",
    freq: 659.25
  }
];
