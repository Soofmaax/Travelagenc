import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Testimonials from '../Testimonials';

describe('Testimonials', () => {
  it('renders testimonials heading and cards', () => {
    render(<Testimonials />);

    expect(
      screen.getByRole('heading', { name: /Ce Que Disent Nos Voyageurs/ })
    ).toBeInTheDocument();

    // Check names appear
    expect(screen.getByText(/Sarah Johnson/)).toBeInTheDocument();
    expect(screen.getByText(/David Chen/)).toBeInTheDocument();
    expect(screen.getByText(/Maria Gonzalez/)).toBeInTheDocument();
  });
});