import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
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

    // Multiple selects exist (Hero search bar + sidebar). Target the Destination select by its unique option.
    const selects = screen.getAllByRole('combobox');
    const destinationSelect = selects.find(s => {
      const options = within(s).getAllByRole('option');
      return options.some(o => o.textContent === 'All Destinations');
    }) as HTMLSelectElement;

    // Change destination to Japan
    fireEvent.change(destinationSelect, { target: { value: 'Japan' } });

    const exploreLinks = screen.getAllByRole('link', { name: 'Explorer' });
    expect(exploreLinks).toHaveLength(1);
  });
});