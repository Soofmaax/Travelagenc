import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders company info and contact email', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    // Target the brand heading specifically to avoid multiple matches
    expect(screen.getByRole('heading', { name: /VoyageExplore/ })).toBeInTheDocument();
    expect(screen.getByText(/info@voyageexplore.com/)).toBeInTheDocument();
  });
});