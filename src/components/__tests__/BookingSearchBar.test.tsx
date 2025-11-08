import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingSearchBar from '../BookingSearchBar';

describe('BookingSearchBar', () => {
  it('shows error when destination is empty', () => {
    const onDest = vi.fn();
    render(
      <MemoryRouter>
        <BookingSearchBar onDestinationSearch={onDest} />
      </MemoryRouter>
    );

    const submit = screen.getByRole('button', { name: /Rechercher/ });
    fireEvent.click(submit);
    expect(screen.getByText(/Veuillez indiquer une destination/)).toBeInTheDocument();
    expect(onDest).not.toHaveBeenCalled();
  });

  it('validates date range and shows error when endDate is before startDate', () => {
    const { container } = render(
      <MemoryRouter>
        <BookingSearchBar />
      </MemoryRouter>
    );

    const destInput = screen.getByPlaceholderText(/Où souhaitez-vous partir/i) as HTMLInputElement;
    fireEvent.change(destInput, { target: { value: 'France' } });

    // JSDOM doesn't associate labels without htmlFor; query date inputs directly
    const dateInputs = container.querySelectorAll('input[type="date"]') as NodeListOf<HTMLInputElement>;
    const startInput = dateInputs[0];
    const endInput = dateInputs[1];

    fireEvent.change(startInput, { target: { value: '2025-01-10' } });
    fireEvent.change(endInput, { target: { value: '2025-01-05' } });

    const submit = screen.getByRole('button', { name: /Rechercher/ });
    fireEvent.click(submit);

    expect(
      screen.getByText(/La date de retour doit être postérieure à la date de départ/)
    ).toBeInTheDocument();
  });

  it('increments/decrements travelers respecting bounds', () => {
    render(
      <MemoryRouter>
        <BookingSearchBar />
      </MemoryRouter>
    );

    // Adults
    const adultMinus = screen.getAllByRole('button', { name: '' })[0]; // first minus button
    const adultCount = screen.getAllByText(/^\d+$/)[0]; // first numeric span
    const adultPlus = screen.getAllByRole('button', { name: '' })[1]; // first plus button

    // Decrement below 1 should clamp at 1
    fireEvent.click(adultMinus);
    expect(adultCount.textContent).toBe('1');

    // Increment
    fireEvent.click(adultPlus);
    expect(adultCount.textContent).toBe('2');

    // Children
    const childrenMinus = screen.getAllByRole('button', { name: '' })[2];
    const childrenCount = screen.getAllByText(/^\d+$/)[1];
    const childrenPlus = screen.getAllByRole('button', { name: '' })[3];

    // Decrement below 0 should clamp at 0
    fireEvent.click(childrenMinus);
    expect(childrenCount.textContent).toBe('0');

    // Increment
    fireEvent.click(childrenPlus);
    expect(childrenCount.textContent).toBe('1');
  });

  it('allows changing travel class and currency', () => {
    render(
      <MemoryRouter>
        <BookingSearchBar />
      </MemoryRouter>
    );

    const classSelect = screen.getByDisplayValue('Économie') as HTMLSelectElement;
    fireEvent.change(classSelect, { target: { value: 'business' } });
    expect(classSelect.value).toBe('business');

    const currencySelect = screen.getByDisplayValue(/Euro \(EUR\)/) as HTMLSelectElement;
    fireEvent.change(currencySelect, { target: { value: 'USD' } });
    expect(currencySelect.value).toBe('USD');
  });

  it('submits valid form and calls destination search callback', () => {
    const onDest = vi.fn();
    render(
      <MemoryRouter>
        <BookingSearchBar onDestinationSearch={onDest} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Où souhaitez-vous partir/i), {
      target: { value: 'France' },
    });
    const submit = screen.getByRole('button', { name: /Rechercher/ });
    fireEvent.click(submit);

    expect(onDest).toHaveBeenCalledWith('France');
  });
});