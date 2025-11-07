import React, { useState } from 'react';
import { trips } from '../data/trips';
import HeroSection from '../components/HeroSection';
import FilterSidebar from '../components/FilterSidebar';
import TripsGrid from '../components/TripsGrid';
import { useTripsFilter } from '../hooks/useTripsFilter';

/**
 * TripsPage component - Displays all available trips with filtering capabilities
 * Users can search and filter trips by destination, duration, and price
 */
const TripsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const { filteredTrips, destinations, filters, updateFilter, resetFilters } = useTripsFilter({
    trips,
    searchTerm,
  });

  return (
    <div>
      <HeroSection
        title="Explore Our Destinations"
        subtitle="Discover our carefully curated selection of extraordinary journeys around the world"
        showSearchBar={true}
        onSearch={handleSearch}
      />

      <section className="section bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            <FilterSidebar
              destinations={destinations}
              selectedDestination={filters.selectedDestination}
              selectedDuration={filters.selectedDuration}
              selectedPrice={filters.selectedPrice}
              onDestinationChange={value => updateFilter('selectedDestination', value)}
              onDurationChange={value => updateFilter('selectedDuration', value)}
              onPriceChange={value => updateFilter('selectedPrice', value)}
              onResetFilters={resetFilters}
            />

            <div className="lg:w-3/4">
              <TripsGrid trips={filteredTrips} onResetFilters={resetFilters} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TripsPage;