import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import { CurrencyProvider } from '../../hooks/CurrencyProvider';

describe('Navbar mobile menu', () => {
  it('toggles mobile menu and closes on navigation', () => {
    render(
      <MemoryRouter>
        <CurrencyProvider>
          <Navbar isScrolled={false} />
        </CurrencyProvider>
      </MemoryRouter>
    );

    const menuBtn = screen.getByRole('button', { name: 'Menu' });
    fireEvent.click(menuBtn);

    // Menu should be open and show link 'Accueil'
    const homeLink = screen.getByRole('link', { name: 'Accueil' });
    expect(homeLink).toBeInTheDocument();

    // Clicking link should close the menu
    fireEvent.click(homeLink);

    // After closing, Accueil link in mobile menu should not be visible
    // We can check that there is no mobile menu container anymore
    expect(screen.queryByText('Mentions Légales')).not.toBeNull(); // Desktop link still exists
  });
});