export const BRAND = {
  name: "IEC-SOA",
  fullName: "Innovation & Entrepreneurship Cell",
  institution: "ITER · Siksha 'O' Anusandhan",
  tagline: "Where ideas find direction.",
  registrationUrl: "https://startup-brawl.vercel.app/", // Startup Brawl portal
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
      "IEC-SOA is built by students, for students who want to think beyond the classroom. We bring together innovators, mentors, and creators so your ideas never stay just ideas."
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
        id: "resonance25",
        name: "Resonance-25",
        tagline: "Powered by IEC-SOA",
        description: "Eastern India's grandest inter-college celebration uniting student visionaries, high-energy musical showcases, startup expos, and live funding pitches.",
        tags: ["FLAGSHIP FEST", "STARTUP EXPO", "LIVE PITCHING", "GLOBAL PANELS", "STUDENT SUMMIT"],
        robotDialogue: "Resonance-25 is our flagship mega celebration! It brings together thousands of students, music, live startup pitches, and industry leaders under one electric roof."
      },
      {
        id: "oblive",
        name: "Oblive",
        tagline: "Soaked in Memories, Sealed in Time",
        description: "Signature annual conclave and founder social bringing together alumni leaders, innovators, and creators to celebrate groundbreaking milestones.",
        tags: ["ANNUAL GALA", "FOUNDER SOCIAL", "NETWORKING", "CREATIVE LEADERS", "CELEBRATION"],
        robotDialogue: "Oblive is our signature annual gathering! Soaked in memories and sealed in time, it brings together founders, alumni leaders, and creators to celebrate entrepreneurial wins."
      },
      {
        id: "exanova",
        name: "Exanova",
        tagline: "Where Creativity Meets Corporate Strategy",
        description: "IEC-SOA's premier creative business & management challenge. Teams dive into real-world corporate case studies, marketing wizardry, and design thinking pitch battles.",
        tags: ["CASE STUDY CHALLENGE", "MARKETING WIZARDS", "DESIGN THINKING", "BRAND BLUEPRINT", "PITCH BATTLE"],
        robotDialogue: "Exanova is our premier creative business challenge! Teams tackle real-world corporate case studies, showcase marketing wizardry, and pitch bold solutions directly to industry judges."
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
    title: "Find Your Place.",
    subtitle: "Seven Wings. Infinite Possibilities.",
    tagline: "Swipe through our teams to discover where you can make your mark.",
    teams: [
      {
        id: "technical",
        name: "TECHNICAL",
        aliasTitle: "The Builders",
        subTag: "WING 01 // SYSTEM ARCHITECTURE & CODE",
        headline: "We engineer the digital nervous system of the startup ecosystem.",
        description: "Where abstract algorithms translate into real human impact. From architecting high-concurrency hackathon portals and university-wide digital engines to deploying live production software, you build the resilient foundation that powers tomorrow's founders.",
        impact: "Production Deployments · Scalable Architectures · Real Products",
        image: "/pr.png"
      },
      {
        id: "media",
        name: "MEDIA",
        aliasTitle: "The Storytellers",
        subTag: "WING 02 // CINEMATOGRAPHY & VISUAL ARTS",
        headline: "Immortalizing the turning points where raw ambition becomes history.",
        description: "You command the lens that captures lightning in motion. Through high-contrast cinema, editorial photography, and documentary perspectives, your craft forges the visual identity and cultural mythology of Eastern India’s premier innovation movement.",
        impact: "1,000,000+ Digital Reach · 4K Cinema Production · Cultural Legacy",
        image: "/DSC07299.JPG"
      },
      {
        id: "social_media",
        name: "SOCIAL MEDIA",
        aliasTitle: "The Amplifiers",
        subTag: "WING 03 // VIRAL GROWTH & DIGITAL PRESENCE",
        headline: "Amplifying the ecosystem's voice to millions across the digital frontier.",
        description: "You ignite conversations that set the internet on fire. From high-impact digital campaigns and viral trendjacking to multi-platform community building, you ensure our founders and events command the global spotlight.",
        impact: "Viral Reach · Cross-Platform Growth · Culture & Community",
        image: "/events-crowd.jpg"
      },
      {
        id: "event",
        name: "EVENT MANAGEMENT",
        aliasTitle: "The Orchestrators",
        subTag: "WING 04 // OPERATIONS & HIGH-STAKES PRODUCTION",
        headline: "Where meticulous precision commands raw chaos into unforgettable spectacle.",
        description: "You command the ground where vision takes physical form. Directing Eastern India's largest flagship conclaves, 36-hour buildathons, and angel investor pitch arenas with unmatched execution standards and calm mastery under pressure.",
        impact: "5,000+ Student Delegates · Live Conclave Arenas · Flawless Execution",
        image: "/events-crowd.jpg"
      },
      {
        id: "pr",
        name: "PUBLIC RELATIONS",
        aliasTitle: "The Connectors",
        subTag: "WING 05 // STRATEGIC ALLIANCES & CAPITAL",
        headline: "Bridging student dorm rooms with boardroom capital and industry titans.",
        description: "You are the diplomats, negotiators, and catalysts. Forging strategic partnerships with venture capital funds, corporate sponsors, and national founders to build the high-speed pipeline that turns student visionaries into funded market leaders.",
        impact: "Venture Capital Bridges · 100+ Enterprise Alliances · National Network",
        image: "/event-talk.jpg"
      },
      {
        id: "content",
        name: "CONTENT",
        aliasTitle: "The Voices",
        subTag: "WING 06 // EDITORIAL NARRATIVE & MANIFESTOS",
        headline: "Words engineered to spark revolutions in how generations think.",
        description: "You define the intellectual pulse of the ecosystem. Crafting provocative manifestos, deep-dive founder research, and narrative campaigns that cut through the noise and transform passive observers into relentless builders.",
        impact: "Thought Leadership · Viral Manifestos · The Voice of Student Founders",
        image: "/IMG_7878.jpg"
      },
      {
        id: "design",
        name: "DESIGN",
        aliasTitle: "The Visionaries",
        subTag: "WING 07 // BRAND IDENTITY & DIGITAL EXPERIENCE",
        headline: "Making the invisible tangible, captivating, and impossible to ignore.",
        description: "You command human attention through form, motion, and typography. Sculpting zero-to-one brand systems, frictionless UI/UX architectures, and aesthetic identities that give every fledgling venture an unmistakable aura of authority.",
        impact: "Zero-to-One Brand Systems · Immersive UI/UX · Aesthetic Authority",
        image: "/EDITED-9567.JPG"
      }
    ],
    robotDialogues: [
      "Seven specialized wings drive our community: Tech, Media, Social Media, Events, PR, Content, and Design. Pick your domain and build serious portfolio projects!"
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
    title: "STARTUPS FROM IEC",
    subtitle: "VENTURES & SPEAKERS",
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
      },
      {
        id: "twentyfour",
        name: "24X7",
        role: "Pre-Incubated in IEC · Campus Logistics",
        category: "PRE-INCUBATED STARTUP",
        initials: "24",
        highlight: "24/7 on-demand campus delivery and logistics pre-incubated at IEC-SOA.",
        fullDescription: "24x7 is an active student venture pre-incubated within the Innovation & Entrepreneurship Cell (IEC) at SOA University. Built to provide round-the-clock convenience across campus hostels, 24x7 delivers late-night food, stationery, medicine, and student supplies with streamlined on-demand ordering.",
        dialogue: "24x7 is pre-incubated in IEC-SOA, providing 24/7 round-the-clock on-campus logistics and delivery for students!"
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
    title: "THANK YOU!",
    subtitle: "Every great movement begins with a single spark. Your journey starts now.",
    cta: "JOIN E-CELL",
    philosophy: [
      "IDEA", "DIRECTION", "ACTION", "EXPERIENCE", "PEOPLE", "OPPORTUNITY", "IMPACT"
    ],
    robotDialogues: [
      "Thank you for being part of this experience! Every major venture begins with a single domino. Your move starts now — click 'JOIN E-CELL' and take your first step with us!"
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
