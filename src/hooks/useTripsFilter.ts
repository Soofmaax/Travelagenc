import { useState, useEffect, useMemo } from 'react';
import { Trip } from '../data/trips';

interface UseTripsFilterProps {
  trips: Trip[];
  searchTerm: string;
}

interface FilterState {
  selectedDestination: string;
  selectedDuration: string;
  selectedPrice: string;
}

/**
 * Custom hook for filtering trips based on search term and filter criteria
 */
export const useTripsFilter = ({ trips, searchTerm }: UseTripsFilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    selectedDestination: '',
    selectedDuration: '',
    selectedPrice: ''
  });

  // Get unique destinations for filter dropdown
  const destinations = useMemo(() => 
    Array.from(new Set(trips.map(trip => trip.destination))), 
    [trips]
  );

  // Filter trips based on all criteria
  const filteredTrips = useMemo(() => {
    let results = trips;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(trip => 
        trip.title.toLowerCase().includes(term) || 
        trip.destination.toLowerCase().includes(term) ||
        trip.description.toLowerCase().includes(term)
      );
    }
    
    // Filter by destination
    if (filters.selectedDestination) {
      results = results.filter(trip => trip.destination === filters.selectedDestination);
    }
    
    // Filter by duration
    if (filters.selectedDuration) {
      switch (filters.selectedDuration) {
        case 'short':
          results = results.filter(trip => trip.duration <= 7);
          break;
        case 'medium':
          results = results.filter(trip => trip.duration > 7 && trip.duration <= 10);
          break;
        case 'long':
          results = results.filter(trip => trip.duration > 10);
          break;
      }
    }
    
    // Filter by price
    if (filters.selectedPrice) {
      switch (filters.selectedPrice) {
        case 'budget':
          results = results.filter(trip => trip.price < 2000);
          break;
        case 'standard':
          results = results.filter(trip => trip.price >= 2000 && trip.price <= 2500);
          break;
        case 'luxury':
          results = results.filter(trip => trip.price > 2500);
          break;
      }
    }
    
    return results;
  }, [trips, searchTerm, filters]);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      selectedDestination: '',
      selectedDuration: '',
      selectedPrice: ''
    });
  };

  return {
    filteredTrips,
    destinations,
    filters,
    updateFilter,
    resetFilters
  };
};