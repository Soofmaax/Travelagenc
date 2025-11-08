import React from 'react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Layout from '../Layout';
import { CurrencyProvider } from '../../hooks/CurrencyProvider';

describe('Layout', () => {
  it('renders Navbar, Footer and child Outlet content', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CurrencyProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<div>Home Content</div>} />
            </Route>
          </Routes>
        </CurrencyProvider>
      </MemoryRouter>
    );

    // Brand in Navbar (link)
    expect(screen.getByRole('link', { name: 'VoyageExplore' })).toBeInTheDocument();
    // Outlet content
    expect(screen.getByText(/Home Content/)).toBeInTheDocument();
    // Footer contains contact email
    expect(screen.getByText(/info@voyageexplore.com/)).toBeInTheDocument();
  });
});