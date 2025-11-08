import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DestinationPage from '../DestinationPage';

describe('DestinationPage', () => {
  it('renders destination header with formatted country', () => {
    render(
      <MemoryRouter initialEntries={['/destination/france']}>
        <Routes>
          <Route path="/destination/:country" element={<DestinationPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Découvrez France')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
  });
});