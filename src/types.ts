export interface PriceHistoryEntry {
  date: string;
  price: number;
}

export interface WeatherRisk {
  flood: 'Low' | 'Moderate' | 'High';
  earthquake: 'Low' | 'Moderate' | 'High';
  fire: 'Low' | 'Moderate' | 'High';
}

export interface Property {
  id: string;
  title: string;
  address: string;
  price: number; // Use Uzbekistani Som (UZS) or USD
  currency: string;
  bedrooms: number;
  bathrooms: number;
  area_sqm: number;
  latitude: number;
  longitude: number;
  image_url: string; // URL to a representative image
  description: string;
  priceHistory?: PriceHistoryEntry[]; // Optional price history
  weatherRisk?: WeatherRisk; // Optional weather risk factors
}