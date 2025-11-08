import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TripsGrid from '../TripsGrid';
import { CurrencyProvider } from '../../hooks/CurrencyProvider';
import type { Trip } from '../../data/trips';

const trips: Trip[] = [
  {
    id: 1,
    title: 'Paris Delights',
    destination: 'France',
    description: 'Romantic getaway',
    longDescription: 'long',
    price: 1800,
    duration: 5,
    image: '',
    gallery: [],
    rating: 4.5,
    reviews: 12,
    highlights: [],
    included: [],
    itinerary: [],
    departureDate: [],
  },
  {
    id: 2,
    title: 'Tokyo Adventure',
    destination: 'Japan',
    description: 'City lights and culture',
    longDescription: 'long',
    price: 2500,
    duration: 10,
    image: '',
    gallery: [],
    rating: 4.8,
    reviews: 22,
    highlights: [],
    included: [],
    itinerary: [],
    departureDate: [],
  },
];

describe('TripsGrid', () => {
  it('renders TripCard items when trips are provided', () => {
    render(
      <MemoryRouter>
        <CurrencyProvider>
          <TripsGrid trips={trips} onResetFilters={() => {}} />
        </CurrencyProvider>
      </MemoryRouter>
    );

    const exploreLinks = screen.getAllByRole('link', { name: 'Explorer' });
    expect(exploreLinks).toHaveLength(trips.length);
  });

  it('renders empty state and triggers reset', () => {
    const onReset = vi.fn();

    render(
      <MemoryRouter>
        <CurrencyProvider>
          <TripsGrid trips={[]} onResetFilters={onReset} />
        </CurrencyProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/No trips found/)).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /Reset All Filters/ });
    fireEvent.click(btn);
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});