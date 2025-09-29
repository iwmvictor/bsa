const car1 =
  "https://framerusercontent.com/images/c0d1tPc4NUzpuMousOKRtI3LSz0.jpg";
const car1a =
  "https://framerusercontent.com/images/rio3RnkqkLRBwpHqBw2SCKcvnXk.jpg";
const car1b =
  "https://framerusercontent.com/images/DffJgQUxFJVttG3k84M16nwmgQk.jpg";
const car1c =
  "https://framerusercontent.com/images/ifsWzeUejfgH9tmuwGUA1m3sjo.jpg";

const camry1 =
  "https://hips.hearstapps.com/hmg-prod/images/2025-toyota-camry-xse-awd-123-66993cc94cc40.jpg";
const camry1a =
  "https://carisoko.s3.amazonaws.com/uploads/picture/url/130846/big_with_watermark_toyota-camry-rwanda-kigali-17245.jpg";
const camry1b =
  "https://hips.hearstapps.com/hmg-prod/images/2025-toyota-camry-xse-awd-174-66993cc93fe38.jpg";
const camry1c =
  "https://hips.hearstapps.com/hmg-prod/images/2025-toyota-camry-xse-awd-233-66993ccfaeabb.jpg";
const camry1d =
  "https://hips.hearstapps.com/hmg-prod/images/2025-toyota-camry-xse-awd-201-66993ccd0bf23.jpg";

const benz1 =
  "https://hips.hearstapps.com/hmg-prod/images/2022-mercedes-benz-c300-4matic-sedan-110-1655383528.jpg";
const benz1a = "https://autogiz.com/product_images/webp/C-300-Sedan_1.webp";
const benz1ab =
  "https://carisoko.s3.amazonaws.com/uploads/picture/url/123221/big_with_watermark_mercedes-benz-c-class-rwanda-kigali-15395.jpg";

const ford1 =
  "https://cdn.dealeraccelerate.com/adrenalin/1/3331/90125/790x1024/2023-ford-explorer-xlt";
const ford1a =
  "https://zimcompass.ap-south-1.linodeobjects.com/zimcompass-product_351d638758736695487683.jpg";
const ford1b =
  "https://zimcompass.ap-south-1.linodeobjects.com/zimcompass-product_1510638775977539824590.jpg";
const ford1c =
  "https://zimcompass.ap-south-1.linodeobjects.com/zimcompass-product_3b56638621412390593281.jpg";

export const showroom = [
  {
    id: 1,
    isactive: true,
    title: "Lexus RX 450",
    brand: "Lexus",
    model: "RX 450",
    rentalAmount: 190000,
    rentalDuration: 1,

    carInfo: {
      year: 2014,
      mileage: 120000,
      fuel: "Hybrid",
      body: "SUV",
      seats: 4,
      transmission: "Automatic",
      color: "Black",
    },

    overview: `
    <p>Introducing the <i>2014 Lexus RX 450</i>, a luxury SUV that combines elegance, performance, and reliability. With its sleek design and spacious interior, this vehicle offers a comfortable and refined driving experience for both driver and passengers.</p>
    <p>Under the hood, the <i>RX 450</i> is powered by a potent yet fuel-efficient hybrid powertrain, delivering impressive performance while also reducing emissions. Whether cruising on the highway or navigating city streets, this SUV offers smooth and responsive handling in any driving situation.</p>
    <p>Step inside the meticulously crafted interior, where luxury meets functionality. The RX 450 boasts premium materials, ergonomic design, and advanced technology features, providing a comfortable and connected driving experience for all occupants.</p>
    <p>Equipped with a range of safety features and driver assistance systems, the RX 450 offers peace of mind on every journey. From its comprehensive airbag system to its available adaptive cruise control, this SUV prioritizes safety and security for all occupants.</p>
    <p>Experience the perfect blend of luxury and performance with the 2014 Lexus RX 450, where sophistication meets versatility in the most captivating way possible.</p>
    `,

    features: [
      "Dual-zone automatic climate control",
      "Navigation system",
      "Bluetooth connectivity",
      "Power liftgate",
      "Automatic xenon headlights with LED daytime running lights",
      "Lexus display audio system with touchscreen display",
    ],

    bookedDates: [
      { from: "2025-10-01", to: "2025-10-05" },
      { from: "2025-09-21", to: "2025-09-30" },
    ],

    gallery: [car1, car1a, car1b, car1c],

    insuranceIncluded: true,
    reviews: [
      {
        pic: "/images/users/user1.jpg",
        name: "Amaka Obi",
        message:
          "The Lexus RX 450 was an absolute dream to drive. Very clean, smooth, and well-maintained. Would definitely rent again!",
        stars: 5,
      },
      {
        pic: "/images/users/user2.jpg",
        name: "Tunde Adewale",
        message:
          "Great experience overall. The car was fuel efficient and perfect for city driving. Pickup and return process was hassle-free.",
        stars: 4,
      },
      {
        pic: "/images/users/user3.jpg",
        name: "Sarah Johnson",
        message:
          "Loved the hybrid feature! Super quiet and economical. Interior was very comfortable for long trips.",
        stars: 5,
      },
      {
        pic: "/images/users/user4.jpg",
        name: "Chinedu Eze",
        message:
          "The car was decent but had some minor scratches. Still drove fine. Customer service was excellent though.",
        stars: 3,
      },
      {
        pic: "/images/users/user5.jpg",
        name: "Fatima Bello",
        message:
          "Luxury and comfort in one ride. Very clean interior and powerful performance. Highly recommended for business trips.",
        stars: 5,
      },
    ],
    tags: [
      "luxury",
      "elegant",
      "hybrid",
      "suv",
      "automatic",
      "black",
      "comfortable",
      "family",
      "reliable",
    ],

    featured: true,
  },

  {
    id: 2,
    isactive: true,
    title: "Toyota Camry XLE",
    brand: "Toyota",
    model: "Camry XLE",
    rentalAmount: 85000,
    rentalDuration: 1,
    carInfo: {
      year: 2018,
      mileage: 90000,
      fuel: "Petrol",
      body: "Sedan",
      seats: 5,
      transmission: "Automatic",
      color: "Silver",
    },
    overview: `<p>Reliable and fuel-efficient, the Toyota Camry XLE is the perfect sedan for city commutes and road trips. With spacious interiors and modern tech features, it's comfort all the way.</p>`,
    features: [
      "Leather seats",
      "Rearview camera",
      "Bluetooth audio",
      "Touchscreen infotainment",
      "Adaptive cruise control",
    ],
    bookedDates: [],
    gallery: [camry1, camry1a, camry1b, camry1c, camry1d],
    insuranceIncluded: true,
    reviews: [
      {
        pic: "/images/users/user6.jpg",
        name: "Michael Uzo",
        message:
          "Smooth drive and very clean. Good on fuel. Highly recommend for city use.",
        stars: 4,
      },
    ],
    tags: [
      "sedan",
      "reliable",
      "fuel-efficient",
      "automatic",
      "toyota",
      "mid-size",
      "silver",
    ],

    featured: true,
  },

  {
    id: 3,
    isactive: true,
    title: "Mercedes-Benz C300",
    brand: "Mercedes-Benz",
    model: "C300",
    rentalAmount: 220000,
    rentalDuration: 1,
    carInfo: {
      year: 2020,
      mileage: 45000,
      fuel: "Petrol",
      body: "Sedan",
      seats: 5,
      transmission: "Automatic",
      color: "White",
    },
    overview: `<p>Classy and powerful, the C300 brings luxury and performance together. It's perfect for corporate events or weekend getaways in style.</p>`,
    features: [
      "Panoramic sunroof",
      "Apple CarPlay / Android Auto",
      "Heated seats",
      "Navigation system",
      "LED headlights",
    ],
    bookedDates: [],
    gallery: [benz1, benz1a, benz1ab],
    insuranceIncluded: true,
    reviews: [
      {
        pic: "/images/users/user7.jpg",
        name: "Ngozi Peters",
        message: "Felt like royalty in this car. Everything top-notch.",
        stars: 5,
      },
    ],
    tags: [
      "luxury",
      "sedan",
      "white",
      "mercedes",
      "premium",
      "executive",
      "automatic",
    ],

    featured: true,
  },

  {
    id: 4,
    isactive: true,
    title: "Ford Explorer XLT",
    brand: "Ford",
    model: "Explorer XLT",
    rentalAmount: 175000,
    rentalDuration: 1,
    carInfo: {
      year: 2017,
      mileage: 110000,
      fuel: "Petrol",
      body: "SUV",
      seats: 7,
      transmission: "Automatic",
      color: "Blue",
    },
    overview: `<p>A spacious 7-seater SUV ideal for family road trips. Great handling and lots of cargo space make it a reliable adventure companion.</p>`,
    features: [
      "3rd row seats",
      "Rear climate control",
      "Backup camera",
      "Alloy wheels",
      "Bluetooth",
    ],
    bookedDates: [],
    gallery: [ford1, ford1a, ford1b, ford1c],
    insuranceIncluded: true,
    reviews: [
      {
        pic: "/images/users/user8.jpg",
        name: "David Essien",
        message:
          "Perfect for our family trip to Obudu. Enough space and comfort.",
        stars: 5,
      },
    ],
    tags: [
      "family",
      "suv",
      "ford",
      "blue",
      "7-seater",
      "road-trip",
      "automatic",
    ],

    featured: false,
  },

  {
    id: 5,
    isactive: true,
    title: "Honda Accord Sport",
    brand: "Honda",
    model: "Accord Sport",
    rentalAmount: 95000,
    rentalDuration: 1,
    carInfo: {
      year: 2019,
      mileage: 70000,
      fuel: "Petrol",
      body: "Sedan",
      seats: 5,
      transmission: "Automatic",
      color: "Red",
    },
    overview: `<p>Sleek and sporty, the Accord Sport is great for daily drives and weekend fun. Known for reliability and fuel economy.</p>`,
    features: [
      "Sport seats",
      "Alloy wheels",
      "Backup camera",
      "Lane keep assist",
      "Push-button start",
    ],
    bookedDates: [],
    gallery: [
      "https://di-uploads-pod21.dealerinspire.com/performancehondafairfield/uploads/2022/07/Honda-Accord-feature-overview-fairfield-oh-500x409.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/2023_Honda_Accord_LX%2C_front_left%2C_07-13-2023.jpg/500px-2023_Honda_Accord_LX%2C_front_left%2C_07-13-2023.jpg",
    ],
    insuranceIncluded: true,
    reviews: [],
    tags: [
      "sedan",
      "sport",
      "honda",
      "fuel-efficient",
      "red",
      "reliable",
      "automatic",
    ],

    featured: true,
  },

  {
    id: 6,
    isactive: true,
    title: "Range Rover Evoque",
    brand: "Range Rover",
    model: "Evoque",
    rentalAmount: 250000,
    rentalDuration: 1,
    carInfo: {
      year: 2021,
      mileage: 30000,
      fuel: "Diesel",
      body: "SUV",
      seats: 5,
      transmission: "Automatic",
      color: "White",
    },
    overview: `<p>Stylish and powerful, the Evoque makes a bold statement. Premium interior and advanced tech make it an elite choice.</p>`,
    features: [
      "Meridian sound system",
      "360° camera",
      "Leather interior",
      "Keyless entry",
      "Terrain response system",
    ],
    bookedDates: [],
    gallery: [
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRcyZmh8gvUUj9WT0dClc-bGOMcLcdDNYhd5Ma2wijYVKz9KoDkXHjQtgf-yi9fynT3ddj4uiTGRoI2mNzOToiu-Uhsg76273fksRGDFfRZ",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvoTSAcsWIyYfd0PlxpMFSccl9TMrmVrCrnKQOqx02uhE7KGWWVoFJzEJLB7Tlji7IE-2prXKNKcD5yTDqTfI05dx8qcUaWP80w-4aDw",
    ],
    insuranceIncluded: true,
    reviews: [
      {
        pic: "/images/users/user9.jpg",
        name: "Kelvin Bassey",
        message:
          "Very classy. Got a lot of compliments while driving. Worth every naira.",
        stars: 5,
      },
    ],
    tags: [
      "luxury",
      "suv",
      "range-rover",
      "diesel",
      "white",
      "premium",
      "automatic",
    ],

    featured: true,
  },

  {
    id: 7,
    isactive: true,
    title: "Kia Rio Hatchback",
    brand: "Kia",
    model: "Rio",
    rentalAmount: 45000,
    rentalDuration: 1,
    carInfo: {
      year: 2016,
      mileage: 95000,
      fuel: "Petrol",
      body: "Hatchback",
      seats: 5,
      transmission: "Manual",
      color: "Blue",
    },
    overview: `<p>A budget-friendly compact car that's easy to drive and park. Ideal for solo travelers or short-term city use.</p>`,
    features: [
      "Air conditioning",
      "USB audio input",
      "Foldable rear seats",
      "Power windows",
      "Manual transmission",
    ],
    bookedDates: [],
    gallery: [
      "https://scontent-ams2-1.cdninstagram.com/v/t51.29350-15/292553336_719041805987304_7931554228495276754_n.jpg",
      "https://scontent-ams4-1.cdninstagram.com/v/t51.29350-15/292088350_1212902289473078_1935361175188275435_n.jpg",
    ],
    insuranceIncluded: true,
    reviews: [],
    tags: [
      "budget",
      "compact",
      "hatchback",
      "kia",
      "manual",
      "blue",
      "city-car",
    ],

    featured: false,
  },
];

const carBrands = {
  lexus: "https://www.carlogos.org/car-logos/lexus-logo.png",
  toyota: "https://www.carlogos.org/car-logos/toyota-logo.png",
  tesla: "https://www.carlogos.org/car-logos/tesla-logo.png",
  bmw: "https://www.carlogos.org/car-logos/bmw-logo.png",
  hyundai: "https://www.carlogos.org/car-logos/hyundai-logo.png",
  nissan: "https://www.carlogos.org/car-logos/nissan-logo.png",
  benz: "https://www.carlogos.org/car-logos/mercedes-benz-logo.png",
  volkswagen: "https://www.carlogos.org/car-logos/volkswagen-logo.png",
  ford: "https://www.carlogos.org/car-logos/ford-logo.png",
  honda: "https://www.carlogos.org/car-logos/honda-logo.png",
  mitsubishi: "https://www.carlogos.org/car-logos/mitsubishi-logo.png",
  kia: "https://www.carlogos.org/car-logos/kia-logo.png",
  range: "https://www.carlogos.org/car-logos/rover-logo.png",
};

const brandAliases = {
  mercedesbenz: "benz",
  mercedes: "benz",
  merc: "benz",
  rangerover: "rangerover",
  rangerover: "range",
};

export function getBrandLogo(brand) {
  if (!brand) return null;

  // Normalize brand input: lowercase, remove non-alphanumerics
  const normalized = brand
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/gi, "");

  // First, check if normalized brand directly exists in carBrands
  if (carBrands[normalized]) {
    return carBrands[normalized];
  }

  // Otherwise, check aliases
  const aliasKey = brandAliases[normalized];
  return aliasKey ? carBrands[aliasKey] || null : null;
}

// Example usage:
const lexusLogo = getBrandLogo(showroom[0].brand); // returns Lexus logo URL

export function generateSlug(car) {
  return `${car.brand}-${car.model}-${car.carInfo.year}`
    .toLowerCase()
    .replace(/\s+/g, "-");
}

export function priceFormat(amount) {
  return amount.toLocaleString("en-NG"); // or 'en-US' if you prefer
}

export function isBookedToday(bookedDates) {
  const today = new Date();

  return bookedDates.some((range) => {
    const from = new Date(range.from);
    const to = new Date(range.to);

    // Normalize times for comparison
    from.setHours(0, 0, 0, 0);
    to.setHours(23, 59, 59, 999);

    return today >= from && today <= to;
  });
}
