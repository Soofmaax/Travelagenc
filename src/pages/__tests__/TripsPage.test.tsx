import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TripsPage from '../TripsPage';
import { CurrencyProvider } from '../../hooks/CurrencyProvider';
import { trips } from '../../data/trips';

describe('TripsPage', () => {
  it('renders hero, filters and all trips initially', () => {
    render(
      <MemoryRouter>
        <CurrencyProvider>
          <TripsPage />
        </CurrencyProvider>
      </MemoryRouter>
    );

    // Hero title
    expect(screen.getByText(/Explore Our Destinations/)).toBeInTheDocument();

    // Initially should render all trips in grid
    const exploreLinks = screen.getAllByRole('link', { name: 'Explorer' });
    expect(exploreLinks).toHaveLength(trips.length);
  });

  it('filters trips by destination using FilterSidebar', async () => {
    render(
      <MemoryRouter>
        <CurrencyProvider>
          <TripsPage />
        </CurrencyProvider>
      </MemoryRouter>
    );

    // Target the Destination select via its unique "All Destinations" option
    const allDestOption = screen.getByRole('option', { name: 'All Destinations' });
    const destinationSelect = allDestOption.parentElement as HTMLSelectElement;

    // Change destination to Japan
    fireEvent.change(destinationSelect, { target: { value: 'Japan' } });

    await waitFor(() => {
      const exploreLinks = screen.getAllByRole('link', { name: 'Explorer' });
      expect(exploreLinks).toHaveLength(1);
    });
  });
});