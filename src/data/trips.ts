export interface Trip {
  id: number;
  title: string;
  destination: string;
  description: string;
  longDescription: string;
  price: number;
  duration: number;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  highlights: string[];
  included: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  departureDate: string[];
}

export const trips: Trip[] = [
  {
    id: 1,
    title: "Santorini Getaway",
    destination: "Greece",
    description: "Experience the stunning white architecture and breathtaking sunsets of Santorini.",
    longDescription: "Discover the magic of Santorini, a picturesque island known for its stunning sunsets, white-washed buildings with blue domes, black sand beaches, and crystal-clear waters. This premium vacation package offers the perfect balance of relaxation, adventure, and authentic Greek experiences. Explore charming villages, taste exquisite local wines, and immerse yourself in the rich culture of this Mediterranean paradise.",
    price: 1899,
    duration: 7,
    image: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg",
    gallery: [
      "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg",
      "https://images.pexels.com/photos/3601453/pexels-photo-3601453.jpeg",
      "https://images.pexels.com/photos/1029020/pexels-photo-1029020.jpeg",
      "https://images.pexels.com/photos/4275885/pexels-photo-4275885.jpeg"
    ],
    rating: 4.8,
    reviews: 236,
    highlights: [
      "Sunset viewing in Oia",
      "Wine tasting at local vineyards",
      "Boat tour to the volcanic hot springs",
      "Private beach access",
      "Authentic Greek cooking class"
    ],
    included: [
      "7 nights accommodation in a 4-star hotel",
      "Daily breakfast and 3 dinners",
      "Airport transfers",
      "Guided tours as per itinerary",
      "Wine tasting experience"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Santorini",
        description: "Welcome to the stunning island of Santorini! Upon arrival, you'll be transferred to your hotel in Fira. Enjoy the rest of the day at leisure, perhaps taking a stroll around the town center."
      },
      {
        day: 2,
        title: "Fira Exploration",
        description: "After breakfast, join a guided walking tour of Fira, the island's capital. Visit the Archaeological Museum and enjoy panoramic views of the caldera. Evening at leisure."
      },
      {
        day: 3,
        title: "Volcanic Adventure",
        description: "Embark on a boat tour to the volcanic islands in the caldera. Hike to the summit of Nea Kameni volcano and swim in the hot springs of Palea Kameni."
      },
      {
        day: 4,
        title: "Wine Experience",
        description: "Discover Santorini's unique viticulture with visits to three traditional wineries. Learn about the island's unique grape-growing method and enjoy tastings of distinctive volcanic wines."
      },
      {
        day: 5,
        title: "Beach Day",
        description: "Relax on one of Santorini's famous beaches - choose between the red beach, black beach, or white beach. Free time to swim and enjoy the unique volcanic landscapes."
      },
      {
        day: 6,
        title: "Oia and Sunset",
        description: "Explore the picturesque village of Oia with its iconic blue-domed churches and winding marble streets. Stay for the world-famous sunset - a truly magical experience."
      },
      {
        day: 7,
        title: "Culinary Traditions",
        description: "Participate in a Greek cooking class, learning to prepare traditional Santorinian dishes. Free afternoon for last-minute shopping or relaxation."
      }
    ],
    departureDate: [
      "2025-05-15",
      "2025-06-12",
      "2025-07-17",
      "2025-08-14",
      "2025-09-18"
    ]
  },
  {
    id: 2,
    title: "Cultural Kyoto Tour",
    destination: "Japan",
    description: "Immerse yourself in the ancient traditions and beautiful gardens of Kyoto.",
    longDescription: "Step back in time in the cultural heart of Japan. Our Kyoto tour offers an immersive experience in Japanese tradition, history, and natural beauty. Explore ancient temples, walk through bamboo forests, witness the beauty of cherry blossoms or fall foliage (seasonal), and participate in authentic cultural activities. This carefully crafted itinerary balances must-see attractions with hidden gems for an unforgettable Japanese experience.",
    price: 2299,
    duration: 8,
    image: "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg",
    gallery: [
      "https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg",
      "https://images.pexels.com/photos/5444196/pexels-photo-5444196.jpeg",
      "https://images.pexels.com/photos/3350141/pexels-photo-3350141.jpeg",
      "https://images.pexels.com/photos/1822605/pexels-photo-1822605.jpeg"
    ],
    rating: 4.9,
    reviews: 182,
    highlights: [
      "Private tour of Fushimi Inari Shrine",
      "Bamboo Forest exploration",
      "Traditional tea ceremony experience",
      "Gion district evening walk",
      "Kimono wearing experience"
    ],
    included: [
      "8 nights in a traditional ryokan with modern amenities",
      "Daily breakfast and 5 traditional dinners",
      "Japan Rail Pass for 7 days",
      "English-speaking guide",
      "Cultural activity fees"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Kyoto",
        description: "Arrive in Kyoto and transfer to your ryokan. Enjoy a welcome dinner and orientation meeting with your guide."
      },
      {
        day: 2,
        title: "Eastern Kyoto Temples",
        description: "Visit the iconic Kiyomizu-dera Temple and explore the historic Higashiyama district with its preserved wooden buildings and traditional shops."
      },
      {
        day: 3,
        title: "Arashiyama Bamboo Grove",
        description: "Travel to the western part of Kyoto to experience the famous bamboo grove and the stunning garden of Tenryu-ji Temple."
      },
      {
        day: 4,
        title: "Golden Pavilion & Zen Gardens",
        description: "Marvel at Kinkaku-ji (the Golden Pavilion) and explore Ryoan-ji, home to Japan's most famous rock garden."
      },
      {
        day: 5,
        title: "Fushimi Inari Shrine",
        description: "Early morning visit to the breathtaking Fushimi Inari Shrine with its thousands of vermilion torii gates. Afternoon sake tasting in the Fushimi district."
      },
      {
        day: 6,
        title: "Cultural Experiences Day",
        description: "Participate in a traditional tea ceremony, try your hand at calligraphy, and experience kimono wearing at a specialized cultural center."
      },
      {
        day: 7,
        title: "Nara Day Trip",
        description: "Day excursion to nearby Nara to see Todai-ji Temple with its giant Buddha statue and feed the friendly deer in Nara Park."
      },
      {
        day: 8,
        title: "Gion and Farewell",
        description: "Morning at leisure. Afternoon walking tour of Gion, Kyoto's famous geisha district. Evening farewell dinner with geisha performance."
      }
    ],
    departureDate: [
      "2025-03-25",
      "2025-04-08",
      "2025-05-13",
      "2025-09-09",
      "2025-10-21"
    ]
  },
  {
    id: 3,
    title: "Machu Picchu Adventure",
    destination: "Peru",
    description: "Trek the legendary Inca Trail and discover the mysteries of Machu Picchu.",
    longDescription: "Embark on the adventure of a lifetime to one of the world's most iconic archaeological sites. This journey through Peru combines awe-inspiring natural landscapes with profound cultural experiences. Trek along ancient pathways used by the Incas themselves, explore colonial cities with rich histories, and finally witness the sunrise over the mystical citadel of Machu Picchu. This carefully paced itinerary ensures proper acclimatization to the altitude while maximizing your experience.",
    price: 2499,
    duration: 10,
    image: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg",
    gallery: [
      "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg",
      "https://images.pexels.com/photos/5358886/pexels-photo-5358886.jpeg",
      "https://images.pexels.com/photos/6157235/pexels-photo-6157235.jpeg",
      "https://images.pexels.com/photos/5255837/pexels-photo-5255837.jpeg"
    ],
    rating: 4.9,
    reviews: 157,
    highlights: [
      "4-day Inca Trail trek with premium camping equipment",
      "Sunrise entry to Machu Picchu",
      "Exploration of Sacred Valley",
      "Cusco city tour",
      "Traditional Pachamanca feast"
    ],
    included: [
      "All accommodations (3-star hotels and premium camping)",
      "Most meals (10 breakfasts, 6 lunches, 5 dinners)",
      "Expert trekking guides and porters",
      "All transportation including trains",
      "Entrance fees to all sites"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Lima",
        description: "Welcome to Peru! Upon arrival in Lima, transfer to your hotel in the Miraflores district. Evening orientation meeting with your guide."
      },
      {
        day: 2,
        title: "Lima to Cusco",
        description: "Morning flight to Cusco. Afternoon gentle walking tour of this historic city at 3,400m to help with acclimatization. Visit the main square and the impressive Koricancha temple."
      },
      {
        day: 3,
        title: "Sacred Valley Exploration",
        description: "Full-day excursion to the Sacred Valley. Visit the Pisac ruins and market, and explore the impressive fortress at Ollantaytambo. Overnight in the Sacred Valley."
      },
      {
        day: 4,
        title: "Inca Trail Day 1",
        description: "Begin your Inca Trail adventure! Trek from Km 82 to Huayllabamba camp, passing through stunning Andean landscapes and your first Incan ruins."
      },
      {
        day: 5,
        title: "Inca Trail Day 2",
        description: "The most challenging day as you ascend to Dead Woman's Pass (4,215m). Remarkable views reward your efforts before descending to Pacaymayo camp."
      },
      {
        day: 6,
        title: "Inca Trail Day 3",
        description: "Pass through multiple ecological zones and several beautiful archaeological sites, including Runkurakay, Sayacmarca, and Phuyupatamarca."
      },
      {
        day: 7,
        title: "Inca Trail Day 4 & Machu Picchu",
        description: "Early start to reach Inti Punku (Sun Gate) for sunrise over Machu Picchu. Guided tour of the citadel followed by free time to explore. Overnight in Aguas Calientes."
      },
      {
        day: 8,
        title: "Optional Second Machu Picchu Visit & Return to Cusco",
        description: "Optional morning return to Machu Picchu or time at leisure in Aguas Calientes. Afternoon train and transfer back to Cusco."
      },
      {
        day: 9,
        title: "Cusco Free Day",
        description: "Free day to explore Cusco at your own pace. Optional activities include visiting the San Pedro Market, additional archaeological sites, or museums."
      },
      {
        day: 10,
        title: "Departure",
        description: "Transfer to Cusco airport for your flight to Lima and international connections. End of services."
      }
    ],
    departureDate: [
      "2025-04-05",
      "2025-05-17",
      "2025-06-21",
      "2025-07-12",
      "2025-08-09"
    ]
  },
  {
    id: 4,
    title: "Bali Retreat",
    destination: "Indonesia",
    description: "Relax and rejuvenate in the tropical paradise of Bali with yoga and spa treatments.",
    longDescription: "Escape to the Island of the Gods for a perfect blend of relaxation, spirituality, and adventure. Our Bali retreat offers a restorative experience that balances wellness activities with cultural immersion and natural exploration. Unwind with daily yoga and spa treatments, connect with local traditions, and discover the island's stunning beaches, rice terraces, and temples. This thoughtfully designed retreat provides both structure and flexibility to create your ideal Balinese experience.",
    price: 1799,
    duration: 9,
    image: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg",
    gallery: [
      "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg",
      "https://images.pexels.com/photos/5302686/pexels-photo-5302686.jpeg",
      "https://images.pexels.com/photos/3308588/pexels-photo-3308588.jpeg",
      "https://images.pexels.com/photos/4344748/pexels-photo-4344748.jpeg"
    ],
    rating: 4.7,
    reviews: 211,
    highlights: [
      "Daily yoga and meditation sessions",
      "Traditional Balinese healing treatments",
      "Rice terrace trekking",
      "Ubud cultural immersion",
      "Beachfront relaxation in Seminyak"
    ],
    included: [
      "9 nights split between Ubud and Seminyak",
      "Daily breakfast and 4 special dinners",
      "15 wellness activities (yoga, spa, meditation)",
      "Cultural excursions and classes",
      "Airport transfers and private transportation"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Bali",
        description: "Welcome to Bali! Transfer from Denpasar airport to your boutique hotel in Ubud. Evening welcome dinner and retreat orientation."
      },
      {
        day: 2,
        title: "Ubud Introduction",
        description: "Morning yoga session followed by breakfast. Guided walking tour of Ubud, visiting the Monkey Forest, local markets, and craft villages."
      },
      {
        day: 3,
        title: "Spiritual Practices",
        description: "Early temple visit for a traditional blessing ceremony. Afternoon Balinese meditation workshop and gentle yoga practice."
      },
      {
        day: 4,
        title: "Nature and Healing",
        description: "Morning hike through the stunning Tegalalang rice terraces. Afternoon traditional Balinese healing session with a local healer."
      },
      {
        day: 5,
        title: "Creative Bali",
        description: "Art and culture day with a traditional cooking class and craft workshop. Evening attendance at a Kecak fire dance performance."
      },
      {
        day: 6,
        title: "Transition to the Coast",
        description: "Morning yoga and breakfast. Transfer to your beachfront resort in Seminyak with stops at beautiful temples along the way."
      },
      {
        day: 7,
        title: "Beach Wellness",
        description: "Sunrise beach yoga session. Free day to enjoy your resort's facilities or explore the beaches and shops of stylish Seminyak."
      },
      {
        day: 8,
        title: "Island Adventure",
        description: "Day trip to Nusa Penida island to see the stunning Kelingking Beach, swim in crystal waters, and potentially spot manta rays."
      },
      {
        day: 9,
        title: "Final Relaxation",
        description: "Morning yoga and meditation. Afternoon luxury spa package. Evening farewell dinner on the beach at sunset."
      }
    ],
    departureDate: [
      "2025-03-10",
      "2025-04-14",
      "2025-05-19",
      "2025-09-15",
      "2025-10-13"
    ]
  },
  {
    id: 5,
    title: "Amalfi Coast Escape",
    destination: "Italy",
    description: "Indulge in the glamour and beauty of Italy's most picturesque coastline.",
    longDescription: "Experience la dolce vita on Italy's most enchanting coastline. This carefully curated journey along the Amalfi Coast combines luxury accommodations, exquisite cuisine, and breathtaking scenery. Wander through charming vertical villages, cruise along the azure Mediterranean waters, savor authentic regional dishes, and soak in the Italian sunshine. With the perfect mix of guided experiences and leisure time, this trip epitomizes the relaxed elegance that makes the Amalfi Coast a world-renowned destination.",
    price: 2699,
    duration: 8,
    image: "https://images.pexels.com/photos/4254555/pexels-photo-4254555.jpeg",
    gallery: [
      "https://images.pexels.com/photos/4254555/pexels-photo-4254555.jpeg",
      "https://images.pexels.com/photos/4451569/pexels-photo-4451569.jpeg",
      "https://images.pexels.com/photos/14001314/pexels-photo-14001314.jpeg",
      "https://images.pexels.com/photos/17334157/pexels-photo-17334157/free-photo-of-city-on-cliffs-in-amalfi-coast-italy.jpeg"
    ],
    rating: 4.9,
    reviews: 193,
    highlights: [
      "Private boat tour along the coastline",
      "Limoncello tasting and making class",
      "Pompeii guided experience",
      "Michelin-star dining experience",
      "Path of the Gods hike with panoramic views"
    ],
    included: [
      "8 nights in 4-star accommodations with sea views",
      "Daily breakfast and 5 gourmet dinners",
      "Private transfers throughout",
      "Expert local guides",
      "Cooking class and wine tastings"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Naples & Transfer to Sorrento",
        description: "Welcome to Italy! Private transfer from Naples to your boutique hotel in Sorrento. Evening orientation walk and welcome dinner at a local trattoria."
      },
      {
        day: 2,
        title: "Sorrento Exploration",
        description: "Morning walking tour of charming Sorrento. Afternoon visit to a lemon grove for limoncello tasting and demonstration. Evening at leisure."
      },
      {
        day: 3,
        title: "Capri Day Trip",
        description: "Full-day excursion to the glamorous island of Capri. Visit the Blue Grotto (weather permitting), stroll through Capri Town, and enjoy free time in the picturesque Gardens of Augustus."
      },
      {
        day: 4,
        title: "Pompeii & Transfer to Positano",
        description: "Morning guided tour of the archaeological site of Pompeii. Afternoon transfer to Positano with time to settle into your new hotel and explore this vertical town."
      },
      {
        day: 5,
        title: "Positano & Cooking Experience",
        description: "Morning at leisure to enjoy the beaches of Positano. Afternoon cooking class learning to prepare traditional dishes of the Amalfi Coast."
      },
      {
        day: 6,
        title: "Amalfi & Ravello",
        description: "Visit the historic town of Amalfi, with its impressive Duomo. Continue to hilltop Ravello to explore Villa Rufolo and its magnificent gardens with spectacular coastal views."
      },
      {
        day: 7,
        title: "Boat Tour & Beach Day",
        description: "Private boat excursion along the Amalfi Coast, with swimming stops at secluded coves and grottos. Afternoon at leisure for shopping or relaxation."
      },
      {
        day: 8,
        title: "Path of the Gods Hike",
        description: "Morning guided hike along the famous 'Path of the Gods' trail with breathtaking panoramic views. Afternoon at leisure. Evening farewell dinner at a Michelin-starred restaurant."
      }
    ],
    departureDate: [
      "2025-05-24",
      "2025-06-14",
      "2025-07-19",
      "2025-09-06",
      "2025-10-04"
    ]
  }
];