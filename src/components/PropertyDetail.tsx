import React from 'react';
import { Property } from '../types';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface PropertyDetailProps {
  property: Property;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  // Helper to format currency
  const formatPrice = (price: number, currency: string) => {
    try {
      const locale = currency === 'UZS' ? 'uz-UZ' : 'en-US';
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        maximumFractionDigits: 0,
      }).format(price);
    } catch (e) {
      return `${price.toLocaleString()} ${currency}`;
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    pauseOnHover: false,
    swipe: true,
    dotsClass: "slick-dots custom-dots",
  };

  // Use either 1 or 2 based on the property ID being odd or even
  const baseImageNumber = Number(property.id.split('-')[1]) % 2 === 0 ? 2 : 1;
  const images = Array.from({ length: 4 }, (_, i) => 
    `/saltanat/assets/images/property_${baseImageNumber}_${i + 1}.webp`
  );

  return (
    <div
      className="flex flex-col h-full bg-dark-card rounded-t-2xl shadow-lg overflow-y-auto"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <div className="relative h-64">
        <div className="h-full">
          <Slider {...sliderSettings} className="h-full">
            {images.map((imageUrl, index) => (
              <div key={`${property.id}-${index}`} className="h-64">
                <img
                  src={imageUrl}
                  alt={`${property.title} - View ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="absolute top-4 left-4 z-10 bg-dark-accent text-dark-text px-3 py-1 rounded-lg text-sm">
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