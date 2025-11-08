import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('filters trips by destination using FilterSidebar', () => {
    render(
      <MemoryRouter>
        <CurrencyProvider>
          <TripsPage />
        </CurrencyProvider>
      </MemoryRouter>
    );

    // Three selects in sidebar: destination, duration, price
    const selects = screen.getAllByRole('combobox');
    // Change destination to Japan
    fireEvent.change(selects[0], { target: { value: 'Japan' } });

    const exploreLinks = screen.getAllByRole('link', { name: 'Explorer' });
    expect(exploreLinks).toHaveLength(1);
  });
});