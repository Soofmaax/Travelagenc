import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('shows error when submitting empty search', () => {
    render(
      <MemoryRouter>
        <SearchBar onSearch={() => {}} />
      </MemoryRouter>
    );

    const submit = screen.getByRole('button', { name: /Rechercher/ });
    fireEvent.click(submit);

    expect(screen.getByText(/Veuillez entrer un pays/)).toBeInTheDocument();
  });

  it('calls onSearch and navigates when exact match is provided', () => {
    const onSearch = vi.fn();

    render(
      <MemoryRouter>
        <SearchBar onSearch={onSearch} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/Rechercher une destination/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'France' } });

    const submit = screen.getByRole('button', { name: /Rechercher/ });
    fireEvent.click(submit);

    expect(onSearch).toHaveBeenCalledWith('France');
  });
});