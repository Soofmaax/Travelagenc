import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTripsFilter } from '../useTripsFilter';
import type { Trip } from '../../data/trips';

const mockTrips: Trip[] = [
  {
    id: 1,
    title: 'Short Budget Trip',
    destination: 'France',
    description: 'A lovely short trip',
    longDescription: 'long',
    price: 1500,
    duration: 5,
    image: '',
    gallery: [],
    rating: 4.5,
    reviews: 10,
    highlights: [],
    included: [],
    itinerary: [],
    departureDate: [],
  },
  {
    id: 2,
    title: 'Medium Standard Trip',
    destination: 'Japan',
    description: 'Medium length trip',
    longDescription: 'long',
    price: 2300,
    duration: 8,
    image: '',
    gallery: [],
    rating: 4.7,
    reviews: 20,
    highlights: [],
    included: [],
    itinerary: [],
    departureDate: [],
  },
  {
    id: 3,
    title: 'Long Luxury Trip',
    destination: 'Peru',
    description: 'A long trip',
    longDescription: 'long',
    price: 3000,
    duration: 12,
    image: '',
    gallery: [],
    rating: 4.9,
    reviews: 30,
    highlights: [],
    included: [],
    itinerary: [],
    departureDate: [],
  },
];

describe('useTripsFilter', () => {
  it('filters by search term across title, destination, and description', () => {
    const { result, rerender } = renderHook(({ term }) => useTripsFilter({ trips: mockTrips, searchTerm: term }), {
      initialProps: { term: '' },
    });

    // No search: all trips
    expect(result.current.filteredTrips).toHaveLength(3);

    // Search by title
    rerender({ term: 'Short Budget' });
    expect(result.current.filteredTrips).toHaveLength(1);
    expect(result.current.filteredTrips[0].id).toBe(1);

    // Search by destination
    rerender({ term: 'peru' });
    expect(result.current.filteredTrips).toHaveLength(1);
    expect(result.current.filteredTrips[0].id).toBe(3);

    // Search by description
    rerender({ term: 'medium length' });
    expect(result.current.filteredTrips).toHaveLength(1);
    expect(result.current.filteredTrips[0].id).toBe(2);
  });

  it('provides unique destinations', () => {
    const { result } = renderHook(() => useTripsFilter({ trips: mockTrips, searchTerm: '' }));
    expect(result.current.destinations.sort()).toEqual(['France', 'Japan', 'Peru'].sort());
  });

  it('filters by destination', () => {
    const { result } = renderHook(() => useTripsFilter({ trips: mockTrips, searchTerm: '' }));
    act(() => result.current.updateFilter('selectedDestination', 'Japan'));
    expect(result.current.filteredTrips).toHaveLength(1);
    expect(result.current.filteredTrips[0].destination).toBe('Japan');
  });

  it('filters by duration buckets', () => {
    const { result } = renderHook(() => useTripsFilter({ trips: mockTrips, searchTerm: '' }));

    act(() => result.current.updateFilter('selectedDuration', 'short'));
    expect(result.current.filteredTrips.every(t => t.duration <= 7)).toBe(true);

    act(() => result.current.updateFilter('selectedDuration', 'medium'));
    expect(result.current.filteredTrips.every(t => t.duration > 7 && t.duration <= 10)).toBe(true);

    act(() => result.current.updateFilter('selectedDuration', 'long'));
    expect(result.current.filteredTrips.every(t => t.duration > 10)).toBe(true);
  });

  it('filters by price buckets', () => {
    const { result } = renderHook(() => useTripsFilter({ trips: mockTrips, searchTerm: '' }));

    act(() => result.current.updateFilter('selectedPrice', 'budget'));
    expect(result.current.filteredTrips.every(t => t.price < 2000)).toBe(true);

    act(() => result.current.updateFilter('selectedPrice', 'standard'));
    expect(result.current.filteredTrips.every(t => t.price >= 2000 && t.price <= 2500)).toBe(true);

    act(() => result.current.updateFilter('selectedPrice', 'luxury'));
    expect(result.current.filteredTrips.every(t => t.price > 2500)).toBe(true);
  });

  it('resetFilters resets all selections', () => {
    const { result } = renderHook(() => useTripsFilter({ trips: mockTrips, searchTerm: '' }));

    act(() => {
      result.current.updateFilter('selectedDestination', 'France');
      result.current.updateFilter('selectedDuration', 'short');
      result.current.updateFilter('selectedPrice', 'budget');
    });

    expect(result.current.filters).toEqual({
      selectedDestination: 'France',
      selectedDuration: 'short',
      selectedPrice: 'budget',
    });

    act(() => result.current.resetFilters());
    expect(result.current.filters).toEqual({
      selectedDestination: '',
      selectedDuration: '',
      selectedPrice: '',
    });
  });
});