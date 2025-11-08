import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import BookingPage from '../BookingPage';

describe('BookingPage', () => {
  it('renders booking header and validates basic errors on submit', () => {
    render(
      <MemoryRouter initialEntries={['/booking/1']}>
        <Routes>
          <Route path="/booking/:id" element={<BookingPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Header should contain trip title variant
    expect(screen.getByText(/Book Your/i)).toBeInTheDocument();

    const submit = screen.getByRole('button', { name: /Complete Booking/i });
    fireEvent.click(submit);

    expect(screen.getByText('First name is required')).toBeInTheDocument();
    expect(screen.getByText('Last name is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Please select a departure date')).toBeInTheDocument();
    expect(screen.getByText('You must agree to the terms and conditions')).toBeInTheDocument();
  });
});