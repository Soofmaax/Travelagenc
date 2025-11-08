import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeroSection from '../HeroSection';

describe('HeroSection', () => {
  it('renders title and subtitle without search bar', () => {
    render(
      <MemoryRouter>
        <HeroSection
          title="Explore Our Destinations"
          subtitle="Discover our carefully curated selection of extraordinary journeys around the world"
          showSearchBar={false}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Explore Our Destinations/ })).toBeInTheDocument();
    expect(
      screen.getByText(/curated selection of extraordinary journeys/i)
    ).toBeInTheDocument();
  });
});