import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import TripDetailPage from '../TripDetailPage';

describe('TripDetailPage', () => {
  it('renders trip details when id is provided', () => {
    render(
      <MemoryRouter initialEntries={['/trips/1']}>
        <Routes>
          <Route path="/trips/:id" element={<TripDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Santorini Getaway')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Book Now' })).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText("What's Included")).toBeInTheDocument();
    expect(screen.getByText('Itinerary')).toBeInTheDocument();
  });
});