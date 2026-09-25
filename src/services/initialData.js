// Jayamahesh Ayurveda & Wellness Center - Initial Seed Data

export const CENTER_INFO = {
  name: "Jaya Mahesh Ayurveda and Wellness",
  tagline: "Authentic Kerala Ayurveda & Classical Panchakarma",
  phone: "+91 98470 12345",
  whatsapp: "+91 98470 12345",
  email: "care@jayamaheshayurveda.com",
  address: "Jaya Mahesh Heritage Valley, Post Kalpathy, Palakkad, Kerala 678001, India",
  googleMapsUrl: "https://maps.google.com/?q=Palakkad,Kerala,India",
  openingHoursText: "Monday – Saturday: 9:00 AM – 6:00 PM | Sunday: By Appointment Only",
  bookingNotice: "Every consultation is unhurried (45 minutes) and personally conducted by our licensed Ayurvedic physicians."
};

export const TREATMENTS = [
  {
    id: "panchakarma",
    name: "Classical Panchakarma",
    category: "Panchakarma",
    duration: "7 - 21 Days",
    shortDescription: "The gold standard of Ayurvedic detoxification, restoring systemic balance through five profound cleansing therapies.",
    fullDescription: "Panchakarma is Ayurveda's signature purification and rejuvenation protocol. Designed to eliminate deep-seated metabolic toxins (Ama) from cellular tissues, our Panchakarma begins with internal and external oleation (Snehana) and medicated steam sweating (Swedana), followed by customized cleansing protocols tailored strictly to your individual dosha constitution.",
    benefits: [
      "Purges cellular toxins and accumulated metabolic impurities",
      "Restores digestive fire (Agni) and gut microbiome balance",
      "Calms the nervous system and relieves persistent mental fatigue",
      "Reverses accelerated tissue aging and strengthens immune resilience"
    ],
    recommendedSessions: "Minimum 7 to 14 days of immersive treatment",
    preparation: "Light, warm vegetarian diet 3 days prior. Avoid caffeine and heavy meals.",
    aftercare: "Follow a prescribed Samsarjana Krama (gradual restorative diet) and avoid direct cold winds.",
    imageUrl: "/images/shirodhara.jpg",
    featured: true,
    active: true,
    order: 1
  },
  {
    id: "pain-management",
    name: "Spine & Joint Pain Management",
    category: "Pain Management",
    duration: "60 - 90 Mins / Session",
    shortDescription: "Specialized Marma therapy, warm herbal bolus massages (Kizhi), and localized medicated oil reservoirs (Kati Vasti).",
    fullDescription: "Targeted therapy specifically developed for chronic back pain, cervical spondylosis, sciatica, arthritis, and sports injuries. Utilizing warm herbal oil retention wells (Kati Vasti, Janu Vasti, Greeva Vasti) and warm medicated leaf pouches (Elakizhi), this treatment reduces localized inflammation, lubricates joints, and decompresses spinal nerves.",
    benefits: [
      "Provides lasting relief from lower back, neck, and joint stiffness",
      "Reduces inflammation without pharmaceutical side effects",
      "Strengthens paraspinal musculature and restores natural mobility",
      "Stimulates vital Marma energy points to unlock muscular spasms"
    ],
    recommendedSessions: "Course of 5 to 7 daily or alternate-day sessions",
    preparation: "Wear comfortable loose clothing. Arrive at least 15 minutes before the session.",
    aftercare: "Keep treated areas warm; avoid cold showers and strenuous lifting for 24 hours.",
    imageUrl: "/images/kizhi.jpg",
    featured: true,
    active: true,
    order: 2
  },
  {
    id: "detox-digestive",
    name: "Detox & Digestive Agni Restoration",
    category: "Detox and Digestive Care",
    duration: "60 Mins / Session",
    shortDescription: "Holistic herbal regimens, abdominal Takradhara, and gut purification protocols to conquer bloating, acidity, and IBS.",
    fullDescription: "In Ayurvedic science, vibrant health hinges on balanced digestive fire (Jatharagni). When Agni falters, toxic residue (Ama) accumulates in the gastrointestinal tract, leading to lethargy, bloating, food sensitivities, and metabolic disorders. This clinical protocol combines internal herbal concoctions, abdominal herbal poultices, and cooling herbal buttermilk streams (Takradhara).",
    benefits: [
      "Regulates acid reflux, chronic bloating, and irregular bowel motility",
      "Revitalizes metabolic rate and optimizes nutrient assimilation",
      "Cleanses liver and gall pathways gently using classical herbal formulations",
      "Fosters clarity of mind, eliminating brain fog associated with poor gut health"
    ],
    recommendedSessions: "3 to 7 sessions accompanied by tailored diet plan",
    preparation: "Fasting or drinking warm cumin water for 2 hours before therapy.",
    aftercare: "Consume only warm, freshly prepared kitchari and herbal infusions for 48 hours.",
    imageUrl: "/images/herbs.jpg",
    featured: true,
    active: true,
    order: 3
  },
  {
    id: "rejuvenation",
    name: "Rasayana Rejuvenation & Vitality",
    category: "Rejuvenation",
    duration: "75 - 90 Mins / Session",
    shortDescription: "Nourishing full-body synchronized Abhyanga massage, Shirodhara, and vital herbal Rasayana preparations.",
    fullDescription: "Rasayana Chikitsa is the ancient science of longevity, youthfulness, and cellular rejuvenation. Through synchronized rhythmic massage with warm herbal oils, followed by continuous forehead pouring of medicated herbal oils (Shirodhara) and nourishing herbal milk-rice poultices (Navarakizhi), this treatment replenishes Ojas (vital life essence).",
    benefits: [
      "Promotes deep cellular repair, glowing skin luster, and muscle tone",
      "Relieves profound mental stress, chronic exhaustion, and insomnia",
      "Boosts vitality, endurance, and innate resistance to environmental strain",
      "Promotes profound serenity and peace of mind"
    ],
    recommendedSessions: "Course of 3 to 10 sessions",
    preparation: "Avoid heavy meals prior to session. Keep an open, relaxed mindset.",
    aftercare: "Gentle warm bath after 1 hour; rest in a warm, quiet environment.",
    imageUrl: "/images/consultation.jpg",
    featured: true,
    active: true,
    order: 4
  },
  {
    id: "stress-lifestyle",
    name: "Stress Relief & Sleep Restoration",
    category: "Stress and Lifestyle Wellness",
    duration: "60 - 75 Mins / Session",
    shortDescription: "Calming Shirodhara, gentle scalp therapy, herbal head packs (Thalam), and nervous system rejuvenation.",
    fullDescription: "A sanctuary for overworked minds and stressed bodies. This therapy focuses on the Vata dosha imbalance responsible for insomnia, hyperactive thoughts, anxiety, and digital fatigue. Constant, warm herbal oil streams across the forehead induce an alpha brainwave state of deep restorative meditation.",
    benefits: [
      "Induces sound, refreshing sleep and treats chronic insomnia",
      "Significantly lowers cortisol and hypertension markers",
      "Relieves chronic tension headaches, migraines, and ocular strain",
      "Restores emotional equilibrium and focus"
    ],
    recommendedSessions: "Course of 5 consecutive sessions recommended for chronic insomnia",
    preparation: "Arrive stress-free, with no styling products in hair.",
    aftercare: "Avoid screens and bright lights for the rest of the evening.",
    imageUrl: "/images/hero.jpg",
    featured: false,
    active: true,
    order: 5
  }
];

export const PROGRAMS = [
  {
    id: "reset-restore",
    name: "Reset & Restore",
    duration: "7 Days",
    tag: "Most Popular",
    price: "₹28,000 / $340",
    focus: "Digestion, energy, and mental clarity",
    shortDescription: "A gentle yet transformative 7-day retreat program to reset sluggish digestion and recover clear mental focus.",
    idealFor: "Professionals experiencing burnout, sluggish digestion, stubborn weight plateaus, and low daily energy.",
    inclusions: [
      "Initial comprehensive Nadi Pariksha (Pulse Diagnosis)",
      "Daily personalized Ayurvedic treatments (75 mins/day)",
      "Customized therapeutic herbal cuisine (breakfast, lunch, dinner)",
      "Daily guided morning gentle Yoga & Pranayama breathwork",
      "Continuous physician monitoring and lifestyle blueprint upon departure"
    ],
    dailySchedule: [
      "07:00 AM - Awakening herbal decoction & gentle Yoga / Pranayama",
      "08:30 AM - Sattvic breakfast designed for your Dosha",
      "10:30 AM - Primary Ayurvedic therapy (Abhyanga / Shirodhara)",
      "01:00 PM - Balanced Ayurvedic medicinal lunch",
      "04:00 PM - Herbal tea & restorative mindfulness meditation",
      "05:30 PM - Secondary therapy or Doctor consultation",
      "07:30 PM - Light restorative dinner"
    ],
    imageUrl: "/images/hero.jpg",
    active: true
  },
  {
    id: "panchakarma-journey",
    name: "Panchakarma Journey",
    duration: "14 Days",
    tag: "Deep Cleanse",
    price: "₹65,000 / $790",
    focus: "Deep cellular cleansing, chronic condition relief & total renewal",
    shortDescription: "The complete authentic 14-day classical Panchakarma protocol under direct personal supervision of senior Vaidyas.",
    idealFor: "Those seeking profound healing for chronic ailments, metabolic reset, deep detoxification, and comprehensive rejuvenation.",
    inclusions: [
      "Detailed Prakriti (Constitution) & Vikriti (Imbalance) analysis",
      "Complete 3-phase Panchakarma (Purvakarma, Pradhanakarma, Paschatkarma)",
      "All internal medicinal Ghee (Snehapana) and classical decoctions",
      "Daily personalized dual-therapist treatments (90 mins/day)",
      "Strict therapeutic organic farm-to-table healing diet",
      "Post-cleanse Rasayana rejuvenation kit and 30-day home follow-up care"
    ],
    dailySchedule: [
      "06:30 AM - Nadi Pariksha review & medicated herbal intake",
      "08:00 AM - Customized therapeutic breakfast",
      "10:00 AM - Main Panchakarma therapy session",
      "01:00 PM - Ayurvedic healing lunch based on digestive fire",
      "03:30 PM - Doctor review & vital signs monitoring",
      "05:00 PM - Relaxation therapy or restorative Swedana steam",
      "07:00 PM - Healing broth & medicinal herbal milk"
    ],
    imageUrl: "/images/shirodhara.jpg",
    active: true
  },
  {
    id: "rejuvenate",
    name: "Rejuvenate & Nourish",
    duration: "5 Days",
    tag: "Rest & Glow",
    price: "₹22,000 / $265",
    focus: "Rest, anti-aging, nervous system nourishment & radiant skin",
    shortDescription: "A serene 5-day escape focused on easing fatigue, nourishing depleted tissues, and regaining radiant inner calm.",
    idealFor: "Anyone recovering from illness or demanding life phases, looking for profound rest and revitalization.",
    inclusions: [
      "Doctor consultation on arrival and departure",
      "Daily luxury synchronized Abhyanga with herb-infused oils",
      "Traditional Shirodhara oil stream sessions (3 sessions)",
      "Herbal facial Lepam and natural skin nourishment therapy",
      "Holistic wellness meals and botanical herbal teas"
    ],
    dailySchedule: [
      "07:30 AM - Morning warm herbal infusion & gentle stretching",
      "08:30 AM - Nourishing wholesome breakfast",
      "11:00 AM - Synchronized Abhyanga & warm herbal bath",
      "01:30 PM - Wholesome Ayurvedic vegetarian lunch",
      "04:00 PM - Shirodhara treatment & calming head therapy",
      "07:30 PM - Soothing light dinner & herbal nightcap"
    ],
    imageUrl: "/images/kizhi.jpg",
    active: true
  }
];

export const DOCTORS = [
  {
    id: "dr-ananya",
    name: "Dr. Ananya Mahesh",
    role: "Chief Ayurvedic Physician & Founder",
    qualification: "BAMS, MD (Ayurveda - Panchakarma), Kerala University",
    experience: "18 Years",
    specialties: ["Classical Panchakarma", "Metabolic & Gut Disorders", "Hormonal Health"],
    languages: ["English", "Malayalam", "Hindi", "Tamil"],
    bio: "Dr. Ananya Mahesh comes from a traditional lineage of Ayurvedic practitioners in Palakkad. Having served at premier Ayurvedic hospitals before founding Jaya Mahesh, she combines authentic classical texts (Charaka Samhita) with modern diagnostic clarity.",
    imageUrl: "/images/consultation.jpg"
  },
  {
    id: "dr-rajeshwar",
    name: "Dr. K. Rajeshwar Namboodiri",
    role: "Senior Consultant & Nadi Pariksha Specialist",
    qualification: "BAMS, Fellow in Classical Pulse Diagnosis",
    experience: "24 Years",
    specialties: ["Nadi Pariksha (Pulse Diagnosis)", "Chronic Pain & Arthritis", "Rasayana Chikitsa"],
    languages: ["English", "Malayalam", "Sanskrit"],
    bio: "Revered for his mastery in ancient pulse diagnosis (Nadi Pariksha), Dr. Rajeshwar can detect subtle dosha imbalances and sub-clinical conditions through gentle fingertip contact on the radial pulse. He oversees patient treatment blueprints.",
    imageUrl: "/images/dr_rajeshwar.jpg"
  },
  {
    id: "dr-lakshmi",
    name: "Dr. Lakshmi Menon",
    role: "Women's Health & Lifestyle Medicine Specialist",
    qualification: "BAMS, MS (Ayurveda - Prasuti & Stri Roga)",
    experience: "12 Years",
    specialties: ["Women's Hormonal Balance", "Postpartum Care", "Stress Management"],
    languages: ["English", "Malayalam", "Hindi"],
    bio: "Dr. Lakshmi specializes in natural hormonal harmony, fertility wellness, and stress-related metabolic imbalances. Her compassionate and attentive consultation style makes every patient feel deeply heard and understood.",
    imageUrl: "/images/consultation.jpg"
  },
  {
    id: "therapist-saji",
    name: "Master Saji Kumar",
    role: "Lead Panchakarma & Kalari Marma Therapist",
    qualification: "Government Certified Senior Ayurvedic Therapist, Kalari Marma Expert",
    experience: "16 Years",
    specialties: ["Traditional Abhyanga", "Elakizhi", "Marma Decompression", "Droni Therapies"],
    languages: ["Malayalam", "Tamil", "Basic English"],
    bio: "Trained in the sacred Gurukula tradition of Kerala body therapies, Saji Kumar leads our therapy team with rhythmic precision and deep reverential care, ensuring authentic therapeutic pressure and safety.",
    imageUrl: "/images/kizhi.jpg"
  }
];

export const GALLERY_ITEMS = [
  {
    id: "gal-1",
    title: "Sanctuary Courtyard with Uruli",
    category: "Center & Architecture",
    imageUrl: "/images/hero.jpg",
    caption: "The peaceful teakwood central courtyard with traditional brass Uruli and floating lotus blooms."
  },
  {
    id: "gal-2",
    title: "Classical Shirodhara Therapy",
    category: "Therapy Rooms",
    imageUrl: "/images/shirodhara.jpg",
    caption: "Warm medicated oil poured gently from the carved brass vessel in our serene therapy chambers."
  },
  {
    id: "gal-3",
    title: "Handcrafted Herbal Formulations",
    category: "Herbal Garden & Oils",
    imageUrl: "/images/herbs.jpg",
    caption: "Fresh botanical herbs, roots, and tailor-blended medicated tailams prepared in our pharmacy."
  },
  {
    id: "gal-4",
    title: "Nadi Pariksha Pulse Consultation",
    category: "Healing Moments",
    imageUrl: "/images/consultation.jpg",
    caption: "Dr. Ananya Mahesh conducting an unhurried pulse diagnosis and constitutional analysis."
  },
  {
    id: "gal-5",
    title: "Elakizhi Herbal Poultice Therapy",
    category: "Therapy Rooms",
    imageUrl: "/images/kizhi.jpg",
    caption: "Warm herbal bolus fomentation therapy relieving chronic back and joint discomfort."
  },
  {
    id: "gal-6",
    title: "Ayurvedic Library & Heritage Consultation",
    category: "Center & Architecture",
    imageUrl: "/images/dr_rajeshwar.jpg",
    caption: "Classical palm leaf manuscripts and botanical references in the senior doctor's study."
  }
];

export const TESTIMONIALS = [
  {
    id: "test-1",
    name: "Meenakshi Sundaram",
    location: "Bengaluru, India",
    treatment: "14-Day Panchakarma Journey",
    rating: 5,
    quote: "I came to Jaya Mahesh looking for relief from debilitating chronic migraines and gastric distress. The medical team's unhurried attention and the serene Kerala ambiance gave me back my health and energy. I feel 10 years younger."
  },
  {
    id: "test-2",
    name: "David Robertson",
    location: "London, UK",
    treatment: "Spine & Pain Management",
    rating: 5,
    quote: "After months of conventional physiotherapy for lumbar disc compression yielded limited relief, Kati Vasti and Kizhi therapies here worked wonders. By day four, the nerve pinching had dramatically diminished. Highly recommended."
  },
  {
    id: "test-3",
    name: "Rohit & Priya Singhania",
    location: "Mumbai, India",
    treatment: "Reset & Restore Retreat",
    rating: 5,
    quote: "A true sanctuary in every sense. The personalized food, the warm oils, and Dr. Ananya's deep wisdom made this the best wellness decision we have ever made. We intend to return every year."
  },
  {
    id: "test-4",
    name: "Sophie Leclerc",
    location: "Paris, France",
    treatment: "Stress Relief & Sleep Restoration",
    rating: 5,
    quote: "Shirodhara here is unlike anything I experienced in hotel spas. It is authentic medicine. My sleep rhythm returned to normal after 3 nights, and a calm clarity remained with me long after returning home."
  }
];

export const INITIAL_STAFF = [
  {
    uid: "staff-1",
    name: "Dr. Ananya Mahesh",
    email: "admin@jayamahesh.com",
    role: "admin",
    active: true,
    department: "Chief Physician & Clinical Director",
    createdAt: "2026-01-10T10:00:00Z"
  },
  {
    uid: "staff-2",
    name: "Meera Nair",
    email: "manager@jayamahesh.com",
    role: "manager",
    active: true,
    department: "Operations & Patient Services",
    createdAt: "2026-02-15T11:00:00Z"
  },
  {
    uid: "staff-3",
    name: "Arun Varma",
    email: "staff@jayamahesh.com",
    role: "staff",
    active: true,
    department: "Front Desk & Scheduling",
    createdAt: "2026-03-01T09:00:00Z"
  }
];

export const INITIAL_CALENDAR_CONFIG = {
  workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  openingTime: "09:00",
  closingTime: "18:00",
  slotLength: 60, // minutes
  lunchBreakStart: "13:00",
  lunchBreakEnd: "14:00",
  maxBookingsPerSlot: 1,
  slots: [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM"
  ],
  blockedDates: [
    "2026-10-02" // Gandhi Jayanti
  ],
  blockedSlots: {
    // e.g. "2026-09-26": ["12:00 PM"]
  }
};

// Seed appointments for immediate dashboard display
export const INITIAL_APPOINTMENTS = [
  {
    id: "APT-2026-001",
    patientName: "Sunita Nambiar",
    phone: "+91 94471 23456",
    whatsapp: "+91 94471 23456",
    email: "sunita.nambiar@gmail.com",
    treatmentId: "panchakarma",
    treatmentName: "Classical Panchakarma",
    preferredDoctor: "Dr. Ananya Mahesh",
    preferredDate: "2026-09-26",
    preferredSlot: "10:00 AM",
    notes: "Suffering from chronic gut sluggishness and fatigue after seasonal change. Seeking full 14-day Panchakarma.",
    status: "pending",
    assignedStaffId: "staff-2",
    assignedStaffName: "Meera Nair",
    internalNotes: "Patient requested preliminary phone consultation before arriving from Kochi.",
    createdAt: "2026-09-24T14:30:00Z",
    updatedAt: "2026-09-24T14:30:00Z"
  },
  {
    id: "APT-2026-002",
    patientName: "Karthik Vaidyanathan",
    phone: "+91 98840 98765",
    whatsapp: "+91 98840 98765",
    email: "karthik.v@outlook.com",
    treatmentId: "pain-management",
    treatmentName: "Spine & Joint Pain Management",
    preferredDoctor: "Dr. K. Rajeshwar Namboodiri",
    preferredDate: "2026-09-25",
    preferredSlot: "11:00 AM",
    notes: "Persistent L4-L5 disc stiffness and pain radiating down left thigh for 6 months.",
    status: "confirmed",
    assignedStaffId: "staff-1",
    assignedStaffName: "Dr. Ananya Mahesh",
    internalNotes: "Confirmed via phone call. Advised to bring previous MRI reports.",
    createdAt: "2026-09-24T09:15:00Z",
    updatedAt: "2026-09-24T10:00:00Z"
  },
  {
    id: "APT-2026-003",
    patientName: "Elena Rostova",
    phone: "+44 7700 900123",
    whatsapp: "+44 7700 900123",
    email: "elena.rostova@wellness.eu",
    treatmentId: "rejuvenation",
    treatmentName: "Rasayana Rejuvenation & Vitality",
    preferredDoctor: "Dr. Lakshmi Menon",
    preferredDate: "2026-09-28",
    preferredSlot: "03:00 PM",
    notes: "Visiting Kerala for 2 weeks. Interested in Shirodhara and skin rejuvenation package.",
    status: "pending",
    assignedStaffId: null,
    assignedStaffName: null,
    internalNotes: "New international enquiry. Send welcome PDF with diet instructions.",
    createdAt: "2026-09-24T16:45:00Z",
    updatedAt: "2026-09-24T16:45:00Z"
  },
  {
    id: "APT-2026-004",
    patientName: "Madhavan Pillai",
    phone: "+91 97455 11223",
    whatsapp: "+91 97455 11223",
    email: "mpillai@tcs.com",
    treatmentId: "stress-lifestyle",
    treatmentName: "Stress Relief & Sleep Restoration",
    preferredDoctor: "Dr. Ananya Mahesh",
    preferredDate: "2026-09-25",
    preferredSlot: "04:00 PM",
    notes: "Extreme work stress, irregular sleep pattern, and chronic eye strain.",
    status: "confirmed",
    assignedStaffId: "staff-3",
    assignedStaffName: "Arun Varma",
    internalNotes: "Scheduled for introductory consultation + initial Shirodhara trial.",
    createdAt: "2026-09-23T11:20:00Z",
    updatedAt: "2026-09-23T12:00:00Z"
  },
  {
    id: "APT-2026-005",
    patientName: "Radha Krishnan",
    phone: "+91 98401 55667",
    whatsapp: "+91 98401 55667",
    email: "radha.k@gmail.com",
    treatmentId: "detox-digestive",
    treatmentName: "Detox & Digestive Agni Restoration",
    preferredDoctor: "Dr. Lakshmi Menon",
    preferredDate: "2026-09-24",
    preferredSlot: "02:00 PM",
    notes: "Follow-up consultation after 1st round of Takradhara.",
    status: "completed",
    assignedStaffId: "staff-1",
    assignedStaffName: "Dr. Ananya Mahesh",
    internalNotes: "Patient reported 70% reduction in acidity. Prescribed Dasamoolarishtam for 30 days.",
    createdAt: "2026-09-20T10:00:00Z",
    updatedAt: "2026-09-24T15:30:00Z"
  }
];
