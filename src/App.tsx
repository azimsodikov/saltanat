import React, { useState } from 'react';
import MapComponent from './components/MapComponent';
import PropertyDetail from './components/PropertyDetail';
import { Property } from './types';
import { mockProperties } from './mockData';

function App() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isListView, setIsListView] = useState(false); // Toggle between map and list view

  const handleSelectProperty = (property: Property | null) => {
    setSelectedProperty(property);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSwipeDown = () => {
    setSelectedProperty(null); // Close details view
  };

  const filteredProperties = mockProperties.filter(
    (property) =>
      property.title.toLowerCase().includes(searchQuery) ||
      property.address.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-dark text-dark-text">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <input
          type="text"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 rounded-lg shadow-md bg-dark-card text-dark-text placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-dark-accent"
        />
      </div>

      {/* Map or List View */}
      <div className="flex-1 relative">
        {isListView ? (
          <div className="absolute inset-0 overflow-y-auto p-4 space-y-4">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-dark-card p-4 rounded-lg shadow-md cursor-pointer flex items-center space-x-4"
                onClick={() => {
                  handleSelectProperty(property);
                  setIsListView(false); // Switch back to map view
                }}
              >
                <img
                  src={property.image_url}
                  alt={`Image of ${property.title}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-bold">{property.title}</h3>
                  <p className="text-sm text-gray-400">{property.address}</p>
                  <p className="text-sm text-dark-accent font-semibold">
                    ${property.price.toLocaleString()} - {property.bedrooms} Beds, {property.bathrooms} Baths
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <MapComponent
            properties={filteredProperties}
            onSelectProperty={(property) => {
              handleSelectProperty(property);
              setIsListView(false); // Ensure map remains active
            }}
            selectedPropertyId={selectedProperty?.id}
          />
        )}
      </div>

      {/* Toggle Button for List/Map View */}
      <button
        onClick={() => {
          setIsListView(!isListView);
          setSelectedProperty(null); // Close details view when switching views
        }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-dark-card text-dark-text p-3 rounded-full shadow-md z-20 flex items-center justify-center"
      >
        <img
          src={isListView ? '/saltanat/map-icon.svg' : '/saltanat/list-icon.svg'}
          alt={isListView ? 'Map View' : 'List View'}
          className="w-6 h-6 filter invert" // Apply filter to make icons white
        />
      </button>

      {/* Sliding Panel for Property Details */}
      <div
        className={`fixed bottom-0 left-0 right-0 top-24 bg-dark-card shadow-lg rounded-t-2xl transition-transform duration-300 ${
          selectedProperty ? 'translate-y-0' : 'translate-y-full'
        }`}
        onTouchStart={(e) => {
          const startY = e.touches[0].clientY;
          e.currentTarget.ontouchmove = (moveEvent) => {
            const endY = moveEvent.touches[0].clientY;
            if (endY - startY > 50) {
              handleSwipeDown();
              e.currentTarget.ontouchmove = null; // Remove listener after swipe
            }
          };
        }}
      >
        {selectedProperty ? (
          <PropertyDetail property={selectedProperty} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Select a property to view details.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;