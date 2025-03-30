import React from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Property } from '../types';

// Custom white marker icon
const WhiteIcon = L.icon({
  iconUrl: '/saltanat/white-pin.svg', // Use a white pin icon
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapComponentProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  selectedPropertyId?: string | null;
}

// Component to fly map view to selected marker smoothly
const ChangeView: React.FC<{ center: L.LatLngExpression; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  map.flyTo(center, zoom, {
    animate: true,
    duration: 0.8, // Adjust duration as needed
  });
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ properties, onSelectProperty, selectedPropertyId }) => {
  const userLocation: L.LatLngExpression = [41.3022, 69.2578]; // Default location (Tashkent)
  const initialZoom = 12;

  // Helper to format numbers as shortened values (e.g., 32,000 -> 32k)
  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `${Math.round(price / 1000)}k`;
    }
    return price.toString();
  };

  // Helper to create a custom DivIcon
  const createCustomIcon = (price: number) => {
    return L.divIcon({
      className: 'custom-marker', // Custom class for styling
      html: `
        <div class="flex items-center justify-center bg-purple-600 text-white rounded-full px-1 py-0.5 shadow-md">
          <img src="/saltanat/home-icon.svg" alt="Home Icon" class="w-2.5 h-2.5 mr-1" style="filter: invert(1);" />
          <span class="text-xs font-bold">${formatPrice(price)}</span>
        </div>
      `,
      iconSize: [50, 20], // Smaller size for the marker
      iconAnchor: [25, 10], // Center the icon
    });
  };

  return (
    <MapContainer
      center={userLocation}
      zoom={initialZoom}
      scrollWheelZoom={true}
      zoomControl={false} // Disable the default zoom control
      attributionControl={false} // Disable the attribution control
      style={{ height: '100%', width: '100%' }}
      className="z-0 rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" // Dark-themed tile layer
      />
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={[property.latitude, property.longitude]}
          icon={createCustomIcon(property.price)} // Use the custom DivIcon
          eventHandlers={{
            click: () => {
              onSelectProperty(property); // Open details view directly
            },
          }}
        />
      ))}
    </MapContainer>
  );
};

export default MapComponent;