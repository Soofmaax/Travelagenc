import React from 'react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Layout from '../Layout';
import { CurrencyProvider } from '../../hooks/CurrencyProvider';

describe('Layout scroll behavior', () => {
  it('updates Navbar style when scrolled beyond threshold', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CurrencyProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<div>Home</div>} />
            </Route>
          </Routes>
        </CurrencyProvider>
      </MemoryRouter>
    );

    const header = screen.getByRole('banner');
    expect(header.className).toContain('bg-transparent');

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 60, writable: true });
    window.dispatchEvent(new Event('scroll'));

    // Navbar should have scrolled styles
    expect(header.className).toMatch(/navbar-scrolled/);
  });
});