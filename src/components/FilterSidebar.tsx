import React from 'react';
import { MapPin, Calendar, DollarSign } from 'lucide-react';

interface FilterSidebarProps {
  destinations: string[];
  selectedDestination: string;
  selectedDuration: string;
  selectedPrice: string;
  onDestinationChange: (destination: string) => void;
  onDurationChange: (duration: string) => void;
  onPriceChange: (price: string) => void;
  onResetFilters: () => void;
}

/**
 * Filter sidebar component for the trips page
 * Allows users to filter trips by destination, duration, and price
 */
const FilterSidebar: React.FC<FilterSidebarProps> = ({
  destinations,
  selectedDestination,
  selectedDuration,
  selectedPrice,
  onDestinationChange,
  onDurationChange,
  onPriceChange,
  onResetFilters
}) => {
  return (
    <div className="lg:w-1/4">
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
        <h3 className="font-serif text-xl font-semibold mb-6 pb-2 border-b">Filters</h3>
        
        {/* Destination Filter */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <MapPin size={18} className="mr-2 text-blue-900" />
            <h4 className="font-medium">Destination</h4>
          </div>
          <select 
            value={selectedDestination}
            onChange={(e) => onDestinationChange(e.target.value)}
            className="input-field"
          >
            <option value="">All Destinations</option>
            {destinations.map((destination, index) => (
              <option key={index} value={destination}>{destination}</option>
            ))}
          </select>
        </div>
        
        {/* Duration Filter */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Calendar size={18} className="mr-2 text-blue-900" />
            <h4 className="font-medium">Duration</h4>
          </div>
          <select 
            value={selectedDuration}
            onChange={(e) => onDurationChange(e.target.value)}
            className="input-field"
          >
            <option value="">Any Duration</option>
            <option value="short">Short (1-7 days)</option>
            <option value="medium">Medium (8-10 days)</option>
            <option value="long">Long (10+ days)</option>
          </select>
        </div>
        
        {/* Price Filter */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <DollarSign size={18} className="mr-2 text-blue-900" />
            <h4 className="font-medium">Price Range</h4>
          </div>
          <select 
            value={selectedPrice}
            onChange={(e) => onPriceChange(e.target.value)}
            className="input-field"
          >
            <option value="">Any Price</option>
            <option value="budget">Budget (&lt; €2000)</option>
            <option value="standard">Standard (€2000-€2500)</option>
            <option value="luxury">Luxury (&gt; €2500)</option>
          </select>
        </div>
        
        <button 
          onClick={onResetFilters} 
          className="w-full py-2 mt-4 bg-gray-200 hover:bg-gray-300 rounded-md transition"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;