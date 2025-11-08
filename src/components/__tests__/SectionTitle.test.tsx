import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionTitle from '../SectionTitle';

describe('SectionTitle', () => {
  it('renders title and optional subtitle', () => {
    render(<SectionTitle title="Pourquoi Choisir VoyageExplore" subtitle="Sous-titre" centered underline />);

    expect(
      screen.getByRole('heading', { name: /Pourquoi Choisir VoyageExplore/ })
    ).toBeInTheDocument();
    expect(screen.getByText('Sous-titre')).toBeInTheDocument();
  });
});