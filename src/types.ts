export interface Property {
  id: string;
  title: string;
  address: string;
  price: number; // Use Uzbekistani Som (UZS) or USD
  currency: 'UZS' | 'USD';
  bedrooms: number;
  bathrooms: number;
  area_sqm: number;
  latitude: number;
  longitude: number;
  image_url: string; // URL to a representative image
  description: string;
}