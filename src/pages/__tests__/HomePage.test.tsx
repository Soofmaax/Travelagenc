import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../HomePage';
import { CurrencyProvider } from '../../hooks/CurrencyProvider';

describe('HomePage', () => {
  it('renders hero and main sections', () => {
    render(
      <MemoryRouter>
        <CurrencyProvider>
          <HomePage />
        </CurrencyProvider>
      </MemoryRouter>
    );

    // Hero title
    expect(
      screen.getByText('Découvrez les Plus Beaux Endroits du Monde')
    ).toBeInTheDocument();

    // Features section title
    expect(
      screen.getByText('Pourquoi Choisir VoyageExplore')
    ).toBeInTheDocument();

    // Featured trips section title
    expect(
      screen.getByText('Voyages en Vedette')
    ).toBeInTheDocument();

    // Testimonials section title
    expect(
      screen.getByText('Ce Que Disent Nos Voyageurs')
    ).toBeInTheDocument();

    // Newsletter section title
    expect(
      screen.getByText('Rejoignez Notre Communauté de Voyageurs')
    ).toBeInTheDocument();
  });
});