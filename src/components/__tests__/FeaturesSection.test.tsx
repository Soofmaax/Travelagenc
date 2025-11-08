import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FeaturesSection from '../FeaturesSection';

describe('FeaturesSection', () => {
  it('renders section title', () => {
    render(<FeaturesSection />);
    expect(
      screen.getByRole('heading', { name: /Pourquoi Choisir VoyageExplore/ })
    ).toBeInTheDocument();
  });
});