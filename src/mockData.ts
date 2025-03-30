import { Property } from './types';

// Helper function to generate random coordinates within a 10-mile radius of Tashkent
const generateRandomCoordinates = (latitude: number, longitude: number, radiusInMiles: number) => {
  const radiusInKm = radiusInMiles * 1.60934;
  const randomAngle = Math.random() * 2 * Math.PI;
  const randomRadius = Math.random() * radiusInKm;
  const deltaLat = randomRadius * Math.cos(randomAngle) / 110.574;
  const deltaLng = randomRadius * Math.sin(randomAngle) / (111.32 * Math.cos(latitude * (Math.PI / 180)));
  return [latitude + deltaLat, longitude + deltaLng];
};

const tashkentCoordinates = [41.3111, 69.2797]; // Tashkent center coordinates

export const mockProperties: Property[] = [
  {
    id: 'property-1',
    title: 'Luxury Villa',
    address: '123 Elm St, Tashkent',
    price: 1200000,
    currency: 'USD', // Explicitly set to "USD"
    bedrooms: 4,
    bathrooms: 2,
    area_sqm: 250,
    latitude: 41.3032,
    longitude: 69.2598,
    image_url: '/saltanat/property_1.webp',
    description: 'Beautifully updated 4-bedroom home with modern finishes, spacious living areas, and a large backyard.',
    priceHistory: [
      { date: '2023-01-01', price: 1150000 },
      { date: '2022-01-01', price: 1100000 },
      { date: '2021-01-01', price: 1050000 },
    ],
    weatherRisk: {
      flood: 'Low', // Explicitly set to match the type
      earthquake: 'Moderate', // Explicitly set to match the type
      fire: 'Low', // Explicitly set to match the type
    },
  },
  {
    id: 'property-2',
    title: 'Modern Apartment',
    address: '456 Oak St, Tashkent',
    price: 850000,
    currency: 'USD', // Explicitly set to "USD"
    bedrooms: 3,
    bathrooms: 2,
    area_sqm: 180,
    latitude: 41.3045,
    longitude: 69.2601,
    image_url: '/saltanat/property_2.webp',
    description: 'A stunning apartment with breathtaking views, modern amenities, and a prime location.',
    priceHistory: [
      { date: '2023-01-01', price: 830000 },
      { date: '2022-01-01', price: 800000 },
      { date: '2021-01-01', price: 780000 },
    ],
    weatherRisk: {
      flood: 'Low', // Explicitly set to match the type
      earthquake: 'High', // Explicitly set to match the type
      fire: 'Moderate', // Explicitly set to match the type
    },
  },
  ...Array.from({ length: 38 }, (_, i) => {
    const [latitude, longitude] = generateRandomCoordinates(tashkentCoordinates[0], tashkentCoordinates[1], 10);
    return {
      id: `property-${i + 3}`,
      title: `Property ${i + 3}`,
      address: `Random Address ${i + 3}, Tashkent`,
      price: Math.floor(Math.random() * 100000 + 50000),
      currency: 'USD', // Explicitly set to "USD"
      bedrooms: Math.floor(Math.random() * 5 + 1),
      bathrooms: Math.floor(Math.random() * 3 + 1),
      area_sqm: Math.floor(Math.random() * 200 + 50),
      latitude,
      longitude,
      image_url: `/saltanat/property_${(i % 2) + 1}.webp`,
      description: `This is a description for Property ${i + 3}. It is located in Tashkent and has modern amenities.`,
      priceHistory: [
        { date: '2023-01-01', price: Math.floor(Math.random() * 100000 + 50000) },
        { date: '2022-01-01', price: Math.floor(Math.random() * 100000 + 50000) },
        { date: '2021-01-01', price: Math.floor(Math.random() * 100000 + 50000) },
      ],
      weatherRisk: {
        flood: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)] as 'Low' | 'Moderate' | 'High',
        earthquake: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)] as 'Low' | 'Moderate' | 'High',
        fire: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)] as 'Low' | 'Moderate' | 'High',
      },
    };
  }),
];