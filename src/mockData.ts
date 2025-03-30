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
    currency: 'USD',
    bedrooms: 4,
    bathrooms: 2,
    area_sqm: 250,
    latitude: 41.3032,
    longitude: 69.2598,
    image_url: '/property_1.webp',
    description: 'Beautifully updated 4-bedroom home with modern finishes, spacious living areas, and a large backyard.',
    priceHistory: [
      { date: '2023-01-01', price: 1150000 },
      { date: '2022-01-01', price: 1100000 },
      { date: '2021-01-01', price: 1050000 },
    ],
    weatherRisk: {
      flood: 'Low',
      earthquake: 'Moderate',
      fire: 'Low',
    },
  },
  {
    id: 'property-2',
    title: 'Modern Apartment',
    address: '456 Oak St, Tashkent',
    price: 850000,
    currency: 'USD',
    bedrooms: 3,
    bathrooms: 2,
    area_sqm: 180,
    latitude: 41.3045,
    longitude: 69.2601,
    image_url: '/property_2.webp',
    description: 'A stunning apartment with breathtaking views, modern amenities, and a prime location.',
    priceHistory: [
      { date: '2023-01-01', price: 830000 },
      { date: '2022-01-01', price: 800000 },
      { date: '2021-01-01', price: 780000 },
    ],
    weatherRisk: {
      flood: 'Low',
      earthquake: 'High',
      fire: 'Moderate',
    },
  },
  ...Array.from({ length: 38 }, (_, i) => {
    const [latitude, longitude] = generateRandomCoordinates(tashkentCoordinates[0], tashkentCoordinates[1], 10);
    return {
      id: `property-${i + 3}`,
      title: `Property ${i + 3}`,
      address: `Random Address ${i + 3}, Tashkent`,
      price: Math.floor(Math.random() * 100000 + 50000), // Random price between 50,000 and 150,000
      currency: 'USD',
      bedrooms: Math.floor(Math.random() * 5 + 1), // Random bedrooms between 1 and 5
      bathrooms: Math.floor(Math.random() * 3 + 1), // Random bathrooms between 1 and 3
      area_sqm: Math.floor(Math.random() * 200 + 50), // Random area between 50 and 250 sqm
      latitude,
      longitude,
      image_url: `/property_${(i % 2) + 1}.webp`, // Alternate between property_1.jpg and property_2.jpg
      description: `This is a description for Property ${i + 3}. It is located in Tashkent and has modern amenities.`,
      priceHistory: [
        { date: '2023-01-01', price: Math.floor(Math.random() * 100000 + 50000) },
        { date: '2022-01-01', price: Math.floor(Math.random() * 100000 + 50000) },
        { date: '2021-01-01', price: Math.floor(Math.random() * 100000 + 50000) },
      ],
      weatherRisk: {
        flood: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)],
        earthquake: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)],
        fire: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)],
      },
    };
  }),
];