import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import { CurrencyProvider } from '../../hooks/CurrencyProvider';

describe('Navbar', () => {
  it('renders brand link and allows currency change', () => {
    render(
      <MemoryRouter>
        <CurrencyProvider>
          <Navbar isScrolled={false} />
        </CurrencyProvider>
      </MemoryRouter>
    );

    // Brand link
    const brand = screen.getByRole('link', { name: 'VoyageExplore' });
    expect(brand).toBeInTheDocument();

    // Currency select defaults to EUR
    const select = screen.getByLabelText('Sélecteur de devise') as HTMLSelectElement;
    expect(select.value).toBe('EUR');

    // Change currency to USD
    fireEvent.change(select, { target: { value: 'USD' } });
    expect(select.value).toBe('USD');
  });
});