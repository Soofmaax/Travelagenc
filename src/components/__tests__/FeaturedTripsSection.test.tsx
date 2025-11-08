import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FeaturedTripsSection from '../FeaturedTripsSection';
import { CurrencyProvider } from '../../hooks/CurrencyProvider';

describe('FeaturedTripsSection', () => {
  it('renders 3 featured TripCard items', () => {
    render(
      <MemoryRouter>
        <CurrencyProvider>
          <FeaturedTripsSection />
        </CurrencyProvider>
      </MemoryRouter>
    );

    const exploreLinks = screen.getAllByRole('link', { name: 'Explorer' });
    expect(exploreLinks).toHaveLength(3);
  });
});