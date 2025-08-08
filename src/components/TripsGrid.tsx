import React from 'react';
import TripCard from './TripCard';
import { Trip } from '../data/trips';

interface TripsGridProps {
  trips: Trip[];
  onResetFilters: () => void;
}

/**
 * Trips grid component that displays a list of trips or empty state
 */
const TripsGrid: React.FC<TripsGridProps> = ({ trips, onResetFilters }) => {
  if (trips.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <h3 className="font-serif text-xl font-semibold mb-3">No trips found</h3>
        <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
        <button 
          onClick={onResetFilters} 
          className="btn-primary"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
};

export default TripsGrid;