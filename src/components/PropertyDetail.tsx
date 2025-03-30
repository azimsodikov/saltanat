import React from 'react';
import { Property } from '../types';

interface PropertyDetailProps {
  property: Property;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {

  // Helper to format currency
  const formatPrice = (price: number, currency: string) => {
    try {
        // Use 'uz-UZ' locale for potential Som formatting if supported, fallback to 'en-US'
        const locale = currency === 'UZS' ? 'uz-UZ' : 'en-US';
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0 // Typically don't show cents/tiyin for large property prices
        }).format(price);
    } catch (e) {
        // Fallback for environments without specific locale support
        return `${price.toLocaleString()} ${currency}`;
    }
  }

  return (
    <div
      className="flex flex-col h-full bg-dark-card rounded-t-2xl shadow-lg overflow-y-auto"
      style={{
        scrollbarWidth: 'none', // Hide scrollbar for Firefox
        msOverflowStyle: 'none', // Hide scrollbar for IE/Edge
      }}
    >
      <div className="relative h-64">
        <img
          src={property.image_url}
          alt={`Image of ${property.title}`}
          className="w-full h-full object-cover rounded-t-2xl sticky top-0 z-10"
        />
        <div className="absolute top-4 left-4 bg-dark-accent text-dark-text px-3 py-1 rounded-lg text-sm">
          {formatPrice(property.price, property.currency)}
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{property.title}</h2>
        <p className="text-sm text-gray-400 mb-4">{property.address}</p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <DetailItem label="Bedrooms" value={property.bedrooms.toString()} />
          <DetailItem label="Bathrooms" value={property.bathrooms.toString()} />
          <DetailItem label="Area" value={`${property.area_sqm} m²`} />
        </div>
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-sm mb-6">{property.description}</p>

        {/* Price History */}
        <h3 className="text-lg font-semibold mb-2">Price History</h3>
        <table className="w-full text-sm text-left text-gray-400 mb-6">
          <thead className="text-gray-500 uppercase">
            <tr>
              <th className="py-2">Date</th>
              <th className="py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {property.priceHistory.map((entry, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="py-2">{entry.date}</td>
                <td className="py-2">{formatPrice(entry.price, property.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Weather Risk Factors */}
        <h3 className="text-lg font-semibold mb-2">Weather Risk Factors</h3>
        <div className="space-y-2">
          <p className="text-sm">
            <strong>Flood Risk:</strong> {property.weatherRisk.flood}
          </p>
          <p className="text-sm">
            <strong>Earthquake Risk:</strong> {property.weatherRisk.earthquake}
          </p>
          <p className="text-sm">
            <strong>Fire Risk:</strong> {property.weatherRisk.fire}
          </p>
        </div>
      </div>
    </div>
  );
};

// Small helper component for detail items
const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="text-center">
    <span className="font-semibold text-gray-500 block text-xs uppercase">{label}</span>
    <span className="text-lg font-bold text-dark-text">{value}</span>
  </div>
);

export default PropertyDetail;