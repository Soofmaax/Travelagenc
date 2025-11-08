import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeroSection from '../HeroSection';

describe('HeroSection (with search bar)', () => {
  it('renders booking search bar when showSearchBar is true', () => {
    const onSearch = () => {};
    render(
      <MemoryRouter>
        <HeroSection
          title="Explore Our Destinations"
          subtitle="Discover our carefully curated selection"
          showSearchBar={true}
          onSearch={onSearch}
        />
      </MemoryRouter>
    );

    // Input from BookingSearchBar should be present
    expect(
      screen.getByPlaceholderText(/Où souhaitez-vous partir \?/i)
    ).toBeInTheDocument();
  });
});