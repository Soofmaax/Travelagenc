import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TripCard from '../TripCard';
import { CurrencyProvider } from '../../hooks/CurrencyProvider';
import type { Trip } from '../../data/trips';

const mockTrip: Trip = {
  id: 99,
  title: 'Kyoto Discovery',
  destination: 'Japan',
  description: 'Explore temples and tea houses',
  longDescription: 'long',
  price: 2300,
  duration: 8,
  image: 'https://example.com/kyoto.jpg',
  gallery: [],
  rating: 4.7,
  reviews: 20,
  highlights: [],
  included: [],
  itinerary: [],
  departureDate: [],
};

describe('TripCard', () => {
  it('renders trip details and formats price with EUR by default', () => {
    render(
      <MemoryRouter>
        <CurrencyProvider>
          <TripCard trip={mockTrip} />
        </CurrencyProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Kyoto Discovery/)).toBeInTheDocument();
    expect(screen.getByText(/Japan/)).toBeInTheDocument();
    expect(screen.getByText(/8 jours/)).toBeInTheDocument();

    // Price should contain the Euro symbol by default via CurrencyProvider
    const priceEl = screen.getByText(/\/personne/).previousSibling as HTMLElement;
    expect(priceEl.textContent).toContain('€');

    const link = screen.getByRole('link', { name: 'Explorer' }) as HTMLAnchorElement;
    expect(link.href).toMatch(/\/trips\/99$/);
  });
});