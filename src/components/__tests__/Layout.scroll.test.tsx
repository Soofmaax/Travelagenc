import React from 'react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Layout from '../Layout';
import { CurrencyProvider } from '../../hooks/CurrencyProvider';

describe('Layout scroll behavior', () => {
  it('updates Navbar style when scrolled beyond threshold', async () => {
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

    expect(screen.getByRole('banner').className).toContain('bg-transparent');

    // Simulate scroll and wait for state update
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 60, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    await waitFor(() => {
      expect(screen.getByRole('banner').className).toMatch(/navbar-scrolled/);
    });
  });
});