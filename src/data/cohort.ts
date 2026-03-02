export interface CohortMember {
  id: string;
  name: string;
  type1: string;
  type2?: string;
  typeColors?: {
    type1?: string;
    type2?: string;
  };
  galleryImages?: string[];
  galleryImagePositions?: string[];
  moves: string[];
  specialAttack: string;
  hobbies: string[];
  description: string;
  cardDescription: string;
  stats: {
    caffeine: number;
    coding: number;
    wetLab: number;
    clinical: number;
    ankiConsistency: number;
  };
  statLabels: {
    caffeine: string;
    coding: string;
    wetLab: string;
    clinical: string;
    ankiConsistency: string;
  };
  imageUrl: string;
  imagePosition?: string; // e.g., "center", "top", "bottom"
  ballUrl: string;
  spriteUrl: string;
  hometown: string;
}

// Bump this version whenever you run scripts/import-cohort.mjs and push to Vercel.
// The app will automatically clear stale localStorage on any browser that has an older version.
export const COHORT_VERSION = "1.0.0";

export const COHORT_DATA: CohortMember[] = [
  {
    "id": "001",
    "name": "Jerry Shen",
    "type1": "Immunology",
    "type2": "ENT",
    "moves": [
      "Critical Analysis",
      "Photo Flash",
      "Regression Pulse"
    ],
    "specialAttack": "Helping Hand",
    "hobbies": [
      "Birdwatching",
      "Photography",
      "Coffee-Brewing",
      "Astronomy"
    ],
    "description": "When Jerry is not doing his Anki, you can often find him at night by the tennis courts shooting astrophotography or by Lake Lag looking for owls.",
    "cardDescription": "Bird Nerd",
    "stats": {
      "caffeine": 25,
      "coding": 75,
      "wetLab": 25,
      "clinical": 75,
      "ankiConsistency": 100
    },
    "statLabels": {
      "caffeine": "Caffeine",
      "coding": "Coding",
      "wetLab": "Wet Lab",
      "clinical": "Clinical",
      "ankiConsistency": "Anki"
    },
    "imageUrl": "/images/001.jpg",
    "imagePosition": "100.00% 61.33%",
    "ballUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
    "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/25.gif",
    "hometown": "Boyds, MD",
    "galleryImages": [
      "/images/001-gallery-1.jpg",
      "/images/001-gallery-2.jpg",
      "/images/001-gallery-3.jpg"
    ],
    "galleryImagePositions": [
      "50.53% 50.00%",
      "50.00% 100.00%",
      "39.11% 50.00%"
    ],
    "typeColors": {
      "type1": "#9628bd",
      "type2": "#2884bd"
    }
  },
  {
    "id": "002",
    "name": "Sidra Xu",
    "type1": "Bioengineering",
    "type2": "General Surgery",
    "moves": [
      "CRISPR Cut",
      "Gene Silencing",
      "Immune Surge"
    ],
    "specialAttack": "Epigenetic Remodel",
    "hobbies": [
      "Baking",
      "Hiking",
      "Sci-Fi Novels"
    ],
    "description": "Can design a guide RNA in their sleep. Jordan's sourdough starter is technically a genetically modified organism at this point.",
    "cardDescription": "Stanford might as well be home",
    "stats": {
      "caffeine": 70,
      "coding": 55,
      "wetLab": 55,
      "clinical": 80,
      "ankiConsistency": 0
    },
    "statLabels": {
      "caffeine": "Caffeine",
      "coding": "Coding",
      "wetLab": "Wet Lab",
      "clinical": "Clinical",
      "ankiConsistency": "Anki"
    },
    "imageUrl": "/images/002.jpg",
    "imagePosition": "center",
    "ballUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png",
    "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/133.gif",
    "hometown": "San Jose, CA"
  },
  {
    "id": "003",
    "name": "Oren Lederberg",
    "type1": "Synthetic Bio",
    "type2": "Oncology",
    "moves": [
      "Sculpt & Structure",
      "Dog-dependent Dopamine",
      "Catalytic Efficiency"
    ],
    "specialAttack": "Golden Hour Recharge",
    "hobbies": [
      "Yoga",
      "Ski",
      "Running",
      "Talking",
      "Sleeping"
    ],
    "description": "When Oren is not reading papers, chances are he is running on a trail, doing yoga, or talking about getting sleep - always easy to hear when nearby. ",
    "cardDescription": "Lactose Intolerant",
    "stats": {
      "caffeine": 0,
      "coding": 30,
      "wetLab": 80,
      "clinical": 20,
      "ankiConsistency": 75
    },
    "statLabels": {
      "caffeine": "Caffeine",
      "coding": "Coding",
      "wetLab": "Wet Lab",
      "clinical": "Clinical",
      "ankiConsistency": "Anki"
    },
    "imageUrl": "/images/003.jpg",
    "imagePosition": "66.54% 100.00%",
    "ballUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png",
    "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/175.gif",
    "hometown": "Providence, RI",
    "galleryImages": [
      "/images/003-gallery-1.jpg",
      "/images/003-gallery-2.jpg",
      "/images/003-gallery-3.jpg",
      "/images/003-gallery-4.jpg"
    ],
    "galleryImagePositions": [
      "48.17% 50.00%",
      "59.09% 50.00%",
      "50.00% 56.61%",
      "50.00% 100.00%"
    ],
    "typeColors": {
      "type2": "#a3434c"
    }
  },
  {
    "id": "004",
    "name": "Verina Leung",
    "type1": "Cancer Neuroscience",
    "type2": "Pediatrics",
    "moves": [
      "sTanford imposter ",
      "Rodent Exterminator ",
      "Night Wanderer"
    ],
    "specialAttack": "Brain Wave",
    "hobbies": [
      "Thrifting/Antiquing",
      "Hiking",
      "Long-Night-Walks",
      "Crafting"
    ],
    "description": "When Verina isn't responding to you, she likely has her noise-canceling earbuds in listening to her sister’s piano concertos on repeat or she’s on the phone catching up with her 91-year-old grandmother.",
    "cardDescription": "Two Cuts",
    "stats": {
      "caffeine": 5,
      "coding": 33,
      "wetLab": 100,
      "clinical": 40,
      "ankiConsistency": 75
    },
    "statLabels": {
      "caffeine": "Caffeine",
      "coding": "Coding",
      "wetLab": "Wet Lab",
      "clinical": "Clinical",
      "ankiConsistency": "Anki"
    },
    "imageUrl": "/images/004.jpg",
    "imagePosition": "50.00% 86.23%",
    "ballUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png",
    "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/39.gif",
    "hometown": "Honolulu, HI",
    "typeColors": {
      "type1": "#efa9f4",
      "type2": "#ff0505"
    }
  },
  {
    "id": "005",
    "name": "Kenyon Weis",
    "type1": "Chem-Bio",
    "type2": "Neurology",
    "moves": [
      "Brain Storm",
      "Sleep",
      "Fist Bump"
    ],
    "specialAttack": "Irish Goodbye",
    "hobbies": [
      "Lifting",
      "Running",
      "Reading",
      "Hiking",
      "Mitochondria",
      "Learning"
    ],
    "description": "When Kenyon is not talking about Mitochondria, you can often find him not talking at all",
    "cardDescription": "\"Onion\"",
    "stats": {
      "caffeine": 5,
      "coding": 25,
      "wetLab": 80,
      "clinical": 60,
      "ankiConsistency": 30
    },
    "statLabels": {
      "caffeine": "Caffeine",
      "coding": "Coding",
      "wetLab": "Wet Lab",
      "clinical": "Clinical",
      "ankiConsistency": "Anki"
    },
    "imageUrl": "/images/005.jpg",
    "imagePosition": "59.62% 50.00%",
    "ballUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/luxury-ball.png",
    "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/151.gif",
    "hometown": "Hard to say",
    "galleryImages": [
      "/images/005-gallery-1.jpg",
      "/images/005-gallery-2.jpg",
      "/images/005-gallery-3.jpg"
    ],
    "galleryImagePositions": [
      "54.80% 50.00%",
      "57.35% 50.00%",
      "50.00% 74.69%"
    ]
  },
  {
    "id": "006",
    "name": "Aravind Krishnan",
    "type1": "Immunology",
    "type2": "Critical Care",
    "moves": [
      "fMRI Scan",
      "Neural Pulse",
      "Mind Read"
    ],
    "specialAttack": "Behavioral Loop",
    "hobbies": [
      "Painting",
      "Yoga",
      "Surfing"
    ],
    "description": "Riley can tell you what you're thinking just by looking at your BOLD signal. They find peace in the waves and on the canvas.",
    "cardDescription": "Where's Sean?",
    "stats": {
      "caffeine": 5,
      "coding": 40,
      "wetLab": 80,
      "clinical": 50,
      "ankiConsistency": 15
    },
    "statLabels": {
      "caffeine": "Caffeine",
      "coding": "Coding",
      "wetLab": "Wet Lab",
      "clinical": "Clinical",
      "ankiConsistency": "Anki"
    },
    "imageUrl": "/images/006.jpg",
    "imagePosition": "50.00% 24.06%",
    "ballUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/premier-ball.png",
    "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/417.gif",
    "hometown": "DE",
    "typeColors": {
      "type1": "#9628bd"
    }
  },
  {
    "id": "007",
    "name": "Saradha Miriyala",
    "type1": "Dev Bio",
    "type2": "Cardiology",
    "moves": [
      "Nano-Delivery",
      "Polymer Shield",
      "Chemical Bond"
    ],
    "specialAttack": "Targeted Release",
    "hobbies": [
      "Sculpting",
      "Biking",
      "Coffee Roasting"
    ],
    "description": "Sam builds tiny robots to deliver medicine. They treat coffee roasting like a high-stakes chemical reaction.",
    "cardDescription": "Drama Queen!",
    "stats": {
      "caffeine": 30,
      "coding": 50,
      "wetLab": 85,
      "clinical": 70,
      "ankiConsistency": 20
    },
    "statLabels": {
      "caffeine": "Caffeine",
      "coding": "Coding",
      "wetLab": "Wet Lab",
      "clinical": "Clinical",
      "ankiConsistency": "Anki"
    },
    "imageUrl": "/images/007.jpg",
    "imagePosition": "50.00% 35.56%",
    "ballUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/timer-ball.png",
    "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif",
    "hometown": "Portland, NJ"
  },
  {
    "id": "008",
    "name": "Desmond Edwards",
    "type1": "Immuno",
    "type2": "Infectious Disease?",
    "moves": [
      "Viral Vector",
      "Antibody Shield",
      "Spike Bind"
    ],
    "specialAttack": "Vaccine Breakthrough",
    "hobbies": [
      "Archery",
      "Gaming",
      "Cooking"
    ],
    "description": "Jamie tracks viruses like a predator. When not in the BSL-3 lab, they're likely hitting bullseyes or high scores.",
    "cardDescription": "????",
    "stats": {
      "caffeine": 65,
      "coding": 100,
      "wetLab": 100,
      "clinical": 85,
      "ankiConsistency": 15
    },
    "statLabels": {
      "caffeine": "Caffeine",
      "coding": "Coding",
      "wetLab": "Wet Lab",
      "clinical": "Clinical",
      "ankiConsistency": "Anki"
    },
    "imageUrl": "/images/008.jpg",
    "imagePosition": "43.13% 50.00%",
    "ballUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/quick-ball.png",
    "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/1.gif",
    "hometown": "St Mary, Jamaica"
  },
  {
    "id": "009",
    "name": "Daria Azizad",
    "type1": "Neuroscience",
    "type2": "Neurology",
    "moves": [
      "Tumor Target",
      "T-Cell Surge",
      "Gene Map"
    ],
    "specialAttack": "Precision Strike",
    "hobbies": [
      "Gardening",
      "Reading",
      "Swimming"
    ],
    "description": "Peyton is on a mission to personalize cancer care. They find metaphors for cell growth in their prize-winning roses.",
    "cardDescription": "Bring the spice (but not the gluten)!",
    "stats": {
      "caffeine": 65,
      "coding": 80,
      "wetLab": 85,
      "clinical": 90,
      "ankiConsistency": 75
    },
    "statLabels": {
      "caffeine": "Caffeine",
      "coding": "Coding",
      "wetLab": "Wet Lab",
      "clinical": "Clinical",
      "ankiConsistency": "Anki"
    },
    "imageUrl": "/images/009.jpg",
    "imagePosition": "50.00% 25.06%",
    "ballUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/heal-ball.png",
    "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/113.gif",
    "hometown": "Los Angeles, CA",
    "galleryImages": [
      "/images/009-gallery-1.jpg"
    ],
    "galleryImagePositions": [
      "58.86% 50.00%"
    ],
    "typeColors": {
      "type1": "#00ccc9"
    }
  },
  {
    "id": "010",
    "name": "Charu Balamurugan",
    "type1": "Genetics",
    "type2": "Pediatrics",
    "moves": [
      "Insulin Spike",
      "Lipid Burn",
      "Hormone Wave"
    ],
    "specialAttack": "Metabolic Reset",
    "hobbies": [
      "Hiking",
      "Photography",
      "Star Gazing"
    ],
    "description": "Dakota understands the body's fuel like no one else. They spend their nights looking at galaxies and their days at glucose levels.",
    "cardDescription": "????",
    "stats": {
      "caffeine": 40,
      "coding": 55,
      "wetLab": 90,
      "clinical": 85,
      "ankiConsistency": 60
    },
    "statLabels": {
      "caffeine": "Caffeine",
      "coding": "Coding",
      "wetLab": "Wet Lab",
      "clinical": "Clinical",
      "ankiConsistency": "Anki"
    },
    "imageUrl": "/images/010.jpg",
    "imagePosition": "center",
    "ballUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dusk-ball.png",
    "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/216.gif",
    "hometown": "TX",
    "typeColors": {
      "type2": "#ffade0"
    }
  },
  {
    "id": "011",
    "name": "Dennis Zhang",
    "type1": "Host-Microbe",
    "type2": "Dermatology?",
    "moves": [
      "Explosive Brew",
      "Pipet Tip Archery",
      "\"Strava\" It"
    ],
    "specialAttack": "Dennis the Menace",
    "hobbies": [
      "Brewing Kombucha",
      "Playing Guitar",
      "Learning to DJ",
      "Physical Exertion"
    ],
    "description": "When Dennis isn’t optimizing his dorm-room kombucha brewing setup, he’s likely raving about Denmark or vigorously exercising -- by any means necessary.",
    "cardDescription": "Fizz Whiz",
    "stats": {
      "caffeine": 50,
      "coding": 50,
      "wetLab": 80,
      "clinical": 50,
      "ankiConsistency": 100
    },
    "statLabels": {
      "caffeine": "Caffeine",
      "coding": "Coding",
      "wetLab": "Wet Lab",
      "clinical": "Clinical",
      "ankiConsistency": "Anki"
    },
    "imageUrl": "/images/011.jpg",
    "imagePosition": "57.06% 38.58%",
    "ballUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/heavy-ball.png",
    "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/172.gif",
    "hometown": "Hillsborough, NJ",
    "galleryImages": [
      "/images/011-gallery-1.jpg",
      "/images/011-gallery-2.jpg",
      "/images/011-gallery-3.jpg",
      "/images/011-gallery-4.jpg"
    ],
    "galleryImagePositions": [
      "2.68% 50.00%",
      "50.00% 100.00%",
      "53.00% 50.00%",
      "69.20% 50.00%"
    ],
    "typeColors": {
      "type2": "#ffc800"
    }
  },
  {
    "id": "012",
    "name": "Jon Musai",
    "type1": "Immunology",
    "type2": "Internal Medicine?",
    "moves": [
      "Cytokine Storm",
      "Phagocytosis",
      "B-Cell Blast"
    ],
    "specialAttack": "Antibody Cascade",
    "hobbies": [
      "Tennis",
      "Cooking",
      "Piano"
    ],
    "description": "Charlie is fascinated by the body's defense mechanisms. When not studying T-cells, they're likely perfecting a recipe or practicing a concerto.",
    "cardDescription": "?????",
    "stats": {
      "caffeine": 75,
      "coding": 65,
      "wetLab": 92,
      "clinical": 70,
      "ankiConsistency": 88
    },
    "statLabels": {
      "caffeine": "Caffeine",
      "coding": "Coding",
      "wetLab": "Wet Lab",
      "clinical": "Clinical",
      "ankiConsistency": "Anki"
    },
    "imageUrl": "/images/012.jpg",
    "imagePosition": "50.00% 27.73%",
    "ballUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/luxury-ball.png",
    "spriteUrl": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/133.gif",
    "hometown": "Ann Arbor, MI"
  }
];
